# Agent Budget Controls & Enforcement

**Document**: Agent budget enforcement strategy  
**Spec Reference**: `.github/specs/001-repo-governance-layout-and-agentic-workflows/spec.md` (R7.3)  
**Task**: T050

This document defines the budget control mechanisms, enforcement points, and escalation procedures for AI agents executing within the repository governance infrastructure.

---

## Budget Types

Each agent has hard limits across four dimensions:

| Budget Type | Unit | Purpose | Enforcement |
|------------|------|---------|------------|
| **Token budget** | Tokens per invocation | Limit inference cost per agent execution | Host-side hard limit; execution stops at boundary |
| **Execution quota** | Invocations per period | Limit agent usage frequency (daily/weekly) | Host-side enforcement; quota exceeded blocks execution |
| **Rate limit** | Requests per second | Prevent API overload and rate-limit errors | Host-side runtime limiting; queues excess requests |
| **Retry policy** | Attempts per failure | Control escalation costs on transient errors | Exponential backoff (2s, 4s, 8s, 16s) + manual pause |

---

## Enforcement Points

### Host-Side Hard Limits (Mandatory)

All budget constraints are enforced by the Claude Code runtime **before** agent execution, never as advisory guidance:

1. **Token budget enforcement**:
   - Runtime reads `max_tokens` parameter for each agent
   - Execution stops at token boundary; agent cannot exceed limit
   - Example: If `max_tokens: 20000`, execution halts at 20K tokens consumed
   - Fallback: If agent hits limit mid-task, execution pauses; manual resume or escalation required

2. **Execution quota enforcement**:
   - Runtime tracks invocation count per agent per day/week
   - When quota reached, subsequent invocations blocked until period resets
   - Example: If `daily_quota: 5`, agent can run 5 times per day; 6th invocation blocked
   - Admin override: Requires owner approval (documented in escalation procedures)

3. **Rate limiting**:
   - Runtime enforces maximum requests per second per agent
   - Excess requests queued; served on next available slot
   - Example: If `rate_limit: 2 req/s`, requests queued in 500ms batches
   - Backpressure: If queue grows, agent paused with clear logging

4. **Timeout enforcement**:
   - Wall-clock timeout per invocation; execution terminated at boundary
   - Example: If `timeout: 300s`, agent run aborted after 5 minutes
   - Hard stop: No graceful shutdown; state lost unless checkpoint saved

---

## Aggregate Accounting

When multiple agents run concurrently or an agent delegates to subagents:

### Token Aggregation
- **Per-invocation limit**: Each agent respects its own `max_tokens` independently
- **Session-level tracking**: Host tracks total tokens consumed in session
- **Overflow handling**: If total session tokens exceed configured ceiling, next agent invocation blocked until session completes

### Concurrent Execution
- **Resource isolation**: Each agent runs in separate execution context
- **Budget isolation**: One agent's limit does not affect another's
- **Quota sharing**: If agents share a pool (e.g., "test suite quota: 10/day"), consumed quota is aggregated

### Subagent Delegation
- **Parent budget**: Parent agent's budget includes subagent consumption
- **Nested limits**: Subagent has its own `max_tokens` within parent's budget
- **Example**: Parent agent (50K tokens) → spawns subagent (10K tokens max). Parent can run subagent 5 times before exhausting budget

---

## Retry Policy

Transient failures (rate limits, timeouts, network errors) trigger automatic retries:

| Failure Type | Retry Count | Backoff | Final Action |
|------------|------------|---------|-------------|
| Rate limit (429) | 3 retries | Exponential (2s, 4s, 8s) | Manual escalation if all fail |
| Timeout | 1 retry | 30s delay | Pause and ask owner for guidance |
| Network error | 2 retries | Exponential (2s, 4s) | Fail and report to owner |
| Token budget exceeded | 0 retries | N/A | Pause execution immediately |
| Quota exceeded | 0 retries | N/A | Block; wait for period reset or owner override |

