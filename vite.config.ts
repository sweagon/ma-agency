import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'), // Changed from '.' to './src'
      '@components': path.resolve(__dirname, './src/components'),
      '@root': path.resolve(__dirname, './'), // For root components if needed
    },
  },
  server: {
    port: 3000,
    host: true,
    hmr: true,
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'framer-motion'],
          'three-vendor': ['three', '@react-three/fiber', '@react-three/drei'],
          'ui-vendor': ['lucide-react', '@ark-ui/react', 'resend'],
        },
      },
    },
    chunkSizeWarningLimit: 1000,
  },
});