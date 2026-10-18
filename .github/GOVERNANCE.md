# Governance Configuration Strategy

**Repository:** lightspeedwp/ThisOneTimeOnAcidCom  
**Strategy:** Hybrid Governance Model  
**Related:** Spec 001 (Phase 2), Spec 021 (lightspeedwp/.github)  
**Last Updated:** 2026-10-18

---

## Overview

ThisOneTimeOnAcidCom follows a **hybrid governance model** where repository configuration is split between:

1. **Canonical Governance** — Centralized in `lightspeedwp/.github` (source of truth)
2. **Custom Workflows** — Maintained locally in ThisOneTimeOnAcidCom (repository-specific)

This architecture ensures consistency across repositories while allowing each repository to maintain custom automation.

---

## Canonical Governance (Source of Truth)

The following configuration files are managed **exclusively** in `lightspeedwp/.github` and are **NOT duplicated** in ThisOneTimeOnAcidCom:

| File/Directory | Purpose | Management |
|---|---|---|
| `.github/labels.yml` | Organization-wide issue and PR labels (158 labels) | Locked, curated by @ashley |
| `.github/issue-types.yml` | Issue type definitions (24 types) | Locked, curated by @ashley |
| `.github/ISSUE_TEMPLATE/*.md` | Issue creation templates (26 templates) | Locked, curated by @ashley |
| `.github/PULL_REQUEST_TEMPLATE/*.md` | PR creation templates (19 templates) | Locked, curated by @ashley |
| `.github/branch-labels.yml` | Branch type to label routing configuration | Locked, curated by @ashley |

### Why Canonical Files Are Centralized

- **Consistency:** All repositories use identical labels, templates, and issue types
- **Auditability:** Single version history for all configuration changes
- **Maintainability:** Changes propagate automatically to all consuming repositories
- **Scalability:** New repositories inherit governance without duplication

---

## Custom Workflows (Repository-Specific)

ThisOneTimeOnAcidCom maintains custom workflows in `.github/workflows/` for repository-specific automation:

| Workflow | Purpose | Maintained |
|---|---|---|
| `branch-name-validation.yml` | Validates branch naming conventions | ThisOneTimeOnAcidCom |
| `dependency-automation.yml` | Automates dependency updates | ThisOneTimeOnAcidCom |
| `dependency-validation.yml` | Validates dependency integrity | ThisOneTimeOnAcidCom |
| `drift-detection.yml` | Reports duplicate governance files (Phase 2.4; informational) | ThisOneTimeOnAcidCom |
| `pr-template-routing.yml` | Routes PR templates by branch type (Phase 2.4) | ThisOneTimeOnAcidCom |
| `labeling-unified.yml` | Automates issue/PR labeling | ThisOneTimeOnAcidCom |
| `changelog-unified.yml` | Manages changelog entries | ThisOneTimeOnAcidCom |
| `validate-specifications.yml` | Validates governance specifications | ThisOneTimeOnAcidCom |
| `claude-guard-tests.yml` | Validates Claude-generated code | ThisOneTimeOnAcidCom |
| Additional custom workflows | Repository-specific automation | ThisOneTimeOnAcidCom |

**Total:** 10+ custom workflows preserved and maintained locally

---

## How It Works

### Configuration Access

1. **GitHub Actions**
   - Workflows reference canonical files from `lightspeedwp/.github`
   - Template routing applies correct templates based on branch prefix
   - Label references resolve to canonical `lightspeedwp/.github/labels.yml`

2. **Issue/PR Creation**
   - Issue templates load from canonical `lightspeedwp/.github/ISSUE_TEMPLATE/`
   - PR templates load from canonical `lightspeedwp/.github/PULL_REQUEST_TEMPLATE/`
   - Label suggestions use canonical label definitions

3. **Drift Prevention**
   - `drift-detection.yml` reports duplicate governance files and fails its check when they are present
   - Checks for `.github/labels.yml`, `.github/issue-types.yml`, `.github/branch-labels.yml`, and files in `.github/ISSUE_TEMPLATE/` or `.github/PULL_REQUEST_TEMPLATE/`
   - The check is informational and is not required for merging into `main` or `develop`
   - Allows `.github/workflows/**` custom workflows

---

## Validation

### Single Source of Truth Validation

Run this script to confirm ThisOneTimeOnAcidCom has zero duplicate governance files:

```bash
./.github/scripts/verify-single-source.sh
```

**Expected output:**
```
✅ VALIDATION PASSED: Zero drift detected
   ThisOneTimeOnAcidCom correctly references canonical .github
```

### Baseline Validation Results

**Date:** 2026-10-18  
**Status:** ✅ All checks passed

- ✅ No `.github/labels.yml` (uses canonical)
- ✅ No `.github/issue-types.yml` (uses canonical)
- ✅ No `.github/branch-labels.yml` (uses canonical)
- ✅ No `.github/ISSUE_TEMPLATE/` (uses canonical)
- ✅ No `.github/PULL_REQUEST_TEMPLATE/` (uses canonical)
- ✅ 10+ custom workflows preserved

---

## Change Request Process

### To Update Canonical Governance Files

Open an issue on **lightspeedwp/.github** with one of these tags:

- `[LABEL-UPDATE-REQUEST]` — Request changes to `.github/labels.yml`
- `[TEMPLATE-UPDATE-REQUEST]` — Request changes to PR/issue templates
- `[ISSUE-TYPE-UPDATE-REQUEST]` — Request changes to `.github/issue-types.yml`

1. Describe the specific change needed
2. Link to dependent projects or workflows
3. Wait for @ashley's explicit approval
4. Change is implemented in `lightspeedwp/.github`
5. ThisOneTimeOnAcidCom automatically references updated configuration

### To Add Custom Workflows

Custom workflows can be added freely to `.github/workflows/` in ThisOneTimeOnAcidCom:

1. Create new workflow file: `.github/workflows/{name}.yml`
2. Workflow must not conflict with drift detection patterns
3. Keep workflow documentation in `.github/docs/WORKFLOW-STANDARDS.md`
4. Follow GitHub Actions best practices

---

## Architecture Benefits

| Benefit | How It Works |
|---|---|
| **Single Source of Truth** | All governance files centralized in `.github` |
| **Consistency** | Labels, templates, issue types always in sync across repos |
| **Drift Prevention** | GitHub Actions reports duplicate files through an informational check |
| **Flexibility** | Repository-specific workflows maintained locally |
| **Auditability** | Centralized governance with full Git history |
| **Scalability** | Works for any number of consuming repositories |

---

## References

- **Validation Script:** `.github/scripts/verify-single-source.sh`
- **Governance Inventory:** `.github/docs/GOVERNANCE-INVENTORY.md`
- **Audit Findings:** `.github/.tmp/phase2-audit/AUDIT-SUMMARY.md`
- **Consolidation Verification:** `.github/.tmp/phase2-audit/consolidation-verification.md`
- **Spec 001 Phase 2:** Implementation plan for governance consolidation
- **Spec 021:** Repository restructuring and canonical governance config (lightspeedwp/.github)
- **CLAUDE.md:** Organization-wide governance and branch naming rules

---

## Status

**Phase 2.3 Consolidation:** ✅ COMPLETE

- All duplicate governance files removed
- Custom workflows preserved
- Validation script deployed
- Governance model documented

**Phase 2.4 (Drift Prevention):** In Progress
- Drift detection workflows being deployed
- Template routing workflows being deployed

---

**Document Owner:** LightSpeed Team  
**Last Updated:** 2026-10-18  
**Repository:** lightspeedwp/ThisOneTimeOnAcidCom
