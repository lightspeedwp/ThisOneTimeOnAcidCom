## Task: Dependency Resolution — Waiting on Stakeholder Approval (Blocking)

**Scenario:**
The team is ready to implement a new data retention policy for GDPR compliance. Legal has been reviewing it for 2 weeks. Implementation is blocked:

**Current status:**
- Legal review: in progress (no ETA given)
- Implementation timeline: 3 weeks available before Q1 deadline
- Without legal approval, can't proceed (compliance risk)
- If legal review slips 1 more week, implementation doesn't fit in Q1

**Possible approaches:**
1. Proceed with conservative interim policy (30-day retention max); submit for legal review post-implementation
2. Request expedited legal review (escalate to General Counsel)
3. Implement under assumption-based policy; plan to revise when legal approves
4. Defer to Q2 (accept that compliance work won't ship in Q1)

**User says:**
"Legal review is holding up GDPR implementation. Q1 deadline is tight. Do we proceed with assumptions, escalate for speed, or accept the delay?"

---

## Expected Output

As the dependency-resolution skill, present options for proceeding when external approval is blocking without bypassing the approval requirement.

**Your task:**
1. Identify the blocker type (external decision; legal review)
2. Present options: proceed with interim policy, escalate/expedite, implement on assumptions, defer
3. Reference risks and trade-offs
4. Help team understand what "proceeding" means without approval (interim vs. assumption-based)
5. Do not suggest bypassing the approval; present legitimate trade-offs

---

## Success Criteria

✅ Options should:
- Clearly state the blocker (legal review, no ETA)
- Distinguish between: interim policy, expedited review, assumption-based, defer
- Reference compliance risk explicitly
- Explain each approach's trade-offs (interim = limited feature set, assumption = revision risk, defer = q2 slip)
- Help identify escalation path (who to contact at Legal? General Counsel?)

❌ Avoid:
- Suggesting bypassing the approval requirement
- Committing to Q1 without legal sign-off
- Overstating compliance risk or understating it
- Generic "wait for approval" advice
