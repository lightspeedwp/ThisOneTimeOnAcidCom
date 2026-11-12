## Task: PR Review — Author Has Revised, Ready for Re-Review

**Scenario:**
Following the feedback from the previous eval, the author has pushed new commits addressing both points:

1. ✅ Added retry logic with exponential backoff for Stripe/PayPal timeout scenarios
2. ✅ Added comprehensive test for failed transaction (asserts retry count, error propagation, etc.)

The PR now shows "Changes pushed" and is waiting for reviewer to re-check. The reviewer (you) is ready to look at the changes.

**User says:**
"The author has revised. Should I re-review, or is there something else to check first?"

---

## Expected Output

As the pr-review-workflow skill, present options for the re-review stage without executing approval or requesting additional changes.

**Your task:**
1. Identify the review state (revision ready, awaiting re-review)
2. Present options: approve if satisfied, request minor follow-ups, or ask clarifying questions
3. Reference the feedback that was addressed so decisions are grounded
4. Do not approve or merge; present options only

---

## Success Criteria

✅ Options should:
- Reference both feedback points that were addressed (error handling, test)
- Distinguish between "full approval" vs. "minor changes" vs. "discussion"
- Acknowledge that revisions were made (positive framing)
- Provide clear decision criteria (what would trigger approval vs. further revision)

❌ Avoid:
- Approving the PR directly
- Suggesting the reviewer make code changes
- Generic "looks good" without specific reference to feedback
