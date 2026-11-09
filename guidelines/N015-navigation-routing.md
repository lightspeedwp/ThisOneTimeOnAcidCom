# N015: Navigation & Routing Guidelines

**Document ID:** N015  
**Category:** Organization (Navigation)  
**Authority:** D4 (N-Document Approvals); D3 (WCAG 2.2 AAA accessibility)  
**Last Updated:** 2026-11-09

## Purpose

Define navigation patterns, URL structure, and routing conventions for ThisOneTimeOnAcidCom using Next.js App Router with accessibility and SEO best practices.

## URL Structure

### Canonical Routes

```text
/                              # Homepage
/book                          # Book index/landing
/book/[slug]                   # Book detail page
/journal                       # Journal index
/journal/[slug]                # Journal entry detail
/about                         # About page
/contact                       # Contact form
/sitemap                       # Sitemap page
```

### Query Parameters

- `/book?filter=genre&sort=date` for filtering and sorting
- `/journal?page=2&limit=10` for pagination
- Preserve filter state in URL for bookmarking and sharing

## Next.js App Router Integration

### Dynamic Routes

```typescript
// app/book/[slug]/page.tsx
export async function generateMetadata({ params }) {
  const book = await getBook(params.slug);
  return {
    title: book.title,
    description: book.description,
    openGraph: {
      title: book.title,
      image: book.coverImage,
    },
  };
}
```

### Nested Layouts

```text
app/
  layout.tsx              # Root layout (header, footer)
  book/
    layout.tsx            # Book section layout
    page.tsx              # Book index
    [slug]/
      page.tsx            # Book detail
  journal/
    layout.tsx            # Journal section layout
    [slug]/
      page.tsx            # Journal entry
```

## Client-Side Navigation

### Link Component

```typescript
import Link from 'next/link';

// Preferred: typed routes with href validation
<Link href="/book/the-jungle-book">Read More</Link>

// Active link detection
<Link href="/about" className={isActive ? 'active' : ''}>
  About
</Link>
```

### useRouter Hook

```typescript
const router = useRouter();

// Push: add to history
router.push('/book/new-slug');

// Replace: replace current history entry
router.replace('/login');

// Refresh: revalidate data
router.refresh();
```

## Accessibility Requirements

- All interactive elements must be keyboard accessible
- Navigation must be semantically correct with `<nav>` landmarks
- Active navigation indicators must be programmatically detectable (aria-current)
- Focus must be visible with clear focus indicators
- Mobile navigation must include skip links

## SEO Best Practices

- Use descriptive slugs (not UUIDs): `/book/the-jungle-book` not `/book/abc123`
- Implement canonical URLs in meta tags
- Use dynamic metadata generation for all detail pages
- Implement breadcrumb navigation for deep hierarchies
- Use sitemap.xml for search engine indexing

## Error Handling

### Not Found Routes

```typescript
// app/not-found.tsx
export default function NotFound() {
  return (
    <div>
      <h1>404 - Page Not Found</h1>
      <Link href="/">Return to Home</Link>
    </div>
  );
}
```

### Redirect Handling

```typescript
import { redirect } from 'next/navigation';

if (!session) {
  redirect('/login?from=' + pathname);
}
```

## See Also

- **N006:** Architecture Overview (Next.js framework)
- **N023:** README - Getting Started
- **N024:** Book Home - Navigation structure
- **N025:** Sitemap - Navigation reference
