---
name: pr-review-workflow
description: Use this skill to guide decision-making at each stage of a pull request review cycle. Handles requested changes, re-reviews, approval considerations, and CI/test failures. Present options at natural decision points without executing code changes, approvals, or merges. Companion to next-step-options.
compatibility: Works in Claude Code, Claude.ai, and Cowork. Clickable JSON presentation in Code/Cowork; numbered copy-ready options in Claude.ai.
metadata:
  version: "1.0.0"
  categories: "delivery-coordination, code-review"
  features:
    - "Review cycle decision points"
    - "Handling feedback and revisions"
    - "CI/test failure triage"
    - "Approval workflows"
---

# PR Review Workflow

Guide decision-making through pull request review cycles without executing code changes, approvals, or merges.

## Purpose

Pull request reviews involve multiple decision points: initial feedback received, author revising, reviewer reconsidering, CI failures, or approval ready. This skill identifies the current state and presents actionable next steps at each stage, preserving context across review rounds and preventing context loss.

The skill is **non-executing**. It presents choices, documents feedback rounds, and helps decide what to do next — but does not merge, approve, request changes, or modify code.

## When to use

Present options when:
- PR has received reviewer feedback (requested changes, suggestions, questions)
- Author has submitted revisions and the PR is ready for re-review
- Reviewer is reconsidering approval (new concern, edge case, design question)
- CI or tests have failed and the team is deciding on next steps
- All feedback is addressed and approval decision is pending
- Multiple reviewers have conflicting feedback or requests

**Do not** present options when:
- The PR is newly opened and awaiting first review (no feedback yet)
- Author is actively revising (let them complete revision first)
- The decision to merge/close/hold is already made
- Review is blocked on the author responding to feedback (ask clarifying question instead: "Waiting for author response?")

## How it works

1. **Identify the review state.** Is this the initial review phase, a revision round, a re-review, CI failure, or approval decision?

2. **Map feedback clearly.** What specific feedback was given? What has been addressed? What remains outstanding?

