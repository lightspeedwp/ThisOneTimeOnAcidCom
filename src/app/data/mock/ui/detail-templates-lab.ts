/**
 * @fileoverview Detail Templates Lab — hub + 6 content-type detail template browsers
 * Used by DetailTemplatesHubPage and content-type sub-pages
 *
 * @module data/mock/ui/detail-templates-lab
 * @version 3.0.0 — Added unique gallery images + hover zoom transitions
 */

export interface DetailTemplateContentType {
  id: string;
  contentType: string;
  label: string;
  neonColor: string;
  neonHex: string;
  icon: string;
  templateCount: number;
  href: string;
  description: string;
  liveHref: string;
}

export interface DetailTemplateConcept {
  id: string;
  name: string;
  description: string;
  bemModifier: string;
}

export var detailTemplateContentTypes: DetailTemplateContentType[] = [
  {
    id: 'blog',
    contentType: 'blog',
    label: 'Blog detail templates',
    neonColor: 'neon-pink',
    neonHex: '#FF10F0',
    icon: 'Newspaper',
    templateCount: 3,
    href: '/dev-tools/blog-detail-templates',
    description: 'Three layout concepts for blog post detail pages \u2014 from the current reading-optimised layout to immersive lightbox and gallery-style exhibition views.',
    liveHref: '/blog',
  },
  {
    id: 'portfolio',
    contentType: 'portfolio',
    label: 'Portfolio detail templates',
    neonColor: 'neon-green',
    neonHex: '#39FF14',
    icon: 'Image',
    templateCount: 3,
    href: '/dev-tools/portfolio-detail-templates',
    description: 'Three layout concepts for portfolio entry detail pages \u2014 image-first designs with gallery views, lightbox experiences, and white-space exhibition layouts.',
    liveHref: '/portfolio',
  },
  {
    id: 'video',
    contentType: 'video',
    label: 'Video detail templates',
    neonColor: 'neon-blue',
    neonHex: '#1F51FF',
    icon: 'Play',
    templateCount: 3,
    href: '/dev-tools/video-detail-templates',
    description: 'Three layout concepts for video detail pages \u2014 cinematic player-first views, full-screen lightbox, and gallery-exhibition walkthrough.',
    liveHref: '/videos',
  },
  {
    id: 'podcast',
    contentType: 'podcast',
    label: 'Podcast detail templates',
    neonColor: 'neon-purple',
    neonHex: '#BE00FE',
    icon: 'Microphone',
    templateCount: 3,
    href: '/dev-tools/podcast-detail-templates',
    description: 'Three layout concepts for podcast episode detail pages \u2014 audio-centric layouts with waveform visualisations, immersive listening views, and minimal art-poster layouts.',
    liveHref: '/podcasts',
  },
  {
    id: 'event',
    contentType: 'event',
    label: 'Event detail templates',
    neonColor: 'neon-orange',
    neonHex: '#FF5F1F',
    icon: 'Calendar',
    templateCount: 3,
    href: '/dev-tools/event-detail-templates',
    description: 'Three layout concepts for event detail pages \u2014 information-dense festival pages, full-bleed hero lightbox, and curated gallery-exhibition style.',
    liveHref: '/events',
  },
  {
    id: 'ebook',
    contentType: 'ebook',
    label: 'Ebook detail templates',
    neonColor: 'neon-yellow',
    neonHex: '#FFFF00',
    icon: 'BookOpen',
    templateCount: 3,
    href: '/dev-tools/ebook-detail-templates',
    description: 'Three layout concepts for ebook chapter pages \u2014 comfortable reading view, immersive full-screen mode, and art-book exhibition layout.',
    liveHref: '/ebook',
  },
];

export var detailTemplateConcepts: DetailTemplateConcept[] = [
  {
    id: 'current',
    name: 'Current layout',
    description: 'The existing production layout \u2014 link to the live page for reference. Rendered as a wireframe thumbnail with component labels.',
    bemModifier: 'current',
  },
  {
    id: 'lightbox',
    name: 'Full-screen lightbox',
    description: 'Full-viewport hero image with floating metadata overlay. Scroll down to reveal content body below the fold. Gallery uses full-screen lightbox navigation.',
    bemModifier: 'lightbox',
  },
  {
    id: 'exhibition',
    name: 'Art exhibition',
    description: 'Generous whitespace, centred imagery, and minimal chrome. Content in a narrow reading column. Gallery as a horizontal scroll strip below \u2014 an art walkthrough.',
    bemModifier: 'exhibition',
  },
];

