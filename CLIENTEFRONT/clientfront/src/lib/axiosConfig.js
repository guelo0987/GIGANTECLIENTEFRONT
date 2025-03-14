// Configurar axios para incluir tokens CSRF
import axios from 'axios';

axios.defaults.xsrfCookieName = 'csrf_token';
axios.defaults.xsrfHeaderName = 'X-CSRF-Token';
axios.defaults.withCredentials = true;

// Configuración adicional de interceptores para manejo de errores
axios.interceptors.response.use(
  response => response,
  error => {
    // Manejo centralizado de errores
    if (error.response) {
      // Error de respuesta del servidor (status codes fuera del rango 2xx)
      console.error('Error de respuesta:', error.response.status);
      
      // Manejar errores de autenticación
      if (error.response.status === 401) {
        // Redirigir a login o refrescar token
      }
    } else if (error.request) {
      // Error de solicitud (no se recibió respuesta)
      console.error('Error de solicitud:', error.request);
    } else {
      // Error en la configuración de la solicitud
      console.error('Error:', error.message);
    }
    
    return Promise.reject(error);
  }
);

axios.interceptors.request.use(config => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axios;
