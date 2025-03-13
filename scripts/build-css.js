import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Obter o diretório atual
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

// Arquivos CSS a serem combinados
const cssFiles = [
  'src/App.css',
  'src/index.css',
  'src/styles/AuthPages.css',
  'src/styles/GuardianAuthStyles.css'
];

// Verificar se o diretório dist existe, se não, criá-lo
const distPath = path.join(projectRoot, 'dist');
if (!fs.existsSync(distPath)) {
  fs.mkdirSync(distPath, { recursive: true });
}

// Caminho de saída para o CSS combinado
const outputPath = path.join(distPath, 'guardian-auth.css');

// Ler e combinar os arquivos CSS
let combinedCSS = '/* GuardianAuth - Estilos combinados */\n\n';

cssFiles.forEach(file => {
  const filePath = path.join(projectRoot, file);
  try {
    console.log(`Lendo ${filePath}...`);
    const content = fs.readFileSync(filePath, 'utf8');
    combinedCSS += `/* ${file} */\n${content}\n\n`;
  } catch (error) {
    console.error(`Erro ao ler o arquivo ${filePath}:`, error);
  }
});

// Escrever o arquivo CSS combinado
try {
  console.log(`Escrevendo CSS combinado em ${outputPath}...`);
  fs.writeFileSync(outputPath, combinedCSS);
  console.log('CSS combinado com sucesso!');
} catch (error) {
  console.error('Erro ao escrever o arquivo CSS combinado:', error);
} 