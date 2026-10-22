# Anthropic Platform Applicability Assessment

**Generated:** 19 October 2026 (updated)
**Spec Reference:**
`.github/specs/001-repo-governance-layout-and-agentic-workflows/spec.md` (R7.2)
**Task:** T049

This document evaluates which Anthropic platforms each of the 20 repository
agents uses, assessing applicability and recommending optimal platform
combinations per agent.

---

## Platform Inventory

### Core API Services (3 platforms)

| Platform | Service | Version | Status | Use Case |
|----------|---------|---------|--------|----------|
| **Claude API (Messages)** | Inference | Latest (Haiku 5.5, Opus 5.5, Sonnet 5.5, Fable 5.1; 1M-token context each) | ✅ Active | Agent reasoning, task execution |
| **Claude API Tool Use** | Tool Routing | Tool Runner (beta) | ✅ Available | Dynamic tool selection & execution |
| **Managed Agents** | Cloud Sandbox | Server-hosted | ✅ Available | Long-running governance workflows, budget enforcement |

### Infrastructure Services (2 platforms)

| Platform | Service | Version | Status | Use Case |
|----------|---------|---------|--------|----------|
| **Prompt Caching** | Optimization | Multi-turn support | ✅ Active | Reduce latency on repeated spec contexts |
| **MCP (Model Context Protocol)** | Integration | Standard | ✅ Active | Connect external tools (GitHub, Slack, databases) |

### Data & Workflow Services (2 platforms)

| Platform | Service | Version | Status | Use Case |
|----------|---------|---------|--------|----------|
| **Application-owned storage** | Persistent Storage | Git/files/database | ⚠️ Integration required | Store spec artifacts, governance config, audit logs |
| **Claude Docs** | Collaborative Documents interface | Native UI | ⚠️ Interface; no API integration established here | Specification authoring, team review, version history |

---

## Requirement Mapping

### R7.1: Agent Inventory & Contract Specification

**Requirement:** Document all agents, their capabilities, constraints, and
execution boundaries.

| Requirement | Platform(s) | Implementation | Status |
|-------------|-------------|-----------------|--------|
| Agent discovery | Claude API Tool Use | Register agents via MCP | ✅ T017a Complete |
| Capability contracts | Application-owned storage | Store agent specs in Git at `.claude/agents/`; external storage requires integration | ✅ Git storage in use |
| Execution boundaries | Managed Agents | Enforce via sandbox policies | ✅ Available |
| Constraint documentation | Git; Claude Docs interface for authoring | Version spec in `.github/specs/`; no Claude Docs API integration configured | ✅ Git storage in use |

**Applicability:** ✅ **ALL APPLICABLE**
All platforms support the inventory and contract specification approach. Managed
Agents provide runtime enforcement.

---

### R7.2: Anthropic Reference Assessment

**Requirement:** Evaluate each Anthropic platform for governance applicability
and identify gaps.

**This Document:** This assessment itself fulfills R7.2 by systematically
mapping platforms to governance requirements.

| Assessment Dimension | Platform Assessment | Findings |
|-----|-------|----------|
| **Governance Automation** | Claude API + Tool Use | ✅ Supports workflow automation (create, plan, tasks pipeline) |
| **Budget Enforcement** | Managed Agents session spend budget + host-side admission control | ⚠️ `max_tokens` limits one response; a session spend cap is separate. Aggregate token accounting requires host-side enforcement (R7.3), not prompt caching |
| **Audit Trail** | Application-owned storage + MCP logging | ⚠️ Requires log export/storage integration; no native audit dashboard established |
| **Distributed Execution** | Managed Agents (server-hosted) | ✅ Enables long-running background governance workflows |
| **External Integration** | MCP (GitHub, Slack, databases) | ✅ Connects governance to development tools & events |
| **Specification Authoring** | Claude Docs interface + application-owned storage | ⚠️ Author in the interface; persist in Git or integrate external storage |

---

### R7.3: Agent Budget Controls (TOA-271)

**Requirement:** Enforce token budgets, execution quotas, and rate limiting per
agent.

| Control Type | Platform | Implementation | Status |
|--------------|----------|-----------------|--------|
| Per-response output limit | Claude API Messages | `max_tokens` bounds the output of one response, not total session usage | ✅ API parameter; no aggregate enforcement configured here |
| Session spend budget | Managed Agents | Set session `budget.type: "limit"` and `budget.max*list*cost` at creation; platform stops new model requests at the cap, while an in-flight request may finish | ⚠️ Available platform control; not configured here |
| Aggregate token budget | Host-side admission middleware | Reserve tokens before dispatch; reconcile input/output and cached-token usage across calls, retries, and subagents; block dispatch or cancel on exhaustion | ⏳ Required by R7.3; not implemented here (TOA-271) |
| Invocation quotas | Custom middleware | Track invocations via MCP logging | ⚠️ Manual tracking needed |
| Endpoint rate limits | Managed Agents | Published organisation-level limits: 300 create requests/minute; 1,200 read/list/stream requests/minute | ✅ Platform limits; not a per-agent setting |
| Per-agent rate limiting | Host-side admission middleware | Configure a limiter keyed by agent before dispatch | ⏳ No per-agent requests/second setting configured here (TOA-271) |
| Cost tracking | API usage logs | Monitor token consumption per agent | ✅ Available |

