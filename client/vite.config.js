import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',  // Allows access from other devices on the network
    port: 5173,       // Ensures the server runs on port 5173
    proxy: {
      '/api': {
        // target: 'http://localhost:3000',
        target: 'https://formmanagementportal-server.onrender.com/',
        changeOrigin: true,
        // rewrite: (path) => path.replace(/^\/api/, '') // Remove /api prefix if needed
      }
    }
  }
})
