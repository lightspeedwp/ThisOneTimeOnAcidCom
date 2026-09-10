/**
 * @fileoverview Book sub-page data. Extracted from about-subpages.ts (T17).
 */
import type { AboutSubpageData } from './types';

export interface BookChapterPreview {
  id: string;
  number: number;
  title: string;
  teaser: string;
}

export interface BookPageData extends AboutSubpageData {
  book: {
    title: string;
    subtitle: string;
    status: string;
    author: string;
    coverAccent: 'pink';
    textAccent: 'yellow';
    blurb: string[];
    chapters: BookChapterPreview[];
    chaptersHeading: string;
    sampleHeading: string;
    sampleDescription: string;
    sampleCta: string;
  };
}

export var bookPageData: BookPageData = {
  hero: {
    badge: 'Coming Soon',
    title: 'This one time on acid\u2026',
    description:
      'Ash is writing a book. Part memoir, part manifesto, part fever dream \u2014 weaving his craziest life stories into the deepest lessons they taught him.',
  },
  breadcrumbs: [
    { label: 'Home', href: '/' },
    { label: 'Book' },
  ],
  sections: [
    {
      id: 'why',
      title: 'Why this book',
      paragraphs: [
        'People keep telling Ash he should write a book. "You can\u2019t make this stuff up," they say, and they\u2019re right \u2014 you can\u2019t. The stories are too absurd, too beautiful, too perfectly timed by the universe to be fiction.',
        'But this isn\u2019t a party memoir. It\u2019s about what the chaos teaches you. It\u2019s about how an Aquarian crazy soul met with an ADHD neurodiverse brain, how these combined with Lucy to forge the person he is today. It\u2019s never one thing \u2014 usually it\u2019s the culmination of many experiences over a long period that finally crystallise into understanding.',
      ],
    },
    {
      id: 'lessons',
      title: 'Stories that changed everything',
      paragraphs: [
        'Each chapter weaves a wild story \u2014 the kind friends retell at 4am around a campfire \u2014 into Ash\u2019s biggest life lessons and deepest learnings. The moments that changed him, made him who he is, and why they impacted him so profoundly.',
        'The book explores how psychedelic experiences don\u2019t just show you another reality; they rewire how you process this one. How ADHD isn\u2019t a disorder when your environment finally matches your brain\u2019s operating system. How the festival dancefloor became the classroom where everything made sense.',
      ],
    },
    {
      id: 'aquarius-adhd',
      title: 'Aquarius meets ADHD',
      paragraphs: [
        'Ash has always been wired differently. The Aquarian need to question everything, to reject the conventional, to see patterns others miss \u2014 amplified by an ADHD brain that moves at 200km/h and makes connections across disciplines, cultures, and altered states.',
        'For years, this combination felt like a curse. Too weird for the normal world, too scattered for the creative one. Then Berlin, then Lucy, then the dancefloor \u2014 and suddenly the wiring wasn\u2019t a bug, it was the feature. The book maps that transformation honestly and without apology.',
      ],
    },
    {
      id: 'timeline',
      title: 'The writing journey',
      paragraphs: [
        'This is not a book that will be rushed. Ash plans to write it over the next few years \u2014 letting the stories breathe, revisiting them from new angles, pressure-testing the lessons against the life that keeps unfolding.',
        'Some chapters are already drafted in late-night voice notes and scrawled notebook pages. Others are still being lived. The book will arrive when it\u2019s ready, not before.',
      ],
    },
  ],
  book: {
    title: 'This one time on acid\u2026',
    subtitle: 'Stories, lessons & the making of a neon soul',
    status: 'In progress \u2014 expected over the next few years',
    author: 'Ash Shaw',
    coverAccent: 'pink',
    textAccent: 'yellow',
    blurb: [
      'A raw, honest memoir weaving the wildest stories from the psytrance dancefloor into the deepest lessons they taught.',
      'How an Aquarian soul, an ADHD brain, and Lucy in the Sky combined to create an artist, a nomad, and a life lived in full colour.',
    ],
    chapters: [
      { id: 'ch-1', number: 1, title: 'The first drop', teaser: 'Every journey starts somewhere impossible. This one started on a rooftop in Cape Town.' },
      { id: 'ch-2', number: 2, title: 'Wired different', teaser: 'ADHD, Aquarius, and the feeling that the world was running on a different operating system.' },
      { id: 'ch-3', number: 3, title: 'Berlin calling', teaser: 'A one-way ticket, a bicycle, and the city that would become home.' },
      { id: 'ch-4', number: 4, title: 'The dancefloor classroom', teaser: 'When 140 BPM became the heartbeat of understanding.' },
      { id: 'ch-5', number: 5, title: 'Neon revelations', teaser: 'The night Ash picked up UV paint and discovered his voice wasn\u2019t in words.' },
      { id: 'ch-6', number: 6, title: 'The cumulative effect', teaser: 'It\u2019s never one moment. It\u2019s the thousand moments that suddenly click.' },
    ],
    chaptersHeading: 'Chapter previews',
    sampleHeading: 'Read the first pages',
    sampleDescription: 'Curious? Read draft excerpts from the first three chapters \u2014 raw, unfiltered, and straight from the voice notes.',
    sampleCta: 'Read sample chapters',
  },
};
