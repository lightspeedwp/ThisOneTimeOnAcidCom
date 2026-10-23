# Agent instructions — ThisOneTimeOnAcid

> Repository-specific instructions for AI coding agents working on
>
[lightspeedwp/ThisOneTimeOnAcidCom](https://github.com/lightspeedwp/ThisOneTimeOnAcidCom).
> Human contributors should also read [CONTRIBUTING.md](CONTRIBUTING.md).

Every statement in this file is meant to be checkable against the repository.
Where the repository contradicts itself, the contradiction is recorded under
[Unresolved decisions](#unresolved-decisions-owner-confirmation-required) rather
than settled here.

> **Note:** This file was updated 16 October 2026 to reflect current test
> infrastructure and validated command baseline. Previous version (from
> 3 October 2026) claimed testing infrastructure did not exist; it does. See
> [Commands validated so far](#commands-validated-so-far) for current status.

## Sources of truth

All authoritative design and development guidance lives in
[`guidelines/`](guidelines/). Agents must read it before making changes. These
files define their own reading order, so follow that rather than inventing one:

1. **[guidelines/README.md](guidelines/README.md)** — directory index and the
   **required reading order** (Steps 1–7).

1. **[guidelines/Guidelines.md](guidelines/Guidelines.md)** — Step 1 of that
   order: critical rules, bundler workarounds, folder conventions and the
   default AI workflow.

1. **[guidelines/ARCHITECTURE.md](guidelines/ARCHITECTURE.md)** — component
   taxonomy and file-location mapping.

1. **[guidelines/css-architecture.md](guidelines/css-architecture.md)** — BEM
   CSS rules. See the [Tailwind
   contradiction](#unresolved-decisions-owner-confirmation-required) below.

1. **[guidelines/changelog.md](guidelines/changelog.md)** — changelog format and
   protection rules.

### Design tokens and theme

- **[guidelines/design-tokens/](guidelines/design-tokens/)** — colours,
  typography, spacing and animations
- **[guidelines/dark-mode-implementation.md](guidelines/dark-mode-implementation.md)**
  — light/dark theme system
- **[guidelines/component-dark-mode.md](guidelines/component-dark-mode.md)** —
  per-component theme patterns

### Data system

- **[src/app/data/README.md](src/app/data/README.md)** — centralised mock data.
  All UI content must come from `src/app/data/mock/` (written as `/data/mock` in
  the guidelines), never hardcoded. Editorial content (journal entries,
  articles, manuscript chapters) resides in `content/`.

### Spec Kit (spec-driven development)

- **[.specify/](.specify/)** — Spec Kit templates, scripts and workflows
- **[.gemini/commands/](.gemini/commands/)** — Gemini CLI Spec Kit commands (`.toml` files)
- **[.agents/skills/](.agents/skills/)** — Codex Spec Kit skills (`$speckit-specify`)
- **[.claude/skills/](.claude/skills/)** — Claude Code Spec Kit skills (`/speckit-specify`)
- **[.codex/README.md](.codex/README.md)** — configuration and integration maintenance

**Spec location:** Create all feature specifications, plans, tasks and related
artefacts under `.github/specs/<NNN-short-name>/`, never a root `specs/` folder.
Read `.specify/init-options.json` → `specifyFeatureDirectory` as the repository's
spec root (`.github/specs`). Scan that directory for existing feature numbers;
`001` and `002` already exist, so the next sequential feature is `003`. Reuse
the appropriate existing directory when continuing a feature. Persist the full
feature directory in `.specify/feature.json` so downstream commands resolve the
same location. Root `specs/` defaults in upstream documentation do not override
this repository rule. Spec directory numbering never determines the Git branch.

### Shared skills and agent roles

Custom skills live in [.agents/skills/](.agents/skills/). Shared agent role
instructions live in [.agents/roles/](.agents/roles/); native definitions in
`.claude/agents/`, `.gemini/agents/` and `.codex/agents/` load them before acting.
Claude's custom skill directories link to the shared source. Keep Spec Kit's
generated skills and manifests in their installer-managed locations.
See [.agents/README.md](.agents/README.md) for discovery and maintenance.

### Branch check before every task

Before editing files or running a workflow that writes files:

1. Inspect `git status --short` and `git branch --show-current`.
2. Read [.agents/skills/branch-validation/SKILL.md](.agents/skills/branch-validation/SKILL.md)
   and [.agents/roles/branches-agent.md](.agents/roles/branches-agent.md).
   Codex can invoke this skill explicitly with `$branch-validation`.
3. Use a task branch whose exact name Ash supplied or approved. If none was
   supplied, propose a meaningful `{type}/{scope}-{title}` name and obtain
   approval before creating or switching branches. Do not default to `codex/`
   or generate an agent/session branch name. An existing valid name alone does
   not authorise putting unrelated work on that branch.
4. Validate the proposed name with
   `npm run validate:branch-name -- --branch <approved-name>` before creation,
   then run `npm run validate:branch-name` on the checked-out branch before
   edits. Stop on failure. Do not edit on `main`, `develop` or detached HEAD.
5. Preserve uncommitted work when switching. Never stash, discard, rename or
   delete branches without authorisation. Use the branch agent's base-branch
   policy (`develop` for normal work, `main` for hotfixes).

The deterministic authority is `scripts/validate-branch-name.js`. The existing
Lefthook pre-commit and pre-push checks provide local enforcement; ensure hooks
are installed with `npm exec -- lefthook install` after dependency installation.
Never bypass them using `--no-verify` or `LEFTHOOK=0` to get an invalid name through.

These rules also apply to Spec Kit. Numbered `specs/NNN-name` directories and
`BRANCH_NAME` output from `create-new-feature.sh` identify features; they are not
permission to create a Git branch. Keep spec numbering independent of the
approved Git branch. Do not install or invoke a branch-creating extension as a
way around this check.

### Path convention used in the guidelines

The guidelines were written for Figma Make and use root-style paths. In this
repository they map as follows:

| Path in guidelines | Actual repository path |
|---|---|
| `/components/…` | `src/app/components/…` |
| `/data/mock/…` | `src/app/data/mock/…` |
| `/lib/router.tsx` | `src/app/lib/router.tsx` |
| `/utils/…` (including `/utils/supabase/`) | `src/app/utils/…` |
| `/styles/…` (including `/styles/blocks/`) | `src/styles/…` |
| `/CHANGELOG.md` | `CHANGELOG.md` (repository root) |

---

## Tech stack (from `package.json`)

| Layer | Technology | Evidence |
|---|---|---|
| Framework | React 18.3.1 (peer dependency) + Vite 6 | `package.json`, `vite.config.ts` |
| Language | TypeScript | `typescript` dev dependency, `src/app/tsconfig.json` |
| Runtime | Node.js 24 LTS target | `.nvmrc`, `engines.node` in `package.json`, `src/app/netlify.toml` |
| Styling | Semantic BEM CSS (Tailwind removed) | `src/styles/` (BEM blocks, components, effects, patterns, tokens), `postcss.config.mjs` empty, `guidelines/css-architecture.md` |
| UI primitives | Radix UI, shadcn/ui patterns, MUI | `package.json` |
| Icons | Phosphor, Lucide | `package.json` |
| Animation | Motion | `package.json` |
| Routing | React Router v7 | `package.json` |
| Data | Static mock data — no backend, no Supabase | `src/app/data/` |
| Hosting | Netlify (static SPA) | Netlify site build settings |
| Package manager | **npm** (npm-only) | `package-lock.json`, no pnpm/yarn lockfiles, Netlify build command |

### Package manager

## npm is the only package manager for this repository

- `package-lock.json` (lockfile v3) is the only lockfile committed. There is no
  `pnpm-lock.yaml` or `yarn.lock`.
- The Netlify site's build command is `npm run build` (updated in
  `src/app/netlify.toml` on 18 Oct 2026).
- The root [README.md](README.md) tells contributors to run `npm ci` and `npm
  run dev`.
- The dependency-validation workflow pairs `package.json` with
  `package-lock.json`.

All pnpm artefacts have been removed (18 October 2026):

- ✅ Deleted `pnpm-workspace.yaml`
- ✅ Deleted `pnpm-lock.yaml` (replaced by `package-lock.json`)
- ✅ Removed `pnpm.overrides` block from `package.json`
- ✅ Updated `src/app/netlify.toml` to use `npm run build` and Node 24, npm 11

Do not add a second lockfile or switch managers without owner confirmation.

### Node.js runtime

**Node.js 24 LTS is the intended runtime** (18 October 2026, T012 — Phase 2
Foundational):

- ✅ `.nvmrc` contains `24`; contributors using nvm select it with `nvm use`
- ✅ `package.json` has `engines.node` field: `">=24"`
- ✅ `src/app/netlify.toml` sets `NODE*VERSION = "24"` and `NPM*VERSION = "11"`
- ✅ README.md documents the Node.js 24 requirement

The `.nvmrc` file is an opt-in selector; it does not enforce the runtime.
`engines.node: ">=24"` allows Node.js 24 and later major versions. npm normally
warns on an incompatible version rather than rejecting installation unless
`engine-strict` is enabled. The Netlify version setting applies when that
configuration file is active (see [Deployment](#deployment-netlify)).

---

## Available scripts

These scripts are **defined** in [`package.json`](package.json) and have been
validated.

| Script | Command | Purpose | Status |
|---|---|---|---|
| `dev` | `vite` | Start the Vite development server | ✅ Working |
| `build` | `vite build` | Production build to `dist/` | ✅ Working |
| `journal:parse` | `tsx scripts/parse-journal-markdown.ts` | Parse journal markdown into JSON | ✅ Working |
| `journal:validate` | `tsx scripts/parse-journal-markdown.ts --validate-only` | Validate journal markdown without writing output | ✅ Working |
| `journal:check-links` | `tsx scripts/check-journal-links.ts` | Check journal link integrity | ✅ Working |
| `test` | `npm run test:unit && npm run test:build && npm run test:e2e` | Run all test suites (unit, build, e2e) | ⚠️ Partial |
| `test:unit` | `jest` | Jest unit tests | ✅ Working |
| `test:unit:watch` | `jest --watch` | Jest in watch mode | ✅ Working |
| `test:unit:coverage` | `jest --coverage` | Jest with coverage report | ✅ Working |
| `test:build` | `npm run build && bats tests/build.bats` | Build verification with Bats | ✅ Working |
| `test:e2e` | `playwright test` | Playwright end-to-end tests | ⚠️ Browser install needed |
| `test:e2e:debug` | `playwright test --debug` | Playwright in debug mode | ⚠️ Browser install needed |
| `test:e2e:ui` | `playwright test --ui` | Playwright UI mode | ⚠️ Browser install needed |
| `validate:branch-name` | `node scripts/validate-branch-name.js` | Validate branch naming convention | ✅ Working |

Run them with npm, for example `npm run build`.

## Commands validated so far

**Baseline validation run on 18 October 2026, commit
build/repo-governance-continue-spec-001, Node 22.22.0, npm 10.9.4.** Jest ESM
configuration validated; Vitest fallback added; pnpm cleaned; Node.js 24 pinning
complete.

### Test Infrastructure Baseline

| Test Runner | Framework | Status | Baseline | Config |
|---|---|---|---|---|
| Jest | @swc/jest | ✅ Working | 588 tests passing (11 suites) | `jest.config.js` with ESM via @swc/core |
| Vitest | `vitest` | ✅ Installed | Fallback runner; no UI package declared | `vitest.config.ts` with matching Jest discovery patterns |
| Speckit | node --test | ⚠️ 103/104 | 103 pass, 1 fail (acceptance) | Regression test suite for spec creation → plan → tasks pipeline |
| Bats | shell tests | ✅ Working | Build verification | `tests/build.bats` validates Vite build output |
| Playwright | e2e tests | ⚠️ Requires setup | Command structure valid | Browser not installed in CI agent env |

### Commands Validation

| Command | Result | Notes |
|---|---|---|
| `npm ls --depth=0` | ✅ Passed | No missing packages; vitest added |
| `npm run build` | ✅ Passed | Production build succeeds |
| `npm run validate:branch-name -- --branch build/repo-governance-continue-spec-001` | ✅ Passed | Branch validation working |
| `npm run test:build` | ✅ Passed | Bats build tests pass |
| `node --test tests/speckit.test.mjs` | ✅ 103/104 | Accepted baseline (1 known failure: template precedence) |
| `npm run test:unit` | ✅ 588 tests | Jest ESM (@swc/jest) working; all test suites pass |
| `npm run test:e2e` | ⚠️ Requires setup | Playwright structure valid; browser not in agent env |
| `npm run journal:validate` | ✅ Passed | Content validation working |
| `npm run journal:check-links` | ✅ Passed | Link integrity checking working |
| `npm run journal:parse` | ✅ Passed | Markdown parsing and export working |

### Cleanup and Verification Completed

#### Phase 2 Foundational Tasks (T008-T015, completed 18 October 2026)

- ✅ **T008**: Jest ESM configuration verified (588 tests passing)
- ✅ **T009**: Vitest fallback installed (`vitest@1.6.1` added to
  devDependencies)
- ✅ **T010**: Test baseline documented above (this section)
- ✅ **T011**: pnpm artefacts removed (workspace.yaml, lock.yaml, pnpm.overrides
  block, netlify.toml command)
- ✅ **T012**: Node.js 24 pinning complete (.nvmrc, engines field, README,
  netlify.toml updated)
- ✅ **T013-T015**: Tailwind removed completely
- No tailwindcss or @tailwindcss packages in dependencies
- No Tailwind config files (tailwind.config.*, .postcssrc)
- postcss.config.mjs is empty (no Tailwind plugins)
- BEM CSS fully in place: `src/styles/` (blocks, components, effects, patterns,
  tokens)
- Guidelines document BEM-only requirement (`guidelines/css-architecture.md`)

#### Phase 4 Testing Infrastructure Tasks (T025-T030, completed 19 October 2026)

- ✅ **T025**: Jest ESM configuration verified and locked (11 suites, 588/588
  tests pass with @swc/core)
- ✅ **T026**: Bats build verification confirmed (12/12 tests pass; validates
  output integrity)
- ✅ **T027**: Playwright e2e configured (structure valid; requires browser
  install for execution)
- ✅ **T028**: Comprehensive testing guide created (`docs/TESTING.md`; covers all
  suites, troubleshooting, CI/CD)
- ✅ **T029**: PR labeling workflow active (fetches canonical labeler.yml from
  lightspeedwp/.github; applies labels by branch type)
- ✅ **T030**: Test command status updated (above tables in this section)

**When you change code, report which of these you actually ran. Never claim
validation you did not perform.**

---

## Critical safeguards

### Bundler compatibility (Figma Make)

The Figma Make bundler cannot parse some modern JS/TS syntax. Follow the full
table in [Guidelines.md § Bundler Compatibility
Rules](guidelines/Guidelines.md). The key forbidden patterns are:

- Optional chaining (`?.`) — use explicit null checks
- Nullish coalescing (`??`) — use if/else
- `import.meta.env` — do not use it (see the
  [contradiction](#unresolved-decisions-owner-confirmation-required) below)
- Nested ternaries — convert to if/else
- `for...of` loops — use classic `for` loops

Use the helpers in `src/app/lib/router.tsx`: `grab()`, `arrayGet()` and
`setProp()`.

### Image protection

**Never replace existing images.** All `figma:asset/` imports, logo files and
image references are protected. For new images, use `ImageWithFallback` from
`src/app/components/figma/ImageWithFallback.tsx`. That file is protected, so do
not modify it.

### Supabase is not used

`src/app/utils/supabase/` is a system-protected deployment artefact. Never
import from it, never suggest Supabase integration, and always dismiss the
`supabase_connect` tool if it is offered.

### Content rules

- **No hardcoded UI content** — all UI strings, page metadata and component
  assets come from `src/app/data/mock/`; editorial manuscript chapters, journal
  entries and articles reside in `content/`
- **Sentence case** for all headings, titles, labels and navigation
- **Pronouns:** Ash uses he/him exclusively
- **Voice:** follow [guidelines/voice-and-tone.md](guidelines/voice-and-tone.md)

### Protected and locked files

Do not modify these without explicit owner instruction:

- `CHANGELOG.md` — never delete, move or rename it (see
  [guidelines/changelog.md](guidelines/changelog.md))
- `ATTRIBUTIONS.md`
- `src/app/components/figma/ImageWithFallback.tsx`
- `src/app/utils/supabase/`
- `.github/workflows/*` — centrally managed by
  `lightspeedwp/dependency-merge-controller`, and local edits are reverted
- `tasks/task-list.md` — never delete it

---

## Folder conventions

From [Guidelines.md § Mandatory Folder Conventions](guidelines/Guidelines.md):

| Folder | Purpose | Rules |
|---|---|---|
| [`guidelines/`](guidelines/) | Design and development guidance | Source of truth — read before coding |
| [`prompts/`](prompts/) | AI prompt files | Reusable templates; orchestrators in subfolders |
| [`reports/`](reports/) | Audit reports and analysis | One subfolder per audit (`reports/{topic}/`) |
| [`tasks/`](tasks/) | Task lists and checklists | `task-list.md` is the master list (never delete) |
| [`docs/`](docs/) | General documentation | Catch-all for docs not covered above |
| [`scripts/`](scripts/) | Build and utility scripts | `.ts`, `.sh`, `.js` only |
| [`src/app/`](src/app/) | Application source | Components, data, routing, utilities |
| [`src/styles/`](src/styles/) | Global and BEM block CSS | One file per block in `src/styles/blocks/` |

## Default workflow

When asked to audit, review or write a prompt, follow the four-step workflow in
[Guidelines.md § Default AI Workflow](guidelines/Guidelines.md):

1. Create a prompt in `prompts/`

1. Run the audit described in the prompt

1. Save findings to `reports/{topic}/`

1. Extract actionable tasks to `tasks/`

---

## Deployment (Netlify)

These settings were read from the Netlify site configuration on 3 October 2026:

| Setting | Value |
|---|---|
| Repository / branch | `lightspeedwp/ThisOneTimeOnAcidCom` / `main` |
| Base directory | *(empty — repository root)* |
| Build command | `npm run build` |
| Publish directory | `dist` |

Netlify reads `netlify.toml` according to this order: package directory (if set
in the UI) → base directory → repository root. The base directory is the
repository root, and there is **no root `netlify.toml`**. Confirm whether the
package-directory UI setting is configured. If the package directory is set to
`src/app/`, then **`src/app/netlify.toml` may be active**. If not, then
`src/app/netlify.toml` is not read. The active build command and publish
directory come from the Netlify site's UI settings. Do not assume configuration
inactivity without verifying the package-directory setting in Netlify's
dashboard.

The SPA fallback rule is in `public/*redirects/main.tsx`. Because `*redirects`
is a directory rather than a plain file, Netlify may not pick that rule up. This
is recorded for the owner and has not been changed.

Do not edit deployment settings, environment variables or Netlify configuration
as part of documentation work.

## Source vs generated output

- **Source** is everything committed in the repository: `src/`, `guidelines/`,
  `scripts/`, `public/` and the root configuration files. Agents edit source.
- **Generated output** is `dist/`. It is the Vite build output that Netlify
  publishes, and it is ignored by `.gitignore`. Never treat it as configuration,
  and never edit it by hand. `.netlify/` is also ignored local state.

---

## Unresolved decisions (owner confirmation required)

These items come from repository evidence. They are recorded here, not resolved:

1. **Package manager.** npm is in use (lockfile, Netlify command, README), but
   `pnpm.overrides` in `package.json` still refers to pnpm. Confirm npm and
   decide whether to remove this remnant. (Governance Decision PKG-001 pending
   approval)

1. **Node.js version.** Node 24 LTS selected via opt-in `.nvmrc`; `package.json`
   `engines.node: ">=24"` permits later majors and is advisory by default
   (Governance Decision NODE-001: Option B, implemented 2026-10-17).

1. **Netlify configuration file.** `src/app/netlify.toml` is not read because
   the base directory is the repository root. Decide whether to move it to the
   root, set the base directory, or delete it, and whether its headers and
   redirect are still wanted.

1. **BEM vs Tailwind.** All site styling now uses semantic BEM classes
   exclusively. Tailwind CSS and related dependencies have been completely
   removed (Governance Decision STYLE-001: Enforce BEM-only, implemented
   2026-10-17). Guidelines.md § 2 should be updated to remove references to
   "Tailwind CSS V4".

1. **`import.meta.env`.** The bundler table in Guidelines.md says it is
   "Completely removed", but Guidelines.md § 12 (Console Logging Policy)
   recommends `if (import.meta.env.DEV)`, and
   `src/app/components/common/ThemeToggleES5.tsx` still uses it. Until this is
   resolved, follow the bundler table and do not use `import.meta.env`.

1. **Jest ESM and testing infrastructure.** Jest unit tests now working with
@swc/jest transformer (Governance Decision TEST-001: Option B, implemented
2026-10-17). Scripts `/scripts/**/*.test.js` pass 179 tests. Guidelines.md § 9
still cites missing `npm run type-check` and `npm run verify` scripts, which do
not exist. E2E tests in `tests/` need Playwright browser installation.

1. **Duplicate attribution files.** A root `ATTRIBUTIONS.md` and a separate
`docs/Attributions.md` exist. The root-file exception in Guidelines.md permits
`AGENTS.md` and `CONTRIBUTING.md` for agent and GitHub discoverability; this
exception is already acknowledged. Clarify whether only one attribution file
should exist and which name is canonical.

1. **Changelog location.** [guidelines/changelog.md](guidelines/changelog.md)
puts the changelog at the root `CHANGELOG.md`, and that is the only changelog in
the repository. There is no `src/app/CHANGELOG.md`. Confirm whether
documentation-only changes need an entry (issue #2 carries the
`meta:no-changelog` label).

1. **Broken links in the guidelines.** `guidelines/README.md` and
`guidelines/Guidelines.md` link to `../data/README.md`, which does not exist.
The actual file is `src/app/data/README.md`. The guidelines were not changed
here.

1. **PostCSS configuration.** Vite discovers PostCSS configuration from the
project root, so the root `postcss.config.mjs` (an empty config) is the likely
active file. `src/app/postcss.config.js` references `autoprefixer`, which is not
a dependency. Confirm, and decide whether to remove one of them.

1. **Branch and PR conventions.** Branch naming is documented in the branch
validation skill and branches agent and checked by
`scripts/validate-branch-name.js`; follow the pre-task check above. PR templates
and organisation policy remain subject to the live contribution guidance.