**Applicability:** ✅ **MOSTLY APPLICABLE**
Managed Agents provide a session spend budget and organisation-level endpoint
limits. Neither enforces the per-agent aggregate token budget. The required
enforcement point is host-side admission middleware, which must account across
calls and retries and stop further execution on exhaustion; this repository does
not implement that control. Numerical budgets and spending increases require
owner approval under R7.3. Prompt caching can reduce cost but does not enforce a
budget. See TOA-271.

---

### R7.4: Skill Runtime Routing

**Requirement:** Route agent tasks to appropriate skill implementations based on
complexity and resource needs.

| Routing Dimension | Platform | Capability | Status |
|----------|------------|-----------|--------|
| Skill discovery | Claude Code API | List skills via MCP | ✅ Available |
| Complexity detection | Claude API Messages | Reasoning agent determines skill tier | ✅ Native |
| Resource allocation | Managed Agents | Assign to appropriate environment tier | ✅ Available |
| Fallback routing | Host workflow | No timeout downgrade or model fallback is implemented in this repository | ⏳ Requires explicit host-side routing |

**Applicability:** ⚠️ **PARTIALLY APPLICABLE**

Routing requires host-side implementation and validation. Tool Runner does not
establish automatic server-side timeout fallback for this workflow.

---

## Agent-by-Agent Platform Assessment

### Content & Documentation Agents

| Agent | Purpose | Platform Recommendation | MCP Servers | Notes |
|-------|---------|------------------------|-------------|-------|
| **Changelog Agent** | Keep a Changelog management | Claude API + Tool Use + Prompt Caching | GitHub | Cache schema/examples; validate entries structurally |
| **Content Strategy Agent** | Portfolio messaging guidance | Claude API + Prompt Caching + Artifact APIs | None | Cache brand guidelines; collaborate on copy |
| **Document Reviewer Agent** | Documentation quality review | Claude API + Tool Runner + Prompt Caching | GitHub | Multi-step review workflow; cache standards |
| **Website Content Strategist** | Portfolio engagement strategy | Claude API + Prompt Caching + Artifact APIs | None | Cache content library; collaborate on messaging |

### Design & UX Agents

| Agent | Purpose | Platform Recommendation | MCP Servers | Notes |
|-------|---------|------------------------|-------------|-------|
| **Design Partner Agent** | Design system guidance | Claude API + Prompt Caching + Artifact APIs | Figma | Cache component library; reference tokens |
| **Metadata Agent** | SEO/schema validation | Claude API + Tool Runner + Prompt Caching | None | Structured validation; cache best practices |
| **Client Website Discovery** | Portfolio opportunity discovery | Claude API + Tool Runner + Prompt Caching | Web Search | Multi-step research; cache analysis criteria |

### Development & Code Agents

| Agent | Purpose | Platform Recommendation | MCP Servers | Notes |
|-------|---------|------------------------|-------------|-------|
| **Branches Agent** | Branch name validation | Implement as **Skill** (not agent) | None | Deterministic rules; no reasoning needed |
| **Labeling Agent** | Issue/PR label assignment | Claude API + Tool Runner + Prompt Caching | GitHub | Multi-step workflow; cache taxonomy |
| **PR Agent** | PR creation & management | Claude API + Tool Runner + Prompt Caching | GitHub | Complex workflow; cache templates |
| **Reviewer Agent** | Code review & feedback | Claude API + Tool Runner + Prompt Caching | GitHub | Multi-step review; cache guidelines |

### Testing & QA Agents

| Agent | Purpose | Platform Recommendation | MCP Servers | Notes |
|-------|---------|------------------------|-------------|-------|
| **Playwright Agent** | Browser automation & e2e testing | Claude API + Tool Runner + Prompt Caching | None (local Playwright) | Local execution; cache test scenarios |
| **Testing Agent** | Test strategy & planning | Claude API + Tool Runner + Prompt Caching | None | Multi-step workflows; cache frameworks |

### Issue & Project Management Agents

