# GuardianAuth React

> Sistema encapsulado de autenticação para React com suporte a tema claro/escuro

[![NPM](https://img.shields.io/npm/v/guardian-auth-react.svg)](https://www.npmjs.com/package/guardian-auth-react)

## Instalação

```bash
npm install --save guardian-auth-react
```

## Recursos

✅ Sistema completo de autenticação encapsulado  
✅ Login/Logout  
✅ Cadastro de usuários  
✅ Recuperação de senha  
✅ Proteção de rotas  
✅ Tema claro/escuro automático  
✅ Totalmente customizável  
✅ Zero configuração necessária  

## Uso

```jsx
import React from 'react'
import { Route } from 'react-router-dom'
import { GuardianAuth } from 'guardian-auth-react'
import Dashboard from './pages/Dashboard'

function App() {
  return (
    <GuardianAuth 
      config={{
        appName: 'Minha Aplicação', 
        logo: '/logo.png'
      }}
    >
      <Route path="/" element={<Dashboard />} />
      {/* Suas outras rotas protegidas aqui */}
    </GuardianAuth>
  )
}
```

## Como funciona

O GuardianAuth atua como um gateway para sua aplicação:

1. Quando um usuário não está autenticado, ele exibe automaticamente a tela de login
2. Oferece rotas para cadastro e recuperação de senha
3. Após a autenticação, permite acesso às rotas da aplicação
4. Gerencia o tema claro/escuro automaticamente

## Configuração

O componente GuardianAuth aceita um objeto de configuração com as seguintes opções:

```jsx
<GuardianAuth
  config={{
    // Nome da aplicação (exibido nas telas de login)
    appName: 'Minha Aplicação',
    
    // URL para o logo da aplicação
    logo: '/caminho/para/logo.png',
    
    // Caminhos personalizados para as rotas de autenticação
    loginPath: '/login',
    registerPath: '/cadastro',
    forgotPasswordPath: '/esqueci-senha',
    resetPasswordPath: '/redefinir-senha',
    
    // Caminho padrão após login bem-sucedido
    homePath: '/',
    
    // Cor primária para botões e elementos de destaque
    primaryColor: '#007bff'
  }}
>
  {/* Suas rotas protegidas */}
</GuardianAuth>
```

## Acessando funções de autenticação

Para acessar o estado e as funções de autenticação em seus componentes:

```jsx
import { useAuth } from 'guardian-auth-react'

function MeuComponente() {
  const { user, isAuthenticated, loading, logout } = useAuth()
  
  if (loading) return <div>Carregando...</div>
  
  return (
    <div>
      {isAuthenticated ? (
        <>
          <h1>Bem-vindo, {user.email}</h1>
          <button onClick={logout}>Sair</button>
        </>
      ) : (
        <p>Você não está autenticado</p>
      )}
    </div>
  )
}
```

## Tema claro/escuro

O GuardianAuth inclui um sistema completo de tema claro/escuro. Para acessar e modificar o tema:

```jsx
import { useTheme, THEMES } from 'guardian-auth-react'

function MeuComponente() {
  const { theme, toggleTheme } = useTheme()
  
  return (
    <div>
      <p>Tema atual: {theme === THEMES.DARK ? 'Escuro' : 'Claro'}</p>
      <button onClick={toggleTheme}>Alternar Tema</button>
    </div>
  )
}
```

## Personalização

O GuardianAuth é projetado para se adaptar ao estilo da sua aplicação. Você pode personalizar a aparência por meio de CSS ou através das opções de configuração.

## Contribuição

Contribuições são bem-vindas! Por favor, abra uma issue para discutir mudanças importantes antes de criar um pull request.

## Licença

MIT © [Seu Nome](https://github.com/seuusuario) 