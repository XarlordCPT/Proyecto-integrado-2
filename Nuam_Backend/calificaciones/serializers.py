from rest_framework import serializers
from .models import (Calificacion, Factor, Instrumento, Mercado, TipoAgregacion, Ejercicio)
from django.db import transaction

class MercadoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Mercado
        fields = '__all__'

class TipoAgregacionSerializer(serializers.ModelSerializer):
    class Meta:
        model = TipoAgregacion
        fields = '__all__'

class EjercicioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ejercicio
        fields = '__all__'

class InstrumentoSerializer(serializers.ModelSerializer):
    mercado = serializers.StringRelatedField()
    class Meta:
        model = Instrumento
        fields = ['id_instrumento', 'nombre_instrumento', 'mercado']

class FactorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Factor
        fields = ['numero_factor', 'valor']

class CalificacionSerializer(serializers.ModelSerializer):
    factores = FactorSerializer(many=True)

    usuario = serializers.StringRelatedField(read_only=True) #Estos 4 son solo para visualizarlos en caso de solicitud en la tabla
    tipo_agregacion_info = serializers.StringRelatedField(source='tipo_agregacion', read_only=True)
    ejercicio_info = serializers.StringRelatedField(source='ejercicio', read_only=True)
    instrumento_info = InstrumentoSerializer(source='instrumento', read_only=True) 

    #Y estos para cuando se deban crear calificaciones
    tipo_agregacion = serializers.PrimaryKeyRelatedField(queryset=TipoAgregacion.objects.all(), write_only=True) 
    ejercicio = serializers.PrimaryKeyRelatedField(queryset=Ejercicio.objects.all(), write_only=True)
    instrumento = serializers.PrimaryKeyRelatedField(queryset=Instrumento.objects.all(), write_only=True)
    
    class Meta:
        model = Calificacion
        fields = [
            'id_calificacion',
            'usuario',
            'tipo_agregacion',
            'tipo_agregacion_info',
            'ejercicio',
            'ejercicio_info',
            'instrumento',
            'instrumento_info',
            'secuencia_de_evento',
            'dividendo',
            'valor_historico',
            'fecha_pago',
            'año',
            'descripcion',
            'isfut',
            'factor_actualizacion',
            'factores'
        ]
    
    def crearCalificacion(self, datos_validados):
        factores_datos = datos_validados.pop('factores')
        usuario = self.context['request'].user
        with transaction.atomic():
            calificacion = Calificacion.objects.create(usuario=usuario, **datos_validados)
            for factor_datos in factores_datos:
                Factor.objects.create(calificacion=calificacion, **factor_datos)
        return calificacion
    
    def actualizarCalificacion(self, instancia, datos_validados):
        factores_datos = datos_validados.pop('factores')

        instancia.tipo_agregacion = datos_validados.get('tipo_agregacion', instancia.tipo_agregacion)
        instancia.ejercicio = datos_validados.get('ejercicio', instancia.ejercicio)
        instancia.instrumento = datos_validados.get('instrumento', instancia.instrumento)
        instancia.secuencia_de_evento = datos_validados.get('secuencia_de_evento', instancia.secuencia_de_evento)
        instancia.dividendo = datos_validados.get('dividendo', instancia.dividendo)
        instancia.valor_historico = datos_validados.get('valor_historico', instancia.valor_historico)
        instancia.fecha_pago = datos_validados.get('fecha_pago', instancia.fecha_pago)
        instancia.año = datos_validados.get('año', instancia.año)
        instancia.descripcion = datos_validados.get('descripcion', instancia.descripcion)
        instancia.isfut = datos_validados.get('isfut', instancia.isfut)
        instancia.factor_actualizacion = datos_validados.get('factor_actualizacion', instancia.factor_actualizacion)

        with transaction.atomic():
            instancia.save()
            instancia.factores.all().delete()
            for factor_dato in factores_datos:
                Factor.objects.create(calificacion=instancia, **factor_dato)
        return instancia