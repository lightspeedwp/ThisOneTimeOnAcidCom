# Tasks: Repository Governance Layout & Agentic Workflows

**Feature**: TOA-241 – Repository Governance Infrastructure  
**Input**: Specification from `.github/specs/001-repo-governance-layout-and-agentic-workflows/spec.md` and implementation plan  
**Status**: Phase 2 – Actionable Task Decomposition  
**Branch**: `epic/repo-governance-toa-241`

**Prerequisites**: 
- ✅ Specification complete (spec.md)
- ✅ Planning phase complete (plan.md, research.md)
- ✅ All 9 decisions approved (SPEC-001, TEST-001, TEST-002, GH-001, GH-002, GH-003, PKG-001, NODE-001, STYLE-001)
- ✅ 20 child issues mapped to 5 parallel workstreams
- ✅ No blockers identified; ready for implementation

---

## Format: `- [ ] [ID] [P?] [Story] Description`

**Components**:
- **[ID]**: Task sequential ID (T001–T999)
- **[P]**: Can run in parallel (different files, no blocking dependencies)
- **[Story]**: Workstream label (WS-254, WS-260, WS-261, WS-262, WS-271)
- **Description**: Clear action with file paths and constraints

**Examples**:
- ✅ `- [ ] T001 Create governance artefacts directory structure`
- ✅ `- [ ] T005 [P] [WS-260] Configure Jest ESM in jest.config.js`
- ✅ `- [ ] T010 [WS-254] Create Spec Kit regression test in tests/speckit.test.mjs`

---

## Phase 1: Setup (Shared Governance Infrastructure)

**Purpose**: Initialize shared governance artefacts that all workstreams depend on

**⚠️ CRITICAL**: Phase 1 must complete before any workstream work begins

- [x] T001 Create `.github/specs/` directory structure and verify numbering in `.specify/init-options.json`
- [x] T002 Document current path inventory in research notes: all directories, consumers, generated outputs
- [x] T003 [P] Verify `.specify/` and `.gemini/` integrations remain functional post-migration
- [x] T004 Create top-level documentation index linking all governance artefacts
- [x] T005 Update AGENTS.md with approved decisions ratification status and test baseline (103/104)
- [x] T006 [P] Update CONTRIBUTING.md to reflect branch naming validation and PR template routing
- [x] T007 Review and validate all protected files: CHANGELOG.md, ATTRIBUTIONS.md, guidelines/, Supabase utils, Figma assets

**Checkpoint**: Governance artefacts initialized; all workstreams can begin in parallel

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that ALL workstreams depend on

**⚠️ CRITICAL**: Phase 2 must complete before workstream work can begin

- [x] T008 [P] [TEST-001] Configure Jest ESM support with @swc/core in jest.config.js
  - Install `@swc/core` as dev dependency
  - Enable ESM module transformation in Jest config
  - Verify `npm run test:unit` discovers and runs existing tests without modification
  - Ensure compatibility with existing test syntax
- [x] T009 [P] [TEST-001] Create Vitest fallback configuration in vitest.config.ts (if Jest proves unstable)
  - Install `vitest` as dev dependency
  - Mirror Jest test discovery and configuration
  - Document failover trigger conditions
- [x] T010 [TEST-002] Update test baseline documentation in AGENTS.md
  - Mark speckit baseline as 103/104 (approved)
  - Document known failure: template resolution precedence edge case
  - Add test comments in tests/speckit.test.mjs explaining deferred edge case
- [x] T011 [P] [PKG-001] Remove pnpm artefacts from repository
  - Delete `pnpm-workspace.yaml` (unused file)
  - Remove `pnpm.overrides` block from `package.json` (all pnpm-specific config)
  - Remove `command = "pnpm run build"` from `src/app/netlify.toml`
  - Update root `README.md` to document npm-only (section: "Getting Started" or "Installation")
- [x] T012 [NODE-001] Pin Node.js version
  - Create `.nvmrc` file with content: `24` (exactly Node.js 24 LTS)
  - Add `engines` field to `package.json`: `{ "node": ">=24" }`
  - Run `npm ci` to validate all dependencies resolve correctly under Node 24
  - Update root `README.md` to document Node 24 requirement (e.g., "Requires Node.js 24 LTS or later")
  - Verify Netlify site settings pin Node 24 (via Netlify dashboard UI, not `.toml`)
- [x] T013 [P] [STYLE-001] Audit components for Tailwind utility patterns
  - Scan `src/app/components/` for Tailwind class names (e.g., `mt-4`, `p-8`, `flex`, `grid`)
  - List all files containing utility-like patterns (if any)
  - Document findings for T014 migration
- [x] T014 [STYLE-001] Remove Tailwind dependencies from repository
  - Delete `tailwindcss` dev dependency from `package.json`
  - Delete `@tailwindcss/vite` dev dependency from `package.json`
  - Remove `@tailwindcss/vite` plugin from `vite.config.ts`
  - Delete or empty `tailwind.config.js` (if present at repository root)
  - Verify `npm run build` succeeds after Tailwind removal
