/**
 * Loads book content from /src/content/book/**\/*.md files via Vite's import.meta.glob.
 * Edit the markdown files in src/content/book/ to change the book's text, add/remove chapters,
 * or restructure parts. The reader automatically rebuilds the BookPage[] array from those files.
 *
 * File naming convention:
 *   00-front-matter/    - cover, title, dedication, epigraph, foreword
 *   01-part-1-*/        - part title + chapters (prefix number = reading order)
 *   02-part-2-*/
 *   03-part-3-*/
 *   04-part-4-*/
 *   05-back-matter/     - afterword, appendices, about-author, back-cover
 *
 * Chapter file frontmatter fields:
 *   type: chapter | part-title | cover | inside-front | title | dedication |
 *         epigraph | foreword | afterword | appendix | appendix-divider |
 *         about-author | back-cover
 *   chapter: <number>       (chapter files only)
 *   part:    <number>       (chapter + part-title files)
 *   startPage: <number>     (chapter files - first reader page for this chapter)
 *   pageNumber: <number>    (all other types)
 *   title:    "..."
 *   subtitle: "..."
 *   appendixId: a | b | ...  (appendix files only)
 *
 * Page breaks within a chapter or appendix body are marked with a `---` separator
 * on its own line between blank lines. Each resulting block becomes one reader page.
 */

import type { BookPage } from '../data/mock/pages/ebook/types';

// Vite eagerly loads all markdown files as raw text at build time.
var rawFiles = import.meta.glob<string>('/src/content/book/**/*.md', {
  eager: true,
  query: '?raw',
  import: 'default',
});

// ── Frontmatter parser ──────────────────────────────────────────────────────

interface FrontMatter {
  type: string;
  chapter?: number;
  part?: number;
  title?: string;
  subtitle?: string;
  startPage?: number;
  pageNumber?: number;
  appendixId?: string;
}

function parseFrontmatter(raw: string): { meta: FrontMatter; body: string } {
  var match = raw.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!match) {
    return { meta: { type: 'unknown' }, body: raw.trim() };
  }

  var meta: FrontMatter = { type: 'unknown' };
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

    var num = Number(val);
    (meta as Record<string, string | number>)[key] =
      val !== '' && !isNaN(num) ? num : val;
  }

  return { meta, body: match[2].trim() };
}

// ── Paragraph helpers ───────────────────────────────────────────────────────

function toParas(block: string): string[] {
  return block
    .split(/\n\n+/)
    .map(function (p) { return p.trim(); })
    .filter(Boolean);
}

function splitPages(body: string): string[] {
  // Split on `---` sitting alone on a line (page break marker)
  return body
    .split(/\n---\n/)
    .map(function (b) { return b.trim(); })
    .filter(Boolean);
}

// ── TOC auto-generation ─────────────────────────────────────────────────────

interface PartEntry {
  part: number;
  partTitle: string;
  partSubtitle: string;
  partPageNumber: number;
  chapters: Array<{ chapter: number; title: string; startPage: number }>;
}

var ROMAN = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII'];
var TOC_ITEMS_PER_PAGE = 11;

function buildTocPages(parts: PartEntry[], startPageNumber: number): BookPage[] {
  var allEntries: Array<{ number: number; title: string; partLabel?: string; page?: number }> = [];

  for (var pi = 0; pi < parts.length; pi++) {
    var p = parts[pi];
    allEntries.push({
      number: 0,
      title: p.partTitle,
      partLabel: ROMAN[p.part - 1] || String(p.part),
      page: p.partPageNumber,
    });
    for (var ci = 0; ci < p.chapters.length; ci++) {
      var ch = p.chapters[ci];
      allEntries.push({ number: ch.chapter, title: ch.title, page: ch.startPage });
    }
  }

  var tocPages: BookPage[] = [];
  var pageNum = startPageNumber;

  for (var i = 0; i < allEntries.length; i += TOC_ITEMS_PER_PAGE) {
    var items = allEntries.slice(i, i + TOC_ITEMS_PER_PAGE);
    var isFirst = i === 0;
    tocPages.push({
      id: 'toc-' + (tocPages.length + 1),
      type: 'toc',
      pageNumber: pageNum++,
      title: isFirst ? 'Contents' : 'Contents (continued)',
      tocItems: items,
    });
  }

  return tocPages;
}

// ── Main loader ─────────────────────────────────────────────────────────────

