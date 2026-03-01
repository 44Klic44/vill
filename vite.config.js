import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: process.env.NODE_ENV === 'production' ? '/vill/' : '/',
  server: {
    port: 5174,
    strictPort: true,
  },
});