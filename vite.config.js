import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 5173, // optional: set your local dev port
  },
  build: {
    outDir: 'dist',
  },
  // Most important part: fix routing in production
  resolve: {
    alias: {
      // If you use aliases like @components, set them here
    },
  },
  base: '/',
})
