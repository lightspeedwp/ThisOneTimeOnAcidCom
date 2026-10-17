/**
 * @fileoverview SEO metadata for main site pages
 * Static page SEO data for home, about, portfolio, blog, etc.
 * 
 * @module data/mock/seo/pages
 * @version 1.0.0
 */

import type { SEOData } from '../../../utils/seo';

/**
 * Site-wide default SEO (index.html / Figma Make settings)
 */
export var siteDefault: SEOData = {
  title: 'Ash Shaw | Neon & UV makeup art — Berlin & festival portfolio',
  description:
    'Explore the bold neon and UV makeup artistry of Ash Shaw. Festival face painting, blacklight designs, editorial looks, and creative tutorials — from Berlin clubs to international psytrance festivals.',
};

/**
 * Main Pages SEO
 * SEO metadata for all primary website pages
 */
export var pageSEO: Record<string, SEOData> = {
  // BOOK SITE SPECIFIC PAGES
  bookHome: {
    title: 'This one time on acid... | Ash Shaw',
    description: 'A hybrid memoir and creative-life guide by Ash Shaw about dancefloors, difference, freedom, creativity, and becoming fully yourself.',
  },
  readDraft: {
    title: 'Read the Draft | This one time on acid...',
    description: 'Unlock the rough draft of Ash Shaw\'s upcoming book. Sign up to read early chapters and get notified when pre-orders open.',
  },
  thankYou: {
    title: 'Draft Unlocked | This one time on acid...',
    description: 'Thank you for signing up. You now have access to read the rough draft of Ash Shaw\'s upcoming book.',
  },
  waitlist: {
    title: 'Join the Waitlist | This one time on acid...',
    description: 'Join the waitlist for Ash Shaw\'s upcoming book "This one time on acid..." and get early access to updates and pre-orders.',
  },
  theBook: {
    title: 'The Book | This one time on acid...',
    description: 'Deep dive into the themes, stories, and structure of "This one time on acid...", a hybrid memoir by Ash Shaw.',
  },
  aboutAsh: {
    title: 'About the Author | Ash Shaw',
    description: 'Ash Shaw is a South African writer, UV makeup artist, founder, cyclist, and lifelong builder of communities.',
  },
  journal: {
    title: 'Journal | Notes & Field Reports',
    description: 'Notes, field reports, videos, and companion pieces from the world of the book "This one time on acid...".',
  },
  bookEvents: {
    title: 'Events | This one time on acid...',
    description: 'Where the book shows up in public. Readings, talks, workshops, and festival appearances.',
  },
  speaking: {
    title: 'Speaking & Workshops | Ash Shaw',
    description: 'Book Ash Shaw for talks and workshops on creativity, difference, identity, freedom, and building a life that funds the work.',
  },
  media: {
    title: 'Media & Press | Ash Shaw',
    description: 'Press kits, interviews, podcasts, and media appearances featuring Ash Shaw and the book "This one time on acid...".',
  },
  bookContact: {
    title: 'Contact | This one time on acid...',
    description: 'Get in touch for media, speaking, workshop, event, publisher, or general enquiries.',
  },
  draftViewer: {
    title: 'Draft Viewer | This one time on acid...',
    description: 'Reading the rough draft.',
  },

  home: {
    title: 'Ash Shaw | Neon & UV makeup art — Berlin & festival portfolio',
    description:
      'Discover Ash Shaw\u2019s neon and UV makeup art. Festival face painting, blacklight looks, and creative tutorials from Berlin to international psytrance festivals.',
  },

  about: {
    title: 'About Ash Shaw | UV artist, entrepreneur & endurance athlete',
    description:
      'Meet Ash Shaw: UV makeup artist, psytrance festival creative, entrepreneur behind LightSpeed, and endurance cyclist. Based in Cape Town, Berlin, and Koh Phangan.',
  },

  portfolio: {
    title: 'Portfolio | Neon makeup art gallery — festivals & blacklight',
    description:
      'Explore Ash Shaw\u2019s portfolio of festival makeup art, UV designs, and neon face painting. Blacklight creations from Berlin clubs to international psytrance events.',
  },

  blog: {
    title: 'Blog | Festival makeup tutorials & creative insights',
    description:
      'Read Ash Shaw\u2019s blog: makeup tutorials, festival survival guides, UV artistry tips, and creative reflections from the psytrance dancefloor.',
  },

  videos: {
    title: 'Videos | Makeup transformation tutorials & festival highlights',
    description:
      'Watch Ash Shaw\u2019s makeup transformation videos, festival highlights, and behind-the-scenes creative content. Neon & UV artistry in action.',
  },

  podcasts: {
    title: 'Podcasts | Creative conversations & festival stories',
    description:
      'Listen to Ash Shaw\u2019s podcast series exploring creativity, festival culture, entrepreneurship, and the artist lifestyle. Candid conversations from the road.',
  },

  contact: {
    title: 'Get in touch | Collaborate on creative projects',
    description:
      'Reach out to Ash Shaw for creative collaborations, festival bookings, or UV makeup inquiries. Connect via Typeform for project discussions.',
  },

  feedback: {
    title: 'Testimonials | What people say about Ash Shaw\u2019s work',
    description:
      'Read testimonials and feedback from festival-goers, clients, and collaborators. See why people love Ash Shaw\u2019s neon makeup artistry.',
  },

  stickers: {
    title: 'Sticker gallery | Neon art & psychedelic designs',
    description:
      'Browse Ash Shaw\u2019s collection of neon stickers and psychedelic designs. Festival art, UV graphics, and creative illustrations.',
  },

  faq: {
    title: 'FAQ | Answers to common questions about makeup & festivals',
    description:
      'Find answers to frequently asked questions about UV makeup, festival preparation, creative process, and booking inquiries.',
  },

  search: {
    title: 'Search results',
    description:
      'Search Ash Shaw\u2019s portfolio for makeup tutorials, festival content, blog posts, and creative resources.',
  },

  ebook: {
    title: 'Read the book | This one time on acid — a psytrance memoir',
    description:
      'Read Ash Shaw\u2019s book "This one time on acid" — a memoir exploring ADHD, psytrance festivals, UV art, and the life of a neurodivergent creative.',
  },

  // HIDDEN ABOUT SUB-PAGES (21 pages)
  berlin: {
    title: 'Berlin | The city that gave me techno',
    description:
      'How Berlin shaped Ash Shaw\u2019s UV makeup art. Discover the city that gave permission to be weird, introduced UV paint, and became a creative anchor.',
  },

  biography: {
    title: 'Biography | From snails to psytrance — the full story',
    description:
      'The complete biography of Ash Shaw: from collecting snails in Paarl to UV makeup artist touring Berlin, Cape Town, and Koh Phangan.',
  },

  sixCats: {
    title: 'Six Cats | The green garden — Woodstock cannabis collective',
    description:
      'Six Cats: Ash Shaw\u2019s Woodstock cannabis cultivation collective. Organic home-grown, cat mascots, and a garden that became a Cape Town institution.',
  },

  lightspeed: {
    title: 'LightSpeed | Twenty-three years of WordPress entrepreneurship',
    description:
      'LightSpeed: Ash Shaw\u2019s WordPress development agency. Twenty-three years of remote-first entrepreneurship, open source contributions, and autonomy-driven business.',
  },

  tribesOverview: {
    title: 'The tribes that made me | Five communities that shaped identity',
    description:
      'Explore the five tribes that shaped Ash Shaw: psytrance festivals, cycling endurance athletes, neurodivergent creatives, WordPress community, and Muay Thai fighters.',
  },

  tribesPsytrance: {
    title: 'Psytrance tribe | Festivals, dancefloors & neon revelations',
    description:
      'The psytrance tribe: where Ash Shaw found connection, UV makeup artistry, and a global family of festival freaks united by the beat.',
  },

  tribesCycling: {
    title: 'Cycling tribe | Endurance athletes & loaded bike adventures',
    description:
      'The cycling tribe: endurance athletes who ride 300km to festivals, tour Thailand by bicycle, and understand that discipline is freedom.',
  },

  tribesNeurodivergent: {
    title: 'Neurodivergent tribe | ADHD creatives & brilliant misfits',
    description:
      'The neurodivergent tribe: ADHD creatives, late-diagnosed adults, and brilliant misfits who turned their wiring into their superpower.',
  },

  tribesWordPress: {
    title: 'WordPress tribe | Open source community & remote collaboration',
    description:
      'The WordPress tribe: open source contributors, WordCamp friends, and remote collaborators building the web together since 2003.',
  },

  tribesMuayThai: {
    title: 'Muay Thai tribe | Fighters, discipline & respect',
    description:
      'The Muay Thai tribe: fighters training in Koh Phangan, learning discipline through pad work, and understanding that respect is earned on the mats.',
  },

  valuesOverview: {
    title: 'Core values | What drives the creative life',
    description:
      'The six core values that drive Ash Shaw\u2019s life: autonomy, creative freedom, endurance, neurodivergent pride, community, and lifelong learning.',
  },

  valuesAutonomy: {
    title: 'Autonomy | Design your own life',
    description:
      'Autonomy: the foundation of Ash Shaw\u2019s life. Why freedom to choose your path matters more than conventional stability.',
  },

  valuesCreativity: {
    title: 'Creative freedom | Art as necessity, not hobby',
    description:
      'Creative freedom: why Ash Shaw treats UV makeup, writing, and art as necessities, not hobbies. Creativity is survival, not decoration.',
  },

  valuesEndurance: {
    title: 'Endurance | Discipline through sport & art',
    description:
      'Endurance: the discipline learned through cycling, Muay Thai, and triathlon training. Physical endurance builds mental resilience.',
  },

  valuesNeurodivergent: {
    title: 'Neurodivergent pride | ADHD as superpower',
    description:
      'Neurodivergent pride: why Ash Shaw celebrates ADHD as a superpower. The wiring that society calls broken is actually a creative advantage.',
  },

  valuesCommunity: {
    title: 'Community | The tribes that support the journey',
    description:
      'Community: the five tribes that support Ash Shaw\u2019s journey. Psytrance festivals, cycling endurance, neurodivergent creatives, WordPress, and Muay Thai.',
  },

  valuesLearning: {
    title: 'Lifelong learning | Curiosity as fuel',
    description:
      'Lifelong learning: why Ash Shaw remains obsessively curious. From Lego to stiffy discs to GitHub Copilot, the learning never stops.',
  },

  timeline: {
    title: 'Timeline | Forty-five years of milestones',
    description:
      'Explore Ash Shaw\u2019s visual timeline: forty-five years of festivals, cycling adventures, business milestones, and creative breakthroughs.',
  },

  history: {
    title: 'History | A visual timeline of key moments',
    description:
      'Interactive timeline visualisation of Ash Shaw\u2019s key life moments, from childhood in Paarl to festival cycling across three continents.',
  },

  // 404 PAGE
  notFound: {
    title: 'Page not found | 404',
    description:
      'The page you\u2019re looking for doesn\u2019t exist. Head back to Ash Shaw\u2019s portfolio to explore neon makeup art, tutorials, and festival content.',
  },

  // SITEMAP
  sitemap: {
    title: 'Sitemap | All pages on Ash Shaw\u2019s portfolio',
    description:
      'Complete sitemap of Ash Shaw\u2019s neon makeup portfolio. Browse every page, post, and project across the site.',
  },

  // STYLE GUIDE
  styleGuide: {
    title: 'Style guide | Design system reference',
    description:
      'Ash Shaw\u2019s portfolio style guide. Typography, colours, spacing, and component patterns used throughout the neon makeup portfolio.',
  },

  // LEGAL
  terms: {
    title: 'Terms & conditions | Ash Shaw portfolio',
    description:
      'Terms and conditions for using Ash Shaw\u2019s neon makeup art portfolio website.',
  },

  privacy: {
    title: 'Privacy policy | Ash Shaw portfolio',
    description:
      'Privacy policy for Ash Shaw\u2019s neon makeup art portfolio. How your data is handled on this personal art project.',
  },

  // EVENTS
  events: {
    title: 'Events | Festival appearances & creative happenings',
    description:
      'Upcoming and past festival appearances, creative events, and UV makeup showcases from Ash Shaw\u2019s nomadic art journey.',
  },

  // PRESS KIT
  press: {
    title: 'Press kit | Media resources & brand assets',
    description:
      'Download Ash Shaw\u2019s press kit: high-res photos, biography, brand assets, and media contact information for press and collaborations.',
  },

  // GEAR / TOOLKIT
  toolkit: {
    title: 'Toolkit | Gear, tools & creative setup',
    description:
      'The gear, tools, and creative setup behind Ash Shaw\u2019s neon makeup art. UV lights, pigments, brushes, and the mobile studio.',
  },

  // HIDDEN ABOUT SUB-PAGES (additional missing entries)
  hiddenAbout: {
    title: 'About | Discover Ash Shaw\u2019s creative world',
    description:
      'Gateway to all about pages: biography, Berlin, cycling, music, fitness, education, and the creative journey of UV makeup artist Ash Shaw.',
  },

  adhd: {
    title: 'ADHD | The wiring behind the art',
    description:
      'How ADHD shapes Ash Shaw\u2019s creative process. Late diagnosis, hyperfocus, and why neurodivergent wiring is a feature, not a bug.',
  },

  aquarius: {
    title: 'Aquarius | The Aquarian identity blueprint',
    description:
      'Ash Shaw\u2019s Aquarian identity: independence, unconventional thinking, and why the water-bearer archetype fits a UV-painted festival nomad.',
  },

  bio: {
    title: 'Biography | From snails to psytrance \u2014 the full story',
    description:
      'The complete biography of Ash Shaw: from collecting snails in Paarl to UV makeup artist touring Berlin, Cape Town, and Koh Phangan.',
  },

  book: {
    title: 'The book project | This one time on acid',
    description:
      'Ash Shaw\u2019s memoir project \u201CThis one time on acid\u201D \u2014 stories from the psytrance dancefloor, ADHD revelations, and twenty years of festival life.',
  },

  cycling: {
    title: 'Cycling | Endurance on two wheels',
    description:
      'Ash Shaw\u2019s cycling life: loaded touring, 300km festival rides, and how endurance cycling became a creative and meditative practice.',
  },

  education: {
    title: 'Education | The unconventional classroom',
    description:
      'Ash Shaw\u2019s unconventional education: from Paarl Boys\u2019 High to self-taught WordPress, festival stages, and lifelong curiosity-driven learning.',
  },

  fitness: {
    title: 'Fitness | The moving body',
    description:
      'Ash Shaw\u2019s fitness journey: Muay Thai in Koh Phangan, triathlon training, cycling endurance, and why movement fuels creativity.',
  },

  lucy: {
    title: 'Lucy in the sky with diamonds | The experience that changed everything',
    description:
      'The story of Lucy \u2014 the psychedelic experience that rewired Ash Shaw\u2019s creative perspective and led to a lifetime of UV art on dancefloors.',
  },

  manifesto: {
    title: 'Manifesto | Creative principles & artistic philosophy',
    description:
      'Ash Shaw\u2019s creative manifesto: the principles, beliefs, and artistic philosophy guiding UV makeup art, festival life, and entrepreneurship.',
  },

  music: {
    title: 'Music | Psytrance & the 140 BPM heartbeat',
    description:
      'How psytrance music shapes Ash Shaw\u2019s creative identity. From darkpsy to forest, the 140 BPM heartbeat that drives UV art on the dancefloor.',
  },

  resources: {
    title: 'Resources | Getting started with UV makeup artistry',
    description:
      'A beginner\u2019s guide to UV face painting: essential kit, recommended brands, safety tips, and practice techniques from Ash Shaw\u2019s experience since 2019.',
  },

  partners: {
    title: 'Partners | People along the way',
    description:
      'The people who shaped Ash Shaw\u2019s journey: creative partners, festival collaborators, and the humans who made the art possible.',
  },

  podcast: {
    title: 'Podcast project | Behind the microphone',
    description:
      'Ash Shaw\u2019s podcast project: candid conversations about festival culture, ADHD, entrepreneurship, and the creative life.',
  },

  process: {
    title: 'Creative process | How the art gets made',
    description:
      'Ash Shaw\u2019s creative process: from concept to dancefloor. UV pigments, blacklight testing, festival preparation, and artistic workflow.',
  },

  travels: {
    title: 'Travels | The nomadic festival circuit',
    description:
      'Ash Shaw\u2019s travel map: Cape Town, Berlin, Koh Phangan, and international festivals. The nomadic circuit that fuels UV makeup artistry.',
  },

  tribes: {
    title: 'Tribes | The communities that shaped identity',
    description:
      'Five tribes that shaped Ash Shaw: psytrance, cycling, neurodivergent creatives, WordPress, and Muay Thai. Community is everything.',
  },

  accessibilityStatement: {
    title: 'Accessibility statement | Commitment to inclusive design',
    description:
      'Ash Shaw\u2019s accessibility statement: WCAG 2.1 Level AA compliance, inclusive design practices, and commitment to an accessible web experience.',
  },

  festivalLanding: {
    title: 'Next festival | Upcoming UV makeup appearances',
    description:
      'Find out where Ash Shaw will be painting next. Upcoming festival appearances, UV makeup sessions, and creative collaborations.',
  },
};