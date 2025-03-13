# Estrutura do GuardianAuth

Este documento detalha a estrutura interna do pacote GuardianAuth para orientar os mantenedores e contribuidores.

## Estrutura de Arquivos

```
guardian-auth/
├── dist/                  # Código compilado (gerado pelo build)
├── src/                   # Código fonte
│   ├── components/        # Componentes reutilizáveis
│   │   └── ProtectedRoute.jsx  # Componente para proteger rotas
│   ├── context/           # Contextos React
│   │   ├── AuthContext.jsx     # Contexto de autenticação
│   │   └── ThemeContext.jsx    # Contexto de tema (claro/escuro)
│   ├── pages/             # Páginas de autenticação
│   │   ├── Login.jsx           # Página de login
│   │   ├── Register.jsx        # Página de cadastro
│   │   ├── ForgotPassword.jsx  # Recuperação de senha
│   │   └── ResetPassword.jsx   # Redefinição de senha
│   ├── services/          # Serviços e APIs
│   │   ├── api.js              # Cliente HTTP configurado
│   │   └── authService.js      # Funções de autenticação
│   ├── styles/            # Estilos CSS
│   │   └── auth.css            # Estilos para componentes de autenticação
│   ├── GuardianAuth.jsx   # Componente principal
│   └── index.js           # Ponto de entrada (exports)
├── .gitignore             # Arquivos ignorados pelo Git
├── .npmignore             # Arquivos ignorados no pacote NPM
├── LICENSE                # Licença MIT
├── package.json           # Configuração do pacote
├── PUBLICAR.md            # Instruções para publicação
├── README.md              # Documentação principal
└── rollup.config.js       # Configuração de build
```

## Fluxo de Funcionamento

1. **GuardianAuth** é o componente principal que encapsula toda a lógica de autenticação
2. Ele utiliza o **AuthContext** para gerenciar o estado de autenticação
3. O **ThemeContext** gerencia o tema claro/escuro
4. As páginas de autenticação são renderizadas quando o usuário não está autenticado
5. **ProtectedRoute** protege as rotas que exigem autenticação
6. **authService** contém todas as funções para interagir com a API de autenticação
7. **api.js** configura o cliente HTTP com interceptores para tokens

## Componentes Principais

### GuardianAuth

Responsável por orquestrar todo o sistema de autenticação e renderizar os componentes apropriados com base no estado de autenticação do usuário.

### AuthContext

Provê o estado e as funções de autenticação para toda a aplicação através do React Context API.

### ThemeContext

Gerencia o tema claro/escuro e permite que usuários alternem entre eles.

## Fluxo de Autenticação

1. O usuário acessa uma rota protegida
2. Se não estiver autenticado, é redirecionado para o login
3. Após login bem-sucedido, o token é armazenado
4. O usuário é redirecionado para a rota original
5. Todas as requisições subsequentes incluem o token
6. Se o token expirar, o sistema tenta renovar automaticamente

## Contribuindo

Para contribuir com o pacote:

1. Clone o repositório
2. Instale as dependências: `npm install`
3. Faça suas alterações
4. Execute o build: `npm run build`
5. Teste suas alterações
6. Envie um pull request

Lembre-se de seguir as convenções de código e documentar adequadamente suas alterações. 