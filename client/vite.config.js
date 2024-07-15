import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

console.log('Vite proxy configuration loaded');

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        // target: 'https://formmanagementportal-server.onrender.com',
        target: 'http://localhost:3000/',
        changeOrigin: true,
        // rewrite: (path) => {
        //   console.log('Rewriting path:', path);
        //   return path.replace(/^\/api/, '');
        // },
      },
    },
  },
})
