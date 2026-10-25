# Unmatched Prefix Test

Testing PR template fallback for unmatched branch prefix.

This PR verifies that branch names not matching recognized patterns (feat/, fix/, docs/, test/, etc.) correctly fall back to the default PR template and receive the type:maintenance label.

Expected behavior:
- Template: pr_default.md
- Label: type:maintenance
