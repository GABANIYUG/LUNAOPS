import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
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
        main: path.resolve(__dirname, 'index.html'),
        workstation: path.resolve(__dirname, 'workstation.html'),
      },
    },
  },
});
