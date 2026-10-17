# Storage Provider Comparison – Detailed Analysis

## Overview

Three storage options evaluated for TOA media library. Each supports the proposed architecture (version-controlled catalogue + CDN delivery + book exports). **Approved provider: GitHub + Netlify** (see approval note at line 265). Cloudinary analysis below retained for reference; it remains the UX-optimized alternative if scaling requires it.

---

## Option 1: Cloudinary (RECOMMENDED)

### Summary
Industry-standard media management platform with visual upload interface, automatic optimisation, global CDN, and API-driven workflows. Best user experience and automation.

### Detailed Comparison

| Aspect | Rating | Details |
|--------|--------|---------|
| **Visual Upload UX** | ⭐⭐⭐⭐⭐ | Dashboard upload, drag-and-drop, folder organisation, metadata editor |
| **Automatic Optimisation** | ⭐⭐⭐⭐⭐ | WebP, responsive sizing, AVIF, format detection; URL-based transforms |
| **CDN Performance** | ⭐⭐⭐⭐⭐ | 198 PoPs globally; serves 2 trillion+ images/year industry-wide |
| **Book Quality Exports** | ⭐⭐⭐⭐ | API can export high-res variants; batch export feasible |
| **Portability** | ⭐⭐⭐ | API exports feasible; some vendor lock-in to URL schemes |
| **Original Preservation** | ⭐⭐⭐⭐ | Stores originals; generates derivatives on-demand |
| **Cost** | ⭐⭐⭐⭐ | Free tier: 25K API calls/mo (25 credits/mo); Plus: $99/mo (225K credits/mo) |
| **Access Control** | ⭐⭐⭐⭐ | Token-based, signed URLs, role-based dashboard access |
| **Integration Difficulty** | Easy | React SDK; environment config + reference mapping |

### Workflow

```
1. Upload original to Cloudinary (web, API, or webhook)
2. Store asset ID in catalogue: "toa-jungle-01"
3. URL generation at runtime:
   https://res.cloudinary.com/toa/image/upload/w_1200,q_auto,f_auto/toa/jungle-01.jpg
4. CDN auto-serves WebP if browser supports; JPEG fallback
5. Book export: API call for high-res variant (w_2400,q_95,f_jpg)
```

### Cost Model (TOA Scale)

**Assumptions:**
- 56 assets in catalogue
- 3 responsive variants per asset (480, 800, 1200px)
- 3 image renders per page view
- ~5,000 monthly unique visitors

| Item | Monthly | Annual |
|------|---------|--------|
| Cloudinary Pro tier | $99 | $1,188 |
| Credits included (625K/mo for transforms + API calls) | Included | Included |
| Additional overage (if >625K credits) | ~$0.001/credit | TBD |
| Book exports (manual API calls via SDK, ~12/year) | $0–5 | $0–60 |
| **Total** | **$99–104** | **$1,188–1,248** |

**Free Tier (if cost-conscious initially):**
- 25K API calls/month = ~80 daily page views with caching
- Suitable for low-traffic launch; upgrade to Pro at 1,000+ daily views

### Pros
✅ Easiest setup (one-line React integration)  
✅ No infrastructure management  
✅ Automatic responsive sizing (no build scripts)  
✅ Industry-standard (widely documented)  
✅ Excellent support for book export workflows  
✅ Global CDN, 99.95% uptime SLA  

### Cons
❌ Monthly recurring cost ($99/mo)  
❌ Some URL scheme vendor lock-in  
❌ Requires external account/API keys (vs self-hosted)  
❌ Not portable if company shut down (unlikely but theoretically possible)  

### Setup Time
**Estimated:** 2–3 days
- Day 1: Create account, configure bucket, API keys
- Day 2: React SDK integration, environment config, reference mapping
- Day 3: Test responsive sizing, book export API, CDN resolution

---

## Option 2: GitHub + Version-Controlled Assets

### Summary
Free, fully portable approach using Git (+ Git LFS if >100 MB). Assets live in repository; Netlify serves from `public/` at build time. No external vendor dependency. Requires build scripts for responsive sizing.

### Detailed Comparison

| Aspect | Rating | Details |
|--------|--------|---------|
| **Visual Upload UX** | ⭐⭐ | CLI/API only; requires Git/Node knowledge; no visual interface |
| **Automatic Optimisation** | ⭐⭐ | Manual build script (Sharp/ImageMin); no runtime transforms |
| **CDN Performance** | ⭐⭐⭐⭐ | Netlify CDN included; good for static sites; not as global as Cloudinary |
| **Book Quality Exports** | ⭐⭐⭐⭐⭐ | Assets in repo; direct file access for export |
| **Portability** | ⭐⭐⭐⭐⭐ | 100% portable; plain files + JSON catalogue; can migrate anywhere |
| **Original Preservation** | ⭐⭐⭐⭐⭐ | Git history preserves all versions |
| **Cost** | ⭐⭐⭐⭐⭐ | Free (GitHub + Netlify) |
| **Access Control** | ⭐⭐⭐ | GitHub permissions; no granular media-level controls |
| **Integration Difficulty** | Moderate | Git workflow, Sharp/ImageMin script, reference updates, CI/CD |

