import { defineConfig } from 'vite';

export default defineConfig({
  root: '.', // This sets the root directory to the project root, where index.html currently is
  build: {
    outDir: 'dist', // Output directory for build files
  },
});
