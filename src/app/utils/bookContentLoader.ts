/** Build the reader page model from the approved manuscript directories. */
import type { BookPage } from '../data/mock/pages/ebook/types';
import {
  BOOK_SOURCE_GLOBS,
  formatSourceDiagnostics,
  parseBookSource,
  sortBookSourcePaths,
  type ParsedBookSource,
} from './bookContentSource';

export var bookSourceDiagnostics: ReturnType<typeof parseBookSource>['diagnostics'] = [];

// The root-level book brief is reference material, not a reader source.
var rawFiles = import.meta.glob<string>(BOOK_SOURCE_GLOBS, { eager: true, query: '?raw', import: 'default' });

export { BOOK_SOURCE_DIRECTORIES, BOOK_SOURCE_GLOBS, parseBookSource, sortBookSourcePaths } from './bookContentSource';

function toParas(block: string): string[] {
  return block.split(/\n\n+/).map(function (p) { return p.trim(); }).filter(Boolean);
}

export function splitPages(body: string): string[] {
  return body.split(/\n---\n/).map(function (b) { return b.trim(); }).filter(Boolean);
}

interface PartEntry {
  part: number;
  partTitle: string;
  partPageIndex: number;
  chapters: Array<{ chapter: number; title: string; pageIndex: number }>;
}
interface BackMatterTocItem { title: string; pageIndex: number; isSection?: boolean; }

var ROMAN = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII'];
var PART_WORDS = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight'];
var TOC_ITEMS_PER_PAGE = 11;

function pageWithSource(page: BookPage, source: ParsedBookSource, paragraphStart?: number): BookPage {
  return { ...page, sourceId: source.sourceId, paragraphStart };
}

function buildTocPages(parts: PartEntry[], backItems: BackMatterTocItem[], contentOffset: number, backMatterOffset: number): BookPage[] {
  var entries: Array<{ number: number; title: string; partLabel?: string; page: number }> = [];
  for (var pi = 0; pi < parts.length; pi++) {
    var part = parts[pi];
    entries.push({ number: 0, title: part.partTitle, partLabel: ROMAN[part.part - 1] || String(part.part), page: contentOffset + part.partPageIndex + 1 });
    for (var ci = 0; ci < part.chapters.length; ci++) {
      var chapter = part.chapters[ci];
      entries.push({ number: chapter.chapter, title: chapter.title, page: contentOffset + chapter.pageIndex + 1 });
    }
  }
  for (var bi = 0; bi < backItems.length; bi++) {
    var back = backItems[bi];
    entries.push({ number: 0, title: back.title, partLabel: back.isSection ? '\u2014' : '', page: backMatterOffset + back.pageIndex + 1 });
  }
  var pages: BookPage[] = [];
  for (var i = 0; i < entries.length; i += TOC_ITEMS_PER_PAGE) {
    pages.push({ id: 'toc-' + (pages.length + 1), type: 'toc', title: i === 0 ? 'Contents' : 'Contents (continued)', tocItems: entries.slice(i, i + TOC_ITEMS_PER_PAGE) });
  }
  return pages;
}

function withSequentialPageNumbers(pages: BookPage[]): BookPage[] {
  return pages.map(function (page, index) { return { ...page, pageNumber: index + 1 }; });
}

function throwOnErrors(diagnostics: ReturnType<typeof parseBookSource>['diagnostics']): void {
  var errors = diagnostics.filter(function (item) { return item.severity === 'error'; });
  if (errors.length > 0) throw new Error('Invalid ebook manuscript sources:\n' + formatSourceDiagnostics(errors));
}

