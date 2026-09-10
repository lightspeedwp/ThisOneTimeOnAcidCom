/**
 * @fileoverview Gear page mock data — expanded with comprehensive kit categories
 * and brand recommendations.
 *
 * @module data/mock/pages/gear
 * @version 2.0.0 — Expanded with professional kit structure and 5 brand recommendations
 */

export interface GearItem {
  name: string;
  desc: string;
  usage: string;
}

export interface GearCategory {
  id: string;
  title: string;
  description: string;
  items: GearItem[];
}

export interface GearBrand {
  id: string;
  name: string;
  tagline: string;
  url: string;
  specialty: string;
  featured: string;
}

export var gearPageData = {
  hero: {
    title: 'The toolkit',
    subtitle: "What\u2019s in my bag",
    description: 'A curated list of the tools, pigments, and tech that power every festival look and creative project. Built from hundreds of painting sessions across three continents.',
    image: 'https://images.unsplash.com/photo-1690627931183-991bd45dc2f4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuZW9uJTIwY2FtZXJhJTIwZ2VhciUyMHBob3RvZ3JhcGh5JTIwdG9vbHMlMjBjeWJlcnB1bmt8ZW58MXx8fHwxNzcxNjg3MTA0fDA&ixlib=rb-4.1.0&q=80&w=1080'
  },

  categories: [
    {
      id: 'paints',
      title: 'Neon pigments & paints',
      description: 'UV-reactive essentials for maximum glow.',
      items: [
        { name: 'Kryolan Aqua Color', desc: 'Professional water-based face paint', usage: 'Base layers' },
        { name: 'Global Colours Neon', desc: 'High-viscosity neon pigments', usage: 'Highlight details' },
        { name: 'Diamond FX UV', desc: 'Ultra-bright UV reactive cakes', usage: 'Structural lines' },
        { name: 'Mehron Paradise AQ', desc: 'Smooth blending formula', usage: 'Complex gradients' },
      ]
    },
    {
      id: 'foundation',
      title: 'Foundation & base',
      description: 'Professional base products for every skin tone.',
      items: [
        { name: 'Primer (face, eyes, lips)', desc: 'Creates smooth base for pigment adhesion', usage: 'First step' },
        { name: 'Foundation (4 shade range)', desc: 'Light to dark \u2014 blend to match any skin tone', usage: 'Base coverage' },
        { name: 'Colour correcting palette', desc: 'Neutralise undertones before painting', usage: 'Prep work' },
        { name: 'Concealer (light & dark)', desc: 'Blend the perfect match per client', usage: 'Spot correction' },
        { name: 'Cream highlight/contour palette', desc: 'Multi-use for blush, lips, eyes, face', usage: 'Sculpting' },
        { name: 'Translucent setting powder', desc: 'Locks everything in place', usage: 'Setting' },
        { name: 'Pressed powder', desc: 'For on-set touch-ups', usage: 'Touch-ups' },
      ]
    },
    {
      id: 'colour',
      title: 'Colour & detail',
      description: 'Eyes, lips, and precision products for finishing touches.',
      items: [
        { name: 'Powder highlight/blush/contour', desc: 'Varying range for all skin tones', usage: 'Contouring' },
        { name: 'Bronzer (warm & cool)', desc: 'Two-tone range for warmth and depth', usage: 'Warmth' },
        { name: 'Eyeshadow palettes', desc: 'Neutral + bright/glitter options (seasonal)', usage: 'Eye colour' },
        { name: 'Mascara', desc: 'Traditional and waterproof options', usage: 'Lash definition' },
        { name: 'Gel eyeliner', desc: 'Smudge-proof for precision line work', usage: 'Eye detail' },
        { name: 'Pencil eyeliner', desc: 'Black, brown, white/nude (waterproof)', usage: 'Eye lines' },
        { name: 'Duraline', desc: 'Modify products for liner and precision work', usage: 'Product mixing' },
        { name: 'Lashes (strip & individual)', desc: 'Small, medium, and long sizes', usage: 'Lash enhancement' },
        { name: 'Eyelash glue', desc: 'Traditional and latex-free options', usage: 'Lash adhesion' },
        { name: 'Lip gloss', desc: 'Also usable as eye highlight for editorial looks', usage: 'Lip shine' },
        { name: 'Lip palette', desc: 'Global range of shades for all skin tones', usage: 'Lip colour' },
      ]
    },
    {
      id: 'brushes',
      title: 'Brushes & tools',
      description: 'Precision instruments for detailed linework and application.',
      items: [
        { name: 'Detail Liner 000', desc: 'Fine synthetic liner brush', usage: 'Intricate patterns' },
        { name: 'Angle Shader 1/4"', desc: 'Sharp edge shader', usage: 'Cut creases & shapes' },
        { name: 'Blush brush', desc: 'Large soft-bristle brush', usage: 'Powder application' },
        { name: 'Foundation brush', desc: 'Flat or stipple brush', usage: 'Base coverage' },
        { name: 'Concealer brush', desc: 'Small pointed brush', usage: 'Spot coverage' },
        { name: 'Sponges & stipplers', desc: 'High-density foam', usage: 'Base application' },
        { name: 'Dotting tools', desc: 'Various sizes', usage: 'Signature dot work' },
        { name: 'Metal palette & spatula', desc: 'For product mixing and loading', usage: 'Hygiene' },
        { name: 'Eyelash curler', desc: 'Invest in quality for this product', usage: 'Lash prep' },
        { name: 'Tweezers & scissors', desc: 'Precision tools for lash work', usage: 'Trimming' },
        { name: 'Pencil sharpener', desc: 'Keep eyeliner pencils sharp', usage: 'Maintenance' },
      ]
    },
    {
      id: 'hygiene',
      title: 'Hygiene & disposables',
      description: 'Non-negotiable cleanliness essentials for client safety.',
      items: [
        { name: 'Disposable mascara wands', desc: 'Single-use applicators', usage: 'Per client' },
        { name: 'Disposable lip wands', desc: 'Single-use lip applicators', usage: 'Per client' },
        { name: 'Disposable eyeliner sticks', desc: 'Single-use precision applicators', usage: 'Per client' },
        { name: 'Disposable latex-free sponges', desc: 'Hypoallergenic single-use sponges', usage: 'Per client' },
        { name: 'Q-tips & cotton rounds', desc: 'For cleanup and correction', usage: 'Cleanup' },
        { name: 'Micellar water', desc: 'Gentle makeup removal', usage: 'Removal' },
        { name: 'Makeup remover', desc: 'For stubborn products', usage: 'Deep clean' },
        { name: 'Brush cleaner & 70% alcohol', desc: 'Sanitise between clients', usage: 'Sterilisation' },
        { name: 'Hand sanitiser', desc: 'Use before touching each face', usage: 'Hand hygiene' },
        { name: 'Paper towels & rubbish bag', desc: 'Keep workspace clean', usage: 'Cleanup' },
        { name: 'Eye drops', desc: 'For client comfort during eye work', usage: 'Client care' },
      ]
    },
    {
      id: 'prep',
      title: 'Skin prep & setting',
      description: 'Products for preparing and protecting the canvas.',
      items: [
        { name: 'Moisturiser', desc: 'Hydrate skin before application', usage: 'Pre-paint' },
        { name: 'Lip balm', desc: 'Prep lips before lip colour', usage: 'Lip prep' },
        { name: 'Setting spray', desc: 'Lock the look for hours of dancing', usage: 'Final step' },
        { name: 'UV setting spray', desc: 'Specifically for UV-reactive paint longevity', usage: 'UV lock' },
        { name: 'Dental floss', desc: 'Surprisingly useful backstage essential', usage: 'Emergency fix' },
      ]
    },
    {
      id: 'tech',
      title: 'Camera & tech',
      description: 'Capturing the art in low-light environments.',
      items: [
        { name: 'Sony A7IV', desc: 'Full-frame mirrorless camera', usage: 'Primary shooter' },
        { name: '85mm f/1.4 lens', desc: 'Portrait lens', usage: 'Detail shots' },
        { name: 'UV LED flashlights (365nm)', desc: 'Essential for checking work under blacklight', usage: 'UV activation' },
        { name: 'Godox lights', desc: 'Portable studio lighting', usage: 'On-site setup' },
      ]
    },
    {
      id: 'survival',
      title: 'Festival survival',
      description: 'Essentials for 5-day desert marathons and multi-day events.',
      items: [
        { name: 'Hydration pack', desc: '3L reservoir', usage: 'Stay hydrated' },
        { name: 'Power bank', desc: '20,000mAh', usage: 'Tech charging' },
        { name: 'Earplugs', desc: 'High-fidelity filters', usage: 'Hearing protection' },
        { name: 'Dust mask', desc: 'Particulate filter', usage: 'Comfort in dust' },
      ]
    }
  ] as GearCategory[],

  brands: [
    {
      id: 'brand-loreal',
      name: "L'Or\u00e9al Paris",
      tagline: "Because you're worth it",
      url: 'https://www.loreal.com/',
      specialty: 'Full-spectrum colour cosmetics, foundations, and skincare. The world\u2019s largest beauty company with over a century of innovation.',
      featured: 'True Match foundation range \u2014 incredible skin tone spectrum for painting diverse faces',
    },
    {
      id: 'brand-revlon',
      name: 'Revlon',
      tagline: 'Live boldly',
      url: 'https://www.revlon.com/',
      specialty: 'Bold colour cosmetics, lip products, and nail art. A heritage brand championing self-expression since 1932.',
      featured: 'Super Lustrous lip range \u2014 incredible pigment density that survives hours of dancing',
    },
    {
      id: 'brand-essence',
      name: 'Essence',
      tagline: 'Happy skin, happy life',
      url: 'https://essencemakeup.com/',
      specialty: 'Affordable, cruelty-free colour cosmetics with surprisingly high pigmentation.',
      featured: 'Eyeshadow palettes and mascaras \u2014 best value-for-money for beginners building a first kit',
    },
    {
      id: 'brand-makeup-studio',
      name: 'Make-Up Studio',
      tagline: 'Professional make-up for everyone',
      url: 'https://www.make-upstudio.com/',
      specialty: 'Amsterdam-based professional brand used in film, TV, and theatre. Built for performance environments.',
      featured: 'Cream-based products \u2014 incredible under UV and designed for stage and camera',
    },
    {
      id: 'brand-maybelline',
      name: 'Maybelline New York',
      tagline: "Maybe she\u2019s born with it",
      url: 'https://www.maybelline.com/',
      specialty: 'Accessible, high-performance colour cosmetics. A New York City icon known for trend-forward products.',
      featured: 'Lash Sensational mascara and SuperStay foundation \u2014 festival-proof staples',
    },
  ] as GearBrand[],

  kitWisdom: [
    'Keep your kit as minimal as possible \u2014 you can always expand later',
    'Mind expiration dates \u2014 do not stockpile product you cannot use in time',
    'Protect your investment with a sturdy, organised carry case',
    'Avoid asking clients for products unless they specifically request their own',
    'Always keep your workspace clean between clients',
    'Custom palettes (Z Palette, Vueset) save space and weight',
    'Less is more with brushes \u2014 discover which ones you reach for most',
    'Be creative with multi-use products \u2014 cream palettes work on eyes, cheeks, and lips',
  ],

  resourcesCta: {
    label: 'Getting started guide',
    href: '/about/resources',
    description: 'New to UV face painting? Read the full beginner\u2019s guide with practice tips, safety essentials, and technique advice.',
  },
};
