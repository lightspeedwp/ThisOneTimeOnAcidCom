<!-- SYNC IMPACT REPORT
Version change: [unfilled template] → 1.0.0 (MAJOR: first ratified constitution)
Modified principles: N/A (initial ratification of 5 core principles)
Added sections: Governance Amendment Procedure
Removed sections: None
Follow-up TODOs: Node.js 24 pinning confirmation (approved in TOA-241, implementation pending)
-->

# ThisOneTimeOnAcidCom Constitution

**Effective Date**: 2026-10-17 | **Status**: Ratified by Owner (@ashley)

## Purpose

This constitution establishes the governance framework, development principles and critical safeguards for ThisOneTimeOnAcidCom (a React/TypeScript/Vite book application with static mock data, hosted on Netlify).

The constitution is authoritative. All development practices, Spec Kit workflows, CI/CD decisions and operational constraints derive from these principles. When this document and other guidance conflict, this document prevails.

---

## Core Principles

### I. Specification-First Development (Spec Kit)

All feature work follows the specification-first process using Spec Kit:
- **Requirement**: Every feature, governance change and significant fix must begin with a written specification in `.github/specs/{NNN-feature}/spec.md`
- **Workflow**: Specification → Clarification → Planning → Task Decomposition → Implementation
- **Authority**: Specifications document user needs, acceptance criteria, decisions and verification requirements BEFORE implementation starts
- **Output**: Specifications produce plan.md, research.md, data-model.md, contracts/ and tasks.md as approved design artifacts
- **Regression Testing**: Spec Kit feature creation and the create→plan→tasks pipeline must be regression-tested for every new feature number

### II. Repository Governance & Configuration Management

