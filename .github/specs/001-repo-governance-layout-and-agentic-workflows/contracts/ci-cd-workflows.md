# CI/CD Workflow Contracts

**Feature**: TOA-241 – Repository Governance Layout & Agentic Workflows  
**Phase**: 1 – Design & Contracts  
**Date**: 2026-10-17

---

## Overview

This document defines the interface contracts for all 17 GitHub Actions workflows that implement repository governance. Contracts specify: workflow trigger conditions, required inputs, expected outputs, and validation gates that downstream workflows depend on.

---

## Implementation Workflows (9 — Always Active)

### lint.yml
- **Trigger**: `push`, `pull_request`
- **Purpose**: Code quality validation (ESLint, Prettier, Markdownlint)
- **Inputs**: Source files in `src/`, `docs/`, `.github/`
- **Outputs**: Pass/fail status; lint report artifacts
- **Blocking**: YES (must pass before PR merge)
- **Enforces**: STYLE-001 (BEM-only CSS), ESLint rules, Prettier formatting
- **Failure Mode**: Reports linting violations with file/line references
- **Dependencies**: None (first-phase gate)

### tests.yml
- **Trigger**: `push`, `pull_request`
- **Purpose**: Test execution (Jest ESM, Bats, Playwright baseline)
- **Inputs**: Test files in `src/`, `tests/`, `.specify/`
- **Outputs**: Test results; coverage report; baseline comparison
- **Blocking**: YES (must pass before PR merge)
- **Enforces**: TEST-001 (Jest ESM @swc/core), TEST-002 (103/104 baseline)
- **Failure Mode**: Reports test failures with stack traces; coverage gaps
- **Dependencies**: None (first-phase gate)
- **Baseline Contract**: Speckit tests must maintain 103/104 pass rate; new tests default to advisory

### documentation.yml
- **Trigger**: `push`, `pull_request` (files: `docs/`, `README.md`, `.github/specs/`)
- **Purpose**: Documentation validation (syntax, frontmatter, links)
- **Inputs**: Markdown files in `docs/` and `README.md`
- **Outputs**: Validation report; broken link detection
- **Blocking**: YES (must pass before PR merge)
- **Enforces**: Documentation structure, frontmatter format, link validity
- **Failure Mode**: Reports documentation errors with location
- **Dependencies**: None (first-phase gate)

### workflow-lint.yml
- **Trigger**: `push`, `pull_request` (files: `.github/workflows/`)
- **Purpose**: GitHub Actions workflow syntax validation
- **Inputs**: YAML workflow files in `.github/workflows/`
- **Outputs**: Syntax validation report
- **Blocking**: YES (must pass before PR merge)
- **Enforces**: Valid YAML, required fields, permitted actions
- **Failure Mode**: Reports workflow syntax errors
- **Dependencies**: None (first-phase gate)

### branch-name-validation.yml
- **Trigger**: `pull_request`
- **Purpose**: Validate branch naming convention
- **Inputs**: PR branch name
- **Outputs**: Branch validation status
- **Blocking**: YES (must pass before PR merge)
- **Enforces**: R1.2 (branch naming: `{type}/{scope}-{title}`)
- **Failure Mode**: Comments on PR with validation failure; lists valid type values
- **Dependencies**: None (first-phase gate)
- **Exemptions**: `dependabot/*`, `renovate/*`, `release/*` bypass validation

### changelog-unified.yml
- **Trigger**: `pull_request` (files: `CHANGELOG.md`, `package.json`)
- **Purpose**: Validate CHANGELOG.md updates match PR scope
- **Inputs**: CHANGELOG.md diff; PR description; version bump logic
- **Outputs**: Changelog validation status; version bump detection
- **Blocking**: YES (must pass before PR merge)
- **Enforces**: R1.3 (changelog consolidation), Keep a Changelog format
- **Failure Mode**: Reports missing/invalid changelog entries; version mismatches
- **Dependencies**: Runs after `lint.yml`, `tests.yml` (reads their results)

### labeling-unified.yml
- **Trigger**: `pull_request`
- **Purpose**: Assign PR labels based on branch prefix and file changes
- **Inputs**: PR branch name; file changes; PR description
- **Outputs**: Applied labels from canonical set (labels.yml)
- **Blocking**: NO (informational; uses labels for routing)
- **Enforces**: R5.1 (label families: type:*, status:*, area:*, priority:*, meta:*)
- **Failure Mode**: Posts comment if label assignment cannot be automated
- **Dependencies**: Reads `.github/labels.yml` (protected file)

### pr-template-routing.yml
- **Trigger**: `pull_request`
- **Purpose**: Route PR to correct template based on branch prefix
- **Inputs**: PR branch type (from `{type}/...`)
- **Outputs**: PR template assignment; template validation
- **Blocking**: YES (PR must use correct template)
- **Enforces**: R5.2 (workflow-specific PR templates), GH-002 (local template routing)
- **Failure Mode**: Comments suggesting template update; lists available templates
- **Dependencies**: Reads `.github/PULL_REQUEST_TEMPLATE/` templates

