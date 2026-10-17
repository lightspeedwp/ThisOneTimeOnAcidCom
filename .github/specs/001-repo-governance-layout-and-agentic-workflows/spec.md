# Repository Governance Layout & Agentic Workflows

**Feature**: TOA-241 – Complete repository-governance scope for ThisOneTimeOnAcidCom  
**Status**: Specification (pre-planning)  
**Created**: 2026-10-17  
**Owner**: @ashley  
**Approved Decisions**: 9 (SPEC-001, TEST-001, TEST-002, GH-001, GH-002, GH-003, PKG-001, NODE-001, STYLE-001)  
**Child Issues**: 20 (TOA-242–TOA-274, excluding TOA-264/TOA-265 which are separate Claude epic)

---

## Outcomes & Value

This specification defines a tailored, maintainable governance system for ThisOneTimeOnAcidCom that:

- **Preserves application behaviour** — React/TypeScript/Vite book SPA continues to build and deploy to Netlify unchanged
- **Formalises repository layout** — Stable paths for specs, workflows, agents, skills, configurations, tests and documentation
- **Enables deterministic quality gates** — CI/CD workflows validate code, specs, configs and branch naming without manual intervention
- **Supports agentic workflows** — Agents have clear budgets, tool access, output routing and escalation points
- **Maintains compliance** — BEM-only CSS, npm-only package management, Node.js 24 LTS pinning
- **Centralises decision governance** — 9 approved decisions guide all 20 child workstreams without reopening settled questions

---

## Stakeholders & Scenarios

### Stakeholders

- **Owner (@ashley)** – Final approval authority, decision ratification, exception handling
- **AI agents** (Claude, Gemini) – Execute workflows, create/update specs, validate code, manage branches
- **Human contributors** – Submit PRs, review code, write specifications, maintain documentation
- **CI/CD systems** – GitHub Actions, Netlify, dependency validators
- **Book content editors** – Create/edit journal entries, articles, manuscript chapters in `content/`

### Prioritised Scenarios

1. **New feature via Spec Kit** — Agent creates spec in `.github/specs/NNN-feature/`, uses `/speckit-plan`, `/speckit-tasks` to generate tasks, implements, opens PR, which auto-routes template and validates
2. **Dependency update** — CI detects semver change, agent runs `npm ci`, validates tests, updates changelog, opens PR
3. **CI validation failure** — Workflow detects branch-name error / config drift / locked-file modification; prevents PR merge; agent fixes and re-pushes
4. **Multi-workstream coordination** — Four workstreams (TOA-254, TOA-260, TOA-261, TOA-262) unblock after owner approval; agents create focused implementation PRs in parallel

---

## Scope & Exclusions

### In Scope

- **Repository structure** — All directories, configuration files, generated artefacts and their consumers
- **Spec Kit integration** — Feature directory routing, template resolution, regression testing (TOA-254)
- **CI/CD workflows** — Implementation, evaluation and deferred workflows; GitHub Actions, branch protection, CODEOWNERS
- **Configuration** — Package manager (npm), Node.js pinning, test runners, linters, build system
- **GitHub governance** — PR templates, issue templates, discussion templates, saved replies, labels
- **Agentic workflow** — Agent definitions, skills, tools, budgets, permissions, escalation
- **Quality gates** — Deterministic (code, spec, config validation); separate from AI-driven classification
- **Content preservation** — Editorial files, protected trackers, images, attribution, archives

### Exclusions

- **Book content migration** — Journal, articles, manuscript chapter additions are out of scope
- **Figma Make bundler changes** — Bundler compatibility rules are pre-existing constraints (guideline-enforced)
- **Supabase integration** — Remains undeployed system artefact (per AGENTS.md protection rules)
- **Agent/skill runtime implementation** — Budget enforcement mechanics (TOA-271) owned separately; this spec documents requirements only
- **Workflow enablement decisions** — Which workflows run by default (evaluation vs. deferred) requires owner decision per workflow
- **Copilot/GitHub integration setup** — Outside this epic scope; documented in .github repo

