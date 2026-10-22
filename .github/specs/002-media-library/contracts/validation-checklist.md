# Validation Checklist and Operational Runbook

**Purpose**: Define validation approach (visual comparison, broken-reference
detection, metadata completeness) and operational publishing guidance so
recovered assets are verified before migration and the team has a runbook for
ongoing maintenance.

**Input**: Specification from [spec.md](../spec.md) (FR-014–017), catalogue
schema from [catalogue-schema.json](catalogue-schema.json), data model from
[data-model.md](../data-model.md)

**Scope**: This document defines validation *process* and *criteria*. It does
NOT execute validation (TOA-282 performs pilot validation; TOA-286 handles
operational handover).

**Phase**: 1 Design (US4: Validation and Handoff)

---

## Pre-Migration Validation Approach

### 1. Visual Comparison (FR-014)

Verify recovered assets match originals in quality, format, and visual fidelity.

**What to Compare**:

- Recovered asset vs. Original website screenshot or render
- Recovered asset vs. Original Figma file
- Multiple format variants (original + derivatives)

**Test Cases**:

| Asset Type | Comparison Method | Pass Criteria | Severity if Fail |
|---|---|---|---|
| **SVG Vector Logo** | Original Figma file vs. Figma Make recovered SVG | Paths intact, no distortion, colour/stroke preserved | Critical |
| **PNG Web Export** | Website screenshot vs. Recovered PNG | Pixel dimensions match, no visual degradation, colour accuracy | High |
| **Print-Quality TIFF** | Original archive scan vs. Recovered TIFF | Resolution ≥300 DPI, colour space (RGB/CMYK) preserved, no compression artefacts | Critical if print MVP |
| **Multi-Format Variant** | Original vs. all format variants (e.g. SVG + PNG + PDF) | Each variant matches intent, no unintended format conversion | High |
| **Colour-Critical Asset** | Side-by-side RGB vs CMYK renderings | Colour shift within acceptable tolerance; ICC profile correct | High if print |

**Procedure**:

1. Download recovered asset from catalogue storage

1. Open original asset (Figma file or archived source)

1. Place side-by-side or use diff tool (e.g., image diff, SVG diff)

1. Check for:

   - Dimensional accuracy (width, height, aspect ratio)
   - Colour fidelity (RGB vs. CMYK if applicable)
   - Vector distortion (for SVG/EPS)
   - Text preservation (fonts, kerning)
   - Metadata (EXIF, colour profiles)
1. Record finding in ValidationResult (see data-model.md § ValidationResult)

   - `status`: "pass" | "fail" | "partial" | "unverifiable"
   - `severity`: "critical" | "high" | "low"
   - `details`: Specific finding (e.g. "slight colour shift in CMYK conversion; acceptable")

---

### 2. Broken-Reference Detection (FR-014)

Verify that assets referenced in live website and internal documentation point
to valid recovered asset IDs.

**What to Check**:

- Old asset paths (e.g. `/assets/hero.png`) → Map to new recovered asset IDs
- Internal documentation links (wiki, README, design files)
- Website code (HTML, CSS, CMS records)

**Test Cases**:

