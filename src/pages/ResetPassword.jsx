import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/AuthPages.css';

const ResetPassword = () => {
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: ''
  });
  const [token, setToken] = useState('');
  const [formError, setFormError] = useState('');
  const [formSuccess, setFormSuccess] = useState('');
  const { resetPassword, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Extrair token da URL
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const tokenFromUrl = searchParams.get('token');
    
    if (tokenFromUrl) {
      setToken(tokenFromUrl);
    } else {
      setFormError('Token de redefinição não encontrado na URL.');
    }
  }, [location]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');
    setFormSuccess('');

    // Validações
    if (!token) {
      setFormError('Token de redefinição inválido.');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setFormError('As senhas não coincidem.');
      return;
    }

    if (formData.password.length < 6) {
      setFormError('A senha deve ter pelo menos 6 caracteres.');
      return;
    }

    try {
      await resetPassword(token, formData.password);
      setFormSuccess('Senha redefinida com sucesso! Redirecionando para o login...');
      
      // Redirecionar para login após 2 segundos
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (error) {
      console.error('Erro ao redefinir senha:', error);
      setFormError(error.message || 'Erro ao redefinir senha. Token pode ser inválido ou expirado.');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Redefinir Senha</h2>
        
        {formError && <div className="error-message">{formError}</div>}
        {formSuccess && <div className="success-message">{formSuccess}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="password">Nova Senha</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Digite sua nova senha"
              disabled={loading || !token}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirmar Nova Senha</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirme sua nova senha"
              disabled={loading || !token}
              required
            />
          </div>
          
          <div className="form-actions">
            <button 
              type="submit" 
              className="btn-primary" 
              disabled={loading || !token}
            >
              {loading ? 'Redefinindo...' : 'Redefinir Senha'}
            </button>
          </div>
          
          <div className="auth-links">
            <Link to="/login">Voltar para login</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword; 