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

**Description**: Base inference API for all Claude models (Opus, Sonnet, Haiku, Fable).

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

**Status**: ⚠️ **PARTIAL INTEGRATION**

**Description**: Server-hosted agentic loop that runs an agent with access to tools, respawning as needed without user intervention.

**Usage in This Repo**:
- **Potentially useful for**: agents that need autonomous retry or multi-step tool coordination (release-agent, testing-agent, labeling-agent)
- **Current status**: Implemented via Agent SDK locally; not using hosted Tool Runner
- **Alternative**: Claude Code handles agentic loop locally

**Applicable Agents** (3-4 candidates):
- ⚠️ release-agent — Could use Tool Runner for autonomous deployment workflows
- ⚠️ testing-agent — Could use Tool Runner for test orchestration
- ⚠️ labeling-agent — Could use Tool Runner for batch labeling operations
- ⚠️ playwright-agent — Could use Tool Runner for multi-step browser automation

**Decision**: **EVALUATE** — Consider for high-autonomy agents if Tool Runner reduces token cost vs. local agentic loops

---

### 3. Managed Agents

**Status**: ❌ **NOT CURRENTLY APPLICABLE**

**Description**: Server-hosted agents with managed sandbox, permissions, and token budgets.

**Why Not Used**:
- All agents run in Claude Code framework (local or cloud environment)
- Managed Agents designed for external services/integrations (not internal workflows)
- Local execution provides better visibility and control over agent behavior

**Potential Use Cases** (Future):
- If agents needed to be exposed as external APIs (e.g., public bot service)
- If token budgeting required per-agent hard limits with server enforcement

**Decision**: **NOT APPLICABLE** — Local execution model meets current requirements

---

### 4. Prompt Caching

**Status**: ✅ **RECOMMENDED**

**Description**: Caches large prompts in Claude's KV store; subsequent requests reuse cached data, reducing input tokens by 90%.

**Potential Usage**:
- **High-value targets**: agents with large context requirements
  - document-reviewer-agent — Large markdown files (guidelines/, docs/)
  - reporter-agent — Large data sets
  - testing-agent — Large test result compilations
  - prd-agent — Long requirements documents

**Token Savings Estimate**:
- Typical cached prompt: 10,000+ tokens
- Savings per cache hit: ~9,000 tokens (90%)
- Breakeven: 2–3 cache hits

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
- All 20 agents use tool calling via Claude Code SDK
- Tools available: Bash, Read, Edit, Write, GitHub MCP, etc.
- Tool selection per-agent in `.claude/agents/{agent}.md`

**Applicable Agents** (20/20):
- ✅ All agents use Tool Use

**Tool Distribution**:
- **Universal**: Bash, Read, Edit, Write (all agents)
- **GitHub-specific**: issue-agent, labeling-agent, pr-agent, release-agent
- **Specialized**: Playwright (bugherd, playwright-agent); Figma (design-partner-agent)

**Decision**: **REQUIRED** — Core capability; agents depend on tool use for any file/system operations

---

### 6. Artifact / Database APIs

**Status**: ⚠️ **OPTIONAL ENHANCEMENT**

**Description**: Server-side artifact storage with optional shared database for collaborative documents/trackers.

**Potential Usage**:
- **Artifacts**: Store generated reports, specs, documentation
  - reporting-agent → publish metric reports as artifacts
  - prd-agent → publish PRD documents as artifacts
  - changelog-agent → archive changelog versions

- **Shared Database**: Track shared state across agent runs
  - labeling-agent → Store label application state
  - metrics-agent → Cache metric calculations
  - testing-agent → Track test result history

**Applicable Agents** (3-5):
- ⚠️ reporting-agent — Publish reports as artifacts
- ⚠️ prd-agent — Publish PRDs as artifacts
- ⚠️ changelog-agent — Archive versions in artifact DB
- ⚠️ labeling-agent — Track label state in shared DB
- ⚠️ testing-agent — Track test history in shared DB

**Current Status**: Reports generated as local files; no artifact publishing configured

**Decision**: **OPTIONAL** — Consider for artifact publishing in TOA-264/265 if agents need to share output with users

---

### 7. MCP (Model Context Protocol)

**Status**: ✅ **WIDELY INTEGRATED**

**Description**: Standardized protocol for LLM access to external systems/data sources via servers.

**Usage in This Repo**:
- GitHub MCP server (issue-agent, labeling-agent, pr-agent)
- Gmail MCP server (future: email automation)
- Google Drive MCP server (future: document retrieval)
- Linear MCP server (future: issue sync if migrated from GitHub)
- Figma MCP server (design-partner-agent, used for design context retrieval)

**Applicable Agents** (5-7):
- ✅ issue-agent — GitHub MCP
- ✅ labeling-agent — GitHub MCP
- ✅ pr-agent — GitHub MCP
- ✅ release-agent — GitHub MCP
- ✅ design-partner-agent — Figma MCP
- ⚠️ content-strategy-agent — Could use Figma MCP for brand asset retrieval
- ⚠️ metadata-agent — Could use Google Drive MCP for SEO template retrieval

**MCP Servers Configured**:
- ✅ GitHub (4 agents)
- ✅ Figma (1 agent)
- ⚠️ Gmail, Google Drive, Linear (available but not yet integrated)

**Decision**: **CORE** — GitHub and Figma MCP essential; others available for future integration

---

## Decision Summary

| Platform | Status | Usage | Agents Affected | Priority |
|---|---|---|---|---|
| Claude API (Messages) | ✅ Core | Base inference | 20/20 | REQUIRED |
| Tool Runner | ⚠️ Evaluate | Autonomous loops | 3-4 | MEDIUM |
| Managed Agents | ❌ Not applicable | External APIs | 0 | N/A |
| Prompt Caching | ✅ Recommended | Token savings | 4-6 | HIGH |
| Tool Use Interface | ✅ Core | External tool calls | 20/20 | REQUIRED |
| Artifact / DB APIs | ⚠️ Optional | Report publishing | 3-5 | MEDIUM |
| MCP | ✅ Core | System integrations | 5-7 | REQUIRED |

---

## Implementation Roadmap

### Phase 1 (Current — TOA-241)
- ✅ Claude API (Messages) — Already deployed
- ✅ Tool Use Interface — Already deployed
- ✅ MCP (GitHub, Figma) — Already deployed

### Phase 2 (TOA-264/265 — Budget & Optimization)
- 🔄 Prompt Caching — Evaluate for document-heavy agents
- 🔄 Artifact / DB APIs — Consider for report publishing
- 🔄 Tool Runner — Evaluate for autonomous workflows

### Phase 3 (Future)
- 📋 Managed Agents — Only if exposing agents as public APIs
- 📋 Additional MCP Servers — Gmail, Google Drive, Linear as needed

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
- **Anthropic Documentation**: https://docs.anthropic.com/ (requires login)

---

_Maintained as part of Phase 2 Governance Documentation (TOA-241)_
_Platform assessment accurate as of 2026-10-22_
_Subject to updates as new Anthropic capabilities are released_
