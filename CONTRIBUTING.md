# Contributing to ThisOneTimeOnAcid

Thank you for your interest in contributing to the Ash Shaw makeup portfolio project.
This guide covers setup, validation and the contribution workflow. It is based on the repository's own files. Where the repository is inconsistent, the open questions are listed under [Unresolved decisions](#unresolved-decisions-owner-confirmation-required).

AI agents should also read [AGENTS.md](AGENTS.md).

## Prerequisites

- **[Node.js](https://nodejs.org/)**. The repository does not pin a version: there is no `.nvmrc`, `.node-version` or `engines` field. Use a current LTS release, and check the Netlify deploy log for the version production uses.
- **npm**, which ships with Node.js. `package-lock.json` is the only committed lockfile, and Netlify builds with `npm run build`.
- **[Git](https://git-scm.com/)**

> Do not use pnpm or Yarn to install dependencies, and do not commit another lockfile. Some pnpm configuration remains in the repository (`pnpm-workspace.yaml`, `pnpm.overrides` in `package.json` and `src/app/netlify.toml`), but npm is the manager currently in use. See [Unresolved decisions](#unresolved-decisions-owner-confirmation-required).

## Setup

```bash
# 1. Clone the repository
git clone https://github.com/lightspeedwp/ThisOneTimeOnAcidCom.git
cd ThisOneTimeOnAcidCom

# 2. Install dependencies exactly as locked
npm ci

# 3. Start the development server
npm run dev
```

The dev server runs on Vite. Open the URL shown in the terminal, which is usually `http://localhost:5173`. Vite's entry point is `index.html`, which loads `src/main.tsx`.

## Project structure

```
ThisOneTimeOnAcidCom/
├── guidelines/            ← Design and development guidelines (read first)
├── src/
│   ├── main.tsx           ← Vite entry point (loaded by index.html)
│   ├── app/               ← Application source
│   │   ├── components/    ← React components (pages, common, layout, sections, template-parts, ui, figma)
│   │   ├── data/          ← Centralised mock data (mock/, types/, README.md)
│   │   ├── hooks/         ← Custom React hooks
│   │   ├── lib/           ← router.tsx and bundler-safe helpers
│   │   ├── utils/         ← Services and utilities
│   │   ├── routes.ts      ← Route definitions
│   │   └── netlify.toml   ← NOT read by Netlify (see Deployment)
│   └── styles/            ← Global CSS and BEM blocks (globals.css, blocks/, tokens/ …)
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
├── .github/workflows/     ← Centrally managed dependency workflows (do not edit)
├── package.json           ← Scripts and dependencies
├── package-lock.json      ← npm lockfile
└── vite.config.ts         ← Vite configuration
```

The guidelines use root-style paths such as `/components/` and `/styles/`. These map to `src/app/components/` and `src/styles/`. The full mapping is in [AGENTS.md § Path convention](AGENTS.md#path-convention-used-in-the-guidelines).

### Source vs generated output

- **Source** is everything committed to the repository: `src/`, `guidelines/`, `scripts/`, `public/` and the configuration files.
- **Generated output** is the `dist/` directory, which `npm run build` produces and Netlify publishes. It is git-ignored, is not configuration, and must not be edited by hand.

### Deployment

The Netlify site settings, checked on 3 October 2026, are:

- Base directory: repository root
- Build command: `npm run build`
- Publish directory: `dist`

Netlify only reads a `netlify.toml` in the base directory, and there is none at the root. As a result, `src/app/netlify.toml` is **not** applied: its pnpm command, Node 18 setting, headers and redirects have no effect. Do not change deployment settings in a contribution unless the owner has asked for it.

## Available scripts

These scripts are defined in [`package.json`](package.json):

| Command | Purpose |
|---|---|
| `npm run dev` | Start the Vite development server |
| `npm run build` | Production build to `dist/` |
| `npm run journal:parse` | Parse journal markdown into JSON |
| `npm run journal:validate` | Validate journal markdown (no output written) |
| `npm run journal:check-links` | Check journal link integrity |

There are **no** `test`, `lint`, `typecheck`, `type-check` or `verify` scripts. Older guidance mentions `npm run type-check` and `npm run verify`, but these do not exist.

## Validation

Before opening a pull request, run the checks that apply to your change and **report exactly what you ran and what happened**:

```bash
# Primary check: the production build must succeed
npm run build
```

If you change journal content, also run:

```bash
npm run journal:validate
npm run journal:check-links
```

> **Known issue:** as of commit `76b1528`, both journal scripts fail with `journal-content/ directory not found`, because journal content lives in `content/journal/`. Mention this in your PR rather than hiding it.

If you change Spec Kit scripts, run the Node test runner directly:

```bash
node --test tests/speckit.test.mjs
```

> **Known issue:** as of commit `76b1528`, this suite reports 93 passing and 11 failing tests (104 in total), all in the "template resolution" suite.
> `tests/accordion.test.tsx` needs `jsdom`, which is not installed, so it cannot currently run.

No automated linting, type-checking, browser or accessibility checks are configured. Manual review against the guidelines is the current quality gate. Do not describe these checks as passed unless you actually performed them.

## Coding conventions

All conventions are documented in **[guidelines/Guidelines.md](guidelines/Guidelines.md)**. Follow the reading order in [guidelines/README.md](guidelines/README.md). The key rules are:

### Styling: semantic BEM

The guidelines require **semantic BEM CSS** and forbid Tailwind utility classes, inline styles and CSS-in-JS in components:

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
```

CSS lives in `src/styles/`, with one file per block in `src/styles/blocks/`. See [guidelines/css-architecture.md](guidelines/css-architecture.md).

> Tailwind CSS v4 remains installed and is loaded by `vite.config.ts` and several stylesheets. Do not remove that tooling as part of an unrelated change. This contradiction is listed under [Unresolved decisions](#unresolved-decisions-owner-confirmation-required).

### Data: no hardcoded content

All text, images and configuration must be imported from the mock data system (`src/app/data/mock/`, imported via the `@/data/mock` alias):

```tsx
// ✅ Correct
import { heroContent } from "@/data/mock";
<h1 className="hero__title">{heroContent.title}</h1>

// ❌ Wrong
<h1 className="hero__title">Welcome to my Portfolio</h1>
```

See [src/app/data/README.md](src/app/data/README.md).

### Headings: sentence case

All headings, titles, navigation labels and button text use **sentence case**: capitalise only the first word and proper nouns.

### Bundler workarounds

The Figma Make bundler has known syntax limitations. See the full table in [Guidelines.md § Bundler Compatibility Rules](guidelines/Guidelines.md). Avoid optional chaining (`?.`), nullish coalescing (`??`), `import.meta.env`, `for...of` loops and nested ternaries. Use the helpers in `src/app/lib/router.tsx`.

### Images

Never replace existing images. Use `ImageWithFallback` (`src/app/components/figma/ImageWithFallback.tsx`, a protected file) for new images. All `figma:asset/` imports are protected.

## File placement rules

| Content type | Location |
|---|---|
| Design and development guidelines | `guidelines/` |
| AI prompt files | `prompts/` |
| Audit reports and analysis | `reports/{topic}/` |
| Task lists and checklists | `tasks/` |
| General documentation | `docs/` |
| Build and utility scripts | `scripts/` |

[Guidelines.md](guidelines/Guidelines.md) allows only `README.md`, `CHANGELOG.md` and `Attributions.md` as `.md` files in the root. `AGENTS.md` and `CONTRIBUTING.md` are at the root for agent and GitHub discoverability, but the owner has not yet confirmed this exception.

## Contribution workflow

### 1. Branch naming

The repository does not document a branch-prefix list. Issue #2 asks for the `docs/` prefix for documentation work, for example `docs/repository-agent-contributor-guidance`. Until the owner confirms the full convention, choose a prefix that describes the change and matches the linked issue. Branches starting with `dependabot/`, `deps/` or `renovate/` are reserved for dependency automation.

### 2. Making changes

1. Create a branch from an up-to-date `main`.
2. Read the relevant guidelines **before** coding.
3. Make your changes following the conventions above.
4. Run the applicable checks from [Validation](#validation) and note the results.

### 3. Pull requests

- Write a clear description explaining what changed and why.
- List the validation commands you ran and their results, including failures.
- Link related issues. Use "Related to #N" when acceptance criteria are still outstanding, and use a closing keyword only when the PR fully resolves the issue.
- The repository has no pull request template. If organisation-level templates apply, use the one that matches the change type.

### 4. Changelog

The changelog is the root [CHANGELOG.md](CHANGELOG.md). It is a protected file: never delete, move or rename it. Entries follow [Keep a Changelog v1.1.0](https://keepachangelog.com/en/1.1.0/) under `## [Unreleased]`. See [guidelines/changelog.md](guidelines/changelog.md) for the full rules. Prepare an entry for user-facing changes. Issues labelled `meta:no-changelog` do not need one.

### 5. After merge

- Delete the branch.
- Close linked issues only once their acceptance criteria are met.
- Update related epics rather than closing them.

## Getting help

- **Guidelines questions:** start with [guidelines/README.md](guidelines/README.md)
- **Architecture questions:** see [guidelines/ARCHITECTURE.md](guidelines/ARCHITECTURE.md)
- **Component usage:** check the specific file in [guidelines/components/](guidelines/components/)
- **Issue tracking:** [GitHub Issues](https://github.com/lightspeedwp/ThisOneTimeOnAcidCom/issues)

## Unresolved decisions (owner confirmation required)

The full list, with evidence, is in [AGENTS.md § Unresolved decisions](AGENTS.md#unresolved-decisions-owner-confirmation-required). In summary:

1. **Package manager:** confirm npm and decide what to do with the pnpm remnants.
2. **Node.js version:** none is pinned. Confirm the intended runtime.
3. **Netlify config:** `src/app/netlify.toml` is inactive. Decide whether to move it, delete it or change the base directory. Also confirm whether the SPA fallback in `public/_redirects/` (a directory, not a file) works.
4. **BEM vs Tailwind:** the guidelines forbid Tailwind, but it is installed and loaded.
5. **`import.meta.env`:** it is forbidden in the bundler table but recommended in Guidelines.md § 12, and still used in one component.
6. **Quality gates:** there are no test, lint or typecheck scripts, and the guidelines reference scripts that do not exist.
7. **Journal scripts:** they expect `journal-content/`, but content is in `content/journal/`.
8. **Root guidance placement:** confirm the root exception for `AGENTS.md` and `CONTRIBUTING.md`, and the `ATTRIBUTIONS.md` vs `Attributions.md` naming.
9. **PostCSS:** two config files exist. The root `postcss.config.mjs` is the likely active one.
10. **Branch and PR conventions:** no template or prefix list is committed.