---

## Requirements by Category

### R1. Folder Layout & Path Conventions

**R1.1** — Inventory current paths, consumers, generated outputs  
- Read and classify all directories (keep/adapt/move/omit/defer)  
- Document path consumers: which workflows/agents read/write each path  
- Preserve managed `.specify/` and `.gemini/` integrations  

**R1.2** — Spec Kit output routing (SPEC-001 approved: `.github/specs/` is canonical)  
- Specs live in `.github/specs/{NNN-feature}/` (no duplication at root)  
- Feature directory routing via `.specify/init-options.json` (sequential numbering)  
- Preserve Spec Kit templates, commands, checksums, create → plan → tasks regression  

**R1.3** — Documentation and configuration consolidation  
- `.github/specs/` holds governance specifications (TOA-241, TOA-254 etc.)  
- `docs/` holds permanent human documentation (README, guides, playbooks)  
- `guidelines/` holds design/development rules (read-only Figma Make reference)  
- Root `CHANGELOG.md` protected; no duplication in subdirectories  

**R1.4** — Test colocaction with modules (TEST-001 approved: Jest ESM enabled)  
- Unit tests colocate with source modules (e.g., `src/app/components/Button.test.ts` alongside `Button.tsx`)  
- Tooling fixtures separate from executable tests  
- Jest configured for ESM via `@swc/core`; Vitest available as fallback  

**R1.5** — Build and generated output paths  
- `dist/` — production build output (read-only, gitignored)  
- `export/` — generated artefacts (journal JSON, reports, etc.; gitignored)  
- `coverage/` — test coverage reports (gitignored)  
- Root configuration (`.gitattributes` with `text=auto`, etc.) preserved; no new files inferred without consumer evidence  

**R1.6** — Scripts remain at root `scripts/` (no `.github/scripts/` introduced)  
- `scripts/validate-branch-name.js` — branch naming validation  
- `scripts/parse-journal-markdown.ts` — journal parsing utility  
- `scripts/check-journal-links.ts` — link integrity checker  

---

### R2. Package Management (PKG-001 approved: npm-only)

**R2.1** — Commitment to npm as sole package manager  
- `package-lock.json` (lockfile v3) is source of truth  
- No `pnpm-lock.yaml` or `yarn.lock`  
- Netlify build command: `npm run build`  

**R2.2** — Remove pnpm artefacts during implementation  
- Delete `pnpm-workspace.yaml` (unused)  
- Remove `pnpm.overrides` from `package.json`  
- Update `src/app/netlify.toml` to remove `command = "pnpm run build"` reference  
- Update root `README.md` to document npm-only  

**R2.3** — Dependency validation  
- Paired validation: `package.json` ↔ `package-lock.json` only  
- No multi-lockfile validation  

---

### R3. Node.js Version Pinning (NODE-001 approved: Pin to Node 24)

**R3.1** — Enforce Node.js 24 LTS locally  
- `.nvmrc` contains `24`  
- `package.json` `engines` field: `{ "node": ">=24" }`  
- Root `README.md` documents Node 24 requirement  

**R3.2** — Verify dependency compatibility  
- Run `npm ci` to validate all dependencies resolve correctly under Node 24  
- Identify and resolve any breaking changes from Node 18 → 24 migration  

**R3.3** — Update deployment configuration  
- Confirm Netlify site settings pin Node 24 (via Netlify UI, not `.toml`)  
- Document production runtime version requirement  

---

### R4. Testing Infrastructure (TEST-001, TEST-002 approved)

**R4.1** — Jest ESM configuration (TEST-001 approved: Enable Jest ESM mode with @swc/core)  
- Update Jest config to support ESM imports  
- Install `@swc/core` as dev dependency for Jest transpilation  
- Enable Vitest as fallback test runner if Jest proves unstable  
- Verify `npm run test:unit` passes without modification to existing test syntax  

