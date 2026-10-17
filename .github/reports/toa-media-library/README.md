# TOA Media Library Strategy – Audit Deliverables

**Investigation Date:** 17 October 2026  
**Project:** This One Time on Acid (`lightspeedwp/ThisOneTimeOnAcidCom`)  
**Related Epic:** TOA-269  
**Scope:** Read-only investigation; no repository or Figma modifications  

---

## Quick Navigation

### For Decision-Makers
**Start here:** [`EXECUTIVE-SUMMARY.md`](./EXECUTIVE-SUMMARY.md)  
One-page overview of the problem, solution, and decisions required. ~5 min read.

### For Implementation Teams
**Start here:** [`MEDIA-LIBRARY-STRATEGY-REPORT.md`](./MEDIA-LIBRARY-STRATEGY-REPORT.md)  
Complete technical specification covering architecture, assets, catalogue schema, migration workflow, validation procedures, and risk mitigation. ~20 min read; detailed reference throughout implementation.

### For Storage & Cost Analysis
**Start here:** [`STORAGE-PROVIDER-COMPARISON.md`](./STORAGE-PROVIDER-COMPARISON.md)  
Detailed comparison of Cloudinary, GitHub, and AWS S3 with cost models and setup estimates. Includes recommendation and implementation checklist.

---

## Deliverables Included

### 1. EXECUTIVE-SUMMARY.md (113 lines)
**Purpose:** High-level overview for decision-makers  
**Contents:**
- Problem statement (56 assets, no files, placeholder SVGs)
- Recommended solution (phased media-library strategy)
- Key decisions required (storage, catalogue, exports, credits)
- Deliverables checklist
- Cost estimate ($100/mo for Cloudinary)
- Next steps

**Time to read:** 5 minutes

---

### 2. MEDIA-LIBRARY-STRATEGY-REPORT.md (665 lines)
**Purpose:** Complete technical specification  
**Contents:**
- Section 1: Current Architecture and Asset Resolution (tech stack, Vite plugin, current handling)
- Section 2: Asset Inventory & Verification (56 unique verified, 128 total references, category breakdown)
- Section 3: Figma Integration Assessment (Make project details, unknown capabilities, skill inventory)
- Section 4: Proposed Catalogue Schema (TypeScript interface with example records)
- Section 5: Storage & Publishing Strategy (Cloudinary + version-controlled catalogue)
- Section 6: Migration & Validation Plan (4-phase workflow mapped to child issues)
- Section 7: Skill & Agent Recommendation (existing skills sufficient, no custom tool needed)
- Section 8: Decisions & Approvals (decision matrix, approval checkpoints)
- Section 9: Blockers & Risk Mitigations (mitigation table)
- Section 10: Mapping to Child Issues (TOA-280, TOA-8, TOA-277, TOA-276, TOA-278, TOA-279)
- Section 11: Inventory Gap (75 claimed vs 56 verified)

**Time to read:** 20–30 minutes (reference throughout implementation)

---

### 3. STORAGE-PROVIDER-COMPARISON.md (308 lines)
**Purpose:** Detailed provider analysis with costs  
**Contents:**
- Cloudinary (RECOMMENDED) – UX, automation, cost ($99/mo), setup time
- GitHub + Netlify – Free alternative, no UX, manual optimisation
- AWS S3 + CloudFront – Enterprise option, overkill at TOA scale
- Recommendation matrix (which option for each use case)
- Final recommendation + migration path
- Implementation checklist

**Time to read:** 15 minutes

---

### 4. SAMPLE-CATALOGUE.json (349 lines)
**Purpose:** Example asset catalogue records  
**Contents:**
- 4 sample records (homepage hero, jungle festival, nail art, fallback)
- Full schema with all required/optional fields
- Documentation comments
- Ready to use as template for full 56-asset catalogue

**Time to use:** Copy-paste template; customize for each asset

---

### 5. 01-asset-inventory.json (149 lines)
**Purpose:** Complete list of 56 unique Figma asset IDs  
**Contents:**
- Audit metadata and summary
- All 56 unique `figma:asset/` IDs
- Status indicators (pending recovery, placeholder mappings)
- Gap analysis (unmapped assets, missing src/assets/ directory)

**Time to use:** Reference during recovery and validation phases

---

## Audit Findings Summary

### Critical Facts (Verified)

| Finding | Details |
|---------|---------|
| **Asset Count** | 56 unique `figma:asset/` IDs (128 total references) |
| **Previous Claim** | 75 unique references (audit report, now unverified) |
| **Discrepancy** | 19 fewer assets than claimed (likely Figma Make deduplication or repo refactoring) |
| **Current State** | All assets render as placeholder SVGs; `src/assets/` directory does not exist |
| **Asset Categories** | Homepage hero (3), festivals (18), portfolio (35), unmapped (38) |
| **Impact** | Users see grey placeholders; book export unavailable; print quality unknown |

### Architecture Findings

| Component | Details |
|-----------|---------|
| **Vite Asset Resolver** | Plugin checks `src/assets/{id}.png`; falls back to placeholder SVG |
| **PortfolioImage.tsx** | Hardcoded mapping of 18 assets; 38 unmapped across codebase |
| **Figma Integration** | Make is source; repository is generated output |
| **Current UX Impact** | Portfolio pages show generic placeholder images instead of makeup artistry |

### Recommendation

