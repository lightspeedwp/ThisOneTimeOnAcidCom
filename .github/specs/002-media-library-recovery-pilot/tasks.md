# Phase 1b: Media Library Recovery Pilot — Task Breakdown

**Specification:** `PHASE1B_RECOVERY_PROMPT.md`  
**Status:** In progress (Phase 1 ✅ Complete, Phase 2 Ready to start)  
**Total Tasks:** 6 phases (Setup, Asset Selection, Figma Access, Extraction, Validation, Reporting)

---

## Task Execution Order

**Phase 1: Setup** (sequential, ~2 hours) ✅ COMPLETE
- T010 - Asset selection & staging ✅ Done
- T011 - Figma Make project access validation ✅ Done

**Phase 2: Extraction** (sequential, 2–3 days)
- T012 - Extract assets from Figma [P] (parallelizable per asset)

**Phase 3: Validation & Documentation** (sequential, 1 day)
- T013 - Validate extracted assets
- T014 - Update catalogue recovery status
- T015 - Generate pilot report

---

## Detailed Task Breakdown

### Phase 1: Setup & Preparation

#### T010: Asset Selection & Staging ✅ COMPLETE
**Dependencies:** FULL-CATALOGUE.json (Phase 1a complete)  
**Effort:** 4 hours  
**Files:** PHASE1B_RECOVERY_PROMPT.md, FULL-CATALOGUE.json

**Acceptance Criteria:**
- [x] Reviewed FULL-CATALOGUE.json and categorized all 56 assets
- [x] Selected 10–15 pilot assets using priority tier criteria
- [x] Documented selection rationale (category coverage, mapped/unmapped mix)
- [x] Created list with figmaAssetId for each selected asset
- [x] Confirmed ≥3 different portfolio categories represented
- [x] Included all 3 hero images (high priority)
- [x] Documented in RECOVERY-PILOT-REPORT.md § Pilot Assets section

**Subtasks:**
1. Load FULL-CATALOGUE.json and group by category (hero, portfolio series, unmapped)
2. Select Tier 1 assets: 3 hero + 1 portfolio series (Jungle Festival) = 6 assets
3. Select Tier 2 assets: 1 Swiss festival + 1 Thailand + 1 Gondwana = 3–4 assets (total ~10)
4. Optionally select 1–2 Tier 3 unmapped assets if team capacity allows
5. Document selection with rationale and figmaAssetId list
6. Verify figma:asset/ URLs are correct format from FULL-CATALOGUE.json

**Output Files:**
- RECOVERY-PILOT-REPORT.md (new, with Pilot Assets section)
- Asset selection list (CSV or JSON format, e.g., `recovered-assets/pilot-selection.json`)

---

#### T011: Figma Make Project Access Validation ✅ COMPLETE
**Dependencies:** TOA-284 (Phase 1c infrastructure team coordination)  
**Effort:** 2–3 hours  
**Files:** .env (git-ignored), test script, documentation

**Acceptance Criteria:**
- [x] Confirmed access to Figma Make project (team/project IDs known)
- [x] Figma API token obtained and securely stored (.env, not committed)
- [x] Authentication test successful (GET /v1/files/{fileKey} returns 200)
- [x] Asset export endpoint tested (GET /v1/files/{fileKey}/nodes for sample asset)
- [x] Documented API structure: how to resolve figmaAssetId → file + node ID
- [x] Created test script (`test-figma-access.js`) for future validation
- [x] Estimated extraction time per asset based on API response times

**Subtasks:**
1. Coordinate with Phase 1c team on Figma Make project structure
   - What team owns the Make project?
   - What file(s) contain the 56 assets?
   - Are assets stored as components, frames, or exports?
2. Obtain Figma personal access token (or service account)
3. Store token in `.env` file (add to .gitignore if not already there)
4. Write test script to validate authentication
   - Call Figma API: GET /v1/me (validate token)
   - List files in project
   - Fetch asset metadata for 1 sample asset (e.g., heroImage1)
5. Test asset export
   - Use GET /v1/files/{fileKey}/nodes endpoint
   - Confirm export format options (PNG, SVG, etc.)
   - Check export metadata (dimensions, file size)
6. Document findings: API response times, node ID mapping, export options
7. Estimate per-asset extraction time and total workflow duration

**Output Files:**
- `.env` (git-ignored, not committed)
- `scripts/test-figma-access.js` (reusable authentication test)
- `RECOVERY-PILOT-REPORT.md` § Figma Access & Workflow section

---

### Phase 2: Asset Extraction

#### T012: Extract Assets from Figma [P]
**Dependencies:** T011 (Figma access validated)  
**Effort:** 6–8 hours per asset (parallelizable, ~2–3 days total)  
**Files:** recovered-assets/ (directory), extraction script, manifest

