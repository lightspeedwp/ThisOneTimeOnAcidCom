## Task: PR Review — Initial Feedback Received

**Scenario:**
A pull request (#342) has been submitted for a payment processing feature. The reviewer has submitted feedback with two requested changes:

1. "Error handling needs to catch payment provider failures (Stripe, PayPal timeout scenarios). Add retry logic with exponential backoff."
2. "Add test for failed transaction scenario. Currently only tests the happy path."

The PR is marked "changes requested." The author hasn't responded yet. The code is 80% correct but these two gaps are critical for production.

**User says:**
"OK, this PR has feedback. What should we do next?"

---

## Expected Output

As the pr-review-workflow skill, present actionable next steps for this review stage without modifying code or approving.

**Your task:**
1. Identify the review state (initial feedback received)
2. Present up to 3 options for how to proceed
3. Include context from the feedback so options are grounded in what was requested
4. Do not merge, approve, or request changes; present options only
5. Format as JSON (clickable controls) or numbered list (Claude.ai)

---

## Success Criteria

✅ Options should:
- Reference the specific feedback (error handling, testing)
- Distinguish between "author revises" vs. "discussion continues" vs. "escalate"
- Be self-contained (reader understands the decision without re-reading PR comments)
- Avoid suggesting code changes (this is a decision-making skill, not an implementation skill)

❌ Avoid:
- Merging or approving the PR
- Changing the code yourself
- Generic "keep working" advice
