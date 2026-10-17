# Provider Evaluation Framework

**Purpose**: Define evaluation criteria and decision framework for assessing storage and publishing workflow candidates against real-world usage patterns and requirements.

**Input**: Specification from [spec.md](../spec.md) (FR-010–013), research decisions from [research.md](../research.md) (Q1: GitHub + Netlify approved as working assumption)

**Scope**: This document defines the evaluation *process* and *criteria*. It does NOT select a provider. Provider *approval* is a separate decision outside this specification scope (TOA-276 evaluation → recommendation; TOA-284 infrastructure setup).

**Phase**: 1 Design (US3: Provider and Workflow Evaluation)

---

## Evaluation Criteria Matrix

### 1. Cost Model (FR-010, FR-011)

Evaluate actual pricing, not free-tier assumptions. Quote from current documentation.

| Criterion | What to Assess | Evidence Source | Notes |
|---|---|---|---|
| **Pricing Structure** | Free tier, per-asset, per-month, tiered by usage, or fixed | Current pricing page (dated) | Never assume free tier applies to production (FR-011) |
| **Estimated Monthly Cost** | Based on 56 recovered assets, 40–50 high-res originals (Q2 resolution); data egress/API calls | Provider pricing calculator with real numbers | Document all assumptions (storage size, API calls, concurrent users) |
| **Cost Scalability** | How cost changes with volume (linear, step function, unlimited) | Pricing documentation | Estimate cost at 2x, 5x, 10x current asset count |
| **Hidden Costs** | Setup, migration, support, API rate limits, overage charges | Terms of service, support matrix | Flag any usage limits that would require overage pricing |
| **Trial or POC Availability** | Free trial, time-limited evaluation, or cost-free POC | Sign-up terms, support channels | Can we evaluate without production commitment? |

### 2. Storage & Asset Limits (FR-010, FR-011)

Verify advertised limits against real-world constraints.

| Criterion | What to Assess | Evidence Source | Notes |
|---|---|---|---|
| **Maximum Assets** | Number of files or storage quota | Documentation; API limits | Confirm limit covers 56 recovered assets + future growth |
| **Maximum File Size** | Largest single asset upload | Documentation; API specification | Verify against print-quality assets (high-res TIFF, PDF) |
| **Storage Quota** | Total storage GB/TB limit | Pricing page | Calculate: (56 assets × avg file size) + margin for variants |
| **Concurrent Upload Limit** | Simultaneous uploads per account | Documentation; API rate limits | Relevant for batch migration (TOA-285 scope) |
| **Data Retention** | How long data is stored before deletion or archival | Terms of service | Ensure durability for long-term archive (FR-009 scope) |

### 3. Format Support (FR-004, FR-010, FR-013)

Verify support for all required formats, especially print.

| Criterion | What to Assess | Evidence Source | Notes |
|---|---|---|---|
| **Web Formats** | PNG, JPEG, WebP, SVG, GIF support | Supported formats list | Test upload and retrieval of each format |
| **Print Formats** | PDF, TIFF, EPS support and quality preservation | Documentation and real-world testing | Critical per Q2 resolution (300 DPI, RGB/CMYK, PNG/PDF) |
| **Format Validation** | Does provider validate or corrupt formats on upload? | Upload 3–5 test files per format; verify MD5 hash or visual inspection | Ensure no lossy compression or format conversion |
| **Metadata Preservation** | EXIF, IPTC, XMP, colour profiles preserved? | Technical documentation; test with metadata-rich files | For print, colour profile preservation is critical |
| **Batch Format Conversion** | Does provider offer automatic resizing, format conversion? | API documentation; visual editing UI capabilities | Note as optional feature; confirm no mandatory conversion |

### 4. Editing and Tagging Workflow (FR-010, FR-011)

Evaluate visual editing and asset management UI/UX.

| Criterion | What to Assess | Evidence Source | Notes |
|---|---|---|---|
| **Visual Editing Interface** | Web UI, native app, or API-only | Supported platforms; feature demo | Can content team edit/tag assets post-migration? |
| **Editing Capabilities** | Crop, resize, colour adjust, watermark, filter | Visual editing UI documentation | Scope for typical publishing workflow (e.g., social media variants) |
| **Tagging and Metadata** | Custom fields, searchability, bulk tagging | API documentation; UI walkthrough | How does team organize and find recovered assets? |
| **Batch Operations** | Bulk upload, download, delete, tag | API and UI capabilities | Can we batch-migrate 56 assets efficiently? |
| **User Permissions** | Role-based access, team collaboration | Documentation | Can editors and reviewers access without full admin privileges? |
| **Workflow Integration** | Can provider integrate with website CMS or build system? | API documentation; third-party integrations | Relevant for TOA-285 (build integration scope) |

### 5. API Availability and Documentation (FR-010, FR-011)

Assess programmatic access for automation and integration.