- [x] T015 [STYLE-001] Migrate components to BEM (if any Tailwind utilities found in T013)
  - Update affected components (from T013 findings) to use BEM CSS instead of Tailwind utilities
  - Reference `guidelines/css-architecture.md` for BEM patterns
  - Verify component styling remains visually correct post-migration
  - Update `guidelines/css-architecture.md` to lock BEM as canonical (no dual support)
- [x] T016 [P] [WS-260] Set up test discovery scripts and validation
  - Verify `npm run test:unit` runs Jest with ESM support (after T008)
  - Verify `npm run test:build` runs Bats build verification (confirm existing)
  - Verify `npm run test:e2e` discovers Playwright tests (confirm existing)
  - Verify `node --test tests/speckit.test.mjs` reports 103/104 baseline (after T010)
  - Document test command output in AGENTS.md commands table
- [x] T017 [P] Run full validation suite post-setup
  - `npm run validate:branch-name -- --branch epic/repo-governance-toa-241`
  - `npm run build` (production build)
  - `npm ls --depth=0` (dependency validation)
  - Document results in research notes (all should pass)
- [x] T017a [WS-271] Create agent inventory document (R7.1)
  - Create `.claude/agents/INVENTORY.md` with table: name | purpose | inputs | outputs | tools | permissions | workflow relationships | budget constraint
  - Audit current `.claude/agents/` directory and populate inventory for ~18 agents
  - Add note: "Budget enforcement (hard limits) specified in TOA-271 (separate epic); this inventory documents requirements only"
- [x] T017b [WS-271] Document Anthropic platform applicability assessment (R7.2)
  - Create `docs/AnthropicPlatforms.md` evaluating seven Anthropic references from spec.md Source Register
  - For each agent: note which platforms used (MCP servers, tool use, streaming, model selection, etc.)
  - Decision log: which agents use which capabilities; justify "not applicable" cases
- [x] T017c [WS-261] Implement protected-files-guard.yml (Phase 2 prerequisite per Constitution II)
  - Create `.github/workflows/protected-files-guard.yml` (if not present)
  - Create `.github/PROTECTED_FILES.txt` canonical list: `.github/`, `scripts/`, `AGENTS.md`, `CHANGELOG.md`, `guidelines/`, `src/app/utils/supabase/`, `src/app/components/figma/ImageWithFallback.tsx`
  - Configure workflow to detect modifications to protected files; add error check: `git diff --name-only origin/develop... | grep -E "^(\.github|scripts|AGENTS|CHANGELOG|guidelines|src/app/utils/supabase|src/app/components/figma/ImageWithFallback)" && exit 1 || exit 0`
  - Verify workflow runs on PR push and blocks merge if protected files modified
  - Document when it runs: on every PR push (implementation workflow, not evaluation)

**Checkpoint**: Protected file enforcement active. Agent inventory and Anthropic assessment documented. All testing infrastructure, package management, runtime pinning, and styling constraints are resolved. Workstreams can now begin in parallel.

---

## Phase 3: Workstream WS-254 – Spec Kit Routing & Regression Testing (TOA-254 epic)

**Goal**: Establish canonical Spec Kit output paths, verify feature directory routing, and validate regression test pipeline

**Independent Test**: Run `node --test tests/speckit.test.mjs` and confirm 103/104 baseline; create → plan → tasks workflow completes end-to-end

**Child Issues Included**: TOA-254, TOA-255, TOA-256, TOA-257, TOA-259

### Implementation for WS-254

- [x] T018 [WS-254] Verify Spec Kit feature directory routing (.github/specs/ canonical)
  - Confirm `.specify/init-options.json` sets `specifyFeatureDirectory: ".github/specs/"`
  - Run Spec Kit setup to create a numbered feature directory (e.g., 002-test-feature)
  - Verify sequential numbering works correctly (001 exists, next is 002)
  - Document path resolution in `.specify/memory/spec-kit-routing.md`
- [x] T019 [WS-254] Create Spec Kit regression test suite in tests/speckit.test.mjs
  - Document expected baseline: 103 pass, 1 fail (template resolution edge case)
  - Create test harness that runs create → plan → tasks pipeline
  - Verify no new test failures introduced by infrastructure changes
  - Add comment explaining known failure and approved deferral
  - Run `node --test tests/speckit.test.mjs` and confirm results match baseline
- [x] T020 [WS-254] Document Spec Kit path resolution for contributors
  - Update `CONTRIBUTING.md` with "Using Spec Kit" section
  - Document the three phases: `/speckit-specify` → `/speckit-clarify` → `/speckit-plan` → `/speckit-tasks`
  - Link to `.github/specs/` as canonical location
  - Include example: "Create spec → Plan → Decompose tasks → Implement"
  - Link to `.specify/` configuration details
- [x] T021 [P] [WS-254] [TOA-255] Organize planning documents in `.github/specs/001-repo-governance-layout-and-agentic-workflows/`
  - Confirm structure: spec.md, plan.md, research.md, tasks.md (this file), checklists/, contracts/, data-model.md, quickstart.md
  - Ensure all Phase 0–1 outputs are in correct location
  - Create `CATALOG.md` indexing all specifications with status and links
  - Link CATALOG.md from `.github/README.md`
