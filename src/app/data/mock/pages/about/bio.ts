/**
 * @fileoverview Bio sub-page data. Extracted from about-subpages.ts (T17).
 */
import type { AboutSubpageData } from './types';

export interface BioFact { id: string; label: string; value: string; }

export interface BioPageData extends AboutSubpageData { quickFacts: BioFact[]; }

export var bioPageData: BioPageData = {
  hero: {
    badge: 'Biography',
    title: 'Ash Shaw',
    description: 'Male \u00B7 He/Him \u00B7 Cape Town-based \u00B7 South African-born \u00B7 Neon & UV makeup artist \u00B7 Cyclist \u00B7 Aquarius \u00B7 ADHD creative \u00B7 Festival soul.',
  },
  breadcrumbs: [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Bio' },
  ],
  quickFacts: [
    { id: 'name', label: 'Name', value: 'Ash Shaw' },
    { id: 'pronouns', label: 'Pronouns', value: 'He / Him' },
    { id: 'born', label: 'Born', value: 'South Africa' },
    { id: 'based', label: 'Based', value: 'Cape Town (Woodstock) \u00B7 Berlin (May) \u00B7 Koh Phangan (Sep\u2013Nov)' },
    { id: 'sign', label: 'Star sign', value: 'Aquarius' },
    { id: 'neurotype', label: 'Neurotype', value: 'ADHD' },
    { id: 'art', label: 'Art form', value: 'Neon & UV Makeup' },
    { id: 'transport', label: 'Transport', value: 'Bicycle \u2014 always' },
    { id: 'since', label: 'Painting since', value: 'July 2019' },
    { id: 'festivals', label: 'Festival circuit', value: 'Psytrance & Techno' },
  ],
  sections: [
    {
      id: 'origin',
      title: 'Where it all began',
      paragraphs: [
        'Ash Shaw grew up in South Africa with an insatiable curiosity about colour, sound, and the spaces where humans let go of pretence. He wasn\u2019t drawn to traditional art paths \u2014 he was drawn to chaos, to movement, to the feeling of a bass drop at 3am.',
        'Cape Town is his permanent home base. In 2019 he discovered Berlin \u2014 a city where the raw creative energy matched the frequency his brain had always operated on. What started as a spontaneous face-painting session at a park gathering in July 2019 turned into a full artistic identity.',
      ],
    },
    {
      id: 'identity',
      title: 'The guy with the bike',
      paragraphs: [
        'If you\u2019ve been to a psytrance festival in Europe and seen a guy cycling in covered in fairy lights and carrying a box of UV paints \u2014 that\u2019s Ash. He\u2019s cycled hundreds of kilometres to reach festivals, arriving dusty and grinning.',
        'His identity as an artist is inseparable from his identity as a cyclist, a festival-goer, and an unapologetically neurodiverse creative. He doesn\u2019t separate art from life because for him they were never separate to begin with.',
      ],
    },
    {
      id: 'now',
      title: 'What he does now',
      paragraphs: [
        'Ash creates spontaneous neon and UV makeup art at festivals and events across Berlin and the international psytrance circuit. His work is strictly a personal art project \u2014 no commercial bookings, no bridal, no corporate. Just pure creative expression on the dancefloor.',
        'He\u2019s also writing a book, building this portfolio site as a creative coding project, and continuing to explore the intersection of altered states, neurodivergence, and visual art.',
      ],
    },
    {
      id: 'life-designed',
      title: 'A life designed on purpose',
      paragraphs: [
        'Ash\u2019s year follows the festivals and the seasons. Cape Town summers (November\u2013March) at his home base in Woodstock, running LightSpeed remotely and cycling to festivals like Origin. Berlin in May for the techno season \u2014 open-airs in Hasenheide Park, nights in Friedrichshain, cycling to festivals across Germany, Czech Republic, and Austria. Then back to South Africa in August-September to swap bicycles and gear before heading to Koh Phangan, Thailand (September\u2013November) for Muay Thai training, triathlon, island psytrance parties, and remote work in paradise. Finally returning to Cape Town in November for the South African summer festival season.',
        'This isn\u2019t escapism. It\u2019s alignment. When your work, sport, art, and social life are all pulling in the same direction, you don\u2019t need work-life balance \u2014 you have work-life integration. The makeup painted on the Berlin dancefloor informs the design systems built for WordPress clients. The endurance from cycling to festivals translates to the endurance needed to run a business for 23 years. The discipline of Muay Thai training mirrors the discipline of mentoring a team through an AI transformation. Everything feeds everything.',
      ],
    },
    {
      id: 'legacy',
      title: 'What they remember',
      paragraphs: [
        'In makeup: People thank him years later. Someone he hadn\u2019t seen in two years came up to him \u2014 he\u2019d done their makeup two years prior. That day they felt extremely special; everyone kept complimenting them and it made their day. They still remembered. That\u2019s the legacy he wants to leave: making people feel seen, special, transformed.',
        'In WordPress: He\u2019ll be remembered as the crazy South African in the WordPress community \u2014 but definitely as a passionate contributor. From organising WordCamp Cape Town in 2011 and 2012 to speaking at WordCamp Europe 2025 in Basel, from BarCamp 2006 where he discovered WordPress to mentoring a team of 13 through an AI transformation \u2014 the commitment to open source, community, and building together has been consistent for two decades.',
      ],
    },
  ],
};