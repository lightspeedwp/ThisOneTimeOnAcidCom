/** Regression coverage for the deployment checker's HTTP contract. */
import assert from 'node:assert/strict';
import { execFile } from 'node:child_process';
import { once } from 'node:events';
import { createServer } from 'node:http';
import { test } from 'node:test';
import { promisify } from 'node:util';
import { checkSite } from '../scripts/check-netlify-headers.mjs';

async function deployment(t, overrides = {}) {
  const requested = [];
  const server = createServer(function (req, res) {
    requested.push(req.url);
    let status = 200;
    let type = 'text/html; charset=UTF-8';
    let body = '<script src="/assets/index-12345678.js"></script><link href="/assets/index-12345678.css">';
    let cache = 'public, max-age=0, must-revalidate';
    if (req.url === '/assets/index-missing0.js') status = 404;
    else if (req.url === '/favicon.ico') {
      type = 'image/x-icon';
      body = 'icon fixture';
    } else if (req.url.startsWith('/assets/')) {
      type = req.url.endsWith('.js') ? 'application/javascript' : 'text/css';
      cache = 'public, max-age=31536000, immutable';
      body = '';
    }
    const override = overrides[req.url] || {};
    res.writeHead(override.status || status, {
      'content-type': override.type || type,
      'cache-control': override.cache || cache,
      'x-content-type-options': 'nosniff',
      'referrer-policy': 'strict-origin-when-cross-origin',
      'x-frame-options': 'DENY',
      'permissions-policy': 'camera=()',
      ...override.headers,
    });
    res.end(body);
  });
  t.after(function () { return new Promise(function (resolve) { server.close(resolve); }); });
  server.listen(0, '127.0.0.1');
  await once(server, 'listening');
  return { base: 'http://127.0.0.1:' + server.address().port, requested };
}

test('accepts missing assets as 404 and a favicon with an image content type', async function (t) {
  const site = await deployment(t);
  const outcome = await checkSite(site.base);
  assert.deepEqual(outcome.failures, []);
  assert.equal(outcome.results.length, 7);
});

test('rejects a missing asset served as 200 HTML', async function (t) {
  const site = await deployment(t, { '/assets/index-missing0.js': { status: 200 } });
  const outcome = await checkSite(site.base);
  assert.deepEqual(outcome.failures, ['/assets/index-missing0.js: expected status 404, got 200']);
});

test('rejects a favicon served as 200 HTML', async function (t) {
  const site = await deployment(t, { '/favicon.ico': { type: 'text/html; charset=UTF-8' } });
  const outcome = await checkSite(site.base);
  assert.deepEqual(outcome.failures, ['/favicon.ico: unexpected content type text/html; charset=UTF-8']);
});

test('CLI exits 1 for both recorded 200 HTML regressions', async function (t) {
  const site = await deployment(t, {
    '/assets/index-missing0.js': { status: 200 },
    '/favicon.ico': { type: 'text/html; charset=UTF-8' },
  });
  await assert.rejects(
    promisify(execFile)(process.execPath, [new URL('../scripts/check-netlify-headers.mjs', import.meta.url).pathname, site.base]),
    function (error) {
      assert.equal(error.code, 1);
      assert.match(error.stderr, /index-missing0\.js: expected status 404, got 200/);
      assert.match(error.stderr, /favicon\.ico: unexpected content type text\/html/);
      assert.doesNotMatch(error.stdout, /All header checks passed/);
      return true;
    },
  );
});

test('captures the initial redirect response without following it', async function (t) {
  const site = await deployment(t, {
    '/assets/index-missing0.js': { status: 302, headers: { location: '/redirect-target' } },
  });
  const outcome = await checkSite(site.base);
  assert.ok(outcome.failures.includes('/assets/index-missing0.js: expected status 404, got 302'));
  assert.equal(site.requested.includes('/redirect-target'), false);
});

test('still rejects immutable caching on 404 responses and public images', async function (t) {
  const site = await deployment(t, {
    '/assets/index-missing0.js': { cache: 'public, max-age=31536000, immutable' },
    '/favicon.ico': { cache: 'public, max-age=31536000, immutable' },
  });
  const outcome = await checkSite(site.base);
  assert.equal(outcome.failures.length, 2);
  assert.ok(outcome.failures.every(function (failure) { return failure.includes('must not be immutable'); }));
});
