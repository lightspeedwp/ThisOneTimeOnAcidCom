# Agent Configuration — ThisOneTimeOnAcidCom

**Date:** 17 October 2026
**Status:** Agents defined, MCP connections verified, handoff protocol
established

This document describes the agents, their responsibilities, MCP integration, and
coordination workflow for quality assurance and bug validation on the portfolio
site.

## Agents Overview

### Testing Agent (Lead)

- **File:** `.claude/agents/testing-agent.md`
- **Role:** Test strategy planning, coverage guidance, final acceptance
- **Responsibilities:** Plan tests, coordinate with Playwright and BugHerd agents, triage bugs, make go/no-go decisions
- **Tools:** read, write, bash (standard)
- **MCP Integration:** None (orchestration role)

### Playwright Agent (Executor)

- **File:** `.claude/agents/playwright-agent.md`
- **Role:** Browser automation, reproducibility validation, evidence capture
- **Responsibilities:** Run Playwright tests, reproduce BugHerd issues, capture screenshots/console/network, return structured findings
- **Tools:** read, write, bash (standard)
- **MCP Integration:** Playwright MCP server for browser automation
- **Test Infrastructure:** `playwright.config.ts`, `e2e/routing.spec.ts`, `npm run test:e2e`

### BugHerd Agent (Intake & Drafting)

- **File:** `.claude/agents/bugherd-agent.md`
- **Role:** Feedback intake, report parsing, response drafting
- **Responsibilities:** Query BugHerd reports, extract technical context, route to Playwright for validation, prepare response drafts
- **Tools:** read, write, bash (standard)
- **MCP Integration:** BugHerd MCP server (read-only; no writes without explicit approval)
- **Project:** TOA (id: 546928)
- **Operating Rule:** READ-ONLY by default. Always draft responses locally before posting.

## MCP Server Connections

### Playwright MCP Server

**Status:** ✅ Connected and verified
**Session:** plugin:playwright:playwright

Available tools:

- `mcp_*plugin*playwright*playwright**browser*navigate` – Navigate to URL
- `mcp_*plugin*playwright*playwright**browser*take_screenshot` – Capture screenshot
- `mcp_*plugin*playwright*playwright**browser*console_messages` – Get console output
- `mcp_*plugin*playwright*playwright**browser*network_requests` – Get network trace
- `mcp_*plugin*playwright*playwright**browser*click` – Click element
- [and 20+ other browser interaction tools]

**Configuration:**

- Base URL: `http://localhost:3000` (from `playwright.config.ts`)
- Requires local build and test server: `npm run build && node scripts/test-server.js`
- Headless mode (no GUI)
- Trace on first retry, screenshot on failure, video on failure

### BugHerd MCP Server

**Status:** ✅ Connected and verified
**Scopes:** Read active/inactive projects, tasks, attachments, metadata

Available tools (read-only):

- `mcp_*Bugherd**list*projects` – List available projects
- `mcp_*Bugherd**get*project_details` – Get project metadata
- `mcp_*Bugherd**list*project_tasks` – Get tasks for a project
- `mcp_*Bugherd**get*task_details` – Get detailed task info
- `mcp_*Bugherd**list*project_activity` – Get project activity feed

Protected operations (require explicit approval):

- `mcp_*Bugherd**add*comment` – Comment on tasks (NEVER without approval)
- `mcp_*Bugherd**update*task` – Change task status, priority (NEVER without approval)
- `mcp_*Bugherd**create*task` – Create new tasks (NEVER without approval)

## TOA Project Details

- Project ID: `546928`
- Name: "TOA"
- Owner: TOA project maintainer
- Site URL: https://thisonetimeonacid.com
- Active Tasks: 2 (as of 2026-10-17)
- Feedback Status: Accepting feedback

## Test Infrastructure

### Playwright Tests

**Config:** `playwright.config.ts`

- Test directory: `e2e/`
- Base URL: `http://localhost:3000`
- Browsers: Chromium, Firefox, WebKit, Mobile Chrome, Mobile Safari
- Coverage: Routing, SPA fallback, asset loading, responsive design, performance

**Test File:** `e2e/routing.spec.ts`

- 7 working journal routes tested
- Invalid route fallback tested
- Asset loading (CSS and JavaScript 404 checks and content type checks)
- Responsive viewports (mobile, tablet, desktop) tested
- Basic timing checks: home page load under 5 seconds and journal navigation under 2 seconds

**Run Tests:**

```bash
npm run test:e2e            # Run all Playwright tests
npm run test:e2e:debug      # Run with debugging UI
npm run test:e2e:ui         # Run with interactive UI

```text

**Run All Tests:**

```bash
npm run test                # Run: unit + build + e2e
npm run test:build          # Run: build verification only

```text

## Agent Workflow

### Initialization

1. **BugHerd Agent** queries active TOA project tasks

```text
   mcp_*Bugherd**list*project*tasks(project*id=546928, status=backlog, limit=10)

```text

1. **BugHerd Agent** parses each task:

   - Title and description
   - Browser environment (version, OS, viewport)
   - Screenshot and CSS selectors
   - Requester and assignment status

1. **BugHerd Agent** assesses: "Can Playwright validate this?"

   - ✅ Visual/interactive issues → Route to Playwright
   - ⚠️ Requires authentication → Cannot validate automatically
   - ⚠️ Environment-specific → May need different viewport/browser
   - ❌ Already fixed / duplicate → Mark as such

### Validation Request (BugHerd Agent → Playwright Agent)

**Template:**

