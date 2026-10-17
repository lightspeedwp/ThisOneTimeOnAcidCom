/**
 * @fileoverview ADHD sub-page data. Extracted from about-subpages.ts (T17).
 */
import type { AboutSubpageData } from './types';

export interface AdhdFact { id: string; label: string; value: string; }

export interface AdhdPageData extends AboutSubpageData {
  quickFacts: AdhdFact[];
  pullQuote: string;
}

export var adhdPageData: AdhdPageData = {
  hero: {
    badge: 'ADHD',
    title: 'Wired different',
    description: 'ADHD isn\u2019t a deficit of attention. It\u2019s a surplus of it, all going in directions the world wasn\u2019t designed to handle. This is Ash\u2019s experience \u2014 honest, personal, and completely unapologetic.',
  },
  breadcrumbs: [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'ADHD' },
  ],
  pullQuote: 'It took me twenty years to understand that this wasn\u2019t broken. It was a feature, not a bug. I just needed to find the right operating system.',
  quickFacts: [
    { id: 'neurotype', label: 'Neurotype', value: 'ADHD' },
    { id: 'diagnosed', label: 'Awareness', value: 'Late discovery' },
    { id: 'superpower', label: 'Superpower', value: 'Hyperfocus' },
    { id: 'kryptonite', label: 'Kryptonite', value: 'Boredom' },
    { id: 'operating-system', label: 'Operating system', value: 'Festival dancefloor' },
    { id: 'creative-output', label: 'Creative output', value: 'UV face painting' },
    { id: 'movement', label: 'Movement Rx', value: 'Cycling \u2014 daily' },
    { id: 'integration', label: 'Integration', value: 'Journaling, cycling, creating' },
    { id: 'management', label: 'Work style', value: 'Systems + freedom' },
    { id: 'sign', label: 'Amplifier', value: 'Aquarius' },
  ],
  sections: [
    { id: 'growing-up', title: 'Growing up undiagnosed', paragraphs: [
      'Ash grew up in Paarl, a small town in the Western Cape of South Africa, in the 1990s. ADHD wasn\u2019t something people talked about \u2014 it was just being "difficult," being "unfocused," being the kid who couldn\u2019t sit still and couldn\u2019t explain why.',
      'School was a battlefield of boredom. He could spend six hours building a perfect model of something nobody asked for, but he couldn\u2019t sit through forty minutes of mathematics. His brain didn\u2019t reject information \u2014 it rejected boredom. Feed it something interesting and it would devour it with a focus so intense it scared his teachers.',
      'While the classroom was a struggle, the sports field was where Ash thrived. Racing bicycles since 1994, representing Western Province in cross-country mountain biking by 1995, winning provincial colours by 1997. His brain didn\u2019t need discipline \u2014 it needed the right challenge.',
    ]},
    { id: 'surplus', title: 'The surplus of attention', paragraphs: [
      'The biggest lie about ADHD is in the name. It\u2019s not a deficit of attention \u2014 it\u2019s a surplus of it, all going in directions that conventional environments weren\u2019t designed to handle. Too much input, too many connections, too fast for a system built on sitting quietly and following instructions.',
      'For years, this combination felt like a curse. Too weird for the normal world, too scattered for the creative one. The Aquarian need to question everything, to reject the conventional, to see patterns others miss \u2014 amplified by an ADHD brain that moves at 200km/h and makes connections across disciplines, cultures, and altered states.',
      'Then the festivals happened. December 1999, Vortex, the Western Cape bush \u2014 and for the first time, the world\u2019s operating system matched his brain\u2019s. The sensory richness, the freedom from convention, the community of fellow misfits. The dancefloor didn\u2019t need him to sit still. It needed exactly what ADHD provides: energy, spontaneity, and the ability to process a hundred inputs simultaneously.',
    ]},
    { id: 'hyperfocus', title: 'The hyperfocus superpower', paragraphs: [
      'When the environment matches the brain, ADHD\u2019s hyperfocus becomes a superpower. Once Ash starts painting a face, the world narrows to just the pigment, the skin, the music, and the design emerging. Hours feel like minutes. Complexity becomes clarity. This is ADHD at its best: total immersion in a task that genuinely matters.',
      'The ambidextrous painting technique is pure ADHD adaptation. Painting with both hands simultaneously in a crowded, noisy, dark festival environment is exactly the kind of multi-input processing that ADHD brains thrive on. It\u2019s not a party trick \u2014 it\u2019s a brain that evolved to work in chaos.',
      'The same hyperfocus shows up in business. LightSpeed\u2019s meticulously detailed workflows, the internship curriculum Ash spent six weeks building, the GitHub contributing guidelines, the daily planning templates \u2014 all built during hyperfocus sessions. ADHD brains need structure to function, so they build the best structures.',
    ]},
    { id: 'operating-system', title: 'Finding the right operating system', paragraphs: [
      'It took twenty years to understand the wiring wasn\u2019t broken. It was a feature, not a bug. The problem was never the brain \u2014 it was the environment. Put an ADHD brain in a school and it fails. Put it on a dancefloor, on a bicycle, in a festival campsite with UV paints and 140 BPM \u2014 and it becomes exactly what\u2019s needed.',
      'The artist\u2019s lifestyle isn\u2019t a romantic choice \u2014 it\u2019s a neurological necessity. Ash shapes his year around what feeds his brain: cycling for daily regulation, festivals for creative immersion, business systems for productive structure, dance for sensory processing. Every part of the life is designed to work WITH the ADHD wiring, not against it.',
      'This is why freedom matters so much. At LightSpeed, the team gets genuine creative autonomy \u2014 not because Ash is a cool boss, but because an ADHD founder literally cannot micromanage. He builds systems that run without constant oversight, hires people who thrive with freedom, and trusts the process. ADHD management style, accidentally revolutionary.',
    ]},
    { id: 'movement-medicine', title: 'Movement as medicine', paragraphs: [
      'For ADHD brains, movement isn\u2019t optional \u2014 it\u2019s medication. Cycling daily in Berlin isn\u2019t fitness; it\u2019s brain chemistry. The 300km loaded-bike pilgrimage to Origin Festival isn\u2019t adventure; it\u2019s the ultimate dopamine regulation strategy. Running, triathlon, Muay Thai, yoga \u2014 every form of movement Ash has adopted serves the same neurological purpose.',
      'The festival dancefloor is hours of movement-as-medicine. Dancing to psytrance isn\u2019t recreation \u2014 it\u2019s the most effective ADHD intervention Ash has ever found. Rhythm, repetition, physical exhaustion, social connection, sensory richness \u2014 everything an ADHD brain craves, delivered through bass frequencies.',
      'Integration is the key word. Not just after festivals, but daily. The cycling to and from painting sessions, the journaling after intense creative work, the conversations with trusted friends \u2014 all of it is integration. Processing the ADHD brain\u2019s massive input stream into something coherent and useful.',
    ]},
  ],
};
