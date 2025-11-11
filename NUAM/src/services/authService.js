import { API_ENDPOINTS } from '../config/api';

/**
 * Servicio para manejar la autenticación con el backend
 */
class AuthService {
  /**
   * Realiza el login y guarda los tokens
   * @param {string} username - Nombre de usuario
   * @param {string} password - Contraseña
   * @returns {Promise<{access: string, refresh: string}>}
   */
  async login(username, password) {
    try {
      const response = await fetch(API_ENDPOINTS.AUTH.LOGIN, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.detail || 'Credenciales inválidas');
      }

      const data = await response.json();
      
      // Guardar tokens en localStorage
      localStorage.setItem('access_token', data.access);
      localStorage.setItem('refresh_token', data.refresh);
      
      return data;
    } catch (error) {
      console.error('Error en login:', error);
      throw error;
    }
  }

  /**
   * Obtiene el token de acceso almacenado
   * @returns {string|null}
   */
  getAccessToken() {
    return localStorage.getItem('access_token');
  }

  /**
   * Obtiene el token de refresh almacenado
   * @returns {string|null}
   */
  getRefreshToken() {
    return localStorage.getItem('refresh_token');
  }

  /**
   * Verifica si el usuario está autenticado
   * @returns {boolean}
   */
  isAuthenticated() {
    return !!this.getAccessToken();
  }

  /**
   * Refresca el token de acceso
   * @returns {Promise<string>}
   */
  async refreshAccessToken() {
    const refreshToken = this.getRefreshToken();
    
    if (!refreshToken) {
      throw new Error('No hay token de refresh disponible');
    }

    try {
      const response = await fetch(API_ENDPOINTS.AUTH.REFRESH, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refresh: refreshToken }),
      });

      if (!response.ok) {
        throw new Error('Error al refrescar el token');
      }

      const data = await response.json();
      localStorage.setItem('access_token', data.access);
      
      return data.access;
    } catch (error) {
      console.error('Error al refrescar token:', error);
      this.logout();
      throw error;
    }
  }

  /**
   * Cierra la sesión y elimina los tokens
   */
  logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  }

  /**
   * Obtiene el header de autorización para las peticiones
   * @returns {Object}
   */
  getAuthHeaders() {
    const token = this.getAccessToken();
    return {
      'Authorization': token ? `Bearer ${token}` : '',
      'Content-Type': 'application/json',
    };
  }
}

export default new AuthService();

