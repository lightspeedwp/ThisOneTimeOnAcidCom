---
title: Data Model — TOA Media Library
author: Claude
date: 2026-10-17
phase: 1 Design
user_stories: [US1, US2]
---

# Data Model: TOA Media Library

**Purpose**: Define the entity schemas, relationships and validation rules that govern asset recovery, cataloguing, storage provider evaluation and validation workflows.

**Input**: Specification from [spec.md](spec.md), research decisions from [research.md](research.md)

## Overview

This document defines four core entities (Asset, AssetRelationship, StorageProvider, ValidationResult) with complete attribute lists, validation rules, enums, and references to functional requirements (FR-###).

---

## Overview

This document defines four core entities:
1. **Asset** — A single recoverable media item (image, vector, design file)
2. **AssetRelationship** — Relationships between assets (original ↔ derivative, asset ↔ usage)
3. **StorageProvider** — Evaluation criteria for candidate storage and editing platforms
4. **ValidationResult** — Findings from validation runs (visual comparison, metadata, references)

Each entity includes:
- Complete attribute list with types and constraints
- Validation rules (including the non-invention rule: do not fabricate missing metadata)
- Enum definitions for state and type fields
- Reference mappings to functional requirements (FR-###)

---

## Core Entities

### 1. Asset

Represents a single recoverable media item (image, vector, design file, branded material).

**Primary Key**: `asset_id` (unique, stable, independent of storage provider)

**Attributes**:

| Attribute | Type | Required? | Constraints | Notes | FR-Ref |
|---|---|---|---|---|---|
| `asset_id` | String | **Required** | Non-empty, unique, no provider-specific paths | Stable identifier; independent of storage location | FR-002 |
| `original_or_derivative` | Enum | **Required** | "original" \| "derivative" \| "variant" | Distinguishes originals from rendered/scaled copies | FR-003 |
| `provenance` | String | **Required** | Marked "unknown" if source cannot be verified | e.g. "Figma file X, page Y, exported 2026-10-17"; "manual upload by user Z"; "archive scan" | FR-001 |
| `format` | Enum (Array) | **Required** | PNG, SVG, JPEG, PDF, GIF, WebP, others | Primary and secondary formats (e.g. original SVG + exported PNG) | FR-004, FR-006 |
| `dimensions` | Object or null | **Required** | `{ width, height, unit }` or null if unknown | Unit: "px" (pixels), "in" (inches for print), "mm" (millimetres) | FR-004 |
| `print_suitable` | Boolean or null | **Required** | true \| false \| null (unknown) | Assesses print suitability; true means asset meets 300 DPI minimum, RGB/CMYK colour space, and supported format (PNG/PDF/TIFF). null if unknown. | FR-004 |
| `print_notes` | String | Optional | Freeform | Resolution, colour space (RGB/CMYK), format constraints, etc. | FR-004 |
| `usages` | Array<String> | Optional | Freeform contexts | e.g. "website hero", "book chapter 3", "social media thumbnail", "email header" | FR-006 |
| `alt_text` | String | Optional | Marked "unknown" or "unrecoverable" if not found | Accessibility description; max 125 characters recommended | FR-006 |
| `caption` | String | Optional | Marked "unknown" if not available | Human-readable label; max 255 characters | FR-006 |
| `credits` | String | Optional | Marked "unknown" or "unrecoverable"; never fabricated | Creator, artist, photographer, or source attribution | FR-006, FR-008 |
| `rights_notes` | String | Optional | Marked "unknown" or "unrecoverable"; never fabricated | Licencing, usage restrictions, copyright, or verification status | FR-006, FR-008 |
| `recovery_status` | Enum | **Required** | "not_attempted" \| "recovered" \| "partial_recovery" \| "manual_export_required" \| "unrecoverable" | See Recovery Status Enum | FR-005, FR-015 |
| `recovery_notes` | String | Optional | Freeform | Reason for partial or failed recovery; impact on catalogue/validation | FR-005 |
| `recovery_method` | Enum or null | Conditional | null when `recovery_status` is "not_attempted"; "figma_extraction" \| "manual_export" \| "archive_scan" \| "other" when recovery has been attempted | How asset was obtained; unset before recovery begins | FR-001, FR-005 |
| `created_at` | ISO 8601 Timestamp | **Required** | Automatic; time when asset was catalogued | Not the asset's creation date, but when it was recovered | FR-006 |
| `updated_at` | ISO 8601 Timestamp | **Required** | Automatic; time of last modification | Updates when metadata is verified or corrected | FR-006 |

**Enums**:

#### original_or_derivative
```
"original"    – Primary asset from source (Figma, archive, manual export)
"derivative"  – Rendered or exported version of original (e.g., PNG export from SVG)
"variant"     – Alternative version (scaled, cropped, alternative colour mode, etc.)
```

#### format
Supported formats (non-exhaustive):
- **Vector**: SVG, EPS, AI
- **Raster**: PNG, JPEG, WebP, GIF, BMP
- **Print**: PDF, TIFF (with DPI/colour space metadata)
- **Other**: WEBP, HEIC, MP4 (if applicable)

#### recovery_status
```
"recovered"               – Successfully recovered; metadata complete or marked unknown
"partial_recovery"        – Recovered but with missing/degraded metadata or dimensions
"manual_export_required"  – Identified but requires manual export (Figma Make limitation)
"unrecoverable"           – Asset cannot be recovered; reason documented in recovery_notes
```

#### recovery_method
```
"figma_extraction"  – Recovered via Figma Make API (TOA-280 pilot)
"manual_export"     – Exported manually from Figma or third-party tool
"archive_scan"      – Recovered from archive or version-control history
"other"             – Other source (specify in provenance)
```

**Validation Rules**:

1. **Uniqueness**: `asset_id` MUST be globally unique within the catalogue. No two assets can share the same ID.
2. **Non-Invention Rule** (FR-008): 
   - Missing fields MUST be marked explicitly as:
     - `null` (field not applicable)
     - `"unknown"` (not verified; source is unclear)
     - `"unrecoverable"` (attempted but cannot be found)
   - NEVER invent, assume or fabricate missing `credits`, `rights_notes`, `alt_text`, or provenance.
   - If unsure, mark as `"unknown"` and flag in validation.

3. **Relationship Integrity** (FR-007): 
   - Assets with `original_or_derivative` = `"derivative"` or `"variant"` MUST have a corresponding `AssetRelationship` entry pointing to the original (see AssetRelationship below).
   - Relationships MUST NOT be circular (A → B → A).

4. **Format Consistency**:
   - If `format` includes print formats (PDF, TIFF), `print_suitable` SHOULD be true or explicitly marked unknown/false with explanation.
   - If `print_suitable` = true, `dimensions` MUST be a non-null object with numeric `dpi` ≥300. If suitability is unknown, preserve `print_suitable` = null; `dimensions` may be null when unknown.

5. **Recovery Status Consistency**:
   - `recovery_status` = `"not_attempted"` means asset is identified but not yet recovered; `recovery_method` MUST be null.
   - `recovery_status` = `"recovered"` implies all required fields (`asset_id`, `format`, `dimensions`, `provenance`) are complete; `recovery_method` MUST be set.
   - `recovery_status` = `"partial_recovery"` means some metadata is missing but asset is usable; `recovery_method` MUST be set.
   - `recovery_status` = `"unrecoverable"` MUST have `recovery_notes` explaining why; `recovery_method` may be null if no attempt was made.

---

### 2. AssetRelationship

Captures relationships between assets (original ↔ derivative, asset ↔ published usage contexts).

**Composite Key**: `(source_asset_id, target_type, target_asset_id, target_reference, relationship_type)` — must be unique. When `target_type="asset"`, use `target_asset_id`; when `target_type="context"`, use `target_reference`.

**Attributes**:

| Attribute | Type | Required? | Constraints | Notes | FR-Ref |
|---|---|---|---|---|---|
| `source_asset_id` | String (FK) | **Required** | Must exist in Asset table | Asset that is the origin or parent | FR-007 |
| `target_type` | Enum | **Required** | "asset" \| "context" | Whether target is an Asset or a usage context (e.g. website page) | FR-007 |
| `target_asset_id` | String (FK) | Conditional | Required if `target_type="asset"`; must exist in Asset table; cannot equal source_asset_id | Asset that derives from or relates to the source | FR-007 |
| `target_reference` | String | Conditional | Required if `target_type="context"`; e.g. URL, page ID, publication identifier | Reference for non-asset targets (e.g. website page URL) | FR-007 |
| `relationship_type` | Enum | **Required** | "derived_from" \| "variant_of" \| "used_in" \| "replaced_by" | Type of relationship; see enum | FR-007 |
| `notes` | String | Optional | Freeform; max 512 characters | e.g. "scaled 50% for web", "colour mode changed RGB→CMYK", "superseded by redesign v2" | FR-007 |
| `verified` | Boolean | Optional | true \| false | Whether relationship has been validated or is inferred | FR-007 |
| `created_at` | ISO 8601 Timestamp | **Required** | Automatic | When relationship was recorded | — |
| `updated_at` | ISO 8601 Timestamp | **Required** | Automatic | When relationship was last modified | — |

**Enums**:

#### relationship_type
```
"derived_from"   – target derives from source (e.g., source = SVG original, target = PNG export)
"variant_of"     – target is alternative version (e.g., source = colour, target = greyscale)
"used_in"        – source is used/published in target context (e.g., source = logo, target = website page)
"replaced_by"    – source has been superseded by target (e.g., v1 image replaced by v2)
```

**Validation Rules**:

1. **Referential Integrity**: 
   - Both `source_asset_id` and `target_asset_id` MUST reference existing Asset records.
   - Deleting an Asset MUST cascade-delete its relationships.

2. **Non-Circular Relationships** (FR-007):
   - No path of relationships can form a cycle (A → B → C → A is invalid).
   - Validation: Acyclic check on entire relationship graph.

3. **Consistency with Asset.original_or_derivative**:
   - If Asset.`original_or_derivative` = `"derivative"` or `"variant"`, there MUST be at least one AssetRelationship where:
     - `target_asset_id` = this Asset's ID
     - `relationship_type` ∈ {`"derived_from"`, `"variant_of"`}
   - If Asset.`original_or_derivative` = `"original"`, it SHOULD NOT be a target of `"derived_from"` or `"variant_of"` relationships (it should be a source).

4. **Relationship Cardinality**:
   - One source asset can have multiple derived/variant targets (1:many).
   - One target can derive from multiple sources (many:1) — e.g., composite image from multiple sources.

---

### 3. StorageProvider

Represents candidate storage platforms and their evaluation against defined criteria.

**Primary Key**: `name` (provider name; unique)

**Attributes**:

| Attribute | Type | Required? | Constraints | Notes | FR-Ref |
|---|---|---|---|---|---|
| `name` | String | **Required** | Non-empty; unique | e.g. "GitHub + Netlify", "Cloudinary", "Amazon S3 + CloudFront" | FR-010 |
| `asset_limit` | String or Number | Optional | Freeform or numeric | e.g. "unlimited", "1000 files", "100 GB", "1 TB" | FR-010, FR-011 |
| `cost_model` | String | **Required** | Freeform; quoted from pricing page | e.g. "Free tier (5 GB)", "per-month subscription ($X)", "per-asset ($Y)", "tiered by usage" | FR-010, FR-011 |
| `formats_supported` | Array<String> | **Required** | List of file format enums | e.g. ["PNG", "JPEG", "SVG", "PDF"] | FR-010 |
| `max_file_size` | String | **Required** | e.g. "100 MB", "1 GB", "unlimited" | Maximum size of single asset upload | FR-010 |
| `api_available` | Boolean | **Required** | true \| false | Whether provider offers API for programmatic upload/retrieval | FR-010 |
| `api_url` | String | Optional | URL to API documentation | Link to provider's API docs (if available) | FR-010 |
| `visual_editing_ui` | Boolean | **Required** | true \| false | Whether provider offers visual editing/tagging interface | — |
| `visual_editing_notes` | String | Optional | Freeform | e.g. "web UI only", "native apps for Mac/Win", "basic crop/resize", "full design suite" | — |
| `batch_processing` | Boolean | **Required** | true \| false | Batch upload/export capability | FR-010 |
| `print_quality_support` | String | **Required** | Freeform; quoted from documentation | Supported formats for print (PDF, TIFF, etc.) and resolution limits | FR-013 |
| `concurrent_users` | String or Number | Optional | e.g. "1", "5", "unlimited", or "not specified" | Simultaneous editor limit | FR-011 |
| `integration_complexity` | Enum | Optional | "low" \| "medium" \| "high" \| "unknown" | Estimated effort to integrate with build/publish pipeline | FR-011 |
| `notes` | String | Optional | Freeform | Additional evaluation comments, caveats, or risk factors | — |
| `last_evaluated` | ISO 8601 Date | Optional | Date of most recent evaluation | — | FR-010 |
| `evaluation_status` | Enum | Optional | "pending" \| "in_progress" \| "complete" \| "rejected" | Track evaluation workflow state | FR-012 |

**Enums**:

#### integration_complexity
```
"low"      – Straightforward integration; existing build tools support it
"medium"   – Requires custom configuration or new build step
"high"     – Significant refactoring or new infrastructure needed
"unknown"  – Not yet evaluated
```

#### evaluation_status
```
"pending"     – Not yet evaluated
"in_progress" – Currently undergoing evaluation (TOA-276)
"complete"    – Evaluation finished; recommendation available
"rejected"    – Evaluated and deemed unsuitable
```

**Validation Rules**:

1. **Uniqueness**: `name` MUST be unique across all providers.

2. **Non-Invention Rule**: 
   - Cost, limits and features MUST be quoted from current pricing/documentation.
   - NEVER assume free-tier limits apply to production (FR-011).
   - If information is unavailable, mark as `"unknown"` or `"not specified"`.

3. **Consistency**:
   - If `api_available` = true, `api_url` SHOULD be populated (unless documentation URL is elsewhere).
   - If `visual_editing_ui` = true, `visual_editing_notes` SHOULD describe the offering.
   - If `print_quality_support` is needed (per Q2 resolution), provider MUST support print formats (PDF, TIFF) and document DPI/colour-space constraints.

---

### 4. ValidationResult

Captures findings from validation runs (visual comparison, broken-reference detection, metadata completeness, format validation).

**Primary Key**: `id` (auto-generated UUID or sequential)

**Attributes**:

| Attribute | Type | Required? | Constraints | Notes | FR-Ref |
|---|---|---|---|---|---|
| `id` | String (UUID or ID) | **Required** | Unique; auto-generated | Primary key for audit trail | — |
| `asset_id` | String (FK) | **Required** | Must exist in Asset table | Asset being validated | FR-014, FR-015 |
| `check_type` | Enum | **Required** | "visual_comparison" \| "broken_reference" \| "metadata_completeness" \| "format_validation" | Type of validation performed | FR-014, FR-015 |
| `status` | Enum | **Required** | "pass" \| "fail" \| "partial" \| "unverifiable" | Validation outcome | FR-014, FR-015 |
| `severity` | Enum | **Required** | "critical" \| "high" \| "low" | Impact of finding; gates on "critical" | FR-014 |
| `details` | String | **Required** | Freeform; descriptive | Specific finding; e.g. "visual degradation in JPEG conversion", "alt text missing", "broken reference to /assets/old-hero.png" | FR-014, FR-015 |
| `recovery_note` | String | Optional | Freeform | Impact on asset's recovery_status or next steps | FR-014 |
| `reference_evidence` | Array<String> | Optional | URLs or file paths | Links to original website, Figma, or repository for comparison | FR-014 |
| `run_date` | ISO 8601 Date | **Required** | Date validation was performed | — | FR-014 |
| `run_id` | String | Optional | UUID or label | Batch ID if part of larger validation run | — |
| `created_at` | ISO 8601 Timestamp | **Required** | Automatic | When result was recorded | — |

**Enums**:

#### check_type
```
"visual_comparison"         – Recovered asset vs. original website/Figma comparison
"broken_reference"          – Check if asset is referenced in live website; detect broken links
"metadata_completeness"     – Verify all required fields populated or marked unknown (FR-006, FR-008)
"format_validation"         – Verify format integrity, dimensions, DPI (for print)
```

#### status
```
"pass"         – Validation passed; no issues found
"fail"         – Validation failed; asset does not meet criteria
"partial"      – Validation passed with caveats; some fields missing but documented
"unverifiable" – Cannot validate (e.g., no original to compare against)
```

#### severity
```
"critical" – Blocks migration; must resolve before go-live (e.g., broken reference in live website)
"high"     – Should resolve before go-live; workaround available if needed (e.g., missing alt text; can be added post-launch)
"low"      – Nice to have; can be resolved post-launch (e.g., caption missing)
```

**Validation Rules**:

1. **Referential Integrity**: 
   - `asset_id` MUST reference an existing Asset record.

2. **Consistency**:
   - If `status` = `"fail"` and `severity` = `"critical"`, this asset BLOCKS migration.
   - If `status` = `"pass"`, `severity` SHOULD be `"low"` or omitted.
   - If `details` is empty, `status` SHOULD be `"unverifiable"`.

3. **Audit Trail**:
   - `run_id` SHOULD be populated for batch validation runs (e.g., all 56 assets validated in one pass).
   - `run_date` enables traceability (e.g., "validation run #1 on 2026-10-20").

---

## Cross-Entity Constraints

### Non-Invention Rule (FR-008)

Applies across all entities:
- **Asset**: Never fabricate `credits`, `rights_notes`, `alt_text` or `provenance`. Mark unknown data as `null`, `"unknown"`, or `"unrecoverable"`.
- **AssetRelationship**: Relationships inferred from data MUST be marked `verified = false`.
- **ValidationResult**: If metadata is missing, flag as `status = "fail"` or `"partial"`, not as `status = "pass"` with fabricated data.

### Print Suitability Assessment (FR-004, FR-013)

- **Asset.print_suitable**: Boolean or null (unknown), with optional `print_notes` detailing resolution, colour space, format compatibility.
- **Asset.format**: Must include only print formats (PNG, PDF, TIFF) if print_suitable = true.
- **StorageProvider.print_quality_support**: Provider must be evaluated for print-format support and DPI limits (Q2 resolution: 300 DPI minimum, RGB/CMYK, PDF/TIFF).

### Recovery Status Transitions

```
Initial State: not_attempted (asset identified but recovery not yet attempted)
              ↓
          [Attempt Recovery]
              ↓
      ┌─ recovered (complete metadata, ready to catalogue)
      │
      ├─ partial_recovery (some metadata missing but asset usable)
      │
      ├─ unrecoverable (recovery attempted and failed; recovery_notes required)
      │
      └─ manual_export_required (identified; requires manual effort)
```

Once in `recovered` or `partial_recovery`, assets proceed to validation.

---

## Schema Summary (Quick Reference)

### Asset Fields (Required)
- asset_id, original_or_derivative, provenance, format, dimensions, print_suitable, recovery_status, recovery_method, created_at, updated_at

### Asset Fields (Optional but Recommended)
- usages, alt_text, caption, credits, rights_notes, print_notes, recovery_notes

### AssetRelationship Fields (Required)
- source_asset_id, target_asset_id, relationship_type, created_at, updated_at

### StorageProvider Fields (Required)
- name, cost_model, formats_supported, max_file_size, api_available, visual_editing_ui, batch_processing, print_quality_support, evaluation_status

### ValidationResult Fields (Required)
- id, asset_id, check_type, status, severity, details, run_date

---

## Traceability

**Functional Requirements Covered**:
- FR-001 (Figma extraction) → Asset.recovery_method, Asset.provenance
- FR-002 (Stable IDs) → Asset.asset_id (constraint: provider-independent)
- FR-003 (Original vs. derivative) → Asset.original_or_derivative
- FR-004 (Print suitability) → Asset.print_suitable, Asset.print_notes, StorageProvider.print_quality_support
- FR-005 (Unrecoverable assets) → Asset.recovery_status, Asset.recovery_notes
- FR-006 (Metadata fields) → Asset attributes (all documented)
- FR-007 (Relationships) → AssetRelationship entity, Asset validation rule (non-circular)
- FR-008 (Non-invention) → Validation rule across all entities
- FR-010–011 (Provider evaluation) → StorageProvider entity, evaluation_status
- FR-013 (Print support per provider) → StorageProvider.print_quality_support
- FR-014–015 (Validation) → ValidationResult entity, check_type and status enums
- FR-018 (Scope boundary) → Data model defines catalogue structure only; implementation excluded

---

## Next Steps

1. **T016–T017**: Generate `contracts/catalogue-schema.json` from this data model (JSON Schema format with examples)
2. **T018**: Document field constraints quoted from spec.md to prevent implementation-time discretion
3. **T019**: Validate schema against 12 pilot recovered assets
4. **T020–T024**: Design provenance tracking and non-invention validation rules
5. **T025–T030**: Provider evaluation and validation checklist contracts

---

**Version**: 1.0-phase-1 | **Phase**: 1 Design (US1–US2) | **Status**: Ready for JSON Schema generation (T016–T019)
