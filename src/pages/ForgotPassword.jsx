import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/AuthPages.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [formError, setFormError] = useState('');
  const [formSuccess, setFormSuccess] = useState('');
  const { forgotPassword, loading } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');
    setFormSuccess('');

    if (!email) {
      setFormError('Por favor, informe seu email.');
      return;
    }

    try {
      await forgotPassword(email);
      setFormSuccess('Instruções para redefinir sua senha foram enviadas para seu email.');
      setEmail(''); // Limpar campo após sucesso
    } catch (error) {
      console.error('Erro ao solicitar recuperação de senha:', error);
      setFormError(error.message || 'Erro ao processar sua solicitação. Tente novamente.');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Recuperar Senha</h2>
        
        {formError && <div className="error-message">{formError}</div>}
        {formSuccess && <div className="success-message">{formSuccess}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Seu email de cadastro"
              disabled={loading}
              required
            />
          </div>
          
          <div className="form-actions">
            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? 'Enviando...' : 'Recuperar Senha'}
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

export default ForgotPassword; 