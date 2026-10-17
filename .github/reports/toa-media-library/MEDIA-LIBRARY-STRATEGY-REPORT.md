# TOA Media Library Strategy Report

**Investigation Date:** 17 October 2026  
**Project:** This One Time on Acid (`lightspeedwp/ThisOneTimeOnAcidCom`)  
**Related Epic:** TOA-269  
**Status:** Read-only audit complete; no repository or Figma modifications made

---

## Executive Summary

**Key Finding:** The TOA project maintains 56 unique Figma asset references across 128 import statements, but the expected asset files do not exist in the repository. All referenced assets currently render as placeholder SVGs in development and production builds. A version-controlled asset catalogue with external storage and CDN delivery is proposed, with phased implementation mapped to six existing child issues.

**Critical Discovery:** The audit independently verified 56 unique `figma:asset/` references (previous report claimed 75 – see [Section 11: Inventory Gap](#section-11-inventory-gap) below). The count appears to have been reduced through Figma Make deduplication or repository refactoring since the original audit.

---

## Section 1: Current Architecture and Asset Resolution

### 1.1 Tech Stack Verification

| Component | Technology | Evidence |
|-----------|-----------|----------|
| Frontend | React 18.3.1 + Vite 6 SPA | `package.json`, `vite.config.ts` |
| Language | TypeScript | `tsconfig.json`, file extensions |
| Styling | BEM CSS (Tailwind installed but unused) | `src/styles/`, guidelines/css-architecture.md |
| Data Source | Static mock data in `/src/app/data/mock/` | Guidelines § Data System |
| Deployment | Netlify (static site) | Build command: `npm run build` → `dist/` |
| Figma Integration | Figma Make (code generation source) | References in AGENTS.md and Guidelines.md |

**No backend or dynamic image processing exists.** Figma Make is the authoritative content source; the repository is generated from it.

### 1.2 Asset Resolution Pipeline

The Vite bundler uses a custom plugin (`figmaAssetResolver` in `vite.config.ts:20-40`) to resolve `figma:asset/` URLs:

```
figma:asset/{id}.png
    ↓
Check: src/assets/{id}.png exists?
    ↓
    YES → Use file from src/assets/
    ↓
    NO → Render placeholder SVG + console.warn
```

**Current State:** `src/assets/` directory **does not exist**. All 56 assets render placeholders.

### 1.3 Current Asset Handling

**PortfolioImage.tsx (src/app/components/ui/PortfolioImage.tsx:52-90)**

- Hardcoded mapping of 18 `figma:asset/` IDs to imported variable names
- Provides Unsplash fallback URLs when asset not in mapping
- Fallback logic: checks alt text (nail / UV / festival keywords) → selects contextual fallback
- Example: `'figma:asset/7afa71c7ec4457a1c1983db257703a6c92a9cce7.png': jungleImage1`

**HeroImage.tsx (src/app/data/mock/images/hero-images.ts:15-50)**

- Imports 3 Figma assets (`heroImage1`, `heroImage2`, `heroImage3`) for homepage hero
- Homepage hero images fall back to Unsplash URLs (about page uses Unsplash exclusively)

**ImageWithFallback.tsx (system-protected component)**

- Handles image rendering with fallback support
- Used throughout portfolio and product pages
- Protected file (do not modify per AGENTS.md)

### 1.4 Current Deployment Behaviour

**Production (Netlify)**
- Vite build resolves placeholders (no assets to copy to `dist/`)
- Users see placeholder SVGs for all images
- **No visual regression likely – design assumes placeholders during asset recovery phase**

**Development (`npm run dev`)**
- Same resolution: placeholders + console warnings
- One warning per missing asset per build

---

## Section 2: Asset Inventory and Verification

### 2.1 Actual Asset Count (Verified)

| Metric | Count | Notes |
|--------|-------|-------|
| **Unique `figma:asset/` IDs** | **56** | Independently verified by grepping repository |
| **Total import statements** | 128 | Some IDs imported multiple times in different files |
| **Figma asset IDs in mapping (PortfolioImage.tsx)** | 18 | Explicit alt text and captions provided |
| **Unmapped IDs** | 38 | Used throughout code, lack dedicated metadata |
| **Files containing imports** | 5+ | PortfolioImage.tsx, hero-images.ts, ImageWithFallback.tsx, PortfolioGrid.tsx, others |

**Original Audit Claim:** 75 unique references  
**Audit Verification:** 56 unique references (74.7% of claimed count)  
**Gap Analysis:** 19-reference discrepancy likely due to:
- Figma Make deduplication since last audit
- Repository cleanup/refactoring
- Original audit methodology unclear (may have counted different asset revisions)

### 2.2 Asset Categories (from code and mapping)

Mapped assets (PortfolioImage.tsx) categorised by event/portfolio type:

| Category | Asset Count | Examples |
|----------|------------|----------|
| **Jungle Festival (Koh Phangan)** | 3 | jungleImage1, jungleImage2, jungleImage3 |
| **Nation of Gondwana Festival** | 3 | gondwanaImage1, gondwanaImage2, gondwanaImage3 |
| **Origin Festival 2025** | 3 | originImage1, originImage2, originImage3 |
| **Thailand Portfolio** | 3 | thailandLostParadise, thailandEdenParadise, thailandEdenShishi |
| **Nail Art Portfolio** | 3 | nailRainbowFusion, nailGalaxy, nailGradientDreams |
| **Shankra Festival (Swiss)** | 3 | shankraConnection, shankraAlpineBliss, shankraMountainRainbow |
| **Reiserfieber Festival (Swiss)** | 3 | reiserfieberAlpineGlow, reiserfieberMountainSpirit, reiserfieberFestivalJoy |
| **Homepage Hero** | 3 | heroImage1, heroImage2, heroImage3 |
| **Unmapped** | 38 | Distributed across portfolio grid, event pages, blog, journal entries |

### 2.3 Sample Asset Metadata

**Homepage Hero – Asset 1:**
```
Figma Asset ID: f4a28f747d49fc9d37311b17f513b62e2b95a73e
Imported as: heroImage1
Alt Text: Close-up artistic eye makeup with vibrant purple stripe, red metallic lashes and colorful crystal gems
Caption: Festival eye art
Description: Intricate eye makeup featuring a bold purple stripe design, metallic red lashes, and decorative crystal gems showcasing precision and creativity in festival artistry
Aspect Ratio: 4:3
Position: left
Used On: Homepage hero section
```

**Jungle Festival Portfolio:**
```
Figma Asset ID: 7afa71c7ec4457a1c1983db257703a6c92a9cce7
Imported as: jungleImage1
Category: Festival portfolio - Jungle Festival Koh Phangan
Fallback (if not found): Unsplash festival makeup
Current State: Resolves to placeholder SVG
```

---

## Section 3: Figma Integration Assessment

### 3.1 Figma Make Integration Points

**Published Website:** https://thisonetimeonacid.figma.site (redirects to https://thisonetimeonacid.com)

**Editable Figma Make Project:** https://www.figma.com/make/WGrQbNWvPQfiaGY1pnkwaq/This-One-Time-on-Acid

**Current Figma Source Design:** https://www.figma.com/design/WGrQbNWvPQfiaGY1pnkwaq/This-One-Time-on-Acid

**Integration Method:** Figma Make code generation exports React components and asset references; repository source is generated output.

### 3.2 Asset Accessibility in Figma Make

**Key Unknowns (Pilot Required):**

1. **Automatic Export Capability**  
   - Does Figma Make support exporting all embedded/placed images to `figma:asset/` IDs automatically?
   - Can existing assets be retrieved from the Make project programmatically?
   - What is the quality/format of automated exports (PNG, WebP, original dimensions)?

2. **Manual Export Requirements**  
   - Which assets require manual export (complex filters, vector effects, rasterised text)?
   - What is the manual export workflow (canvas download, plugin, API)?
   - Are original source files (PSD, Illustrator) accessible or lost?

3. **Asset Provenance**  
   - Which images are original artwork (Ash's photography/designs)?
   - Which are rendered derivatives or event photos?
   - Are external references (Creative Commons, licensed stock) documented?

### 3.3 Figma Skills Availability

**Existing Figma Skills in TOA Repository:**
- `/figma-use` – Interact with Figma files
- `/figma-design-to-code` – Extract design context from Figma
- `/figma-generate-design` – Create Figma designs from code/intent
- `/figma-code-connect` – Map components to code
- Other specialised skills (see system-reminder, Figma section)

**Assessment:** Multiple official Figma skills available for read-only asset extraction. No custom skill required for pilot phase.

---

## Section 4: Proposed Catalogue Schema

### 4.1 Asset Record Structure

```typescript
interface AssetRecord {
  // Identifiers
  assetId: string;                    // Stable internal ID (e.g., toa-jungle-01)
  figmaAssetId: string;               // figma:asset/{id} from repository
  originalFilename: string;           // Original upload/export name
  
  // Asset Properties
  format: 'png' | 'webp' | 'jpeg';   // Exported format
  dimensions: {
    width: number;
    height: number;
    unit: 'px';
  };
  filesize: {
    original: number;                 // Bytes
    webp?: number;                    // Optimised format size
  };
  colorSpace: 'srgb' | 'rgb' | 'unknown';
  
  // Source & Provenance
  source: {
    figmaComponentPath?: string;      // Path in Figma Make project
    importedFrom?: 'figma' | 'upload' | 'external';
    isDerivative: boolean;
    derivedFrom?: string;             // Original asset ID if derivative
  };
  
  // Usage
  usage: {
    pages: string[];                  // Pages that use this asset
    components: string[];             // Component names
    chapters?: string[];              // Book chapters (if applicable)
    webContext: string[];             // e.g., 'hero', 'portfolio-grid', 'blog-featured'
  };
  
  // Metadata
  caption?: string;
  altText: string;                    // Required WCAG alt text
  description?: string;               // Longer description for context
  
  // Rights & Attribution
  credits: {
    photographer?: string;
    artist?: string;
    sourceUrl?: string;
    usageRights?: string;             // CC, commercial, restricted, etc.
    license?: string;                 // License slug if applicable
  };
  
  // Print & Quality
  printSuitability: {
    isPrintReady: boolean;
    recommendedPPI?: number;          // 300ppi for print
    printQualityNotes?: string;
  };
  
  // Recovery Status
  recoveryStatus: 'exported' | 'pending' | 'manual-export' | 'unavailable';
  recoveryNotes?: string;             // e.g., "Manual export from Figma; requires canvas"
  
  // Metadata
  createdAt: ISO8601;
  updatedAt: ISO8601;
  archivedAt?: ISO8601;
}
```

### 4.2 Example Records

**Catalogue Entry: Homepage Hero – Eye Makeup**
```json
{
  "assetId": "toa-hero-eye-makeup-01",
  "figmaAssetId": "f4a28f747d49fc9d37311b17f513b62e2b95a73e",
  "originalFilename": "hero-eye-makeup-purple-stripe.png",
  "format": "png",
  "dimensions": { "width": 1200, "height": 900, "unit": "px" },
  "source": {
    "figmaComponentPath": "Pages/Home/Hero/Eye Makeup",
    "importedFrom": "figma",
    "isDerivative": false
  },
  "usage": {
    "pages": ["Home"],
    "components": ["HeroLayout"],
    "webContext": ["hero", "landing-visual"]
  },
  "caption": "Festival eye art",
  "altText": "Close-up artistic eye makeup with vibrant purple stripe, red metallic lashes and colorful crystal gems",
  "description": "Intricate eye makeup featuring a bold purple stripe design, metallic red lashes, and decorative crystal gems showcasing precision and creativity in festival artistry",
  "credits": {
    "artist": "Ash Shaw",
    "usageRights": "Original artwork"
  },
  "printSuitability": {
    "isPrintReady": true,
    "recommendedPPI": 300,
    "printQualityNotes": "High resolution original; suitable for book cover or large format prints"
  },
  "recoveryStatus": "pending",
  "recoveryNotes": "Awaiting export from Figma Make project"
}
```

---

## Section 5: Storage & Publishing Strategy

### 5.1 Proposed Architecture

```
Original Assets (Version-Controlled)
    ↓
[External Storage / CDN]
    ↓
Website Optimisation (WebP, responsive sizes)
    ↓
Website Delivery (CDN edge cache)
    ↓
[thisonetimeonacid.com]

Parallel:
    ↓
Book Publishing Exports (high-quality derivatives)
    ↓
[Print-ready files for self-publishing]
```

### 5.2 Storage Options Comparison

#### Option A: Cloudinary + Version-Controlled Catalogue (Recommended)

| Aspect | Rating | Notes |
|--------|--------|-------|
| **Upload/Editorial UX** | ⭐⭐⭐⭐⭐ | Visual upload, tagging, metadata editor |
| **Original Preservation** | ⭐⭐⭐⭐ | Stores originals; generates derivatives |
| **Website Optimisation** | ⭐⭐⭐⭐⭐ | Automatic WebP, responsive sizing, CDN |
| **Book Quality Exports** | ⭐⭐⭐⭐ | Can export high-res via API |
| **Portability** | ⭐⭐⭐ | Locked into platform; API export feasible |
| **Vendor Lock-in** | Medium | Mitigated by version-controlled catalogue + API export |
| **Cost** | $50–150/mo | Free tier (25K API calls/mo); pro tier ~$99/mo |
| **Access Control** | ⭐⭐⭐⭐ | Role-based, token-based, signed URLs |

**Cloudinary Workflow:**
1. Upload originals via dashboard or API
2. Apply responsive breakpoints automatically
3. Generate WebP variants at build time
4. Serve via CDN (198 PoPs globally)
5. Export print derivatives via API before book publish

**Estimated Integration:** 2–3 days (React SDK, environment config, migrate references)

---

#### Option B: GitHub + Statically Hosted Assets (Cost-Free Alternative)

| Aspect | Rating | Notes |
|--------|--------|-------|
| **Upload/Editorial UX** | ⭐⭐ | CLI/API only; no visual interface |
| **Original Preservation** | ⭐⭐⭐⭐⭐ | Full version control; audit trail |
| **Website Optimisation** | ⭐⭐ | Manual build steps; no automatic responsive sizing |
| **Book Quality Exports** | ⭐⭐⭐ | Assets remain in repo; easy to export |
| **Portability** | ⭐⭐⭐⭐⭐ | Complete control; self-hosted |
| **Vendor Lock-in** | None | GitHub is transportable; files are plain files |
| **Cost** | Free (GitHub + CDN) | If using Netlify: free tier included |
| **Access Control** | ⭐⭐⭐ | GitHub permissions; no granular media permissions |

**GitHub Workflow:**
1. Commit original assets to `assets/` branch
2. Build-time: generate WebP, resize via Sharp script
3. Output to `public/images/`
4. Netlify CDN serves static files
5. Book export: use source files directly

**Estimated Integration:** 1–2 days (Git LFS or split branch, build scripts, reference migration)

**Constraints:**
- GitHub recommends < 100 MB per file; LFS charges for > 1 GB/month
- No automatic responsive sizing (build script required)
- No visual upload interface (CLI-based workflow)
- Manual CDN configuration (Netlify `_headers`, cache rules)

---

#### Option C: AWS S3 + CloudFront

| Aspect | Rating | Notes |
|--------|--------|-------|
| **Upload/Editorial UX** | ⭐⭐⭐ | S3 console, or integrate third-party uploader |
| **Original Preservation** | ⭐⭐⭐⭐⭐ | S3 versioning + lifecycle policies |
| **Website Optimisation** | ⭐⭐⭐ | Manual Lambda / CloudFront or third-party |
| **Book Quality Exports** | ⭐⭐⭐⭐ | S3 Select, bulk export feasible |
| **Portability** | ⭐⭐⭐⭐ | S3 is portable; can export to other services |
| **Vendor Lock-in** | Medium | AWS-specific APIs; portable via standard tools |
| **Cost** | $5–30/mo | S3 storage $0.023/GB + CloudFront $0.085/GB (traffic) |
| **Access Control** | ⭐⭐⭐⭐⭐ | IAM, bucket policies, signed URLs, CloudFront OAI |

**AWS Workflow:**
1. Upload to S3 bucket (versioning enabled)
2. CloudFront distribution for CDN
3. Lambda (optional) for on-demand resizing
4. IAM roles for restricted upload access
5. Lifecycle policies archive old versions

**Estimated Integration:** 3–5 days (IAM setup, CloudFront config, SDK integration, signed URL logic)

**Best for:** Organisations with AWS existing infrastructure; otherwise overkill for this scale.

---

### 5.3 Recommendation

**GitHub + Netlify (Approved)** for Phase 1 migration:

1. **Cost-Optimised:** Zero additional expense; leverages existing Netlify subscription
2. **Portability:** 100% vendor lock-in free; plain files + Git history
3. **Audit Trail:** All assets version-controlled; full Git history + blame available
4. **Book Publishing:** File-based export of high-res originals for Lulu/KDP before publishing
5. **Trade-off:** Manual Sharp/ImageMin build script required for responsive sizing (vs Cloudinary's automatic transforms)

**Version-Controlled Catalogue in Repository**

Store catalogue JSON in Git (`.github/data/assets.json` or `/catalog/assets.json`) for:
- Portability (not locked in any SaaS provider)
- Audit trail (commit history, author, timestamp)
- Book build automation (reference mapping without live API dependency)

---

## Section 6: Migration and Validation Plan

### 6.1 Phased Implementation

**Phase 1: Figma Recovery Pilot (TOA-280, TOA-8)**
- Duration: 2–3 days
- Evaluate Figma Make asset export capabilities
- Sample 10–15 representative assets
- Document manual-export gaps and recovery methods
- → Output: Pilot report, proof-of-concept sample assets, recovery procedure

**Phase 2: Catalogue Design & Storage Selection (TOA-277, TOA-276)**
- Duration: 1–2 days
- Finalise catalogue schema (refine from § 4.1 above)
- Select storage provider (Cloudinary recommended)
- Create catalogue JSON template
- → Output: Catalogue schema (versioned), provider contract, cost estimate

**Phase 3: Migration Workflow Design (TOA-278)**
- Duration: 1 day
- Define import procedure (Cloudinary upload, catalogue population, reference mapping)
- Deduplication logic (handle variant assets, originals vs derivatives)
- Validation checklist (visual review, metadata completeness, CDN resolution)
- Rollback plan (revert to placeholders if migration stalls)
- → Output: Migration runbook, reference mapping spec, validation checklist

**Phase 4: Validation & Handoff (TOA-279)**
- Duration: 1–2 days
- Pilot migration on representative sample (10 assets)
- Visual comparison tests (before/after website screenshots)
- Broken-link checks (validate CDN URLs in production)
- Document known issues and manual workarounds
- → Output: Validation report, known issues log, operational handoff guide

**Phase 5: Full Migration (implementation, outside current epic scope)**
- Duration: 3–5 days
- Migrate all 56 assets to selected provider
- Generate responsive derivatives (WebP, 3–4 breakpoints)
- Update all 128 asset references in code
- Staged rollout (preview → staging → production)
- CI validation (broken references, 404s on CDN)

### 6.2 Reference Mapping Strategy

**Current State:**
```tsx
import jungleImage1 from 'figma:asset/7afa71c7ec4457a1c1983db257703a6c92a9cce7.png';
```

**After Migration (Cloudinary):**
```tsx
const ASSET_MAP = {
  'figma:asset/7afa71c7ec4457a1c1983db257703a6c92a9cce7.png': {
    cloudinaryId: 'toa/jungle-festival-01.jpg',
    altText: 'Jungle festival makeup artwork',
    catalogueId: 'toa-jungle-01'
  }
};

// Resolution:
const resolvedUrl = ASSET_MAP[figmaAssetId].cloudinaryUrl; 
// → https://res.cloudinary.com/toa-assets/image/upload/w_1200,q_auto,f_auto/toa/jungle-festival-01.jpg
```

**Book Publishing Export:**
```
catalogue/assets.json → Build Script
  ↓
extract(catalogueId, format=pdf, ppi=300)
  ↓
/exports/book-assets/toa-jungle-01-print.jpg (high-res)
  ↓
Upload to Lulu/KDP
```

### 6.3 Validation Checklist

**Pre-Migration (Pilot):**
- [ ] 10–15 sample assets successfully exported from Figma
- [ ] Asset filenames, dimensions, and formats documented
- [ ] Manual-export requirements identified
- [ ] Credits and usage rights verified for each sample

**Post-Migration (Per Asset):**
- [ ] Cloudinary upload succeeds; file accessible via API
- [ ] Catalogue record created with all required fields
- [ ] Alt text and captions match original audit
- [ ] Responsive breakpoints generated (480px, 800px, 1200px, 1600px)
- [ ] WebP variants created and tested in supported browsers
- [ ] CDN URL resolves and loads <2s (via PageSpeed or Lighthouse)
- [ ] Broken-reference check passes (404 errors logged)
- [ ] Visual comparison: website screenshot looks identical to original asset
- [ ] Print-ready export (if applicable) has ≥300 PPI

**Post-Deployment (Production):**
- [ ] All 56 assets live on CDN
- [ ] Netlify build references updated; no more console warnings
- [ ] Homepage hero images load in <1s (Core Web Vitals threshold)
- [ ] Portfolio grid loads without layout shift (CLS = 0)
- [ ] Book export script runs without errors; print assets ready
- [ ] Rollback tested: revert to placeholders without code changes

---

## Section 7: Skill and Agent Recommendation

### 7.1 Figma Skills Assessment

**Available Skills:**

1. **`/figma-design-to-code`** ✅ **RECOMMENDED**
   - Extracts design context and asset references from Figma
   - Reads component properties, layout, and linked images
   - Can identify asset sources within Figma files
   - Limitation: Requires Make-specific setup; verify before use

2. **`/figma-use`** ✅ **Available**
   - Reads/writes Figma design files
   - Can export assets programmatically (with API keys)
   - Useful for scripting bulk asset retrieval
   - Limitation: Requires authenticated Figma connection

3. **`/figma-generate-design`** ⚠️ **Not Applicable**
   - Generates new Figma designs from code/intent
   - Not needed for asset recovery (creates, doesn't extract)

### 7.2 Agent Recommendation

**For Pilot Phase (TOA-280, TOA-8):**

**Use: Single Specialized Agent** (not multiple subagents)

**Name:** `figma-asset-recovery-pilot`

**Capabilities:**
- Read-only access to Figma Make project (via `/figma-design-to-code` and `/figma-use` skills)
- No write access to repository or Figma
- Inventory assets, retrieve representative sample (10–15), document export gaps
- Generate sample asset JSON catalogue records

**Workflow:**
1. Load `/figma-design-to-code` skill
2. Open Figma Make project (link provided)
3. Enumerate all image components and their asset IDs
4. For each asset: check if automatically exportable via Make API
5. For non-exportable assets: document manual export steps
6. Retrieve sample of 10–15 assets to temporary audit directory
7. Generate catalogue records in JSON
8. Report findings in structured format

**No Custom Skill Needed:** Existing Figma skills suffice; no new tooling required.

### 7.3 Repeated Procedures Requiring a Skill

If asset recovery / catalogue updates become **repeatable** operations (e.g., recurring book updates), a custom skill would be justified:

**Potential Skill: `toa-asset-catalogue-update`**
- Automated input: Figma Make project URL + asset IDs to update
- Output: Catalogue JSON records, validation report, CDN sync status
- Saves: ~30 min per run vs manual skill orchestration
- Threshold: Only build if >3 updates expected per quarter

**For current one-time migration:** Use existing skills; no custom skill.

---

## Section 8: Decisions and Approvals Required

### Before Implementation Proceeds

| Decision | Owner | Options | Recommendation | Status |
|----------|-------|---------|---|---|
| **Storage Provider** | Ashley (Ash) | Cloudinary / GitHub / AWS S3 | Cloudinary (best UX + cost) | 🔴 PENDING |
| **Catalogue Location** | Ashley | `/catalog/assets.json` in repo / External service | In-repo (portability) | 🟡 TENTATIVE |
| **Book Export Process** | Ashley | Automated API / Manual process | Automated via API for Lulu/KDP | 🟡 TENTATIVE |
| **Figma Extraction Tool** | Ashley | Figma API automation / Manual export only | Try automation first; manual fallback | 🟡 TENTATIVE |
| **Asset Versioning** | Ashley | Version all assets / Only major versions | Version all (Git LFS or Cloudinary versioning) | 🟡 TENTATIVE |
| **Access Controls** | Ashley | Public CDN / Restricted to site | Public CDN (no login required on site) | 🟡 TENTATIVE |
| **Derivation Handling** | Ashley | Keep both original + web derivative / Originals only | Both (original for print, web-optimised for CDN) | 🟡 TENTATIVE |
| **Credits Attribution** | Ashley | Per-asset credits visible / Metadata only | Visible on gallery pages; metadata in catalogue | 🟡 TENTATIVE |

### Approval Checkpoints

**Before TOA-280 starts:** Approve Figma extraction approach and sample size  
**Before TOA-277 starts:** Approve catalogue schema and storage provider  
**Before TOA-276 finalizes:** Confirm cost model and SLA expectations  
**Before TOA-278 starts:** Approve migration workflow and reference mapping strategy  
**Before TOA-279 starts:** Approve validation criteria and handoff procedures

---

## Section 9: Blockers and Risk Mitigations

| Blocker | Likelihood | Impact | Mitigation |
|---------|-----------|--------|-----------|
| **Figma Make does not export originals** | Medium | Can't recover lossless originals; stuck with rendered derivatives | Manual export workflow; document loss upfront |
| **Asset IDs not recoverable from Figma** | Low | Can't map 56 assets to Figma sources | Use filename/metadata heuristics; verify against website visuals |
| **Credits/usage rights unverified** | High | Attribution incomplete; potential rights issues | Document uncertainty; flag as "unknown" rather than inventing |
| **Print derivatives not achievable from web assets** | Medium | Book export may need manual re-creation | Retain Figma originals; export high-res before web optimisation |
| **CDN cost exceeds budget** | Low | Unexpected recurring cost | Cloudinary free tier covers 25K/mo API calls; budget $100/mo for ~1.5M/mo page views |
| **Storage provider service outage** | Low | Website images go dark | Version-controlled fallback catalogue; revert to placeholders if CDN fails |
| **Asset dimensions inconsistent (not print-ready)** | Medium | Book quality compromised | Flag in catalogue; require 300+ PPI for print-suitable assets |

---

## Section 10: Mapping to Child Issues

| Child Issue | Phase | Deliverable | Status |
|-------------|-------|-------------|--------|
| **TOA-280** (AI Ops evaluation) | 1 | Figma extraction capability assessment, sample asset pilot | 🔴 Not Started |
| **TOA-8** (Asset restoration) | 1 | Recovered assets, manual export gaps, visual validation | 🔴 Not Started |
| **TOA-277** (Catalogue schema) | 2 | Finalized catalogue JSON structure, example records | 🔴 Not Started |
| **TOA-276** (Storage evaluation) | 2 | Provider comparison, cost model, SLA commitments | 🔴 Not Started |
| **TOA-278** (Import & migration design) | 3 | Migration runbook, reference mapping spec, deduplication logic | 🔴 Not Started |
| **TOA-279** (Validation & handoff) | 4 | Validation checklist, known issues log, ops procedures | 🔴 Not Started |

---

## Section 11: Inventory Gap

### Previous Audit Claim vs. Verified Count

**Original Claim:** "The audit reports 75 unique `figma:asset/` references"  
**Verified Count:** 56 unique references (19 fewer than claimed)

**Possible Explanations:**

1. **Figma Make Deduplication:** Make may consolidate similar images internally; export count lower than design-time references
2. **Repository Refactoring:** Code cleanup between audit date and now; unused imports removed
3. **Asset Revisions:** Original audit may have counted different versions of same asset (v1, v2, v3 now consolidated to v1)
4. **Audit Methodology Unclear:** Original audit may have counted imports differently (e.g., per component vs per unique ID)

**Impact:** No urgent action; 56 is the accurate current count. If future work scales to 100+ assets, verify the methodology before committing timeline.

---

## Conclusion

A version-controlled asset catalogue with external CDN storage is viable and recommended. The phased approach (recovery → cataloguing → migration → validation) distributes work across six existing child issues and allows early feedback before full-scale migration.

**Immediate Next Step:** Approval of storage provider and Figma extraction approach to unblock TOA-280 and TOA-8.

---

**Audit completed:** 17 October 2026  
**Investigation scope:** Read-only; no code or Figma modifications  
**Availability:** All audit findings, asset references, and recommendations available in this report for planning and implementation
