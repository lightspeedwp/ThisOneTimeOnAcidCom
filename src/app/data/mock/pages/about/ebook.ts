/**
 * @fileoverview eBook sub-page data. Extracted from about-subpages.ts (T17).
 */
import type { AboutSubpageData } from './types';

export interface EbookChapterSample { id: string; number: number; title: string; excerpt: string[]; }

export interface EbookPageData extends AboutSubpageData {
  book: { title: string; subtitle: string; status: string; };
  chapters: EbookChapterSample[];
}

export var ebookPageData: EbookPageData = {
  hero: {
    badge: 'eBook Preview',
    title: 'Read the first pages',
    description: 'Sample chapters from Ash\u2019s upcoming book. Raw, unfiltered, and straight from the voice notes.',
  },
  breadcrumbs: [
    { label: 'Home', href: '/' },
    { label: 'Book', href: '/book' },
    { label: 'eBook Preview' },
  ],
  book: {
    title: 'This one time on acid\u2026',
    subtitle: 'Stories, lessons & the making of a neon soul',
    status: 'Preview \u2014 work in progress',
  },
  sections: [
    { id: 'how-to-read', title: 'How to read this', paragraphs: [
      'These are draft excerpts. They\u2019re rough, honest, and unpolished by design. The book is being written in the same way Ash paints \u2014 fast first strokes to capture the energy, refined later to bring out the detail.',
      'Read them as snapshots of a work in progress. Some passages will make it to the final book, others will evolve beyond recognition. That\u2019s the process.',
    ]},
  ],
  chapters: [
    { id: 'ebook-ch-1', number: 1, title: 'The first drop', excerpt: [
      'It was December 1999 and the world was ending. Or starting. Depending on who you asked at the Vortex festival that weekend, the millennium bug would either wipe out civilisation or usher in a new golden age.',
      'I was seventeen and I didn\u2019t care about either outcome. I was on a dancefloor in the Western Cape bush, wearing a yellow suit I\u2019d found at a charity shop, and for the first time in my life, the world made perfect sense. Not the world outside \u2014 that place had never made sense. The world inside. The one that runs at 140 BPM and communicates in bass frequencies.',
      'By morning they were calling me the Chicken Man. By the following year, I\u2019d graduated to the Cow Man. But that first night \u2014 that first drop into the music, the lights, the community \u2014 was the night I understood that I\u2019d been looking for this all along.',
    ]},
    { id: 'ebook-ch-2', number: 2, title: 'Wired different', excerpt: [
      'Here\u2019s the thing about ADHD that nobody tells you when you\u2019re growing up in a small town in the Western Cape in the 1990s: it\u2019s not a deficit of attention. It\u2019s a surplus of it, all going in directions that school wasn\u2019t designed to handle.',
      'I could spend six hours building a perfect model of something nobody asked for, but I couldn\u2019t sit through forty minutes of mathematics. My brain didn\u2019t reject information \u2014 it rejected boredom. Feed it something interesting and it would devour it with a focus so intense it scared my teachers.',
      'It took me twenty years to understand that this wasn\u2019t broken. It was a feature, not a bug. I just needed to find the right operating system.',
    ]},
    { id: 'ebook-ch-3', number: 3, title: '86 hours on a bus', excerpt: [
      'The bus from Cape Town to Zambia took eighty-six hours. Eighty-six hours of dirt roads, border crossings, and the kind of conversations that only happen when you\u2019ve been awake too long with people you\u2019ve only just met.',
      'We crossed from South Africa into Botswana. From Botswana into Zimbabwe at Livingstone. From Zimbabwe into Zambia at the Chobe River. Each border felt like passing through a portal into somewhere more real, more raw, more alive.',
      'We were heading to a point on the solar eclipse line where totality was the longest \u2014 three and a half minutes of absolute darkness in the middle of the African bush, surrounded by a thousand strangers who felt like family. I was twenty years old, and I had no idea that those three and a half minutes would rearrange my understanding of what matters.',
    ]},
  ],
};
