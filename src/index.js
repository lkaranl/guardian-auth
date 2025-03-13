// Importar componentes
import GuardianAuth from './GuardianAuth';
import { useAuth } from './context/AuthContext';
import { useTheme, THEMES } from './context/ThemeContext';

// Componente que não precisa de configuração
const SimpleGuardianAuth = ({ children }) => (
  <GuardianAuth>{children}</GuardianAuth>
);

export { 
  GuardianAuth,       // Versão configurável (legado)
  SimpleGuardianAuth, // Versão simples sem configuração (nova)
  useAuth,
  useTheme, 
  THEMES 
};

// Exportação padrão é a versão simplificada
export default SimpleGuardianAuth; 