# Production launch prep — orchestrator

**Created:** March 6, 2026
**Purpose:** Final pre-launch audit across 5 areas before production deployment.

---

## Scope

This orchestrator covers 5 sub-audits to verify production readiness:

1. **SEO & structured data verification** — Validate all `setSEO()` wiring, Schema.org JSON-LD accuracy, `index.html` meta tags, OG/Twitter Card completeness, and content accuracy in SEO data files.
2. **Accessibility final check** — Re-verify WCAG 2.1 AA compliance, `prefers-reduced-motion` coverage, keyboard navigation, focus indicators, and ARIA attributes.
3. **Performance review** — Google Fonts loading strategy, CSS/JS bundle size, image optimization, service worker caching, Netlify headers.
4. **Cross-browser & PWA readiness** — `manifest.json` completeness, service worker registration, offline fallback, `netlify.toml` SPA routing, security headers.
5. **Content accuracy & stale references** — Post-migration content consistency (Berlin vs Cape Town), stale Lucide references in data files, sentence case compliance.

## Reference guidelines

- [Guidelines.md](../../guidelines/Guidelines.md)
- [overview-components.md](../../guidelines/overview-components.md)
- [pwa-implementation.md](../../guidelines/pwa-implementation.md)
- [prefers-reduced-motion.md](../../guidelines/prefers-reduced-motion.md)
- [Data System Documentation](../../data/README.md)
- [SEO data files](../../data/mock/seo/)

## Reports

All findings saved to `/reports/production-launch-prep/`.

## Task list

Actionable items extracted to `/tasks/production-launch-prep-tasks.md`.
