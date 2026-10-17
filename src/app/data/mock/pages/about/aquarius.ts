/**
 * @fileoverview Aquarius sub-page data. Extracted from about-subpages.ts (T17).
 */
import type { AboutSubpageData } from './types';

export interface AquariusTrait { id: string; label: string; value: string; }
export interface AquariusThread { id: string; title: string; description: string; }

export interface AquariusPageData extends AboutSubpageData {
  pullQuote: string;
  traits: AquariusTrait[];
  threads: AquariusThread[];
}

export var aquariusPageData: AquariusPageData = {
  hero: {
    badge: 'Aquarius',
    title: 'The Aquarian blueprint',
    description: 'Not horoscope-page mysticism \u2014 pattern recognition about identity. How the Aquarian need to question everything, reject convention, and see connections others miss became the operating system for an entire life.',
  },
  breadcrumbs: [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Aquarius' },
  ],
  pullQuote: 'For years, this combination felt like a curse. Too weird for the normal world, too scattered for the creative one. Then Berlin, then Lucy, then the dancefloor \u2014 and suddenly the wiring wasn\u2019t a bug, it was the feature.',
  traits: [
    { id: 'sign', label: 'Sun sign', value: 'Aquarius' },
    { id: 'element', label: 'Element', value: 'Air' },
    { id: 'mode', label: 'Mode', value: 'Fixed' },
    { id: 'amplifier', label: 'Amplifier', value: 'ADHD' },
    { id: 'catalyst', label: 'Catalyst', value: 'Lucy in the Sky' },
    { id: 'city', label: 'Chosen city', value: 'Berlin' },
    { id: 'tribe', label: 'Tribe', value: 'Misfits & Questioners' },
    { id: 'output', label: 'Creative output', value: 'Neon UV Art' },
    { id: 'transport', label: 'Movement', value: 'Two wheels \u2014 always' },
    { id: 'book-thread', label: 'Book thread', value: 'Core identity axis' },
  ],
  threads: [
    { id: 'thread-adhd', title: 'Aquarius \u00D7 ADHD', description: 'The Aquarian need to question everything meets an ADHD brain that moves at 200\u202Fkm/h and makes connections across disciplines, cultures, and altered states. Separately, each one is challenging. Together, they\u2019re an engine that runs on novelty, pattern-recognition, and the absolute refusal to accept boredom.' },
    { id: 'thread-lucy', title: 'Aquarius \u00D7 Lucy', description: 'Expanded states of awareness didn\u2019t create the Aquarian curiosity \u2014 they amplified it. What was already a mind that questioned everything became a mind that could feel the answers, not just think them. Colour stopped being seen and started being felt.' },
    { id: 'thread-dancefloor', title: 'Aquarius \u00D7 the dancefloor', description: 'The psytrance dancefloor is the one place where Aquarian otherness isn\u2019t otherness at all. It\u2019s normal. The misfits are the majority, convention is irrelevant, and the music runs at the same frequency as the brain. Sacred space, not metaphorically \u2014 literally.' },
    { id: 'thread-art', title: 'Aquarius \u00D7 neon art', description: 'UV art is the Aquarian instinct made visible: take what nobody else is doing, do it ambidextrously on a moving dancefloor, and turn strangers into glowing avatars. No references, no planning, no convention. Pure spontaneous creation.' },
  ],
  sections: [
    { id: 'the-questioner', title: 'The questioner', paragraphs: [
      'Ash has always questioned everything. Not to be difficult \u2014 though plenty of teachers and authority figures experienced it that way \u2014 but because the standard explanations never felt complete. Why does school work this way? Why do we sit in rows? Why can\u2019t creativity be the point, rather than something you fit around the edges?',
      'This isn\u2019t stubbornness. It\u2019s an operating system. The Aquarian blueprint runs on a simple loop: observe, question, reject what doesn\u2019t make sense, build something better. It\u2019s the same loop whether the subject is school curricula, WordPress block themes, or how to paint a face on a moving dancefloor.',
      'Growing up in Paarl in the 1990s, this made him the weird kid. In Berlin\u2019s underground creative scene, it makes him exactly normal.',
    ]},
    { id: 'conventions-never-stuck', title: 'Why conventions never stuck', paragraphs: [
      'The conventional path says: pick a career, build stability, fit hobbies around the edges. Ash\u2019s path says: identify what makes you come alive, then engineer your entire existence around those things.',
      'This isn\u2019t irresponsibility — it\u2019s radical prioritisation. LightSpeed has run profitably for 23 years with a remote-first team. The business works BECAUSE of the lifestyle, not despite it. A founder who cycles 300 km to a psytrance festival with a 40 kg bike pack is not someone who lacks discipline — he channels it differently.',
      'Conventional career paths, conventional cities, conventional relationships, conventional art forms \u2014 none of them stuck because none of them matched the wiring. The wiring needed Berlin, needed the dancefloor, needed UV paint, needed the bicycle. The wiring needed freedom.',
    ]},
    { id: 'seeing-patterns', title: 'Seeing patterns others miss', paragraphs: [
      'Aquarian minds make connections that aren\u2019t obvious. The link between bass frequencies and brush strokes. The way a GitHub workflow mirrors a festival production schedule. How cycling meditation generates the same creative clarity as a sunrise set at a forest party.',
      'Amplified by ADHD, this pattern-recognition runs constantly. It\u2019s why the art doesn\u2019t come from Pinterest boards or reference images \u2014 it emerges from the intersection of music, movement, and a mind that refuses to think in straight lines.',
      'Amplified by expanded awareness, the patterns extend beyond the intellectual. Colour became something felt, not just seen. The way neon paint bleeds under UV light, the way colours breathe and pulse on a dancefloor \u2014 these are things noticed because perception had been permanently upgraded.',
    ]},
    { id: 'amplification-effect', title: 'The amplification effect', paragraphs: [
      'Aquarius alone is the questioner. Add ADHD and you get a questioner who moves at 200\u202Fkm/h and can\u2019t stop making connections. Add expanded awareness and you get someone who not only sees patterns across disciplines but feels them in colour.',
      'These three threads \u2014 Aquarius, ADHD, and Lucy \u2014 are inseparable. They form the core of the book, the core of the art, and the core of the identity. Each one alone would have produced a different person. Together, they produced an artist, a nomad, and a life lived in full colour.',
      'The book maps that transformation honestly and without apology. It\u2019s the story of how the wiring that felt like a curse turned out to be the feature. How the dancefloor became the classroom. How the bicycle became the meditation. How the neon paint became the voice.',
    ]},
    { id: 'tribe-of-misfits', title: 'The tribe of misfits', paragraphs: [
      'Berlin attracts misfits, dreamers, and artists from everywhere. Ash found his tribe here \u2014 DJs, visual artists, fire dancers, sound engineers, and fellow festival freaks who understand that creativity isn\u2019t a career; it\u2019s a way of being.',
      'The community he\u2019s built isn\u2019t just friends at parties. It\u2019s a support network of neurodivergent creatives who look out for each other, share studio space, and collaborate on wild ideas that would make no sense anywhere else. This is the Aquarian tribe \u2014 people whose brains run on the same frequency.',
      'The dancefloor selects for these people naturally. Show up enough times, stay present enough, be weird enough, and the tribe finds you. It\u2019s not gatekept \u2014 it\u2019s an open door for anyone who arrives with energy and sincerity.',
    ]},
  ],
};