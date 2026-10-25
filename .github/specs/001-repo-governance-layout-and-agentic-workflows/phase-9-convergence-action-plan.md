# Phase 9 Convergence - Action Plan

**Date**: 2026-10-24 | **Status**: EXECUTION IN PROGRESS

## Summary

Phase 9 Convergence requires completion of 6 final tasks (T060–T065) to close out Spec 001 implementation. T060 is complete ✅. Tasks T061–T065 have varying requirements:

- **T060**: PR template routing verification — ✅ **COMPLETE**
- **T061**: Branch protection configuration — 🚫 **Manual GitHub Settings required**
- **T062**: GitHub Discussions enablement — 🚫 **Manual GitHub Settings required**
- **T063**: Styling documentation audit — ✅ **Already complete** (verified in CONTRIBUTING.md)
- **T064**: Protected-file approval & guard workflow validation — 🔴 **BLOCKED** (owner approval needed, controller verification failed)
- **T065**: COMPLETION.md creation — ⏳ **Contingent** (depends on T060–T064)

---

## Task Status & Owner Action Items

### T060: PR Template Routing Verification ✅ COMPLETE

**Status**: VERIFIED AND PASSING

All 4 test PRs successfully demonstrate PR template routing:
- PR #483 (feat/): Routes to `pr_feature.md`, label `type:feature` ✅
- PR #484 (fix/): Routes to `pr_bug.md`, label `type:bug` ✅
- PR #485 (docs/): Routes to `pr_documentation.md`, label `type:documentation` ✅
- PR #486 (test/): Routes to `pr_test.md`, label `type:test` ✅

**Verification Report**: `/tmp/t060-verification-complete.md`

**Result**: Requirement R3.2 (PR Template Routing) **MET** ✅

---

### T061: Enable Branch Protection (develop & main) 🚫 MANUAL REQUIRED

**Requirement**: Configure GitHub Settings branch protection rules

**Manual Steps for Owner (@ashley):**

1. Navigate to Repository Settings → Branches
2. For `develop` branch protection:
   - Click "Add rule"
   - Pattern: `develop`
   - ✓ Require pull request reviews before merging (min 1 approval)
   - ✓ Require review from code owners
   - ✓ Require status checks to pass before merging
   - ✓ Require branches to be up to date before merging
   - Save rule

3. For `main` branch protection:
   - Click "Add rule"
   - Pattern: `main`
   - ✓ Require pull request reviews before merging (min 2 approvals)
   - ✓ Require review from code owners
   - ✓ Require status checks to pass before merging
   - ✓ Restrict who can push to matching branches (maintainers only)
   - Save rule

4. After configuration, reply in this thread with confirmation

**Expected Timeline**: ~5 minutes

---

### T062: Enable GitHub Discussions 🚫 MANUAL REQUIRED

**Requirement**: Configure GitHub Settings to enable Discussions

**Manual Steps for Owner (@ashley):**

1. Navigate to Repository Settings → Features
2. Enable "Discussions" checkbox
3. Configure discussion categories in Settings → Discussions → Categories:
   - **Feature Requests** → template: `feature-request.yml`
   - **Questions & Answers** → template: `question-and-answer.yml`
   - **Show and Tell** → template: `show-and-tell.yml`
   - **General** → template: `general.yml`
   - **Ideas** → template: `ideas.yml` (additional)

4. Create `.github/DISCUSSION_TEMPLATE/README.md` documenting the setup

5. After configuration, reply with confirmation

**Expected Timeline**: ~10 minutes

---

### T063: Styling Documentation Audit ✅ ALREADY COMPLETE

**Status**: VERIFIED AND COMPLETE

Checked `CONTRIBUTING.md` for BEM styling documentation:
- ✓ BEM naming conventions documented
- ✓ File organization (`styles/blocks/`, `styles/tokens/`, `styles/globals.css`) covered
- ✓ Component CSS patterns referenced
- ✓ Link to `guidelines/css-architecture.md` included
- ✓ Rationale for BEM (Figma Make compatibility) explained

**Result**: Requirement R6.1 (Styling Documentation) **MET** ✅

---

### T064: Protected-File Approval & Guard Workflow ⏠ BLOCKED

**Status**: BLOCKED ON OWNER ACTION + CONTROLLER VERIFICATION

**Current State**:
- PR #429 has partial approval from lightspeedwp/.github#3975 (covers only specification files)
- Guard workflow rejected `.github/workflows/protected-files-guard.yml` modifications (outside approved scope)
- Controller verification failed (404 on `lightspeedwp/dependency-merge-controller`)

**Blocking Issues**:
1. **Controller Access**: Cannot verify if centrally-managed workflows will overwrite the guard
2. **Expanded Approval Needed**: Current approval covers only `.github/specs/001-repo-governance-layout-and-agentic-workflows/{COMPLETION.md,tasks.md}`, but NOT `.github/workflows/protected-files-guard.yml`

**Owner Action Required** (@ashley):

1. **Confirm Controller Status**:
   - Check if `lightspeedwp/dependency-merge-controller` is still the active configuration source
   - Verify whether the guard workflow will be overwritten by controller reconciliation
   - Reply with controller status confirmation

