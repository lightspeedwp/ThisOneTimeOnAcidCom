/**
 * @fileoverview Barrel for eBook page data.
 *
 * Content is now sourced from Markdown files in src/content/book/.
 * Edit those files directly to change book text, add/remove chapters, or restructure parts.
 * The TypeScript modules in src/app/data/mock/pages/ebook/ are kept as fallback reference
 * but are no longer the active source of truth.
 *
 * @module data/mock/pages/ebook-pages
 * @version 4.0.0
 */

export type { BookPageType, BookPage } from './ebook/types';
export { bookPages } from '../../../utils/bookContentLoader';