function loadBookPages(): BookPage[] {
  var sortedPaths = Object.keys(rawFiles).sort();

  var preForeword: BookPage[] = [];
  var forewordPages: BookPage[] = [];
  var contentPages: BookPage[] = [];
  var backMatterPages: BookPage[] = [];
  var parts: PartEntry[] = [];
  var currentPart: PartEntry | null = null;

  for (var idx = 0; idx < sortedPaths.length; idx++) {
    var path = sortedPaths[idx];
    var raw = rawFiles[path];
    var parsed = parseFrontmatter(raw);
    var meta = parsed.meta;
    var body = parsed.body;

    // Determine section from folder name
    var segments = path.split('/');
    var folder = segments[segments.length - 2]; // e.g. "00-front-matter"
    var isFront = folder.startsWith('00-');
    var isBack = folder.startsWith('05-');

    switch (meta.type) {
      // ── Front matter ──────────────────────────────────────────────────────
      case 'cover':
        preForeword.push({ id: 'cover', type: 'cover', title: meta.title, subtitle: meta.subtitle });
        break;

      case 'inside-front':
        preForeword.push({ id: 'inside-front', type: 'inside-front', paragraphs: toParas(body) });
        break;

      case 'title':
        preForeword.push({
          id: 'title-page',
          type: 'title',
          pageNumber: meta.pageNumber,
          title: meta.title,
          subtitle: meta.subtitle,
          paragraphs: toParas(body),
        });
        break;

      case 'dedication':
        preForeword.push({ id: 'dedication', type: 'dedication', pageNumber: meta.pageNumber, paragraphs: toParas(body) });
        break;

      case 'epigraph':
        preForeword.push({ id: 'epigraph', type: 'epigraph', pageNumber: meta.pageNumber, paragraphs: toParas(body) });
        break;

      case 'foreword':
        forewordPages.push({
          id: 'foreword',
          type: 'foreword',
          pageNumber: meta.pageNumber,
          title: meta.title,
          paragraphs: toParas(body),
        });
        break;

      // ── Part titles ───────────────────────────────────────────────────────
      case 'part-title': {
        if (currentPart) parts.push(currentPart);
        currentPart = {
          part: meta.part || 0,
          partTitle: 'Part ' + (ROMAN[( meta.part || 1) - 1] || meta.part) + ' - ' + (meta.title || ''),
          partSubtitle: meta.subtitle || '',
          partPageNumber: meta.pageNumber || 0,
          chapters: [],
        };
        contentPages.push({
          id: 'part' + meta.part + '-title',
          type: 'part-title',
          pageNumber: meta.pageNumber,
          part: meta.part,
          title: meta.title,
          subtitle: meta.subtitle,
        });
        break;
      }

      // ── Chapters ─────────────────────────────────────────────────────────
      case 'chapter': {
        var chNum = meta.chapter || 0;
        var chId = 'ch' + chNum;

        contentPages.push({
          id: chId + '-title',
          type: 'chapter-start',
          pageNumber: meta.startPage,
          chapter: chNum,
          title: meta.title,
          subtitle: meta.subtitle,
        });

        if (currentPart) {
          currentPart.chapters.push({
            chapter: chNum,
            title: meta.title || '',
            startPage: meta.startPage || 0,
          });
        }

        var pageBlocks = splitPages(body);
        var pageNum = (meta.startPage || 0) + 1;

        for (var bi = 0; bi < pageBlocks.length; bi++) {
          var paras = toParas(pageBlocks[bi]);
          if (paras.length > 0) {
            contentPages.push({
              id: chId + '-content-' + pageNum,
              type: 'chapter-content',
              pageNumber: pageNum++,
              chapter: chNum,
              paragraphs: paras,
            });
          }
        }
        break;
      }

      // ── Back matter ───────────────────────────────────────────────────────
      case 'afterword':
        backMatterPages.push({
          id: 'afterword',
          type: 'afterword',
          pageNumber: meta.pageNumber,
          title: meta.title,
          paragraphs: toParas(body),
        });
        break;

      case 'appendix-divider':
        backMatterPages.push({
          id: 'appendix-divider',
          type: 'appendix-title',
          pageNumber: meta.pageNumber,
          title: meta.title,
        });
        break;

      case 'appendix': {
        var appId = meta.appendixId || 'x';
        backMatterPages.push({
          id: 'appendix-' + appId + '-title',
          type: 'appendix-title',
          pageNumber: meta.pageNumber,
          title: meta.title,
          subtitle: meta.subtitle,
        });

        var appBlocks = splitPages(body);
        var appPageNum = (meta.pageNumber || 0) + 1;

        for (var ai = 0; ai < appBlocks.length; ai++) {
          var appParas = toParas(appBlocks[ai]);
          if (appParas.length > 0) {
            backMatterPages.push({
              id: 'appendix-' + appId + '-content-' + appPageNum,
              type: 'chapter-content',
              pageNumber: appPageNum++,
              paragraphs: appParas,
            });
          }
        }
        break;
      }

      case 'about-author':
        backMatterPages.push({
          id: 'about-author',
          type: 'about-author',
          pageNumber: meta.pageNumber,
          title: meta.title,
          paragraphs: toParas(body),
        });
        break;

      case 'back-cover':
        backMatterPages.push({ id: 'back-cover', type: 'back-cover', title: meta.title, paragraphs: toParas(body) });
        break;
    }
  }

  // Push the last part
  if (currentPart) parts.push(currentPart);

  // TOC is inserted between epigraph and foreword.
  // preForeword ends with epigraph (pageNumber: 3).
  // TOC starts at pageNumber 4.
  var tocStartPage = 4;
  var tocPages = buildTocPages(parts, tocStartPage);

  return ([] as BookPage[])
    .concat(preForeword)
    .concat(tocPages)
    .concat(forewordPages)
    .concat(contentPages)
    .concat(backMatterPages);
}

export var bookPages: BookPage[] = loadBookPages();
