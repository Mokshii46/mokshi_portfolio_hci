import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  base: '/mokshi_portfolio_hci/',
  plugins: [
    react(),
    tailwindcss(),
  ],
})

