# Branch Protection Configuration

> **Status:** Implementation guide for Decision GH-003 (CODEOWNERS & Branch
Protection)
> **Owner:** @ashley
> **Date:** 2026-10-17
> **Repository:** lightspeedwp/ThisOneTimeOnAcidCom

## Overview

This document specifies the branch protection rules that should be configured
for `main` and `develop` branches in GitHub's repository settings.

**Note:** Branch protection is configured via **GitHub UI** (Settings → Branches
→ Branch protection rules), not through code.

---

## Configuration Steps

### 1. Protect `main` Branch (Strict)

Navigate to: **Settings → Branches → Add rule**

| Setting | Value | Reason |
|---------|-------|--------|
| Branch name pattern | `main` | Protects production releases |
| Require pull request reviews | ✅ Yes | Enforce peer review on all changes |
| Dismiss stale pull request approvals | ✅ Yes | Require fresh review on new commits |
| Require status checks to pass | ✅ Yes | Enforce CI validation |
| Require branches to be up to date before merging | ✅ Yes | Prevent merge conflicts |
| Require code owner reviews | ✅ Yes | CODEOWNERS file enforces reviewer assignment |
| Require approval from code owners | ✅ Yes | Critical for governance paths (.github/, scripts/) |
| Required number of approvals | 1 | Standard for small team (increase if needed) |
| Allow auto-merge | ❌ No | Manual merge control for production releases |
| Allow force pushes | ❌ No | Prevents history rewriting |
| Allow deletions | ❌ No | Prevents accidental branch deletion |

### 2. Protect `develop` Branch (Moderate)

Navigate to: **Settings → Branches → Add rule**

| Setting | Value | Reason |
|---------|-------|--------|
| Branch name pattern | `develop` | Protects integration branch |
| Require pull request reviews | ✅ Yes | Enforce peer review |
| Dismiss stale pull request approvals | ✅ Yes | Require fresh review |
| Require status checks to pass | ✅ Yes | Enforce CI validation |
| Require branches to be up to date before merging | ✅ Yes | Keep develop current |
| Require code owner reviews | ❌ No | Less strict than main (moderate) |
| Allow auto-merge | ✅ Yes | Speeds up integration |
| Allow force pushes | ❌ No | Prevents history rewriting |
| Allow deletions | ❌ No | Prevents accidental deletion |

---

## CODEOWNERS Integration

The `.github/CODEOWNERS` file designates review requirements for protected
paths:

- `.github/` → @ashley (governance)
- `scripts/` → @ashley (validation/build)
- `AGENTS.md` → @ashley (org governance)
- `CHANGELOG.md` → @ashley (release notes)
- `tests/` → @ashley (test infrastructure)
- `guidelines/` → @ashley (documentation)
- `docs/` → @ashley (core docs)
- Other files → @ashley (default)

When a PR modifies files matching these patterns on protected branches, GitHub
automatically requests review from @ashley.

---

## Workflow Impact

### Feature Branch → develop (Integration)

```text

1. Create feature branch:   feat/your-feature

1. Make changes & commit

1. Create PR to develop

1. GitHub requests @ashley review (via CODEOWNERS)

1. @ashley reviews and approves

1. PR auto-merges to develop
   (Status checks pass, approval given)

```text

### develop → main (Release)

```text

1. Create release branch:   release/v1.0.0

1. Run version bump commit

1. Create PR to main

1. GitHub requests @ashley review (CODEOWNERS: CHANGELOG.md, package.json)

1. @ashley reviews and approves

1. Manual merge to main
   (Auto-merge disabled for production safety)

1. Tag release & deploy

```text

---

## References

- GitHub Docs: [About branch protection rules](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/about-protected-branches)
- Repository CODEOWNERS: `.github/CODEOWNERS`
- Governance Decision: `GOVERNANCE*DECISIONS*2026-10.md` (Decision 9: GH-003)
- Branch Naming: `.github/CLAUDE.md` (⚠️ Branch Naming section)

---

## Implementation Checklist

- [ ] Access GitHub repository settings (requires admin permissions)
- [ ] Navigate to **Settings → Branches**
- [ ] Create branch protection rule for `main` (strict configuration above)
- [ ] Create branch protection rule for `develop` (moderate configuration above)
- [ ] Verify `.github/CODEOWNERS` file is in repository
- [ ] Test: Create a test PR to `main` and verify @ashley review request appears
- [ ] Confirm workflow: feature PR → develop → release PR → main

---

**Implemented:** 2026-10-17
**Status:** Awaiting GitHub UI configuration (requires admin access)
**Owner:** @ashley