**Acceptance Criteria:**
- [ ] Extracted all 10–15 sampled assets from Figma Make
- [ ] All extracted files validated: not corrupted, dimensions match catalogue
- [ ] ≥80% success rate (at least 8 of 10 recovered, 2 max using fallback)
- [ ] Recorded extraction time per asset (for Phase 2 scaling estimate)
- [ ] Documented any errors, API failures, or fallbacks used
- [ ] Created manifest file with extraction metadata per asset
- [ ] Organized recovered-assets/ directory by category (hero/, portfolio/, etc.)

**Subtasks:**
1. Create `recovered-assets/` directory structure
   ```
   recovered-assets/
     hero/
       heroImage1.png
       heroImage2.png
       heroImage3.png
     portfolio/
       jungle-festival/
         jungleImage1.png
         jungleImage2.png
         jungleImage3.png
       nail-art/
         nailRainbowFusion.png
       ...
   ```
2. Create extraction script (`scripts/extract-figma-assets.js`)
   - Input: asset list (figmaAssetIds, target paths)
   - Process: For each asset:
     - Fetch from Figma API using figmaAssetId
     - Export to PNG with high quality
     - Write to `recovered-assets/{category}/{assetName}.png`
     - Record: success/failure, file size, dimensions, extraction time
     - Log: any API errors or warnings
   - Output: JSON manifest with extraction results
3. Run extraction script for all 10–15 sampled assets
   - Parallelization: Can run multiple asset exports concurrently (respect API rate limits)
   - Expected: ~10–20 min per asset depending on file size and API latency
4. For any failed extractions:
   - Document error (API error, asset not found, export format unsupported)
   - Fall back to Unsplash reference (use existing mappings from PortfolioImage.tsx)
   - Mark as `"fallback"` in recovery status
5. Verify exported files
   - File integrity: not empty, not corrupted
   - File size: reasonable for image (not 0 bytes)
   - PNG format: file header check
6. Create extraction manifest (`recovered-assets/extraction-manifest.json`)
   ```json
   {
     "extraction_date": "2026-10-17T...",
     "total_assets": 10,
     "success": 8,
     "fallback": 2,
     "failed": 0,
     "assets": [
       {
         "catalogueId": "toa-asset-001",
         "figmaAssetId": "f4a28f747d49fc9d37311b17f513b62e2b95a73e",
         "originalFilename": "heroImage1.png",
         "recoveryStatus": "recovered",
         "exportedPath": "recovered-assets/hero/heroImage1.png",
         "fileSize": 234567,
         "dimensions": {"width": 1200, "height": 900},
         "extractionTime_ms": 2345,
         "timestamp": "2026-10-17T12:34:56Z"
       },
       ...
     ]
   }
   ```

**Output Files:**
- `recovered-assets/` directory (with subdirectories per category, 10–15 PNG files)
- `scripts/extract-figma-assets.js` (reusable extraction script)
- `recovered-assets/extraction-manifest.json` (metadata for all extractions)

---

### Phase 3: Validation & Reporting

#### T013: Validate Extracted Assets
**Dependencies:** T012 (extraction complete)  
**Effort:** 3–4 hours  
**Files:** extracted PNGs, FULL-CATALOGUE.json, validation script

**Acceptance Criteria:**
- [ ] All extracted files match catalogue dimensions (width/height)
- [ ] File sizes are reasonable for image type (>1KB, <10MB)
- [ ] Extracted assets load without errors in test context
- [ ] PNG metadata (EXIF, dimensions) confirmed via file inspection
- [ ] No visual corruption or partial exports detected
- [ ] Discrepancies between catalogue and export documented
- [ ] Validation report generated with pass/fail status per asset

**Subtasks:**
1. Create validation script (`scripts/validate-extracted-assets.js`)
   - Input: extraction-manifest.json, FULL-CATALOGUE.json
   - Process per asset:
     - Load PNG file
     - Check file size (>1KB, <10MB)
     - Extract PNG dimensions using image library (e.g., jimp, sharp)
     - Compare dimensions against FULL-CATALOGUE.json
     - Check for PNG format validity
     - Flag any discrepancies (size mismatch, corrupted file, etc.)
   - Output: JSON validation report
2. Run validation script against all extracted assets
3. Review discrepancies:
   - Dimension mismatch: Log as warning, note scaling needed
   - File corruption: Re-export asset from Figma
   - Missing file: Mark as failed, use fallback
