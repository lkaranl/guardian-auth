import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import ThemeToggle from '../components/ThemeToggle';
import '../styles/AuthPages.css';

const Login = ({ appName: propAppName, logo: propLogo }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [capsLockOn, setCapsLockOn] = useState(false);
  const [formError, setFormError] = useState('');
  const { login, loading } = useAuth();
  const navigate = useNavigate();

  // Nome do app da prop ou do env
  const appName = propAppName || import.meta.env.VITE_APP_NAME || 'GuardianAuth';

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleCheckboxChange = (e) => {
    setRememberMe(e.target.checked);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Função para detectar o Caps Lock
  const detectCapsLock = (e) => {
    setCapsLockOn(e.getModifierState('CapsLock'));
  };

  // Monitorar a tecla Caps Lock em toda a janela
  useEffect(() => {
    window.addEventListener('keydown', detectCapsLock);
    window.addEventListener('keyup', detectCapsLock);
    
    // Verificar o status inicial do Caps Lock
    if (typeof navigator.keyboard !== 'undefined' && typeof navigator.keyboard.getLayoutMap === 'function') {
      navigator.keyboard.getLayoutMap().then(keyboardLayoutMap => {
        if (keyboardLayoutMap.get('KeyA') === 'A') {
          setCapsLockOn(true);
        }
      }).catch(err => {
        console.log('Não foi possível determinar o estado inicial do Caps Lock:', err);
      });
    }

    return () => {
      window.removeEventListener('keydown', detectCapsLock);
      window.removeEventListener('keyup', detectCapsLock);
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');

    // Validação simples
    if (!formData.email || !formData.password) {
      setFormError('Por favor, preencha todos os campos.');
      return;
    }

    try {
      // Passa o formulário e a opção de lembrar-me
      await login({...formData, rememberMe});
      
      // Verificar se existe uma URL de redirecionamento salva
      const redirectUrl = sessionStorage.getItem('redirectUrl');
      
      // Limpar a URL de redirecionamento da sessionStorage
      sessionStorage.removeItem('redirectUrl');
      
      // Redirecionar para a URL salva ou para a página inicial
      navigate(redirectUrl || '/');
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      setFormError(error.message || 'Falha na autenticação. Verifique suas credenciais.');
    }
  };

  return (
    <div className="auth-container guardian-auth-container">
      <div className="auth-card guardian-auth-card">
        <ThemeToggle />
        <div className="login-form-wrapper">
          <div className="login-left">
            <div className="auth-logo guardian-auth-logo">
              {propLogo ? (
                <img src={propLogo} alt={`${appName} Logo`} />
              ) : (
                <svg width="80" height="80" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 15V18" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 9V6" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M15 12H18" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M9 12H6" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              )}
            </div>
            <h2 className="guardian-auth-title">Bem-vindo ao {appName}</h2>
            <p className="login-description guardian-auth-subtitle">
              Acesse sua conta para utilizar todos os recursos do sistema.
            </p>
          </div>
          
          <div className="login-right">            
            {formError && <div className="error-message guardian-auth-message error">{formError}</div>}
            
            <form onSubmit={handleSubmit}>
              <div className="form-group guardian-auth-form-group">
                <label htmlFor="email" className="guardian-auth-label">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Seu email"
                  disabled={loading}
                  required
                  autoFocus
                  className="guardian-auth-input"
                />
              </div>
              
              <div className="form-group guardian-auth-form-group">
                <label htmlFor="password" className="guardian-auth-label">Senha</label>
                <div className="password-input-container">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Sua senha"
                    disabled={loading}
                    required
                    className="guardian-auth-input"
                  />
                  <button 
                    type="button" 
                    className="password-toggle-btn" 
                    onClick={togglePasswordVisibility}
                    disabled={loading}
                    aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                    title={showPassword ? "Ocultar senha" : "Mostrar senha"}
                  >
                    {showPassword ? (
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                        <line x1="1" y1="1" x2="23" y2="23"></line>
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                        <circle cx="12" cy="12" r="3"></circle>
                      </svg>
                    )}
                  </button>
                </div>
                {capsLockOn && (
                  <div className="caps-lock-warning">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
                    </svg>
                    <span>Caps Lock está ativado</span>
                  </div>
                )}
              </div>
              
              <div className="form-checkbox">
                <label className="toggle-switch-label">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={handleCheckboxChange}
                    disabled={loading}
                    className="toggle-switch-input"
                  />
                  <span className="toggle-switch"></span>
                  <span className="checkbox-text">Manter conectado</span>
                </label>
              </div>
              
              <div className="form-actions">
                <button type="submit" className="btn-primary guardian-auth-button" disabled={loading}>
                  {loading ? 'Entrando...' : 'Entrar'}
                </button>
              </div>
              
              <div className="auth-links guardian-auth-links">
                <Link to="/esqueci-senha" className="guardian-auth-link">Esqueci minha senha</Link>
                <Link to="/cadastro" className="guardian-auth-link">Criar uma conta</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login; 