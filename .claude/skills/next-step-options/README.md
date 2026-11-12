# next-step-options

Present contextual choices at natural decision moments during research, analysis, planning, or review phases.

## Quick Summary

**When to use:** Research/analysis is complete. Multiple reasonable next paths exist. User asks "what should I do next?"

**What it does:** Identifies 1-3 actionable options without executing them. Helps clarify the path forward without making decisions for you.

**What it does NOT do:** Execute code, approve changes, commit to timelines, or manage agent work.

---

## When to Use This Skill

✅ **Use when:**
- Research, analysis, or discussion concludes
- A plan or specification is complete and actions logically follow
- Multiple reasonable paths forward exist
- User explicitly asks "what's next?"

❌ **Don't use when:**
- Work is actively in progress (building, writing, fixing)
- No material next action remains (work is done; decision is final)
- Path forward is ambiguous (ask a clarifying question instead)
- The next action involves code execution or agent work

---

## Key Decision Points

This skill covers these phases:

| Phase | State | Example |
|-------|-------|---------|
| **Research complete** | Findings documented | "Competitive analysis done. What next?" |
| **Spec/plan complete** | Requirements finalized | "Requirements locked. Ready to move forward?" |
| **Code review decision** | Trade-offs discussed | "Two approaches; which do we pursue?" |
| **Phase closure** | Work finished | "Discovery complete. Next phase?" |

---

## Edge Cases: When to Ask Instead of Present Options

The skill includes 5 patterns for when **asking** is better than presenting options:

1. **Blocked on external approval** → "What's blocking progress? Once X arrives, what's your next step?"
2. **Findings are tentative** → "What's the one open question that would clarify the path forward?"
3. **Decision depends on someone else** → "Who decides next, and what are they waiting from us?"
4. **Phase completion uncertain** → "Does this phase feel done, or is something missing?"
5. **Options require different assumptions** → Clarify the assumption, then present options

---

## Quick Reference

**Output format:**
- **Claude Code/Cowork:** JSON with clickable options
- **Claude.ai:** Numbered list with copy-ready replies

**Option count:** 1-3 only (no padding)

**What options cover:**
- Distinct, advancing paths (not duplicates)
- Actions available in current context
- Read-only research, planning, documentation (NOT agent work)

---

## Integration

- **Flows into:** [chat-closure](../chat-closure/README.md) (when phase is complete and ready for handoff)
- **Flows into:** [stakeholder-alignment](../stakeholder-alignment/README.md) (when findings need stakeholder approval)
- **Flows into:** [dependency-resolution](../dependency-resolution/README.md) (when work is blocked)
- **See also:** [Integration Guide](../integration-guide/GUIDE.md) for decision tree and workflow chains

---

## Common Patterns

### Pattern: Research → Stakeholder Alignment → Spec → Implementation

```
Research complete
  ↓ next-step-options
  "Present findings or draft spec?"
  ↓ stakeholder-alignment (if approval needed)
  "Prepare presentation"
  ↓ chat-closure (handoff to next phase)
```

### Pattern: Code Review → Decision → Escalation

```
Code review feedback received
  ↓ pr-review-workflow (for PR-specific workflows)
  "Revision or discussion?"
  ↓ next-step-options (for non-PR decisions)
  "Draft comparison or escalate?"
```

### Pattern: Work Blocked

```
Hit external blocker
  ↓ dependency-resolution
  "Mock API, escalate, or workaround?"
  ↓ next-step-options (once blocker addressed)
  "Proceed with implementation or re-plan?"
```

---

## Test Cases

See `evals/` folder for 3 structured test prompts:
- `linear-ticket-ready/` — Research phase complete; scope drafted
- `code-review-architecture/` — Trade-offs discussed; decision needed
- `research-findings-ready/` — Competitive analysis done; findings documented

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.2.1 | 2026-10-30 | Added edge-case guidance (5 scenarios when to ask instead) |
| 1.2.0 | — | Original production release |

---

## File Structure

```
next-step-options/
├─ SKILL.md (full documentation)
├─ README.md (this file)
└─ evals/
   ├─ linear-ticket-ready/
   ├─ code-review-architecture/
   └─ research-findings-ready/
```

---

## Quick Links

- [Full Skill Documentation](SKILL.md)
- [Integration Guide (Decision Tree)](../integration-guide/GUIDE.md)
- [Lifecycle Patterns Reference](../lifecycle-patterns/LIFECYCLE.md)
- [All Skills](../)

