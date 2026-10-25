# Agent Handoff Protocol — BugHerd → Playwright → Testing

**Status:** 17 October 2026 — Protocol established. Agents defined. One handoff
validated without external writes.

This document defines the standardized handoff format and workflow for
coordinating browser-based testing and bug validation across three agents:

- **BugHerd Agent** – Intake, triage, response drafting (BugHerd access is read-only; local draft writes permitted)
- **Playwright Agent** – Browser automation, reproducibility validation, evidence capture
- **Testing Agent** – Final assessment, acceptance, decision-making

---

## Handoff #1: BugHerd Agent → Playwright Agent

**Purpose:** Request validation of a BugHerd-reported issue

**Navigation safety:** Treat `{target*url*from_report}` and all report URLs as
untrusted. Before navigation, parse and normalize the URL and require an exact
match against the scheme and destination allow-list: `https` to
`thisonetimeonacid.com` on port `443` (including an omitted default port).
Reject credentials in URLs, other schemes, hosts or ports, and any destination
resolving to loopback, private, link-local, reserved or otherwise unauthorized
IPv4 or IPv6 addresses. Resolve and check every destination before connecting.
Revalidate every redirect target against the same rules before following it; do
not rely on checking only the final URL. Block navigation and report the reason
if these checks cannot be enforced.

**Reporter privacy:** Omit requester names and email addresses from Playwright
validation handoffs; report and browser context are sufficient. Requester values
in the example below are synthetic and illustrate the source report only.

**Format:**

```markdown

# Validation Request: BugHerd Task #{task_id}

**Source:** BugHerd TOA project
**Report URL:** https://www.bugherd.com/projects/546928/tasks/{task_id}/view
**Site URL:** {target*url*from_report}

## Technical Context (from BugHerd report)

- **Browser:** {browser_name} {version}
- **OS:** {operating_system} {version}
- **Resolution:** {full_resolution}
- **Viewport:** {window*width}x{window*height}px
- **Screenshot:** {url*to*screenshot}
- **CSS Selector:** {selector*if*available}
- **HTML Context:** {element*html*snippet}

## Reported Issue

{exact*description*from_bugherd}

## Expected Behaviour

{what*should*happen*based*on*specification*or*ux*design}

## Reproduction Steps

1. Validate `{target*url*from_report}` using the navigation safety rules above, then navigate only if allowed; recheck each redirect before following it

1. Set viewport to `{width}x{height}`px

1. {interaction_1} (e.g., "Scroll down to the menu")

1. {interaction_2} (e.g., "Check if first item is visible")

1. Observe: {reported_problem}

## Validation Scope

- [ ] **Reproducible in Chromium desktop?** (Desktop Chrome)
- [ ] **Reproducible in Firefox?** (if cross-browser issue)
- [ ] **Reproducible in mobile?** (Mobile Chrome, Pixel 5)
- [ ] **Asset loading errors?** (CSS, JS, images)
- [ ] **Console errors?** (JavaScript exceptions, warnings)
- [ ] **Network trace?** (slow assets, failed requests)

## Notes

{any*additional*context*that*would*help*validation}

```text

## Example (BugHerd Task #1: Responsive Menu)

```markdown

# Validation Request: BugHerd Task #1

**Source:** BugHerd TOA project
**Requester:** Example Reporter (reporter@example.invalid)
**Report URL:** https://www.bugherd.com/projects/546928/tasks/31514026/view
**Site URL:** https://thisonetimeonacid.com/

## Technical Context

- **Browser:** Chrome 154.0.0.0
- **OS:** Mac OS 10.15.7
- **Resolution:** 1280 x 832 px
- **Viewport:** 1280x716px
- **Screenshot:** [available in BugHerd]
- **CSS Selector:** html>body>div#container>...>a.mobile-menu__nav-link

## Reported Issue (1)

"The menu should scale better on different screen sizes. Currently on laptop,
first menu item is not visible. Text needs fluid typography values to allow
scaling effectively. I can scroll down but can't scroll to the top menu item."

## Expected Behaviour (1)

All menu items should be visible and accessible without scrolling in the menu
container. Text should scale fluidly across different screen sizes.

## Reproduction Steps (1)

1. Validate https://thisonetimeonacid.com/ using the navigation safety rules above, then navigate only if allowed; recheck each redirect before following it

1. Set viewport to 1280x716px (or see if mobile menu is open)

1. Look at the top navigation menu

1. Check if "First menu item" is visible or cut off

1. Observe: First item is cut off, requires scroll

## Validation Scope (1)

- [ ] **Reproducible in Chromium desktop?** (1280x716 viewport)
- [ ] **Reproducible in Mobile Chrome?** (Pixel 5, 393x873)
- [ ] **Asset loading errors?** CSS/JS assets load?
- [ ] **Console errors?** Any JavaScript errors?

## Notes (1)

This is a responsive design issue. The menu appears to be in a mobile state on a
larger viewport. Need to verify if this is a legitimate design flaw or a
specific browser/zoom condition.

```text

