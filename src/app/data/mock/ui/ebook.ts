/**
 * @fileoverview Centralised UI labels for the eBook reader component
 *
 * Every display string rendered in EbookPage.tsx MUST be sourced from here.
 *
 * @module data/mock/ui/ebook
 * @version 1.1.0
 */

export const ebookUI = {
  /** Cover page labels */
  cover: {
    status: 'Preview \u2014 work in progress',
    author: 'Ash Shaw',
  },

  /** Structural labels used in the page renderer */
  labels: {
    chapter: 'Chapter',
    part: 'Part',
    appendix: 'Appendix',
  },

  /** Part number word map */
  partWords: ['One', 'Two', 'Three', 'Four'] as readonly string[],

  /** Part number Roman numeral map (for chapter index) */
  partNumerals: ['I', 'II', 'III', 'IV'] as readonly string[],

  /** Chapter drawer / navigation */
  drawer: {
    title: 'Chapters',
    ariaLabel: 'Chapter navigation',
    closeAriaLabel: 'Close chapter navigation',
    listAriaLabel: 'Chapter list',
  },

  /** Chapter index sidebar labels (fallbacks) */
  chapterIndex: {
    cover: 'Cover',
    contents: 'Contents',
    foreword: 'Foreword',
    afterword: 'Afterword',
    aboutAuthor: 'About the Author',
    backCover: 'Back Cover',
  },

  /** Main reader aria label */
  readerAriaLabel: 'eBook reader: This one time on acid\u2026',

  /** Fullscreen toggle labels */
  fullscreen: {
    enter: 'Enter full screen',
    exit: 'Exit full screen',
  },

  /** Navigation button labels */
  nav: {
    prev: 'Previous page',
    next: 'Next page',
    openChapters: 'Open chapter navigation',
    settings: 'Open reader settings',
    ariaLabel: 'Book navigation',
  },

  /** Aria label templates for dynamic regions */
  aria: {
    singlePage: (current: number, total: number) =>
      `Page ${current} of ${total}`,
    spreadPage: (current: number, total: number) =>
      `Book spread ${current} of ${total}`,
  },
};