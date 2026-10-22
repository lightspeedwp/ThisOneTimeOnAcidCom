# Agent Budget Controls & Enforcement Strategy

**Document Status**: Specification for TOA-271 implementation  
**Last Updated**: 2026-10-22  
**Owner**: @ashley (TOA-271 epic implementation)  
**Scope**: Requirements documentation only — host-side enforcement remains pending in TOA-271

---

## Purpose

Define budget control mechanisms for agent execution, ensuring predictable resource consumption, cost containment, and graceful degradation when resource limits are approached or exceeded.

Session limits, delegated-work accounting, remaining-budget feedback, and recovery behavior below are TOA-271 requirements, not implemented controls or Claude API guarantees. Numerical limits and spending increases require owner approval under spec §R7.3.

---

## Budget Types

### 1. **Token Limit** (Primary)

**Definition**: Maximum number of tokens (input + output) an agent session may consume.

**Properties**:
- Host-side hard limit (TOA-271; pending implementation)
- Per-session allocation, not per-turn (pending)
- Aggregate across all delegated work, including nested agents and subagents (pending)
- Host-provided remaining-budget feedback (pending); `total_tokens` is not a Claude Messages API guarantee

**Examples**:
- Standard agent: 100,000 tokens
- Long-research agent: 500,000 tokens
- Lightweight validator: 50,000 tokens

### 2. **Execution Time** (Secondary)

**Definition**: Maximum wall-clock time an agent session may run before automatic termination.

**Properties**:
- Host-side enforcement (not advisory)
- Per-session timeout
- Applies to entire session lifecycle (not per-turn)
- Grace period for graceful shutdown (30–60s warning before hard kill)

**Typical Values**:
- Short tasks (validation, review): 10–30 minutes
- Medium tasks (implementation): 60–120 minutes
- Long tasks (research, planning): 180–360 minutes
- Deferrable work (scheduled jobs): 600+ minutes

### 3. **Cost Ceiling** (Tertiary)

**Definition**: Maximum USD cost an agent session is authorized to spend on API calls.

**Properties**:
- Monitored post-execution (not enforced in real-time)
- Per-session allocation
- Aggregate cost across all model calls and external API calls
- Exceeding ceiling triggers owner notification and requires approval before later sessions

**Examples**:
- Standard agent: $2.00 per session
- Complex research: $10.00 per session
- Data-heavy work: $50.00 per session

### 4. **Retry Limit** (Quaternary)

**Definition**: Maximum number of retries for transient failures (network timeouts, rate limits, service degradation).

**Properties**:
- Applied per-operation (not per-session)
- Exponential backoff strategy (2s, 4s, 8s, 16s between retries)
- Failure classification: transient vs. permanent
- Exhaustion halts operation, escalates to human decision

**Typical Retry Policies**:
- API calls: 3–4 retries
- Git operations: 2–3 retries
- External service calls: 2 retries (fast-fail for cost control)
- Internal database operations: no retry (fail fast)

---

## Enforcement Points

### Claude API Controls

- **Per-response output limit**: Messages API `max_tokens` limits one response's output; it does not cap aggregate input and output across a session.
- **Usage reporting**: Responses report fields such as `input_tokens`, `output_tokens`, and cache usage. The host must reconcile these into its budget ledger; the API does not provide the session's remaining allowance.
- **Rate limiting**: The API can reject requests with HTTP 429. Retry scheduling and backoff belong to the client or host; no fixed session pause or quota reset interval is guaranteed here.

### Required Host-Side Contract (TOA-271 — Pending)

Spec §R7.3 requires hard enforcement at the host, covering aggregate accounting, retries/cancellation, exhaustion, and fallback behavior. This repository does not implement that runtime control.

1. **Token limit and accounting**:
   - Reserve tokens before dispatch and reconcile input, output, and cached-token usage across calls, retries, and subagents.
   - Include concurrent and in-flight reservations in the parent ledger; reject dispatch that would exceed the approved session ceiling.
   - On exhaustion, block further calls and cancel outstanding work where supported; preserve checkpoints and report the remaining allowance through host-provided feedback.

2. **Execution time**:
   - Track a session deadline and stop execution at the approved timeout.
   - Plan a 30–60s checkpoint warning before the deadline; do not promise recovery of in-flight work after termination.

3. **Invocation quotas and rate limiting**:
   - Apply per-agent admission limits and bounded retry/backoff policies before dispatch.
   - Charge retries to the same session budget; retries must not bypass token or time limits.

### Soft Policies (Advisory, Not Enforced)

**These are documented best-practices, not enforced:**