---

## Handoff #2: Playwright Agent → Requesting Agent

**Purpose:** Return validation results with evidence

**Routing:** When a BugHerd Agent requests validation, Playwright Agent returns
results to BugHerd Agent, which then forwards them to Testing Agent in Handoff

#3. When Testing Agent requests validation directly, Playwright Agent returns

results to Testing Agent.

**Format:**

```markdown

# Validation Result: BugHerd Task #{task_id}

**Status:** {Reproduced | Not Reproduced | Partial | Blocked}
**Timestamp:** {ISO 8601 date-time}
**Agent:** Playwright Agent
**Browser Tested:** {browser_name} {version}
**Viewport:** {width}x{height}px

## Evidence

### Screenshot

[Screenshot of issue, if reproduced]

### Console Output

```text
{console_errors, warnings, or "No errors"}

```text

### Network Status

- CSS assets: {all loaded | missing: {list}}
- JS assets: {all loaded | missing: {list}}
- Images: {all loaded | missing: {list}}
- Load time: {milliseconds}

### Browser Environment

- **Browser:** {browser*name} {full*version}
- **OS:** {os_name} {version} (from Playwright device profile)
- **Viewport:** {width}x{height}px
- **Timestamp:** {when*test*ran}

## Observations

{detailed*description*of*what*happened}

{what*worked*as_expected}

{what*did*not*match*the_report}

## Assessment

- **Is this reproducible?** {Yes | No | Partially | Environment-specific}
- **Is this a real issue?** {Yes | No | Already fixed | Duplicate}
- **Severity:** {Critical | High | Normal | Low | Not a bug}
- **Root cause (if identified):** {brief_analysis}

## Notes for Testing Agent

{any_caveats, timing issues, edge cases, or additional context}

```text

## Example (BugHerd Task #1: Validation Result)

```markdown

# Validation Result: BugHerd Task #1

**Status:** Reproduced ✅
**Timestamp:** 2026-10-17T14:30:00Z
**Agent:** Playwright Agent
**Browser Tested:** Chromium (Desktop Chrome)
**Viewport:** 1280x716px

## Evidence (1)

### Screenshot (1)

[Screenshot shows menu with first item cut off]

### Console Output (1)

```text
No errors or warnings in console.

```text

### Network Status (1)

- CSS assets: All loaded (3 files, 45KB)
- JS assets: All loaded (2 files, 120KB)
- Images: All loaded (1 favicon)
- Load time: 1,240ms

### Browser Environment (1)

- **Browser:** Chromium (based on Chrome 120)
- **OS:** Linux (Playwright device profile: Desktop Chrome)
- **Viewport:** 1280x716px
- **Timestamp:** 2026-10-17 14:30:00 UTC

## Observations (1)

✅ **Reproduced:** Navigated to https://thisonetimeonacid.com/ with viewport
1280x716px.

The mobile menu is visible and open (or state indicates mobile nav). The first
menu item ("Read the Draft" or similar) is indeed cut off at the top of the menu
container. The item is not visible without scrolling within the menu.

✅ **Assets:** All CSS and JS assets loaded successfully. No 404 errors.

✅ **Console:** No JavaScript errors or warnings in the browser console.

⚠️ **Note:** This viewport (1280x716) is a laptop screen but appears to trigger
mobile menu behavior. This suggests either:

1. Responsive breakpoint is set higher than expected, OR

1. Mobile menu is hardcoded or triggered by another condition

## Assessment (1)

- **Is this reproducible?** Yes, consistently at 1280x716px viewport
- **Is this a real issue?** Yes, menu items are inaccessible without additional interaction
- **Severity:** High (usability issue; user cannot access menu items)
- **Root cause:** Responsive breakpoint mismatch or mobile menu state not clearing properly at larger viewports

## Notes for Testing Agent (1)

- Only reproduced in desktop Chromium so far
- Need to test in other browsers (Firefox, Safari) to confirm cross-browser impact
- Mobile Chrome (Pixel 5) test still needed
- Reported viewport is 1280x716, which is laptop size but triggered mobile menu

```text

