# Agent Specification Contracts

**Feature**: TOA-241 – Repository Governance Layout & Agentic Workflows  
**Phase**: 1 – Design & Contracts  
**Date**: 2026-10-17

---

## Overview

This document defines the interface contracts for ~18 agents and ~5 skills that operate within the repository governance system. Contracts specify: agent purpose, tool access list, permission scope, token budget, and integration points.

**Baseline Inventory**: 18 agents (subject to change per TOA-264/265), 5 skills. Per Q3 clarification, all budgets subject to hard enforcement (host-side limits, not advisory).

---

## Agent Specifications

### Spec Kit Agents (Workflow Foundation)

#### speckit-specify
- **Purpose**: Create feature specifications from user requirements
- **Input**: User narrative, acceptance criteria, stakeholder context
- **Output**: Specification document (spec.md) in `.github/specs/{NNN-feature}/`
- **Tools**: Read, Write, Edit, Grep, Glob, Bash, Artifact, Agent (for sub-research)
- **Permissions**: `file_write` (specs directory only), `git_read`
- **Budget**: 40k tokens/invocation (advisory → hard limit per Q3)
- **Called From**: User manual invocation; skill registry
- **Validation**: Output must be valid Markdown with required sections (overview, requirements, success criteria, assumptions)
- **Integration**: Outputs feed into `speckit-clarify` for ambiguity resolution
- **Constraints**: No protected-file modifications; no external API calls without approval

#### speckit-clarify
- **Purpose**: Resolve ambiguities in feature specifications via Q&A
- **Input**: Feature spec (spec.md); optional user context
- **Output**: Updated spec.md with clarifications section; resolved questions
- **Tools**: Read, Write, Edit, Bash
- **Permissions**: `file_write` (spec directory only), `file_read` (unrestricted)
- **Budget**: 25k tokens/invocation (advisory → hard limit per Q3)
- **Called From**: User manual invocation after `speckit-specify`
- **Validation**: Q&A session must stay within 5 questions; answers recorded in spec; no contradictions introduced
- **Integration**: Updated spec passes to `speckit-plan` for design phase
- **Constraints**: No implementation work; clarifications only

#### speckit-plan
- **Purpose**: Generate implementation plan, research agenda, and design artifacts
- **Input**: Clarified spec.md; optional technical context
- **Output**: plan.md, research.md, data-model.md, contracts/, quickstart.md
- **Tools**: Read, Write, Edit, Bash, Agent (for research delegation)
- **Permissions**: `file_write` (spec directory), `file_read` (unrestricted), `agent_spawn` (research agents)
- **Budget**: 60k tokens/invocation (advisory → hard limit per Q3)
- **Called From**: User manual invocation after `speckit-clarify`
- **Validation**: All research questions resolved; design phase gates pass; no specification violations
- **Integration**: Outputs form implementation foundation; feed to `speckit-tasks` for decomposition
- **Constraints**: No code generation; design only

#### speckit-tasks
- **Purpose**: Decompose implementation plan into actionable tasks
- **Input**: plan.md, research.md, data-model.md from speckit-plan
- **Output**: tasks.md with 50–100 granular tasks, dependency graph, phase organization
- **Tools**: Read, Write, Edit, Bash, Artifact
- **Permissions**: `file_write` (spec directory), `file_read` (unrestricted)
- **Budget**: 50k tokens/invocation (advisory → hard limit per Q3)
- **Called From**: User manual invocation after `speckit-plan`
- **Validation**: All requirements mapped to tasks; task graph acyclic; estimated effort reasonable
- **Integration**: Tasks feed to developers or `speckit-implement` for execution
- **Constraints**: No implementation work; task decomposition only

#### speckit-implement
- **Purpose**: Execute implementation tasks from tasks.md; coordinate multi-phase rollout
- **Input**: tasks.md; project state (source code, configuration)
- **Output**: Committed code changes; progress tracking; validation reports
- **Tools**: All tools (Read, Write, Edit, Bash, Agent, Artifact, etc.)
- **Permissions**: `file_write` (unrestricted), `file_read` (unrestricted), `git_write`, `github_api` (PR creation, comments)
- **Budget**: 200k+ tokens/session (hard limit per Q3, variable by task complexity)
- **Called From**: User manual invocation after `speckit-tasks`
- **Validation**: Each task must pass validation; tests pass; no protected-file violations
- **Integration**: Works with test runners, linters, formatters; produces PRs
- **Constraints**: Must respect protected-file list; no forced pushes without explicit approval

---

### GitHub Governance Agents

#### branch-validation
- **Purpose**: Validate branch names against naming convention
- **Input**: Branch name string; optional git context
- **Output**: Validation status; pass/fail with error details
- **Tools**: Bash, Read
- **Permissions**: `file_read` (`.github/CLAUDE.md`, branch rules only)
- **Budget**: 5k tokens/invocation (advisory → hard limit per Q3)
- **Called From**: Pre-push hooks; GitHub Actions; manual invocation
- **Validation**: Must correctly identify forbidden prefixes (`claude/`, `copilot/`, `openai/`)
- **Integration**: Feeds validation status to pre-push hooks and workflows
- **Constraints**: Pure deterministic validation; no state changes

