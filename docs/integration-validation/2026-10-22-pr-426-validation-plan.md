# Integration Validation Plan

**Date:** 2026-10-22  
**PR:** fix/coderabbit-review-findings-netlify  
**Related:** PRs #345, #343; Issues #6, #418

## Overview

This document outlines validation procedures for external integrations (Google Fonts, Typeform, YouTube, Vimeo) on the Netlify preview deployment. Testing ensures Content Security Policy (CSP) headers do not block third-party resources and integrations function correctly.

---

## Integrations & Expected Behavior

### 1. Google Fonts

**Files:** `src/app/index.html`

**Configuration:**
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300..700&family=Inter:wght@300..700&family=Righteous&family=Playfair+Display:wght@400..700&family=JetBrains+Mono:wght@300..700&family=Fira+Code:wght@300..700&family=Space+Mono:wght@400;700&family=Vampiro+One&display=swap" rel="stylesheet">
```

**Expected Behavior:**
- Preconnect reduces latency to fonts.googleapis.com
- `display=swap` shows fallback text while the web font loads, then swaps to the downloaded font (a visible FOUT is acceptable)
- Text remains readable in the fallback font during loading; the final web font must load successfully
- All 8 variable font families available within 3 seconds

**Test Procedure:**
1. Open preview URL in browser
2. Open DevTools → Network tab
3. Check that requests to `fonts.googleapis.com` and `fonts.gstatic.com` return 200
4. Note time to first paint (Performance tab)
5. Throttle the network and verify fallback text appears while fonts load; a visible swap is expected
6. After loading, use DevTools → Elements → Rendered Fonts to verify the intended web fonts render on each page

**Success Criteria:**
- ✅ Fonts load with no console errors
- ✅ No CSP violations related to font URLs
- ✅ Fallback text remains readable during loading and swaps to the intended web font
- ✅ LCP (Largest Contentful Paint) < 3.0s

---

### 2. Typeform

**Files:** `src/app/components/common/TypeformEmbed.tsx`

**Configuration:**
```typescript
script.src = 'https://embed.typeform.com/next/embed.js'
```

**Expected Behavior:**
- Typeform embed script loads dynamically
- Forms render inline without navigation
- No CSP blocks for `embed.typeform.com`
- Script loaded only once (existing script check prevents duplicates)

**Test Procedure:**
1. Navigate to any page containing a Typeform embed
2. Open DevTools → Console tab
3. Check for CSP/CORS errors
4. Verify form renders inline
5. Test form interaction (type in field, view validation)
6. Submit form (if available)

**Success Criteria:**
- ✅ Script loads with no CSP violations
- ✅ Form renders without navigation
- ✅ Form is interactive (can type, select, submit)
- ✅ No duplicate script loading

---

### 3. YouTube Embeds

**Files:** `src/app/components/ui/VideoPlayer.tsx`

**Configuration:**
```typescript
// Detects and converts YouTube URLs to embed format
// Supports: youtube.com/watch?v=ID and youtu.be/ID
const embedUrl = `https://www.youtube.com/embed/${videoId}`
```

**Expected Behavior:**
- YouTube embeds load via iframe
- Videos play inline with controls
- No CSP blocks for `youtube.com` and `youtube-nocookie.com`
- Responsive iframe respects container width

**Test Procedure:**
1. Navigate to pages containing YouTube embeds
2. Open DevTools → Console tab
3. Check for CSP/CORS errors
4. Verify iframe renders with video
5. Test video playback (click play, verify video plays)
6. Verify full-screen capability
7. Check responsive behavior (resize window)

**Success Criteria:**
- ✅ Iframe loads without CSP violations
- ✅ Video plays with audio
- ✅ Controls visible and functional
- ✅ Responsive on mobile/tablet/desktop
- ✅ No console errors

---

### 4. Vimeo Embeds

**Files:** `src/app/components/ui/VideoPlayer.tsx`

**Configuration:**
```typescript
// Detects and converts Vimeo URLs to embed format
// Supports: vimeo.com/ID and player.vimeo.com embed
const embedUrl = `https://player.vimeo.com/video/${videoId}`
```

**Expected Behavior:**
- Vimeo embeds load via iframe (player.vimeo.com)
- Videos play inline with controls
- No CSP blocks for `player.vimeo.com` or `vimeo.com`
- Responsive iframe respects container width

**Test Procedure:**
1. Navigate to pages containing Vimeo embeds
2. Open DevTools → Console tab
3. Check for CSP/CORS errors
4. Verify iframe renders with video
5. Test video playback (click play, verify video plays)
6. Verify full-screen capability
7. Check responsive behavior (resize window)

**Success Criteria:**
- ✅ Iframe loads without CSP violations
- ✅ Video plays with audio
- ✅ Controls visible and functional
- ✅ Responsive on mobile/tablet/desktop
- ✅ No console errors

---

## CSP Validation

**Root CSP Header:** `src/app/netlify.toml` (inactive) / `netlify.toml` (active)

**Expected Header:**
```
Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https:; connect-src 'self' https:; frame-ancestors 'none';
```

**Validation Steps:**
1. Open DevTools → Network tab
2. Inspect response headers for any page
3. Verify `Content-Security-Policy` header present
4. Compare the complete header with the active root `netlify.toml`:
   - `script-src`: 'self' and 'unsafe-inline'
   - `style-src`: 'self', 'unsafe-inline', and fonts.googleapis.com
   - `font-src`: 'self' and fonts.gstatic.com
   - `connect-src`: 'self' and https:; `frame-ancestors`: 'none'
   - No `frame-src` is declared, so frames fall back to `default-src 'self'`
5. Record integration failures under the active policy: external Typeform scripts and Typeform, YouTube, and Vimeo frames are not allowed. The functional expectations above remain pending until tested; this plan does not change the policy.

**Success Criteria:**
- ✅ CSP header present and valid
- ✅ No violations logged in console
- ✅ All integrations can load resources

---

## Deployment Validation Script

**Script:** `scripts/check-netlify-headers.mjs`

**Usage:**
```bash
node scripts/check-netlify-headers.mjs <deploy-preview-url>
```

**Example:**
```bash
node scripts/check-netlify-headers.mjs https://deploy-preview-XXX--thisonetimeonacid.netlify.app
```

**Expected Output:**
```
200  /  [text/html]  cache-control: public, max-age=0, must-revalidate
200  /journal  [text/html]  cache-control: public, max-age=0, must-revalidate
200  /about-ash  [text/html]  cache-control: public, max-age=0, must-revalidate
200  /assets/index-BiYfWfa0.js  [application/javascript]  cache-control: public, max-age=31536000, immutable
200  /assets/index-BMyFmeQv.css  [text/css]  cache-control: public, max-age=31536000, immutable
200  /favicon.ico  [image/x-icon]  cache-control: (empty or default)
404  /assets/index-missing0.js  [text/html]  cache-control: public, max-age=0, must-revalidate

