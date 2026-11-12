---
name: next-step-options
description: Use this skill when research, analysis, planning, or a design/code review is complete and the user asks what comes next. Examples include research findings documented, competitive analysis wrapped up, specification completed, design review done with multiple approaches discussed, sprint planning finished, discovery phase closed, or audit/feedback session concluded. Present up to three actionable next-step options without executing them. Never suggest coding-agent actions. Do not present options if work is already in progress or if no useful next action exists.
compatibility: Works in Claude Code, Claude.ai, and Cowork. Clickable JSON presentation in Code/Cowork; numbered copy-ready options in Claude.ai.
metadata:
  version: "1.2.0"
  categories: "delivery-coordination"
  features:
    - "Contextual next-step options"
    - "Chat closure handoff"
    - "Continuation prompt generation"
---

# Next-Step Options

Present contextual choices at natural decision moments, without executing them.

## Purpose

When a user completes research, analysis, planning, or a discussion phase, they often need guidance on "what now?" This skill identifies the immediate goal, surfaces realistic next options grounded in current context, and presents them clearly without performing any action.

The skill is **not** a workflow executor or approval gate. Selecting an option sends a message; it does not execute work, bypass approval, or change records.

## When to use

Present options when:
- Research, analysis, or discussion concludes and a next decision is obvious
- A specification, plan, or summary is complete and actions logically follow
- Multiple reasonable paths forward exist and the user would benefit from seeing them framed
- The user explicitly asks "what should I do next?" in a context where options are available

**Do not** present options when:
- Work is already in progress (the user is actively building, writing, or fixing)
- No material next action remains (research is done, decision is final, task is complete)
- The immediate path forward is ambiguous (ask a clarifying question instead)
- Any candidate action involves managing or executing coding-agent work

**Edge cases: When to ask instead of present options**
- Work has hit a hard blocker (external approval pending, API not available, missing stakeholder input) — Ask: "What's blocking progress? Once [X] arrives, what's your next step?"
- Findings are tentative and key questions remain unresolved — Ask: "What's the one open question that would clarify the path forward?"
- Phase outcome depends on someone else's decision (another team, stakeholder sign-off, third-party action) — Ask: "Who decides next, and what are they waiting from us?"
- User is uncertain whether the phase is truly complete — Ask: "Does this phase feel done, or is something missing?"
- Multiple options are equally valid but require different assumptions — Clarify the assumption, then present options (e.g., "If we're prioritising speed over maintainability, here are the paths...")

## How it works

1. **Identify the goal and current state.** Read the conversation, completed work, and any unresolved decisions. Understand what the user is trying to achieve *right now*.

2. **List candidate actions internally.** What could the user do next? Keep only actions that:
   - Directly advance the stated outcome (smallest next step, not speculative)
   - Are available and permitted in the current context
   - Do not involve coding agents, implementation, or execution
   - Are distinct from each other (no duplicates or near-duplicates)

3. **Apply the absolute coding-agent exclusion.** Never suggest:
   - Starting, continuing, delegating to, or managing coding agents or coding sessions
   - Implementation or pull-request actions that depend on a coding agent
   - Indirect hand-offs that would trigger agent work (e.g., "implement this", "fix it", "handle this")
   - Workflows designed to initiate or steer agent work

   Ordinary read-only research, planning, documentation, and clarification are **permitted** — keep them explicit and bounded so they don't authorize implementation.

4. **Resolve ambiguity.** If material uncertainty prevents useful choices (e.g., "which project?", "which type of change?"), ask one focused clarifying question instead. Do not guess context.

5. **Select one to three options.** Do not manufacture padding; if only one option makes sense, present one. If two, present two.

6. **Render for the environment.** In Claude Code and Cowork, use JSON for clickable multiple-choice. In Claude.ai (no clickable controls), disclose the limitation and present numbered copy-ready options so the user can reply with one line.

7. **Stop.** Do not invoke workflows, change records, or execute suggestions. Your job ends after presenting choices or asking the clarifying question.

