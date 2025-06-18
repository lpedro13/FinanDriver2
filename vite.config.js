import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

// Cria .nojekyll automaticamente (IMPORTANTE!)
import fs from 'fs';
if (!fs.existsSync('docs')) fs.mkdirSync('docs');
fs.writeFileSync('docs/.nojekyll', '');

export default defineConfig({
  plugins: [react()],
  base: '/FinanDriver2/', // ⚠️ Confira se é EXATAMENTE o nome do repositório
  build: {
    outDir: 'docs',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html')
      },
      output: {
        entryFileNames: 'assets/[name]-[hash].js', // Adicione hífen para melhor compatibilidade
        assetFileNames: 'assets/[name]-[hash][extname]'
      }
    }
  }
})