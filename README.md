# NUAM - Sistema de Gestión de Calificaciones Tributarias

## 📋 Descripción del Proyecto

NUAM es un sistema web full-stack diseñado para la gestión integral de calificaciones tributarias. El sistema permite administrar calificaciones financieras, instrumentos, factores de actualización, ejercicios contables y usuarios con roles diferenciados.

### Características Principales

- ✅ Autenticación basada en JWT (JSON Web Tokens)
- ✅ Sistema de roles y permisos (Administrador, Usuario)
- ✅ Gestión completa de calificaciones (CRUD)
- ✅ Ingreso de calificaciones por factores o montos
- ✅ Carga masiva mediante archivos CSV
- ✅ Dashboard administrativo con gráficos y estadísticas
- ✅ Interfaz moderna y responsive
- ✅ API REST documentada

## 🏗️ Arquitectura del Sistema

El proyecto sigue una arquitectura cliente-servidor con separación de responsabilidades:

```
NUAM/
├── Backend (Django REST Framework)
│   ├── API REST para gestión de datos
│   ├── Autenticación JWT
│   ├── Panel administrativo personalizado
│   └── Base de datos SQLite/PostgreSQL
│
└── Frontend (React + Vite)
    ├── Interfaz de usuario reactiva
    ├── Gestión de estado con Context API
    ├── Routing con React Router
    └── Componentes reutilizables
```

## 🚀 Tecnologías Utilizadas

### Backend
- **Django** 5.2.7 - Framework web de alto nivel
- **Django REST Framework** - Construcción de API REST
- **Django REST Framework Simple JWT** - Autenticación con tokens JWT
- **Django CORS Headers** - Manejo de CORS entre frontend y backend
- **Djoser** - Sistema de autenticación de usuarios
- **psycopg2-binary** - Adaptador PostgreSQL (opcional)
- **SQLite** - Base de datos por defecto

### Frontend
- **React** 19.1.1 - Biblioteca de JavaScript para interfaces
- **Vite** 7.1.7 - Build tool y dev server
- **React Router DOM** 7.9.5 - Enrutamiento de aplicaciones
- **Tailwind CSS** 4.1.17 - Framework de CSS utility-first
- **React Data Table Component** 7.7.0 - Componente de tablas avanzadas
- **PapaParse** 5.5.3 - Procesamiento de archivos CSV
- **Chart.js** - Gráficos para el dashboard administrativo

## 📁 Estructura del Proyecto

```
Proyecto integrado 2/
├── Nuam_Backend/                 # Backend Django
│   ├── core/                     # App de usuarios y autenticación
│   │   ├── models.py            # Modelos: Usuario, Rol, Empleado
│   │   ├── serializers.py       # Serializers para API
│   │   ├── views.py             # Vistas de autenticación
│   │   ├── urls.py              # URLs de autenticación
│   │   └── signals.py           # Señales Django (is_staff automático)
│   ├── calificaciones/          # App de calificaciones
│   │   ├── models.py            # Modelos: Calificacion, Factor, Instrumento, etc.
│   │   ├── serializers.py       # Serializers para CRUD
│   │   ├── views.py             # ViewSets y vistas del dashboard
│   │   └── urls.py              # URLs de la API
│   ├── Nuam_Backend/            # Configuración del proyecto
│   │   ├── settings.py          # Configuración Django
│   │   └── urls.py              # URLs principales
│   ├── templates/               # Plantillas personalizadas
│   │   └── admin/
│   │       └── index.html       # Dashboard administrativo
│   ├── static/                  # Archivos estáticos
│   │   └── admin/
│   │       ├── css/
│   │       │   └── admin_custom.css
│   │       └── js/
│   │           └── dashboard.js
│   ├── manage.py                # Script de administración Django
│   └── requirements.txt         # Dependencias Python
│
├── NUAM/                        # Frontend React
│   ├── src/
│   │   ├── components/          # Componentes reutilizables
│   │   │   ├── Ingresar.jsx
│   │   │   ├── IngresarFactores.jsx
│   │   │   ├── IngresarMontos.jsx
│   │   │   ├── ModificarCalificacion.jsx
│   │   │   ├── Cargar.jsx
│   │   │   └── PrivateRoute.jsx
│   │   ├── pages/               # Páginas principales
│   │   │   ├── Login.jsx
│   │   │   └── Mantenedor.jsx
│   │   ├── context/             # Context API
│   │   │   └── AuthContext.jsx
│   │   ├── services/            # Servicios API
│   │   │   ├── authService.js
│   │   │   └── calificacionesService.js
│   │   ├── config/              # Configuración
│   │   │   └── api.js
│   │   └── main.jsx             # Punto de entrada
│   ├── package.json             # Dependencias Node.js
│   └── vite.config.js           # Configuración Vite
│
├── install.sh                   # Script de instalación (Linux/Mac)
├── install.bat                  # Script de instalación (Windows)
├── start.sh                     # Script de inicio (Linux/Mac)
├── start.bat                    # Script de inicio (Windows)
└── README.md                    # Este archivo
```

