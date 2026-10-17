# Specification Quality Checklist — TOA-241

**Feature**: Repository Governance Layout & Agentic Workflows  
**Specification**: `001-repo-governance-layout-and-agentic-workflows/spec.md`  
**Created**: 2026-10-17  
**Status**: Specification complete; ready for clarification phase  

---

## Specification Completeness

### Structure & Format
- [x] Specification uses installed template structure
- [x] Title, metadata, owner, status clearly stated at top
- [x] Outcomes & value section explains why this specification exists
- [x] Stakeholders and prioritised scenarios identified
- [x] Scope and exclusions documented with clear boundaries
- [x] Requirements organised into coherent categories (R1–R9)
- [x] Acceptance criteria defined for each major requirement
- [x] Approval boundaries and dependencies documented
- [x] Assumptions listed and validated
- [x] Success criteria measurable and testable

### Requirement Coverage

#### R1. Folder Layout & Path Conventions (6 requirements)
- [x] R1.1 — Current path inventory and classification
- [x] R1.2 — Spec Kit output routing (SPEC-001: `.github/specs/` canonical)
- [x] R1.3 — Documentation consolidation (docs/, guidelines/, CHANGELOG.md)
- [x] R1.4 — Test colocation with modules (TEST-001: Jest ESM via @swc/core)
- [x] R1.5 — Build and generated output paths (dist/, export/, coverage/)
- [x] R1.6 — Scripts at root `scripts/` (no `.github/scripts/`)

#### R2. Package Management (3 requirements)
- [x] R2.1 — npm-only enforcement (PKG-001 approved decision)
- [x] R2.2 — Lockfile sync and validation
- [x] R2.3 — pnpm artefact removal (pnpm-workspace.yaml, pnpm.overrides)

#### R3. Node.js Pinning (3 requirements)
- [x] R3.1 — Pin to Node.js 24 LTS (NODE-001 approved decision)
- [x] R3.2 — Add `.nvmrc` and `engines` field
- [x] R3.3 — Document in README and CI

#### R4. Testing Infrastructure (4 requirements)
- [x] R4.1 — Jest ESM configuration (TEST-001: @swc/core)
- [x] R4.2 — Accept speckit baseline 103/104 (TEST-002 approved decision)
- [x] R4.3 — Test discovery (unit, build, e2e, speckit)
- [x] R4.4 — Playwright and Bats integration

#### R5. GitHub Governance (5 requirements)
- [x] R5.1 — GitHub Discussions enable with templates (GH-001 approved decision)
- [x] R5.2 — PR templates (local, workflow-specific) (GH-002 approved decision)
- [x] R5.3 — Issue templates and taxonomy
- [x] R5.4 — CODEOWNERS and branch protection (GH-003 approved decision)
- [x] R5.5 — Saved replies and contributor setup

#### R6. CI/CD Workflows (4 requirements)
- [x] R6.1 — Implementation workflows (8 workflows documented)
- [x] R6.2 — Evaluation workflows (6 workflows documented)
- [x] R6.3 — Deferred workflows (3 workflows documented)
- [x] R6.4 — Deterministic quality gates (code, spec, config, branch validation)

#### R7. Agentic Workflows (4 requirements)
- [x] R7.1 — Agent definitions and skill inventory
- [x] R7.2 — Tool access and permissions per agent
- [x] R7.3 — Output routing and escalation
- [x] R7.4 — Budget controls (TOA-271 owns implementation detail)

#### R8. Styling Rules (2 requirements)
- [x] R8.1 — BEM-only enforcement (STYLE-001 approved decision)
- [x] R8.2 — Tailwind dependency removal

#### R9. Spec Kit Integration (2 requirements)
- [x] R9.1 — Feature directory routing and path resolution
- [x] R9.2 — Regression testing (create → plan → tasks pipeline)

### Child Issue Coverage (20 issues)

