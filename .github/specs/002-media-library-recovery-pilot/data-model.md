# Data Model: Media Library Recovery Pilot

**Version**: 1.0.0 | **Date**: 2026-10-18

---

## Overview

Phase 1b uses three primary data structures:
1. **Extraction Manifest** (output by T012): Per-asset extraction metadata (recovery outcome, file path, extraction time)
2. **Validation Report** (output by T013): Per-asset validation results (dimensions, file integrity, status)
3. **FULL-CATALOGUE Updates** (written by T014): Recovery status and timestamps for catalogue integration

---

## Entity: Recovery Status

**Definition**: State of an asset's recovery in Phase 1b pilot.

**Valid Values**:
- `"recovered"` — Asset successfully exported directly from Figma Make. File valid (not corrupted), dimensions match catalogue. **Counts toward ≥80% target.**
- `"fallback"` — Asset not found in Figma Make or Figma API export failed. Replaced with Unsplash reference from existing PortfolioImage.tsx mappings. **Does NOT count toward 80% target.**
- `"failed"` — Asset could not be recovered (both Figma export and Unsplash fallback unavailable or inappropriate). Requires manual intervention in Phase 2. **Does NOT count toward 80% target.**

**Transitions**:
- `"recovered"` ← (T012: Figma export successful) ← (T013: dimensions + integrity validated)
- `"fallback"` ← (T012: Figma export failed after 4 retries) → (T014: FULL-CATALOGUE recorded for Phase 2 review)
- `"failed"` ← (T012: No fallback available) → (T014: manual_review_needed flag set)

---

## Entity: Extraction Manifest

**File**: `recovered-assets/extraction-manifest.json`

**Purpose**: Tracks extraction outcome and metadata for all sampled assets.

**Schema**:

```json
{
  "extraction_date": "2026-10-18T14:32:00Z",
  "total_assets": 12,
  "success": 10,
  "fallback": 2,
  "failed": 0,
  "assets": [
    {
      "catalogueId": "toa-asset-001",
      "figmaAssetId": "f4a28f747d49fc9d37311b17f513b62e2b95a73e",
      "originalFilename": "heroImage1.png",
      "category": "hero",
      "recoveryStatus": "recovered",
      "exportedPath": "recovered-assets/hero/heroImage1.png",
      "fileSize": 234567,
      "dimensions": {
        "width": 1200,
        "height": 900
      },
      "extractionTime_ms": 2345,
      "timestamp": "2026-10-18T14:34:56Z",
      "notes": ""
    },
    {
      "catalogueId": "toa-asset-042",
      "figmaAssetId": "378acbf4a7518ca6c40b44540bd7a121a91375fe",
      "originalFilename": "jungleImage1.png",
      "category": "portfolio/jungle-festival",
      "recoveryStatus": "fallback",
      "exportedPath": null,
      "fallbackSource": "unsplash:portfolio-jungle-festival-1",
      "extractionTime_ms": 0,
      "timestamp": "2026-10-18T14:35:12Z",
      "notes": "Asset not found in Make project after 4 API retries (429 rate limit); Unsplash fallback applied"
    }
  ]
}
```

**Field Definitions**:

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| extraction_date | ISO 8601 timestamp | Yes | Start time of extraction run |
| total_assets | integer | Yes | Count of assets attempted |
| success | integer | Yes | Count with recoveryStatus="recovered" |
| fallback | integer | Yes | Count with recoveryStatus="fallback" |
| failed | integer | Yes | Count with recoveryStatus="failed" |
| assets | array | Yes | Per-asset extraction records |
| assets[].catalogueId | string | Yes | Cross-reference to FULL-CATALOGUE.json assetId |
| assets[].figmaAssetId | string | Yes | 40-character Figma node hash |
| assets[].originalFilename | string | Yes | Asset name (e.g., heroImage1.png) |
| assets[].category | string | Yes | Asset category (hero, portfolio/{series}, unmapped, etc.) |
| assets[].recoveryStatus | enum | Yes | One of: recovered, fallback, failed |
| assets[].exportedPath | string (or null) | Yes | File path relative to project root (null if fallback/failed) |
| assets[].fallbackSource | string (or null) | Yes | Unsplash ID for fallback assets; null otherwise |
| assets[].fileSize | integer | Yes | File size in bytes (0 if fallback/failed) |
| assets[].dimensions | object | Yes | { width, height } in pixels; from PNG header or Figma metadata |
| assets[].extractionTime_ms | integer | Yes | Wall-clock time in milliseconds (0 if fallback/failed) |
| assets[].timestamp | ISO 8601 timestamp | Yes | Extraction completion time for this asset |
| assets[].notes | string | Yes | Error message, recovery decision, or empty string |

**Validation Rules**:
- `success + fallback + failed = total_assets`
- All `recoveryStatus="recovered"` assets have `exportedPath` (not null) and `fileSize > 0`
- All `recoveryStatus="fallback"` assets have `fallbackSource` (not null)
- All `recoveryStatus="failed"` assets have notes describing why fallback was unavailable

---

## Entity: Validation Report

**File**: `recovered-assets/validation-report.json`

