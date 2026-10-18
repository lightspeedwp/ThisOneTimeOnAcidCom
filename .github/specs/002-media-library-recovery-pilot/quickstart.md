# Quickstart: Media Library Recovery Pilot (Phase 1b)

**Objective**: Run end-to-end asset extraction, validation, and reporting for Phase 1b pilot.

**Estimated Duration**: 30–60 minutes for execution + 2–3 days for T012–T015 actual work

---

## Prerequisites

1. **Environment**:
   - Node.js 18+ installed
   - Working directory: `/home/user/ThisOneTimeOnAcidCom`

2. **Configuration** (from T011):
   - `.env` file with Figma API credentials:
     ```bash
     FIGMA_API_TOKEN=<your_figma_personal_access_token>
     FIGMA_MAKE_FILE_KEY=<your_figma_make_project_file_key>
     FIGMA_API_RATE_LIMIT_PER_MINUTE=10
     FIGMA_CONCURRENT_REQUESTS=5
     ```

3. **Data** (from Phase 1a):
   - `.github/reports/toa-media-library/FULL-CATALOGUE.json` (56-asset catalogue)
   - `recovered-assets/pilot-selection.json` (selected 10–15 pilot assets from T010)

4. **Scripts** (from T012 implementation):
   - `scripts/extract-figma-assets.js` (extraction script)
   - `scripts/validate-extracted-assets.js` (validation script)

---

## Validation Scenarios

### Scenario 1: Figma API Connectivity (T011 Verification)

**Purpose**: Verify Figma Make project is accessible before extraction.

**Commands**:
```bash
cd /home/user/ThisOneTimeOnAcidCom

# Run existing connectivity test (from T011)
node scripts/test-figma-access.js
```

**Expected Outcome**:
```
✓ Authentication: PASSED (token valid)
✓ Make Project Access: PASSED (file found)
✓ Asset Node Fetch: PASSED (sample node retrieved)
✓ Asset Export: PASSED (export URL obtained)

Exit code 0 (all tests pass)
```

**If Fails**:
- Check .env credentials (FIGMA_API_TOKEN, FIGMA_MAKE_FILE_KEY)
- Verify Figma Make project is shared with your account
- Review test-figma-access.js output for specific error codes

---

### Scenario 2: Asset Extraction (T012 Execution)

**Purpose**: Extract 10–15 pilot assets from Figma Make and generate manifest.

**Commands**:
```bash
# Run extraction script
node scripts/extract-figma-assets.js

# Verify output
ls -la recovered-assets/
cat recovered-assets/extraction-manifest.json | jq .
```

**Expected Outcome**:

Directory structure:
```
recovered-assets/
├── hero/
│   ├── heroImage1.png      (success, dimensions 1200×900)
│   ├── heroImage2.png      (success)
│   └── heroImage3.png      (success)
├── portfolio/
│   ├── jungle-festival/
│   │   ├── jungleImage1.png  (success or fallback)
│   │   ├── jungleImage2.png
│   │   └── jungleImage3.png
│   ├── nail-art/
│   │   └── nailRainbowFusion.png  (fallback, Unsplash)
│   └── [other categories]
├── extraction-manifest.json
└── [total 10–15 PNG files + manifest]
```

Manifest summary:
```json
{
  "extraction_date": "2026-10-18T14:32:00Z",
  "total_assets": 12,
  "success": 10,
  "fallback": 2,
  "failed": 0
}
```

**Success Criteria**:
- ≥80% recovery rate: At least 8 of 10 assets with recoveryStatus="recovered" ✓
- All PNG files present in recovered-assets/ subdirectories ✓
- extraction-manifest.json contains all 10–15 assets with metadata ✓

**If Fails**:
- Check API rate limits (429 responses) → exponential backoff should retry
- Verify asset figmaAssetIds exist in Make project (404 → fallback to Unsplash)
- Review extraction-manifest.json `notes` field for specific errors

---

### Scenario 3: Asset Validation (T013 Execution)

