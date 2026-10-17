/**
 * @fileoverview Comprehensive categorised timeline — single source of truth
 *
 * All milestones across Ash Shaw's life, each tagged with one or more
 * categories. Used by the History page (interactive hub) and by individual
 * about sub-pages (filtered contextual timelines).
 *
 * @module data/mock/timeline
 * @version 1.0.0
 */

export interface TimelineEntry {
  id: string;
  /** Display date (e.g., "July 2019", "1994", "December 1999") */
  date: string;
  /** ISO date for sorting (e.g., "2019-07-01") */
  sortDate: string;
  /** Sentence case title */
  title: string;
  /** 1–3 sentences */
  description: string;
  /** One or more category IDs */
  categories: string[];
  /** Phosphor icon name */
  icon?: string;
  /** Optional link to relevant page/post */
  link?: string;
  /** Visual weight */
  significance: 'major' | 'standard' | 'minor';
}

export interface TimelineCategory {
  id: string;
  label: string;
  /** Neon colour name for the Timeline component */
  colorAccent: string;
  /** Phosphor icon name */
  icon: string;
  /** Hex colour for legend */
  hex: string;
  /** Hex colour (alias used by TimelinePage) */
  neonColour: string;
}

export var timelineCategories: TimelineCategory[] = [
  { id: 'makeup', label: 'Makeup', colorAccent: 'pink', icon: 'PaintBrush', hex: '#FF10F0', neonColour: '#FF10F0' },
  { id: 'cycling', label: 'Cycling', colorAccent: 'green', icon: 'Bicycle', hex: '#39FF14', neonColour: '#39FF14' },
  { id: 'fitness', label: 'Fitness', colorAccent: 'cyan', icon: 'Heartbeat', hex: '#00F7FF', neonColour: '#00F7FF' },
  { id: 'music', label: 'Music', colorAccent: 'purple', icon: 'MusicNotes', hex: '#BE00FE', neonColour: '#BE00FE' },
  { id: 'travel', label: 'Travel', colorAccent: 'orange', icon: 'Airplane', hex: '#FF5F1F', neonColour: '#FF5F1F' },
  { id: 'lightspeed', label: 'LightSpeed', colorAccent: 'blue', icon: 'Code', hex: '#1F51FF', neonColour: '#1F51FF' },
  { id: 'education', label: 'Education', colorAccent: 'yellow', icon: 'GraduationCap', hex: '#FFFF00', neonColour: '#FFFF00' },
  { id: 'sixcats', label: 'Six Cats', colorAccent: 'green', icon: 'Leaf', hex: '#39FF14', neonColour: '#39FF14' },
  { id: 'berlin', label: 'Berlin', colorAccent: 'pink', icon: 'Buildings', hex: '#FF10F0', neonColour: '#FF10F0' },
  { id: 'adhd', label: 'ADHD', colorAccent: 'cyan', icon: 'Brain', hex: '#00F7FF', neonColour: '#00F7FF' },
  { id: 'personal', label: 'Personal', colorAccent: 'red', icon: 'User', hex: '#FF3131', neonColour: '#FF3131' },
  { id: 'book', label: 'Book', colorAccent: 'yellow', icon: 'BookOpen', hex: '#FFFF00', neonColour: '#FFFF00' },
];

/**
 * Alias for timelineCategories — used by TimelinePage
 */
export var timelineCategoryMeta = timelineCategories;

/**
 * Get timeline entries with significance === 'major'
 */
export function getMajorMilestones(): TimelineEntry[] {
  var result: TimelineEntry[] = [];
  for (var i = 0; i < allTimeline.length; i++) {
    if (allTimeline[i].significance === 'major') {
      result.push(allTimeline[i]);
    }
  }
  result.sort(function (a, b) {
    if (a.sortDate < b.sortDate) return -1;
    if (a.sortDate > b.sortDate) return 1;
    return 0;
  });
  return result;
}

/**
 * Get total count of all timeline entries
 */
export function getTimelineCount(): number {
  return allTimeline.length;
}

