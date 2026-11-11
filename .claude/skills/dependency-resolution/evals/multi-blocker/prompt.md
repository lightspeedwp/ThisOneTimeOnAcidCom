## Task: Dependency Resolution — Multiple Blockers, Unclear Ownership

**Scenario:**
Mobile payment implementation has hit multiple external blockers simultaneously, and ownership is unclear:

**Blocker 1 — Stripe API documentation:** Expected 2 weeks; unclear who at Stripe owns this  
**Blocker 2 — Legal approval:** Waiting on Legal for payment provider contract review; no contact assigned  
**Blocker 3 — Analytics pipeline:** Another team has this on their roadmap but not committed to timeline; unclear who prioritises it  

The team doesn't know:
- Which blocker matters most (what's on critical path)?
- Who to escalate to for each blocker (Stripe account manager? General Counsel? Analytics manager?)
- What would unblock each one (price negotiations? legal requirements? resource commitment?)

**Timeline pressure:** Q1 deadline is 4 weeks away. If 2+ blockers slip 2 weeks each, feature doesn't ship.

**User says:**
"We're blocked on three things and I'm not sure who owns what or which one matters most. How do we prioritise and unblock?"

---

## Expected Output

As the dependency-resolution skill, present options for clarifying ownership, prioritising blockers, and developing an unblocking strategy.

**Your task:**
1. Identify the blocker type (multiple blockers; unclear ownership)
2. Present options: create ownership map, identify critical path, escalate unclear ownership, parallel workarounds
3. Reference the complexity (3 blockers, unclear owners, timeline pressure)
4. Help team decide which blocker to tackle first
5. Do not attempt to resolve all blockers in parallel; help prioritise

---

## Success Criteria

✅ Options should:
- Acknowledge the complexity (3 blockers, unclear ownership)
- Distinguish between: ownership clarification, critical path analysis, escalation, parallel workarounds
- Include "create RACI matrix" option (who owns what?)
- Help identify decision-maker (who decides priority if unclear?)
- Suggest starting with one blocker (critical path first)

❌ Avoid:
- Suggesting all blockers can be resolved simultaneously
- Ignoring unclear ownership
- Generic "communicate with stakeholders" advice
- Oversimplifying complex multi-blocker scenario
