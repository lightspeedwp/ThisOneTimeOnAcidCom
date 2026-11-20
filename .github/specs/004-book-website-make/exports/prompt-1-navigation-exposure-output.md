# Prompt 1 Output: Navigation Exposure

**Date**: 2026-11-20
**Execution model**: SC-004 (Claude direct execution)
**Contract**: [`contracts/prompt-1-navigation-exposure.md`](../contracts/prompt-1-navigation-exposure.md)
**Machine-readable rules**: [`navigation-exposure-rules.json`](./navigation-exposure-rules.json)
**Decision 7**: Option A (noindex meta tags and XML-sitemap exclusion are primary; robots.txt optional)
**Status**: ✅ Specification delivered. ⏳ Repository implementation not authorised by this output.

---

## 1. Scope and authority

This output specifies how Speaking, Events and Media stop being _discoverable_ while staying _reachable_. It does not change application code, `public/` files or deployment.

Order of authority used when sources disagreed:

1. `references/03-author-decisions-launch-scope.md` v1.3.0 (author decisions)
2. `references/02-companion-session-plan.md`, WP-02 (menu-change checklist)
3. `contracts/prompt-1-navigation-exposure.md` (this prompt's contract)
4. Current repository state (evidence, not authority)

The author decision is: keep the pages publicly accessible at their retained direct URLs, with **no menu or footer links**, **noindex** directives, **XML-sitemap exclusion** and **HTML-sitemap card omission**. Do not delete the pages or make them private.

---

## 2. Conflicts found (⚠️)

| ID      | Conflict                                                                                                                                                                                                       | Resolution applied in this output                                                                                                                |
| ------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| ⚠️ C1-1 | The contract lists 4 visible items (Home `/`, About `/about`, Book `/book`, Contact `/contact`). The app has no `/about` or `/book` route; it uses `/about-ash` and `/the-book`.                               | Use the real registered paths.                                                                                                                   |
| ⚠️ C1-2 | The contract's 4-item list conflicts with its own CR-1.5 ("only removal of three routes") and with WP-02 ("do not rename, reorder or add unrelated entries"). The current menu has 11 entries.                 | Follow WP-02 and CR-1.5: remove exactly three entries, leaving **8 in their existing order**. A cut to 4 items needs a separate author decision. |
| ⚠️ C1-3 | The contract offers a robots.txt `Disallow` rule as optional. A `Disallow` stops crawlers from fetching the page, so they never see its `noindex` directive, and the URL can stay indexed from external links. | **Do not add `Disallow` rules** for these three routes. Noindex plus sitemap exclusion is the complete Option A mechanism.                       |
| ⚠️ C1-4 | The XML sitemap and robots.txt use the `ashshaw.com` origin, not a book-site origin.                                                                                                                           | Out of scope. WP-02 keeps canonical-origin changes separate. Flagged for a later decision.                                                       |
| ⚠️ C1-5 | `/ebook` is in the XML sitemap, but its exposure, purpose and access protection are unresolved (WP-02).                                                                                                        | Out of scope for Prompt 1. Left unchanged and flagged.                                                                                           |
| ⚠️ C1-6 | `navigation-specification.md` (2026-11-19) uses `/about`, `/book` and `example.com` URLs.                                                                                                                      | Superseded by this output; a notice was added to that file.                                                                                      |

---

## 3. Before and after

### 3.1 Header menu (`bookSiteData.nav` in `src/app/data/mock/book-site.ts`)

| #   | Before                             | After                              |
| --- | ---------------------------------- | ---------------------------------- |
| 1   | Home → `/`                         | Home → `/`                         |
| 2   | The Book → `/the-book`             | The Book → `/the-book`             |
| 3   | Read the Draft → `/read-the-draft` | Read the Draft → `/read-the-draft` |
| 4   | About Ash → `/about-ash`           | About Ash → `/about-ash`           |
| 5   | Journal → `/journal`               | Journal → `/journal`               |
| 6   | **Events → `/events`**             | _(removed)_                        |
| 7   | **Speaking → `/speaking`**         | _(removed)_                        |
| 8   | **Media → `/media`**               | _(removed)_                        |
| 9   | Contact → `/contact`               | Contact → `/contact`               |
| 10  | Waitlist → `/waitlist`             | Waitlist → `/waitlist`             |
| 11  | Search → `/search`                 | Search → `/search`                 |

Result: 11 → 8 entries. Labels and relative order unchanged.

### 3.2 Footer (`bookSiteData.footerGroups`)

Only the **Author & Press** group changes. Its heading is preserved.

| Before                                 | After                    |
| -------------------------------------- | ------------------------ |
| About Ash → `/about-ash`               | About Ash → `/about-ash` |
| **Speaking & Workshops → `/speaking`** | _(removed)_              |
| **Events → `/events`**                 | _(removed)_              |
| **Media & Press → `/media`**           | _(removed)_              |
| Contact → `/contact`                   | Contact → `/contact`     |

The Book, Content and Discover groups are unchanged.

### 3.3 Human-facing sitemap (`bookPages` in `src/app/components/pages/SitemapPage.tsx`)

Per WP-02, the launch HTML sitemap omits five cards and withholds two reader cards:

| Card                               | Treatment | Reason                                     |
| ---------------------------------- | --------- | ------------------------------------------ |
| Events → `/events`                 | Omit      | Author decision (retained, undiscoverable) |
| Speaking & workshops → `/speaking` | Omit      | Author decision                            |
| Media & press → `/media`           | Omit      | Author decision                            |
| Thank you → `/thank-you`           | Omit      | Confirmation journey, not a destination    |
| Style guide → `/style-guide`       | Omit      | Internal documentation                     |
| Draft viewer → `/draft-viewer`     | Withhold  | Route is not registered                    |
| Ebook reader → `/ebook`            | Withhold  | Exposure unresolved (⚠️ C1-5)              |

Retained cards: Home, The book, Read the draft, About Ash, Waitlist, Journal, Contact, Sitemap.

### 3.4 XML sitemap (`public/sitemap.xml`)

| Before (10 URLs)                   | After (7 URLs)                      |
| ---------------------------------- | ----------------------------------- |
| `https://ashshaw.com/`             | `https://ashshaw.com/`              |
| `https://ashshaw.com/the-book`     | `https://ashshaw.com/the-book`      |
| `https://ashshaw.com/ebook`        | `https://ashshaw.com/ebook` ⚠️ C1-5 |
| `https://ashshaw.com/about-ash`    | `https://ashshaw.com/about-ash`     |
| `https://ashshaw.com/journal`      | `https://ashshaw.com/journal`       |
| **`https://ashshaw.com/events`**   | _(removed)_                         |
| **`https://ashshaw.com/speaking`** | _(removed)_                         |
| `https://ashshaw.com/contact`      | `https://ashshaw.com/contact`       |
| **`https://ashshaw.com/media`**    | _(removed)_                         |
| `https://ashshaw.com/waitlist`     | `https://ashshaw.com/waitlist`      |

### 3.5 Routes (`src/app/routes.ts`)

No change. `events`, `speaking` and `media` stay registered and render their pages.

---

## 4. Enforcement specification (Decision 7, Option A)

### 4.1 Noindex directive — primary

Directive value for all three routes: `noindex, nofollow` (contract value).

Two delivery layers are specified, because this is a client-rendered single-page app:

**Layer A: HTTP response header (recommended primary).** The crawler receives the directive with the HTML response, before any JavaScript runs.

```toml
# netlify.toml — add alongside the existing [[headers]] blocks
[[headers]]
  for = "/speaking"
  [headers.values]
    X-Robots-Tag = "noindex, nofollow"

[[headers]]
  for = "/speaking/*"
  [headers.values]
    X-Robots-Tag = "noindex, nofollow"

# Repeat the pair for /events and /events/*, and for /media and /media/*.
```

The `/*` wildcard pairs cover nested routes such as `/events/:slug`. The site-wide `for = "/*"` security block is unaffected, because Netlify merges header blocks.

**Layer B: meta tag via `setSEO` (in-page).** Extend the existing utility in `src/app/utils/seo.ts`:

```typescript
export interface SEOData {
  title: string;
  description: string;
  canonical?: string;
  ogType?: string;
  /** Robots directive. Omit for indexable pages. */
  robots?: "noindex, nofollow" | "noindex, follow";
}
```

Required behaviour for `setSEO(data)`:

| Case                  | `<meta name="robots">` after the call            |
| --------------------- | ------------------------------------------------ |
| `data.robots` set     | Content equals `data.robots`                     |
| `data.robots` omitted | Tag removed, or content reset to `index, follow` |

> **Critical (single-page app):** `setSEO` must **reset** the robots tag when `robots` is omitted. Otherwise a visitor or crawler who navigates client-side from `/media` to `/the-book` carries `noindex` onto the book page.

The three pages then pass `robots: 'noindex, nofollow'` through their `pageSEO` entries.

### 4.2 XML-sitemap exclusion — primary

See §3.4. Remove the three `<url>` blocks; change nothing else in the file.

### 4.3 robots.txt — not used

See ⚠️ C1-3. `public/robots.txt` stays unchanged. No `Disallow` rules are added for these routes.

### 4.4 What this does not do

- Noindex is **not access protection**. The pages stay public by design.
- Noindex does **not prove removal** from Google results. Removal evidence must be collected separately (e.g. Search Console URL Inspection) and recorded apart from user reports.

---

## 5. Responsive navigation (CR-1.4)

Prompt 1 does not change breakpoint behaviour. The header currently renders **one shared overlay menu at every width** (no inline desktop row). Recovering a responsive desktop row is Prompt 2B's job; see [`prompt-2b-navigation-design-output.md`](./prompt-2b-navigation-design-output.md).

---

## 6. Developer implementation checklist

Each item needs separate authorisation before it is applied to the repository.

- [ ] Remove Events, Speaking and Media from `bookSiteData.nav` (§3.1)
- [ ] Remove the three links from the Author & Press footer group (§3.2)
- [ ] Remove the five omitted and two withheld cards from `bookPages` (§3.3)
- [ ] Remove three `<url>` entries from `public/sitemap.xml` (§3.4)
- [ ] Add six `X-Robots-Tag` header blocks to `netlify.toml` (§4.1 A)
- [ ] Add `robots` to `SEOData` with reset-on-omit behaviour (§4.1 B)
- [ ] Set `robots` on the `pageSEO` entries for the three pages
- [ ] Leave `public/robots.txt` and `src/app/routes.ts` unchanged
- [ ] Verify: `curl -sI <origin>/speaking` returns `200` and `x-robots-tag: noindex, nofollow`
- [ ] Verify: navigating `/media` → `/the-book` in the browser leaves no robots `noindex` on `/the-book`
- [ ] Verify: the menu has 8 entries and the footer Author & Press group has 2 links

---

## 7. Acceptance criteria

| ID     | Criterion                                              | Result                       | Evidence                                                                          |
| ------ | ------------------------------------------------------ | ---------------------------- | --------------------------------------------------------------------------------- |
| CR-1.1 | Navigation shows only approved visible items           | ✅ Pass (with ⚠️ C1-1, C1-2) | §3.1: 8 entries, three removed                                                    |
| CR-1.2 | Speaking, Events, Media hidden from menu but reachable | ✅ Pass                      | §3.1, §3.2, §3.5                                                                  |
| CR-1.3 | Enforcement matches Decision 7 Option A                | ✅ Pass                      | §4.1 noindex (two layers), §4.2 sitemap; robots.txt deliberately unused (⚠️ C1-3) |
| CR-1.4 | Responsive behaviour preserved                         | ✅ Pass                      | §5: no breakpoint change in Prompt 1                                              |
| CR-1.5 | No other navigation changes                            | ✅ Pass                      | §3.1: labels and order unchanged                                                  |
| CR-1.6 | Before/after comparison is clear                       | ✅ Pass                      | §3.1–§3.4 tables                                                                  |

**Validation checklist (contract)**: all items complete except "before/after screenshots", which do not apply under SC-004 and are replaced by the §3 tables.
