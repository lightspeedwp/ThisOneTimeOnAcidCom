# Anthropic Platforms Assessment — ThisOneTimeOnAcidCom

**Last Updated**: 2026-10-22  
**Status**: Phase 2 Governance Documentation  
**Reference**: Specification R7.2 (Anthropic platform applicability assessment)

---

## Overview

This document evaluates the applicability of Anthropic platforms and capabilities across ThisOneTimeOnAcidCom's agent portfolio and development workflows.

**Seven Anthropic Platforms Assessed**:
1. Claude API (Messages)
2. Claude API Tool Runner  
3. Managed Agents
4. Prompt Caching
5. Tool Use Interface
6. Artifact / Database APIs
7. MCP (Model Context Protocol)

---

## Platform Applicability Matrix

### 1. Claude API (Messages)

**Status**: ✅ **CORE PLATFORM**

**Description**: Base inference API for all Claude models (Mythos, Opus, Sonnet, Haiku, Fable).

**Usage in This Repo**:
- All 20 agents use Claude API via Claude Code framework
- Agents send structured prompts; receive text responses
- Model selection: Haiku (default), Opus (complex tasks), Sonnet (general)

**Applicable Agents** (20/20):
- ✅ All agents use Claude API as base capability

**Configuration**: Inherited via `.claude/agents/{agent}.md` prompts; model override per-task

**Decision**: **REQUIRED** — Core capability for all agent execution

---

### 2. Claude API Tool Runner

**Status**: ⚠️ **EVALUATE**

**Description**: SDK orchestration that runs the agentic loop in the calling application: it calls the Messages API, executes tool functions, and returns tool results until the loop completes.

**Usage in This Repo**:
- **Potentially useful for**: agents that need autonomous retry or multi-step tool coordination (release-agent, testing-agent, labeling-agent)
- **Current status**: No direct Tool Runner integration is configured in this repository
- **Alternative**: Claude Code handles agentic loop locally

**Applicable Agents** (3-4 candidates):
- ⚠️ release-agent — Could use Tool Runner for autonomous deployment workflows
- ⚠️ testing-agent — Could use Tool Runner for test orchestration
- ⚠️ labeling-agent — Could use Tool Runner for batch labeling operations
- ⚠️ playwright-agent — Could use Tool Runner for multi-step browser automation

**Decision**: **EVALUATE** — Consider SDK Tool Runner for simplifying application-managed tool orchestration; cost depends on requests and usage

---

### 3. Managed Agents

**Status**: ❌ **NOT CURRENTLY APPLICABLE**

**Description**: Claude Managed Agents provides a server-hosted runtime with a managed agentic loop, tool execution, and sandbox infrastructure for long-running or asynchronous work.

**Why Not Used**:
- All agents run in Claude Code framework (local or cloud environment)
- Local execution provides better visibility and control over agent behavior

**Potential Use Cases** (Future):
- If agents needed to be exposed as external APIs (e.g., public bot service)
- If workflows need a hosted runtime for long-running or asynchronous execution

**Decision**: **NOT APPLICABLE** — Local execution model meets current requirements

---

### 4. Prompt Caching

**Status**: ✅ **RECOMMENDED**

**Description**: Caches reusable prompt prefixes to reduce input cost and latency. Cache reads still count toward total input tokens and context usage; a lower cache-read price reduces cost, not token usage. API accounting separates `input_tokens`, `cache_creation_input_tokens`, and `cache_read_input_tokens`; their sum is total input tokens.

**Potential Usage**:
- **High-value targets**: agents with large context requirements
  - document-reviewer-agent — Large markdown files (guidelines/, docs/)
  - reporting-agent — Large data sets
  - testing-agent — Large test result compilations
  - prd-agent — Long requirements documents

**Cost savings example** (Claude Sonnet 4.6, standard pricing, 5-minute cache TTL):

