/**
 * @fileoverview Centralised breadcrumb data for all page templates
 *
 * Every breadcrumb array rendered by the `<Breadcrumbs>` component MUST be
 * sourced from this file.  Static pages export a ready-made array; dynamic
 * pages (blog post, portfolio detail, etc.) export builder functions that
 * accept the entity-specific last item.
 *
 * @module data/mock/ui/breadcrumbs
 * @author Ash Shaw Portfolio Team
 * @version 1.0.0
 */

/* ────────────────────────────────────────────────
   Shared labels — single source of truth for the
   "Home >" root and every section name.
   ──────────────────────────────────────────────── */

export interface BreadcrumbEntry {
  label: string;
  href?: string;
}

const HOME: BreadcrumbEntry = { label: "Home", href: "/" };

const SECTIONS = {
  about: { label: "About", href: "/about" } as BreadcrumbEntry,
  portfolio: { label: "Portfolio", href: "/portfolio" } as BreadcrumbEntry,
  blog: { label: "Insights", href: "/blog" } as BreadcrumbEntry,
  videos: { label: "Videos", href: "/videos" } as BreadcrumbEntry,
  events: { label: "Events", href: "/events" } as BreadcrumbEntry,
  podcasts: { label: "Podcasts", href: "/podcasts" } as BreadcrumbEntry,
  devTools: { label: "Developer tools", href: "/dev-tools" } as BreadcrumbEntry,
  book: { label: "The book", href: "/book" } as BreadcrumbEntry,
};

/* ────────────────────────────────────────────────
   Static breadcrumb arrays — pages with fixed paths
   ──────────────────────────────────────────────── */

/** /contact */
export const contactBreadcrumbs: BreadcrumbEntry[] = [
  HOME,
  { label: "Contact" },
];

/** /faq */
export const faqBreadcrumbs: BreadcrumbEntry[] = [
  HOME,
  { label: "FAQ" },
];

/** /feedback */
export const feedbackBreadcrumbs: BreadcrumbEntry[] = [
  HOME,
  { label: "Feedback" },
];

/** /search */
export const searchBreadcrumbs: BreadcrumbEntry[] = [
  HOME,
  { label: "Search" },
];

/** /stickers */
export const stickersBreadcrumbs: BreadcrumbEntry[] = [
  HOME,
  { label: "Sticker gallery" },
];

/** /sitemap */
export const sitemapBreadcrumbs: BreadcrumbEntry[] = [
  HOME,
  { label: "Sitemap" },
];

/** /terms */
export const termsBreadcrumbs: BreadcrumbEntry[] = [
  HOME,
  { label: "Terms & conditions" },
];

/** /privacy */
export const privacyBreadcrumbs: BreadcrumbEntry[] = [
  HOME,
  { label: "Privacy policy" },
];

/** /style-guide (public route) */
export const styleGuideBreadcrumbs: BreadcrumbEntry[] = [
  HOME,
  SECTIONS.devTools,
  { label: "Style guide" },
];

/* ────────────────────────────────────────────────
   Blog breadcrumbs
   ──────────────────────────────────────────────── */

/** /blog/category/:slug */
export function blogCategoryBreadcrumbs(categoryName: string): BreadcrumbEntry[] {
  return [HOME, SECTIONS.blog, { label: categoryName }];
}

/** /blog/tag/:slug */
export function blogTagBreadcrumbs(tagName: string): BreadcrumbEntry[] {
  return [HOME, SECTIONS.blog, { label: `Tag: ${tagName}` }];
}

/** /blog/:slug */
export function blogPostBreadcrumbs(postTitle: string): BreadcrumbEntry[] {
  return [HOME, SECTIONS.blog, { label: postTitle }];
}

/* ────────────────────────────────────────────────
   Portfolio breadcrumbs
   ──────────────────────────────────────────────── */

/** /portfolio/category/:slug */
export function portfolioCategoryBreadcrumbs(categoryName: string): BreadcrumbEntry[] {
  return [HOME, SECTIONS.portfolio, { label: categoryName }];
}

