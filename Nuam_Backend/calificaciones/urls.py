from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()

router.register(r'mercados', views.MercadoViewSet)
router.register(r'tipos-agregacion', views.TipoAgregacionViewSet)
router.register(r'ejercicios', views.EjercicioViewSet)
router.register(r'instrumentos', views.InstrumentoViewSet)
router.register(r'calificaciones', views.CalificacionViewSet, basename='calificacion')

urlpatterns = [
    path('', include(router.urls)),
]