| Criterion | What to Assess | Evidence Source | Notes |
|---|---|---|---|
| **API Availability** | Is there a documented API? | API documentation URL | Required for automated recovery and reference migration (TOA-285) |
| **API Endpoints** | Upload, download, list, delete, update metadata | API specification | Confirm all operations needed for recovery workflow |
| **Rate Limits** | Requests per second, per hour; quota for trial/free tier | API documentation | Can we batch-migrate 56 assets without hitting limits? |
| **Authentication** | API keys, OAuth, service accounts | Security documentation | Which auth method suits automated migration? |
| **Webhooks or Event Stream** | Can provider notify on upload completion, errors? | API documentation | Useful for monitoring migration progress |
| **Documentation Quality** | Examples, error codes, troubleshooting | API docs; community forums | Can a developer integrate without vendor support? |

### 6. Print Quality Support (FR-004, FR-013, Q2 Resolution)

Verify provider support for print workflows (300 DPI, RGB/CMYK, PNG/PDF per Q2).

| Criterion | What to Assess | Evidence Source | Notes |
|---|---|---|---|
| **High-Resolution Support** | Can provider store and deliver files at 300+ DPI? | Documentation; test upload of 300 DPI TIFF | Print quality depends on full-resolution delivery |
| **Colour Space Preservation** | RGB and CMYK colour spaces preserved during storage/delivery? | Technical documentation; colour profile test | Print requires storage and retrieval of colour profiles; RGB-to-CMYK conversion fidelity depends on print profile used |
| **Format Compatibility** | PDF and TIFF delivery without quality loss? | Technical documentation; test delivery | Print PDF must retain embedded fonts and vector graphics |
| **CDN / Delivery Network** | Can print assets be reliably delivered? | Infrastructure documentation | Print production may require reliable, fast delivery |
| **Print Workflow Integration** | Does provider offer print-specific tools (colour management, pre-flight checks)? | Features list; vendor documentation | Optional; note if not available |

### 7. Integration Complexity (FR-011, TOA-285 scope)

Estimate effort to integrate provider with website build and publish pipeline.

| Criterion | What to Assess | Evidence Source | Notes |
|---|---|---|---|
| **Build System Integration** | Does provider integrate with Vite, Netlify, or standard build tools? | Documentation; third-party integrations list | Relevant for TOA-285 (automated reference migration) |
| **Plugin/SDK Availability** | Official SDKs for JavaScript, Python, etc.? | GitHub repos; npm/PyPI packages | Reduces custom integration work |
| **Authentication Complexity** | How complex is auth setup for automated workflows? | Documentation; API examples | Service account setup, token management, etc. |
| **Error Handling** | Clear error messages and recovery paths for failed uploads/downloads? | Error documentation; community forums | Critical for reliable batch migration |
| **Support Channels** | Email, chat, phone support; response time SLA | Support page; terms of service | Relevant for troubleshooting during migration |

---

## Evaluation Process

### Phase 1: Shortlist Candidates