## 🔧 Prerrequisitos

Antes de instalar el proyecto, asegúrate de tener instalado:

- **Python** 3.8 o superior
- **Node.js** 16 o superior
- **npm** (incluido con Node.js)
- **Git** (opcional, para clonar el repositorio)
- **PostgreSQL** (opcional, para producción)

### Verificar instalación

```bash
# Verificar Python
python --version
# Debe mostrar Python 3.8 o superior

# Verificar Node.js
node --version
# Debe mostrar v16 o superior

# Verificar npm
npm --version
```

## 📦 Instalación Automática

### Opción 1: Instalación Automática con Scripts

#### Windows

1. Abre PowerShell o CMD en la carpeta del proyecto
2. Ejecuta el script de instalación:
   ```bash
   install.bat
   ```
3. El script realizará automáticamente:
   - Creación del entorno virtual de Python
   - Instalación de dependencias del backend
   - Instalación de dependencias del frontend
   - Creación de las migraciones
   - Configuración de la base de datos

#### Linux / Mac

1. Abre una terminal en la carpeta del proyecto
2. Da permisos de ejecución al script:
   ```bash
   chmod +x install.sh
   ```
3. Ejecuta el script de instalación:
   ```bash
   ./install.sh
   ```
4. El script realizará automáticamente todas las tareas de instalación

### Opción 2: Instalación Manual

#### Backend

1. **Navega a la carpeta del backend:**
   ```bash
   cd Nuam_Backend
   ```

2. **Crea un entorno virtual:**
   ```bash
   # Windows
   python -m venv Ambiente
   
   # Linux/Mac
   python3 -m venv Ambiente
   ```

3. **Activa el entorno virtual:**
   ```bash
   # Windows
   Ambiente\Scripts\activate
   
   # Linux/Mac
   source Ambiente/bin/activate
   ```

4. **Instala las dependencias:**
   ```bash
   pip install -r requirements.txt
   ```

5. **Realiza las migraciones:**
   ```bash
   python manage.py migrate
   ```

6. **Crea un superusuario (opcional):**
   ```bash
   python manage.py createsuperuser
   ```

#### Frontend

1. **Navega a la carpeta del frontend:**
   ```bash
   cd NUAM
   ```

2. **Instala las dependencias:**
   ```bash
   npm install
   ```

## 🚀 Inicio Rápido

### Opción 1: Scripts de Inicio Automático

#### Windows
```bash
start.bat
```

#### Linux / Mac
```bash
chmod +x start.sh
./start.sh
```

### Opción 2: Inicio Manual

#### Backend

1. **Activa el entorno virtual:**
   ```bash
   # Windows
   cd Nuam_Backend
   Ambiente\Scripts\activate
   
   # Linux/Mac
   cd Nuam_Backend
   source Ambiente/bin/activate
   ```

2. **Inicia el servidor de desarrollo:**
   ```bash
   python manage.py runserver
   ```

   El backend estará disponible en: `http://localhost:8000`

#### Frontend