2. **Expand Approval** (after controller confirmation):
   - Update lightspeedwp/.github#3975 to explicitly approve:
     - `.github/specs/001-repo-governance-layout-and-agentic-workflows/COMPLETION.md` ✅ (already approved)
     - `.github/specs/001-repo-governance-layout-and-agentic-workflows/tasks.md` ✅ (already approved)
     - `.github/workflows/protected-files-guard.yml` 🔴 (NEW — requires explicit approval)
   - Reply with expanded approval comment link

3. **Trigger Guard Workflow Rerun**:
   - Once expanded approval is recorded, trigger re-run of "Check Protected Files" workflow on PR #429
   - Verify workflow passes (all protected files validated against approval)
   - Reply with successful workflow run URL

**Expected Timeline**: ~20 minutes (pending controller confirmation)

---

### T065: Create COMPLETION.md ⏳ CONDITIONAL

**Status**: BLOCKED UNTIL T060–T064 COMPLETE

**Requirement**: Document implementation completion and handoff

**Automated Action** (once prior tasks complete):

1. Create `.github/specs/001-repo-governance-layout-and-agentic-workflows/COMPLETION.md`
2. Include:
   - Feature: TOA-241 – Repository Governance Infrastructure
   - Status: ✅ DELIVERED (all 8 phases, 5 workstreams, 20 child issues)
   - Completion date and session reference
   - Test results summary:
     - Jest: 622/622 verified ✅
     - Bats: 12/12 reported ✅
     - SpecKit: 103/104 accepted baseline ✅
     - Playwright: configured ✅
   - Protected files: verified intact, no breaking changes ✅
   - Application behavior: preserved (SPA build, Netlify deployment) ✅
   - Outstanding items: None
   - Acceptance sign-off: Ready for owner final review

3. Update `.github/specs/CATALOG.md` to mark TOA-241 as COMPLETE

4. Commit with message:
   ```bash
   docs: T065 COMPLETION.md for Spec 001 – Repository Governance (TOA-241)
   
   All 8 phases complete:
   - Phase 1: Setup & Foundation (CODEOWNERS, Node.js 24, Jest ESM)
   - Phase 2: PR Template Routing (branch-aware template suggestion + type labeling)
   - Phase 3: Labeling Workflow (unified labeling from canonical config)
   - Phase 4: Workflow Lint & Git Hooks (validation + Lefthook enforcement)
   - Phase 5: Branch Validation (authorized naming patterns)
   - Phase 6: Protected Files Guard (configuration drift detection)
   - Phase 7: Changelog Validation (automated CHANGELOG.md consistency)
   - Phase 8: Specification Kit (spec → plan → tasks workflow)
   - Phase 9: Convergence & Handoff (T060–T065 verification + documentation)
   
   Acceptance criteria:
   - ✅ All workflows operational and CI-green
   - ✅ Governance files centrally managed (lightspeedwp/.github)
   - ✅ PR template routing verified across 4 branch prefixes
   - ✅ Protected files validated and owner-approved
   - ✅ Branch protection rules configured (manual)
   - ✅ GitHub Discussions enabled (manual)
   - ✅ Spec Kit regression tests passing (103/104)
   - ✅ Application behavior preserved
   ```

**Expected Timeline**: ~2 minutes (automated)

---

## Execution Order

### 🟢 **READY NOW** (No blockers)

- ✅ T060 — COMPLETE (already verified and documented)
- ✅ T063 — COMPLETE (already verified in CONTRIBUTING.md)

### 🔴 **WAITING FOR OWNER** (Manual GitHub Settings)

- T061 — Requires branch protection configuration (Settings UI)
- T062 — Requires GitHub Discussions enablement (Settings UI)

### 🟠 **WAITING FOR CONTROLLER + APPROVAL** (API + Owner)

- T064 — Requires:
  1. Controller verification (API check)
  2. Expanded owner approval in lightspeedwp/.github#3975
  3. Guard workflow rerun + pass

### ⏳ **BLOCKED UNTIL PRIOR COMPLETE**

- T065 — Creates COMPLETION.md (depends on T060–T064)

---

## Next Steps

**Immediate Actions for Owner (@ashley)**:

1. **T061 & T062**: Perform manual GitHub Settings configuration (Settings → Branches, Settings → Features)
   - Branch protection for `develop` and `main`
   - GitHub Discussions enablement with 5 categories

2. **T064**: Confirm controller status and expand approval in lightspeedwp/.github#3975
   - Verify `lightspeedwp/dependency-merge-controller` status
   - Add explicit approval for `.github/workflows/protected-files-guard.yml`

3. **Confirmation**: Reply in this thread with completion status for each section

**Automated Actions** (triggered after T061–T064 confirmed):
- T065: Generate COMPLETION.md and update CATALOG.md

---

**Current Session**: claude-haiku-4-5 | Phase 9 Convergence  
**Branch**: `ccr-93f8fad4-btpppe` | **Timestamp**: 2026-10-24T16:52:00Z