/** /portfolio/tag/:slug */
export function portfolioTagBreadcrumbs(tagName: string): BreadcrumbEntry[] {
  return [HOME, SECTIONS.portfolio, { label: `Tag: ${tagName}` }];
}

/** /portfolio/:slug */
export function portfolioDetailBreadcrumbs(entryTitle: string): BreadcrumbEntry[] {
  return [HOME, SECTIONS.portfolio, { label: entryTitle }];
}

/* ────────────────────────────────────────────────
   Video breadcrumbs
   ──────────────────────────────────────────────── */

/** /videos/category/:slug */
export function videoCategoryBreadcrumbs(categoryName: string): BreadcrumbEntry[] {
  return [HOME, SECTIONS.videos, { label: categoryName }];
}

/** /videos/tag/:slug */
export function videoTagBreadcrumbs(tagName: string): BreadcrumbEntry[] {
  return [HOME, SECTIONS.videos, { label: `Tag: ${tagName}` }];
}

/** /video/:slug */
export function videoDetailBreadcrumbs(videoTitle: string): BreadcrumbEntry[] {
  return [HOME, SECTIONS.videos, { label: videoTitle }];
}

/* ────────────────────────────────────────────────
   Podcast breadcrumbs
   ──────────────────────────────────────────────── */

/** /podcasts/category/:slug */
export function podcastCategoryBreadcrumbs(categoryName: string): BreadcrumbEntry[] {
  return [HOME, SECTIONS.podcasts, { label: categoryName }];
}

/** /podcasts/tag/:slug */
export function podcastTagBreadcrumbs(tagName: string): BreadcrumbEntry[] {
  return [HOME, SECTIONS.podcasts, { label: `Tag: ${tagName}` }];
}

/** /podcast/:slug */
export function podcastDetailBreadcrumbs(episodeTitle: string): BreadcrumbEntry[] {
  return [HOME, SECTIONS.podcasts, { label: episodeTitle }];
}

/* ────────────────────────────────────────────────
   Event breadcrumbs
   ──────────────────────────────────────────────── */

/** /events/category/:slug */
export function eventCategoryBreadcrumbs(categoryName: string): BreadcrumbEntry[] {
  return [HOME, SECTIONS.events, { label: categoryName }];
}

/** /events/tag/:slug */
export function eventTagBreadcrumbs(tagName: string): BreadcrumbEntry[] {
  return [HOME, SECTIONS.events, { label: `Tag: ${tagName}` }];
}

/** /events/:slug */
export function eventDetailBreadcrumbs(eventName: string): BreadcrumbEntry[] {
  return [HOME, SECTIONS.events, { label: eventName }];
}

/* ────────────────────────────────────────────────
   About sub-page breadcrumbs
   ──────────────────────────────────────────────── */

/** /about/* sub-pages */
export function aboutSubpageBreadcrumbs(pageLabel: string): BreadcrumbEntry[] {
  return [HOME, SECTIONS.about, { label: pageLabel }];
}

/** /ebook */
export function ebookBreadcrumbs(): BreadcrumbEntry[] {
  return [HOME, { label: "Book" }];
}

/* ────────────────────────────────────────────────
   Developer Tools breadcrumbs
   ──────────────────────────────────────────────── */

/** /dev-tools */
export const devToolsHubBreadcrumbs: BreadcrumbEntry[] = [
  HOME,
  { label: "Developer tools" },
];

/** /dev-tools/:tool */
export function devToolBreadcrumbs(toolLabel: string): BreadcrumbEntry[] {
  return [HOME, SECTIONS.devTools, { label: toolLabel }];
}

/** /dev-tools/detail-templates/:type */
export function detailTemplateBreadcrumbs(typeLabel: string): BreadcrumbEntry[] {
  return [HOME, SECTIONS.devTools, { label: 'Detail templates', href: '/dev-tools/detail-templates' }, { label: typeLabel }];
}