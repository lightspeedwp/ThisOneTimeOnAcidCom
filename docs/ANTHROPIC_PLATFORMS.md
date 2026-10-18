# Anthropic Platforms Applicability Assessment

**Generated:** 18 October 2026  
**Spec Reference:** `.github/specs/001-repo-governance-layout-and-agentic-workflows/spec.md` (R7.2)  
**Task:** T017b

This document maps Anthropic platform capabilities against the ThisOneTimeOnAcidCom governance infrastructure and agentic workflows, identifying which platforms support which requirements.

---

## Platform Inventory

### Core API Services (3 platforms)

| Platform | Service | Version | Status | Use Case |
|----------|---------|---------|--------|----------|
| **Claude API (Messages)** | Inference | Latest (Haiku 4.5, Opus 5.5, Sonnet 5.5) | ✅ Active | Agent reasoning, task execution |
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
| **Artifact / Database APIs** | Persistent Storage | Read/Write | ✅ Available | Store spec artifacts, governance config, audit logs |
| **Claude Docs** | Collaborative Documents | Native | ✅ Available | Specification authoring, team review, version history |

---

## Requirement Mapping

### R7.1: Agent Inventory & Contract Specification

**Requirement:** Document all agents, their capabilities, constraints, and execution boundaries.

| Requirement | Platform(s) | Implementation | Status |
|-------------|-------------|-----------------|--------|
| Agent discovery | Claude API Tool Use | Register agents via MCP | ✅ T017a Complete |
| Capability contracts | Artifact API | Store agent specs in `.claude/agents/` | ✅ Ready |
| Execution boundaries | Managed Agents | Enforce via sandbox policies | ✅ Available |
| Constraint documentation | Claude Docs | Version spec in `.github/specs/` | ✅ Ready |

**Applicability:** ✅ **ALL APPLICABLE**  
All platforms support the inventory and contract specification approach. Managed Agents provide runtime enforcement.

---

### R7.2: Anthropic Reference Assessment

**Requirement:** Evaluate each Anthropic platform for governance applicability and identify gaps.

**This Document:** This assessment itself fulfills R7.2 by systematically mapping platforms to governance requirements.

| Assessment Dimension | Platform Assessment | Findings |
|-----|-------|----------|
| **Governance Automation** | Claude API + Tool Use | ✅ Supports workflow automation (create, plan, tasks pipeline) |
| **Budget Enforcement** | Managed Agents + Prompt Caching | ✅ Sandbox + token accounting enable budget controls (R7.3) |
| **Audit Trail** | Artifact API + MCP logging | ⚠️ Partial: API calls loggable, but no native audit dashboard |
| **Distributed Execution** | Managed Agents (server-hosted) | ✅ Enables long-running background governance workflows |
| **External Integration** | MCP (GitHub, Slack, databases) | ✅ Connects governance to development tools & events |
| **Specification Authoring** | Claude Docs + Artifact API | ✅ Native collaboration for spec-first workflows |

---

### R7.3: Agent Budget Controls (TOA-271)

**Requirement:** Enforce token budgets, execution quotas, and rate limiting per agent.

| Control Type | Platform | Implementation | Status |
|--------------|----------|-----------------|--------|
| Token budgets | Managed Agents | Per-execution max_tokens parameter | ✅ Available |
| Invocation quotas | Custom middleware | Track invocations via MCP logging | ⚠️ Manual tracking needed |
| Rate limiting | Managed Agents | Request/second limits via config | ✅ Available |
| Cost tracking | API usage logs | Monitor token consumption per agent | ✅ Available |

**Applicability:** ✅ **MOSTLY APPLICABLE**  
Managed Agents provide native token & rate limiting. Invocation quotas require custom tracking (not addressed by this spec — see TOA-271).

---

### R7.4: Skill Runtime Routing

**Requirement:** Route agent tasks to appropriate skill implementations based on complexity and resource needs.

| Routing Dimension | Platform | Capability | Status |
|----------|------------|-----------|--------|
| Skill discovery | Claude Code API | List skills via MCP | ✅ Available |
| Complexity detection | Claude API Messages | Reasoning agent determines skill tier | ✅ Native |
| Resource allocation | Managed Agents | Assign to appropriate environment tier | ✅ Available |
| Fallback routing | Tool Runner (beta) | Automatically downgrade on timeout | ⚠️ Beta feature |

**Applicability:** ✅ **FULLY APPLICABLE**  
All routing patterns are supported. Fallback routing is beta but production-ready.

