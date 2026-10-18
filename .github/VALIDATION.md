# Validation Workflows — Phase 2 Governance Consolidation

**Document created:** 2026-10-18  
**Phase:** 2.4 Drift Prevention & Template Routing  
**Related:** Spec 001 Phase 2, Spec 021, lightspeedwp/.github

---

## Overview

This document explains the validation workflows that enforce the hybrid governance model where:

- **Canonical governance** (labels, issue types, PR templates) is centralized in `lightspeedwp/.github`
- **Consumer repository** (ThisOneTimeOnAcidCom) maintains **custom workflows only**
- **Drift prevention** blocks attempts to add duplicate governance files
- **Template routing** suggests appropriate PR templates based on branch type

---

## Drift Detection Workflow

**File:** `.github/workflows/drift-detection.yml`

**Trigger:** Pull Request opened, reopened, or synchronized

**Purpose:** Prevent duplicate governance files from being added to ThisOneTimeOnAcidCom

### What Gets Blocked

The workflow **blocks** these files if they appear in a PR:

- `.github/labels.yml` — Use canonical from lightspeedwp/.github instead
- `.github/issue-types.yml` — Use canonical from lightspeedwp/.github instead
- `.github/branch-labels.yml` — Use canonical from lightspeedwp/.github instead
- `.github/ISSUE_TEMPLATE/**` — Use canonical from lightspeedwp/.github instead
- `.github/PULL_REQUEST_TEMPLATE/**` — Use canonical from lightspeedwp/.github instead

### What Gets Allowed

The workflow **allows** these files:

- `.github/workflows/**` — Custom repository workflows are maintained locally and are encouraged

### Check Results

**✅ PASS** — No blocked files detected. Configuration stays canonical.

**❌ FAIL** — Blocked files detected. The PR will not merge until duplicates are removed.

### Developer Action

If the check fails:

1. Identify which files the workflow flagged
2. Remove the duplicate files: `git rm <file>`
3. Push the corrected commit
4. The check will re-run and pass

### Why This Matters

- **Single source of truth** — One copy of governance files for all org repos
- **Consistency** — All repos use identical label definitions and PR templates
- **Auditability** — Changes are tracked in one place (lightspeedwp/.github)
- **Reduced maintenance** — Updates to governance don't require touching multiple repos

---

## PR Template Routing Workflow

**File:** `.github/workflows/pr-template-routing.yml`

**Trigger:** Pull Request opened or reopened

**Purpose:** Suggest the correct PR template based on branch type and apply matching type label

### How It Works

1. **Extract branch prefix** — Reads the PR's branch name (e.g., `feat/my-feature`)
2. **Map to template** — Routes to the appropriate template based on prefix
3. **Suggest template** — Comments on the PR with template recommendation
4. **Apply label** — Adds a type label matching the branch prefix

### Branch Type → Template Mapping

| Branch Prefix | Template | Label | Description |
|---|---|---|---|
| `feat/` | `pr_feature.md` | `type:feature` | Feature/Enhancement |
| `fix/` | `pr_bug.md` | `type:bug` | Bug Fix |
| `docs/` | `pr_documentation.md` | `type:documentation` | Documentation |
| `design/` | `pr_design.md` | `type:design` | Design System |
| `test/` | `pr_test.md` | `type:test` | Test/QA |
| `chore/` | `pr_chore.md` | `type:chore` | Maintenance |
| `perf/` | `pr_performance.md` | `type:performance` | Performance |
| `refactor/` | `pr_refactor.md` | `type:refactor` | Refactoring |
| `security/` | `pr_security.md` | `type:security` | Security |
| `ci/` | `pr_ci.md` | `type:ci` | CI/CD |
| Other | `pr_default.md` | `type:maintenance` | General |

### Example

**Branch:** `feat/user-authentication`

**Workflow output:**
```
## PR Template Routing 📋

Branch prefix: **feat**

Suggested template: **pr_feature.md**

Type: Feature/Enhancement PR

---

Canonical templates are managed in [lightspeedwp/.github](https://github.com/lightspeedwp/.github):
- Review the suggested template to ensure your PR description covers required sections
- All PR templates route from the central .github repository
```

