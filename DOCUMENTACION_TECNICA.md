# Documentación Técnica - NUAM

## 📚 Índice

1. [Arquitectura del Sistema](#arquitectura-del-sistema)
2. [Stack Tecnológico](#stack-tecnológico)
3. [Estructura de Base de Datos](#estructura-de-base-de-datos)
4. [API Documentation](#api-documentation)
5. [Autenticación y Autorización](#autenticación-y-autorización)
6. [Scripts de Instalación](#scripts-de-instalación)
7. [Configuración del Entorno](#configuración-del-entorno)
8. [Despliegue](#despliegue)
9. [Troubleshooting](#troubleshooting)

## 🏗️ Arquitectura del Sistema

### Diagrama de Arquitectura

```
┌─────────────────────────────────────────────────────────────┐
│                        CLIENTE (Browser)                     │
│  ┌──────────────────────────────────────────────────────┐   │
│  │         Frontend React (Vite + Tailwind CSS)         │   │
│  │  - Login                                            │   │
│  │  - Mantenedor de Calificaciones                     │   │
│  │  - Componentes CRUD                                 │   │
│  │  - Context API (AuthContext)                        │   │
│  └──────────────────────────────────────────────────────┘   │
└───────────────────────────┬─────────────────────────────────┘
                            │ HTTP/REST API
                            │ JWT Authentication
                            │
┌───────────────────────────▼─────────────────────────────────┐
│                    BACKEND (Django REST)                     │
│  ┌──────────────────────────────────────────────────────┐   │
│  │              Django REST Framework                   │   │
│  │  - ViewSets                                          │   │
│  │  - Serializers                                       │   │
│  │  - JWT Authentication                                │   │
│  │  - CORS Headers                                      │   │
│  └──────────────────────────────────────────────────────┘   │
│  ┌──────────────────────────────────────────────────────┐   │
│  │              Django Admin (Customizado)              │   │
│  │  - Dashboard con gráficos                           │   │
│  │  - Estadísticas                                     │   │
│  │  - Gestión de usuarios                              │   │
│  └──────────────────────────────────────────────────────┘   │
└───────────────────────────┬─────────────────────────────────┘
                            │
                            │
┌───────────────────────────▼─────────────────────────────────┐
│                    BASE DE DATOS                            │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  SQLite (Desarrollo) / PostgreSQL (Producción)       │   │
│  │  - Usuario                                           │   │
│  │  - Calificacion                                      │   │
│  │  - Factor                                            │   │
│  │  - Instrumento                                       │   │
│  │  - Mercado                                           │   │
│  │  - Ejercicio                                         │   │
│  │  - TipoAgregacion                                    │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

### Flujo de Datos

1. **Autenticación**: El usuario inicia sesión desde el frontend, el backend valida las credenciales y devuelve tokens JWT.
2. **Peticiones API**: El frontend envía peticiones HTTP con el token JWT en el header `Authorization: Bearer <token>`.
3. **Procesamiento**: El backend valida el token, procesa la petición y devuelve los datos en formato JSON.
4. **Actualización UI**: El frontend actualiza la interfaz de usuario con los datos recibidos.

## 🔧 Stack Tecnológico

### Backend

| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| Python | 3.8+ | Lenguaje de programación |
| Django | 5.2.7 | Framework web |
| Django REST Framework | 3.16.1 | Construcción de API REST |
| Django REST Framework Simple JWT | 5.5.1 | Autenticación JWT |
| Django CORS Headers | 4.9.0 | Manejo de CORS |
| Djoser | 2.3.3 | Sistema de autenticación |
| psycopg2-binary | 2.9.9+ | Adaptador PostgreSQL |

### Frontend

| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| Node.js | 16+ | Runtime de JavaScript |
| React | 19.1.1 | Biblioteca de UI |
| Vite | 7.1.7 | Build tool y dev server |
| React Router DOM | 7.9.5 | Enrutamiento |
| Tailwind CSS | 4.1.17 | Framework de CSS |
| React Data Table Component | 7.7.0 | Componente de tablas |
| PapaParse | 5.5.3 | Procesamiento CSV |
| Chart.js | 4.4.0 | Gráficos (admin) |

## 🗄️ Estructura de Base de Datos

### Modelo de Datos

#### Core (Usuarios)

**Usuario**
- `id` (AutoField, PK)
- `username` (CharField, único)
- `email` (EmailField)
- `password` (CharField, hasheado)
- `rol` (ForeignKey → Rol)
- `empleado` (OneToOneField → Empleado)
- `is_staff` (BooleanField) - Automático si rol = "Administrador"

**Rol**
- `id_rol` (AutoField, PK)
- `nombre_rol` (CharField, único)

**Empleado**
- `id_empleado` (AutoField, PK)
- `rut` (CharField, único)

#### Calificaciones

**Calificacion**
- `id_calificacion` (AutoField, PK)
- `usuario` (ForeignKey → Usuario)
- `ejercicio` (ForeignKey → Ejercicio)
- `instrumento` (ForeignKey → Instrumento)
- `tipo_agregacion` (ForeignKey → TipoAgregacion)
- `fecha_pago` (DateField)
- `secuencia_de_evento` (IntegerField)
- `dividendo` (DecimalField)
- `valor_historico` (DecimalField)
- `año` (IntegerField)
- `isfut` (BooleanField)
- `factor_actualizacion` (DecimalField)
- `descripcion` (TextField, opcional)

**Factor**
- `id_factor` (AutoField, PK)
- `calificacion` (ForeignKey → Calificacion)
- `numero_factor` (CharField) - "Factor_8" a "Factor_37"
- `valor` (DecimalField)

**Instrumento**
- `id_instrumento` (AutoField, PK)
- `nombre_instrumento` (CharField)
- `mercado` (ForeignKey → Mercado)

**Mercado**
- `id_mercado` (AutoField, PK)
- `nombre_mercado` (CharField, único)

**Ejercicio**
- `id_ejercicio` (AutoField, PK)
- `nombre_ejercicio` (CharField, único)

**TipoAgregacion**
- `id_tipo_agregacion` (AutoField, PK)
- `nombre_agregacion` (CharField, único) - "MANUAL (FACTORES)", "MANUAL (MONTO)"

### Relaciones

- Un **Usuario** tiene un **Rol** y un **Empleado** (opcional)
- Una **Calificacion** pertenece a un **Usuario**, un **Ejercicio**, un **Instrumento** y un **TipoAgregacion**
- Una **Calificacion** tiene múltiples **Factors** (30 factores: Factor_8 a Factor_37)
- Un **Instrumento** pertenece a un **Mercado**

## 📡 API Documentation

### Autenticación

#### POST /api/auth/token/
Iniciar sesión y obtener tokens JWT.

**Request Body:**
```json
{
  "username": "usuario",
  "password": "contraseña"
}
```

**Response:**
```json
{
  "access": "eyJ0eXAiOiJKV1QiLCJhbGc...",
  "refresh": "eyJ0eXAiOiJKV1QiLCJhbGc..."
}
```

#### POST /api/auth/token/refresh/
Refrescar token de acceso.

**Request Body:**
```json
{
  "refresh": "eyJ0eXAiOiJKV1QiLCJhbGc..."
}
```

**Response:**
```json
{
  "access": "eyJ0eXAiOiJKV1QiLCJhbGc..."
}
```

#### GET /api/auth/admin-login-token/
Obtener token temporal para acceso al admin (requiere autenticación y rol Administrador).

**Headers:**
```
Authorization: Bearer <access_token>
```

**Response:**
```json
{
  "temp_token": "token_temporal",
  "admin_login_url": "/api/auth/admin-login/<temp_token>/"
}
```

### Calificaciones

#### GET /api/calificaciones/calificaciones/
Listar todas las calificaciones del usuario autenticado.

**Headers:**
```
Authorization: Bearer <access_token>
```

**Response:**
```json
[
  {
    "id_calificacion": 1,
    "ejercicio_info": "Ejercicio 2025",
    "instrumento_info": {
      "id_instrumento": 1,
      "nombre_instrumento": "Instrumento A",
      "mercado": "AC"
    },
    "tipo_agregacion_info": "MANUAL (FACTORES)",
    "fecha_pago": "2025-01-15",
    "secuencia_de_evento": 10001,
    "dividendo": 1000.00,
    "valor_historico": 5000.00,
    "año": 2025,
    "isfut": false,
    "factor_actualizacion": 1.5,
    "descripcion": "Descripción",
    "factores": [
      {
        "numero_factor": "Factor_8",
        "valor": 0.0333
      },
      ...
    ]
  }
]
```

#### POST /api/calificaciones/calificaciones/
Crear una nueva calificación.

**Headers:**
```
Authorization: Bearer <access_token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "ejercicio": 1,
  "instrumento": 1,
  "tipo_agregacion": 1,
  "fecha_pago": "2025-01-15",
  "secuencia_de_evento": 10001,
  "dividendo": 1000.00,
  "valor_historico": 5000.00,
  "año": 2025,
  "isfut": false,
  "factor_actualizacion": 1.5,
  "descripcion": "Descripción",
  "factores": [
    {
      "numero_factor": "Factor_8",
      "valor": 0.0333
    },
    ...
  ]
}
```

#### PUT /api/calificaciones/calificaciones/{id}/
Actualizar una calificación existente.

#### DELETE /api/calificaciones/calificaciones/{id}/
Eliminar una calificación.

### Catálogos

#### GET /api/calificaciones/mercados/
Listar todos los mercados.

#### GET /api/calificaciones/instrumentos/
Listar todos los instrumentos.

#### GET /api/calificaciones/ejercicios/
Listar todos los ejercicios.

#### GET /api/calificaciones/tipos-agregacion/
Listar todos los tipos de agregación.

### Dashboard Administrativo

#### GET /admin/dashboard-stats/
Obtener estadísticas para el dashboard (requiere autenticación de staff).

**Headers:**
```
Authorization: Bearer <access_token>
```

**Response:**
```json
{
  "totales": {
    "calificaciones": 5,
    "usuarios": 3,
    "usuarios_activos": 2,
    "mercados": 1,
    "instrumentos": 5
  },
  "calificaciones_por_mes": [
    {
      "mes": "2025-01",
      "count": 2
    }
  ],
  "calificaciones_por_tipo": [
    {
      "tipo": "MANUAL (FACTORES)",
      "count": 3
    }
  ],
  "calificaciones_por_mercado": [
    {
      "mercado": "AC",
      "count": 5
    }
  ],
  "calificaciones_por_año": [
    {
      "año": 2025,
      "count": 5
    }
  ],
  "calificaciones_recientes": [
    {
      "id": 1,
      "usuario": "admin",
      "instrumento": "Instrumento A",
      "tipo_agregacion": "MANUAL (FACTORES)",
      "fecha_pago": "2025-01-15",
      "año": 2025
    }
  ]
}
```

## 🔐 Autenticación y Autorización

### Flujo de Autenticación JWT

1. **Login**: El usuario envía credenciales al endpoint `/api/auth/token/`
2. **Validación**: El backend valida las credenciales
3. **Tokens**: Si son válidas, se generan dos tokens:
   - **Access Token**: Válido por 60 minutos
   - **Refresh Token**: Válido por 7 días
4. **Almacenamiento**: Los tokens se almacenan en LocalStorage del navegador
5. **Peticiones**: Cada petición incluye el token en el header `Authorization: Bearer <token>`
6. **Renovación**: Si el token expira, se usa el refresh token para obtener uno nuevo

### Roles y Permisos

- **Administrador**: Acceso completo al sistema y panel administrativo de Django
  - Puede ver todas las calificaciones
  - Puede acceder al panel administrativo
  - Tiene `is_staff=True` automáticamente (mediante signal)
- **Usuario**: Acceso a funcionalidades de gestión de calificaciones
  - Solo puede ver sus propias calificaciones
  - No puede acceder al panel administrativo

### Señales Django

El sistema utiliza señales Django para automatizar tareas:

- **Signal `post_save` en Usuario**: Cuando un usuario se guarda, si su rol es "Administrador", se establece automáticamente `is_staff=True`.

## 📜 Scripts de Instalación

### install.sh / install.bat

Scripts de instalación automática que realizan:

1. Verificación de prerrequisitos (Python, Node.js, npm)
2. Creación del entorno virtual de Python
3. Instalación de dependencias del backend
4. Realización de migraciones de la base de datos
5. Instalación de dependencias del frontend

### start.sh / start.bat

Scripts de inicio automático que:

1. Activan el entorno virtual
2. Inician el servidor de Django
3. Inician el servidor de desarrollo de Vite
4. Muestran las URLs de acceso

## ⚙️ Configuración del Entorno

### Variables de Entorno

Para producción, se recomienda usar variables de entorno:

```env
# Django
SECRET_KEY=tu_secret_key_aqui
DEBUG=False
ALLOWED_HOSTS=localhost,127.0.0.1,tu-dominio.com

# Base de datos
DATABASE_URL=postgresql://usuario:contraseña@localhost:5432/nuam_db

# CORS
CORS_ALLOWED_ORIGINS=https://tu-dominio.com
```

### Configuración de CORS

El sistema está configurado para permitir peticiones desde:
- `http://localhost:3000` (React estándar)
- `http://localhost:5173` (Vite estándar)
- `http://127.0.0.1:3000`
- `http://127.0.0.1:5173`

Para producción, actualiza `CORS_ALLOWED_ORIGINS` en `settings.py`.

## 🚀 Despliegue

### Backend (Django)

1. **Configura variables de entorno de producción**
2. **Configura una base de datos PostgreSQL**
3. **Recopila archivos estáticos:**
   ```bash
   python manage.py collectstatic
   ```
4. **Configura un servidor web (Nginx + Gunicorn)**
5. **Configura SSL/HTTPS**

### Frontend (React)

1. **Construye la aplicación:**
   ```bash
   npm run build
   ```
2. **Sirve los archivos estáticos con un servidor web (Nginx, Apache)**
3. **Configura las variables de entorno para la API**

## 🐛 Troubleshooting

### Problemas Comunes

#### Error: "ModuleNotFoundError"
**Solución**: Asegúrate de tener el entorno virtual activado y las dependencias instaladas.

#### Error: "Port already in use"
**Solución**: Cambia el puerto del servidor o cierra el proceso que está usando el puerto.

#### Error: "CORS policy"
**Solución**: Verifica que `django-cors-headers` esté instalado y configurado correctamente en `settings.py`.

#### Error: "Token expired"
**Solución**: El token JWT expira después de 60 minutos. El sistema debería refrescar automáticamente, pero si no, cierra sesión e inicia sesión nuevamente.

#### Error: "is_staff is False"
**Solución**: Verifica que el usuario tenga el rol "Administrador" y que las señales Django estén correctamente configuradas.

## 📊 Métricas y Monitoreo

### Logs

- **Backend**: Los logs de Django se pueden configurar en `settings.py`
- **Frontend**: Los logs de la consola del navegador muestran errores y advertencias

### Performance

- **Base de datos**: Usa `prefetch_related` y `select_related` para optimizar consultas
- **Frontend**: Usa React.memo y useMemo para optimizar re-renders
- **API**: Implementa paginación para listas grandes

## 🔒 Seguridad

### Mejores Prácticas

1. **Never commit secrets**: No incluyas `SECRET_KEY` o credenciales en el código
2. **Use HTTPS in production**: Siempre usa HTTPS en producción
3. **Validate input**: Valida todos los inputs del usuario
4. **Use CSRF protection**: Django incluye protección CSRF por defecto
5. **Limit rate**: Implementa rate limiting para prevenir ataques
6. **Keep dependencies updated**: Mantén las dependencias actualizadas

## 📝 Convenciones de Código

### Backend (Python/Django)

- **PEP 8**: Sigue las convenciones de estilo PEP 8
- **Docstrings**: Usa docstrings para documentar funciones y clases
- **Type hints**: Usa type hints cuando sea posible

### Frontend (JavaScript/React)

- **ESLint**: Sigue las reglas de ESLint configuradas
- **Component names**: Usa PascalCase para nombres de componentes
- **Function names**: Usa camelCase para nombres de funciones
- **Constants**: Usa UPPER_SNAKE_CASE para constantes

---

**Versión**: 1.0.0  
**Última actualización**: 2025  
**Mantenido por**: Equipo de desarrollo NUAM

