# TOA Media Library – Decision Log

**Date:** 17 October 2026  
**Status:** Active decisions recorded

---

## Storage Provider Selection

**Decision:** Use **GitHub + Netlify** (free, zero-cost approach)  
**Override Reason:** Existing Netlify subscription eliminates $99/mo Cloudinary cost  
**Original Recommendation:** Cloudinary (UX + automation + cost-effective)  
**Approved By:** Ash Shaw  
**Effective:** 17 October 2026

### Rationale

- **Cost Avoidance:** $0/month (GitHub free + existing Netlify) vs. $99/mo (Cloudinary Pro)
- **Netlify Existing:** Already have active Netlify subscription → leverage existing infrastructure
- **Build Script Approach:** Accept manual Sharp/ImageMin build process for responsive sizing
- **Trade-off:** Accept loss of visual upload UX in favour of portability and cost
- **Portability:** 100% portable; no vendor lock-in; plain files + JSON catalogue

### Implementation Impact

1. **Storage:** Version-controlled assets in Git (or Git LFS if >1GB/month)
2. **Optimization:** Build-time Sharp/ImageMin script (not runtime Cloudinary transforms)
3. **CDN:** Netlify CDN serves from `public/` after build
4. **Book Export:** Direct file access to source assets (no API export needed)
5. **Setup:** 3–4 days (vs. 2–3 days with Cloudinary; see STORAGE-PROVIDER-COMPARISON.md § Option 2)

### Blockers & Mitigations

| Blocker | Mitigation |
|---------|-----------|
| No visual upload interface | Use CLI/Git workflow; document Git LFS process |
| Manual build script required | Write Sharp/ImageMin script in TOA-278 phase |
| Repository bloat (56 assets × 3 variants) | Monitor Git repo size; use Git LFS if >1GB/month |
| Build time increases | Implement caching in Netlify build config |

### Next Steps

1. ✅ Audit complete; decision documented
2. ⏳ Update MEDIA-LIBRARY-STRATEGY-REPORT.md § 5 (Storage & Publishing) to reflect GitHub recommendation
3. ⏳ Update STORAGE-PROVIDER-COMPARISON.md conclusion to prioritise GitHub option
4. ⏳ TOA-280: Figma asset recovery (unchanged; works with any storage)
5. ⏳ TOA-278: Build Sharp/ImageMin script for responsive sizing
6. ⏳ TOA-276: Confirm Git LFS limits and Netlify build time SLA

---

## Catalogue Location & Format

**Decision:** Version-controlled JSON in repository (`.github/data/assets.json` or `/catalog/assets.json`)  
**Status:** Pending approval  
**Approved By:** TBD

---

## Book Export Workflow

**Decision:** File-based export (copy high-res originals) before publishing  
**Status:** Pending approval  
**Approved By:** TBD

---

## Asset Credits Display

**Decision:** Visible on gallery pages + metadata catalogue  
**Status:** Pending approval  
**Approved By:** TBD

---

**Log prepared by:** Claude (AI audit)  
**Repository:** lightspeedwp/ThisOneTimeOnAcidCom  
**Epic:** TOA-269