### Workflow

```
1. Clone repo; create assets/images/ branch (or LFS track)
2. Git add images; git commit; git push
3. Build-time:
   npm run optimize-images
     ↓
   sharp resizes originals → WebP + JPEG
     ↓
   outputs to public/images/
4. Netlify deploys; CDN serves from public/
5. Book export: copy source files from assets/ directory
```

### Cost Model (TOA Scale)

**Assumptions:**
- 56 assets, total ~150 MB
- Responsive variants stored (480, 800, 1200px)
- Netlify free tier (bandwidth unlimited; build time limited)

| Item | Monthly | Annual |
|------|---------|--------|
| GitHub (free) | $0 | $0 |
| GitHub LFS (10GB storage + 10GB bandwidth included free; $0.50/GB additional) | $0–10 | $0–120 |
| Netlify (free tier, build time limited) | $0 | $0 |
| Netlify Pro (if builds exceed free tier quota) | $0–20 | $0–240 |
| **Total (free tier, <10GB/mo assets)** | **$0** | **$0** |
| **Total (with LFS overage + Pro)** | **$10–30** | **$120–360** |

**Note:** GitHub's free tier includes 10GB LFS storage (total capacity) + 10GB bandwidth per month; free tier sufficient for TOA scale (<~500 daily page views). Upgrade only if stored assets exceed 10GB total capacity or monthly bandwidth exceeds 10GB, or if build time exceeds 45 min/month.

### Pros
✅ Zero cost (GitHub + Netlify free)  
✅ Complete portability (plain files)  
✅ Full version control history  
✅ No external vendor dependency  
✅ Book exports simple (direct file access)  
✅ Excellent for archival (can be stored on any platform)  

### Cons
❌ No visual upload interface (CLI/API only)  
❌ Manual build script for responsive sizing  
❌ Repository bloat (56 assets × 3 variants = 168+ files)  
❌ No on-the-fly transforms (all variants pre-generated)  
❌ Limited global CDN reach vs Cloudinary  
❌ Build time increases (Sharp processing on every deploy)  

### Setup Time
**Estimated:** 3–4 days
- Day 1: Plan Git LFS strategy, configure branch structure
- Day 2: Write Sharp/ImageMin build script, test responsive output
- Day 3: Integrate with Netlify build config, reference mapping
- Day 4: Test CDN delivery, Git LFS bandwidth limits, rollback procedure

---

## Option 3: AWS S3 + CloudFront

### Summary
Enterprise-grade approach for high-scale deployments. S3 stores originals with versioning; CloudFront CDN serves optimized derivatives. Requires AWS expertise. Best if organisation already uses AWS.

### Detailed Comparison

| Aspect | Rating | Details |
|--------|--------|---------|
| **Visual Upload UX** | ⭐⭐⭐ | S3 console (basic) or third-party uploader (complex) |
| **Automatic Optimisation** | ⭐⭐⭐ | Lambda@Edge or third-party needed; not built-in |
| **CDN Performance** | ⭐⭐⭐⭐⭐ | CloudFront global edge; excellent for global audience |
| **Book Quality Exports** | ⭐⭐⭐⭐ | Batch download via SDK or Lambda function |
| **Portability** | ⭐⭐⭐⭐ | AWS-specific APIs; exportable via standard tools |
| **Original Preservation** | ⭐⭐⭐⭐⭐ | S3 versioning + lifecycle policies |
| **Cost** | ⭐⭐⭐ | $5–30/mo (storage + data transfer) |
| **Access Control** | ⭐⭐⭐⭐⭐ | IAM, bucket policies, signed URLs, CloudFront OAI |
| **Integration Difficulty** | Hard | AWS IAM, S3 config, CloudFront distribution, Lambda (optional) |

### Workflow

```
1. Create S3 bucket (versioning enabled)
2. Upload assets via S3 console / SDK
3. CloudFront distribution (OAI restricts direct S3 access)
4. URL generation:
   https://d123.cloudfront.net/toa/jungle-01.jpg
5. Optional: Lambda@Edge for on-demand resizing
6. Book export: Bulk download via SDK or Lambda function
```

### Cost Model (TOA Scale)

**Assumptions:**
- 150 MB stored in S3
- 56 assets × 3 variants = 168 files
- ~30 GB bandwidth/month (typical for 5K monthly users)

| Item | Monthly | Annual |
|------|---------|--------|
| S3 storage (150 MB) | $0.35 | $4.20 |
| S3 GET requests (30K/mo) | $0.12 | $1.44 |
| CloudFront data transfer (30 GB) | $2.55 | $30.60 |
| CloudFront requests (50K/mo) | $0.05 | $0.60 |
| Lambda@Edge (if used for transforms) | $1–5 | $12–60 |
| **Total (basic)** | **~$3/mo** | **~$37/year** |
| **Total (with Lambda)** | **~$6/mo** | **~$72/year** |

