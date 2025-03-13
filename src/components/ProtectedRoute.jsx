import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// Componente que protege rotas que requerem autenticação
const ProtectedRoute = () => {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();
  
  // Enquanto verifica a autenticação, pode mostrar um loading
  if (loading) {
    return <div>Carregando...</div>;
  }

  // Se não estiver autenticado, salva a URL atual e redireciona para login
  if (!isAuthenticated) {
    // Salva a URL que o usuário tentou acessar
    sessionStorage.setItem('redirectUrl', location.pathname + location.search);
    return <Navigate to="/login" replace />;
  }

  // Se estiver autenticado, renderiza o conteúdo da rota
  return <Outlet />;
};

export default ProtectedRoute; 