### Exponential Backoff Formula

```
delay = initial_delay * (2 ^ attempt_number)

Attempt 1: 2s
Attempt 2: 4s
Attempt 3: 8s
Attempt 4: 16s (then stop; escalate)
```

**No jitter**: Deterministic backoff for predictable retry timing

---

## Exhaustion Handling

When an agent hits a hard budget limit during execution:

### Token Budget Exhausted
1. **Immediate effect**: Execution stops; no more tokens consumed
2. **Output handling**: Return partial results if available; discard incomplete output
3. **State**: Save checkpoint (if implemented); mark session as paused
4. **Escalation**: Log event with agent name, tokens consumed, request context
5. **Resolution**: Owner reviews context and decides:
   - Increase `max_tokens` for this agent (permanent change)
   - Retry with reduced scope (narrower request)
   - Skip and move to next task (abandon)

### Execution Quota Exceeded
1. **Immediate effect**: Invocation blocked; agent not started
2. **Error message**: "Agent invocation quota exceeded (5/5 daily). Reset at [UTC time]."
3. **Wait period**: Agent available after quota period resets (e.g., next day at 00:00 UTC)
4. **Override**: Owner can increase `daily_quota` and force immediate execution (rare, requires justification)

### Rate Limit (429 Response)
1. **First attempt**: Retry automatically after 2s
2. **Second attempt**: Retry after 4s
3. **Third attempt**: Retry after 8s
4. **Fourth failure**: Escalate to owner with response headers (shows retry-after window)
5. **Resolution**: May require waiting longer than backoff or increasing API quota

### Timeout Exceeded
1. **Immediate effect**: Execution terminated; partial results lost
2. **Session state**: Session marked as timeout; may be resumable
3. **Logging**: Record execution time, which step timed out, context
4. **Escalation**: Owner reviews timeout; decides:
   - Increase `timeout` for this agent (e.g., 5 min → 10 min)
   - Reduce task scope to fit within timeout
   - Implement checkpointing so work is resumable

---

## Missing Usage Data Fallback

If runtime budget tracking fails (log corruption, clock skew, etc.):

1. **Detection**: Runtime detects missing usage records during enforcement
2. **Default behavior**: 
   - **Reject invocation** (safe default): Assume quota exceeded until data recovers
   - **Owner override**: Owner can approve single execution with understanding of risk
3. **Recovery**: Operator reviews logs; reconciles actual usage with recorded usage
4. **Prevention**: Runtime writes budget telemetry to append-only log immediately after agent execution

---

## Resumable Handoff & Continuation

For long-running agents that may hit timeouts or token limits:

### Checkpoint Protocol
1. **Agent saves state** at regular intervals (e.g., every 5 minutes)
2. **State format**: JSON object with:
   - `task_id`: Unique identifier for this work
   - `progress`: Percent complete (0-100)
   - `checkpoint_data`: Serializable state (inputs, outputs so far, position)
   - `timestamp`: When checkpoint was saved
   - `tokens_used`: Cumulative token consumption
3. **Storage**: Checkpoints written to `.claude/checkpoints/{task_id}.json` (protected file)
4. **Cleanup**: Checkpoints deleted when task completes or owner explicitly cancels

### Resume Protocol
```bash
# Owner resumes interrupted agent:
node scripts/resume-agent.js --task-id tsk_xyz123 --from-checkpoint

# Agent reads checkpoint and continues:
1. Load checkpoint data
2. Validate state integrity
3. Resume from last checkpoint + 1
4. Update token counter to reflect prior consumption
5. Complete task
6. Delete checkpoint when done
```

### Budget Adjustment on Resume
- **Token budget reset**: Resume gets fresh `max_tokens` allocation (not continued from partial budget)
- **Quota adjustment**: Resuming same agent counts as new invocation (increments quota)
- **Example**: Agent hit 20K token limit on first run. On resume, gets new 20K allocation. If both runs complete, total tokens consumed = 40K (but each run shows as separate quota deduction)

