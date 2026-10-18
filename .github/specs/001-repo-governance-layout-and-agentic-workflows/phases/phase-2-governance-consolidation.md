# Phase 2: Governance Consolidation — Repository Restructuring & Canonical Governance Config

**Related Specification**: Spec 021 (lightspeedwp/.github)

**Date Created**: 2026-10-18

**Scope**: Consolidate duplicate governance files from ThisOneTimeOnAcidCom into lightspeedwp/.github as canonical source of truth while preserving repo-specific workflows

**Linked Issues**: TOA-262 (PR/Issue Template Routing), TOA-271 (Validation & Automation)

---

## Objectives

1. Audit existing ThisOneTimeOnAcidCom governance files (labels, templates, issue types)
2. Remove duplicate governance files; preserve custom workflows
3. Implement drift prevention validation (blocks duplicates, allows custom workflows)
4. Implement PR/issue template routing from canonical .github sources
5. Update documentation explaining hybrid model
6. Validate end-to-end via quickstart scenarios

---

## Architecture: Hybrid Governance Model

**Source of Truth**: `lightspeedwp/.github/`
- `.github/labels.yml` (158 canonical labels)
- `.github/issue-types.yml` (24 issue types)
- `.github/ISSUE_TEMPLATE/` (26 templates)
- `.github/PULL_REQUEST_TEMPLATE/` (19 templates)
- `.github/branch-labels.yml` (branch routing)

**Consumer**: `lightspeedwp/ThisOneTimeOnAcidCom/`
- `.github/workflows/` (custom workflows — maintained locally)
- **NO** local copies of labels, templates, issue types
- References canonical governance via routing + API

---

## Phase 2 Implementation Tasks

### Phase 2.1: Setup (Discovery & Audit Preparation)

**Purpose**: Establish baseline understanding of current state before consolidation

