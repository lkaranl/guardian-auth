import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';
import ThemeToggle from '../components/ThemeToggle';
import '../styles/AuthPages.css';

const Home = () => {
  const { user, logout, loading } = useAuth();

  // Se não estiver autenticado, redirecione para login
  if (!loading && !user) {
    return <Navigate to="/login" />;
  }

  const handleLogout = async () => {
    try {
      await logout();
      // Redirecionamento automático acontecerá devido ao useState no AuthContext
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
      alert('Erro ao fazer logout. Tente novamente.');
    }
  };

  return (
    <div className="home-container">
      <header className="app-header">
        <div className="logo">
          <h1>GuardianAuth</h1>
        </div>
        <nav className="nav-menu">
          <ThemeToggle />
          <button onClick={handleLogout} className="btn-logout">
            Sair
          </button>
        </nav>
      </header>

      <main className="main-content">
        <div className="welcome-section">
          <h2>Bem-vindo ao Template do GuardianAuth</h2>
          <p>
            Você está autenticado com sucesso.
            Este é um template básico para integração com a API GuardianAuth.
          </p>
        </div>

        <div className="features-section">
          <h3>Funcionalidades disponíveis:</h3>
          <ul>
            <li>✅ Login/Logout</li>
            <li>✅ Cadastro de usuários</li>
            <li>✅ Recuperação de senha</li>
            <li>✅ Proteção de rotas</li>
            <li>✅ Renovação automática de tokens</li>
          </ul>
        </div>
      </main>

      <footer className="app-footer">
        <p>&copy; {new Date().getFullYear()} - Template GuardianAuth</p>
      </footer>
    </div>
  );
};

export default Home; 