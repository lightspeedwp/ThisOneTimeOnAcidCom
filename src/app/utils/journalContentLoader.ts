/**
 * @fileoverview Vite runtime loader for journal-content/*.md files.
 *
 * Uses import.meta.glob to load all markdown files at build time.
 * Parses frontmatter with a lightweight hand-rolled parser extended to handle
 * inline bracket arrays (e.g. `tags: [music, berlin, creativity]`).
 *
 * Does NOT import gray-matter or Zod — those are devDependencies for scripts only.
 *
 * Exports:
 *   rawJournalPages  — all entries including drafts, sorted by date (newest first)
 *   journalPages     — published entries only (draft: false), sorted by date
 */

import type { JournalPage } from '../data/mock/pages/journal/types';

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   VITE GLOB IMPORT
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

var rawFiles = import.meta.glob<string>('/journal-content/**/*.md', {
  eager: true,
  query: '?raw',
  import: 'default',
});

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   FRONTMATTER PARSER
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

interface RawFrontmatter {
  type?: string;
  title?: string;
  subtitle?: string;
  slug?: string;
  author?: string;
  date?: string;
  tags?: string[];
  series?: string;
  draft?: boolean;
  pageNumber?: number;
}

function parseInlineBracketArray(val: string): string[] | null {
  var trimmed = val.trim();
  if (!trimmed.startsWith('[') || !trimmed.endsWith(']')) return null;
  return trimmed
    .slice(1, -1)
    .split(',')
    .map(function (s) {
      return s.trim().replace(/^['"]|['"]$/g, '');
    })
    .filter(Boolean);
}

function parseFrontmatter(raw: string): { meta: RawFrontmatter; body: string } {
  var match = raw.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!match) {
    return { meta: {}, body: raw.trim() };
  }

  var meta: RawFrontmatter = {};
  var lines = match[1].split('\n');

  for (var i = 0; i < lines.length; i++) {
    var line = lines[i];
    var colon = line.indexOf(':');
    if (colon === -1) continue;

    var key = line.slice(0, colon).trim();
    var val = line.slice(colon + 1).trim();

    // Strip surrounding quotes
    if (
      (val.startsWith('"') && val.endsWith('"')) ||
      (val.startsWith("'") && val.endsWith("'"))
    ) {
      val = val.slice(1, -1);
    }

    // Inline bracket array
    var arr = parseInlineBracketArray(val);
    if (arr !== null) {
      (meta as Record<string, unknown>)[key] = arr;
      continue;
    }

    // Boolean
    if (val === 'true') {
      (meta as Record<string, unknown>)[key] = true;
      continue;
    }
    if (val === 'false') {
      (meta as Record<string, unknown>)[key] = false;
      continue;
    }

    // Number
    var num = Number(val);
    if (val !== '' && !isNaN(num)) {
      (meta as Record<string, unknown>)[key] = num;
      continue;
    }

    (meta as Record<string, unknown>)[key] = val;
  }

  return { meta: meta, body: match[2].trim() };
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   BODY SPLITTING
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

function toParas(block: string): string[] {
  return block
    .split(/\n\n+/)
    .map(function (p) { return p.trim(); })
    .filter(Boolean);
}

function splitPages(body: string): Array<{ paragraphs: string[] }> {
  var blocks = body
    .split(/\n---\n/)
    .map(function (b) { return b.trim(); })
    .filter(Boolean);

  if (blocks.length === 0) {
    return [{ paragraphs: [] }];
  }

  return blocks.map(function (block) {
    return { paragraphs: toParas(block) };
  });
}

function countWords(text: string): number {
  return text
    .replace(/[^\w\s]/g, ' ')
    .split(/\s+/)
    .filter(Boolean)
    .length;
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   FILE TO PAGE
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

function filePathToSlugFallback(filePath: string): string {
  var name = filePath.split('/').pop() ?? '';
  // Strip YYYY-MM- date prefix and .md extension
  return name.replace(/^\d{4}-\d{2}-/, '').replace(/\.md$/, '');
}

function loadJournalPages(): JournalPage[] {
  var pages: JournalPage[] = [];

  var keys = Object.keys(rawFiles);
  for (var i = 0; i < keys.length; i++) {
    var filePath = keys[i];
    var content = rawFiles[filePath];

    // Skip README
    if (filePath.endsWith('/README.md')) continue;

    var parsed = parseFrontmatter(content);
    var meta = parsed.meta;
    var body = parsed.body;

    // Only accept journal-entry type
    if (meta.type !== 'journal-entry') continue;

    // Require minimum fields
    if (!meta.title || !meta.author || !meta.date) continue;

    var slug = meta.slug ?? filePathToSlugFallback(filePath);
    var pages_ = splitPages(body);
    var wordCount = countWords(body);

    var page: JournalPage = {
      id: slug,
      type: 'journal-entry',
      slug: slug,
      title: meta.title,
      author: meta.author,
      date: meta.date,
      tags: Array.isArray(meta.tags) ? meta.tags : [],
      draft: meta.draft === true,
      pages: pages_,
      wordCount: wordCount,
    };

    if (meta.subtitle !== undefined) page.subtitle = meta.subtitle;
    if (meta.series !== undefined) page.series = meta.series;

    pages.push(page);
  }

  // Sort: newest first, then alpha by slug
  pages.sort(function (a, b) {
    if (a.date !== b.date) return a.date > b.date ? -1 : 1;
    return a.slug.localeCompare(b.slug);
  });

  return pages;
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   EXPORTS
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

export var rawJournalPages: JournalPage[] = loadJournalPages();

export var journalPages: JournalPage[] = rawJournalPages.filter(function (p) {
  return !p.draft;
});
