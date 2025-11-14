@echo off
REM Script de inicio automático para Windows
REM NUAM - Sistema de Gestión de Calificaciones Tributarias

echo ================================================
echo   Iniciando NUAM
echo   Sistema de Gestión de Calificaciones Tributarias
echo ================================================
echo.

REM Verificar que el entorno virtual existe
if not exist "Nuam_Backend\Ambiente" (
    echo [WARNING] El entorno virtual no existe. Ejecuta install.bat primero.
    pause
    exit /b 1
)

REM Iniciar Backend en una nueva ventana
echo [INFO] Iniciando servidor backend (Django)...
start "NUAM Backend" cmd /k "cd Nuam_Backend && Ambiente\Scripts\activate && python manage.py runserver"

REM Esperar un momento para que el backend inicie
timeout /t 3 /nobreak >nul

REM Iniciar Frontend en una nueva ventana
echo [INFO] Iniciando servidor frontend (React)...
start "NUAM Frontend" cmd /k "cd NUAM && npm run dev"

echo.
echo [INFO] Servidores iniciados:
echo   - Backend: http://localhost:8000
echo   - Frontend: http://localhost:5173
echo.
echo [INFO] Las ventanas de los servidores están abiertas.
echo [INFO] Cierra las ventanas para detener los servidores.
echo.
pause

