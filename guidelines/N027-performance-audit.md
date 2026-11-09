# N027: Performance Audit Report

**Document ID:** N027  
**Category:** Reports & Archived (Performance)  
**Authority:** D4 (N-Document Approvals); D12 (Performance Targets from N012)  
**Last Updated:** 2026-11-09  
**Status:** Living Document (updated on each release)

## Purpose

Document performance targets, measurement methodology, and optimization strategies for ThisOneTimeOnAcidCom. This baseline report guides Phase 2 implementation.

## Core Web Vitals Targets

Target: Achieve "GOOD" status across all three Core Web Vitals for 75th percentile of users.

| Metric | Target | "Good" Range | "Needs Work" |
|--------|--------|--------------|-------------|
| **LCP** (Largest Contentful Paint) | ≤2.5s | 0-2.5s | >4.0s |
| **INP** (Interaction to Next Paint) | ≤200ms | 0-200ms | >500ms |
| **CLS** (Cumulative Layout Shift) | ≤0.1 | 0-0.1 | >0.25 |

## Performance Targets by Page

### Homepage (N023: README)

```
LCP: ≤2.5s
- Hero image optimized: <200KB (WebP)
- No render-blocking resources
- Critical CSS inlined

INP: ≤200ms
- CTA button response: <100ms
- Navigation link response: <200ms
- No long tasks (>50ms)

CLS: ≤0.05
- Hero image dimensions known (prevent shift)
- All fonts have size-adjust property
- Form fields don't shift on input focus
```

### Book Home (N024: Book Home)

```
LCP: ≤2.5s
- Chapter list server-rendered
- Cover image loaded early
- No blocking scripts

INP: ≤200ms
- Chapter click navigation: <150ms
- Progress bar update: <100ms
- Reading time calculation: <50ms

CLS: ≤0.1
- Book metadata card dimensions fixed
- Chapter grid gaps consistent
- No delayed content loading
```

### Book Chapter

```
LCP: ≤2.5s
- Chapter content streamed
- Font preloaded
- No above-fold images except header

INP: ≤200ms
- Page scroll: smooth (native)
- Bookmark button: <100ms
- Navigation: <200ms

CLS: ≤0.05
- Text line height stable
- Images have aspect-ratio property
- No sidebar collapse without height reservation
```

## Measurement Methodology

### Lab Measurement (Lighthouse)

```bash
# Run lighthouse audit
npx lighthouse https://example.com --output=json

# Typical results:
# LCP: 2100ms (GOOD)
# FID: 45ms (GOOD)
# CLS: 0.08 (GOOD)
```

### Field Measurement (Real User Data)

```typescript
// Web Vitals reporting
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

getCLS(console.log);  // CLS score
getLCP(console.log);  // LCP score
getFID(console.log);  // FID score
```

### Automation (GitHub Actions)

```bash
# Lighthouse CI integration
npm run lighthouse:ci

# Monitors performance across commits
# Alerts on regressions >5%
```

## Optimization Strategies

### Image Optimization (N012: Performance Optimization)

```
✅ Use next/image for automatic optimization
✅ Serve modern formats: WebP, AVIF with fallbacks
✅ Implement responsive images with srcset
✅ Lazy load below-the-fold images
✅ Target: Hero <200KB, thumbnails <50KB
✅ Use image CDN for delivery (Vercel CDN built-in)
```

### JavaScript Optimization

```
✅ Code-split by route with dynamic imports
✅ Tree-shake unused dependencies
✅ Lazy load non-critical third-party scripts
✅ Use async/defer for script loading
✅ Target: Initial JS <150KB (gzipped)
✅ Monitor bundle size with bundlesize
```

### CSS Optimization

```
✅ Inline critical CSS above fold
✅ Defer non-critical CSS with media queries
✅ Use CSS variables for theming (no CSS-in-JS)
✅ Minimize CSS through BEM modularity
✅ Purge unused styles (CSS modules)
✅ Use CSS Grid/Flexbox (no float hacks)
```

### Font Loading (N012)

