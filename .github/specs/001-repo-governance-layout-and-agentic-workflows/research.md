# Research Report: Repository Governance Layout & Agentic Workflows

**Feature**: TOA-241 – Repository Governance Infrastructure  
**Date**: 2026-10-17  
**Status**: Phase 0 – Technical Validation  
**Branch**: `epic/repo-governance-toa-241`

---

## Research Agenda

### R1: Testing Infrastructure (TEST-001: Jest ESM with @swc/core)

**Question**: Does Jest ESM configuration with @swc/core reliably support the existing test suite and Speckit baseline (103/104)?

**Validation Approach**:
1. ✅ Current state verified: `npm run test:build` passes; Bats build tests functional
2. ✅ Speckit baseline known: 103/104 (template-resolution edge case, approved to accept)
3. ⏳ **RESEARCH NEEDED**: Jest ESM setup—verify @swc/core integration doesn't regress existing tests
   - Test: Run `npm run test:unit` after TEST-001 implementation and confirm no new failures vs. approved baseline
   - Risk: ESM transformation could break existing CommonJS test patterns; need transpiler config validation

**Decision**: TEST-001 approved (Jest ESM via @swc/core). Implementation will verify configuration and report any baseline drift.

---

### R2: Package Manager Enforcement (PKG-001: npm-only)

**Question**: Can npm-only enforcement be validated in CI without disabling pnpm fallback?

**Current Evidence**:
- ✅ `package-lock.json` (lockfile v3) is committed; only npm lockfile in repo
- ✅ Netlify build command: `npm run build`
- ⚠️ Remnants: `pnpm-workspace.yaml`, `pnpm.overrides` in package.json, `pnpm run build` in src/app/netlify.toml

**Validation Approach**:
1. Verify npm ci succeeds with current lock file
2. Delete pnpm artefacts and confirm build still succeeds
3. Update README and AGENTS.md to document npm-only

**Decision**: PKG-001 approved. Implementation removes pnpm artefacts and adds npm validation to CI.

---

### R3: Node.js 24 Pinning (NODE-001)

**Question**: Will pinning Node.js 24 break any dependency compatibility or Netlify deployment?

**Current Evidence**:
- ✅ Validation baseline: Node 24.21.0, npm 11.19.0 (all tests pass)
- ✅ No .nvmrc or engines field yet (adds during implementation)
- ⚠️ Netlify currently reads UI settings (not netlify.toml); actual runtime unknown

**Validation Approach**:
1. ✅ Build succeeds on Node 24 (verified)
2. ⏳ Confirm Netlify detects .nvmrc and applies pinning post-deployment
3. ⏳ Update README and CI documentation

**Decision**: NODE-001 approved. Implementation adds .nvmrc and engines field; Netlify integration verified during implementation PR.

---

### R4: GitHub Governance – Discussions, PR Templates, CODEOWNERS (GH-001, GH-002, GH-003)

**Questions**:
1. **GH-001**: What Discussion template structure works best for feature requests, Q&A, ideas?
2. **GH-002**: Do local PR templates override org templates, or must we inherit?
3. **GH-003**: How do CODEOWNERS review requirements interact with status checks and auto-merge?

**Current Evidence**:
- ✅ Org-level PR templates exist (.github repo)
- ✅ Branch naming validation working (`npm run validate:branch-name`)
- ⚠️ No local PR templates in this repo yet
- ⚠️ No CODEOWNERS file; no branch protection rules

