import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

const page = (file: string) => fileURLToPath(new URL(file, import.meta.url))

export default defineConfig({
  base: './',
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      input: {
        main: page('./index.html'),
        cv: page('./cv.html'),
      },
    },
  },
})
