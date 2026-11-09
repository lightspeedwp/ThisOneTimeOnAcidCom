# Parallel Work: Vitest CI Reporter Strategy

**Status:** Preparation — awaiting implementation authority  
**Purpose:** Resolve Jest → Vitest JSON format difference for CI comparison script  
**Blocks:** Implementation of Phase 2 (Vitest CI integration)  
**Critical Decision:** Part 8, Decision 5 of assessment

---

## The Problem

**Current CI flow:**
1. Jest runs on head & base, outputs `jest-report.json`
2. Custom script `scripts/validation/compare-jest-failures.cjs` compares reports
3. Script expects Jest JSON schema with `testResults` array

**Vitest JSON schema is different:**
- Jest uses `testResults[]` with file-level results
- Vitest uses `files[]` with same data, different structure
- Comparison script will fail on Vitest output

---

## Solution Comparison

### Option 1: Use Jest-Compatible Reporter (RECOMMENDED)

**Approach:** Configure Vitest to emit Jest-compatible JSON.

**Implementation:**

**Step 1:** Add dependency
```bash
npm install --save-dev @vitest/reporters
```

**Step 2:** Update `vitest.config.ts`
```typescript
import { defineConfig } from 'vitest/config';
import JestReporter from '@vitest/reporters/use/jest';

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
    },
    testTimeout: 10000,
    reporters: ['default', new JestReporter()], // Add Jest-compatible reporter
  },
});
```

**Step 3:** Update CI command (`.github/workflows/tests.yml`)

Replace Jest invocation:
```bash
npx jest --config jest.config.js --ci --json --outputFile=jest-report.json
```

With Vitest:
```bash
npx vitest run --config vitest.config.ts --reporter=jest --outputFile=jest-report.json
```

**Step 4:** No script changes needed
The comparison script `scripts/validation/compare-jest-failures.cjs` works unchanged.

**Pros:**
- ✅ Zero changes to comparison script
- ✅ Direct drop-in replacement for Jest
- ✅ Familiar format across repos
- ✅ Fast implementation

**Cons:**
- ⚠️ Vitest reporter still immature (check stability)
- ⚠️ Adds dependency (@vitest/reporters)

**Status:** ⏳ Verify @vitest/reporters maturity & compatibility

---

### Option 2: Rewrite Comparison Script

**Approach:** Update `scripts/validation/compare-jest-failures.cjs` to parse Vitest JSON.

**Implementation:**

**Current script handles Jest format:**
```javascript
// jest-report.json
{
  "numTotalTests": 588,
  "numFailedTests": 0,
  "testResults": [
    {
      "name": "/path/to/test.js",
      "numFailingTests": 0,
      "failures": []
    }
  ]
}
```

**Update to support Vitest format:**
```javascript
// vitest-report.json
{
  "stats": {
    "tests": 588,
    "failures": 0
  },
  "files": [
    {
      "filepath": "/path/to/test.js",
      "numFailing": 0,
      "errors": []
    }
  ]
}
```

**Diff strategy:** Add format detection + dual parsers

```javascript
// scripts/validation/compare-jest-failures.cjs (updated)

function parseReport(report) {
  // Detect format
  if (report.testResults) {
    // Jest format
    return {
      total: report.numTotalTests,
      failed: report.numFailedTests,
      files: report.testResults.map(f => ({
        path: f.name,
        failCount: f.numFailingTests,
        errors: f.failures || []
      }))
    };
  } else if (report.files) {
    // Vitest format
    return {
      total: report.stats.tests,
      failed: report.stats.failures,
      files: report.files.map(f => ({
        path: f.filepath,
        failCount: f.numFailing,
        errors: f.errors || []
      }))
    };
  }
  throw new Error('Unknown report format');
}

// Rest of comparison logic unchanged
```

**Effort:** ~1–2 hours (test both formats, validate comparison logic)

**Pros:**
- ✅ No external dependencies
- ✅ Works with any Vitest version (uses native output)
- ✅ More control over parsing
- ✅ Forwards-compatible (supports future Vitest changes)

**Cons:**
- ⚠️ Requires script maintenance
- ⚠️ Dual-format parsing adds complexity
- ⚠️ Different report formats diverges from Jest precedent

**Status:** 🟢 Script rewrite is feasible and low-risk

---

## Recommendation & Decision Matrix

