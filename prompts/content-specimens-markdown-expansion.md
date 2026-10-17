# Prompt: Content Specimens Markdown Expansion

**Version:** 1.0.0  
**Created:** March 4, 2026  
**Type:** Enhancement Audit

## Objective

Expand all 7 Content Specimen pages (`/dev-tools/content-specimens`, `/dev-tools/blog-specimens`, `/dev-tools/portfolio-specimens`, `/dev-tools/video-specimens`, `/dev-tools/podcast-specimens`, `/dev-tools/event-specimens`, `/dev-tools/faq-specimens`) to include comprehensive **markdown rendering samples** for every content type.

Each specimen page should showcase ALL markdown elements styled with that content-type's neon accent color.

## Current State

The existing Content Specimen pages currently show:
- Neon accent color swatches
- Card variant descriptions (text lists)
- Metadata patterns (text lists)
- Layout templates (text descriptions)

**Missing:** Live rendered markdown samples showing how each element actually looks when styled.

## Required Markdown Elements

Based on `/imports/markdown-guide.md`, each Content Specimen page MUST showcase the following rendered markdown elements:

### 1. Basic Text Formatting
- ✅ Heading 1 (`# Heading 1`)
- ✅ Heading 2 (`## Heading 2`)
- ✅ Heading 3 (`### Heading 3`)
- ✅ Heading 4 (`#### Heading 4`)
- ✅ Heading 5 (`##### Heading 5`)
- ✅ Heading 6 (`###### Heading 6`)
- ✅ Paragraph text (regular body copy)
- ✅ **Bold text** (`**bold**`)
- ✅ *Italic text* (`*italic*`)
- ✅ ***Bold & italic*** (`***bold italic***`)
- ✅ ~~Strikethrough~~ (`~~strikethrough~~`)
- ✅ Horizontal rule (`---`)

### 2. Lists & Organization
- ✅ Unordered list (`- item`)
- ✅ Ordered list (`1. item`)
- ✅ Task list / Checkboxes (`- [ ] unchecked`, `- [x] checked`)
- ✅ Nested lists (indented sub-items)

### 3. Links & Media
- ✅ Inline link (`[Link Text](url)`)
- ✅ Automatic link (`<https://url.com>`)
- ✅ Image (`![Alt](image.jpg)`)

### 4. Code & Quotes
- ✅ Inline code (`` `code` ``)
- ✅ Fenced code block (` ```language ... ``` `)
- ✅ Blockquote (`> quote`)
- ✅ Nested blockquote (`> outer > inner`)

### 5. Tables (Extended Syntax)
- ✅ Basic table with header row
- ✅ Left-aligned column (`:---`)
- ✅ Right-aligned column (`---:`)
- ✅ Center-aligned column (`:---:`)

### 6. Advanced Formatting
- ✅ Footnotes (`[^1]` reference)
- ✅ Superscript (`X^2^`)
- ✅ Subscript (`H~2~O`)
- ✅ Highlight (`==highlighted==`)
- ✅ Definition list (`term : definition`)

## Implementation Pattern

Each Content Specimen page should follow this structure:

