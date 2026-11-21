/**
 * Build guard for Netlify Functions.
 *
 * Unit tests import library modules directly and mock @netlify/blobs, so a
 * function that imports a missing export still passes them. PR #635 removed
 * the code-storage exports from store.ts and four functions stopped building
 * without any test failing. This suite bundles each function the way Netlify
 * does and checks that every redirect points at a function that exists.
 */

import { readdirSync, readFileSync, existsSync } from 'fs';
import { join, resolve } from 'path';
import { build } from 'esbuild';
import { describe, it, expect } from 'vitest';

const ROOT = resolve(__dirname, '../..');
const FUNCTIONS_DIR = join(ROOT, 'netlify/functions');

const functionFiles = readdirSync(FUNCTIONS_DIR).filter((f) => f.endsWith('.ts'));

/** Function names referenced as `/.netlify/functions/<name>` in a config file. */
function referencedFunctions(file: string): string[] {
  const text = readFileSync(join(ROOT, file), 'utf8');
  return [...text.matchAll(/\/\.netlify\/functions\/([a-z0-9-]+)/gi)]
    .map((m) => m[1])
    // `reader-:splat` is a catch-all pattern, not a function name.
    .filter((name) => !name.endsWith('-'));
}

describe('Netlify functions build', () => {
  it('finds functions to check', () => {
    expect(functionFiles.length).toBeGreaterThan(0);
  });

  it.each(functionFiles)('%s bundles without errors', async (file) => {
    const result = await build({
      entryPoints: [join(FUNCTIONS_DIR, file)],
      bundle: true,
      platform: 'node',
      format: 'esm',
      target: 'node24',
      write: false,
      logLevel: 'silent',
    }).catch((error: { errors?: { text: string }[] }) => ({
      errors: error.errors ?? [{ text: String(error) }],
    }));

    expect(result.errors.map((e) => e.text)).toEqual([]);
  }, 30000);
});

describe('Reader API routing', () => {
  it.each(['public/_redirects', 'netlify.toml'])(
    'every function named in %s exists',
    (file) => {
      const missing = referencedFunctions(file).filter(
        (name) => !existsSync(join(FUNCTIONS_DIR, `${name}.ts`))
      );
      expect(missing).toEqual([]);
    }
  );

  it('routes a protected chapter before the SPA fallback in public/_redirects', () => {
    const lines = readFileSync(join(ROOT, 'public/_redirects'), 'utf8')
      .split('\n')
      .map((line) => line.trim().split(/\s+/));
    const chapter = lines.findIndex(([from]) => from === '/api/reader/chapters/:chapterId');
    const fallback = lines.findIndex(([from]) => from === '/*');

    expect(chapter).toBeGreaterThanOrEqual(0);
    // reader-chapter reads the id from the last path segment.
    expect(lines[chapter][1]).toBe('/.netlify/functions/reader-chapter/:chapterId');
    expect(chapter).toBeLessThan(fallback);
  });
});
