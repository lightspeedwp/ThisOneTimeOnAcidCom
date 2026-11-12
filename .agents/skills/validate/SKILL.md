---
name: validate
description: Runs comprehensive validation checks for ThisOneTimeOnAcidCom repository
  integrity.
metadata:
  category: quality
  enabled: 'True'
  tags: validation, npm, health-check, ci
---

# Validation Skill

## Purpose

Run comprehensive validation checks to ensure repository health and build
readiness.

## Assessment versus authorised execution

Default to read-only assessment: inspect the requested diff, `package.json`,
configuration and existing evidence. `npm ls --depth=0`, Git status and branch
validation are observations. Build/test execution writes generated output and
requires the relevant task authorisation and branch gate. A validation request
alone does not authorise installation, repair, committing, renaming a branch,
pushing, deployment or changes to trust/credentials.

Report failures and propose specific repairs first. Run `npm ci --include=dev`
only when installation is authorised, after reviewing the `postinstall` hook
side effects; do not run `npm update` or change lockfiles merely to pass checks.
Preserve a dirty working tree; a dirty state is evidence, not a reason to commit
or discard someone else's work. Read `docs/TESTING.md` for supported checks.

## Validation Steps

### 1. Dependency Consistency

```bash
npm ls --depth=0

```text

Verifies:

- ✓ All dependencies resolve correctly
- ✓ No missing peer dependencies
- ✓ Dependency-tree problems are reported (this command alone does not prove lockfile synchronisation)

**If this fails:** report the dependency error; propose a separately authorised installation after reviewing hook side effects.

### 2. Build Readiness

```bash
npm run build

```text

Verifies:

- ✓ Vite transpilation and bundling succeed; this is not a separate full TypeScript type check
- ✓ Vite bundling succeeds
- ✓ All imports and dependencies resolve
- ✓ dist/ directory is created successfully

**If this fails:** report the failing build stage and propose a scoped repair; do not edit as part of read-only assessment.

### 3. Repository State

Verifies:

- ✓ Working directory is clean (no uncommitted changes)
- ✓ Branch follows naming convention (type/scope-title)
- ✓ CHANGELOG.md exists and is valid

**If this fails:** report the state and request the precise missing authority. Do not automatically commit, rename, switch, reset or discard work.

## When to Use

- **Before Push:** Validate your changes locally
- **CI/CD:** Automated validation in GitHub Actions
- **Pre-Release:** Confirm release readiness
- **On Session Start:** Inspect the actual client hook configuration; this skill does not itself install or register hooks.

## Expected Output

```text
✓ Dependencies are consistent
✓ Build succeeds
✓ Repository validation passed

```text

## Troubleshooting

### Dependency Issues

```bash
npm ls --depth=0

```text

Separately authorised remediation options:

- `npm ci --include=dev` – Reinstall exact versions from lock file
- Dependency upgrades and lockfile changes require a separate scoped request.
- Check for conflicting peer dependencies in terminal output

### Build Failures

1. Check TypeScript compiler output for type errors

1. Verify all module imports are correct

1. Ensure referenced assets and data files exist

1. Check for bundler compatibility violations (Guidelines.md)

### Branch Name Invalid

Use format: `{type}/{scope}-{title}`

Examples:

- ✓ `feat/dark-mode-support`
- ✓ `fix/navigation-bug`
- ✓ `docs/component-guide`
- ✗ `claude/my-feature` (forbidden prefix)

## References

- [Build verification guide](../../../docs/TESTING.md) (`docs/TESTING.md` from the repository root)
- [Branch Validation Skill](../branch-validation/SKILL.md)
- `guidelines/Guidelines.md` – Build and bundler rules
- `CONTRIBUTING.md` – Contribution guidelines
- `.github/specs/003-refactor-guidelines/spec.md` – Guidelines Refactor specification (consolidation validation requirements)

---

*Use this skill to validate repository health before commits and merges.*
