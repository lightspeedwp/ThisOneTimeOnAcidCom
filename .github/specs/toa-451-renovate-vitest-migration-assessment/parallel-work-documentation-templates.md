# Parallel Work: Documentation Templates (Ready to Fill)

**Status:** Preparation — ready to populate once decisions finalized  
**Purpose:** Skeleton runbooks & guides for Phase 1 (Renovate) & Phase 2 (Vitest)  
**Blocks:** Post-implementation documentation

---

## Template 1: Renovate Configuration & Approval Runbook

**File location (once created):** `docs/RENOVATE.md`

**Purpose:** Team guide for managing Renovate PRs, understanding rules, escalating issues.

### Skeleton

```markdown
# Renovate Dependency Updates Guide

## Overview

This repository uses [Renovate](https://docs.renovatebot.com) to automate dependency updates.

**Configuration source:** [GOVERNANCE MODEL & LOCATION TBD - Ash's decision]
**Target branch:** develop
**Schedule:** Weekly, Mondays 03:00 SAST
**Update groups:**
- Minor/patch updates (grouped)
- Major updates (separate)

## PR Workflow

### 1. Approval Process

[TBD: Define who approves/merges Renovate PRs]

- **Security updates:** [Fast-track? Auto-merge? Manual review?]
- **Major version bumps:** [Require code review? Testing?]
- **Minor/patch updates:** [Auto-merge policy if exists]

### 2. Handling Update PRs

**What Renovate does:**
- [Fill with: Configuration details from Option A/B/C]
- Creates one PR per update group
- Applies labels: `area:dependencies`, `area:ci`

**What you do:**
1. Review PR description (includes change summary)
2. Check CI status (all required checks must pass)
3. Look for breaking changes in CHANGELOG
4. Approve or request changes

### 3. Blocked or Stale Updates

**If a PR stays open >2 weeks:**
- Comment on PR: Request update status
- Investigate: Is there a blocker?
- Escalate if needed to [TBD: Owner name]

**If Renovate creates too many PRs:**
- [Emergency contact process TBD]
- Temporarily disable bot (via `.github/renovate.json`)
- Adjust grouping rules

## Troubleshooting

### "Renovate didn't create an update"

**Checklist:**
- [ ] Is Renovate enabled for this repo? (Check `lightspeedwp/.github` or local config)
- [ ] Is the schedule active? (Runs Mondays 03:00 SAST)
- [ ] Is the package in `package.json`?
- [ ] Are there version constraints preventing the update?

**Resolution:** Comment on GitHub issue or contact [TBD: Owner]

### "Renovate created too many PRs at once"

**This is normal on first run.** Renovate:
1. Creates a PR for every available update
2. After first run, follows schedule (one PR per week)

**To limit concurrent PRs:**
- Update `.github/renovate.json`: `"prConcurrentLimit": 5`
- Coordinate with org governance (if centralized config)

## References

- [Renovate Configuration Schema](https://docs.renovatebot.com/renovate-schema/)
- [Repository Governance](../CLAUDE.md#governance-files-locked)
- [TOA-451: Renovate Migration Assessment](../.github/specs/toa-451-renovate-vitest-migration-assessment/assessment.md)
```

**Fill-in checklist:**
- [ ] Configuration source & location (after governance decision)
- [ ] Approval process owner name
- [ ] Security update policy
- [ ] Emergency contact details
- [ ] Links to org governance if centralized

---

## Template 2: Vitest Migration & Testing Guide

**File location (once created):** `docs/VITEST.md`

**Purpose:** Developer guide for running tests, writing new tests, migrating from Jest.

### Skeleton

```markdown
# Vitest Unit Testing Guide

## Overview

This repository uses [Vitest](https://vitest.dev) for unit testing.

**Configuration:** `vitest.config.ts`
**Test patterns:** `scripts/**/*.test.js`, `tests/**/*.test.js`
**Coverage:** V8 reporter, `scripts/**/*.js`
**Coverage threshold:** [TBD if enforced]

## Running Tests

### All unit tests
```bash
npm run test:unit
```

### Watch mode (re-run on file change)
```bash
npm run test:unit:watch
```

### Coverage report
```bash
npm run test:unit:coverage
```

### Single test file
```bash
npx vitest run scripts/__tests__/test-figma-access.test.js
```

## Writing New Tests

### Basic test structure
```javascript
import { describe, test, expect, beforeEach, afterEach, vi } from 'vitest';

