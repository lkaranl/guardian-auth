import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/auth.css';

const Login = ({ appName = 'GuardianAuth', logo }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formError, setFormError] = useState('');
  const { login, loading } = useAuth();

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');

    try {
      // Verificações básicas
      if (!formData.email || !formData.password) {
        setFormError('Por favor, preencha todos os campos');
        return;
      }

      // Chama o serviço de login com os dados do formulário e o estado de "lembrar-me"
      await login({...formData, rememberMe});
      
      // Verificar se existe uma URL para redirecionamento após login
      const redirectUrl = sessionStorage.getItem('redirectUrl');
      if (redirectUrl) {
        sessionStorage.removeItem('redirectUrl');
        // O redirecionamento acontecerá automaticamente graças ao ProtectedRoute
      }
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      setFormError(error.message || 'Erro ao fazer login. Verifique suas credenciais.');
    }
  };

  return (
    <div className="ga-auth-container">
      <div className="ga-auth-card">
        <div className="ga-auth-header">
          {logo && <img src={logo} alt={`${appName} Logo`} className="ga-auth-logo" />}
          <h1 className="ga-auth-title">Bem-vindo ao {appName}</h1>
          <p className="ga-auth-subtitle">Entre com suas credenciais para continuar</p>
        </div>

        {formError && <div className="ga-error-message">{formError}</div>}

        <form onSubmit={handleSubmit}>
          <div className="ga-form-group">
            <label htmlFor="email" className="ga-form-label">E-mail</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="ga-form-input"
              placeholder="seu@email.com"
              disabled={loading}
              autoFocus
              required
            />
          </div>

          <div className="ga-form-group">
            <label htmlFor="password" className="ga-form-label">Senha</label>
            <div style={{ position: 'relative' }}>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="ga-form-input"
                placeholder="Sua senha"
                disabled={loading}
                required
              />
              <button 
                type="button" 
                onClick={togglePasswordVisibility}
                style={{
                  position: 'absolute',
                  right: '10px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer'
                }}
              >
                {showPassword ? '👁️' : '👁️‍🗨️'}
              </button>
            </div>
          </div>

          <div className="ga-checkbox-wrapper">
            <input
              type="checkbox"
              id="rememberMe"
              checked={rememberMe}
              onChange={handleCheckboxChange}
              disabled={loading}
              className="ga-checkbox"
            />
            <label htmlFor="rememberMe">Lembrar-me</label>
          </div>

          <button 
            type="submit" 
            className="ga-btn ga-btn-primary ga-btn-block"
            disabled={loading}
          >
            {loading ? 'Entrando...' : 'Entrar'}
          </button>
        </form>

        <div className="ga-auth-links">
          <Link to="/esqueci-senha" className="ga-auth-link">Esqueci minha senha</Link>
          <Link to="/cadastro" className="ga-auth-link">Criar conta</Link>
        </div>
      </div>
    </div>
  );
};

export default Login; 