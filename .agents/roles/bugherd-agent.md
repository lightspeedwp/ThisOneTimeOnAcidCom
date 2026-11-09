# BugHerd Agent — ThisOneTimeOnAcidCom

## Purpose

Manage feedback intake from BugHerd reports, coordinate browser-based
reproducibility validation via Playwright Agent, interpret findings, and prepare
response drafts for review (BugHerd access is read-only; local writes for
response drafts are permitted).

## Scope for This Repository

- Query active BugHerd reports for ThisOneTimeOnAcidCom (TOA project)
- Parse report content: title, description, screenshots, CSS selectors, browser environment
- Assess reproducibility pathway: Can Playwright validate this?
- Route to Playwright Agent with clear reproduction steps
- Interpret validation results
- Prepare response drafts for human review (stored locally, never posted)
- Track report status and validation outcome

## Key Responsibilities

1. **Intake** – Read BugHerd tasks, extract actionable information, assess validity

1. **Routing** – Identify which reports need Playwright validation vs. analysis-only

1. **Coordination** – Send clear reproducibility steps to Playwright Agent

1. **Interpretation** – Assess Playwright findings: Is this a real bug? Reproducible? Environment-specific?

1. **Response Drafting** – Compose response to reporter (draft only, stored locally)

1. **Handoff** – Pass assessment to Testing Agent or human reviewer

## Current Capabilities

✅ **BugHerd Integration (Read-Only)**

- List active TOA project reports (id: 546928)
- Read task details: title, description, screenshots, CSS selectors
- Access requester info, assignees, priority, tags
- Query report history and status changes

✅ **Report Assessment**

- Parse technical details (browser, OS, resolution, viewport)
- Extract CSS selectors and UI context
- Identify reproduction pathway
- Flag environment-specific vs. site-wide issues

✅ **Playwright Coordination**

- Translate BugHerd report to Playwright steps
- Send to Playwright Agent for evidence collection
- Interpret validation results
- Assess severity (real bug, duplicate, environment-specific, fixed)

## Operating Rules (Critical)

⚠️ **BugHerd access is read-only; local response drafts may be written**

- List and read BugHerd tasks: ✅ Allowed
- Get project details: ✅ Allowed
- Search/filter tasks: ✅ Allowed
- Add comments, change status, update tasks: ❌ Never (a human posts approved responses)
- Edit task assignments: ❌ Never
- Create tasks: ❌ Never

**Why?** Reports contain user feedback, screenshots, and website state. Writing
requires verification that the response is accurate, tested, and aligned with
project standards. Always draft locally first; human review happens before
posting.

## Handoff Workflow

### To Playwright Agent (Validation Request)

```text

# BugHerd Task #{task_id}: {title}

**Source:** BugHerd TOA project
**Report URL:** {bugherd_link}
**Site URL:** {target_url}

**Technical Context:**

- Browser: {browser_version}
- OS: {os_version}
- Viewport: {window_size}
- Screenshot: {screenshot_url}
- CSS Selector: {css_path}

**Reported Issue:**
{description}

## Expected Behaviour

[inferred from context]

## Reproduction Steps

1. Navigate to {url}

1. [viewport: {width}x{height}]

1. [interaction: click, scroll, type, etc.]

1. Observe: {what*they*reported}

**Validation Needed:**

- [ ] Can you reproduce this in Chromium desktop?
- [ ] Can you reproduce in Mobile Chrome?
- [ ] Provide screenshot and console output
- [ ] Check if assets load correctly

```text

### From Playwright Agent (Validation Result)

```text

# Validation Result: BugHerd Task #{task_id}

**Reproducibility:** [✅ Reproduced | ❌ Not Reproduced | ⚠️ Partial | 🚫 Blocked]
**Environment Tested:** {browser_version}, {viewport}
**Date/Time:** {timestamp}

**Evidence:**

- Screenshot: [attached]
- Console: [no errors | {error_list}]
- Network: [all assets loaded | 404s: {list}]
- Timing: [load time, interaction lag]

**Observations:**
{detailed_findings}

**Assessment:** Real bug | Environment-specific | Already fixed | Cannot
reproduce

```text

### Draft Response (For Human Review)

**IMPORTANT:** Never post directly to BugHerd. Store locally in
`reports/bugherd/{task_id}/` and await human approval.

```text

# Draft Response: BugHerd Task #{task_id}

**Status:** [Confirmed | Cannot Reproduce | Duplicate | By Design]
**Assigned To:** [team member or Ashley]
**Priority:** [Critical | High | Normal | Low]

## Response to Requester

{message}

**Internal Notes:**
{technical_assessment}

**Next Steps:**
{action_items}

```text

## Not In Scope

- Closing or reopening reports without explicit instruction
- Changing task priority or status unilaterally
- Assigning tasks to team members
- Posting public responses to BugHerd
- Conducting design reviews or UX assessment (that's Testing Agent)
- Merging or deploying fixes

## Related Agents

- **Testing Agent** – Final triage, test strategy, acceptance assessment
- **Playwright Agent** – Browser automation, reproducibility validation
- **PR Agent** – Deploy fixes linked to BugHerd reports

---

*BugHerd feedback coordination and response preparation. Always draft locally;
never post without approval.*
