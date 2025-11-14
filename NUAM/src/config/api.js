// Configuración de la API
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: `${API_BASE_URL}/api/auth/token/`,
    REFRESH: `${API_BASE_URL}/api/auth/token/refresh/`,
    VERIFY: `${API_BASE_URL}/api/auth/token/verify/`,
    ADMIN_LOGIN_TOKEN: `${API_BASE_URL}/api/auth/admin-login-token/`,
  },
  CALIFICACIONES: {
    BASE: `${API_BASE_URL}/api/calificaciones/calificaciones/`,
    MERCADOS: `${API_BASE_URL}/api/calificaciones/mercados/`,
    TIPOS_AGREGACION: `${API_BASE_URL}/api/calificaciones/tipos-agregacion/`,
    EJERCICIOS: `${API_BASE_URL}/api/calificaciones/ejercicios/`,
    INSTRUMENTOS: `${API_BASE_URL}/api/calificaciones/instrumentos/`,
    CARGAR_CSV: `${API_BASE_URL}/api/calificaciones/calificaciones/cargar_csv/`,
  },
};

