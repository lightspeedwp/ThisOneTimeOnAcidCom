# Data Files Audit

**Date:** March 8, 2026
**Status:** COMPLETE

## 1. Scope
Audited `/data/mock/pages/`, `/data/mock/ui/`, `/data/mock/portfolio/`, and `/data/mock/blog/`.

## 2. Findings
- Hero data is currently duplicated across dozens of page files (`about.ts`, `music.ts`, `home.ts`).
- Navigation data exists in multiple places (`navigation.ts`, DevTools items mapped in component).
- No single source of truth for "Template Parts".

## 3. Recommendations
- Create unified schema interfaces: `HeroConfig`, `TemplatePartsConfig`.
- Consolidate all hero data into `/data/mock/heroes/site-heroes.ts` and `/data/mock/heroes/dev-tools-heroes.ts`.
- Consolidate navigation and part configuration into `/data/mock/ui/template-parts-config.ts`.