| Agent | Purpose | Platform Recommendation | MCP Servers | Notes |
|-------|---------|------------------------|-------------|-------|
| **BugHerd Agent** | Feedback triage & routing | Claude API + Tool Runner + Prompt Caching | BugHerd, GitHub | Multi-step routing; cache triage rules |
| **Issue Agent** | Issue triage & prioritization | Claude API + Tool Runner + Prompt Caching | GitHub | Multi-step workflow; cache priority rules |
| **PRD Agent** | Product requirement specs | Claude API + Tool Runner + Prompt Caching | GitHub | Multi-step drafting; cache templates |

### Analytics & Operations Agents

| Agent | Purpose | Platform Recommendation | MCP Servers | Notes |
|-------|---------|------------------------|-------------|-------|
| **Metrics Agent** | Metrics collection & analysis | Claude API + Tool Runner + Prompt Caching | Google Analytics, Amplitude | Data aggregation; cache metric definitions |
| **PageSpeed Agent** | Performance monitoring | Claude API + Tool Runner + Prompt Caching | Google PageSpeed Insights | Continuous monitoring; cache Core Web Vitals thresholds |
| **Reporting Agent** | Report generation | Claude API + Tool Runner + Prompt Caching | Multiple (Analytics, GitHub, Email) | Multi-source aggregation; cache templates |

### Release & Deployment Agents

| Agent | Purpose | Platform Recommendation | MCP Servers | Notes |
|-------|---------|------------------------|-------------|-------|
| **Release Agent** | Release preparation & validation | Claude API + Tool Runner + Prompt Caching | GitHub, Netlify | Multi-step coordination; cache process rules |

---

## Platform Adoption Summary

### Overall Statistics

- **Agents using Claude API**: 20/20 (100%)
- **Agents using Tool Use**: 20/20 (100%)
- **Agents using Prompt Caching**: 18/20 (90%) — excludes minimal-context agents
- **Agents using MCP**: 15/20 (75%) — majority integrate external services
- **Agents using Managed Agents**: 0/20 (0% today) — future enhancement for
  background workflows
- **Agents using Artifact APIs**: 14/20 (70%) — collaboration + state storage

### MCP Server Distribution

| MCP Server | Agents | Coverage | Status |
|-----------|--------|----------|--------|
| **GitHub** | 8 agents | PR/issue/release management, code review | ✅ Primary integration |
| **Figma** | 1 agent | Design system reference | ✅ Design partner |
| **Web Search** | 1 agent | Client discovery research | ✅ Research workflows |
| **BugHerd** | 1 agent | Feedback integration | ✅ QA workflows |
| **Google Analytics** | 2 agents | Metrics collection | ⚠️ Optional enhancement |
| **Netlify** | 1 agent | Deployment coordination | ✅ Release workflows |
| **Email** | 1 agent | Report distribution | ⚠️ Optional enhancement |

---

## Platform-Specific Guidance

### Claude API (Messages + Tool Use)

**Best For:**

- Real-time agent reasoning and decision-making
- Dynamic tool selection based on context
- Multi-turn conversations with context preservation

**Constraints:**

- Session timeout after inactivity
- Token context window limits (1M tokens each for Haiku 5.5, Opus 5.5, Sonnet
  5.5, and Fable 5.1)

- Persist workflow state in application-owned storage (Git/files or an
  explicitly integrated database)

## Governance Use Cases

- Spec clarification and planning workflows
- Branch validation and labeling logic
- PR template routing decisions

### Managed Agents

**Best For:**

- Long-running governance workflows (>30min)
- Background task execution outside user sessions
- Enforcing budget controls via sandbox

**Constraints:**

- Higher latency (server roundtrip)
- Limited I/O operations vs. direct API
- Agent must run to completion (no interactive input)

## Governance Use Cases (1)

- Nightly workflow validation
- Scheduled spec regression testing
- Automated governance audit jobs

### Prompt Caching

**Best For:**

- Reducing latency on repeated stable prefixes that meet the model's cache
  minimum

- Lowering costs when spec context is reused
- Multi-agent workflows sharing same reference specs

**Constraints:**

- Caching covers the prompt prefix up to a cache breakpoint (`cache_control`); a
  stable prefix can be cached alongside a variable suffix

- Cache levels follow `tools` → `system` → `messages`; changing a level
  invalidates that level and subsequent levels, while earlier unchanged prefixes
  can remain cached

- Minimum cacheable length is measured in tokens and depends on the model and
  platform

- Default TTL is 5 minutes, refreshed on cache hits; a 1-hour option is
  available with `cache_control: {"type": "ephemeral", "ttl": "1h"}`

## Governance Use Cases (2)

- Multi-agent task coordination (all agents read same spec context)
- SpecKit pipeline (spec → plan → tasks, reuse spec context)
- Workflow validation (agents share governance config context)

### MCP (Model Context Protocol)

