import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://cattle.cse.buffalo.edu',
        changeOrigin: true,
        secure: false,
        // optional, but helps if cattle redirects / rewrites
        followRedirects: true,
      },
    },
  },
})