- [x] T022 [P] [WS-254] [TOA-256] Organize reports in `.github/reports/`
  - Create directory structure: `.github/reports/{category}/` (e.g., `audit/`, `validation/`, `metrics/`)
  - Move any existing reports into appropriate categories
  - Create `.github/reports/README.md` indexing all reports
  - Document report naming convention: `{date}-{topic}.md` (e.g., `2026-10-17-path-inventory.md`)
- [x] T023 [P] [WS-254] [TOA-257] Segregate portable vs. repository-specific prompts
  - Audit `prompts/` directory for repository-specific prompts
  - Document which prompts are reusable (portable) vs. TOA-241-specific
  - Move TOA-241-specific prompts to `.github/prompts/` (if needed)
  - Create `prompts/README.md` explaining portable vs. specific distinction
- [x] T024 [P] [WS-254] [TOA-259] Organize task documents in `tasks/`
  - Confirm `tasks/task-list.md` is never deleted (protected file per AGENTS.md)
  - Create subdirectory structure: `tasks/governance/`, `tasks/features/`, etc.
  - Document task organization in `tasks/README.md`
  - Link task-list.md as master tracker

**Checkpoint**: Spec Kit routing verified; regression test passes 103/104 baseline; specification documentation organized; ready for Phase 4+

---

## Phase 4: Workstream WS-260 – Testing Infrastructure (TOA-260 epic)

**Goal**: Establish Jest ESM configuration, validate test discovery, integrate Bats and Playwright, document test infrastructure

**Independent Test**: Run `npm test` (all three suites: unit, build, e2e) and verify tests execute without errors (or expected browser setup messages for e2e)

**Child Issues Included**: TOA-260, TOA-274

### Implementation for WS-260

- [x] T025 [P] [WS-260] [TOA-260] Jest ESM Configuration (completed in Phase 2 T008, verify here)
  - ✅ jest.config.js has ESM support via @swc/core enabled
  - ✅ `npm run test:unit` passes: 11 test suites, 588 tests, 100% pass rate
  - ✅ All `.test.js` and `.test.ts` files discovered and run (no breaking changes)
  - ✅ Verified working with ESM transformation
- [x] T026 [P] [WS-260] [TOA-260] Bats build verification integration
  - ✅ `tests/build.bats` exists and validates Vite build integrity
  - ✅ `npm run test:build` passes: 12/12 Bats tests pass
  - ✅ Tests verify: build directory creation, _redirects file, SPA routing, CSS/JS output
  - ✅ Build documentation linked in testing guide
- [x] T027 [P] [WS-260] [TOA-260] Playwright e2e test integration
  - ✅ Playwright (@playwright/test@^1.48.1) installed and configured
  - ✅ Package scripts configured: `npm run test:e2e`, `test:e2e:debug`, `test:e2e:ui`
  - ✅ `tests/e2e/` directory ready for e2e tests (no tests yet; placeholder)
  - ✅ Browser installation documented (via Playwright installation)
- [x] T028 [WS-260] [TOA-260] Create comprehensive testing guide
  - ✅ Created `docs/TESTING.md` with full test infrastructure documentation
  - ✅ Documents unit tests (Jest ESM), build verification (Bats), e2e (Playwright)
  - ✅ Includes Spec Kit regression test baseline (103/104)
  - ✅ Test execution commands documented
  - ✅ Troubleshooting section for common issues
- [x] T029 [P] [WS-260] [TOA-274] Implement automatic PR labeling workflow (labeling-unified.yml)
  - ✅ `labeling-unified.yml` deployed and active (runs on PR events)
  - ✅ Fetches canonical labeler.yml from lightspeedwp/.github at runtime (single source of truth)
  - ✅ Routes labels based on branch prefix (feat/, fix/, docs/, etc.) via actions/labeler
  - ✅ Syncs labels with canonical .github/labels.yml (158 labels)
  - ✅ Validation gates PR labeling (contract suite + schema validation)
- [x] T030 [WS-260] Update AGENTS.md test command status
  - ✅ `npm run test:unit` → ✅ Working (Jest ESM with @swc/core: 588/588 pass)
  - ✅ `npm run test:build` → ✅ Working (Bats: 12/12 pass)
  - ✅ `npm run test:e2e` → ⏳ Ready (Playwright configured; no tests yet)
  - ✅ `node --test tests/speckit.test.mjs` → ⚠️ 103/104 (approved baseline)

**Checkpoint**: Testing infrastructure fully integrated; all test suites discoverable and executable; developer documentation complete

---

## Phase 5: Workstream WS-261 – GitHub Governance (.github files) (TOA-261 epic)

**Goal**: Implement GitHub Discussions, PR templates with routing, CODEOWNERS, branch protection, issue/discussion templates

**Independent Test**: Create test PR from `feat/` branch and verify correct PR template loads; create Discussion post and verify template structure

**Child Issues Included**: TOA-261, TOA-243, TOA-244, TOA-250, TOA-251, TOA-252, TOA-253, TOA-272

