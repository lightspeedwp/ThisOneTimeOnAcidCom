# Agent Inventory — ThisOneTimeOnAcidCom

# Agent Inventory — ThisOneTimeOnAcidCom

**Last Updated**: 2026-10-22  
**Status**: Phase 2 Governance Documentation  
**Scope**: 20 agents, portfolio site specialized agents

---

## Overview

This document inventories all AI agents in ThisOneTimeOnAcidCom's `.claude/agents/` directory. All 20 agent manifests have YAML frontmatter with `enabled: true`. Each agent serves a distinct purpose in the portfolio site's development, content strategy, and operations workflows.

**Note**: Budget enforcement (hard limits) is specified in TOA-271 (separate epic); this inventory documents requirements and agent relationships only.

---

## Agent Registry

| Agent Name | Purpose | Domain | Input | Output | Primary Tools | Permissions | Budget Constraint |
|---|---|---|---|---|---|---|---|
| **branches-agent** | Branch validation and Git workflow enforcement | Infrastructure | Branch name, Git operations | Validation results | Read, Write, Bash | Branch changes require explicit permission | Pending (TOA-271) |
| **bugherd-agent** | BugHerd feedback assessment and routing | QA/Testing | Feedback data | Test validation results | Read, Write, Bash | Testing | Pending (TOA-271) |
| **changelog-agent** | Changelog management (Keep a Changelog format) | Documentation | Changelog entries | Validated entries | Read, Write, Bash | Content | Pending (TOA-271) |
| **client-website-discovery-assistant-agent** | Website discovery and analysis | Research | URLs, project context | Discovery reports | Read, Write, Bash | Research | Pending (TOA-271) |
| **content-strategy-agent** | Content planning and voice guidance | Content | Content briefs | Strategy docs | Read, Write, Bash | Content | Pending (TOA-271) |
| **design-partner-agent** | Design system guidance | Design | Design requirements | Component recommendations | Read, Write, Bash | Design | Pending (TOA-271) |
| **document-reviewer-agent** | Documentation quality review | Documentation | Markdown files | Review results | Read, Write, Bash | Documentation | Pending (TOA-271) |
| **issue-agent** | GitHub issue triage and routing | DevOps | Issue data | Triage results | Read, Write, Bash | GitHub | Pending (TOA-271) |
| **labeling-agent** | GitHub issue/PR labeling | DevOps | GitHub metadata | Labels applied | Read, Write, Bash | GitHub | Pending (TOA-271) |
| **metadata-agent** | SEO and metadata validation | Content | Page metadata | Validation report | Read, Write, Bash | Content | Pending (TOA-271) |
| **metrics-agent** | Analytics tracking and reporting | Reporting | Usage data | Metric summaries | Read, Write, Bash | Reporting | Pending (TOA-271) |
| **pagespeed-agent** | Core Web Vitals monitoring | Performance | Performance data | Audit results | Read, Write, Bash | Monitoring | Pending (TOA-271) |
| **playwright-agent** | Browser automation and testing | Testing | Test scenarios | Evidence, artifacts | Read, Write, Bash | Testing | Pending (TOA-271) |
| **prd-agent** | Product requirement documentation | Product | Requirements | Specification docs | Read, Write, Bash | Product | Pending (TOA-271) |
| **pr-agent** | Pull request creation and review | DevOps | PR data | PR management results | Read, Write, Bash | GitHub | Pending (TOA-271) |
| **release-agent** | Release validation and deployment | DevOps | Release data | Deployment results | Read, Write, Bash | Deployment | Pending (TOA-271) |
| **reporting-agent** | Report generation and analysis | Reporting | Data sources | Reports | Read, Write, Bash | Reporting | Pending (TOA-271) |
| **reviewer-agent** | Code change review | QA | Code diffs | Review findings | Read, Write, Bash | Review | Pending (TOA-271) |
| **testing-agent** | Test strategy planning | Testing | Requirements | Test plan | Read, Write, Bash | Testing | Pending (TOA-271) |
| **website-content-strategist-agent** | Website copy and engagement | Content | Site context | Content strategy | Read, Write, Bash | Content | Pending (TOA-271) |

---

## Relationship Map

### By Domain

**Infrastructure** (1 agent)
- branches-agent — Git and branch validation

**DevOps/GitHub** (4 agents)
- issue-agent — Issue triage
- labeling-agent — PR/issue labeling
- pr-agent — PR management
- release-agent — Deployment

**Testing/QA** (4 agents)
- bugherd-agent — BugHerd assessment
- playwright-agent — Browser automation
- reviewer-agent — Code review
- testing-agent — Test planning

**Content/Design** (6 agents)
- changelog-agent — Changelog management
- content-strategy-agent — Voice guidance
- design-partner-agent — Design system
- document-reviewer-agent — Docs review
- metadata-agent — SEO validation
- website-content-strategist-agent — Copy strategy

**Research/Discovery** (1 agent)
- client-website-discovery-assistant-agent — Website analysis

**Reporting/Monitoring** (4 agents)
- metrics-agent — Analytics
- pagespeed-agent — Performance
- prd-agent — Product specs
- reporting-agent — Report generation

### Workflow Dependencies

- **PR Workflow**: pr-agent → labeling-agent → reviewer-agent
- **Release Workflow**: release-agent → testing-agent → playwright-agent
- **Content Workflow**: content-strategy-agent → document-reviewer-agent → changelog-agent
- **Discovery Workflow**: client-website-discovery-assistant-agent → metadata-agent → metrics-agent

---

## Tools Access Summary

**Declared tools** (from manifest YAML frontmatter):

- **Read**: 20/20 agents
- **Write**: 20/20 agents
- **Bash**: 20/20 agents

Git and Playwright describe workflow capabilities; neither is declared as a separate tool in these manifests. Registry permissions describe operating rules, not enforced tool restrictions.

**Global integrations** (separate from per-agent declarations):

- `.claude/settings.json` does not declare any MCP servers or integrations.
- `.claude/settings.example.json` includes `integrations.github.enabled: true` as an example global integration; it does not configure a GitHub MCP server or assign access to individual agents.
- No MCP servers are configured in either settings file.

---

## Budget Constraints

**Status**: Budget enforcement is managed separately under **TOA-271** (AI Agent Budget Controls epic).

Pending decisions:
- Token budgets per agent per execution
- Concurrent agent limits
- Cost tracking and alerts
- Escalation procedures

**Note**: This inventory documents agent purposes and relationships. Budget configuration will be applied in TOA-271.

---

## Configuration & Extension

### Updating Agent Inventory

When adding or removing agents:
1. Add/remove row in Agent Registry table above
2. Update Relationship Map by domain
3. Update Workflow Dependencies if applicable
4. Update Tools Access Summary
5. Commit changes with message: "docs: update agent inventory (add/remove {agent-name})"

### Budget Tracking (TOA-271)

When TOA-271 is implemented, add a `Budget` column to the registry table with:
- Token limit per execution
- Concurrency limit
- Cost category (priority, standard, background)

---

## References

- **Specification**: `.github/specs/001-repo-governance-layout-and-agentic-workflows/spec.md` (R7.1)
- **Budget Enforcement**: TOA-271 (separate epic)
- **Related Skills**: `.claude/skills/` (5 skills, listed in AGENTS.md)
- **Workflow Documentation**: `.github/workflows/` (17 workflows)

---

_Maintained as part of Phase 2 Governance Documentation (TOA-241)_
_Generated with Claude Code on 2026-10-22_
