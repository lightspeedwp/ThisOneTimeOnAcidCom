## Task: Dependency Resolution — Infrastructure Not Ready (Staging Environment Down)

**Scenario:**
The team is ready to test mobile payment implementation. But the staging environment is down for maintenance/upgrade and won't be available for 2 weeks.

**Current status:**
- Staging environment: down; ETA to restoration: 2 weeks
- Development environment: available, but not identical to staging
- Local development: possible, but doesn't mirror staging infrastructure
- Testing needs: integration tests with payment provider (requires staging-like environment)
- Timeline: feature needs testing before shipping in 3 weeks

**Options under consideration:**
1. Develop and unit-test locally; plan full integration testing on staging once it's available (delayed testing)
2. Request infrastructure team to prioritise staging restoration (escalate)
3. Rent temporary staging environment from cloud provider (cost vs. time trade-off)
4. Simulate staging environment locally (custom setup, maintenance burden)

**User says:**
"Staging is down for 2 weeks. We need it to test before shipping. Do we wait, escalate, rent temporary environment, or set up a local simulation?"

---

## Expected Output

As the dependency-resolution skill, present options for testing and integration without the staging environment.

**Your task:**
1. Identify the blocker type (infrastructure not ready; staging down)
2. Present options: wait and adjust testing timeline, escalate urgency, rent temporary, local simulation
3. Reference testing requirements and risk implications
4. Help team assess trade-offs (timeline slip, cost, quality/confidence risk)
5. Do not commit to timeline without addressing testing gaps

---

## Success Criteria

✅ Options should:
- Reference specific blocker (staging down, 2-week ETA)
- Distinguish between: wait, escalate, rent temporary, local simulation
- Include cost/effort estimates for each approach
- Highlight testing risk (what happens if we ship without full staging tests?)
- Help identify decision criteria (speed vs. cost vs. quality)

❌ Avoid:
- Suggesting shipping without any staging-like testing
- Underestimating testing risk
- Generic "request infrastructure" advice
- Overstating the cost of alternatives (e.g., temporary environments)
