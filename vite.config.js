import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/ArchivosQuindioIII': {
        target: 'https://sigquindio.gov.co',
        changeOrigin: true,
        secure: true,
      },
    },
  },
})
