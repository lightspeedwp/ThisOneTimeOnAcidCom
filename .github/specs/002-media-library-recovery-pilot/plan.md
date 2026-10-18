# Implementation Plan: Media Library Recovery Pilot (Phase 1b)

**Branch**: `task/media-library-recovery-phase1b` | **Date**: 2026-10-18 | **Spec**: `PHASE1B_RECOVERY_PROMPT.md`

**Input**: Phase 1b specification from `PHASE1B_RECOVERY_PROMPT.md`

**Note**: This plan guides execution of tasks T010–T015 (asset selection, Figma API integration, extraction, validation, reporting).

## Summary

Phase 1b recovers 10–15 high-priority Figma assets from the Figma Make project to validate the extraction workflow before Phase 2 full-scale migration (56 assets). Execution involves Node.js CLI scripts for API integration, file export, validation, and reporting. Success depends on Figma API connectivity (TOA-284 infrastructure), rate-limit handling, and recovery status tracking (recovered/fallback/failed). Deliverable: RECOVERY-PILOT-REPORT.md with workflow, metrics, and Phase 2 scaling recommendations based on measured per-asset extraction time.

## Technical Context

**Language/Version**: Node.js with TypeScript/JavaScript (ES modules); target Node 18+

**Primary Dependencies**:
- Figma API v1 (REST, HTTPS)
- Node.js built-ins: https, fs, path, util (no npm packages required for core extraction)
- Optional: `sharp` or `jimp` for PNG validation (image metadata + dimension checks)
- Optional: `json-schema-validator` for manifest schema validation

**Storage**:
- **Source:** Figma Make project (via Figma API)
- **Target:** File system (recovered-assets/ directory) + JSON manifests (extraction-manifest.json, validation-report.json)
- **Catalogue:** .github/reports/toa-media-library/FULL-CATALOGUE.json (read+update)

**Testing**:
- Node.js test framework (Node --test or Jest)
- Mock HTTP server for Figma API testing (or integration tests with real API under rate-limit conditions)
- Validation scripts that verify PNG dimensions and file integrity

**Target Platform**: Node.js CLI, executable in local development environment and GitHub Actions CI

**Project Type**: CLI / infrastructure tool (no UI, no server; standalone scripts for asset recovery)

**Performance Goals**:
- Extraction: ~12–15 min per asset (measured during pilot; subject to Figma API latency + file size)
- Pilot total: 10–15 assets in 2–3 days
- Phase 2 estimate: 56 assets ÷ measured_per_asset_time ÷ parallelization_factor

**Constraints**:
- **Figma API rate limit:** 10 requests/minute (per endpoint, per seat/token tier)
- **Concurrency:** 5 concurrent requests maximum (FIGMA_CONCURRENT_REQUESTS from .env)
- **Retry strategy:** Exponential backoff (2s, 4s, 8s, 16s) on API failures; fallback to Unsplash after 4 retries
- **File size:** PNG exports only; target <5MB per asset
- **Network:** HTTPS with Retry-After header compliance

**Scale/Scope**:
- Pilot: 10–15 assets (1 week execution)
- Phase 2: 56 total assets
- Categories: 7 portfolio series + 3 hero images + unmapped pool
- Metadata: dimensions (WxH), file size, alt text, captions, recovery status

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

**Phase 1b Constitution Alignment:**

✅ **Specification-First (Principle I)**: PHASE1B_RECOVERY_PROMPT.md documents requirements, acceptance criteria, and workflow before implementation. Tasks.md provides decomposed work plan. (Note: no separate spec.md; prompt serves as authority document.)

✅ **Repository Governance (Principle II)**: All artifacts in `.github/specs/002-media-library-recovery-pilot/`; workflow follows Spec Kit process (PHASE1B_RECOVERY_PROMPT → plan.md → tasks.md).

⚠️ **Bundler Compatibility (Principle III)**: Phase 1b extraction scripts run in Node.js CLI (not Figma Make). No frontend code affected. Extraction script must use ES modules (package.json "type": "module") and avoid CommonJS require(). No Figma Make bundler constraints apply.

✅ **Protected Content (Principle IV)**: No UI content changes; asset recovery is infrastructure work. FULL-CATALOGUE.json updates do not modify protected Image or Supabase files.

⚠️ **Styling (Principle V)**: Not applicable; CLI tool.

✅ **Package Management (Principle VI)**: npm only; extraction scripts target Node.js 18+. No pnpm/yarn.

✅ **Testing (Principle VII)**: Validation scripts use Node --test or Jest ESM. Figma API integration tested via test-figma-access.js (existing).

**No Constitutional Violations.** Phase 1b can proceed.

## Project Structure

### Documentation (this feature)