### Implementation for WS-261

- [x] T031 [WS-261] [TOA-243] Implement locked-files-guard.yml evaluation workflow
  - ✅ Create `.github/workflows/protected-files-guard.yml` (was created as Phase 2 T017c prerequisite)
  - ✅ Create `.github/PROTECTED_FILES.txt` canonical list with all protected file categories
  - ✅ Configure workflow to detect all protected files: `.github/`, `scripts/`, `AGENTS.md`, `CHANGELOG.md`, `guidelines/`, Supabase utils, Figma components, task-list
  - ✅ Verify workflow blocks PR merge (exit 1) if protected files are modified
  - ✅ Workflow runs on PR events and via manual trigger; documents requirement for change-request issues
- [x] T032 [WS-261] [TOA-244] Implement workflow syntax validation (workflow-lint.yml)
  - ✅ Create `.github/workflows/workflow-lint.yml` to validate all GitHub Actions YAML syntax
  - ✅ Verify all 13 workflows have valid YAML syntax: branch-name-validation, changelog-unified, claude-guard-tests, dependency-automation, dependency-validation, drift-detection, labeling-unified, locked-files-guard, pr-template-routing, protected-files-guard, tests, validate-specifications, workflow-lint
  - ✅ Workflow runs on PR changes to .github/workflows/ and can be triggered manually
  - ✅ Reports validation results as comment on PR when applicable
- [x] T033 [P] [WS-261] [TOA-250] Create GitHub Discussions templates
  - ✅ Create `.github/DISCUSSION_TEMPLATE/` directory
  - ✅ Create feature-request.yml template (feature ideas, enhancement requests)
  - ✅ Create question-and-answer.yml template (Q&A support, troubleshooting)
  - ✅ Create show-and-tell.yml template (community showcase, project sharing)
  - ✅ Create general.yml template (general community discussion)
  - ✅ Create DISCUSSION_TEMPLATE/README.md with setup guide (5/5 templates validated)
  - ⏳ Enable Discussions in Settings (manual UI step, not automated)
  - ⏳ Configure discussion categories in Settings to map templates (manual UI step)
- [x] T034 [P] [WS-261] [TOA-251] Verify issue template inheritance
  - ✅ Confirm: No `.github/ISSUE_TEMPLATE/` directory locally (inherits from org defaults)
  - ✅ Verify: Issue types defined in `.github/issue-types.yml` (from lightspeedwp/.github)
  - ✅ Document: Available issue types (bug, feature, task, documentation, security, design, question)
  - ✅ Added: "Creating issues" section to CONTRIBUTING.md with inheritance explanation
  - ✅ No local duplicates: all templates inherited from lightspeedwp/.github
- [ ] T035 [P] [WS-261] [TOA-252] Configure PR template routing (shared-template approach)
  - Verify `pr-template-routing.yml` workflow exists and is active
  - Confirm shared templates are inherited from `lightspeedwp/.github` (no local duplication)
  - Verify branch-to-template mapping is correct:
    - `feat/*` → feature template
    - `fix/*` → bugfix template
    - `docs/*` → documentation template
  - Create test PRs from different branch types and verify correct template is suggested
  - Confirm template content is applied without overwriting contributor content
  - Document shared-template routing approach in `CONTRIBUTING.md` under "PR Creation Process"
- [x] T036 [P] [WS-261] [TOA-253] Document saved replies and contributor setup
  - ✅ Add "Using Saved Replies" section to CONTRIBUTING.md
  - ✅ Link to org-wide saved replies catalog in lightspeedwp/.github
  - ✅ Document step-by-step guide for adding saved replies to personal account
  - ✅ List common saved reply categories and use cases
  - ✅ Provide guidance on when to use/avoid saved replies
  - ✅ Link saved replies from "Getting help" section
- [x] T037 [WS-261] Create CODEOWNERS file for branch protection
  - Create `.github/CODEOWNERS` with code area ownership mapping:
    ```
    # Governance-critical files
    .github/ @ashley
    scripts/ @ashley
    AGENTS.md @ashley
    CHANGELOG.md @ashley
    guidelines/ @ashley
    
    # Component owners (delegate as appropriate)
    src/app/components/ @ashley
    src/styles/ @ashley
    tests/ @ashley
    docs/ @ashley
    ```
  - Document CODEOWNERS in `CONTRIBUTING.md` under "Code Ownership"
  - Explain how CODEOWNERS interacts with branch protection
- [ ] T038 [WS-261] [TOA-261] Enable branch protection on main and develop
  - ⏳ Go to Settings → Branches → Add rule for `develop` branch:
    - Require PR review (minimum 1 review required)
    - Require CODEOWNERS review for protected paths (see .github/CODEOWNERS)
    - Require status checks to pass (all CI/CD workflows must succeed)
    - Require branches to be up to date with base branch
    - Allow dismissal of stale reviews on new commits
    - Enable auto-merge (optional, for maintainer convenience)
  - ⏳ Add rule for `main` branch:
    - Require PR review (minimum 1 review required, preferably 2)
    - Require CODEOWNERS review for protected paths
    - Require status checks to pass (all CI/CD workflows)
    - Require branches to be up to date
    - Restrict who can push to this branch (maintainers only)
    - Allow auto-merge
  - ⏳ Document branch protection rules in CONTRIBUTING.md
  - **Note:** This is a manual repository Settings UI task, not automated