export function assembleBookPages(files: Record<string, string>): BookPage[] {
  var paths = sortBookSourcePaths(Object.keys(files));
  if (paths.length === 0) throw new Error('Invalid ebook manuscript sources:\n[error] No canonical manuscript sources were discovered.');
  var sources: ParsedBookSource[] = [];
  var diagnostics: ReturnType<typeof parseBookSource>['diagnostics'] = [];
  for (var si = 0; si < paths.length; si++) {
    var parsed = parseBookSource(files[paths[si]], paths[si]);
    sources.push(parsed);
    diagnostics = diagnostics.concat(parsed.diagnostics);
  }
  bookSourceDiagnostics = diagnostics;
  throwOnErrors(diagnostics);

  var preForeword: BookPage[] = [];
  var forewordPages: BookPage[] = [];
  var contentPages: BookPage[] = [];
  var backMatterPages: BookPage[] = [];
  var parts: PartEntry[] = [];
  var currentPart: PartEntry | null = null;
  var backMatterTocItems: BackMatterTocItem[] = [];

  for (var idx = 0; idx < sources.length; idx++) {
    var source = sources[idx];
    var meta = source.meta;
    var body = source.body;
    switch (meta.type) {
      case 'cover': preForeword.push(pageWithSource({ id: 'cover', type: 'cover', title: meta.title, subtitle: meta.subtitle }, source)); break;
      case 'inside-front': preForeword.push(pageWithSource({ id: 'inside-front', type: 'inside-front', paragraphs: toParas(body) }, source, 0)); break;
      case 'title': preForeword.push(pageWithSource({ id: 'title-page', type: 'title', title: meta.title, subtitle: meta.subtitle, paragraphs: toParas(body) }, source, 0)); break;
      case 'dedication': preForeword.push(pageWithSource({ id: 'dedication', type: 'dedication', paragraphs: toParas(body) }, source, 0)); break;
      case 'epigraph': preForeword.push(pageWithSource({ id: 'epigraph', type: 'epigraph', paragraphs: toParas(body) }, source, 0)); break;
      case 'foreword': forewordPages.push(pageWithSource({ id: 'foreword', type: 'foreword', title: meta.title, paragraphs: toParas(body) }, source, 0)); break;
      case 'part-title': {
        if (currentPart) parts.push(currentPart);
        currentPart = { part: meta.part || 0, partTitle: 'Part ' + (PART_WORDS[(meta.part || 1) - 1] || ROMAN[(meta.part || 1) - 1] || String(meta.part)) + ' \u2014 ' + (meta.title || '') + (meta.subtitle ? ' (' + meta.subtitle + ')' : ''), partPageIndex: contentPages.length, chapters: [] };
        contentPages.push(pageWithSource({ id: 'part' + meta.part + '-title', type: 'part-title', part: meta.part, title: meta.title, subtitle: meta.subtitle }, source));
        break;
      }
      case 'chapter': {
        var chapterNumber = meta.chapter || 0;
        var chapterId = 'ch' + chapterNumber;
        var chapterStartIndex = contentPages.length;
        contentPages.push(pageWithSource({ id: chapterId + '-title', type: 'chapter-start', chapter: chapterNumber, title: meta.title, subtitle: meta.subtitle }, source));
        if (currentPart) currentPart.chapters.push({ chapter: chapterNumber, title: meta.title || '', pageIndex: chapterStartIndex });
        var blocks = splitPages(body);
        var paragraphStart = 0;
        for (var blockIndex = 0; blockIndex < blocks.length; blockIndex++) {
          var paragraphs = toParas(blocks[blockIndex]);
          if (paragraphs.length > 0) {
            contentPages.push(pageWithSource({ id: chapterId + '-content-' + (blockIndex + 1), type: 'chapter-content', chapter: chapterNumber, paragraphs: paragraphs }, source, paragraphStart));
            paragraphStart += paragraphs.length;
          }
        }
        break;
      }
      case 'afterword': backMatterPages.push(pageWithSource({ id: 'afterword', type: 'afterword', title: meta.title, paragraphs: toParas(body) }, source, 0)); break;
      case 'appendix-divider':
        backMatterTocItems.push({ title: meta.title || 'Appendices', pageIndex: backMatterPages.length, isSection: true });
        backMatterPages.push(pageWithSource({ id: 'appendix-divider', type: 'appendix-title', title: meta.title }, source));
        break;
      case 'appendix': {
        var appendixId = meta.appendixId || 'x';
        backMatterTocItems.push({ title: '  ' + (meta.title || ''), pageIndex: backMatterPages.length });
        backMatterPages.push(pageWithSource({ id: 'appendix-' + appendixId + '-title', type: 'appendix-title', title: meta.title, subtitle: meta.subtitle }, source));
        var appendixBlocks = splitPages(body);
        var appendixParagraphStart = 0;
        for (var appendixBlockIndex = 0; appendixBlockIndex < appendixBlocks.length; appendixBlockIndex++) {
          var appendixParagraphs = toParas(appendixBlocks[appendixBlockIndex]);
          if (appendixParagraphs.length > 0) {
            backMatterPages.push(pageWithSource({ id: 'appendix-' + appendixId + '-content-' + (appendixBlockIndex + 1), type: 'chapter-content', paragraphs: appendixParagraphs }, source, appendixParagraphStart));
            appendixParagraphStart += appendixParagraphs.length;
          }
        }
        break;
      }
      case 'about-author': backMatterPages.push(pageWithSource({ id: 'about-author', type: 'about-author', title: meta.title, paragraphs: toParas(body) }, source, 0)); break;
      case 'back-cover': backMatterPages.push(pageWithSource({ id: 'back-cover', type: 'back-cover', title: meta.title, paragraphs: toParas(body) }, source, 0)); break;
    }
  }
  if (currentPart) parts.push(currentPart);

  var tocItemCount = parts.reduce(function (total, part) { return total + 1 + part.chapters.length; }, 0) + backMatterTocItems.length;
  var tocPageCount = Math.ceil(tocItemCount / TOC_ITEMS_PER_PAGE);
  var contentOffset = preForeword.length + tocPageCount + forewordPages.length;
  var backMatterOffset = contentOffset + contentPages.length;
  var tocPages = buildTocPages(parts, backMatterTocItems, contentOffset, backMatterOffset);
  return syncTocPageReferences(withSequentialPageNumbers(([] as BookPage[]).concat(preForeword, tocPages, forewordPages, contentPages, backMatterPages)));
}

