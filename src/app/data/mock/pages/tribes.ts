/**
 * @fileoverview Tribes page data — The communities that shaped a neon soul
 *
 * Content sourced from ebook Appendix B (pages 106-114).
 * 12 tribe entries across 3 categories: global, location-specific, and feature tribes.
 *
 * @version 1.0.0
 */

export interface Tribe {
  id: string;
  name: string;
  category: 'global' | 'location' | 'feature';
  narrative: string;
}

export interface TribesPageData {
  hero: {
    badge: string;
    title: string;
    description: string;
  };
  breadcrumbs: Array<{ label: string; href?: string }>;
  pullQuote: string;
  intro: string[];
  tribes: Tribe[];
  closingTitle: string;
  closingParagraphs: string[];
}

export var tribesPageData: TribesPageData = {
  hero: {
    badge: 'The tribes',
    title: 'Communities that shaped a neon soul',
    description:
      'We are the sum of our tribes. Not the families we\u2019re born into, but the communities we choose \u2014 the ones that recognise us before we recognise ourselves.',
  },
  breadcrumbs: [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'The tribes' },
  ],
  pullQuote:
    'No single tribe defines me. The intersection of all of them does. The overlap is the identity.',
  intro: [
    'These are the tribes that shaped Ash, held him, and gave him the freedom to become himself. Some are global networks spanning continents. Others are hyperlocal, defined by geography and a shared way of moving through the world.',
    'This page maps the tribes. The psytrance dancefloors. The WordPress community. The Berlin club scene. The trail runners, the cyclists, the festival freaks. These are not separate identities \u2014 they\u2019re overlapping frequencies that, when combined, create the person who wrote this story.',
  ],
  tribes: [
    /* ── Global Tribes ── */
    {
      id: 'psytrance',
      name: 'Psytrance / 140 BPM',
      category: 'global',
      narrative:
        'The first tribe. The dancefloor family that taught what it means to lose yourself and find yourself in the same breath. From Vortex 1999 to festivals across four continents, the psytrance scene is where Ash learned to dance, to connect, to create. Rolling basslines, UV lights, and a shared understanding that the dancefloor is a portal to something larger. The tribe that gave him his first costume, his first festival family, and eventually, his art form.',
    },
    {
      id: 'wordpress',
      name: 'WordPress community',
      category: 'global',
      narrative:
        'The professional tribe. BarCamp Cape Town 2006 was the gateway \u2014 Dave Duarte, Jeremy Thurgood, and a room full of open-source believers who showed that business and community don\u2019t have to be opposites. Twenty years of WordCamps across four continents. The Theme Review Team. The late-night discussions about design systems and block themes. This is the tribe that taught radical transparency, knowledge-sharing, and the power of building in public.',
    },
    {
      id: 'techno-house',
      name: 'Techno & house music scene',
      category: 'global',
      narrative:
        'The sonic evolution. While psytrance was the foundation, techno and house are the architecture of Ash\u2019s adult musical life. Pounding 4/4 rhythms, hypnotic repetition, and the understanding that electronic music is meditation in motion. From Cape Town\u2019s underground clubs to Berlin\u2019s legendary warehouses, this is the tribe that proved that dancing is a spiritual practice. The DJ booth is an altar. The dancefloor is a ceremony. The bass is the prayer.',
    },

    /* ── Location-Specific Tribes ── */
    {
      id: 'cape-town-psy',
      name: 'Cape Town psytrance scene',
      category: 'location',
      narrative:
        'Home base. Origin Festival. Alien Safari. The outdoor gatherings in the Boland mountains where it all started. This is where Ash learned to paint faces under UV light, where Six Cats Club was born, where the cycling tradition began. The Cape Town psytrance tribe is family \u2014 the ones who witnessed every evolution from Chicken Man to Cow Man to UV artist. The mountain backdrop, the Western Cape summer, the sunrise sets that turn into all-day sessions. This is where the roots grow deep.',
    },
    {
      id: 'berlin-clubs',
      name: 'Berlin club scene',
      category: 'location',
      narrative:
        'The laboratory. Sisyphos. Griessm\u00fchle (RIP). About Blank. The warehouses and basements where techno is religion and the door policy is a filter for energy, not status. The Berlin club scene taught that freedom isn\u2019t chaos \u2014 it\u2019s structure with the rules stripped away. The tribe here is neurodivergent creatives, DJs, visual artists, fire dancers, and festival freaks who understand that creativity isn\u2019t a career; it\u2019s a way of being. This is the tribe of misfits \u2014 the ones whose brains run on the same frequency.',
    },
    {
      id: 'cape-town-wp',
      name: 'Cape Town WordPress & tech community',
      category: 'location',
      narrative:
        'The professional home. LightSpeed\u2019s extended network. The organisers of WordCamp Cape Town. The developers, designers, and agency owners who meet for coffee at truth or Origin Coffee Roasting and talk shop until the espresso runs out. This tribe gave LightSpeed its first clients, its first collaborators, and a city-wide reputation for quality work. The overlap with the cycling and festival communities is significant \u2014 many of these people are multi-tribal.',
    },
    {
      id: 'trail-running',
      name: 'Trail running tribe',
      category: 'location',
      narrative:
        'The mountain people. Table Mountain. Lion\u2019s Head. The trails that wind through fynbos and granite. Trail running is meditation in motion, endurance as spiritual practice. The tribe here values grit, humility, and the understanding that the mountain teaches lessons you can\u2019t learn anywhere else. Early morning starts. Vertical climbs. The camaraderie at the summit. This tribe taught that strength is as much mental as physical.',
    },
    {
      id: 'mountain-biking',
      name: 'Mountain biking tribe',
      category: 'location',
      narrative:
        'The cyclists. The ones who understand that a loaded bike is freedom on two wheels. From racing days representing Western Province (1997\u20131999) to bike packing across continents, the mountain biking tribe taught self-sufficiency, resourcefulness, and the meditative power of pedalling. Munich to Amsterdam. 7,000+ kilometres across Thailand. The 300-kilometre birthday ride to Origin Festival. The bike is the vehicle. The road is the teacher.',
    },
    {
      id: 'triathlon',
      name: 'Triathlon tribe',
      category: 'location',
      narrative:
        'The multi-discipline warriors. Swim, bike, run \u2014 repeat. The triathlon tribe values balance, structure, and the cumulative effect of consistent training. Koh Phangan bootcamps. Thai heat and humidity. The discipline required to train three sports simultaneously while working remotely. This tribe taught that endurance isn\u2019t about one epic effort \u2014 it\u2019s about showing up every day and stacking small wins into transformation.',
    },

    /* ── Feature Tribes ── */
    {
      id: 'muay-thai-crew',
      name: 'Koh Phangan Muay Thai crew',
      category: 'feature',
      narrative:
        'Koh Phangan is not just a holiday destination. It\u2019s a training ground, a creative retreat, and a community that runs on a completely different clock. The Muay Thai crew \u2014 the fighters, the trainers, the people who show up at the gym every morning regardless of how the night before went \u2014 became one of the most important tribes. Training since 2019, with intensive seasons in 2023 and 2025. The island attracts a specific type of person: digital nomads, fighters, yogis, and creatives who have structured their lives around freedom and discipline in equal measure. The gym is the meeting point. Your body is your primary tool, and the tool needs maintenance.',
    },
    {
      id: 'lightspeed-tribe',
      name: 'LightSpeed: the longest tribe',
      category: 'feature',
      narrative:
        'Thirteen people. Twenty-three years. An extended family that builds websites, ships code, argues about design systems, and celebrates each other\u2019s victories. LightSpeed is not just a company \u2014 it\u2019s a tribe in the truest sense. Warwick has been here since 2006. Barbara since 2010. Jos\u00e9 left and came back. The interns are levelling up faster than anyone Ash has ever seen. This is a tribe that chose to be here \u2014 not because they couldn\u2019t find work elsewhere, but because the culture, the freedom, and the shared purpose of building excellent things together is worth more than a corporate salary.',
    },
    {
      id: 'cape-town-creative',
      name: 'Cape Town creative community',
      category: 'feature',
      narrative:
        'Cape Town\u2019s creative scene is a tribe unto itself. It\u2019s where the garden meets the gallery, where the tech community overlaps with the festival scene, where the cyclists and the dancers and the entrepreneurs share coffee shops and co-working spaces and sunset sessions on Signal Hill. Six Cats Cannabis Club is part of this community \u2014 the growers, the plant enthusiasts, the people who approach cannabis as a craft rather than a commodity. The mountain defines this city. Table Mountain is the backdrop to everything \u2014 the training runs, the sunset sessions, the late-night drives home from parties. Cape Town is where it started. Every other tribe leads back here eventually. This is the root system.',
    },
  ],
  closingTitle: 'The overlap is the identity',
  closingParagraphs: [
    'A map of belonging across six continents. The magic happens in the overlap. The WordPress developer who DJs psytrance sets. The trail runner who paints UV faces at festivals. The triathlete who codes during the week and dances all weekend. The Berlin club kid who runs a profitable agency from a laptop. The Muay Thai fighter who grows organic cannabis in a Cape Town garden.',
    'These tribes aren\u2019t separate \u2014 they\u2019re frequencies that, when layered, create something richer than any single identity. The psytrance dancefloor taught movement. The WordPress community taught building. The Berlin scene taught being unapologetically yourself. The endurance sports taught discipline. The mountain taught humility. The bicycle taught freedom. The Muay Thai gym taught presence. The LightSpeed team taught that the right people change everything.',
    'We are the sum of our tribes. And these are his.',
  ],
};
