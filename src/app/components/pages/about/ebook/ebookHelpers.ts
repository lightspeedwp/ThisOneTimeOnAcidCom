/**
 * @fileoverview Ebook reader helpers — types, constants, data builders, spread logic.
 * Extracted from EbookPage.tsx (T14).
 */

import { useState, useEffect, useLayoutEffect } from 'react';
import type { BookPage } from '../../../../data/mock/pages/ebook-pages';
import { bookPages, SPLITTABLE_TYPES } from '../../../../data/mock/pages/ebook-pages';
import { ebookUI } from '../../../../data/mock/ui/ebook';

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   CONSTANTS
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

export var SPREAD_BREAKPOINT = '(min-width: 1024px)';
export var SWIPE_THRESHOLD = 40;
export var SWIPE_ANGLE_MAX = Math.PI / 4;

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   CHAPTER INDEX
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

export interface ChapterEntry {
  pageIndex: number;
  label: string;
  indent: boolean;
}

export function buildChapterIndex(pages: BookPage[]): ChapterEntry[] {
  var entries: ChapterEntry[] = [];
  pages.forEach(function (page, idx) {
    switch (page.type) {
      case 'cover':
        entries.push({ pageIndex: idx, label: ebookUI.chapterIndex.cover, indent: false });
        break;
      case 'toc':
        if (page.title === 'Contents') {
          entries.push({ pageIndex: idx, label: ebookUI.chapterIndex.contents, indent: false });
        }
        break;
      case 'foreword':
        entries.push({ pageIndex: idx, label: page.title || ebookUI.chapterIndex.foreword, indent: false });
        break;
      case 'part-title':
        var partNum = page.part || 1;
        var partNumeralIdx = partNum - 1;
        var partNumeral = ebookUI.partNumerals[partNumeralIdx] || ebookUI.partNumerals[0];
        entries.push({
          pageIndex: idx,
          label: ebookUI.labels.part + ' ' + partNumeral + ' — ' + page.title,
          indent: false,
        });
        break;
      case 'chapter-start':
        entries.push({
          pageIndex: idx,
          label: page.chapter + '. ' + page.title,
          indent: true,
        });
        break;
      case 'appendix-title':
        entries.push({ pageIndex: idx, label: ebookUI.labels.appendix + ' — ' + page.title, indent: false });
        break;
      case 'afterword':
        entries.push({ pageIndex: idx, label: page.title || ebookUI.chapterIndex.afterword, indent: false });
        break;
      case 'about-author':
        entries.push({ pageIndex: idx, label: page.title || ebookUI.chapterIndex.aboutAuthor, indent: false });
        break;
      case 'back-cover':
        entries.push({ pageIndex: idx, label: ebookUI.chapterIndex.backCover, indent: false });
        break;
    }
  });
  return entries;
}

export var chapterIndex = buildChapterIndex(bookPages);

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   DRAWER GROUPS
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

export interface DrawerGroup {
  id: string;
  label: string;
  collapsible: boolean;
  entries: Array<{ entry: ChapterEntry; globalIdx: number }>;
}

export function buildDrawerGroups(entries: ChapterEntry[]): DrawerGroup[] {
  var groups: DrawerGroup[] = [];
  var currentGroup: DrawerGroup = {
    id: 'front-matter',
    label: 'Front matter',
    collapsible: false,
    entries: [],
  };

  for (var i = 0; i < entries.length; i++) {
    var entry = entries[i];

    if (!entry.indent && entry.label.indexOf('Part ') === 0) {
      if (currentGroup.entries.length > 0) {
        groups.push(currentGroup);
      }
      currentGroup = {
        id: 'group-' + i,
        label: entry.label,
        collapsible: true,
        entries: [{ entry: entry, globalIdx: i }],
      };
    } else if (!entry.indent && (
      entry.label.indexOf('Appendix') === 0 ||
      entry.label === ebookUI.chapterIndex.afterword ||
      entry.label === ebookUI.chapterIndex.aboutAuthor ||
      entry.label === ebookUI.chapterIndex.backCover
    )) {
      if (currentGroup.id !== 'back-matter') {
        if (currentGroup.entries.length > 0) {
          groups.push(currentGroup);
        }
        currentGroup = {
          id: 'back-matter',
          label: 'Back matter',
          collapsible: false,
          entries: [],
        };
      }
      currentGroup.entries.push({ entry: entry, globalIdx: i });
    } else {
      currentGroup.entries.push({ entry: entry, globalIdx: i });
    }
  }

  if (currentGroup.entries.length > 0) {
    groups.push(currentGroup);
  }

  return groups;
}

export var drawerGroups = buildDrawerGroups(chapterIndex);

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   SPREAD COMPUTATION
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

export interface Spread {
  left: BookPage | null;
  right: BookPage | null;
}

export function buildSpreads(pages: BookPage[]): Spread[] {
  var spreads: Spread[] = [];
  spreads.push({ left: null, right: pages[0] });
  for (var i = 1; i < pages.length; i += 2) {
    spreads.push({
      left: pages[i] || null,
      right: pages[i + 1] || null,
    });
  }
  return spreads;
}