**R4.2** — Accept Speckit test baseline (TEST-002 approved: Accept 103/104)  
- Current baseline: 103 pass, 1 fail (template resolution precedence edge case)  
- Known failure does not affect normal workflows  
- Document as accepted baseline in AGENTS.md  
- Mark failure as "deferred edge case" in test comments  

**R4.3** — Test placement and discovery  
- Unit tests colocate with modules (e.g., `src/app/components/*.test.ts`)  
- Integration tests in `tests/` directory  
- Build validation: `tests/build.bats` validates Vite build integrity  
- E2E tests: `tests/e2e/` (Playwright; currently requires browser install)  

**R4.4** — Test command validation  
- `npm run test:unit` — Jest unit tests (after ESM config)  
- `npm run test:build` — Build verification with Bats  
- `npm run test:e2e` — Playwright end-to-end tests  
- `npm test` — runs all three suites in sequence  

---

### R5. GitHub Governance (GH-001, GH-002, GH-003 approved)

**R5.1** — GitHub Discussions (GH-001 approved: Enable with templates)  
- Enable Discussions in repository settings  
- Create `.github/DISCUSSION_TEMPLATE/` directory with templates:  
  - `feature-request.md` — new feature ideas  
  - `question-and-answer.md` — Q&A support  
  - `show-and-tell.md` — community showcase  
  - `ideas.md` — ideas and proposals  
- Configure discussion categories in settings  
- Document in README  

**R5.2** — PR Template Routing (GH-002 approved: Keep local PR templates)  
- Retain repository-specific PR templates for workflow routing  
- Branch naming validates via `npm run validate:branch-name`  
- Inherit organisation-wide templates from `lightspeedwp/.github` when appropriate  
- No duplicate templates — only override when workflow-specific needs differ  

**R5.3** — CODEOWNERS & Branch Protection (GH-003 approved: Enable + protection)  
- Create `.github/CODEOWNERS` file with code area ownership mapping  
  - @ashley: `.github/`, `scripts/`, `AGENTS.md`, `CHANGELOG.md`, `guidelines/`  
  - @ashley: governance-critical areas  
  - Delegate component ownership to appropriate teams/individuals  
- Enable branch protection on `main`:  
  - Require PR review (require CODEOWNERS review for protected paths)  
  - Require status checks to pass before merge  
  - Require branches to be up to date  
  - Allow dismissal of stale reviews when new commits are pushed  
- Enable moderate protection on `develop`:  
  - Require PR review (less strict than `main`)  
  - Require status checks to pass  

**R5.4** — Issue Template Inheritance  
- Verify local `.github/ISSUE_TEMPLATE/` templates inherit from organisation defaults  
- No duplicate templates; override only when repository-specific needs differ  

**R5.5** — Saved Replies  
- Document saved replies available to contributors  
- Link to `.github` repo saved-replies configuration  
- Provide personal setup guidance in CONTRIBUTING.md  

---

### R6. Workflow & CI/CD Validation

**R6.1** — Implementation Workflows (actively deployed)  
- `lint.yml` — ESLint, Prettier, Markdownlint validation  
- `tests.yml` — Unit, build, e2e test execution  
- `documentation.yml` — README, CONTRIBUTING.md validation  
- `workflow-lint.yml` — GitHub Actions YAML syntax validation  
- `branch-name-validation.yml` — Branch naming convention enforcement  
- `changelog-unified.yml` — CHANGELOG format and protection validation  
- `labeling-unified.yml` — Automatic PR label assignment based on branch prefix  
- `pr-template-routing.yml` — PR template routing based on branch type  

