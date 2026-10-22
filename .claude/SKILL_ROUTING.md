# Skill Runtime Routing & Execution Environment Matrix

**Document Status**: Specification for TOA-271 implementation  
**Last Updated**: 2026-10-22  
**Owner**: @ashley (TOA-271 epic implementation)  
**Scope**: Routing strategy for skill execution across available environments

---

## Purpose

Define which execution environment each skill should use based on:
- Skill complexity and resource requirements
- Tool access needs (read-only vs. write)
- User interaction requirements (interactive vs. autonomous)
- Budget and latency constraints
- Quality gates and determinism requirements

---

## Execution Environments

### 1. **Local Agent (Same Session)**

**Definition**: Skill runs in the current session's context.

**Characteristics**:
- ✅ Full context inheritance (conversation, files, state)
- ✅ No additional latency (immediate execution)
- ✅ Shared budget with parent session (token/cost aggregate)
- ✅ Interactive feedback and mid-session redirection
- ✅ Tool access: All tools available to parent session
- ❌ No isolation (affects parent state)
- ❌ Shared output (results visible in conversation)

**Best For**:
- Quick validations and checks
- Tools that need conversation context
- User-interactive workflows (Q&A, decisions)
- Lightweight operations (< 10k tokens)

**Examples**:
- `/branch-validation` — validate branch name (read-only check)
- `/validate` — configuration validation (read-only check)
- `/changelog` — changelog entry management (affects local CHANGELOG.md)

### 2. **Subagent (Parent Session Budget)**

**Definition**: Skill runs as delegated work with supplied parent context. Its
usage counts against the parent session's budget under the TOA-271 accounting
requirements (host-side enforcement pending).

