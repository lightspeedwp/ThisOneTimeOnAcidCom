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
| `hotfix` | Urgent production fix | `hotfix/critical-vulnerability` |
| `release` | Release branch | `release/v1.0.0` |
| `refactor` | Code refactoring | `refactor/component-hooks` |
| `chore` | Maintenance, no user changes | `chore/dependency-update` |
| `task` | Scoped unit of work | `task/auth-refactor-epic` |
| `doc` | Single documentation change | `doc/readme-update` |
| `docs` | Documentation | `docs/component-guide` |
| `design` | Design system or UI | `design/button-component-update` |
| `test` | Tests and QA | `test/e2e-navigation-tests` |
| `perf` | Performance optimization | `perf/image-lazy-loading` |
| `ci` | CI/CD and automation | `ci/github-actions-workflow` |
| `build` | Build system changes | `build/vite-config-update` |
| `deps` | Dependency updates | `deps/upgrade-major-versions` |
| `security` | Security fixes | `security/xss-vulnerability-fix` |
| `revert` | Revert previous commit | `revert/pr-2345-bad-merge` |
| `research` | Research and investigation | `research/performance-benchmarks` |
| `a11y` | Accessibility | `a11y/wcag-compliance-audit` |
| `ux` | User experience | `ux/form-validation-feedback` |
| `i18n` | Internationalization | `i18n/german-translation-pack` |
| `ops` | Operations, deployment | `ops/database-migration-script` |
| `proto` | Prototype, experimental | `proto/new-caching-strategy` |
| `ds` | Design system | `ds/component-library-update` |
| `api` | API changes | `api/rest-endpoint-versioning` |
| `schema` | Data schema | `schema/user-model-changes` |
| `telemetry` | Analytics, monitoring | `telemetry/event-tracking-setup` |
| `content` | Content changes | `content/blog-post-updates` |
| `seo` | SEO optimizations | `seo/meta-tag-improvements` |
| `config` | Configuration | `config/environment-variables` |
| `migrate` | Data/schema migrations | `migrate/user-table-migration` |
| `qa` | QA processes | `qa/test-automation-framework` |
| `uat` | User acceptance testing | `uat/staging-validation-suite` |
| `audit` | Audit, compliance, review | `audit/security-code-review` |
| `codex` | Code generation, AI-assisted | `codex/auto-documentation-tool` |
| `aiops` | AI operations | `aiops/model-monitoring-update` |
| `automation` | Workflow automation | `automation/issue-routing-update` |
| `epic` | Multi-part initiative | `epic/platform-modernisation` |

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
- `content/chapter-one-revisions`
- `fix/typo-chapter-five`

### ✗ Invalid Branch Names

- `claude/my-feature` — FORBIDDEN prefix (reserved for Claude Code internal)
- `copilot/fix-bug` — FORBIDDEN prefix (reserved for GitHub Copilot)
- `feature/dark-mode` — WRONG type (should be `feat/`)
- `my-feature` — MISSING type
- `feat/DarkMode` — WRONG case (should be lowercase with hyphens)
- `feat/_dash-scope` — INVALID scope format
- `feat/scope_title` — WRONG separator (should be hyphen, not underscore)

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

## Exemptions

### Dependabot & Renovate
Branches `dependabot/*` and `renovate/*` bypass naming validation automatically.

### Release Branches with Semantic Versioning
Release branches follow semantic versioning instead of `{type}/{scope}-{title}`:
- ✅ `release/v1.2.0` — semantic version
- ✅ `release/v2.0.0-beta.1` — pre-release
- ✅ `release/2025-01-15` — date-based releases (alternative)

## Validation Script

Use the deterministic validation script to check branch names before pushing:

```bash
node scripts/validate-branch-name.js [--branch <name>]
```

### Example Usage

```bash
# Validate current branch
node scripts/validate-branch-name.js

# Validate specific branch name
node scripts/validate-branch-name.js --branch feat/my-feature

# Expected output
Branch 'feat/my-feature' matches the repository branching strategy.
```

### Exit Codes

- `0` — Branch is valid ✅
- `1` — Branch is invalid ❌
- `2` — Script execution error (e.g., not in git repo)

### Validation Results

The script outputs structured results:

```json
{
  "isValid": true,
  "branch": "feat/my-feature",
  "message": "Branch 'feat/my-feature' matches the repository branching strategy.",
  "type": "valid",
  "details": {
    "pattern": "standard",
    "matchedType": "feat",
    "scope": "my",
    "title": "feature"
  }
}
```

## Integration with Pre-commit / Pre-push

To run validation automatically before pushing:

### Pre-push Hook

Add to `.git/hooks/pre-push`:

```bash
#!/bin/bash
node scripts/validate-branch-name.js
exit $?
```

### Make Executable

```bash
chmod +x .git/hooks/pre-push
```

## Validation Steps

Before pushing a branch:

### 1. Check Branch Name Format

```bash
# Verify your branch name follows the pattern
git branch --show-current
```

Expected format: `type/scope-title`

### 2. Validate with Script

```bash
npm run validate:branch-name
# or
node scripts/validate-branch-name.js
```

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

```bash
# Rename local branch
git branch -m old-name new-name

# Delete remote branch
git push origin --delete old-name

# Push renamed branch
git push -u origin new-name
```

### Validation fails but branch looks correct?

**Fix:** Check for subtle formatting issues

- Underscores instead of hyphens: `feat/my_feature` → `feat/my-feature`
- Uppercase letters: `feat/MyFeature` → `feat/my-feature`
- Spaces: `feat/my feature` → `feat/my-feature`
- Numbers only: `feat/123` → `feat/section-123`

## Branch Workflow

```bash
# 1. Fetch latest develop branch
git fetch origin develop

# 2. Create feature branch with correct name
git checkout -b feat/your-feature origin/develop

# 3. Make changes and commit
git commit -m "Your commit message"

# 4. Validate branch name (before push)
node scripts/validate-branch-name.js

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
- `.github/docs/BRANCHING_STRATEGY.md` – Strategy documentation (in .github repo)
- `.claude/agents/branches-agent.md` – Interactive branch naming agent
- `docs/BRANCH_NAMING_LOCAL.md` – Local developer quick reference
- `scripts/validate-branch-name.js` – Validation script
- `CONTRIBUTING.md` – Contribution workflow

---

*Use this skill to validate branch names before pushing to ensure automation compatibility.*
