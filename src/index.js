// Importar componentes
import GuardianAuth from './GuardianAuth';
import { useAuth } from './context/AuthContext';
import { useTheme, THEMES } from './context/ThemeContext';

// Componente que não precisa de configuração
const SimpleGuardianAuth = ({ children }) => (
  <GuardianAuth>{children}</GuardianAuth>
);

export { 
  GuardianAuth as SimpleGuardianAuth, // Renomeado para evitar conflitos
  useAuth,
  useTheme, 
  THEMES 
};

// Exportação padrão é a versão configurável
export default GuardianAuth; 