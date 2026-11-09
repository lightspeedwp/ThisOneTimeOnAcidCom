# Vitest Configuration Guide

**Status:** Phase 2 Implementation Complete (2026-11-09)  
**Replaces:** Jest (for scripts/ tests only)  
**Scope:** scripts/ directory unit tests via Vitest

---

## Overview

This project uses **Vitest** for unit testing of Node.js scripts in the `scripts/` directory. Vitest is a modern, ES-module-native test runner with excellent Jest compatibility and zero-config setup.

- **Test Framework:** Vitest 5.0.5
- **Coverage Provider:** V8
- **Environment:** Node.js
- **Test Files:** `scripts/**/*.test.{ts,js}`, `scripts/lib/**/*.test.{ts,js}`

---

## Configuration

### Vitest Configuration (`vitest.config.ts`)

```typescript
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    include: [
      '**/scripts/**/*.test.{ts,js}',
      '**/tests/**/*.test.{ts,js}',
      '**/*.test.{ts,js}',
    ],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      include: ['scripts/**/*.{ts,js}'],
      exclude: ['node_modules/', '**/*.test.{ts,js}'],
    },
    testTimeout: 10000,
  },
});
```

**Key behaviors:**
- Uses V8 for coverage (same as Jest)
- Global test APIs (describe, test, expect, etc.)
- Node.js environment for server-side testing
- Coverage reporters: text (terminal), JSON (CI), HTML (local)
- 10-second test timeout

### Package.json Scripts

```json
{
  "test:unit": "vitest run",
  "test:unit:watch": "vitest watch",
  "test:unit:coverage": "vitest run --coverage",
  "test": "npm run test:unit && npm run test:native && npm run test:build && npm run test:e2e"
}
```

---

## Writing Tests

### Test Structure (Vitest)

```typescript
import { vi } from 'vitest';

describe('My Module', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('should do something', () => {
    expect(result).toBe(expected);
  });
});
```

### Jest → Vitest Migrations

#### Mocking Modules

**Jest (OLD):**
```javascript
jest.mock('fs');
jest.mock('./lib/utils');
```

**Vitest (NEW):**
```javascript
import { vi } from 'vitest';

vi.mock('fs');
vi.mock('./lib/utils');
```

#### Creating Mock Functions

**Jest (OLD):**
```javascript
const mockFn = jest.fn();
const spy = jest.spyOn(console, 'log');
```

**Vitest (NEW):**
```javascript
import { vi } from 'vitest';

const mockFn = vi.fn();
const spy = vi.spyOn(console, 'log');
```

#### Clearing Mocks

**Jest (OLD):**
```javascript
jest.clearAllMocks();
jest.resetAllMocks();
```

**Vitest (NEW):**
```javascript
vi.clearAllMocks();
vi.resetAllMocks();
```

#### Environment Variables

**Jest (OLD):**
```javascript
process.env.MY_VAR = 'value';
delete process.env.MY_VAR;
```

**Vitest (NEW):**
```javascript
import { vi } from 'vitest';

vi.stubEnv('MY_VAR', 'value');
vi.unstubAllEnvs();
```

---

## Running Tests

### Run all tests once
```bash
npm run test:unit
```

### Watch mode (auto-rerun on file changes)
```bash
npm run test:unit:watch
```

### Generate coverage report
```bash
npm run test:unit:coverage
```

### Run specific test file
```bash
npx vitest run scripts/cleanup-branches.test.js
```

### Run tests matching a pattern
```bash
npx vitest run -t "branch validation"
```
(Use `-t` or `--testNamePattern`; Vitest does not support `--grep`)

---

## CI/CD Integration

### GitHub Actions Workflow

The `.github/workflows/tests.yml` workflow runs Vitest in CI:

```yaml
- name: Run Vitest
  run: npx vitest run --reporter=json --outputFile=jest-report.json
```

**Key points:**
- Uses `--reporter=json` to output test results in JSON format
- Compares head vs base branch results (via `scripts/validation/compare-jest-failures.cjs`)
- Reports new test failures only (known failures on develop don't block PRs)
- Artifacts: uploaded reports for each branch

### Test Comparison Script

The `scripts/validation/compare-jest-failures.cjs` now supports both Jest and Vitest output formats:

```bash
node scripts/validation/compare-jest-failures.cjs \
  --head <vitest-report.json> --head-root <path> \
  --base <vitest-report.json> --base-root <path>
```

Detects which format was used and parses failures accordingly.

---

## Coverage

### View Coverage Report

After running tests with coverage:
```bash
npm run test:unit:coverage
```

Open `coverage/index.html` in a browser to view the interactive HTML report.

### Coverage Thresholds

Coverage reporters are configured in `vitest.config.ts`:
- Reporter formats: text (stdout), json (for CI), html (for local browsing)
- Include: `scripts/**/*.{ts,js}` (only production code)
- Exclude: `node_modules/`, test files

---

## Troubleshooting

**Q: Tests fail with "jest is not defined"**  
A: Ensure the test file imports `import { vi } from 'vitest'` and uses `vi.*` instead of `jest.*`.

**Q: Mock not working as expected**  
A: Check that `vi.mock()` is called at the top level (module scope), not inside a test.

**Q: Test timeout**  
A: Increase the timeout in `vitest.config.ts` or per-test:
```javascript
test('slow operation', async () => {
  // ...
}, 30000); // 30 second timeout
```

**Q: Environment variable changes not working**  
A: Use `vi.stubEnv()` instead of direct `process.env` assignment:
```javascript
vi.stubEnv('NODE_ENV', 'test');
```

**Q: Want to use Jest config?**  
A: Vitest does not read `jest.config.js`. Use `vitest.config.ts` (or `vitest.config.js`) for Vitest-specific configuration. If migrating from Jest, rewrite relevant options into Vitest's config format.

---

## Migration Reference

### Why Vitest?

- **ES Module Native:** Vitest runs tests as ES modules (supports `import`/`export`)
- **Fast:** Parallelizes test suites and workers by default
- **Jest Compatible:** 99% API compatibility; most tests run without changes
- **Built on Vite:** Shares Vite's module transformation pipeline
- **Modern:** Actively maintained; regular updates and features
- **TypeScript First:** Native `.ts` test support without extra config

### Comparison: Jest vs Vitest

| Feature | Jest | Vitest |
|---------|------|--------|
| ES Modules | ⚠️ Limited | ✅ Native |
| TypeScript | ✅ With config | ✅ Native |
| Configuration | Complex | Simple (Vite) |
| API Compatibility | N/A | ✅ 99% |
| Speed | Slower | ✅ Faster |
| Mocking | jest.* | vi.* |

---

## Related Documentation

- **Assessment & Planning:** `.github/specs/toa-451-renovate-vitest-migration-assessment/`
- **Renovate (Phase 1):** `docs/RENOVATE.md`
- **Vitest Docs:** https://vitest.dev
- **Jest Migration Guide:** https://vitest.dev/guide/migration.html

---

**Maintainer:** Claude Haiku 4.5  
**Last Updated:** 2026-11-09
