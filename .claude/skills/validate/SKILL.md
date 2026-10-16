---
name: "Validation Skill"
description: "Runs comprehensive validation checks for ThisOneTimeOnAcidCom repository integrity."
type: "skill"
category: "quality"
enabled: true
tags: ["validation", "npm", "health-check", "ci"]
---

# Validation Skill

## Purpose

Run comprehensive validation checks to ensure repository health and build readiness.

## Validation Steps

### 1. Dependency Consistency

```bash
npm ls --depth=0
```

Verifies:
- ✓ All dependencies resolve correctly
- ✓ No missing peer dependencies
- ✓ package-lock.json is in sync with package.json

**Fix if fails:** `npm ci --include=dev`

### 2. Build Readiness

```bash
npm run build
```

Verifies:
- ✓ TypeScript compiles without errors
- ✓ Vite bundling succeeds
- ✓ All imports and dependencies resolve
- ✓ dist/ directory is created successfully

**Fix if fails:** Check TypeScript errors and resolve import issues

### 3. Repository State

Verifies:
- ✓ Working directory is clean (no uncommitted changes)
- ✓ Branch follows naming convention (type/scope-title)
- ✓ CHANGELOG.md exists and is valid

**Fix if fails:** Commit changes or update branch name

## When to Use

- **Before Push:** Validate your changes locally
- **CI/CD:** Automated validation in GitHub Actions
- **Pre-Release:** Confirm release readiness
- **On Session Start:** Automatic validation (SessionStart hook)

## Expected Output

```
✓ Dependencies are consistent
✓ Build succeeds
✓ Repository validation passed
```

## Troubleshooting

### Dependency Issues

```bash
npm ls --depth=0
```

Common fixes:
- `npm ci --include=dev` – Reinstall exact versions from lock file
- `npm update` – Update to newer versions (careful with lock file)
- Check for conflicting peer dependencies in terminal output

### Build Failures

1. Check TypeScript compiler output for type errors
2. Verify all module imports are correct
3. Ensure referenced assets and data files exist
4. Check for bundler compatibility violations (Guidelines.md)

### Branch Name Invalid

Use format: `{type}/{scope}-{title}`

Examples:
- ✓ `feat/dark-mode-support`
- ✓ `fix/navigation-bug`
- ✓ `docs/component-guide`
- ✗ `claude/my-feature` (forbidden prefix)

## References

- [Build Validation Skill](../build/SKILL.md)
- [Branch Validation Skill](../branch-validation/SKILL.md)
- `guidelines/Guidelines.md` – Build and bundler rules
- `CONTRIBUTING.md` – Contribution guidelines

---

*Use this skill to validate repository health before commits and merges.*