**Label applied:** `type:feature`

### Template Specifications

All canonical PR templates are stored in `lightspeedwp/.github/.github/PULL_REQUEST_TEMPLATE/` and include:

- **Summary** — Brief overview of changes
- **Motivation** — Why these changes are needed
- **Changes** — What was actually changed
- **Testing** — How the changes were tested
- **Checklist** — Standard verification steps
- **Breaking Changes** (if applicable) — Impact on users

---

## Validation Contract

### Drift Detection Contract

**Guarantee:** If a PR passes the drift detection check, it contains:
- ✅ Zero duplicate governance files
- ✅ Only custom workflows in `.github/workflows/`
- ✅ Correct references to canonical .github repo

### PR Template Routing Contract

**Guarantee:** If a PR has the template routing workflow applied, it:
- ✅ Has a branch prefix matching one of the type list above
- ✅ Received a comment with template suggestion
- ✅ Received an appropriate type label
- ✅ Can use the canonical template as a reference

---

## Troubleshooting

### Drift Detection Fails

**Problem:** PR blocked with "Configuration drift detected"

**Solution:**
1. Check which files are flagged (shown in workflow comment)
2. Remove the file: `git rm <flagged-file>`
3. Commit and push
4. Workflow will re-run and pass

**Prevention:**
- Never copy governance files from .github
- Always reference canonical templates via branch routing
- If you need to change governance: Open an issue in lightspeedwp/.github with `[LABEL-UPDATE-REQUEST]` or `[TEMPLATE-UPDATE-REQUEST]`

### PR Template Not Applied

**Problem:** Branch doesn't match any known prefix, or label fails to apply

**Solution:**
1. Ensure branch name follows `{type}/{scope}-{title}` pattern
2. Check that type is in the mapping table above
3. If using uncommon type, rename branch to match a standard prefix
4. Workflow will re-run and apply correct template

**Note:** If a label fails to apply, it's usually because the label doesn't exist in the repository. The workflow logs a warning but doesn't fail the PR.

---

## Related Documentation

- **Governance Inventory:** `.github/docs/GOVERNANCE-INVENTORY.md` — Complete list of canonical files
- **Governance Model:** `.github/GOVERNANCE.md` — Hybrid model explanation for developers
- **Canonical Source:** `lightspeedwp/.github/.github/` — All canonical governance files
- **Change Requests:** Open an issue in lightspeedwp/.github with:
  - `[LABEL-UPDATE-REQUEST]` — to change `.github/labels.yml`
  - `[TEMPLATE-UPDATE-REQUEST]` — to change PR/issue templates
  - `[ISSUE-TYPE-UPDATE-REQUEST]` — to change `.github/issue-types.yml`

---

## Workflow Execution Details

### Drift Detection Workflow

**Environment:** Ubuntu Latest  
**Timeout:** 5 minutes  
**Permissions:** contents:read, pull-requests:write

**Steps:**
1. Check out PR code
2. Search for forbidden files/directories
3. Verify custom workflows are present
4. Comment on PR with results
5. Set check status (pass/fail)

**Cost:** ~30 seconds per PR

### PR Template Routing Workflow

**Environment:** Ubuntu Latest  
**Timeout:** 5 minutes  
**Permissions:** contents:read, pull-requests:write, issues:write

**Steps:**
1. Extract branch prefix using regex
2. Map prefix to template and label
3. Post comment with suggestion
4. Apply type label to PR

**Cost:** ~20 seconds per PR

---

## Monitoring & Metrics

Track validation success using:

1. **GitHub Actions Dashboard** — View all workflow runs
2. **PR Comment Timeline** — Each PR gets workflow comments
3. **Label Application** — Type labels show which workflow ran
4. **Branch Protection Rules** — Drift detection is a **required check** that blocks PRs with duplicate governance files; template routing is **informational** (provides routing suggestion)

---

**Document Owner:** Claude Code  
**Last Updated:** 2026-10-18  
**Status:** Phase 2.4 Drift Prevention & Template Routing (In Progress)
