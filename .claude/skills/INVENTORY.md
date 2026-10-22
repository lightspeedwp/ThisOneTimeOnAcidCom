# Skill Inventory — ThisOneTimeOnAcidCom

**Generated:** 19 October 2026  
**Spec Reference:**
`.github/specs/001-repo-governance-layout-and-agentic-workflows/spec.md` (R7.1)
**Task:** T048

This document provides a complete inventory of all skills configured for the
ThisOneTimeOnAcidCom repository.

---

## Skill Specifications

A total of **5 skills** are defined and documented in this directory. Each skill
is described in its own subdirectory with a `SKILL.md` file.

### Validation & Governance (2 skills)

| Skill | Purpose | Invocation | File |
|-------|---------|-----------|------|
| Branch Validation | Validate branch names against repository branching strategy (type/scope-title pattern) | `/branch-validation` or `npm run validate:branch-name` | `branch-validation/SKILL.md` |
| Validate | Generic validation skill for configuration, lint, and schema checks | `/validate` | `validate/SKILL.md` |

### Testing & Quality Assurance (1 skill)

| Skill | Purpose | Invocation | File |
|-------|---------|-----------|------|
| Test | Plan and execute test strategy, validation suites, and quality gates | `/test` | `test/SKILL.md` |

### Release & Changelog Management (2 skills)

| Skill | Purpose | Invocation | File |
|-------|---------|-----------|------|
| Changelog | Manage CHANGELOG.md entries per Keep a Changelog 1.1.0 format | `/changelog` | `changelog/SKILL.md` |
| Labeling | Manage GitHub issue and PR labeling workflows with consistent taxonomy | `/labeling` | `labeling/SKILL.md` |

---

## Comprehensive Skill Specifications

### Template: Skill Documentation Framework

Each skill specification (`SKILL.md` file) should include:

| Field | Description | Example |
|-------|-------------|---------|
| **Purpose** | What the skill does | Validate branch names per naming strategy |
| **Invocation Pattern** | How to invoke the skill | `/branch-validation` or `npm run validate:branch-name` |
| **Prerequisites** | What must be set up first | Branch name in current git repo, validation rules loaded |
| **Inputs** | Prompts, config files, environment | Branch name string, CONTRIBUTING.md rules |
| **Outputs** | Generated artefacts | Validation result (pass/fail), formatted report |
| **Tool Access** | Available tools for this skill | bash, read, grep |
| **Permissions** | Required access level | Read-only (no file modifications) |
| **Skill-Specific Rules** | Governance unique to this skill | Prefix validation, type enumeration |
| **Budget** | Token limits, execution time, retry limits | 5K tokens max, 1-minute timeout, 1 retry |
| **Integration Points** | Where/how result is used | Pre-push hook, CI/CD pipeline, CLI command |

### Sample Skill Documentation

#### Branch Validation Skill

- **Purpose**: Validate branch names against repository branching strategy
- **Invocation**: `/branch-validation` or `npm run validate:branch-name -- --branch <name>`
- **Prerequisites**: Git repository initialized, branch name available
- **Inputs**: Branch name string, validation rules (pattern: `{type}/{scope}-{title}`)
- **Outputs**: JSON validation result with pass/fail status and detailed messages
- **Tool Access**: bash (read-only)
- **Permissions**: Read-only; no file modifications
- **Skill-Specific Rules**:
  - Type must be from enumerated list (feat, fix, docs, etc.)
  - Scope must be lowercase with hyphens only
  - Title must be lowercase with hyphens
  - FORBIDDEN prefixes: `claude/`, `copilot/`, `openai/`
  - Release branches follow semantic versioning (e.g., `release/v1.2.0`)
  - Dependabot/Renovate branches exempt (auto-pass)
- **Budget**: 5K tokens per invocation, 1-minute timeout, 1 retry
- **Integration Points**: Pre-push hook, `npm run validate:branch-name` CLI, GitHub Actions workflow

