import { defineConfig } from 'vite';

export default defineConfig({
  // Allows serving files from the project root and public folder
  server: {
    fs: {
      allow: ['..', '.']
    }
  },
  // We place our assets in Resources for raw files and public/generated for processed files
  // For production build, we might need a custom copy step, but for dev this works.
  publicDir: 'public', 
});
