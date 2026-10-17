# Data Model: Repository Governance Infrastructure

**Feature**: TOA-241 – Repository Governance Layout & Agentic Workflows  
**Date**: 2026-10-17  
**Status**: Phase 1 – Configuration Model  

---

## Overview

The Repository Governance system models five core entity types:
1. **Configuration Governance** – Metadata, policies, rules that shape development workflows
2. **File & Path Structure** – Repository organization, generated outputs, protection rules
3. **Workflow & CI/CD** – GitHub Actions workflows and their execution contracts
4. **GitHub Metadata** – Labels, issue types, PR templates, Discussion categories
5. **Agent & Skill Specifications** – AI agent inventory and capabilities

All entities are immutable once approved (GH-003 CODEOWNERS authority, R7.3 hard enforcement).

---

## Entity Models

### 1. Configuration Governance

**Entity**: `GovernanceDecision`

| Field | Type | Constraints | Notes |
|-------|------|-------------|-------|
| `decision_id` | string | SPEC-001–NODE-001 | Approved decisions only |
| `category` | enum | SPEC, TEST, GH, PKG, NODE, STYLE | 9 values total |
| `status` | enum | ratified / pending | Must be ratified before implementation |
| `owner` | string | @ashley | Central authority for all governance decisions |
| `approval_date` | date | 2026-10-17 | Ratification date |
| `description` | string | max 500 chars | Plain-language decision statement |
| `rationale` | string | max 1000 chars | Why this decision matters |
| `verification_method` | string | CI, manual review, both | How enforcement is validated |

**Examples**:
- `SPEC-001`: `.github/specs/` is canonical → CI validates via SPECIFY_FEATURE_DIRECTORY
- `TEST-001`: Jest ESM with @swc/core → CI validates via `npm run test:unit` baseline
- `NODE-001`: Node.js 24 pinning → CI validates via .nvmrc + package.json engines field

---

### 2. File & Path Structure

**Entity**: `RepositoryPath`

| Field | Type | Constraints | Notes |
|-------|------|-------------|-------|
| `path` | string | absolute from repo root | e.g., `.github/workflows/` |
| `type` | enum | config, source, generated, protected, ignored | Path classification |
| `consumers` | array | list of workflows/agents/scripts that read/write | Dependency map |
| `protected` | boolean | true/false | Write restrictions (CLAUDE.md, AGENTS.md, guidelines/) |
| `gitignore` | boolean | true/false | Excluded from VCS (dist/, node_modules/, etc.) |
| `description` | string | max 250 chars | Purpose and content summary |

**Key Paths**:
```
.github/specs/001-*/           [protected: false] Specification artefacts
.github/workflows/             [protected: true]  CI/CD implementation workflows
.github/CODEOWNERS             [protected: false] Branch protection mapping
.github/labels.yml             [protected: true]  Canonical label definitions
guidelines/                    [protected: true]  Development rules (BEM, bundler, etc.)
CHANGELOG.md                   [protected: true]  Release notes
src/app/                       [protected: false] Application source code
dist/                          [protected: false] Build output (gitignored)
```

---

### 3. Workflow & CI/CD

**Entity**: `GitHubActionsWorkflow`

| Field | Type | Constraints | Notes |
|-------|------|-------------|-------|
| `workflow_id` | string | lint.yml, tests.yml, etc. | Filename without path |
| `category` | enum | implementation / evaluation / deferred | Execution model |
| `status` | enum | active / inactive / manual | Triggered by (push, PR, manual dispatch) |
| `inputs` | array | source files, config files | What workflow reads |
| `outputs` | array | job success/failure, artifacts | What workflow produces |
| `trigger_event` | enum | push, pull_request, workflow_dispatch | GitHub event that fires workflow |
| `blocking` | boolean | true/false | Must pass before PR merge (implementation only) |
| `enforces_rule` | array | branch-name, protected-files, locked-files | What governance rule it validates |
| `owner` | string | @ashley or system | Authority for enabling/disabling |

**Workflow Categories**:
- **Implementation** (8 total, always active):
  - `lint.yml`, `tests.yml`, `documentation.yml`, `workflow-lint.yml`
  - `branch-name-validation.yml`, `changelog-unified.yml`, `labeling-unified.yml`, `pr-template-routing.yml`
  - **Plus Q2 clarification**: `locked-files-guard.yml` (moved from evaluation to implementation)

- **Evaluation** (6 total, manual/opt-in):
  - `validate-specifications.yml`, `claude-guard-tests.yml`, `ruleset-drift.yml`
  - `ai-feedback-validation.yml`, `ai-feedback.yml`, and others

- **Deferred** (3 total, decision pending):
  - `branch-validation-metrics-aggregator.yml`, `keep-pr-current.yml`, `label-drift-check.yml`

---

### 4. GitHub Metadata

**Entity**: `GitHubLabel`

| Field | Type | Constraints | Notes |
|-------|------|-------------|-------|
| `label_id` | string | type:feature, status:in-progress, etc. | Family-prefixed required |
| `family` | string | type, status, area, priority, meta | Prefix category |
| `color` | hex | #RRGGBB | Visual identifier in GitHub UI |
| `description` | string | max 200 chars | Label purpose |
| `automation_rule` | string | branch prefix / workflow / manual | How label is assigned |

**Families** (7 total, canonical in `.github/labels.yml`):
- type:* (feature, bug, task, documentation, design, security)
- status:* (needs-triage, in-progress, done, blocked)
- priority:* (critical, high, normal, low)
- area:* (ci, docs, labels, security, testing, automation)
- meta:* (needs-changelog, has-pr, duplicate, needs-audit)