describe('Feature Name', () => {
  beforeEach(() => {
    // Setup before each test
  });

  afterEach(() => {
    // Cleanup after each test
  });

  test('should do something', () => {
    // Arrange
    const input = { /* ... */ };
    // Act
    const result = doSomething(input);
    // Assert
    expect(result).toBe(expected);
  });
});
```

### Common Vitest APIs

#### Environment Stubbing
```javascript
import { vi } from 'vitest';

beforeEach(() => {
  vi.stubEnv('ENV_VAR', 'value');
});

afterEach(() => {
  vi.unstubAllEnvs();
});
```

#### Mocking Functions
```javascript
import { vi } from 'vitest';

const mockFn = vi.fn();
const mockFn = vi.fn(() => 'return value');
const mockFn = vi.fn().mockReturnValue('return value');
```

#### Mocking Modules
```javascript
vi.mock('./module', () => ({
  default: { /* mock implementation */ }
}));
```

#### Spying on Functions
```javascript
const spy = vi.spyOn(obj, 'method');
expect(spy).toHaveBeenCalled();
spy.mockRestore();
```

## Migrating from Jest

### API Differences

| Jest | Vitest | Notes |
|------|--------|-------|
| `jest.fn()` | `vi.fn()` | Drop-in replacement |
| `jest.mock()` | `vi.mock()` | Similar API |
| `jest.spyOn()` | `vi.spyOn()` | Drop-in replacement |
| `jest.clearAllMocks()` | `vi.clearAllMocks()` | Same |
| Direct `process.env` assignment | `vi.stubEnv()` | Environment isolation |

### Rewriting Test Files

**Step 1:** Update imports
```javascript
// Remove: no changes needed if globals: true
// Add for clarity:
import { describe, test, expect, beforeEach, afterEach, vi } from 'vitest';
```

**Step 2:** Replace Jest utilities
```javascript
// jest.fn() → vi.fn()
const mock = vi.fn();

// jest.mock() → vi.mock()
vi.mock('./module');

// process.env = {...} → vi.stubEnv()
vi.stubEnv('MY_VAR', 'value');
```

**Step 3:** Test locally
```bash
npx vitest run [file]
```

## Coverage

### Current Coverage

[TBD: Include baseline metrics from Jest]

### Coverage Goals

[TBD: Document if coverage threshold is enforced]

## CI Integration

Tests run automatically on:
- Every PR (head branch)
- Every push to `develop` / `main`
- Comparison job detects new failures

[TBD: Include details about comparison strategy & CI workflow]

## Debugging Tests

### Debug a single test
```bash
npx vitest run --inspect-brk scripts/__tests__/test.js
```

### View test output
```bash
npx vitest run --reporter=verbose
```

### Enable tracing (if supported)
```bash
npx vitest --trace-on
```

## References

- [Vitest Documentation](https://vitest.dev)
- [Vi API Reference](https://vitest.dev/api/vi)
- [Configuration Reference](../vitest.config.ts)
- [TOA-451: Vitest Migration Assessment](../.github/specs/toa-451-renovate-vitest-migration-assessment/assessment.md)
```

**Fill-in checklist:**
- [ ] Coverage baseline metrics
- [ ] Coverage threshold policy (if enforced)
- [ ] CI workflow details (from reporter strategy)
- [ ] Links to org governance if relevant

---

## Template 3: Phase 1 (Renovate) Implementation Runbook

**File location (once created):** `.github/specs/toa-451-renovate-vitest-migration-assessment/phase-1-implementation.md`

**Purpose:** Step-by-step execution guide for Renovate rollout.

### Skeleton

```markdown
# Phase 1: Renovate Migration — Implementation Runbook

## Pre-Implementation Checklist

- [ ] Governance decision made: [Option A/B/C]
- [ ] Renovate app installed in `lightspeedwp` org (verify at [org settings link TBD])
- [ ] Configuration reviewed: [link to matching Option A/B/C config]
- [ ] All existing Dependabot PRs merged or closed
- [ ] Team notified of migration timeline

## Implementation Steps

### Step 1: Create Branch & Config
**Time: 15 min**

```bash
git checkout -b renovate/enable-renovate develop
# Copy config from Option A/B/C
cp [config] .github/renovate.json
git commit -m "chore: add Renovate configuration (Option [A/B/C])"
git push -u origin renovate/enable-renovate
```

### Step 2: Deploy Config
**Time: 5 min**

```bash
# If centralized (Option A):
# - Merge config to lightspeedwp/.github/renovate.json
# - PR to ThisOneTimeOnAcidCom with extends reference