/** Map a single-page index to the spread index that contains it */
export function pageToSpread(pageIndex: number): number {
  if (pageIndex <= 0) return 0;
  return Math.ceil(pageIndex / 2);
}

/** Map a spread index to the first single-page index in that spread */
export function spreadToPage(spreadIndex: number): number {
  if (spreadIndex <= 0) return 0;
  return spreadIndex * 2 - 1;
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   HOOK: useSpreadMode
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

export function useSpreadMode(): boolean {
  var initVal = function () {
    if (typeof window === 'undefined') return false;
    return window.matchMedia(SPREAD_BREAKPOINT).matches;
  };
  var result = useState(initVal);
  var isSpread = result[0];
  var setIsSpread = result[1];

  useEffect(function () {
    var mql = window.matchMedia(SPREAD_BREAKPOINT);
    var handler = function (e: MediaQueryListEvent) { setIsSpread(e.matches); };
    mql.addEventListener('change', handler);
    return function () { mql.removeEventListener('change', handler); };
  }, []);

  return isSpread;
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   HOOK: usePrefersReducedMotion
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

export function usePrefersReducedMotion(): boolean {
  var initVal = function () {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  };
  var result = useState(initVal);
  var prefersReduced = result[0];
  var setPrefersReduced = result[1];

  useEffect(function () {
    var mql = window.matchMedia('(prefers-reduced-motion: reduce)');
    var handler = function (e: MediaQueryListEvent) { setPrefersReduced(e.matches); };
    mql.addEventListener('change', handler);
    return function () { mql.removeEventListener('change', handler); };
  }, []);

  return prefersReduced;
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   DYNAMIC PAGINATION — probe-based height splitting
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

/** Approx gap between consecutive paragraphs inside a page, in CSS pixels */
var PROBE_PARA_GAP = 16;

/**
 * Measures each paragraph of a splittable page in the given probe element and
 * splits the page into screen-height chunks. Non-splittable pages pass through
 * unchanged.
 */
function heightSplit(rawPages: BookPage[], probe: HTMLElement, availableHeight: number): BookPage[] {
  var result: BookPage[] = [];

  for (var i = 0; i < rawPages.length; i++) {
    var page = rawPages[i];

    if (!SPLITTABLE_TYPES.has(page.type) || !page.paragraphs || page.paragraphs.length === 0) {
      result.push(page);
      continue;
    }

    // Render each paragraph into the probe and record its rendered height
    probe.innerHTML = '';
    var paraHeights: number[] = [];
    for (var j = 0; j < page.paragraphs.length; j++) {
      var pEl = document.createElement('p');
      pEl.className = 'ebook-page__paragraph';
      pEl.textContent = page.paragraphs[j];
      probe.appendChild(pEl);
      paraHeights.push(pEl.offsetHeight);
    }
    probe.innerHTML = '';

    // Accumulate paragraphs into chunks that fit within availableHeight
    var currentParas: string[] = [];
    var currentHeight = 0;
    var chunkIdx = 0;

    for (var k = 0; k < page.paragraphs.length; k++) {
      var gap = currentParas.length > 0 ? PROBE_PARA_GAP : 0;
      var ph = paraHeights[k] + gap;

      if (currentParas.length > 0 && currentHeight + ph > availableHeight) {
        result.push({
          id: chunkIdx === 0 ? page.id : page.id + '-p' + (chunkIdx + 1),
          type: page.type,
          pageNumber: page.pageNumber,
          chapter: page.chapter,
          part: page.part,
          title: page.title,
          subtitle: page.subtitle,
          paragraphs: currentParas,
        });
        currentParas = [page.paragraphs[k]];
        currentHeight = paraHeights[k];
        chunkIdx++;
      } else {
        currentParas.push(page.paragraphs[k]);
        currentHeight += ph;
      }
    }

    if (currentParas.length > 0) {
      result.push({
        id: chunkIdx === 0 ? page.id : page.id + '-p' + (chunkIdx + 1),
        type: page.type,
        pageNumber: page.pageNumber,
        chapter: page.chapter,
        part: page.part,
        title: page.title,
        subtitle: page.subtitle,
        paragraphs: currentParas,
      });
    }
  }

  return result;
}

/**
 * Re-paginates `rawPages` based on actual paragraph heights measured against
 * the DOM probe element. Falls back to the static `bookPages` until the probe
 * is mounted and `availableHeight` is known. Re-runs whenever `availableHeight`
 * or `fontSizeDep` changes (e.g. orientation flip, user font-size preference).
 */
export function useDynamicPagination(
  rawPages: BookPage[],
  probeEl: HTMLElement | null,
  availableHeight: number,
  fontSizeDep: string
): BookPage[] {
  var initState = function (): BookPage[] { return bookPages; };
  var pagesState = useState<BookPage[]>(initState);
  var pages = pagesState[0];
  var setPages = pagesState[1];

  useLayoutEffect(function () {
    if (!probeEl || availableHeight <= 0) return;
    var measured = heightSplit(rawPages, probeEl, availableHeight);
    setPages(measured);
  }, [rawPages, probeEl, availableHeight, fontSizeDep]);

  return pages;
}

/** CSS class for page type */
export function pageTypeClass(page: BookPage): string {
  return 'ebook-page--' + page.type;
}
