---
name: chat-closure
description: Use this skill to wrap up productive chat sessions by documenting achievements, summarizing decisions, and generating a continuation prompt for resuming in a new chat. Trigger when a session reaches natural closure — research complete, specification finalized, discovery phase done, or work paused mid-project. Generates a structured session summary and a self-contained continuation prompt so the next chat can resume seamlessly without re-explaining context. Never executes actions or changes records. Works alongside next-step-options skill for end-of-chat handoffs.
compatibility: Works in Claude Code, Claude.ai, and Cowork. Generates plain-text structured output suitable for copying to a new chat.
metadata:
  version: "1.0.0"
  categories: "delivery-coordination, chat-lifecycle"
---

# Chat Closure

Wrap up sessions cleanly and prepare seamless resumption.

## Purpose

When a chat reaches natural closure — work is complete, a phase ends, or the session must conclude — this skill documents the session's achievements, extracts context, and generates a continuation prompt for resuming work in a new chat. It preserves all relevant context so the next chat can pick up without re-explaining what happened.

The skill is **read-only and non-executing**. It summarizes, documents, and generates prompts — it does not save files, change records, or initiate new sessions.

## When to use

Present closure when:
- Research or analysis is complete and documented; ready to hand off
- A specification or plan is finalized; implementation phase begins elsewhere
- A discovery or planning phase is done; execution continues in a new chat
- Work is substantial and mid-way; the session is ending but work will resume
- Decisions are made and need preservation for future reference

**Do not** use when:
- Work is actively in progress and continuing in the same chat
- The session is just starting (no achievements to document yet)
- No material context exists (trivial tasks, one-off questions)
- The user explicitly says they won't need this work again

## How it works

1. **Assess session state.** Review the conversation to understand:
   - What was accomplished in this session
   - What decisions were made and why
   - What remains unresolved or pending
   - What artifacts, documents, or deliverables were created
   - Who is involved or needs to be looped in

2. **Summarize achievements.** Capture:
   - The session's goal and how far it advanced the overall outcome
   - Key decisions and trade-offs discussed
   - Deliverables created (specs, plans, analyses, etc.)
   - Open questions or blockers identified
   - Dependencies or stakeholder actions needed

3. **Extract decision context.** Document:
   - Why decisions were made (trade-offs considered)
   - Assumptions underlying recommendations
   - Alternatives rejected and why
   - Criteria used for prioritization

4. **Generate continuation prompt.** Write a self-contained prompt that includes:
   - **Goal**: What the overall work is trying to achieve
   - **Context**: Current state, decisions made to date, what's been completed
   - **What's left**: Outstanding decisions, pending work, next phase
   - **How to resume**: Specific instruction on where to pick up, what the next steps are

5. **Present closure.** Offer:
   - The session summary (what was accomplished)
   - The continuation prompt (ready to copy into a new chat)
   - Option to create a new session with the continuation prompt loaded
   - Confirmation that work is documented before closing

## Output format

### Session Summary

**Keep this concise.** Structure as:

```
# Session Summary: [Session title/goal]

## Accomplished
- [Deliverable or achievement]
- [Key decision made]
- [Analysis completed]

## Decisions Made
- [Decision]: [Rationale]
- [Alternative rejected]: [Why]

## Pending
- [Open question]
- [Blocker]
- [Next phase]

## Continuation
Ready to resume in a new chat. See continuation prompt below.
```

### Continuation Prompt

**Self-contained; copy directly into a new chat.** Structure as:

```
# Continuation: [Work title]

## Goal
[Overall outcome you're working toward]

## Current State
[What's been decided, what's been completed, where you are in the work]

## Decisions Made
- [Decision and why it was made]
- [Trade-offs or alternatives considered]
- [Why we didn't pursue Option X] (e.g., "Rejected Approach A because it requires API changes; Approach B works within current constraints")

## Constraints & Assumptions
- [Constraint that affects decisions] (e.g., "Must ship by end of Q4", "Third-party API only supports SMS, not push")
- [Assumption underlying the approach] (e.g., "Assuming we can get vendor buy-in on pricing")
- [Team preference or risk aversion] (e.g., "Prioritising stability over advanced features in this phase")

## What's Left
- [Next step]
- [Outstanding questions]
- [Blockers or dependencies]
- [Who owns what] (e.g., "Engineering team will estimate on Monday; waiting for their input before finalising timeline")

## How to Resume
[Specific instruction: e.g., "Start by reviewing the spec in the first section above. Then move to the Design phase. If stuck on X, refer to the decision made earlier about Y. The key blocker is approval from Legal; once that arrives, we can proceed to implementation."]
```

## Examples

### Research complete: Ready for handoff

**Situation:** Competitive analysis is done. Findings are documented. User wants to hand off to product team.

**Session summary:**
```
# Session Summary: Competitive Analysis

## Accomplished
- Analysed 5 competitor products (Stripe, Square, Adyen, Paypal, Wise)
- Identified 3 key gaps in our payment integration offering
- Documented feature matrix across all 5 competitors
- Prioritised gaps by customer impact and effort to close

## Decisions Made
- Focus on mobile payment support first (all competitors have it; highest user demand)
- Defer billing analytics feature (lower priority; only 2 competitors have it)

## Pending
- Product prioritisation meeting with stakeholders
- Engineering estimate for mobile payment feature

## Continuation
Ready to hand off to product team with full findings document.
```