## Output format

### Claude Code and Cowork (with clickable controls)

Use a single JSON object:

```json
{
  "title": "Which next step should I prepare?",
  "options": [
    {
      "label": "Draft acceptance criteria",
      "prompt": "Draft acceptance criteria for the agreed scope. Do not save or implement anything."
    },
    {
      "label": "Summarise open decisions",
      "prompt": "Summarise the unresolved decisions for the agreed scope without changing records."
    }
  ]
}
```

**Rules:**
- `title` is optional; use it only if the question is not already stated in surrounding prose
- `label` is short, plain text (1–3 words)
- `prompt` is self-contained: resolve all references so it stands alone if pasted
- Do not repeat choices in prose and JSON; place JSON at the decision point
- Do not claim that selections execute work or that rendering is verified without observation

### Claude.ai (no clickable controls)

Disclose the limitation and present numbered options:

> I don't have clickable buttons here, but here are three next steps you could take:
>
> 1. **Draft acceptance criteria** — Draft acceptance criteria for the agreed scope. Do not save or implement anything.
>
> 2. **Summarise open decisions** — Summarise the unresolved decisions for the agreed scope without changing records.
>
> Reply with `1`, `2`, or the exact action you'd like instead.

**Rules:**
- Name the limitation first (briefly)
- Number each option (1–3)
- Use bold for the label
- Provide a copy-ready reply instruction

### When no options remain

If work is complete or no useful next action exists:

> The scope is agreed and the specification is final. No further options remain unless you'd like to revise the scope.

Do not invent generic follow-up work or "would you like to…?" prompts.

## Advanced: Chat Lifecycle Handoffs

When work reaches certain milestones, offer specialized next steps:

### Chat closure (work is complete, no more next steps)
When a user indicates work is fully done and asks "what's next?" but no useful action remains:

Offer: **Hand off to chat-closure skill** — Summarize progress, document decisions, generate a continuation prompt for future reference, and close the chat cleanly.

Example:
> "The specification is finalized, all decisions are made, and there's no immediate next step. Would you like me to hand off to the chat-closure skill to document this session and prepare a continuation prompt for when you resume this work?"

### Continuation prompt generation (work in progress, chat ending)
When substantial work is in progress and the user is wrapping up the session:

Offer: **Generate continuation prompt** — Create a self-contained prompt summarizing context, decisions made, what's left to do, and how to resume efficiently in a new chat.

Example:
> "You've made good progress on the redesign discovery phase. Before we close, would you like me to generate a continuation prompt so you can pick this up seamlessly in a new chat?"

## Constraints

- **Never execute, change, or approve.** Only present choices.
- **Bounded scope.** Do not offer read-only research if it would naturally lead to agent work. (Research is OK; "research then have an agent implement" is not.)
- **Permissions and access.** Offer only actions supported in the current environment. Do not infer access from titles or previous recommendations; inspect when necessary.
- **Preserve boundaries.** Respect personal, company, client, and product boundaries. Do not import another team's conventions without evidence.
- **No coded assumptions.** Do not invent owners, deadlines, estimates, or completion evidence.
- **No hand-offs to agents.** Never hand off an option whose execution would involve a coding agent, directly or indirectly. (Chat-closure and continuation handoffs are metadata/planning workflows, not implementation agents, so they are permitted.)
- **Use UK English.** Preserve exact quotations, identifiers, and official names.

## Examples

### Linear: ticket ready for next steps

**Situation:** A Linear ticket research phase is complete; the scope is drafted but not yet moved to In Progress.

**Candidate actions:** Draft acceptance criteria, move to backlog, assign, ask for stakeholder sign-off.

**Chosen options** (three distinct, advancing paths):
1. Draft acceptance criteria (clarifies scope further)
2. Summarise open decisions (identifies blockers before moving in)
3. Move to In Progress and assign (starts implementation)