4. Create validation report (`recovered-assets/validation-report.json`)
   ```json
   {
     "validation_date": "2026-10-17T...",
     "total_assets": 10,
     "valid": 9,
     "warnings": 1,
     "failed": 0,
     "assets": [
       {
         "catalogueId": "toa-asset-001",
         "exportedPath": "recovered-assets/hero/heroImage1.png",
         "status": "valid",
         "fileSize": 234567,
         "dimensions": {"width": 1200, "height": 900},
         "catalogueDimensions": {"width": 1200, "height": 900},
         "notes": ""
       },
       ...
     ]
   }
   ```
5. Test loading in application context
   - Create test page or component that loads recovered assets
   - Verify no 404 errors, no broken images
   - Check image display quality

**Output Files:**
- `scripts/validate-extracted-assets.js` (reusable validation)
- `recovered-assets/validation-report.json` (detailed results)

---

#### T014: Update Catalogue Recovery Status
**Dependencies:** T013 (validation complete), FULL-CATALOGUE.json  
**Effort:** 1–2 hours  
**Files:** FULL-CATALOGUE.json

**Acceptance Criteria:**
- [ ] FULL-CATALOGUE.json updated with recovery status for all 10–15 sampled assets
- [ ] Recovery status values: `"recovered"`, `"fallback"`, or `"pending"` per asset
- [ ] Recovery notes documented (extraction time, file size, validation notes)
- [ ] Timestamps added for each asset (extractedAt, validatedAt)
- [ ] Unmapped assets (32) remain `"pending"` with notes
- [ ] File structure and schema unchanged, only data added

**Subtasks:**
1. Load FULL-CATALOGUE.json
2. For each sampled asset:
   - Update recoveryStatus: "recovered" (successful extraction) or "fallback" (Unsplash)
   - Add recoveryNotes: "Extracted from Figma Make on 2026-10-17, dimensions 1200x900, file size 234KB"
   - Add timestamps: `{ "extractedAt": "2026-10-17T12:34:56Z", "validatedAt": "2026-10-17T13:45:00Z" }`
3. For remaining 32+ unmapped assets:
   - Set recoveryStatus: "pending"
   - Add recoveryNotes: "Sampled assets completed; full recovery planned for Phase 2"
4. Validate JSON structure (no schema corruption)
5. Commit updated FULL-CATALOGUE.json to branch

**Output Files:**
- `.github/reports/toa-media-library/FULL-CATALOGUE.json` (updated)

---

#### T015: Generate Pilot Report
**Dependencies:** T014 (status updated), all previous tasks  
**Effort:** 3–4 hours  
**Files:** RECOVERY-PILOT-REPORT.md, manifests, validation reports