**Note:** Pricing scales with traffic; 100K+ monthly users → $20–50/mo.

### Pros
✅ Very low cost at TOA scale  
✅ Enterprise-grade reliability (99.99% uptime)  
✅ Excellent for future scale (100K+ users)  
✅ S3 versioning (audit trail)  
✅ IAM fine-grained access control  
✅ If already using AWS: integrate easily  

### Cons
❌ Complex setup (AWS-specific knowledge required)  
❌ Overkill for TOA scale (over-engineered)  
❌ No visual upload interface (AWS console only)  
❌ Lambda overhead (maintain functions)  
❌ Higher integration complexity  
❌ Costs scale faster with traffic than Cloudinary (above 1.5M API calls)  

### Setup Time
**Estimated:** 4–6 days
- Day 1–2: IAM setup, S3 bucket + versioning, lifecycle policies
- Day 3: CloudFront distribution, OAI, signed URLs
- Day 4: SDK integration, reference mapping
- Day 5: Lambda@Edge (if needed for transforms)
- Day 6: Testing, disaster recovery, documentation

---

## Recommendation Matrix

| Use Case | Best Option | Rationale |
|----------|-----------|-----------|
| **Rapid launch (weeks)** | Cloudinary | Fastest setup, minimal DevOps, excellent UX |
| **Zero-cost MVP** | GitHub | Free, portable, suitable for launch phase |
| **Enterprise scale (>100K users)** | AWS S3 + CloudFront | Lowest long-term cost, proven reliability |
| **Book publishing focus** | Cloudinary | Built-in export API for high-res variants |
| **Maximum portability** | GitHub | No vendor lock-in; can migrate anywhere |
| **Team with AWS expertise** | AWS S3 | Leverage existing infrastructure |

---

## Final Recommendation: GitHub + Netlify (Approved)

**Why GitHub + Netlify was selected for TOA:**

1. **Cost:** $0/month (leverages existing Netlify subscription; no additional expense)
2. **Portability:** 100% vendor lock-in free; plain files + JSON catalogue
3. **Integration:** Seamless Git workflow; version control + audit trail
4. **Existing infrastructure:** Netlify already deployed and configured
5. **Trade-off accepted:** Manual Sharp/ImageMin build process for responsive sizing (vs runtime Cloudinary transforms)
6. **Build scalability:** Caching in Netlify build config prevents bloat

**Migration path:**
- Commit assets to Git LFS (or versioned directory if <1GB/month)
- Write Sharp/ImageMin build script (Phase 4: TOA-278)
- Populate version-controlled asset catalogue (`.github/data/assets.json` or `/catalog/assets.json`)
- Deploy to Netlify; CDN serves optimized variants
- If scaling requires provider change, export assets and migrate to Cloudinary/AWS

**Approval note (17 October 2026):** The original audit recommended Cloudinary ($99/mo) for UX and automation. This decision supersedes that recommendation, prioritising zero-cost operation and full portability over hosted platform convenience. Cloudinary analysis in Section 1 remains available for future reference if scaling or UX requirements change.

---

## Implementation Checklist

### Pre-Migration
- [ ] Confirm storage provider (GitHub + Netlify)
- [ ] Set budget ($0/month; monitor Git LFS bandwidth if >10GB/month)
- [ ] Verify Figma asset recovery (TOA-280 pilot)
- [ ] Design catalogue schema (TOA-277)
- [ ] Plan reference migration workflow (TOA-278)

### GitHub + Netlify Setup
- [ ] Create `.github/data/` directory (or `/catalog/`) for assets.json
- [ ] Configure Git LFS for large binaries (if needed; see TOA-276)
- [ ] Set up Git LFS bandwidth monitoring
- [ ] Configure Netlify build caching for image optimization
- [ ] Document Git workflow for asset uploads

### Build Script Development
- [ ] Write Sharp/ImageMin build script (TOA-278)
- [ ] Configure responsive breakpoints (web: 1200px+, print: 2400px+)
- [ ] Test build output on multiple devices
- [ ] Validate high-res exports for book publishing
- [ ] Document build process for operations team

### Validation
- [ ] 100% of 56 assets committed to Git
- [ ] Build script generates all required variants
- [ ] Netlify CDN serves optimized files
- [ ] Responsive variants load (480, 800, 1200px)
- [ ] WebP served to modern browsers; JPEG fallback
- [ ] Core Web Vitals pass (LCP <2.5s)
- [ ] Book export produces high-res PNG/JPEG
- [ ] Rollback to placeholders works without code changes

---

**Cost Summary:**

| Provider | Monthly | Annual | Recommendation |
|----------|---------|--------|---|
| **GitHub + Netlify** | $0–30 | $0–360 | ✅ Approved |
| Cloudinary | $99 | $1,188 | Alternative (UX-optimized scaling) |
| AWS S3 | $3–20 | $36–240 | Overkill at TOA scale |

---

**Next Action:** Begin GitHub + Netlify setup (TOA-278: migration design) with approved provider. Implement asset catalogue versioning, Netlify CDN deployment, and Sharp-based image optimisation.