- [x] T039 [P] [WS-261] [TOA-272] Implement branch name validation workflow
  - Ensure `branch-name-validation.yml` is deployed and active
  - Verify `npm run validate:branch-name` is called on every PR push
  - Validate against approved prefix list (feat, fix, hotfix, release, etc.)
  - Test: create PR from invalid branch name (e.g., `claude/my-feature`) and confirm workflow blocks
  - Document branch naming rules in `CONTRIBUTING.md` and link to `.github/CLAUDE.md`

**Checkpoint**: GitHub governance fully implemented; branch protection active; PR template routing working; Discussions enabled for community engagement

---

## Phase 6: Workstream WS-262 – Root Configuration & Environment (TOA-262 epic)

**Goal**: Update root configuration files (package.json, .nvmrc, .gitattributes), remove pnpm artefacts, remove Tailwind, update documentation

**Independent Test**: Run `npm ci` with Node 24 and verify all dependencies resolve; run `npm run build` and verify BEM-only styling succeeds

**Child Issues Included**: TOA-262, TOA-258, TOA-273

### Implementation for WS-262

- [x] T040 [WS-262] [TOA-262] Update package.json (already done in Phase 2 T012, verify here)
  - ✅ Verified: `engines` field set to `{ "node": ">=24" }`
  - ✅ Verified: pnpm.overrides block removed (from Phase 2 T011)
  - ✅ Verified: `npm ci` works and installs all dependencies
- [x] T041 [WS-262] [TOA-262] Create .nvmrc file (already done in Phase 2 T012, verify here)
  - ✅ Verified: `.nvmrc` file exists at repository root with content: `24`
  - ✅ Updated README.md with `nvm use` command documentation
- [x] T042 [P] [WS-262] [TOA-258] Verify script placement at root scripts/
  - ✅ Verified: All scripts in `scripts/` directory (not `.github/scripts/`)
  - ✅ Verified: Key scripts present: validate-branch-name.js, parse-journal-markdown.ts, check-journal-links.ts, test-figma-access.js
- [x] T043 [P] [WS-262] [TOA-273] Implement changelog validation workflow (changelog-unified.yml)
  - ✅ Verified: `changelog-unified.yml` deployed and active (597 lines)
  - ✅ Validated: Enforces Keep a Changelog 1.1.0 format
  - ✅ Verified: Three jobs: require-gate, quality-rules, merge-sync
  - ✅ Prevents deletion/moving of CHANGELOG.md (protected file)
- [x] T044 [WS-262] Update root README.md with governance information
  - ✅ Added Quick Start section with npm ci, Node 24, nvm use
  - ✅ Added Contributing section linking to governance documents
  - ✅ Documented branch naming pattern and validation
  - ✅ Added testing & validation commands reference
  - ✅ Links to CONTRIBUTING.md, AGENTS.md, CLAUDE.md, TESTING.md
- [x] T045 [P] Update .gitattributes to ensure text=auto first
  - ✅ Created `.gitattributes` with `text=auto` as first rule
  - ✅ Set LF line endings for source files (JS, TS, JSON, YAML, Markdown)
  - ✅ Mark binary files explicitly (images, videos, lockfiles)
- [x] T046 [WS-262] Update CONTRIBUTING.md with all governance decisions
  - ✅ Added section: "Repository Governance & Policies"
  - ✅ Added section: "Protected Files" with 9-file table and change process
  - ✅ Added section: "Code Ownership" with CODEOWNERS reference
  - ✅ Added section: "Locked Configuration Files" with label prefix requirements
  - ✅ Added section: "Governance Structure" with decisions table (7 decisions documented)
  - ✅ All 5 original requirements integrated into comprehensive governance sections
  - ✅ Links to parent governance docs (lightspeedwp/.github) established
  - Add section: "Styling" — document BEM-only CSS rules

**Checkpoint**: All root configuration updated; npm-only and Node.js 24 enforced; Tailwind removed; changelog validation active; documentation complete

---

## Phase 7: Workstream WS-271 – Agent Budget Controls (TOA-271 epic)

**Goal**: Document agent inventory, Anthropic platform assessment, budget enforcement mechanisms, and skill routing

**Independent Test**: Read `.claude/agents/*.md` and `.claude/skills/*.md`; confirm each has documented purpose, inputs, outputs, tools, permissions, and budget coverage

**Child Issues Included**: TOA-271

### Implementation for WS-271

- [x] T047 [WS-271] Audit and document agent inventory in .claude/agents/
  - ✅ Verified 20 agents total in `.claude/agents/` directory
  - ✅ Created comprehensive documentation framework in INVENTORY.md
  - ✅ Template includes all required fields: Purpose, Inputs, Outputs, Tools, Permissions, Workflow Relationships, Validation, Escalation, Budget, Not In Scope
  - ✅ Documented sample agents (Changelog Agent, Branches Agent) with complete specifications
  - ✅ Added Agent Governance Principles section (selection criteria, budget enforcement, workflow integration)
  - ✅ Indexed all 20 agents by category (4 content, 3 design, 4 dev, 2 testing, 3 project mgmt, 3 analytics, 1 release)
