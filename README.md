# NUAM - Sistema de Calificaciones Financieras

Sistema web full-stack para la gestión de calificaciones financieras, desarrollado como Proyecto Integrado 2.

## 📋 Descripción

NUAM es una aplicación web que permite gestionar calificaciones financieras, instrumentos, factores y ejercicios. El sistema cuenta con autenticación basada en JWT, roles de usuario y funcionalidades CRUD completas.

## 🏗️ Arquitectura

El proyecto está dividido en dos partes principales:

- **Backend**: API REST desarrollada con Django y Django REST Framework
- **Frontend**: Interfaz de usuario desarrollada con React, Vite, Tailwind CSS y Ant Design

## 🚀 Tecnologías Utilizadas

### Backend
- **Django** 5.2.7
- **Django REST Framework**
- **Django REST Framework Simple JWT** - Autenticación con tokens JWT
- **Django CORS Headers** - Manejo de CORS
- **Djoser** - Autenticación de usuarios
- **psycopg2-binary** - Adaptador PostgreSQL (opcional, actualmente usando SQLite)

### Frontend
- **React** 19.1.1
- **Vite** 7.1.7
- **React Router DOM** 7.9.5
- **Tailwind CSS** 4.1.17
- **Ant Design** 5.28.0
- **React Data Table Component** 7.7.0
- **PapaParse** 5.5.3 - Para procesamiento de CSV

## 📁 Estructura del Proyecto

```
Proyecto integrado 2/
├── Nuam_Backend/          # Backend Django
│   ├── core/             # App de usuarios y autenticación
│   ├── calificaciones/   # App de calificaciones
│   ├── Nuam_Backend/     # Configuración del proyecto
│   ├── manage.py
│   └── requirements.txt
├── NUAM/                 # Frontend React
│   ├── src/
│   │   ├── components/   # Componentes reutilizables
│   │   ├── pages/        # Páginas principales
│   │   ├── routes/       # Configuración de rutas
│   │   └── data/         # Datos estáticos
│   └── package.json
└── README.md
```

## 🔧 Instalación y Configuración

### Prerrequisitos

- Python 3.8 o superior
- Node.js 16 o superior
- PostgreSQL (opcional, actualmente usando SQLite)

### Backend

1. Navega a la carpeta del backend:
```bash
cd Nuam_Backend
```

2. Crea un entorno virtual (recomendado):
```bash
python -m venv Ambiente
```

3. Activa el entorno virtual:
   - **Windows:**
     ```bash
     Ambiente\Scripts\activate
     ```
   - **Linux/Mac:**
     ```bash
     source Ambiente/bin/activate
     ```

4. Instala las dependencias:
```bash
pip install -r requirements.txt
```

5. Realiza las migraciones:
```bash
python manage.py migrate
```

6. Crea un superusuario (opcional):
```bash
python manage.py createsuperuser
```

7. Inicia el servidor de desarrollo:
```bash
python manage.py runserver
```

El backend estará disponible en `http://localhost:8000`

### Frontend

1. Navega a la carpeta del frontend:
```bash
cd NUAM
```

2. Instala las dependencias:
```bash
npm install
```

3. Inicia el servidor de desarrollo:
```bash
npm run dev
```

El frontend estará disponible en `http://localhost:3000` (o el puerto que Vite asigne)

## 🗄️ Base de Datos

Actualmente el proyecto está configurado para usar **SQLite** por defecto. Para cambiar a PostgreSQL:

1. Crea una base de datos en PostgreSQL
2. Actualiza la configuración en `Nuam_Backend/Nuam_Backend/settings.py`:
```python
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'nombre_base_datos',
        'USER': 'usuario',
        'PASSWORD': 'contraseña',
        'HOST': 'localhost',
        'PORT': '5432',
    }
}
```

**Nota:** Se recomienda usar un usuario de PostgreSQL sin caracteres especiales (como acentos) para evitar problemas de codificación en Windows.

## 🔐 Autenticación

El sistema utiliza autenticación basada en JWT (JSON Web Tokens). Los endpoints principales son:

- `POST /auth/token/login/` - Iniciar sesión
- `POST /auth/token/logout/` - Cerrar sesión
- `POST /auth/users/` - Registrar nuevo usuario

## 📝 Modelos Principales

### Core (Usuarios)
- **Usuario**: Usuarios del sistema (extiende AbstractUser)
- **Empleado**: Información de empleados
- **Rol**: Roles del sistema

### Calificaciones
- **Calificacion**: Calificaciones financieras
- **Instrumento**: Instrumentos financieros
- **Factor**: Factores de actualización
- **Mercado**: Mercados financieros
- **Ejercicio**: Ejercicios contables
- **TipoAgregacion**: Tipos de agregación

## 🛠️ Comandos Útiles

### Backend
```bash
# Crear migraciones
python manage.py makemigrations

# Aplicar migraciones
python manage.py migrate

# Crear superusuario
python manage.py createsuperuser

# Ejecutar servidor
python manage.py runserver

# Acceder al shell de Django
python manage.py shell
```

### Frontend
```bash
# Instalar dependencias
npm install

# Servidor de desarrollo
npm run dev

# Build para producción
npm run build

# Preview del build
npm run preview

# Linter
npm run lint
```

## 🌐 API Endpoints

Los endpoints de la API están documentados en:
- Backend: `http://localhost:8000/api/`
- Admin de Django: `http://localhost:8000/admin/`

## 📦 Dependencias Principales

### Backend (requirements.txt)
```
Django>=5.2.7
djangorestframework
djangorestframework-simplejwt
django-cors-headers
djoser
psycopg2-binary>=2.9.9
```

### Frontend (package.json)
Ver `NUAM/package.json` para la lista completa de dependencias.

## 🔒 Variables de Entorno

Para producción, se recomienda usar variables de entorno para:

- `SECRET_KEY` de Django
- Credenciales de base de datos
- Configuraciones sensibles

Crea un archivo `.env` en `Nuam_Backend/` y usa `python-decouple` o similar para cargarlo.

## 📄 Licencia

Este proyecto es parte de un Proyecto Integrado académico.

## 👥 Autores

Desarrollado como Proyecto Integrado 3.

## 📞 Soporte

Para problemas o preguntas, contacta al equipo de desarrollo.

---

**Nota:** Este proyecto está en desarrollo activo. Algunas funcionalidades pueden estar en construcción.

