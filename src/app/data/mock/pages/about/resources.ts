/**
 * @fileoverview Resources sub-page data — getting started guide for aspiring face painters
 * and UV makeup artists. Cross-references the Gear page (/toolkit).
 *
 * @module data/mock/pages/about/resources
 * @version 1.0.0
 */
import type { AboutSubpageData } from './types';

export interface ResourceTip {
  id: string;
  title: string;
  description: string;
}

export interface ResourceBrand {
  id: string;
  name: string;
  tagline: string;
  url: string;
  specialty: string;
  whyAshLikes: string;
}

export interface ResourceKitCategory {
  id: string;
  title: string;
  description: string;
  items: string[];
}

export interface ResourcesPageData extends AboutSubpageData {
  pullQuote: string;
  intro: {
    title: string;
    paragraphs: string[];
  };
  gettingStarted: {
    title: string;
    description: string;
    tips: ResourceTip[];
  };
  essentialKit: {
    title: string;
    description: string;
    categories: ResourceKitCategory[];
  };
  recommendedBrands: {
    title: string;
    description: string;
    brands: ResourceBrand[];
  };
  practiceGuide: {
    title: string;
    description: string;
    tips: ResourceTip[];
  };
  safetySection: {
    title: string;
    description: string;
    guidelines: string[];
  };
  crossLinks: {
    gear: { label: string; href: string; description: string };
    portfolio: { label: string; href: string; description: string };
    videos: { label: string; href: string; description: string };
  };
}

