---
name: "Branch Validation Skill"
description: "Validates branch names against repository branching strategy for ThisOneTimeOnAcidCom."
type: "skill"
category: "workflow"
enabled: true
tags: ["branch", "validation", "git", "strategy"]
---

# Branch Validation Skill

## Purpose

Validate branch names against the repository branching strategy to ensure consistency and enable automation.

## Branch Naming Requirements

All branches must follow this pattern:

```
{type}/{scope}-{title}
```

Where:
- **type** – Work type (required, one value)
- **scope** – Component or area (required)
- **title** – Descriptive name (required, hyphens between words)

## Valid Type Values

| Type | Purpose | Example |
|------|---------|---------|
| `feat` | New feature or enhancement | `feat/dark-mode-support` |
| `fix` | Bug fix | `fix/navigation-routing-bug` |
| `docs` | Documentation | `docs/component-guide` |
| `design` | Design system or UI | `design/button-component-update` |
| `test` | Tests and QA | `test/e2e-navigation-tests` |
| `refactor` | Code refactoring | `refactor/component-hooks` |
| `perf` | Performance optimization | `perf/image-lazy-loading` |
| `chore` | Maintenance, no user changes | `chore/dependency-update` |
| `ci` | CI/CD and automation | `ci/github-actions-workflow` |
| `build` | Build system changes | `build/vite-config-update` |

## Examples

### ✓ Valid Branch Names

- `feat/portfolio-dark-mode`
- `fix/navigation-active-state`
- `docs/component-documentation`
- `design/button-component-refresh`
- `refactor/hook-consolidation`
- `perf/image-optimization`
- `test/e2e-homepage-flow`
- `chore/update-dependencies`

### ✗ Invalid Branch Names

- `claude/my-feature` — FORBIDDEN prefix (reserved for Claude Code internal)
- `copilot/fix-bug` — FORBIDDEN prefix (reserved for GitHub Copilot)
- `feature/dark-mode` — WRONG type (should be `feat/`)
- `my-feature` — MISSING type
- `feat/DarkMode` — WRONG case (should be lowercase with hyphens)
- `feat/_dash-scope` — INVALID scope format

## FORBIDDEN Prefixes

These prefixes break PR template routing and automation:

- ❌ `claude/` – Reserved for Claude Code internal sessions
- ❌ `copilot/` – Reserved for GitHub Copilot integration
- ❌ `openai/` – Reserved for OpenAI integration

**Why forbidden?** They break:
1. PR template assignment workflows
2. GitHub Actions validation
3. Labeling and metrics automation
4. Downstream CI/CD pipelines

## Validation Steps

Before pushing a branch:

### 1. Check Branch Name Format

```bash
# Verify your branch name follows the pattern
git branch --show-current
```

Expected format: `type/scope-title`

### 2. Validate with Script

A validation script is planned but not yet available. This step will be enabled in a future release.

### 3. Manual Verification

- ✓ Does it start with valid type (feat, fix, docs, etc.)?
- ✓ Does it have slash after type?
- ✓ Does it have scope-title after slash?
- ✓ Are all words lowercase and hyphen-separated?
- ✓ Is it NOT using forbidden prefix?

## Common Issues & Fixes

### Created branch with wrong name?

**Fix:** Delete and recreate with correct name

```bash
# Delete local branch
git branch -D wrong-branch-name

# Create new branch with correct name
git checkout -b feat/correct-feature-name
```

### Already pushed with wrong name?

**Fix:** Follow repository procedure for renaming pushed branches

## Branch Workflow

```bash
# 1. Fetch latest develop branch
git fetch origin develop

# 2. Create feature branch with correct name
git checkout -b feat/your-feature origin/develop

# 3. Make changes and commit
git commit -m "Your commit message"

# 4. Validate branch name (before push)
# [validation check here]

# 5. Push to origin
git push -u origin feat/your-feature

# 6. Create PR when ready (not automatic)
# [create PR in GitHub UI]
```

## Integration with Automation

Valid branch names enable:

- ✓ Automatic PR template selection
- ✓ GitHub Actions workflow routing
- ✓ Labeling automation
- ✓ Release notes generation
- ✓ Metrics and analytics tracking

Invalid branch names cause:

- ✗ Wrong PR template applied
- ✗ Workflow routing failures
- ✗ Validation check failures
- ✗ Manual template assignment required
- ✗ CI re-run credits wasted

## References

- `.github/CLAUDE.md` – Branch naming rules (organization-wide)
- `.github/instructions/branch-naming.instructions.md` – Detailed guidelines
- `.github/docs/BRANCHING_STRATEGY.md` – Strategy documentation
- `CONTRIBUTING.md` – Contribution workflow

---

*Use this skill to validate branch names before pushing to ensure automation compatibility.*