```
✅ Use font-display: swap for custom fonts
✅ Preload critical font files
✅ Subset fonts (Latin only by default)
✅ Avoid @import (use link preload)
✅ Limit to 2-3 font families
✅ Use system fonts for fallback
```

## Performance Budget

### Bundle Size Limits

```
| Resource | Limit | Current | Trend |
|----------|-------|---------|-------|
| JS       | 150KB | TBD     | Monitor |
| CSS      | 50KB  | TBD     | Monitor |
| Images   | 500KB | TBD     | Monitor |
| Total    | 800KB | TBD     | Monitor |
```

### Runtime Performance

```
| Metric | Budget | Target |
|--------|--------|--------|
| Long Tasks (>50ms) | 0 | Eliminate |
| Main Thread Time | <4s | Keep <3s |
| Time to Interactive | <5s | Keep <3s |
| Speedindex | <5s | Keep <3s |
```

## Testing Scenarios

### Lighthouse Audit (Chrome DevTools)

```bash
Steps:
1. Open DevTools (F12)
2. Go to Lighthouse tab
3. Click "Generate report"
4. Wait for results
5. Review scores for LCP, CLS, INP
6. Check opportunities and diagnostics
```

### Web Vitals Monitoring

```javascript
// Monitor real-user metrics
import { getCLS, getLCP, getINP } from 'web-vitals';

getCLS((metric) => {
  if (metric.value > 0.1) {
    console.warn('CLS threshold exceeded:', metric);
  }
});

getLCP((metric) => {
  if (metric.value > 2500) {
    console.warn('LCP threshold exceeded:', metric);
  }
});
```

### Network Throttling Test

```
Steps:
1. Chrome DevTools → Network tab
2. Set throttle to "Fast 3G"
3. Reload page
4. Observe LCP, FID, CLS values
5. Verify still meet targets at reduced speed
```

## Monitoring & Alerts

### Continuous Monitoring

- **Vercel Analytics:** Real-user metrics (PRO plan)
- **Google Analytics:** Page performance timings
- **Lighthouse CI:** Regression detection on PRs
- **Sentry:** Error and performance monitoring

### Alert Thresholds

```yaml
# GitHub Actions alert configuration
- LCP >3s: Create issue, alert in Slack
- CLS >0.15: Flag in PR review
- INP >300ms: Monitor, assess on mobile
- Bundle size +10KB: Request in PR
```

## Phase 2 Performance Goals

### Pre-Implementation (Baseline)

- Establish current performance baseline
- Set per-page targets
- Configure monitoring

### During Implementation (Optimize)

- Monitor bundle size with each commit
- Run Lighthouse CI on PRs
- Optimize images as added
- Monitor Core Web Vitals

### Post-Implementation (Validate)

- Full Lighthouse audit across all pages
- Validate Core Web Vitals targets met
- Deploy to production and monitor
- Iterate on performance issues

## Performance Tools & Resources

### Measurement Tools

- **Lighthouse:** https://developers.google.com/web/tools/lighthouse
- **Web Vitals Library:** https://github.com/GoogleChrome/web-vitals
- **Vercel Analytics:** https://vercel.com/analytics
- **PageSpeed Insights:** https://pagespeed.web.dev/

### Optimization Tools

- **next/image:** Automatic image optimization
- **Bundle Analyzer:** Analyze JS bundle size
- **Font Tools:** Subset and optimize fonts
- **CSS Purgation:** Remove unused styles

### Monitoring Services

- **Vercel Observability:** Real-user metrics
- **Sentry:** Error & performance tracking
- **Google Search Console:** Core Web Vitals data
- **Lighthouse CI:** Regression detection

## Related Documentation

- **N012:** Performance Optimization Guidelines
- **N023-N025:** Page implementations (performance targets)
- **Guidelines.md:** Development workflow
- Constitution VI: Package Management (bundler config)

## Sign-Off

**Baseline Performance Audit:** Phase 2 Implementation Target  
**Last Reviewed:** 2026-11-09  
**Next Review:** Upon Phase 2 completion (estimated 2026-11-30)

Performance monitoring and optimization continues throughout development. This report documents planned targets and methodology for Phase 2 pages and components.