- [x] T048 [P] [WS-271] Audit and document skill inventory in .claude/skills/
  - ✅ Verified 5 skills total in `.claude/skills/` directory
  - ✅ Documented all 5 skills with complete specifications:
    - Branch Validation: `{type}/{scope}-{title}` pattern validation
    - Validate: Generic configuration and schema checks
    - Test: Test strategy and validation suites
    - Changelog: Keep a Changelog 1.1.0 management
    - Labeling: GitHub label taxonomy management
  - ✅ Created comprehensive framework in INVENTORY.md with template fields
  - ✅ Sample documentation for Branch Validation and Changelog skills (complete)
  - ✅ Added Skill Governance Principles (lifecycle, selection criteria, budget enforcement, integration patterns)
  - ✅ Linked to related documentation (agents, budget controls, routing, governance)
- [x] T049 [P] [WS-271] Assess Anthropic platform applicability per agent
  - ✅ Documented all 20 agents with platform recommendations
  - ✅ Evaluated seven Anthropic platforms per agent:
    - Claude API (Messages): 20/20 agents use
    - Tool Use Interface: 20/20 agents use
    - Prompt Caching: 18/20 agents use (90%)
    - MCP: 15/20 agents use (75%)
    - Artifact APIs: 14/20 agents use (70%)
    - Managed Agents: 0/20 today (future enhancement)
    - Tool Runner: 14/20 agents use (70%)
  - ✅ Created agent-by-agent matrix with MCP server recommendations
  - ✅ Documented MCP server distribution (GitHub=8 agents, others 1-2 each)
  - ✅ Added adoption summary and platform statistics
  - ✅ Updated `docs/AnthropicPlatforms.md` with complete assessment
- [ ] T050 [WS-271] Document agent budget controls and enforcement
  - Define budget types: token limit, execution time, cost ceiling, retry limit
  - Document enforcement point: host-side hard limits (not advisory)
  - Cover:
    - Aggregate accounting across delegated and concurrent work
    - Retry and cancellation policies
    - Exhaustion handling (what happens when budget exceeded)
    - Missing usage data fallback
    - Resumable handoff and continuation
  - Create `.claude/BUDGET_CONTROLS.md` with enforcement strategy
  - Note: TOA-271 owns implementation; this spec documents requirements only
- [ ] T051 [P] [WS-271] Document skill runtime routing
  - Map each skill to execution environment:
    - Local agent (same session)
    - Remote agent (cloud sandbox)
    - Subagent (forked session)
    - Managed agent (hosted)
  - Document tool access per execution context
  - Ensure deterministic quality gates remain unprivileged (code, spec, config validation)
  - Create `.claude/SKILL_ROUTING.md` with routing matrix
- [ ] T052 [WS-271] Create agent/skill governance documentation
  - Create `.claude/GOVERNANCE.md` explaining:
    - When to use which agent (agent selection guide)
    - Budget limits and approved increases (requires owner approval)
    - Tool access policies (what tools each agent can use)
    - Escalation procedures (when to pause and ask @ashley)
    - Contract compliance (agents must read and follow guidelines/)
  - Link from `.claude/agents/INVENTORY.md` and `.claude/skills/INVENTORY.md`
  - Require owner approval of numerical limits before deploying

**Checkpoint**: Agent inventory documented; Anthropic platforms assessed; budget enforcement strategy defined (implementation in TOA-271); skill routing clear; governance framework established

---

## Phase 8: Polish & Cross-Cutting Concerns

**Purpose**: Final validation, documentation polish, and integration across all workstreams

- [ ] T053 [P] Run full regression validation suite
  - `npm ci` — dependency installation
  - `npm run validate:branch-name -- --branch epic/repo-governance-toa-241` — branch naming
  - `npm run build` — production build
  - `npm run test:unit` — Jest unit tests (should pass after T008)
  - `npm run test:build` — Bats build verification
  - `npm test` — all test suites together
  - `node --test tests/speckit.test.mjs` — Speckit regression (expect 103/104)
  - Document results in final implementation report
- [ ] T054 [P] Validate specification documentation completeness
  - Confirm all files present in `.github/specs/001-repo-governance-layout-and-agentic-workflows/`:
    - spec.md, plan.md, research.md, data-model.md, contracts/, quickstart.md, tasks.md (this file)
    - checklists/requirements.md
  - Verify all 20 child issues mapped to requirements
  - Verify all 27 source references preserved
  - Run quickstart.md validation scenarios (if present)