#### labeling-agent
- **Purpose**: Assign labels to issues/PRs based on criteria
- **Input**: Issue/PR metadata; label taxonomy
- **Output**: Label assignment commands
- **Tools**: Read, Bash
- **Permissions**: `file_read` (labels.yml), `github_api` (label write)
- **Budget**: 10k tokens/invocation (advisory → hard limit per Q3)
- **Called From**: GitHub Actions (labeling-unified.yml); manual invocation
- **Validation**: All assigned labels must be from canonical set (labels.yml families)
- **Integration**: Works with `labeling-unified.yml` workflow
- **Constraints**: Prefixed labels only (type:*, status:*, area:*, priority:*, meta:*)

#### changelog-agent
- **Purpose**: Manage CHANGELOG.md entries using Keep a Changelog format
- **Input**: Commit messages, PR description, version bump
- **Output**: Updated CHANGELOG.md with formatted entries
- **Tools**: Read, Write, Edit, Bash
- **Permissions**: `file_write` (CHANGELOG.md only), `git_read`
- **Budget**: 15k tokens/invocation (advisory → hard limit per Q3)
- **Called From**: GitHub Actions (changelog-unified.yml); manual invocation
- **Validation**: Output must match Keep a Changelog 1.1.0 format; version increments correct
- **Integration**: Runs as part of `changelog-unified.yml` validation
- **Constraints**: CHANGELOG.md protected; changes require PR workflow validation

---

### Agentic Workflow Agents

#### branch-cleanup-agent
- **Purpose**: Analyze and recommend stale branch removal
- **Input**: Repository branch metadata; last-commit timestamps
- **Output**: Cleanup report; branch recommendation list
- **Tools**: Bash, Read, Artifact
- **Permissions**: `file_read` (git branches), `git_read`
- **Budget**: 20k tokens/invocation (advisory → hard limit per Q3)
- **Called From**: Manual invocation or scheduled workflow
- **Validation**: Report must be read-only (no deletions); must preserve protected branches
- **Integration**: Outputs for human review; no automatic branch deletion
- **Constraints**: Report-only; never deletes without explicit user command

#### issue-routing-agent
- **Purpose**: Route issues to correct team/workflow based on type and area
- **Input**: Issue metadata, labels, description
- **Output**: Routing assignment; team notification
- **Tools**: Read, Bash, Artifact
- **Permissions**: `file_read` (issue-types.yml, CODEOWNERS), `github_api` (issue assignment)
- **Budget**: 12k tokens/invocation (advisory → hard limit per Q3)
- **Called From**: GitHub Actions (automation workflow)
- **Validation**: Must route only to CODEOWNERS entries; no invalid assignments
- **Integration**: Works with `issue-types.yml` taxonomy
- **Constraints**: Respects CODEOWNERS authority; no manual override of explicit assignments

#### metrics-aggregator-agent
- **Purpose**: Collect and aggregate workflow/validation metrics
- **Input**: Workflow run data; validation results over time
- **Output**: Metrics dashboard; trend analysis; audit report
- **Tools**: Read, Bash, Artifact, Agent (for data fetch)
- **Permissions**: `file_read` (workflows, metrics), `github_api` (workflow runs read-only)
- **Budget**: 30k tokens/invocation (advisory → hard limit per Q3)
- **Called From**: Scheduled workflow or manual invocation
- **Validation**: Metrics must be aggregated correctly; no PII in reports
- **Integration**: Feeds into governance dashboard; generates audit trails
- **Constraints**: Read-only on all sources; aggregation only

---

### Supplementary Agents (Supporting Services)

#### claude-code-guide
- **Purpose**: Answer questions about Claude Code, Claude API, and agent development
- **Input**: User question or technical inquiry
- **Output**: Guidance, code examples, documentation links
- **Tools**: Read, WebFetch, WebSearch, Grep
- **Permissions**: `file_read` (documentation), `web_read`
- **Budget**: 25k tokens/invocation (advisory → hard limit per Q3)
- **Called From**: User manual invocation; help requests
- **Validation**: Responses must be accurate per current documentation; link validity
- **Integration**: Standalone reference agent; no state changes
- **Constraints**: Reference only; no code execution

#### general-purpose
- **Purpose**: Research and exploratory analysis for complex queries
- **Input**: Research question; context about task
- **Output**: Analysis report; recommendations; code examples
- **Tools**: All tools (flexible for research needs)
- **Permissions**: `file_read`, `file_write` (temporary artifacts), `web_read`, `agent_spawn`
- **Budget**: 100k+ tokens/session (hard limit per Q3, task-dependent)
- **Called From**: User delegation for research; complex analysis tasks
- **Validation**: Results must be well-reasoned; sources cited where applicable
- **Integration**: Supports other agents' research phases; produces reports
- **Constraints**: No permanent repository changes without explicit approval