```text

# Validation Request: BugHerd Task #{id}

**Report:** {title}
**URL:** {target_url}
**Browser:** {browser} {version}, {os} {version}, {viewport}px
**Steps:** {reproduction_steps}

```text

### Validation & Evidence (Playwright Agent)

**Actions:**

1. Navigate to URL with specified viewport

1. Execute reproduction steps (click, scroll, type, wait)

1. Capture screenshot of the issue

1. Check console for errors

1. Verify asset loading (CSS, JS, images)

1. Record browser environment details

1. Return structured evidence

**Template:**

```text

# Validation Result: BugHerd Task #{id}

**Status:** Reproduced | Not Reproduced | Partial | Blocked
**Evidence:** [screenshot, console output, network trace]
**Browser Tested:** Chromium, 1280x716px
**Assessment:** [root cause, severity, next steps]

```text

### Response Drafting (BugHerd Agent)

**Actions:**

1. Receive Playwright validation result

1. Assess: Is this a real bug? Environment-specific? Already fixed?

1. Compose response for reporter

1. Store draft locally (in `reports/bugherd/{task_id}/`)

1. Prepare summary for Testing Agent

**Template:**

```text

# Draft Response: BugHerd Task #{id}

**Verdict:** Confirmed | Cannot Reproduce | Duplicate | By Design
**Assessment:** [validation result + testing agent decision]
**Response:** [message to send to reporter]
**Action:** Backlog | Spike | Fix Now | Close

```text

### Final Decision (Testing Agent)

**Review & Decide:**

1. Does the response accurately reflect validation?

1. Should we fix this now or backlog it?

1. Does the priority/severity match the issue?

1. Should we close, defer, or accept?

**Options:**

- ✅ **Approve for human posting** – A human posts the approved response to BugHerd
- 🔄 **Request Changes** – Ask BugHerd Agent to revise
- 📋 **Backlog** – Add to development backlog
- 🔬 **Spike** – Schedule research/investigation
- ⏸️ **Hold** – Wait for more information
- ❌ **Reject** – Not a bug, by design, or duplicate

## Handoff Points

| From | To | Format | Status |
|------|-----|--------|--------|
| BugHerd | Playwright | Validation Request (markdown) | ✅ Established |
| Playwright | BugHerd Agent | Validation Result (markdown + screenshot) | ✅ Established |
| BugHerd Agent | Testing Agent | Draft Response (markdown) | ✅ Established |
| Testing Agent | BugHerd Agent | Approval (meta) | ✅ Ready |
| Testing Agent | PR Agent | Fix Request (if approved) | ⏳ Future |

## Security & Boundaries

### Read-Only Operations (Safe)

✅ **Allowed without approval:**

- List BugHerd projects
- Get project details
- Read task descriptions, screenshots, metadata
- Search/filter tasks
- Get task history

### Write Operations (Requires Approval)

❌ **Never without explicit request:**

- Comment on BugHerd tasks
- Change task status (backlog → in progress → done)
- Update task priority or assignment
- Create new tasks
- Delete or archive tasks
- Upload attachments

**Rule:** Always draft locally in `reports/bugherd/{task_id}/draft-response.md`
for Testing Agent review. A human posts the approved response to BugHerd.

## Environment Setup

### Prerequisites

- Node.js 18+ (or check `npm run build` output)
- npm 10+ (verified working with npm 11.19.0)
- Playwright browsers: `npm install` (in agent environment, Playwright CLI is pre-installed with `/opt/pw-browsers`)

### Build & Serve

```bash

# Install dependencies

npm install

# Build production site

npm run build

# Start test server (for Playwright tests)

node scripts/test-server.js

# In another terminal, run tests

npm run test:e2e

```text

### Test Browsers (Agent Environment)

**Pre-installed browsers:** Chromium at `/opt/pw-browsers/chromium` (verified)
**Status:** Ready for Playwright testing

**Playwright config:**

- `PLAYWRIGHT*BROWSERS*PATH=/opt/pw-browsers`
- `PLAYWRIGHT*SKIP*BROWSER_DOWNLOAD=1` (do not re-download)

## Unresolved Issues & Future Work

### Known Limitations

1. **Cross-browser validation pending**

   - Currently can test Chromium (desktop)
   - Need to test: Firefox, Safari, Mobile Chrome
   - Browsers available in Playwright but not yet validated in agent environment

1. **Authentication flows**

   - BugHerd Agent cannot test password-protected pages
   - Playwright Agent cannot handle credential entry

1. **Form submissions**

   - Playwright Agent operates read-only
   - Cannot submit feedback forms or test form validation

1. **Performance profiling**

   - Basic load time measurements work
   - Advanced profiling tools (Lighthouse) not yet integrated

### Future Enhancements

1. **Accessibility Testing**

   - Keyboard navigation validation
   - Screen reader compatibility
   - WCAG compliance checks

1. **Visual Regression Testing**

   - Compare against baseline screenshots
   - Detect unintended layout changes

1. **Automated Fixes**

   - PR Agent creates fix PRs for confirmed bugs
   - Auto-post BugHerd responses after fix is merged

1. **Analytics Integration**

   - Link BugHerd reports to user behavior patterns
   - Prioritize by user impact

---

## Document References

- **Agent Definitions:** `.claude/agents/{testing,playwright,bugherd}-agent.md`
- **Handoff Protocol:** `docs/AgentHandoffProtocol.md` (this directory)
- **Test Configuration:** `playwright.config.ts`, `e2e/routing.spec.ts`
- **Repository Guidelines:** `AGENTS.md`, `guidelines/`

---

*Agent configuration and MCP integration for quality assurance. Last updated 17
October 2026.*