1. **Navega a la carpeta del frontend:**
   ```bash
   cd NUAM
   ```

2. **Inicia el servidor de desarrollo:**
   ```bash
   npm run dev
   ```

   El frontend estará disponible en: `http://localhost:5173` (o el puerto que Vite asigne)

## 🗄️ Configuración de Base de Datos

### SQLite (Por defecto)

El proyecto viene configurado para usar SQLite por defecto. No requiere configuración adicional.

### PostgreSQL (Producción)

Para usar PostgreSQL en producción:

1. **Crea una base de datos en PostgreSQL:**
   ```sql
   CREATE DATABASE nuam_db;
   CREATE USER nuam_user WITH PASSWORD 'tu_contraseña';
   GRANT ALL PRIVILEGES ON DATABASE nuam_db TO nuam_user;
   ```

2. **Actualiza la configuración en `Nuam_Backend/Nuam_Backend/settings.py`:**
   ```python
   DATABASES = {
       'default': {
           'ENGINE': 'django.db.backends.postgresql',
           'NAME': 'nuam_db',
           'USER': 'nuam_user',
           'PASSWORD': 'tu_contraseña',
           'HOST': 'localhost',
           'PORT': '5432',
       }
   }
   ```

3. **Realiza las migraciones:**
   ```bash
   python manage.py migrate
   ```

**Nota:** Se recomienda usar un usuario de PostgreSQL sin caracteres especiales (como acentos) para evitar problemas de codificación en Windows.

## 🔐 Autenticación y Seguridad

### Sistema de Autenticación

El sistema utiliza autenticación basada en JWT (JSON Web Tokens):

- **Token de acceso**: Válido por 60 minutos
- **Token de refresco**: Válido por 7 días
- **Almacenamiento**: LocalStorage en el navegador

### Endpoints de Autenticación

- `POST /api/auth/token/` - Iniciar sesión
- `POST /api/auth/token/refresh/` - Refrescar token
- `POST /api/auth/token/verify/` - Verificar token

### Roles del Sistema

- **Administrador**: Acceso completo al sistema y panel administrativo de Django
- **Usuario**: Acceso a las funcionalidades de gestión de calificaciones

Los usuarios con rol "Administrador" tienen automáticamente `is_staff=True`, lo que les permite acceder al panel administrativo de Django.

## 📝 Modelos de Datos

### Core (Usuarios)

- **Usuario**: Extiende AbstractUser de Django, incluye relación con Rol y Empleado
- **Empleado**: Información de empleados (RUT)
- **Rol**: Roles del sistema (Administrador, Usuario, etc.)

### Calificaciones

- **Calificacion**: Calificaciones tributarias con todos sus campos
- **Factor**: Factores de actualización (Factor_8 a Factor_37)
- **Instrumento**: Instrumentos financieros
- **Mercado**: Mercados financieros
- **Ejercicio**: Ejercicios contables
- **TipoAgregacion**: Tipos de agregación (MANUAL (FACTORES), MANUAL (MONTO))

## 🌐 API Endpoints

### Autenticación
- `POST /api/auth/token/` - Obtener tokens JWT
- `POST /api/auth/token/refresh/` - Refrescar token de acceso
- `POST /api/auth/token/verify/` - Verificar token
- `GET /api/auth/admin-login-token/` - Obtener token para acceso al admin

### Calificaciones
- `GET /api/calificaciones/calificaciones/` - Listar calificaciones
- `POST /api/calificaciones/calificaciones/` - Crear calificación
- `GET /api/calificaciones/calificaciones/{id}/` - Obtener calificación
- `PUT /api/calificaciones/calificaciones/{id}/` - Actualizar calificación
- `DELETE /api/calificaciones/calificaciones/{id}/` - Eliminar calificación

### Catálogos
- `GET /api/calificaciones/mercados/` - Listar mercados
- `GET /api/calificaciones/instrumentos/` - Listar instrumentos
- `GET /api/calificaciones/ejercicios/` - Listar ejercicios
- `GET /api/calificaciones/tipos-agregacion/` - Listar tipos de agregación

