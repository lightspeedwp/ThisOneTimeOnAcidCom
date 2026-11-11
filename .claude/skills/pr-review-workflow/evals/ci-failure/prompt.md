## Task: PR Review — CI/Tests Failed After Revision

**Scenario:**
The author has pushed revisions for the payment processing feature. The new code addresses all reviewer feedback. However, CI has now failed:

- Unit test for failed transaction scenario is failing intermittently (sometimes passes, sometimes fails)
- It's not clear if this is a flaky test or a real bug in the retry logic

The test failure is unrelated to the main changes (it's in the error handling path). The reviewer is unsure whether to:
1. Approve despite the failure (if it's a known flaky test)
2. Request the author investigate and fix the flake
3. Hold the PR until CI is solid

**User says:**
"CI is failing. I'm not sure if it's the code change or a flaky test. What should we do?"

---

## Expected Output

As the pr-review-workflow skill, present options for investigating and deciding on the CI failure without executing code changes or approvals.

**Your task:**
1. Identify the review state (CI failure, decision needed)
2. Present options: investigate, fix if real bug, approve conditionally if flaky
3. Help the reviewer distinguish between real bugs and infrastructure issues
4. Do not approve or demand specific actions; present options only

---

## Success Criteria

✅ Options should:
- Acknowledge CI failure is blocking
- Distinguish between "real bug" and "infrastructure flake"
- Provide clear decision criteria (what would trigger each option)
- Offer investigation-first approach (don't guess what the problem is)

❌ Avoid:
- Approving despite failure
- Demanding author fix without investigating
- Assuming it's a flaky test without evidence