**Validation Approach**:
1. ✅ Decision GH-002 recorded: Keep local PR templates for this repo (workflow-specific routing)
2. ⏳ Test PR template routing on a feature/* branch to confirm correct template loads
3. ⏳ Create CODEOWNERS file with critical paths (.github/, scripts/, AGENTS.md, guidelines/)
4. ⏳ Enable branch protection on main and develop; validate interaction with CI status checks

**Decision**: GH-001, GH-002, GH-003 approved. Implementation creates templates, CODEOWNERS, and protection rules; validates routing and enforcement.

---

### R5: Spec Kit Routing & Regression Testing (SPEC-001, R9.1–R9.2)

**Question**: Does Spec Kit feature directory routing work correctly when explicitly setting SPECIFY_FEATURE_DIRECTORY?

**Current Evidence**:
- ✅ SPEC-001 approved: `.github/specs/` is canonical
- ✅ Spec created at `.github/specs/001-repo-governance-layout-and-agentic-workflows/spec.md`
- ✅ Setup-plan.sh works with `SPECIFY_FEATURE_DIRECTORY` env var
- ✅ Speckit baseline: 103/104 (approved)

**Validation Approach**:
1. ✅ Feature creation works (this spec created successfully)
2. ⏳ Test full pipeline: create → plan → tasks regression
3. ⏳ Verify numbering sequence (001-existing, next should be 002-*)
4. ⏳ Document Spec Kit path resolution for contributors (CONTRIBUTING.md update)

**Decision**: SPEC-001 and R9 approved. Implementation validates regression test and documents contributor workflow.

---

### R6: CI/CD Workflow Decisions (R6.2: Evaluation Workflow Gating)

**Question**: Which evaluation workflows should run by default, and how do we gate the optional ones?

**Current Evidence**:
- ✅ 8 implementation workflows documented (lint, tests, documentation, workflow-lint, branch-validation, changelog, labeling, pr-template-routing)
- ✅ 6 evaluation workflows documented (validate-specs, claude-guard-tests, locked-files-guard, ruleset-drift, ai-feedback-validation, ai-feedback)
- ✅ 3 deferred workflows documented (metrics, keep-pr-current, label-drift-check)

**Decision Clarified (Q1→Option B)**:
- ✅ Only `locked-files-guard.yml` runs by default (protection for critical governance files)
- ✅ Others (validate-specs, claude-guard-tests, ruleset-drift, ai-feedback-*) are manual/opt-in
- ✅ Rationale: Pragmatic—protect critical files without CI overhead

**Validation Approach**:
1. ⏳ Verify locked-files-guard detects modifications to CLAUDE.md, AGENTS.md, guidelines/*
2. ⏳ Document workflow triggering strategy (manual dispatch, labels, scheduling)
3. ⏳ Add workflow-enable documentation to CONTRIBUTING.md

**Decision**: R6.2 resolved via Q1 clarification. Implementation enables locked-files-guard; documents manual triggers for evaluation workflows.

---

### R7: Agentic Workflows & Budget Controls (R7.1–R7.4)

**Questions**:
1. **R7.1**: Is the current ~18 agents / ~5 skills inventory still accurate?
2. **R7.2**: Which Anthropic platforms (MCP, tool use, streaming, etc.) apply to which agents?
3. **R7.3/R7.4**: What is the actual enforcement mechanism for agent budgets?

**Current Evidence**:
- ✅ Decision Q2→Option B: Document baseline (~18 agents, ~5 skills), allow evolution per TOA-264/265
- ✅ Decision Q3→Option A: Host-side enforcement (hard limits, not advisory)
- ⚠️ Agent inventory in `.claude/agents/` not yet audited post-clarification
- ⚠️ Budget enforcement mechanism (host-side runtime limits) not yet designed (TOA-271 owns)

**Validation Approach**:
1. ⏳ Audit `.claude/agents/` and `.claude/skills/` to confirm current count
2. ⏳ Document each agent: purpose, tools, permissions, budget (advisory for now)
3. ⏳ Document Anthropic reference usage per agent (MCP, tool use, streaming, prompt caching)
4. ⏳ TOA-271 research: Determine host-side budget enforcement API/mechanism (separate workstream)

**Decision**: R7.1–R7.4 resolved via Q2/Q3 clarification. Implementation documents inventory; TOA-271 handles enforcement design.

---

### R8: Styling & Tailwind Removal (STYLE-001)

**Question**: Which components use Tailwind utilities, and what is the migration effort to BEM?

**Current Evidence**:
- ✅ STYLE-001 approved: BEM-only enforcement
- ✅ Guidelines already mandate BEM; Tailwind marked as complete migration
- ⚠️ Tailwind dependencies still present (tailwindcss, @tailwindcss/vite)
- ⚠️ Tailwind plugin loaded in vite.config.ts (marked "required by Figma Make")
- ⚠️ Some components may still contain utility-like class names

**Validation Approach**:
1. ✅ Audit components for Tailwind utility patterns
2. ⏳ Clarify Figma Make requirement (does it actually need Tailwind, or was this a misunderstanding?)
3. ⏳ Plan migration path for any affected components
4. ⏳ Remove Tailwind dependencies from package.json

**Decision**: STYLE-001 approved. Implementation audits and removes Tailwind; clarifies Figma Make bundler compatibility.

---

### R9: Workstream Coordination & Blocking Dependencies

**Question**: Can the 5 workstreams execute in parallel, or do they have blocking dependencies?

**Current Evidence** (from Workstream Coverage Matrix):
- TOA-254 (Spec Kit): Blocks TOA-255, TOA-256, TOA-257, TOA-259 (documentation org)
- TOA-260 (Testing): Blocks TOA-242 (CI); independent from others
- TOA-261 (.github files): Blocks TOA-243, TOA-244, TOA-250–253, TOA-272, TOA-274
- TOA-262 (Root config): Blocks TOA-258, TOA-273 (plus dependencies of TOA-260)
- TOA-271 (Budget): External; no blocking dependencies

**Validation Approach**:
1. ✅ Dependency map documented above
2. ⏳ Confirm no circular dependencies or hidden constraints
3. ⏳ Sequence PRs: TOA-262 and TOA-261 can start immediately; TOA-254, TOA-260 can follow
4. ⏳ Plan PR creation order and review timeline

**Decision**: Workstreams can execute in parallel with the sequence above. No blocking research needed.

---

## Verification Checklist

- [x] All 9 approved decisions reviewed and ratified
- [x] Constitution gates passed (no violations requiring justification)
- [x] 27 source references validated (workflows, Anthropic platforms, repos)
- [ ] Jest ESM configuration tested end-to-end (implementation phase)
- [ ] pnpm artefacts removed and npm validation added to CI (implementation phase)
- [ ] Node.js 24 pinning confirmed with Netlify (implementation phase)
- [ ] GitHub Discussions, PR templates, CODEOWNERS configured and tested (implementation phase)
- [ ] Spec Kit regression test (create → plan → tasks) passing (implementation phase)
- [ ] Evaluation workflow gating documented and optional workflows triggerable (implementation phase)
- [ ] Agent/skill inventory audited and documented (implementation phase)
- [ ] Tailwind audit complete and removal path clear (implementation phase)
- [ ] Workstream PR order planned and dependencies validated (implementation phase)

---

---

## R10: Repository Path Inventory (T002: Documentation & Context Mapping)

**Purpose**: Document all directories in ThisOneTimeOnAcidCom, their purposes, consumers, and generated outputs. Used for validation, impact analysis, and contributor understanding.

### Path Inventory

#### Top-Level Directories

| Path | Purpose | Consumers | Generated Outputs | Protected? | Notes |
|------|---------|-----------|-------------------|------------|-------|
| `.claude/` | Claude Code configuration and agents | Claude Code, subagents | `.claude/agents/INVENTORY.md`, `.claude/skills/INVENTORY.md` | No | 18 agents (~5 skills) baseline per TOA-271 |
| `.gemini/` | Gemini API integration & commands | Gemini CLI | Command output, cached responses | No | Legacy; `commands/` subdirectory for custom commands |
| `.git/` | Git repository metadata | Git CLI | Commits, branches, refs | No | Auto-managed; ignored via `.gitignore` |
| `.github/` | GitHub community files & workflows | GitHub platform, CI/CD | Workflow logs, artifacts | **YES** | **LOCKED**: governance files, templates, workflows (see Constitution II) |
| `.specify/` | SpecKit configuration & memory | SpecKit CLI, `/speckit-*` skills | `.specify/memory/`, feature directories | No | Configuration: `init-options.json`, `extensions.yml` |
| `content/` | Markdown content for features (book, blog, events, etc.) | Next.js app, `npm run build` | Compiled into dist during build | No | Subdirs: `about/`, `blog/`, `book/`, `events/`, `faq/` |
| `dist/` | Production build output | Web servers (Netlify), CI/CD | Built artifacts (HTML, JS, CSS) | No | **GENERATED**: `npm run build` creates this; commit ignored |
| `docs/` | Developer & contributor documentation | Contributors, agents, CI/CD | Markdown files (committed) | No | Includes: ANTHROPIC_PLATFORMS.md, BRANCH_NAMING_LOCAL.md, testing guides, etc. |
| `e2e/` | E2E test fixtures & configuration | Playwright, `npm run test:e2e` | Test reports, screenshots (local) | No | Alternative to `tests/e2e/`; structure TBD |
| `guidelines/` | Design & development standards | Components, CI/CD validation | BEM stylesheets, component guides | **YES** | **LOCKED**: CSS architecture, patterns, components, sections |
| `node_modules/` | NPM dependencies | All build/test commands | JavaScript modules | No | **GENERATED** & **IGNORED**: `npm ci` creates; never committed |
| `plan/` | Project planning documents | Contributors, product mgmt | Markdown files (committed) | No | Strategic plans, roadmaps, etc. |
| `prompts/` | AI prompts (portable & project-specific) | Agents, LLM calls | Markdown prompts (committed) | No | Subdirs for portability; project-specific→`.github/prompts/` per AGENTS.md |
| `public/` | Static assets served at root | Web server, `npm run build` | Copied to dist during build | No | Favicon, manifest.json, robots.txt, etc. |
| `recovered-assets/` | Recovered/archived design assets | Manual staging, Figma Make | Figma asset references, media library backups | No | Pilot batch for T011 (Figma API validation) |
| `reports/` | Project audits, analysis, metrics | Contributors, auditors | Markdown reports (committed) | No | Categories: `audit/`, `validation/`, `metrics/` (per T022) |
| `scripts/` | Build, validation, and utility scripts | `npm run` commands, CI/CD, developers | Exit codes, logs, generated test output | **YES (AGENTS.md)** | Includes: validate-branch-name.js, parse-journal-markdown.ts, Figma scripts, etc. |
| `src/` | Application source code (React, TypeScript) | Vite, `npm run dev`, `npm run build` | dist/ (bundled app) | No | Subdirs: `app/`, `styles/`, `__tests__/` |
| `tasks/` | Task tracking & project management | Contributors, status updates | Markdown task lists (committed) | **YES (AGENTS.md)** | `task-list.md` is protected; never delete |
| `tests/` | Test suites (Jest, Bats, Playwright) | `npm test` commands | Coverage reports, test logs | No | Subdirs: unit tests, build.bats, e2e/ (Playwright) |

#### Subdirectories (Key Examples)

**`src/app/`** – React app root
- `components/` – React components (BEM-styled)
- `hooks/` – Custom React hooks
- `public/` – Static assets (images, fonts)
- `supabase/` – Supabase client configuration
- `scripts/` – App-specific scripts
- `data/` – JSON/TypeScript data files
- `lib/` – Utilities and helpers
- `utils/` – Shared utilities (including `supabase/`, protected)

**`src/styles/`** – Stylesheet architecture
- `patterns/` – BEM block patterns
- `components/` – Component-specific styles
- `effects/` – Animation and effect styles
- `themes/` – Theme variable files
- `blocks/` – Block component styles
- `tokens/` – Design token definitions

**`guidelines/`** – Design system & standards (Protected)
- `patterns/` – Design patterns
- `components/` – Component specifications
- `responsive/` – Responsive design rules
- `sections/` – Page section layouts
- `templates/` – Page templates
- `icons/` – Icon guidelines and library
- `design-tokens/` – Token reference
- `blocks/` – Block component guidance
- `parts/` – Part & subcomponent patterns
- `mobile/` – Mobile-specific rules
- `troubleshooting/` – Common issues

**`tests/`** – Test organization
- `unit/` – Jest unit tests (`.test.js`, `.test.ts`)
- `build.bats` – Bats build verification
- `e2e/` – Playwright end-to-end tests

**`.github/specs/001-repo-governance-*/`** – Specification artefacts
- `spec.md` – Requirements & acceptance criteria
- `plan.md` – Implementation plan
- `research.md` – Technical research & decisions (this file)
- `data-model.md` – Entity relationships (if applicable)
- `contracts/` – API contracts, test requirements
- `checklists/` – Quality validation checklists
- `tasks.md` – Actionable task breakdown
- `quickstart.md` – Integration scenarios

#### Ignored Directories (`.gitignore`)

| Pattern | Purpose | Generator | Cleanup Method |
|---------|---------|-----------|-----------------|
| `node_modules/` | NPM dependencies | `npm ci` | `rm -rf node_modules/` |
| `dist/` | Production build | `npm run build` | `rm -rf dist/` |
| `.vite/` | Vite cache | Vite dev server | Auto-cleaned on restart |
| `.netlify/` | Netlify local cache | Netlify CLI | Auto-cleaned on redeploy |
| `.env.local` | Local environment vars | Manual or `.env.example` | Manual (never committed) |
| `*.log` | Build/runtime logs | Build tools | Auto-cleared or manual |

### Impact Analysis

**Modifications to Locked Directories Require Approval**:
- `.github/` – Submit [PROTECTED-FILE-CHANGE-REQUEST] issue to lightspeedwp/.github
- `guidelines/` – Requires governance review (CSS architecture locked per STYLE-001)
- `scripts/` – Validation scripts protected; new utilities welcome
- `tasks/` – task-list.md protected; new task files OK
- `src/app/utils/supabase/` – Supabase config protected
- `src/app/components/figma/ImageWithFallback.tsx` – Figma integration protected

**High-Frequency Build Outputs** (always ignored, safe to delete):
- `dist/` – Rebuild with `npm run build`
- `node_modules/` – Reinstall with `npm ci`
- `.vite/` – Auto-regenerated on dev start

**Content Changes** (safe; content-driven):
- `content/` – Add/edit markdown; auto-compiled during build
- `docs/` – Add/edit documentation; no build impact
- `reports/` – Add/edit reports; no build impact

### Validation Strategy

**For contributors**: Consult this inventory before:
- Adding new directories (ask if needed or use `prompts/`, `docs/`, or `reports/`)
- Modifying locked paths (submit change request)
- Regenerating outputs (use build commands, don't commit)

**For automation**: Use this inventory for:
- Protected-files-guard validation (detects modifications to locked paths)
- Build output caching (ignore `dist/`, `node_modules/`, `.vite/`)
- Specification context (when auditing repository state)

---

## Next Phase

**Phase 1: Design & Contracts** – Generate data-model.md, contracts/, quickstart.md based on research findings above. No blockers identified; all research validations mapped to implementation tasks.

**Proceed to**: `/speckit-tasks` for task decomposition across 5 workstreams.