#### Changelog Skill

- **Purpose**: Manage CHANGELOG.md entries per Keep a Changelog 1.1.0 format
- **Invocation**: `/changelog` with arguments like `add`, `release`, `validate`
- **Prerequisites**: CHANGELOG.md exists at repository root, format compliance required
- **Inputs**: CHANGELOG.md file path, entry type (Added/Changed/Fixed/Removed/Security), entry text
- **Outputs**: Validated/formatted CHANGELOG.md entries, validation report with format errors
- **Tool Access**: read, write, bash
- **Permissions**: Read/write access to CHANGELOG.md (protected file — changes require PR review)
- **Skill-Specific Rules**:
  - Keep a Changelog 1.1.0 schema required
  - Exact em-dash character usage (— not -)
  - Entry capitalization (sentence case)
  - Line length limits (e.g., 80 chars for entry text)
  - Version format (semantic versioning)
  - Release date format (YYYY-MM-DD)
- **Budget**: 20K tokens per invocation, 3-minute timeout, 2 retries
- **Integration Points**: Changelog validation workflow, release automation, PR review process

---

## Skill Governance Principles

### Skill Lifecycle

1. **Creation**: New skill created in `.claude/skills/{skill-name}/SKILL.md`
2. **Documentation**: All required fields documented (purpose, invocation, inputs, outputs, budget, rules)
3. **Testing**: Skill tested with sample inputs and edge cases
4. **Approval**: Owner approval required before deployment
5. **Deployment**: Skill enabled and made available to CLI/workflows
6. **Maintenance**: Regular audits for performance and rule changes
7. **Deprecation**: Sunset notice, 2-week notice period before removal

### Selection: When to Create a Skill vs. Agent

**Create a skill when:**
- ✅ Action is deterministic and rule-based (e.g., validation, formatting)
- ✅ CLI command or repeated invocation pattern exists
- ✅ Results are always deterministic (same input = same output)
- ✅ No subjective decision-making required
- ✅ Can be used as utility across many workflows

**Create an agent when:**
- ✅ Decision-making requires reasoning (e.g., code review)
- ✅ Multi-step investigation or learning required
- ✅ Result may vary based on context
- ✅ Human collaboration/escalation likely
- ✅ Long-running task requiring ongoing adjustments

### Budget Enforcement

Each skill has required budget limits (policy targets; enforcement owned
separately by TOA-271):

- **Token budget**: Maximum tokens per invocation (e.g., 5K for branch validation)
- **Execution time**: Wall-clock timeout (e.g., 1 minute)
- **Retry policy**: Automatic retries with exponential backoff (typically 1 retry)
- **Concurrency**: Number of concurrent executions allowed (default: 1)
- **Rate limiting**: Invocations per time period (e.g., unlimited for sync skills)

### Integration Patterns

Skills integrate with workflows in three patterns:

1. **CLI Pattern**: Invoked via `/skill-name` command in Claude sessions
  - Example: `/branch-validation` to check branch name
  - User provides arguments inline or in prompts

2. **Workflow Pattern**: Triggered by GitHub Actions or scheduled tasks
  - Example: Changelog validation runs on PR to `main`
  - Workflow passes context automatically

3. **Programmatic Pattern**: Invoked by other agents or skills
  - Example: Release agent calls changelog skill to validate entries
  - Parent skill handles error handling and escalation

---

## Related Documentation

- **Skill Specifications**: Each skill directory (`{name}/SKILL.md`)
- **Agent Specifications**: `.claude/agents/INVENTORY.md`
- **Budget Controls**: `.github/BUDGET_CONTROLS.md` (T050)
- **Skill Routing**: `.claude/SKILL_ROUTING.md` (T051)
- **Agent Governance**: `.claude/GOVERNANCE.md` (T052)

---

_Maintained by Claude Haiku 4.5 and team_  
_Last updated: 19 October 2026_
