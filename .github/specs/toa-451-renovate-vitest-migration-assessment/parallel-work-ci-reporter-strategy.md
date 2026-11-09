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

**Both use the same schema:**
- Jest uses `testResults[]` with `assertionResults[]` per file
- Vitest 5.0.5 native JSON reporter (`--reporter=json`) emits identical `testResults[]` and `assertionResults[]` structure
- Comparison script will work unchanged with Vitest output

---

## Solution Comparison

### Solution: Use Built-in JSON Reporter (RECOMMENDED)

**Approach:** Use Vitest 5.0.5's built-in JSON reporter, which outputs Jest-compatible format.

**Implementation:**

**Step 1:** No dependencies to add
Vitest 5.0.5 includes the native JSON reporter.

**Step 2:** No changes to `vitest.config.ts`
The existing configuration already supports JSON output via the command-line `--reporter=json` flag.

**Step 3:** Update CI command (`.github/workflows/tests.yml`)

Replace Jest invocation:
```bash
npx jest --config jest.config.js --ci --json --outputFile=jest-report.json
```

With Vitest:
```bash
npx vitest run --config vitest.config.ts --reporter=json --outputFile=jest-report.json
```

**Step 4:** Capture Vitest exit status and account for unhandled errors
The comparison script `scripts/validation/compare-jest-failures.cjs` works unchanged because Vitest 5.0.5's built-in JSON reporter outputs the same `testResults` and `assertionResults` structure as Jest. However, the JSON reporter does not include unhandled run errors in its per-file results. Update the CI workflow to:
- Capture Vitest's exit status without failing the workflow immediately (e.g., `vitest run ... || EXIT_CODE=$?`)
- Always proceed to the comparison step to generate and upload reports
- Add a separate check: if Vitest exited with error AND the comparison found no failures, fail the workflow (regression check for unhandled errors)

**Pros:**
- ✅ Zero changes to comparison script
- ✅ Direct drop-in replacement for Jest
- ✅ No additional dependencies
- ✅ Native Vitest feature (stable & guaranteed)
- ✅ Fast implementation (~5 minutes)

**Cons:**
- ⚠️ Must capture exit status separately for unhandled error detection (see Step 4)

**Status:** ✅ Ready for implementation

---

### Option 2 (Deprecated): Rewrite Comparison Script

**Status:** Not recommended. Vitest 5.0.5 built-in JSON reporter already outputs Jest-compatible format.

**Approach (for reference):** Update `scripts/validation/compare-jest-failures.cjs` to parse Vitest JSON.

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

**Vitest 5.0.5 native format (same as Jest):**
```javascript
// vitest-report.json (built-in JSON reporter)
{
  "testResults": [
    {
      "name": "/path/to/test.js",
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

**Comparison logic unchanged:**

```javascript
// scripts/validation/compare-jest-failures.cjs (no updates needed)

function parseReport(report) {
  // Both Jest and Vitest use testResults with assertionResults
  return {
    total: report.testResults.length,
    failed: report.testResults.filter(f => f.numFailingTests > 0).length,
    files: report.testResults.map(f => ({
      path: f.name,
      failCount: f.numFailingTests,
      errors: f.assertionResults.filter(a => a.status === 'failed')
    }))
  };
}

// Rest of comparison logic unchanged
```

**Effort:** ~0 hours (no changes needed — native Vitest output matches Jest format)

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

## Recommendation

**✅ Recommended: Use Vitest 5.0.5 built-in JSON reporter**

The built-in `--reporter=json` flag outputs the same `testResults` and `assertionResults` structure as Jest. No external dependencies, no script changes needed.

### Implementation Checklist

- [ ] Update `.github/workflows/tests.yml` to run: `npx vitest run --reporter=json --outputFile=jest-report.json`
- [ ] Capture Vitest exit status: `vitest run ... || EXIT_CODE=$?`
- [ ] Always proceed to comparison step (upload reports even if tests fail)
- [ ] Add regression check: if EXIT_CODE != 0 AND comparison shows no failures, fail workflow
- [ ] Test both head and base runs produce compatible JSON
- [ ] Verify `compare-jest-failures.cjs` works unchanged

### Why This Works

Vitest 5.0.5 native JSON reporter outputs identical schema to Jest:
- `testResults[]` array per file
- `assertionResults[]` array per test
- `numFailingTests` count per file
- Same failure message structure

The existing comparison script requires zero changes.
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
