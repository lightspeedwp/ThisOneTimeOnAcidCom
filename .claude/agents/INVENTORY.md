# Agent Inventory — ThisOneTimeOnAcidCom

**Generated:** 18 October 2026  
**Spec Reference:** `.github/specs/001-repo-governance-layout-and-agentic-workflows/spec.md` (R7.1)  
**Task:** T017a

This document provides a complete inventory of all AI agents configured for the ThisOneTimeOnAcidCom repository.

---

## Agent Specifications

A total of **20 agents** are defined and documented in this directory. Each agent is described in its own `.md` file following the pattern `{agent-name}-agent.md`.

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

## Agent Discovery Process

Agents are automatically discovered by the Claude Code session via the `.claude/` directory structure. The following properties are extracted from each agent specification:

1. **Agent name** — derived from the filename (e.g., `changelog-agent.md` → "Changelog Agent")
2. **Purpose** — extracted from the first heading/section of the agent spec
3. **Tools** — listed in the agent configuration and available for use when the agent is invoked
4. **Constraints** — documented in the agent's specification file

## Budget Controls

Agent execution budgets are tracked separately per T7.3 (TOA-271). Each agent has:

- **Token budget**: Per-invocation maximum tokens
- **Execution quota**: Maximum invocations per period (day/week/sprint)
- **Rate limiting**: Enforced by Claude Code runtime

See `.github/specs/001-repo-governance-layout-and-agentic-workflows/` for budget allocation details.

---

## Maintenance & Updates

To add, modify, or remove an agent:

1. Edit the agent's `.md` file in this directory
2. Update this inventory to reflect changes
3. Open an issue with `[AGENT-INVENTORY-UPDATE]` tag for team review
4. Commit changes to `build/repo-governance-continue-spec-001` branch

---

## Related Documentation

- **Agent Specifications**: Each agent file (`{name}-agent.md`)
- **Budget Controls**: `.github/specs/001-repo-governance-layout-and-agentic-workflows/` (R7.3)
- **Anthropic Platforms**: `docs/ANTHROPIC_PLATFORMS.md` (T017b)
- **Protected Files**: `.github/workflows/protected-files-guard.yml` (T017c)

---

_Maintained by Claude Haiku 4.5 and team_  
_Last updated: 18 October 2026_
