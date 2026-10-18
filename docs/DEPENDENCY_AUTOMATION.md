# Dependency Automation — Operation and Activation Guide

ThisOneTimeOnAcidCom, October 2026

## Overview

Dependabot and Mergify have been configured for dependency automation on the `develop` branch. This guide documents the configuration, current state and activation requirements.

**Current state:** Reporting-only. Automatic merging is intentionally disabled pending validation.

**Activation prerequisites:** See "Activation Checklist" below.

## Configuration

### Dependabot

**File:** `.github/dependabot.yml`

Dependabot is configured to create pull requests for:

1. **GitHub Actions** (daily)
   - Updates: minor and patch only
   - Majors: separate, require human review
   - Labels: `area:dependencies`, `area:ci`

2. **npm dependencies** (weekly, Monday)
   - Updates: minor and patch, grouped
   - Cooldown: 3 days default, 7 days for majors
   - Majors: separate, require human review
   - Labels: `area:dependencies`

**Important:** npm configuration assumes npm is the authoritative package manager. See "Known Issues" below.

All PRs target `develop` and use the hosted runner for dependency validation.

### Mergify

**File:** `.github/mergify.yml`

Mergify is configured in reporting-only mode. It reports on Dependabot PRs and human-authored PRs but takes no automatic actions.

When activated, Mergify will:
- Verify Dependabot identity and `develop` base branch
- Ensure no conflicts, drafts or forks
- Require all application checks to pass
- Require human approval
- Enforce approved update classification (minor/patch)

Major, prerelease and unclassified updates will remain manual.

## Dependency Validation

### Current validation (dependency-validation.yml)

The existing `dependency-validation.yml` workflow runs on all Dependabot and human-authored PRs targeting `develop`, `main` or `master`:

- Gitleaks secret scanning
- Manifest/lockfile consistency check
- Routing to hosted runner for Dependabot

**Important limitations:**
- Does not install or build (therefore cannot guarantee resolver consistency)
- Does not run unit tests, build tests, Playwright or linting
- Manifest comparison can hide errors if git diff fails (guarded by `|| true`)
- Printed warnings do not fail the check

### Application CI requirements (not yet implemented)

To enable automatic merging of Dependabot PRs, the following application CI must be added:

- Install dependencies from locked manifest
- Production build (`npm run build`)
- Build verification (`npm run test:build`)
- Node runtime from `.nvmrc` (24)
- No production/registry/GitHub App credentials exposed
- Clear failure for any job that did not execute or skipped

**Note:** Automatic merging is disabled until this CI is confirmed in place and validated.

## Known Issues and Blockers

### 1. Package Manager Conflict (BLOCKER)

**Status:** Unresolved  
**Issue:** #306, AGENTS.md "Unresolved decisions" #1

Both `package-lock.json` and `pnpm-lock.yaml` exist in the repository:

- README.md recommends `pnpm install`
- CONTRIBUTING.md explicitly forbids pnpm and requires `npm ci`
- Netlify build command: `npm run build`
- `package.json` contains `pnpm.overrides` (ignored by npm)
- `src/app/netlify.toml` contains `command = "pnpm run build"` (not read by Netlify)

**Current action:** Dependabot npm configuration is committed but conditional on owner confirmation. If pnpm is confirmed, replace the npm section in `.github/dependabot.yml` with the pnpm configuration documented in that file.

**Resolution path:**
1. Confirm whether npm or pnpm is authoritative
2. Remove contradictory configuration and lockfile (this requires owner approval)
3. Confirm Dependabot uses the correct manager

### 2. Mergify Automatic Merging Disabled (INTENTIONAL)

**Status:** By design

Automatic merging is **intentionally disabled** pending:

1. Confirmation of Mergify App installation
2. Effective branch protection on `develop`
3. Human-review enforcement (CODEOWNERS or branch protection)
4. Confirmed merge authority (currently unresolved)
5. Validated application CI

This is not a bug. Enabling automatic merging prematurely could create a path for unreviewed code to enter `develop` if branch protections are insufficient.

To activate:
1. Verify prerequisites above
2. Update `auto_merge_conditions` in `.github/mergify.yml`
3. Run the validation matrix (see below)
4. Document the merge authority decision

### 3. Centrally Managed Workflows

Workflows in `.github/workflows/` are managed by the central `lightspeedwp/dependency-merge-controller`:

- `dependency-validation.yml`
- `dependency-automation.yml`

Local edits to these files will be reverted by daily reconciliation. To propose changes, open an issue in `.github/workflows/` against the central repository.

## Validation Checklist

Before activating automatic merging, verify:

### Configuration Validation
- [ ] YAML syntax valid (`yamllint .github/{dependabot,mergify}.yml`)
- [ ] Dependabot options supported by current GitHub schema
- [ ] Mergify configuration matches current published schema
- [ ] Directory paths exist (at minimum, `/` for root)
- [ ] Timezone `Africa/Johannesburg` is valid

