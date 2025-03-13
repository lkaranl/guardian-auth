import { createContext, useState, useEffect, useContext } from 'react';

// Criando o contexto de tema
const ThemeContext = createContext();

// Temas disponíveis
export const THEMES = {
  DARK: 'dark',
  LIGHT: 'light'
};

export function ThemeProvider({ children }) {
  // Tema padrão é escuro, conforme solicitado
  const [theme, setTheme] = useState(THEMES.DARK);
  
  // Efeito para carregar o tema salvo no localStorage, se existir
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme) {
      // Se existir um tema salvo, usa ele
      setTheme(savedTheme);
    } else {
      // Se não existir, verifica a preferência do sistema
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      // Se o sistema preferir escuro ou não tiver preferência, mantém o escuro como padrão
      setTheme(prefersDark ? THEMES.DARK : THEMES.LIGHT);
    }
  }, []);
  
  // Observador para alterações na preferência do sistema
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e) => {
      // Somente altera se o usuário não tiver uma preferência salva
      if (!localStorage.getItem('theme')) {
        setTheme(e.matches ? THEMES.DARK : THEMES.LIGHT);
      }
    };
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);
  
  // Aplica a classe do tema no elemento HTML quando o tema muda
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);
  
  // Função para alternar entre os temas
  const toggleTheme = () => {
    setTheme(prevTheme => 
      prevTheme === THEMES.LIGHT ? THEMES.DARK : THEMES.LIGHT
    );
  };
  
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// Hook personalizado para acessar o contexto de tema
export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme deve ser usado dentro de um ThemeProvider');
  }
  return context;
} 