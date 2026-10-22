import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { test } from 'node:test';

const script = new URL('../scripts/extract-figma-assets.js', import.meta.url);
const selection = JSON.parse(fs.readFileSync(new URL('../recovered-assets/pilot-selection.json', import.meta.url)));
const assets = [
  ...selection.tier_1_high_priority.assets,
  ...selection.tier_2_coverage.assets,
  ...selection.tier_3_optional.assets
];
const png = Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+aX1sAAAAASUVORK5CYII=', 'base64');

// Exercise the real CLI with isolated files and an HTTPS transport stub. Its
// responses follow Figma's GetImageFillsResponse schema, including meta.images.
function runExtraction(t, config = {}, selectedAssets = [assets[0]]) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'figma-extraction-'));
  t.after(() => fs.rmSync(root, { recursive: true, force: true }));
  fs.mkdirSync(path.join(root, 'scripts'));
  fs.mkdirSync(path.join(root, 'recovered-assets'));
  fs.copyFileSync(script, path.join(root, 'scripts/extract-figma-assets.js'));
  fs.writeFileSync(path.join(root, 'package.json'), JSON.stringify({ type: 'module' }));
  fs.writeFileSync(path.join(root, 'recovered-assets/pilot-selection.json'), JSON.stringify({
    tier_1_high_priority: { assets: selectedAssets },
    tier_2_coverage: { assets: [] },
    tier_3_optional: { assets: [] }
  }));

  const images = Object.fromEntries(selectedAssets.map(asset => [
    asset.figmaAssetId, `https://fixture.invalid/${asset.figmaAssetId}.png`
  ]));
  fs.writeFileSync(path.join(root, 'fixture.json'), JSON.stringify({
    apiBody: { error: false, status: 200, meta: { images } },
    downloadBody: png.toString('base64'),
    ...config
  }));
  fs.writeFileSync(path.join(root, 'transport.mjs'), `
    import https from 'node:https';
    import fs from 'node:fs';
    import { EventEmitter } from 'node:events';
    import { PassThrough } from 'node:stream';
    const config = JSON.parse(fs.readFileSync(new URL('./fixture.json', import.meta.url)));
    const log = new URL('./requests.jsonl', import.meta.url);
    let apiCalls = 0;
    const realSetTimeout = globalThis.setTimeout;
    globalThis.setTimeout = (callback) => realSetTimeout(callback, 0);
    https.get = (url, options, callback) => {
      const target = new URL(url);
      const api = target.hostname === 'api.figma.com';
      if (!api && target.hostname !== 'fixture.invalid') throw new Error('Unexpected network request');
      fs.appendFileSync(log, JSON.stringify({ url, headers: options.headers || {} }) + '\\n');
      let status = 200;
      if (api) {
        assertRequest(target, options);
        if (config.apiStatuses) status = config.apiStatuses[apiCalls] || 200;
        apiCalls++;
      }
      const request = new EventEmitter();
      request.destroy = () => {};
      process.nextTick(() => {
        const response = new PassThrough();
        response.statusCode = status;
        response.headers = {};
        callback(response);
        response.end(api ? JSON.stringify(config.apiBody) : Buffer.from(config.downloadBody, 'base64'));
      });
      return request;
    };
    function assertRequest(target, options) {
      if (target.pathname !== '/v1/files/fixture%2Fkey/images' || target.search) {
        throw new Error('Expected the image-fill endpoint without render parameters');
      }
      if (options.headers['X-Figma-Token'] !== 'fixture-token') throw new Error('Missing API token');
    }
  `);

  const result = spawnSync(process.execPath, ['--import', './transport.mjs', 'scripts/extract-figma-assets.js'], {
    cwd: root,
    encoding: 'utf8',
    timeout: 10000,
    env: {
      ...process.env,
      FIGMA_API_TOKEN: 'fixture-token',
      FIGMA_MAKE_FILE_KEY: 'fixture/key',
      FIGMA_API_RATE_LIMIT_PER_MINUTE: '1000',
      FIGMA_CONCURRENT_REQUESTS: '5'
    }
  });
  assert.equal(result.status, 0, result.error ? result.error.message : result.stderr);
  return {
    root,
    manifest: JSON.parse(fs.readFileSync(path.join(root, 'recovered-assets/extraction-manifest.json'))),
    requests: fs.readFileSync(path.join(root, 'requests.jsonl'), 'utf8').trim().split('\n').map(line => JSON.parse(line))
  };
}

test('downloads all pilot image references from meta.images and records original dimensions', t => {
  const { root, manifest, requests } = runExtraction(t, {}, assets);
  assert.equal(manifest.summary.recovered, assets.length);
  assert.equal(manifest.summary.failed, 0);
  assert.equal(requests.length, assets.length * 2);
  for (let i = 0; i < manifest.assets.length; i++) {
    const entry = manifest.assets[i];
    assert.deepEqual(entry.dimensions, { width: 1, height: 1 });
    assert.deepEqual(fs.readFileSync(path.join(root, entry.exportedPath)), png);
    const download = requests.find(request => request.url === `https://fixture.invalid/${entry.figmaAssetId}.png`);
    assert.ok(download);
    assert.equal(download.headers['X-Figma-Token'], undefined);
  }
});

test('missing image references or malformed maps fail without downloading another image', async t => {
  const imageRef = assets[0].figmaAssetId;
  const bodies = [
    { meta: { images: { unrelated: 'https://fixture.invalid/other.png' } } },
    { meta: { images: { [imageRef]: null } } },
    { meta: { images: { [imageRef]: '' } } },
    { images: { [imageRef]: 'https://fixture.invalid/wrong-map.png' } }
  ];
  for (let i = 0; i < bodies.length; i++) {
    await t.test(`invalid image map ${i + 1}`, t => {
      const { manifest, requests } = runExtraction(t, { apiBody: bodies[i] });
      assert.equal(manifest.summary.recovered, 0);
      assert.equal(manifest.summary.failed, 1);
      assert.equal(manifest.assets[0].exportedPath, null);
      assert.equal(manifest.assets[0].notes, 'Image reference not found in file images');
      assert.equal(requests.length, 4);
      assert.ok(requests.every(request => new URL(request.url).hostname === 'api.figma.com'));
    });
  }
});

test('retries transient API failures before downloading the matching image', t => {
  const { manifest, requests } = runExtraction(t, { apiStatuses: [429, 503, 200] });
  assert.equal(manifest.summary.recovered, 1);
  assert.equal(requests.length, 4);
});

test('rejects non-PNG source bytes instead of reporting a successful PNG export', t => {
  const { root, manifest } = runExtraction(t, { downloadBody: Buffer.from('not a PNG').toString('base64') });
  assert.equal(manifest.summary.failed, 1);
  assert.equal(manifest.assets[0].notes, 'Invalid PNG');
  const directory = assets[0].portfolio_category.toLowerCase().replace(/[^a-z0-9-]/g, '-');
  assert.equal(fs.existsSync(path.join(root, 'recovered-assets', directory, assets[0].originalFilename)), false);
});
