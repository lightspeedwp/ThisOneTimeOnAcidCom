# Parallel Work: Renovate Configuration Options (A, B, C)

**Status:** Preparation — awaiting governance decision  
**Purpose:** Three ready-to-implement Renovate configs for each governance model  
**Blocks:** Implementation of Phase 1 (Renovate migration)

---

## Overview

Each option below is a complete, ready-to-implement Renovate configuration corresponding to one governance model. Once Ash decides which model to use, the matching config can be deployed immediately.

**All options preserve current Dependabot behavior:**
- Target branch: `develop`
- npm + GitHub Actions updates
- Minor/patch grouped; major separate
- Labels: `area:dependencies`, `area:ci`
- Security updates prioritized
- 10 open PRs per ecosystem

---

## Option A: Centralized (Recommended)

**Model:** Canonical `renovate.json` in `lightspeedwp/.github`, ThisOneTimeOnAcidCom extends/overrides.

**Governance:**
- Org-wide policy lives in `lightspeedwp/.github/renovate.json`
- ThisOneTimeOnAcidCom adds repo-specific settings via `extends: ["github>lightspeedwp/.github:renovate"]`
- Changes to org policy cascade automatically

**ThisOneTimeOnAcidCom `.github/renovate.json`:**

```json
{
  "extends": [
    "github>lightspeedwp/.github:renovate",
    "config:base"
  ],
  "labels": [
    "area:dependencies",
    "area:ci"
  ],
  "npm": {
    "postUpdateOptions": [
      "npmDedupe"
    ]
  }
}
```

**lightspeedwp/.github `renovate.json` (canonical):**

```json
{
  "$schema": "https://docs.renovatebot.com/renovate-schema.json",
  "extends": [
    "config:base"
  ],
  "baseBranches": ["develop"],
  "schedule": [
    "before 3am on Monday"
  ],
  "timezone": "Africa/Johannesburg",
  "packageRules": [
    {
      "matchUpdateTypes": ["minor", "patch"],
      "groupName": "dependencies (minor/patch)",
      "groupSlug": "minor-patch",
      "extends": ["schedule:weekly"]
    },
    {
      "matchUpdateTypes": ["major"],
      "groupName": "dependencies (major)",
      "groupSlug": "major",
      "extends": ["schedule:weekly"]
    },
    {
      "matchManagers": ["github-actions"],
      "matchUpdateTypes": ["minor", "patch"],
      "groupName": "CI/CD (minor/patch)",
      "groupSlug": "ci-minor-patch",
      "extends": ["schedule:weekly"]
    },
    {
      "matchManagers": ["github-actions"],
      "matchUpdateTypes": ["major"],
      "groupName": "CI/CD (major)",
      "groupSlug": "ci-major",
      "extends": ["schedule:weekly"]
    }
  ],
  "prConcurrentLimit": 10,
  "semanticCommits": "enabled",
  "semanticCommitType": "deps",
  "commitMessagePrefix": "chore(deps):"
}
```

**Pros:**
- Single source of truth for org-wide policy
- Automatic policy updates cascade
- Aligns with existing governance pattern (labels, issue-types, templates all centralized)
- Flexible: ThisOneTimeOnAcidCom can override specific settings

**Cons:**
- Requires changes to `lightspeedwp/.github` (org governance decision)
- Cross-repo coordination needed for policy changes

---

## Option B: Local Only

**Model:** `.github/renovate.json` lives only in ThisOneTimeOnAcidCom, no central config.

**ThisOneTimeOnAcidCom `.github/renovate.json`:**

```json
{
  "$schema": "https://docs.renovatebot.com/renovate-schema.json",
  "extends": [
    "config:base"
  ],
  "baseBranches": ["develop"],
  "schedule": [
    "before 3am on Monday"
  ],
  "timezone": "Africa/Johannesburg",
  "labels": [
    "area:dependencies",
    "area:ci"
  ],
  "prConcurrentLimit": 10,
  "semanticCommits": "enabled",
  "semanticCommitType": "deps",
  "commitMessagePrefix": "chore(deps):",
  "packageRules": [
    {
      "matchDatasources": ["npm"],
      "matchUpdateTypes": ["minor", "patch"],
      "groupName": "dependencies (minor/patch)",
      "groupSlug": "minor-patch",
      "minimumReleaseAge": "3 days",
      "extends": ["schedule:weekly"]
    },
    {
      "matchDatasources": ["npm"],
      "matchUpdateTypes": ["major"],
      "groupName": "dependencies (major)",
      "groupSlug": "major",
      "minimumReleaseAge": "7 days",
      "extends": ["schedule:weekly"]
    },
    {
      "matchManagers": ["github-actions"],
      "matchUpdateTypes": ["minor", "patch"],
      "groupName": "CI/CD (minor/patch)",
      "groupSlug": "ci-minor-patch",
      "extends": ["schedule:weekly"]
    },
    {
      "matchManagers": ["github-actions"],
      "matchUpdateTypes": ["major"],
      "groupName": "CI/CD (major)",
      "groupSlug": "ci-major",
      "extends": ["schedule:weekly"]
    }
  ],
  "npm": {
    "enabled": true,
    "postUpdateOptions": [
      "npmDedupe"
    ]
  },
  "github-actions": {
    "enabled": true,
    "grouping": {
      "default": true,
      "minor": {
        "groupName": "CI/CD (minor/patch)",
        "groupSlug": "ci-minor-patch",
        "updateTypes": ["minor", "patch"]
      },
      "major": {
        "groupName": "CI/CD (major)",
        "groupSlug": "ci-major"
      }
    }
  }
}
```

