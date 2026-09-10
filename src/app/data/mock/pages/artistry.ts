/**
 * @fileoverview Artistry / Journey page mock data
 * Global psytrance makeup artist journey — with timeline and chapter nav
 *
 * @module data/mock/pages/artistry
 * @version 7.5.0
 */

import artistryHeroImg from 'figma:asset/4551cad5d171ad088e0e6abd69c3585944e55645.png';

export interface ArtistrySection {
  id: string;
  title: string;
  paragraphs: string[];
}

export interface ArtistrySkill {
  id: string;
  label: string;
}

export interface ArtistryFaq {
  id: string;
  question: string;
  answer: string;
}

export interface ArtistryTimelineEvent {
  year: string;
  title: string;
  description: string;
}

export interface ArtistryChapter {
  id: string;
  label: string;
}

export interface ArtistryPageData {
  hero: {
    title: string;
    subtitle: string;
    description: string;
    cta: string;
    image: string;
  };
  chapters: ArtistryChapter[];
  sections: ArtistrySection[];
  technicalMastery: {
    id: string;
    title: string;
    description: string;
  };
  mousseShadows: {
    id: string;
    title: string;
    paragraphs: string[];
    skills: ArtistrySkill[];
  };
  uvArtistry: {
    id: string;
    title: string;
    paragraphs: string[];
    cta: string;
  };
  creativeProcess: {
    id: string;
    title: string;
    paragraphs: string[];
    quote: string;
  };
  lookingForward: {
    id: string;
    title: string;
    paragraphs: string[];
    cta: string;
  };
  costumeEvolution: {
    title: string;
    events: ArtistryTimelineEvent[];
  };
  adhdBrief: {
    id: string;
    title: string;
    paragraph: string;
    linkLabel: string;
    linkHref: string;
  };
  makingOthersShine: {
    id: string;
    title: string;
    paragraphs: string[];
    quote: string;
  };
  faqs: ArtistryFaq[];
}