| Issue | Workstream | Mapped to Requirements | Status |
|-------|-----------|------------------------|--------|
| TOA-242 | Workstream: TOA-260 | R6.1–R6.4 | ✅ Covered |
| TOA-243 | Workstream: TOA-260 | R6.2 (evaluation) | ✅ Covered |
| TOA-244 | Workstream: TOA-260 | R6.2 (validation) | ✅ Covered |
| TOA-250 | Workstream: TOA-261 | R5.1 | ✅ Covered |
| TOA-251 | Workstream: TOA-261 | R5.3 | ✅ Covered |
| TOA-252 | Workstream: TOA-261 | R5.2 | ✅ Covered |
| TOA-253 | Workstream: TOA-261 | R5.5 | ✅ Covered |
| TOA-254 | Workstream: TOA-254 | R9.1–R9.2 | ✅ Covered |
| TOA-255 | Workstream: TOA-261 | R1.3 (planning docs) | ✅ Covered |
| TOA-256 | Workstream: TOA-261 | R1.3 (reports org) | ✅ Covered |
| TOA-257 | Workstream: TOA-261 | R1.3 (portable prompts) | ✅ Covered |
| TOA-258 | Workstream: TOA-262 | R1.6 (script placement) | ✅ Covered |
| TOA-259 | Workstream: TOA-261 | R1.3 (task trackers) | ✅ Covered |
| TOA-260 | Workstream: TOA-260 | R4.1–R4.4 | ✅ Covered |
| TOA-261 | Workstream: TOA-261 | R5.1–R5.5 | ✅ Covered |
| TOA-262 | Workstream: TOA-262 | R2.1–R2.3, R3.1–R3.3, R8.1–R8.2 | ✅ Covered |
| TOA-271 | Workstream: standalone | R7.4 (budget req) | ✅ Covered |
| TOA-272 | Workstream: TOA-260 | R6.4 (branch validation) | ✅ Covered |
| TOA-273 | Workstream: TOA-260 | R6.4 (changelog validation) | ✅ Covered |
| TOA-274 | Workstream: TOA-260 | R6.3–R6.4 (labeling) | ✅ Covered |

**All 20 child issues mapped to 1+ requirements. Coverage complete.**

### Approved Decisions Integration

| Decision ID | Decision | Status | Requirement(s) |
|---|---|---|---|
| SPEC-001 | `.github/specs/` canonical | Approved 17 Oct 2026 | R1.2, R9.1 |
| TEST-001 | Jest ESM with @swc/core | Approved 17 Oct 2026 | R4.1 |
| TEST-002 | Accept 103/104 baseline | Approved 17 Oct 2026 | R4.2 |
| GH-001 | GitHub Discussions enabled | Approved 17 Oct 2026 | R5.1 |
| GH-002 | Local PR templates | Approved 17 Oct 2026 | R5.2 |
| GH-003 | CODEOWNERS + protection | Approved 17 Oct 2026 | R5.4 |
| PKG-001 | npm-only | Approved 17 Oct 2026 | R2.1–R2.3 |
| NODE-001 | Pin Node.js 24 | Approved 17 Oct 2026 | R3.1–R3.3 |
| STYLE-001 | BEM-only | Approved 17 Oct 2026 | R8.1–R8.2 |

**All 9 decisions incorporated with explicit requirement mapping.**

### Source References (27 total)

#### Implementation Workflows (8)
- [x] lint.yml — code quality gates
- [x] tests.yml — test execution
- [x] documentation.yml — doc validation
- [x] workflow-lint.yml — workflow syntax validation
- [x] branch-name-validation.yml — branch naming checks
- [x] changelog-unified.yml — changelog validation
- [x] labeling-unified.yml — PR routing labels
- [x] pr-template-routing.yml — template assignment by branch

#### Evaluation Workflows (6)
- [x] validate-specifications.yml — spec syntax/content
- [x] claude-guard-tests.yml — AI-driven test quality
- [x] locked-files-guard.yml — protected file detection
- [x] ruleset-drift.yml — config consistency
- [x] ai-feedback-validation.yml — output quality gates
- [x] ai-feedback.yml — feedback collection

#### Deferred Workflows (3)
- [x] branch-validation-metrics-aggregator.yml — metrics collection
- [x] keep-pr-current.yml — base branch sync
- [x] label-drift-check.yml — label taxonomy audit

#### Anthropic Platforms (7)
- [x] Claude API (Messages)
- [x] Claude API Tool Runner
- [x] Managed Agents
- [x] Prompt Caching
- [x] Tool Use Interface
- [x] Artifact / Database APIs
- [x] MCP (Model Context Protocol)