**Purpose**: Validate extracted PNG files against catalogue dimensions and integrity.

**Commands**:
```bash
# Run validation script
node scripts/validate-extracted-assets.js

# Verify output
cat recovered-assets/validation-report.json | jq .
```

**Expected Outcome**:

Validation report structure:
```json
{
  "validation_date": "2026-10-18T15:45:00Z",
  "total_assets": 10,
  "valid": 9,
  "warnings": 1,
  "failed": 0,
  "assets": [
    {
      "catalogueId": "toa-asset-001",
      "exportedPath": "recovered-assets/hero/heroImage1.png",
      "status": "valid",
      "dimensions": { "width": 1200, "height": 900 },
      "catalogueDimensions": { "width": 1200, "height": 900 },
      "notes": ""
    },
    {
      "catalogueId": "toa-asset-005",
      "exportedPath": "recovered-assets/portfolio/jungle-festival/jungleImage2.png",
      "status": "warning",
      "dimensions": { "width": 800, "height": 600 },
      "catalogueDimensions": { "width": 1024, "height": 768 },
      "notes": "Dimension mismatch: scaled export?"
    }
  ]
}
```

**Success Criteria**:
- All recovered PNG files are readable (magic bytes `89 50 4E 47`) ✓
- File sizes are reasonable (>1KB, <10MB) ✓
- Dimensions match catalogue (or noted as warning) ✓
- No corrupted files ✓

**If Fails**:
- Corrupted PNG: Re-extract from Figma (mark as failed, use fallback)
- Dimension mismatch: Log as warning; may require upscaling in Phase 2
- File not found: Check recovered-assets/ directory structure

---

### Scenario 4: Catalogue Update (T014 Execution)

**Purpose**: Update FULL-CATALOGUE.json with recovery status and timestamps.

**Commands**:
```bash
# Backup original
cp .github/reports/toa-media-library/FULL-CATALOGUE.json .github/reports/toa-media-library/FULL-CATALOGUE.json.backup

# Run T014 logic: for each sampled asset, add:
# - recoveryStatus: "recovered" | "fallback" | "pending"
# - recoveryNotes: extraction details
# - extractedAt: ISO 8601 timestamp
# - validatedAt: ISO 8601 timestamp

# Verify updates
jq '.assets[] | select(.recoveryStatus != null) | {assetId, recoveryStatus}' \
  .github/reports/toa-media-library/FULL-CATALOGUE.json | head -5
```

**Expected Outcome**:

Sample catalogue entries (updated):
```json
[
  {
    "assetId": "toa-asset-001",
    "name": "heroImage1",
    "recoveryStatus": "recovered",
    "recoveryNotes": "Extracted from Figma Make on 2026-10-18, dimensions 1200x900, file size 234KB, extraction time 2345ms",
    "extractedAt": "2026-10-18T14:34:56Z",
    "validatedAt": "2026-10-18T15:45:00Z"
  },
  {
    "assetId": "toa-asset-042",
    "name": "jungleImage1",
    "recoveryStatus": "fallback",
    "recoveryNotes": "Not found in Make project; Unsplash fallback applied (unsplash:portfolio-jungle-1)",
    "extractedAt": "2026-10-18T14:35:12Z",
    "validatedAt": "2026-10-18T15:45:30Z"
  }
]
```

**Success Criteria**:
- All 12 sampled assets have recoveryStatus set ✓
- All 44 unsampled assets remain recoveryStatus="pending" (unchanged from Phase 1a) ✓
- Timestamps are valid ISO 8601 format ✓
- JSON structure remains valid ✓

**If Fails**:
- Check JSON syntax: `jq . .github/reports/toa-media-library/FULL-CATALOGUE.json`
- Verify catalogueId matches between extraction-manifest.json and FULL-CATALOGUE.json
- Restore from backup if corruption detected

---

### Scenario 5: Pilot Report Generation (T015 Execution)

**Purpose**: Generate RECOVERY-PILOT-REPORT.md with findings and Phase 2 recommendations.

