import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath } from 'node:url'

const rootDirectory = fileURLToPath(new URL('.', import.meta.url))

export default defineConfig({
  plugins: [react()],
  base: '/portfolio-website/',
  build: {
    target: 'es2022',
    rollupOptions: {
      input: {
        portfolio: `${rootDirectory}index.html`,
        scoreboard: `${rootDirectory}deep-work-scoreboard/index.html`,
      },
    },
  },
})