All header checks passed for <deploy-preview-url>
```

**Validation Checks:**
- ✅ HTML routes return 200 with revalidation headers
- ✅ Hashed assets return 200 with immutable caching
- ✅ Missing assets (`/assets/index-missing0.js`) return 404; a 200 HTML SPA response is a failure
- ✅ Public files (`/favicon.ico`) return 200 with an `image/*` Content-Type and without immutable caching; a 200 HTML response is a failure
- ✅ Security headers present on all routes

---

## Performance Metrics

**Baseline Expectations (from PR #345):**

| Metric | Target | Notes |
|--------|--------|-------|
| LCP (Largest Contentful Paint) | < 3.0s | HTML render + fonts |
| INP (Interaction to Next Paint) | ≤ 200ms | Field: CrUX via PageSpeed Insights, 75th percentile over the previous 28 days, per device type |
| TBT (Total Blocking Time) | < 200ms | Lighthouse lab proxy for responsiveness; does not measure INP |
| CLS (Cumulative Layout Shift) | < 0.1 | Fonts swap should not shift layout |
| FCP (First Contentful Paint) | < 1.8s | HTML + CSS render |
| TTFB (Time to First Byte) | < 600ms | Netlify edge response |

**Measurement:**
1. Open preview URL
2. Open DevTools → Lighthouse tab
3. Run audit (Mobile + Desktop)
4. Compare Lighthouse lab metrics, including TBT, to baselines
5. Record INP separately from CrUX field data in PageSpeed Insights (URL or explicitly labelled origin data, mobile/desktop). Preview URLs may have no field data; record INP as unavailable/pending in that case, without substituting TBT or claiming a pass.
6. Document results, source, device type, and measurement date

---

## Test Results Template

```markdown
## Deployment Preview Test Results

**Date:** YYYY-MM-DD  
**Preview URL:** https://deploy-preview-XXX--thisonetimeonacid.netlify.app  
**Tested by:** [name]

### Integration Tests

#### Google Fonts
- [ ] Fonts load without CSP errors
- [ ] Fallback text is readable while loading, then the intended web font renders
- [ ] All font weights/styles available
- [ ] LCP < 3.0s

**Issues:** [none / list any]

#### Typeform
- [ ] Script loads without CSP errors
- [ ] Form renders inline
- [ ] Form is interactive
- [ ] No duplicate script loading

**Issues:** [none / list any]

#### YouTube Embeds
- [ ] Iframe loads without CSP errors
- [ ] Video plays with audio
- [ ] Controls functional
- [ ] Responsive on mobile

**Issues:** [none / list any]

#### Vimeo Embeds
- [ ] Iframe loads without CSP errors
- [ ] Video plays with audio
- [ ] Controls functional
- [ ] Responsive on mobile

**Issues:** [none / list any]

### Deployment Validation Script

\`\`\`bash
$ node scripts/check-netlify-headers.mjs <deploy-preview-url>
[script output here]
\`\`\`

- [ ] Script returns 0 exit code
- [ ] All checks passed

### Performance Metrics (Lighthouse lab and CrUX field data)

| Metric | Target | Result | Status |
|--------|--------|--------|--------|
| LCP | < 3.0s | ___ s | ✅/❌ |
| INP (CrUX field, PageSpeed Insights, 75th percentile / 28 days) | ≤ 200ms | ___ ms; URL/origin, device, date (or unavailable) | ✅/❌/pending |
| TBT (Lighthouse lab proxy) | < 200ms | ___ ms | ✅/❌ |
| CLS | < 0.1 | ___ | ✅/❌ |
| FCP | < 1.8s | ___ s | ✅/❌ |
| TTFB | < 600ms | ___ ms | ✅/❌ |

### Summary

- [ ] All integrations functional
- [ ] No CSP violations
- [ ] Performance meets baseline
- [ ] No regressions detected

**Overall Status:** ✅ PASS / ❌ NEEDS REVISION
```

---

## Related Documentation

- [PR #345](https://github.com/lightspeedwp/ThisOneTimeOnAcidCom/pull/345) - Netlify hashed-asset caching
- [PR #343](https://github.com/lightspeedwp/ThisOneTimeOnAcidCom/pull/343) - HTML revalidation and cache verification
- [Issue #418](https://github.com/lightspeedwp/ThisOneTimeOnAcidCom/issues/418) - Deployment verification tracking
- [Issue #6](https://github.com/lightspeedwp/ThisOneTimeOnAcidCom/issues/6) - Netlify caching and headers
- `netlify.toml` - Active Netlify configuration
- `scripts/check-netlify-headers.mjs` - Deployment validation script
- `src/app/netlify.toml` - Archived (inactive) configuration

---

**Last Updated:** 2026-10-22  
**Status:** Pending — Preview available; deployment contract failures and integration/performance validation remain outstanding

---

## Validation Results — PR #426

**Date:** 2026-10-22  
**Preview URL:** https://deploy-preview-426--thisonetimeonacid.netlify.app  
**Status:** Pending — Deployment contract failures; Google Fonts, Typeform, YouTube, Vimeo, and Lighthouse outcomes not recorded

### Deployment Validation Script Results

**Historical output from the earlier permissive checker:** Its success message does not satisfy the current contract. The recorded missing-asset status and favicon Content-Type below are failures; rerun the updated checker after deployment fixes.

```bash
$ node scripts/check-netlify-headers.mjs https://deploy-preview-426--thisonetimeonacid.netlify.app
200  /  [text/html; charset=UTF-8]  cache-control: public,max-age=0,must-revalidate
200  /journal  [text/html; charset=UTF-8]  cache-control: public,max-age=0,must-revalidate
200  /about-ash  [text/html; charset=UTF-8]  cache-control: public,max-age=0,must-revalidate
200  /assets/index-missing0.js  [text/html; charset=UTF-8]  cache-control: public,max-age=0,must-revalidate
200  /favicon.ico  [text/html; charset=UTF-8]  cache-control: public,max-age=0,must-revalidate
200  /assets/index-BiYfWfa0.js  [application/javascript; charset=UTF-8]  cache-control: public,max-age=31536000,immutable
200  /assets/index-BMyFmeQv.css  [text/css; charset=UTF-8]  cache-control: public,max-age=31536000,immutable

All header checks passed for https://deploy-preview-426--thisonetimeonacid.netlify.app
```

**Updated checker rerun (2026-10-22):** Exited 1 against the same preview, rejecting `/assets/index-missing0.js` (expected 404, got 200) and `/favicon.ico` (unexpected `text/html; charset=UTF-8`). Deployment acceptance remains pending. A real `public/favicon.ico` has been added using the existing `src/app/public/favicon.svg` design; deployment verification is pending. The catch-all SPA rewrite still needs a missing-asset exception; routing changes await clarification of the instruction to leave Netlify configuration unchanged.

### Validation Checklist

**Caching Strategy:**
- ✅ HTML routes revalidate correctly (max-age=0, must-revalidate)
- ✅ Hashed assets have immutable 1-year caching (max-age=31536000, immutable)
- ❌ Missing asset must return 404; recorded `/assets/index-missing0.js` returned 200 HTML
- ❌ `/favicon.ico` must return 200 with an image Content-Type; recorded response was HTML

**Header Validation:**
- ✅ Security headers applied to all routes
- ✅ Cache-Control headers correct per asset type
- ❌ Favicon Content-Type is incorrect in the recorded response
- ❌ Updated checker rejects both recorded responses; a passing rerun is required

**Integration Testing:**
- ✅ Netlify deploy preview available and responsive
- ✅ Hashed assets loading with correct cache headers
- ✅ SPA routing working (direct visits to /journal and /about-ash)
- [ ] Google Fonts: fallback rendering and final web font loading outcomes not recorded
- [ ] Typeform: script loading, form rendering, and interaction outcomes not recorded
- [ ] YouTube: iframe loading, playback, and responsive behavior outcomes not recorded
- [ ] Vimeo: iframe loading, playback, and responsive behavior outcomes not recorded
- [ ] Lighthouse: mobile/desktop metrics, including TBT, not recorded; CrUX INP field data availability not checked
- [ ] CSP console results for each integration not recorded; the active policy blocks external scripts/frames described above

### CodeRabbit Findings — Resolution

**PR #345 Docstring Coverage:**
- ✅ 7 functions documented with comprehensive docstrings
- ✅ 80%+ coverage threshold achieved
- ✅ Functions documented:
  - isHashedAssetFileName
  - buildHashedAssetHeaders
  - netlifyHashedAssetHeaders
  - probe
  - checkSite
  - figmaAssetResolver
  - resolveReactExternals

**React Build Configuration:**
- ✅ resolveReactExternals plugin restored
- ✅ build.rollupOptions configuration restored
- ✅ jsx-runtime properly marked as external
- ✅ Pre-push build validation passes

**Integration Validation:**
- ✅ Comprehensive validation plan created (INTEGRATION-VALIDATION-PLAN.md)
- ✅ External integrations documented (Google Fonts, Typeform, YouTube, Vimeo)
- ✅ CSP validation procedures documented
- ✅ Test results template provided

### Summary

**Status:** Pending validation

The historical preview output supports the recorded HTML and hashed-asset caching checks, but fails the missing-asset and favicon contract. Google Fonts, Typeform, YouTube, Vimeo, and Lighthouse outcomes still need to be recorded. Document CrUX INP field results or their unavailability separately. Merge readiness is not established.

**Final Status:** Pending — Resolve deployment contract failures and record integration/performance outcomes before declaring completion
