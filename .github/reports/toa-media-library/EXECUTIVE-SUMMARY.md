# TOA Media Library Strategy – Executive Summary

**Date:** 17 October 2026  
**Status:** Investigation complete; no modifications made to repository or Figma

---

## The Problem

The TOA project has **56 unique Figma asset references** (128 total imports) but no asset files exist in the repository. All images render as placeholder SVGs in development and production.

| Current State | Finding |
|---|---|
| Asset count | 56 unique `figma:asset/` IDs (**not** 75 as previously claimed) |
| Actual files | `src/assets/` directory does not exist |
| Current output | Placeholder SVGs + console warnings |
| Website impact | Users see grey placeholder images instead of Ash's makeup artistry portfolio |
| Book publishing | No high-resolution exports available for print |

---

## The Solution (Recommended)

A **phased media-library strategy** with:

1. **Figma Recovery Pilot** – Extract assets from Figma Make, identify export gaps, sample 10–15 assets
2. **Catalogue Design** – Define standardized JSON structure for asset metadata (source, usage, credits, print-readiness)
3. **Storage Selection** – Cloudinary (recommended: UX + automation + cost-effective)
4. **Migration Workflow** – Import assets, populate catalogue, update code references, validate
5. **Validation & Ops** – Test, document rollback, hand off to production team

**Timeline:** 2–3 weeks (distributed across 6 existing Linear child issues)

---

## Key Decisions Required

| Item | Recommendation | Status |
|---|---|---|
| **Storage Provider** | Cloudinary | 🔴 Awaiting approval |
| **Catalogue Format** | Version-controlled JSON in repo | 🔴 Awaiting approval |
| **Book Exports** | Automated via API before publishing | 🟡 Tentative |
| **Figma Recovery** | Use existing `/figma-design-to-code` skill (no custom agent needed) | 🟡 Tentative |
| **Asset Credits** | Visible in gallery + metadata catalogue | 🟡 Tentative |

---

## Deliverables from This Audit

✅ **Verified asset count:** 56 unique, 128 total references  
✅ **Asset inventory:** Complete list with categories and usage  
✅ **Current architecture:** Vite bundler pipeline, fallback behavior, integration points  
✅ **Catalogue schema:** TypeScript interface with example records  
✅ **Storage comparison:** Cloudinary, GitHub, AWS S3 (pros/cons/costs)  
✅ **Migration plan:** Phased workflow, reference mapping, validation checklist  
✅ **Skill assessment:** Existing Figma skills sufficient; no custom agent required  
✅ **Risk analysis:** Blockers, mitigations, approval checkpoints  

---

## Cost Estimate

| Service | Monthly | Annual | Notes |
|---|---|---|---|
| **Cloudinary Pro** | $99 | $1,188 | Recommended; covers ~1.5M API calls/mo |
| **GitHub LFS** (if used) | $0–5 | $0–60 | Alternative; free for <1GB/mo |
| **Netlify CDN** | Included | Included | Already part of build pipeline |
| **Book Publishing (Lulu/KDP)** | Variable | TBD | Per-book cost; asset management included |

**Total:** ~$100/month for storage + CDN (Cloudinary route)

---

## Next Steps

1. **Approve decisions** (storage, catalogue, credits, export workflow)
2. **Kick off TOA-280** (Figma extraction pilot)
3. **Prepare TOA-8** (asset recovery and visual validation)
4. **Design TOA-277** (finalize catalogue schema)
5. **Plan TOA-276** (confirm provider contract and SLA)
6. **Build TOA-278** (migration and reference mapping)
7. **Execute TOA-279** (validation and handoff)

---

## Key Findings

**Critical Discovery:** Original audit claimed 75 asset references; verified count is **56** (19 fewer). Likely due to Figma Make deduplication or repository refactoring since last audit. The lower count actually makes migration faster.

**Asset Accessibility:** Figma Make export capability is unverified. Pilot phase required to determine which assets can be auto-exported vs. manually exported.

**No Custom Tools Needed:** Existing Figma skills (`/figma-design-to-code`, `/figma-use`) sufficient for asset recovery. No custom agent or skill required unless updates become recurring (>3/quarter).

**Backward Compatibility:** Existing `figma:asset/` import statements remain protected and unchanged until verified replacements ready. Staged rollout prevents breakage.

---

## Full Documentation

See **MEDIA-LIBRARY-STRATEGY-REPORT.md** for complete technical details:
- Architecture deep-dive
- Catalogue schema specification
- Storage provider comparison (detailed)
- Migration workflow and rollback procedures
- Validation checklist
- Risk matrix and mitigations
- Approval checkpoints

---

**Report prepared by:** Claude (AI audit)  
**Scope:** Read-only investigation; no code or Figma modifications  
**Access:** Audit findings available in `/scratchpad/toa-media-audit/`
