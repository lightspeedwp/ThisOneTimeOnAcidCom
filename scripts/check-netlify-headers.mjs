/**
 * Verifies caching and security headers on a deployed Netlify site.
 * Usage: node scripts/check-netlify-headers.mjs https://deploy-preview-N--thisonetimeonacid.netlify.app
 * Prints status, content type and Cache-Control for each probe and exits non-zero on failure.
 */
import { IMMUTABLE_CACHE_CONTROL } from './netlify-hashed-asset-headers.mjs'

const REVALIDATE = /max-age=0/
const IMMUTABLE = /max-age=31536000/
const SECURITY_HEADERS = {
  'x-content-type-options': 'nosniff',
  'referrer-policy': 'strict-origin-when-cross-origin',
  'x-frame-options': 'DENY',
}

/**
 * Probes a single route and captures the initial response.
 * Uses `redirect: 'manual'` to capture initial response without following redirects.
 * Returns status, content-type, cache headers, and response body.
 */
async function probe(base, path) {
  const res = await fetch(base + path, { redirect: 'manual' })
  const body = await res.text()
  return {
    path: path,
    status: res.status,
    type: res.headers.get('content-type') || '',
    cache: res.headers.get('cache-control') || '',
    headers: res.headers,
    body: body,
  }
}

export async function checkSite(base) {
  const failures = []
  const results = []
  function expect(condition, message) {
    if (!condition) failures.push(message)
  }

  const home = await probe(base, '/')
  const scripts = home.body.match(/\/assets\/[^"']+\.js/g) || []
  const styles = home.body.match(/\/assets\/[^"']+\.css/g) || []
  expect(scripts.length > 0, '/ does not reference a hashed JS asset')
  expect(styles.length > 0, '/ does not reference a hashed CSS asset')

  const probes = [
    { path: '/', kind: 'html', status: 200 },
    { path: '/journal', kind: 'html', status: 200 },
    { path: '/about-ash', kind: 'html', status: 200 },
    { path: '/assets/index-missing0.js', kind: 'fallback' },
    { path: '/favicon.ico', kind: 'public', status: 200 },
  ]
  if (scripts.length > 0) probes.push({ path: scripts[0], kind: 'hashed', status: 200, type: /javascript/ })
  if (styles.length > 0) probes.push({ path: styles[0], kind: 'hashed', status: 200, type: /text\/css/ })

  for (let i = 0; i < probes.length; i++) {
    const p = probes[i]
    const r = i === 0 ? home : await probe(base, p.path)
    results.push(r)
    if (p.status) expect(r.status === p.status, p.path + ': expected status ' + p.status + ', got ' + r.status)
    if (p.type) expect(p.type.test(r.type), p.path + ': unexpected content type ' + r.type)
    if (p.kind === 'html') {
      expect(/text\/html/.test(r.type), p.path + ': expected HTML, got ' + r.type)
      expect(REVALIDATE.test(r.cache) && /must-revalidate/.test(r.cache), p.path + ': HTML not revalidated (' + r.cache + ')')
      const keys = Object.keys(SECURITY_HEADERS)
      for (let k = 0; k < keys.length; k++) {
        expect(r.headers.get(keys[k]) === SECURITY_HEADERS[keys[k]], p.path + ': missing ' + keys[k])
      }
      expect(Boolean(r.headers.get('permissions-policy')), p.path + ': missing permissions-policy')
    }
    if (p.kind === 'hashed') {
      expect(r.cache.replace(/\s/g, '') === IMMUTABLE_CACHE_CONTROL.replace(/\s/g, ''), p.path + ': expected immutable caching, got ' + r.cache)
    }
    if (p.kind === 'public' || p.kind === 'fallback') {
      expect(!IMMUTABLE.test(r.cache) && !/immutable/.test(r.cache), p.path + ': must not be immutable (' + r.cache + ')')
    }
  }
  return { results: results, failures: failures }
}

const isMain = process.argv[1] && import.meta.url === new URL('file://' + process.argv[1]).href
if (isMain) {
  const base = (process.argv[2] || '').replace(/\/$/, '')
  if (!base) {
    console.error('Usage: node scripts/check-netlify-headers.mjs <deploy-url>')
    process.exit(2)
  }
  const outcome = await checkSite(base)
  for (let i = 0; i < outcome.results.length; i++) {
    const r = outcome.results[i]
    console.log(r.status + '  ' + r.path + '  [' + r.type + ']  cache-control: ' + r.cache)
  }
  if (outcome.failures.length > 0) {
    console.error('\nFAILED:\n- ' + outcome.failures.join('\n- '))
    process.exit(1)
  }
  console.log('\nAll header checks passed for ' + base)
}