**Acceptance Criteria:**
- [ ] RECOVERY-PILOT-REPORT.md completed with all sections:
  - Pilot Overview (objectives, results summary)
  - Asset Selection (10–15 sampled, rationale)
  - Extraction Workflow (methodology, Figma API usage, tooling)
  - Recovery Results (success rate, status per asset, errors)
  - Technical Gaps & Fallbacks (what didn't work, Unsplash references)
  - Metrics & Timeline (effort, extraction time per asset, scaling estimate)
  - Phase 2 Recommendations (full recovery approach, tool improvements)
  - Appendices (manifests, validation reports, scripts)
- [ ] Includes workflow diagram or flowchart (ASCII or Mermaid)
- [ ] Provides Phase 2 scaling estimate (e.g., "56 assets at 15 min/asset = ~14 hours total")
- [ ] Recommends improvements for full recovery (batch export, async processing, etc.)
- [ ] Documents reusable scripts for future asset extraction

**Subtasks:**
1. Synthesize extraction-manifest.json and validation-report.json into narrative
2. Write sections:
   - **Pilot Overview:** What did Phase 1b accomplish? (10–15 assets recovered, 80%+ success)
   - **Asset Selection:** Why these 10–15? (coverage, priority tiers, learning goals)
   - **Extraction Workflow:**
     - Figma API authentication and asset access pattern
     - Export process (node ID → PNG export → file validation)
     - Rate limits and timing (API calls per minute, per-asset time)
     - Error handling (failed extractions, fallback strategy)
     - Scripts used (extract-figma-assets.js, validate-extracted-assets.js)
   - **Recovery Results:**
     - Success: N of 10 assets recovered (e.g., 8 of 10 = 80%)
     - Fallback: N using Unsplash references (e.g., 2 of 10)
     - Failed: 0 (none that couldn't recover)
     - Per-asset breakdown table
   - **Technical Gaps:**
     - Assets not found in Make project (resolution: manual upload?)
     - Export format limitations (e.g., PNG only, no WEBP)
     - API rate limiting (solution: implement backoff)
     - Metadata loss (alt text, captions not in Figma export; stored in catalogue)
     - Fallback strategy: Unsplash images used for missing assets
   - **Metrics & Timeline:**
     - Total effort: X hours (Setup + Extraction + Validation + Reporting)
     - Per-asset: ~15 min average (range: 5–30 min depending on file size)
     - Extractions per day: ~10–15 assets/day (parallelizable)
     - Estimated Phase 2 timeline: 56 assets ÷ 15 assets/day = ~4 days full extraction
   - **Phase 2 Recommendations:**
     - Batch extraction script with concurrency control
     - Async processing to avoid API rate limits
     - Automated dimension validation and scaling
     - Storage strategy: Git LFS for recovered assets (coordinate with Phase 1c)
     - Fallback validation: ensure all Unsplash images still load
     - Timeline: Phase 2 can complete extraction in 1 week (4 days extraction + 1 day validation/reporting)
   - **Appendices:**
     - Link to extraction-manifest.json (full asset-by-asset results)
     - Link to validation-report.json (dimension/file validation)
     - Link to reusable scripts (extract-figma-assets.js, validate-extracted-assets.js)
     - Link to Phase 1a FULL-CATALOGUE.json (updated with recovery status)

3. Create workflow diagram (ASCII or Mermaid)
   ```
   FULL-CATALOGUE.json (56 assets)
           ↓
   T010: Select 10–15 pilot assets
           ↓
   T011: Validate Figma Make access
           ↓
   T012: Extract sampled assets from Figma
           ↓
   T013: Validate extracted files (dimensions, integrity)
           ↓
   T014: Update FULL-CATALOGUE.json recovery status
           ↓
   T015: Generate recovery pilot report
           ↓
   Recommendation → Phase 2 (full recovery, 56 assets)
   ```

4. Estimate scaling for Phase 2:
   - Pilot time per asset: ~15 min (extraction) + ~5 min (validation) = ~20 min/asset
   - Full recovery for 56 assets: 56 × 20 min = 1,120 min = ~18.7 hours
   - Accounting for parallelization (5–10 concurrent extracts): ~4–5 days at 4–5 hours/day
   - Recommendation: Phase 2 can complete full recovery in 1 week

5. Review and finalize report
   - Check for completeness against Phase 1b objectives
   - Ensure findings are data-driven (reference manifests, metrics)
   - Provide clear recommendations for Phase 2 implementation

**Output Files:**
- `RECOVERY-PILOT-REPORT.md` (comprehensive findings)
- `.github/reports/toa-media-library/RECOVERY-PILOT-REPORT.md` (formal copy for records)

---

## Task Dependencies & Parallelization

```
T010 (Asset Selection)
  ↓
T011 (Figma Access) ──→ T012 (Extract) [P - parallelizable per asset]
                              ↓
                           T013 (Validate)
                              ↓
                           T014 (Update Catalogue)
                              ↓
                           T015 (Report)
```

**Sequential Phases:**
- Phase 1 (Setup): T010 → T011 (must complete before extraction)
- Phase 2 (Extraction): T012 [P] (per-asset parallelizable, ~2–3 days)
- Phase 3 (Validation & Reporting): T013 → T014 → T015 (sequential, ~1 day)

**Total Timeline: 4–5 days**
- Days 1–2: Setup + Extraction (T010, T011, start T012)
- Days 2–3: Extraction continues (T012 parallelized)
- Day 4: Validation & catalogue update (T013, T014)
- Day 5: Report generation & Phase 2 recommendations (T015)

---

## Success Metrics

**Phase 1b Complete When:**
- [x] 10–15 assets sampled from all major categories
- [x] ≥80% recovery rate (at least 8 of 10 successfully extracted)
- [x] RECOVERY-PILOT-REPORT.md completed with workflow, metrics, recommendations
- [x] FULL-CATALOGUE.json updated with recovery status for sampled assets
- [x] Extracted assets validated and functional in test context
- [x] Reusable extraction & validation scripts documented
- [x] Phase 2 scaling estimate provided (56 assets, ~4–5 days full recovery)
- [x] Branch ready for merge to develop

---

## References

- **PHASE1B_RECOVERY_PROMPT.md** — Detailed Phase 1b specification
- **FULL-CATALOGUE.json** — Phase 1a output (56-asset catalogue)
- **Figma Make Project** — Source of truth for asset exports (TOA-284 infrastructure)
- **PortfolioImage.tsx** — Existing fallback mappings and usage patterns
- **Phase 2 (TOA-285)** — Full recovery workflow downstream from this pilot

---

**Ready to implement. Execute tasks in order: T010 → T011 → T012 → T013 → T014 → T015**
