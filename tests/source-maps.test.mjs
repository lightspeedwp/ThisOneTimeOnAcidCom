import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';
import denySourceMaps from '../netlify/edge-functions/deny-source-maps.js';

const toml = readFileSync(new URL('../netlify.toml', import.meta.url), 'utf8');
const declaration = toml.split('[[edge_functions]]')[1].split('[[redirects]]')[0];
const pattern = new RegExp(JSON.parse(declaration.match(/pattern = (".*")/)[1]));

test('source map requests terminate with 404 before static files or the SPA fallback', async function () {
  assert.match(declaration, /function = "deny-source-maps"/);
  assert.doesNotMatch(toml, /from = "\/\*\.map"/);
  for (const path of ['/index.js.map', '/assets/index-12345678.js.map', '/assets/nested/style.css.map?version=1']) {
    const request = new Request('https://example.test' + path);
    assert.equal(pattern.test(new URL(request.url).pathname), true, path);
    let nextCalled = false;
    const response = await denySourceMaps(request, { next() { nextCalled = true; } });
    assert.equal(response.status, 404);
    assert.equal(nextCalled, false, 'must not serve a map left in dist');
  }
});

test('the filter leaves assets and SPA routes alone', function () {
  for (const path of ['/', '/journal', '/assets/index-12345678.js', '/assets/style.css', '/sitemap', '/file.map.js', '/fileXmap']) {
    assert.equal(pattern.test(path), false, path);
  }
});
