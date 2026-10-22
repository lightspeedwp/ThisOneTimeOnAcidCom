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
- CSS is loaded with `display=swap` to show fallback system fonts while web fonts load
- Fallback text (system fonts) appears while web fonts load, then swaps to web fonts once loaded
- All 8 variable font families available within 3 seconds

**Test Procedure:**
1. Open preview URL in browser
2. Open DevTools → Network tab
3. Check that requests to `fonts.googleapis.com` and `fonts.gstatic.com` return 200
4. Note time to first paint (Performance tab)
5. Verify fallback fonts appear initially, then swap to web fonts
6. Verify all pages display correct fonts (not stuck on fallback system fonts)

**Success Criteria:**
- ✅ Fonts load with no console errors
- ✅ No CSP violations related to font URLs
- ✅ Fallback text visible while web fonts load, then final web fonts render
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

**Active Policy:** Content-Security-Policy header is currently **NOT defined** in the active `netlify.toml`. The draft policy in `src/app/netlify.toml` is intentionally deferred because it would block Typeform, YouTube, and Vimeo embeds.

**Future Policy (when CSP is enabled):**
```text
Content-Security-Policy: default-src 'self' 'unsafe-inline'; script-src 'self' 'unsafe-inline' https://embed.typeform.com https://www.youtube.com https://player.vimeo.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; frame-src 'self' https://www.youtube.com https://player.vimeo.com https://embed.typeform.com; img-src 'self' data: https:;
```

**Note:** When CSP is enabled, ensure `'unsafe-inline'` is used for inline styles and scripts, or implement nonces. Replace nonce placeholders with generated values for each request.

**Current Validation Steps:**
1. Open DevTools → Network tab
2. Inspect response headers for any page
3. Note that `Content-Security-Policy` header is **not present** (by design)
4. Verify third-party resources load without CSP blocks:
   - Typeform embed script: `embed.typeform.com`
   - Google Fonts: `fonts.googleapis.com`, `fonts.gstatic.com`
   - YouTube embeds: `www.youtube.com`
   - Vimeo embeds: `player.vimeo.com`

**Success Criteria:**
- ✅ No CSP violations logged in console
- ✅ All integrations can load resources (currently unblocked)
- ✅ Once CSP is implemented, third-party domains are correctly allowlisted

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
```text
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
- ✅ Missing assets return 404 (SPA fallback to HTML)
- ✅ Favicon returns 200 with image content-type (not text/html)
- ✅ Security headers present on all routes

---

## Performance Metrics

**Baseline Expectations (from PR #345):**

| Metric | Target | Notes |
|--------|--------|-------|
| LCP (Largest Contentful Paint) | < 3.0s | HTML render + fonts |
| INP (Interaction to Next Paint) | < 200ms | React interactivity responsiveness (Lighthouse lab proxy: TBT) |
| CLS (Cumulative Layout Shift) | < 0.1 | Fonts swap should not shift layout |
| FCP (First Contentful Paint) | < 1.8s | HTML + CSS render |
| TTFB (Time to First Byte) | < 600ms | Netlify edge response |

**Measurement:**
1. Open preview URL
2. Open DevTools → Lighthouse tab
3. Run audit (Mobile + Desktop)
4. Compare metrics to baselines
5. Document in test results

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
- [ ] No FOUT/FOIT visible
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

### Performance Metrics (Lighthouse)

| Metric | Target | Result | Status |
|--------|--------|--------|--------|
| LCP | < 3.0s | ___ s | ✅/❌ |
| INP (Lab proxy: TBT) | < 200ms | ___ ms | ✅/❌ |
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

## Validation Results

**Date:** 2026-10-22  
**Preview URL:** https://deploy-preview-426--thisonetimeonacid.netlify.app  
**Overall Status:** 🟡 PARTIAL — PR #427 deployment, browser, performance, and required validation checks pending

Preview #426 results below are historical and do not validate PR #427. Verify the current PR #427 preview before marking any pending checks complete.

### Summary

- ✅ **Historical Deployment Validation (preview #426 only)**: All header checks passed
  - HTML routes return 200 with revalidation headers
  - Hashed assets return 200 with immutable caching
  - Favicon returns 200 (verify content-type is image, not text/html)
  - Missing assets return 404 (SPA fallback to HTML) — VERIFIED

- 🟡 **Integration Testing**: Awaiting manual verification
  - [ ] Google Fonts load without CSP errors
  - [ ] Typeform embed renders and is interactive
  - [ ] YouTube embeds play with controls
  - [ ] Vimeo embeds play with controls

- 🟡 **Performance Metrics**: Awaiting Lighthouse audit
  - [ ] LCP < 3.0s
  - [ ] INP < 200ms (lab proxy: TBT)
  - [ ] CLS < 0.1
  - [ ] FCP < 1.8s
  - [ ] TTFB < 600ms

---

**Last Updated:** 2026-10-22  
**Status:** 🟡 PARTIAL — Current PR #427 preview verification, browser, performance, and required validation checks pending
