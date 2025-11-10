# 🚀 Guía para Subir el Proyecto a GitHub

Esta guía te ayudará a subir tu proyecto NUAM a GitHub paso a paso.

## 📋 Pasos Previos

1. **Asegúrate de tener Git instalado**
   ```bash
   git --version
   ```

2. **Crea una cuenta en GitHub** (si no la tienes)
   - Ve a https://github.com
   - Crea una cuenta nueva

## 🔧 Configuración Inicial de Git

### 1. Configurar tu identidad (si no lo has hecho antes)

```bash
git config --global user.name "Tu Nombre"
git config --global user.email "tu.email@ejemplo.com"
```

### 2. Inicializar el repositorio Git

Abre una terminal en la carpeta raíz del proyecto (`Proyecto integrado 2`) y ejecuta:

```bash
cd "c:\Users\Xarlord\Desktop\Proyecto integrado 2"
git init
```

## 📝 Crear el Repositorio en GitHub

1. Ve a https://github.com y haz clic en el botón **"New"** o **"+"** → **"New repository"**
2. Completa los campos:
   - **Repository name**: `nuam-calificaciones` (o el nombre que prefieras)
   - **Description**: "Sistema de gestión de calificaciones financieras - Proyecto Integrado 2"
   - **Visibility**: Elige **Public** o **Private**
   - **NO marques** "Initialize this repository with a README" (ya tenemos uno)
3. Haz clic en **"Create repository"**

## 📤 Subir el Código a GitHub

### 1. Agregar todos los archivos

```bash
git add .
```

### 2. Verificar qué archivos se van a subir

```bash
git status
```

**Importante:** Verifica que NO aparezcan:
- `db.sqlite3`
- `node_modules/`
- `Ambiente/` (entorno virtual)
- `Credencialposgre.txt`
- Archivos `.pyc` o `__pycache__/`

Si aparecen, verifica que el `.gitignore` esté funcionando correctamente.

### 3. Hacer el primer commit

```bash
git commit -m "Initial commit: Proyecto NUAM - Sistema de calificaciones financieras"
```

### 4. Conectar con el repositorio remoto

Reemplaza `TU_USUARIO` y `NOMBRE_REPOSITORIO` con tus datos:

```bash
git remote add origin https://github.com/TU_USUARIO/NOMBRE_REPOSITORIO.git
```

Por ejemplo:
```bash
git remote add origin https://github.com/xarlord/nuam-calificaciones.git
```

### 5. Subir el código

```bash
git branch -M main
git push -u origin main
```

Te pedirá tus credenciales de GitHub. Si tienes autenticación de dos factores habilitada, necesitarás crear un **Personal Access Token** en lugar de usar tu contraseña.

## 🔑 Crear Personal Access Token (si es necesario)

1. Ve a GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Haz clic en **"Generate new token"**
3. Selecciona los permisos: `repo` (acceso completo a repositorios)
4. Genera el token y **cópialo** (solo se muestra una vez)
5. Úsalo como contraseña cuando Git te la pida

## ✅ Verificar que Todo se Subió Correctamente

1. Ve a tu repositorio en GitHub
2. Verifica que aparezcan:
   - ✅ README.md
   - ✅ Carpeta `Nuam_Backend/`
   - ✅ Carpeta `NUAM/`
   - ✅ Archivo `.gitignore`
3. Verifica que **NO** aparezcan:
   - ❌ `db.sqlite3`
   - ❌ `node_modules/`
   - ❌ `Ambiente/`
   - ❌ `Credencialposgre.txt`

## 🔄 Comandos Útiles para el Futuro

### Ver el estado de los archivos
```bash
git status
```

### Agregar cambios específicos
```bash
git add archivo.py
# o para agregar todos los cambios
git add .
```

### Hacer commit de cambios
```bash
git commit -m "Descripción de los cambios"
```

### Subir cambios a GitHub
```bash
git push
```

### Ver el historial de commits
```bash
git log
```

### Crear una nueva rama
```bash
git checkout -b nombre-rama
```

### Cambiar de rama
```bash
git checkout main
```

## 🛠️ Solución de Problemas

### Error: "fatal: remote origin already exists"
```bash
git remote remove origin
git remote add origin https://github.com/TU_USUARIO/NOMBRE_REPOSITORIO.git
```

### Error: "failed to push some refs"
```bash
git pull origin main --allow-unrelated-histories
git push -u origin main
```

### Si subiste archivos que no deberían estar
1. Elimínalos del `.gitignore` si no están
2. Elimínalos del repositorio:
```bash
git rm --cached archivo.txt
git commit -m "Remove archivo.txt"
git push
```

## 📚 Recursos Adicionales

- [Documentación oficial de Git](https://git-scm.com/doc)
- [Guía de GitHub](https://guides.github.com/)
- [GitHub Desktop](https://desktop.github.com/) - Interfaz gráfica (opcional)

---

¡Listo! Tu proyecto ya está en GitHub 🎉