export var artistryPageData: ArtistryPageData = {
  hero: {
    title: 'Global psytrance artist',
    subtitle: 'colour, creativity, and connection since 2019.',
    description: 'A journey through sound and color. Based in Cape Town, chasing summers in Berlin and Thailand. I bring neon visions to life on the world\u2019s biggest psytrance dancefloors.',
    cta: 'Explore my portfolio',
    image: artistryHeroImg,
  },

  chapters: [
    { id: 'electric-journey', label: 'The journey' },
    { id: 'festival-euphoria', label: 'Festival euphoria' },
    { id: 'uv-explorations', label: 'UV explorations' },
    { id: 'mousse-shadows', label: 'Mousse eyeshadows' },
    { id: 'uv-artistry', label: 'UV artistry' },
    { id: 'creative-process', label: 'Creative process' },
    { id: 'costume-timeline', label: 'Costume evolution' },
    { id: 'adhd-brief', label: 'Wired different' },
    { id: 'making-others-shine', label: 'Making others shine' },
    { id: 'looking-forward', label: 'Looking forward' },
  ],

  sections: [
    {
      id: 'electric-journey',
      title: 'The electric journey begins',
      paragraphs: [
        'I am a global psytrance makeup artist. That\u2019s the only way to describe the life I live. I don\u2019t just attend festivals; I enhance them. My art is born from the beat, designed to glow under the UV lights of the world\u2019s best trance floors. It\u2019s a passion that has taken me from the tip of Africa to the clubs of Berlin and the jungles of Thailand.',
      ],
    },
    {
      id: 'festival-euphoria',
      title: 'Festival euphoria',
      paragraphs: [
        'You\u2019ll find me where the bass is deepest. I travel with my UV pigments, ready to transform fellow dancers. It\u2019s about synchronicity\u2014being in the right place with the right energy.',
        'My process is intuitive and electric. I see the potential for neon on your skin, how it will look when the lasers hit. It\u2019s fast, intense, and deeply connected to the psychedelic experience.',
      ],
    },
    {
      id: 'uv-explorations',
      title: 'UV explorations',
      paragraphs: [
        'Between August and November, I shift to Thailand. The jungle parties and island festivals call for a wilder, more organic neon palette.',
        'Here, I experiment with tribal UV patterns and bioluminescent designs that mimic the nature around us, glowing intensely under the blacklights of the psytrance stage.',
      ],
    },
  ],

  technicalMastery: {
    id: 'technical-mastery',
    title: 'Technical mastery',
    description: 'Specialized knowledge of UV-reactive pigments, application techniques, and dual-lighting design principles.',
  },

  mousseShadows: {
    id: 'mousse-shadows',
    title: 'Professional mousse eyeshadows',
    paragraphs: [
      'Cape Town is my origin and my anchor. But the world is my studio. I\u2019m always open to international creative collaborations.',
      'Whether I\u2019m in South Africa, Europe, or Asia, the mission is the same: to elevate the party through the power of UV color.',
    ],
    skills: [
      { id: 'color-theory', label: 'Color theory' },
      { id: 'blending', label: 'Blending mastery' },
      { id: 'texture', label: 'Texture work' },
      { id: 'uv-techniques', label: 'UV techniques' },
      { id: 'creative-design', label: 'Creative design' },
    ],
  },

  uvArtistry: {
    id: 'uv-artistry',
    title: 'UV makeup artistry',
    paragraphs: [
      'Precision in chaos. That\u2019s my specialty. I\u2019ve mastered ambidextrous application to ensure I can work effectively in the middle of a crowded dancefloor.',
      'This skill allows me to paint complex symmetrical designs and third-eye patterns without you having to leave the immersion of the festival.',
    ],
    cta: 'View UV makeup gallery',
  },

  creativeProcess: {
    id: 'creative-process',
    title: 'Creative process',
    paragraphs: [
      'I don\u2019t just paint faces; I unlock avatars. I focus on eyes and face because that\u2019s the center of connection on the dancefloor.',
      'After the transformation, you\u2019re not just a spectator; you\u2019re part of the visual spectacle of the event. I capture the moment, and we stay connected through the global tribe.',
    ],
    quote: 'True artistry lies in amplifying your inner light.',
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

  adhdBrief: {
    id: 'adhd-brief',
    title: 'Wired different',
    paragraph: 'ADHD isn\u2019t a deficit of attention \u2014 it\u2019s a surplus of it, all going in directions that school was never designed to handle. Hyperfocus during painting sessions, spontaneous design without pre-sketching, ambidextrous technique in the chaos of a crowded dancefloor \u2014 it\u2019s all connected to the way his brain processes the world.',
    linkLabel: 'Read the full ADHD story',
    linkHref: '/about/adhd',
  },

  makingOthersShine: {
    id: 'making-others-shine',
    title: 'Making others shine',
    paragraphs: [
      'Ash was bullied as a kid because he was small. The matric kids made him stand on stage and apologise to the entire school for not knowing the inter-school songs.',
      'This formative pain is directly connected to his makeup artistry. The kid who was publicly humiliated now creates moments of public celebration for others.',
    ],
    quote: 'The kid who was made to feel small now makes other people feel radiant, confident, and alive.',
  },

  lookingForward: {
    id: 'looking-forward',
    title: 'Looking forward',
    paragraphs: [
      'Every festival is a new gallery. I\u2019m constantly evolving my techniques, exploring new UV pigments and reactive materials.',
      'I live for this art. If you see the neon-clad artist on the dancefloor, come say hi. Let\u2019s create something that glows.',
    ],
    cta: 'Explore my portfolio',
  },

  faqs: [
    {
      id: 'artistry-faq-1',
      question: 'Where is Ash based?',
      answer: 'Ash is based in Cape Town, South Africa, where he owns a house in Woodstock. He travels annually to Berlin in May, then to Koh Phangan, Thailand (Sep-Nov) for Muay Thai training, triathlon, and remote work, before returning to South Africa for summer festival season. This yearly cycle fuels his creative energy and artistic inspiration.',
    },
    {
      id: 'artistry-faq-2',
      question: 'What festivals does he attend?',
      answer: 'He regularly works at psytrance festivals including Shankra (Switzerland), Reiserfieber (Switzerland), and various gatherings across Thailand. He also paints at Berlin club events and techno parties.',
    },
    {
      id: 'artistry-faq-3',
      question: 'Does he do commissions?',
      answer: 'This is a personal art project, so he doesn\u2019t offer commercial makeup services. However, he\u2019s always open to creative collaborations and festival partners.',
    },
  ],
};