Repository governance is centrally managed and layered:
- **Spec Kit Configuration**: All feature specifications route to `.github/specs/{NNN-feature}/` (SPEC-001 decision, TOA-241)
- **CI/CD Workflows**: 8 implementation workflows, 6 evaluation workflows, 3 deferred workflows live in `.github/workflows/` (centrally managed by dependency-merge-controller)
- **Protected Files**: CHANGELOG.md, ATTRIBUTIONS.md, guidelines/, Supabase utils, .github/workflows/* are read-only system artifacts
- **Metadata**: GitHub issue types, labels (with family prefixes: type:, status:, area:, meta:), PR templates and Discussion categories are canonical in `.github/` org control plane

### III. Bundler Compatibility (Figma Make Non-Negotiable)

All code must remain compatible with the Figma Make bundler—no exceptions without owner sign-off:
- **Forbidden syntax** (never use): Optional chaining (`?.`), nullish coalescing (`??`), `import.meta.env`, nested ternaries, `for...of` loops
- **Required patterns**: Use explicit null checks, if/else conditionals, classic `for` loops, helpers in `src/app/lib/router.tsx` (grab, arrayGet, setProp)
- **Impact**: Guidelines.md bundler rules are enforced at code-review time; violations block merge
- **Rationale**: Figma Make is the primary export target; compatibility ensures asset integration and editorial workflows remain unblocked

### IV. Protected Content & Data Rules

Content architecture separates UI configuration from editorial material:
- **Mock Data Authority**: All UI strings, navigation labels, page metadata and component configuration come from `src/app/data/mock/` (centralised data layer)
- **No Hardcoded Content**: Zero hardcoded UI strings or labels; all derive from mock data objects
- **Editorial Content**: Book chapters, journal entries, articles and manuscript content live in `content/` (separated from application code)
- **Image Protection**: Never replace existing `figma:asset/` imports or logo files; use `ImageWithFallback.tsx` for new images
- **Supabase Non-Use**: `src/app/utils/supabase/` is a system artifact—never import from it, never suggest integration

### V. Styling Discipline (BEM-Only CSS)

All styling follows BEM (Block, Element, Modifier) convention; Tailwind utilities are prohibited:
- **Required**: Write styles as semantic BEM blocks in `src/styles/blocks/` (one file per block)
- **Prohibited**: No Tailwind utility classes; no inline `className` concatenations mixing utilities
- **Figma Sync**: BEM components align with Figma design system; utilities break the synchronization
- **Rationale**: BEM ensures component modularity, design consistency and ease of Figma asset updates (STYLE-001 decision, TOA-241)

### VI. Package Management & Runtime Pinning

Development and deployment environments are deterministic:
- **Package Manager**: npm-only (lockfile: `package-lock.json`); no pnpm or yarn (PKG-001 decision, TOA-241)
- **Dependency Validation**: CI enforces consistency between package.json and package-lock.json
- **Node.js Runtime**: Pin to Node.js 24 LTS via .nvmrc, engines field and README documentation (NODE-001 decision, TOA-241; approved 2026-10-17, implementation in progress)
- **CI/CD Guarantee**: Testing, build and validation workflows use pinned Node version to ensure reproducibility

### VII. Testing Infrastructure & Verification

All changes are validated through layered testing:
- **Jest ESM**: Unit tests use Jest with @swc/core transpiler (TEST-001 decision, TOA-241)
- **Bats Shell Tests**: Build verification and shell script testing via Bats
- **Playwright E2E**: End-to-end tests using Playwright browser automation
- **Spec Kit Regression**: Feature specification tests (Speckit) must maintain baseline (103/104 tests, TEST-002 decision, TOA-241)
- **CI Gating**: All implementation workflows (lint, tests, documentation, branch validation, changelog) must pass before PR merge

---

## Governance Rules & Amendment Procedure

### Constitution Authority

This constitution supersedes all other guidance when conflicts arise. Other documents (AGENTS.md, guidelines/, CONTRIBUTING.md) provide runtime implementation detail but defer to constitutional principles.

### Amendment Process

**Ratification Requirement**: All amendments to this constitution must be:
1. Documented with explicit rationale (why the change, what principle is affected)
2. Recorded as a separate Spec Kit issue (e.g., TOA-xxx) with clarification and planning phases
3. Approved by owner (@ashley) before implementation
4. Committed with a dated amendment entry below

**Version Bumping**: Follow semantic versioning:
- **MAJOR** (1.0.0 → 2.0.0): Backward-incompatible principle removal, redefinition or critical safeguard change
- **MINOR** (1.0.0 → 1.1.0): New principle, section expansion, or material guidance addition
- **PATCH** (1.0.0 → 1.0.1): Clarifications, wording refinements, non-semantic corrections

### Compliance Review

- **Quarterly Gate**: Every 3 months, owner reviews this constitution against actual repository state (AGENTS.md unresolved decisions, guidelines/ accuracy, TOA-241 decisions implementation status)
- **Spec Kit Validation**: Every specification must be verified against this constitution's principles before implementation begins
- **CI/CD Enforcement**: Protected files and bundler rules are enforced in GitHub Actions workflows; violations surface as CI failures

### Guidance Files

Development guidance that implements these principles lives in:
- `guidelines/Guidelines.md` — Core development rules and workflow
- `guidelines/ARCHITECTURE.md` — Component taxonomy
- `guidelines/css-architecture.md` — BEM implementation
- `AGENTS.md` — Repository-specific AI agent instructions
- `CONTRIBUTING.md` — Human contributor workflow

These files are normative. When they conflict with this constitution, update this constitution. When they conflict with each other, AGENTS.md → guidelines/ (AGENTS.md wins).

---

## Amendment History

| Version | Date | Amendment | Approved By |
|---------|------|-----------|-------------|
| 1.0.0 | 2026-10-17 | Initial ratification: 7 core principles, Spec Kit workflow, bundler safeguards, governance rules. Basis: TOA-241 (Repository Governance) and established repository practices from AGENTS.md, guidelines/, CONTRIBUTING.md. | @ashley (pending) |

---

**Version**: 1.0.0 | **Ratified**: 2026-10-17 | **Last Amended**: 2026-10-17