**Rendered (Claude Code):**
```json
{
  "title": "What's next for this ticket?",
  "options": [
    {
      "label": "Draft acceptance criteria",
      "prompt": "Draft acceptance criteria for this ticket's scope. Do not modify the ticket itself."
    },
    {
      "label": "Identify open decisions",
      "prompt": "List the unresolved decisions that might block this ticket. Do not change the ticket."
    },
    {
      "label": "Move to In Progress",
      "prompt": "Move this ticket to In Progress and assign it to a team member. I'll approve before you save."
    }
  ]
}
```

### Code review: decision on architecture

**Situation:** A code review identified a performance issue; the author and reviewer have discussed trade-offs but haven't decided which approach to take.

**Candidate actions:** Research benchmarks for each approach, draft a comparison doc, ask for a third opinion, shelve and revisit later.

**Chosen options:**
1. Draft a comparison of the two approaches (helps decide)
2. Request a third opinion from the team lead (escalates decision)

**Rendered (Claude Code):**
```json
{
  "title": "How should we decide on this refactor?",
  "options": [
    {
      "label": "Compare approaches",
      "prompt": "Draft a brief comparison of the two refactor approaches (reusable utility vs. inline). Include trade-offs. Do not commit anything."
    },
    {
      "label": "Ask for a second opinion",
      "prompt": "Summarise the trade-offs for the team lead and ask for their perspective. Do not change the PR."
    }
  ]
}
```

### Research summary: planning next

**Situation:** A competitive analysis is complete; findings are documented. The user might want to act on findings or prepare for stakeholder alignment.

**Candidate actions:** Schedule a sync with stakeholders, draft a slide deck, file issues based on findings.

**Chosen options:**
1. Draft a summary for stakeholders (prepares for the conversation)
2. Create issues for each finding (turns findings into work)

**Rendered (Claude.ai):**

> I don't have clickable buttons here, but here are two next steps you could take:
>
> 1. **Draft a stakeholder summary** — Create a one-page summary of the key findings for the team. Do not send it yet.
>
> 2. **Create action items** — Turn each finding into a brief action item. Do not file them yet.
>
> Reply with `1`, `2`, or let me know what you'd prefer instead.

### Chat closure: work is complete

**Situation:** A specification is finalized, all decisions are documented, no blockers remain. User asks "what's next?" but the work is genuinely complete.

**Assessment:** No useful next action exists. Offer handoff to chat-closure skill.

**Rendered:**

> The specification is finalized, all decisions are documented, and there's no immediate next step. Would you like me to hand off to the chat-closure skill? It can summarize this session, document the decisions, generate a continuation prompt for future reference, and close the chat cleanly.
>
> Or, if there's work I missed, tell me what else needs doing.

### Continuation prompt: work in progress, resuming later

**Situation:** Discovery phase is underway. User has completed user flow mapping and wireframe sketches but hasn't finished feature prioritization. Chat is ending.

**Assessment:** Work is substantial but incomplete. Offer continuation prompt generation.

**Rendered:**

> You've made solid progress on the dashboard discovery phase — user flows mapped, wireframes sketched, but feature prioritization is still pending. Before we wrap this chat, would you like me to generate a continuation prompt? It will capture the current state, decisions made so far, what's left to do, and how to resume seamlessly in a new chat.
>
> Options:
> 1. Generate continuation prompt (prepared for next chat)
> 2. Keep working (continue in this chat)
> 3. Close without a continuation prompt

### Edge case: Work blocked on external approval

**Situation:** Specification is complete and technically sound. The spec needs stakeholder sign-off before implementation can begin. Stakeholder review is scheduled for next week.

**Assessment:** No immediate options exist; work is blocked on external timeline. Ask clarifying question instead.

**Rendered:**

> The specification is finalised and technically sound, but it's waiting for stakeholder approval before implementation starts. The review is scheduled for next week. What would be most useful while you wait — draft an implementation plan, prepare Q&A for the stakeholder meeting, or something else?

## Test cases

See `evals/` folder for structured test prompts covering Linear workflows, code decisions, and general planning scenarios.
