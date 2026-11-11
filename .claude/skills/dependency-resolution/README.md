# dependency-resolution

Guide decision-making when work is blocked on external dependencies.

## Quick Summary

**When to use:** Work blocked on external API, approval, another team, or infrastructure. Explore options without bypassing safety gates.

**What it does:** Identifies blocker type. Presents options (workaround, escalate, unblock, defer) without forcing timelines.

**What it does NOT do:** Bypass approval gates, commit to impossible timelines, or ignore dependencies.

---

## When to Use This Skill

✅ **Use when:**
- Work is blocked on external input (API docs, approval, third-party)
- Another team's work is blocking progress
- Infrastructure or environment is not ready
- Blocker timeline is uncertain
- Multiple blockers exist; unclear priority

❌ **Don't use when:**
- Blocker will clear soon (just wait)
- Team has already decided approach (don't re-surface)
- Workaround would violate security/compliance
- Bypassing blocker would create unacceptable tech debt

---

## Blocker Types & Decision Points

| Blocker Type | Scenario | Options |
|--------------|----------|---------|
| **external-api** | Third-party API docs delayed | Mock API / Early access / Alternative provider / Scope reduction |
| **external-decision** | Approval blocking (legal, compliance) | Interim policy / Expedited review / Assumption-based / Defer |
| **team-dependency** | Another team's deliverable delayed | Negotiate interim / Mock data / Parallel work / Escalate |
| **infrastructure** | Staging down; test environment unavailable | Wait + adjust testing / Escalate / Rent temporary / Local simulation |
| **multi-blocker** | 3+ blockers; unclear ownership | Create ownership map / Identify critical path / Escalate / Parallel workarounds |

---

## Blocker Documentation Template

When identifying a blocker, document it:

```
## Blocker: [Brief description]

**Owner:** [Name/team]

**Expected resolution:** [Date or "unknown"]

**Impact if delayed 1 week:** [What ships, what doesn't?]

**Current strategy:** [What team is doing now]

**Escalation path:** [Who to escalate to]

**Workaround:** [If any, what's the trade-off?]

**Contact:** [Owner's email/Slack]
```

---

## Quick Reference

**Assessment questions:**
- What is blocking? Who owns it? What's the ETA?
- What's the impact if it slips 1 week? 2 weeks?
- Are there safe workarounds?
- Who needs to unblock this? What's their priority?
- What's the critical path?

**Decision criteria:**
- Speed vs. quality vs. cost
- Internal capacity vs. external timelines
- Safety/compliance boundaries

---

## Integration

- **Triggered by:** [next-step-options](../next-step-options/README.md) (when work hits blocker)
- **May interact with:** [stakeholder-alignment](../stakeholder-alignment/README.md) (if approval is blocker)
- **Precedes:** [chat-closure](../chat-closure/README.md) (document blocker status for next phase)
- **See also:** [Integration Guide](../integration-guide/GUIDE.md) for workflow chains

---

## Common Patterns

### Pattern: API Not Ready → Mock & Swap Later

```
Stripe API delayed 2 weeks
  ↓ dependency-resolution (external-api state)
  "Mock API, request early access, or alternative?"
  → "Mock API; integrate real API when docs arrive"
  ↓ Implementation continues with mocks
  ↓ When API ready: 1-day integration cost
```

### Pattern: Legal Review Blocking → Interim Policy

```
Legal review no ETA; deadline approaching
  ↓ dependency-resolution (external-decision state)
  "Expedite, interim policy, assumptions, or defer?"
  → "Interim policy; legal review planned for next sprint"
  ↓ Ship with conservative safeguards
  ↓ Revise once legal approves
```

### Pattern: Multiple Blockers → Critical Path

```
3 blockers (API, legal, analytics); unclear priority
  ↓ dependency-resolution (multi-blocker state)
  "Create ownership map, identify critical path, escalate"
  → "API is critical path; focus escalation there"
  ↓ Parallel work on non-critical blockers
```

---

## Test Cases

See `evals/` folder for 5 structured test prompts:
- `external-api/` — Stripe API docs delayed 2 weeks
- `external-decision/` — Legal review blocking compliance work
- `team-dependency/` — Analytics pipeline delayed
- `infrastructure/` — Staging environment down
- `multi-blocker/` — 3 blockers with unclear ownership

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | 2026-10-30 | Initial release; 5 blocker types + multi-blocker handling |

---

## File Structure

```
dependency-resolution/
├─ SKILL.md (full documentation)
├─ README.md (this file)
└─ evals/
   ├─ external-api/
   ├─ external-decision/
   ├─ team-dependency/
   ├─ infrastructure/
   └─ multi-blocker/
```

---

## Quick Links

- [Full Skill Documentation](SKILL.md)
- [Integration Guide (Decision Tree)](../integration-guide/GUIDE.md)
- [Lifecycle Patterns Reference](../lifecycle-patterns/LIFECYCLE.md)
- [All Skills](../)

