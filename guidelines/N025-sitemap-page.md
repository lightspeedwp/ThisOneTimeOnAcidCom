# N025: Sitemap Page

**Document ID:** N025  
**Category:** Pages (Sitemap)  
**Authority:** D4 (N-Document Approvals); D1 (Navigation Architecture)  
**Last Updated:** 2026-11-09

## Purpose

Provide both a human-readable sitemap for navigation discovery and a machine-readable XML sitemap for search engine indexing.

## HTML Sitemap Page Structure

### Page Layout

```markdown
# Site Map

Navigate ThisOneTimeOnAcidCom by section or search by keyword.

## Main Sections

**[The Book]** — Read the complete memoir
- [Start Reading] — Begin from introduction
- [Table of Contents] — View all chapters
- [About the Author] — Author background
- [Reviews] — Reader reviews and ratings

**[Journal]** — Behind-the-scenes reflections
- [Latest Entries] — Most recent journal posts
- [Archives] — Browse by date
- [Topics] — Filter by theme
- [Subscribe] — Get new entries via email

**[About]** — Learn more about the project
- [Origin Story] — How this project began
- [Themes] — Key topics explored
- [FAQ] — Common questions
- [Contact] — Get in touch

**[Account]** — User features (if authenticated)
- [My Reading List] — Saved books/entries
- [My Bookmarks] — Saved passages
- [Settings] — Preferences and privacy
- [Sign Out] — End session

## Additional Resources

**Legal & Information**
- [Privacy Policy]
- [Terms of Service]
- [Accessibility Statement]
- [Sitemap (XML)]

**Developer Resources**
- [API Documentation] (if public)
- [GitHub Repository] (if applicable)
```

## URL Structure Map

### Primary Routes

```
/                              # Homepage (README)
/book                          # Book Home
/book/[chapter-number]         # Individual chapter
/journal                       # Journal index
/journal/[slug]                # Individual entry
/about                         # About page
/contact                       # Contact form
/sitemap                       # This page (HTML)
/sitemap.xml                   # XML sitemap
```

### Nested Navigation

```
/account/                      # Account hub (authenticated)
  /account/reading-list        # Saved books
  /account/bookmarks           # Saved passages
  /account/settings            # User preferences
  /account/profile             # Profile settings

/legal/                        # Legal section
  /legal/privacy               # Privacy policy
  /legal/terms                 # Terms of service
  /legal/accessibility         # Accessibility statement

/search/                       # Search results
  /search?q=keyword            # Query parameter
  /search?filter=journal       # Filter by content type
```

## XML Sitemap Structure

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- Static pages (high priority) -->
  <url>
    <loc>https://thisonetonacid.com/</loc>
    <lastmod>2024-11-09</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  
  <url>
    <loc>https://thisonetonacid.com/book</loc>
    <lastmod>2024-11-09</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>
  
  <!-- Dynamic pages (medium priority) -->
  <url>
    <loc>https://thisonetonacid.com/book/1</loc>
    <lastmod>2024-11-09</lastmod>
    <changefreq>never</changefreq>
    <priority>0.8</priority>
  </url>
  
  <!-- Journal entries (medium priority) -->
  <url>
    <loc>https://thisonetonacid.com/journal/entry-slug</loc>
    <lastmod>2024-11-08</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>
  
  <!-- Legal/informational pages (low priority) -->
  <url>
    <loc>https://thisonetonacid.com/legal/privacy</loc>
    <lastmod>2024-10-01</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.3</priority>
  </url>
