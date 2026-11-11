# Renovate Configuration Guide

**Status:** Configuration merged to `main` on 2026-11-09. Enrolment, preset resolution and operation are **not yet verified** — see [Verification status](#verification-status) ([TOA-454](https://linear.app/lightspeedwp/issue/TOA-454)).
**Replaces:** Dependabot version updates on `main`
**Evidence date:** 2026-11-11, inspected at `main` revision `472ce58`

---

## Overview

A Renovate configuration has replaced the tracked Dependabot configuration on
`main`. This guide separates what the repository actually configures from what
has only been intended or assumed, so that nobody relies on behaviour that has
not been observed.

- **Local configuration:** `.github/renovate.json` (this repository).
- **Shared preset:** the local configuration references
  `github>lightspeedwp/.github:renovate`. Renovate resolves that reference to a
  `renovate.json` file at the root of the default branch of
  `lightspeedwp/.github`. No such file was tracked there when inspected
  (default branch `develop` at `b63f9bb`, 2026-11-11). Whether the reference
  resolves at runtime has not been observed.
- **`develop` branch:** the migration is on `main` only. `develop` still carries
  `.github/dependabot.yml` and has no Renovate configuration.

---

## Verification status

| Area | State | Notes |
| --- | --- | --- |
| Local configuration present on `main` | Verified | `.github/renovate.json` |
| Dependabot configuration removed from `main` | Verified | Still present on `develop` |
| Shared preset source | Not found | No Renovate preset file on the shared default branch |
| Runtime preset resolution and inherited policy | Unverified | No Renovate run or log has been observed |
| Renovate enrolment and repository access | Unverified | Needs confirmation by an organisation administrator |
| Renovate-authored pull requests, issues or dashboard | None observed | No `renovate/*` branch exists |
| Dependency pull request checks for Renovate | Configured, never executed | See [Pull request routing](#pull-request-routing) |
| Security-update continuity | Unverified | See [Security updates](#security-updates) |
| Pause and recovery procedures | Not exercised | See [Pausing Renovate](#pausing-renovate) and [Recovery](#recovery) |

Do not treat the migration as operationally accepted until the unverified rows
have evidence.

---

## Configuration

### Local settings (`.github/renovate.json`)

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

What this file sets directly:

- Extends the shared preset reference described above and Renovate's built-in
  `config:base` preset.
- Labels Renovate pull requests with `area:dependencies` and `area:ci`. Both
  labels exist in the organisation's canonical label set.
- Runs `npm dedupe` after npm updates.

Known issue: Renovate's configuration validator reports that `config:base` has
been renamed and should be migrated to `config:recommended`. Any change to this
file is tracked separately from this guide.

### Policy that is not configured locally

The local file sets **no** schedule, target branch, grouping, pull request
limit, commit convention, cooldown or vulnerability-alert behaviour. Earlier
versions of this guide listed the following as inherited from the shared
preset. They are intentions only: no inspected source defines them.

- Weekly schedule (Monday 03:00, Africa/Johannesburg)
- Grouped minor and patch updates, separate major updates
- GitHub Actions grouped separately from npm
- Maximum of 10 open pull requests per ecosystem
- Semantic commits using the `deps` type
- Prioritised security updates

Renovate's defaults from `config:base` cover anything not listed under "Local
settings", but only once the whole configuration resolves. If the shared
preset reference cannot be resolved, Renovate normally stops before applying
any settings, so no defaults take effect and no pull requests are created.

### Target branch

No `baseBranches` setting is configured, so Renovate targets the repository's
default branch, which is `main`. Earlier versions of this guide named
`develop`; that was incorrect for the current repository.

---

## Expected bot identity

The centrally managed `dependency-automation.yml` workflow lists
`lightspeed-renovate[bot]` as its approved Renovate actor. That indicates an
organisation-operated Renovate app rather than the public hosted Renovate app.

- Installation of that app on this repository has not been confirmed.
- Run logs are held wherever the organisation operates Renovate. The hosted
  dashboard at `app.renovatebot.com` only applies to the public hosted app and
  may show nothing for this repository.

---

## Pull request routing

Routing below is read from the workflow files. No Renovate pull request has
exercised it yet.

- `dependency-validation.yml` runs for pull requests into `main` or `master`
  whose branch starts with `renovate/`, `deps/` or `dependabot/`.
- Renovate pull requests are routed to the self-hosted
  `dependency-ci-ephemeral` runner group. Dependabot pull requests use a
  GitHub-hosted runner instead. Availability of the self-hosted group for this
  repository has not been confirmed.
- `dependency-automation.yml` (the managed merge sweep) refuses to act on
  public repositories. This repository is public, so dependency pull requests
  are **not** merged automatically here. Review and merge them manually.
- Both workflows are managed centrally by
  `lightspeedwp/dependency-merge-controller`. Do not edit them locally; local
  edits are reverted.
- `renovate/*` branches are exempt from the branch naming pattern.

### Reviewing dependency pull requests

1. Check the pull request title, labels and changed files.
2. Read the linked release notes or changelog.
3. Confirm the repository's checks have completed. Run `npm test` locally for
   major version upgrades.
4. Approve and merge manually when ready.

---

## Security updates

Security-update continuity has not been verified.

- The local Renovate configuration contains no vulnerability-alert settings.
- Dependabot **alerts** and **security updates** are repository settings. They
  are independent of `.github/dependabot.yml`, so removing that file does not
  by itself switch them off, and does not prove they are on. An administrator
  must confirm their state in the repository's security settings.
- Dependabot **version updates** on `main` stopped when the configuration file
  was removed. The last recorded version-update runs were on 2026-11-09.

---

## Existing Dependabot pull requests

Recorded on 2026-11-11:

- No Dependabot pull request is open.
- Pull requests #582 and #577 were closed unmerged on 2026-11-09 when their
  base branch was deleted. #570 and #385 were closed unmerged earlier.
- Two Dependabot branches remain on the remote:
  `dependabot/github_actions/develop/github-actions-minor-patch-ea21aa6b1c` and
  `dependabot/npm_and_yarn/develop/vitejs/plugin-react-6.1.2`. Their removal is
  a maintainer decision.

---

## Managing updates

### Pausing Renovate

None of the options below has been exercised in this repository. Confirm the
behaviour against the [Renovate documentation](https://docs.renovatebot.com)
for the version the organisation runs before relying on it.

| Option | How | Who |
| --- | --- | --- |
| Require approval for every update | Add `"dependencyDashboardApproval": true` to `.github/renovate.json`. Renovate then waits for approval in its Dependency Dashboard issue before creating pull requests. By default, vulnerability remediation pull requests do not wait for that approval. | Maintainer, via pull request |
| Restrict the schedule | Add a valid `schedule` value, for example `["before 4am on Monday"]`, to narrow when Renovate may act. By default, branches that already exist can still be updated outside the schedule. | Maintainer, via pull request |
| Disable for this repository | Add `"enabled": false` to `.github/renovate.json`. Check the effect on already-open Renovate pull requests and branches first. | Maintainer, via pull request |
| Remove repository access | Remove this repository from the Renovate app's installation. | Organisation administrator only |

An earlier version of this guide recommended `"schedule": ["after
9999-01-01"]` as a clean pause. That is not valid Renovate schedule syntax
and must not be used.

### Pinning a version

To hold a dependency at one version, set an exact version (no `^` or `~`) in
`package.json`, then refresh the lock file:

```bash
npm install package-name@1.2.3 --save-exact
```

A version held only in `package-lock.json` is not a pin: Renovate can still
propose newer versions that satisfy the range in `package.json`.

### Ignoring a dependency

```json
{
  "ignoreDeps": ["package-name"]
}
```

### Different rules for one package

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

Use `matchPackageNames` with an array, not `matchPackageName`.

---

## Recovery

These steps describe how to return to a known state. They change repository
files only, through a reviewed pull request. They have not been rehearsed.

### Revert the Renovate configuration

1. Create a branch from `main` and revert the change that added
   `.github/renovate.json`, or delete the file.
2. Open a pull request and merge it after review.
3. Close any open Renovate pull requests manually if Renovate does not.

### Fall back to Dependabot version updates

1. Restore `.github/dependabot.yml` from the copy still tracked on `develop`:

   ```bash
   git fetch origin develop
   git checkout origin/develop -- .github/dependabot.yml
   ```

2. Review the restored file before committing. It targets `develop`; adjust the
   target branch to `main` if version updates should run against the default
   branch.
3. Do not run both tools against the same ecosystem. Remove or disable the
   Renovate configuration in the same pull request.

### Actions that need an administrator

Installing, suspending or removing the Renovate app, changing its repository
access, and changing Dependabot alert or security-update settings are
administrative actions. They are outside the scope of a repository pull
request.

---

## Troubleshooting

**Renovate pull requests are not being created**

- Confirm with an organisation administrator that the Renovate app is
  installed and has access to this repository.
- Ask for the latest Renovate run log for this repository. An unresolved
  preset reference normally stops Renovate before it creates any pull request.
- Check `.github/renovate.json` with Renovate's validator:

  ```bash
  npx --yes --package renovate -- renovate-config-validator .github/renovate.json
  ```

**A pull request keeps reopening after it is closed**

- Add the package to `ignoreDeps` as shown above.

---

## Related documentation

- [Dependency Automation guide](./DEPENDENCY_AUTOMATION.md) — historical
  Dependabot and Mergify setup, superseded by this guide for `main`
- `.github/renovate.json` — local configuration
- `.github/workflows/dependency-validation.yml` and
  `.github/workflows/dependency-automation.yml` — centrally managed workflows
- [Renovate documentation](https://docs.renovatebot.com)

---

**Maintainer:** Repository owner (see `.github/CODEOWNERS`)
**Last updated:** 2026-11-11