---

**Entity**: `PRTemplate`

| Field | Type | Constraints | Notes |
|-------|------|-------------|-------|
| `template_id` | string | pr_feature.md, pr_bugfix.md, etc. | Filename |
| `branch_prefix` | string | feat/, fix/, docs/, etc. | Routing rule (Q2 clarification) |
| `sections` | array | Summary, Test plan, etc. | Required form sections |
| `validation_rule` | array | lint, test pass, CHANGELOG entry | Pre-merge checks |
| `owner_approval` | string | @ashley or team | Who must approve |

---

**Entity**: `DiscussionTemplate`

| Field | Type | Constraints | Notes |
|-------|------|-------------|-------|
| `template_id` | string | feature-request, q-and-a, show-and-tell, ideas | Category type |
| `category` | string | Feature request, Q&A, Show & tell, Ideas | Workflow category |
| `description` | string | max 300 chars | When to use this template |

---

### 5. Agent & Skill Specifications

**Entity**: `AgentSpec`

| Field | Type | Constraints | Notes |
|-------|------|-------------|-------|
| `agent_id` | string | speckit-clarify, speckit-plan, branch-validation | Unique agent name |
| `purpose` | string | max 250 chars | What the agent does |
| `tools` | array | [Read, Edit, Bash, Artifact, etc.] | Tool access list |
| `permissions` | array | [file_read, git_write, github_api, etc.] | Permission level |
| `budget_tokens` | integer | max tokens per invocation | Numerical limit |
| `budget_enforcement` | enum | hard / advisory | Hard enforcement per Q3 (R7.3) |
| `called_from` | array | workflow, skill, manual | Invocation context |
| `inventory_date` | date | 2026-10-17 | Last audit timestamp |

**Current Inventory** (Q2→Option B: baseline ~18 agents, ~5 skills, subject to change per TOA-264/265):
- Agents: speckit-specify, speckit-clarify, speckit-plan, speckit-tasks, branch-validation, changelog-agent, etc.
- Skills: Skills are agent-specific tools packaged in `.claude/skills/`

---

## Validation Rules

### Configuration Integrity

1. **Decision Ratification**: All governance decisions must be ratified by @ashley before implementation
   - Status: All 9 decisions ratified (SPEC-001, TEST-001, TEST-002, GH-001, GH-002, GH-003, PKG-001, NODE-001, STYLE-001)

2. **File Protection**: Protected paths (CHANGELOG.md, guidelines/, AGENTS.md) cannot be modified without CODEOWNERS approval
   - Enforced by: `locked-files-guard.yml` (implementation workflow per Q2)

3. **Label Consistency**: All labels must use family prefixes (type:, status:, area:, priority:, meta:)
   - Enforced by: `labeling-unified.yml` (PR template routing)

4. **Workflow Activation**: Only implementation workflows run by default; evaluation workflows require manual dispatch
   - Default: `lint.yml`, `tests.yml`, `locked-files-guard.yml`, and 5 others
   - Manual: `validate-specifications.yml`, `claude-guard-tests.yml`, etc.

### Path Uniqueness

- No duplicate specifications: `.github/specs/{NNN-feature}/` is canonical (SPEC-001)
- No conflicting test paths: Colocate unit tests with modules; integration tests in `tests/`
- No orphaned generated outputs: `dist/`, `export/`, `coverage/` explicitly gitignored

### Workflow Enforcement

- All implementation workflows must pass before PR merge (CI gating)
- Protected-file modifications detected by `locked-files-guard.yml` (always enabled per Q2)
- Branch protection rules enforced on `main` (strict) and `develop` (moderate)

---

## State Transitions

### Specification Lifecycle

```
[Specification] → [Clarified] → [Planned] → [Tasked] → [Implementing] → [Merged]
                      ↑             ↑         ↑           ↑                ↑
                   Q&A phase    Phase 0-1  Phase 2     Phase 3+    PR merge to develop
```

### Decision Lifecycle

```
[Proposed] → [Ratified] → [Implemented] → [Verified] → [Enforced]
               @ashley     CI integration   QA checks   CI gating
```

### Workflow Activation (per Q2 clarification)

```
[Deferred] ←→ [Evaluation] → [Implementation] → [Active]
 Manual OK    Manual dispatch    Always running    CI blocking
```

---

## Relationships

**Specification depends on** → Approved decisions (all 9)  
**Decision depends on** → Constitution principles (Spec Kit, Bundler, Package Management, etc.)  
**Workflow depends on** → Configuration files (CODEOWNERS, labels.yml, PR templates)  
**Agent depends on** → Tool access + budget enforcement (hard per Q3)  
**Path depends on** → Consumers (which workflows/agents/scripts use it)

---

## Completeness Checklist

- [x] 5 entity types modeled (Configuration, Path, Workflow, Metadata, Agent)
- [x] All 9 approved decisions represented (SPEC-001 through STYLE-001)
- [x] Validation rules defined (integrity, consistency, protection)
- [x] State transitions documented (lifecycle models)
- [x] Q1 clarification integrated (bundler enforcement ESLint)
- [x] Q2 clarification integrated (locked-files-guard always enabled)
- [x] Q3 clarification integrated (CODEOWNERS centralized authority)
- [x] No contradictions with spec.md
- [x] Constitution gates verified

---

**Status**: Phase 1 complete. Ready for `/speckit-tasks` task decomposition.
