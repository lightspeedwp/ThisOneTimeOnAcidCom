# Agent Inventory — ThisOneTimeOnAcidCom

**Generated:** 18 October 2026  
**Spec Reference:** `.github/specs/001-repo-governance-layout-and-agentic-workflows/spec.md` (R7.1)  
**Task:** T017a

This document provides an inventory of the AI agents and skills configured for
the ThisOneTimeOnAcidCom repository.

---

## Agent Specifications

A total of **20 agents** are defined and documented in this directory, with **5
skills** listed in the [skills inventory](#skill-specifications). Each agent is
described in its own `.md` file following the pattern `{agent-name}-agent.md`.

### Content Strategy & Documentation (4 agents)

| Agent | Purpose | File |
|-------|---------|------|
| Changelog Agent | Manage changelog entries using Keep a Changelog format with validation | `changelog-agent.md` |
| Content Strategy Agent | Provide content planning and voice guidance for portfolio site copy | `content-strategy-agent.md` |
| Document Reviewer Agent | Review documentation quality and completeness | `document-reviewer-agent.md` |
| Website Content Strategist Agent | Specialized content strategist for portfolio site messaging | `website-content-strategist-agent.md` |

### Design & User Experience (3 agents)

| Agent | Purpose | File |
|-------|---------|------|
| Design Partner Agent | Provide design system guidance and component recommendations | `design-partner-agent.md` |
| Metadata Agent | Validate and manage metadata (SEO, Open Graph, schema) | `metadata-agent.md` |
| Client Website Discovery Assistant Agent | Discover and analyze client websites and portfolio opportunities | `client-website-discovery-assistant-agent.md` |

### Development & Code (4 agents)

| Agent | Purpose | File |
|-------|---------|------|
| Branches Agent | Validate branch names against repository branching strategy | `branches-agent.md` |
| Labeling Agent | Manage GitHub issue and PR labeling workflows with consistent taxonomy | `labeling-agent.md` |
| PR Agent | Assist with pull request creation, review, and management | `pr-agent.md` |
| Reviewer Agent | Review code changes and design decisions | `reviewer-agent.md` |

### Testing & QA (2 agents)

| Agent | Purpose | File |
|-------|---------|------|
| Playwright Agent | Execute browser automation and e2e testing | `playwright-agent.md` |
| Testing Agent | Plan and execute test strategy | `testing-agent.md` |

### Issue & Project Management (3 agents)

| Agent | Purpose | File |
|-------|---------|------|
| BugHerd Agent | Assess BugHerd feedback and route to validation | `bugherd-agent.md` |
| Issue Agent | Manage issue triage, routing, and priority assignment | `issue-agent.md` |
| PRD Agent | Create product requirements and specifications | `prd-agent.md` |

### Analytics & Operations (3 agents)

| Agent | Purpose | File |
|-------|---------|------|
| Metrics Agent | Track and analyze portfolio site metrics and analytics | `metrics-agent.md` |
| PageSpeed Agent | Monitor and analyze Core Web Vitals and performance metrics | `pagespeed-agent.md` |
| Reporting Agent | Generate reports and analysis for site metrics and content | `reporting-agent.md` |

### Release & Deployment (1 agent)

| Agent | Purpose | File |
|-------|---------|------|
| Release Agent | Prepare and validate releases for portfolio site deployments | `release-agent.md` |

---

## Skill Specifications

The five skills in `.claude/skills/` provide the following reusable workflows.
Each linked specification documents its usage and constraints.

| Skill | Purpose | Specification |
| --- | --- | --- |
| Branch Validation | Check branch names | [SKILL.md][branch] |
| Changelog Management | Manage changelog entries | [SKILL.md][changelog] |
| Labeling Workflow | Apply issue and PR labels | [SKILL.md][labeling] |
| Test Execution | Run applicable test suites | [SKILL.md][test] |
| Validation | Check repository integrity | [SKILL.md][validate] |

[branch]: ../skills/branch-validation/SKILL.md
[changelog]: ../skills/changelog/SKILL.md
[labeling]: ../skills/labeling/SKILL.md
[test]: ../skills/test/SKILL.md
[validate]: ../skills/validate/SKILL.md

## Agent Discovery Process

Agents are automatically discovered by the Claude Code session via the `.claude/` directory structure. The following properties are extracted from each agent specification:

1. **Agent name** — derived from the filename (e.g., `changelog-agent.md` → "Changelog Agent")
2. **Purpose** — extracted from the first heading/section of the agent spec
3. **Tools** — listed in the agent configuration and available for use when the agent is invoked
4. **Constraints** — documented in the agent's specification file

## Budget Controls

Agent execution budgets are tracked separately per T7.3 (TOA-271). Each agent has:

- **Token budget**: Per-invocation maximum tokens (policy target)
- **Execution quota**: Maximum invocations per period (policy target)
- **Rate limiting**: Enforced by agent implementation and caller discipline

See `.github/specs/001-repo-governance-layout-and-agentic-workflows/` for budget allocation details.

---

## Maintenance & Updates

To add, modify, or remove an agent:

1. Edit the agent's `.md` file in this directory
2. Update this inventory to reflect changes
3. Open an issue with `[AGENT-INVENTORY-UPDATE]` tag for team review
4. Commit changes to the branch created for this change, following the
   repository branch naming rules

---

## Related Documentation

- **Agent Specifications**: Each agent file (`{name}-agent.md`)
- **Budget Controls**: `.github/specs/001-repo-governance-layout-and-agentic-workflows/` (R7.3)
- **Anthropic Platforms**: `docs/AnthropicPlatforms.md` (T017b)
- **Protected Files**: `.github/workflows/protected-files-guard.yml` (T017c)

---

## Comprehensive Agent Specifications

### Template: Agent Documentation Framework

Each agent specification (`.md` file) should include:

| Field | Description | Example |
|-------|-------------|---------|
| **Purpose** | What the agent does and why | Manage changelog entries per Keep a Changelog format |
| **Inputs** | Prompts, context, file paths, arguments | CHANGELOG.md path, PR description, version info |
| **Outputs** | Code, specs, reports, formatted entries | Validated CHANGELOG.md entries, validation report |
| **Tools** | Available tools for this agent | read, write, bash, grep |
| **Permissions** | Required GitHub/file access | Read CHANGELOG.md, write to CHANGELOG.md |
| **Workflow Relationships** | When called, from which workflows | Called on PR review, triggered by release workflow |
| **Validation Points** | Where/how results are validated | Schema validation, format checks, diff review |
| **Escalation** | When to pause and ask @ashley | Breaking format changes, version schema changes |
| **Budget** | Token limits, execution time, retry limits | 50K tokens max, 5-minute timeout, 2 retries |
| **Not In Scope** | What this agent doesn't handle | WordPress content, plugin updates (not applicable) |

### Sample Agent Documentation

#### Changelog Agent
- **Purpose**: Manage changelog entries using Keep a Changelog 1.1.0 format
- **Inputs**: CHANGELOG.md file, PR description/context, version number
- **Outputs**: Validated/formatted CHANGELOG.md, validation report
- **Tools**: read, write, bash
- **Permissions**: Read/write CHANGELOG.md (protected file — requires owner approval for changes beyond entries)
- **Workflow Relationships**: Triggered by changelog-unified.yml workflow on PR to release branches
- **Validation**: Format validation (em-dashes, capitalization, categories), schema validation (Keep a Changelog 1.1.0)
- **Escalation**: Breaking changes to version schema, multi-file changelog structure changes
- **Budget**: 20K tokens per invocation, 3-minute timeout, 2 retries
- **Not In Scope**: Multi-repository changelog aggregation, plugin changelogs

#### Branches Agent
- **Purpose**: Validate branch names against repository branching strategy
- **Inputs**: Branch name string, validation rules (type/scope/title pattern)
- **Outputs**: Validation result (pass/fail), detailed error messages with corrections
- **Tools**: bash
- **Permissions**: Read-only (no file modifications)
- **Workflow Relationships**: Called by validate:branch-name npm script and pre-push hooks
- **Validation**: Pattern matching (regex), type enumeration check, prefix validation
- **Escalation**: If validation rules need to change (requires owner approval)
- **Budget**: 5K tokens per invocation, 1-minute timeout, 1 retry
- **Not In Scope**: Enforcing branch protection rules (GitHub Settings only), deleting branches

---

## Agent Governance Principles

### Selection Criteria

Use an agent when:
- ✅ Task is repetitive and benefits from automation
- ✅ Decision tree is deterministic (can be documented)
- ✅ Output can be validated programmatically
- ✅ Escalation points are clearly defined
- ✅ Agent can operate within defined budget constraints

Do NOT use an agent when:
- ❌ Decision requires subjective judgment
- ❌ Task involves sensitive/critical changes without human review
- ❌ Output cannot be validated automatically
- ❌ Escalation would require interrupting work mid-task

### Budget Enforcement (TOA-271)

Required budget controls (policy targets; enforcement owned separately by TOA-271):

- **Token budget**: Maximum tokens per invocation (e.g., 20K for changelog agent)
- **Execution quota**: Maximum invocations per time period (e.g., 5 per day)
- **Rate limiting**: To be enforced at runtime; agent blocked if limits exceeded
- **Retry policy**: Configurable retries (typically 1-2) with exponential backoff
- **Timeout**: Wall-clock timeout per invocation (e.g., 3 minutes)

See `.github/BUDGET_CONTROLS.md` for full enforcement strategy.

### Workflow Integration

Agents integrate with workflows in three patterns:

1. **Pull-triggered**: Called by GitHub Actions workflows (e.g., changelog validation on PR)
2. **Push-triggered**: Called by developers via CLI scripts (e.g., `npm run validate:branch-name`)
3. **Manual delegation**: Invoked explicitly by human reviewer/owner (e.g., `/changelog-agent update PR #123`)

---

_Maintained by Claude Haiku 4.5 and team_  
_Last updated: 19 October 2026_
