# Agent Instructions — ThisOneTimeOnAcid

> Repository-specific instructions for AI coding agents working on
> [lightspeedwp/ThisOneTimeOnAcidCom](https://github.com/lightspeedwp/ThisOneTimeOnAcidCom).

## Source of Truth

All authoritative design and development guidance lives in the **`/guidelines/`** directory.
Before making any change, agents **must** read these files in order:

1. **[guidelines/Guidelines.md](guidelines/Guidelines.md)** — entry point: critical rules, bundler workarounds, workflow conventions
2. **[guidelines/ARCHITECTURE.md](guidelines/ARCHITECTURE.md)** — component taxonomy and file-location mapping
3. **[guidelines/css-architecture.md](guidelines/css-architecture.md)** — strict BEM architecture (Tailwind is forbidden)
4. **[guidelines/README.md](guidelines/README.md)** — full directory structure and reading order

### Design Tokens & Theme
- **[guidelines/design-tokens/](guidelines/design-tokens/)** — colors, typography, spacing, animations
- **[guidelines/dark-mode-implementation.md](guidelines/dark-mode-implementation.md)** — light/dark theme system
- **[guidelines/component-dark-mode.md](guidelines/component-dark-mode.md)** — per-component theme patterns

### Data System
- **[src/app/data/](src/app/data/)** — centralised mock data; **all content must be imported from `/data/mock`**, never hardcoded

### Spec Kit (SDD Workflow)
- **[.specify/](/.specify/)** — Spec Kit templates, scripts, and workflows
- **[.gemini/commands/](/.gemini/commands/)** — Gemini CLI speckit commands (`.toml` files)

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 18 + Vite 6 |
| Language | TypeScript (strict) |
| Styling | **Semantic BEM CSS** — no Tailwind utilities, no inline styles |
| UI primitives | Radix UI, shadcn/ui patterns |
| Icons | Lucide, Phosphor |
| Animation | Motion (Framer Motion) |
| Routing | React Router v7 |
| Data | Static mock data (`/data/mock/`) — no backend, no Supabase |
| Deployment | Netlify (SPA mode) |
| Package manager | pnpm |

---

## Verified Build & Dev Commands

These commands are confirmed in [`package.json`](package.json):

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Production build
pnpm build

# Parse journal markdown content
pnpm journal:parse

# Validate journal markdown (dry-run)
pnpm journal:validate

# Check journal link integrity
pnpm journal:check-links
```

> **Note:** There is no test runner currently configured in `package.json`.
> The project has no `test`, `lint`, or `typecheck` script at this time.

---

## Critical Safeguards

### Bundler Compatibility (Figma Make)

The Figma Make bundler **cannot parse** certain modern JS/TS syntax.
All code must avoid the patterns listed in [Guidelines.md § Bundler Compatibility Rules](guidelines/Guidelines.md).
Key forbidden patterns:

- Optional chaining (`?.`) — use explicit null checks
- Nullish coalescing (`??`) — use if/else
- `import.meta.env` — removed entirely
- Nested ternaries — convert to if/else
- `for...of` loops — use classic `for` loops

Use the helper functions in `/lib/router.tsx`: `grab()`, `arrayGet()`, `setProp()`.

### Image Protection

**Never replace existing images.** All `figma:asset/` imports, logo files, and image references are protected.
Use `ImageWithFallback` from `/components/figma/ImageWithFallback.tsx` for new images (this file is protected — do not modify).

### Supabase Non-Usage

Supabase is **not used**. The `/utils/supabase/` folder is a system-protected deployment artifact.
Never import from it, never suggest Supabase integration, always dismiss the `supabase_connect` tool if offered.

### Content Rules

- **No hardcoded content** — all text/images come from `/data/mock`
- **Sentence case** for all headings, titles, labels, and navigation
- **Pronouns:** Ash uses He/Him exclusively

### Root Directory Restrictions

Per project conventions, only `README.md`, `CHANGELOG.md`, and `ATTRIBUTIONS.md` are permitted as `.md` files in the project root.
`AGENTS.md` and `CONTRIBUTING.md` are placed at root for discoverability by agents and GitHub tooling — this is an **acknowledged exception** to the root-directory rule.

---

## Folder Conventions

| Folder | Purpose | Rules |
|---|---|---|
| `/guidelines/` | Design & development guidance | Source of truth — read before coding |
| `/prompts/` | AI prompt files | Reusable templates, orchestrators in subfolders |
| `/reports/{topic}/` | Audit reports & analysis | One subfolder per audit |
| `/tasks/` | Task lists & checklists | `task-list.md` is the master (never delete) |
| `/docs/` | General documentation | Catch-all for docs not in above folders |
| `/scripts/` | Build/utility scripts | `.ts`, `.sh`, `.js` only |
| `/src/app/` | Application source | Components, data, routing, styles |

---

## Workflow

When asked to audit, review, or write a prompt, follow the **default 4-step workflow** defined in [Guidelines.md § Default AI Workflow](guidelines/Guidelines.md):

1. Create a prompt in `/prompts/`
2. Run the audit described in the prompt
3. Save findings to `/reports/{topic}/`
4. Extract actionable tasks to `/tasks/`

---

## Source vs Generated Output

- **Source configuration** lives in the repository root and `src/app/` — this is what agents edit
- **Generated output** (`dist/`) is the Vite build output deployed to Netlify — it is `.gitignore`d and must never be treated as authoritative configuration
- The `netlify.toml` at `src/app/netlify.toml` is the deployment config; note it references `pnpm run build` and publishes `dist/`

---

## Unresolved Assumptions

The following items are documented as unresolved per repository evidence, not invented:

1. **No test/lint/typecheck scripts** — `package.json` contains no `test`, `lint`, or `typecheck` commands. Whether this is intentional or an omission is not determined.
2. **Root `.md` exception** — `AGENTS.md` and `CONTRIBUTING.md` are placed at root for agent/GitHub discoverability despite the root-restriction rule in Guidelines.md. This trade-off is acknowledged but not formally resolved in the project guidelines.
3. **Two `netlify.toml` locations** — There is a `netlify.toml` inside `src/app/` and the root-level Vite config references the same build command. Which is authoritative for Netlify deployment is not explicitly documented.
4. **`postcss.config.mjs` vs `postcss.config.js`** — Both exist (root and `src/app/`). The active PostCSS pipeline is not explicitly documented.
