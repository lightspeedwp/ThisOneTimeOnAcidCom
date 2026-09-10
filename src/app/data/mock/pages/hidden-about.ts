/**
 * @fileoverview Mock data for the hidden About landing page (/about)
 *
 * This page is intentionally unlisted — no nav links point here.
 * It tells Ash's full story in summary and links to all about sub-pages.
 *
 * @module data/mock/pages/hidden-about
 * @version 1.0.0
 */

export interface AboutSubpageCard {
  id: string;
  label: string;
  tagline: string;
  href: string;
  accent: 'pink' | 'blue' | 'green' | 'purple' | 'cyan' | 'orange' | 'yellow' | 'red';
  icon: string;
}

export interface HiddenAboutData {
  hero: {
    greeting: string;
    title: string;
    subtitle: string;
    description: string;
  };
  story: {
    title: string;
    paragraphs: string[];
  };
  media: {
    title: string;
    subtitle: string;
    items: {
      id: string;
      label: string;
      tagline: string;
      href: string;
      accent: string;
      icon: string;
    }[];
  };
  subpages: AboutSubpageCard[];
}

export const hiddenAboutData: HiddenAboutData = {
  hero: {
    greeting: 'You found it.',
    title: 'The whole story',
    subtitle: 'Everything you didn\u2019t know you needed to know about Ash Shaw.',
    description:
      'South African-born, Cape Town-based. He/him. Aquarius. ADHD. Cyclist. Festival soul. Neon and UV makeup artist since July 2019. This is the hidden map to every corner of his world.',
  },

  story: {
    title: 'The short version',
    paragraphs: [
      'Ash Shaw picked up a UV paintbrush for the first time at a park gathering in Berlin in July 2019. What started as a spontaneous experiment became an obsession, then a practice, then a whole identity. He\u2019s been painting faces at psytrance festivals, techno clubs, and open-airs across Europe, South Africa, and Thailand ever since.',
      'He doesn\u2019t do weddings. He doesn\u2019t do corporate events. He doesn\u2019t do commissions. This is a personal art project \u2014 always has been, always will be. The dancefloor is his gallery, blacklight is his medium, and bass is his muse.',
      'Off the dancefloor, he\u2019s a WordPress developer by day (LightSpeed, since 2003), an ADHD brain that never stops connecting dots, an Aquarian who questions everything, and a cyclist who has pedalled hundreds of kilometres to reach festivals with panniers full of paint.',
      'He\u2019s writing a book called \u201CThis one time on acid\u2026\u201D \u2014 part memoir, part manifesto, part fever dream. He hosts a podcast. He makes videos. And he built this entire website as a creative coding project, because apparently one art form was never going to be enough.',
    ],
  },

  media: {
    title: 'Watch. Listen. Follow.',
    subtitle: 'Content from the neon underground.',
    items: [
      {
        id: 'podcast',
        label: 'Podcast',
        tagline: 'Raw conversations from behind the UV curtain',
        href: '/podcasts',
        accent: 'red',
        icon: 'Headphones',
      },
      {
        id: 'videos',
        label: 'Videos',
        tagline: 'Tutorials, time-lapses, and festival footage',
        href: '/videos',
        accent: 'cyan',
        icon: 'Play',
      },
      {
        id: 'portfolio',
        label: 'Portfolio',
        tagline: 'The gallery of glowing faces',
        href: '/portfolio',
        accent: 'pink',
        icon: 'Image',
      },
      {
        id: 'blog',
        label: 'Blog',
        tagline: 'Insights from the dancefloor and the desk',
        href: '/blog',
        accent: 'orange',
        icon: 'BookOpen',
      },
    ],
  },

  subpages: [
    {
      id: 'journey',
      label: 'The journey',
      tagline: 'From corporate creative to neon artist \u2014 the philosophy behind the paint',
      href: '/about/journey',
      accent: 'pink',
      icon: 'Compass',
    },
    {
      id: 'bio',
      label: 'Bio',
      tagline: 'South African soul, Berlin address, festival heart',
      href: '/about/bio',
      accent: 'purple',
      icon: 'User',
    },
    {
      id: 'berlin',
      label: 'Berlin',
      tagline: 'Where the underground became his studio',
      href: '/about/berlin',
      accent: 'blue',
      icon: 'Buildings',
    },
    {
      id: 'process',
      label: 'Creative process',
      tagline: 'From blank canvas to blacklight masterpiece',
      href: '/about/process',
      accent: 'green',
      icon: 'PaintBrush',
    },
    {
      id: 'book',
      label: 'The book',
      tagline: 'This one time on acid\u2026 \u2014 the memoir in progress',
      href: '/book',
      accent: 'orange',
      icon: 'Book',
    },
    {
      id: 'lucy',
      label: 'Lucy in the sky',
      tagline: 'The psychedelic lens that changed everything',
      href: '/about/lucy-in-the-sky-with-diamonds',
      accent: 'cyan',
      icon: 'Sparkle',
    },
    {
      id: 'history',
      label: 'History',
      tagline: 'Every glow-up has an origin story',
      href: '/about/history',
      accent: 'yellow',
      icon: 'Clock',
    },
    {
      id: 'travels',
      label: 'Travels',
      tagline: 'Chasing sunsets and psytrance across continents',
      href: '/about/travels',
      accent: 'red',
      icon: 'Airplane',
    },
    {
      id: 'podcast-about',
      label: 'Podcast',
      tagline: 'Raw conversations from the neon underground',
      href: '/about/podcast',
      accent: 'pink',
      icon: 'Microphone',
    },
    {
      id: 'ebook',
      label: 'eBook preview',
      tagline: 'Read the first chapters before anyone else',
      href: '/draft-viewer',
      accent: 'purple',
      icon: 'BookOpen',
    },
    {
      id: 'adhd',
      label: 'ADHD \u2014 Wired different',
      tagline: 'Not a deficit \u2014 a surplus of attention',
      href: '/about/adhd',
      accent: 'yellow',
      icon: 'Lightning',
    },
    {
      id: 'cycling',
      label: 'Cycling',
      tagline: 'Two wheels, UV paint, and the open road',
      href: '/about/cycling',
      accent: 'green',
      icon: 'Bicycle',
    },
    {
      id: 'aquarius',
      label: 'Aquarius \u2014 The Aquarian blueprint',
      tagline: 'The cosmic wiring of a born questioner',
      href: '/about/aquarius',
      accent: 'cyan',
      icon: 'WaveSine',
    },
    {
      id: 'music',
      label: 'Music \u2014 140 BPM heartbeat',
      tagline: 'When the bass drops, the brushes rise',
      href: '/about/music',
      accent: 'blue',
      icon: 'MusicNotes',
    },
    {
      id: 'lightspeed',
      label: 'LightSpeed \u2014 The day job',
      tagline: 'WordPress by day, neon by night',
      href: '/about/lightspeed',
      accent: 'orange',
      icon: 'Code',
    },
    {
      id: 'education',
      label: 'Education \u2014 The unconventional classroom',
      tagline: 'Life taught more than any lecture hall',
      href: '/about/education',
      accent: 'yellow',
      icon: 'GraduationCap',
    },
    {
      id: 'partners',
      label: 'Partners \u2014 The people along the way',
      tagline: 'No artist creates alone',
      href: '/about/partners',
      accent: 'pink',
      icon: 'Heart',
    },
    {
      id: 'fitness',
      label: 'Fitness \u2014 The moving body',
      tagline: 'Movement is the first act of creation',
      href: '/about/fitness',
      accent: 'orange',
      icon: 'Heartbeat',
    },
    {
      id: 'manifesto',
      label: 'Manifesto',
      tagline: 'Neon vs Atomic Black \u2014 the philosophy',
      href: '/about/manifesto',
      accent: 'red',
      icon: 'BookOpenText',
    },
    {
      id: 'six-cats',
      label: 'Six Cats club',
      tagline: 'Craft cannabis, consciously cultivated in Cape Town',
      href: '/about/six-cats',
      accent: 'green',
      icon: 'Leaf',
    },
    {
      id: 'tribes',
      label: 'The tribes',
      tagline: 'The communities that shaped a neon soul',
      href: '/about/tribes',
      accent: 'purple',
      icon: 'UsersThree',
    },
    {
      id: 'resources',
      label: 'Resources \u2014 Getting started',
      tagline: 'Everything aspiring UV face painters need to know',
      href: '/about/resources',
      accent: 'green',
      icon: 'PaintBrush',
    },
  ],
};