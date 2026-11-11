# pr-review-workflow

Guide decision-making through pull request review cycles without executing code changes, approvals, or merges.

## Quick Summary

**When to use:** PR has feedback, revision underway, CI failing, or approval pending. Navigate each review state without losing context.

**What it does:** Identifies current review state. Presents options for next step (revision, re-review, escalation, approval, etc.)

**What it does NOT do:** Merge, approve, request changes, or modify code.

---

## When to Use This Skill

✅ **Use when:**
- PR has received reviewer feedback
- Author has submitted revisions; ready for re-review
- CI/tests have failed after feedback
- Multiple reviewers have conflicting feedback
- Approval decision is pending

❌ **Don't use when:**
- PR is newly opened (awaiting first review)
- Author is actively revising (let them complete first)
- Merge/close/hold decision is already made
- PR review is blocked waiting for author response

---

## Review States & Decision Points

| State | Scenario | Options |
|-------|----------|---------|
| **feedback-received** | Reviewer submitted changes requested | Author revises / Discussion continues / Escalate |
| **revision-ready** | Author pushed commits; ready for re-review | Approve / Request minor changes / Discuss further |
| **ci-failure** | Tests failing after revision | Investigate failure / Fix bug / Approve conditionally |
| **approval-ready** | All feedback addressed, CI passing | Approve / Approve + follow-ups / Hold for testing |
| **conflict** | Multiple reviewers disagree | Clarify priority / Author chooses / Escalate |

---

## Quick Reference

**Context preservation:**
- Always reference prior feedback so decisions are grounded
- Track what feedback points were addressed in revisions
- Document why CI failures matter (real bug vs. flaky test)

**Key principle:** Present options without executing. No merges, no approvals, no code changes.

---

## Integration

- **Triggered by:** [next-step-options](../next-step-options/README.md) (for non-PR decisions)
- **Companion to:** [lifecycle-patterns](../lifecycle-patterns/LIFECYCLE.md) (PR is part of implementation phase)
- **See also:** [Integration Guide](../integration-guide/GUIDE.md) for workflow chains

---

## Common Patterns

### Pattern: Initial Feedback → Revision → Re-Review → Approval

```
Feedback received
  ↓ pr-review-workflow (feedback-received state)
  "Revision or discussion?"
  ↓ Author revises
  ↓ pr-review-workflow (revision-ready state)
  "Approve or request changes?"
  ↓ Re-review
  ↓ pr-review-workflow (approval-ready state)
  "Approve or hold?"
```

### Pattern: CI Failure During Review

```
CI fails after revision
  ↓ pr-review-workflow (ci-failure state)
  "Investigate, fix bug, or approve conditionally?"
  ↓ Decision made
  ↓ pr-review-workflow (next state based on decision)
```

### Pattern: Multi-Reviewer Conflict

```
Reviewers disagree (speed vs. robustness)
  ↓ pr-review-workflow (conflict state)
  "Clarify priority, author chooses, or escalate?"
  ↓ Decision made
  ↓ Proceed with agreed approach
```

---

## Test Cases

See `evals/` folder for 5 structured test prompts:
- `feedback-received/` — Reviewer submitted requested changes
- `revision-ready/` — Author pushed revisions; ready for re-review
- `ci-failure/` — Tests failing; unclear if real bug or flake
- `approval-ready/` — All feedback addressed; approval pending
- `conflict/` — Multiple reviewers disagree on trade-offs

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | 2026-10-30 | Initial release; 5 review states with context preservation |

---

## File Structure

```
pr-review-workflow/
├─ SKILL.md (full documentation)
├─ README.md (this file)
└─ evals/
   ├─ feedback-received/
   ├─ revision-ready/
   ├─ ci-failure/
   ├─ approval-ready/
   └─ conflict/
```

---

## Quick Links

- [Full Skill Documentation](SKILL.md)
- [Integration Guide (Decision Tree)](../integration-guide/GUIDE.md)
- [Lifecycle Patterns Reference](../lifecycle-patterns/LIFECYCLE.md)
- [All Skills](../)

