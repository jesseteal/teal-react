import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
  root: fileURLToPath(new URL('.', import.meta.url)),
  resolve: {
    alias: {
      '@jesseteal/teal-react/mui': fileURLToPath(
        new URL('../src/mui/index.ts', import.meta.url),
      ),
      '@jesseteal/teal-react': fileURLToPath(
        new URL('../src/index.ts', import.meta.url),
      ),
    },
  },
  server: {
    open: false,
  },
});
