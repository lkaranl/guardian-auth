# Instruções para Publicar o GuardianAuth no NPM

Este documento contém as instruções necessárias para publicar o pacote GuardianAuth no registro npm.

## Preparação

Antes de publicar, verifique se:

1. Todas as dependências estão corretamente listadas no `package.json`
2. A versão está atualizada segundo o padrão [SemVer](https://semver.org/)
3. O script de build funciona corretamente
4. Você possui uma conta no [npmjs.com](https://www.npmjs.com/)

## Publicação

Para publicar o pacote, siga estes passos:

### 1. Instale as dependências

```bash
npm install
```

### 2. Faça o build do pacote

```bash
npm run build
```

### 3. Faça login no npm

```bash
npm login
```

Insira seu nome de usuário, senha e e-mail quando solicitado.

### 4. Publique o pacote

```bash
npm publish
```

Se for sua primeira publicação, use:

```bash
npm publish --access=public
```

### 5. Verifique a publicação

Acesse `https://www.npmjs.com/package/guardian-auth-react` para confirmar que seu pacote foi publicado com sucesso.

## Atualização do Pacote

Para atualizar o pacote após alterações:

1. Atualize a versão no `package.json` seguindo o SemVer:
   - **Patch** (1.0.0 -> 1.0.1): correções de bugs
   - **Minor** (1.0.0 -> 1.1.0): recursos novos com retrocompatibilidade
   - **Major** (1.0.0 -> 2.0.0): mudanças que quebram compatibilidade

   Use `npm version patch|minor|major` para atualizar automaticamente.

2. Faça o build do pacote:

   ```bash
   npm run build
   ```

3. Publique a nova versão:

   ```bash
   npm publish
   ```

## Despublicação (em caso de emergência)

Para remover uma versão específica do npm (dentro de 72 horas da publicação):

```bash
npm unpublish guardian-auth-react@1.0.0
```

> **ATENÇÃO**: Despublicar pacotes é desencorajado pelo npm e só deve ser feito em casos extremos. 