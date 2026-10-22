# `.github` Directory Guide

This directory contains governance, community, and workflow resources for the
**Ash Shaw Makeup Portfolio** (ThisOneTimeOnAcidCom) repository.

## Directory Structure

### `workflows/`

Centrally managed GitHub Actions workflows. **Do not edit these files**—they are
controlled by the shared `lightspeedwp/.github` repository and synchronized via
the `dependency-merge-controller` workflow.

| File | Purpose | Maintenance |
|------|---------|------------|
| `dependency-automation.yml` | Auto-merge dependency PRs | Centrally managed |
| `dependency-validation.yml` | Validate package and lock files sync | Centrally managed |

## Local workflow contributions

- New workflows should follow the naming pattern `{type}-{feature}.yml`
- Keep workflows minimal; prefer repository-level scripts over workflow logic
- Test workflow syntax with [`workflow-validator`](https://github.com/lightspeedwp/workflow-validator) before committing

---

## Community Resources (Inherited from Organisation)

The repository inherits community templates from the shared
`lightspeedwp/.github` organisation repository:

- **Issue templates** — Inherited from org defaults ([`.github/ISSUE*TEMPLATE/`](https://github.com/lightspeedwp/.github/tree/develop/.github/ISSUE*TEMPLATE))
- **PR templates** — Inherited from org defaults ([`.github/PULL*REQUEST*TEMPLATE/`](https://github.com/lightspeedwp/.github/tree/develop/.github/PULL*REQUEST*TEMPLATE))
- **Discussion templates** — Available from org defaults if repository discussions are enabled
- **Labels** — Managed separately in this repository; reference org label definitions ([`labels.yml`](https://github.com/lightspeedwp/.github/blob/develop/.github/labels.yml))
- **Saved replies** — Personal GitHub resources, not repository files

### Enabling Local Templates

If this repository requires custom issue, PR, or discussion templates (deviating
from org defaults), they would be created in:

- `.github/ISSUE_TEMPLATE/` — Issue templates
- `.github/PULL*REQUEST*TEMPLATE/` — PR templates
- `.github/DISCUSSION_TEMPLATE/` — Discussion form templates

**Current status:** Not configured (using org defaults).

---

## Repository Governance

### Branch Naming Convention

**All branches must follow:** `{type}/{scope}-{title}`

**Allowed types:** `feat`, `fix`, `hotfix`, `release`, `refactor`, `chore`,
`docs`, `test`, `perf`, `ci`, `build`, `epic`, `task`, `research`, `design`,
`a11y`, `ops`, and others—see
[`validate-branch-name.js`](../scripts/validate-branch-name.js) for the complete
list.

**Examples:**

- ✅ `feat/dark-mode-implementation`
- ✅ `fix/journal-validation-path`
- ✅ `docs/governance-update`
- ❌ `claude/something` — FORBIDDEN (reserved for Claude Code internal sessions)
- ❌ `feature/something` — WRONG (use `feat/` not `feature/`)

## Validate before pushing

```bash
npm run validate:branch-name -- --branch your-branch-name

```text

**Reference:**
[`scripts/validate-branch-name.js`](../scripts/validate-branch-name.js)

---

## Key Repository Files (Not in `.github/`)

These files are at the repository root and contain important governance
information:

| File | Purpose |
|------|---------|
| [`AGENTS.md`](../AGENTS.md) | AI agent instructions and validated command baseline |
| [`CONTRIBUTING.md`](../CONTRIBUTING.md) | Contribution guide for human and AI contributors |
| [`CHANGELOG.md`](../CHANGELOG.md) | Project changelog (protected; do not delete or rename) |
| [`ATTRIBUTIONS.md`](../ATTRIBUTIONS.md) | Project attributions (protected) |
| [`README.md`](../README.md) | Project overview and setup guide |
| [`guidelines/`](../guidelines/) | **Design system source of truth** — read before coding |

---

## Specification-First Development (Spec Kit)

This repository uses **Spec Kit** for specification-driven development:

- **Specification Catalog:** [`.github/specs/CATALOG.md`](../.github/specs/CATALOG.md) — Browse all active and archived specifications
- **Spec Kit configuration:** [`.specify/`](../.specify/)
- **Gemini CLI integration:** [`.gemini/`](../.gemini/)
- **Spec workflow:** See [`CONTRIBUTING.md § Using Spec Kit`](../CONTRIBUTING.md#using-spec-kit)

Specifications are created in and tracked within the repository using Spec Kit.
See the `.specify/` directory for configuration and the
[`.github/specs/`](../.github/specs/) directory for all specification documents.

---

## Deployment & Infrastructure

### Netlify Configuration

The Netlify site is configured to:

- **Build command:** `npm run build`
- **Publish directory:** `dist/`
- **Branch:** `main`

Netlify does **not** read `src/app/netlify.toml` (the base directory is the
repository root, not `src/app/`). Deployment settings are managed in the Netlify
UI.

### Environment Variables

Environment variables are managed in the Netlify site settings, not in the
repository. Do not commit `.env` files.

---

## Protected and Centrally Managed Files

Do not modify these without explicit owner approval:

| File/Directory | Reason | Who to Ask |
|---|---|---|
| `.github/workflows/*` | Centrally managed; changes are reverted | `@ashley` (owner) |
| `CHANGELOG.md` | Project history; never delete or rename | `@ashley` |
| `ATTRIBUTIONS.md` | Project attribution; protected | `@ashley` |
| `src/app/components/figma/ImageWithFallback.tsx` | Figma Make compatibility; protected | `@ashley` |
| `src/app/utils/supabase/` | Deployment artefact; protected | `@ashley` |
| `tasks/task-list.md` | Master task tracker; never delete | `@ashley` |

---

## Known Issues & Decisions Pending

See [`AGENTS.md § Unresolved
decisions`](../AGENTS.md#unresolved-decisions-owner-confirmation-required) for a
complete list of open questions waiting for owner confirmation.

Key items:

- **Package manager:** npm vs. pnpm remnants (currently npm-only)
- **Node.js version:** Not pinned
- **Test framework:** Jest ESM config needs fixing
- **Spec Kit paths:** Confirm `.github/specs/` as default output location
- **BEM vs Tailwind:** CSS architecture unresolved

---

## Maintenance Responsibilities

| Area | Current Owner | Handoff/Questions |
|------|---|---|
| `.github/workflows/` | Centrally managed (LightSpeed) | Do not edit |
| Branch validation | Repository (`scripts/validate-branch-name.js`) | Works; maintained locally |
| `.specify/` configuration | Managed integration | See Spec Kit docs |
| `.gemini/` configuration | Managed integration | See Gemini docs |
| Repository labels | Managed separately in repository | Use org label definitions as reference |
| Community templates | Inherited from org | Inherit unless customisation needed |

---

## Quick Links

- **[Shared `.github` repository](https://github.com/lightspeedwp/.github)** — Organisation governance source of truth
- **[Contributing Guide](../CONTRIBUTING.md)** — How to contribute
- **[Agent Instructions](../AGENTS.md)** — For AI agents
- **[Guidelines](../guidelines/)** — Design system and coding standards
- **[Spec Kit](../.specify/)** — Specification workflow
- **[Tasks](../tasks/)** — Project task tracking

---

**Last updated:** 16 October 2026 · **Status:** Governance audit in progress
(epic [TOA-241](https://linear.app/lightspeedwp/issue/TOA-241))
