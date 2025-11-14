#!/bin/bash

# Script de inicio automático para Linux/Mac
# NUAM - Sistema de Gestión de Calificaciones Tributarias

set -e  # Salir si hay algún error

echo "================================================"
echo "  Iniciando NUAM"
echo "  Sistema de Gestión de Calificaciones Tributarias"
echo "================================================"
echo ""

# Colores para output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

print_info() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

# Función para limpiar procesos al salir
cleanup() {
    print_info "Deteniendo servidores..."
    kill $BACKEND_PID $FRONTEND_PID 2>/dev/null || true
    exit
}

trap cleanup SIGINT SIGTERM

# Verificar que el entorno virtual existe
if [ ! -d "Nuam_Backend/Ambiente" ]; then
    print_warning "El entorno virtual no existe. Ejecuta install.sh primero."
    exit 1
fi

# Iniciar Backend
print_info "Iniciando servidor backend (Django)..."
cd Nuam_Backend
source Ambiente/bin/activate
python manage.py runserver > ../backend.log 2>&1 &
BACKEND_PID=$!
cd ..

# Esperar un momento para que el backend inicie
sleep 3

# Iniciar Frontend
print_info "Iniciando servidor frontend (React)..."
cd NUAM
npm run dev > ../frontend.log 2>&1 &
FRONTEND_PID=$!
cd ..

print_info "Servidores iniciados:"
print_info "  - Backend: http://localhost:8000"
print_info "  - Frontend: http://localhost:5173"
echo ""
print_info "Presiona Ctrl+C para detener los servidores"
echo ""

# Esperar a que los procesos terminen
wait

