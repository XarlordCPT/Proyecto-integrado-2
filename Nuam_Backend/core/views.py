from django.shortcuts import render, redirect
from django.contrib.auth import login
from django.http import HttpResponse, HttpResponseForbidden, JsonResponse
from django.views.decorators.http import require_http_methods
from django.core.cache import cache
from django.utils import timezone
from datetime import timedelta
import secrets
import json
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.tokens import UntypedToken
from rest_framework_simplejwt.exceptions import InvalidToken, TokenError
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from django.views import View
from django.utils.decorators import method_decorator
from .serializers import MyTokenObtainPairSerializer
from .models import Usuario

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def admin_login_token(request):
    """
    Endpoint que genera un token temporal de un solo uso para acceder al admin.
    El frontend llama a este endpoint con el JWT, y recibe un token temporal.
    """
    user = request.user
    
    # Verificar que el usuario tenga is_staff=True
    if not user.is_staff:
        return Response(
            {'detail': 'No tienes permisos para acceder al panel de administración.'},
            status=status.HTTP_403_FORBIDDEN
        )
    
    # Generar un token temporal único
    temp_token = secrets.token_urlsafe(32)
    
    # Almacenar el token en cache con la información del usuario (válido por 5 minutos)
    # Aumentamos el tiempo para dar más margen al usuario
    cache.set(f'admin_login_{temp_token}', user.id, timeout=300)
    
    # Devolver el token temporal
    admin_login_url = f'/api/auth/admin-login/{temp_token}/'
    return Response({
        'temp_token': temp_token,
        'admin_login_url': admin_login_url
    })


@csrf_exempt
def admin_login_redirect(request, temp_token):
    """
    Vista que autentica al usuario usando un token temporal y lo redirige al admin.
    Esta vista crea una sesión HTTP de Django para que el usuario pueda acceder al admin.
    NO usa @api_view para poder manejar correctamente las cookies de sesión.
    """
    # Verificar el token temporal
    user_id = cache.get(f'admin_login_{temp_token}')
    
    if not user_id:
        html_error = """
        <!DOCTYPE html>
        <html>
        <head>
            <title>Token Inválido</title>
            <meta charset="utf-8">
        </head>
        <body>
            <h1>Token Inválido o Expirado</h1>
            <p>El token de acceso ha expirado. Por favor, intenta nuevamente.</p>
            <p><a href="javascript:window.close()">Cerrar ventana</a></p>
        </body>
        </html>
        """
        return HttpResponseForbidden(html_error)
    
    # Obtener el usuario
    try:
        user = Usuario.objects.get(pk=user_id)
    except Usuario.DoesNotExist:
        html_error = """
        <!DOCTYPE html>
        <html>
        <head>
            <title>Usuario No Encontrado</title>
            <meta charset="utf-8">
        </head>
        <body>
            <h1>Usuario No Encontrado</h1>
            <p>El usuario asociado con este token no existe.</p>
            <p><a href="javascript:window.close()">Cerrar ventana</a></p>
        </body>
        </html>
        """
        return HttpResponseForbidden(html_error)
    
    # Verificar que el usuario tenga is_staff=True
    if not user.is_staff:
        html_error = """
        <!DOCTYPE html>
        <html>
        <head>
            <title>Acceso Denegado</title>
            <meta charset="utf-8">
        </head>
        <body>
            <h1>Acceso Denegado</h1>
            <p>No tienes permisos para acceder al panel de administración.</p>
            <p><a href="javascript:window.close()">Cerrar ventana</a></p>
        </body>
        </html>
        """
        return HttpResponseForbidden(html_error)
    
    # Eliminar el token temporal (solo se puede usar una vez)
    cache.delete(f'admin_login_{temp_token}')
    
    # Crear una sesión de Django para el usuario y autenticarlo
    # login() automáticamente crea una sesión si no existe
    login(request, user, backend='django.contrib.auth.backends.ModelBackend')
    
    # Verificar que el login fue exitoso
    if not request.user.is_authenticated:
        html_error = """
        <!DOCTYPE html>
        <html>
        <head>
            <title>Error de Autenticación</title>
            <meta charset="utf-8">
        </head>
        <body>
            <h1>Error de Autenticación</h1>
            <p>No se pudo establecer la sesión. Por favor, intenta nuevamente.</p>
            <p><a href="javascript:window.close()">Cerrar ventana</a></p>
        </body>
        </html>
        """
        return HttpResponseForbidden(html_error)
    
    # Asegurar que la sesión se guarde
    # Django guarda automáticamente la sesión después de login(), pero lo forzamos explícitamente
    request.session.save()
    
    # Redirigir al admin
    # Django redirect() automáticamente establece las cookies de sesión
    return redirect('/admin/')
