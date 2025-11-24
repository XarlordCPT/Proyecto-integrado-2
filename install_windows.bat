@echo off
setlocal enabledelayedexpansion

TITLE Instalador Automatizado NUAM

echo ===================================================
echo    INSTALADOR AUTOMATICO DEL PROYECTO NUAM
echo ===================================================
echo.

:: 1. Verificaciones previas
echo [1/5] Verificando requisitos del sistema...
where python >nul 2>nul
if %errorlevel% neq 0 (
    echo [ERROR] Python no esta instalado o no esta en el PATH.
    echo Por favor, instala Python desde https://www.python.org/downloads/
    echo Asegurate de marcar la casilla "Add Python to PATH" durante la instalacion.
    pause
    exit /b
)
where npm >nul 2>nul
if %errorlevel% neq 0 (
    echo [ERROR] Node.js/NPM no esta instalado.
    echo Por favor, instala Node.js LTS desde https://nodejs.org/
    pause
    exit /b
)
echo Requisitos encontrados.
echo.

:: 2. Configuración del Backend
echo [2/5] Configurando Backend (Django)...
cd Nuam_Backend

if not exist "Ambiente" (
    echo    - Creando entorno virtual 'Ambiente'...
    python -m venv Ambiente
    if !errorlevel! neq 0 (
        echo [ERROR] No se pudo crear el entorno virtual.
        pause
        exit /b
    )
) else (
    echo    - Entorno virtual ya existe.
)

echo    - Activando entorno virtual...
call Ambiente\Scripts\activate

echo    - Instalando dependencias de Python...
pip install --upgrade pip >nul
pip install -r requirements.txt >nul
if %errorlevel% neq 0 (
    echo [ERROR] Fallo al instalar requerimientos de Python.
    pause
    exit /b
)

if not exist ".env" (
    echo    - Creando archivo .env desde ejemplo...
    copy .env.example .env >nul
    echo    [INFO] Archivo .env creado. Recuerda editarlo con tus credenciales de base de datos.
)

echo    - Intentando aplicar migraciones de base de datos...
python manage.py migrate
if %errorlevel% neq 0 (
    echo.
    echo [ADVERTENCIA] Las migraciones fallaron.
    echo Esto es normal si aun no has configurado tu base de datos en el archivo .env
    echo o si el servicio de PostgreSQL no esta corriendo.
    echo.
    echo Puedes continuar, pero recuerda configurar el .env y ejecutar:
    echo    cd Nuam_Backend
    echo    Ambiente\Scripts\activate
    echo    python manage.py migrate
    echo antes de iniciar el servidor.
    echo.
    pause
)

:: Desactivar venv y volver a raiz
deactivate
cd ..
echo.

:: 3. Configuración del Frontend
echo [3/5] Configurando Frontend (React/Vite)...
cd NUAM

if not exist "node_modules" (
    echo    - Instalando dependencias de Node (esto puede tardar)...
    call npm install
    if !errorlevel! neq 0 (
        echo [ERROR] Fallo al instalar dependencias de Node.
        pause
        exit /b
    )
) else (
    echo    - node_modules ya existe, saltando instalacion.
)

cd ..
echo.

echo ===================================================
echo    INSTALACION COMPLETADA
echo ===================================================
echo.
echo Para ejecutar el proyecto necesitaras dos terminales:
echo.
echo Terminal 1 (Backend):
echo    cd Nuam_Backend
echo    Ambiente\Scripts\activate
echo    python manage.py runserver
echo.
echo Terminal 2 (Frontend):
echo    cd NUAM
echo    npm run dev
echo.
pause