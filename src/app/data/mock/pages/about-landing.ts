/**
 * @fileoverview About Landing Page data — centralized content for the redesigned About page
 *
 * Sources: /content/personal/identity.md
 * Phase 4 — Content Expansion & Redesign
 *
 * @module data/mock/pages/about-landing
 * @version 1.0.0
 */

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   TYPES
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

export interface AboutLandingTimelineEvent {
  year: string;
  title: string;
  description: string;
}

export interface AboutLandingChapter {
  id: string;
  label: string;
}

export interface AboutLandingData {
  hero: {
    title: string;
    tagline: string;
    description: string;
    pullQuote: string;
  };
  aquarianBlueprint: {
    title: string;
    paragraphs: string[];
    quote: string;
  };
  adhdSection: {
    title: string;
    intro: string;
    artHeading: string;
    artPoints: string[];
    businessHeading: string;
    businessPoints: string[];
    imageAlt: string;
  };
  costumeEvolution: {
    title: string;
    events: AboutLandingTimelineEvent[];
  };
  bulliedKid: {
    contextParagraphs: string[];
    quote: string;
  };
  chapters: AboutLandingChapter[];
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   DATA
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

export var aboutLandingData: AboutLandingData = {
  hero: {
    title: 'Global psytrance artist',
    tagline: 'UV makeup specialist',
    description:
      'A journey through sound and colour. Based in Cape Town, chasing summers in Berlin and Thailand. He brings neon visions to life on the world\u2019s biggest psytrance dancefloors.',
    pullQuote:
      'At my core, I\u2019m still a crazy Aquarian who loves life, thrives on connection, and is always moving \u2014 in business, in sport, in creativity, and in community.',
  },

  aquarianBlueprint: {
    title: 'The Aquarian blueprint',
    paragraphs: [
      'Ash has always questioned everything. The Aquarian need to reject convention, to see patterns others miss, to insist on doing things his own way even when the easy path is right there \u2014 this isn\u2019t stubbornness, it\u2019s operating system. He sees connections across disciplines, cultures, and altered states that other people don\u2019t see because they\u2019re not looking from the same angle.',
      'Combined with ADHD, this becomes amplified. The conventional world felt like running incompatible software. School, offices, 9-to-5 routines \u2014 none of it matched the way his brain processed information. It took him twenty years to understand that this wasn\u2019t broken. It was a feature, not a bug. He just needed to find the right operating system.',
    ],
    quote:
      'At my core, I\u2019m still a crazy Aquarian who loves life, thrives on connection, and is always moving \u2014 in business, in sport, in creativity, and in community.',
  },

  adhdSection: {
    title: 'ADHD \u2014 wired different',
    intro:
      'It\u2019s not a deficit of attention. It\u2019s a surplus of it, all going in directions that school wasn\u2019t designed to handle.',
    artHeading: 'How ADHD shows up in the art',
    artPoints: [
      'Hyperfocus during painting sessions \u2014 the world narrows to just the pigment, the skin, the music, and the design emerging',
      'Ambidextrous technique \u2014 painting with both hands simultaneously in a crowded, noisy, dark festival environment is exactly the kind of multi-input processing that ADHD brains thrive on',
      'Spontaneous design \u2014 no pre-sketching, no Pinterest boards, no planning. The design emerges from the moment',
    ],
    businessHeading: 'How ADHD shows up in the business',
    businessPoints: [
      'Process obsession \u2014 LightSpeed\u2019s workflow isn\u2019t despite ADHD; it\u2019s because of it. ADHD brains need structure to function, so Ash builds meticulous systems',
      'Radical delegation \u2014 giving the team freedom isn\u2019t just philosophy; it\u2019s necessity. An ADHD founder can\u2019t micromanage',
    ],
    imageAlt: 'Neon UV face paint art at a festival under blacklight',
  },

  costumeEvolution: {
    title: 'The costume evolution',
    events: [
      {
        year: '1999',
        title: 'The yellow suit',
        description:
          'Found at a charity shop. First worn at Vortex 1999. Earned him the nickname "the Chicken Man." The beginning of standing out on purpose.',
      },
      {
        year: 'Early 2000s',
        title: 'The red suit',
        description: 'Escalation. Brighter, bolder, louder.',
      },
      {
        year: 'Mid-2000s',
        title: 'White & black cow suit',
        description: 'The pivot to character. Festival identity took shape.',
      },
      {
        year: 'Late 2000s',
        title: 'Brown & beige cow suit',
        description:
          'Became known as "the Cow Man" for years. People at festivals STILL ask if he\u2019s the guy who used to dress as the cow man.',
      },
      {
        year: 'July 2019',
        title: 'UV paint',
        description:
          'The final evolution. The costume became the art became the identity. No longer wearing something outrageous \u2014 now MAKING other people outrageous.',
      },
    ],
  },

  bulliedKid: {
    contextParagraphs: [
      'Ash was bullied as a kid because he was small. The matric kids made him stand on stage and apologise to the entire school for not knowing the inter-school songs.',
      'This formative pain is directly connected to his makeup artistry. The kid who was publicly humiliated now creates moments of public celebration for others.',
    ],
    quote:
      'The kid who was made to feel small now makes other people feel radiant, confident, and alive.',
  },

  chapters: [
    { id: 'aquarian-section', label: 'Aquarius & ADHD' },
    { id: 'adhd-section', label: 'Wired different' },
    { id: 'costume-section', label: 'Costume evolution' },
    { id: 'shine-section', label: 'Making others shine' },
  ],
};