---

## Handoff #3: BugHerd Agent → Testing Agent (Draft Response)

**Purpose:** Present assessment and proposed response for approval before
posting to BugHerd

Select one verdict and use it consistently in the public response, internal
assessment and recommended action:

- **Confirmed:** Describe the reproduced issue and evidence; include only approved investigation or fix plans.
- **Cannot reproduce:** State the tested environment and observations; request missing reproduction details if needed, without confirming a defect or promising an investigation.
- **Duplicate:** Reference the existing issue and its known status; direct follow-up there without promising a separate investigation.
- **By design:** Explain the intended behaviour and its rationale; do not promise a defect investigation or fix.

**Format:**

```markdown

# Draft Response: BugHerd Task #{task_id}

**Status:** Ready for review and posting
**Prepared by:** BugHerd Agent
**Date:** {ISO 8601 date}
**Validation:** [link to Playwright validation result]

## Assessment Summary

{brief*summary*of*what*happened}

**Verdict:** {Confirmed | Cannot reproduce | Duplicate | By design}

## Proposed BugHerd Response

### Public Response (to Requester)

[This will be posted to BugHerd as a comment or status update]

---

Hi {requester_name},

Thanks for reporting this. {summary*of*validation*or*triage_performed}

**{selected*verdict}:** {evidence*based*explanation*matching*the*verdict}

**Next steps:**
{verdict*appropriate*action*approved*by*testing*agent*or*no*further*action}

{follow*up*only*if*agreed} Thanks for helping us improve the site!

---

### Internal Assessment

**Validation:** {validation*result*and_evidence}
**Browsers tested:** {tested_environments}
**Browsers pending:** {pending*environments*or_none}
**Severity:** {evidence*based*severity*or*not_applicable}
**Root cause:** {identified*cause*or*unknown*or*not*applicable}
**Estimated effort:** {estimate*if*approved*or*not_applicable}

## Recommended Action

- [ ] **Accept as bug (Confirmed only):** Add to development backlog with approved priority
- [ ] **Assign to:** [team member or TBD]
- [ ] **Sprint:** Next sprint or current backlog
- [ ] **Defer:** Move to future roadmap (with reason)
- [ ] **Reject:** Not a bug / by design (with reason)

## Approval Needed

This response is **ready for a human to post to BugHerd** once Testing Agent
approves.

```text

## Example (BugHerd Task #1: Draft Response)

```markdown

# Draft Response: BugHerd Task #1 - Responsive Menu

**Status:** Ready for review and posting
**Prepared by:** BugHerd Agent
**Date:** 2026-10-17
**Validation:** [Playwright Agent validation result above]

## Assessment Summary (1)

The reported issue is **confirmed and reproducible**. Testing in Chromium
desktop at the reported viewport (1280x716px) shows the first menu item is
indeed cut off. This is a responsive design issue caused by a breakpoint or menu
state logic that treats 1280px as a mobile viewport.

**Verdict:** Confirmed bug, high priority

## Proposed BugHerd Response (1)

### Public Response (to Requester) (1)

---

Hi Example Reporter,

Thanks for this detailed report! We've validated the issue in our testing
environment.

**Confirmed:** At a 1280px viewport width, the menu isn't rendering
correctly—the first item is cut off and inaccessible. This is definitely a
responsive design flaw we need to fix.

**What we found:** The issue appears to be with our responsive breakpoint
configuration. Our mobile menu is being triggered at a larger viewport than
intended.

**Next steps:** We're adding this to our backlog as a high-priority fix. Our
team will adjust the breakpoint and ensure all menu items remain accessible
across all screen sizes.

We'll follow up here once this is resolved. Thanks for catching this!

---

### Internal Assessment (1)

**Validation:** ✅ Reproduced in Chromium, 1280x716px
**Browsers still testing:** Firefox, Safari, Mobile Chrome
**Issue category:** Responsive design / CSS
**Severity:** High (menu usability blocker)
**Likely fix:** Adjust CSS media query breakpoint or menu toggle logic
**Estimated effort:** 2-3 hours (implement, test, validate)

## Recommended Action (1)

- [x] **Accept as bug:** Add to development backlog
- [x] **Assign to:** Ashley (as backlog item for next sprint)
- [ ] **Sprint:** Backlog (high priority, next sprint)
- [ ] **Defer:** (not recommended—this is a usability blocker)

## Approval Needed (1)

Testing Agent: Please review and approve the response above before a human posts
it to BugHerd.

```text

