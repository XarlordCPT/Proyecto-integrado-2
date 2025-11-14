#!/bin/bash

# Script de instalación automática para Linux/Mac
# NUAM - Sistema de Gestión de Calificaciones Tributarias

set -e  # Salir si hay algún error

echo "================================================"
echo "  Instalación de NUAM"
echo "  Sistema de Gestión de Calificaciones Tributarias"
echo "================================================"
echo ""

# Colores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Función para imprimir mensajes
print_info() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

# Verificar Python
print_info "Verificando Python..."
if ! command -v python3 &> /dev/null; then
    print_error "Python 3 no está instalado. Por favor, instala Python 3.8 o superior."
    exit 1
fi

PYTHON_VERSION=$(python3 --version | cut -d' ' -f2 | cut -d'.' -f1,2)
print_info "Python version: $(python3 --version)"

# Verificar Node.js
print_info "Verificando Node.js..."
if ! command -v node &> /dev/null; then
    print_error "Node.js no está instalado. Por favor, instala Node.js 16 o superior."
    exit 1
fi

NODE_VERSION=$(node --version)
print_info "Node.js version: $NODE_VERSION"

# Verificar npm
print_info "Verificando npm..."
if ! command -v npm &> /dev/null; then
    print_error "npm no está instalado. Por favor, instala npm."
    exit 1
fi

print_info "npm version: $(npm --version)"
echo ""

# Instalación del Backend
print_info "================================================"
print_info "Instalando Backend (Django)"
print_info "================================================"

cd Nuam_Backend

# Crear entorno virtual si no existe
if [ ! -d "Ambiente" ]; then
    print_info "Creando entorno virtual..."
    python3 -m venv Ambiente
else
    print_warning "El entorno virtual ya existe. Se usará el existente."
fi

# Activar entorno virtual
print_info "Activando entorno virtual..."
source Ambiente/bin/activate

# Actualizar pip
print_info "Actualizando pip..."
pip install --upgrade pip

# Instalar dependencias
print_info "Instalando dependencias de Python..."
pip install -r requirements.txt

# Realizar migraciones
print_info "Realizando migraciones de la base de datos..."
python manage.py migrate

print_info "Backend instalado correctamente."
echo ""

# Desactivar entorno virtual
deactivate

# Volver al directorio raíz
cd ..

# Instalación del Frontend
print_info "================================================"
print_info "Instalando Frontend (React)"
print_info "================================================"

cd NUAM

# Instalar dependencias
print_info "Instalando dependencias de Node.js..."
npm install

print_info "Frontend instalado correctamente."
echo ""

# Volver al directorio raíz
cd ..

# Resumen
echo "================================================"
print_info "Instalación completada exitosamente!"
echo "================================================"
echo ""
print_info "Próximos pasos:"
echo "  1. Para iniciar el backend:"
echo "     cd Nuam_Backend"
echo "     source Ambiente/bin/activate"
echo "     python manage.py runserver"
echo ""
echo "  2. Para iniciar el frontend:"
echo "     cd NUAM"
echo "     npm run dev"
echo ""
echo "  3. O usa el script de inicio automático:"
echo "     chmod +x start.sh"
echo "     ./start.sh"
echo ""
print_info "¡Listo para comenzar!"

