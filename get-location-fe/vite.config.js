import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/get-location-fe",
  build: {
    outDir: "get-location-fe",
    assetsDir: "assets",
  }
})