```text
.github/specs/002-media-library-recovery-pilot/
├── plan.md                      # This file (/speckit-plan output)
├── research.md                  # Phase 0 output (/speckit-plan command) — RESOLVES: Figma API patterns, rate-limit handling
├── data-model.md                # Phase 1 output — Recovery status schema, extraction manifest structure
├── contracts/                   # Phase 1 output — Figma API contract, manifest schema
│   └── extraction-manifest.schema.json    # Schema for extraction-manifest.json
├── quickstart.md                # Phase 1 output — Run extraction, validate, and generate report
└── tasks.md                     # Phase 2 output (/speckit-tasks) — T010–T015 task breakdown
```

### Source Code (CLI scripts + assets)

```text
scripts/
├── extract-figma-assets.js      # Main extraction script; input: asset list + .env; output: PNG files + manifest
├── validate-extracted-assets.js # Validation script; input: manifest + PNG files; output: validation report
└── test-figma-access.js         # Existing: Figma API connectivity test (from T011)

recovered-assets/               # T012 output directory
├── hero/
│   ├── heroImage1.png
│   ├── heroImage2.png
│   └── heroImage3.png
├── portfolio/
│   ├── jungle-festival/
│   │   ├── jungleImage1.png
│   │   ├── jungleImage2.png
│   │   └── jungleImage3.png
│   ├── nail-art/
│   │   └── nailRainbowFusion.png
│   └── [other categories per selection]
├── extraction-manifest.json     # T012 output: extraction metadata per asset
└── validation-report.json       # T013 output: validation results per asset

.env (git-ignored)
├── FIGMA_API_TOKEN              # Figma personal access token
├── FIGMA_MAKE_FILE_KEY          # Figma Make project file key
├── FIGMA_API_RATE_LIMIT_PER_MINUTE  # Rate limit (default: 10)
└── FIGMA_CONCURRENT_REQUESTS    # Concurrent request limit (default: 5)

.github/reports/toa-media-library/
├── FULL-CATALOGUE.json          # Phase 1a output; updated by T014 with recovery status
└── RECOVERY-PILOT-REPORT.md     # T015 output: findings, metrics, Phase 2 recommendations
```

**Structure Decision**: Phase 1b is a CLI tool (extraction + validation scripts) with no frontend changes. All scripts are Node.js ES modules. Recovered assets are stored in a versioned recovered-assets/ directory; JSON manifests coordinate extraction and validation. The layout supports Phase 2 scaling: scripts are reusable, manifest schema is extensible, and reporting integrates with Phase 2 planning.

## Complexity Tracking

**No Constitutional Violations.** No complexity justification required; all constraints align with principles.

---

## Implementation Phases

### Phase 0: Research (Resolve Unknowns)

**Unknowns to Resolve:**
1. Figma API rate-limit handling patterns (token bucket vs. simple delay)
2. PNG dimension extraction libraries for validation (jimp vs. sharp vs. imageinfo)
3. Concurrent request queuing strategy (queue vs. semaphore)
4. Error recovery taxonomy (retryable vs. permanent failures)

**Approach:**
- Audit existing test-figma-access.js (T011 deliverable) for API patterns
- Validate extraction script error handling against Figma API docs
- Prototype rate-limit enforcement before T012 execution
- Document recommendations in research.md

**Output**: research.md with API patterns, library choices, error handling decisions

---

### Phase 1: Design & Contracts

**1. Data Model** (data-model.md):
- Recovery status enum: recovered | fallback | failed
- Extraction manifest schema: catalogueId, figmaAssetId, recoveryStatus, exportedPath, fileSize, dimensions, extractionTime_ms, notes
- FULL-CATALOGUE updates: recoveryStatus, recoveryNotes, extractedAt, validatedAt timestamps

**2. Contracts** (contracts/):
- Figma API contract: GET /v1/files/{fileKey}/nodes endpoint (export format, rate headers)
- Extraction manifest schema: JSON schema for validation
- Validation report schema: dimensions, file integrity, status per asset

**3. Quickstart** (quickstart.md):
- Prerequisites: Node.js 18+, .env configured, FULL-CATALOGUE.json available
- Extract pilot: `node scripts/extract-figma-assets.js`, verify recovered-assets/ and manifests
- Validate: `node scripts/validate-extracted-assets.js`, check validation-report.json
- Report: Document results from manifests into RECOVERY-PILOT-REPORT.md structure

**Output**: data-model.md, contracts/extraction-manifest.schema.json, quickstart.md

---

### Phase 2: Implementation (Tasks T010–T015)

See tasks.md for detailed task breakdown:
- T010: Asset selection (1 day)
- T011: Figma access validation (1 day) ✅ COMPLETE
- T012: Extract assets (2–3 days, parallelizable)
- T013: Validate extracted files (1 day)
- T014: Update catalogue (1 day)
- T015: Generate report (2 days)