---

## Skill Specifications

Skills are packaged agent capabilities registered in `.claude/skills/`. Each skill has a `SKILL.md` entrypoint documenting invocation syntax, expected inputs, and outputs.

### speckit-specify
- **Entrypoint**: `/speckit-specify` or `/skill:speckit-specify`
- **Description**: Launch `speckit-specify` agent with Spec Kit workflow
- **Inputs**: User narrative or feature context (optional)
- **Outputs**: Specification document; artifact link
- **Integration**: Foundation of specification-first workflow

### speckit-clarify
- **Entrypoint**: `/speckit-clarify` or `/skill:speckit-clarify`
- **Description**: Launch `speckit-clarify` agent for ambiguity resolution
- **Inputs**: Feature spec path (auto-detected from repo context)
- **Outputs**: Updated spec; clarification session record
- **Integration**: Runs after `/speckit-specify`

### speckit-plan
- **Entrypoint**: `/speckit-plan` or `/skill:speckit-plan`
- **Description**: Launch `speckit-plan` agent for design phase
- **Inputs**: Clarified spec (auto-detected)
- **Outputs**: plan.md, research.md, design artifacts
- **Integration**: Runs after `/speckit-clarify`

### speckit-tasks
- **Entrypoint**: `/speckit-tasks` or `/skill:speckit-tasks`
- **Description**: Launch `speckit-tasks` agent for task decomposition
- **Inputs**: plan.md (auto-detected)
- **Outputs**: tasks.md with decomposed tasks
- **Integration**: Runs after `/speckit-plan`

### speckit-implement
- **Entrypoint**: `/speckit-implement` or `/skill:speckit-implement`
- **Description**: Launch `speckit-implement` agent for implementation execution
- **Inputs**: tasks.md (auto-detected)
- **Outputs**: Committed code; progress reports; validation results
- **Integration**: Runs after `/speckit-tasks` for execution phase

---

## Anthropic Platform Integration

### API Layers Used

| Agent | Claude API | Tool Runner | Managed Agents | Prompt Caching | Tool Use | MCP |
|-------|-----------|------------|----------------|----------------|----------|-----|
| speckit-specify | ✅ | ✅ | ❌ | ✅ | ✅ | ✅ |
| speckit-clarify | ✅ | ✅ | ❌ | ✅ | ✅ | ✅ |
| speckit-plan | ✅ | ✅ | ❌ | ✅ | ✅ | ✅ |
| speckit-tasks | ✅ | ✅ | ❌ | ✅ | ✅ | ✅ |
| speckit-implement | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| branch-validation | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| labeling-agent | ✅ | ✅ | ❌ | ✅ | ✅ | ❌ |
| changelog-agent | ✅ | ✅ | ❌ | ✅ | ✅ | ✅ |
| metrics-aggregator | ✅ | ✅ | ❌ | ✅ | ✅ | ✅ |

**Legend**: ✅ Used, ❌ Not used, ✅ Optional

### Token Budgets

| Agent Class | Typical Budget | Hard Limit (Q3) | Context Window |
|-------------|----------------|-----------------|-----------------|
| Spec Kit agents | 25–60k | 100k | 200k (claude-opus-5-5) |
| GitHub agents | 5–20k | 50k | 100k (claude-sonnet-5-5) |
| Agentic workflow | 12–30k | 75k | 100k (claude-sonnet-5-5) |
| General-purpose | 50–100k+ | 200k | 200k (claude-opus-5-5) |

All budgets subject to hard enforcement post-Q3 per R7.3.

---

## Success Criteria

✅ **All ~18 agents initialized and documented in `.claude/agents/`**  
✅ **All ~5 skills registered with working `/skill-name` invocation**  
✅ **Agent tool access validated against repository permissions**  
✅ **Budget enforcement mechanism documented (host-side, per TOA-271)**  
✅ **No agent can modify protected files without CODEOWNERS approval**  
✅ **Spec Kit workflow (specify → clarify → plan → tasks → implement) functional**  
✅ **Agent output validates against specification contracts**  

---

## References

- **Specification**: `spec.md` (R7.1–R7.4, R9.2)
- **Data Model**: `data-model.md` (AgentSpec entity)
- **Implementation Tasks**: `tasks.md` (T035–T055 agent setup)
- **Agent Directory**: `.claude/agents/` (agent manifests)
- **Skill Directory**: `.claude/skills/` (skill entrypoints)
- **Constitution**: `.specify/memory/constitution.md` (R7.3 hard enforcement)
- **TOA-271**: Budget enforcement design (separate workstream)
- **TOA-264/265**: Agent/skill inventory evolution (future decisions)
