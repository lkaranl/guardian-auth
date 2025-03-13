import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000';

const createApiInstance = (config = {}) => {
  // Detectar URL da API automaticamente com base na URL atual
  // Se estiver em produção, assume que a API está na mesma origem
  // Se estiver em desenvolvimento, usa localhost:3000
  const getDefaultBaseURL = () => {
    if (typeof window !== 'undefined') {
      // Em ambiente de produção, use a mesma origem
      if (process.env.NODE_ENV === 'production') {
        return window.location.origin;
      }
    }
    // Em desenvolvimento, use localhost:3000
    return API_URL;
  };

  const defaultConfig = {
    baseURL: getDefaultBaseURL(),
    ...config
  };

  const api = axios.create({
    ...defaultConfig,
    headers: {
      'Content-Type': 'application/json',
      ...(config.headers || {})
    },
  });

  // Interceptor para adicionar o token de autenticação às requisições
  api.interceptors.request.use(
    (config) => {
      // Determinar qual storage está sendo usado
      const storageType = localStorage.getItem('authStorage') || 'localStorage';
      const storage = storageType === 'localStorage' ? localStorage : sessionStorage;
      
      const token = storage.getItem('accessToken');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // Interceptor para tratar erros de resposta (como token expirado)
  api.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;
      
      // Se o erro for de token expirado (401) e não estamos tentando refresh
      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        
        try {
          // Determinar qual storage está sendo usado
          const storageType = localStorage.getItem('authStorage') || 'localStorage';
          const storage = storageType === 'localStorage' ? localStorage : sessionStorage;
          
          // Tentar renovar o token
          const refreshToken = storage.getItem('refreshToken');
          const response = await axios.post(`${defaultConfig.baseURL}/auth/refresh-token`, {
            refreshToken,
          });
          
          // Salvar os novos tokens
          const { accessToken, refreshToken: newRefreshToken } = response.data;
          storage.setItem('accessToken', accessToken);
          storage.setItem('refreshToken', newRefreshToken);
          
          // Refazer a requisição original com o novo token
          originalRequest.headers.Authorization = `Bearer ${accessToken}`;
          return api(originalRequest);
        } catch (error) {
          // Se falhar no refresh, deslogar o usuário
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
          sessionStorage.removeItem('accessToken');
          sessionStorage.removeItem('refreshToken');
          localStorage.removeItem('authStorage');
          
          // Redirecionar para login
          if (typeof window !== 'undefined') {
            window.location.href = '/login';
          }
          return Promise.reject(error);
        }
      }
      
      return Promise.reject(error);
    }
  );

  return api;
};

// Instância padrão
const api = createApiInstance();

export default api;
export { createApiInstance }; 