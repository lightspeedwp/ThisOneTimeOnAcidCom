/**
 * @fileoverview Barrel for eBook page data. Fully split into per-part modules.
 *
 * All inline sections extracted to separate files (T18 complete):
 * - types.ts (shared types)
 * - front-matter.ts (cover, preface, dedication, contents)
 * - part-1.ts (ch1-4: Early foundations)
 * - part-2.ts (ch5-9: The festival years)
 * - part-3.ts (ch10-14: Nomadic life begins BC)
 * - part-4.ts (ch15-20: Re-emergence)
 * - back-matter.ts (afterword, appendices, about author)
 *
 * @module data/mock/pages/ebook-pages
 * @version 3.0.0
 */

export type { BookPageType, BookPage } from './ebook/types';
import type { BookPage } from './ebook/types';
import { frontMatterPages } from './ebook/front-matter';
import { part1Pages } from './ebook/part-1';
import { part2Pages } from './ebook/part-2';
import { part3Pages } from './ebook/part-3';
import { part4Pages } from './ebook/part-4';
import { backMatterPages } from './ebook/back-matter';

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   ASSEMBLED EXPORT
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

var combined: BookPage[] = [];
var sections = [frontMatterPages, part1Pages, part2Pages, part3Pages, part4Pages, backMatterPages];
for (var s = 0; s < sections.length; s++) {
  for (var p = 0; p < sections[s].length; p++) {
    combined.push(sections[s][p]);
  }
}

export var bookPages: BookPage[] = combined;