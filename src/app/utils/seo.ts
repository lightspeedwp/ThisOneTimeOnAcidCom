/**
 * @fileoverview Centralised SEO utility — updates document title, meta description,
 * Open Graph, and Twitter Card meta tags from a single call.
 *
 * @module utils/seo
 * @version 1.0.0
 */

/** Fallback brand suffix appended when no explicit title is provided */
const BRAND_SUFFIX = 'Ash Shaw';

/** Default meta values (must match index.html) */
const DEFAULT_TITLE = BRAND_SUFFIX + ' | Neon & UV Makeup Art — Berlin & Festival Portfolio';
const DEFAULT_DESCRIPTION =
  'Explore the bold neon and UV makeup artistry of Ash Shaw. Festival face painting, blacklight designs, editorial looks, and creative tutorials — from Berlin clubs to international psytrance festivals.';

export interface SEOData {
  /** Page title (will NOT have brand appended — supply full title) */
  title: string;
  /** Meta description (aim for 120–155 characters) */
  description: string;
  /** Optional canonical URL override */
  canonical?: string;
  /** Optional OG type (defaults to 'website') */
  ogType?: string;
}

/**
 * Safely update or create a `<meta>` tag.
 * @param attr - attribute selector key (e.g. 'name' or 'property')
 * @param attrValue - the attribute value (e.g. 'description' or 'og:title')
 * @param content - the content value to set
 */
function setMeta(attr: 'name' | 'property', attrValue: string, content: string): void {
  var query = 'meta[' + attr + '="' + attrValue + '"]';
  let el = document.querySelector(query);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, attrValue);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

/**
 * Set all SEO meta tags for the current page.
 * Call once inside a `useEffect` on each page component.
 *
 * @example
 * ```tsx
 * useEffect(() => {
 *   setSEO({
 *     title: 'About Ash Shaw | The Artist Behind Neon vs Atomic Black',
 *     description: 'Meet Ash Shaw — a Cape Town-based makeup artist...',
 *   });
 * }, []);
 * ```
 */
export function setSEO(data: SEOData): void {
  if (data == null) {
    document.title = DEFAULT_TITLE;
    setMeta('name', 'description', DEFAULT_DESCRIPTION);
    setMeta('property', 'og:title', DEFAULT_TITLE);
    setMeta('property', 'og:description', DEFAULT_DESCRIPTION);
    return;
  }
  var title = data.title;
  var description = data.description;
  var canonical = data.canonical;
  var ogType = data.ogType;
  /* Title */
  document.title = title || DEFAULT_TITLE;

  /* Standard meta */
  setMeta('name', 'description', description || DEFAULT_DESCRIPTION);

  /* Open Graph */
  setMeta('property', 'og:title', title || DEFAULT_TITLE);
  setMeta('property', 'og:description', description || DEFAULT_DESCRIPTION);
  if (ogType) setMeta('property', 'og:type', ogType);

  /* Twitter Card */
  setMeta('name', 'twitter:title', title || DEFAULT_TITLE);
  setMeta('name', 'twitter:description', description || DEFAULT_DESCRIPTION);

  /* Canonical */
  if (canonical) {
    let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!link) {
      link = document.createElement('link');
      link.setAttribute('rel', 'canonical');
      document.head.appendChild(link);
    }
    link.href = canonical;
  }
}

/**
 * Reset SEO to site-wide defaults (useful on unmount or 404).
 */
export function resetSEO(): void {
  setSEO({ title: DEFAULT_TITLE, description: DEFAULT_DESCRIPTION });
}

/**
 * Inject or replace a `<script type="application/ld+json">` tag in `<head>`.
 * Passing `null` removes the current page-level schema.
 */
export function setSchema(schema: Record<string, unknown> | null): void {
  var id = 'page-schema-ld';
  var existing = document.getElementById(id);
  if (schema === null) {
    if (existing) existing.remove();
    return;
  }
  if (!existing) {
    existing = document.createElement('script');
    existing.id = id;
    existing.setAttribute('type', 'application/ld+json');
    document.head.appendChild(existing);
  }
  existing.textContent = JSON.stringify(schema);
}

/**
 * Truncate a string to maxLen, adding ellipsis if needed.
 * Useful for generating description from long excerpts.
 */
export function truncateForSEO(text: string, maxLen: number = 155): string {
  if (text.length <= maxLen) return text;
  return text.slice(0, maxLen - 1).trimEnd() + '…';
}