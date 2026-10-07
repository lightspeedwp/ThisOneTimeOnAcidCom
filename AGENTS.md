# Agent instructions — ThisOneTimeOnAcid

> Repository-specific instructions for AI coding agents working on
> [lightspeedwp/ThisOneTimeOnAcidCom](https://github.com/lightspeedwp/ThisOneTimeOnAcidCom).
> Human contributors should also read [CONTRIBUTING.md](CONTRIBUTING.md).

Every statement in this file is meant to be checkable against the repository. Where the repository contradicts itself, the contradiction is recorded under [Unresolved decisions](#unresolved-decisions-owner-confirmation-required) rather than settled here.

## Sources of truth

All authoritative design and development guidance lives in [`guidelines/`](guidelines/). Agents must read it before making changes. These files define their own reading order, so follow that rather than inventing one:

1. **[guidelines/README.md](guidelines/README.md)** — directory index and the **required reading order** (Steps 1–7).
2. **[guidelines/Guidelines.md](guidelines/Guidelines.md)** — Step 1 of that order: critical rules, bundler workarounds, folder conventions and the default AI workflow.
3. **[guidelines/ARCHITECTURE.md](guidelines/ARCHITECTURE.md)** — component taxonomy and file-location mapping.
4. **[guidelines/css-architecture.md](guidelines/css-architecture.md)** — BEM CSS rules. See the [Tailwind contradiction](#unresolved-decisions-owner-confirmation-required) below.
5. **[guidelines/changelog.md](guidelines/changelog.md)** — changelog format and protection rules.

### Design tokens and theme

- **[guidelines/design-tokens/](guidelines/design-tokens/)** — colours, typography, spacing and animations
- **[guidelines/dark-mode-implementation.md](guidelines/dark-mode-implementation.md)** — light/dark theme system
- **[guidelines/component-dark-mode.md](guidelines/component-dark-mode.md)** — per-component theme patterns

### Data system

- **[src/app/data/README.md](src/app/data/README.md)** — centralised mock data. All content must come from `src/app/data/mock/` (written as `/data/mock` in the guidelines), never hardcoded.

### Spec Kit (spec-driven development)

- **[.specify/](.specify/)** — Spec Kit templates, scripts and workflows
- **[.gemini/commands/](.gemini/commands/)** — Gemini CLI Spec Kit commands (`.toml` files)

### Path convention used in the guidelines

The guidelines were written for Figma Make and use root-style paths. In this repository they map as follows:

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
| Styling | Semantic BEM CSS per the guidelines; Tailwind CSS v4 is still installed and loaded | `src/styles/`, `vite.config.ts` |
| UI primitives | Radix UI, shadcn/ui patterns, MUI | `package.json` |
| Icons | Phosphor, Lucide | `package.json` |
| Animation | Motion | `package.json` |
| Routing | React Router v7 | `package.json` |
| Data | Static mock data — no backend, no Supabase | `src/app/data/` |
| Hosting | Netlify (static SPA) | Netlify site build settings |
| Package manager | **npm** (see below) | `package-lock.json`, Netlify build command |

### Package manager

The current evidence points to **npm**:

- `package-lock.json` (lockfile v3) is the only lockfile committed. There is no `pnpm-lock.yaml` or `yarn.lock`.
- The Netlify site's build command is `npm run build`.
- The root [README.md](README.md) tells contributors to run `npm i` and `npm run dev`.
- The dependency-validation workflow pairs `package.json` with `package-lock.json`.

Some leftover pnpm configuration remains: `pnpm-workspace.yaml`, a `pnpm.overrides` block in `package.json` (pinning `vite` to 6.3.5) and `command = "pnpm run build"` in `src/app/netlify.toml`. npm ignores `pnpm.overrides`, and `package-lock.json` resolves `vite` to 6.4.3. Do not add a second lockfile or switch managers without owner confirmation.

### Node.js runtime

The repository does **not** pin a Node.js version. There is no `.nvmrc`, no `.node-version` and no `engines` field. `src/app/netlify.toml` sets `NODE_VERSION = "18"`, but Netlify does not read that file (see [Deployment](#deployment-netlify)). This file therefore makes no claim about a minimum Node version. Check a production deploy log to see which version Netlify actually uses.

---

## Available scripts

These scripts are **defined** in [`package.json`](package.json). Being listed here does not mean they have been validated.

| Script | Command | Purpose |
|---|---|---|
| `dev` | `vite` | Start the Vite development server |
| `build` | `vite build` | Production build to `dist/` |
| `journal:parse` | `tsx scripts/parse-journal-markdown.ts` | Parse journal markdown into JSON |
| `journal:validate` | `tsx scripts/parse-journal-markdown.ts --validate-only` | Validate journal markdown without writing output |
| `journal:check-links` | `tsx scripts/check-journal-links.ts` | Check journal link integrity |

Run them with npm, for example `npm run build`.

`package.json` has **no** `test`, `lint`, `typecheck`, `type-check` or `verify` script. [Guidelines.md § 9](guidelines/Guidelines.md) refers to `npm run type-check` and `npm run verify`, but neither exists, so do not run or document them as available.

Test files exist in [`tests/`](tests/), but no package script runs them:

- `tests/speckit.test.mjs` uses Node's built-in test runner: `node --test tests/speckit.test.mjs`.
- `tests/accordion.test.tsx` says in its header that it needs `jsdom`. `jsdom` is not a dependency.

## Commands validated so far

These checks were run on 3 October 2026 against commit `76b1528` in the agent environment (Node 24.21.0, npm 11.19.0), using dependencies already installed from `package-lock.json`. That Node version belongs to the agent environment and is not necessarily the one Netlify uses.

| Command | Result |
|---|---|
| `npm ls --depth=0` | Passed — no missing or invalid top-level packages reported |
| `npm run journal:validate` | **Failed** (exit 2) — `journal-content/ directory not found`. Journal content is currently under `content/journal/`. |
| `npm run journal:check-links` | **Failed** — same missing `journal-content/` directory |
| `node --test tests/speckit.test.mjs` | **Failed** — 104 tests: 93 passed, 11 failed (all in the "template resolution" suite) |
| `npm run build` / `npm run dev` | Not run by the agent. Build output comes from Netlify's own deploy checks. |
| Type-checking, linting, browser and accessibility checks | Not performed. No scripts exist for these. |

When you change code, report which of these you actually ran. Never claim test, typecheck, browser or accessibility validation you did not perform.

---

## Critical safeguards

### Bundler compatibility (Figma Make)

The Figma Make bundler cannot parse some modern JS/TS syntax. Follow the full table in [Guidelines.md § Bundler Compatibility Rules](guidelines/Guidelines.md). The key forbidden patterns are:

- Optional chaining (`?.`) — use explicit null checks
- Nullish coalescing (`??`) — use if/else
- `import.meta.env` — do not use it (see the [contradiction](#unresolved-decisions-owner-confirmation-required) below)
- Nested ternaries — convert to if/else
- `for...of` loops — use classic `for` loops

Use the helpers in `src/app/lib/router.tsx`: `grab()`, `arrayGet()` and `setProp()`.

### Image protection

**Never replace existing images.** All `figma:asset/` imports, logo files and image references are protected. For new images, use `ImageWithFallback` from `src/app/components/figma/ImageWithFallback.tsx`. That file is protected, so do not modify it.

### Supabase is not used

`src/app/utils/supabase/` is a system-protected deployment artefact. Never import from it, never suggest Supabase integration, and always dismiss the `supabase_connect` tool if it is offered.

### Content rules

- **No hardcoded content** — all text and images come from `src/app/data/mock/`
- **Sentence case** for all headings, titles, labels and navigation
- **Pronouns:** Ash uses he/him exclusively
- **Voice:** follow [guidelines/voice-and-tone.md](guidelines/voice-and-tone.md)

### Protected and locked files

Do not modify these without explicit owner instruction:

- `CHANGELOG.md` — never delete, move or rename it (see [guidelines/changelog.md](guidelines/changelog.md))
- `ATTRIBUTIONS.md`
- `src/app/components/figma/ImageWithFallback.tsx`
- `src/app/utils/supabase/`
- `.github/workflows/*` — centrally managed by `lightspeedwp/dependency-merge-controller`, and local edits are reverted
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

When asked to audit, review or write a prompt, follow the four-step workflow in [Guidelines.md § Default AI Workflow](guidelines/Guidelines.md):

1. Create a prompt in `prompts/`
2. Run the audit described in the prompt
3. Save findings to `reports/{topic}/`
4. Extract actionable tasks to `tasks/`

---

## Deployment (Netlify)

These settings were read from the Netlify site configuration on 3 October 2026:

| Setting | Value |
|---|---|
| Repository / branch | `lightspeedwp/ThisOneTimeOnAcidCom` / `main` |
| Base directory | *(empty — repository root)* |
| Build command | `npm run build` |
| Publish directory | `dist` |

Netlify reads `netlify.toml` only from the base directory, which is the repository root, and there is **no root `netlify.toml`**. So **`src/app/netlify.toml` is not the active deployment configuration**. Its `pnpm run build` command, `NODE_VERSION = "18"`, security headers, cache headers and SPA redirect are not applied by Netlify. The active build command and publish directory come from the site's UI settings.

The SPA fallback rule is in `public/_redirects/main.tsx`. Because `_redirects` is a directory rather than a plain file, Netlify may not pick that rule up. This is recorded for the owner and has not been changed.

Do not edit deployment settings, environment variables or Netlify configuration as part of documentation work.

## Source vs generated output

- **Source** is everything committed in the repository: `src/`, `guidelines/`, `scripts/`, `public/` and the root configuration files. Agents edit source.
- **Generated output** is `dist/`. It is the Vite build output that Netlify publishes, and it is ignored by `.gitignore`. Never treat it as configuration, and never edit it by hand. `.netlify/` is also ignored local state.

---

## Unresolved decisions (owner confirmation required)

These items come from repository evidence. They are recorded here, not resolved:

1. **Package manager.** npm is in use (lockfile, Netlify command, README), but `pnpm-workspace.yaml`, `pnpm.overrides` and `src/app/netlify.toml` still refer to pnpm. Confirm npm and decide whether to remove the pnpm remnants.
2. **Node.js version.** No version is pinned. Confirm the intended runtime and whether to pin it (`.nvmrc`, `engines` or a Netlify setting).
3. **Netlify configuration file.** `src/app/netlify.toml` is not read because the base directory is the repository root. Decide whether to move it to the root, set the base directory, or delete it, and whether its headers and redirect are still wanted.
4. **`public/_redirects` is a directory** containing `main.tsx` instead of a plain `_redirects` file. Confirm whether the SPA fallback works in production.
5. **BEM vs Tailwind.** The guidelines forbid Tailwind and say the migration is complete. However, `tailwindcss` and `@tailwindcss/vite` are dependencies, `vite.config.ts` loads the Tailwind plugin (with a comment saying it is required by Figma Make), `src/styles/globals.css`, `index.css` and `tailwind.css` import `tailwindcss`, and Guidelines.md § 2 still lists "Tailwind CSS V4 – Utility-first styling". Some components still contain utility-like class names. Follow BEM for new work, and do not remove Tailwind tooling without a decision.
6. **`import.meta.env`.** The bundler table in Guidelines.md says it is "Completely removed", but Guidelines.md § 12 (Console Logging Policy) recommends `if (import.meta.env.DEV)`, and `src/app/components/common/ThemeToggleES5.tsx` still uses it. Until this is resolved, follow the bundler table and do not use `import.meta.env`.
7. **Missing quality scripts.** Guidelines.md § 9 cites `npm run type-check` and `npm run verify`, which do not exist. `tests/` has no runner script, and `tests/accordion.test.tsx` needs `jsdom`, which is not installed.
8. **Journal script paths.** The journal scripts expect `journal-content/`, but content lives in `content/journal/`. Both scripts currently fail.
9. **Root guidance placement.** Guidelines.md allows only `README.md`, `CHANGELOG.md` and `Attributions.md` in the root, yet the file at the root is `ATTRIBUTIONS.md` and a separate `docs/Attributions.md` also exists. `AGENTS.md` and `CONTRIBUTING.md` sit at the root for agent and GitHub discoverability. Confirm this exception, or move the files and update the links.
10. **Changelog location.** [guidelines/changelog.md](guidelines/changelog.md) puts the changelog at the root `CHANGELOG.md`, and that is the only changelog in the repository. There is no `src/app/CHANGELOG.md`. Confirm whether documentation-only changes need an entry (issue #2 carries the `meta:no-changelog` label).
11. **Broken links in the guidelines.** `guidelines/README.md` and `guidelines/Guidelines.md` link to `../data/README.md`, which does not exist. The actual file is `src/app/data/README.md`. The guidelines were not changed here.
12. **PostCSS configuration.** Vite discovers PostCSS configuration from the project root, so the root `postcss.config.mjs` (an empty config) is the likely active file. `src/app/postcss.config.js` references `autoprefixer`, which is not a dependency. Confirm, and decide whether to remove one of them.
13. **Branch and PR conventions.** The repository has no pull request template and no documented branch-prefix list. The `docs/` prefix comes from issue #2. Confirm the conventions, or point to organisation-level templates.
