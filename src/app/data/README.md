# Book-site application data

This directory contains data used by the current book-site UI. It is not a
site-wide CMS, and it is not the source of every piece of copy rendered by the
application.

## Current data boundaries

- `mock/book-site.ts` exports `bookSiteData`, consumed by `Header` and `Footer`.
- `mock/seo/pages.ts` exports `pageSEO`, imported by book-site pages.
- `mock/journal-posts.ts` exports `journalPosts`, used by routed journal pages.
- `mock/ui/ebook.ts` exports `ebookUI`, used by `EbookPage`.
- The ebook barrel re-exports `bookPages`, `rawBookPages` and
  `SPLITTABLE_TYPES` from the runtime book loader.
- The journal loader has separate raw and published exports.
- Specialised local-data hooks and retained legacy search collections have their
  own consumers and destinations.

## Content locations

Keep the following concerns distinct:

- Current book-site UI data lives under `src/app/data/mock/`.
- Book editorial and manuscript files live under root `content/book/`.
- Journal editorial files live under root `content/journal/`.
- Routed mock journal summaries are separate from those editorial sources.
- Some legacy collections remain because active consumers still reference them.

Runtime loader globs describe runtime source paths; they do not relocate or
populate the corresponding root editorial directories. Inline page copy has not
necessarily been centralised here.

Use the named exports documented above and inspect their consumers before
changing a data boundary. Search, navigation, CMS integration, fallback
behaviour and collection disposition require separate decisions.