export var rawBookPages: BookPage[] = assembleBookPages(rawFiles);
export var SPLITTABLE_TYPES = new Set<BookPage['type']>(['chapter-content', 'afterword', 'about-author', 'foreword', 'back-cover']);

export function syncTocPageReferences(pages: BookPage[]): BookPage[] {
  return pages.map(function (page) {
    if (page.type !== 'toc' || !page.tocItems) return page;
    return {
      ...page,
      tocItems: page.tocItems.map(function (item) {
        var target: BookPage | undefined;
        if (item.number > 0) {
          target = pages.find(function (candidate) { return candidate.type === 'chapter-start' && candidate.chapter === item.number; });
        } else if (item.partLabel && item.partLabel !== '\u2014') {
          target = pages.find(function (candidate) { return candidate.type === 'part-title' && item.title.indexOf(candidate.title || '') >= 0; });
        } else {
          var title = item.title.trim();
          target = pages.find(function (candidate) { return candidate.type === 'appendix-title' && candidate.title === title; });
        }
        return target && target.pageNumber != null ? { ...item, page: target.pageNumber } : item;
      }),
    };
  });
}

export function splitLargePages(pages: BookPage[], maxParas: number): BookPage[] {
  var result: BookPage[] = [];
  for (var i = 0; i < pages.length; i++) {
    var page = pages[i];
    if (!SPLITTABLE_TYPES.has(page.type) || !page.paragraphs || page.paragraphs.length <= maxParas) { result.push(page); continue; }
    for (var start = 0; start < page.paragraphs.length; start += maxParas) {
      result.push({ ...page, id: start === 0 ? page.id : page.id + '-p' + (start / maxParas + 1), paragraphStart: (page.paragraphStart || 0) + start, paragraphs: page.paragraphs.slice(start, start + maxParas) });
    }
  }
  return syncTocPageReferences(withSequentialPageNumbers(result));
}

function maxParasForViewport(): number {
  if (typeof window === 'undefined') return 5;
  if (window.innerWidth < 480) return 3;
  if (window.innerWidth < 768) return 4;
  return 6;
}

export var bookPages: BookPage[] = splitLargePages(rawBookPages, maxParasForViewport());