| Item | Recommendation | Rationale |
|------|---|---|
| **Storage** | Cloudinary | Best UX + automation + cost ($99/mo) |
| **Catalogue** | Version-controlled JSON in repo | Portability + audit trail |
| **Book Exports** | API-driven before publishing | High-res variants on-demand |
| **Figma Recovery** | Existing skills (`/figma-design-to-code`, `/figma-use`) | No custom agent needed |
| **Implementation** | 4-phase phased rollout | De-risk via staged validation |

---

## Usage Guide

### For Ash (Project Owner)

1. **Read:** EXECUTIVE-SUMMARY.md (5 min)
2. **Review:** Key decisions table in EXECUTIVE-SUMMARY
3. **Decide:** Storage provider + catalogue approach + export workflow
4. **Approve:** Decisions before TOA-280 / TOA-277 kickoff

### For Implementation Team

1. **Read:** MEDIA-LIBRARY-STRATEGY-REPORT (30 min)
2. **Reference:** Throughout TOA-280 through TOA-279
3. **Use:** Catalogue schema (Section 4)
4. **Follow:** Migration workflow (Section 6)
5. **Validate:** Checklist (Section 6.3)

### For Storage Selection

1. **Read:** STORAGE-PROVIDER-COMPARISON (15 min)
2. **Review:** Cost models for each provider
3. **Compare:** Implementation time and team capability
4. **Choose:** Recommended (Cloudinary) unless specific constraints exist
5. **Plan:** Setup checklist for chosen provider

### For Asset Recovery (TOA-280 / TOA-8)

1. **Reference:** Asset inventory (01-asset-inventory.json)
2. **Use:** Figma skills available in `/figma-design-to-code`, `/figma-use`
3. **Document:** Manual export gaps and recovery status
4. **Sample:** 10–15 representative assets
5. **Report:** Findings back to catalogue design (TOA-277)

---

## Key Decisions Required Before Implementation

| Decision | Options | Recommended | Owner | Status |
|----------|---------|---|---|---|
| Storage Provider | Cloudinary / GitHub / AWS S3 | GitHub + Netlify (zero-cost) | Ash | ✅ Approved |
| Catalogue Location | In-repo / External service | In-repo (.github/data/assets.json) | Ash | 🔴 Pending |
| Book Export | Automated API / Manual | File-based (high-res originals) | Ash | 🟡 Tentative |
| Asset Versioning | All versions / Major only | All versions via Git | Ash | ✅ Planned |
| Fallback Strategy | Placeholder SVG / External URL | Placeholder (reversible) | Ash | ✅ In place |
| Credits Display | Per-asset visible / Metadata only | Visible on gallery pages | Ash | 🟡 Pending |

---

## Implementation Timeline (Estimated)

| Phase | Issues | Duration | Blockers |
|-------|--------|----------|----------|
| **1. Recovery Pilot** | TOA-280, TOA-8 | 2–3 days | Figma access, skill validation |
| **2. Catalogue Design** | TOA-277, TOA-276 | 1–2 days | Storage provider decision |
| **3. Migration Workflow** | TOA-278 | 1 day | Catalogue finalised |
| **4. Validation & Ops** | TOA-279 | 1–2 days | Full asset set available |
| **5. Full Migration** | Implementation | 3–5 days | All above approved |

**Total:** 2–3 weeks (sequential; can overlap some phases)

---

## Files Included

```
toa-media-audit/
├── README.md                                (this file)
├── EXECUTIVE-SUMMARY.md                     (decision-makers: 5 min)
├── MEDIA-LIBRARY-STRATEGY-REPORT.md         (implementation: 30 min)
├── STORAGE-PROVIDER-COMPARISON.md           (cost analysis: 15 min)
├── 01-asset-inventory.json                  (reference data)
└── SAMPLE-CATALOGUE.json                    (example records)
```

**Total size:** 62 KB  
**Total lines:** 1,584 (mostly documentation + structured data)

---

## Appendix: Commands & References

### Git
```bash
# Clone repository
git clone https://github.com/lightspeedwp/ThisOneTimeOnAcidCom

# List all figma:asset references
grep -r "figma:asset/" src --include="*.tsx" --include="*.ts"

# Count unique assets
grep -r "figma:asset/" src --include="*.tsx" --include="*.ts" | \
  grep -oE "'figma:asset/[a-f0-9]+\.png'" | sort -u | wc -l
```

### Figma
- **Figma Make Project:** https://www.figma.com/make/WGrQbNWvPQfiaGY1pnkwaq/This-One-Time-on-Acid
- **Published Website:** https://thisonetimeonacid.figma.site
- **Design Source:** https://www.figma.com/design/WGrQbNWvPQfiaGY1pnkwaq/This-One-Time-on-Acid

### Linear Issues
- **Epic:** TOA-269 (media-library strategy)
- **Children:** TOA-280, TOA-8, TOA-277, TOA-276, TOA-278, TOA-279

### Cloudinary (if selected)
- **Sign up:** https://cloudinary.com/users/register/free
- **React SDK:** `npm install cloudinary-react`
- **Docs:** https://cloudinary.com/documentation/react_integration

---

## Support & Questions

**For audit findings:** See MEDIA-LIBRARY-STRATEGY-REPORT.md (index + search)  
**For cost questions:** See STORAGE-PROVIDER-COMPARISON.md (cost model section)  
**For implementation:** Follow migration workflow (MEDIA-LIBRARY-STRATEGY-REPORT § 6)  
**For approval:** Use decision matrix (EXECUTIVE-SUMMARY.md or § 8)

---

**Audit prepared by:** Claude (AI agent)  
**Scope:** Read-only investigation  
**Status:** Complete; ready for review and approval
