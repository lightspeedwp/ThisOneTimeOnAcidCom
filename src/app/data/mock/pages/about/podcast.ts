/**
 * @fileoverview Podcast sub-page data. Extracted from about-subpages.ts (T17).
 */
import type { AboutSubpageData } from './types';

export interface PodcastEpisodePreview { id: string; number: number; title: string; description: string; }

export interface PodcastPageData extends AboutSubpageData {
  showName: string;
  tagline: string;
  format: string[];
  episodes: PodcastEpisodePreview[];
}

export var podcastPageData: PodcastPageData = {
  hero: {
    badge: 'Podcast',
    title: 'Neon vs Atomic Black',
    description: 'Ash\u2019s podcast exploring the intersection of psytrance art, UV makeup culture, festival life, ADHD creativity, and conversations with the creative community.',
  },
  breadcrumbs: [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Podcast' },
  ],
  showName: 'Neon vs Atomic Black',
  tagline: 'Stories, sounds & neon souls from the dancefloor to the studio',
  format: [
    'Long-form conversations with fellow festival artists, DJs, and creative misfits.',
    'Solo episodes where Ash unpacks a single topic \u2014 from ADHD hyperfocus to the physics of UV pigment.',
    'Field recordings and ambient soundscapes from psytrance dancefloors around the world.',
  ],
  sections: [
    { id: 'why-podcast', title: 'Why a podcast', paragraphs: [
      'Ash has always been a storyteller. On the dancefloor, through UV paint, in voice notes sent at 4am to friends across time zones. A podcast is the natural extension of that impulse \u2014 a space to share the stories that don\u2019t fit in a photo or a 60-second reel.',
      'The podcast is about depth. It\u2019s about sitting with a topic or a person for an hour and finding the truth underneath the surface. It\u2019s the antidote to the scroll.',
    ]},
    { id: 'what-to-expect', title: 'What to expect', paragraphs: [
      'Each episode explores one thread of the neon tapestry \u2014 a festival memory, a creative technique, a life lesson earned the hard way, or a conversation with someone whose work Ash admires.',
      'Expect honesty. Expect tangents (hello, ADHD). Expect the occasional soundscape from a Zambian bush party or a Berlin dancefloor at dawn. Expect the kind of conversation you\u2019d have around a campfire, not in a studio.',
    ]},
    { id: 'audience', title: 'Who it\u2019s for', paragraphs: [
      'Festival souls. Creative misfits. People who\u2019ve ever felt like the world was running on a different operating system. Anyone curious about the intersection of art, neurodivergence, altered states, and the human need to dance.',
      'If you\u2019ve ever painted your face before going out, worn a costume to a party for no reason, or cried on a dancefloor because the music hit different \u2014 this podcast is for you.',
    ]},
    { id: 'availability', title: 'Where to listen', paragraphs: [
      'The podcast is currently in development, with the first episodes planned for recording in Berlin. It will be available on all major platforms \u2014 Spotify, Apple Podcasts, YouTube, and wherever you find your audio.',
      'Follow Ash\u2019s social channels for launch announcements. The first season focuses on the people and places that shaped his neon journey \u2014 from Cape Town to Berlin, from the first Vortex to the latest Origin.',
    ]},
  ],
  episodes: [
    { id: 'ep-preview-1', number: 1, title: 'The dancefloor is the canvas', description: 'Why painting faces at festivals is not decoration \u2014 it\u2019s translation. The origin story of Neon vs Atomic Black.' },
    { id: 'ep-preview-2', number: 2, title: 'Wired different', description: 'ADHD, hyperfocus, and why the festival environment is the only place Ash\u2019s brain feels at home.' },
    { id: 'ep-preview-3', number: 3, title: '86 hours on a bus', description: 'The Zambia solar eclipse trip that changed everything. Three weeks in the bush, 3.5 minutes of totality, a lifetime of friends.' },
  ],
};
