from django.db.models.signals import pre_delete
from django.shortcuts import render
from rest_framework import viewsets, permissions
from .models import (Calificacion, Factor, Instrumento, Mercado, TipoAgregacion, Ejercicio)
from .serializers import (CalificacionSerializer, FactorSerializer, InstrumentoSerializer, MercadoSerializer, TipoAgregacionSerializer, EjercicioSerializer)

class MercadoViewSet(viewsets.ModelViewSet):
    queryset = Mercado.objects.all()
    serializer_class = MercadoSerializer
    permission_classes = [permissions.AllowAny]

class TipoAgregacionViewSet(viewsets.ModelViewSet):
    queryset = TipoAgregacion.objects.all()
    serializer_class = TipoAgregacionSerializer
    permission_classes = [permissions.AllowAny]

class EjercicioViewSet(viewsets.ModelViewSet):
    queryset = Ejercicio.objects.all()
    serializer_class = EjercicioSerializer
    permission_classes = [permissions.AllowAny]

class InstrumentoViewSet(viewsets.ModelViewSet):
    queryset = Instrumento.objects.all()
    serializer_class = InstrumentoSerializer
    permission_classes = [permissions.AllowAny]

class CalificacionViewSet(viewsets.ModelViewSet):
    serializer_class = CalificacionSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Calificacion.objects.filter(
            usuario=self.request.user
        ).prefetch_related('factores')
    
    def get_serializer_context(self):
        return {'request': self.request}