#### Repositories (3)
- [x] lightspeedwp/ThisOneTimeOnAcidCom (primary)
- [x] lightspeedwp/.github (org control plane)
- [x] anthropics/github-spec-kit (reference)

**All 27 references preserved with disposition and requirement mapping.**

---

## Unresolved Questions (Blocking Clarification Phase)

### Q1. Workflow Enablement Priority
**Question**: Which workflows should run by default (implementation vs. evaluation vs. deferred)?

**Impact**: Determines PR template routing, CI duration, cost, and escalation paths  
**Owner decision required**: Which workflows are mandatory, optional, or future-only?  
**Blocks**: R6.1–R6.4 implementation decisions  

### Q2. Agent & Skill Inventory Status
**Question**: Are all 18+ agents and 5+ skills from the earlier inspection still active, or has the inventory changed?

**Impact**: Defines available automation, permissions, escalation, and concurrent execution  
**Owner decision required**: Confirm current agent/skill definitions and any removals/additions  
**Blocks**: R7.1–R7.3 (tool definitions) and R7.4 (budget coverage)  

### Q3. Budget Enforcement Mechanism (TOA-271)
**Question**: What is the actual runtime/host-side enforcement point for agent/skill budgets?

**Impact**: Determines whether budgets are advisory (markdown guidance) or enforceable (host enforcement)  
**Owner decision required**: Budget enforcement location, scope, retries, cancellation policy, fallback  
**Blocks**: R7.4 (budget requirement specification)  

---

## Verification Requirements

### Migration Integrity
- [ ] Path consumers identified and updated in workflows, agents, documentation
- [ ] Conditional migrations preserve content, archives, protected files
- [ ] Verification and rollback procedure documented for each major move
- [ ] Managed integrations (.specify/, .gemini/) remain functional post-migration

### Application Behaviour
- [ ] `npm run build` succeeds without errors or warnings post-migration
- [ ] `npm run dev` starts Vite dev server and serves app on localhost
- [ ] All routes serve correct pages; SPA fallback works
- [ ] Book content (journal entries, articles) displays correctly
- [ ] No image imports broken; no Figma asset references lost
- [ ] No Supabase integration exposed or activated

### Documentation
- [ ] AGENTS.md updated with resolved decisions (Node.js version, package manager, Tailwind)
- [ ] CONTRIBUTING.md reflects new PR template routing and branch naming
- [ ] README.md documents npm-only setup and Node.js 24 requirement
- [ ] Guidelines remain read-only and Figma-Make-compatible

### Test Discovery
- [ ] `npm run test:unit` runs Jest with ESM support; all tests discovered
- [ ] `npm run test:build` runs Bats build verification
- [ ] `npm run test:e2e` discovers Playwright tests
- [ ] `node --test tests/speckit.test.mjs` reports 103/104 baseline
- [ ] All test runners report clear pass/fail status

### Spec Kit Routing
- [ ] Feature directories created at `.github/specs/{NNN-feature}/` following sequence
- [ ] `spec.md`, `plan.md`, `tasks.md` pipeline works end-to-end
- [ ] Regression test confirms create → plan → tasks progression
- [ ] No new specs created at root; no duplicate numbering

### CI-CD Stability
- [ ] Implementation workflows (8) run correctly; PR templates route by branch
- [ ] Evaluation workflows (6) validate specs, configs, locked files without false positives
- [ ] Deferred workflows remain disabled until owner enables
- [ ] Branch protection enforced on main and develop; CODEOWNERS file active
- [ ] All workflow syntax valid; no GitHub Actions parsing errors

---

## Approval & Sign-Off

**Specification Created**: 2026-10-17  
**Owner Approval**: [ ] @ashley (pending)  
**Clarification Phase**: [ ] Complete (blocks planning)  
**Planning Phase**: [ ] Ready (after clarification approval)  

---

## Next Steps

1. **Clarification Phase** (`/speckit-clarify`) — Address Q1, Q2, Q3 with owner
2. **Planning Phase** (`/speckit-plan`) — Generate implementation plan and research
3. **Task Decomposition** (`/speckit-tasks`) — Break planning into actionable tasks
4. **Implementation PRs** — Create focused PRs for 5 workstreams (TOA-254, TOA-260, TOA-261, TOA-262, and TOA-271 dependencies)

**No implementation changes should proceed until clarification phase is complete and all unresolved questions are resolved.**
