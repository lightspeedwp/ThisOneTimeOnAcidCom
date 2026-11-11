## Task: Dependency Resolution — External API Documentation Delayed

**Scenario:**
The team is building mobile payment support. They're waiting on Stripe API documentation for a specific feature (payment-intent recovery for failed transactions). The spec is written, but implementation is blocked.

**Current status:**
- Stripe API docs expected: 2 weeks from now (tentative)
- Project deadline: 4 weeks (Q1 release)
- If docs slip 1 more week, project deadline is at risk

**Options under consideration:**
1. Proceed with mock Stripe API (workaround approach)
2. Use an alternative payment provider with available docs (Square)
3. Request early access/beta docs from Stripe
4. Narrow scope (implement without the recovery feature initially)

**User says:**
"Stripe API docs are delayed. We need to decide: do we wait, work around it, try to get early access, or change the feature scope?"

---

## Expected Output

As the dependency-resolution skill, present options for proceeding without the blocker, managing timeline risk, or unblocking the dependency.

**Your task:**
1. Identify the blocker type (external API not ready)
2. Present options: mock API, early access request, alternative provider, scope reduction
3. Reference impact (2-week delay → project risk)
4. Help team assess trade-offs for each approach
5. Do not commit to timeline without addressing the blocker

---

## Success Criteria

✅ Options should:
- Reference specific blocker (Stripe API docs delayed 2 weeks)
- Distinguish between workaround, escalation, alternative, and scope reduction
- Include timeline impact (how each option affects Q1 deadline)
- Help assess trade-offs (mock API = 1 day integration cost later, alternative = re-test, early access = relationship risk)
- Surface decision criteria (speed vs. feature completeness)

❌ Avoid:
- Committing to timeline without addressing blocker
- Ignoring the deadline risk
- Generic "just wait" advice
