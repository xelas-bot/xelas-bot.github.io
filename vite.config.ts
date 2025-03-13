import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      "three-nodes": "three/examples/jsm/nodes",
    },
  },
  server: {
    port: 6005,
    allowedHosts: true
  },
  build: {
    outDir: 'dist',
    minify: 'terser',
  },
});