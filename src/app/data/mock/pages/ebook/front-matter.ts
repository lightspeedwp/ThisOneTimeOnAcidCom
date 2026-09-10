/**
 * @fileoverview eBook front matter pages. Extracted from ebook-pages.ts (T18).
 */
import type { BookPage } from './types';

export var frontMatterPages: BookPage[] = [
  /* ── 0: Front Cover ── */
  { id: 'cover', type: 'cover', title: 'This one time on acid\u2026', subtitle: 'Stories, lessons & the making of a neon soul' },

  /* ── 1: Inside Front ── */
  { id: 'inside-front', type: 'inside-front', paragraphs: ['First edition \u2014 work in progress', 'All content \u00A9 Ash Shaw 2026', 'Neon vs Atomic Black'] },

  /* ── 2: Title Page ── */
  { id: 'title-page', type: 'title', pageNumber: 1, title: 'This one time on acid\u2026', subtitle: 'Stories, lessons & the making of a neon soul', paragraphs: ['Ash Shaw'] },

  /* ── 3: Dedication ── */
  { id: 'dedication', type: 'dedication', pageNumber: 2, paragraphs: [
    'For the ones who dance until sunrise and still see the world differently when the sun comes up.',
    'For the misfits, the questioners, the ones whose brains run at 200\u202Fkm/h.',
    'For Lucy.',
  ]},

  /* ── 4: Epigraph ── */
  { id: 'epigraph', type: 'epigraph', pageNumber: 3, paragraphs: [
    '\u201CIt is never one thing. Usually it is the culmination of many experiences over a period that finally crystallise into understanding.\u201D',
    '\u2014 Ash Shaw',
  ]},

  /* ── 5: Table of Contents (page 1) ── */
  { id: 'toc-1', type: 'toc', pageNumber: 4, title: 'Contents', tocItems: [
    { number: 0, title: 'Part one \u2014 Early life (pre-Y2K)', partLabel: 'I', page: 8 },
    { number: 1, title: 'Snails in the garden', page: 9 },
    { number: 2, title: 'Wired different', page: 12 },
    { number: 3, title: 'Half colours', page: 15 },
    { number: 4, title: 'The first drop', page: 18 },
    { number: 0, title: 'Part two \u2014 Carefree 20s & early', partLabel: 'II', page: 21 },
    { number: 5, title: 'Eighty-six hours', page: 22 },
    { number: 6, title: 'The costume evolution', page: 28 },
    { number: 7, title: 'The dancefloor gave me everything', page: 33 },
    { number: 8, title: 'LSD', page: 38 },
    { number: 9, title: 'Island time', page: 41 },
  ]},

  /* ── 6: Table of Contents (page 2) ── */
  { id: 'toc-2', type: 'toc', pageNumber: 5, title: 'Contents (continued)', tocItems: [
    { number: 0, title: 'Part three \u2014 Nomadic life begins (BC)', partLabel: 'III', page: 46 },
    { number: 10, title: 'Six Cats: the green garden', page: 47 },
    { number: 11, title: 'Berlin calling', page: 58 },
    { number: 12, title: 'The loaded bike', page: 61 },
    { number: 13, title: 'Neon revelations', page: 64 },
    { number: 14, title: 'The pilgrimage', page: 70 },
    { number: 0, title: 'Part four \u2014 Re-emergence & finding myself again', partLabel: 'IV', page: 73 },
    { number: 15, title: 'The artist\u2019s lifestyle', page: 74 },
    { number: 16, title: 'Dance like no one\u2019s watching', page: 79 },
    { number: 17, title: 'One million steps', page: 82 },
    { number: 18, title: 'Freedom as operating principle', page: 85 },
    { number: 19, title: 'Twenty-three years', page: 88 },
    { number: 20, title: 'The cumulative effect', page: 98 },
  ]},

  /* ── 6.5: Table of Contents (page 3) ── */
  { id: 'toc-3', type: 'toc', pageNumber: 6, title: 'Contents (continued)', tocItems: [
    { number: 0, title: 'Appendices', partLabel: '\u2014', page: 102 },
    { number: 0, title: '  Appendix A \u2014 Dance like no one\u2019s watching', partLabel: '', page: 103 },
    { number: 0, title: '  Appendix B \u2014 The tribes', partLabel: '', page: 106 },
  ]},

  /* ── 7: Foreword ── */
  { id: 'foreword', type: 'foreword', pageNumber: 7, title: 'How to read this', paragraphs: [
    'These are draft excerpts. They\u2019re rough, honest, and unpolished by design. The book is being written in the same way Ash paints \u2014 fast first strokes to capture the energy, refined later to bring out the detail.',
    'The four parts trace a life from small-town South Africa through the dancefloors of three continents. Part One is the soil: childhood, neurodivergence, and a brain that didn\u2019t fit the world it was born into. Part Two is the awakening: the festivals, the relationships, and the business born from restlessness. Part Three is the road: Berlin, bicycles, and the night UV paint changed everything. Part Four is the harvest: the return to self, the creative record, and the cumulative effect of a life lived in full colour.',
    'Read them as snapshots of a work in progress. Some passages will make it to the final book, others will evolve beyond recognition. That\u2019s the process. The book arrives when it\u2019s ready, not before.',
  ]},
];