---

## Workflow Summary

```text
┌─────────────────────────────────────────────────────────┐
│ 1. BugHerd Report Arrives                               │
│    (new task in TOA project)                            │
└────────────────┬────────────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────────────┐
│ 2. BugHerd Agent Parses Report                          │
│    - Extract: title, description, browser, viewport    │
│    - Assess: Can this be validated via Playwright?     │
│    - Prepare: Reproduction steps                       │
└────────────────┬────────────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────────────┐
│ 3. Handoff #1: Send to Playwright Agent                │
│    - Reproduction steps (URL, viewport, interactions)   │
│    - Technical context (browser, OS, screenshot)       │
│    - Validation checklist                              │
└────────────────┬────────────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────────────┐
│ 4. Playwright Agent Tests                              │
│    - Navigate to URL with viewport                     │
│    - Capture screenshot, console, network             │
│    - Return evidence: reproduced? yes/no               │
└────────────────┬────────────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────────────┐
│ 5. Handoff #2: Return Validation Result                │
│    - Status (Reproduced/Not Reproduced/Partial)       │
│    - Evidence (screenshot, console, network)           │
│    - Assessment (real bug? environment-specific?)      │
└────────────────┬────────────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────────────┐
│ 6. BugHerd Agent Prepares Draft Response               │
│    - Compose response (stored locally, not posted)    │
│    - Include assessment and next steps                │
│    - Prepare for human review                         │
└────────────────┬────────────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────────────┐
│ 7. Handoff #3: Send Draft to Testing Agent             │
│    - Response (ready to post if approved)             │
│    - Assessment (real bug, estimate, priority)        │
│    - Validation evidence                              │
└────────────────┬────────────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────────────┐
│ 8. Testing Agent Reviews & Decides                     │
│    - Approve response for posting?                     │
│    - Accept as backlog item?                           │
│    - Assign priority/sprint?                           │
│    - Route to PR Agent if fix is immediate?           │
└────────────────┬────────────────────────────────────────┘
                 │
        ┌────────┴────────┬──────────────┬─────────────┐
        │                 │              │             │
        ▼                 ▼              ▼             ▼
    [POST TO          [BACKLOG]      [SPIKE]        [CLOSE]
    BUGHERD]           (future)     (research)     (duplicate)

```text

---

## Key Principles

1. **Handoffs are structured and unambiguous** – Each handoff includes all context needed for the next agent

1. **No lost information** – If you need something, include it in the handoff

1. **Evidence-driven** – Decisions are based on reproducibility, not speculation

1. **Read-only default** – BugHerd Agent drafts responses locally; Testing Agent approves before posting

1. **Clear ownership** – Each agent owns their phase of the workflow

1. **Traceability** – Each handoff references the previous one and links to BugHerd

---

## Testing & Validation (17 October 2026)

### Handoff Test: BugHerd Task #1

**Objective:** Validate the handoff protocol without posting to BugHerd

**Setup:**

- Playwright Agent available: ✅
- BugHerd Agent ready: ✅
- Testing Agent ready: ✅
- BugHerd project (TOA) accessible: ✅

**Execution:**

1. ✅ **BugHerd Agent** parsed BugHerd Task #1 (Responsive menu issue)

1. ✅ **BugHerd Agent** prepared Handoff #1 (Validation Request)

1. ✅ **Playwright Agent** received request and navigated to site

1. ✅ **Playwright Agent** captured evidence (screenshot, console, network)

1. ✅ **Playwright Agent** returned Handoff #2 (Validation Result)

1. ✅ **BugHerd Agent** received result and composed Handoff #3 (Draft Response)

1. ✅ **Testing Agent** reviewed draft response (not posted)

**Result:** Protocol works as designed. Handoffs are clear, evidence flows
correctly, decisions are evidence-driven.

**Outstanding:** Cross-browser validation (Firefox, Safari, Mobile Chrome)
pending browser availability in agent environment.

---

*Handoff protocol for coordinated bug validation. Established 17 October 2026.*
