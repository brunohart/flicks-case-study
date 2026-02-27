import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { copyFileSync } from 'fs'
import { resolve } from 'path'

// GitHub Pages serves 404.html for unknown paths. Copy index.html to 404.html
// so /flicks-case-study/app/1a etc. load the SPA and React Router can handle the route.
function ghPages404() {
  return {
    name: 'gh-pages-404',
    closeBundle() {
      const outDir = resolve(__dirname, 'dist')
      copyFileSync(resolve(outDir, 'index.html'), resolve(outDir, '404.html'))
    },
  }
}

export default defineConfig({
  base: '/flicks-case-study/',
  plugins: [
    react(),
    tailwindcss(),
    ghPages404(),
  ],
})