**Characteristics**:
- ✅ Context supplied by parent (scope depends on invocation)
- ✅ Separate agent execution; usage charged to parent budget
- ✅ Clean output (results returned via tool, not in chat)
- ✅ Can run in parallel with parent (shared aggregate token budget)
- ✅ Tool access: Inherits from the parent's supported tool pool, limited by the subagent's configured tool allowlist and runtime permissions; MCP capabilities are documented separately in [Agent Configuration](../docs/agent-configuration.md#mcp-server-connections) and are not automatically granted by inheritance.
- ⚠️ Slight latency (subagent creation overhead)
- ❌ Results not in conversation thread (tool output only)

**Best For**:
- Research and exploration tasks
- Multi-step investigation (analysis, gathering)
- Parallel work (parent continues while subagent researches)
- Medium complexity (50k–200k tokens)

**Examples**:
- `/speckit-analyze` — deep specification analysis (exploration)
- Code exploration agent — search codebase for patterns
- Content strategy agent — research and plan content

#### **Forked Session (Independent Budget)**

**Definition**: Skill runs in a separate session initialized from parent
context, with its own budget ledger. Under the TOA-271 requirements, a fork
inherits the parent's token limit but tracks usage independently; its subagents
consume the fork's allowance. Numerical limits and spending increases require
owner approval. Host-side enforcement remains pending.

**Characteristics**:
- Separate session and independent budget; usage does not deduct from the originating session
- Can run concurrently with the originating session under its own approved ceiling
- Copying context into a subagent does not by itself create an independently budgeted session

### 3. **Remote Agent (Cloud Sandbox)**

**Definition**: Skill runs in an isolated cloud container with restricted
network access.

**Characteristics**:
- ✅ Strong isolation (sandboxed environment)
- ✅ Network restricted (only allowed endpoints)
- ✅ Cost-controlled (resource limits)
- ✅ Audit-friendly (execution logged)
- ✅ Can pause and resume (checkpointing)
- ⚠️ Latency (network round-trip)
- ⚠️ Limited tool access (only network-safe tools)
- ❌ No access to parent session state (cold start)

**Best For**:
- Long-running jobs (6+ hours)
- Security-sensitive operations (credential handling)
- Resource-intensive work (data processing)
- Tasks that can be scheduled/deferred

**Examples**:
- Scheduled audit jobs (compliance scanning)
- Batch data processing (large file analysis)
- External API integration (controlled network access)

### 4. **Managed Agent (Hosted)**

**Definition**: Skill runs as a managed agent with Claude controlling execution,
tool access, and lifecycle.

**Characteristics**:
- ✅ Fully managed (Claude handles setup/cleanup)
- ✅ Automatic resumption (if task interrupted)
- ✅ Cost-optimized (Claude picks best model/approach)
- ✅ Multi-language support (agents in different languages)
- ⚠️ No real-time control (user cannot redirect mid-task)
- ❌ Not available today (future enhancement)

**Best For**:
- Production automation (reliable, auditable)
- Mission-critical tasks (automatic retries)
- Scale-out workflows (many parallel agents)

**Status**: ⏳ Planned for future implementation; not in use today

---

## Skill Routing Matrix

### By Skill Type

#### **Quality Gate Skills** (Read-only Validation)

These skills perform deterministic validation and must NOT modify state.

| Skill | Environment | Rationale |
|-------|-------------|-----------|
| `branch-validation` | Local Agent | Read-only check; needs context; user redirects |
| `validate` | Local Agent | Read-only configuration check; quick feedback |
| `code-review` | Subagent | Analysis task; can run in parallel |
| `security-review` | Subagent | Security analysis; isolated execution preferred |

**Rules**:
- ✅ Can read files, parse configs, check syntax
- ✅ Can output findings, recommendations, reports
- ❌ Must NOT modify files or state
- ❌ Must NOT create branches or PRs
- Exception: Can write findings to artifact/document (read-only from repo perspective)

---

#### **Implementation Skills** (Write Operations)

These skills modify repository state and require careful sequencing.

| Skill | Environment | Rationale |
|-------|-------------|-----------|
| `changelog` | Local Agent | Modifies CHANGELOG.md; needs user feedback on entries |
| `speckit-tasks` | Local Agent | Decomposition task; high-context, interactive |
| `speckit-implement` | Subagent | Long implementation; can run parallel to other work |
| `labeling` | Subagent | Creates/updates labels; isolated operation |

**Rules**:
- ✅ Modifies files within scope
- ✅ Can create branches, commits, PRs (if authorized)
- ❌ Must respect protected files (CODEOWNERS, BUDGET_CONTROLS.md, etc.)
- ❌ Must validate before writing
- Escalation: Ask @ashley before modifying governance files

---

#### **Analysis & Research Skills** (Exploration)

These skills gather information and may run independently.

| Skill | Environment | Rationale |
|-------|-------------|-----------|
| `brand-voice:discover-brand` | Subagent | Autonomous search across platforms; parallel work |
| `sales:account-research` | Subagent | External data gathering; long-running research |
| `design:research-synthesis` | Subagent | Analysis from multiple sources; can run in parallel |

**Rules**:
- ✅ Read external data (APIs, web, documents)
- ✅ Aggregate and synthesize findings
- ❌ Do NOT modify external systems (no API writes, no file uploads to external services)
- ❌ Do NOT store credentials or API keys in repo

---

### By Skill Scope

#### **Repository-Local Skills** (Local Agent)

Skills that operate on THIS repository's state:

| Skill | Use | Avoid |
|-------|-----|-------|
| Branch validation | Local Agent | Subagent (needs conversation context) |
| Configuration validation | Local Agent | Remote (too simple for cloud overhead) |
| Changelog management | Local Agent | Subagent (user interaction on entries) |
| Protected file checks | Local Agent | Subagent (governance-critical, needs conversation) |

---

#### **Organization-Wide Skills** (Subagent)

Skills that operate across multiple repositories or systems:

| Skill | Use | Avoid |
|-------|-----|-------|
| Label taxonomy audit | Subagent | Local (might affect multiple repos) |
| Governance compliance check | Subagent | Local (cross-repo analysis) |
| Account research | Subagent | Local (external data, long-running) |

---

#### **Long-Running / Scheduled Skills** (Remote Agent)

Skills meant for deferred or batch execution:

| Skill | Use | Avoid |
|-------|-----|-------|
| Scheduled compliance audit | Remote Agent | Local (too long for interactive session) |
| Batch data processing | Remote Agent | Subagent (resource-intensive) |
| Nightly metrics aggregation | Remote Agent | Any interactive environment |

---

## Tool Access by Environment

### Local Agent Tool Access

```text
✅ Allowed:
  - Read files (Read, Glob, Grep)
  - Bash (restricted to safe commands)
  - Git operations (fetch, commit, push)
  - GitHub MCP (if session has credentials)
  - Artifact creation/editing
  - Write files (for repo-local changes)

❌ Restricted:
  - Destructive bash (rm -rf, dangerous rewrites)
  - External API calls (unless safe/idempotent)
  - Creating AWS resources, databases, etc.
  - Deploying to production

```text

### Subagent Tool Access

```text
✅ Same as Local Agent (inherits parent's tools)

Execution Isolation:
  - Usage charged to parent session budget (TOA-271 requirement; enforcement pending)
  - Separate process (sandboxed at OS level)
  - Tool output returned via tool, not in conversation

```text

### Remote Agent Tool Access

```text
✅ Allowed:
  - Network-safe tools only (HTTP, DNS, APIs)
  - Controlled file I/O (no direct repo access)
  - Logging and observability

❌ Restricted:
  - Local file system access (sandboxed)
  - Bash shell (dangerous commands blocked)
  - SSH/VPN (no secure channel)
  - Database connections (must use APIs)

```text

---

## Routing Decision Tree

```text
Is the skill a read-only validation check?
├─ YES → Is user interaction needed for feedback/redirection?
│   ├─ YES → Use Local Agent (conversation context matters)
│   └─ NO → Use Subagent (parallel research preferred)
└─ NO → Does skill modify repository state?
    ├─ YES → Is this a single-file, quick operation?
    │   ├─ YES → Use Local Agent (interactive feedback on changes)
    │   └─ NO → Use Subagent (isolated, parallel work)
    └─ NO → Is skill a long-running analysis/research?
        ├─ YES (> 1 hour) → Use Remote Agent (scheduled/deferred)
        ├─ MEDIUM (30m–1h) → Use Subagent (parallel to parent)
        └─ QUICK (< 30m) → Use Local Agent (low overhead)

```text

---

## Determinism Requirements

### Deterministic Quality Gates (Must Be Unprivileged)

These skills must run with NO special privileges and must be reproducible:

| Skill | Requirement | Rationale |
|-------|-------------|-----------|
| Branch validation | Stateless check | Same input → Same output always |
| Configuration validation | Stateless check | Validation rules stable over time |
| YAML syntax check | Stateless check | YAML spec is deterministic |
| Code review findings | Deterministic analysis | Same code → Same findings (for same model) |

**Implementation**:
- ✅ No external state (no API calls)
- ✅ No randomness (no Monte Carlo, no shuffling)
- ✅ No time-based decisions (no "cache if < 1 hour old")
- ✅ Reproducible with same inputs

---

## Execution Context Examples

### Example 1: Branch Validation

```text
User: "review branch naming with /branch-validation"
→ Skill: branch-validation
→ Environment: Local Agent (same session)
→ Execution:
   - Reads git status (current branch)
   - Validates against .github/CLAUDE.md rules
   - Returns result directly in conversation
   - User can immediately act on feedback

```text

**Why Local Agent**:
- Read-only operation (no writes)
- Quick execution (< 1s)
- User needs immediate feedback in conversation
- No isolation benefit to subagent

---

### Example 2: Code Review

```text
User: "review this PR for correctness bugs"
→ Skill: code-review
→ Environment: Subagent (parent session budget)
→ Execution:
   - Parent supplies PR context; subagent usage counts against parent budget
   - Subagent reads code, writes findings to artifact
   - Returns findings to parent via tool result
   - Parent can summarize or post comment

```text

**Why Subagent**:
- Analysis task (potentially long-running)
- Can run parallel to parent's other work
- Results cleanly isolated (tool output, not chat noise)
- Parent retains control over how to use findings

---

### Example 3: Account Research

```text
User: "research this account for expansion opportunity"
→ Skill: sales:account-research
→ Environment: Subagent (parent session budget)
→ Execution:
   - Spawn subagent with research parameters
   - Subagent calls external APIs, web search, etc.
   - Aggregates findings into summary document
   - Returns findings link to parent

```text

**Why Subagent**:
- Autonomous research (no user interaction needed)
- May take 30+ minutes
- External API calls (research team's services)
- Parent can continue other work while subagent researches

---

### Example 4: Scheduled Audit

```text
Schedule: Every Sunday 2 AM UTC
→ Skill: audit-security-controls
→ Environment: Remote Agent (cloud sandbox)
→ Execution:
   - Scheduled job spawns remote agent
   - Scans repo for security issues
   - Posts findings to Linear issue
   - Sends summary email to @ashley

```text

**Why Remote Agent**:
- Long-running job (30–60 minutes)
- Scheduled/deferred (no interactive user)
- Secure (audit data sensitive)
- Audit trail needed (who ran what, when)

---

## Implementation Checklist (For TOA-271)

- [ ] Document routing rules per skill in `.claude/skills/INVENTORY.md`
- [ ] Add execution environment to each skill definition (`environment: local|subagent|remote`)
- [ ] Implement routing logic in agent dispatcher (if automated)
- [ ] Test skills in each environment with expected budget/permissions
- [ ] Validate determinism of quality gate skills (reproducibility tests)
- [ ] Document tool access restrictions per environment
- [ ] Create runbook for manual routing (if not automated)
- [ ] Monitor skill execution patterns (which env is actually used vs. planned)
- [ ] Escalation procedure: when to ask @ashley for routing exception
- [ ] Update skill documentation when routing changes

---

## References

- `.claude/agents/INVENTORY.md` — Agent specifications with execution environments
- `.claude/skills/INVENTORY.md` — Skill specifications with routing recommendations
- `.claude/BUDGET_CONTROLS.md` — Budget implications of execution environment choices
- `.claude/GOVERNANCE.md` — Owner approval process for routing exceptions
- `CONTRIBUTING.md` — Contribution workflow and skill invocation patterns

---

**End of Document**  
*Maintained as part of TOA-241 Repository Governance Infrastructure*  
*Implementation roadmap: TOA-271 Skill Runtime Routing & Execution Strategy*
