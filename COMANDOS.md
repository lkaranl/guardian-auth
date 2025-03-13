# Comandos para Finalizar e Publicar o Pacote GuardianAuth

A seguir estão os comandos necessários para finalizar a preparação e publicar o pacote GuardianAuth no NPM.

## Passos para Finalizar o Pacote

### 1. Completar a Implementação

Você ainda precisa implementar os seguintes componentes:

- `src/components/ThemeToggle.jsx`
- `src/pages/Register.jsx`
- `src/pages/ForgotPassword.jsx`
- `src/pages/ResetPassword.jsx`

Siga o mesmo padrão utilizado no componente Login.jsx.

### 2. Instalar Dependências de Desenvolvimento

```bash
cd guardian-auth
npm install
```

### 3. Completar o Arquivo package.json

Edite o arquivo `package.json` para atualizar:

- O campo `author` com seu nome
- O campo `repository` com a URL do seu repositório
- Outras informações pessoais

### 4. Configurar o Build

Certifique-se de que a configuração do Rollup está correta e que todos os arquivos necessários estão incluídos.

## Preparando para Publicação

### 1. Fazer o Build do Pacote

```bash
cd guardian-auth
npm run build
```

Isto irá criar o diretório `dist/` com o código transpilado e minimizado.

### 2. Testar o Pacote Localmente

Você pode testar o pacote localmente antes de publicá-lo usando:

```bash
# Na pasta guardian-auth
npm pack
```

Isso criará um arquivo .tgz que pode ser instalado em outro projeto:

```bash
# Em outro projeto
npm install /caminho/para/guardian-auth-react-1.0.0.tgz
```

### 3. Publicação no NPM

Primeiro, faça login na sua conta NPM:

```bash
npm login
```

Em seguida, publique o pacote:

```bash
npm publish --access=public
```

## Atualização do Pacote

Para atualizar o pacote após fazer alterações:

1. Atualize a versão:

```bash
npm version patch  # Para correções de bugs
# OU
npm version minor  # Para novos recursos
# OU
npm version major  # Para mudanças que quebram compatibilidade
```

2. Faça o build e publique:

```bash
npm run build
npm publish
```

## Comandos Git para Compartilhar o Código

Para adicionar o código ao GitHub:

```bash
cd guardian-auth
git init
git add .
git commit -m "Versão inicial do GuardianAuth"
git branch -M main
git remote add origin https://github.com/seu-usuario/guardian-auth-react.git
git push -u origin main
```

## Próximos Passos para Desenvolvimento Contínuo

1. Adicionar testes unitários usando Jest e React Testing Library
2. Criar uma documentação mais completa com Storybook
3. Adicionar exemplos de uso em diferentes cenários
4. Expandir as funcionalidades de autenticação (OAuth, autenticação de dois fatores, etc.) 