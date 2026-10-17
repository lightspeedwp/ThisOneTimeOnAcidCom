# Branch Protection Configuration

> **Status:** Implementation guide for Decision GH-003 (CODEOWNERS & Branch Protection)  
> **Owner:** @ashleyshaw  
> **Date:** 2026-10-17  
> **Repository:** lightspeedwp/ThisOneTimeOnAcidCom

## Overview

This document specifies the branch protection rules that should be configured for `main` and `develop` branches in GitHub's repository settings.

**Note:** Branch protection is configured via **GitHub UI** (Settings → Branches → Branch protection rules), not through code.

---

## Configuration Steps

**Auto-merge availability:** Enable **Settings → General → Pull Requests → Allow auto-merge** at the repository level for the `develop` workflow. This also makes auto-merge available for eligible pull requests targeting `main`. There is no per-branch auto-merge toggle in branch protection; `main` follows a manual-only workflow policy.

### 1. Protect `main` Branch (Strict)

Navigate to: **Settings → Branches → Add rule**

| Setting | Value | Reason |
|---------|-------|--------|
| Branch name pattern | `main` | Protects production releases |
| Require pull request reviews | ✅ Yes | Enforce peer review on all changes |
| Dismiss stale pull request approvals | ✅ Yes | Require fresh review on new commits |
| Require status checks to pass | ✅ Yes | Enforce CI validation |
| Require branches to be up to date before merging | ✅ Yes | Prevent merge conflicts |
| Require review from Code Owners | ✅ Yes | CODEOWNERS assigns reviewers; require approval for governance paths (`.github/`, `scripts/`) |
| Required number of approvals | 1 | Standard for small team (increase if needed) |
| Merge workflow policy | Manual merges only | Production release policy; not enforced by branch protection |
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
| Require review from Code Owners | ❌ No | Less strict than main (moderate) |
| Required number of approvals | 1 | Require approval before auto-merge |
| Merge workflow policy | Auto-merge permitted | Speeds up integration once required reviews and status checks pass |
| Allow force pushes | ❌ No | Prevents history rewriting |
| Allow deletions | ❌ No | Prevents accidental deletion |

---

## CODEOWNERS Integration

The `.github/CODEOWNERS` file designates review requirements for protected paths:

- `.github/` → @ashleyshaw (governance)
- `scripts/` → @ashleyshaw (validation/build)
- `AGENTS.md` → @ashleyshaw (org governance)
- `CHANGELOG.md` → @ashleyshaw (release notes)
- `tests/` → @ashleyshaw (test infrastructure)
- `guidelines/` → @ashleyshaw (documentation)
- `docs/` → @ashleyshaw (core docs)
- Other files → @ashleyshaw (default)

When a PR modifies files matching these patterns on protected branches, GitHub automatically requests review from @ashleyshaw.

---

## Workflow Impact

### Feature Branch → develop (Integration)

```
1. Create feature branch:   feat/your-feature
2. Make changes & commit
3. Create PR to develop
4. GitHub requests @ashleyshaw review (via CODEOWNERS)
5. @ashleyshaw reviews and approves
6. PR auto-merges to develop
   (Status checks pass, approval given)
```

### develop → main (Release)

```
1. Create release branch:   release/v1.0.0
2. Run version bump commit
3. Create PR to main
4. GitHub requests @ashleyshaw review (CODEOWNERS: CHANGELOG.md, package.json)
5. @ashleyshaw reviews and approves
6. Manual merge to main
   (Manual-only workflow policy for production releases)
7. Tag release & deploy
```

---

## References

- GitHub Docs: [About branch protection rules](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/about-protected-branches)
- Repository CODEOWNERS: `.github/CODEOWNERS`
- Governance Decision: `GOVERNANCE_DECISIONS_2026-10.md` (Decision 9: GH-003)
- Branch Naming: `.github/CLAUDE.md` (⚠️ Branch Naming section)

---

## Implementation Checklist

- [ ] Access GitHub repository settings (requires admin permissions)
- [ ] Navigate to **Settings → Branches**
- [ ] Create branch protection rule for `main` (strict configuration above)
- [ ] Create branch protection rule for `develop` (moderate configuration above)
- [ ] Verify `.github/CODEOWNERS` is committed to `main` before creating the test PR
- [ ] Test: Create a test PR targeting `main` and verify @ashleyshaw is requested as a reviewer
- [ ] Confirm workflow: feature PR → develop → release PR → main

---

**Implemented:** 2026-10-17  
**Status:** Awaiting GitHub UI configuration (requires admin access)  
**Owner:** @ashleyshaw