- Reused prefix: 10,000 tokens; base input $3/million tokens, cache writes $3.75/million (1.25×), reads $0.30/million (0.1×).
- One write costs $0.0375; each hit costs $0.003 rather than $0.03, saving $0.027 (90% of the prefix's base input cost per hit).
- Ten requests with one write and nine hits (90% hit rate, unchanged prefix reused within TTL) cost $0.0645 instead of $0.30: $0.2355 saved (78.5%). Total prefix input remains 100,000 tokens.
- For `N` requests, prompt size `P`, base price per token `B`, write multiplier `w`, read multiplier `r`, and hit rate `h`, cached prefix cost is `N × P × B × ((1 − h) × w + h × r)`, assuming every miss writes the full prefix. Uncached cost is `N × P × B`.
- Savings require `h > (w − 1) / (w − r)`: above 21.7% for this model and TTL. After one write, hits `H` must satisfy `H > (w − 1) / (1 − r)`; one hit recovers this write premium. A 1-hour TTL uses `w = 2`, requiring above 52.6% hits, or two hits after one write.
- Recalculate with the selected model's prices, cache TTL, cacheable prompt size, and observed hit rate. Expiry or prefix changes cause new writes; uncached suffixes and output tokens add separate costs.

**Applicable Agents** (4-6):
- ✅ document-reviewer-agent — Review same doc set repeatedly
- ✅ reporting-agent — Aggregate same data sources
- ✅ testing-agent — Reuse test result templates
- ✅ prd-agent — Reuse requirements structure
- ⚠️ changelog-agent — Cache Keep a Changelog template
- ⚠️ website-content-strategist-agent — Cache style guides

**Implementation**: Requires Claude API integration; works with Tool Use

**Decision**: **RECOMMENDED** — Implement for document-heavy agents in TOA-264/265 (budget phase)

---

### 5. Tool Use Interface

**Status**: ✅ **CORE CAPABILITY**

**Description**: Structured interface for agents to call external tools (CLI, APIs, file I/O).

**Usage in This Repo**:
- All 20 agents use tool calling via Claude Code
- Manifest-declared tools: Read, Write, Bash for all 20 agents
- Tool selection per-agent in `.claude/agents/{agent}.md`

**Applicable Agents** (20/20):
- ✅ All agents use Tool Use

**Tool Distribution**:
- **Universal declarations**: `read`, `write`, `bash` (20/20 manifests)
- **Workflow capabilities**: Git via Bash; browser testing is a task of bugherd-agent and playwright-agent, but Playwright is not a declared tool
- **Global integrations**: Example GitHub integration is separate from agent tool declarations; see MCP assessment below

**Decision**: **REQUIRED** — Core capability; agents depend on tool use for any file/system operations

---

### 6. File and Session APIs

**Status**: ⚠️ **OPTIONAL ENHANCEMENT**

**Description**: Documented file APIs (Files API) and session file capabilities for storing and retrieving content. Any shared state is application-owned and managed by the session caller, not provided by Anthropic as a platform service.

**Potential Usage**:
- **Files API**: Store generated reports, specs, documentation for retrieval in agent sessions
  - reporting-agent → Generate metric reports and store via Files API
  - prd-agent → Generate PRD documents and store via Files API
  - changelog-agent → Archive changelog versions

- **Session Files**: Agents in Managed Agents can read/write files within their session context
  - Shared state is application-owned; agents coordinate through application logic, not platform APIs

**Applicable Agents** (3-5):
- ⚠️ reporting-agent — Generate and store reports via Files API
- ⚠️ prd-agent — Generate and store PRDs via Files API
- ⚠️ changelog-agent — Archive versions in application storage
- ⚠️ labeling-agent — Application manages label state via files
- ⚠️ testing-agent — Application manages test history via files

**Current Status**: Reports generated as local files; no artifact publishing configured

**Decision**: **OPTIONAL** — Consider for artifact publishing in TOA-264/265 if agents need to share output with users

---

### 7. MCP (Model Context Protocol)

**Status**: ⚠️ **NO MCP SERVERS CONFIGURED IN REPOSITORY SETTINGS**

**Description**: Standardized protocol for LLM access to external systems/data sources via servers.

**Repository Configuration**:

- `.claude/settings.json` contains no MCP server or integration declarations.
- `.claude/settings.example.json` contains `integrations.github.enabled: true`, an example global GitHub integration. This does not establish a configured GitHub MCP server or per-agent access.
- All 20 agent manifests declare only `read`, `write`, and `bash`; no manifest declares MCP tools.

**Applicable Agents**: No per-agent MCP access is established by the committed or example settings. Machine-specific configuration must be verified separately before claiming an integration is available.

**Decision**: **VERIFY BEFORE USE** — Configure and validate any required MCP server independently of the agent manifests.

---

## Decision Summary

| Platform | Status | Usage | Agents Affected | Priority |
|---|---|---|---|---|
| Claude API (Messages) | ✅ Core | Base inference | 20/20 | REQUIRED |
| Tool Runner | ⚠️ Evaluate | Autonomous loops | 3-4 | MEDIUM |
| Managed Agents | ❌ Not applicable | Hosted runtime | 0 | N/A |
| Prompt Caching | ✅ Recommended | Input cost savings | 4-6 | HIGH |
| Tool Use Interface | ✅ Core | External tool calls | 20/20 | REQUIRED |
| Artifact / DB APIs | ⚠️ Optional | Report publishing | 3-5 | MEDIUM |
| MCP | ⚠️ Verify configuration | No servers configured in repo settings | Not established | VERIFY |

---

## Implementation Roadmap

### Phase 1 (Current — TOA-241)
- ✅ Claude API (Messages) — Already deployed
- ✅ Tool Use Interface — Already deployed
- ⚠️ MCP — No servers configured in repository settings; example GitHub integration only

### Phase 2 (TOA-264/265 — Budget & Optimization)
- 🔄 Prompt Caching — Evaluate for document-heavy agents
- 🔄 Artifact / DB APIs — Consider for report publishing
- 🔄 Tool Runner — Evaluate for autonomous workflows

### Phase 3 (Future)
- 📋 Managed Agents — Evaluate if hosted, long-running or asynchronous execution is needed
- 📋 MCP servers — Configure and validate integrations as workflows require them

---

## Related Decisions

- **SPEC-001**: Specification output routes to `.github/specs/` (affects document artifact storage)
- **R7.3**: Budget constraints specified in TOA-271 (affects Tool Runner evaluation)
- **R7.1**: Agent inventory documented in `.claude/agents/INVENTORY.md`

---

## References

- **Specification**: `.github/specs/001-repo-governance-layout-and-agentic-workflows/spec.md` (R7.2)
- **Agent Inventory**: `.claude/agents/INVENTORY.md` (R7.1)
- **Budget Controls**: TOA-271 (separate epic)
- **Tool Runner**: https://platform.claude.com/docs/en/agents-and-tools/tool-use/tool-runner
- **Claude Managed Agents**: https://platform.claude.com/docs/en/managed-agents/overview
- **Prompt Caching & Pricing**: https://platform.claude.com/docs/en/build-with-claude/prompt-caching

---

_Maintained as part of Phase 2 Governance Documentation (TOA-241)_
_Platform assessment accurate as of 2026-10-22_
_Subject to updates as new Anthropic capabilities are released_
