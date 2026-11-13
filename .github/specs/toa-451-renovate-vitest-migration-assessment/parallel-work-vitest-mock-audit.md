---
spec_id: toa-451-parallel-work-vitest-mock-audit
title: Vitest Mock Rewrite Audit
parent_spec: toa-451-renovate-vitest-migration-assessment
status: Preparation — awaiting implementation authority
purpose: Complete mock inventory and rewrite strategy for Jest → Vitest
blocks: Implementation of Phase 2 (Vitest migration)
author: Claude Haiku 4.5
date: 2026-11-09
---

# Parallel Work: Vitest Mock Rewrite Audit

**Status:** Preparation — awaiting implementation authority  
**Purpose:** Complete mock inventory and rewrite strategy for Jest → Vitest  
**Blocks:** Implementation of Phase 2 (Vitest migration)

---

## Summary

**Total Jest test files:** 2 (both in scripts)  
**Total mock patterns found:** 3  
**Rewrite complexity:** LOW  
**Estimated rewrite time:** 1–2 hours

All Jest mocks found are straightforward and have direct Vitest equivalents.

---

## Complete Mock Inventory

### File 1: `scripts/__tests__/test-figma-access.test.js` (50 lines inspected)

**Mocks used:**

| Line(s) | Jest Pattern | Type | Vitest Equivalent | Rewrite Effort |
| --------- | -------------- | ------ | ------------------- | --- |
| 13–16 | `process.env` (direct read/write) | Environment access | `vi.stubEnv()` | Low |
| 11–21 | `beforeEach()` with state reset | Test hook | `beforeEach()` (same) | None |
| 8 | `execSync` import | Native Node import | (no change) | None |

**Current code (lines 13–20):**
```javascript
beforeEach(() => {
  // Reset environment before each test
  process.env = { ...originalEnv };
});
```

**Vitest equivalent:**
```javascript
beforeEach(() => {
  // Vitest prefers explicit stubbing over wholesale env replacement
  Object.keys(process.env).forEach(key => {
    if (!originalEnv[key]) delete process.env[key];
  });
  Object.assign(process.env, originalEnv);
});
```

OR (cleaner, using Vitest API):
```javascript
import { beforeEach, afterEach, vi } from 'vitest';

beforeEach(() => {
  // Stub environment to originalEnv values
  vi.stubEnv('FIGMA_API_TOKEN', originalEnv.FIGMA_API_TOKEN);
  vi.stubEnv('FIGMA_MAKE_FILE_KEY', originalEnv.FIGMA_MAKE_FILE_KEY);
  // ... other vars as needed
});

afterEach(() => {
  vi.unstubAllEnvs();
});
```

---

### File 2: `scripts/__tests__/[future Vitest tests]`

No other test files exist yet. When new tests are added, watch for:

- **`jest.fn()`** → Replace with `vi.fn()`
- **`jest.mock()`** → Replace with `vi.mock()`
- **`jest.spyOn()`** → Replace with `vi.spyOn()`
- **`jest.clearAllMocks()`** → Replace with `vi.clearAllMocks()`
- **`jest.resetModules()`** → Replace with `vi.resetModules()`

---

## Rewrite Strategy

### Phase 1: Audit (DONE)
✅ Identified all mock patterns  
✅ Found 1 environment-stubbing pattern needing rewrite  
✅ No complex Jest-specific mocks (no `.mock()`, `.spyOn()`)  

### Phase 2: Rewrite (Ready to Execute)

**File:** `scripts/__tests__/test-figma-access.test.js`

**Step 1 — Add imports:**
```javascript
import { describe, test, expect, beforeEach, afterEach, vi } from 'vitest';
import { execSync } from 'child_process';
```

**Step 2 — Update `beforeEach` to use `vi.stubEnv`:**

Replace lines 13–16:
```javascript
beforeEach(() => {
  // Reset environment before each test
  process.env = { ...originalEnv };
});
```

