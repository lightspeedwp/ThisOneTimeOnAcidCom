# TOA-280: Figma Asset Extraction Pilot Plan

**Status:** Ready for kickoff
**Date:** 17 October 2026
**Epic:** TOA-269 (Media Library Strategy)
**Audit Reference:** `.github/reports/toa-media-library/`

---

## Objective

Test Figma Make export capability and recover 10–15 representative assets from
56 unique Figma assets. Identify export gaps and validate recovery process
before full migration.

---

## Scope

**In Scope:**

- Sample 10–15 representative assets covering all categories
- Test export capability from Figma Make project
- Document recovery status for each asset
- Identify blockers (permission, export format, naming issues)
- Validate image quality and metadata preservation

**Out of Scope:**

- Full recovery of all 56 assets (that's TOA-278, the migration phase)
- Modification to Figma files
- Creation of new asset collections

---

## Representative Sample (10–15 Assets)

### Selection Strategy

Assets chosen to cover:

- **Range of categories:** Homepage (3), Portfolio (6), Events (3–4)
- **Quality range:** High-res portfolio, event coverage, product shots
- **Recovery complexity:** Simple (existing files), complex (nested components)

### Sample Breakdown

| Category | Count | Sample IDs | Figma Asset ID |
|----------|-------|-----------|--|
| **Homepage Hero** | 3 | toa-hero-eye-makeup-01, toa-hero-festival-01, toa-hero-makeup-02 | f4a28f74..., f7c2a891..., f9d3b2c1... |
| **Jungle Festival Portfolio** | 3 | toa-jungle-festival-01, toa-jungle-festival-02, toa-jungle-festival-03 | 7afa71c7..., 8bac82d8..., 9cbd93e9... |
| **Gondwana Festival** | 2 | toa-gondwana-01, toa-gondwana-02 | a1de04f0..., b2ef15e1... |
| **Origin Festival** | 2 | toa-origin-01, toa-origin-02 | c3f02692..., d4d137ab... |
| **Nail Art** | 2 | toa-nail-art-rainbow-fusion, toa-nail-art-01 | 7c570c52..., 8d681d63... |

**Total:** 12 assets across 5 categories (coverage across portfolio, festivals,
and specialty services)

---

## Recovery Process (Per Asset)

For each sampled asset, execute:

### Step 1: Locate Asset in Figma Make

- Open Figma Make project: https://www.figma.com/make/WGrQbNWvPQfiaGY1pnkwaq/This-One-Time-on-Acid
- Search for asset by `figma:asset/{id}` reference
- Verify asset exists and is exportable (not locked, not nested in complex component)

### Step 2: Test Export

- Right-click asset → Export
- Supported formats: PNG (preferred), SVG, PDF
- Target: high-res export (1200px minimum width for web, 2400px for print)
- Document export success/failure and format

### Step 3: Capture Metadata

Record:

- Asset name and ID
- Original dimensions (as exported)
- File size (bytes)
- Export format and quality setting
- Any manual adjustments needed (e.g. background removal, color correction)

### Step 4: Quality Check

- Visual inspection: no cropping, proper colors, readable text
- Dimensions: >= 1200px for web, >= 2400px for print
- File format: PNG with transparency for overlays, JPEG for photography

### Step 5: Document Recovery Status

- **Status:** `recovered`, `partial`, or `failed`
- **Notes:** Any blockers, quality issues, or rework needed
- **Next Action:** Suitable for TOA-278 migration, or requires manual intervention

---

## Execution Checklist

### Pre-Pilot (Day 1)

- [ ] Verify Figma Make access (https://www.figma.com/make/WGrQbNWvPQfiaGY1pnkwaq/This-One-Time-on-Acid)
- [ ] Confirm 12 sample assets are located in Make project
- [ ] Document any access/permission issues

### Pilot Testing (Days 2–3)

- [ ] Export all 12 assets
- [ ] Record metadata and quality for each
- [ ] Test export formats (PNG, JPEG, SVG if available)
- [ ] Verify dimensions and file sizes
- [ ] Document any failed exports

### Analysis (Day 4)

- [ ] Tally recovery success rate
- [ ] Identify blockers and workarounds
- [ ] Assess quality and completeness
- [ ] Create sample catalogue entries from recovered assets

### Report & Recommendations (Day 4–5)

- [ ] Write pilot report with findings
- [ ] Recommend approach for full recovery (automated export, manual download, hybrid)
- [ ] Document export workflow for TOA-278
- [ ] Update asset-inventory with recovery status

---

## Expected Outcomes

### Success Criteria

- [ ] ≥80% of sampled assets recover with high-res exports
- [ ] Export process documented and repeatable
- [ ] No critical blockers identified
- [ ] Sample catalogue entries created for validation

### Potential Blockers

| Blocker | Likelihood | Mitigation |
|---------|-----------|-----------|
| **Figma Make export unavailable** | Medium | Use design-file export; verify Make → Design sync |
| **Assets nested in complex components** | Medium | Document component hierarchy; plan component extraction |
| **Permission/access issues** | Low | Verify Make project editor access; check org permissions |
| **Quality degradation on export** | Low | Test export settings; compare original vs export side-by-side |
| **Missing high-res variants** | Medium | Use SVG as fallback; document quality limitations |

---

## Deliverables

1. **Pilot Report** (`TOA-280-PILOT-REPORT.md`)

   - Summary of findings
   - Asset-by-asset recovery status
   - Blockers and workarounds
   - Recommendations for full migration

1. **Sample Catalogue Entries** (`SAMPLE-RECOVERED-ASSETS.json`)

   - At least 10 successfully recovered assets (from 12 samples, ≥80% success rate)
   - Full metadata (dimensions, format, quality notes)
   - Ready for validation and full migration

1. **Export Workflow Guide** (`FIGMA-EXPORT-WORKFLOW.md`)

   - Step-by-step export process
   - Tool recommendations (Figma CLI, Make API, manual download)
   - Quality checklist for exports

1. **Updated Asset Inventory** (`01-asset-inventory.json` updated)

   - Recovery status for sampled assets
   - Links to recovered files (to be stored in GitHub + Netlify per approved storage decision)
   - Blockers and manual intervention notes

---

## Timeline

| Phase | Duration | Owner |
|-------|----------|-------|
| **Pre-Pilot Verification** | 1 day | Claude / Ash |
| **Asset Recovery & Testing** | 2–3 days | Claude / Ash |
| **Analysis & Documentation** | 1 day | Claude |
| **Reporting** | 1 day | Claude |
| **Total** | **5 days** | — |

**Target Start:** After TOA-269 approval (17 Oct)
**Target Completion:** 22 Oct 2026

---

## Success Metric

**Primary:** At least 10 high-quality, exportable sample assets with complete
metadata (from 12 samples, ≥80% success rate).
**Secondary:** Clear export workflow documented for full migration (TOA-278).
**Threshold:** ≥80% recovery success rate (≥10/12 assets); zero critical
blockers.

---

## Next Steps (After Pilot)

1. **If successful (≥80%):** Proceed to TOA-278 (full migration) with confidence

1. **If moderate (60–80%):** Document workarounds; proceed with hybrid manual + automated export

1. **If low (<60%):** Escalate blockers; investigate alternative recovery methods (CLI, API, manual design-file export)

---

## Figma Resources

- **Make Project:** https://www.figma.com/make/WGrQbNWvPQfiaGY1pnkwaq/This-One-Time-on-Acid
- **Design File (if needed):** https://www.figma.com/design/WGrQbNWvPQfiaGY1pnkwaq/This-One-Time-on-Acid
- **Published Site:** https://thisonetimeonacid.figma.site

---

## Approved By

- **Audit:** ✅ Completed by Claude (17 Oct 2026)
- **Recommendations:** ✅ GitHub + Netlify storage selected
- **Pilot Plan:** ✅ Ready for TOA-280 kickoff
- **Project Owner:** Ash Shaw (pending)

---

**Pilot prepared by:** Claude (AI audit)
**Repository:** lightspeedwp/ThisOneTimeOnAcidCom
**Epic:** TOA-269 (Media Library Strategy)
**Related Issues:** TOA-280, TOA-8, TOA-277, TOA-276, TOA-278, TOA-279