**Commands**:
```bash
# Generate report (T015 synthesis)
# Input: extraction-manifest.json, validation-report.json, FULL-CATALOGUE.json updates
# Output: RECOVERY-PILOT-REPORT.md

# Verify report structure
head -50 RECOVERY-PILOT-REPORT.md
grep -c "^##" RECOVERY-PILOT-REPORT.md  # Should have 7+ sections
```

**Expected Report Sections**:
1. Pilot Overview (objectives, results summary)
2. Asset Selection (10–15 sampled, rationale)
3. Extraction Workflow (methodology, Figma API usage, tooling)
4. Recovery Results (success rate, status per asset, errors)
5. Technical Gaps & Fallbacks (what didn't work, Unsplash references)
6. Metrics & Timeline (effort, extraction time per asset, scaling estimate)
7. Phase 2 Recommendations (full recovery approach, tool improvements)
8. Appendices (manifests, scripts, references)

**Success Criteria**:
- Report is >1000 words (comprehensive findings) ✓
- Includes workflow diagram (ASCII or Mermaid) ✓
- Provides Phase 2 scaling estimate based on MEASURED metrics ✓
- Recommends improvements for full recovery ✓
- References extraction-manifest.json and validation-report.json ✓

**If Fails**:
- Ensure all manifests are generated before running T015
- Check metrics calculation: (56 assets × measured_per_asset_time_minutes) ÷ parallelization_factor
- Review Phase 2 recommendations against TOA-285 downstream requirements

---

## Full End-to-End Execution

**Timeline**: 4–5 days (following task sequence)

```bash
# Day 1: Setup
# T010: Asset selection (already complete)
# T011: Figma access validation (already complete)
node scripts/test-figma-access.js    # ✓ Verify connectivity

# Days 2–3: Extraction (parallelizable)
# T012: Extract assets from Figma
node scripts/extract-figma-assets.js # ✓ Generates recovery-assets/ + extraction-manifest.json
# [Monitor extraction progress; allow 12–15 min per asset × 10–15 assets = 2–3 hours wall-clock]

# Day 4: Validation
# T013: Validate extracted files
node scripts/validate-extracted-assets.js  # ✓ Generates validation-report.json

# Day 4: Catalogue update
# T014: Update FULL-CATALOGUE.json recovery status
# [Manual or scripted update using extraction + validation manifests]

# Day 5: Report generation
# T015: Generate RECOVERY-PILOT-REPORT.md
# [Synthesize findings; calculate Phase 2 estimate from measured metrics]
```

---

## Troubleshooting

| Issue | Cause | Resolution |
|-------|-------|-----------|
| `FIGMA_API_TOKEN` not found | .env file missing or incomplete | Create `.env` with Figma credentials; see T011 |
| 429 Rate Limit errors | API rate limit exceeded | Exponential backoff (2s–16s) should retry; check FIGMA_API_RATE_LIMIT_PER_MINUTE |
| 404 Asset not found | Asset removed from Make project | Mark as fallback (Unsplash); document in manifest |
| PNG dimensions mismatch | Export scaled to fit | Log as warning in validation-report.json; note for Phase 2 |
| Extraction timeout (>10min per asset) | Figma API slow or network latency | Normal under heavy load; allow 15–20 min per asset |

---

## Next Steps

**After T015 (Report Generation)**:
1. Review RECOVERY-PILOT-REPORT.md findings
2. Validate Phase 2 scaling estimate (56 assets ÷ measured_per_asset_time)
3. Merge Phase 1b branch to `develop`
4. Hand off to Phase 2 (TOA-285) with documented recovery methodology

---

## References

- **Extraction Manifest Schema**: `contracts/extraction-manifest.schema.json`
- **Data Model**: `data-model.md`
- **Research**: `research.md`
- **Tasks**: `tasks.md` (T010–T015 breakdown)
- **Specification**: `PHASE1B_RECOVERY_PROMPT.md`
- **Phase 2**: TOA-285 (full recovery, 56 assets)
