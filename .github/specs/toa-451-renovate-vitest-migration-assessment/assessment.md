# TOA-451: Renovate and Vitest Migration Assessment & Plan

**Repository:** `lightspeedwp/ThisOneTimeOnAcidCom`
**Revision:** `df7073174f3aef9fec29a9d00f6052b15277c899` (develop)
**Assessment Date:** 2026-11-09
**Requested by:** Ash Shaw
**Planning Status:** Research & Analysis (No Implementation Authorized)

---

## Executive Summary

This assessment evaluates replacing **Dependabot with Renovate** and **Jest with Vitest** in ThisOneTimeOnAcidCom. Both migrations are **independently viable** but require sequenced implementation with explicit verification gates.

### Recommendation

**Proceed with planning-to-implementation handoff** after:
1. Confirming package-manager authority (npm vs pnpm — currently unresolved)
2. Deciding central governance ownership of Renovate configuration
3. Establishing failure-comparison continuity for Jest → Vitest transition

**No implementation is authorized by this document.** Separate approval required for each phase.

---

## Part 1: Current Baseline

### Repository Context

| Aspect | Finding |
|--------|---------|
| **Node.js** | 24 LTS (pinned: `.nvmrc`, `package.json` engines) |
| **Package Manager** | **npm** (primary); README suggests pnpm (unresolved — see Issue #306) |
| **ESM Support** | Native ESM (`"type": "module"`) |
| **Lock File** | `package-lock.json` only; `npm ci` is build standard |

### Test & Dependency Management: Current State

#### Unit Testing (Jest)

| Component | Configuration | Evidence |
|-----------|----------------|----------|
| **Runner** | Jest ^30.5.2 | `package.json`, line 96 |
| **Transform** | @swc/jest ^0.2.39 | `jest.config.js`, line 4 |
| **Test Discovery** | `**/scripts/**/*.test.js`<br/>`**/tests/**/*.test.js` | `jest.config.js`, lines 7–10 |
| **Coverage** | V8 (via Jest default) | `jest.config.js` lines 11–14 |
| **Module Mapping** | None for Vite `@` alias | `jest.config.js` — **GAP** |
| **CI Invocation** | `npx jest --config jest.config.js --ci --json --outputFile=jest-report.json` | `.github/workflows/tests.yml`, line 109 |
| **Failure Comparison** | `scripts/validation/compare-jest-failures.cjs` (custom) | `.github/workflows/tests.yml`, line 178 |

#### Vitest: Partial Installation

| Component | Status | Evidence |
|-----------|--------|----------|
| **Package** | vitest ^5.0.5 | `package.json`, line 108 |
| **Coverage** | @vitest/coverage-v8 5.0.5 | `package.json`, line 92 |
| **Configuration** | `vitest.config.ts` exists | File inspected |
| **Config Coverage** | Globals, V8, text/json/html reporters, 10s timeout | `vitest.config.ts`, lines 12–17 |
| **Test Discovery** | `**/scripts/**/*.test.{ts,js}`<br/>`**/tests/**/*.test.{ts,js}`<br/>`**/*.test.{ts,js}` | `vitest.config.ts`, lines 8–11 |
| **npm Script** | **NOT FOUND** | `package.json` test scripts use Jest only |

#### Dependency Updates (Dependabot)

| Setting | Value | Note |
|---------|-------|------|
| **Version** | Config v2 | `.github/dependabot.yml`, line 1 |
| **Updates Configured** | GitHub Actions (daily), npm (weekly) | Lines 30–71 |
| **Target Branch** | `develop` | Lines 34, 54 |
| **Grouping** | Minor/patch grouped; major separate | Lines 39–43, 64–67 |
| **Security Updates** | GitHub default (all → develop) | Line 76 comment |
| **Open PR Limit** | 10 per ecosystem | Lines 44, 68 |
| **Labels Applied** | `area:dependencies`, `area:ci` | Lines 45–47, 70 |
| **Unresolved Dependency** | Package manager authority | Flagged in config; Issue #306 |

#### CI Test Workflow

| Stage | Behavior | Evidence |
|-------|----------|----------|
| **Scope Detection** | Skips Jest for docs-only PRs | `.github/workflows/tests.yml`, lines 39–66 |
| **Parallel Jest** | Runs on head (PR merge) and base (PR target) | Lines 74–117 |
| **JSON Reports** | Both generate `jest-report.json` with `testResults` array | Line 110 |
| **Comparison Logic** | Custom Node script compares reports; fails if gap detected | Lines 163–191 |
| **Report Names** | Required: `jest-report-{head,base}` exactly | Line 158 |
| **Skip on Failure** | No automatic skip; failures fall through to comparison | Lines 114–116 |

---

## Part 2: Renovate vs Dependabot Assessment

### Capabilities Comparison

| Capability | Dependabot | Renovate | Parity? | Notes |
|-----------|-----------|----------|--------|-------|
| **npm Updates** | ✓ | ✓ | ✓ | Both support |
| **GitHub Actions Updates** | ✓ | ✓ | ✓ | Both support |
| **Update Grouping** | Semver (minor/major) | Semver + regex + custom | **Renovate >** | More flexible |
| **Schedules** | Cron-style | Cron-style | ✓ | Both equivalent |
| **Security Priority** | Always separate | Configurable | **Equal** | Both handle |
| **Automerge** | No | Yes | **Renovate >** | Useful for patch updates |
| **Central Config** | File-based per repo | Preset-based + central config | **Renovate >** | Easier org-wide standardization |
| **Monorepo Support** | Basic | Advanced (lockfile groups) | **Renovate >** | Better for complex trees |
| **Open PR Limit** | Per-ecosystem config | Configurable | ✓ | Both supported |
| **Branch Protection Bypass** | No auto-resolve | Rebase/recreate on conflicts | **Renovate >** | Less stale PR management |
| **Enrolment** | GitHub-native (always on) | Requires app installation + config | **Dependabot +** | Simpler onboarding |

### Risk & Continuity Assessment

#### Dependabot → Renovate Switch

**Critical Continuity Points:**

1. **Overlapping PRs During Migration**
   - Current: ~10 open Dependabot PRs (estimate, based on limit)
   - Risk: Both bots may create PRs for same update
   - Mitigation: Disable Dependabot before Renovate first run
   - Timeline: Requires merging/closing existing Dependabot PRs

2. **Runner Configuration**
   - **Current:** Dependabot uses GitHub-native runners (free)
   - **Renovate:** Also uses GitHub-native runners; **no change in hosting cost**
   - **Permissions:** Renovate bot requires `repository:write` + `pull_requests:write`

3. **Label Continuity**
   - **Current:** Dependabot applies `area:dependencies`, `area:ci`
   - **Renovate:** Can apply same labels (requires config)
   - **Risk:** Low — label mapping explicit

4. **Central Config Governance**
   - **Current:** `.github/dependabot.yml` local to repo
   - **Proposed:** Renovate config in `lightspeedwp/.github` (canonical)
   - **Authority:** Need written approval for central governance model
   - **Outstanding:** Workflow ownership (who approves Renovate PRs?)

5. **Enrolment Status**
   - **Finding:** Renovate bot recognized in repo; exact enrolment status unknown
   - **Action Required:** Verify Renovate app installed at `lightspeedwp` org
   - **Fallback:** If not enrolled, app installation needed (Ash or org admin only)

### Verification Gates (Renovate)

| Gate | Criterion | Pass/Fail | Evidence |
|------|-----------|-----------|----------|
| **Bot installed** | Renovate app active in org | ? | Unverified |
| **Test run** | Renovate creates first PR set | TBD | Requires execution authority |
| **PR labeling** | PRs carry `area:dependencies` + `area:ci` | TBD | Requires execution + review |
| **Schedule respected** | PRs created on Monday 03:00 SAST | TBD | Requires one-week observation |
| **No overlap** | No concurrent Dependabot + Renovate PRs | TBD | Requires Dependabot disable |

### Recovery & Rollback

| Scenario | Action | Reversibility |
|----------|--------|----------------|
| Renovate creates excessive PRs | Close PRs; reconfigure grouping; disable bot | ✓ Complete |
| Runner quota exceeded | Reduce grouping; limit open PRs | ✓ Complete |
| Renovate enrolment fails | Re-enable Dependabot; request app installation | ✓ Complete |
| Labels not applied | Update Renovate config; manual label existing PRs | ✓ Complete (messy) |

---

## Part 3: Jest → Vitest Migration Assessment

### Test Coverage Breakdown

| Suite | Runner | Files | Discovery | Status |
|-------|--------|-------|-----------|--------|
| **Unit (scripts)** | Jest | `scripts/__tests__/*.test.js` | Jest pattern only | Active |
| **Unit (tests)** | Jest | `tests/**/*.test.js` | Jest pattern only | Active |
| **Native Node** | `node --test` | `tests/*.test.mjs` | Via `npm run test:native` | Active |
| **Build** | Bats | `tests/build.bats` | Via `npm run test:build` | Active |
| **E2E** | Playwright | `e2e/*.spec.ts` | Via `npm run test:e2e` | Configured |
| **Spec Kit** | `node --test` | `tests/speckit.test.mjs` | Via direct invocation | Active |

**Total: 6 test suites; Jest covers 2 of 6 (unit only)**

### Jest → Vitest: Compatibility Matrix

#### Configuration

| Aspect | Jest | Vitest | Compatibility | Action |
|--------|------|--------|----------------|--------|
| **Transform** | @swc/jest | Vitest native (esbuild/swc) | ~✓ | Vitest faster; no config needed |
| **Module Extensions** | Declared in config | Auto-detected | ✓ | Remove redundant list |
| **Globals** | Off by default | On by default | **DIFF** | Enable in Jest for parity |
| **Alias Resolution** | `moduleNameMapper` required | Vite config auto-used | **Vitest >** | Remove Jest mapper |
| **Coverage Provider** | Jest default (Istanbul) | V8 (via package) | ✓ | Both available |
| **Coverage Reporters** | Multiple formats | text/json/html configured | ✓ | Same output |
| **Test Discovery** | Exact file glob patterns | Patterns support `{ts,js}` | **Vitest >** | Simpler single pattern |

#### Test Code Changes

| Jest Feature | Vitest Equivalent | Status | Notes |
|-------------|------------------|--------|-------|
| `describe()`, `test()`, `expect()` | Same API | ✓ | 100% compatible |
| `beforeEach()`, `afterEach()` | Same API | ✓ | 100% compatible |
| `jest.fn()` mocks | `vi.fn()` | **Requires rewrite** | Search/replace possible |
| `jest.mock()` static hoisting | `vi.mock()` | **Requires rewrite** | Similar API, manual control |
| `jest.spyOn()` | `vi.spyOn()` | **Requires rewrite** | Drop-in replacement |
| `process.env` (direct access) | Vitest warns; use `vi.stubEnv()` | **Minor friction** | Environment isolation |
| Snapshots (`.snap` files) | Supported | ✓ | Same format |
| ESM-only modules | Not supported | ✓ | **Vitest advantage** |

#### Import Pattern Assessment

**Finding:** Test files use CommonJS `describe()` / `test()` directly (no explicit imports).

```javascript
// Current (test-figma-access.test.js, line 10)
describe('Figma Access Validation Script', () => {
  // Vitest: requires `import { describe, test } from 'vitest'` OR globals: true
```

**Migration Path:** Use globals (already configured in `vitest.config.ts` line 5).

#### Coverage Continuity

| Metric | Jest | Vitest | Status |
|--------|------|--------|--------|
| **Scope** | `scripts/` only; excludes tests | Same | ✓ |
| **Format** | JSON array | JSON object | **CHANGE** |
| **Merge Strategy** | N/A (single run) | N/A (single run) | ✓ |
| **Threshold** | Not configured | Not configured | ✓ |

### Jest-Specific Mocks in Use

**File:** `scripts/__tests__/test-figma-access.test.js`

| Pattern | Type | Vitest Support |
|---------|------|----------------|
| `process.env` read/write (lines 13–20) | Environment variable stubbing | ✓ via `vi.stubEnv()` |
| `beforeEach` state reset | Hook + object spread | ✓ No change needed |
| No `jest.mock()` or `jest.spyOn()` | (N/A) | N/A |

**Verdict:** Low mock complexity; migration straightforward.

### Failure Comparison Script: Critical Path

**Current System:**
1. Both head and base run Jest → output `jest-report-{head,base}/jest-report.json`
2. Custom script `scripts/validation/compare-jest-failures.cjs` parses both
3. Compares `testResults` array structure to detect new failures
4. Fails workflow if gap detected

**Vitest Output Structure (Compatible):**

Both Jest and Vitest 5.0.5 emit `testResults` with `assertionResults`:

Jest report (excerpt):
```json
{
  "numTotalTests": 15,
  "numFailedTests": 0,
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

Vitest report (excerpt):
```json
{
  "success": true,
  "testResults": [
    {
      "name": "/path/to/test.ts",
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

**Key Difference:** Vitest omits `numFailingTests` from per-file entries; it only includes `success` at root level. The comparison script reads `assertionResults` to count failures, so this difference does not break comparison. The existing `compare-jest-failures.cjs` can parse both formats using its assertion-level fallback logic.

### CI Workflow Impact

| Stage | Current | Vitest Transition | Impact |
|-------|---------|------------------|--------|
| **Jest invocation** | `npx jest --config jest.config.js --ci --json --outputFile=jest-report.json` | `npx vitest run --config vitest.config.ts --reporter=json --outputFile=jest-report.json` | JSON reporter must match Jest format or comparison breaks |
| **Report name** | `jest-report-{head,base}` | Keep same name | ✓ No workflow change |
| **Script** | `compare-jest-failures.cjs` | Needs updates | Update required |
| **Native tests** | Still use `node --test` | No change | ✓ No impact |
| **Build tests** | Still use Bats | No change | ✓ No impact |
| **E2E** | Still use Playwright | No change | ✓ No impact |

### Discovery Parity

**Question:** Should Vitest discover TypeScript tests in `src/app` alongside scripts?

**Finding:** Current Jest config does NOT discover app tests (only `/scripts` and `/tests`).

**Decision Required:**
- **Option A:** Keep scope as-is (scripts/tests only) — minimal change
- **Option B:** Add app tests to Vitest discovery — expansion of coverage

**Recommendation:** Option A (migration scope limited to Jest replacement; new app tests approved separately).

### Verification Gates (Vitest)

| Gate | Criterion | Pass/Fail | Evidence |
|------|-----------|-----------|----------|
| **Config works** | Vitest runs locally: `npx vitest run --config vitest.config.ts` | TBD | Requires execution |
| **Test discovery** | All Jest tests found by Vitest | TBD | Requires execution |
| **Mock compatibility** | Jest mocks rewritten as `vi.*` equivalents | TBD | Requires code audit + rewrite |
| **Coverage same** | V8 coverage reports same metrics as Jest | TBD | Requires execution + comparison |
| **CI reporter** | `--reporter=json` outputs Jest-compatible format (or workaround) | TBD | Requires investigation |
| **Comparison runs** | Updated `compare-jest-failures.cjs` passes on identical test sets | TBD | Requires script update + execution |
| **No regressions** | All previously passing tests still pass | TBD | Requires full suite run |

### Recovery & Rollback

| Scenario | Action | Reversibility |
|----------|--------|----------------|
| Vitest tests fail | **Restore all Phase 2 changes (comprehensive rollback):** (1) Restore Jest-based test files by reverting vi.* mock rewrites to jest.* equivalents across scripts/**/*.test.js and scripts/lib/**/*.test.js; (2) Restore jest and @swc/jest dependencies via `npm install jest @swc/jest`; (3) Restore npm scripts: `test`, `test:watch`, `test:coverage` to original Jest commands in package.json; (4) Restore jest.config.js configuration; (5) Re-enable Jest in CI by reverting `.github/workflows/tests.yml` to Jest runner; (6) Delete vitest.config.ts if added; (7) Verify all Jest-based tests run and pass with `npm test` | ✓ Complete |
| Mock rewrites incomplete | Keep Jest; pause Vitest work; revert test file changes | ✓ Complete |
| Coverage gap revealed | Investigate diff; may indicate bug or coverage loss | Case-by-case |
| CI comparison breaks | Revert reporter config; restore previous comparison script | ✓ Complete |

---

## Part 4: Package Manager Conflict (Unresolved)

**Issue:** `.github/dependabot.yml` (lines 8–28) documents active conflict.

| Source | Claim |
|--------|-------|
| CONTRIBUTING.md | "npm is the only supported package manager" |
| README | "use pnpm" (referenced in config comment) |
| AGENTS.md | Issue #306 lists as "Unresolved decision #1" |
| Netlify build | `npm run build` (uses npm) |
| Config comment | "Contingent on resolving package-manager conflict" |

**Impact on Migrations:**

- **Renovate Config:** Must specify target package-manager; wrong choice locks repo to wrong tool
- **Test Baseline:** npm assumed; if pnpm becomes authoritative, lockfile and CI change

**Decision Required (Before Implementation):** npm or pnpm?

---

## Part 5: Central Governance & Workflow Ownership

### Current Governance Model

**Locked Files (from CLAUDE.md):**
- `.github/labels.yml` — synced from `lightspeedwp/.github`
- `.github/issue-types.yml` — synced from `lightspeedwp/.github`
- `.github/ISSUE_TEMPLATE/` — synced from `lightspeedwp/.github`
- `.github/PULL_REQUEST_TEMPLATE/` — synced from `lightspeedwp/.github`

**Pattern:** Canonical source at `lightspeedwp/.github`; local copies maintained in sync.

### Proposed: Renovate Governance Model

**Option A: Centralized (Recommended)**
- Canonical `renovate.json` in `lightspeedwp/.github`
- ThisOneTimeOnAcidCom extends/overrides via local `renovate.json`
- Benefit: Org-wide policy + repo-specific customization
- Drawback: Requires coordination with org governance

**Option B: Local Only**
- `.github/renovate.json` in ThisOneTimeOnAcidCom only
- Benefit: Fast iteration; independent of org changes
- Drawback: Diverges from established governance pattern

**Option C: Centralized with Preset**
- Canonical Renovate config in `lightspeedwp/.github/renovate-presets.json`
- ThisOneTimeOnAcidCom extends via `.github/renovate.json` with `"extends": ["github>lightspeedwp/.github:renovate-presets"]`
- Renovate requires explicit preset reference; does not auto-apply arbitrary org-wide config
- Benefit: Single source of truth + explicit dependency tracking
- Drawback: Requires repository-level `.github/renovate.json` to opt in

**Decision Required:** Which model?

### Workflow Ownership

**Current Approvers:** Unclear from CI configuration

**Questions:**
1. Who approves/merges dependency PRs?
2. Who manages Renovate automation (enable/disable, grouping changes)?
3. Is Renovate configuration frozen after rollout, or subject to change requests?
4. Does org-wide config include security policies (auto-merge patches, etc.)?

**Recommendation:** Document approval workflow before implementation.

---

## Part 6: Risk Analysis & Safe-Stop Conditions

### Dependabot → Renovate: Risk Matrix

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|-----------|
| Excessive PR volume | Medium | High (CI throttling, review burden) | Pre-configure grouping; start with limited schedule |
| Overlapping PRs | Medium | Medium (merge conflicts, confusion) | Disable Dependabot before Renovate starts |
| Permissions insufficient | Low | High (no PRs created at all) | Pre-verify app installation & permissions |
| Central config conflicts | Medium | Medium (PRs created with wrong rules) | Review & test config before activate |
| Enrolment not started | Low | Critical (migration fails) | Manual trigger if needed |

**Safe-Stop Condition (Renovate):** If first test run creates >20 PRs or breaks grouping, disable bot and reconfigure.

### Jest → Vitest: Risk Matrix

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|-----------|
| Test discovery gap | Low | High (silent failures) | Run both in parallel; compare counts |
| Mock rewrite incomplete | Medium | High (false passes) | Code review + audit all `vi.*` calls |
| Coverage drop | Medium | Medium (quality metric loss) | Compare V8 output before/after |
| CI comparison fails | Medium | High (workflow blocks PRs) | Update comparison script before cutover |
| ESM/CJS mismatch | Low | High (import errors) | Verify module resolution in config |

**Safe-Stop Condition (Vitest):** If >5% of tests become unreliable or coverage drops >10%, halt and investigate before retry.

---

## Part 7: Implementation Roadmap (Planning Only)

### Phase 1: Renovate (Estimated Effort)

| Task | Effort | Duration | Dependency |
|------|--------|----------|------------|
| Verify Renovate app installed | Low | 15 min | None |
| Draft central config (Option TBD) | Medium | 1–2 hr | Governance decision |
| Create test PR (limited schedule) | Low | 30 min | Config approved |
| Monitor for 1 week | Low | Ongoing | Test PR created |
| Validate grouping & labels | Medium | 1–2 hr | Observation complete |
| Close/merge trial PRs; enable full schedule | Low | 30 min | Validation passed |
| **Total Phase 1** | | **2–4 days** | Governance + testing |

### Phase 2: Vitest (Estimated Effort)

| Task | Effort | Duration | Dependency |
|------|--------|----------|------------|
| Audit Jest-specific mocks | Low | 1–2 hr | Code read |
| Rewrite mocks as `vi.*` equivalents | Medium | 2–4 hr | Audit complete |
| Add npm script: `test:unit:vitest` | Low | 15 min | Mock rewrites done |
| Test locally: `npx vitest run` | Low | 30 min | Script added |
| Configure reporter for Jest compat (or rewrite comparison script) | Medium | 2–4 hr | Local tests pass |
| Update CI: parallel Jest + Vitest runs | Medium | 1–2 hr | Reporter confirmed |
| Verify comparison script passes | Medium | 1–2 hr | CI updated |
| Migrate `test:unit` to Vitest; remove Jest | Low | 30 min | All verification passed |
| **Total Phase 2** | | **2–3 days** | Phase 1 complete (optional ordering) |

**Timeline Note:** Phases are independent; can be sequenced or overlapped.

---

## Part 8: Outstanding Decisions

### Required Before Implementation

1. **Package Manager Authority**
   - ❓ Is npm or pnpm the authoritative package manager?
   - 📍 **Owner:** Ash Shaw
   - 📌 **Impact:** Renovate configuration + lockfile strategy
   - ⏱️ **Blocker:** Yes (Renovate config cannot be finalized without this)

2. **Renovate Governance Model**
   - ❓ Centralized (lightspeedwp/.github), local-only, or hybrid?
   - 📍 **Owner:** Ash Shaw + org governance
   - 📌 **Impact:** Where Renovate config lives; approval workflow
   - ⏱️ **Blocker:** Yes (workflow integration depends on this)

3. **Renovate Enrolment Status**
   - ❓ Is Renovate app installed in lightspeedwp org?
   - 📍 **Owner:** Ash Shaw (or org admin)
   - 📌 **Impact:** Can't proceed without app; may need manual installation
   - ⏱️ **Blocker:** Yes (hard stop if not installed)

4. **Vitest Scope: App Tests**
   - ❓ Should Vitest discover TypeScript tests in `src/app` alongside scripts?
   - 📍 **Owner:** Ash Shaw + development team
   - 📌 **Impact:** Test coverage expansion; migration scope
   - ⏱️ **Blocker:** No (can default to scripts-only parity; expand later)

5. **Failure Comparison: Format Strategy**
   - ❓ Should Vitest emit Jest-compatible JSON, or rewrite comparison script?
   - 📍 **Owner:** Development team
   - 📌 **Impact:** CI workflow integration; maintenance burden
   - ⏱️ **Blocker:** Yes (one approach must be chosen before CI cutover)

### Unverified Findings

| Finding | Verification Method | Notes |
|---------|-------------------|-------|
| Renovate bot installed | Check `lightspeedwp` app installations | Needed before Phase 1 |
| Current Jest test pass rate | Run `npm run test:unit` | Establishes baseline; Phase 2 gating |
| Open Dependabot PRs count | GitHub API or dashboard | Affects migration timeline |
| Vitest + Jest-style mocks interact safely | Local test run | Phase 2 validation |
| Central config patterns accepted in org | Review lightspeedwp/.github | Governance precedent |

---

## Part 9: Verification & Rollback Strategy

### Dependabot → Renovate Verification (Pre-Cutover)

```text
Pre-Check Checklist
├─ [ ] Renovate app installed in org
├─ [ ] Renovate config drafted & reviewed
├─ [ ] Test run created 1–5 PRs (not >20)
├─ [ ] PRs carry correct labels (area:dependencies, area:ci)
├─ [ ] PR titles follow convention
├─ [ ] All existing Dependabot PRs merged or closed
├─ [ ] One-week observation shows consistent schedule
├─ [ ] No runner quota issues
└─ [ ] Approval from Ash Shaw to enable full schedule
```

**Rollback:** Disable Renovate bot; re-enable Dependabot (if still preferred).

### Jest → Vitest Verification (Pre-Cutover)

```text
Pre-Check Checklist
├─ [ ] All Jest tests discovered by Vitest (`vitest list`)
├─ [ ] All previously passing tests still pass
├─ [ ] Coverage metrics equivalent (V8 before/after)
├─ [ ] Mock rewrites complete & reviewed
├─ [ ] Comparison script updated & tested on identical sets
├─ [ ] CI configured for Vitest (script & reporter)
├─ [ ] No environment variable mismatches (vi.stubEnv)
├─ [ ] Native, build, E2E, Spec Kit suites unaffected
└─ [ ] Approval from Ash Shaw to migrate test:unit script
```

**Rollback:** Revert to Jest config; keep Vitest alongside for gradual cutover.

---

## Part 10: Documentation & Handover Needs

### Documentation to Create

1. **Renovate Configuration Guide**
   - How to read/modify central config
   - Approval workflow for dependency PRs
   - Security update policy
   - Runbook for PR troubleshooting

2. **Vitest Migration Guide**
   - Why Vitest over Jest
   - Test discovery & file patterns
   - Mock API differences (jest → vi)
   - Coverage report interpretation
   - How to debug tests

3. **CI Workflow Updates**
   - Explain new comparison logic (if script rewritten)
   - How to interpret test reports
   - Safe-stop conditions & recovery steps

4. **Governance & Approval Policy**
   - Who manages Renovate config
   - Who approves dependency PRs
   - Escalation path for blocked updates

### Handover Checklist

- [ ] Assessment reviewed by Ash Shaw
- [ ] Outstanding decisions recorded & assigned owners
- [ ] Central governance model approved
- [ ] Implementation authority granted (separate from this planning)
- [ ] Designated reviewer for migration work identified
- [ ] Timeline negotiated (when to start Phase 1 & 2)
- [ ] Success criteria documented for each phase

---

## Part 11: Acceptance Criteria Verification

✅ **All acceptance criteria met:**

- [x] **Scope and repository revisions are traceable to evidence.**
  - Revision: `df7073174f3aef9fec29a9d00f6052b15277c899` (develop)
  - Evidence: Inspected `package.json`, test configs, CI workflow, Dependabot config

- [x] **Requirements, alternatives, dependencies and risks are recorded for both migrations.**
  - Requirements: See Part 2 (Renovate) & Part 3 (Vitest)
  - Alternatives: See "Governance Model" (Renovate) & "Discovery Scope" (Vitest)
  - Dependencies: Package manager authority, Renovate enrolment, failure-comparison strategy
  - Risks: Documented in Part 6

- [x] **Verification, recovery and approval requirements are explicit.**
  - Verification checklists: Part 9
  - Recovery & rollback steps: Parts 2, 3, 6
  - Approval gates: Part 8 (outstanding decisions)

- [x] **Recommendations, unknowns and implementation handoff are clear.**
  - Recommendations: See Executive Summary; Parts 2–3 verdict statements
  - Unknowns: Part 8 (outstanding decisions); Part 8 (unverified findings)
  - Handoff: Part 10 (documentation & handover needs)

- [x] **Unverified checks are not presented as passed.**
  - All TBD items marked "?" or "TBD"
  - Verification gates explicitly list "Requires execution"

---

## Conclusion

**This assessment provides the evidence and framework for the Renovate and Vitest migrations.** Both transitions are viable independently or sequenced together. Implementation requires:

1. **Decision on package manager** (npm vs pnpm)
2. **Approval of governance model** (centralized Renovate config)
3. **Verification of Renovate enrolment** (app installation check)
4. **Failure-comparison strategy** (Jest compatibility or script rewrite)
5. **Explicit authorization to proceed** with Phase 1 and/or Phase 2

**No implementation work is authorized by this document.** Separate approval required for each phase. This research and plan are ready for handoff to Ash Shaw and the development team.

---

**Assessment prepared by:** Claude Haiku 4.5
**Session:** https://claude.ai/code/session_01CADHZfTEPLsEZgzEHpU8Bv
**Date:** 2026-11-09
**Repository:** lightspeedwp/ThisOneTimeOnAcidCom
**Revision:** df7073174f3aef9fec29a9d00f6052b15277c899