### Dashboard Administrativo
- `GET /admin/dashboard-stats/` - Estadísticas para el dashboard (requiere autenticación de staff)

## 🛠️ Comandos Útiles

### Backend

```bash
# Crear migraciones
python manage.py makemigrations

# Aplicar migraciones
python manage.py migrate

# Crear superusuario
python manage.py createsuperuser

# Ejecutar servidor de desarrollo
python manage.py runserver

# Ejecutar servidor en puerto específico
python manage.py runserver 8000

# Acceder al shell de Django
python manage.py shell

# Recopilar archivos estáticos
python manage.py collectstatic
```

### Frontend

```bash
# Instalar dependencias
npm install

# Servidor de desarrollo
npm run dev

# Build para producción
npm run build

# Preview del build de producción
npm run preview

# Ejecutar linter
npm run lint
```

## 📊 Funcionalidades del Sistema

### Gestión de Calificaciones

- **Ingreso por Factores**: Ingreso directo de los 30 factores (Factor_8 a Factor_37)
- **Ingreso por Montos**: Ingreso de montos que se calculan automáticamente a factores
- **Carga Masiva**: Carga de calificaciones mediante archivos CSV
- **Modificación**: Edición de calificaciones existentes
- **Eliminación**: Eliminación de calificaciones con confirmación

### Dashboard Administrativo

- **Estadísticas**: Métricas clave del sistema
- **Gráficos**: Visualización de datos mediante Chart.js
  - Calificaciones por mes
  - Distribución por tipo de agregación
  - Calificaciones por mercado
  - Calificaciones por año
- **Tabla de calificaciones recientes**: Últimas calificaciones ingresadas

### Filtros y Búsqueda

- Filtrado por ejercicio
- Filtrado por instrumento
- Filtrado por fecha de pago
- Filtrado por descripción
- Filtrado por mercado
- Filtrado por tipo de agregación
- Filtrado por secuencia de evento

## 🔒 Variables de Entorno

Para producción, se recomienda usar variables de entorno. Crea un archivo `.env` en `Nuam_Backend/`:

```env
SECRET_KEY=tu_secret_key_aqui
DEBUG=False
ALLOWED_HOSTS=localhost,127.0.0.1,tu-dominio.com
DATABASE_URL=postgresql://usuario:contraseña@localhost:5432/nuam_db
```

Luego, en `settings.py`, usa `python-decouple` o `django-environ` para cargar las variables.

## 🧪 Testing

### Backend

```bash
# Ejecutar tests
python manage.py test

# Ejecutar tests de una app específica
python manage.py test core
python manage.py test calificaciones
```

### Frontend

```bash
# Ejecutar tests (si están configurados)
npm test
```

## 📦 Despliegue

### Backend (Django)

1. **Configura las variables de entorno de producción**
2. **Configura una base de datos PostgreSQL**
3. **Recopila los archivos estáticos:**
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

## 🐛 Solución de Problemas

### Error: "ModuleNotFoundError"

**Solución**: Asegúrate de tener el entorno virtual activado y las dependencias instaladas:
```bash
pip install -r requirements.txt
```

### Error: "Port already in use"

**Solución**: Cambia el puerto del servidor:
```bash
# Backend
python manage.py runserver 8001

# Frontend (en vite.config.js)
server: {
  port: 5174
}
```

### Error: "CORS policy"

**Solución**: Verifica que `django-cors-headers` esté instalado y configurado en `settings.py`.

### Error: "Token expired"

**Solución**: El token JWT expira después de 60 minutos. El sistema debería refrescar automáticamente, pero si no, cierra sesión e inicia sesión nuevamente.

## 📄 Licencia

Este proyecto es parte de un Proyecto Integrado académico desarrollado para INACAP.

## 👥 Autores

- **Duarte Benjamin**
- **Medina Cristobal**
- **Villalobos Patricio**

## 📞 Soporte

Para problemas o preguntas relacionadas con el proyecto, contacta al equipo de desarrollo.

---

**Versión**: 1.0.0  
**Última actualización**: 2025  
**Estado**: En producción
