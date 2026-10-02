# Contributing to ThisOneTimeOnAcid

Thank you for your interest in contributing to the Ash Shaw Makeup Portfolio project.
This guide covers setup, validation, and the contribution workflow derived from the existing repository conventions.

## Prerequisites

- **[Node.js](https://nodejs.org/)** (v18+)
- **[pnpm](https://pnpm.io/)** — the project uses pnpm as its package manager
- **[Git](https://git-scm.com/)**

## Setup

```bash
# 1. Clone the repository
git clone https://github.com/lightspeedwp/ThisOneTimeOnAcidCom.git
cd ThisOneTimeOnAcidCom

# 2. Install dependencies
pnpm install

# 3. Start the development server
pnpm dev
```

The dev server runs via Vite. Open the URL shown in the terminal (usually `http://localhost:5173`).

## Project Structure

```
ThisOneTimeOnAcidCom/
├── guidelines/          ← Design & development guidelines (read first)
├── src/
│   ├── app/             ← Application source (components, data, routing)
│   │   ├── components/  ← React components (pages, common, ui, sections)
│   │   ├── data/        ← Centralised mock data
│   │   ├── lib/         ← Utility functions and helpers
│   │   └── routes.ts    ← Route definitions
│   ├── content/         ← Content files
│   └── styles/          ← BEM CSS files (globals.css + blocks/)
├── scripts/             ← Build and utility scripts
├── prompts/             ← AI prompt templates
├── reports/             ← Audit reports
├── tasks/               ← Task lists and checklists
├── docs/                ← General documentation
├── .specify/            ← Spec Kit configuration
└── .gemini/             ← Gemini agent commands
```

### Source vs Generated Output

- **Source**: everything in the repository (`src/`, `guidelines/`, `scripts/`, config files)
- **Generated**: the `dist/` directory is the Vite production build output, deployed to Netlify — it is git-ignored and not part of source configuration

The `netlify.toml` at `src/app/netlify.toml` defines the deployment configuration (build command, publish directory, headers, redirects).

## Validation

Before submitting a pull request, verify your changes build successfully:

```bash
# Production build — this is the primary validation step
pnpm build
```

> **Note:** There is no test runner, linter, or type-checker currently configured in `package.json`.
> Manual review against the guidelines is the current quality gate.

### Journal Content Validation

If you've modified journal/blog content:

```bash
# Validate journal markdown structure
pnpm journal:validate

# Check journal link integrity
pnpm journal:check-links
```

## Coding Conventions

All conventions are documented in **[guidelines/Guidelines.md](guidelines/Guidelines.md)**.
Key rules summarised here:

### Styling: Strict BEM — No Tailwind

The project uses **Semantic BEM CSS** exclusively. Tailwind utility classes, inline styles, and CSS-in-JS are all forbidden.

```tsx
// ✅ Correct
<div className="card card--featured">
  <h2 className="card__title">Title</h2>
</div>

// ❌ Wrong — Tailwind utilities
<div className="flex items-center gap-4">
  <span className="text-gray-600">Text</span>
</div>

// ❌ Wrong — Inline styles
<div style={{ padding: '16px' }}>Content</div>
```

CSS files live in `/styles/` — one file per component in `/styles/blocks/`.

### Data: No Hardcoded Content

All text, images, and configuration must be imported from `/data/mock/`:

```tsx
// ✅ Correct
import { heroContent } from "@/data/mock";
<h1 className="hero__title">{heroContent.title}</h1>

// ❌ Wrong
<h1 className="hero__title">Welcome to my Portfolio</h1>
```

### Headings: Sentence Case

All headings, titles, navigation labels, and button text use **sentence case** — capitalise only the first word and proper nouns.

### Bundler Workarounds

The Figma Make bundler has known syntax limitations. See the full table in [Guidelines.md § Bundler Compatibility Rules](guidelines/Guidelines.md). Avoid optional chaining (`?.`), nullish coalescing (`??`), `for...of` loops, and nested ternaries.

### Images

Never replace existing images. Use `ImageWithFallback` for new images. All `figma:asset/` imports are protected.

## File Placement Rules

| Content Type | Location |
|---|---|
| Design & development guidelines | `/guidelines/` |
| AI prompt files | `/prompts/` |
| Audit reports & analysis | `/reports/{topic}/` |
| Task lists & checklists | `/tasks/` |
| General documentation | `/docs/` |
| Build/utility scripts | `/scripts/` |

Only `README.md`, `CHANGELOG.md`, and `ATTRIBUTIONS.md` are permitted as `.md` files in the project root (with the acknowledged exception of `AGENTS.md` and `CONTRIBUTING.md` for GitHub/agent discoverability).

## Contribution Workflow

### 1. Branch Naming

Use the appropriate branch prefix for your change:

| Change Type | Branch Prefix | Example |
|---|---|---|
| Documentation | `docs/` | `docs/update-contributing` |
| Feature | `feat/` | `feat/add-gallery-filter` |
| Bug fix | `fix/` | `fix/mobile-menu-overflow` |
| Refactor | `refactor/` | `refactor/extract-card-component` |

### 2. Making Changes

1. Create a branch from `main` with the appropriate prefix
2. Read the relevant guidelines **before** coding
3. Make your changes following the coding conventions above
4. Run `pnpm build` to verify the build passes

### 3. Pull Requests

- Write a clear PR description explaining what changed and why
- Use the correct PR template based on the `type:` label or linked issue type
- Link any related issues
- Ensure the branch prefix matches the change type

### 4. Changelog

If your change is user-facing, prepare an entry for `CHANGELOG.md` (at `src/app/CHANGELOG.md`) following [Keep a Changelog v1.1.0](https://keepachangelog.com/en/1.1.0/) format. See [guidelines/changelog.md](guidelines/changelog.md) for full conventions.

### 5. After Merge

- Delete the feature branch
- Update and close linked issues
- Update related epics (do not close epics — update them)

## Getting Help

- **Guidelines questions**: start with [guidelines/README.md](guidelines/README.md)
- **Architecture questions**: see [guidelines/ARCHITECTURE.md](guidelines/ARCHITECTURE.md)
- **Component usage**: check the specific file in [guidelines/components/](guidelines/components/)
- **Issue tracking**: [GitHub Issues](https://github.com/lightspeedwp/ThisOneTimeOnAcidCom/issues)

## Unresolved Assumptions

These items are documented rather than invented:

1. **No automated test/lint/typecheck** — there are no `test`, `lint`, or `typecheck` scripts in `package.json`. The quality gate is currently manual review + successful build.
2. **CI/CD** — The repository has dependency-automation and dependency-validation workflows but no general CI pipeline for PRs. Build validation is manual.
3. **Dual PostCSS config** — `postcss.config.mjs` exists at root and `postcss.config.js` exists in `src/app/`. Which is active for the Vite build is not explicitly documented.
