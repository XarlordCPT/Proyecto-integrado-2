@echo off
REM Script de instalación automática para Windows
REM NUAM - Sistema de Gestión de Calificaciones Tributarias

echo ================================================
echo   Instalación de NUAM
echo   Sistema de Gestión de Calificaciones Tributarias
echo ================================================
echo.

REM Verificar Python
echo [INFO] Verificando Python...
python --version >nul 2>&1
if errorlevel 1 (
    echo [ERROR] Python no está instalado. Por favor, instala Python 3.8 o superior.
    pause
    exit /b 1
)
python --version
echo.

REM Verificar Node.js
echo [INFO] Verificando Node.js...
node --version >nul 2>&1
if errorlevel 1 (
    echo [ERROR] Node.js no está instalado. Por favor, instala Node.js 16 o superior.
    pause
    exit /b 1
)
node --version
echo.

REM Verificar npm
echo [INFO] Verificando npm...
npm --version >nul 2>&1
if errorlevel 1 (
    echo [ERROR] npm no está instalado. Por favor, instala npm.
    pause
    exit /b 1
)
npm --version
echo.

REM Instalación del Backend
echo ================================================
echo [INFO] Instalando Backend (Django)
echo ================================================

cd Nuam_Backend

REM Crear entorno virtual si no existe
if not exist "Ambiente" (
    echo [INFO] Creando entorno virtual...
    python -m venv Ambiente
) else (
    echo [WARNING] El entorno virtual ya existe. Se usará el existente.
)

REM Activar entorno virtual
echo [INFO] Activando entorno virtual...
call Ambiente\Scripts\activate.bat

REM Actualizar pip
echo [INFO] Actualizando pip...
python -m pip install --upgrade pip

REM Instalar dependencias
echo [INFO] Instalando dependencias de Python...
pip install -r requirements.txt

REM Realizar migraciones
echo [INFO] Realizando migraciones de la base de datos...
python manage.py migrate

echo [INFO] Backend instalado correctamente.
echo.

REM Desactivar entorno virtual
deactivate

REM Volver al directorio raíz
cd ..

REM Instalación del Frontend
echo ================================================
echo [INFO] Instalando Frontend (React)
echo ================================================

cd NUAM

REM Instalar dependencias
echo [INFO] Instalando dependencias de Node.js...
call npm install

echo [INFO] Frontend instalado correctamente.
echo.

REM Volver al directorio raíz
cd ..

REM Resumen
echo ================================================
echo [INFO] Instalación completada exitosamente!
echo ================================================
echo.
echo [INFO] Próximos pasos:
echo   1. Para iniciar el backend:
echo      cd Nuam_Backend
echo      Ambiente\Scripts\activate
echo      python manage.py runserver
echo.
echo   2. Para iniciar el frontend:
echo      cd NUAM
echo      npm run dev
echo.
echo   3. O usa el script de inicio automático:
echo      start.bat
echo.
echo [INFO] ¡Listo para comenzar!
echo.
pause