```tsx
<section className="specimen-section" aria-labelledby="spec-markdown">
  <div className="specimen-section__inner">
    <h2 id="spec-markdown" className="specimen-section__title text-card-h3">
      Markdown rendering samples
    </h2>
    <p className="specimen-section__desc text-body-p">
      All markdown elements styled with [content-type] neon [color] accents.
    </p>

    {/* Headings */}
    <div className="specimen-markdown">
      <h3 className="specimen-markdown__label">Headings</h3>
      <div className="specimen-markdown__sample">
        <h1 className="blog-h1">Heading 1 — Blog post title</h1>
        <h2 className="blog-h2">Heading 2 — Section heading</h2>
        <h3 className="blog-h3">Heading 3 — Subsection</h3>
        <h4 className="blog-h4">Heading 4 — Minor heading</h4>
        <h5 className="blog-h5">Heading 5 — Smallest heading</h5>
        <h6 className="blog-h6">Heading 6 — Micro heading</h6>
      </div>
    </div>

    {/* Paragraph & Inline Text */}
    <div className="specimen-markdown">
      <h3 className="specimen-markdown__label">Paragraph & Inline Text</h3>
      <div className="specimen-markdown__sample">
        <p className="blog-p">
          This is a paragraph with <strong>bold text</strong>, <em>italic text</em>, 
          <strong><em>bold italic</em></strong>, and <del>strikethrough</del>. 
          You can also use <code className="blog-code">inline code</code> for technical terms.
        </p>
      </div>
    </div>

    {/* Lists */}
    <div className="specimen-markdown">
      <h3 className="specimen-markdown__label">Unordered List</h3>
      <div className="specimen-markdown__sample">
        <ul className="blog-ul">
          <li>First item</li>
          <li>Second item with nested list:
            <ul>
              <li>Nested item A</li>
              <li>Nested item B</li>
            </ul>
          </li>
          <li>Third item</li>
        </ul>
      </div>
    </div>

    <div className="specimen-markdown">
      <h3 className="specimen-markdown__label">Ordered List</h3>
      <div className="specimen-markdown__sample">
        <ol className="blog-ol">
          <li>First step</li>
          <li>Second step with nested list:
            <ol>
              <li>Sub-step A</li>
              <li>Sub-step B</li>
            </ol>
          </li>
          <li>Third step</li>
        </ol>
      </div>
    </div>

    <div className="specimen-markdown">
      <h3 className="specimen-markdown__label">Task List (Checkboxes)</h3>
      <div className="specimen-markdown__sample">
        <ul className="blog-checklist">
          <li><input type="checkbox" checked disabled /> Completed task</li>
          <li><input type="checkbox" disabled /> Incomplete task</li>
          <li><input type="checkbox" disabled /> Another pending task</li>
        </ul>
      </div>
    </div>

    {/* Links */}
    <div className="specimen-markdown">
      <h3 className="specimen-markdown__label">Links</h3>
      <div className="specimen-markdown__sample">
        <p className="blog-p">
          Here is an <a href="#" className="blog-link">inline link</a> and 
          an automatic link: <a href="https://example.com" className="blog-link">https://example.com</a>
        </p>
      </div>
    </div>

    {/* Code Blocks */}
    <div className="specimen-markdown">
      <h3 className="specimen-markdown__label">Code Block</h3>
      <div className="specimen-markdown__sample">
        <pre className="blog-pre"><code className="blog-code-block">function example() {
  console.log('Code block with syntax');
  return true;
}</code></pre>
      </div>
    </div>

    {/* Blockquote */}
    <div className="specimen-markdown">
      <h3 className="specimen-markdown__label">Blockquote</h3>
      <div className="specimen-markdown__sample">
        <blockquote className="blog-blockquote">
          This is a blockquote. It can contain <strong>bold</strong> and <em>italic</em> text.
          <blockquote className="blog-blockquote">
            This is a nested blockquote.
          </blockquote>
        </blockquote>
      </div>
    </div>

    {/* Table */}
    <div className="specimen-markdown">
      <h3 className="specimen-markdown__label">Table</h3>
      <div className="specimen-markdown__sample">
        <table className="blog-table">
          <thead>
            <tr>
              <th style={{ textAlign: 'left' }}>Left Aligned</th>
              <th style={{ textAlign: 'center' }}>Center Aligned</th>
              <th style={{ textAlign: 'right' }}>Right Aligned</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Cell 1</td>
              <td>Cell 2</td>
              <td>Cell 3</td>
            </tr>
            <tr>
              <td>Cell 4</td>
              <td>Cell 5</td>
              <td>Cell 6</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    {/* Horizontal Rule */}
    <div className="specimen-markdown">
      <h3 className="specimen-markdown__label">Horizontal Rule</h3>
      <div className="specimen-markdown__sample">
        <hr className="blog-hr" />
      </div>
    </div>

  </div>
</section>
```

## CSS Requirements

Each content type needs dedicated BEM classes for markdown elements in `/styles/blocks/markdown-[content-type].css`:

### Example: `/styles/blocks/markdown-blog.css`