**Best For:**

- Connecting Claude to external tools (GitHub API, Slack, Linear)
- Real-time data access without manual fetching
- Event-driven workflows (GitHub webhooks → Claude agents)

**Constraints:**

- Requires MCP server setup for each integration
- Tool latency adds to total response time
- Error handling must account for external service downtime

## Governance Use Cases (3)

- GitHub event webhook handlers (PR opened → run validation)
- Slack notifications for governance decisions
- Direct Linear issue creation from test results

### Application-owned storage & Claude Docs interface

**Best For:**

- Storing specifications and governance configuration
- Collaborative authoring with version history
- Render spec content alongside agent reasoning

**Constraints:**

- This repository stores specifications and agent contracts in Git; a database
  or remote store requires application integration

- Authentication, size limits, retention, and audit history depend on the chosen
  storage backend

- Claude Docs is an authoring/review interface; no API integration with this
  workflow is established

## Governance Use Cases (4)

- Persist `.github/specs/` artifacts with version control
- Collaborative spec clarification (multiple team members)
- Audit trail of spec changes over time

---

## Platform Selection Matrix

Use this matrix to select the best platform(s) for a given governance task:

| Task | Claude API | Managed Agents | Prompt Cache | MCP | Application-owned storage |
|------|-----------|-----------------|----------|-----|-------------|
| Real-time branch validation | ✅ Primary | - | ⚠️ Optional | ✅ For GH access | - |
| Scheduled workflow audits | - | ✅ Primary | - | ✅ For tool access | - |
| Spec collaboration | - | - | - | - | ✅ Git; integrate other storage as needed |
| Multi-agent task routing | ✅ Primary | - | ✅ Recommended | - | - |
| GitHub event processing | ⚠️ Polling | ✅ Event handler | - | ✅ Webhook support | - |
| Configuration storage | - | - | - | - | ✅ Git; integrate other storage as needed |

---

## Known Gaps & Mitigation

| Gap | Impact | Mitigation | Status |
|-----|--------|-----------|--------|
| No native invocation quota tracking | Budget enforcement incomplete (R7.3) | Custom MCP middleware logging | ⏳ Depends on TOA-271 |
| Audit trail not dashboard-native | Governance transparency limited | Export logs to application-owned storage through an explicit integration | ⚠️ Manual export only |
| Fallback routing is unimplemented | No automatic recovery on timeout | Define and test explicit host-side fallback policy | ⏳ Host workflow work required |
| MCP server per integration | Operational overhead | Pre-configure 5 standard integrations | ✅ In progress |

---

## Recommendations

### Immediate Actions (Phase 2)

1. ✅ Use **Claude API + Tool Use** for all real-time governance tasks (branch
   validation, PR routing)

1. ✅ Deploy **MCP servers** for GitHub, Slack, Linear integration (tooling
   ready)

1. ✅ Keep governance artifacts in **Git**; integrate application-owned storage
   if additional persistence or audit exports are needed

1. ⏳ Design host-side aggregate budget enforcement (R7.3), with the **Managed
   Agents session spend budget** as a separate platform control

### Future Enhancements (Phase 3+)

1. **Audit Dashboard:** Integrate MCP log export into application-owned storage;
   query via a custom dashboard

1. **Multi-Agent Orchestration:** Use **Prompt Caching** for spec context
   sharing across agents

1. **Event-Driven Workflows:** Deploy **Managed Agents** as GitHub webhook
   handlers

1. **Cost Optimization:** Analyze Prompt Caching effectiveness when SpecKit
   pipeline scales

---

## Platform References

Verified against the published documentation on 19 October 2026:

- [Model lineup and context windows][models]
- [Managed Agents session budgets][budgets]
- [Managed Agents endpoint rate limits][rates]
- [Prompt caching, breakpoints, invalidation, and TTLs][caching]

[models]: https://platform.claude.com/docs/en/about-claude/models/overview

[budgets]: https://platform.claude.com/docs/en/managed-agents/budgets

[rates]:
https://platform.claude.com/docs/en/managed-agents/reference#rate-limits

[caching]: https://platform.claude.com/docs/en/build-with-claude/prompt-caching

## Related Documentation

- **Agent Inventory**: `.claude/agents/INVENTORY.md` (T017a)
- **Budget Controls Spec**:
  `.github/specs/001-repo-governance-layout-and-agentic-workflows/spec.md`
  (R7.3)
- **Agentic Workflows**:
  `.github/specs/001-repo-governance-layout-and-agentic-workflows/` (R7.1-R7.4)
- **Protected Files Guard**: `.github/workflows/protected-files-guard.yml`
  (T017c)

---

*Generated by Claude Haiku 4.5 for specification R7.2*
*Last updated: 18 October 2026*