**Continuation prompt:**
```
# Continuation: Payment Integration Roadmap

## Goal
Close the gap between our payment integration and competitor offerings, prioritising features with highest customer impact.

## Current State
Completed a competitive analysis of 5 major payment providers. Identified 3 key gaps:
1. Mobile payment support (all competitors have; highest user demand)
2. Billing analytics dashboard (2 competitors; medium demand)
3. Subscription management automation (3 competitors; niche demand)

Prioritisation: Start with mobile payment support based on user feedback and competitive urgency.

## Decisions Made
- Mobile payment first: all competitors have it; highest user demand; faster to implement than billing analytics
- Deferred subscription automation: only 3 competitors; niche demand; can revisit after mobile payments ship
- Why we didn't pursue integrating with all payment methods immediately: current SDK has limits; MVP covers 80% of transaction volume

## Constraints & Assumptions
- Current payment SDK only supports card payments; mobile payment means adding Apple Pay and Google Pay integrations (both native to SDK)
- Product team confirmed mobile payments can ship within Q1 (timing driven by customer retention risk)
- Engineering capacity: 1 senior engineer + 1 mid-level for 6 weeks

## What's Left
- Product prioritisation meeting to confirm scope and timeline (stakeholders meeting Thursday)
- Engineering estimate for mobile payment feature (engineering team reviewing spec Monday)
- Detailed API and flow spec once scope is agreed
- Implementation planning and sprint breakdown

## How to Resume
Start by reviewing the full competitive analysis. Use it to guide Thursday's stakeholder meeting — the prioritisation rationale is solid and backed by data. Once engineering confirms the estimate on Monday, create detailed API specs. The key blocker is stakeholder sign-off; everything else flows from that decision.
```

### Specification complete: Mid-project handoff

**Situation:** Two-factor authentication spec is finalised. Implementation begins in a new session.

**Session summary:**
```
# Session Summary: 2FA Specification

## Accomplished
- Completed full spec for SMS + authenticator app 2FA flow
- Documented user enrollment, verification, backup codes, recovery scenarios
- Resolved decision: SMS for initial rollout, authenticator app in phase 2
- Identified 4 technical requirements and dependencies

## Decisions Made
- SMS-first approach: faster to implement, broader user base can use
- Defer authenticator app to phase 2: higher friction, smaller user base initially

## Pending
- Engineering review of spec
- Database schema design for session tokens
- API endpoint design
- Implementation timeline estimate

## Continuation
Spec is finalised and ready for implementation. Next session should focus on technical design and engineering.
```

**Continuation prompt:**
```
# Continuation: 2FA Implementation — SMS First

## Goal
Implement SMS-based two-factor authentication for user account security, with phase 2 adding authenticator app support.

## Current State
Specification is complete (see attached or prior chat). Key decisions:
- SMS for phase 1 (faster, broader reach)
- Authenticator app deferred to phase 2
- Backup codes required for account recovery
- Session timeout after 2FA re-entry (TBD: 30 min vs. session-end)

Tech requirements:
- SMS provider integration (Twilio recommended; cost/rate reviewed)
- Redis for OTP cache (expiry: 10 minutes)
- Session token rotation after successful 2FA
- Backup code generation and storage (hashed)

## What's Left
- Engineering review of spec
- Database schema for 2FA sessions and backup codes
- API design (enrollment, verify, recovery flows)
- Implementation timeline and resource allocation
- Testing strategy and edge cases

## How to Resume
Start by reviewing the full specification from the prior chat. Then:
1. Conduct technical design session (schema, API design)
2. Get engineering estimate and timeline
3. Plan implementation in 2–3 week sprints, starting with enrollment flow
4. Add tests for SMS delivery failure scenarios early
```

## Constraints

- **Read-only.** Summarise and document; do not execute, change records, or initiate new sessions.
- **No execution.** Generate prompts; do not run them.
- **Respect chat boundaries.** Do not suggest re-opening completed chats or continuing in the same session.
- **Preserve context.** Include enough detail in the continuation prompt so a new chat needs no context from prior conversation.
- **Be honest about gaps.** If work is incomplete, be explicit about what's left and why.
- **No generic closure.** Avoid "have a nice day" or manufactured follow-up. Closure is the point.
- **Use UK English.** Preserve exact quotations, identifiers, and official names.

## Integration with next-step-options

When next-step-options detects work is complete and offers "hand off to chat-closure," this skill takes over:

1. User selects "Hand off to chat-closure"
2. Chat-closure runs: assesses session, generates summary and continuation prompt
3. Offers: "Ready to close. Review the summary below, then confirm or revise."
4. User confirms
5. Presents session summary + continuation prompt
6. Offers: "New session with continuation prompt loaded?" or "Close cleanly"

This is a natural handoff — next-step-options identifies the moment; chat-closure executes the closure.

## Test cases

See `evals/` folder for structured test prompts covering research handoff, specification completion, and mid-project continuation scenarios.
