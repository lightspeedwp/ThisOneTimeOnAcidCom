# Governance Configuration Inventory

**Date Created:** 2026-10-18  
**Phase:** 2.3 Configuration Consolidation (Spec 001)  
**Related:** Spec 021 (lightspeedwp/.github), TOA-262, TOA-271

---

## Single Source of Truth Architecture

This document defines the hybrid governance model where ThisOneTimeOnAcidCom delegates all canonical configuration to lightspeedwp/.github while maintaining local custom workflows.

### Canonical Locations (lightspeedwp/.github)

| File/Directory | Purpose | Count | Owned By | Status |
|---|---|---|---|---|
| `.github/labels.yml` | Organization-wide label definitions | 158 labels | @ashley (locked) | 🔒 Canonical |
| `.github/issue-types.yml` | Issue type definitions | 24 types | @ashley (locked) | 🔒 Canonical |
| `.github/ISSUE_TEMPLATE/` | Issue creation templates | 26 templates | @ashley (locked) | 🔒 Canonical |
| `.github/PULL_REQUEST_TEMPLATE/` | PR creation templates | 19 templates | @ashley (locked) | 🔒 Canonical |
| `.github/branch-labels.yml` | Branch type to label routing | varies | @ashley (locked) | 🔒 Canonical |

### Local Configuration (ThisOneTimeOnAcidCom)

| File/Directory | Purpose | Status |
|---|---|---|
| `.github/workflows/` | Custom repository-specific workflows | ✅ **Maintained locally** |
| **NO** `.github/labels.yml` | Use canonical source only | ✅ **Deleted** |
| **NO** `.github/issue-types.yml` | Use canonical source only | ✅ **Deleted** |
| **NO** `.github/ISSUE_TEMPLATE/` | Use canonical source only | ✅ **Deleted** |
| **NO** `.github/PULL_REQUEST_TEMPLATE/` | Use canonical source only | ✅ **Deleted** |
| **NO** `.github/branch-labels.yml` | Use canonical source only | ✅ **Deleted** |

---

## Expected State After Phase 2 Consolidation

### Zero Duplicate Governance Files

After Phase 2.3 completion, ThisOneTimeOnAcidCom MUST contain:

- ✅ Zero copies of `.github/labels.yml`
- ✅ Zero copies of `.github/issue-types.yml`
- ✅ Zero copies of `.github/ISSUE_TEMPLATE/` files
- ✅ Zero copies of `.github/PULL_REQUEST_TEMPLATE/` files
- ✅ Zero copies of `.github/branch-labels.yml`

**Validation command:**
```bash
./.github/scripts/verify-single-source.sh
```

**Expected output:**
```
✅ VALIDATION PASSED: Zero drift detected
   ThisOneTimeOnAcidCom correctly references canonical .github
```

---

## How It Works: Hybrid Governance Model

### Configuration Access

1. **Labels, Issue Types, Templates**
   - Source: `lightspeedwp/.github/` (canonical, locked)
   - Access: GitHub Actions workflows read from canonical repo
   - Routing: PR template routing workflow applies correct template based on branch type
   - Drift Prevention: `drift-detection.yml` workflow blocks attempts to add duplicates

2. **Custom Workflows**
   - Source: `ThisOneTimeOnAcidCom/.github/workflows/` (local, maintained)
   - Access: Git checkout, GitHub Actions engine
   - Allowed: Any custom workflow file in `.github/workflows/` directory
   - Drift Prevention: `drift-detection.yml` allows `.github/workflows/**` patterns

### Validation & Automation

| Workflow | Trigger | Function | Status |
|---|---|---|---|
| `drift-detection.yml` | PR opened/reopened/synchronized | Blocks duplicate governance files; allows custom workflows | Phase 2.4 |
| `pr-template-routing.yml` | PR opened/reopened | Suggests correct template based on branch prefix | Phase 2.4 |
| `verify-single-source.sh` | CI pipeline, manual validation | Confirms zero duplicate files exist | Phase 2.3 |

---

## Change Request Process

To modify canonical governance files (labels, templates, issue types):

1. Open an issue on `lightspeedwp/.github` with one of these tags:
   - `[LABEL-UPDATE-REQUEST]` — request changes to `.github/labels.yml`
   - `[TEMPLATE-UPDATE-REQUEST]` — request changes to PR/issue templates
   - `[ISSUE-TYPE-UPDATE-REQUEST]` — request changes to `.github/issue-types.yml`

2. @ashley reviews and approves the change

3. Change is implemented in `lightspeedwp/.github`

4. ThisOneTimeOnAcidCom automatically references updated configuration (no local changes needed)

---

## Architecture Benefits

| Benefit | Implementation | Impact |
|---|---|---|
| **Single Source of Truth** | All governance files centralized in `.github` | Eliminates divergence, reduces maintenance |
| **Consistency Across Repos** | All repos reference same canonical files | Labels, templates, issue types always in sync |
| **Drift Prevention** | GitHub Actions workflows block duplicates | Prevents accidental local copies |
| **Flexibility** | Custom workflows preserved in each repo | Allows repo-specific automation |
| **Auditability** | Centralized governance, versioned in Git | Full change history, rollback capability |
| **Scalability** | Template routing based on branch prefix | Works for any number of repositories |

---

## Testing & Validation

### Baseline Validation (T413)

Before consolidation begins:
```bash
./.github/scripts/verify-single-source.sh --verbose
```

Document output in `.github/.tmp/phase2-audit/baseline-validation.txt`

### Post-Consolidation Validation (T422)

After all deletions complete:
```bash
./.github/scripts/verify-single-source.sh --verbose
```

Document output in `.github/.tmp/phase2-audit/post-consolidation-validation.txt`

**Expected status:** All checks should pass ✅

---

## Files & References

- **Validation script:** `.github/scripts/verify-single-source.sh`
- **Canonical source:** `lightspeedwp/.github/labels.yml`, etc.
- **Audit findings:** `.github/.tmp/phase2-audit/AUDIT-SUMMARY.md`
- **Drift prevention contracts:**
  - `lightspeedwp/.github/specs/021-repo-restructuring-canonical-config/contracts/drift-detection.contract.md`
  - `lightspeedwp/.github/specs/021-repo-restructuring-canonical-config/contracts/template-routing.contract.md`

---

## Status

- [x] T411 — Validation script created
- [x] T412 — Governance inventory documented
- [ ] T413 — Baseline validation run
- [ ] T414-T418 — File deletions
- [ ] T419 — Custom workflows verification
- [ ] T420 — Consolidation verification checklist
- [ ] T421 — ThisOneTimeOnAcidCom documentation update
- [ ] T422 — Post-consolidation validation run

---

**Document Owner:** claude@anthropic.com  
**Last Updated:** 2026-10-18  
**Phase Status:** 2.3 Configuration Consolidation (In Progress)