```css
/* Blog Markdown Styles — Neon Pink Accents */

.blog-h1,
.blog-h2,
.blog-h3,
.blog-h4,
.blog-h5,
.blog-h6 {
  font-family: var(--wp--preset--font-family--brand-heading);
  color: var(--wp--preset--color--neutral-900);
  margin-bottom: 1rem;
}

.dark .blog-h1,
.dark .blog-h2,
.dark .blog-h3,
.dark .blog-h4,
.dark .blog-h5,
.dark .blog-h6 {
  color: var(--wp--preset--color--neutral-50);
}

.blog-h1 { font-size: var(--wp--preset--font-size--900); }
.blog-h2 { 
  font-size: var(--wp--preset--font-size--700);
  border-bottom: 2px solid var(--wp--preset--color--neon-pink);
  padding-bottom: 0.5rem;
}
.blog-h3 { font-size: var(--wp--preset--font-size--500); }
.blog-h4 { font-size: var(--wp--preset--font-size--400); }
.blog-h5 { font-size: var(--wp--preset--font-size--300); }
.blog-h6 { font-size: var(--wp--preset--font-size--200); }

.blog-p {
  font-size: var(--wp--preset--font-size--300);
  line-height: 1.7;
  margin-bottom: 1.5rem;
  color: var(--wp--preset--color--neutral-700);
}

.dark .blog-p {
  color: var(--wp--preset--color--neutral-300);
}

.blog-link {
  color: var(--wp--preset--color--neon-pink);
  text-decoration: underline;
  transition: opacity 0.2s ease;
}

.blog-link:hover {
  opacity: 0.8;
}

.blog-ul,
.blog-ol {
  margin-bottom: 1.5rem;
  padding-left: 2rem;
}

.blog-ul li,
.blog-ol li {
  margin-bottom: 0.5rem;
  color: var(--wp--preset--color--neutral-700);
}

.dark .blog-ul li,
.dark .blog-ol li {
  color: var(--wp--preset--color--neutral-300);
}

.blog-ul li::marker {
  color: var(--wp--preset--color--neon-pink);
}

.blog-ol li::marker {
  color: var(--wp--preset--color--neon-pink);
  font-weight: 700;
}

.blog-checklist {
  list-style: none;
  padding-left: 0;
  margin-bottom: 1.5rem;
}

.blog-checklist li {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}

.blog-checklist input[type="checkbox"] {
  accent-color: var(--wp--preset--color--neon-pink);
}

.blog-code {
  font-family: 'Courier New', monospace;
  font-size: 0.9em;
  background: var(--wp--preset--color--neutral-100);
  color: var(--wp--preset--color--neon-pink);
  padding: 0.2rem 0.4rem;
  border-radius: var(--wp--preset--border-radius--sm);
}

.dark .blog-code {
  background: var(--wp--preset--color--neutral-900);
}

.blog-pre {
  background: var(--wp--preset--color--neutral-100);
  border: 1px solid var(--wp--preset--color--neon-pink);
  border-radius: var(--wp--preset--border-radius--md);
  padding: 1.5rem;
  overflow-x: auto;
  margin-bottom: 1.5rem;
}

.dark .blog-pre {
  background: var(--wp--preset--color--neutral-900);
}

.blog-code-block {
  font-family: 'Courier New', monospace;
  font-size: var(--wp--preset--font-size--200);
  color: var(--wp--preset--color--neutral-800);
}

.dark .blog-code-block {
  color: var(--wp--preset--color--neutral-200);
}

.blog-blockquote {
  border-left: 4px solid var(--wp--preset--color--neon-pink);
  padding-left: 1.5rem;
  margin-left: 0;
  margin-bottom: 1.5rem;
  font-style: italic;
  color: var(--wp--preset--color--neutral-600);
}

.dark .blog-blockquote {
  color: var(--wp--preset--color--neutral-400);
}

.blog-table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 1.5rem;
  border: 1px solid var(--wp--preset--color--neutral-200);
}

.dark .blog-table {
  border-color: var(--wp--preset--color--neutral-800);
}

.blog-table th {
  background: var(--wp--preset--color--neon-pink);
  color: var(--wp--preset--color--atomic-black);
  font-weight: 700;
  padding: 0.75rem 1rem;
  text-align: left;
}

.blog-table td {
  padding: 0.75rem 1rem;
  border-bottom: 1px solid var(--wp--preset--color--neutral-200);
  color: var(--wp--preset--color--neutral-700);
}

.dark .blog-table td {
  border-bottom-color: var(--wp--preset--color--neutral-800);
  color: var(--wp--preset--color--neutral-300);
}

.blog-hr {
  border: none;
  border-top: 2px solid var(--wp--preset--color--neon-pink);
  margin: 2rem 0;
  opacity: 0.3;
}
```

