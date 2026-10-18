/**
 * Emits a Netlify `_headers` file listing every content-hashed file Vite wrote
 * to `assets/`, each with one-year immutable caching.
 *
 * Exact paths are used instead of an `/assets/*` wildcard so that:
 * - files copied unchanged from `public/` never receive immutable caching;
 * - a missing asset served by the SPA fallback (HTML) is never cached as immutable.
 *
 * HTML is left on Netlify's default `public,max-age=0,must-revalidate`.
 */

export const IMMUTABLE_CACHE_CONTROL = 'public, max-age=31536000, immutable'

// Vite's default output names are `assets/[name]-[hash].[ext]` with an 8-character base64url hash
const HASHED_ASSET_PATTERN = /^assets\/[^/]+-[A-Za-z0-9_-]{8}\.[A-Za-z0-9]+$/

export function isHashedAssetFileName(fileName) {
  return HASHED_ASSET_PATTERN.test(fileName)
}

export function buildHashedAssetHeaders(fileNames) {
  const hashed = []
  for (let i = 0; i < fileNames.length; i++) {
    if (isHashedAssetFileName(fileNames[i])) {
      hashed.push(fileNames[i])
    }
  }
  hashed.sort()

  const lines = ['# Generated at build time by scripts/netlify-hashed-asset-headers.mjs — do not edit']
  for (let i = 0; i < hashed.length; i++) {
    lines.push('/' + hashed[i])
    lines.push('  Cache-Control: ' + IMMUTABLE_CACHE_CONTROL)
  }
  return lines.join('\n') + '\n'
}

export function netlifyHashedAssetHeaders() {
  return {
    name: 'netlify-hashed-asset-headers',
    apply: 'build',
    generateBundle(_options, bundle) {
      // Only files emitted by this bundle are considered; `public/` copies are not part of it
      this.emitFile({
        type: 'asset',
        fileName: '_headers',
        source: buildHashedAssetHeaders(Object.keys(bundle)),
      })
    },
  }
}
