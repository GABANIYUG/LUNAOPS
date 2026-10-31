import { defineConfig } from 'vite';
import { resolve } from 'node:path';

export default defineConfig({
  resolve: {
    preserveSymlinks: true,
  },
  server: {
    host: true,
    fs: {
      allow: ['..', '.']
    }
  },
  publicDir: 'public',
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        workstation: resolve(__dirname, 'workstation.html'),
      },
    },
  },
});
