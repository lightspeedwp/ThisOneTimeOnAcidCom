/**
 * @fileoverview Podcast episodes mock data
 * @module data/mock/podcasts/episodes
 */

import { Podcast } from '../../types/podcast';

export const podcastEpisodes: Podcast[] = [
  {
    id: 'pod-1',
    slug: 'welcome-to-neon-vs-atomic-black',
    title: 'Welcome to Neon vs Atomic Black',
    description: 'An introduction to the world of psytrance makeup artistry. Meet Ash Shaw and discover the creative philosophy behind painting faces on the dancefloor.',
    content: `# Welcome to Neon vs Atomic Black

In this debut episode, I open up about my journey from **Cape Town to Berlin** and beyond, painting faces at psytrance festivals around the world.

## What This Podcast Is About

This podcast is a space to explore the intersection of *art, music, and self-expression*. Each episode, I'll share stories from the dancefloor, tips for aspiring UV artists, and conversations with the creative community that makes the scene so vibrant.

### Topics We'll Cover

- The chemistry and application of UV-reactive paints
- Festival culture across continents
- Spontaneous art and improvisation
- Interviews with DJs, organisers, and fellow artists

## My Story

I started painting faces spontaneously on the dancefloor at a small psytrance gathering in South Africa. What began as a playful experiment with UV paints became a lifelong artistic practice. Now I travel between Cape Town, Berlin, and Thailand, following the festivals and the music.

> The dancefloor is my canvas. Every face is a collaboration between the music, the paint, and the person wearing it.

## What to Expect

Future episodes will cover everything from the chemistry of UV-reactive paints to the philosophy of spontaneous art, interviews with festival organisers, and behind-the-scenes stories from the global psytrance circuit.

1. Monthly episodes during off-season
2. Bonus drops around major festival weekends
3. Guest interviews with artists and organisers
4. Live recordings from the dancefloor

Thank you for listening. One love and peace out.
    `,
    audioUrl: 'https://example.com/podcasts/episode-1.mp3',
    duration: '18:42',
    episodeNumber: 1,
    seasonNumber: 1,
    category: 'Introduction',
    tags: ['Introduction', 'Psytrance', 'UV Makeup', 'Berlin'],
    publishedAt: '2026-02-10',
    featured: true,
    coverImage: {
      src: 'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=600',
      alt: 'Podcast studio microphone with neon lighting'
    },
    guests: [],
    faqs: [
      {
        id: 'pod-faq-1',
        question: 'How often will new episodes be released?',
        answer: 'I aim to release new episodes monthly, with bonus content around major festival seasons.'
      },
      {
        id: 'pod-faq-2',
        question: 'Can I suggest topics or be a guest?',
        answer: 'Absolutely! Reach out via the contact page. I love hearing from fellow artists and festival-goers.'
      }
    ]
  }
];

export const featuredPodcast = podcastEpisodes.find(ep => ep.featured) || podcastEpisodes[0];