1. **Recommended Checkpoint Intervals**: Run validation every 50k tokens (advisory only)
2. **Recommended Session Breaks**: Pause between 100k–200k token sessions (best practice)
3. **Cost Warning Thresholds**: Warn when approaching 80% of cost ceiling (informational)

---

## Aggregate Accounting Across Delegated Work

When an agent spawns subagents, delegates to external agents, or forks sessions:

### Token Budget Aggregation

```
Parent Agent Budget: 200,000 tokens
├─ Main session: 150,000 tokens consumed
└─ Delegated work:
   ├─ Subagent 1: 30,000 tokens (counted against parent budget)
   ├─ Subagent 2: 15,000 tokens (counted against parent budget)
   └─ Forked session: Not counted (separate session, separate budget)

Total consumed: 195,000 / 200,000 (97.5% budget used)
Remaining: 5,000 tokens
```

### Rules

1. **Subagents**: Token consumption counts against parent budget (nested calls deduct from parent allowance)
2. **Forked Sessions**: Run on separate budgets (inherit parent's token limit, but tracked independently)
3. **Concurrent Work**: Concurrent subagents within a session share its budget; independently budgeted forked sessions use their own ledgers
4. **Chained Delegations**: Transitive subagent usage counts against the originating session's budget; a fork starts a separate accounting boundary

**Implication**: An agent cannot spawn unlimited subagents — each subagent reduces remaining budget for parent's own work.

---

## Retry and Cancellation Policies

### Transient Failure Classification

**Transient** (retry):
- Network timeouts (TCP timeout, connection reset)
- HTTP 429 (rate limited) — retry with exponential backoff
- HTTP 503/504 (service temporarily unavailable)
- DNS resolution failures (temporary, retry)
- Temporary database locks

**Permanent** (fail immediately, no retry):
- HTTP 400/401/403/404 (client error, auth failure)
- HTTP 410 (gone)
- Invalid input validation (fail immediately, escalate)
- Authentication failures (no retry)
- File not found (no retry, unless part of transient state)

### Retry Strategy

```
Attempt 1: Immediate
Attempt 2: Wait 2 seconds + jitter
Attempt 3: Wait 4 seconds + jitter
Attempt 4: Wait 8 seconds + jitter
Attempt 5 (if configured): Wait 16 seconds + jitter
→ Exhausted: Fail operation, escalate decision to parent
```

**Jitter** (±10%): Prevent thundering herd on service recovery

### Cancellation Policy

1. **User-initiated**: `/cancel` command or agent interrupt
   - Stops current operation
   - Preserves partial results where possible
   - Returns graceful message to user

2. **Budget exhaustion**: Token or time limit reached
   - Host blocks further dispatch and cancels outstanding work where supported
   - Preserves the latest checkpoint and reports exhaustion
   - Cost overruns are checked post-execution and require approval before later sessions

3. **Permanent failure**: Unrecoverable error (auth expired, resource deleted)
   - Log failure with context
   - Do not retry
   - Escalate to human decision if blocking critical path

---

## Exhaustion Handling

### When Token Budget Exhausted

**Behavior**:
1. Host blocks further dispatch when the approved allowance is exhausted
2. Outstanding reservations remain charged until reconciled; cancel in-flight work where supported
3. Report: "Token budget exhausted; session terminated"
4. Return saved partial results where available; completion of an in-flight turn is not guaranteed

**Recovery**:
- User can continue work in new session
- State preserved in prior turn messages/artifacts
- Recommended: Save intermediate work before hitting limit

### When Time Budget Exhausted

**Behavior**:
1. Host terminates the session at the deadline after any checkpoint warning
2. In-flight operations aborted
3. Partial results lost
4. Error message returned to user

**Recovery**:
- User resumes in new session
- Lost work must be re-run
- Recommended: Checkpoint work frequently on long-running tasks

### When Cost Ceiling Exceeded

**Behavior** (host-side monitoring):
1. Session continues to completion (cost not enforced in real-time)
2. Post-execution cost check: if ceiling exceeded
3. Owner notified via alert/email
4. Require owner approval before later sessions for this agent

**Recovery**:
- Review cost drivers (are API calls inefficient?)
- Lower budget ceiling (if permanent cost reduction needed)
- Optimize prompts or external API calls (reduce unnecessary calls)

---

## Missing Usage Data Fallback

### Scenario: Token Count Data Unavailable

**Example**: Claude API response missing `usage` field (rare but possible edge case)

**Fallback Strategy**:

1. **Charge the full remaining allowance**:
   - If usage cannot be reconciled, mark the session's remaining token allowance as consumed (zero remaining)
   - Keep known usage and outstanding reservations charged; apply this fallback once to the shared session ledger, including subagents

2. **Suspend further dispatch**:
   - Stop new model calls, retries, and delegated work within this session
   - Preserve existing checkpoints without additional model calls

3. **Log and escalate**:
   - Record incident with timestamp and context
   - Notify agent owner if pattern emerges
   - Alert infrastructure team (potential API issue)

4. **Resume only within an approved ceiling**:
   - Resume this session only after authoritative usage reconciliation establishes a positive remainder under its original ceiling
   - Otherwise, require owner approval for a new session allocation; never silently reset or increase the original allowance

---

## Resumable Handoff and Continuation

### Saving State for Resumption

**When an agent hits budget limits:**

1. **Save context**:
   - Preserve conversation history (all turns to date)
   - Save any in-progress work artifacts (drafts, partial outputs)
   - Document what was completed vs. what remains

2. **Provide handoff summary**:
   ```
   **Session Suspended: Token Exhaustion**
   - Tokens consumed: 98,500 / 100,000 (98.5%)
   - Completed: Phases 1–3, 8/12 tasks done
   - Remaining: Phases 4–6 (4 tasks pending)
   - Saved state: [link to artifacts/draft files]
   - Resume prompt: [exact user request to continue]
   ```

3. **Create new session** (user or parent agent):
   - Reload all prior context (conversation, artifacts)
   - Continue from saved checkpoint
   - New budget allocation (fresh tokens, time, cost)
   - Reduce checkpoint interval (more frequent saves)

### Continuation Strategies

**Strategy A: Linear Resumption** (recommended)
- Continue exactly where prior session ended
- Include summary of completed work in new session prompt
- Same agent, same workstream

**Strategy B: Escalation**
- Hand off to more capable agent (if current agent insufficient)
- Provide full context and artifacts
- Document handoff reason (budget exhaustion, task complexity, etc.)

**Strategy C: Delegation**
- Break remaining work into independent subtasks
- Spawn separate agents per subtask
- Parent agent orchestrates merge/integration

---

## Budget Allocation Patterns

### Standard Allocations (Recommendations)

| Agent Type | Token Limit | Time Limit | Cost Ceiling | Retry Limit |
|-----------|-------------|-----------|--------------|------------|
| Validator (code review, linting) | 50,000 | 10 min | $0.50 | 2 |
| Researcher (exploration, analysis) | 200,000 | 120 min | $5.00 | 3 |
| Writer (documentation, content) | 150,000 | 60 min | $3.00 | 2 |
| Implementer (coding, refactoring) | 250,000 | 180 min | $8.00 | 3 |
| Planner (architecture, design) | 300,000 | 240 min | $10.00 | 2 |
| Long-runner (data analysis, audit) | 500,000+ | 600 min | $20.00+ | 2 |

### Per-Operation Budgets (Nested)

When an agent spawns subagents:

```
Parent: 200k tokens
├─ Code review agent: 50k (25%)
├─ Test runner agent: 75k (37.5%)
└─ Writer agent: 75k (37.5%)
Total allocated: 200k (100% — no buffer for parent's own work)
```

**Better allocation**:
```
Parent: 200k tokens
├─ Parent's own work: 50k (25% buffer)
├─ Code review agent: 30k (15%)
├─ Test runner agent: 60k (30%)
└─ Writer agent: 60k (30%)
Total: 200k (all accounted for)
```

---

## Implementation Checklist (For TOA-271)

- [ ] Implement token budget tracking in agent runtime
- [ ] Enforce hard limit on token consumption (session termination)
- [ ] Implement execution time limits with grace period
- [ ] Monitor cost ceiling (post-execution alerting)
- [ ] Track retry attempts and apply exponential backoff
- [ ] Aggregate token usage across nested agents/subagents
- [ ] Expose remaining-budget feedback from the host ledger
- [ ] Implement graceful shutdown on budget exhaustion
- [ ] Provide session resumption API and state preservation
- [ ] Document user-facing budget error messages
- [ ] Add monitoring/alerting for cost trends
- [ ] Create owner dashboard: per-agent budget utilization
- [ ] Implement cost-based rate limiting (pause high-cost agents)
- [ ] Test budget exhaustion scenarios (load, edge cases)
- [ ] Document recovery procedures for budget events

---

## References

- `.claude/agents/INVENTORY.md` — Agent specifications and budget requirements
- `.claude/skills/INVENTORY.md` — Skill execution environment and budget impact
- `.claude/SKILL_ROUTING.md` — When to use which execution mode (affects budget)
- `.claude/GOVERNANCE.md` — Owner approval process for budget overrides
- [`.github/AGENTS.md`](../../.github/AGENTS.md) — Org-wide agent governance rules

---

**End of Document**  
*Maintained as part of TOA-241 Repository Governance Infrastructure*  
*Implementation roadmap: TOA-271 Agent Budget Controls & Enforcement*
