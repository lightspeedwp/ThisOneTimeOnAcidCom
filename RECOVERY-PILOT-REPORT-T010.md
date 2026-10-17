# T010: Asset Selection & Staging — Phase 1b Recovery Pilot

**Status:** ✅ Complete  
**Executed:** 2026-10-17  
**Acceptance Criteria:** All met

---

## Selection Process

**Objective:** Select 10–15 pilot assets from the 56-asset catalogue representing all major portfolio categories and metadata patterns.

**Strategy:** Tier-based sampling with three priority levels:

### Tier 1: High Priority (Must Include) — 6 Assets

**Homepage Hero Images** (3 assets)
- Critical path content, highest visibility
- Complete metadata (alt text, captions in code)
- Represents home page context

| Asset | FigmaId | Alt Text | Priority |
|-------|---------|----------|----------|
| toa-heroImage1 | `f4a28f747d49fc9d37311b17f513b62e2b95a73e` | Close-up artistic eye makeup with vibrant purple stripe… | CRITICAL |
| toa-heroImage2 | `378acbf4a7518ca6c40b44540bd7a121a91375fe` | Joyful festival participant with rainbow heart… | CRITICAL |
| toa-heroImage3 | `e82a7d901c5a28bf9313c7535228e647eaf06b75` | Portrait of person with blonde hair and colorful face paint… | CRITICAL |

**Jungle Festival Series** (3 assets)
- Largest single portfolio category (3 images)
- Partial metadata (alt text only, no captions)
- Represents mapped portfolio series extraction

| Asset | FigmaId | Alt Text | Priority |
|-------|---------|----------|----------|
| toa-jungleImage1 | `7afa71c7ec4457a1c1983db257703a6c92a9cce7` | Jungle festival makeup artwork | HIGH |
| toa-jungleImage2 | `1cd08d3825ac7cc423a4672f8ed279139fc99d0a` | Ash Shaw artwork - jungle festival | HIGH |
| toa-jungleImage3 | `3eb83eb2d4eb493b80283c1b75770d8893b2fc6a` | Ash Shaw artwork - jungle festival | HIGH |

---

### Tier 2: Coverage Diversity (4 assets)

**Rationale:** Validate extraction methodology across different portfolio series, metadata patterns, and asset complexities.

| Asset | Category | FigmaId | Priority | Reason |
|-------|----------|---------|----------|--------|
| toa-asset-0 | Origin Festival 2025 | `04aa88bd7a81e3f14ceb68f980492bf374b041db` | HIGH | Different festival series, validates multi-festival extraction |
| toa-asset-5 | Nail Art Series | `1ec0ba217cad06e2cff662a25a050b0401d1092a` | HIGH | Design system category, different extraction pattern |
| toa-asset-7 | Reiserfieber (Swiss) | `280168cf45339af581c4065d1f6728ea2de6ff02` | MEDIUM | International content, metadata language patterns |
| toa-asset-38 | Nation of Gondwana | `bb2d15f1b5450668f0a032ad3765e13d8db4fdd2` | MEDIUM | Small category, edge case validation |

---

### Tier 3: Optional (2 assets)

**Rationale:** Test recovery methodology for unmapped assets without existing code metadata.

| Asset | Category | FigmaId | Priority | Reason |
|-------|----------|---------|----------|--------|
| toa-asset-42 | Shankra Festival (Swiss) | `d35493e2be08017199b3d1523d516a996ec97a5d` | LOW | Unmapped asset, validates metadata discovery |
| toa-asset-51 | Thailand Series | `e7ee10c85c112ab4acfc9e54087974a5faae5966` | LOW | Geographic diversity, international content handling |

---

## Pilot Selection Summary

**Total Assets Selected:** 12 (6 Tier 1 + 4 Tier 2 + 2 Tier 3)

**Portfolio Categories Covered:** 8
- Homepage Hero
- Festival Portfolio - Jungle Festival Koh Phangan
- Festival Portfolio - Origin Festival 2025
- Portfolio - Nail Art Series
- Festival Portfolio - Reiserfieber (Swiss)
- Festival Portfolio - Nation of Gondwana
- Festival Portfolio - Shankra Festival (Swiss)
- Portfolio - Thailand Series

**Metadata Distribution:**
- Complete metadata: 3 assets (hero images)
- Partial metadata: 3 assets (jungle festival)
- Framework only: 6 assets (portfolio series)

**Expected Recovery Rate:** 80–90% (all 12 are mapped in codebase and findable in Figma Make)

**Selection Artifacts:**
- `recovered-assets/pilot-selection.json` — Structured selection list with full details
- All figmaAssetIds validated against FULL-CATALOGUE.json

---

## Acceptance Criteria Checklist

- [x] Reviewed FULL-CATALOGUE.json and categorized all 56 assets
- [x] Selected 10–15 pilot assets using priority tier criteria (selected 12)
- [x] Documented selection rationale (category coverage, mapped/unmapped mix)
- [x] Created list with figmaAssetId for each selected asset
- [x] Confirmed ≥3 different portfolio categories represented (8 categories covered)
- [x] Included all 3 hero images (high priority) ✅
- [x] Documented in recovery report (this file)

---

## Next Steps

→ **T011:** Validate Figma Make project access and API authentication
