# Phase 1b: Media Library Asset Recovery Pilot

**Branch:** `task/media-library-recovery-phase1b`  
**Status:** Ready for implementation  
**Sprint:** Week 1 (parallel with Phase 1a catalogue & Phase 1c infrastructure)

---

## Context

Phase 1a has completed the full media library catalogue (FULL-CATALOGUE.json) with all 56 assets verified and mapped. Now Phase 1b executes the recovery pilot: sampling and extracting 10–15 high-priority assets from Figma using the Make project.

Current state:
- ✅ FULL-CATALOGUE.json complete (56 assets catalogued)
- ✅ Asset inventory reconciled (56 unique, 128 references)
- ✅ Catalogue schema validated
- 🔴 **Recovery workflow not yet tested—need pilot to validate extraction process**

---

## Objective

Extract and recover 10–15 carefully selected Figma assets from the Figma Make project, documenting the extraction workflow, gaps, and recovery status for each asset. Use this pilot to validate the recovery methodology before full-scale asset migration (Phase 2).

**Deliverable:** `RECOVERY-PILOT-REPORT.md` documenting:
- Sampled assets (10–15), categories, selection rationale
- Extraction workflow and tooling used
- Recovery success rate and status per asset
- Technical gaps and fallback strategies
- Timeline and effort metrics
- Recommendations for Phase 2 full recovery

---

## Asset Selection Criteria (Pilot Sampling)

Select 10–15 assets representing all major categories to maximize learning:

### Priority Tiers

**Tier 1: High Priority (Must Include)**
- All 3 hero images (heroImage1, heroImage2, heroImage3)
  - Reason: Homepage critical path, high visibility, alt text already in code
  - Files: figma:asset/{f4a28f747d49fc9d37311b17f513b62e2b95a73e, 378acbf4a7518ca6c40b44540bd7a121a91375fe, e82a7d901c5a28bf9313c7535228e647eaf06b75}.png
- 1 portfolio series (e.g., Jungle Festival – 3 images)
  - Reason: Largest single category, portfolio-critical content
  - Files: jungleImage1-3 (figmaAssetIds from PortfolioImage.tsx)
- 1 design system category (e.g., Nail Art – 2 images)
  - Reason: Standalone category, different extraction pattern

**Tier 2: Coverage (Select 3–5)**
- 1 Swiss festival series (Shankra or Reiserfieber – 2 images)
  - Reason: International content, metadata language patterns
- 1 Thailand portfolio series (1–2 images)
  - Reason: Unmapped assets, metadata discovery needed
- 1 Nation of Gondwana asset
  - Reason: Small category, validation of edge cases

**Tier 3: Unmapped Assets (Optional, if time)**
- 1–2 unmapped figma:asset IDs from the 32 unmapped pool
  - Reason: Validate recovery process for assets without code metadata

### Rationale

Minimum 10 assets ensures coverage of:
- All 4 major usage contexts (hero, portfolio, unmapped, fallback-dependent)
- At least 3 of 7 portfolio categories
- Mix of mapped (with alt text) and unmapped (framework only)
- Different file sizes and dimensions

---

## Recovery Workflow

### Phase 1b Steps

**T010: Asset Selection & Staging (Day 1)**
- [ ] Review FULL-CATALOGUE.json and categorize by priority
- [ ] Select 10–15 assets per criteria above
- [ ] Document selection rationale in RECOVERY-PILOT-REPORT.md
- [ ] Create figma:asset/ URLs for each selected asset

**T011: Set Up Figma Make Project Access (Day 1)**
- [ ] Verify access to Figma Make project (TOA-284 shared infrastructure)
- [ ] Test Figma API authentication via Make
- [ ] Document access methodology (API token, project structure, asset hierarchy)

**T012: Extract Assets from Figma (Days 2–3)**
- [ ] For each sampled asset:
  - [ ] Fetch from Figma Make using figmaAssetId
  - [ ] Export to PNG with original metadata (dimensions, file size)
  - [ ] Verify integrity (file not corrupted, dimensions match catalogue)
  - [ ] Document extraction status: success, failed, fallback (Unsplash)
  - [ ] Record extraction time and file size
  - [ ] Capture any errors or warnings

**T013: Validate Extracted Assets (Day 3)**
- [ ] Verify all exported files match catalogue dimensions
- [ ] Check file sizes against predictions
- [ ] Validate metadata (alt text, captions) against FULL-CATALOGUE
- [ ] Test loading in PortfolioImage.tsx (or mock context)
- [ ] Document any discrepancies

**T014: Document Recovery Status (Day 4)**
- [ ] Update FULL-CATALOGUE.json recoveryStatus field for sampled assets
  - `"recovered"` — successfully exported from Figma
  - `"fallback"` — Unsplash fallback used (asset unavailable in Make)
  - `"pending"` — could not retrieve, needs manual intervention
- [ ] Document recovery notes and technical gaps
- [ ] Assess time per asset, estimate full-recovery timeline

**T015: Generate Pilot Report (Day 4–5)**
- [ ] Synthesize findings into RECOVERY-PILOT-REPORT.md
- [ ] Include workflow diagram, extraction script template, metrics
- [ ] Provide recommendations for Phase 2 (full recovery)
- [ ] Estimate effort: how many assets per day, what bottlenecks

---

## Known Data Sources

### Figma Make Project
- **Location:** Figma Make team/project (shared with Phase 1c infrastructure)
- **Access:** Figma API via personal token or service account
- **Asset Structure:** figmaAssetId (hash) → PNG export with metadata
- **Estimated Asset Count:** 56 total; pilot samples 10–15

