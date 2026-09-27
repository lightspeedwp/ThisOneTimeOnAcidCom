# Journal Content

Source Markdown files for the **journal** section of `thisonetimeonacid.com`.

Each `.md` file becomes one journal entry in the reader.

---

## File naming convention

```
YYYY-MM-slug-title.md
```

Examples:
```
2026-09-the-dancefloor-returns.md
2026-08-berlin-morning-light.md
```

The date prefix ensures files sort chronologically. The slug in the filename
is a fallback — the canonical slug comes from the `slug` frontmatter field.

---

## Required frontmatter

Every file must include these fields:

```yaml
---
type: journal-entry
title: "Entry title"
slug: entry-slug-in-kebab-case
author: "Ash Shaw"
date: 2026-09-15
tags: [music, creativity, berlin]
---
```

| Field    | Type                | Notes                                          |
|----------|---------------------|------------------------------------------------|
| `type`   | literal string      | Always `journal-entry`                         |
| `title`  | string              | Display title, 1–120 characters                |
| `slug`   | kebab-case string   | Used for URL routing (`/journal/your-slug`)    |
| `author` | string              | Author display name                            |
| `date`   | YYYY-MM-DD          | ISO publication date                           |
| `tags`   | inline array        | Use `[tag1, tag2]` syntax — at least one tag   |

## Optional frontmatter

```yaml
subtitle: "A short teaser shown on listing cards"
series: "Berlin Chronicles"
draft: true
```

| Field      | Type    | Notes                                         |
|------------|---------|-----------------------------------------------|
| `subtitle` | string  | One-line teaser for listing cards             |
| `series`   | string  | Group related entries under a series name     |
| `draft`    | boolean | `true` keeps the entry out of production builds |

---

## Body content rules

- Separate paragraphs with a **blank line**
- Use `---` on its own line to mark a **page break** (creates a new reader page)
- Avoid raw HTML, heading tags, or embedded images — the CSS handles all styling
- Links are fine: `[link text](https://example.com)` or `[internal](/journal/slug)`

```markdown
---
type: journal-entry
title: "The Dancefloor Returns"
slug: the-dancefloor-returns
author: "Ash Shaw"
date: 2026-09-20
tags: [music, dancing, berlin]
subtitle: "It was always the music that brought me back."
---

First paragraph of the entry. Write naturally — no special formatting needed.

Second paragraph continues the thought.

---

A page break above starts a new reader page. Continue writing here.

Third paragraph on the new page.
```

---

## Validation

Before committing, run the validator locally:

```bash
pnpm journal:validate
```

The CI pipeline runs this automatically on every PR that touches `journal-content/`.

## Exporting JSON

To regenerate the JSON payloads in `export/journal/`:

```bash
pnpm journal:parse
```

This is run automatically in CI but useful for local debugging.
