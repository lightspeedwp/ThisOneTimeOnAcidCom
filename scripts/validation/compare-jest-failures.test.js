import { spawnSync } from 'node:child_process';
import { mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';

const script = path.resolve('scripts/validation/compare-jest-failures.cjs');
let fixtureRoot;

beforeEach(() => {
  fixtureRoot = mkdtempSync(path.join(tmpdir(), 'compare-jest-failures-'));
});

afterEach(() => {
  rmSync(fixtureRoot, { recursive: true, force: true });
});

/**
 * Write synthetic Jest reports under separate checkout roots and run the comparison CLI.
 *
 * @param {Array<Object>} headFiles - Head suite fixtures with names, failure counts,
 *   and optional statuses and assertion results.
 * @param {Array<Object>} baseFiles - Base suite fixtures in the same format.
 * @param {boolean} [rawCounts=false] - Use numeric failure counts instead of assertion results.
 * @returns {import('node:child_process').SpawnSyncReturns<string>} CLI output and exit status.
 */
function compare(headFiles, baseFiles, rawCounts = false) {
  const roots = {
    head: path.join(fixtureRoot, 'head'),
    base: path.join(fixtureRoot, 'base'),
  };

  Object.entries({ head: headFiles, base: baseFiles }).forEach(([target, files]) => {
    const report = {
      numFailedTests: files.reduce((total, file) => total + file.failures, 0),
      testResults: files.map(file => {
        const result = {
          name: path.resolve(roots[target], file.name),
          status: file.status || (file.failures > 0 ? 'failed' : 'passed'),
        };
        if (rawCounts) {
          result.numFailingTests = file.failures;
        } else {
          result.assertionResults = file.assertionResults || [
            ...Array.from({ length: file.failures }, () => ({ status: 'failed' })),
            { status: 'passed' },
            { status: 'pending' },
            { status: 'todo' },
          ];
        }
        return result;
      }),
    };
    writeFileSync(path.join(fixtureRoot, `${target}.json`), JSON.stringify(report));
  });

  return spawnSync(process.execPath, [
    script,
    '--head', path.join(fixtureRoot, 'head.json'),
    '--head-root', roots.head,
    '--base', path.join(fixtureRoot, 'base.json'),
    '--base-root', roots.base,
  ], { encoding: 'utf8' });
}

test('matches existing failures across different checkout roots', () => {
  const files = [{ name: 'tests/existing.test.js', failures: 2 }];
  const result = compare(files, files);

  expect(result.status).toBe(0);
  expect(result.stdout).toContain('Base branch failures: 2');
  expect(result.stdout).toContain('PR head failures: 2');
  expect(result.stdout).toContain('New failures in this PR: 0');
});

test('detects failures in a new file when aggregate totals are unchanged', () => {
  const result = compare(
    [{ name: 'tests/new.test.js', failures: 2 }],
    [{ name: 'tests/existing.test.js', failures: 2 }],
  );

  expect(result.status).toBe(1);
  expect(result.stdout).toContain('New failures in this PR: 2');
});

test('detects new failures even when the aggregate total decreases', () => {
  const result = compare(
    [{ name: 'tests/new.test.js', failures: 1 }],
    [{ name: 'tests/existing.test.js', failures: 4 }],
  );

  expect(result.status).toBe(1);
  expect(result.stdout).toContain('New failures in this PR: 1');
});

test('sums increases per file without offsetting them against fixes', () => {
  const result = compare(
    [
      { name: 'tests/first.test.js', failures: 3 },
      { name: 'tests/second.test.js', failures: 2 },
      { name: 'tests/fixed.test.js', failures: 0 },
    ],
    [
      { name: 'tests/first.test.js', failures: 1 },
      { name: 'tests/second.test.js', failures: 1 },
      { name: 'tests/fixed.test.js', failures: 3 },
    ],
  );

  expect(result.status).toBe(1);
  expect(result.stdout).toContain('New failures in this PR: 3');
});

test('keeps files with the same basename in different directories distinct', () => {
  const result = compare(
    [{ name: 'tests/new/shared.test.js', failures: 1 }],
    [{ name: 'tests/old/shared.test.js', failures: 1 }],
  );

  expect(result.status).toBe(1);
  expect(result.stdout).toContain('New failures in this PR: 1');
});

test('allows fewer failures and removed failing files', () => {
  const result = compare(
    [{ name: 'tests/existing.test.js', failures: 1 }],
    [
      { name: 'tests/existing.test.js', failures: 2 },
      { name: 'tests/removed.test.js', failures: 1 },
    ],
  );

  expect(result.status).toBe(0);
  expect(result.stdout).toContain('New failures in this PR: 0');
});

test('allows reports with no failures', () => {
  const result = compare([], []);

  expect(result.status).toBe(0);
  expect(result.stdout).toContain('New failures in this PR: 0');
});

test.each([
  { assertionResults: [] },
  { assertionResults: [{ status: 'passed' }] },
])('detects a failed suite with no failed assertions ($assertionResults)', ({ assertionResults }) => {
  const result = compare(
    [{ name: 'tests/execution.test.js', failures: 0, status: 'failed', assertionResults }],
    [],
  );

  expect(result.status).toBe(1);
  expect(result.stdout).toContain('PR head failures: 1');
  expect(result.stdout).toContain('New failures in this PR: 1');
});

test('matches existing suite execution failures across checkout roots', () => {
  const files = [{ name: 'tests/execution.test.js', failures: 0, status: 'failed', assertionResults: [] }];
  const result = compare(files, files);

  expect(result.status).toBe(0);
  expect(result.stdout).toContain('Base branch failures: 1');
  expect(result.stdout).toContain('PR head failures: 1');
  expect(result.stdout).toContain('New failures in this PR: 0');
});

test.each(['passed', 'pending'])('ignores an empty %s suite', status => {
  const result = compare(
    [{ name: 'tests/empty.test.js', failures: 0, status, assertionResults: [] }],
    [],
  );

  expect(result.status).toBe(0);
  expect(result.stdout).toContain('PR head failures: 0');
});

test('also compares reports containing per-file numeric failure counts', () => {
  const result = compare(
    [{ name: 'tests/existing.test.js', failures: 3 }],
    [{ name: 'tests/existing.test.js', failures: 1 }],
    true,
  );

  expect(result.status).toBe(1);
  expect(result.stdout).toContain('New failures in this PR: 2');
});
