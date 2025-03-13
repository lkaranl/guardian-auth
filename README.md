# GuardianAuth

Sistema de autenticação encapsulado para React, com design moderno e responsivo.

## 🚀 Instalação

```bash
npm install guardian-auth-narak
```

## 📋 Uso Básico

1. Primeiro, importe o componente e os estilos necessários:

```jsx
import { GuardianAuth } from 'guardian-auth-narak';
import 'guardian-auth-narak/dist/guardian-auth.css'; // Importante: importe os estilos
```

2. Envolva sua aplicação com o componente GuardianAuth:

```jsx
function App() {
  return (
    <GuardianAuth
      config={{
        appName: 'Minha Aplicação',  // Nome que aparecerá nas telas de login
        // Outras configurações opcionais
      }}
    >
      {/* Suas rotas protegidas aqui */}
      <Route path="/" element={<Home />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </GuardianAuth>
  );
}
```

## ⚙️ Configurações Disponíveis

```jsx
<GuardianAuth
  config={{
    // Nome da aplicação (mostrado nas telas de login)
    appName: 'Minha Aplicação',
    
    // Logo personalizada (opcional)
    logo: 'url-da-sua-logo',
    
    // Cor primária personalizada (opcional)
    primaryColor: '#4F46E5',
    
    // Personalização de rotas (opcional)
    loginPath: '/login',
    registerPath: '/cadastro',
    forgotPasswordPath: '/esqueci-senha',
    resetPasswordPath: '/redefinir-senha',
    homePath: '/',
  }}
>
  {/* Conteúdo da aplicação */}
</GuardianAuth>
```

## 🔒 Acessando o Estado de Autenticação

Use o hook `useAuth` para acessar o estado de autenticação e funções relacionadas:

```jsx
import { useAuth } from 'guardian-auth-narak';

function MeuComponente() {
  const { user, logout } = useAuth();
  
  return (
    <div>
      <p>Bem-vindo, {user.name}!</p>
      <button onClick={logout}>Sair</button>
    </div>
  );
}
```

## 🎨 Temas

O GuardianAuth suporta tema claro e escuro automaticamente. O tema será sincronizado com as preferências do sistema do usuário, mas também pode ser alterado manualmente através do botão de tema que é exibido automaticamente.

## 🌟 Recursos

- ✨ Design moderno e responsivo
- 🌓 Suporte a tema claro/escuro
- 📱 Layout otimizado para mobile
- 🔒 Rotas protegidas automáticas
- 🎨 Altamente personalizável
- 🚀 Fácil de integrar
- 🔄 Gerenciamento de estado de autenticação
- 📝 Formulários validados
- 🌐 Suporte a internacionalização (pt-BR)

## 🛠️ Exemplo Completo

```jsx
import { GuardianAuth } from 'guardian-auth-narak';
import 'guardian-auth-narak/dist/guardian-auth.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
      <GuardianAuth
        config={{
          appName: 'Minha Aplicação',
          logo: '/caminho/para/logo.png',
          primaryColor: '#4F46E5',
          loginPath: '/login',
          homePath: '/',
        }}
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/perfil" element={<Profile />} />
        </Routes>
      </GuardianAuth>
    </Router>
  );
}

export default App;
```

## 📄 Licença

MIT © [Seu Nome] 