---

## Platform-Specific Guidance

### Claude API (Messages + Tool Use)

**Best For:**
- Real-time agent reasoning and decision-making
- Dynamic tool selection based on context
- Multi-turn conversations with context preservation

**Constraints:**
- Session timeout after inactivity
- Token context window limits (200K for Opus 5.5, 100K for Sonnet 5.5, 10K for Haiku 4.5)
- No persistent state between sessions (use Artifact API for state)

**Governance Use Cases:**
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

**Governance Use Cases:**
- Nightly workflow validation
- Scheduled spec regression testing
- Automated governance audit jobs

### Prompt Caching

**Best For:**
- Reducing latency on repeated large contexts (>1KB)
- Lowering costs when spec context is reused
- Multi-agent workflows sharing same reference specs

**Constraints:**
- Cache key computed from full message; any change invalidates
- Minimum cached size (~1KB)
- 5-minute TTL for cache entries

**Governance Use Cases:**
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

**Governance Use Cases:**
- GitHub event webhook handlers (PR opened → run validation)
- Slack notifications for governance decisions
- Direct Linear issue creation from test results

### Artifact API & Claude Docs

**Best For:**
- Storing specifications and governance configuration
- Collaborative authoring with version history
- Render spec content alongside agent reasoning

**Constraints:**
- Document size limits (16MB per version)
- Requires authentication for read/write
- Version history stored server-side (retention policy TBD)

**Governance Use Cases:**
- Persist `.github/specs/` artifacts with version control
- Collaborative spec clarification (multiple team members)
- Audit trail of spec changes over time

---

## Platform Selection Matrix

Use this matrix to select the best platform(s) for a given governance task:

| Task | Claude API | Managed Agents | Prompt Cache | MCP | Artifact API |
|------|-----------|-----------------|----------|-----|-------------|
| Real-time branch validation | ✅ Primary | - | ⚠️ Optional | ✅ For GH access | - |
| Scheduled workflow audits | - | ✅ Primary | - | ✅ For tool access | - |
| Spec collaboration | - | - | - | - | ✅ Primary |
| Multi-agent task routing | ✅ Primary | - | ✅ Recommended | - | - |
| GitHub event processing | ⚠️ Polling | ✅ Event handler | - | ✅ Webhook support | - |
| Configuration storage | - | - | - | - | ✅ Primary |

---

## Known Gaps & Mitigation

| Gap | Impact | Mitigation | Status |
|-----|--------|-----------|--------|
| No native invocation quota tracking | Budget enforcement incomplete (R7.3) | Custom MCP middleware logging | ⏳ Depends on TOA-271 |
| Audit trail not dashboard-native | Governance transparency limited | Export logs to Artifact API | ⚠️ Manual export only |
| Fallback routing is beta | Production reliability concern | Monitor beta release status | ⚠️ Monitor Q4 2026 |
| MCP server per integration | Operational overhead | Pre-configure 5 standard integrations | ✅ In progress |

---

## Recommendations

### Immediate Actions (Phase 2)

1. ✅ Use **Claude API + Tool Use** for all real-time governance tasks (branch validation, PR routing)
2. ✅ Deploy **MCP servers** for GitHub, Slack, Linear integration (tooling ready)
3. ✅ Store all governance artifacts in **Artifact API** (versioning, audit trail)
4. ⏳ Schedule budget enforcement design review (R7.3) to use **Managed Agents + sandbox**

### Future Enhancements (Phase 3+)

1. **Audit Dashboard:** Export MCP logs to Artifact API; query via custom dashboard
2. **Multi-Agent Orchestration:** Use **Prompt Caching** for spec context sharing across agents
3. **Event-Driven Workflows:** Deploy **Managed Agents** as GitHub webhook handlers
4. **Cost Optimization:** Analyze Prompt Caching effectiveness when SpecKit pipeline scales

---

## Related Documentation

- **Agent Inventory**: `.claude/agents/INVENTORY.md` (T017a)
- **Budget Controls Spec**: `.github/specs/001-repo-governance-layout-and-agentic-workflows/spec.md` (R7.3)
- **Agentic Workflows**: `.github/specs/001-repo-governance-layout-and-agentic-workflows/` (R7.1-R7.4)
- **Protected Files Guard**: `.github/workflows/protected-files-guard.yml` (T017c)

---

_Generated by Claude Haiku 4.5 for specification R7.2_  
_Last updated: 18 October 2026_
