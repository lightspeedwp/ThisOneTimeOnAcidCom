## Task: Dependency Resolution — Another Team's Deliverable Delayed

**Scenario:**
The mobile payment implementation depends on the analytics team's data pipeline. The pipeline will provide real-time transaction metrics (success rate, failure patterns, fraud signals).

**Current status:**
- Analytics pipeline ETA: 3 weeks (was 2 weeks; slipped)
- Mobile payment implementation timeline: 2 weeks available before feature ships
- Current pipeline status: 50% complete (analytics team is now focused on other priorities)
- If pipeline slips another week, mobile payment ship date is at risk

**Options under consideration:**
1. Request interim/80% version from analytics (something they can ship Monday)
2. Implement with mock analytics data (swap real data later)
3. Run implementation in parallel (implement everything except analytics integration)
4. Escalate to leadership (if analytics can't deliver in time, what's the mitigation?)

**User says:**
"Analytics pipeline won't be ready when we need it. We can implement without it, but we need their data for monitoring. Should we ask for a partial version, implement with mocks, or escalate?"

---

## Expected Output

As the dependency-resolution skill, present options for proceeding when another team's work is blocking without creating inter-team conflict.

**Your task:**
1. Identify the blocker type (team dependency; analytics pipeline)
2. Present options: negotiate interim version, mock data, parallel work, escalate
3. Reference the slip (ETA changed from 2 weeks to 3 weeks) and its impact
4. Help team assess which approach builds goodwill vs. escalates tension
5. Do not blame the analytics team; present collaborative options

---

## Success Criteria

✅ Options should:
- Reference specific blocker (analytics pipeline, 3-week ETA)
- Distinguish between: negotiate interim, mock data, parallel work, escalate
- Acknowledge inter-team dynamics (don't create conflict)
- Include integration cost estimates (1 day to swap real data later)
- Help identify who to negotiate with (analytics tech lead, manager)

❌ Avoid:
- Blaming the analytics team
- Demanding an impossible timeline
- Escalating without trying negotiation first
- Generic "ask them nicely" advice