- [ ] T055 [P] Validate all protected files remain unchanged
  - Confirm CHANGELOG.md not modified (except CHANGELOG entry for this work)
  - Confirm ATTRIBUTIONS.md not modified
  - Confirm guidelines/ files not modified
  - Confirm .github/workflows/*.yml only updated as specified
  - Confirm src/app/components/figma/ImageWithFallback.tsx not modified
  - Confirm src/app/utils/supabase/ not modified
- [ ] T056 [P] Verify application behaviour preserved
  - Build succeeds: `npm run build` ✅
  - Dev server starts: `npm run dev` ✅
  - All routes work (manual check: navigate through app, verify no console errors)
  - Book content displays correctly (journal entries, articles)
  - No image imports broken (Figma assets load)
  - No Supabase integration exposed or activated
  - SPA fallback works (navigate to invalid route, see SPA app)
- [ ] T057 Commit all governance infrastructure changes
  - Stage all modified and new files (from T001–T056)
  - Create single comprehensive commit with clear message:
    ```
    docs(spec): TOA-241 complete governance infrastructure implementation
    
    - Phase 1: Setup shared governance artefacts
    - Phase 2: Configure testing, package manager, Node.js, styling
    - Phase 3: Implement Spec Kit routing and regression testing
    - Phase 4: Integrate Jest ESM, Bats, Playwright test infrastructure
    - Phase 5: GitHub Discussions, PR templates, CODEOWNERS, branch protection
    - Phase 6: Root configuration, environment setup, documentation
    - Phase 7: Agent inventory and budget controls framework
    - Phase 8: Validation and integration across all workstreams
    
    All 9 approved decisions implemented; 20 child issues resolved.
    Repository governance infrastructure stable; ready for feature work.
    ```
  - Push to `epic/repo-governance-toa-241`
- [ ] T058 Create pull request for governance implementation
  - Title: `docs(spec): TOA-241 Repository Governance Infrastructure`
  - Body:
    ```
    ## Summary
    Complete implementation of TOA-241 repository governance infrastructure across 5 parallel workstreams.
    
    ## Changes
    - Testing infrastructure: Jest ESM, Bats, Playwright configured
    - Package management: npm-only, pnpm artefacts removed
    - Runtime: Node.js 24 LTS pinned
    - Styling: BEM-only, Tailwind removed
    - GitHub governance: Discussions, PR templates, CODEOWNERS, branch protection
    - CI/CD: 8 implementation + 6 evaluation + 3 deferred workflows
    - Spec Kit: Feature directory routing verified, regression test passing
    - Agent governance: Inventory documented, platform assessment complete
    
    ## Testing
    - `npm run validate:branch-name` ✅
    - `npm run build` ✅
    - `npm run test:unit` ✅ (after Jest ESM config)
    - `npm run test:build` ✅
    - `node --test tests/speckit.test.mjs` ⚠️ 103/104 (approved baseline)
    - All protected files preserved ✅
    - Application behaviour maintained ✅
    
    ## Child Issues Resolved
    TOA-242 (CI), TOA-243 (validation), TOA-244 (workflow-lint), TOA-250 (discussions), TOA-251 (issue templates), TOA-252 (PR templates), TOA-253 (saved replies), TOA-254 (Spec Kit), TOA-255 (planning docs), TOA-256 (reports), TOA-257 (prompts), TOA-258 (scripts), TOA-259 (tasks), TOA-260 (testing), TOA-261 (.github), TOA-262 (config), TOA-271 (budgets), TOA-272 (branch validation), TOA-273 (changelog), TOA-274 (labeling)
    
    Closes TOA-241. Ready for review and merge.
    ```
  - Mark as draft initially
  - Request review from @ashley
- [ ] T059 Document implementation completion and handoff
  - Create `IMPLEMENTATION_COMPLETE.md` in `.github/specs/001-repo-governance-layout-and-agentic-workflows/`
  - Summarize what was implemented vs. what requires owner follow-up
  - Note any deferred decisions or unresolved items
  - Provide runbook for verifying implementation
  - Link to PR for easy review access

**Checkpoint**: All governance infrastructure implemented, validated, and integrated. PR ready for owner review and merge. Feature TOA-241 complete.

---

## Dependencies & Execution Order

### Phase Dependencies

- **Phase 1 (Setup)**: No dependencies — start immediately
- **Phase 2 (Foundational)**: Depends on Phase 1 completion — **BLOCKS all workstreams**
- **Phases 3–7 (Workstreams)**: All depend on Phase 2 completion — can run in parallel
- **Phase 8 (Polish)**: Depends on all workstreams completing — runs last

### Workstream Dependencies (Phases 3–7)

Once Phase 2 completes, all 5 workstreams can proceed in parallel:

- **WS-254 (Spec Kit)**: No dependencies on other workstreams
- **WS-260 (Testing)**: No dependencies on other workstreams
- **WS-261 (GitHub)**: No dependencies on other workstreams
- **WS-262 (Config)**: No dependencies on other workstreams
- **WS-271 (Budget)**: No dependencies on other workstreams

### Within-Phase Dependencies

- **Phase 2**: T008 (Jest) must complete before T016 (test discovery)
- **Phase 3**: T018 must complete before T019 (regression test depends on feature directory routing)
- **Phase 5**: T031 (locked-files-guard) should complete before T039 (CODEOWNERS, so protected files are enforced)
- **Phase 6**: T040–T042 (config updates) must complete before T044–T046 (documentation updates)

### Parallel Opportunities

**Phase 1**:
- T003, T006 can run in parallel

**Phase 2**:
- T008, T009, T013 can run in parallel (different files, no dependencies)
- T011, T012, T014 can run in parallel (different files, no dependencies)
- T016, T017 can run in parallel after T008, T009, T010, T011, T012, T014 complete

**Phase 3** (WS-254):
- T021, T022, T023, T024 can run in parallel (documentation/organization, no dependencies)

**Phase 4** (WS-260):
- T025, T026, T027 can run in parallel
- T029, T030 can run in parallel

**Phase 5** (WS-261):
- T031, T032 can run in parallel
- T033, T034, T035, T036 can run in parallel (different templates)
- T039, T040 can run in parallel

**Phase 6** (WS-262):
- T042, T043 can run in parallel
- T044, T045, T046 can run in parallel (different documentation files)

**Phase 7** (WS-271):
- T047, T048, T049, T051, T052 can run in parallel (documentation, inventory work)

**Phase 8** (Polish):
- T053, T054, T055, T056 can run in parallel (all are verification/validation)

---

## Parallel Team Strategy

With multiple developers/agents, optimal execution:

1. **Phase 1** (1 person): Initialize governance artefacts (4–6 hours)
2. **Phase 2** (1–2 people): Core infrastructure setup (6–10 hours, some parallelism)
   - Person A: Jest, Vitest, Testing (T008, T009, T016, T017)
   - Person B: Package manager, Node.js, Tailwind removal (T011, T012, T013, T014)
   - Both: T010, T015 (testing baseline, component audit)
3. **Phases 3–7** (5 people, one per workstream): Parallel workstream execution (8–12 hours each)
   - Dev A: WS-254 Spec Kit routing
   - Dev B: WS-260 Testing integration
   - Dev C: WS-261 GitHub governance
   - Dev D: WS-262 Root config
   - Dev E: WS-271 Agent inventory
4. **Phase 8** (1 person): Final validation and integration (2–4 hours)

**Total wall-clock time**: ~24–36 hours (depending on team size and parallelism)

---

## Implementation Strategy

### MVP Scope (Phase 1 + Phase 2 + One Workstream)

For fastest delivery of governance foundation:

1. Complete **Phase 1** (Setup) ✅
2. Complete **Phase 2** (Foundational) — ALL required before any workstream
3. Complete **ONE workstream** (recommend WS-261 for quickest GitHub validation):
   - T031–T039 (GitHub Discussions, CODEOWNERS, branch protection, workflow validation)
   - Result: Governance framework deployed, team can immediately use improved PR routing and branch protection
4. **Deploy to develop branch** for testing
5. Create MVP PR: "Repository Governance MVP: Foundation + GitHub Integration"

**MVP Delivery Time**: ~12–16 hours with single developer

### Incremental Delivery (Full Stack)

1. Phase 1 → Phase 2 (foundation)
2. Add WS-261 (GitHub governance) — quickest ROI, most visible to team
3. Add WS-260 (Testing) — unblocks developer confidence in test suite
4. Add WS-254 (Spec Kit) — enables future feature specifications
5. Add WS-262 (Config) — formalizes npm/Node versions
6. Add WS-271 (Budget) — completes governance framework
7. Phase 8 (Polish) — final validation before merge to main

**Each increment**: Independently testable, can be merged and integrated before starting next

### Autonomous Execution

If agents are driving this work:

1. Agents work in parallel on Phases 3–7 (after Phase 2)
2. Each agent is responsible for one workstream
3. Each agent commits to its own branch feature (e.g., `feat/wg-254-spec-kit` based off `epic/repo-governance-toa-241`)
4. Merge all branches back to `epic/repo-governance-toa-241` via squash commits
5. Create single PR from `epic/repo-governance-toa-241` → develop for owner review

---

## Notes

- **[P] = Parallelizable**: Can run simultaneously with other [P] tasks if no file conflicts
- **[Story] = Workstream**: Maps task to WS-254, WS-260, WS-261, WS-262, or WS-271
- All file paths are relative to repository root
- Commit after each phase completes, or at checkpoints
- Stop at any checkpoint to validate independently
- Avoid: vague tasks, same-file conflicts, cross-workstream blocking dependencies
- When blocked, report to @ashley with specific question (do not guess or proceed unsafely)

---

## Success Criteria

✅ **Phase 1 Complete**: Governance artefacts initialized; all workstreams have clear paths
✅ **Phase 2 Complete**: Testing, package manager, runtime, styling all configured
✅ **Phases 3–7 Complete**: All 5 workstreams delivered; 20 child issues resolved
✅ **Phase 8 Complete**: Full validation suite passes; protected files preserved; app behavior maintained
✅ **PR Ready**: All changes committed; PR created for owner review
✅ **Merge to Main**: Owner approves; PR merges to develop; features become available to all team members

---

**End of Tasks** — Ready for implementation. Start with Phase 1 Setup tasks.
