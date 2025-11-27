# NUAM - Sistema de Gestión de Calificaciones Tributarias

Sistema web full-stack para la gestión integral de calificaciones tributarias. Permite administrar calificaciones financieras, instrumentos, factores de actualización, ejercicios contables y usuarios con roles diferenciados.

## Usuario de ejemplo

Usuario: Nuamuser
Contraseña: Contraseña123

# Esto es un usuario de ejemplo para poder probar el sistema.

## 📋 Prerrequisitos

Antes de comenzar, necesitas tener instalado:

- **Python 3.8 o superior** - [Descargar Python](https://www.python.org/downloads/)
- **Node.js 16 o superior** - [Descargar Node.js](https://nodejs.org/) (recomendado LTS)
- **npm** - Viene incluido con Node.js
- **PostgreSQL** - Ya configurado en el proyecto

### Verificar que tienes todo instalado

Abre una terminal (PowerShell/CMD en Windows, Terminal en Linux/Mac) y ejecuta:

```bash
python --version    # Debe mostrar Python 3.8 o superior
node --version      # Debe mostrar v16 o superior
npm --version       # Debe mostrar la versión de npm
```

Si alguno no está instalado, descarga e instala desde los enlaces de arriba.

**⚠️ IMPORTANTE en Windows:** Al instalar Python, marca la opción **"Add Python to PATH"**.

---

## ⚡ Instalación Automática

Esta es la forma más rápida de instalar el proyecto.

### ⚠️ Antes de comenzar
1. **Asegúrate de tener Python y Node.js instalados** (ver sección Prerrequisitos).
2. **Configura tu archivo .env**:
   - Ve a la carpeta `Nuam_Backend`.
   - Copia `.env.example` a un nuevo archivo llamado `.env`.
   - Edita `.env` y coloca tus credenciales de base de datos (PostgreSQL) y tus credenciales de correo electrónico para envío de correos de recuperación de contraseña (Gmail).
   - *Nota: Si no haces esto, el instalador creará el archivo por ti, pero las migraciones de base de datos fallarán hasta que pongas las credenciales correctas.*

### Ejecutar el instalador

#### Windows
Simplemente haz doble clic en el archivo **`install_windows.bat`** o ejecútalo desde la terminal:
```bash
.\install_windows.bat
```

#### Linux / Mac
Da permisos de ejecución y corre el script:
```bash
chmod +x install_linux.sh
./install_linux.sh
```

---

## 🛠️ Instalación Manual

### Windows

#### Paso 1: Instalar Backend (Django)

1. Abre PowerShell o CMD en la carpeta del proyecto.

2. Ve a la carpeta del backend:
   ```bash
   cd Nuam_Backend
   ```

3. Crea un entorno virtual de Python:
   ```bash
   python -m venv Ambiente
   ```
   Esto creará una carpeta llamada `Ambiente` con el entorno virtual.

4. Activa el entorno virtual:
   ```bash
   Ambiente\Scripts\activate
   ```
   Verás `(Ambiente)` al inicio de la línea, eso significa que está activado.

5. Actualiza pip:
   ```bash
   python -m pip install --upgrade pip
   ```

6. Instala las dependencias:
   ```bash
   pip install -r requirements.txt
   ```
   Esto tomará varios minutos. Espera a que termine.

7. **Configura las variables de entorno:**
   
   El proyecto usa variables de entorno para proteger credenciales sensibles (base de datos, email, etc.).
   
   a. Copia el archivo de ejemplo:
      ```bash
      # En PowerShell
      Copy-Item .env.example .env
      
      # O en CMD
      copy .env.example .env
      ```
   
   b. Abre el archivo `.env` con tu editor de texto y reemplaza los valores de ejemplo con tus credenciales reales:
      - `SECRET_KEY`: Genera una nueva con: `python -c "from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())"`
      - `DB_PASSWORD`: Tu contraseña de PostgreSQL
      - `DB_HOST`: Tu host de base de datos
      - `EMAIL_HOST_USER`: Tu email para envío de correos
      - `EMAIL_HOST_PASSWORD`: Tu contraseña de aplicación de Gmail
   
   ⚠️ **IMPORTANTE:** El archivo `.env` contiene credenciales sensibles y NO se sube a Git. Solo el archivo `.env.example` (template) se sube al repositorio.

8. Crea las tablas en la base de datos:
   ```bash
   python manage.py migrate
   ```

9. (Opcional) Crea un superusuario para el admin:
   ```bash
   python manage.py createsuperuser
   ```
   Sigue las instrucciones en pantalla.

10. Ve de vuelta a la carpeta raíz:
   ```bash
   cd ..
   ```

#### Paso 2: Instalar Frontend (React)

1. Abre una nueva terminal (PowerShell/CMD) en la carpeta del proyecto.

2. Ve a la carpeta del frontend:
   ```bash
   cd NUAM
   ```

3. Instala las dependencias:
   ```bash
   npm install
   ```
   Esto tomará varios minutos. Espera a que termine.

4. Ya está instalado el frontend. No necesitas hacer nada más.

---

### Linux / Mac

#### Paso 1: Instalar Backend (Django)

1. Abre una terminal en la carpeta del proyecto.

2. Ve a la carpeta del backend:
   ```bash
   cd Nuam_Backend
   ```

3. Crea un entorno virtual de Python:
   ```bash
   python3 -m venv Ambiente
   ```
   Esto creará una carpeta llamada `Ambiente` con el entorno virtual.

4. Activa el entorno virtual:
   ```bash
   source Ambiente/bin/activate
   ```
   Verás `(Ambiente)` al inicio de la línea, eso significa que está activado.

5. Actualiza pip:
   ```bash
   pip install --upgrade pip
   ```

6. Instala las dependencias:
   ```bash
   pip install -r requirements.txt
   ```
   Esto tomará varios minutos. Espera a que termine.

7. **Configura las variables de entorno:**
   
   El proyecto usa variables de entorno para proteger credenciales sensibles (base de datos, email, etc.).
   
   a. Copia el archivo de ejemplo:
      ```bash
      cp .env.example .env
      ```
   
   b. Abre el archivo `.env` con tu editor de texto y reemplaza los valores de ejemplo con tus credenciales reales:
      - `SECRET_KEY`: Genera una nueva con: `python -c "from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())"`
      - `DB_PASSWORD`: Tu contraseña de PostgreSQL
      - `DB_HOST`: Tu host de base de datos
      - `EMAIL_HOST_USER`: Tu email para envío de correos
      - `EMAIL_HOST_PASSWORD`: Tu contraseña de aplicación de Gmail
   
   ⚠️ **IMPORTANTE:** El archivo `.env` contiene credenciales sensibles y NO se sube a Git. Solo el archivo `.env.example` (template) se sube al repositorio.

8. Crea las tablas en la base de datos:
   ```bash
   python manage.py migrate
   ```

9. (Opcional) Crea un superusuario para el admin:
   ```bash
   python manage.py createsuperuser
   ```
   Sigue las instrucciones en pantalla.

10. Ve de vuelta a la carpeta raíz:
   ```bash
   cd ..
   ```

#### Paso 2: Instalar Frontend (React)

1. Abre una nueva terminal en la carpeta del proyecto.

2. Ve a la carpeta del frontend:
   ```bash
   cd NUAM
   ```

3. Instala las dependencias:
   ```bash
   npm install
   ```
   Esto tomará varios minutos. Espera a que termine.

4. Ya está instalado el frontend. No necesitas hacer nada más.

---

## ▶️ Ejecutar el Sistema

Necesitas ejecutar DOS terminales, una para el backend y otra para el frontend.

### Windows

#### Terminal 1 - Backend

1. Abre PowerShell o CMD en la carpeta del proyecto.

2. Ve a la carpeta del backend:
   ```bash
   cd Nuam_Backend
   ```

3. Activa el entorno virtual:
   ```bash
   Ambiente\Scripts\activate
   ```

4. Inicia el servidor de Django:
   ```bash
   python manage.py runserver
   ```

5. Verás algo como:
   ```
   Starting development server at http://127.0.0.1:8000/
   ```

6. **DEJA ESTA TERMINAL ABIERTA.** El servidor está corriendo.

#### Terminal 2 - Frontend

1. Abre una **NUEVA** terminal (PowerShell/CMD) en la carpeta del proyecto.

2. Ve a la carpeta del frontend:
   ```bash
   cd NUAM
   ```

3. Inicia el servidor de desarrollo:
   ```bash
   npm run dev
   ```

4. Verás algo como:
   ```
   VITE v7.1.7  ready in xxx ms
   ➜  Local:   http://localhost:5173/
   ```

5. **DEJA ESTA TERMINAL ABIERTA.** El servidor está corriendo.

6. Abre tu navegador y ve a: **http://localhost:5173**

---

### Linux / Mac

#### Terminal 1 - Backend

1. Abre una terminal en la carpeta del proyecto.

2. Ve a la carpeta del backend:
   ```bash
   cd Nuam_Backend
   ```

3. Activa el entorno virtual:
   ```bash
   source Ambiente/bin/activate
   ```

4. Inicia el servidor de Django:
   ```bash
   python manage.py runserver
   ```

5. Verás algo como:
   ```
   Starting development server at http://127.0.0.1:8000/
   ```

6. **DEJA ESTA TERMINAL ABIERTA.** El servidor está corriendo.

#### Terminal 2 - Frontend

1. Abre una **NUEVA** terminal en la carpeta del proyecto.

2. Ve a la carpeta del frontend:
   ```bash
   cd NUAM
   ```

3. Inicia el servidor de desarrollo:
   ```bash
   npm run dev
   ```

4. Verás algo como:
   ```
   VITE v7.1.7  ready in xxx ms
   ➜  Local:   http://localhost:5173/
   ```

5. **DEJA ESTA TERMINAL ABIERTA.** El servidor está corriendo.

6. Abre tu navegador y ve a: **http://localhost:5173**

---

## 🛑 Detener el Sistema

Para detener los servidores:

1. Ve a cada terminal donde está corriendo un servidor.
2. Presiona `Ctrl + C` en cada terminal.
3. Para desactivar el entorno virtual del backend:
   ```bash
   deactivate
   ```

---

## 🔒 Seguridad y Variables de Entorno

### ¿Por qué usar variables de entorno?

El proyecto utiliza variables de entorno para proteger información sensible como:
- Claves secretas de Django
- Credenciales de base de datos
- Contraseñas de email
- Configuraciones de producción

**Nunca subas credenciales reales a Git.** El archivo `.env` está en `.gitignore` y no se sube al repositorio.

### Archivos relacionados

- **`.env.example`**: Template con la estructura de variables (SÍ se sube a Git)
- **`.env`**: Archivo con tus credenciales reales (NO se sube a Git)
- **`settings.py`**: Lee las variables del archivo `.env` usando `python-decouple`

### Variables de entorno requeridas

El archivo `.env` debe contener las siguientes variables (ver `.env.example` para más detalles):

```env
# Django
SECRET_KEY=tu-secret-key-generada
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1

# Base de datos PostgreSQL
DB_NAME=postgres
DB_USER=postgres
DB_PASSWORD=tu-password
DB_HOST=tu-host.supabase.co
DB_PORT=5432

# Email SMTP
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USE_TLS=True
EMAIL_HOST_USER=tu-email@gmail.com
EMAIL_HOST_PASSWORD=tu-app-password
```

### Generar una nueva SECRET_KEY

Si necesitas generar una nueva clave secreta para Django:

```bash
python -c "from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())"
```

### Ubicación del archivo .env

El archivo `.env` debe estar en la carpeta `Nuam_Backend/` (misma ubicación que `manage.py`):

```
Nuam_Backend/
├── manage.py
├── .env          ← Aquí debe estar
├── .env.example  ← Template (se sube a Git)
└── Nuam_Backend/
    └── settings.py  ← Lee el .env de la carpeta de arriba
```

---

## 📁 Estructura del Proyecto

```
Proyecto integrado 2/
│
├── 📂 Nuam_Backend/                    # Backend Django
│   │
│   ├── 📂 core/                        # App de usuarios y autenticación
│   │   ├── models.py                   # Modelos: Usuario, Rol, Empleado
│   │   ├── serializers.py              # Serializers para autenticación JWT
│   │   ├── views.py                    # Endpoints de autenticación (login, password reset, profile)
│   │   ├── urls.py                     # URLs de autenticación (/api/auth/*)
│   │   ├── signals.py                  # Señales Django (asigna is_staff automáticamente)
│   │   ├── admin.py                    # Configuración del admin para usuarios
│   │   └── migrations/                 # Migraciones de base de datos
│   │
│   ├── 📂 calificaciones/              # App de gestión de calificaciones
│   │   ├── models.py                   # Modelos: Calificacion, Factor, Instrumento, Mercado, TipoAgregacion, Ejercicio
│   │   ├── serializers.py              # Serializers para CRUD de calificaciones
│   │   ├── views.py                    # ViewSets para CRUD y endpoint cargar_csv
│   │   ├── urls.py                     # URLs de calificaciones (/api/calificaciones/*)
│   │   ├── admin.py                    # Configuración del admin para calificaciones
│   │   └── migrations/                 # Migraciones de base de datos
│   │
│   ├── 📂 Nuam_Backend/                # Configuración principal del proyecto
│   │   ├── settings.py                 # Configuración Django (DB, CORS, JWT, Email)
│   │   ├── urls.py                     # URLs principales (incluye /api/auth/* y /api/calificaciones/*)
│   │   ├── wsgi.py                     # WSGI para producción
│   │   └── asgi.py                     # ASGI para producción
│   │
│   ├── 📂 templates/                   # Plantillas HTML personalizadas
│   │   └── admin/
│   │       └── index.html              # Dashboard administrativo personalizado
│   │
│   ├── 📂 static/                      # Archivos estáticos
│   │   └── admin/
│   │       ├── css/
│   │       │   └── admin_custom.css    # Estilos personalizados del admin
│   │       └── js/
│   │           └── dashboard.js        # JavaScript del dashboard admin
│   │
│   ├── manage.py                       # Script principal de Django
│   ├── requirements.txt                # Dependencias Python del proyecto
│   ├── db.sqlite3                      # Base de datos SQLite (desarrollo)
│   └── .env.example                    # Ejemplo de variables de entorno
│
└── 📂 NUAM/                            # Frontend React + Vite
    │
    ├── 📂 src/                         # Código fuente del frontend
    │   │
    │   ├── 📂 pages/                   # Páginas principales de la aplicación
    │   │   ├── Login.jsx               # Página de inicio de sesión y recuperación de contraseña
    │   │   ├── Mantenedor.jsx          # Página principal con tabla de calificaciones y filtros
    │   │   └── Perfil.jsx              # Página de perfil del usuario
    │   │
    │   ├── 📂 components/              # Componentes reutilizables
    │   │   ├── Ingresar.jsx            # Modal para ingresar nueva calificación (datos básicos)
    │   │   ├── IngresarFactores.jsx    # Modal para ingresar factores (paso 2)
    │   │   ├── IngresarMontos.jsx      # Modal para ingresar montos que se convierten a factores
    │   │   ├── ModificarCalificacion.jsx # Modal para modificar calificación existente
    │   │   ├── Modificar.jsx           # Componente de modificación de factores
    │   │   ├── Cargar.jsx              # Modal para carga masiva de CSV
    │   │   ├── EliminarConfirm.jsx     # Modal de confirmación para eliminar calificación
    │   │   ├── PrivateRoute.jsx        # Componente para proteger rutas (requiere autenticación)
    │   │   └── UserIcon.jsx            # Icono de usuario
    │   │
    │   ├── 📂 services/                # Servicios para comunicación con la API
    │   │   ├── authService.js          # Servicio de autenticación (login, refresh token, password reset)
    │   │   └── calificacionesService.js # Servicio de calificaciones (CRUD, CSV, catálogos)
    │   │
    │   ├── 📂 context/                 # Context API de React
    │   │   └── AuthContext.jsx         # Contexto de autenticación (usuario, login, logout)
    │   │
    │   ├── 📂 config/                  # Configuración del frontend
    │   │   └── api.js                  # Configuración de endpoints de la API
    │   │
    │   ├── 📂 routes/                  # Configuración de rutas
    │   │   └── AppRouter.jsx           # Router principal de la aplicación
    │   │
    │   ├── 📂 assets/                  # Recursos estáticos
    │   │   ├── Logo_Nuam.png           # Logo de NUAM
    │   │   └── Logo_Inacap.png         # Logo de INACAP
    │   │
    │   ├── 📂 data/                    # Datos estáticos (si aplica)
    │   │   └── calificaciones.js       # Datos de ejemplo
    │   │
    │   ├── App.jsx                     # Componente raíz de la aplicación
    │   ├── App.css                     # Estilos globales de la aplicación
    │   ├── main.jsx                    # Punto de entrada de la aplicación React
    │   └── index.css                   # Estilos base
    │
    ├── public/                         # Archivos públicos
    │   └── vite.svg                    # Icono de Vite
    │
    ├── index.html                      # HTML principal
    ├── package.json                    # Dependencias Node.js y scripts
    ├── vite.config.js                  # Configuración de Vite
    └── eslint.config.js                # Configuración de ESLint
```

## 📝 Descripción Detallada de Archivos

### Backend (Nuam_Backend/)

#### `core/` - Usuarios y Autenticación

**`models.py`**
- Define los modelos de base de datos:
  - `Usuario`: Usuario del sistema (extiende AbstractUser de Django)
  - `Rol`: Roles del sistema (Administrador, Usuario)
  - `Empleado`: Información de empleados (RUT)

**`serializers.py`**
- `MyTokenObtainPairSerializer`: Serializer personalizado para JWT que incluye información del usuario en el token

**`views.py`**
- `MyTokenObtainPairView`: Vista para login y obtener tokens JWT
- `admin_login_token`: Genera token temporal para acceder al admin de Django
- `request_password_reset`: Solicita código de 6 dígitos por email
- `validate_reset_code`: Valida el código antes de cambiar contraseña
- `verify_reset_code`: Cambia la contraseña después de validar código
- `get_user_profile`: Retorna datos del usuario autenticado

**`urls.py`**
- Define todas las URLs de autenticación: `/api/auth/token/`, `/api/auth/password-reset/*`, etc.

**`signals.py`**
- Señales Django que asignan automáticamente `is_staff=True` cuando un usuario tiene rol "Administrador"

**`admin.py`**
- Configuración del panel administrativo de Django para usuarios

---

#### `calificaciones/` - Gestión de Calificaciones

**`models.py`**
- Define los modelos de base de datos:
  - `Calificacion`: Calificación tributaria principal
  - `Factor`: Factores de actualización (Factor_8 a Factor_37)
  - `Instrumento`: Instrumentos financieros
  - `Mercado`: Mercados financieros
  - `TipoAgregacion`: Tipos de agregación (MANUAL, MASIVA, etc.)
  - `Ejercicio`: Ejercicios contables
  - `Reporte`: Logs de acciones del sistema

**`serializers.py`**
- `CalificacionSerializer`: Serializer principal para CRUD de calificaciones
  - Campos de lectura: `usuario`, `tipo_agregacion_info`, `ejercicio_info`, `instrumento_info`
  - Campos de escritura: `tipo_agregacion`, `ejercicio`, `instrumento` (IDs)
  - Maneja creación/actualización de factores relacionados
- Serializers para catálogos: `MercadoSerializer`, `EjercicioSerializer`, `InstrumentoSerializer`, etc.

**`views.py`**
- `MercadoViewSet`, `EjercicioViewSet`, `TipoAgregacionViewSet`, `InstrumentoViewSet`: CRUD para catálogos
- `CalificacionViewSet`: 
  - CRUD estándar de calificaciones
  - `cargar_csv`: Endpoint personalizado para carga masiva desde CSV
- `dashboard_stats`: Endpoint para estadísticas del dashboard admin

**`urls.py`**
- Define todas las URLs de calificaciones: `/api/calificaciones/calificaciones/`, `/api/calificaciones/mercados/`, etc.

**`admin.py`**
- Configuración del panel administrativo de Django para calificaciones

---

#### `Nuam_Backend/` - Configuración Principal

**`settings.py`**
- Configuración completa de Django:
  - Base de datos PostgreSQL
  - REST Framework con JWT
  - CORS (permite peticiones desde frontend)
  - Configuración de email SMTP (Gmail)
  - Modelo de usuario personalizado

**`urls.py`**
- URLs principales del proyecto:
  - `/api/auth/*` → core.urls
  - `/api/calificaciones/*` → calificaciones.urls
  - `/admin/` → Panel administrativo de Django

---

#### `templates/admin/index.html`
- Dashboard administrativo personalizado con gráficos y estadísticas

#### `static/admin/`
- CSS y JavaScript personalizados para el dashboard del admin

---

### Frontend (NUAM/)

#### `src/pages/` - Páginas Principales

**`Login.jsx`**
- Página de inicio de sesión
- Modal de recuperación de contraseña (3 pasos: email, código, nueva contraseña)
- Valida credenciales y maneja errores

**`Mantenedor.jsx`**
- Página principal del sistema
- Tabla de calificaciones con filtros (ejercicio, instrumento, fecha, descripción, mercado, tipo)
- Botones para: Ingresar, Cargar CSV, Modificar, Eliminar
- Panel lateral organizado en secciones (Filtros, Ingreso, Acciones)
- Integra todos los componentes modales

**`Perfil.jsx`**
- Página de perfil del usuario autenticado
- Muestra datos del usuario obtenidos de `/api/auth/profile/`

---

#### `src/components/` - Componentes Reutilizables

**`Ingresar.jsx`**
- Modal para ingresar datos básicos de una calificación
- Campos: ejercicio, mercado, instrumento, fecha pago, secuencia, etc.
- Botones "+ Añadir nuevo" para crear mercados, ejercicios e instrumentos
- Valida datos antes de avanzar a IngresarFactores o IngresarMontos

**`IngresarFactores.jsx`**
- Modal para ingresar los 30 factores directamente (Factor_8 a Factor_37)
- Valida que los factores sean números válidos (>= 0)
- Envía datos al backend para crear la calificación

**`IngresarMontos.jsx`**
- Modal de dos pasos:
  1. Ingresar montos (factores 8-19): valida que al menos uno sea > 0
  2. Ver factores calculados automáticamente (del 8 al 37)
- Permite modificar factores antes de guardar
- Envía datos al backend para crear la calificación

**`ModificarCalificacion.jsx`**
- Modal para modificar una calificación existente
- Carga datos actuales y permite editarlos
- Maneja actualización de factores
- Valida antes de guardar

**`Modificar.jsx`**
- Componente interno para modificar factores de una calificación
- Similar a IngresarFactores pero para edición

**`Cargar.jsx`**
- Modal para carga masiva de CSV
- Permite subir archivo CSV o ingresar datos manualmente
- Muestra ejemplo de formato CSV
- Normaliza datos y los envía al backend
- Muestra resultados (exitosas, errores)

**`EliminarConfirm.jsx`**
- Modal de confirmación antes de eliminar una calificación
- Pide confirmación explícita del usuario

**`PrivateRoute.jsx`**
- Componente wrapper para proteger rutas
- Redirige a login si el usuario no está autenticado
- Usa `AuthContext` para verificar autenticación

**`UserIcon.jsx`**
- Componente de icono de usuario
- Usado en el header de la aplicación

---

#### `src/services/` - Servicios API

**`authService.js`**
- `login()`: Inicia sesión y guarda tokens en localStorage
- `refreshAccessToken()`: Refresca el token de acceso
- `logout()`: Elimina tokens del localStorage
- `requestPasswordReset()`: Solicita código de recuperación
- `validatePasswordResetCode()`: Valida código (paso 2)
- `verifyPasswordReset()`: Cambia contraseña (paso 3)
- `getAuthHeaders()`: Retorna headers con token para peticiones

**`calificacionesService.js`**
- `getCalificaciones()`: Obtiene todas las calificaciones del usuario
- `getCalificacion(id)`: Obtiene una calificación por ID
- `createCalificacion()`: Crea una nueva calificación
- `updateCalificacion(id, data)`: Actualiza una calificación
- `deleteCalificacion(id)`: Elimina una calificación
- `cargarCSV()`: Carga masiva desde CSV
- `getMercados()`, `getEjercicios()`, `getInstrumentos()`, `getTiposAgregacion()`: Obtienen catálogos
- `createMercado()`, `createEjercicio()`, `createInstrumento()`: Crean elementos en catálogos

---

#### `src/context/AuthContext.jsx`
- Context API de React para manejar estado de autenticación global
- Proporciona: `user`, `login()`, `logout()`, `isAuthenticated`
- Decodifica JWT para obtener datos del usuario
- Maneja refresh automático de tokens

---

#### `src/config/api.js`
- Configuración centralizada de todos los endpoints de la API
- Define `API_BASE_URL` (por defecto http://localhost:8000)
- Objeto `API_ENDPOINTS` con todas las URLs organizadas por módulo
- Permite cambiar URL base mediante variable de entorno `VITE_API_BASE_URL`

---

#### `src/routes/AppRouter.jsx`
- Configuración de rutas de la aplicación
- Define rutas públicas y privadas
- Usa `PrivateRoute` para proteger rutas que requieren autenticación

---

#### `src/App.jsx`
- Componente raíz de la aplicación
- Envuelve la app con `AuthProvider` para tener acceso al contexto de autenticación
- Define el router principal

#### `src/main.jsx`
- Punto de entrada de la aplicación React
- Renderiza el componente `App` en el DOM
- Importa estilos globales

---

#### Archivos de Configuración

**`package.json`**
- Define dependencias del proyecto (React, Vite, Tailwind, etc.)
- Scripts: `dev` (desarrollo), `build` (producción), `preview` (preview del build)

**`vite.config.js`**
- Configuración de Vite (build tool)
- Define puerto, proxy, y opciones de desarrollo

**`eslint.config.js`**
- Configuración de ESLint para validar código JavaScript

---

## 🌐 URLs del Sistema

Cuando ambos servidores estén corriendo:

- **Frontend (Aplicación)**: http://localhost:5173
- **Backend (API)**: http://localhost:8000
- **Admin de Django**: http://localhost:8000/admin

---

## 🌐 Endpoints de la API

### Autenticación
- `POST /api/auth/token/` - Login (retorna JWT)
- `POST /api/auth/token/refresh/` - Refrescar token
- `POST /api/auth/password-reset/request/` - Solicitar código recuperación
- `POST /api/auth/password-reset/validate/` - Validar código
- `POST /api/auth/password-reset/verify/` - Cambiar contraseña
- `GET /api/auth/profile/` - Obtener perfil del usuario

### Calificaciones
- `GET /api/calificaciones/calificaciones/` - Listar calificaciones
- `POST /api/calificaciones/calificaciones/` - Crear calificación
- `GET /api/calificaciones/calificaciones/{id}/` - Obtener calificación
- `PUT /api/calificaciones/calificaciones/{id}/` - Actualizar calificación
- `DELETE /api/calificaciones/calificaciones/{id}/` - Eliminar calificación
- `POST /api/calificaciones/calificaciones/cargar_csv/` - Carga masiva CSV

### Catálogos
- `GET/POST /api/calificaciones/mercados/` - Gestión de mercados
- `GET/POST /api/calificaciones/instrumentos/` - Gestión de instrumentos
- `GET/POST /api/calificaciones/ejercicios/` - Gestión de ejercicios
- `GET/POST /api/calificaciones/tipos-agregacion/` - Gestión de tipos

---

## 🐛 Solución de Problemas

### Error: "python no se reconoce como comando" (Windows)

**Solución:** Python no está en el PATH.
1. Reinstala Python desde https://www.python.org/downloads/
2. **IMPORTANTE:** Marca la casilla "Add Python to PATH" durante la instalación
3. Reinicia la terminal

### Error: "ModuleNotFoundError" o "No module named X"

**Solución:** Las dependencias no están instaladas o el entorno virtual no está activado.
1. Asegúrate de estar en la carpeta `Nuam_Backend`
2. Activa el entorno virtual:
   - Windows: `Ambiente\Scripts\activate`
   - Linux/Mac: `source Ambiente/bin/activate`
3. Instala las dependencias: `pip install -r requirements.txt`

### Error: "Port 8000 already in use" (Backend)

**Solución:** El puerto 8000 está siendo usado.
1. Busca qué proceso está usando el puerto y ciérralo, o
2. Usa otro puerto: `python manage.py runserver 8001`
3. Si cambias el puerto, actualiza la URL del backend en `NUAM/src/config/api.js`

### Error: "Port 5173 already in use" (Frontend)

**Solución:** El puerto 5173 está siendo usado.
1. Vite automáticamente usará el puerto 5174, 5175, etc.
2. Sigue las instrucciones en la terminal para la nueva URL

### Error: "npm no se reconoce como comando" (Windows)

**Solución:** Node.js no está instalado o no está en el PATH.
1. Instala Node.js desde https://nodejs.org/ (versión LTS)
2. Reinicia la terminal después de instalar
3. Verifica: `node --version` y `npm --version`

### Error: "CORS policy" en el navegador

**Solución:** El backend no está corriendo o hay un problema de CORS.
1. Verifica que el backend esté corriendo en http://localhost:8000
2. Verifica que `django-cors-headers` esté instalado: `pip list | findstr cors`
3. Si no está, instálalo: `pip install django-cors-headers`

### El entorno virtual no se activa

**Windows:**
```bash
# Si obtienes un error de permisos, ejecuta:
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```
Luego intenta activar de nuevo: `Ambiente\Scripts\activate`

**Linux/Mac:**
```bash
# Si obtienes "Permission denied":
chmod +x Ambiente/bin/activate
source Ambiente/bin/activate
```

---

## 🔐 Primer Uso

1. Abre la aplicación en http://localhost:5173
2. Necesitas un usuario para iniciar sesión
3. Si no tienes un usuario:
   - Ve a http://localhost:8000/admin
   - Inicia sesión con el superusuario que creaste (o crea uno si no lo hiciste)
   - Crea un usuario desde el panel de administración

---

## 📊 Funcionalidades

- ✅ Autenticación con JWT
- ✅ Roles (Administrador, Usuario)
- ✅ CRUD completo de calificaciones
- ✅ Ingreso por factores o montos
- ✅ Carga masiva CSV
- ✅ Filtros avanzados
- ✅ Dashboard administrativo
- ✅ Recuperación de contraseña por email

---

## 👥 Autores

- Duarte Benjamin
- Medina Cristobal
- Villalobos Patricio
- Marina Martinez

---

## 📄 Licencia

Proyecto Integrado académico desarrollado para INACAP.
