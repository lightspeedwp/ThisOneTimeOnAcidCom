# PR Template Fallback Test

Testing PR template behavior for uncommon but valid branch prefix (proto/).

This PR verifies routing behavior for branch prefixes that are:
- Valid per branch validation rules
- Not in the 'standard' set (feat, fix, docs, test)
- Expected to fall back to default template

Expected: Falls back to pr_default.md with type:maintenance label