**R6.2** — Evaluation Workflows (validation/audit, gating policy clarified)  
- **Always enabled:** `locked-files-guard.yml` — Detect modifications to protected files (CLAUDE.md, AGENTS.md, guidelines/*)  
- **Manual/opt-in:** `validate-specifications.yml` (Spec Kit regression), `claude-guard-tests.yml` (AI code quality), `ruleset-drift.yml` (branch protection changes), `ai-feedback-validation.yml` (AI feedback guardrails), `ai-feedback.yml` (feedback collection)  
- Rationale: Pragmatic approach protecting critical governance files without adding CI overhead for evaluation-only workflows  

**R6.3** — Deferred Workflows (not yet enabled; requires owner decision per workflow)  
- `branch-validation-metrics-aggregator.yml` — Aggregate branch validation metrics  
- `keep-pr-current.yml` — Rebase PRs against latest develop  
- `label-drift-check.yml` — Detect label definition changes  

**R6.4** — Workflow quality gates  
- Deterministic validation: code, spec, config checks run unprivileged  
- Privileged operations: metadata changes, branch updates run from trusted code only  
- Preserve contributor-authored content and unrelated labels  
- No AI-driven classification, model calls, automated branch updates or paid execution implied by workflow alignment  

---

### R7. Agentic Workflows & Agents

**R7.1** — Agent inventory and contract specification  
- Document current agent/skill inventory as of Oct 2026: ~18 agents in `.claude/agents/`, ~5 skills in `.claude/skills/`  
- Inventory is subject to change per separate governance (TOA-264, TOA-265); this spec does not lock it down  
- For documented agents/skills, include:  
  - Purpose and applicable use cases  
  - Inputs (prompts, context, arguments)  
  - Outputs (code, spec, report, etc.)  
  - Tool set and permission requirements  
  - Workflow relationships (where called from, which workflows trigger it)  
  - Validation and escalation points  
  - Budget coverage and runtime constraints  
  - Justified "not applicable" cases  

**R7.2** — Anthropic reference assessment  
- Evaluate applicability of seven Anthropic references (detailed in Source Register below)  
- Do not enable every platform feature in every agent  
- Document which agents use: MCP servers, tool use, streaming, model selection, etc.  

**R7.3** — Agent budget controls (TOA-271 owned separately; spec documents requirements)  
- Distinguish advisory model budgets from enforceable runtime limits  
- Document enforcement point: host-side limits, not markdown-only  
- Cover: aggregate accounting, retry/cancellation, exhaustion handling, fallback behaviour  
- Require owner approval of numerical limits and any spending increases  

**R7.4** — Skill runtime routing  
- Map skill invocation to execution environment (local agent, remote agent, subagent, fork)  
- Document tool access per execution context  
- Preserve deterministic quality gates (specs, validation workflows remain unprivileged)  

---

### R8. Styling & Component Rules (STYLE-001 approved: BEM-only)

**R8.1** — Enforce BEM-only CSS architecture  
- Remove Tailwind CSS from dependencies  
- Remove `@tailwindcss/vite` from Vite config  
- Audit existing components for Tailwind utility-class names; migrate to BEM  
- Update `guidelines/css-architecture.md` to lock BEM as canonical  

**R8.2** — Remove Tailwind configuration  
- Delete `tailwindcss` and `@tailwindcss/vite` dev dependencies  
- Remove `@tailwindcss/vite` from `vite.config.ts`  
- Remove Tailwind configuration from `tailwind.config.js` (if present)  

---

### R9. Spec Kit Integration (SPEC-001 approved: Canonical path is `.github/specs/`)

**R9.1** — Feature directory canonical path  
- All specifications stored in `.github/specs/{NNN-feature}/`  
- No specs at repository root or duplicated in other directories  
- Feature numbering via `.specify/init-options.json` (sequential mode)  

**R9.2** — Regression coverage  
- Run `node --test tests/speckit.test.mjs` to validate create → plan → tasks workflow  
- Baseline: 103 pass, 1 fail (known edge case, approved to accept)  
- No test failures from path migrations  

---

## Workstream Coverage Matrix

| Issue | Title | Blocking | Decision(s) | Status |
|-------|-------|----------|-------------|--------|
| TOA-242 | Build, lint & test CI | TOA-260, TOA-262 | TEST-001, NODE-001 | Blocked on approval |
| TOA-243 | Read-only documentation validation | TOA-261 | GH-001 | Blocked on approval |
| TOA-244 | Workflow syntax & static validation | TOA-261 | GH-001 | Blocked on approval |
| TOA-250 | Discussion categories & templates | TOA-261 | GH-001 | Blocked on approval |
| TOA-251 | Issue-template inheritance verification | TOA-261 | GH-001 | Blocked on approval |
| TOA-252 | PR-template reuse & contributor selection | TOA-261 | GH-002 | Blocked on approval |
| TOA-253 | Saved-reply reuse & personal setup | TOA-261 | GH-001 | Blocked on approval |
| TOA-254 | Canonical Spec Kit & regression coverage | TOA-254 | SPEC-001, TEST-002 | ✅ Blocked on approval |
| TOA-255 | Planning-document organisation | TOA-254 | SPEC-001 | Blocked on approval |
| TOA-256 | Reports organisation & archive preservation | TOA-254 | SPEC-001 | Blocked on approval |
| TOA-257 | Repository-specific vs. portable prompts | TOA-254 | SPEC-001 | Blocked on approval |
| TOA-258 | Script-directory placement decision | TOA-262 | PKG-001, NODE-001 | Blocked on approval |
| TOA-259 | Task-document organisation & protected trackers | TOA-254 | SPEC-001 | Blocked on approval |
| TOA-260 | Test config, placement & discovery | TOA-260 | TEST-001, TEST-002 | ✅ Blocked on approval |
| TOA-261 | Allowlisted direct .github/ configuration | TOA-261 | GH-001, GH-002, GH-003 | ✅ Blocked on approval |
| TOA-262 | Repository-root configuration | TOA-262 | PKG-001, NODE-001, STYLE-001 | ✅ Blocked on approval |
| TOA-271 | Agent & skill runtime budget controls | External | (owns budget spec) | Separate epic |
| TOA-272 | Deterministic branch-name validation | TOA-261 | GH-002 | Blocked on approval |
| TOA-273 | Read-only changelog validation | TOA-262 | NODE-001 | Blocked on approval |
| TOA-274 | Deterministic labelling & PR-routing | TOA-261 | GH-002 | Blocked on approval |

---

## Approved Decisions (Owner ratified 2026-10-17)

### ✅ SPEC-001: Spec Kit Output Canonical Path

**Decision:** `.github/specs/` is canonical for all specifications.  
**Rationale:** Specifications are governance artefacts, not source code. `.github/` is the correct home per established patterns.  
**Verified fact:** Currently used location; no change needed.  
**Verification:** No spec duplication in root directories; Spec Kit routing confirms path.

### ✅ TEST-001: Jest ESM Configuration

**Decision:** Enable Jest ESM mode with `@swc/core`; Vitest remains fallback.  
**Rationale:** Pragmatic middle ground. Jest supports ESM; aligns with codebase conventions.  
**Verification:** `npm run test:unit` passes after config update; no syntax changes to existing tests.

### ✅ TEST-002: Accept Speckit Test Baseline

**Decision:** Accept recorded 103/104 baseline with known template-precedence edge case.  
**Rationale:** 103/104 is production-ready. Single failure doesn't affect normal workflows.  
**Verified fact:** Baseline confirmed on 2026-10-16; improvement from 93 pass via lock file sync.  
**Verification:** Document in AGENTS.md; mark failure as deferred edge case.

### ✅ GH-001: Enable GitHub Discussions

**Decision:** Enable with templates (feature request, Q&A, show & tell, ideas).  
**Rationale:** Reduces noise in Issues backlog; better UX for non-bug conversations.  
**Verification:** Templates created; discussion categories configured; README documented.

### ✅ GH-002: Retain Local PR Templates

**Decision:** Keep repository-specific PR templates for workflow-specific routing.  
**Rationale:** TOA-241 has specific governance workflow needs; local templates enable Spec Kit routing.  
**Verified fact:** Local templates correctly route branch types; no duplicates of org defaults.  
**Verification:** Sync org updates manually 2–3x/year; no auto-merge conflicts.

### ✅ GH-003: Enable CODEOWNERS & Branch Protection

**Decision:** Create CODEOWNERS file; enable branch protection on `main` (strict) and `develop` (moderate).  
**Rationale:** Governance epic requires protected branches to prevent accidental merges.  
**Verification:** CODEOWNERS created; @ashley listed for critical paths; rules enforced in UI.

### ✅ PKG-001: npm-Only Package Manager

**Decision:** Remove pnpm artefacts; npm is sole package manager.  
**Rationale:** Single lockfile is source of truth; dual support creates divergence risk.  
**Verified fact:** `package-lock.json` is committed; Netlify build uses `npm run build`; README documents npm.  
**Verification:** Delete `pnpm-workspace.yaml`, remove `pnpm.overrides`, update README.

### ✅ NODE-001: Pin Node.js to 24 LTS

**Decision:** Pin Node.js 24 via `.nvmrc` + `package.json` `engines`.  
**Rationale:** Node 24 is active LTS with longest support window; Node 18 EOL was 2025-04-30.  
**Verified fact:** Already pinned locally; v24 in `.nvmrc` + `package.json` engines field.  
**Verification:** Run `npm ci` to validate dependency compatibility; confirm Netlify settings.

### ✅ STYLE-001: BEM-Only CSS Enforcement

**Decision:** Remove Tailwind dependencies; enforce BEM-only styling.  
**Rationale:** Guidelines mandate BEM; Tailwind is remnant from migration. Single source of truth required.  
**Verification:** Remove Tailwind from dependencies and Vite config; audit components for utility classes; update guidelines.

---

## Dependencies & Assumptions

### Dependencies

- **External:** lightspeedwp/.github (org-wide templates, labels, workflows)
- **Internal:** 9 approved governance decisions (ratified 2026-10-17)
- **Tool:** Spec Kit 1.0.13 with sequential numbering mode
- **Node:** Node.js 24 (pinned per NODE-001)
- **Package Manager:** npm only (per PKG-001)

### Assumptions

- Owner (@ashley) approval of all 9 decisions is current and binding
- No future re-opening of settled decisions without documented exception
- Workflow enablement (evaluation/deferred workflows) requires separate owner decision per workflow
- Agent/skill budget enforcement mechanisms (TOA-271) are out of scope; this spec documents requirements only
- Figma Make bundler compatibility rules remain pre-existing constraints (guidelines-enforced)
- Supabase integration remains undeployed system artefact (per AGENTS.md protection)

---

## Verification Requirements

### 1. Migration Integrity

- ✅ All paths migrated: verify no broken consumers
- ✅ No data loss: all specification files, protected assets, archives preserved
- ✅ Generated artefacts validated: build passes, tests pass, links check out
- ✅ Configuration syntax: no YAML/JSON parsing errors
- ✅ Rollback plan documented: revert procedure if issues discovered

### 2. Application Behaviour

- ✅ `npm run dev` starts Vite dev server on current port
- ✅ `npm run build` produces production bundle in `dist/`
- ✅ `npm run journal:parse` generates journal JSON to `export/journal/`
- ✅ Journal links validate without errors
- ✅ Netlify build command succeeds: `npm run build`
- ✅ Deployed SPA renders and navigates correctly

### 3. Documentation & Workflow Safety

- ✅ AGENTS.md updated: reflects all configuration changes and command status
- ✅ CONTRIBUTING.md updated: guides on branch naming, PR templates, Spec Kit workflow
- ✅ README.md updated: documents npm-only, Node.js 24 requirement
- ✅ guidelines/* unchanged or minimally updated for clarity
- ✅ Workflow YAML syntax validated via `workflow-lint.yml`
- ✅ No locked-file modifications detected via `locked-files-guard.yml`

### 4. Test Discovery & Execution

- ✅ Jest config accepts ESM imports without transpile errors
- ✅ `npm run test:unit` passes (or documents expected 103/104 baseline)
- ✅ `npm run test:build` validates Vite build integrity
- ✅ `npm run test:e2e` structure valid (browser install optional for agents)
- ✅ Colocated unit tests discoverable alongside modules

### 5. Spec Kit Routing

- ✅ Feature directories created at `.github/specs/{NNN-feature}/`
- ✅ `.specify/feature.json` persists resolved path
- ✅ Sequential numbering auto-increments correctly
- ✅ Spec template resolution succeeds
- ✅ Create → plan → tasks regression testing passes (baseline 103/104)

### 6. CI/CD Validation

- ✅ Branch naming validation enforced: `npm run validate:branch-name`
- ✅ PR template routing works: branch prefix determines template
- ✅ CODEOWNERS file parsed correctly by GitHub; review requirements enforced
- ✅ Branch protection rules active on `main` and `develop`
- ✅ All implementation workflows pass: lint, tests, documentation, changelog
- ✅ Evaluation workflows run without errors (gating per owner decision)

---

## Source Register (27 References)

### Implementation Workflow References (8)

1. **lint.yml** — linting and formatting validation
2. **tests.yml** — unit, build, e2e test execution
3. **documentation.yml** — README, CONTRIBUTING.md validation
4. **workflow-lint.yml** — GitHub Actions YAML syntax validation
5. **branch-name-validation.yml** — branch naming convention enforcement
6. **changelog-unified.yml** — CHANGELOG format and protection validation
7. **labeling-unified.yml** — automatic PR label assignment
8. **pr-template-routing.yml** — PR template routing by branch type

### Evaluation Workflow References (6)

9. **validate-specifications.yml** — Spec Kit regression testing
10. **claude-guard-tests.yml** — AI-generated code quality validation
11. **locked-files-guard.yml** — protected file modification detection
12. **ruleset-drift.yml** — branch protection rule change detection
13. **ai-feedback-validation.yml** — AI agent feedback validation
14. **ai-feedback.yml** — agent feedback collection and reporting

### Deferred Workflow References (3)

15. **branch-validation-metrics-aggregator.yml** — metrics aggregation
16. **keep-pr-current.yml** — automatic PR rebase
17. **label-drift-check.yml** — label definition change detection

### Anthropic Platform References (7)

18. **Claude API — Messages** — agent message handling
19. **Claude API — Tool Use** — agent tool invocation
20. **Claude API — MCP Servers** — multi-protocol integration
21. **Claude API — Model Selection** — agent model choices
22. **Claude API — Streaming** — agent output streaming
23. **Claude API — Prompt Caching** — performance optimization
24. **Managed Agents** — server-hosted agent runtime

### Repository References (4)

25. **lightspeedwp/.github** — organization-wide governance (PR templates, issue templates, workflows, labels, CODEOWNERS)
26. **lightspeedwp/ThisOneTimeOnAcidCom PR #268** — current governance decisions PR ([github.com/.../pull/268](https://github.com/lightspeedwp/ThisOneTimeOnAcidCom/pull/268))
27. **github-spec-kit** — Spec Kit documentation and patterns

---

## Scope of Control & Approval Boundaries

### Owner (@ashley) Approval Required

- ✅ All 9 governance decisions (ratified 2026-10-17)
- ✅ CODEOWNERS file content (critical paths, delegation)
- ✅ Workflow enablement (evaluation/deferred workflows gated per decision)
- ✅ Agent budget limits (TOA-271 owned separately)
- ✅ Any exception to established rules

### Agent Authority (Within Approved Scope)

- ✅ Execute approved implementation workflows
- ✅ Create specs, plans, tasks (per Spec Kit process)
- ✅ Implement code changes, tests, documentation
- ✅ Validate against quality gates (deterministic checks only)
- ✅ Escalate unresolved questions to owner

### CI/CD Authority (Deterministic Validation)

- ✅ Branch naming validation
- ✅ File content syntax validation (YAML, JSON, Markdown)
- ✅ Locked-file protection
- ✅ Test execution
- ✅ Build validation

---

## Unresolved Questions

### Q1: Workflow Enablement Priority

**Context:** Evaluation workflows (validate-specs, claude-guard-tests, etc.) are defined but gating per workflow requires owner decision.  
**Question:** Which evaluation workflows should run by default on every PR? Which should be manual/opt-in?  
**Options:**  
- A: All evaluation workflows run by default (strictest)
- B: Only locked-files-guard runs; others are opt-in (pragmatic)
- C: Each workflow has separate owner decision (granular)  

### Q2: Agent Skill Inventory

**Context:** Baseline inspection found ~18 agents and ~5 skills; actual inventory may have changed.  
**Question:** Should the specification mandate a specific agent/skill set, or document current inventory with "subject to change" caveat?  
**Options:**  
- A: Mandate stable inventory in this spec (tightly controlled)
- B: Document current state; allow agents/skills to evolve per TOA-265 (flexible)  

### Q3: Budget Enforcement Mechanism

**Context:** TOA-271 owns budget controls; this spec documents requirements.  
**Question:** Should budget enforcement be runtime-based (host enforces), config-based (settings.json), or advisory (documentation only)?  
**Options:**  
- A: Host-side enforcement (hard limit)
- B: Config-based validation with warnings (soft limit)
- C: Advisory with escalation to owner on exhaustion (trust-based)  

---

## Clarifications

### Session 2026-10-17

- Q: Which evaluation workflows should run by default on every PR, and which should be manual or opt-in? → A: Option B: Only `locked-files-guard` runs by default; others are manual/opt-in (pragmatic approach protecting critical governance files without CI overhead)
- Q: Should the specification mandate a specific agent/skill set, or document current inventory as subject to change? → A: Option B: Document current baseline (~18 agents, ~5 skills) as inventory of Oct 2026; allow evolution per TOA-264/TOA-265 (flexible; reflects reality that agents and skills are active tooling)

---

## Success Criteria

1. **Completeness** — All 20 child issues mapped to 9 approved decisions; no orphaned issues
2. **Clarity** — Folder layout stable and documented; path consumers identified; no ambiguity
3. **Compliance** — All 9 decisions operationalized: npm-only verified, Node.js 24 pinned, Jest ESM enabled, BEM enforced, GitHub governance configured
4. **Determinism** — CI/CD validation workflows run unprivileged; protected files enforced; Spec Kit routing tested
5. **Adoptability** — Agents can create specs, plans, tasks without manual intervention; humans can follow CONTRIBUTING.md guidance
6. **Reversibility** — Rollback plan documented; no data loss; archives preserved

---

## Next Phase Gating

**This specification is ready for `/speckit-clarify` once:**

- ✅ Owner confirms all 9 decisions remain binding
- ⏳ Answers provided to 3 unresolved questions (Q1–Q3)
- ✅ No additional clarifications needed (max 3 per SpecKit rules)

**Proceed to `/speckit-plan` when:**

- ✅ Specification complete and clarified
- ✅ Acceptance criteria agreed
- ✅ Dependencies verified

---

## Document History

| Date | Version | Author | Status |
|------|---------|--------|--------|
| 2026-10-17 | 1.0 | Claude (speckit-specify) | Specification (pre-planning) |

---

**Author**: Claude Haiku 4.5  
**Spec Directory**: `.github/specs/001-repo-governance-layout-and-agentic-workflows/`  
**Last Updated**: 2026-10-17  
**Ready for**: `/speckit-clarify` or `/speckit-plan`