3. **Present options without executing.** Options might include:
   - Author revises and resubmits
   - Discussion continues (unresolved design question)
   - Escalate to code owner or tech lead
   - Request changes formally (don't make the change; present this as an option)
   - Approve conditionally (e.g., "approve once tests pass")
   - Close the PR (not approved; document why)

4. **Preserve review context.** When presenting options, include a brief reference to prior feedback so the decision is grounded in what came before.

5. **Stop.** Do not make code changes, approve, merge, or request changes. Your job ends after presenting options.

## Output format

### Claude Code and Cowork (with clickable controls)

Use a single JSON object:

```json
{
  "title": "What's next for this PR review?",
  "options": [
    {
      "label": "Author revises",
      "prompt": "Author addresses the feedback and pushes new commits. Do not review until they confirm ready. Note the feedback points they're addressing: [list]."
    },
    {
      "label": "Discussion continues",
      "prompt": "Summarise the unresolved design question. What would help resolve it — a design doc, a spike, a third opinion?"
    },
    {
      "label": "Escalate to tech lead",
      "prompt": "Prepare a summary of the disagreement for the tech lead. Do not make the decision; present both positions fairly."
    }
  ]
}
```

**Rules:**
- `label` is short, plain text (1–3 words)
- `prompt` is self-contained and includes relevant context from prior feedback
- Do not repeat feedback in prose and JSON; place JSON at the decision point
- Reference specific feedback points so decisions are grounded in discussion

### Claude.ai (no clickable controls)

Disclose the limitation and present numbered options:

> I don't have clickable buttons here, but here are the next steps for this PR:
>
> 1. **Author revises** — Address the feedback about error handling and re-submit. Note: the three points from the reviewer are [list]. Don't review until they confirm they're ready.
>
> 2. **Discussion continues** — The design question about caching strategy is still open. Would a spike or a design doc help resolve it?
>
> 3. **Escalate** — This is a architectural decision; maybe the tech lead should weigh in.
>
> Reply with `1`, `2`, `3`, or let me know what you'd prefer.

## Review states and options

### State 1: Feedback received, awaiting revision

**When:** Reviewer has submitted requested changes. PR is marked "changes requested" or similar.

**Candidate options:**
- Author revises and resubmits
- Discussion continues on unresolved points
- Escalate if feedback is unreasonable or blocked

**Example:**
```json
{
  "title": "PR has feedback. What's next?",
  "options": [
    {
      "label": "Author revises",
      "prompt": "Author addresses the three points: error handling in the catch block, missing test for the edge case, and simplifying the validation logic. Push commits when ready."
    },
    {
      "label": "Discuss further",
      "prompt": "The validation logic change seems like a bigger refactor. Do you want to discuss the scope before revising?"
    }
  ]
}
```

### State 2: Author has revised, ready for re-review

**When:** Author has pushed new commits in response to feedback.

**Candidate options:**
- Approve the changes
- Request further changes (if revision didn't fully address feedback)
- Review and request minor changes only

**Example:**
```json
{
  "title": "PR is ready for re-review.",
  "options": [
    {
      "label": "Review changes",
      "prompt": "Check that the three feedback points were addressed: error handling, edge case test, and validation simplification. Approve if satisfied."
    },
    {
      "label": "Request minor changes",
      "prompt": "If the revision is 90% there but missed one detail, describe the minor follow-up. Do not demand a complete overhaul."
    }
  ]
}
```

### State 3: Reviewer has concerns, approval not ready

**When:** Reviewer is reconsidering approval. A design question emerged, or a new concern surfaced.

**Candidate options:**
- Request formal changes (document the concern)
- Approve conditionally (e.g., "approve once tests pass" or "approve with follow-up issue filed")
- Escalate to architecture team
- Shelve the PR pending a design discussion

**Example:**
```json
{
  "title": "Approval decision needed.",
  "options": [
    {
      "label": "Request changes formally",
      "prompt": "If this is a blocker, document the concern and request changes. Be specific about what would resolve it."
    },
    {
      "label": "Approve with follow-up issue",
      "prompt": "If this is good-enough-for-now but there's a longer-term concern, approve and file a follow-up issue to track it."
    },
    {
      "label": "Escalate to architect",
      "prompt": "If the concern affects system design, prepare a brief summary and loop in the architecture team."
    }
  ]
}
```

### State 4: CI or tests failed

**When:** Automated tests or CI checks have failed after review feedback was addressed.

**Candidate options:**
- Fix the failing test (if it's a real issue with the code)
- Fix the flaky test (if it's an infrastructure issue)
- Investigate what changed (why did it fail now but not before?)
- Approval can proceed once CI passes

**Example:**
```json
{
  "title": "Tests failed. What's the blocker?",
  "options": [
    {
      "label": "Investigate failure",
      "prompt": "Check why the test failed. Is it a real bug in the changes, or a flaky test? Document findings."
    },
    {
      "label": "Fix the bug",
      "prompt": "If the failing test reveals a real issue, author should fix it and re-run CI."
    },
    {
      "label": "Approve conditionally",
      "prompt": "If it's a known flaky test and unrelated to the changes, note that approval is conditional on CI passing on retry."
    }
  ]
}
```

### State 5: All feedback addressed, approval pending

**When:** All requested changes have been made, all feedback points are resolved, and the reviewer is ready to decide.

**Candidate options:**
- Approve
- Approve with minor nitpicks (approve but document what could be better)
- Hold for further testing or stakeholder review

**Example:**
```json
{
  "title": "Ready for approval decision?",
  "options": [
    {
      "label": "Approve",
      "prompt": "All feedback has been addressed. Approve the PR and it's ready to merge."
    },
    {
      "label": "Approve + document follow-ups",
      "prompt": "Approve but file follow-up issues for: [minor improvements, refactoring opportunities, tech debt]. Do not block merge on these."
    }
  ]
}
```

### State 6: Multiple reviewers, conflicting feedback

**When:** Reviewers disagree (e.g., one wants stricter error handling, another wants to ship faster).

**Candidate options:**
- Request clarification from reviewers on priority
- Document trade-off and let author choose approach
- Escalate to tech lead for tiebreaker
- Compromise: approve with scope-limiting follow-up issues

**Example:**
```json
{
  "title": "Reviewers disagree. How to resolve?",
  "options": [
    {
      "label": "Clarify priority",
      "prompt": "Ask reviewers: which concern is a hard blocker? Is robust error handling more critical than shipping on time?"
    },
    {
      "label": "Author chooses",
      "prompt": "Document both positions and let the author decide. They may have context that resolves the disagreement."
    },
    {
      "label": "Tech lead decides",
      "prompt": "Escalate to tech lead if reviewers remain deadlocked. Prepare a neutral summary of both positions."
    }
  ]
}
```

## Context preservation across review rounds

**Problem:** Review context gets lost across rounds ("What did the reviewer ask for initially?").

**Solution:** When presenting options in a re-review, include a brief reference to prior feedback:

**Poor:**
```json
{
  "label": "Approve",
  "prompt": "All changes look good. Approve."
}
```

**Better:**
```json
{
  "label": "Approve",
  "prompt": "The three requested changes have been addressed: error handling improved, edge case test added, validation logic simplified. Approve."
}
```

## Constraints

- **Never merge, approve, or change code.** Only present choices.
- **Preserve feedback context.** Reference prior feedback so decisions are grounded.
- **Respect review boundaries.** Reviewers decide; you present options.
- **No force merges.** Do not suggest bypassing review, CI, or approval requirements.
- **Document disagreements clearly.** If reviewers conflict, present both positions fairly without bias.
- **Respect timeline constraints.** If a PR must ship by a deadline, surface that in the decision context.
- **Use UK English.** Preserve exact quotations and PR/issue identifiers.

## Examples

### Initial feedback: error handling and testing

**Situation:** Reviewer has given feedback on a PR for a payment processing feature. Feedback: "Error handling needs to catch payment provider failures; add test for failed transaction scenario."

**Rendered (Claude Code):**
```json
{
  "title": "What's next for this PR?",
  "options": [
    {
      "label": "Author revises",
      "prompt": "Author addresses the two points: add retry logic for payment provider failures, and add test for failed transaction scenario. Push commits when ready. Current PR: focus is on happy path; these changes fill critical gaps."
    },
    {
      "label": "Discuss scope",
      "prompt": "If retry logic is more complex than expected, discuss scope with reviewer before diving into implementation. But the test is essential; that's non-negotiable."
    }
  ]
}
```

### Re-review: changes look good

**Situation:** Author has pushed commits addressing error handling and tests. Reviewer is ready to re-review.

**Rendered (Claude Code):**
```json
{
  "title": "Re-review after revision.",
  "options": [
    {
      "label": "Review changes",
      "prompt": "Check that: (1) retry logic correctly handles payment provider errors, (2) failed transaction test is present and passing, (3) no new issues introduced. Approve if satisfied."
    },
    {
      "label": "Request minor follow-ups",
      "prompt": "If 90% there but one detail needs refinement (e.g., retry timing, edge case in test), request minor changes. Do not re-open the full discussion."
    }
  ]
}
```

### CI failure during review

**Situation:** PR tests are failing after feedback was addressed. Reviewer is unsure if it's a real bug or a flaky test.

**Rendered (Claude Code):**
```json
{
  "title": "Tests failing. What's the issue?",
  "options": [
    {
      "label": "Investigate",
      "prompt": "Check the test logs. Is this a real bug in the payment handling, or a flaky test that's unrelated to the changes?"
    },
    {
      "label": "Approve conditionally",
      "prompt": "If it's a known flaky test unrelated to the changes, approve with the note that CI must pass on merge. Do not approve if the test is catching a real bug."
    }
  ]
}
```

## Integration with next-step-options

This skill is a specialization of next-step-options for PR workflows. When a PR review reaches a decision point (feedback received, revision ready, approval needed), use this skill's templates to present options.

If the PR is approved and ready to merge, hand off to next-step-options or chat-closure to decide what happens next (e.g., merge immediately, release planning, documentation).

## Test cases

See `evals/` folder for structured test prompts covering feedback rounds, revision cycles, CI failures, and multi-reviewer scenarios.

