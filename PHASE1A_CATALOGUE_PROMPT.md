# Phase 1a: Media Library Asset Catalogue Population

**Branch:** `task/media-library-catalogue-phase1a`  
**Status:** Ready for implementation  
**Sprint:** Week 1 (parallel with TOA-280 recovery pilot and TOA-284 infrastructure)

---

## Context

The media-library specification consolidation is complete (PRs #296 + #297 merged). Asset inventory has been reconciled: **56 unique assets verified** (not 75). All audit data is on `develop` branch.

Current state:
- ✅ Specification complete
- ✅ Audit reports consolidated
- ✅ Asset inventory verified (56 unique, 128 references)
- ✅ Catalogue schema defined in SAMPLE-CATALOGUE.json
- 🔴 **Full catalogue needs population for all 56 assets**

---

## Objective

Populate the complete media library catalogue with metadata for all 56 assets, expanding from the sample catalogue template to deliver the full schema with:

- Asset inventory records (figma IDs, filenames, formats, dimensions)
- Usage context (pages, components, chapters, web context)
- Metadata (captions, alt text, descriptions, tags)
- Credits and provenance (photographer, artist, rights, license)
- Print suitability and web optimization settings
- Recovery status tracking

**Deliverable:** `FULL-CATALOGUE.json` with all 56 asset records on this branch.

---

## Known Data Sources

### Audit Reports (on develop)
All read from `.github/reports/toa-media-library/`:

1. **01-asset-inventory.json** — Complete 56-asset reference list
   - Figma asset IDs, file extensions, categories
   - Mapped status (18 with metadata, 38 without)
   - Import locations in codebase

2. **SAMPLE-CATALOGUE.json** — Schema template (4 sample records)
   - Structure for all 56 entries
   - Required and optional fields
   - Example records showing Figma assets and external fallbacks

3. **MEDIA-LIBRARY-STRATEGY-REPORT.md** — Full technical spec
   - Catalogue schema detailed specification
   - Asset categories and groupings
   - Metadata requirements per asset type

4. **EXECUTIVE-SUMMARY.md** — High-level audit findings
   - Asset count reconciliation (56 verified)
   - 18 mapped (with metadata) vs 38 unmapped
   - Recovery priority matrix

### Specification Files
Reference `.github/specs/002-media-library/` for:
- **spec.md** — User stories and requirements (US1, US5, FR-001–005)
- **tasks.md** — Task breakdown (T002–T006 cover catalogue work)
- **checklists/specification-quality.md** — Quality assurance criteria

---

## Implementation Workflow

**Use `/speckit-implement` to:**
1. Break Phase 1a into actionable tasks
2. Define acceptance criteria per task
3. Map to specification requirements (T002–T006)
4. Identify parallel work opportunities (recovery pilot, infrastructure)

### Expected Task Breakdown

**T002: Extract metadata for Homepage Hero (3 assets)**
- heroImage1, heroImage2, heroImage3
- Already have: alt text, captions in code
- Add: dimensions, formats, credits, print-readiness

**T003: Extract metadata for Portfolio series (15 mapped assets)**
- Jungle Festival, nail art, festival makeup portfolios
- Already have: alt text, captions, some usage context
- Add: complete metadata, provenance, optimization settings

**T004: Identify and extract metadata for unmapped assets (38 assets)**
- Use 01-asset-inventory.json as reference
- Extract from Figma Make project where available
- Document recovery status and manual-export gaps

**T005: Populate web optimization and print suitability**
- Define recommended presets per asset category
- Set maxWidth, quality, and format recommendations
- Mark print-ready vs web-only assets

**T006: Create FULL-CATALOGUE.json**
- Consolidate all 56 records into final schema
- Validate against SAMPLE-CATALOGUE.json structure
- Add metadata notes for incomplete records

---

## Acceptance Criteria

- [x] Asset inventory verified (56 unique, 128 references)
- [ ] Metadata extracted for all 56 assets (both mapped + unmapped)
- [ ] FULL-CATALOGUE.json created with all required fields
- [ ] 18 mapped assets have complete metadata (alt text + captions + credits)
- [ ] 38 unmapped assets have metadata framework (placeholders for missing data)
- [ ] Print suitability defined for all assets (isPrintReady, recommendedPPI)
- [ ] Web optimization presets assigned per category
- [ ] Recovery status updated for all assets (pending/recovered/fallback)
- [ ] External fallbacks documented (Unsplash references, etc.)
- [ ] Quality checklist passed (specification-quality.md § Metadata Completeness)

---

## Files to Create/Modify

**Create:**
- `.github/reports/toa-media-library/FULL-CATALOGUE.json` — Complete 56-asset catalogue

**Reference (do not edit):**
- `.github/reports/toa-media-library/01-asset-inventory.json`
- `.github/reports/toa-media-library/SAMPLE-CATALOGUE.json`
- `.github/specs/002-media-library/spec.md`
- `.github/specs/002-media-library/tasks.md`

**Update if needed:**
- `CHANGELOG.md` — Entry for new catalogue asset (per `guidelines/changelog.md`)

---

## Success Definition

✅ **Phase 1a Complete When:**
1. FULL-CATALOGUE.json contains all 56 assets with metadata
2. Each record includes: figmaAssetId, format, dimensions, usage, metadata, credits, recovery status
3. Quality checklist passing (metadata completeness validated)
4. Branch ready for merge to develop
5. Ready to hand off to Phase 1b (recovery pilot) and Phase 1c (infrastructure)

---

## Timeline

**Week 1:**
- Days 1–2: Extract mapped asset metadata (T002–T003, 18 assets)
- Days 2–3: Extract unmapped asset metadata (T004, 38 assets)
- Days 3–4: Define optimization settings and print suitability (T005)
- Day 4–5: Consolidate FULL-CATALOGUE.json and validate (T006)

**Parallel (same week):**
- TOA-280: Recovery pilot (sampling 10–15 assets)
- TOA-284: Infrastructure setup (Git LFS, Netlify)

---

## Linear Issues

Related Linear issues (all updated with reconciliation status):
- **TOA-8** — Asset recovery (this work feeds recovery pilot)
- **TOA-269** — Media library epic (parent issue)
- **TOA-276** — Storage evaluation (infrastructure setup)
- **TOA-277** — Catalogue schema (this work implements it)
- **TOA-278** — Migration workflow (uses catalogue as input)
- **TOA-280** — Recovery pilot (parallel, shares recovered assets)
- **TOA-284** — Infrastructure (parallel, uses catalogue for asset tracking)
- **TOA-285** — Migration pipeline (downstream, builds on catalogue)

---

## Specification References

- Phase 0 (complete): Asset audit, count reconciliation, schema design
- **Phase 1a (this work):** Catalogue population for all 56 assets
- Phase 1b (parallel): Recovery pilot sampling
- Phase 1c (parallel): Infrastructure validation
- Phase 2 (downstream): Asset migration and reference updates

---

## Next Session Instructions

**Branch:** task/media-library-catalogue-phase1a ✅ Ready  
**Validation:** Already passed  

**Start with:**
1. Run `/speckit-implement` to break Phase 1a into tasks
2. Review specification references (spec.md, tasks.md, quality checklist)
3. Extract mapped asset metadata using audit data
4. Populate FULL-CATALOGUE.json
5. Validate quality and merge-readiness

---

## Notes

- **No code changes** — catalogue is JSON data, not application code
- **No Figma modifications** — read-only extraction only
- **No prototype/draft status** — final catalogue ready for Phase 1b handoff
- **Asset recovery happens in parallel** — this catalogue is ready before recovery completes
- **This feeds Phase 1b** — recovery pilot uses this catalogue as the baseline schema

---

**Ready to implement. Use `/speckit-implement` to begin task breakdown.**
