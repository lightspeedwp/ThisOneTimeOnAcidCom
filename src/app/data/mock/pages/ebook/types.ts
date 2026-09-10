/**
 * @fileoverview Shared types for ebook page data files.
 * Extracted from ebook-pages.ts (T18).
 */

export type BookPageType =
  | 'cover'
  | 'inside-front'
  | 'title'
  | 'dedication'
  | 'epigraph'
  | 'toc'
  | 'foreword'
  | 'part-title'
  | 'chapter-start'
  | 'chapter-content'
  | 'appendix-title'
  | 'afterword'
  | 'about-author'
  | 'back-cover';

export interface BookPage {
  id: string;
  type: BookPageType;
  /** Displayed in footer area */
  pageNumber?: number;
  /** Chapter number (chapter pages only) */
  chapter?: number;
  /** Part number (part-title pages only) */
  part?: number;
  /** Title for chapter-start, section headings, etc. */
  title?: string;
  /** Subtitle / epigraph */
  subtitle?: string;
  /** Body paragraphs */
  paragraphs?: string[];
  /** TOC items — now with optional part label and page number */
  tocItems?: { number: number; title: string; partLabel?: string; page?: number }[];
}