## Neon Color Mapping

Each content type uses a specific neon accent color:

| Content Type | Neon Color | CSS Variable |
|---|---|---|
| Blog | Neon Pink | `--wp--preset--color--neon-pink` |
| Portfolio | Neon Green | `--wp--preset--color--neon-green` |
| Video | Neon Purple | `--wp--preset--color--neon-purple` |
| Podcast | Neon Blue | `--wp--preset--color--neon-blue` |
| Event | Neon Orange | `--wp--preset--color--neon-orange` |
| FAQ | Neon Yellow | `--wp--preset--color--neon-yellow` |
| Content (generic) | Neon Cyan | `--wp--preset--color--neon-cyan` |

## Specimen Page Structure

Each specimen page should follow this section order:

1. **Hero** — Badge, title, description
2. **Neon accent** — Color swatch with usage notes
3. **Markdown rendering samples** ← NEW (this is what's missing)
4. **Card variants** — Layout descriptions
5. **Metadata patterns** — Data display formats
6. **Layout templates** — Grid and archive patterns

## Specimen Markdown Container CSS

Add to `/styles/blocks/specimen-page.css`:

```css
/* Markdown Rendering Samples */
.specimen-markdown {
  margin-bottom: 3rem;
}

.specimen-markdown__label {
  font-family: var(--wp--preset--font-family--brand-heading);
  font-size: var(--wp--preset--font-size--400);
  font-weight: 600;
  margin-bottom: 1rem;
  color: var(--wp--preset--color--neutral-800);
}

.dark .specimen-markdown__label {
  color: var(--wp--preset--color--neutral-200);
}

.specimen-markdown__sample {
  padding: 2rem;
  background: var(--wp--preset--color--neutral-50);
  border: 1px solid var(--wp--preset--color--neutral-200);
  border-radius: var(--wp--preset--border-radius--md);
}

.dark .specimen-markdown__sample {
  background: var(--wp--preset--color--neutral-900);
  border-color: var(--wp--preset--color--neutral-800);
}
```

## Files to Update

### Component Files (7 files)
- `/components/pages/dev-tools/ContentSpecimensPage.tsx`
- `/components/pages/dev-tools/BlogSpecimensPage.tsx`
- `/components/pages/dev-tools/PortfolioSpecimensPage.tsx`
- `/components/pages/dev-tools/VideoSpecimensPage.tsx`
- `/components/pages/dev-tools/PodcastSpecimensPage.tsx`
- `/components/pages/dev-tools/EventSpecimensPage.tsx`
- `/components/pages/dev-tools/FaqSpecimensPage.tsx`

### CSS Files (8 files)
Create new markdown style files:
- `/styles/blocks/markdown-content.css`
- `/styles/blocks/markdown-blog.css`
- `/styles/blocks/markdown-portfolio.css`
- `/styles/blocks/markdown-video.css`
- `/styles/blocks/markdown-podcast.css`
- `/styles/blocks/markdown-event.css`
- `/styles/blocks/markdown-faq.css`

Update:
- `/styles/blocks/specimen-page.css` (add `.specimen-markdown` container styles)

## Acceptance Criteria

- ✅ Each Content Specimen page displays ALL markdown elements listed above
- ✅ Each content type has dedicated markdown CSS file with neon accent colors
- ✅ All markdown elements follow BEM naming convention (e.g., `.blog-h2`, `.portfolio-ul`, `.video-blockquote`)
- ✅ Dark mode support for all markdown elements
- ✅ Accessibility: proper heading hierarchy, color contrast, semantic HTML
- ✅ All styling uses BEM classes only (no Tailwind utilities, no inline styles except for color swatches)
- ✅ Code follows Figma Make bundler rules (no arrow functions, no destructuring, safety helpers for object/array access)

## Related Files

- `/imports/markdown-guide.md` — Reference guide for markdown syntax
- `/guidelines/design-tokens/portfolio-design-tokens.md` — To be created (see next prompt)

## Next Steps

After completing markdown expansion:
1. Create `/guidelines/design-tokens/portfolio-design-tokens.md` guideline
2. Run Content Expansion sub-audits to add real content using these markdown patterns
3. Verify all specimen pages in dark mode
4. Test keyboard navigation and screen reader compatibility

---

**Estimated Scope:** 7 component updates + 8 CSS files = ~15 file modifications