export var allTimeline: TimelineEntry[] = [
  /* ────────────── 1980s ────────────── */
  {
    id: 'tl-birth',
    date: '1981',
    sortDate: '1981-01-01',
    title: 'Born in Paarl, Western Cape',
    description: 'Ashley Shaw born in Paarl, a small town in the Cape Winelands. The Boland mountains and wide skies of the Western Cape would shape his early sense of space and freedom.',
    categories: ['personal'],
    significance: 'major',
  },
  {
    id: 'tl-junior-school',
    date: '1986',
    sortDate: '1986-01-15',
    title: 'Paarl Junior School',
    description: 'Started at Paarl Junior School. Miss Scott, his primary school teacher, planted the seeds of creativity that would bloom decades later.',
    categories: ['education', 'personal'],
    icon: 'GraduationCap',
    significance: 'standard',
  },
  /* ────────────── 1990s ────────────── */
  {
    id: 'tl-first-computer',
    date: '1993',
    sortDate: '1993-06-01',
    title: 'First computer: Windows 3.1',
    description: 'Got his first PC at age 12. Self-taught through DOS commands and early software. The start of a lifelong relationship with technology.',
    categories: ['education', 'lightspeed'],
    icon: 'Desktop',
    significance: 'standard',
  },
  {
    id: 'tl-boys-high',
    date: '1994',
    sortDate: '1994-01-15',
    title: 'Paarl Boys High',
    description: 'Started at Paarl Boys High School. Joined the mountain biking team and the infamous "2 o\'clock club" for after-school mischief.',
    categories: ['education', 'cycling'],
    icon: 'GraduationCap',
    significance: 'standard',
  },
  {
    id: 'tl-started-racing',
    date: '1994',
    sortDate: '1994-03-01',
    title: 'Started racing bicycles',
    description: 'First competitive mountain bike race. The adrenaline was immediate and addictive. This would become a lifelong identity.',
    categories: ['cycling'],
    icon: 'Bicycle',
    significance: 'major',
  },
  {
    id: 'tl-provincial-race',
    date: '1995',
    sortDate: '1995-06-01',
    title: 'First provincial mountain bike race',
    description: 'Competed at provincial level for the first time, testing himself against riders from across the Western Cape.',
    categories: ['cycling'],
    icon: 'Trophy',
    significance: 'standard',
  },
  {
    id: 'tl-wp-mtb-3rd',
    date: '1997',
    sortDate: '1997-09-01',
    title: 'WP MTB colours — 3rd overall',
    description: 'Earned Western Province mountain bike colours, finishing third overall in the provincial championship.',
    categories: ['cycling'],
    icon: 'Medal',
    significance: 'standard',
  },
  {
    id: 'tl-wp-mtb-champion',
    date: '1998',
    sortDate: '1998-09-01',
    title: 'WP MTB champion — 1st overall',
    description: 'Won the Western Province mountain bike championship outright. Matric year, 17 years old, and already a provincial champion.',
    categories: ['cycling'],
    icon: 'Trophy',
    significance: 'major',
  },
  {
    id: 'tl-daemelin',
    date: '1999',
    sortDate: '1999-01-15',
    title: 'Daemelin College — marketing studies',
    description: 'Enrolled at Daemelin College to study marketing while continuing competitive MTB racing at national level.',
    categories: ['education'],
    icon: 'GraduationCap',
    significance: 'standard',
  },
  {
    id: 'tl-first-vortex',
    date: 'December 1999',
    sortDate: '1999-12-15',
    title: 'First Vortex festival',
    description: 'Attended the December Vortex festival — a life-defining experience. The combination of psytrance, nature, and community rewired everything. This was the moment the dancefloor became a second home.',
    categories: ['music', 'personal'],
    icon: 'MusicNotes',
    significance: 'major',
    link: '/events/vortex',
  },
  /* ────────────── 2000s ────────────── */
  {
    id: 'tl-yoga-start',
    date: 'Early 2000s',
    sortDate: '2001-01-01',
    title: 'Started yoga practice',
    description: 'Began a consistent yoga practice that would become a cornerstone of his daily routine for the next two decades.',
    categories: ['fitness'],
    icon: 'Heartbeat',
    significance: 'standard',
  },
  {
    id: 'tl-solipse',
    date: 'June 2001',
    sortDate: '2001-06-21',
    title: 'Solipse solar eclipse festival, Zambia',
    description: 'An 86-hour bus journey from Cape Town to Zambia for a solar eclipse psytrance festival. A pilgrimage that tested everything and rewarded beyond imagination.',
    categories: ['music', 'travel'],
    icon: 'Sun',
    significance: 'major',
    link: '/events/solipse',
  },
  {
    id: 'tl-first-cats',
    date: '2003',
    sortDate: '2003-03-01',
    title: 'Adopted Bart and Lisa',
    description: 'The first two cats joined the household. Bart and Lisa — the beginning of the Six Cats family legacy.',
    categories: ['sixcats', 'personal'],
    icon: 'Cat',
    significance: 'standard',
  },
  {
    id: 'tl-lightspeed-founded',
    date: '2003',
    sortDate: '2003-06-01',
    title: 'Founded LightSpeed',
    description: 'Started LightSpeed as a one-man IT support company in Cape Town. The seed of what would become a WordPress agency serving clients worldwide.',
    categories: ['lightspeed'],
    icon: 'Rocket',
    significance: 'major',
  },
  {
    id: 'tl-first-thailand',
    date: '2005',
    sortDate: '2005-02-01',
    title: 'First Thailand trip — Koh Phangan',
    description: 'Met Mel Heinz in Koh Phangan on the first Thailand adventure. The island would eventually become a seasonal training base years later.',
    categories: ['travel'],
    icon: 'Airplane',
    significance: 'standard',
  },
  {
    id: 'tl-first-hire',
    date: '2005',
    sortDate: '2005-07-01',
    title: 'LightSpeed: first employee hired',
    description: 'Hired the first employee at LightSpeed, transitioning from freelancer to team lead.',
    categories: ['lightspeed'],
    significance: 'standard',
  },
  {
    id: 'tl-barcamp-wordpress',
    date: '2006',
    sortDate: '2006-09-01',
    title: 'BarCamp Cape Town — WordPress pivot',
    description: 'Attended BarCamp Cape Town and discovered WordPress. Pivoted LightSpeed from IT support to WordPress development. Warwick joined the team that same year.',
    categories: ['lightspeed', 'education'],
    icon: 'Code',
    significance: 'major',
  },
  {
    id: 'tl-trail-running',
    date: '2006',
    sortDate: '2006-04-01',
    title: 'Started trail running',
    description: 'Began running the mountain trails around Table Mountain and the Boland hills. A new discipline to complement the cycling.',
    categories: ['fitness'],
    icon: 'PersonSimpleRun',
    significance: 'standard',
  },
  {
    id: 'tl-media24',
    date: '2008',
    sortDate: '2008-01-01',
    title: 'Media24 — Scrum Master',
    description: 'Joined Media24 as a Scrum Master while running LightSpeed concurrently. Learned agile methodology at enterprise scale.',
    categories: ['lightspeed', 'education'],
    significance: 'standard',
  },
  {
    id: 'tl-chris-joined',
    date: '2009',
    sortDate: '2009-01-01',
    title: 'Chris joined LightSpeed',
    description: 'Chris became part of the growing LightSpeed team, strengthening the development capabilities.',
    categories: ['lightspeed'],
    significance: 'minor',
  },
  {
    id: 'tl-thailand-barbara',
    date: '2009',
    sortDate: '2009-11-01',
    title: 'Thailand with Barbara — 40th birthday',
    description: 'Returned to Thailand with Barbara for his 40th birthday. Deepened the connection with Southeast Asian culture.',
    categories: ['travel', 'personal'],
    significance: 'standard',
  },
  /* ────────────── 2010s ────────────── */
  {
    id: 'tl-triathlon-start',
    date: '2010',
    sortDate: '2010-03-01',
    title: 'Started triathlon training',
    description: 'Combined swimming, cycling, and running into triathlon training. Added a new dimension of endurance to an already athletic lifestyle.',
    categories: ['fitness'],
    icon: 'Heartbeat',
    significance: 'standard',
  },
  {
    id: 'tl-barbara-joined',
    date: '2010',
    sortDate: '2010-06-01',
    title: 'Barbara joined LightSpeed as partner',
    description: 'Barbara became a full partner at LightSpeed, bringing business development and client relationship expertise.',
    categories: ['lightspeed'],
    significance: 'standard',
  },
  {
    id: 'tl-wordcamp-ct',
    date: '2011',
    sortDate: '2011-10-01',
    title: 'Organised WordCamp Cape Town',
    description: 'Co-organised the first WordCamp Cape Town, bringing the WordPress community together in South Africa.',
    categories: ['lightspeed'],
    icon: 'UsersThree',
    significance: 'standard',
  },
  {
    id: 'tl-bikepacking-start',
    date: '2012',
    sortDate: '2012-03-01',
    title: 'Started bike packing',
    description: 'Transitioned from competitive MTB to loaded touring. The bicycle became a vehicle for adventure, not just racing.',
    categories: ['cycling'],
    icon: 'Bicycle',
    significance: 'standard',
  },
  {
    id: 'tl-california-bike',
    date: '2014',
    sortDate: '2014-06-01',
    title: '300km California bicycle trip',
    description: 'Rode 300km through California — Pacific coast roads, redwoods, and sunshine. One of the first major international bikepacking trips.',
    categories: ['cycling', 'travel'],
    icon: 'Bicycle',
    significance: 'standard',
  },
  {
    id: 'tl-riding-to-festivals',
    date: '2018',
    sortDate: '2018-02-01',
    title: 'Started riding to festivals',
    description: 'Combined the two passions: cycling and festivals. Started riding a loaded bike to outdoor dance events instead of driving.',
    categories: ['cycling', 'music'],
    icon: 'Bicycle',
    significance: 'standard',
  },
  {
    id: 'tl-berlin-move',
    date: 'May 2019',
    sortDate: '2019-05-01',
    title: 'First Berlin season',
    description: 'Moved to Berlin for the first seasonal visit. Open-air techno, Hasenheide park sessions, and the fairy lights bicycle. The city became a creative anchor.',
    categories: ['berlin', 'travel'],
    icon: 'Buildings',
    significance: 'major',
    link: '/about/berlin',
  },
  {
    id: 'tl-sixcats-founded',
    date: 'May 2019',
    sortDate: '2019-05-15',
    title: 'Founded Six Cats Cannabis Club',
    description: 'Established the Six Cats Cannabis Club in Woodstock, Cape Town. Named after the six cats. A community garden with cultivation rituals and green philosophy.',
    categories: ['sixcats'],
    icon: 'Leaf',
    significance: 'major',
    link: '/about/six-cats',
  },
  {
    id: 'tl-uv-paint-origin',
    date: 'July 2019',
    sortDate: '2019-07-01',
    title: 'First UV paint experience in Berlin',
    description: 'Picked up UV-reactive face paint at a Berlin psytrance gathering. The neon glowed under blacklight and something clicked. The final creative evolution had begun.',
    categories: ['makeup', 'berlin'],
    icon: 'PaintBrush',
    significance: 'major',
    link: '/about/journey',
  },
  {
    id: 'tl-muay-thai-start',
    date: 'September 2019',
    sortDate: '2019-09-01',
    title: 'Started Muay Thai in Koh Phangan',
    description: 'Began training Muay Thai at a gym in Koh Phangan during the first Thailand training season. Swimming also improved significantly in the island waters.',
    categories: ['fitness', 'travel'],
    icon: 'Heartbeat',
    significance: 'standard',
    link: '/about/fitness',
  },
  {
    id: 'tl-koh-phangan-base',
    date: 'September 2019',
    sortDate: '2019-09-15',
    title: 'Koh Phangan training base established',
    description: 'Koh Phangan became the annual Sep–Nov training base: Muay Thai, swimming, triathlon training, and remote WordPress work from the island.',
    categories: ['travel', 'fitness'],
    icon: 'MapPin',
    significance: 'standard',
  },
  /* ────────────── 2020s ────────────── */
  {
    id: 'tl-first-festival-gig',
    date: 'August 2020',
    sortDate: '2020-08-01',
    title: 'First festival painting gig',
    description: 'Painted faces for 12 hours straight at a local gathering in the Western Cape. The energy was electric. The dancefloor had become a canvas.',
    categories: ['makeup'],
    icon: 'PaintBrush',
    significance: 'major',
  },
  {
    id: 'tl-covid-lockdown',
    date: 'March 2020',
    sortDate: '2020-03-15',
    title: 'COVID lockdown in Cape Town',
    description: 'The world stopped. Festivals cancelled, borders closed, the dancefloor went silent. But the garden grew, the cats thrived, and the creative fire found new outlets.',
    categories: ['personal'],
    significance: 'standard',
  },
  {
    id: 'tl-lisa-passed',
    date: '2020',
    sortDate: '2020-10-01',
    title: 'Lisa passed (age 17)',
    description: 'Lisa, one of the original two cats, passed away at 17. A quiet, steady presence who had been there since the very beginning.',
    categories: ['sixcats', 'personal'],
    significance: 'standard',
  },
  {
    id: 'tl-justin-rejoined',
    date: '2020',
    sortDate: '2020-07-01',
    title: 'Justin rejoined LightSpeed',
    description: 'Justin returned to the LightSpeed team, adding senior development experience during a challenging year.',
    categories: ['lightspeed'],
    significance: 'minor',
  },
  {
    id: 'tl-origin-cycling',
    date: 'February 2020',
    sortDate: '2020-02-01',
    title: 'First cycling pilgrimage to Origin Festival',
    description: 'Rode a loaded bike to Origin Festival in the Cederberg for the first time. The pilgrimage tradition was born.',
    categories: ['cycling', 'music'],
    icon: 'Bicycle',
    significance: 'standard',
  },
  {
    id: 'tl-ambidextrous',
    date: '2021',
    sortDate: '2021-06-01',
    title: 'Started painting ambidextrously',
    description: 'Began training the left hand to paint alongside the right. Double the output on busy festival nights. A signature technique was developing.',
    categories: ['makeup'],
    icon: 'HandPalm',
    significance: 'standard',
  },
  {
    id: 'tl-lourens-adam',
    date: '2021',
    sortDate: '2021-03-01',
    title: 'Lourens and Adam joined LightSpeed',
    description: 'The team grew with Lourens and Adam, expanding capacity and diversifying skills.',
    categories: ['lightspeed'],
    significance: 'minor',
  },
  {
    id: 'tl-moe-passed',
    date: 'January 2022',
    sortDate: '2022-01-01',
    title: 'Moe passed; Bean rescued',
    description: 'Moe the cat passed away. Within weeks, Bean arrived as a rescue — life cycling on in the Woodstock garden.',
    categories: ['sixcats', 'personal'],
    significance: 'standard',
  },
  {
    id: 'tl-jeff-rescued',
    date: 'May 2022',
    sortDate: '2022-05-01',
    title: 'Jeff rescued',
    description: 'Jeff joined the Six Cats family — another rescue cat finding his way to Woodstock.',
    categories: ['sixcats'],
    significance: 'minor',
  },
  {
    id: 'tl-ozora-2022',
    date: 'August 2022',
    sortDate: '2022-08-01',
    title: 'Ozora Festival — international breakthrough',
    description: 'Painted over 50 unique UV designs at one of the world\'s largest psychedelic gatherings in Hungary. The international festival painting circuit was open.',
    categories: ['makeup', 'music', 'travel'],
    icon: 'Star',
    significance: 'major',
  },
  {
    id: 'tl-origin-resume',
    date: 'February 2022',
    sortDate: '2022-02-01',
    title: 'Origin cycling pilgrimage resumed',
    description: 'Post-COVID, the cycling pilgrimage to Origin Festival resumed. Loaded bike, Cederberg mountains, three days of festival painting.',
    categories: ['cycling', 'music'],
    icon: 'Bicycle',
    significance: 'standard',
  },
  {
    id: 'tl-tibi-zared',
    date: '2023',
    sortDate: '2023-01-01',
    title: 'Tibi and Zared joined LightSpeed',
    description: 'The LightSpeed team continued to grow with Tibi and Zared joining the roster.',
    categories: ['lightspeed'],
    significance: 'minor',
  },
  {
    id: 'tl-modem-2023',
    date: 'August 2023',
    sortDate: '2023-08-01',
    title: 'MoDem Festival — "Atomic Black" style defined',
    description: 'Showcased the "Atomic Black" high-contrast UV design style on main stage dancers at MoDem in Croatia. The signature aesthetic was crystallised.',
    categories: ['makeup', 'music'],
    icon: 'PaintBrush',
    significance: 'major',
  },
  {
    id: 'tl-lucy-passed',
    date: 'October 2023',
    sortDate: '2023-10-01',
    title: 'Lucy passed',
    description: 'Lucy the cat crossed the rainbow bridge. Named after the Beatles song, she was always the most mysterious of the Six Cats family.',
    categories: ['sixcats', 'personal'],
    significance: 'standard',
  },
  {
    id: 'tl-birthday-sash-ride',
    date: 'February 2023',
    sortDate: '2023-02-01',
    title: 'Birthday sash ride — Origin to Grabouw',
    description: 'Rode from Origin Festival wearing a birthday sash, pedalling through the Cederberg to Grabouw in celebration.',
    categories: ['cycling'],
    icon: 'Bicycle',
    significance: 'minor',
  },
  {
    id: 'tl-book-concept',
    date: 'January 2024',
    sortDate: '2024-01-01',
    title: 'Book concept born — "This one time..."',
    description: 'Started outlining "This one time..." — a memoir weaving together festivals, faces, bikes, and cats into 20 chapters of South African adventure.',
    categories: ['book'],
    icon: 'BookOpen',
    significance: 'major',
    link: '/ebook',
  },
  {
    id: 'tl-nog-inspiration',
    date: '2025',
    sortDate: '2025-01-01',
    title: 'Nation of Gondwana — UV design evolution',
    description: 'NOG in Brandenburg inspired a new chapter in UV design evolution. The friendliest festival in Germany pushed creative boundaries further.',
    categories: ['makeup', 'berlin', 'music'],
    significance: 'standard',
  },
  {
    id: 'tl-berlin-dancing',
    date: 'Summer 2025',
    sortDate: '2025-06-01',
    title: '900km danced in 8 weeks — Berlin record',
    description: 'An extraordinary Berlin summer: 900 kilometres of movement tracked across open-airs, clubs, and Hasenheide park sessions in just 8 weeks.',
    categories: ['fitness', 'berlin', 'music'],
    icon: 'Heartbeat',
    significance: 'standard',
  },
  {
    id: 'tl-wceu-basel',
    date: 'June 2025',
    sortDate: '2025-06-15',
    title: 'WordCamp Europe Basel — speaker',
    description: 'Spoke at WordCamp Europe in Basel, Switzerland. A proud moment for LightSpeed on the global WordPress stage.',
    categories: ['lightspeed'],
    icon: 'Microphone',
    significance: 'standard',
  },
  {
    id: 'tl-interns-2025',
    date: '2025',
    sortDate: '2025-02-01',
    title: 'LightSpeed: Hugo, Brandon, Seren interns',
    description: 'Three new interns joined LightSpeed — Hugo, Brandon, and Seren. Jose also rejoined the team. The agency was thriving.',
    categories: ['lightspeed'],
    significance: 'minor',
  },
  {
    id: 'tl-ai-workflow',
    date: '2025–2026',
    sortDate: '2025-09-01',
    title: 'AI workflow transformation at LightSpeed',
    description: 'LightSpeed embraced AI-assisted development workflows, integrating tools like Figma Make, Cursor, and Claude into the daily build process.',
    categories: ['lightspeed'],
    icon: 'Robot',
    significance: 'standard',
  },
  {
    id: 'tl-miss-scott-tribute',
    date: '2025',
    sortDate: '2025-04-01',
    title: 'Miss Scott tribute blog post',
    description: 'Published a tribute to Miss Scott, the Paarl Junior School teacher whose creative encouragement echoed through decades of artistic evolution.',
    categories: ['education', 'personal', 'book'],
    link: '/blog/miss-scott-teacher-who-started-everything',
    significance: 'standard',
  },
  {
    id: 'tl-origin-epic-ride',
    date: 'February 2026',
    sortDate: '2026-02-01',
    title: 'Epic 300km Origin birthday ride',
    description: '40kg pack, 3,200m of climbing, 300km through the Cederberg mountains to Origin Festival. The most ambitious cycling pilgrimage yet — a birthday tradition pushed to the limit.',
    categories: ['cycling'],
    icon: 'Bicycle',
    significance: 'major',
  },
  {
    id: 'tl-site-launch',
    date: 'February 2026',
    sortDate: '2026-02-15',
    title: 'Portfolio site launch',
    description: 'Launched the definitive digital home for the Ash Shaw brand — 79 pages, 21 Google Fonts, 33 neon palettes, WCAG AA accessible, and built entirely with Figma Make.',
    categories: ['personal', 'lightspeed'],
    icon: 'Globe',
    significance: 'major',
    link: '/',
  },
  {
    id: 'tl-adhd-understanding',
    date: '2024',
    sortDate: '2024-06-01',
    title: 'ADHD understanding deepened',
    description: 'A period of deeper self-understanding around ADHD. The hyperfocus that made festival painting possible, the restlessness that demanded movement, the creativity that thrived in chaos — it all made sense.',
    categories: ['adhd', 'personal'],
    icon: 'Brain',
    significance: 'standard',
    link: '/about/adhd',
  },
  {
    id: 'tl-munich-amsterdam',
    date: '2019',
    sortDate: '2019-08-01',
    title: 'Munich to Amsterdam — 1,000km in 10 days',
    description: 'An epic 1,000km bikepacking journey from Munich through the Alps and Netherlands to Amsterdam in just 10 days.',
    categories: ['cycling', 'travel'],
    icon: 'Bicycle',
    significance: 'standard',
  },
  {
    id: 'tl-hua-hin-phuket',
    date: '2019',
    sortDate: '2019-10-15',
    title: 'Hua Hin to Phuket — 900km in 6 days',
    description: 'Rode 900km down the Gulf of Thailand from Hua Hin to Phuket. Monsoon rains, roadside temples, and the open Thai highway.',
    categories: ['cycling', 'travel'],
    icon: 'Bicycle',
    significance: 'standard',
  },
];