# If local (Option B):
# - Open PR with local .github/renovate.json

# Create PR
gh pr create --title "chore: enable Renovate" --draft
```

### Step 3: Verify App Is Active
**Time: 10 min**

Check Renovate bot's GitHub activity:
1. Go to repo Settings → Integrations & applications
2. Confirm "Renovate" is listed and active
3. Check bot's recent activity at @renovate comments

**If bot not active:**
- Request installation from [TBD: Org admin]
- Wait for confirmation
- Re-check activity

### Step 4: Merge Config PR
**Time: 5 min**

After approvals:
```bash
gh pr merge [PR_number] --squash
```

### Step 5: Monitor First Run
**Time: Continuous for 1 week**

Renovate should create PRs within 24 hours.

**Daily checks:**
- [ ] Day 1: Renovate created PR set? (expected: 1–5 PRs)
- [ ] Day 2: Check PR labels & titles conform
- [ ] Day 3–7: Watch schedule adherence

**Expected behavior:**
- First run: 1–5 PRs for pending updates
- Subsequent runs: Follow weekly schedule
- No merge conflicts
- All PRs have correct labels

### Step 6: Validation Checklist
**Time: 1–2 hrs over week**

[Reference: Assessment Part 9, Verification Gates]

- [ ] Test run created expected number of PRs (1–5, not >20)
- [ ] All PRs carry labels: `area:dependencies`, `area:ci`
- [ ] PR titles follow convention: `chore(deps): ...`
- [ ] No merge conflicts
- [ ] No runner quota issues (CI passing)
- [ ] Schedule respected (Monday 03:00 SAST for next batch)

### Step 7: Approve & Merge Sample PRs
**Time: 1–2 hrs**

- [ ] Pick 2–3 PRs (one npm, one GitHub Actions, one major)
- [ ] Review changeset in each
- [ ] Approve & merge if CI passes
- [ ] Verify no regressions after merge

### Step 8: Go Live
**Time: 5 min**

Once validation passes:

```bash
# No further action needed; bot continues on schedule
# To confirm live status:
# 1. Check next PR arrives Monday morning
# 2. Verify labels & grouping
# 3. Team can begin normal review/merge workflow
```

## Rollback (If Needed)

**If excessive PRs created (>20):**
1. Disable bot: Remove `.github/renovate.json`
2. Close open Renovate PRs
3. Investigate config (too broad grouping?)
4. Re-enable with corrected config

**Recovery time: 1–2 hours**

## Post-Implementation

### Documentation
- [ ] Update `docs/RENOVATE.md` with active configuration
- [ ] Link from CONTRIBUTING.md
- [ ] Announce to team

### Ongoing
- [ ] First Monday: Monitor for any issues
- [ ] Quarterly: Review grouping & schedule
- [ ] On request: Adjust policy with org governance

## References

- [Configuration Selected](./parallel-work-renovate-config-options.md)
- [Assessment & Risk Analysis](./assessment.md)
```

**Fill-in checklist:**
- [ ] Org admin contact details
- [ ] Links to settings pages
- [ ] Configuration file paths
- [ ] Team notification template

---

## Template 4: Phase 2 (Vitest) Implementation Runbook

**File location (once created):** `.github/specs/toa-451-renovate-vitest-migration-assessment/phase-2-implementation.md`

**Purpose:** Step-by-step execution guide for Vitest rollout.

### Skeleton

```markdown
# Phase 2: Vitest Migration — Implementation Runbook

## Pre-Implementation Checklist

- [ ] Mock rewrite strategy reviewed: [link to audit]
- [ ] CI reporter strategy decided: [Option 1 or 2]
- [ ] All Jest tests passing locally & in CI
- [ ] Branch ready: `vitest/migrate-from-jest`
- [ ] Team notified of migration timeline

## Implementation Steps

### Step 1: Rewrite Jest Mocks
**Time: 1–2 hours**

[Reference: parallel-work-vitest-mock-audit.md]

```bash
git checkout -b vitest/migrate-from-jest develop

# Edit: scripts/__tests__/test-figma-access.test.js
# Replace: process.env handling with vi.stubEnv()
# Add: vi imports
# Test locally: npx vitest run

