import { useTheme, THEMES } from '../context/ThemeContext';
import '../styles/AuthPages.css';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  const isDarkTheme = theme === THEMES.DARK;

  return (
    <button 
      className="ga-theme-toggle"
      onClick={toggleTheme}
      aria-label={isDarkTheme ? "Mudar para tema claro" : "Mudar para tema escuro"}
      title={isDarkTheme ? "Mudar para tema claro" : "Mudar para tema escuro"}
    >
      {isDarkTheme ? '☀️' : '🌙'}
    </button>
  );
};

export default ThemeToggle; 