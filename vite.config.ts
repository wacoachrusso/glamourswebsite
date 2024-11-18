import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
        },
      },
    },
  },
  server: {
    headers: {
      'Cache-Control': 'no-store',
      'Content-Type': 'application/javascript; charset=utf-8',
    },
    port: 5173,
    strictPort: true,
    cors: true,
  },
  preview: {
    port: 5173,
    strictPort: true,
    headers: {
      'Cache-Control': 'no-store',
      'Content-Type': 'application/javascript; charset=utf-8',
    },
  }
});