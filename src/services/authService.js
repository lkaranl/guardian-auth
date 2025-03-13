import api from './api';

const authService = {
  // Registrar um novo usuário
  register: async (userData) => {
    try {
      const response = await api.post('/auth/register', userData);
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : error;
    }
  },

  // Fazer login
  login: async (credentials) => {
    try {
      const { rememberMe, ...loginData } = credentials;
      const response = await api.post('/auth/login', loginData);
      const { accessToken, refreshToken } = response.data;
      
      // Salvar tokens no localStorage ou sessionStorage dependendo da opção "Lembrar-me"
      const storage = rememberMe ? localStorage : sessionStorage;
      storage.setItem('accessToken', accessToken);
      storage.setItem('refreshToken', refreshToken);
      
      // Salvar a preferência de armazenamento para verificar na isAuthenticated
      localStorage.setItem('authStorage', rememberMe ? 'localStorage' : 'sessionStorage');
      
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : error;
    }
  },

  // Fazer logout
  logout: async () => {
    try {
      // Determinar qual storage está sendo usado
      const storageType = localStorage.getItem('authStorage') || 'localStorage';
      const storage = storageType === 'localStorage' ? localStorage : sessionStorage;
      
      const refreshToken = storage.getItem('refreshToken');
      const response = await api.post('/auth/logout', { refreshToken });
      
      // Limpar tokens do storage atual
      storage.removeItem('accessToken');
      storage.removeItem('refreshToken');
      localStorage.removeItem('authStorage');
      
      return response.data;
    } catch (error) {
      // Mesmo com erro, limpar tokens de ambos os storages
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      sessionStorage.removeItem('accessToken');
      sessionStorage.removeItem('refreshToken');
      localStorage.removeItem('authStorage');
      
      throw error.response ? error.response.data : error;
    }
  },

  // Solicitar recuperação de senha
  forgotPassword: async (email) => {
    try {
      const response = await api.post('/auth/forgot-password', { email });
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : error;
    }
  },

  // Redefinir senha
  resetPassword: async (token, password) => {
    try {
      const response = await api.post('/auth/reset-password', { token, password });
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : error;
    }
  },

  // Atualizar perfil do usuário
  updateProfile: async (userData) => {
    try {
      const response = await api.put('/auth/profile', userData);
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : error;
    }
  },

  // Verificar se o usuário está autenticado
  isAuthenticated: () => {
    // Verificar qual storage está sendo usado
    const storageType = localStorage.getItem('authStorage') || 'localStorage';
    const storage = storageType === 'localStorage' ? localStorage : sessionStorage;
    
    return !!storage.getItem('accessToken');
  },

  // Obter o token atual
  getToken: () => {
    // Verificar qual storage está sendo usado
    const storageType = localStorage.getItem('authStorage') || 'localStorage';
    const storage = storageType === 'localStorage' ? localStorage : sessionStorage;
    
    return storage.getItem('accessToken');
  },

  // Listar sessões ativas
  getSessions: async () => {
    try {
      const response = await api.get('/auth/sessions');
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : error;
    }
  },

  // Excluir conta
  deleteAccount: async (password) => {
    try {
      const response = await api.delete('/auth/account', { data: { password } });
      
      // Limpar tokens de ambos os storages após excluir conta
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      sessionStorage.removeItem('accessToken');
      sessionStorage.removeItem('refreshToken');
      localStorage.removeItem('authStorage');
      
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : error;
    }
  },

  // Obter dados do perfil do usuário
  getProfile: async () => {
    try {
      const token = authService.getToken();
      
      if (!token) {
        throw new Error('Token não encontrado');
      }
      
      const response = await api.get('/auth/profile', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      return response.data;
    } catch (error) {
      console.error('Erro ao obter perfil:', error);
      throw error;
    }
  }
};

export default authService; 