**Pros:**
- Immediate implementation; no coordination with org governance
- Complete control over ThisOneTimeOnAcidCom policy
- Fast iteration if policy needs change

**Cons:**
- Diverges from established governance pattern (labels, templates centralized)
- No org-wide standardization; each repo maintains its own config
- Policy duplication across repos

---

## Option C: Hybrid (Layered)

**Model:** Org policy presets in `lightspeedwp/.github`; ThisOneTimeOnAcidCom config uses presets as building blocks.

**lightspeedwp/.github `renovate-presets.json`:**

```json
{
  "renovate": {
    "extends": [
      "config:base"
    ],
    "semanticCommits": "enabled",
    "semanticCommitType": "deps",
    "commitMessagePrefix": "chore(deps):"
  },
  "schedule-weekly-sast": {
    "schedule": [
      "before 3am on Monday"
    ],
    "timezone": "Africa/Johannesburg"
  },
  "npm-grouping": {
    "packageRules": [
      {
        "matchDatasources": ["npm"],
        "matchUpdateTypes": ["minor", "patch"],
        "groupName": "dependencies (minor/patch)",
        "groupSlug": "minor-patch",
        "minimumReleaseAge": "3 days",
        "postUpdateOptions": ["npmDedupe"]
      },
      {
        "matchDatasources": ["npm"],
        "matchUpdateTypes": ["major"],
        "groupName": "dependencies (major)",
        "groupSlug": "major",
        "minimumReleaseAge": "7 days",
        "postUpdateOptions": ["npmDedupe"]
      }
    ]
  },
  "ci-grouping": {
    "packageRules": [
      {
        "matchManagers": ["github-actions"],
        "matchUpdateTypes": ["minor", "patch"],
        "groupName": "CI/CD (minor/patch)",
        "groupSlug": "ci-minor-patch"
      },
      {
        "matchManagers": ["github-actions"],
        "matchUpdateTypes": ["major"],
        "groupName": "CI/CD (major)",
        "groupSlug": "ci-major"
      }
    ]
  }
}
```

**ThisOneTimeOnAcidCom `.github/renovate.json`:**

```json
{
  "extends": [
    "github>lightspeedwp/.github:renovate-presets/renovate",
    "github>lightspeedwp/.github:renovate-presets/schedule-weekly-sast",
    "github>lightspeedwp/.github:renovate-presets/npm-grouping",
    "github>lightspeedwp/.github:renovate-presets/ci-grouping"
  ],
  "baseBranches": ["develop"],
  "prConcurrentLimit": 10,
  "labels": [
    "area:dependencies",
    "area:ci"
  ]
}
```

**⚠️ BLOCKING ISSUE:** The preset paths (`renovate-presets/renovate`, etc.) must be published in `lightspeedwp/.github` repository before this configuration can be deployed. As of now, the upstream repo has no root `renovate.json` or preset directory. **Action Required:** Either (1) publish the presets to `lightspeedwp/.github` on the develop branch, or (2) change the preset reference to an approved preset that is already available upstream. See Part 4 (Blocking: Upstream Preset Availability) for details.

**Pros:**
- Modular: Org presets can be mixed/matched per repo
- Flexible: Each repo composes its own config from org building blocks
- Maintainable: Changes to presets propagate; repos override selectively
- Balances centralization with flexibility

**Cons:**
- More complex setup than A or B
- Requires initial coordination to establish presets
- Intermediate option (not as clean as A's single source, not as simple as B's fully local)

---

## Decision Matrix

| Factor | Option A | Option B | Option C |
| -------- | ---------- | ---------- | ---------- |
| **Setup complexity** | Medium | Low | High |
| **Org alignment** | ✅ Best | ❌ Diverges | ✅ Good |
| **Flexibility** | ✅ Good | ✅ Best | ✅ Good |
| **Maintenance burden** | Low | Medium | Medium |
| **Policy standardization** | ✅ Enforced | ❌ None | ✅ Partial |
| **Implementation speed** | Medium | Fast | Slow |

---

## Recommendation

**Option A (Centralized)** is recommended because:
1. Aligns with existing governance pattern (labels, templates already centralized)
2. Single source of truth reduces drift
3. Policy updates cascade automatically
4. Balances org-wide standardization with repo flexibility via `extends`

**However:** If org governance is unavailable or ThisOneTimeOnAcidCom needs autonomy, **Option B (Local Only)** is fastest to implement.

---

## Next Steps

1. **Ash decides:** Which governance model? (A, B, or C)
2. **Implementation:** Copy matching config and enable Renovate bot
3. **Validation:** Test run with limited schedule (see assessment Part 2: Verification Gates)
4. **Monitoring:** One-week observation before full rollout

---

**Assessment Reference:** See `.github/specs/toa-451-renovate-vitest-migration-assessment/assessment.md` Part 5 for full governance context.
