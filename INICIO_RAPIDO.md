# Início Rápido - GuardianAuth React

Este guia ajudará você a começar a usar o pacote GuardianAuth rapidamente.

## Passo 1: Instalar o Pacote

Para começar, você precisa instalar o pacote em seu projeto React:

```bash
npm install guardian-auth-react
```

## Passo 2: Importar os Estilos CSS

Este passo é **OBRIGATÓRIO** para que a biblioteca funcione corretamente com toda a estilização:

```jsx
// No arquivo principal da sua aplicação (App.js ou index.js)
import 'guardian-auth-react/dist/guardian-auth.css';
```

## Passo 3: Configurar o App.jsx (Método Simples)

O método mais simples é usar o componente `GuardianAuth` sem configuração:

```jsx
import React from 'react';
import { Route } from 'react-router-dom';
import GuardianAuth from 'guardian-auth-react';
import 'guardian-auth-react/dist/guardian-auth.css'; // Importação obrigatória dos estilos
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <GuardianAuth>
      {/* Suas rotas protegidas aqui */}
      <Route path="/" element={<Dashboard />} />
      <Route path="/perfil" element={<PerfilUsuario />} />
    </GuardianAuth>
  );
}

export default App;
```

## Método Alternativo (Com Configuração)

Se precisar de personalização, você também pode usar o método com configuração:

```jsx
import React from 'react';
import { Route } from 'react-router-dom';
import { GuardianAuth } from 'guardian-auth-react';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <GuardianAuth
      config={{
        appName: 'Minha Aplicação',
        logo: '/logo.png',  // Opcional
      }}
    >
      {/* Suas rotas protegidas aqui */}
      <Route path="/" element={<Dashboard />} />
      <Route path="/perfil" element={<PerfilUsuario />} />
    </GuardianAuth>
  );
}

export default App;
```

## Passo 4: Acessar o Estado de Autenticação

Para acessar o estado de autenticação em seus componentes:

```jsx
import React from 'react';
import { useAuth } from 'guardian-auth-react';

function MinhaPagina() {
  const { user, logout, loading } = useAuth();

  if (loading) return <div>Carregando...</div>;

  return (
    <div>
      <h1>Bem-vindo, {user ? user.email : 'visitante'}!</h1>
      <button onClick={logout}>Sair</button>
    </div>
  );
}

export default MinhaPagina;
```

## Passo 5: Personalizar o Tema

Para acessar e alternar o tema em seus componentes:

```jsx
import React from 'react';
import { useTheme, THEMES } from 'guardian-auth-react';

function BotaoTema() {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <button onClick={toggleTheme}>
      {theme === THEMES.DARK ? 'Mudar para Tema Claro' : 'Mudar para Tema Escuro'}
    </button>
  );
}

export default BotaoTema;
```

## Passo 6: Personalizar as Rotas (Opcional)

Você pode personalizar os caminhos das rotas de autenticação:

```jsx
<GuardianAuth
  config={{
    appName: 'Minha Aplicação',
    loginPath: '/entrar',
    registerPath: '/registrar',
    forgotPasswordPath: '/recuperar-senha',
    resetPasswordPath: '/nova-senha',
    homePath: '/inicio',
  }}
>
  {/* Suas rotas protegidas */}
</GuardianAuth>
```

## Passo 7: Configurar o Backend

O GuardianAuth espera um backend com as seguintes rotas:

- `POST /auth/login`: Para autenticação de usuários
- `POST /auth/register`: Para registro de novos usuários
- `POST /auth/forgot-password`: Para solicitar recuperação de senha
- `POST /auth/reset-password`: Para redefinir senha
- `POST /auth/refresh-token`: Para renovar tokens expirados
- `POST /auth/logout`: Para logout

Se seu backend tiver rotas diferentes, você precisará ajustar o arquivo `api.js`.

## Exemplo de Resposta do Login (Backend)

O endpoint de login deve retornar:

```json
{
  "accessToken": "seu-token-jwt-aqui",
  "refreshToken": "seu-refresh-token-aqui",
  "user": {
    "id": "123",
    "email": "usuario@exemplo.com",
    "name": "Nome do Usuário"
  }
}
```

## Próximos Passos

- Explore os arquivos de estilo para personalizar a aparência
- Implemente seu backend com as rotas esperadas pelo GuardianAuth
- Customize os componentes conforme necessário

Para mais detalhes, consulte a documentação completa no [README.md](./README.md). 