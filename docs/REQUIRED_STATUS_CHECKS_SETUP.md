# Required Status Checks Setup

> Task: Configure "No new test failures" as a required status check on `main` branch

**Branch:** `ci/tests-required-check`  
**Status:** 📋 In Progress  
**Requires:** Repository admin access

---

## Overview

The `No new test failures` check in `.github/workflows/tests.yml` validates that pull requests don't introduce new test failures by comparing the PR's test results against the base branch.

Currently, this check **runs on every PR but is not enforced**. This task configures it as a required status check to prevent merging PRs with new failures.

## Workflow Details

**Job:** `compare` (`.github/workflows/tests.yml:154–214`)

- **Runs only on:** Pull requests (`if: always() && github.event_name == 'pull_request'`)
- **Skips silently on:** Direct pushes to `main`
- **Reports skip message on:** Documentation-only PRs
- **Passes/fails on:** Regular PRs based on test comparison

**Comparison logic:**
- Runs Vitest on PR head and PR base
- Compares results via `scripts/validation/compare-jest-failures.cjs`
- Fails if PR introduces new test failures
- Passes if no new failures detected

## Why This Works

Since the job only reports on pull requests (not on direct pushes to `main`), making it required will not block commits to `main` or other pushes—GitHub only enforces required checks that actually report.

## Setup Checklist

### Prerequisites
- [ ] Repository admin or owner access
- [ ] Read permissions on this repository

### Implementation (GitHub UI)

1. **Navigate to branch protection rules:**
   - Go to repository **Settings**
   - Select **Rules** > **Rulesets** (new) OR **Branches** > **Branch protection rules** (legacy)

2. **Configure rule for `main` branch:**
   - Create new ruleset (or edit existing) targeting `main`
   - Set target to **Require status checks to pass before merging**

3. **Add the status check:**
   - In "Require status checks to pass", click **Add status checks**
   - Search for: `No new test failures`
   - Select and add it
   - Save the ruleset

4. **Verify configuration:**
   - Create a test PR
   - Confirm `No new test failures` appears in the checks list
   - Confirm it blocks merge if the check fails
   - Test a docs-only PR to verify skip message doesn't block

### Alternative: Mergify (Optional)

If your repository uses Mergify, add to `.mergify.yml`:

```yaml
queue_rules:
  - name: default
    conditions:
      - check-success=No new test failures
```

**Current status:** No `.mergify.yml` found in repository

## Validation

After setup, verify:

- ✓ `No new test failures` appears in PR checks list
- ✓ Merge is blocked when check fails
- ✓ Merge is allowed when check passes
- ✓ Docs-only PRs don't block on the check (shows skip message)
- ✓ Direct pushes to `main` don't block

## References

- Workflow: `.github/workflows/tests.yml`
- Comparison script: `scripts/validation/compare-jest-failures.cjs`
- GitHub docs: [Requiring status checks](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/requiring-status-checks-to-pass-before-merging)
- GitHub docs: [Rulesets](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-rulesets)

## Notes

- This check is **informational only** until configured as required
- The job gracefully skips on documentation-only PRs (reports skip message)
- No code changes required—pure configuration task
- Requires repository admin access (no API/CLI alternative available)

---

**Next steps:** Follow the GitHub UI setup checklist above. Once configured, resolve this task.
