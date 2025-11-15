// Configuración de endpoints del backend Django
// Backend corre en: http://localhost:8000
// Para cambiar: crear archivo .env con VITE_API_BASE_URL=https://tu-backend.com
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

export const API_ENDPOINTS = {
  // Autenticación - Backend: Nuam_Backend/core/views.py y urls.py
  AUTH: {
    LOGIN: `${API_BASE_URL}/api/auth/token/`,
    REFRESH: `${API_BASE_URL}/api/auth/token/refresh/`,
    VERIFY: `${API_BASE_URL}/api/auth/token/verify/`,
    ADMIN_LOGIN_TOKEN: `${API_BASE_URL}/api/auth/admin-login-token/`,
    PASSWORD_RESET_REQUEST: `${API_BASE_URL}/api/auth/password-reset/request/`,
    PASSWORD_RESET_VALIDATE: `${API_BASE_URL}/api/auth/password-reset/validate/`,
    PASSWORD_RESET_VERIFY: `${API_BASE_URL}/api/auth/password-reset/verify/`,
    PROFILE: `${API_BASE_URL}/api/auth/profile/`,
  },
  // Calificaciones - Backend: Nuam_Backend/calificaciones/views.py y urls.py
  CALIFICACIONES: {
    BASE: `${API_BASE_URL}/api/calificaciones/calificaciones/`,
    MERCADOS: `${API_BASE_URL}/api/calificaciones/mercados/`,
    TIPOS_AGREGACION: `${API_BASE_URL}/api/calificaciones/tipos-agregacion/`,
    EJERCICIOS: `${API_BASE_URL}/api/calificaciones/ejercicios/`,
    INSTRUMENTOS: `${API_BASE_URL}/api/calificaciones/instrumentos/`,
    CARGAR_CSV: `${API_BASE_URL}/api/calificaciones/calificaciones/cargar_csv/`,
  },
};