---

## Budget Approval Process

### Initial Budget Allocation
1. Agent specification defines initial `max_tokens`, `daily_quota`, `rate_limit`, `timeout`
2. Owner (@ashley) reviews and approves in `.claude/agents/{name}-agent.md`
3. Once approved, budget is locked in `.claude/GOVERNANCE.md` registry
4. Changes require owner approval via issue + review process

### Requesting Budget Increase
```bash
# Developer opens issue: [AGENT-BUDGET-INCREASE-REQUEST]
Title: Agent {name} — Increase {budget_type} from X to Y
Body:
  - Agent: name
  - Current limit: current_value
  - Requested limit: new_value
  - Justification: Why increase is needed
  - Usage history: How often limit is hit; what tasks require more
  - Impact: How increase affects overall spend/policy
  
# Owner reviews request and decides:
# - Approve: Update .claude/GOVERNANCE.md + agent spec
# - Deny: Explain reasoning + suggest alternatives (scope reduction, splitting tasks)
# - Discuss: Ask clarifying questions
```

### Change Log
All budget changes logged in `.claude/BUDGET_CONTROLS.md#changelog`:

```markdown
## Change Log

| Date | Agent | Budget Type | Old Value | New Value | Reason | Owner |
|------|-------|-------------|-----------|-----------|--------|-------|
| 2026-10-19 | Changelog Agent | max_tokens | 20K | 50K | Handling large changelogs | @ashley |
| 2026-10-20 | Testing Agent | daily_quota | 5 | 10 | Running multi-suite validation | @ashley |
```

---

## Integration with CI/CD

### GitHub Actions Workflow Integration
Budget enforcement is **transparent** to CI workflows:

1. **Budgets enforced silently**: Workflow continues running; agent simply stops at limit
2. **Error reporting**: If agent hit budget during workflow:
   - Workflow logs include budget-exhaustion event
   - Check run includes summary: "Agent completed with budget limit"
3. **Workflow failure**: If budget limit causes workflow failure:
   - Check marked as failed: "Agent execution halted (token budget exceeded)"
   - Owner notified; must increase budget or reduce scope to proceed

### Metrics & Monitoring
Budget consumption tracked per agent per day:

```yaml
# Example metrics exported daily
- agent: changelog-agent
  date: 2026-10-19
  invocations: 3
  tokens_consumed: 18500 / 20000 (92%)
  quota_used: 3 / 5 (60%)
  timeouts: 0
  errors: 0
  avg_tokens_per_invocation: 6167
```

---

## Governance Registry

All approved budgets stored in `.claude/GOVERNANCE.md`:

```markdown
## Agent Budget Registry

| Agent | max_tokens | daily_quota | rate_limit | timeout | Approved By | Last Updated |
|-------|-----------|-------------|-----------|---------|-------------|-------------|
| Changelog Agent | 20K | 5 | 2 req/s | 300s | @ashley | 2026-10-19 |
| Testing Agent | 50K | 10 | 5 req/s | 600s | @ashley | 2026-10-19 |
| ... | ... | ... | ... | ... | ... | ... |
```

---

## Related Documentation

- **Agent Inventory**: `.claude/agents/INVENTORY.md` — Agent specifications and capabilities
- **Skill Inventory**: `.claude/skills/INVENTORY.md` — Skill specifications and budgets
- **Agent Governance**: `.claude/GOVERNANCE.md` — Agent selection, tool access, escalation procedures
- **Anthropic Platforms**: `docs/AnthropicPlatforms.md` — Platform capabilities and constraints (R7.2)
- **Specification**: `.github/specs/001-repo-governance-layout-and-agentic-workflows/spec.md` (R7.3)

---

_Maintained by Claude Haiku 4.5 and team_  
_Last updated: 19 October 2026_
