import { createContext, useState, useEffect, useContext } from 'react';
import authService from '../services/authService';

// Criando o contexto de autenticação
export const AuthContext = createContext();

// Hook personalizado para usar o contexto de autenticação
export const useAuth = () => useContext(AuthContext);

// Provedor do contexto de autenticação
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Verificar autenticação ao carregar a página
  useEffect(() => {
    const checkAuth = async () => {
      try {
        if (authService.isAuthenticated()) {
          const userData = await authService.getProfile();
          
          if (userData.success) {
            setUser({
              ...userData.user,
              authenticated: true
            });
          } else {
            throw new Error(userData.message || 'Erro ao carregar perfil do usuário');
          }
        }
      } catch (err) {
        console.error('Erro ao verificar autenticação:', err);
        setError('Erro ao verificar autenticação');
        // Em caso de erro com o token, faça logout
        authService.logout();
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  // Função para fazer login
  const login = async (credentials) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await authService.login(credentials);
      
      // Verificar se a resposta é um objeto válido
      if (typeof response !== 'object') {
        throw new Error('Resposta inválida do servidor');
      }

      // Verificar se o login foi bem-sucedido
      if (response.success) {
        try {
          const userData = await authService.getProfile();
          
          if (userData.success) {
            setUser({
              ...userData.user,
              authenticated: true
            });
          } else {
            throw new Error(userData.message || 'Erro ao carregar perfil do usuário');
          }
        } catch (err) {
          console.error('Erro ao obter perfil após login:', err);
          throw err;
        }
      } else {
        throw new Error(response.message || 'Falha na autenticação');
      }

      return response;
    } catch (err) {
      console.error('Erro detalhado:', err);
      setError(err.message || 'Erro ao fazer login');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Função para fazer registro
  const register = async (userData) => {
    try {
      setLoading(true);
      setError(null);
      const response = await authService.register(userData);
      return response;
    } catch (err) {
      setError(err.message || 'Erro ao registrar usuário');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Função para fazer logout
  const logout = async () => {
    try {
      setLoading(true);
      setError(null);
      await authService.logout();
      setUser(null);
    } catch (err) {
      setError(err.message || 'Erro ao fazer logout');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Função para solicitar recuperação de senha
  const forgotPassword = async (email) => {
    try {
      setLoading(true);
      setError(null);
      const response = await authService.forgotPassword(email);
      return response;
    } catch (err) {
      setError(err.message || 'Erro ao solicitar recuperação de senha');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Função para redefinir senha
  const resetPassword = async (token, password) => {
    try {
      setLoading(true);
      setError(null);
      const response = await authService.resetPassword(token, password);
      return response;
    } catch (err) {
      setError(err.message || 'Erro ao redefinir senha');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Criando objeto de valor para o contexto
  const value = {
    user,
    isAuthenticated: !!user,
    loading,
    error,
    login,
    register,
    logout,
    forgotPassword,
    resetPassword
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;