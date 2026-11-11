---
name: dependency-resolution
description: Use this skill to guide decision-making when work is blocked on external dependencies. Handles blocked work, external blockers, waiting periods, and escalation workflows. Companion to next-step-options. Present options at decision points without executing actions or bypassing blockers.
compatibility: Works in Claude Code, Claude.ai, and Cowork.
metadata:
  version: "1.0.0"
  categories: "delivery-coordination, blocker-management"
  features:
    - "External blocker identification"
    - "Workaround exploration"
    - "Escalation workflow"
    - "Unblocking strategy"
---

# Dependency Resolution

Guide decision-making when work is blocked on external dependencies.

## Purpose

Projects often hit blockers: waiting for third-party API documentation, stakeholder approval, another team's output, or infrastructure readiness. This creates a decision point: proceed with what's available, wait for the blocker to clear, escalate to leadership, or find a workaround. This skill identifies blockers and presents actionable options without executing actions or bypassing safety gates.

The skill is **non-executing**. It helps identify blockers, estimate impact, explore workarounds, and decide when to escalate — but does not bypass approval gates, commit to timelines with uncertain blockers, or ignore dependencies.

## When to use

Present options when:
- Work is blocked on external input (API documentation, third-party decision, stakeholder approval)
- Team is waiting for another team's deliverable (dependency between teams)
- Infrastructure or environment is not ready (staging not available, test data not ready)
- Blocker's timeline is uncertain (no ETA, depends on third party)
- Team is deciding whether to proceed with workaround or wait for proper solution
- Multiple blockers exist and team needs to prioritise

