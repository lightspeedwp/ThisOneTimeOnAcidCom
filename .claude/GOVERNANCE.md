# Agent & Skill Governance Framework

**Document Status**: Governance specification for TOA-241 Repository Governance
Infrastructure
**Last Updated**: 2026-10-22
**Owner**: @ashley
**Scope**: Decision-making framework for agent selection, tool access, budget
approval, and escalation

---

## Purpose

Provide clear governance rules for:

1. **Selecting the right agent** for a task

1. **Approving budget increases** beyond standard allocations

1. **Granting/restricting tool access** per agent

1. **Escalating decisions** to @ashley when uncertain

1. **Enforcing contract compliance** (agents must read and follow guidelines/)

This document is the **authority on agent governance** for this repository. All
agents must read and comply with these rules.

---

## Table of Contents

1. [Agent Selection Guide](#agent-selection-guide)

1. [Budget Limits & Approval](#budget-limits--approval)

1. [Tool Access Policies](#tool-access-policies)

1. [Contract Compliance](#contract-compliance)

1. [Escalation Procedures](#escalation-procedures)

1. [Exceptions & Appeals](#exceptions--appeals)

---

## Agent Selection Guide

### Choosing the Right Agent

**Flowchart**:

```text
What is the task?
├─ Code review / Static analysis
│  └─ → Use: code-review agent (or code-review skill)
├─ Documentation, content, writing
│  ├─ Long-form (> 500 words) → brand-voice:content-generation
│  ├─ Single doc fix → Write directly (no agent needed)
│  └─ Marketing/sales content → sales:draft-outreach
├─ Feature specification
│  └─ → Use: speckit-* skills in sequence (specify → clarify → plan → tasks)
├─ Test strategy, validation
│  ├─ Unit test planning → test:test-strategy (or test skill)
│  └─ Validation checks → validate skill (or code-review)
├─ Repository governance
│  ├─ Branch naming → branch-validation skill
│  ├─ Configuration check → validate skill
│  └─ Label/automation management → Use issue management agents
├─ Sales / Customer engagement
│ └─ → Use sales:* family of agents (account-context, call-prep, draft-outreach,
etc.)
├─ Product / Design
│  ├─ Design critique → design:design-critique
│  ├─ Accessibility review → design:accessibility-review
│  └─ Design system work → design:design-system
├─ Changelog management
│  ├─ Automated entry → changelog skill
│  └─ Manual review/addition → changelog-agent
└─ Unknown / Hybrid task
   └─ Ask @ashley OR use general-purpose agent

```text

### Agent Type Reference

See `.agents/roles/INVENTORY.md` for complete agent specifications. Quick
reference:

| Agent | Purpose | Input | Output | Best For |
|-------|---------|-------|--------|----------|
| code-review | Static analysis for bugs | Code diff/PR | Findings report | Code review before merge |
| changelog-agent | Changelog management | Changes list | Updated CHANGELOG | Documenting releases |
| branches-agent | Branch naming validation | Branch name | Pass/fail + reason | Naming compliance |
| design-partner | Design guidance | UI mockup/spec | Design recommendations | Component design |
| reporting-agent | Metrics/analytics | Data source | Report artifact | Monthly dashboards |
| playwright-agent | Browser testing | Test scenario | Test results | E2E validation |
| general-purpose | Fallback for anything | Any task | Results | When no specialized agent fits |

---

## Budget Limits & Approval

### Standard Budget Allocations

**These are APPROVED by default** (no additional approval needed):

| Agent | Token Limit | Time Limit | Cost Ceiling | Approved By |
|-------|-------------|-----------|--------------|------------|
| code-review | 50,000 | 10 min | $0.50 | Standard |
| changelog-agent | 30,000 | 10 min | $0.30 | Standard |
| branches-agent | 20,000 | 5 min | $0.20 | Standard |
| design-partner | 100,000 | 30 min | $1.00 | Standard |
| playwright-agent | 150,000 | 60 min | $2.00 | Standard |
| general-purpose | 200,000 | 120 min | $3.00 | Standard |
| sales:account-research | 250,000 | 180 min | $5.00 | Standard |
| brand-voice:discover-brand | 300,000 | 240 min | $8.00 | Standard |

### Requesting Budget Increases

**When you need MORE than standard allocation**:

1. **Justify**: Why does this task need more budget? Provide concrete reason:

- "This codebase is 50k+ lines; standard review budget insufficient for thorough
analysis"
   - "Deep research across 10+ documents; 300k tokens estimated"
   - "Complex migration requiring iterative testing; time-intensive"

1. **Estimate**: Provide specific numbers requested:

   - Requested token limit: X
   - Requested time limit: Y minutes
   - Requested cost ceiling: $Z
   - Explain how you estimated (word count, complexity factors, etc.)

1. **Risk assessment**: What happens if budget is exceeded?

   - "Task will fail mid-execution (incomplete output)"
   - "Partial results returned (usable but incomplete)"
   - "Session suspended, requires resumption in new session"

1. **Submit approval request**: Create issue with tag
`[BUDGET-INCREASE-REQUEST]`:

```text
   Title: [BUDGET-INCREASE-REQUEST] code-review for AWS Lambda migration (TOA-X)

   Body:
   Agent: code-review
   Task: Review AWS Lambda migration PR (50k+ lines)
   Current budget: 50k tokens
   Requested: 200k tokens (4x increase)
   Reason: Codebase size + infrastructure changes require deep analysis
   Estimated completion: 50k tokens consumed
   Risk if denied: Incomplete review, missed security issues

   Approval from: @ashley

```text

1. **Wait for approval**: @ashley will respond with ✅ approved or ❌ denied +
rationale

1. **If approved**: Execute agent with increased budget using approved amounts

1. **If denied**: Work with smaller budget or break task into multiple runs

### Cost Trends Monitoring

Infrastructure monitors cost trends per agent:

- **WARNING**: Agent usage exceeds 150% of standard allocation (e.g., normally $3/session, used $4.50)
- **ALERT**: Agent usage exceeds 200% of standard allocation (e.g., normally $3, used $6+)
- **ESCALATION**: Three consecutive alerts on same agent → owner review of allocations

---

## Tool Access Policies

### Base Tool Access (All Agents)

**All agents have read-only access to**:

- Project files (Read, Glob, Grep)
- Git history (no push/force-push)
- GitHub issue/PR history (read-only)
- Artifact viewing (read published artifacts)

### Per-Agent Tool Restrictions

#### **code-review agent**

```text
✅ Allowed:

- Read source code (all file types)
- GitHub API: read PRs, commits, comments
- Artifact creation: publish findings
- Bash: read-only file operations

❌ Restricted:

- Git push (no direct commits)
- GitHub write (no comments, no label changes)
- File modification (code is read-only)
- Delete operations

```text

#### **changelog-agent**

```text
✅ Allowed:

- Read CHANGELOG.md (and related files)
- Write CHANGELOG.md (within keep-a-changelog format)
- Read git log (for version history)
- Bash: file operations on CHANGELOG.md only

❌ Restricted:

- Modify any OTHER file
- Git operations beyond reading history
- Delete CHANGELOG.md or version entries
- Rewrite version history

```text

#### **design-partner agent**

```text
✅ Allowed:

- Read component code
- Read design system files
- Create Figma designs (if Figma connector available)
- Artifact creation: publish design recommendations
- Comment on design decisions

❌ Restricted:

- Commit code (recommendations only, author implements)
- Modify component files (read-only)
- Deploy changes to production

```text

#### **General-Purpose agent**

```text
✅ Allowed:

- All read-only tools
- File reads/globs
- Artifact viewing/creation
- GitHub read (issues, PRs, comments)

❌ Restricted:

- Any write operations (files, git, github)
- Deployment or infrastructure changes
- External API calls (unless explicitly approved)
- Database modifications

```text


## Contract Compliance

### Agent Contract Checklist

**Every agent MUST**:

- [ ] **Read this document** (GOVERNANCE.md) before any work
- [ ] **Read the repository-specific guidelines** in `guidelines/`
- [ ] **Follow branch naming rules** (see CLAUDE.md)
- [ ] **If authorised to commit, commit with proper attribution** (see CLAUDE.md footer)
- [ ] **Document decisions** (code comments, commit messages)
- [ ] **Escalate when uncertain** (don't guess on governance)
- [ ] **Validate work before committing** (no breaking changes)
- [ ] **Monitor budget consumption** (report if approaching limits)

### Compliance Audits

**Monthly audit**:

1. Review agent execution logs

1. Validate all commits have proper attribution

1. Check for protected file modifications

1. Confirm budget allocations were honored

1. Escalate any violations to @ashley

---

## Escalation Procedures

### When to Escalate to @ashley

**Escalate immediately if**:

1. **Uncertainty on governance rules**: "Am I allowed to modify this file?"

1. **Budget exceeded**: "My analysis used 120k tokens, standard is 50k"

1. **Protected file modification needed**: "I need to update
.github/workflows/..."

1. **Tool access needed**: "I need to push commits, not just read"

1. **New agent type needed**: "This task doesn't fit any standard agent"

1. **Compliance question**: "Does this violate the contract?"

1. **Breaking change detected**: "My changes break existing functionality"

### How to Escalate

**Format**:

```text
Subject: [ESCALATION] {brief description}

Context:

- What are you trying to do?
- Why do you think you need escalation?
- What specific question do you have?

Decision needed:

- Approve / Deny (with reasoning)
- Alternative approach?

Timeline:

- How urgent? (blocker / normal / can wait)

```text

**Example**:

```text
Subject: [ESCALATION] Need to modify protected file .github/workflows/test.yml

Context:
I found a bug in the test workflow that prevents PR checks from running.
The bug is a 1-line fix in .github/workflows/test.yml (line 42).

Decision needed:
Can I modify this protected file to fix the bug?
Or should I open an issue for manual fix by @ashley?

Timeline:
Blocker — no PRs can merge until CI works

```text

### Response Time

- **Blocker escalations**: Response within 1 hour
- **Normal escalations**: Response within 24 hours
- **Can-wait escalations**: Response within 1 week

---

## Exceptions & Appeals

### Appealing a Decision

If @ashley denies a budget increase or tool access request:

1. **Understand the reason**: Ask for specific rationale

1. **Propose alternative**: Smaller budget? Different approach? Split into
phases?

1. **Escalate with new info**: If you have new data that changes the calculus

**Example appeal**:

```text
Subject: [APPEAL] code-review budget increase request

Original request: 200k tokens for Lambda migration review
Decision: Denied (too high)

New proposal:
Run code-review twice with 100k tokens each:

- Pass 1: Security + architecture review (100k)
- Pass 2: Implementation details + testing (100k)
- Total cost: same, but two smaller sessions are more manageable

Can we approve 100k + 100k (two separate runs)?

```text

### Policy Changes

If you believe a governance rule needs changing:

1. **Document the issue**: What rule is problematic? How does it limit you?

1. **Propose alternative**: What would be better?

1. **Submit as issue**: Tag with `[GOVERNANCE-CHANGE-REQUEST]`

1. **Wait for decision**: @ashley will review and respond

---

## Quick Reference Checklists

### Starting a New Task

- [ ] Select agent using flowchart (Agent Selection Guide)
- [ ] Check standard budget allocation (Budget Limits table)
- [ ] Verify agent has required tool access
- [ ] Read agent's specific SKILL.md or agent.md document
- [ ] Confirm task complies with protected file restrictions
- [ ] If budget increase needed, request approval first
- [ ] Proceed with agent invocation

### Before Committing Work

- [ ] Task completed successfully
- [ ] No protected files modified (unless approved)
- [ ] Proper attribution in commit messages
- [ ] Budget was within approved limits
- [ ] Documentation updated (if needed)
- [ ] No breaking changes to existing functionality
- [ ] Code validated (tests pass, lint passes)

### If You Hit a Budget Limit

- [ ] Report exact tokens/time/cost consumed
- [ ] Summarize progress (% complete, major milestones)
- [ ] Note what remains to be done
- [ ] Save work artifacts
- [ ] Create new session with fresh budget if task continues
- [ ] Link artifacts between sessions

---

## References

- `.agents/roles/INVENTORY.md` — Complete agent specifications
- `.agents/skills/INVENTORY.md` — Skill specifications and routing
- `.claude/BUDGET_CONTROLS.md` — Budget enforcement mechanisms
- `.claude/SKILL_ROUTING.md` — Execution environment decisions
- `.github/CLAUDE.md` — Repository-specific rules
- `guidelines/` — Coding standards and best practices
- `CONTRIBUTING.md` — Contribution workflow

---

**End of Document**
*Maintained as part of TOA-241 Repository Governance Infrastructure*
*All agents must read and comply with this governance framework*
*Questions? Escalate to @ashley*
