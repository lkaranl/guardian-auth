import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import ProtectedRoute from './components/ProtectedRoute';
import './App.css';
import './index.css';
import './styles/AuthPages.css';
import './styles/GuardianAuthStyles.css';
import { useEffect } from 'react';

/**
 * GuardianAuth - Componente de portal para autenticação
 * 
 * Encapsula todo o sistema de autenticação, incluindo:
 * - Rotas públicas (login, cadastro, etc.)
 * - Provider de autenticação
 * - Redirecionamentos
 * 
 * O conteúdo da aplicação só é renderizado após autenticação
 */
const GuardianAuth = ({ children, config = {} }) => {
  // Configuração com valores padrão
  const appConfig = {
    appName: config.appName || 'GuardianAuth',
    logo: config.logo || null,
    primaryColor: config.primaryColor || '#4F46E5',
    routes: {
      login: config.loginPath || '/login',
      register: config.registerPath || '/cadastro',
      forgotPassword: config.forgotPasswordPath || '/esqueci-senha',
      resetPassword: config.resetPasswordPath || '/redefinir-senha',
      home: config.homePath || '/',
    },
  };

  // Aplicar cor primária personalizada, se fornecida
  useEffect(() => {
    if (appConfig.primaryColor) {
      document.documentElement.style.setProperty('--primary', appConfig.primaryColor);
      
      // Cor para hover (ligeiramente mais escura)
      const darkerColor = adjustColor(appConfig.primaryColor, -15);
      document.documentElement.style.setProperty('--primary-hover', darkerColor);
    }
  }, [appConfig.primaryColor]);

  // Aplicar classe CSS ao body para aplicar estilos específicos
  useEffect(() => {
    // Adicionar classe ao body
    document.body.classList.add('guardian-auth-active');
    
    // Remover classe ao desmontar componente
    return () => {
      document.body.classList.remove('guardian-auth-active');
    };
  }, []);

  // Função para ajustar a luminosidade de uma cor
  const adjustColor = (color, amount) => {
    return '#' + color.replace(/^#/, '').replace(/../g, color => 
      ('0' + Math.min(255, Math.max(0, parseInt(color, 16) + amount)).toString(16)).substr(-2)
    );
  };

  return (
    <ThemeProvider>
      <Router>
        <AuthProvider>
          <div className="guardian-auth-wrapper">
            <Routes>
              {/* Rotas públicas de autenticação */}
              <Route 
                path={appConfig.routes.login} 
                element={<Login appName={appConfig.appName} logo={appConfig.logo} />} 
              />
              <Route 
                path={appConfig.routes.register} 
                element={<Register appName={appConfig.appName} logo={appConfig.logo} />} 
              />
              <Route 
                path={appConfig.routes.forgotPassword} 
                element={<ForgotPassword appName={appConfig.appName} logo={appConfig.logo} />} 
              />
              <Route 
                path={appConfig.routes.resetPassword} 
                element={<ResetPassword appName={appConfig.appName} logo={appConfig.logo} />} 
              />
              
              {/* Rotas protegidas da aplicação */}
              <Route element={<ProtectedRoute />}>
                {children}
              </Route>
              
              {/* Redirecionar rotas não encontradas para o login */}
              <Route path="*" element={<Navigate to={appConfig.routes.login} />} />
            </Routes>
          </div>
        </AuthProvider>
      </Router>
    </ThemeProvider>
  );
};

export default GuardianAuth; 