- [ ] T401 Clone both repositories locally and configure git remotes for `lightspeedwp/.github` and `lightspeedwp/ThisOneTimeOnAcidCom`
- [ ] T402 Create audit working directory in `.github/.tmp/phase2-audit/` for documentation of findings
- [ ] T403 Document current state: List all governance files present in ThisOneTimeOnAcidCom/.github/ (labels.yml, issue-types.yml, PULL_REQUEST_TEMPLATE/*.md, ISSUE_TEMPLATE/*.md)

---

### Phase 2.2: Foundational (Blocking Prerequisites)

**Purpose**: Core audit and validation setup that MUST complete before user stories

**⚠️ CRITICAL**: User story work cannot begin until Phase 2.2 audit is complete

- [ ] T404 Audit ThisOneTimeOnAcidCom/.github/labels.yml: Compare against canonical lightspeedwp/.github/labels.yml to identify duplicative vs. repo-specific labels (save results to `.github/.tmp/phase2-audit/labels-audit.md`)
- [ ] T405 [P] Audit ThisOneTimeOnAcidCom/.github/issue-types.yml: Identify which issue types are duplicates of canonical, which are repo-specific (save results to `.github/.tmp/phase2-audit/issue-types-audit.md`)
- [ ] T406 [P] Audit ThisOneTimeOnAcidCom/.github/ISSUE_TEMPLATE/: Verify all files are duplicates of canonical templates (count, checksum validation) (save results to `.github/.tmp/phase2-audit/issue-templates-audit.md`)
- [ ] T407 [P] Audit ThisOneTimeOnAcidCom/.github/PULL_REQUEST_TEMPLATE/: Verify all files are duplicates of canonical templates (count, checksum validation) (save results to `.github/.tmp/phase2-audit/pr-templates-audit.md`)
- [ ] T408 [P] Audit ThisOneTimeOnAcidCom/.github/workflows/: Inventory all custom workflows to identify which are repo-specific and should be preserved (save results to `.github/.tmp/phase2-audit/workflows-inventory.md`)
- [ ] T409 Consolidate audit findings: Create summary in `.github/.tmp/phase2-audit/AUDIT-SUMMARY.md` documenting:
  - Duplicate governance files to delete (with file counts and total size)
  - Repo-specific governance items to keep local (if any)
  - Custom workflows to preserve (count and purpose)
  - Risk assessment for each deletion
- [ ] T410 Create PR template reference document in `.github/.tmp/phase2-audit/pr-template-routing-reference.md` showing branch type → template mapping for validation

**Checkpoint**: Audit phase complete — all findings documented, deletion plan validated, custom workflow preservation confirmed. Ready to proceed with consolidation.

---

### Phase 2.3: Configuration Consolidation (Priority: P1)

**Goal**: Remove duplicate governance files from ThisOneTimeOnAcidCom while preserving all custom workflows

**Independent Test**: Verify via `git ls-files` that zero duplicate governance files exist in ThisOneTimeOnAcidCom after consolidation

- [ ] T411 Create validation script at `.github/scripts/verify-single-source.sh` that:
  - Lists all canonical governance files in lightspeedwp/.github
  - Verifies files do NOT exist as duplicates in ThisOneTimeOnAcidCom
  - Reports any drift found
  - Runs in CI/CD pipeline
- [ ] T412 Create governance file inventory in `.github/docs/GOVERNANCE-INVENTORY.md` documenting:
  - Canonical locations: labels.yml (158 labels), issue-types.yml (24 types), ISSUE_TEMPLATE/ (26 templates), PULL_REQUEST_TEMPLATE/ (19 templates)
  - Source of truth authority: lightspeedwp/.github is canonical, ThisOneTimeOnAcidCom references only
  - Expected state after Phase 2: zero duplicate governance files in ThisOneTimeOnAcidCom
- [ ] T413 Run initial validation: Execute validation script to establish baseline and confirm current drift (results saved to CI logs and `.github/.tmp/phase2-audit/baseline-validation.txt`)
- [ ] T414 [P] Delete duplicate labels.yml from ThisOneTimeOnAcidCom: `git rm ThisOneTimeOnAcidCom/.github/labels.yml` with commit message referencing Spec 021
- [ ] T415 [P] Delete duplicate issue-types.yml from ThisOneTimeOnAcidCom: `git rm ThisOneTimeOnAcidCom/.github/issue-types.yml` with commit message referencing Spec 021
- [ ] T416 [P] Delete duplicate ISSUE_TEMPLATE/ directory from ThisOneTimeOnAcidCom: `git rm -r ThisOneTimeOnAcidCom/.github/ISSUE_TEMPLATE/` with commit message referencing Spec 021
- [ ] T417 [P] Delete duplicate PULL_REQUEST_TEMPLATE/ directory from ThisOneTimeOnAcidCom: `git rm -r ThisOneTimeOnAcidCom/.github/PULL_REQUEST_TEMPLATE/` with commit message referencing Spec 021
- [ ] T418 [P] Delete duplicate branch-labels.yml from ThisOneTimeOnAcidCom (if present): `git rm ThisOneTimeOnAcidCom/.github/branch-labels.yml` with commit message referencing Spec 021
- [ ] T419 [P] Verify custom workflows survive consolidation: Check that all files in `ThisOneTimeOnAcidCom/.github/workflows/` remain intact after deletions (run `git ls-files ThisOneTimeOnAcidCom/.github/workflows/` and confirm expected workflow files present)
- [ ] T420 Create consolidation verification checklist in `.github/.tmp/phase2-audit/consolidation-verification.md` confirming:
  - ✅ labels.yml deleted
  - ✅ issue-types.yml deleted
  - ✅ ISSUE_TEMPLATE/ deleted
  - ✅ PULL_REQUEST_TEMPLATE/ deleted
  - ✅ branch-labels.yml deleted (if existed)
  - ✅ Custom workflows preserved
  - ✅ Git history clean (commits reference Spec 021)
- [ ] T421 Update ThisOneTimeOnAcidCom documentation to explain hybrid model:
  - Add section: "Governance Configuration Strategy" to README or governance docs
  - Document that labels, issue types, and PR templates are managed in lightspeedwp/.github
  - Explain that ThisOneTimeOnAcidCom maintains only custom workflows in .github/workflows/
  - Link to canonical files in .github repo
  - File: `ThisOneTimeOnAcidCom/.github/GOVERNANCE.md` or update existing governance docs
- [ ] T422 Run consolidation validation: Execute validation script again to confirm all duplicate files removed (results saved to CI logs and `.github/.tmp/phase2-audit/post-consolidation-validation.txt`)

**Checkpoint**: Configuration consolidation complete — All duplicate governance files removed from ThisOneTimeOnAcidCom. Custom workflows preserved. Consolidation validated. Documentation updated explaining hybrid model.

---

### Phase 2.4: Drift Prevention & Template Routing (Priority: P2)

**Goal**: Implement GitHub Actions validation workflows that prevent new duplicate governance files and enable template routing

**Independent Test**: Create test PR attempting to add duplicate labels.yml, verify it's blocked. Create PR adding custom workflow, verify it's allowed.

- [ ] T423 Create drift detection GitHub Actions workflow at `ThisOneTimeOnAcidCom/.github/workflows/drift-detection.yml`:
  - Triggered on: `pull_request: [opened, reopened, synchronize]`
  - Checks for added/modified files matching blocked patterns:
    - `.github/labels.yml`
    - `.github/issue-types.yml`
    - `.github/branch-labels.yml`
    - `.github/ISSUE_TEMPLATE/**`
    - `.github/PULL_REQUEST_TEMPLATE/**`
  - Allows `.github/workflows/**` (custom workflows permitted)
  - Sets check status to FAILURE if drift detected
  - Sets check status to SUCCESS if no drift
  - Adds comment with clear guidance message
- [ ] T424 Create PR template routing GitHub Actions workflow at `ThisOneTimeOnAcidCom/.github/workflows/pr-template-routing.yml`:
  - Triggered on: `pull_request: [opened, reopened]`
  - Extracts branch prefix from PR branch name (feat/, fix/, etc.)
  - Looks up template in `branch-types.yml` from lightspeedwp/.github
  - Comments on PR with suggested template and applies type label
  - Suggests pr_feature.md for feat/ branches, pr_bug.md for fix/ branches, etc.
- [ ] T425 Test drift detection workflow (negative test — should fail):
  - Create feature branch: `git checkout -b test/drift-detection`
  - Add dummy `ThisOneTimeOnAcidCom/.github/labels.yml` with one label
  - Push branch and create PR
  - Verify: Drift detection workflow runs and marks check as FAILURE
  - Verify: Comment message explains labels are managed in .github
  - Delete test PR after verification
  - Document results in `.github/.tmp/phase2-audit/drift-detection-negative-test.md`
- [ ] T426 Test drift detection allows custom workflows (positive test — should pass):
  - Create feature branch: `git checkout -b test/custom-workflow`
  - Add new custom workflow file: `ThisOneTimeOnAcidCom/.github/workflows/custom-test.yml`
  - Push branch and create PR
  - Verify: Drift detection workflow runs and marks check as SUCCESS
  - Verify: Comment message confirms custom workflows are allowed
  - Delete test PR after verification
  - Document results in `.github/.tmp/phase2-audit/drift-detection-positive-test.md`
- [ ] T427 Test PR template routing workflow:
  - Create feature branch: `git checkout -b feat/routing-test`
  - Make trivial commit and push
  - Create PR from feat/routing-test to develop
  - Verify: Template routing workflow runs and adds comment suggesting pr_feature.md
  - Verify: Applies type:feature label
  - Verify: For fix/routing-test branch, suggests pr_bug.md and applies type:bug
  - Test multiple branch types (feat/, fix/, docs/, etc.)
  - Delete test PRs after verification
  - Document results in `.github/.tmp/phase2-audit/template-routing-tests.md`
- [ ] T428 Add validation workflow configuration documentation:
  - Create `ThisOneTimeOnAcidCom/.github/VALIDATION.md`
  - Explain drift detection contract and what's allowed/blocked
  - Explain template routing contract and branch type mappings
  - Document how developers should respond to validation messages
  - Link to canonical contracts in lightspeedwp/.github
- [ ] T429 Enable required status checks in ThisOneTimeOnAcidCom repository:
  - Configure branch protection on develop and main to require:
    - Drift detection check to pass
    - PR template routing check (informational, not blocking)
  - Screenshot or document in `.github/.tmp/phase2-audit/branch-protection-config.md`

**Checkpoint**: Drift prevention and template routing deployed and tested. Custom workflows allowed. Duplicate governance files blocked. Validation contracts implemented and verified.

---

### Phase 2.5: Custom Workflow Validation (Priority: P3)

**Goal**: Ensure ThisOneTimeOnAcidCom custom workflows remain functional and reference canonical governance correctly

**Independent Test**: Verify custom workflows run without errors and correctly reference canonical labels via API (not duplicates)

- [ ] T430 Audit ThisOneTimeOnAcidCom custom workflows for drift violations:
  - Create validation script at `.github/scripts/audit-custom-workflows.sh`
  - Check for hard-coded label definitions (should use API instead)
  - Check for template file copies (should reference canonical routing instead)
  - Grep for violations: `grep -r "labels\.yml\|issue-types\.yml\|PULL_REQUEST_TEMPLATE\|ISSUE_TEMPLATE\|createLabel" ThisOneTimeOnAcidCom/.github/workflows/`
  - Save results to `.github/.tmp/phase2-audit/workflow-audit.txt`
- [ ] T431 [P] For each custom workflow found in T408 audit, verify it:
  - References canonical labels via GitHub API (if it uses labels)
  - Does NOT copy or duplicate template files
  - Does NOT define label structures
  - Does NOT override canonical configurations
- [ ] T432 Create workflow reference validation checklist in `.github/.tmp/phase2-audit/workflow-reference-checklist.md`:
  - For each custom workflow, verify against validation contract
  - Confirm: No label definitions, API references only, no template copies, custom workflows OK per contract
- [ ] T433 Update ThisOneTimeOnAcidCom workflow documentation explaining:
  - How custom workflows reference canonical labels via GitHub API
  - Constraints and best practices
  - Examples of correct API usage
  - File: `ThisOneTimeOnAcidCom/.github/WORKFLOW-STANDARDS.md`
- [ ] T434 Validate each custom workflow executes successfully in isolation:
  - Create test PR triggering each custom workflow (if applicable)
  - Monitor workflow logs for errors referencing missing templates or labels
  - Document success/failure for each workflow
  - Results: CI logs + manual testing notes in `.github/.tmp/phase2-audit/workflow-execution-tests.md`

**Checkpoint**: Custom workflows validated to use canonical governance correctly. All workflows documented. Execution validated. Reference standards documented.

---

### Phase 2.6: Documentation & Validation (Priority: P4)

**Purpose**: Final documentation, validation, and readiness verification

- [ ] T435 [P] Run quickstart validation scenarios:
  - Scenario 1: Verify single source of truth (validation script validates)
  - Scenario 2: Test PR template routing by branch type
  - Scenario 3: Test drift detection blocks duplicates, allows workflows
  - Scenario 4: Test issue template routing
  - Scenario 5: Test custom workflows use API references
  - Document results in `.github/.tmp/phase2-audit/QUICKSTART-VALIDATION.md`
- [ ] T436 Update main lightspeedwp/.github documentation:
  - Create `lightspeedwp/.github/docs/HYBRID-GOVERNANCE-MODEL.md` explaining:
    - Two-repo architecture: .github (canonical) + ThisOneTimeOnAcidCom (consumer)
    - What's managed where (labels/templates in .github, custom workflows in repos)
    - How drift prevention works
    - How to request changes to canonical files
    - Link to amendment process for locked governance files
- [ ] T437 [P] Create summary report in `.github/.tmp/phase2-audit/PHASE2-COMPLETION-REPORT.md` documenting:
  - All audits completed
  - All duplicate files removed (file counts, sizes)
  - Custom workflows preserved and validated
  - Drift prevention workflows deployed and tested
  - All quickstart scenarios passing
  - CI/CD green on both repos
  - Hybrid model documented
  - Ready for Phase 3
- [ ] T438 [P] Update CLAUDE.md repository instructions (if needed):
  - Add section: "Governance File Consolidation" explaining single source of truth
  - Explain how developers should request canonical file changes
  - Reference governance inventory and amendment process
  - File: `lightspeedwp/.github/CLAUDE.md` (update existing)
- [ ] T439 Create PR summary for Phase 2:
  - Consolidate all Phase 2 work into draft PR on feature branch
  - Include links to audit findings and documentation
  - Request review from governance team (@ashley)
  - Mark as Draft until all tasks complete
- [ ] T440 [P] Verify CI/CD pipeline green:
  - Run full test suite on lightspeedwp/.github: all checks passing
  - Run full test suite on ThisOneTimeOnAcidCom: all checks passing
  - No broken links in documentation
  - All validation workflows execute without errors
  - Document in `.github/.tmp/phase2-audit/CI-CD-VALIDATION.md`

**Checkpoint**: Phase 2 complete — All tasks done, all validation scenarios passing, documentation updated, PR ready for review.

---

## Dependencies & Execution Order

### Phase Dependencies

- **Phase 2.1** (Setup): No dependencies — starts immediately
- **Phase 2.2** (Audit): Depends on Phase 2.1 completion — BLOCKS other phases
- **Phase 2.3** (Consolidation): Depends on Phase 2.2 completion
- **Phase 2.4** (Drift Prevention): Depends on Phase 2.3 completion
- **Phase 2.5** (Workflow Validation): Depends on Phase 2.4 completion
- **Phase 2.6** (Documentation): Depends on all prior phases

### Parallel Opportunities

**Phase 2.2 Audit Tasks** (T404-T408):
- All file audits can run in parallel (different files)
- Each produces independent audit document

**Phase 2.3 File Deletions** (T414-T418):
- All can be deleted in parallel or batched into single commit

**Phase 2.6 Final Tasks** (T435-T440):
- Most can run in parallel (independent validation + documentation)

---

## Success Criteria

- [ ] All 40 tasks completed
- [ ] All audit findings documented and reviewed
- [ ] All duplicate governance files removed from ThisOneTimeOnAcidCom
- [ ] All custom workflows preserved and validated
- [ ] Drift detection and template routing deployed and tested
- [ ] All quickstart scenarios passing
- [ ] CI/CD green on both repositories
- [ ] Hybrid governance model documented
- [ ] Ready for Phase 3 (enhanced monitoring and rollout)

---

## Notes

- Related to Spec 021 (lightspeedwp/.github) — this phase implements the Phase 2 tasks
- Relates to TOA-262 (PR/Issue Template Routing) and TOA-271 (Validation & Automation)
- All test PRs should be cleaned up after verification
- Commits should reference Spec 021 for traceability
- Audit findings stored in `.github/.tmp/phase2-audit/` for reference
