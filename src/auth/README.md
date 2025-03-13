# GuardianAuth - Sistema Encapsulado de Autenticação

Este diretório contém o sistema encapsulado de autenticação GuardianAuth.

## ⚠️ IMPORTANTE: NÃO MODIFIQUE OS ARQUIVOS NESTE DIRETÓRIO

Os arquivos neste diretório são parte do sistema de autenticação e são projetados para
funcionar como um pacote independente. Modifique-os apenas se você estiver contribuindo
para o desenvolvimento do próprio sistema GuardianAuth.

## Como Usar

O sistema foi projetado para ser **completamente transparente** para o desenvolvedor. Basta
importar e usar o componente `GuardianAuth` na raiz da sua aplicação:

```jsx
// App.jsx
import { Route } from 'react-router-dom';
import { GuardianAuth } from './auth';
import MinhaPaginaInicial from './pages/MinhaPaginaInicial';

function App() {
  return (
    <GuardianAuth
      config={{
        appName: 'Nome Da Sua Aplicação',  // Opcional
        // Outras opções de configuração
      }}
    >
      {/* Suas rotas protegidas */}
      <Route path="/" element={<MinhaPaginaInicial />} />
      <Route path="/dashboard" element={<Dashboard />} />
      {/* Etc */}
    </GuardianAuth>
  );
}
```

## Comportamento

- O GuardianAuth automaticamente gerencia toda a autenticação
- Se o usuário não estiver autenticado, ele será redirecionado para a tela de login
- Somente após autenticação bem-sucedida o usuário poderá acessar as rotas da aplicação
- O sistema inclui telas para login, cadastro, recuperação de senha, etc.
- Tema claro/escuro já integrado

## Configurações Disponíveis

```jsx
<GuardianAuth
  config={{
    // Nome da aplicação (mostrado nas telas de login)
    appName: 'Minha Aplicação',
    
    // Personalização de rotas
    loginPath: '/login',  
    registerPath: '/cadastro',
    forgotPasswordPath: '/esqueci-senha',
    resetPasswordPath: '/redefinir-senha',
    homePath: '/',
    
    // Outras opções podem ser adicionadas conforme necessário
  }}
>
  {/* Conteúdo da aplicação */}
</GuardianAuth>
```

## Acessando o estado de autenticação

Se você precisa acessar o estado de autenticação ou funções relacionadas em seus componentes:

```jsx
import { useAuth } from './auth';

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