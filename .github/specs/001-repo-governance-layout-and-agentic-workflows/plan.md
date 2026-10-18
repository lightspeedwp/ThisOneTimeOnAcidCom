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
.github/specs/[###-feature]/
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
├── .nvmrc                  # Node.js 24 pin (existing, verify)
├── package.json            # engines field + npm-only (UPDATE)
├── .gitattributes          # text=auto first (existing, preserve)
├── CHANGELOG.md            # (existing, protect)
└── AGENTS.md, CONTRIBUTING.md, guidelines/ (existing, protect)

scripts/                     # Build/validation scripts (existing, keep at root)
tests/                       # Test files (colocate with modules or dedicated)
src/, content/, public/, etc. (application source, preserved unchanged)
```

**Structure Decision**: Repository-local configuration (`.github/`, `.specify/`, `.claude/`) plus root scripts remain as-is. Five workstreams will update specific files (workflows, templates, Spec Kit paths, agent specs) without moving existing application code or breaking protected contracts.

## Implementation Progress & Merge Strategy (Updated 2026-10-18)

**Current Status**: Three overlapping PRs identified for Spec 001, all in-flight and targeting different branches.

### Active PRs

| PR | Branch | Base | Status | Content | Merge Blocker |
|---|---|---|---|---|---|
| #301 | `feat/governance-decisions-implement` | `develop` | ⏳ Open (not draft) | Foundation: CODEOWNERS, branch protection, Node.js pinning, Jest ESM fix, Tailwind removal | **Merge conflicts** + acceptance criteria unchecked |
| #318 | `claude/cool-keller-y1ebyr` | `main` | ❌ DRAFT, **WRONG BASE** | Phase 1 workflows (8 workflows, 39,080 additions) | Targets `main` instead of `develop`; superseded by #319 |
| #319 | `feat/phase1-governance-workflows` | `develop` | ⏳ DRAFT | Phase 1 workflows (8 workflows, 1,919 additions) + lefthook | **9 workflow implementation errors** (see below) |

### Recommended Merge Sequence

**CRITICAL GATE: PR #319 Workflow Error Resolution (REQUIRED BEFORE MERGE)**

All 9 workflow errors in PR #319 MUST be fixed and CI MUST be green before merging to develop. This is a blocking prerequisite for Phase 1 completion. Failing to resolve these errors will break CI for all subsequent PRs.

**Step 1: Fix all 9 workflow errors in PR #319**
- See "Phase 1 Workflow Implementation Errors" table below
- Apply all corrections (HIGH/CRITICAL severity first)
- Re-run CI until all checks pass (green)
- Commit fixes to PR #319 branch

**Step 2: Merge PR #301 to develop** (Foundation layer)
- Only after PR #319 is green
- Resolve merge conflicts first
- Verify acceptance criteria met (CODEOWNERS identity, branch protection manually configured)
- Provides: CODEOWNERS, branch protection config, Node.js 24 pinning, Jest ESM fix, Tailwind removal

**Step 3: Merge PR #319 to develop** (Phase 1 workflows)
- All 9 workflow errors resolved ✅
- CI is green ✅
- Provides: 8 Phase 1 governance workflows

**Step 4: Close PR #318 as duplicate**
- Do NOT merge to main
- #319 provides equivalent implementation with correct base branch

### Phase 1 Workflow Implementation Errors (PR #319)

The 9 Phase 1 workflows require corrections before CI passes:

| Workflow | Error | Severity | Fix |
|----------|-------|----------|-----|
| `lint.yml` | `\|\| true` contradicts `continue-on-error: true` | **HIGH** | Remove `\|\| true` operators; let `continue-on-error` handle flow control |
| `tests.yml` | `continue-on-error: true` suppresses Jest/Playwright failures | **CRITICAL** | Remove `continue-on-error` from Jest and browser-install steps |
| `documentation.yml` | References missing npm scripts (`lint:md`, `validate:frontmatter`) | **HIGH** | Verify scripts exist in package.json OR replace with direct commands |
| `workflow-lint.yml` | Python YAML validation assumes PyYAML installed | **HIGH** | Add `python3 -m pip install pyyaml` before validation |
| `branch-name-validation.yml` | Unclear exit code/output coordination | **MEDIUM** | Verify script exits with code 1 on invalid names, code 0 on valid |
| `locked-files-guard.yml` | Silent failure on git diff (no error checking) | **CRITICAL** | Add error check before using git diff output |
| `changelog-unified.yml` | Git diff may fail on shallow clones | **MEDIUM** | Add `fetch-depth: 0` to checkout; add error handling |
| `labeling-unified.yml` | No rate limiting on API calls | **MEDIUM** | Add error handling for API 403/404 responses |
| `pr-template-routing.yml` | No validation that template file exists | **LOW** | Add file existence check before routing |

### Repository Structure Cleanup

After PRs merge:
- **Delete** `.github/labels.yml` (canonical file in lightspeedwp/.github repo only)
- **Verify** issue/PR templates source from lightspeedwp/.github repo
- **Confirm** org-wide config files maintained centrally

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| [e.g., 4th project] | [current need] | [why 3 projects insufficient] |
| [e.g., Repository pattern] | [specific problem] | [why direct DB access insufficient] |