/**
 * Get timeline entries filtered by category
 */
export function getTimelineByCategory(categoryId: string): TimelineEntry[] {
  var result: TimelineEntry[] = [];
  for (var i = 0; i < allTimeline.length; i++) {
    var entry = allTimeline[i];
    var cats = entry.categories;
    for (var c = 0; c < cats.length; c++) {
      if (cats[c] === categoryId) {
        result.push(entry);
        c = cats.length; /* exit inner loop */
      }
    }
  }
  /* Sort by sortDate */
  result.sort(function (a, b) {
    if (a.sortDate < b.sortDate) return -1;
    if (a.sortDate > b.sortDate) return 1;
    return 0;
  });
  return result;
}

/**
 * Get all timeline entries sorted chronologically
 */
export function getAllTimeline(): TimelineEntry[] {
  var sorted = allTimeline.slice();
  sorted.sort(function (a, b) {
    if (a.sortDate < b.sortDate) return -1;
    if (a.sortDate > b.sortDate) return 1;
    return 0;
  });
  return sorted;
}

/**
 * Get timeline entries within a date range
 */
export function getTimelineByDateRange(startDate: string, endDate: string): TimelineEntry[] {
  var result: TimelineEntry[] = [];
  for (var i = 0; i < allTimeline.length; i++) {
    var entry = allTimeline[i];
    if (entry.sortDate >= startDate && entry.sortDate <= endDate) {
      result.push(entry);
    }
  }
  result.sort(function (a, b) {
    if (a.sortDate < b.sortDate) return -1;
    if (a.sortDate > b.sortDate) return 1;
    return 0;
  });
  return result;
}

/**
 * Get a category by its ID
 */
export function getTimelineCategory(id: string): TimelineCategory | undefined {
  for (var i = 0; i < timelineCategories.length; i++) {
    if (timelineCategories[i].id === id) {
      return timelineCategories[i];
    }
  }
  return undefined;
}

/**
 * Convert timeline entries to the format expected by the Timeline component
 */
export function toTimelineEvents(entries: TimelineEntry[]): Array<{
  year: string;
  title: string;
  description: string;
  colorAccent?: string;
  href?: string;
  significance?: string;
}> {
  var events = [];
  for (var i = 0; i < entries.length; i++) {
    var entry = entries[i];
    /* Get the primary category colour */
    var primaryCat = entry.categories[0];
    var catData = getTimelineCategory(primaryCat);
    var accent = catData ? catData.colorAccent : 'pink';

    events.push({
      year: entry.date,
      title: entry.title,
      description: entry.description,
      colorAccent: accent,
      href: entry.link,
      significance: entry.significance,
    });
  }
  return events;
}