**Purpose**: Validates exported files match catalogue dimensions and integrity.

**Schema**:

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
      "fileSize": 234567,
      "dimensions": {
        "width": 1200,
        "height": 900
      },
      "catalogueDimensions": {
        "width": 1200,
        "height": 900
      },
      "notes": ""
    },
    {
      "catalogueId": "toa-asset-005",
      "exportedPath": "recovered-assets/portfolio/jungle-festival/jungleImage2.png",
      "status": "warning",
      "fileSize": 156789,
      "dimensions": {
        "width": 800,
        "height": 600
      },
      "catalogueDimensions": {
        "width": 1024,
        "height": 768
      },
      "notes": "Dimension mismatch: expected 1024x768, got 800x600 (scaled export?). File valid; may need upscaling in Phase 2."
    }
  ]
}
```

**Field Definitions**:

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| validation_date | ISO 8601 timestamp | Yes | Start time of validation run |
| total_assets | integer | Yes | Assets validated (only recovered assets, not fallback) |
| valid | integer | Yes | Count with status="valid" |
| warnings | integer | Yes | Count with status="warning" (mismatch, etc.) |
| failed | integer | Yes | Count with status="failed" (corrupted, unreadable) |
| assets | array | Yes | Per-asset validation records |
| assets[].catalogueId | string | Yes | Cross-reference to FULL-CATALOGUE.json |
| assets[].exportedPath | string | Yes | File path to recovered PNG |
| assets[].status | enum | Yes | One of: valid, warning, failed |
| assets[].fileSize | integer | Yes | File size in bytes |
| assets[].dimensions | object | Yes | { width, height } parsed from PNG header |
| assets[].catalogueDimensions | object | Yes | { width, height } from FULL-CATALOGUE.json |
| assets[].notes | string | Yes | Mismatch details, corruption notes, or empty string |

**Validation Rules**:
- `valid + warnings + failed = total_assets`
- File size must be >1KB and <10MB
- PNG magic bytes `89 50 4E 47` must be present
- Dimensions extracted from IHDR chunk must match catalogue (or noted as warning)

---

## Entity: Catalogue Recovery Status (FULL-CATALOGUE.json updates)

**File**: `.github/reports/toa-media-library/FULL-CATALOGUE.json`

**Fields Added by T014** (per sampled asset):

```json
{
  "assetId": "toa-asset-001",
  "figmaAssetId": "f4a28f747d49fc9d37311b17f513b62e2b95a73e",
  "name": "heroImage1",
  "category": "hero",
  "...": "[existing fields from Phase 1a catalogue]",
  "recoveryStatus": "recovered",
  "recoveryNotes": "Extracted from Figma Make on 2026-10-18, dimensions 1200x900, file size 234KB, extraction time 2345ms",
  "extractedAt": "2026-10-18T14:34:56Z",
  "validatedAt": "2026-10-18T15:45:00Z"
}
```

**Field Definitions** (new to Phase 1b):

| Field | Type | Valid Values | Description |
|-------|------|--------------|-------------|
| recoveryStatus | enum | recovered, fallback, pending | Phase 1b recovery outcome; pending = not sampled |
| recoveryNotes | string | free text | Extraction details, fallback reason, or manual review notes |
| extractedAt | ISO 8601 timestamp | — | T012 extraction completion time |
| validatedAt | ISO 8601 timestamp | — | T013 validation completion time |

**Mapping from Extraction Manifest** (T014 logic):
- Manifest `recoveryStatus="recovered"` → Catalogue `recoveryStatus="recovered"` + set timestamps
- Manifest `recoveryStatus="fallback"` → Catalogue `recoveryStatus="fallback"` + set fallback reason
- Manifest `recoveryStatus="failed"` → Catalogue `recoveryStatus="pending"` + flag for manual Phase 2 review

---

## Relationships

```
FULL-CATALOGUE.json (Phase 1a)
    ↓ (select 10-15 assets)
pilot-selection.json (T010 output)
    ↓ (extract via Figma API)
recovered-assets/*.png + extraction-manifest.json (T012 output)
    ↓ (validate dimensions + integrity)
validation-report.json (T013 output)
    ↓ (record status + timestamps)
FULL-CATALOGUE.json (updated by T014)
    ↓ (synthesize findings + metrics)
RECOVERY-PILOT-REPORT.md (T015 output)
```

---

## Validation Invariants

1. **Recovery Status Consistency**: All sampled assets have a recoveryStatus in extraction-manifest.json; status propagates to FULL-CATALOGUE.json by T014.

2. **Dimension Matching**: Recovered assets validated in T013; dimension mismatches logged as warnings (not blockers).

3. **File Integrity**: All recovered PNG files must have valid magic bytes and non-zero size.

4. **No Data Loss**: Extraction manifest preserves all error notes; validation report preserves all discrepancies for Phase 2 planning.

---

## Phase 2 Continuity

Phase 2 (TOA-285) extends this model:
- Uses same extraction-manifest schema (no breaking changes)
- Scales to 56 total assets
- Refines per-asset metrics (must_measure_in_phase_1b)
- Merges results into phase-wide recovery report
