# chat-closure

Wrap up sessions cleanly and prepare seamless resumption in new chats.

## Quick Summary

**When to use:** Phase is complete. Work will resume in a new chat. Document everything so next chat has full context.

**What it does:** Creates session summary + self-contained continuation prompt. Preserves decisions, rationale, and context across chat boundaries.

**What it does NOT do:** Execute code, change records, or create new sessions.

---

## When to Use This Skill

✅ **Use when:**
- Research/spec/discovery phase is complete
- Implementation phase begins (in new chat or same)
- Work is substantial and mid-way (session ending)
- Decisions need preservation for future reference

❌ **Don't use when:**
- Work is actively continuing in same chat
- Session is just starting (no achievements yet)
- No material context exists (trivial one-off tasks)
- User won't need this work again

---

## Key Decision Points

This skill handles these closure scenarios:

| Scenario | Output |
|----------|--------|
| **Research handoff** | Findings + prioritisation + why we didn't do X |
| **Spec completion** | Spec + decisions made + constraints + what's left |
| **Mid-project pause** | Current state + progress + next steps + how to resume |
| **Phase boundary** | Session summary + continuation prompt for next phase |

---

## What Gets Documented

Each closure captures:

- **Goal** — What are we trying to achieve end-to-end?
- **Current State** — What's been completed, what's pending?
- **Decisions Made** — What did we decide? Why?
- **Why didn't we do X** — What alternatives were rejected, and why?
- **Constraints & Assumptions** — What limits our options?
- **What's Left** — Outstanding decisions, pending work, blockers
- **How to Resume** — Specific instruction for next chat

---

## Continuation Prompt Structure

The generated prompt is **self-contained** — next chat reader needs zero context from prior conversation:

```
# Continuation: [Work Title]

## Goal
[Overall outcome]

## Current State
[What's been decided, what's been completed]

## Decisions Made
- [Decision and why it was made]
- [Why we didn't pursue Option X]

## Constraints & Assumptions
- [Team preferences, deadline, technical limits]

## What's Left
- [Next step]
- [Blockers and who owns them]

## How to Resume
[Specific instruction for next phase]
```

---

## Quick Reference

**Success criteria for continuation prompts:**
- ✅ Completely self-contained (no "as we discussed")
- ✅ Decision rationale documented ("Why didn't we...?")
- ✅ Blockers identified with owner + ETA
- ✅ Next phase guidance is explicit
- ✅ ~1 page (concise, copy-paste ready)

**Common mistakes to avoid:**
- ❌ Referencing prior conversation ("as discussed in Chat A")
- ❌ Missing decision rationale (why we chose A over B)
- ❌ Unclear who owns what next
- ❌ Generic "next steps" without specifics

---

## Integration

- **Triggered by:** [next-step-options](../next-step-options/README.md) (when phase is complete)
- **Precedes:** New chat starting with continuation prompt
- **Pairs with:** [lifecycle-patterns](../lifecycle-patterns/LIFECYCLE.md) (reference for multi-phase handoffs)
- **See also:** [Integration Guide](../integration-guide/GUIDE.md) for workflow chains

---

## Common Patterns

### Pattern: Research → Spec Handoff

```
Chat A (Research):
  Research complete
  ↓ chat-closure
  Session summary + continuation prompt
  ↓ paste in new chat

Chat B (Spec):
  Paste continuation prompt
  Spec writer has full context; proceeds without re-explaining
```

### Pattern: Mid-Project Handoff

```
Chat A (Discovery):
  Partial work; session ending
  ↓ chat-closure
  Current state + decisions + what's left
  ↓ paste in new chat

Chat B (Continuation):
  Resume from continuation prompt
  Picks up exactly where Chat A left off
```

### Pattern: Multi-Phase Lifecycle

```
Chat A: Research → chat-closure
Chat B: Spec (using Chat A continuation) → chat-closure
Chat C: Implementation (using Chat B continuation) → chat-closure
Chat D: Review/Release (using Chat C continuation)

Each chat builds on prior context without re-explaining.
```

---

## Test Cases

See `evals/` folder for 3 structured test prompts:
- `research-handoff/` — Research complete; ready to pass to spec team
- `spec-complete/` — Spec finalized; handoff to implementation
- `discovery-wip/` — Discovery mid-way; session ending; resuming later

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0.1 | 2026-10-30 | Enhanced continuation prompt template with decision rationale sections |
| 1.0.0 | — | Original production release |

---

## File Structure

```
chat-closure/
├─ SKILL.md (full documentation)
├─ README.md (this file)
└─ evals/
   ├─ research-handoff/
   ├─ spec-complete/
   └─ discovery-wip/
```

---

## Quick Links

- [Full Skill Documentation](SKILL.md)
- [Integration Guide (Workflow Chains)](../integration-guide/GUIDE.md)
- [Lifecycle Patterns Reference](../lifecycle-patterns/LIFECYCLE.md)
- [All Skills](../)

