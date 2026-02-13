import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // We removed the outDir: 'build' line so it defaults to 'dist'
})
