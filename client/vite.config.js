import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

console.log('Vite proxy configuration loaded');

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 5173,
    proxy: {
      '/api': {
        target: 'https://form-management-portal-server.vercel.app/',
        changeOrigin: true,
        rewrite: (path) => {
          console.log('Rewriting path:', path);
          return path.replace(/^\/api/, '');
        },
      },
    },
  },
})