/** Placeholder content for each content type detail template */
export var detailTemplateSamples = {
  blog: {
    title: 'The dancefloor gave me everything',
    category: 'Reflections',
    date: 'January 15, 2026',
    author: 'Ash Shaw',
    readTime: 8,
    excerpt: 'How twenty-three years of psytrance festivals, Berlin club nights, and outdoor gatherings shaped my identity as an artist and as a person.',
    body: 'There\u2019s a particular quality of light at 4am on a dancefloor. Not the strobes \u2014 they come and go in predictable bursts. I mean the way the haze catches the UV and creates this floating purple membrane above the crowd. That\u2019s where I found myself. That\u2019s where the art started.\n\nI was nineteen the first time I painted someone\u2019s face at a psytrance party in the bushveld outside Johannesburg. No formal training, no Instagram following, no plan. Just a handful of UV paints I\u2019d found at a craft shop in Braamfontein and the conviction that faces were canvases.\n\nThe dancefloor taught me about impermanence. Every piece I paint will be sweated off by sunrise. There\u2019s a Buddhist koan in there somewhere \u2014 art that exists to be destroyed by joy.',
    tags: ['psytrance', 'identity', 'festival culture', 'UV art'],
    imageAlt: 'Dancefloor at a psytrance festival with UV lighting and painted faces',
    image: 'https://images.unsplash.com/photo-1579483885340-a35d54dfc318?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxVViUyMGZhY2UlMjBwYWludCUyMG5lb24lMjBnbG93fGVufDF8fHx8MTc3MjgxNDE0N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    galleryImages: [
      'https://images.unsplash.com/photo-1539035992980-e41ff3f540ed?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxVViUyMGZhY2UlMjBwYWludCUyMGZlc3RpdmFsJTIwbmVvbiUyMGdsb3clMjBwb3J0cmFpdHxlbnwxfHx8fDE3NzI4NjQzMDh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      'https://images.unsplash.com/photo-1766389088588-21e13679ffa3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmbHVvcmVzY2VudCUyMGJvZHklMjBwYWludCUyMGJsYWNrbGlnaHQlMjByYXZlfGVufDF8fHx8MTc3Mjg2NDMwOXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      'https://images.unsplash.com/photo-1602695728966-a3b1c9361b17?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuZW9uJTIwbWFrZXVwJTIwZmVzdGl2YWwlMjBjbG9zZXVwJTIwZmFjZXxlbnwxfHx8fDE3NzI4NjQzMDl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      'https://images.unsplash.com/photo-1643682598756-6583769f2ded?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxVViUyMHJlYWN0aXZlJTIwcGFpbnQlMjBoYW5kcyUyMGFydGlzdGljfGVufDF8fHx8MTc3Mjg2NDMxMHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      'https://images.unsplash.com/photo-1674168531886-fa9806e241cf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwc3ljaGVkZWxpYyUyMGZhY2UlMjBwYWludCUyMGdlb21ldHJpYyUyMHBhdHRlcm5zfGVufDF8fHx8MTc3Mjg2NDMxMHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    ],
    mockSchema: {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: 'The dancefloor gave me everything',
      datePublished: '2026-01-15T00:00:00+02:00',
      author: {
        '@type': 'Person',
        name: 'Ash Shaw',
      },
      image: 'https://images.unsplash.com/photo-1579483885340-a35d54dfc318?crop=entropy&cs=tinysrgb&fit=max&fm=jpg',
    },
  },
  portfolio: {
    title: 'Sacred geometry collection: Origin 2026',
    category: 'UV makeup',
    date: 'February 8, 2026',
    excerpt: 'A series of twelve sacred geometry face designs created live at Origin Festival in Cape Town. Each piece explores the intersection of ancient mathematical patterns and reactive pigments.',
    body: 'The sacred geometry collection began as an experiment with compass and ruler techniques adapted for skin. Using a flexible curve ruler pressed lightly against the face, I mapped out the foundational shapes \u2014 vesica piscis on the forehead, flower of life across the cheeks, metatron\u2019s cube along the jawline.\n\nEach piece took between forty-five minutes and two hours, depending on the complexity and the willingness of the participant to sit still while bass rumbled through the floor beneath us.',
    tags: ['sacred geometry', 'UV makeup', 'Origin Festival', 'Cape Town'],
    imageAlt: 'Sacred geometry face painting collection under UV blacklight',
    image: 'https://images.unsplash.com/photo-1587411598179-224f52407507?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmbHVvcmVzY2VudCUyMGZhY2UlMjBwYWludCUyMGZlc3RpdmFsfGVufDF8fHx8MTc3MjgxNDE0OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    galleryCount: 12,
    galleryImages: [
      'https://images.unsplash.com/photo-1725288342265-1b83d958e584?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnbG93JTIwcGFpbnQlMjBkYXJrJTIwc3R1ZGlvJTIwYXJ0aXN0aWMlMjBwb3J0cmFpdHxlbnwxfHx8fDE3NzI4NjQzMTB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      'https://images.unsplash.com/photo-1663436835928-65d17f834fb5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmbHVvcmVzY2VudCUyMG1ha2V1cCUyMHRyaWJhbCUyMHBhdHRlcm5zJTIwbmVvbnxlbnwxfHx8fDE3NzI4NjQzMTF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      'https://images.unsplash.com/photo-1759236674261-54ee335a96b4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxVViUyMGJvZHklMjBhcnQlMjBhYnN0cmFjdCUyMHBhdHRlcm5zJTIwYmxhY2tsaWdodHxlbnwxfHx8fDE3NzI4NjQzMTF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      'https://images.unsplash.com/photo-1539035992980-e41ff3f540ed?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuZW9uJTIwcGFpbnQlMjBmYWNlJTIwY2xvc2V1cCUyMGZlc3RpdmFsJTIwYXJ0fGVufDF8fHx8MTc3Mjg2NDMxMnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      'https://images.unsplash.com/photo-1588503291572-6b60107fe000?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmbHVvcmVzY2VudCUyMGZhY2UlMjBwYWludCUyMHRlY2hobyUyMHBhcnR5JTIwZ2xvd3xlbnwxfHx8fDE3NzI4NjQzMTJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      'https://images.unsplash.com/photo-1601742162870-46790bce3120?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxVViUyMG1ha2V1cCUyMHNhY3JlZCUyMGdlb21ldHJ5JTIwbmVvbiUyMGFydHxlbnwxfHx8fDE3NzI4NjQzMTN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    ],
    mockSchema: {
      '@context': 'https://schema.org',
      '@type': 'VisualArtwork',
      name: 'Sacred geometry collection: Origin 2026',
      artMedium: 'UV makeup',
      dateCreated: '2026-02-08',
      creator: {
        '@type': 'Person',
        name: 'Ash Shaw',
      },
      image: 'https://images.unsplash.com/photo-1587411598179-224f52407507?crop=entropy&cs=tinysrgb&fit=max&fm=jpg',
    },
  },
  video: {
    title: 'Live painting at Vortex: full session',
    category: 'Tutorial',
    date: 'March 22, 2025',
    duration: '24:36',
    excerpt: 'Uncut footage of a full face painting session at Vortex open-air festival. From blank canvas to finished UV reactive design in real time.',
    body: 'This session captures the complete process from primer application through to the final UV reveal. The participant requested a mandala design incorporating elements of nature \u2014 leaves, water droplets, and fractal fern patterns.\n\nI used a combination of Kryolan UV Day Glow and custom-mixed phosphorescent pigments for the layered glow effect visible in the final reveal segment.',
    tags: ['tutorial', 'live painting', 'Vortex', 'process'],
    imageAlt: 'Video thumbnail showing live painting process at outdoor festival',
    image: 'https://images.unsplash.com/photo-1558613502-3d41e521aa08?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxVViUyMGJvZHklMjBwYWludCUyMHJhdmUlMjBwYXJ0eXxlbnwxfHx8fDE3NzI4MTQxNTB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    galleryImages: [
      'https://images.unsplash.com/photo-1539035992980-e41ff3f540ed?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxVViUyMGZhY2UlMjBwYWludCUyMGZlc3RpdmFsJTIwbmVvbiUyMGdsb3clMjBwb3J0cmFpdHxlbnwxfHx8fDE3NzI4NjQzMDh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      'https://images.unsplash.com/photo-1766389088588-21e13679ffa3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmbHVvcmVzY2VudCUyMGJvZHklMjBwYWludCUyMGJsYWNrbGlnaHQlMjByYXZlfGVufDF8fHx8MTc3Mjg2NDMwOXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      'https://images.unsplash.com/photo-1602695728966-a3b1c9361b17?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuZW9uJTIwbWFrZXVwJTIwZmVzdGl2YWwlMjBjbG9zZXVwJTIwZmFjZXxlbnwxfHx8fDE3NzI4NjQzMDl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      'https://images.unsplash.com/photo-1643682598756-6583769f2ded?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxVViUyMHJlYWN0aXZlJTIwcGFpbnQlMjBoYW5kcyUyMGFydGlzdGljfGVufDF8fHx8MTc3Mjg2NDMxMHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      'https://images.unsplash.com/photo-1674168531886-fa9806e241cf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwc3ljaGVkZWxpYyUyMGZhY2UlMjBwYWludCUyMGdlb21ldHJpYyUyMHBhdHRlcm5zfGVufDF8fHx8MTc3Mjg2NDMxMHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    ],
    mockSchema: {
      '@context': 'https://schema.org',
      '@type': 'VideoObject',
      name: 'Live painting at Vortex: full session',
      description: 'Uncut footage of a full face painting session at Vortex open-air festival. From blank canvas to finished UV reactive design in real time.',
      uploadDate: '2025-03-22',
      duration: 'PT24M36S',
      thumbnailUrl: 'https://images.unsplash.com/photo-1558613502-3d41e521aa08?crop=entropy&cs=tinysrgb&fit=max&fm=jpg',
    },
  },
  podcast: {
    title: 'Twenty-three years on the dancefloor',
    category: 'Season 1',
    date: 'November 3, 2025',
    duration: '47:22',
    episodeNumber: 1,
    season: 1,
    excerpt: 'The pilot episode \u2014 looking back at how two decades of psytrance culture shaped my art, my identity, and my restless need to keep moving.',
    body: 'In this first episode, I talk about the moment I realised that painting faces at parties could be more than a weekend hobby. I trace the thread from those early Johannesburg bush parties through to the Berlin clubs, the Thai beaches, and back to Cape Town.\n\nI also talk about ADHD, about why the hyperfocus state that comes from painting a face while 140 BPM bass shakes the floor is the closest thing I\u2019ve found to meditation.',
    tags: ['pilot', 'identity', 'psytrance', 'ADHD'],
    imageAlt: 'Podcast cover art with abstract neon waveform',
    image: 'https://images.unsplash.com/photo-1764563896063-6c299849034a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuZW9uJTIwcGFpbnQlMjBzcGxhdHRlciUyMGFydHxlbnwxfHx8fDE3NzI4MTQxNTN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    galleryImages: [
      'https://images.unsplash.com/photo-1725288342265-1b83d958e584?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnbG93JTIwcGFpbnQlMjBkYXJrJTIwc3R1ZGlvJTIwYXJ0aXN0aWMlMjBwb3J0cmFpdHxlbnwxfHx8fDE3NzI4NjQzMTB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      'https://images.unsplash.com/photo-1663436835928-65d17f834fb5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmbHVvcmVzY2VudCUyMG1ha2V1cCUyMHRyaWJhbCUyMHBhdHRlcm5zJTIwbmVvbnxlbnwxfHx8fDE3NzI4NjQzMTF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      'https://images.unsplash.com/photo-1759236674261-54ee335a96b4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxVViUyMGJvZHklMjBhcnQlMjBhYnN0cmFjdCUyMHBhdHRlcm5zJTIwYmxhY2tsaWdodHxlbnwxfHx8fDE3NzI4NjQzMTF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      'https://images.unsplash.com/photo-1539035992980-e41ff3f540ed?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuZW9uJTIwcGFpbnQlMjBmYWNlJTIwY2xvc2V1cCUyMGZlc3RpdmFsJTIwYXJ0fGVufDF8fHx8MTc3Mjg2NDMxMnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      'https://images.unsplash.com/photo-1588503291572-6b60107fe000?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmbHVvcmVzY2VudCUyMGZhY2UlMjBwYWludCUyMHRlY2hobyUyMHBhcnR5JTIwZ2xvd3xlbnwxfHx8fDE3NzI4NjQzMTJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      'https://images.unsplash.com/photo-1601742162870-46790bce3120?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxVViUyMG1ha2V1cCUyMHNhY3JlZCUyMGdlb21ldHJ5JTIwbmVvbiUyMGFydHxlbnwxfHx8fDE3NzI4NjQzMTN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    ],
    mockSchema: {
      '@context': 'https://schema.org',
      '@type': 'PodcastEpisode',
      name: 'Twenty-three years on the dancefloor',
      description: 'The pilot episode \u2014 looking back at how two decades of psytrance culture shaped my art, my identity, and my restless need to keep moving.',
      datePublished: '2025-11-03',
      episodeNumber: '1',
      partOfSeries: {
        '@type': 'PodcastSeries',
        name: 'Ash Shaw Podcast',
      },
    },
  },
  event: {
    title: 'Origin Festival 2026',
    category: 'Festival',
    date: 'February 7\u20139, 2026',
    location: 'Cape Town, South Africa',
    excerpt: 'Three days of live UV face painting at Origin Festival \u2014 South Africa\u2019s premier outdoor psytrance gathering in the mountains outside Cape Town.',
    body: 'Origin Festival returns to its spiritual home in the Riviersonderend mountains. I\u2019ll be running the UV body art station near the main stage from Friday afternoon through Sunday sunrise.\n\nThis year I\u2019m focusing on the sacred geometry collection \u2014 twelve designs prepared in advance, each adapted on the spot to fit the unique face shape and energy of the participant.',
    tags: ['Origin', 'Cape Town', 'psytrance', 'live painting'],
    imageAlt: 'Aerial view of Origin Festival in the mountains near Cape Town',
    image: 'https://images.unsplash.com/photo-1759236674261-54ee335a96b4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxVViUyMGdsb3clMjBwYWludCUyMGhhbmRzJTIwYXJ0fGVufDF8fHx8MTc3MjgxNDE1MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    galleryImages: [
      'https://images.unsplash.com/photo-1539035992980-e41ff3f540ed?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxVViUyMGZhY2UlMjBwYWludCUyMGZlc3RpdmFsJTIwbmVvbiUyMGdsb3clMjBwb3J0cmFpdHxlbnwxfHx8fDE3NzI4NjQzMDh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      'https://images.unsplash.com/photo-1766389088588-21e13679ffa3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmbHVvcmVzY2VudCUyMGJvZHklMjBwYWludCUyMGJsYWNrbGlnaHQlMjByYXZlfGVufDF8fHx8MTc3Mjg2NDMwOXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      'https://images.unsplash.com/photo-1602695728966-a3b1c9361b17?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuZW9uJTIwbWFrZXVwJTIwZmVzdGl2YWwlMjBjbG9zZXVwJTIwZmFjZXxlbnwxfHx8fDE3NzI4NjQzMDl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      'https://images.unsplash.com/photo-1643682598756-6583769f2ded?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxVViUyMHJlYWN0aXZlJTIwcGFpbnQlMjBoYW5kcyUyMGFydGlzdGljfGVufDF8fHx8MTc3Mjg2NDMxMHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      'https://images.unsplash.com/photo-1674168531886-fa9806e241cf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwc3ljaGVkZWxpYyUyMGZhY2UlMjBwYWludCUyMGdlb21ldHJpYyUyMHBhdHRlcm5zfGVufDF8fHx8MTc3Mjg2NDMxMHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    ],
    mockSchema: {
      '@context': 'https://schema.org',
      '@type': 'Event',
      name: 'Origin Festival 2026',
      startDate: '2026-02-07T14:00:00+02:00',
      endDate: '2026-02-09T18:00:00+02:00',
      location: {
        '@type': 'Place',
        name: 'Riviersonderend Mountains',
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Cape Town',
          addressCountry: 'ZA',
        },
      },
      image: 'https://images.unsplash.com/photo-1759236674261-54ee335a96b4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg',
    },
  },
  ebook: {
    title: 'Chapter one: the bushveld party',
    category: 'This one time',
    date: '2026',
    excerpt: 'The first chapter of the memoir \u2014 a nineteen-year-old kid with a box of UV paints and zero plan walks into a psytrance party in the South African bushveld.',
    body: 'The stars in the bushveld are different from city stars. They\u2019re close and bright and they move \u2014 or you think they move, which amounts to the same thing when you\u2019re nineteen and the bass is making the ground vibrate under your bare feet.\n\nI\u2019d bought the paints on a whim from a craft supply shop in Braamfontein. Six small pots of UV reactive body paint, a pack of cheap brushes, and a conviction that something interesting would happen if I brought them to the party.\n\nSomething interesting happened.',
    tags: ['memoir', 'origin story', 'bushveld', 'South Africa'],
    imageAlt: 'Stars over the South African bushveld at night',
    image: 'https://images.unsplash.com/photo-1763280763684-9f4a02e5a18e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxib2R5JTIwcGFpbnQlMjBhcnQlMjBkYXJrJTIwc3R1ZGlvfGVufDF8fHx8MTc3MjgxNDE1Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    galleryImages: [
      'https://images.unsplash.com/photo-1725288342265-1b83d958e584?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnbG93JTIwcGFpbnQlMjBkYXJrJTIwc3R1ZGlvJTIwYXJ0aXN0aWMlMjBwb3J0cmFpdHxlbnwxfHx8fDE3NzI4NjQzMTB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      'https://images.unsplash.com/photo-1663436835928-65d17f834fb5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmbHVvcmVzY2VudCUyMG1ha2V1cCUyMHRyaWJhbCUyMHBhdHRlcm5zJTIwbmVvbnxlbnwxfHx8fDE3NzI4NjQzMTF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      'https://images.unsplash.com/photo-1759236674261-54ee335a96b4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxVViUyMGJvZHklMjBhcnQlMjBhYnN0cmFjdCUyMHBhdHRlcm5zJTIwYmxhY2tsaWdodHxlbnwxfHx8fDE3NzI4NjQzMTF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      'https://images.unsplash.com/photo-1539035992980-e41ff3f540ed?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuZW9uJTIwcGFpbnQlMjBmYWNlJTIwY2xvc2V1cCUyMGZlc3RpdmFsJTIwYXJ0fGVufDF8fHx8MTc3Mjg2NDMxMnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      'https://images.unsplash.com/photo-1588503291572-6b60107fe000?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmbHVvcmVzY2VudCUyMGZhY2UlMjBwYWludCUyMHRlY2hobyUyMHBhcnR5JTIwZ2xvd3xlbnwxfHx8fDE3NzI4NjQzMTJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      'https://images.unsplash.com/photo-1601742162870-46790bce3120?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxVViUyMG1ha2V1cCUyMHNhY3JlZCUyMGdlb21ldHJ5JTIwbmVvbiUyMGFydHxlbnwxfHx8fDE3NzI4NjQzMTN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    ],
    mockSchema: {
      '@context': 'https://schema.org',
      '@type': 'Book',
      name: 'Chapter one: the bushveld party',
      author: {
        '@type': 'Person',
        name: 'Ash Shaw',
      },
      datePublished: '2026',
      genre: 'Memoir',
    },
  },
};

export var detailTemplatesHubUI = {
  hero: {
    badge: 'Lab',
    title: 'Detail page templates',
    description: 'Three layout concepts for each of six content types. Compare the current production layout with immersive lightbox and minimalist art exhibition alternatives.',
  },
};