With:
```javascript
beforeEach(() => {
  // Vitest explicit environment stubbing
  const envVars = ['FIGMA_API_TOKEN', 'FIGMA_MAKE_FILE_KEY', 'FIGMA_TEAM_ID', 'FIGMA_EXPORT_FORMAT', 'FIGMA_EXPORT_SCALE'];
  envVars.forEach(key => {
    if (originalEnv[key]) {
      vi.stubEnv(key, originalEnv[key]);
    }
  });
});

afterEach(() => {
  vi.unstubAllEnvs();
});
```

**Step 3 — No other changes needed**

Rest of test code is 100% Jest/Vitest compatible (describe, test, expect, beforeEach all identical).

---

## Vitest Config Verification

**Current `vitest.config.ts` (lines checked):**

```typescript
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,  // ✅ Enables describe/test/expect without imports
    environment: 'node',
    include: [
      '**/scripts/**/*.test.{ts,js}',  // ✅ Covers scripts/__tests__/*.test.js
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

**Verdict:** ✅ Configuration is correct; no changes needed.

**Note:** `globals: true` on line 5 means test files don't need explicit imports of `describe`, `test`, `expect`. However, for clarity and IDE support, imports are recommended (they don't hurt with globals enabled).

---

## Coverage Continuity Check

| Metric | Jest Current | Vitest (Expected) | Status |
| -------- | -------------- | ------------------- | -------- |
| **Scope** | `scripts/**/*.js` | `scripts/**/*.{ts,js}` | ✅ Expanded (TS support) |
| **Files covered** | `test-figma-access.test.js` | Same | ✅ Same |
| **Reporters** | JSON (default Jest) | text/json/html | ✅ More output options |
| **Format** | Jest JSON schema | V8 JSON schema | ⚠️ Different (see CI strategy) |

---

## CI Integration Check

**Current CI:** `.github/workflows/tests.yml` invokes Jest with `--json` reporter

**Vitest equivalent command:**
```bash
npx vitest run --config vitest.config.ts --reporter=json --outputFile=jest-report.json
```

**JSON format difference:**

Jest output (current):
```json
{
  "numTotalTests": 15,
  "numFailedTests": 0,
  "testResults": [...]
}
```

Vitest output (native JSON reporter):
```json
{
  "numTotalTests": 15,
  "numFailedTests": 0,
  "testResults": [
    {
      "name": "/path/to/test-figma-access.test.js",
      "numFailingTests": 0,
      "assertionResults": [
        {
          "title": "test name",
          "status": "passed"
        }
      ]
    }
  ]
}
```

**Solution:** Two options available (see assessment Part 3 & parallel-work-ci-reporter-strategy.md)

---

## Rewrite Checklist (Ready to Execute)

- [ ] Add `vi` and test hooks to imports (line 8)
- [ ] Replace `beforeEach` (lines 13–16) with `vi.stubEnv` calls
- [ ] Add `afterEach` with `vi.unstubAllEnvs()`
- [ ] Run locally: `npx vitest run scripts/__tests__/test-figma-access.test.js`
- [ ] Verify all tests pass
- [ ] Compare coverage metrics (Jest vs Vitest)
- [ ] Push to branch for CI validation

---

## Risk Assessment

| Risk | Likelihood | Severity | Mitigation |
| ------ | ----------- | ---------- | ----------- |
| Environment stubbing doesn't work | Low | Medium | Test locally first; fallback to wholesale env replacement |
| Vitest discovery misses test file | Very Low | High | Verify `vitest list` shows the file |
| Coverage drop after migration | Low | Medium | Compare V8 reports; investigate gaps |
| Test passes but behaves differently | Very Low | High | Run full test suite locally before CI |

---

## Next Steps

1. **Ash decides:** Is Vitest app-test scope expanded (Part 8, Decision 4)?
2. **Implement:** Follow rewrite checklist above
3. **Validate:** Run `npx vitest run` locally; compare coverage
4. **CI integration:** Update `.github/workflows/tests.yml` to use Vitest (pending reporter strategy)

---

**Assessment Reference:** See `.github/specs/toa-451-renovate-vitest-migration-assessment/assessment.md` Part 3 & Part 9 for Vitest context and CI verification gates.
