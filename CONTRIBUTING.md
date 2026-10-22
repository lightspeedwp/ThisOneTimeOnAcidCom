# Contributing to ThisOneTimeOnAcid

Thank you for your interest in contributing to the Ash Shaw makeup portfolio
project.
This guide covers setup, validation and the contribution workflow. It is based
on the repository's own files. Where the repository is inconsistent, the open
questions are listed under [Unresolved
decisions](#unresolved-decisions-owner-confirmation-required).

AI agents should also read [AGENTS.md](AGENTS.md).

## Prerequisites

- **[Node.js](https://nodejs.org/) 24 LTS or later**. The repository pins
  Node.js 24 via `.nvmrc` and the `engines` field in `package.json`. Use `nvm
  use` or your preferred version manager to switch to the correct version.
- **npm** (version 11+), which ships with Node.js. `package-lock.json` is the
  only committed lockfile, and Netlify builds with `npm run build`.
- **[Git](https://git-scm.com/)**

> Do not use pnpm or Yarn. npm is the only supported package manager. The
repository uses `npm ci` to install exact dependencies from `package-lock.json`.

## Setup

```bash

# 1. Clone the repository

git clone https://github.com/lightspeedwp/ThisOneTimeOnAcidCom.git
cd ThisOneTimeOnAcidCom

# 2. Install dependencies exactly as locked

npm ci

# 3. Start the development server

npm run dev

```text

The dev server runs on Vite. Open the URL shown in the terminal, which is
usually `http://localhost:5173`. Vite's entry point is `index.html`, which loads
`src/main.tsx`.

## Project structure

```text
ThisOneTimeOnAcidCom/
├── guidelines/            ← Design and development guidelines (read first)
├── src/
│   ├── main.tsx           ← Vite entry point (loaded by index.html)
│   ├── app/               ← Application source
│ │ ├── components/ ← React components (pages, common, layout, sections,
template-parts, ui, figma)
│   │   ├── data/          ← Centralised mock data (mock/, types/, README.md)
│   │   ├── hooks/         ← Custom React hooks
│   │   ├── lib/           ← router.tsx and bundler-safe helpers
│   │   ├── utils/         ← Services and utilities
│   │   ├── routes.ts      ← Route definitions
│   │   └── netlify.toml   ← NOT read by Netlify (see Deployment)
│ └── styles/ ← Global CSS and BEM blocks (globals.css, blocks/, tokens/ …)
├── content/               ← Markdown content (journal, blog, book, faq …)
├── public/                ← Static assets copied into dist/
├── scripts/               ← Build and utility scripts
├── tests/                 ← Node test-runner test files (no package script yet)
├── prompts/               ← AI prompt templates
├── reports/               ← Audit reports
├── tasks/                 ← Task lists and checklists
├── docs/                  ← General documentation
├── .specify/              ← Spec Kit configuration
├── .gemini/               ← Gemini agent commands
├── .github/workflows/ ← Centrally managed dependency workflows (do not edit)
├── package.json           ← Scripts and dependencies
├── package-lock.json      ← npm lockfile
└── vite.config.ts         ← Vite configuration

```text

The guidelines use root-style paths such as `/components/` and `/styles/`. These
map to `src/app/components/` and `src/styles/`. The full mapping is in
[AGENTS.md § Path convention](AGENTS.md#path-convention-used-in-the-guidelines).

### Source vs generated output

- **Source** is everything committed to the repository: `src/`, `guidelines/`,
  `scripts/`, `public/` and the configuration files.
- **Generated output** is the `dist/` directory, which `npm run build` produces
  and Netlify publishes. It is git-ignored, is not configuration, and must not
  be edited by hand.

### Deployment

The Netlify site settings, checked on 3 October 2026, are:

- Base directory: repository root
- Build command: `npm run build`
- Publish directory: `dist`

Netlify reads `netlify.toml` in this order: package directory (if set in the UI)
→ base directory → repository root. There is **no root `netlify.toml`**. Confirm
whether the package-directory UI setting is configured:

- If the package directory is set to `src/app/`, then `src/app/netlify.toml`
  **may be active**
- If not configured (or set to root), then `src/app/netlify.toml` is not read

SPA routing is defined in the plain-text `public/_redirects` file, which Vite
copies to `dist/_redirects` — keep it as a plain file, not a directory.

**Note:** SPA routing configuration is tracked in [PR

#15](https://github.com/lightspeedwp/ThisOneTimeOnAcidCom/pull/15)

(`public/*redirects` replacement and `dist/*redirects` redirect-rule
processing). That PR documents the Netlify deployment configuration, routing fix
and outstanding validation requirements. Do not change deployment settings in a
contribution unless the owner has asked for it.

## Available scripts

These scripts are defined in [`package.json`](package.json):

| Command | Purpose |
|---|---|
| `npm run dev` | Start the Vite development server |
| `npm run build` | Production build to `dist/` |
| `npm run journal:parse` | Parse journal markdown into JSON |
| `npm run journal:validate` | Validate journal markdown (no output written) |
| `npm run journal:check-links` | Check journal link integrity |

There are **no** `test`, `lint`, `typecheck`, `type-check` or `verify` scripts.
Older guidance mentions `npm run type-check` and `npm run verify`, but these do
not exist.

## Validation

Before opening a pull request, run the checks that apply to your change and
**report exactly what you ran and what happened**:

```bash

# Primary check: the production build must succeed

npm run build

```text

If you change journal content, also run:

```bash
npm run journal:validate
npm run journal:check-links

```text

> **Known issue:** as of commit `76b1528`, both journal scripts fail with
`journal-content/ directory not found`, because journal content lives in
`content/journal/`. Mention this in your PR rather than hiding it.

If you change Spec Kit scripts, run the Node test runner directly:

```bash
node --test tests/speckit.test.mjs

```text

> **Known issue:** as of commit `76b1528`, this suite reports 93 passing and 11
failing tests (104 in total), all in the "template resolution" suite.
> `tests/accordion.test.tsx` needs `jsdom`, which is not installed, so it cannot
currently run.

No automated linting, type-checking, browser or accessibility checks are
configured. Manual review against the guidelines is the current quality gate. Do
not describe these checks as passed unless you actually performed them.

## Using Spec Kit

For significant features, governance changes, or architectural decisions, follow
the specification-driven development workflow:

### Workflow phases

| Phase | Command | Deliverable | Purpose |
|---|---|---|---|
| 1. Specify | `/speckit-specify` | `spec.md` | Define requirements, user stories, acceptance criteria |
| 2. Clarify | `/speckit-clarify` | Updated spec with Q&A | Resolve ambiguities and get answers recorded |
| 3. Plan | `/speckit-plan` | `plan.md`, `research.md` | Technical design, architecture, decision rationale |
| 4. Decompose | `/speckit-tasks` | `tasks.md` | Break planning into actionable implementation tasks |
| 5. Implement | Your tools | Feature branch | Execute tasks and commit work |

All outputs go to the canonical `.github/specs/` directory
(`.github/specs/{NNN-feature-slug}/`). Feature directories are automatically
numbered sequentially starting from 001.

### Example: Create a new specification

```bash

# 1. Start the spec workflow

/speckit-specify

# 2. Answer clarification questions

/speckit-clarify

# 3. Review and approve technical plan

/speckit-plan

# 4. Break down into tasks

/speckit-tasks

# 5. Implement tasks on your feature branch

# (following the task breakdown from phase 4)

```text

### When to use Spec Kit

✅ **Use Spec Kit for:**

- New features with complex requirements
- Governance or architectural changes
- Multi-day implementation efforts
- Decisions that affect multiple components
- Anything needing written clarification before starting

❌ **Skip Spec Kit for:**

- Small bug fixes
- One-line documentation updates
- Routine maintenance with clear scope
- Straightforward dependency updates

### More information

- **Specification catalog:**
  [.github/specs/CATALOG.md](.github/specs/CATALOG.md) — browse all active
  specifications
- **Spec Kit configuration:** [.specify/](.specify/) — templates and routing
  rules
- **Maintenance procedures:**
  [.github/specs/MAINTENANCE.md](.github/specs/MAINTENANCE.md) — how to create,
  update, archive specs

## Coding conventions

All conventions are documented in
**[guidelines/Guidelines.md](guidelines/Guidelines.md)**. Follow the reading
order in [guidelines/README.md](guidelines/README.md). The key rules are:

### Styling: semantic BEM

The guidelines require **semantic BEM CSS** and forbid Tailwind utility classes,
inline styles and CSS-in-JS in components:

```tsx
// ✅ Correct
<div className="card card--featured">
  <h2 className="card__title">Title</h2>
</div>

// ❌ Wrong — Tailwind utilities
<div className="flex items-center gap-4">
  <span className="text-gray-600">Text</span>
</div>

// ❌ Wrong — inline styles
<div style={{ padding: '16px' }}>Content</div>

```text

CSS lives in `src/styles/`, with one file per block in `src/styles/blocks/`. See
[guidelines/css-architecture.md](guidelines/css-architecture.md).

> Tailwind CSS v4 remains installed and is loaded by `vite.config.ts` and
several stylesheets. Do not remove that tooling as part of an unrelated change.
This contradiction is listed under [Unresolved
decisions](#unresolved-decisions-owner-confirmation-required).

### Data and content authority

- **UI and component content:** All UI strings, layout text, navigation labels
  and component assets must be imported from the centralized mock data system
  (`src/app/data/mock/`, via `@/data/mock`). Never hardcode text into
  components:

```tsx
// ✅ Correct
import { heroContent } from "@/data/mock";
<h1 className="hero__title">{heroContent.title}</h1>

// ❌ Wrong
<h1 className="hero__title">Welcome to my Portfolio</h1>

```text

See [src/app/data/README.md](src/app/data/README.md).

- **Editorial and reader content:** Long-form manuscript chapters, journal
  entries, stories and FAQs reside as Markdown under `content/` (e.g.
  `content/book/`, `content/journal/`). Content loaders (such as
  `bookContentLoader.ts`) and parser scripts ingest these files directly,
  distinguishing editorial articles from UI component mock data.

### Headings: sentence case

All headings, titles, navigation labels and button text use **sentence case**:
capitalise only the first word and proper nouns.

### Bundler workarounds

The Figma Make bundler has known syntax limitations. See the full table in
[Guidelines.md § Bundler Compatibility Rules](guidelines/Guidelines.md). Avoid
optional chaining (`?.`), nullish coalescing (`??`), `import.meta.env`,
`for...of` loops and nested ternaries. Use the helpers in
`src/app/lib/router.tsx`.

### Images

Never replace existing images. Use `ImageWithFallback`
(`src/app/components/figma/ImageWithFallback.tsx`, a protected file) for new
images. All `figma:asset/` imports are protected.

## File placement rules

| Content type | Location |
|---|---|
| Design and development guidelines | `guidelines/` |
| AI prompt files | `prompts/` |
| Audit reports and analysis | `reports/{topic}/` |
| Task lists and checklists | `tasks/` |
| General documentation | `docs/` |
| Build and utility scripts | `scripts/` |

[Guidelines.md](guidelines/Guidelines.md) permits an acknowledged exception:
`AGENTS.md` and `CONTRIBUTING.md` are at the root for agent and GitHub
discoverability, supplementing the canonical root files `README.md`,
`CHANGELOG.md` and `ATTRIBUTIONS.md`.

## Contribution workflow

### 1. Branch naming

**Standard branches MUST follow this pattern:** `{type}/{scope}-{title}`.
[scripts/validate-branch-name.js](scripts/validate-branch-name.js) is the source
of truth for approved types, rejected prefixes, and exemptions. `dependabot/*`,
`renovate/*`, and supported versioned or dated `release/` branches are exempt
from the standard pattern.

Where:

- **type** – Work type (required, one validator-approved value; common examples
  appear below)

- **scope** – Component or area (required, lowercase, no spaces)
- **title** – Descriptive name (required, lowercase, hyphens between words)

**FORBIDDEN prefixes** (these break PR template routing and automation):

- ❌ `claude/` — Reserved for Claude Code internal sessions
- ❌ `copilot/` — Reserved for GitHub Copilot integration
- ❌ `openai/` — Reserved for OpenAI integration

**Common valid branch types** (the validator contains the full list):

| Type | Purpose | Example |
|---|---|---|
| `feat` | New feature or enhancement | `feat/dark-mode-support` |
| `fix` | Bug fix | `fix/mobile-menu-overflow` |
| `hotfix` | Urgent production fix | `hotfix/critical-vulnerability` |
| `release` | Release branch | `release/v1.0.0` |
| `refactor` | Code refactoring | `refactor/hook-consolidation` |
| `chore` | Maintenance, no user changes | `chore/dependency-update` |
| `task` | Scoped unit of work | `task/ui-component-audit` |
| `doc` | Single documentation change | `doc/readme-typo-fix` |
| `docs` | Documentation | `docs/update-contributing` |
| `design` | Design system or UI | `design/button-component-update` |
| `test` | Tests and QA | `test/e2e-homepage-tests` |
| `perf` | Performance optimization | `perf/image-lazy-loading` |
| `ci` | CI/CD and automation | `ci/github-actions-workflow` |
| `build` | Build system changes | `build/vite-config-update` |
| `deps` | Dependency updates | `deps/upgrade-major-versions` |
| `security` | Security fixes | `security/xss-vulnerability-fix` |

## Before pushing, validate your branch name

```bash
npm run validate:branch-name

```text

Expected output:

```text
Branch 'feat/your-feature-name' matches the repository branching strategy.

```text

## Why branch naming matters

- Correct names support template suggestions and type labels from the routing
  workflow

- GitHub Actions workflows depend on valid prefixes
- Labeling automation uses branch names to assign labels
- Invalid names cause validation failures and CI delays

### 2. Making changes

1. Create a branch from an up-to-date `develop` (the repository's default
   branch).

1. Read the relevant guidelines **before** coding.

1. Make your changes following the conventions above.

1. Run the applicable checks from [Validation](#validation) and note the
   results.

### 3. Pull requests

## PR Template Selection

The intended branch mapping is defined in
[scripts/pr-template-router.js](scripts/pr-template-router.js). Templates are
maintained in [lightspeedwp/.github](https://github.com/lightspeedwp/.github).
The local workflow currently suggests a template and attempts to apply a type
label; it does not insert template content into the PR body. Completing and
verifying the shared-template routing is tracked by T035. The configured mapping
includes:

| Branch Type | Template | Used For |
|---|---|---|
| `feat/` | Feature template | New features and enhancements |
| `fix/` | Fix template | Bug fixes and hotfixes |
| `docs/`, `doc/` | Documentation template | Documentation changes |
| `design/` | Design template | Design system and UI updates |
| `a11y/` | Design template | Accessibility changes |
| `test/` | Test template | Test suite and QA changes |
| `refactor/` | Refactor template | Code refactoring (no user changes) |
| `chore/` | Chore template | Build, deps, maintenance (no user changes) |
| Other | Default template | When branch type doesn't match above |

`a11y/` is configured for the design template, but the current prefix parsers do
not accept digits. Correcting that route and verifying it are part of T035.

**Choose the template explicitly:** Read the matching shared template and copy
its sections into your PR body, preserving your description. Branch-based
selection, named-template loading, and default-template inheritance have not
been verified; do not assume GitHub loads the matching template automatically.

## Fill out all template sections

- Write a clear description explaining what changed and why
- List the validation commands you ran and their results, including any failures
- Link related issues using "Related to #N" when acceptance criteria are still
  outstanding, and use a closing keyword (e.g. "Closes #N") only when the PR
  fully resolves the issue
- Complete any template-specific sections (e.g. screenshots for UI changes, test
  results for fixes)

## If the template suggestion does not match

- Verify your branch name matches the pattern `{type}/{scope}-{title}`
- Check that you didn't use a forbidden prefix (`claude/`, `copilot/`,
  `openai/`)

- Run `npm run validate:branch-name` to confirm validity
- Use the matching shared template to complete the PR body and report the
  routing mismatch

### 4. Creating issues

## Issue templates are inherited from the organisation

This repository does not maintain local issue templates. Instead, we use the
org-wide issue types and templates from
[lightspeedwp/.github](https://github.com/lightspeedwp/.github).

## Available issue types

| Type | Usage | Example |
|---|---|---|
| `type:bug` | Report a bug or defect | "Navigation menu doesn't collapse on mobile" |
| `type:feature` | Request a new feature | "Add dark mode support" |
| `type:task` | Tracked work item | "Refactor authentication system" |
| `type:documentation` | Documentation request or update | "Add deployment guide" |
| `type:security` | Security issue or vulnerability | "XSS vulnerability in comment input" |
| `type:design` | Design or UI related | "Update button styling" |
| `type:question` | Support or clarification question | "How do I configure X?" |

**Creating an issue:**

1. Go to the [Issues
   tab](https://github.com/lightspeedwp/ThisOneTimeOnAcidCom/issues)

1. Click "New issue"

1. Select the appropriate issue type

1. Fill out the template completely:

   - **Title:** Clear, concise description (sentence case)
   - **Description:** Details, steps to reproduce (for bugs), or requirements
     (for features)
   - **Labels:** Automatically applied based on issue type; add area labels
     (e.g., `area:ci`, `area:docs`)
   - **Acceptance criteria:** For features and tasks, define what "done" looks
     like

**No local overrides:** Do not create `.github/ISSUE_TEMPLATE/` files here
unless the issue type is repository-specific. The org-wide templates in
lightspeedwp/.github are canonical for consistency across the LightSpeed
organization.

See [lightspeedwp/.github § Issue
Templates](https://github.com/lightspeedwp/.github/tree/develop/.github/ISSUE_TEMPLATE)
for the complete list of available templates.

### 5. Changelog

The changelog is the root [CHANGELOG.md](CHANGELOG.md). It is a protected file:
never delete, move or rename it. Entries follow [Keep a Changelog
v1.1.0](https://keepachangelog.com/en/1.1.0/) under `## [Unreleased]`. See
[guidelines/changelog.md](guidelines/changelog.md) for the full rules. Prepare
an entry for user-facing changes. Issues labelled `meta:no-changelog` do not
need one.

### 6. After merge

- Delete the branch.
- Close linked issues only once their acceptance criteria are met.
- Update related epics rather than closing them.

## Using Saved Replies

GitHub Saved Replies are templated responses for common feedback patterns. The
LightSpeed organization maintains a library of saved replies in
[lightspeedwp/.github](https://github.com/lightspeedwp/.github/discussions/categories/saved-replies).

## How to add saved replies to your account

1. Go to your [GitHub Settings → Saved
   replies](https://github.com/settings/saved_replies)

1. Click "Add a saved reply"

1. Reference the [LightSpeed Saved Replies
catalog](https://github.com/lightspeedwp/.github/discussions/categories/saved-replies)

1. Copy the template text and customize as needed

## Common saved replies used in this repository

- **Template corrections** — When a PR has the wrong template loaded
- **Validation checks** — Standard checks that pass or fail
- **Branch naming** — Guidance on fixing branch naming issues
- **Merge criteria** — Reminders about acceptance criteria before merging
- **Code review notes** — Architecture, style, or security observations

## When to use saved replies

✅ Use saved replies for:

- Repetitive feedback (branch naming, validation checks, template corrections)
- Standard checklists (pre-merge validation, accessibility review)
- Gentle reminders (acceptance criteria, code ownership, guidelines)

❌ Avoid saved replies for:

- First-time feedback specific to this PR
- Detailed technical explanations
- Sensitive or critical issues
- Architecture decisions requiring discussion

See [lightspeedwp/.github](https://github.com/lightspeedwp/.github) for the
complete catalog and contribution guide.

## Getting help

- **Guidelines questions:** start with
  [guidelines/README.md](guidelines/README.md)
- **Architecture questions:** see
  [guidelines/ARCHITECTURE.md](guidelines/ARCHITECTURE.md)
- **Component usage:** check the specific file in
  [guidelines/components/](guidelines/components/)
- **Issue tracking:** [GitHub
  Issues](https://github.com/lightspeedwp/ThisOneTimeOnAcidCom/issues)
- **Saved replies:** [LightSpeed Saved
Replies](https://github.com/lightspeedwp/.github/discussions/categories/saved-replies)

## Resolved decisions

The following were documented as unresolved but have now been clarified:

- ✅ **Branch naming:** `{type}/{scope}-{title}` pattern required. Validated by
  `npm run validate:branch-name`.
- ✅ **PR templates:** Automatically routed based on branch type (see "Pull
  requests" section above).
- ✅ **Node.js version:** Pinned to Node.js 24 LTS. Use `.nvmrc` (`nvm use`) or
  check `package.json` `engines` field.
- ✅ **Package manager:** npm-only. `package-lock.json` is the canonical
  lockfile. pnpm remnants to be removed per TOA-262.
- ✅ **Tailwind:** BEM-only CSS enforced per STYLE-001. Tailwind dependencies to
  be removed during Phase 6 cleanup.

## Repository Governance & Policies

### Protected Files

The following files are **protected and require explicit approval to modify**:

| File | Purpose | Change Process |
|------|---------|-----------------|
| `.github/` | Governance and workflows | Open issue: `[PROTECTED-FILE-CHANGE-REQUEST]` |
| `scripts/` | Build and validation scripts | Open issue: `[PROTECTED-FILE-CHANGE-REQUEST]` |
| `AGENTS.md` | AI agent rules and governance | Open issue: `[PROTECTED-FILE-CHANGE-REQUEST]` |
| `CHANGELOG.md` | Release history (managed by Release Agent) | Open issue: `[PROTECTED-FILE-CHANGE-REQUEST]` |
| `ATTRIBUTIONS.md` | Project attributions | Open issue: `[PROTECTED-FILE-CHANGE-REQUEST]` |
| `guidelines/` | CSS architecture and coding standards | Open issue: `[PROTECTED-FILE-CHANGE-REQUEST]` |
| `src/app/utils/supabase/` | Backend integration (protected from changes) | Open issue: `[PROTECTED-FILE-CHANGE-REQUEST]` |
| `src/app/components/figma/ImageWithFallback.tsx` | Figma integration component | Open issue: `[PROTECTED-FILE-CHANGE-REQUEST]` |
| `tasks/task-list.md` | Task tracker (never delete) | Open issue: `[PROTECTED-FILE-CHANGE-REQUEST]` |

## Why files are protected

- Governance infrastructure stability — changes affect all workflows and
  automations
- Coding standards consistency — guidelines must remain canonical
- Backend security — Supabase integration must not be accidentally exposed
- Asset integrity — Figma components are contracts with design tools
- Project history — changelog and attributions are permanent records

## To request a change

1. Open a GitHub issue with `[PROTECTED-FILE-CHANGE-REQUEST]` tag

1. Describe the specific change needed and why it is necessary

1. Explain any impact on dependent systems or workflows

1. Wait for @ashley's explicit approval before proceeding

See
[`.github/workflows/protected-files-guard.yml`](.github/workflows/protected-files-guard.yml)
for automatic enforcement on all PRs.

### Code Ownership

This repository is maintained by the LightSpeed team. Code ownership is declared
in [CODEOWNERS](.github/CODEOWNERS):

- **Frontend architecture & components:** @ashley
- **Guidelines & standards:** @ashley
- **Spec Kit & governance:** @ashley
- **CI/CD workflows:** @ashley

When you submit a PR that affects these areas, the code owner is automatically
requested for review via GitHub's CODEOWNERS mechanism. Approve their feedback
or provide justification before merging.

### Locked Configuration Files

These files are **manually curated by @ashley** and require explicit approval to
modify:

| File | Purpose |
|------|---------|
| `.github/labels.yml` | Canonical label definitions (158 labels) — all labels **must** use family prefixes (e.g., `type:bug`, not `bug`) |
| `.github/issue-types.yml` | Org-wide issue type definitions (24 types) |
| `.github/workflows/labeling-unified.yml` | GitHub Actions labeling automation |

## Label Prefix Requirements

All labels applied to issues and PRs **must use the family prefix system**:

- ✅ `type:bug`, `type:feature`, `type:task` — **CORRECT**
- ✅ `status:in-progress`, `status:done` — **CORRECT**
- ✅ `priority:high`, `priority:low` — **CORRECT**
- ❌ `bug` — **WRONG** (use `type:bug`)
- ❌ `urgent` — **WRONG** (use `priority:critical`)

See [lightspeedwp/.github § Label Creation
Rules](https://github.com/lightspeedwp/.github/blob/develop/CLAUDE.md#label-creation-rules-critical)
for the complete catalog and prefix reference.

### Governance Structure

This repository is part of the **LightSpeed organization governance** framework:

- **Canonical governance files:** Live in `lightspeedwp/.github`
  (organization-wide standards)
- **Local governance files:** Live in `.github/specs/` and `.github/workflows/`
  (repository-specific implementations)
- **Repository rules:** Documented in `CONTRIBUTING.md` (this file),
  `AGENTS.md`, and `CLAUDE.md`
- **Specification process:** Uses SpecKit in `.github/specs/{NNN-feature-slug}/`
  for feature documentation
- **Workflow automation:** 17 GitHub Actions workflows enforce governance
  automatically

## Key governance decisions

| Decision | Status | Documentation |
|----------|--------|---|
| Branch naming pattern `{type}/{scope}-{title}` | ✅ Enforced | Section 1: Branch naming above |
| PR template routing by branch type | 🟡 Unverified | Section 3: Pull requests above (T035 in progress) |
| Protected files require approval | ✅ Enforced | Protected files workflow above |
| npm-only package manager | ✅ Enforced | Prerequisites section above |
| Node.js 24 LTS pinned | ✅ Enforced | Prerequisites section above |
| BEM-only CSS (no Tailwind utilities) | ✅ Enforced | Coding conventions section above |
| Spec Kit for feature work | ✅ Recommended | Section: Using Spec Kit above |

## Unresolved decisions (owner confirmation required)

The full list, with evidence, is in [AGENTS.md § Unresolved
decisions](AGENTS.md#unresolved-decisions-owner-confirmation-required). In
summary:

1. **Netlify config:** `src/app/netlify.toml` is inactive. Decide whether to
   move it, delete it or change the base directory.

1. **`import.meta.env`:** it is forbidden in the bundler table but recommended
   in Guidelines.md § 12, and still used in one component.

1. **Quality gates:** there are no test, lint or typecheck scripts, and the
   guidelines reference scripts that do not exist.

1. **Journal scripts:** they expect `journal-content/`, but content is in
   `content/journal/`.

1. **Duplicate attribution files:** a root `ATTRIBUTIONS.md` and a separate
   `docs/Attributions.md` exist. Clarify which is canonical and whether both are
   needed.

1. **PostCSS:** two config files exist. The root `postcss.config.mjs` is the
likely active one.
