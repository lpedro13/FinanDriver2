import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'url';
import path from 'node:path';
import tsconfigPaths from 'vite-tsconfig-paths';

const configHorizonsRuntimeErrorHandler = `
  // Código do manipulador de erros de tempo de execução
`;

const configHorizonsViteErrorHandler = `
  // Código do manipulador de erros do Vite
`;

const configHorizonsConsoleErrorHandler = `
  // Código do manipulador de erros do console
`;

const configWindowFetchMonkeyPatch = `
  // Código do patch para o fetch
`;

const addTransformIndexHtml = {
  name: 'add-transform-index-html',
  transformIndexHtml(html) {
    return {
      html,
      tags: [
        {
          tag: 'script',
          attrs: { type: 'module' },
          children: configHorizonsRuntimeErrorHandler,
          injectTo: 'head',
        },
        {
          tag: 'script',
          attrs: { type: 'module' },
          children: configHorizonsViteErrorHandler,
          injectTo: 'head',
        },
        {
          tag: 'script',
          attrs: { type: 'module' },
          children: configHorizonsConsoleErrorHandler,
          injectTo: 'head',
        },
        {
          tag: 'script',
          attrs: { type: 'module' },
          children: configWindowFetchMonkeyPatch,
          injectTo: 'head',
        },
      ],
    };
  },
};

export default defineConfig({
  base: 'https://github.com/lpedro13/FinanDriver.',
  plugins: [react(), tsconfigPaths(), addTransformIndexHtml],
  server: {
    cors: true,
    headers: {
      'Cross-Origin-Embedder-Policy': 'credentialless',
    },
    allowedHosts: true,
  },
  resolve: {
    extensions: ['.jsx', '.js', '.tsx', '.ts', '.json'],
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
