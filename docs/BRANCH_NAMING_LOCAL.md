# Branch Naming — Local Developer Guide

Quick reference for creating branches following the repository branching
strategy.

## Pattern

All branches must follow this exact pattern:

```text
{type}/{scope}-{title}

```text

Examples:

- ✅ `feat/user-dashboard`
- ✅ `fix/navigation-menu`
- ✅ `docs/api-guide`
- ❌ `my-feature` (missing type)
- ❌ `feature/my-feature` (wrong type)
- ❌ `claude/my-feature` (forbidden prefix)

## Authorised Types

### Core Types (Use These Most Often)

| Type | Purpose | Example |
|------|---------|---------|
| `feat` | New feature/capability | `feat/dark-mode-toggle` |
| `fix` | Bug fix | `fix/login-timeout-error` |
| `docs` | Documentation | `docs/installation-guide` |
| `test` | Tests/QA | `test/e2e-user-flow` |
| `refactor` | Code restructuring | `refactor/component-hooks` |
| `perf` | Performance improvement | `perf/image-loading` |
| `chore` | Maintenance | `chore/dependency-updates` |
| `ci` | CI/CD pipeline | `ci/github-actions-workflow` |

### Extended Types

| Type | Purpose | Example |
|------|---------|---------|
| `hotfix` | Urgent production fix | `hotfix/critical-security` |
| `release` | Release branch | `release/v1.0.0` |
| `task` | Scoped work unit | `task/auth-refactor` |
| `design` | Design/UI changes | `design/button-component` |
| `a11y` | Accessibility | `a11y/form-labels` |
| `ux` | User experience | `ux/form-validation` |
| `content` | Content updates | `content/chapter-revisions` |
| `security` | Security fixes | `security/xss-fix` |
| `build` | Build system | `build/vite-config` |
| `deps` | Dependency updates | `deps/upgrade-packages` |
| `audit` | Compliance review | `audit/code-review` |

