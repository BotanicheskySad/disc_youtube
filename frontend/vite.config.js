import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'              // ← ДОБАВИТЬ: встроенный Node.js модуль для работы с путями

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  
  // ↓ ДОБАВИТЬ этот блок
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './'),
      '@src': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './components'),
      '@public': path.resolve(__dirname, './public'),
      '@styles': path.resolve(__dirname, './styles'),
    }
  }
})