# Implementation Plan: Repository Governance Layout & Agentic Workflows

**Branch**: `epic/repo-governance-toa-241` | **Date**: 2026-10-17 | **Spec**: `.github/specs/001-repo-governance-layout-and-agentic-workflows/spec.md`

**Input**: Feature specification from `.github/specs/001-repo-governance-layout-and-agentic-workflows/spec.md`

**Note**: This plan covers governance infrastructure (folder layout, CI/CD workflows, agent specifications, configuration) across 20 child issues and 5 workstreams.

## Summary

**Primary Requirement**: Establish a maintainable repository governance system for ThisOneTimeOnAcidCom that formalises folder layout, enables deterministic CI/CD validation, supports agentic workflows with clear budgets and permissions, and integrates approved decisions (9 ratified).

**Technical Approach**: Five parallel workstreams (TOA-254, TOA-260, TOA-261, TOA-262, TOA-271) implement: Spec Kit routing (spec → plan → tasks), testing infrastructure (Jest ESM, Bats, Playwright), GitHub governance (Discussions, PR templates, CODEOWNERS), repository-root configuration (npm-only, Node.js 24, BEM-only CSS), and agent budget controls. All decisions pre-approved; research validates technical feasibility and integration points.

## Technical Context

**Governance Domain**: Repository layout, CI/CD validation, agent/skill specifications, configuration management

**Configuration Management**: GitHub Actions workflows, Spec Kit templates, branch protection rules, CODEOWNERS, labels, issue types

**Package Manager**: npm v11.19.0 (npm-only, pnpm artefacts removed)

**Runtime**: Node.js 24 LTS (pinned via .nvmrc, engines field, README)

**Test Infrastructure**: Jest ESM (@swc/core), Bats (shell tests), Playwright (e2e), Speckit (103/104 baseline)

**Build System**: Vite 6 (React/TypeScript SPA); ESLint, Prettier, Markdownlint for validation

**CI/CD Platform**: GitHub Actions (implementation: 8 workflows, evaluation: 6 workflows, deferred: 3 workflows)

**Styling**: BEM-only CSS (Tailwind removed); Figma Make compatibility required

**Agent Tooling**: ~18 agents, ~5 skills in `.claude/` (inventory per TOA-264/265); Spec Kit CLI with Gemini and Claude modes

**Constraints**: Must preserve application behaviour (SPA, Netlify deployment), book content integrity, protected files (CHANGELOG.md, ATTRIBUTIONS.md, Supabase utils, Figma assets, .github/workflows), Figma Make bundler compatibility

**Scale**: 20 child issues, 5 workstreams, 27 source references (17 workflows, 7 Anthropic platforms, 3 repos)

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

**Status**: Constitution template unfilled (`.specify/memory/constitution.md` is blank template). Using repository's documented governance practices (AGENTS.md, guidelines/, CONTRIBUTING.md) as ground truth.

**Applicable Gates**:
- ✅ **Spec Kit Compliance**: Specification template followed; all 9 decisions documented and ratified
- ✅ **Clarity & Completeness**: All 20 child issues mapped to 5 workstreams; no orphaned issues
- ✅ **Protected Files**: .github/workflows, CHANGELOG.md, ATTRIBUTIONS.md, guidelines/ marked as protected; no breaking changes
- ✅ **Figma Make Compatibility**: Bundler constraints documented (no optional chaining, nullish coalescing, optional chaining, nested ternaries, for-of loops); guidelines locked
- ✅ **Testing Infrastructure**: Jest ESM, Bats, Playwright integration paths clear; 103/104 baseline approved
- ✅ **Reversibility**: Migration paths documented; rollback procedures for path moves and workflow changes defined
- ✅ **Repository Behaviour**: SPA build, Netlify deployment, book content integrity, Supabase protection all preserved

**Re-Evaluation**: After Phase 1 design, verify implementation PRs don't violate protected-file contracts or testing baselines.

## Project Structure

### Documentation (this feature)

```text
specs/[###-feature]/
├── plan.md              # This file (/speckit.plan command output)
├── research.md          # Phase 0 output (/speckit.plan command)
├── data-model.md        # Phase 1 output (/speckit.plan command)
├── quickstart.md        # Phase 1 output (/speckit.plan command)
├── contracts/           # Phase 1 output (/speckit.plan command)
└── tasks.md             # Phase 2 output (/speckit.tasks command - NOT created by /speckit.plan)
```

### Governance Artefacts & Configuration (repository + .github control plane)

**Specification & Planning Documentation**:
```text
.github/specs/001-repo-governance-layout-and-agentic-workflows/
├── spec.md                 # Requirements (9 decision-backed categories)
├── plan.md                 # This file (design strategy and research agenda)
├── research.md             # Phase 0: Technical validation & integration analysis
├── data-model.md           # Phase 1: Entity/configuration model
├── contracts/              # Phase 1: Interface contracts (CI/CD, agent specs)
├── quickstart.md           # Phase 1: Validation runbook
├── tasks.md                # Phase 2: Actionable task decomposition
└── checklists/
    └── requirements.md     # QA checklist (20 issues, 28 requirements)
```

**Implementation Targets** (existing paths to configure/migrate):
```text
.github/
├── workflows/              # 17 workflows (8 impl + 6 eval + 3 deferred)
├── CODEOWNERS              # Branch protection mapping (CREATE)
├── labels.yml              # Canonical label definitions (existing, validate)
├── issue-types.yml         # Issue type taxonomy (existing, validate)
├── ISSUE_TEMPLATE/         # Issue templates (existing, validate inheritance)
├── PULL_REQUEST_TEMPLATE/  # PR templates (existing, validate routing)
├── DISCUSSION_TEMPLATE/    # Discussion templates (CREATE)
├── instructions/           # Portable instruction files (existing, validate)
└── specs/                  # Spec Kit output (established, verify routing)

.specify/                   # Spec Kit configuration (existing, verify paths)
.gemini/commands/           # Gemini CLI Spec Kit (existing, verify)
.claude/
├── agents/                 # Agent specifications (~18 agents)
└── skills/                 # Skill definitions (~5 skills)

Root configuration:
├── .nvmrc                  # Node.js 24 pin (CREATE)
├── package.json            # engines field + npm-only (UPDATE)
├── .gitattributes          # text=auto first (existing, preserve)
├── CHANGELOG.md            # (existing, protect)
└── AGENTS.md, CONTRIBUTING.md, guidelines/ (existing, protect)

scripts/                     # Build/validation scripts (existing, keep at root)
tests/                       # Test files (colocate with modules or dedicated)
src/, content/, public/, etc. (application source, preserved unchanged)
```

**Structure Decision**: Repository-local configuration (`.github/`, `.specify/`, `.claude/`) plus root scripts remain as-is. Five workstreams will update specific files (workflows, templates, Spec Kit paths, agent specs) without moving existing application code or breaking protected contracts.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| [e.g., 4th project] | [current need] | [why 3 projects insufficient] |
| [e.g., Repository pattern] | [specific problem] | [why direct DB access insufficient] |