### locked-files-guard.yml (Moved to Implementation per Q2 Clarification)
- **Trigger**: `push`, `pull_request`
- **Purpose**: Detect modifications to protected governance files
- **Inputs**: File changes in PR/commit
- **Outputs**: Protection status; override request workflow (if applicable)
- **Blocking**: YES (must pass before PR merge)
- **Enforces**: R1.3 (protected files), GH-003 (CODEOWNERS authority)
- **Protected Paths**: `.github/workflows/`, `CHANGELOG.md`, `AGENTS.md`, `guidelines/`, `.github/labels.yml`
- **Failure Mode**: Blocks merge; comments with list of protected files modified
- **Dependencies**: On `pull_request`, runs after `branch-name-validation.yml` (knows branch is valid). On `push`, has no branch-name-validation dependency because `branch-name-validation.yml` runs only on `pull_request`.
- **Override Process**: Requires CODEOWNERS approval (@ashley) via GitHub review

---

## Evaluation Workflows (5 — Manual/Opt-In)

### validate-specifications.yml
- **Trigger**: `workflow_dispatch` (manual)
- **Purpose**: Validate feature specifications in `.github/specs/`
- **Inputs**: Spec files (spec.md, plan.md, tasks.md)
- **Outputs**: Spec validation report; completeness checklist
- **Blocking**: NO (manual verification only)
- **Enforces**: Spec Kit template compliance, requirement coverage
- **Failure Mode**: Reports spec structure errors, missing sections
- **Dependencies**: Requires `lint.yml`, `tests.yml` to pass on target branch

### claude-guard-tests.yml
- **Trigger**: `workflow_dispatch` (manual)
- **Purpose**: AI-driven test quality validation
- **Inputs**: Test files; source code being tested
- **Outputs**: Test coverage analysis; recommendation report
- **Blocking**: NO (advisory feedback)
- **Enforces**: Test completeness, edge case coverage, assertion quality
- **Failure Mode**: Posts detailed feedback; no merge blocking
- **Dependencies**: Requires `tests.yml` to pass

### ruleset-drift.yml
- **Trigger**: `schedule` (optional) or `workflow_dispatch`
- **Purpose**: Detect configuration consistency across repository
- **Inputs**: Configuration files (labels.yml, issue-types.yml, CODEOWNERS, etc.)
- **Outputs**: Configuration drift report; inconsistency detection
- **Blocking**: NO (informational)
- **Enforces**: Consistency between configuration files and implementation
- **Failure Mode**: Posts audit findings; suggests remediation
- **Dependencies**: None (read-only audit)

### ai-feedback-validation.yml
- **Trigger**: `workflow_dispatch` (manual)
- **Purpose**: Validate output quality from AI tools
- **Inputs**: Generated content (specs, plans, tasks)
- **Outputs**: Quality score; feedback report
- **Blocking**: NO (advisory)
- **Enforces**: Content clarity, completeness, correctness
- **Failure Mode**: Posts structured feedback; no merge blocking
- **Dependencies**: Requires specification artifacts to exist

### ai-feedback.yml
- **Trigger**: `workflow_dispatch` (manual)
- **Purpose**: Collect feedback on AI-generated content
- **Inputs**: Generated specification/plan/task artifacts
- **Outputs**: Feedback collection UI; response storage
- **Blocking**: NO (feedback collection only)
- **Enforces**: User-driven quality signals
- **Failure Mode**: No failures (data collection)
- **Dependencies**: None (standalone feedback tool)

---

## Deferred Workflows (3 — Decision Pending)

### branch-validation-metrics-aggregator.yml
- **Status**: Deferred (decision pending on metrics infrastructure)
- **Purpose**: Aggregate branch validation metrics over time
- **Inputs**: Validation workflow results
- **Outputs**: Metrics dashboard; trend analysis
- **Blocking**: NO (would be informational if enabled)
- **Dependencies**: Requires `branch-name-validation.yml`, `locked-files-guard.yml` to run first

### keep-pr-current.yml
- **Status**: Deferred (decision pending on base-branch sync strategy)
- **Purpose**: Automatically sync PR with base branch
- **Inputs**: PR metadata; base branch updates
- **Outputs**: Updated PR branch; rebase/merge status
- **Blocking**: NO (would be optional if enabled)
- **Dependencies**: Runs after all other PR validation workflows

### label-drift-check.yml
- **Status**: Deferred (decision pending on label audit frequency)
- **Purpose**: Detect labels applied outside canonical set
- **Inputs**: Applied labels on issues/PRs
- **Outputs**: Drift report; non-compliant label detection
- **Blocking**: NO (would be advisory if enabled)
- **Dependencies**: Reads `.github/labels.yml` (protected file)

---

## Workflow Activation Status

