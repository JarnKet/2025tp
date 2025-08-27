import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: "/01_service_worker",
  server: {
    fs: {
      allow: ['..']
    }
  },
  build: {
    outDir: "01_service_worker",
    assetsDir: "assets",
  }
})
