# Data Schema Specification

**Date:** March 8, 2026
**Status:** APPROVED

## 1. Hero Configurations Schema
Located at `/data/mock/heroes/`. Must follow `HeroConfig` interface. Keys are page identifiers (e.g., `music`, `about`, `typography`).

## 2. Template Parts Schema
```typescript
export interface NavItem {
  label: string;
  href: string;
  icon?: string;
  badge?: string;
  children?: NavItem[];
}

export interface TemplatePartsConfig {
  header: {
    default: NavItem[];
    devtools: NavItem[];
  };
  footer: {
    columns: { title: string; links: NavItem[] }[];
    socials: NavItem[];
  };
}
```

## 3. DevTools Stats System
Located at `/data/mock/ui/dev-tools-stats.ts`. Defines standard metrics to be gathered and displayed by `DevToolsStatsBar` (e.g., "WCAG AA", "Bundler Safe", "Size").
