/**
 * Unit tests for the generated Netlify `_headers` file and the root netlify.toml.
 * Intended command: node --test tests/netlify-headers.test.mjs
 */
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { describe, it } from 'node:test';
import {
  IMMUTABLE_CACHE_CONTROL,
  buildHashedAssetHeaders,
  isHashedAssetFileName,
} from '../scripts/netlify-hashed-asset-headers.mjs';

const rootToml = readFileSync(new URL('../netlify.toml', import.meta.url), 'utf8');

describe('isHashedAssetFileName', function () {
  it('accepts Vite content-hashed JS and CSS names, including dotted and underscore hashes', function () {
    assert.equal(isHashedAssetFileName('assets/index-BFqGwo_J.js'), true);
    assert.equal(isHashedAssetFileName('assets/index-CNBEX8u6.css'), true);
    assert.equal(isHashedAssetFileName('assets/Calendar.es-Cwa8kXn8.js'), true);
    assert.equal(isHashedAssetFileName('assets/ContactPage-uXhTArie.js'), true);
  });

  it('rejects unhashed, root-level, nested and HTML files', function () {
    assert.equal(isHashedAssetFileName('index.html'), false);
    assert.equal(isHashedAssetFileName('favicon.ico'), false);
    assert.equal(isHashedAssetFileName('assets/logo.svg'), false);
    assert.equal(isHashedAssetFileName('assets/fonts/inter-regular.woff2'), false);
    assert.equal(isHashedAssetFileName('assets/hero-image.png'), false);
    assert.equal(isHashedAssetFileName('index-BFqGwo_J.js'), false);
  });
});

describe('buildHashedAssetHeaders', function () {
  it('emits one exact-path immutable rule per hashed file and nothing else', function () {
    const out = buildHashedAssetHeaders(['index.html', 'assets/index-CNBEX8u6.css', 'assets/index-BFqGwo_J.js', 'assets/logo.svg']);
    const rules = out.split('\n').filter(function (l) { return l.startsWith('/'); });
    assert.deepEqual(rules, ['/assets/index-BFqGwo_J.js', '/assets/index-CNBEX8u6.css']);
    assert.equal(out.split('Cache-Control: ' + IMMUTABLE_CACHE_CONTROL).length - 1, 2);
    assert.equal(out.includes('*'), false, 'no wildcard rules');
  });

  it('uses the required one-year immutable value', function () {
    assert.equal(IMMUTABLE_CACHE_CONTROL, 'public, max-age=31536000, immutable');
  });
});

describe('root netlify.toml', function () {
  it('builds with npm on Node 24 into dist', function () {
    assert.match(rootToml, /command = "npm run build"/);
    assert.match(rootToml, /publish = "dist"/);
    assert.match(rootToml, /NODE_VERSION = "24"/);
    assert.doesNotMatch(rootToml, /pnpm/);
  });

  it('keeps Cache-Control and CSP out of the shared rules to avoid conflicting definitions', function () {
    // Allow Cache-Control for specific paths (/, /index.html) but not for wildcard patterns
    // that would conflict with hashed asset rules generated in dist/_headers
    const wildcardSectionMatch = rootToml.match(/for\s*=\s*"\/\*"[\s\S]*?(?=\[\[headers\]\]|$)/);
    const wildcardSection = wildcardSectionMatch ? wildcardSectionMatch[0] : '';
    assert.doesNotMatch(wildcardSection, /Cache-Control\s*=/i, 'Cache-Control not in /* (wildcard) rules');
    assert.doesNotMatch(rootToml, /Content-Security-Policy\s*=/i);
    // But Cache-Control IS allowed for specific paths
    assert.match(rootToml, /for\s*=\s*"\/"/,  'Has / path for HTML revalidation');
    assert.match(rootToml, /for\s*=\s*"\/index\.html"/, 'Has /index.html path for HTML revalidation');
  });

  it('defines baseline security headers for all routes', function () {
    assert.match(rootToml, /X-Frame-Options\s*=\s*"DENY"/);
    assert.match(rootToml, /X-Content-Type-Options\s*=\s*"nosniff"/);
    assert.match(rootToml, /Referrer-Policy\s*=\s*"strict-origin-when-cross-origin"/);
    assert.match(rootToml, /Permissions-Policy/);
  });

  it('avoids conflicting wildcard Cache-Control rules that would interfere with exact-path hashed-asset rules', function () {
    // The root netlify.toml should not have wildcard Cache-Control rules
    // Exact-path rules for hashed assets are generated per-file into dist/_headers
    // Split at array-table boundaries so later rules cannot satisfy this check.
    rootToml.split(/(?=^[ \t]*\[\[)/m).forEach(function (block) {
      if (/^\s*\[\[headers\]\]/.test(block) && /^\s*for\s*=\s*"\/\*"/m.test(block)) {
        assert.doesNotMatch(block, /Cache-Control/i);
      }
    });
  });

  it('has an unforced SPA fallback so real files win', function () {
    assert.match(rootToml, /from = "\/\*"\s+to = "\/index.html"\s+status = 200/);
    assert.doesNotMatch(rootToml, /force\s*=\s*true/);
  });
});
