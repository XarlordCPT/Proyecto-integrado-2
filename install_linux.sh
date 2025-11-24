#!/bin/bash

# Detener el script si ocurre un error
set -e

echo "==================================================="
echo "   INSTALADOR AUTOMATICO DEL PROYECTO NUAM (Linux/Mac)"
echo "==================================================="
echo ""

# 1. Verificaciones
echo "[1/5] Verificando requisitos..."
if ! command -v python3 &> /dev/null; then
    echo "[ERROR] Python3 no está instalado."
    echo "-------------------------------------------------------"
    echo "Para instalarlo:"
    echo "  Ubuntu/Debian: sudo apt install python3 python3-venv python3-pip"
    echo "  Fedora:        sudo dnf install python3"
    echo "-------------------------------------------------------"
    exit 1
fi

if ! command -v npm &> /dev/null; then
    echo "[ERROR] NPM (Node.js) no está instalado."
    echo "-------------------------------------------------------"
    echo "Para instalarlo:"
    echo "  Ubuntu/Debian: sudo apt update && sudo apt install nodejs npm"
    echo "  Fedora:        sudo dnf install nodejs npm"
    echo ""
    echo "O recomendado (usando NVM, funciona en cualquier distro):"
    echo "  curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash"
    echo "  source ~/.bashrc"
    echo "  nvm install --lts"
    echo "-------------------------------------------------------"
    exit 1
fi
echo "Requisitos encontrados."
echo ""

# 2. Backend
echo "[2/5] Configurando Backend (Django)..."
cd Nuam_Backend

if [ ! -d "Ambiente" ]; then
    echo "   - Creando entorno virtual 'Ambiente'..."
    python3 -m venv Ambiente
else
    echo "   - Entorno virtual ya existe."
fi

echo "   - Activando entorno virtual e instalando dependencias..."
source Ambiente/bin/activate
pip install --upgrade pip > /dev/null
pip install -r requirements.txt

if [ ! -f ".env" ]; then
    echo "   - Creando archivo .env..."
    cp .env.example .env
fi

echo "   - Aplicando migraciones..."
# Intentar migrar, pero no detener el script si falla la conexión a DB (común en primera instalación)
python3 manage.py migrate || echo "[ADVERTENCIA] No se pudieron aplicar migraciones. Revisa tu configuración de PostgreSQL en .env"

deactivate
cd ..
echo ""

# 3. Frontend
echo "[3/5] Configurando Frontend (React)..."
cd NUAM

echo "   - Instalando dependencias de Node..."
npm install

cd ..
echo ""

echo "==================================================="
echo "   INSTALACION COMPLETADA"
echo "==================================================="
echo ""
echo "Para ejecutar:"
echo "1. Backend: cd Nuam_Backend && source Ambiente/bin/activate && python3 manage.py runserver"
echo "2. Frontend: cd NUAM && npm run dev"
echo ""