### Lockfile and Manifest
- [ ] Package manager confirmed as authoritative (npm or pnpm)
- [ ] Lockfile matches package.json (run `npm ci` or `pnpm install`)
- [ ] Frozen installation succeeds without warnings

### Dependabot PR Validation
- [ ] First grouped minor/patch PR created and targets `develop`
- [ ] PR title includes ecosystem name (e.g., "Bump npm packages")
- [ ] Labels `area:dependencies` and (if applicable) `area:ci` present
- [ ] Dependabot uses hosted runner (never self-hosted)
- [ ] Major updates created separately and not grouped

### Application Checks
- [ ] All required checks execute on PR (not skipped or missing)
- [ ] Build succeeds: `npm run build`
- [ ] Build tests pass: `npm run test:build`
- [ ] No required check is neutral, pending, unknown or cancelled
- [ ] Stale checks fail the PR (no merging with old check runs)

### Mergify Validation
- [ ] Mergify receives Dependabot PR and posts reporting comment
- [ ] Mergify posts comment on eligible human-authored PR
- [ ] Mergify dashboard shows correct rule matching

### Human Review Validation
- [ ] Approval by authorized reviewer (CODEOWNERS or branch protection)
- [ ] Stale approvals are not honored (must re-approve for new head SHA)
- [ ] Unresolved change requests block merge

### Edge Case Validation
- [ ] Wrong base (PR against `main` instead of `develop`) is rejected by Dependabot
- [ ] Fork PR from external user cannot be auto-merged
- [ ] Draft PR is never auto-merged
- [ ] Conflicted PR is never auto-merged
- [ ] Major version update PR requires manual review
- [ ] Unknown classification PR requires manual review
- [ ] API failure (GitHub API rate limit, missing diffs) fails safely
- [ ] Head SHA race (new commit during merge evaluation) is detected and aborted

### Rollout Validation
- [ ] Mergify rules survive central workflow reconciliation
- [ ] Existing Dependabot PRs (if any) are not affected
- [ ] `develop` → `main` release process unaffected
- [ ] Netlify deployments unaffected by merged dependency PRs

## Manual Fallback

If automatic merging fails or must be disabled:

1. Dependabot PRs will continue to be created
2. Manual approval workflow:
   - Review Dependabot PR description and changes
   - Verify all checks pass
   - Request approval from code owner
   - Merge manually via GitHub UI
3. To disable automatic merging, remove or comment out `auto_merge_conditions` in `.github/mergify.yml`

## Release Handoff: `develop` to `main`

Dependency updates on `develop` do **not** automatically propagate to `main`. The release process is manual:

1. When ready for release, create a PR from `develop` to `main`
2. Include all merged dependency updates
3. Run release CI
4. Deploy to production via Netlify

This separation ensures dependency updates do not bypass release testing.

## Operational FAQ

**Q: A Dependabot PR failed checks. What do I do?**  
A: Review the failure in the PR. If it's a real issue, wait for Dependabot to create an updated PR. If it's a transient check failure, run the check manually to confirm, then request re-run. Do not merge until all checks pass.

**Q: Can I manually merge a Dependabot PR?**  
A: Yes. Manual merging is always allowed and doesn't require Mergify. Use this if you're confident in the update and want to bypass automatic review.

**Q: Where do security updates land?**  
A: GitHub automatically creates security updates on the repository's default branch (currently `develop`), regardless of the `target-branch` setting in Dependabot configuration. Version updates (minor, patch, major) follow the configured `target-branch: develop`. Both flow the same way: version and security updates target `develop`, and manual release promotion (`develop` → `main`) is separate.

**Q: Mergify is not merging an eligible Dependabot PR. Why?**  
A: Check the Mergify run logs in the PR. Common causes:
- Missing approval
- One or more checks not passing
- Stale check run
- PR created after merge window closed
- Mergify App not installed or lacking permissions

**Q: Can I disable Dependabot?**  
A: Yes. Delete or rename `.github/dependabot.yml`. Existing PRs will remain open until closed manually. To re-enable, restore the file.

## Related Issues

- GitHub issue: #306 (this configuration)
- Linear issue: TOA-290 (automation workstream)
- Unresolved decision: AGENTS.md #1 (package manager)
- Unresolved decision: AGENTS.md #11 (branch and PR conventions)

## Central Reference

- Mergify Strategy: https://github.com/lightspeedwp/.github/blob/develop/docs/MERGIFY_STRATEGY.md
- Central Mergify Config: https://github.com/lightspeedwp/.github/blob/develop/.github/mergify.yml
- Dependency Merge Controller: https://github.com/lightspeedwp/dependency-merge-controller
