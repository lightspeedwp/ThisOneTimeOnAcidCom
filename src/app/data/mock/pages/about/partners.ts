/**
 * @fileoverview Partners sub-page data. Extracted from about-subpages.ts (T17).
 */
import type { AboutSubpageData } from './types';

export interface PartnersPageData extends AboutSubpageData { pullQuote: string; }

export var partnersPageData: PartnersPageData = {
  hero: {
    badge: 'Partners',
    title: 'The people along the way',
    description: 'The significant relationships that shaped Ash \u2014 romantic partners, creative collaborators, chosen family. Not a dating history. A gratitude page.',
  },
  breadcrumbs: [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Partners' },
  ],
  pullQuote: 'The heart loves what the heart loves. Every significant relationship in Ash\u2019s life was forged on the dancefloor, in festival conditions, in moments of shared intensity \u2014 on the trance floor, at 3am, in the glow of UV light.',
  sections: [
    { id: 'dancefloor-connections', title: 'The ones who changed everything', paragraphs: [
      'The significant relationships in Ash\u2019s life share a common thread: they were all forged on the dancefloor. Front left speaker at a December Vortex festival. A shared drop at Sisyphos in Berlin. The pattern is consistent \u2014 real connection happens when the music is right, the ego dissolves, and two people meet each other without pretence.',
      'Barbara Kerr has been one of the most important people in Ash\u2019s life. They went through every chapter of the story together \u2014 including the 86-hour bus to the Zambian solar eclipse that sealed their unity. They still live together in Cape Town and run two businesses as partners: LightSpeed, their software company, and Six Cats, their cannabis club. They separated amicably, and finding clear boundaries was essential for maintaining the friendship and partnerships. Barbara is one of Ash\u2019s best friends, if not his best friend \u2014 he\u2019s made every effort to resolve any issues and discuss clear boundaries for things that don\u2019t work. That\u2019s not a failure of relationships \u2014 it\u2019s the highest possible outcome: love that transforms rather than diminishes.',
      'They met at the December Vortex in 2000, connected deeply on the dancefloor immediately, went to the Zambian solar eclipse festival together, and built both a life and a business side by side. She joined LightSpeed in 2010 and became a partner. Today, they remain best friends and business partners in two companies \u2014 proof that love can evolve into something even more valuable when it\u2019s built on genuine respect.',
      'Aixa Reynosa entered Ash\u2019s world at Sisyphos in Berlin \u2014 \u201clove at first drop,\u201d as they tell it. They chased each other around the world for a while, connected through shared creativity and shared dancefloors. Though the romantic chapter eventually closed, they remain friends. As a dear friend once said: the heart loves what the heart loves.',
    ]},
    { id: 'creative-collaborators', title: 'Creative collaborators', paragraphs: [
      'Ash\u2019s creative world extends far beyond romantic relationships. The festival community is built on collaboration \u2014 DJs who provide the soundtrack, visual artists who build the environments, fire dancers who add the spectacle, sound engineers who make it all work.',
      'Warwick Booth, LightSpeed\u2019s lead developer, joined in December 2006 and has been by Ash\u2019s side for nearly two decades of web development. The professional partnership is as significant as any personal one \u2014 built on trust, shared values, and the kind of mutual respect that only comes from years of working through challenges together.',
      'The LightSpeed team itself is a chosen family. Thirteen people who believe in the same values: freedom, quality, continuous learning, and the idea that work should serve life, not the other way around.',
    ]},
    { id: 'festival-family', title: 'The festival family', paragraphs: [
      'The people met at the Solipse solar eclipse festival in Zambia in 2001 are still friends and a part of Ash\u2019s life today. Three weeks in the bush, three border crossings, 3.5 minutes of totality, and a lifetime of connection. The festival family doesn\u2019t require frequent contact \u2014 you pick up where you left off, every time.',
      'From the Cape Town psytrance scene of the early 2000s to Berlin\u2019s underground clubs to Thai island gatherings, the same people keep appearing. The dancefloor selects for a type: present, sincere, ready to share energy without agenda.',
      'These are the people who understand that creativity isn\u2019t a career, it\u2019s a way of being. The people who get on an 86-hour bus to Zambia, who cycle 300 km to Origin Festival, who paint their faces at 3am because the music and the moment demand it. The chosen family.',
    ]},
    { id: 'gratitude', title: 'Gratitude', paragraphs: [
      'Every person mentioned on this page made Ash who he is. The partners who shared the journey. The collaborators who built alongside him. The festival family who showed up, time after time, with nothing but energy and sincerity.',
      'Barbara is one of Ash\u2019s best friends and a business partner in two businesses. That\u2019s not a failure of relationships \u2014 it\u2019s the highest possible outcome. Love that transforms rather than diminishes.',
      'This page exists not to catalogue relationships, but to honour them. Every connection, every dancefloor meeting, every shared sunrise \u2014 they\u2019re all part of the story. And the story continues.',
    ]},
  ],
};
