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
        target: 'https://formmanagementportal-server.onrender.com/',  // The backend server URL
        changeOrigin: true,  // Needed for virtual hosted sites
        // rewrite: (path) => path.replace(/^\/api/, '') // Uncomment if you need to remove the /api prefix
      }
    }
  }
})