# Verify all tests pass
npx vitest run scripts/__tests__/test-figma-access.test.js
```

### Step 2: Implement CI Reporter Strategy
**Time: 1–2 hours**

[Reference: parallel-work-ci-reporter-strategy.md]

**If Option 1 (Jest-compat reporter):**
```bash
npm install --save-dev @vitest/reporters
# Update vitest.config.ts with JestReporter
# Update .github/workflows/tests.yml command
npx vitest run --reporter=jest --outputFile=jest-report.json
```

**If Option 2 (Rewrite script):**
```bash
# Update scripts/validation/compare-jest-failures.cjs
# Add format detection & dual parsers
node scripts/validation/compare-jest-failures.cjs
```

### Step 3: Parallel Test: Jest + Vitest
**Time: 30 min**

**Update npm scripts temporarily:**
```json
{
  "test:unit": "jest && vitest run",
  "test:unit:watch": "vitest run --watch"
}
```

**Run both:**
```bash
npm run test:unit
```

**Verify:**
- [ ] Jest passes
- [ ] Vitest passes
- [ ] Coverage metrics similar
- [ ] Report formats compatible

### Step 4: Switch to Vitest-Only
**Time: 15 min**

```bash
# Update package.json scripts:
{
  "test:unit": "vitest run",
  "test:unit:watch": "vitest run --watch",
  "test:unit:coverage": "vitest run --coverage"
}

# Remove Jest config (optional; can keep for reference)
# rm jest.config.js

# Test:
npm run test:unit
```

### Step 5: Update CI Workflow
**Time: 30 min**

Update `.github/workflows/tests.yml`:

```yaml
# Replace Jest section with:
- name: Run Vitest
  run: |
    npx vitest run --config vitest.config.ts --reporter=json --outputFile=jest-report.json
    # (or --reporter=jest if using Option 1 reporter)
```

### Step 6: Test on PR
**Time: Continuous during PR review**

- [ ] Create PR: `vitest/migrate-from-jest`
- [ ] CI passes: Jest comparison script works with Vitest output
- [ ] No test failures introduced
- [ ] Coverage maintained or improved
- [ ] Performance acceptable (no timeouts)

### Step 7: Validation Checklist
**Time: 1–2 hrs**

[Reference: Assessment Part 9, Verification Gates]

- [ ] All Jest tests discovered by Vitest (`vitest list`)
- [ ] All previously passing tests still pass
- [ ] Coverage metrics equivalent (V8 before/after)
- [ ] Mock rewrites complete & reviewed
- [ ] Comparison script updated & tested
- [ ] CI configured for Vitest
- [ ] No environment variable mismatches
- [ ] Native, build, E2E, Spec Kit suites unaffected

### Step 8: Merge & Deploy
**Time: 5 min**

After validation:
```bash
gh pr merge [PR_number]
```

Verify on `develop`:
- [ ] Jest config archived/removed (if desired)
- [ ] Vitest is default test runner
- [ ] All future tests use Vitest

## Rollback (If Needed)

**If Vitest tests fail systematically:**
1. Revert to Jest config
2. Re-enable Jest in CI workflow
3. Investigate mock compatibility issues
4. Fix and retry

**Recovery time: 1–2 hours**

## Post-Implementation

### Documentation
- [ ] Update `docs/VITEST.md` with live setup
- [ ] Update `docs/TESTING.md` to reflect Vitest
- [ ] Archive Jest docs (if desired)
- [ ] Link from CONTRIBUTING.md

### Ongoing
- [ ] First week: Monitor test stability
- [ ] First month: Collect feedback on Vitest vs Jest
- [ ] Quarterly: Review coverage metrics & test performance
- [ ] On request: Migrate app tests (if coverage expanded)

## References

- [Mock Audit & Rewrite Strategy](./parallel-work-vitest-mock-audit.md)
- [CI Reporter Strategy](./parallel-work-ci-reporter-strategy.md)
- [Assessment & Risk Analysis](./assessment.md)
```

**Fill-in checklist:**
- [ ] Team notification template
- [ ] Links to all supporting docs
- [ ] Recovery escalation path

---

## Summary: Documentation Ready to Fill

All four templates are created as skeleton files with:
- ✅ Clear structure & sections
- ✅ Placeholders for decision-specific content [TBD]
- ✅ References to parallel work documents
- ✅ Step-by-step checklists
- ✅ Rollback procedures

**Once 5 blockers are decided:**
1. Fill in [TBD] sections from decisions
2. Link decision documents
3. Add team-specific contact info
4. Publish in `/docs` after implementation completes

---

**Next Steps:**
1. Parallel work documents (1–4) are ready for implementation
2. Documentation templates (1–4) await decision details
3. Awaiting Ash Shaw's feedback on main assessment & 5 blockers

---