</urlset>
```

## Dynamic Sitemap Generation

### Implementation (Next.js)

```typescript
// app/sitemap.ts
import { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Fetch all chapters
  const chapters = await db.chapter.findMany();
  const chapterUrls = chapters.map((ch) => ({
    url: `https://example.com/book/${ch.slug}`,
    lastModified: new Date(ch.updatedAt),
    changeFrequency: 'never' as const,
    priority: 0.8,
  }));

  // Fetch all journal entries
  const entries = await db.journalEntry.findMany();
  const entryUrls = entries.map((entry) => ({
    url: `https://example.com/journal/${entry.slug}`,
    lastModified: new Date(entry.publishedAt),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  return [
    {
      url: 'https://example.com',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: 'https://example.com/book',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    ...chapterUrls,
    ...entryUrls,
    {
      url: 'https://example.com/about',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.5,
    },
  ];
}
```

## Sitemap Best Practices

### For HTML Sitemap

✅ **Do**
- Organize by content type/section
- Include brief descriptions
- Make links clickable and tested
- Update when major navigation changes
- Include internal links only
- Add lastmod dates

❌ **Don't**
- Include external links
- Over-organize (max 5 levels deep)
- Include duplicate URLs
- Use for ads or self-promotion
- Forget to test all links

### For XML Sitemap

✅ **Do**
- Update dynamically with database
- Include `lastmod` for each page
- Set realistic `changefreq` values
- Prioritize by importance (0.3 - 1.0)
- Keep file <50MB and <50,000 URLs
- Submit to Google Search Console

❌ **Don't**
- Include `lastmod` for pages that don't change
- Use `changefreq=always` for pages that don't update
- Include duplicate URLs
- Include private/authenticated pages
- Set priority all to 1.0

## Priority Guidelines

| Page Type | Priority | Rationale |
|-----------|----------|-----------|
| Homepage | 1.0 | Entry point, highest traffic |
| Book Home | 0.9 | Primary content hub |
| Chapters | 0.8 | Core reading content |
| Journal | 0.7 | Secondary content |
| Author bio | 0.5 | Context information |
| Legal pages | 0.3 | Required but low traffic |

## Change Frequency Guidelines

| Content Type | Frequency | Rationale |
|--------------|-----------|-----------|
| Homepage | weekly | News/features may update |
| Book content | never | Static manuscript chapters |
| Journal entries | weekly | New entries posted regularly |
| Author bio | yearly | Changes rarely |
| Legal pages | yearly | Change infrequently |

## SEO Integration

### robots.txt

```text
User-agent: *
Allow: /
Disallow: /account/
Disallow: /admin/
Disallow: /api/

Sitemap: https://example.com/sitemap.xml
```

### Head Tags

```html
<link rel="sitemap" type="application/xml" href="/sitemap.xml">
<link rel="canonical" href="https://example.com">
```

### Search Console Submission

1. Generate sitemap.xml dynamically
2. Test with XML validation tool
3. Submit to Google Search Console
4. Monitor crawl stats and errors
5. Update when major changes occur

## Accessibility Features (D3: WCAG 2.2 AAA)

- Semantic navigation hierarchy (nav landmark)
- Heading hierarchy: h1 (page title), h2 (sections)
- Descriptive link text (not "click here")
- Color contrast ≥4.5:1 for all text
- Focus visible on all links
- Keyboard navigation supported
- Skip link to main content
- List markup for grouped links

## Performance Considerations

- HTML sitemap: <200KB (minimal content)
- XML sitemap: Generated dynamically per Next.js best practices
- Cache HTML sitemap: 1 week
- Cache XML sitemap: 24 hours
- Lazy load sitemap page if below fold
- No images on sitemap page

## Testing Checklist

- [ ] All links in HTML sitemap are clickable
- [ ] XML sitemap validates at w3.org
- [ ] Submitted to Google Search Console
- [ ] No 404 errors in crawl tests
- [ ] Mobile responsive (HTML version)
- [ ] Accessibility audit passes WCAG 2.2 AA
- [ ] Load time <2s on 3G
- [ ] Focus order correct for keyboard nav

## Implementation Notes

- Next.js page: `app/sitemap/page.tsx` (HTML)
- Next.js file: `app/sitemap.ts` (XML)
- Dynamic URLs from Supabase queries
- Cache revalidation: 24 hours (revalidatePath)
- No authentication required
- Robots.txt in public directory

## Related Documentation

- **N023:** README - Main entry point
- **N024:** Book Home - Book section
- **N015:** Navigation & Routing - URL architecture
- **Guidelines.md:** Development workflow

## See Also

- Google SEO Starter Guide: https://developers.google.com/search/docs/beginner/seo-starter-guide
- Next.js Sitemap API: https://nextjs.org/docs/app/api-reference/file-conventions/sitemap
- Sitemap XML Protocol: https://www.sitemaps.org/