Based on initial research (audit PR #285, strategy report), candidate providers:
- **Option A**: GitHub + Netlify (approved per Q1 resolution)
- **Option B**: Cloudinary
- **Option C**: [Other provider, if identified]

Document initial assessment for each candidate against cost, features, format support.

### Phase 2: Real-World Workflow Testing

For each shortlisted provider:

1. **Set Up Test Account**
   - Create trial or production account
   - Authenticate with test credentials
   - Document any setup barriers or costs

2. **Test Batch Upload**
   - Upload 5–10 representative recovered assets (mix of formats: SVG, PNG, PDF, high-res TIFF)
   - Document upload time, success rate, any format issues
   - Verify metadata (dimensions, colour space, EXIF) preserved

3. **Test Visual Editing**
   - Use provider's visual editing UI (if available)
   - Attempt common operations: crop, tag, add metadata
   - Document ease of use, feature gaps

4. **Test Retrieval**
   - Download uploaded files via UI and API
   - Verify file integrity (MD5 hash or visual inspection for images)
   - Document retrieval speed, API reliability

5. **Test Reference Mapping**
   - Simulate reference migration (old asset ID → new provider ID)
   - Test API integration with sample website page
   - Document integration effort estimate

6. **Document Findings**
   - Complete evaluation matrix (see below) for this provider
   - Flag any show-stoppers, missing features, or cost surprises
   - Note integration effort estimate (low/medium/high)

### Phase 3: Comparison and Recommendation

Create provider comparison matrix (see below) with:
- Quantitative scores (cost, limits, API maturity)
- Qualitative assessment (ease of use, integration complexity, print support)
- Recommendation with confidence level and risk flags

---

## Evaluation Matrix Template

### Provider: [Name]

**Date Evaluated**: [ISO date]

**Evaluator**: [Name]

| Criterion | Assessment | Evidence / Finding | Risk Flag |
|---|---|---|---|
| **Pricing Model** | Free/Paid; $ per month at scale | [Finding] | Red/Yellow/Green |
| **Asset Limit** | [Number] assets or [Size] GB | [Finding] | — |
| **Max File Size** | [Size] per file | [Finding] | — |
| **Web Format Support** | ✓ PNG, JPEG, SVG, WebP, GIF; ✗ [missing] | [Testing result] | Yellow if critical format missing |
| **Print Format Support** | ✓ PDF, TIFF; ✓ 300+ DPI; ✓ CMYK; ✗ [missing] | [Testing result] | Red if print formats unsupported per Q2 |
| **Metadata Preservation** | ✓ EXIF, colour profiles preserved | [Testing result] | Yellow if metadata lost |
| **Visual Editing UI** | [Available/Not available]; capabilities: [list] | [UI walkthrough] | Yellow if limited |
| **API Availability** | ✓ Full API documented; endpoints: [list] | [API spec link] | Red if no API |
| **API Rate Limits** | [Requests/sec]; [quota for tier] | [Documentation] | Yellow if too restrictive for batch ops |
| **Integration Effort** | Low/Medium/High | [Rationale] | Red if High |
| **Cost Estimate (56 assets)** | $[X]/month + $[Y] setup | [Calculation with assumptions] | Red if >$[budget] |
| **Concurrent Users** | [Number] or unlimited | [Documentation] | Yellow if single-user only |
| **Support SLA** | [Response time]; [Channel] | [Support page] | Yellow if email-only, slow response |
| **Show-Stoppers** | ✓ None; ✗ [Issue] | [Finding] | Red if show-stopper exists |
| **Recommendation** | Recommended / Recommended with caution / Not recommended | [Summary] | — |
| **Confidence Level** | High / Medium / Low | [Rationale] | — |

---

## Comparison Matrix

Create one row per candidate provider:

| Provider | Cost/Month (56 assets) | Asset Limit | Print Support | API | Integration Effort | Recommendation | Risk Flags |
|---|---|---|---|---|---|---|---|
| GitHub + Netlify | $[Cost] | $[Limit] | ✓/✗ | ✓/✗ | Low/Med/High | [Decision] | [Flags] |
| Cloudinary | $[Cost] | $[Limit] | ✓/✗ | ✓/✗ | Low/Med/High | [Decision] | [Flags] |
| [Other] | $[Cost] | $[Limit] | ✓/✗ | ✓/✗ | Low/Med/High | [Decision] | [Flags] |

---

## Decision Framework

**Approve provider** when:
- ✓ No show-stoppers identified
- ✓ Cost acceptable (within project budget)
- ✓ Supports all required formats (web + print per Q2)
- ✓ API available and mature (or workflow is UI-only)
- ✓ Integration effort is low/medium (within TOA-285 scope)

**Request additional evaluation** when:
- ⚠ One or two criteria unclear or borderline
- ⚠ Cost estimate uncertain (require more detailed pricing)
- ⚠ Integration effort unclear (require prototype or POC)

**Reject provider** when:
- ✗ Missing critical format support (print formats per Q2)
- ✗ Cost prohibitive (>budget threshold)
- ✗ Integration effort very high (beyond team capacity)
- ✗ Poor data durability or security record

---

## Inputs

- **Recovered Asset Samples**: 12 pilot assets from TOA-280/TOA-282 validation
- **Figma Source Files**: Original files for comparison during provider testing
- **Reference Requirements** (Q2 resolution):
  - 40–50 of 56 assets recoverable as high-quality originals
  - Print requires 300 DPI, RGB/CMYK, PNG/PDF support
  - Web formats: PNG, JPEG, SVG at various sizes

---

## Outputs

- **Provider Evaluation Report** (TOA-276 deliverable):
  - Individual evaluation matrices for each shortlisted provider
  - Comparison matrix with cost, features, integration effort
  - Recommendation with confidence level and risk flags
  - Decision log documenting any trade-offs or deviations

---

## Traceability

**Functional Requirements**:
- FR-010 (Evaluation workflow) → Real-world testing with representative recovered assets (Phase 2)
- FR-011 (Provider assessment) → Validates cost, limits, concurrent-user support with actual testing
- FR-012 (Distinguish evaluation from approval) → This document evaluates; approval is separate decision (TOA-284)
- FR-013 (Print-quality support per provider) → Print support matrix included (Q2 resolution: 300 DPI, RGB/CMYK, PNG/PDF)

**Related Linear Issues**:
- TOA-276 → Provider evaluation workflow
- TOA-280, TOA-282 → Provide pilot recovered assets for real-world testing
- TOA-284 → Infrastructure setup once provider is approved
- TOA-285 → Integration with build pipeline (based on provider choice)

---

**Version**: 1.0-phase1 | **Phase**: 1 Design (US3) | **Status**: Ready for evaluation workflow (TOA-276)
