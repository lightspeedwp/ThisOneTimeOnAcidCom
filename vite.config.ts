import { defineConfig } from 'vite'
import fs from 'fs'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

const MISSING_ASSET_PREFIX = '\0figma-missing-asset:'

// Neutral placeholder used when a Figma Make asset was not exported into src/assets
const PLACEHOLDER_SVG =
  'data:image/svg+xml,' +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600">' +
      '<rect width="800" height="600" fill="#e5e5e5"/>' +
      '<path d="M300 400l80-100 60 70 40-50 80 80z" fill="#bdbdbd"/>' +
      '<circle cx="330" cy="240" r="30" fill="#bdbdbd"/>' +
      '</svg>'
  )

function figmaAssetResolver() {
  return {
    name: 'figma-asset-resolver',
    resolveId(id) {
      if (id.startsWith('figma:asset/')) {
        const filename = id.replace('figma:asset/', '')
        const filePath = path.resolve(__dirname, 'src/assets', filename)
        if (fs.existsSync(filePath)) {
          return filePath
        }
        console.warn(`[figma-asset-resolver] Missing src/assets/${filename}, using placeholder image`)
        return MISSING_ASSET_PREFIX + filename
      }
    },
    load(id) {
      if (id.startsWith(MISSING_ASSET_PREFIX)) {
        return `export default ${JSON.stringify(PLACEHOLDER_SVG)}`
      }
    },
  }
}

export default defineConfig({
  plugins: [
    figmaAssetResolver(),
    // The React and Tailwind plugins are both required for Make, even if
    // Tailwind is not being actively used – do not remove them
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src/app'),
    },
  },
})
