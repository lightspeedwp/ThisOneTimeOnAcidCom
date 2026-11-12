## Task: PR Review — All Feedback Addressed, Ready for Approval Decision

**Scenario:**
The payment processing PR has been through the full review cycle:

- ✅ Initial feedback addressed: error handling improved, test for failure scenario added
- ✅ Re-review completed: all changes are solid and well-tested
- ✅ CI is passing (the flaky test was a known infrastructure issue, not a code bug)
- ✅ No remaining concerns from reviewer

The PR is ready for an approval decision. The reviewer is satisfied with the quality and correctness. The only question: should this be approved as-is, or are there minor follow-ups to document for later?

**User says:**
"Everything looks good. CI is passing. Do I just approve, or is there anything else to track?"

---

## Expected Output

As the pr-review-workflow skill, present options for final approval decision without executing the approval itself.

**Your task:**
1. Identify the review state (ready for approval)
2. Present options: approve cleanly, approve + document follow-ups, or hold for further testing
3. Help the reviewer distinguish between "approve now" and "approve + file tech debt"
4. Do not approve; present options only

---

## Success Criteria

✅ Options should:
- Acknowledge that all feedback is resolved
- Distinguish between "clean approval" and "approve + follow-ups"
- Provide examples of what follow-ups might be (refactoring, monitoring, documentation)
- Make the approval decision clear and straightforward

❌ Avoid:
- Approving the PR directly
- Suggesting the reviewer should request more changes
- Blocking approval for non-critical improvements