| Context | Old Reference | Recovery Action | Validation Pass Criterion |
|---|---|---|---|
| **Website HTML** | `<img src="/assets/old-hero.png">` | Map to new asset ID (e.g. `asset*figma*hero_001`) | New reference exists and asset is recovered |
| **Figma File** | Placed image on design page | Replace with recovered asset from catalogue | Reference resolves to recovered asset |
| **Markdown Docs** | `![Alt](../assets/diagram.png)` | Map to catalogue asset ID | Reference is valid in final catalogue |
| **CMS Media Library** | Old media ID (e.g. attachment #123) | Map to new asset ID | New ID resolves without 404 |
| **CSS Background Image** | `background-image: url(/assets/bg.jpg)` | Map to new asset ID | Reference resolves post-migration |

**Procedure**:

1. Generate reference map (old path → new asset ID) from current website

1. For each old reference:
   a. Check if corresponding recovered asset exists
   b. Verify asset recovery status is "recovered" or "partial_recovery"
   c. Test resolution of new reference (does it return valid asset?)

1. Flag any references with no corresponding recovered asset:

   - `severity`: "critical" (website will show 404)
   - `status`: "fail"
   - `details`: "Old reference `/assets/missing-img.png` has no recovered asset"
1. Record findings in ValidationResult

---

### 3. Metadata Completeness (FR-015)

Verify all required catalogue fields are populated or marked as
unknown/unrecoverable (non-invention rule per FR-008).

**Required Fields** (from catalogue-schema.json):

- `asset*id`, `original*or*derivative`, `provenance`, `format`, `dimensions`, `print*suitable`, `recovery*status`, `recovery*method`, `created*at`, `updated*at`

**Recommended Fields** (should be populated or marked unknown):

- `alt*text`, `caption`, `credits`, `rights*notes`, `usages`

**Test Cases**:

| Field | Required? | Pass Criteria | Fail Example |
|---|---|---|---|
| `asset*id` | **Yes** | Non-empty, unique, valid format | `asset*id` is null or duplicated |
| `provenance` | **Yes** | Explicit source (never blank); mark "unknown" if unverifiable | `provenance` says "unknown" but no reasoning in recovery_notes |
| `format` | **Yes** | ≥1 format; valid enum (PNG, SVG, etc.) | `format` is empty array or invalid |
| `dimensions` | **Yes** | Numeric width/height with unit, or null+note; include DPI for print | `dimensions` missing and `print_suitable` = true |
| `print*suitable` | **Yes** | Boolean or null (unknown); if true, `print*notes` explains | `print_suitable` missing (not even null) |
| `recovery*status` | **Yes** | One of: recovered, partial*recovery, manual*export*required, unrecoverable | `recovery_status` is arbitrary string |
| `alt*text` | **No** | String, "unknown", or null; max 250 chars; never fabricated | `alt*text` is fabricated placeholder ("TODO alt text") |
| `credits` | **No** | Attribution, "unknown", or null; never fabricated | `credits` is blank (should be "unknown" if unverified) |
| `rights*notes` | **No** | Licensing/restrictions, "unknown", or null; never fabricated | `rights*notes` is blank (should be "unknown") |

**Procedure**:

1. For each recovered asset, retrieve catalogue record

1. For each required field:
a. Check field is populated OR explicitly null per schema (dimensions,
print_suitable may be null if unknown)
   b. Verify value is plausible (matches data type, enum, max length)
c. For "unknown"/"unrecoverable" string marks, confirm there is a reason in
recovery_notes

1. For each recommended field:
   a. Check field is populated, marked "unknown", or explicitly null
b. If value appears fabricated or inconsistent, flag as violation of FR-008
(non-invention)

1. Record findings:

   - `check*type`: "metadata*completeness"
   - `status`: "pass" (all required fields valid) | "fail" (required field missing/invalid) | "partial" (recommended fields missing but recoverable)
   - `severity`: "critical" if required field missing; "high" if recommended missing; "low" if just formatting

---

### 4. Format Validation (FR-014)

Verify file format integrity and compatibility.

**Test Cases**:

| Format | Validation Check | Pass Criterion | Severity |
|---|---|---|---|
| **SVG** | Parse XML; validate viewBox, path elements; check for embedded fonts | Parses without error; viewBox present; fonts embedded or accessible | High |
| **PNG** | Verify PNG header; check dimensions; validate colour space (RGB/Indexed) | File opens in image viewer; dimensions ≥200×200 px; colour space matches metadata | High |
| **PDF** | Verify PDF header; check embedded fonts and images; validate page count | File opens in PDF reader; fonts subset or embedded; images render | Critical if print |
| **JPEG** | Check JPEG markers; validate metadata (EXIF); check for corruption | Opens without error; EXIF preserved (if present); no visual artefacts | High |
| **TIFF** | Verify TIFF header; check DPI metadata; validate colour space (RGB/CMYK) | Opens in image editor; DPI ≥300 if print; colour profile preserved | Critical if print |

**Procedure**:

1. For each recovered asset, download file

1. Run format validator (file utility, ImageMagick identify, PDF parser, etc.)

1. Check for:

   - Valid file header signature
   - Declared vs. actual dimensions match
   - Metadata (EXIF, colour profile) intact
   - Embedded resources (fonts, images) present
1. Record findings:

   - `check*type`: "format*validation"
   - `status`: "pass" (format valid) | "fail" (format corrupted or incompatible)
   - `severity`: "critical" if file is unreadable; "high" if metadata lost; "low" if minor issue

---

## Validation Workflow

### Phase 1: Pre-Migration Audit

**Participants**: Content team, technical lead, designer (if print-quality check
needed)

**Input**: 12+ pilot recovered assets from TOA-280 / TOA-282

**Steps**:

1. **Visual Comparison Pass**

   - Compare all pilot assets against originals (Figma, website screenshots, archives)
   - Flag any degraded or incorrect assets
   - Document findings in validation report

1. **Reference Map Generation**

   - Identify all old asset paths in website code, CMS, documentation
   - Create mapping table (old path → new recovered asset ID)
   - Verify each old reference has a recovered asset counterpart

1. **Broken-Reference Detection Pass**

   - Test each reference mapping
   - Identify any unrecovered assets that will break on migration
   - Flag for manual recovery attempt or content deprecation

1. **Metadata Completeness Check**

   - Audit all recovered assets against catalogue schema
   - Flag missing or invalid fields
   - Verify non-invention rule (no fabricated credits, rights, provenance)

1. **Format Validation Pass**

   - Run format validators on all recovered assets
   - Flag corrupted or incompatible files
   - For print assets, verify DPI and colour space

1. **Validation Report**

   - Summarise findings by severity (critical, high, low)
   - List blocking issues (critical) that must resolve before migration
   - List advisory issues (high/low) that can resolve post-launch if needed
   - Calculate completion score: (assets passed / total assets) × 100%

---

### Phase 2: Remediation

**For Critical Findings**:

- Attempt manual recovery (TOA-8 scope)
- Re-export from Figma with corrected settings
- Verify fix with visual comparison
- Update catalogue record

**For High Findings**:

- Attempt to populate missing metadata from external sources
- For missing credits/rights, mark "unknown" (non-invention rule)
- Update catalogue with verified fields

**For Low Findings**:

- Log for post-launch resolution
- May be deferred if migration timeline is tight

---

### Phase 3: Sign-Off

**Gate**: All critical findings resolved; high findings documented with
remediation plan; validation report signed off

---

## Operational Runbook

### Common Asset Management Tasks

#### Task 1: Add a New Asset to Catalogue

**Scenario**: New asset created post-launch (e.g. updated logo, new article
image)

**Steps**:

1. **Prepare Asset**

   - Save in required formats (PNG, SVG if vector; PDF if print)
   - Verify resolution ≥72 DPI for web, 300 DPI for print
   - Confirm colour space (RGB for web; RGB or CMYK for print)

1. **Create Catalogue Record**

   - Generate unique `asset*id` (format: `asset*<type>*<description>*<date>`)
   - Populate required fields:
     - `asset_id`: Unique stable identifier
     - `original*or*derivative`: "original" (first entry) or "derivative"
     - `provenance`: Where asset came from (e.g., "Created in Figma 2026-10-20 by Ash Shaw")
     - `format`: Array of formats (e.g., ["SVG", "PNG"])
     - `dimensions`: {width, height, unit} or null if unknown
     - `print_suitable`: true/false/null
     - `recovery_status`: "recovered"
     - `recovery*method`: "manual*export" or source
     - `created_at`: ISO 8601 timestamp
     - `updated_at`: ISO 8601 timestamp
   - Populate recommended fields:
     - `alt_text`: Accessibility description (max 125 chars)
     - `caption`: Human-readable label
     - `credits`: Creator/source attribution
     - `rights_notes`: Licensing or usage restrictions
   - Mark unknown fields appropriately:
     - String fields (provenance, alt*text, credits, rights*notes): use "unknown" or "unrecoverable" string
     - Non-string fields (dimensions, print_suitable): use null
     - Never leave fields blank

1. **Upload to Storage**

   - Upload file(s) to provider (per TOA-284 provider choice)
   - Obtain provider's asset ID or URL
   - Record in catalogue under provider_ref (if applicable)

1. **Validate**

   - Visual comparison: Review against original (if derivative)
   - Format validation: Verify file integrity
   - Metadata check: Confirm all required fields present
   - Reference test: If asset is used on website, test retrieval

1. **Publish**

   - Merge catalogue record to version control (if Git-stored)
   - Notify team of new asset availability
   - Update any referencing pages/docs

---

#### Task 2: Update Asset Metadata

**Scenario**: Asset credits/rights discovered post-recovery; missing alt text
needs to be added

**Steps**:

1. Locate catalogue record by `asset_id`

1. Update field (e.g., `credits`, `rights*notes`, `alt*text`)

1. Bump `updated_at` timestamp

1. For materials in production, test that update doesn't break references

1. Commit changes; notify team if change is material (e.g., rights update)

---

#### Task 3: Tag and Search Assets

**Scenario**: Content team needs to find all "hero" assets for website homepage
refresh

**Steps**:

1. **Via Storage Provider UI** (if visual editing available):

   - Log into provider's visual editing UI
   - Use search/filter by tags, metadata fields
   - Create collection or saved search for "hero" assets

1. **Via Catalogue** (if Git-stored):

   - Query catalogue JSON by `usages` field
   - Filter by `usages` = "website hero"
   - Retrieve asset IDs and provider references

1. **Batch Operations**:

   - Use provider's API (if available) to bulk-tag assets
   - Example: Tag all SVG logos with `tag:logo`, `category:branding`

---

#### Task 4: Retire or Deprecate Asset

**Scenario**: Old logo design no longer in use; new version is current

**Steps**:

1. Update original asset's catalogue record:

   - Add `status` field (if tracking): "deprecated" | "current"
   - Update `rights_notes` to note deprecation date
   - Link to replacement via AssetRelationship (type: "replaced_by")

1. Create new asset record for replacement:

   - `asset*id`: New unique ID (e.g., `asset*logo*v3*2026`)
   - `original*or*derivative`: Depends on source
   - Link back to old asset via AssetRelationship

1. In website code, update references:

   - Old reference: `/assets/logo-old.svg` → `/assets/logo-new.svg`
   - Or use redirect if provider supports it

1. Validate:

   - Test new references on website
   - Verify old references don't break or trigger 404s (if not deprecated yet)

---

#### Task 5: Recover from Backup

**Scenario**: Asset accidentally deleted; need to restore from backup

**Steps**:

1. Confirm backup/versioning available in storage provider

   - GitHub (LFS): Check git history, recover from earlier commit
   - Cloudinary: Check deletion log, restore from trash/backup
   - Other provider: Check retention policy and recovery procedures

1. Restore asset to provider storage

1. Update catalogue `updated_at` timestamp (mark recovery event)

1. Validate restored file:

   - Format validation (file integrity)
   - Visual comparison (matches pre-deletion state)
1. Notify team of recovery

---

#### Task 6: Handle Metadata Dispute (Rights/Credits)

**Scenario**: External party claims copyright or requests credit change

**Escalation Path**:

1. **Triage** (Content Lead):

   - Confirm claim validity (is requester authorized?)
   - Review current `credits` and `rights_notes` in catalogue
   - Assess urgency (immediate takedown risk vs. administrative correction)

1. **Investigate** (Technical Lead):

   - Trace asset's provenance (where did it originate?)
   - Check Figma file, archive, external references for credit/rights info
   - Determine if catalogue record is incorrect or claim is unfounded

1. **Resolve** (Project Owner Decision):

   - If credit missing or incorrect: Update catalogue, notify team, publish correction
   - If rights dispute: Escalate per project governance; may require asset removal pending resolution
   - Document decision in `rights_notes` or log

1. **Implement**:

   - Update website references if needed (remove, replace, or add credit)
   - Update catalogue; bump version if public-facing
   - Notify original requester of resolution

1. **Document**:

   - Add entry to rights/credits audit log
   - Update catalogue with resolution outcome

---

## Validation Metrics

**Completion Score**: (Assets passed all validations / Total assets) × 100%

**Target Thresholds**:

- ✅ Green (≥95%): Ready for migration to production
- 🟡 Yellow (80–94%): Migration permitted with known issues; plan remediation
- 🔴 Red (<80%): Too many failures; resolve blocking issues before migration

**Critical Blockers** (must resolve):

- Broken references in live website (404 risk)
- Corrupted or unreadable files
- Missing required catalogue fields (asset_id, provenance, format)
- Print assets without DPI/colour-space validation

**Tracking**:

- Validation run ID (e.g., "validation*run*20261017_pilot")
- Run date, run count (attempt #1, #2 if retesting)
- Assets passed/failed per check type
- Remediation actions taken

---

## Traceability

**Functional Requirements**:

- FR-014 (Validation workflow) → Visual comparison, broken-reference detection, metadata checks
- FR-015 (Metadata completeness) → Metadata completeness check; non-invention rule enforced
- FR-016 (Operational runbook) → Common task procedures (add, update, tag, retire, recover, dispute)
- FR-017 (Maintenance procedures) → Escalation paths and ongoing operational practices

**Related Linear Issues**:

- TOA-279 → This document; validation approach definition
- TOA-282 → Performs validation (using this checklist)
- TOA-286 → Operational handover and training (uses runbook section)

---

**Version**: 1.0-phase1 | **Phase**: 1 Design (US4) | **Status**: Ready for
pilot validation (TOA-282)