### FULL-CATALOGUE.json
- **Source:** `.github/reports/toa-media-library/FULL-CATALOGUE.json` (Phase 1a output)
- **Schema:** Complete catalogue with all 56 asset records
- **Use:** Reference dimensions, metadata, categories, mapped vs unmapped status
- **Update:** Write recovered asset details back to this file during recovery

### Code Metadata Sources
- **PortfolioImage.tsx:** FIGMA_ASSET_MAP with 21 portfolio imports + alt text, captions
- **hero-images.ts:** 3 hero image imports with alt text, captions
- **Codebase:** Scan for any additional asset references or metadata

### External Fallbacks
- **Unsplash:** 4 fallback images already used in PortfolioImage.tsx
  - Nail art, UV makeup, Festival makeup, Portfolio fallback
  - Use these as reference for categories without recovered assets

---

## Acceptance Criteria

- [x] Asset inventory verified (56 unique)
- [ ] Sampled 10–15 assets representing all major categories
- [ ] Extracted all sampled assets from Figma Make project
- [ ] Recovered ≥80% of sampled assets (at least 8 of 10)
- [ ] Documented extraction workflow and tooling
- [ ] Updated FULL-CATALOGUE.json with recovery status for sampled assets
- [ ] Created RECOVERY-PILOT-REPORT.md with findings, gaps, recommendations
- [ ] Validated extracted assets load in application context
- [ ] Documented timeline and effort metrics (assets per day)
- [ ] Provided Phase 2 scaling recommendations

---

## Files to Create/Modify

**Create:**
- `RECOVERY-PILOT-REPORT.md` — Pilot findings, workflow documentation, metrics
- `recovered-assets/` — Directory for exported PNG files from Figma (10–15 samples)
  - Structured: `recovered-assets/hero/heroImage1.png`, `recovered-assets/portfolio/jungle-festival/jungleImage1.png`, etc.

**Update:**
- `.github/reports/toa-media-library/FULL-CATALOGUE.json`
  - Add recoveryStatus: "recovered" | "fallback" | "pending" for sampled assets
  - Add recoveryNotes with extraction details, timestamps

**Reference (do not edit):**
- `PHASE1A_CATALOGUE_PROMPT.md` — Phase 1a specification (already complete)
- `src/app/components/ui/PortfolioImage.tsx` — Existing fallback mappings
- `.github/specs/002-media-library/` — Specification reference

---

## Success Definition

✅ **Phase 1b Complete When:**
1. 10–15 assets successfully sampled and documented
2. ≥80% recovery rate demonstrated (Figma extraction + fallback validation)
3. RECOVERY-PILOT-REPORT.md completed with workflow, metrics, recommendations
4. FULL-CATALOGUE.json updated with recovery status and notes
5. Extracted assets validated and ready for Phase 2 scaling
6. Branch ready for merge to develop
7. Handoff recommendations provided to Phase 2 (full recovery) and Phase 1c (infrastructure)

---

## Timeline

**Week 1 (Parallel with Phase 1a & Phase 1c):**
- Day 1: Asset selection, Figma Make access validation
- Days 2–3: Asset extraction and recovery
- Day 3–4: Validation, status documentation
- Day 4–5: Pilot report generation, Phase 2 recommendations

---

## Linear Issues

Related Linear issues (parallel work):
- **TOA-8** — Asset recovery (parent, feeds full Phase 2)
- **TOA-269** — Media library epic (parent issue)
- **TOA-276** — Storage evaluation (Phase 1c parallel)
- **TOA-277** — Catalogue schema (Phase 1a, complete)
- **TOA-278** — Migration workflow (Phase 2 downstream, uses this pilot)
- **TOA-280** — Recovery pilot (this work)
- **TOA-284** — Infrastructure (Phase 1c parallel)
- **TOA-285** — Migration pipeline (Phase 2 downstream)

---

## Specification References

- Phase 0 (complete): Asset audit, count reconciliation, schema design
- Phase 1a (complete): Catalogue population for all 56 assets
- **Phase 1b (this work):** Recovery pilot sampling and extraction
- Phase 1c (parallel): Infrastructure validation
- Phase 2 (downstream): Asset migration and reference updates

---

## Next Session Instructions

**Branch:** `task/media-library-recovery-phase1b` ✅ Created  

**Start with:**
1. Run `/speckit-implement` to break Phase 1b into actionable tasks (T010–T015)
2. Review FULL-CATALOGUE.json and select 10–15 pilot assets
3. Verify Figma Make project access and asset structure
4. Execute extraction workflow for sampled assets
5. Document recovery status and generate pilot report
6. Validate findings and provide Phase 2 recommendations

---

## Notes

- **Figma Make Access:** Coordinate with Phase 1c infrastructure team (TOA-284) for shared Figma setup
- **Recovery Rate Target:** ≥80% means at least 8 of 10 sampled assets successfully extracted
- **Fallback Strategy:** Any asset that cannot be extracted defaults to Unsplash reference (already mapped in PortfolioImage.tsx)
- **Phase 2 Input:** This pilot's findings, metrics, and workflow directly inform full-recovery planning
- **Parallel Timing:** Phase 1c infrastructure team configures Git LFS + Netlify during same week; coordinate storage decisions based on recovered asset sizes

---

**Ready to implement. Use `/speckit-implement` to begin task breakdown.**