| Factor | Option 1 (Jest-compat reporter) | Option 2 (Rewrite script) |
|--------|--------------------------------|--------------------------|
| **Implementation speed** | Fast (1 hour) | Medium (2 hours) |
| **Dependency changes** | +1 package | None |
| **Script changes** | None | Moderate (40–50 lines) |
| **Maintenance burden** | Low (vendor-managed) | Medium (we maintain) |
| **Future-proofing** | ✅ Follows Vitest convention | ✅ Independent of Vitest |
| **Risk** | Low (if stable) | Very Low (proven approach) |

### Recommendation

**Option 1 (Jest-compatible reporter) IF:**
- `@vitest/reporters` is stable and widely used
- Vitest team commits to Jest format compatibility

**Option 2 (Rewrite script) IF:**
- `@vitest/reporters` is immature or undocumented
- We want maximum control & predictability

**Suggested Path:** Try Option 1 first (faster); if issues arise, fall back to Option 2 (proven approach).

---

## Implementation Checklist (Ready to Execute)

### For Option 1:
- [ ] Verify `@vitest/reporters` package stability & documentation
- [ ] Install and test locally: `npm install --save-dev @vitest/reporters`
- [ ] Update `vitest.config.ts` with JestReporter
- [ ] Run test: `npx vitest run --reporter=jest --outputFile=jest-report.json`
- [ ] Validate output format matches Jest schema
- [ ] Update CI command in `.github/workflows/tests.yml`
- [ ] Test on branch before merging

### For Option 2:
- [ ] Extract Vitest JSON format spec from official docs
- [ ] Write format detection logic
- [ ] Update comparison algorithm for both formats
- [ ] Add test cases for both Jest and Vitest reports
- [ ] Verify comparison logic produces same results (regression test)
- [ ] Update CI command in `.github/workflows/tests.yml`
- [ ] Test on branch before merging

---

## Reference Data: Vitest vs Jest Report Structure

### Jest Report (Full Example)
```json
{
  "success": false,
  "testResults": [
    {
      "name": "/home/user/repo/scripts/__tests__/test-figma.test.js",
      "message": "",
      "status": "passed",
      "startTime": 1699518600000,
      "endTime": 1699518602000,
      "coverage": {
        "lines": {
          "total": 150,
          "covered": 145,
          "skipped": 0,
          "pct": 96.67
        }
      },
      "numFailingTests": 0,
      "numPassingTests": 15,
      "numPendingTests": 0,
      "numTodoTests": 0,
      "perfStats": {
        "start": 1699518600000,
        "end": 1699518602000
      }
    }
  ],
  "numTotalTestSuites": 1,
  "numPassedTestSuites": 1,
  "numFailedTestSuites": 0,
  "numPendingTestSuites": 0,
  "numTotalTests": 15,
  "numPassedTests": 15,
  "numFailedTests": 0,
  "numPendingTests": 0,
  "numTodoTests": 0,
  "openHandles": [],
  "wasInterrupted": false
}
```

### Vitest Report (Full Example)
```json
{
  "stats": {
    "duration": 2000,
    "startTime": 1699518600000,
    "tests": 15,
    "passes": 15,
    "failures": 0,
    "skipped": 0
  },
  "config": {
    "include": ["**/scripts/**/*.test.{ts,js}"],
    "exclude": ["node_modules"]
  },
  "files": [
    {
      "filepath": "/home/user/repo/scripts/__tests__/test-figma.test.js",
      "collectOnly": false,
      "skipped": false,
      "tests": [
        {
          "id": "1",
          "name": "should use environment variables for configuration",
          "type": "test",
          "mode": "run",
          "meta": {},
          "file": {
            "filepath": "/home/user/repo/scripts/__tests__/test-figma.test.js",
            "taskId": "1"
          },
          "duration": 5,
          "startTime": 1699518600005,
          "state": "pass",
          "errors": [],
          "logs": null,
          "coverage": null
        }
      ],
      "numFailing": 0,
      "numPassing": 15,
      "numSkipped": 0,
      "duration": 2000,
      "errors": []
    }
  ]
}
```

---

## Next Steps

1. **Ash decides:** Option 1 or Option 2?
2. **Investigation:** Verify package stability (if Option 1)
3. **Implement:** Execute matching checklist
4. **Validate:** Test both Jest and Vitest outputs
5. **CI update:** Deploy to `.github/workflows/tests.yml`

---

**Assessment Reference:** See `.github/specs/toa-451-renovate-vitest-migration-assessment/assessment.md` Part 3 & Part 9 for Vitest CI context and verification gates.