export var resourcesPageData: ResourcesPageData = {
  hero: {
    badge: 'Resources',
    title: 'Getting started with UV makeup artistry',
    description: 'Everything you need to know to start your journey into UV and neon face painting. From essential tools to technique tips, this is the guide Ash wishes he had when he first picked up a brush in 2019.',
  },
  breadcrumbs: [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Resources' },
  ],
  pullQuote: 'The best face you ever paint is the next one. Start with cheap paints, practice on friends, and remember: blacklight forgives everything.',

  intro: {
    title: 'Where to begin',
    paragraphs: [
      'UV face painting is one of the most accessible art forms out there. You do not need formal training, expensive equipment, or a studio. You need pigment, a brush, a willing face, and a UV light. Everything else comes with time and practice.',
      'This page is a distillation of what Ash has learned since his first spontaneous paint session in a Berlin park in July 2019. It is not a masterclass. It is a shortcut past the mistakes he made so you can make your own, faster.',
      'Whether you want to paint at festivals, at parties, or just for yourself, the fundamentals are the same: build a core kit, learn the basics of skin-safe products, practise blending and line work, and get comfortable working fast under low light.',
    ],
  },

  gettingStarted: {
    title: 'First steps',
    description: 'Five things to do before you paint your first face.',
    tips: [
      {
        id: 'tip-1',
        title: 'Start with water-based paints',
        description: 'Water-based face paints are the safest and most forgiving medium. They blend easily, wash off with water, and are skin-safe for most people. Avoid acrylic or craft paints on skin.',
      },
      {
        id: 'tip-2',
        title: 'Get a UV torch',
        description: 'A 365nm UV LED flashlight is essential for seeing how your work looks under blacklight. Carry one in your kit at all times. They cost next to nothing and change everything.',
      },
      {
        id: 'tip-3',
        title: 'Practise on your own arm first',
        description: 'Before painting anyone else, practise geometric shapes, dots, and gradients on your own forearm. It teaches you brush pressure, pigment loading, and blending speed.',
      },
      {
        id: 'tip-4',
        title: 'Paint your friends',
        description: 'Offer to paint at house parties, braais, pre-drinks, or small gatherings. Every face is different and the only way to learn is repetition. The dancefloor is the final exam, not the classroom.',
      },
      {
        id: 'tip-5',
        title: 'Photograph everything under UV',
        description: 'Document every face you paint. It is your portfolio, your progress tracker, and your motivation. Use a phone camera with the UV torch held at an angle for best results.',
      },
    ],
  },

  essentialKit: {
    title: 'The essential makeup kit',
    description: 'A kit is deeply personal and evolves as you gain experience. Start minimal, protect your investment, and expand as you discover your style. Here are the core categories every aspiring artist needs.',
    categories: [
      {
        id: 'cat-makeup',
        title: 'Makeup essentials',
        description: 'Core pigments and products for face painting and creative makeup.',
        items: [
          'Primer (face, eyes, lips) \u2014 creates a smooth base for pigment adhesion',
          'Foundation (4 shades: light to dark) \u2014 blend to match any skin tone',
          'Colour correcting palette \u2014 neutralise undertones before painting',
          'Concealer (light and dark shades) \u2014 blend the perfect match per client',
          'Cream highlight/contour palette \u2014 multi-use for blush, lips, eyes, and face',
          'Translucent setting powder \u2014 locks everything in place',
          'Pressed powder \u2014 for on-set touch-ups',
          'Powder highlight/blush/contour palette \u2014 range for all skin tones',
          'Bronzer (warm and cool tones)',
          'Eyeshadow palettes \u2014 neutral + bright/glitter options',
          'Mascara (traditional and waterproof)',
          'Gel eyeliner and pencil eyeliner (black, brown, white/nude)',
          'Duraline \u2014 modify products for liner and precision work',
          'Lashes (strip and individual: small, medium, long)',
          'Eyelash glue (traditional and latex-free)',
          'Lip gloss \u2014 also usable as eye highlight for editorial looks',
          'Lip palette \u2014 global range of shades for all skin tones',
        ],
      },
      {
        id: 'cat-uv',
        title: 'UV and neon specifics',
        description: 'The blacklight-reactive essentials that make faces glow.',
        items: [
          'UV-reactive face paint cakes \u2014 water-activated neon pigments',
          'UV body paint (liquid) \u2014 for larger coverage and body art',
          'Neon loose pigments \u2014 for detail work and accent highlights',
          'UV setting spray \u2014 locks neon paint under sweat and movement',
          '365nm UV LED flashlights \u2014 essential for checking your work',
          'UV-reactive glitter (cosmetic grade only)',
        ],
      },
      {
        id: 'cat-tools',
        title: 'Tools and preparation',
        description: 'The brushes, sponges, and hygiene essentials every kit needs.',
        items: [
          'Brush set (blush, foundation, concealer, eyeliner, eyeshadow)',
          'Metal palette and spatula',
          'Eyelash curler (invest in quality)',
          'Tweezers and scissors',
          'Pencil sharpener',
          'Eye drops',
          'Disposable mascara wands, lip wands, and eyeliner sticks',
          'Disposable latex-free sponges',
          'Q-tips and cotton rounds',
          'Micellar water and makeup remover',
          'Moisturiser and lip balm',
          'Setting spray',
          'Brush cleaner and 70% alcohol',
          'Paper towels and small rubbish bag',
          'Hand sanitiser',
        ],
      },
      {
        id: 'cat-wisdom',
        title: 'Kit wisdom',
        description: 'Lessons learned from hundreds of festival painting sessions.',
        items: [
          'Keep your kit as minimal as possible \u2014 you can always expand later',
          'Mind expiration dates \u2014 do not stockpile product you cannot use in time',
          'Protect your investment with a sturdy, organised carry case',
          'Avoid asking clients for products unless they specifically request their own',
          'Always keep your workspace clean between clients',
          'Custom palettes (Z Palette, Vueset) save space and weight',
          'Less is more with brushes \u2014 discover which ones you reach for most',
        ],
      },
    ],
  },

  recommendedBrands: {
    title: 'Brands worth knowing',
    description: 'These are brands Ash has used, admired, or recommends for aspiring makeup artists. From drugstore staples to professional-grade ranges, each one has its place in a well-rounded kit.',
    brands: [
      {
        id: 'brand-loreal',
        name: "L'Or\u00e9al Paris",
        tagline: "Because you're worth it",
        url: 'https://www.loreal.com/',
        specialty: 'Full-spectrum colour cosmetics, foundations, and skin care. The world\u2019s largest beauty company with over a century of innovation.',
        whyAshLikes: 'Reliable foundations that hold up under festival conditions. Their True Match range blends across a huge skin tone spectrum, which matters when you are painting dozens of different faces in one night.',
      },
      {
        id: 'brand-revlon',
        name: 'Revlon',
        tagline: 'Live boldly',
        url: 'https://www.revlon.com/',
        specialty: 'Bold colour cosmetics, lip products, and nail art. A heritage brand that has championed self-expression since 1932.',
        whyAshLikes: 'Their Super Lustrous lip range has incredible pigment density. For festival lip art and bold colour statements, Revlon consistently delivers vibrancy that survives hours of dancing.',
      },
      {
        id: 'brand-essence',
        name: 'Essence',
        tagline: 'Happy skin, happy life',
        url: 'https://essencemakeup.com/',
        specialty: 'Affordable, cruelty-free colour cosmetics with surprisingly high pigmentation. Proof that budget-friendly does not mean low quality.',
        whyAshLikes: 'The best value-for-money brand for beginners building their first kit. Their eyeshadow palettes and mascaras punch way above their price point. Perfect for practise without the guilt of wasting expensive product.',
      },
      {
        id: 'brand-makeup-studio',
        name: 'Make-Up Studio',
        tagline: 'Professional make-up for everyone',
        url: 'https://www.make-upstudio.com/',
        specialty: 'Amsterdam-based professional makeup brand used in film, TV, and theatre. Known for ultra-pigmented products designed for stage and camera work.',
        whyAshLikes: 'Their cream-based products are incredible under UV. The brand was built for performance environments, which is exactly what a festival dancefloor is. Their colour range is fearless.',
      },
      {
        id: 'brand-maybelline',
        name: 'Maybelline New York',
        tagline: 'Maybe she\u2019s born with it',
        url: 'https://www.maybelline.com/',
        specialty: 'Accessible, high-performance colour cosmetics. A New York City icon known for trend-forward products at drugstore prices.',
        whyAshLikes: 'Their Lash Sensational mascara and SuperStay foundation are festival-proof staples. Affordable enough to keep backups in your kit, reliable enough to trust under pressure.',
      },
    ],
  },

  practiceGuide: {
    title: 'How to practise',
    description: 'Structured approaches to building your skills without a studio or formal training.',
    tips: [
      {
        id: 'practice-1',
        title: 'The 30-face challenge',
        description: 'Commit to painting 30 different faces in 30 days. Friends, family, strangers at parties. Repetition builds speed and confidence faster than any tutorial.',
      },
      {
        id: 'practice-2',
        title: 'Copy before you create',
        description: 'Find UV face paint images you admire and try to replicate them exactly. Copying teaches technique without the pressure of originality. Creativity comes after competence.',
      },
      {
        id: 'practice-3',
        title: 'Timed sessions',
        description: 'At festivals you often have 5 to 10 minutes per face. Practise with a timer. Speed forces you to simplify and prioritise impact over detail.',
      },
      {
        id: 'practice-4',
        title: 'Film your process',
        description: 'Record time-lapse videos of your painting sessions. Reviewing them reveals habits, hesitations, and techniques you would never notice in the moment.',
      },
      {
        id: 'practice-5',
        title: 'Paint under UV from the start',
        description: 'Do not paint under normal light and then check under UV. Paint in blacklight conditions from the beginning. It trains your eye to see how pigments actually behave.',
      },
    ],
  },

  safetySection: {
    title: 'Skin safety essentials',
    description: 'UV face painting is safe when you use the right products. Here are the non-negotiable rules.',
    guidelines: [
      'Only use products labelled as cosmetic-grade and skin-safe. Never use craft paints, house paint, or industrial UV pigments on skin.',
      'Always ask about allergies before painting. Common sensitivities include latex (in some eyelash glues), fragrance, and certain red pigments.',
      'Patch test new products on the inside of your wrist and wait 15 minutes before applying to the face.',
      'Never share mascara, eyeliner, or lip products between clients. Use disposable applicators.',
      'Clean brushes between clients with brush cleaner or 70% isopropyl alcohol.',
      'Keep hand sanitiser accessible and use it before touching each new face.',
      'Store products in a cool, dry place and respect expiration dates. Heat-damaged products can cause irritation.',
      'If a client reports tingling, burning, or discomfort, remove the product immediately with micellar water.',
    ],
  },

  crossLinks: {
    gear: {
      label: 'The toolkit',
      href: '/toolkit',
      description: 'See the full breakdown of tools, pigments, and tech in Ash\u2019s festival bag.',
    },
    portfolio: {
      label: 'Portfolio',
      href: '/portfolio',
      description: 'Browse the gallery of faces painted at festivals across four continents.',
    },
    videos: {
      label: 'Video tutorials',
      href: '/videos',
      description: 'Watch time-lapses and tutorials showing UV painting techniques in action.',
    },
  },
};