**[Full type list
→](../.claude/skills/branch-validation/SKILL.md#valid-type-values)**

## Naming Rules

### Scope

- **What:** The area or component your work affects
- **Format:** 1–2 words, lowercase, hyphen-separated
- **Examples:** `user`, `navigation`, `api`, `database`
- **Don't:** Be vague (`feature`, `update`, `stuff`)

### Title

- **What:** Specific context or details
- **Format:** 1–3 words, lowercase, hyphen-separated
- **Examples:** `registration-flow`, `mobile-menu`, `404-error`
- **Don't:** Be generic (`fix`, `update`, `issue`)

### Good Examples

```text
feat/user-registration → New user registration flow
fix/navigation-mobile-menu → Fix mobile navigation bug
docs/api-endpoint-reference → Document API endpoints
content/chapter-two-edits → Edit chapter two content
a11y/form-label-association → Fix form accessibility

```text

## FORBIDDEN Prefixes

**Never use these:**

- ❌ `claude/` — Reserved for internal Claude Code sessions
- ❌ `copilot/` — Reserved for GitHub Copilot
- ❌ `openai/` — Reserved for OpenAI integration

**Why?** They break PR template routing and GitHub Actions automation.

## Quick Start

### Step 1: Fetch Latest

```bash
git fetch origin develop

```text

### Step 2: Create Branch

```bash

# For a new feature

git checkout -b feat/your-feature-name origin/develop

# For a bug fix

git checkout -b fix/what-is-broken origin/develop

# For documentation

git checkout -b docs/what-you-are-documenting origin/develop

```text

### Step 3: Verify Name

```bash
git branch --show-current

# Output: feat/your-feature-name

# Validate with script

node scripts/validate-branch-name.js

# Output: Branch 'feat/your-feature-name' matches the repository branching strategy

```text

### Step 4: Work & Commit

```bash

# Make changes

# ... edit files ..

# Commit

git add .
git commit -m "Implement feature XYZ"

# Push

git push -u origin feat/your-feature-name

```text

### Step 5: Create PR

Create a draft PR on GitHub, request review, and merge when ready.

## Base Branch Rules

### Start From `develop`

Use `develop` as the base branch for:

- ✅ Features (`feat/`)
- ✅ Bug fixes (`fix/`)
- ✅ Documentation (`docs/`)
- ✅ Testing (`test/`)
- ✅ Refactoring (`refactor/`)
- ✅ Performance (`perf/`)
- ✅ Anything that's not a production hotfix

```bash
git checkout -b feat/new-feature origin/develop

```text

### Start From `main` (Hotfixes Only)

Use `main` only for urgent production fixes:

```bash
git checkout -b hotfix/critical-bug origin/main

```text

## Common Patterns

### Feature Work

```bash

# New component

git checkout -b feat/button-component origin/develop

# New API endpoint

git checkout -b feat/user-api-endpoint origin/develop

# New page

git checkout -b feat/dashboard-page origin/develop

```text

### Bug Fixes

```bash

# Fix a specific bug

git checkout -b fix/login-error origin/develop

# Fix in a component

git checkout -b fix/navigation-menu origin/develop

# Fix a typo

git checkout -b fix/readme-typo origin/develop

```text

### Documentation

```bash

# API docs

git checkout -b docs/api-reference origin/develop

# Setup guide

git checkout -b docs/setup-guide origin/develop

# Contributing guide

git checkout -b docs/contributing origin/develop

```text

### Content Updates (For Content Repository)

```bash

# Chapter edits

git checkout -b content/chapter-one-revisions origin/develop

# Fact-checking

git checkout -b content/chapter-three-fact-check origin/develop

# New section

git checkout -b content/glossary-terms origin/develop

```text

## Validation

### Before Pushing

```bash

# Validate your branch name

npm run validate:branch-name

# Expected output

Branch 'feat/your-feature' matches the repository branching strategy.

# Exit code 0 = valid ✅

# Exit code 1 = invalid ❌

```text

### If Invalid

```bash

# Check current branch

git branch --show-current

# Rename if needed

git branch -m old-name new-name

# Delete remote and re-push

git push origin --delete old-name
git push -u origin new-name

```text

## Help & Support

### Interactive Branch Naming

Use the branches agent for personalized guidance:

```text
/branches-agent

Describe your work (e.g., "I'm fixing the navigation menu on mobile")
Agent will recommend: fix/navigation-mobile-menu

```text

### Validation Skill

Use the branch validation skill to verify your branch:

```text
/branch-validation

```text

### Documentation (1)

- **Full strategy:** [.github/docs/BRANCHING*STRATEGY.md](../.github/docs/BRANCHING*STRATEGY.md) (in .github repo)
- **Agent guide:** [.claude/agents/branches-agent.md](../.claude/agents/branches-agent.md)
- **Skill guide:** [.claude/skills/branch-validation/SKILL.md](../.claude/skills/branch-validation/SKILL.md)
- **Worktrees guide:** [.claude/guides/worktrees.md](../.claude/guides/worktrees.md)
- **Validation script:** [scripts/validate-branch-name.js](../scripts/validate-branch-name.js)

## Examples: Your Repository

Since this is a React/Vite project, here are common patterns:

### Component Work

```bash

# New component (1)

feat/button-component
feat/form-input-field
feat/navigation-sidebar

# Fix in component

fix/button-styles
fix/form-validation
fix/navigation-active-state

# Component documentation

docs/component-button
docs/form-components-guide

```text

### Feature Work (1)

```bash
feat/dark-mode-support
feat/user-preferences-panel
feat/api-client-refactor

```text

### Testing

```bash
test/button-component-tests
test/e2e-form-flow
test/integration-api-client

```text

### Performance

```bash
perf/image-lazy-loading
perf/bundle-size-optimization
perf/query-caching

```text

### Styling & Design

```bash
design/button-refresh
design/color-tokens-update
design/spacing-system

```text

## Troubleshooting

### "Branch name already exists"

The branch exists on GitHub. Either:

1. Switch to it: `git checkout feat/my-feature`

1. Use a different name with more specifics: `feat/my-feature-v2`

### "Authentication failed" on push

Verify Git credentials:

```bash
git config --global user.email "your-email@example.com"
git config --global user.name "Your Name"

```text

### Branch validation fails but name looks right

Check for subtle issues:

- Underscores: `feat/my_feature` → `feat/my-feature`
- Uppercase: `feat/MyFeature` → `feat/my-feature`
- Spaces: `feat/my feature` → `feat/my-feature`
- Numbers only: `feat/123` → `feat/section-123`

## Summary Checklist

Before pushing:

- ✅ Branch starts with valid type (`feat`, `fix`, `docs`, etc.)
- ✅ Has slash after type: `type/`
- ✅ Has scope and title after slash: `/scope-title`
- ✅ All words are lowercase
- ✅ Words separated by hyphens, not underscores
- ✅ Not using forbidden prefix (`claude/`, `copilot/`, `openai/`)
- ✅ Started from `develop` (or `main` for hotfixes only)
- ✅ Validation passes: `npm run validate:branch-name`

---

*Need help?* Use `/branches-agent` for personalized guidance or
`/branch-validation` to check your branch.

*Last updated: 2026-10-16*
