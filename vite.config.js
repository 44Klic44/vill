import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5174,       // фиксируем порт
    strictPort: true, // если занят — не запускать другой
  },
})