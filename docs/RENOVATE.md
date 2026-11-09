# Renovate Configuration Guide

**Status:** Phase 1 Implementation Complete (2026-11-09)  
**Replaces:** Dependabot  
**Architecture:** Centralized governance model (Option A)

---

## Overview

Renovate has replaced Dependabot for automated dependency and GitHub Actions updates. The configuration follows a centralized governance model where:

- **Canonical config** lives in `lightspeedwp/.github/renovate.json` (org-wide policy)
- **ThisOneTimeOnAcidCom** extends and overrides via `.github/renovate.json`
- All org-wide policy changes cascade automatically to this repo

---

## Configuration

### ThisOneTimeOnAcidCom Settings (`.github/renovate.json`)

```json
{
  "extends": [
    "github>lightspeedwp/.github:renovate",
    "config:base"
  ],
  "labels": [
    "area:dependencies",
    "area:ci"
  ],
  "npm": {
    "postUpdateOptions": [
      "npmDedupe"
    ]
  }
}
```

**Key behaviors:**
- Extends centralized config from `lightspeedwp/.github:renovate`
- Labels PRs with `area:dependencies` and `area:ci`
- Runs `npm dedupe` after updates

### Inherited from lightspeedwp/.github

- **Schedule:** Weekly, Monday 03:00 SAST (Africa/Johannesburg timezone)
- **Target branch:** `develop`
- **Grouping:**
  - Minor + patch updates grouped together
  - Major updates separate
  - GitHub Actions grouped separately from npm
- **Limits:** Max 10 open PRs per ecosystem
- **Semantic commits:** Enabled (`deps` type)
- **Security updates:** Prioritized automatically

---

## Workflow

### Creating Dependency Update PRs

1. Renovate runs on schedule (weekly Monday 03:00 SAST)
2. Creates separate PRs for:
   - `dependencies (minor/patch)` — grouped npm minor/patch
   - `dependencies (major)` — npm major versions
   - `CI/CD (minor/patch)` — grouped GitHub Actions minor/patch
   - `CI/CD (major)` — GitHub Actions major versions
3. All PRs labeled with `area:dependencies`, `area:ci`
4. Security updates created immediately (not on schedule)

### Reviewing PRs

1. Check the PR title and linked issues
2. Review the changelog (Renovate includes links)
3. Run `npm test` locally if major version upgrade
4. Approve and merge when ready

---

## Managing Updates

### Temporarily Pause Renovate

⚠️ **Warning: Destructive operation**

Adding `"enabled": false` to `.github/renovate.json` will:
- **Close all open Renovate PRs**
- **Delete all Renovate branches** (cleanup phase)
- Stop future dependency updates

This is NOT a simple pause — it cleans up in-progress work. Use only if you want to completely stop Renovate activity.

```json
{
  "extends": ["github>lightspeedwp/.github:renovate"],
  "enabled": false
}
```

**To cleanly pause** without destroying branches:
1. Leave `enabled: true`
2. Set schedule to pause period: `"schedule": ["after 9999-01-01"]` (never runs)
3. Restore normal schedule when ready to resume

**To permanently disable Renovate:** Use both `enabled: false` AND remove the Renovate app from repository settings.

### Pinning a Version

Renovate respects `package-lock.json`. To pin a dependency:
```bash
npm install package-name@desired-version
npm ci  # updates lock file
git commit -m "deps: pin package-name to X.Y.Z"
```

**Note:** Pinning in `package-lock.json` does NOT freeze the version in `package.json`. Renovate will still propose newer versions if they satisfy the range in `package.json` (e.g., `^1.0.0` allows `1.5.0`). To truly freeze, edit `package.json` to exact version without range operators: `"1.0.0"` instead of `"^1.0.0"`.

### Overriding Org Policy (Rarely Needed)

Add to `.github/renovate.json` to override org defaults:
```json
{
  "extends": ["github>lightspeedwp/.github:renovate"],
  "schedule": ["before 6am on Monday"],
  "prCreationLimit": 5
}
```

---

## Troubleshooting

**Q: Renovate PRs aren't being created**  
- Check that the Renovate GitHub App is installed and active (Settings → Integrations & applications)
- Check that `.github/renovate.json` is valid JSON
- Review Renovate's logs: https://app.renovatebot.com

**Q: A PR keeps reopening after I close it**  
- Add `"ignoreDeps": ["package-name"]` to `.github/renovate.json` to permanently ignore it

**Q: I want different update frequency for one package**  
- Add a package rule:
```json
{
  "packageRules": [
    {
      "matchPackageNames": ["package-name"],
      "schedule": ["before 6am on Monday"]
    }
  ]
}
```
(Use `matchPackageNames` with an array, not `matchPackageName`)

---

## Related Documentation

- **Governance Model:** See CLAUDE.md → "Phase 2: Repository Restructuring"
- **org-wide policy:** `lightspeedwp/.github/renovate.json`
- **Issue (TOA-451):** https://linear.app/lightspeedwp/issue/TOA-451
- **Renovate Docs:** https://docs.renovatebot.com

---

**Maintainer:** Claude Haiku 4.5  
**Last Updated:** 2026-11-09
