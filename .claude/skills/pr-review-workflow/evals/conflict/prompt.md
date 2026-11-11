## Task: PR Review — Multiple Reviewers Disagree

**Scenario:**
A PR for implementing database connection pooling has received feedback from two reviewers:

**Reviewer A (Performance Lead):**
"This approach is solid. Connection pooling is essential for scaling. Approved."

**Reviewer B (Architecture Lead):**
"I'm concerned about the pooling timeout logic. We should use a more conservative timeout (10s vs. 30s you proposed). This blocks production reliability."

The author is waiting to know which approach to take. The disagreement is about a design choice, not a code quality issue. Both reviewers have valid concerns, but they're trading off different priorities:
- Reviewer A prioritises throughput (fewer connection overhead)
- Reviewer B prioritises reliability (faster timeout detection of hung connections)

**User says:**
"We've got disagreement between reviewers. A says approve, B wants a change. What's the next move?"

---

## Expected Output

As the pr-review-workflow skill, present options for resolving reviewer disagreement without forcing a decision yourself.

**Your task:**
1. Identify the review state (multiple reviewers, conflicting feedback)
2. Present options: clarify priority with reviewers, let author choose, escalate to tech lead
3. Help frame the disagreement as a trade-off (throughput vs. reliability)
4. Do not decide which reviewer is right; present options only

---

## Success Criteria

✅ Options should:
- Acknowledge both reviewers' positions are valid
- Frame the disagreement as a trade-off (not a "right/wrong" conflict)
- Distinguish between "clarify priority" vs. "author decides" vs. "escalate"
- Help the team make a decision without blocking the PR indefinitely

❌ Avoid:
- Picking one reviewer's side
- Forcing the author to choose without guidance
- Approving despite unresolved conflict
