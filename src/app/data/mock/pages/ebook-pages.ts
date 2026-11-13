/**
 * @fileoverview Barrel for eBook page data.
 *
 * The barrel re-exports loader output and its page types. The retained
 * TypeScript chapters under mock/pages/ebook/ are reference material; neither
 * this barrel nor the loader falls back to those chapters.
 *
 * @module data/mock/pages/ebook-pages
 * @version 4.0.0
 */

export type { BookPageType, BookPage } from './ebook/types';
export { bookPages, rawBookPages, SPLITTABLE_TYPES } from '../../../utils/bookContentLoader';
