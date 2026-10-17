/**
 * Journal Posts Data
 * Simplified blog post data for the journal page
 */

export interface JournalPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  featuredImage: string;
  publishedAt: string;
}

export var journalPosts: JournalPost[] = [
  {
    id: 'dancefloor-belonging',
    slug: 'dancefloor-belonging',
    title: 'What the dancefloor taught me about belonging',
    excerpt: 'A reflection on subculture, chosen family, and finding a place to fit in.',
    category: 'Essay',
    featuredImage: 'https://images.unsplash.com/photo-1666682115302-a767a7b585f8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYW5jZWZsb29yJTIwdGVjaG5vJTIwcGFydHklMjBuZW9uJTIwbGlnaHRzfGVufDF8fHx8MTc3NDAxNDMxMXww&ixlib=rb-4.1.0&q=80&w=1080',
    publishedAt: '2026-03-15'
  },
  {
    id: 'uv-paint-visible',
    slug: 'uv-paint-visible',
    title: 'UV paint and becoming visible',
    excerpt: 'A short visual exploration of costume, identity, and standing out on purpose.',
    category: 'Video',
    featuredImage: 'https://images.unsplash.com/photo-1771167213926-609f93fa2102?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxVViUyMHBhaW50JTIwZmVzdGl2YWwlMjBhcnQlMjBnbG93fGVufDF8fHx8MTc3NDAxNDMxMnww&ixlib=rb-4.1.0&q=80&w=1080',
    publishedAt: '2026-03-12'
  },
  {
    id: 'living-full-colour',
    slug: 'living-full-colour',
    title: 'Notes on living in full colour',
    excerpt: 'A conversation with Ash Shaw about creativity, freedom, and weirdness.',
    category: 'Podcast',
    featuredImage: 'https://images.unsplash.com/photo-1709846485906-30b28e7ed651?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb2RjYXN0JTIwbWljcm9waG9uZSUyMHN0dWRpbyUyMHNldHVwfGVufDF8fHx8MTc3NDAxNDMxMnww&ixlib=rb-4.1.0&q=80&w=1080',
    publishedAt: '2026-03-10'
  },
  {
    id: 'berlin-bicycles',
    slug: 'berlin-bicycles',
    title: 'Berlin, bicycles, and becoming visible',
    excerpt: 'Dispatches from a summer of movement, techno, and rediscovering the physical self.',
    category: 'Travel',
    featuredImage: 'https://images.unsplash.com/photo-1628603998251-97ed09883d64?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxCZXJsaW4lMjBiaWN5Y2xlJTIwdXJiYW4lMjBjeWNsaW5nfGVufDF8fHx8MTc3NDAxNDMxMnww&ixlib=rb-4.1.0&q=80&w=1080',
    publishedAt: '2026-03-08'
  },
  {
    id: 'rough-draft-notes',
    slug: 'rough-draft-notes',
    title: 'Notes from the rough draft',
    excerpt: 'Behind the scenes of writing the manuscript. What\'s changing, what\'s staying.',
    category: 'Field Notes',
    featuredImage: 'https://images.unsplash.com/photo-1756993263826-9b4bae15e2b2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxub3RlYm9vayUyMHdyaXRpbmclMjBtYW51c2NyaXB0JTIwZGVza3xlbnwxfHx8fDE3NzQwMTQzMTN8MA&ixlib=rb-4.1.0&q=80&w=1080',
    publishedAt: '2026-03-05'
  },
  {
    id: 'standing-out-skill',
    slug: 'standing-out-skill',
    title: 'Why standing out is a skill',
    excerpt: 'How to turn difference into direction. The visual language of the neon soul.',
    category: 'Essay',
    featuredImage: 'https://images.unsplash.com/photo-1663023943477-30ad974c6ed7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2xvcmZ1bCUyMG5lb24lMjBzb3VsJTIwZXhwcmVzc2lvbiUyMGFydHxlbnwxfHx8fDE3NzQwMTQzMTN8MA&ixlib=rb-4.1.0&q=80&w=1080',
    publishedAt: '2026-03-01'
  }
];