| Workflow | Status | Trigger | Blocking | Executes By Default |
|----------|--------|---------|----------|---------------------|
| lint.yml | Implementation | push, pull_request | YES | ✅ Always |
| tests.yml | Implementation | push, pull_request | YES | ✅ Always |
| documentation.yml | Implementation | push, pull_request | YES | ✅ Always |
| workflow-lint.yml | Implementation | push, pull_request | YES | ✅ Always |
| branch-name-validation.yml | Implementation | pull_request | YES | ✅ Always |
| changelog-unified.yml | Implementation | pull_request | YES | ✅ Always |
| labeling-unified.yml | Implementation | pull_request | NO | ✅ Always |
| pr-template-routing.yml | Implementation | pull_request | YES | ✅ Always |
| locked-files-guard.yml | Implementation | push, pull_request | YES | ✅ Always |
| validate-specifications.yml | Evaluation | workflow_dispatch | NO | ⏹️ Manual |
| claude-guard-tests.yml | Evaluation | workflow_dispatch | NO | ⏹️ Manual |
| ruleset-drift.yml | Evaluation | schedule, workflow_dispatch | NO | ⏹️ Manual |
| ai-feedback-validation.yml | Evaluation | workflow_dispatch | NO | ⏹️ Manual |
| ai-feedback.yml | Evaluation | workflow_dispatch | NO | ⏹️ Manual |
| branch-validation-metrics-aggregator.yml | Deferred | (pending) | NO | ⏸️ Disabled |
| keep-pr-current.yml | Deferred | (pending) | NO | ⏸️ Disabled |
| label-drift-check.yml | Deferred | (pending) | NO | ⏸️ Disabled |

---

## Execution Order & Dependencies

```
Pull request execution:
Phase 1: Gate Workflows (Parallel, ~3 min)
  ├─ lint.yml
  ├─ tests.yml
  ├─ documentation.yml
  ├─ workflow-lint.yml
  └─ branch-name-validation.yml

Phase 2: Protected File Validation (after branch-name-validation.yml, ~1 min)
  └─ locked-files-guard.yml

Phase 3: PR Routing & Metadata (Sequential, parallel safe, ~1 min)
  ├─ changelog-unified.yml
  ├─ labeling-unified.yml
  └─ pr-template-routing.yml
```

Total expected CI time: 5–6 minutes for all implementation workflows on a typical PR.

On `push`, `locked-files-guard.yml` has no dependency on `branch-name-validation.yml`, which runs only on `pull_request`.

---

## Validation Failure Recovery

### Phase 1 Failures (Gate Workflows)

**lint.yml failure**:
- Review lint report
- Fix violations locally: `npm run format`
- Commit changes
- Push to branch (re-triggers workflow automatically)

**tests.yml failure**:
- Review test failures in workflow log
- Update tests or fix code locally
- Run locally: `npm run test:unit` to validate
- Commit and push

**branch-name-validation.yml failure**:
- Delete current branch locally: `git branch -D {current-branch}`
- Create new branch with valid name: `git checkout -b {type}/{scope}-{title}`
- Cherry-pick or rebase commits onto new branch
- Force-push new branch: `git push -u origin {type}/{scope}-{title}`
- Create new PR

### Phase 2 Failures (Protected Files)

**locked-files-guard.yml failure**:
- Review which protected files were modified
- If modification is necessary: Request CODEOWNERS review (@ashley)
- @ashley approves modification via PR review
- Workflow clears block after approval

### Phase 3 Failures (Routing)

**pr-template-routing.yml failure**:
- Workflow comments with available templates
- Update PR description to match template format
- Workflow re-evaluates on next push

---

## Integration with Downstream Systems

### Label Assignment → Automation
- Labels assigned by `labeling-unified.yml` trigger secondary automation:
  - Issue triage → Milestone assignment
  - Area labels → Code owner notification
  - Status labels → Project board automation

### PR Template → Issue Creation
- PR template selection determines:
  - Feature checklist structure (e.g., testing requirements)
  - Code owner requirements
  - Changelog entry format

### Branch Validation → Metrics
- `branch-name-validation.yml` results feed into metrics:
  - Type distribution (feature vs. fix vs. chore)
  - Scope organization (which modules most active)
  - Naming compliance rate

---

## Success Criteria

✅ **All implementation workflows (9) pass on every PR to develop/main**\
✅ **No manual override of workflow gates required for valid PRs**  
✅ **Protected file modifications require CODEOWNERS approval**  
✅ **Evaluation workflows (5) available for manual dispatch with clear results**\
✅ **Deferred workflows documented with decision gates for future enablement**  
✅ **Total CI execution time < 10 minutes for typical PR**  

---

## References

- **Specification**: `spec.md` (R6.1–R6.4, R9.1)
- **Data Model**: `data-model.md` (GitHubActionsWorkflow entity)
- **Implementation Tasks**: `tasks.md` (T015–T025 workflow setup)
- **Repository Config**: `.github/workflows/` (17 workflow files)
- **Protected Files**: `locked-files-guard.yml` enforcement list
- **Label Taxonomy**: `.github/labels.yml` (canonical family prefixes)