**Do not** present options when:
- Blocker is temporary and will clear soon (just wait and continue in next chat)
- Team has already decided to wait (don't re-surface the decision)
- Workaround would violate security, compliance, or quality standards
- Bypassing the blocker would create technical debt that outweighs the benefit

## How it works

1. **Identify the blocker.** What is blocking progress? Who owns it? What's the timeline?

2. **Assess impact.** How much does this blocker delay the project? What's the blast radius if we proceed without it?

3. **Explore options.** What can the team do while waiting? Are there workarounds? Can we escalate or unblock the dependency owner?

4. **Present options without bypassing.** Options might include:
   - Proceed with workaround (if safe)
   - Escalate to leadership (if timeline is critical)
   - Find alternative approach that doesn't depend on the blocker
   - Proceed partially (implement everything except the blocked part)
   - Pause and wait (use time for tech debt, other work)

5. **Document the blocker.** Capture who owns it, expected timeline, impact if it slips, and owner's contact.

6. **Stop.** Do not force deadlines, bypass gates, or make commitments that assume the blocker will clear.

## Output format

### Claude Code and Cowork (with clickable controls)

Use a single JSON object:

```json
{
  "title": "Work is blocked. What's the next move?",
  "options": [
    {
      "label": "Escalate timeline risk",
      "prompt": "Prepare summary for leadership: blocker is external (waiting on Stripe API), expected ETA is [date], impact if delayed is [X weeks slip]. Recommend: escalate to Stripe account manager."
    },
    {
      "label": "Proceed with mock data",
      "prompt": "Implement against mock Stripe API. Document: this is workaround; will integrate real API once docs arrive. Plan: 1-2 days to swap real API in."
    },
    {
      "label": "Parallel work track",
      "prompt": "Identify work that doesn't depend on Stripe API. Implement error handling, logging, monitoring in parallel. Blocker doesn't block everything."
    }
  ]
}
```

**Rules:**
- `label` is short, plain text (1–3 words)
- `prompt` references the blocker and impact so decisions are grounded
- Do not repeat blocker context; place JSON at the decision point

### Claude.ai (no clickable controls)

Disclose the limitation and present numbered options:

> I don't have clickable buttons here, but here are three ways to handle this blocker:
>
> 1. **Escalate timeline risk** — Prepare summary for leadership: Stripe API docs are delayed (expected [date]). If we don't get them by [date], we slip by 1 week. Recommend escalating to account manager.
>
> 2. **Proceed with mock data** — Implement against mock Stripe API. This is a workaround; we'll swap real API in once docs arrive. Estimated integration time: 1 day.
>
> 3. **Parallel work** — Start error handling and monitoring implementation. These don't depend on Stripe. Come back to API integration once docs arrive.
>
> Reply with `1`, `2`, `3`, or let me know what you'd prefer.

## Blocker types and strategies

### Type 1: External API / Third-Party Documentation

**Blocker:** Waiting for API docs, SDK, or third-party feature to become available.

**Strategy options:**
- Use mock/stub data (proceed without real API)
- Request early access or beta docs
- Escalate through account manager
- Find alternative third-party provider
- Redesign to eliminate the dependency

**Example:**
```json
{
  "title": "Stripe API docs are delayed. How to proceed?",
  "options": [
    {
      "label": "Mock Stripe API",
      "prompt": "Implement against mock Stripe responses. Document: 'This is temporary; will integrate real API once docs arrive.' Estimate 1 day to swap."
    },
    {
      "label": "Request early access",
      "prompt": "Contact Stripe account manager: 'We need API docs by [date] for Q1 release. Can you provide beta docs now?' Include project impact."
    },
    {
      "label": "Explore alternative",
      "prompt": "Research alternative payment providers (Square, Adyen) with available APIs. Compare: speed to integrate, feature gaps, cost."
    }
  ]
}
```

### Type 2: Stakeholder Approval / External Decision

**Blocker:** Waiting for stakeholder sign-off, compliance review, or external team decision.

**Strategy options:**
- Proceed with best-guess assumptions (document them; revise when approval comes)
- Ask stakeholder for early feedback (don't wait for formal review)
- Escalate timeline risk to leadership
- Find path forward that doesn't depend on the approval

**Example:**
```json
{
  "title": "Legal review is delayed. Can we proceed?",
  "options": [
    {
      "label": "Proceed with assumptions",
      "prompt": "Implement GDPR data retention based on best-guess policy. Document: 'Pending legal review; prepared to revise.' Get legal feedback by [date]."
    },
    {
      "label": "Request expedited review",
      "prompt": "Contact legal: 'Need GDPR policy sign-off by [date] for Q1 release. Can you fast-track?' Include project impact."
    },
    {
      "label": "Escalate to CEO/COO",
      "prompt": "If legal review is blocking Q1 deadline, escalate: 'Feature ships with temporary GDPR safeguards; full compliance in Q2.' Ask for sign-off on timeline."
    }
  ]
}
```

### Type 3: Another Team's Deliverable

**Blocker:** Waiting for another team to complete their work (data pipeline, infrastructure, API).

**Strategy options:**
- Implement against stub/mock version of their deliverable
- Run in parallel (identify work that doesn't depend on them)
- Negotiate interim version (80% done is usable)
- Escalate if timeline threatens project deadline

**Example:**
```json
{
  "title": "Analytics pipeline not ready. We need it by Monday.",
  "options": [
    {
      "label": "Negotiate interim version",
      "prompt": "Ask analytics team: 'Can you ship 80% by Monday? We'll integrate the remaining 20% next week.' Identify what's blocking their 100%."
    },
    {
      "label": "Implement with mock data",
      "prompt": "Implement our feature against mock analytics data. Once their pipeline is ready, swap real data in. Estimate 1 day to integrate."
    },
    {
      "label": "Run in parallel",
      "prompt": "Identify work that doesn't depend on analytics. Implement authentication, error handling, monitoring. Come back to analytics integration once ready."
    }
  ]
}
```

### Type 4: Infrastructure / Environment Not Ready

**Blocker:** Staging environment not available, test data not ready, or infrastructure not deployed.

**Strategy options:**
- Develop locally or in alternative environment
- Proceed with reduced testing scope (plan full testing when environment ready)
- Escalate to infrastructure team if timeline is critical
- Find workaround that doesn't require the environment

**Example:**
```json
{
  "title": "Staging environment down for 2 weeks. Can we proceed?",
  "options": [
    {
      "label": "Develop locally",
      "prompt": "Set up local development environment mirroring staging. Document: 'Will run full integration tests on staging once it's available.' Plan 1 day for env parity."
    },
    {
      "label": "Escalate to infrastructure",
      "prompt": "Contact infrastructure team: 'Staging down is blocking our Q1 feature. Can you restore it by [date]?' Include project impact."
    },
    {
      "label": "Unit + integration tests",
      "prompt": "Proceed with unit tests and local integration tests. Plan full staging testing once environment available. Risk: some bugs won't surface until staging."
    }
  ]
}
```

### Type 5: Multiple Blockers, No Clear Owner

**Blocker:** Multiple external dependencies with unclear ownership or timelines.

**Strategy options:**
- Identify owner for each blocker
- Create critical path (which blocker matters most?)
- Escalate ownership to leadership if unclear
- Find path forward that minimises dependency on uncertain blockers

**Example:**
```json
{
  "title": "Three blockers, unclear who owns. How to unblock?",
  "options": [
    {
      "label": "Create ownership map",
      "prompt": "For each blocker: who owns it? What's their ETA? What would unblock them? Create RACI matrix so we know who to escalate to."
    },
    {
      "label": "Identify critical path",
      "prompt": "Which blocker delays the project most? Escalate that one to leadership: 'Blocker X is on critical path; needs resolution by [date].'"
    },
    {
      "label": "Workaround + parallel",
      "prompt": "Find path forward without resolving all blockers now. Proceed with workarounds where safe; identify parallel work that doesn't depend on them."
    }
  ]
}
```

## Blocker documentation template

When a blocker is identified, document it:

```
## Blocker: [Brief description]

**Blocker:** Waiting for [external input/approval/deliverable]

**Owner:** [Name/team]

**Expected resolution:** [Date or "unknown"]

**Impact if delayed by 1 week:** [What ships, what doesn't?]

**Current strategy:** [What team is doing now]

**Escalation path:** [Who to escalate to if timeline slips]

**Workaround:** [If any, what's the trade-off?]

**Contact:** [Owner's email/Slack]
```

This prevents "Who was supposed to handle this?" confusion later.

## Constraints

- **Never bypass safety gates.** Do not suggest ignoring compliance, security, or quality reviews.
- **Document assumptions.** If proceeding with workaround, document what we're assuming and how we'll validate.
- **Respect other teams' timelines.** Don't demand impossible timelines from dependency owners.
- **Escalate thoughtfully.** Escalate timeline risk, not blame. Frame as "How do we unblock this?"
- **Prefer collaboration.** Find win-win solutions (negotiate interim version, run in parallel) before escalating.
- **Track ownership.** Always know who owns each blocker and have their contact info.
- **Use UK English.** Preserve exact quotations and team names.

## Examples

### External API not ready

**Situation:** Stripe API docs delayed. Feature ships in 3 weeks. Team has 2 weeks before dev work.

**Rendered (Claude Code):**
```json
{
  "title": "Stripe API docs delayed 1 week. How to proceed?",
  "options": [
    {
      "label": "Mock and proceed",
      "prompt": "Implement against mock Stripe API. Document: 'Temporary; will integrate real API week 3.' Estimate 1 day to swap."
    },
    {
      "label": "Escalate to Stripe",
      "prompt": "Contact Stripe account manager: 'Q1 release depends on API docs by [date]. Can you expedite?' If no, plan for delay."
    }
  ]
}
```

### Stakeholder approval delayed

**Situation:** Legal review of data retention policy is taking longer than expected. Needed by Monday for compliance. Currently pending.

**Rendered (Claude Code):**
```json
{
  "title": "Legal review delayed. Ship or wait?",
  "options": [
    {
      "label": "Proceed with interim policy",
      "prompt": "Implement conservative data retention (30-day max, audit logs enabled). Ship with note: 'Pending legal review; will update.' Document what changes when legal approves."
    },
    {
      "label": "Escalate to General Counsel",
      "prompt": "If Monday deadline is firm, escalate: 'Feature ships Monday with interim safeguards. Legal review scheduled for week 2.' Request approval for timeline."
    }
  ]
}
```

### Another team's deliverable blocked

**Situation:** Analytics team's data pipeline won't be ready for 2 weeks. We need it for the feature we're building.

**Rendered (Claude Code):**
```json
{
  "title": "Analytics pipeline delayed 2 weeks. How to handle?",
  "options": [
    {
      "label": "Negotiate interim version",
      "prompt": "Ask analytics: 'Can you ship 60% by Monday? We'll integrate the rest next week.' Unblock them if there's a blocker on their end."
    },
    {
      "label": "Implement with mock data",
      "prompt": "Build our feature against mock analytics. Document: 'Real pipeline integration planned for week 3.' Estimate integration cost."
    },
    {
      "label": "Run in parallel",
      "prompt": "Implement everything except analytics integration. Auth, error handling, logging can happen now. Swap analytics in later. Risk: reduced test coverage until integration."
    }
  ]
}
```

## Integration with other skills

- **next-step-options** — When work hits a blocker, offer "dependency resolution" workflow as a next-step option
- **chat-closure** — Document blockers and resolution strategy in session summary; include in continuation prompt so next chat knows what's blocked and why
- **lifecycle-patterns** — Blockers often cross phase boundaries; document them so next phase knows what's unresolved

## Test cases

See `evals/` folder for structured test prompts covering external APIs, stakeholder approvals, team dependencies, infrastructure blockers, and multi-blocker scenarios.

