/**
 * @fileoverview LightSpeed sub-page data. Extracted from about-subpages.ts (T17).
 */
import type { AboutSubpageData } from './types';

export interface LightSpeedTeamMember { id: string; name: string; role: string; joined: string; }
export interface LightSpeedStat { id: string; label: string; value: string; }
export interface LightSpeedKeyPerson { id: string; name: string; narrative: string; }
export interface LightSpeedMilestone { id: string; year: string; event: string; }
export interface LightSpeedLesson { id: string; title: string; description: string; }

export interface LightSpeedPageData extends AboutSubpageData {
  pullQuote: string;
  stats: LightSpeedStat[];
  team: LightSpeedTeamMember[];
  barcampStory: { id: string; title: string; paragraphs: string[]; };
  keyPeople: LightSpeedKeyPerson[];
  companyMilestones: LightSpeedMilestone[];
  lessonsLearned: LightSpeedLesson[];
}

export var lightspeedPageData: LightSpeedPageData = {
  hero: {
    badge: 'LightSpeed',
    title: 'The day job',
    description: 'LightSpeedDevelopment \u2014 LSD for short. A WordPress agency founded in 2003 that bridges the gap between Ash\u2019s technical professional self and his creative festival self. 23 years of web development, design systems, and open-source community.',
  },
  breadcrumbs: [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'LightSpeed' },
  ],
  pullQuote: 'The acronym is LSD. The business started as IT support in 2003 and evolved into one of South Africa\u2019s most respected WordPress agencies. The same obsessive attention to detail that Ash brings to UV face painting, he brings to design systems.',
  stats: [
    { id: 'founded', label: 'Founded', value: '2003' },
    { id: 'team', label: 'Team size', value: '13' },
    { id: 'years', label: 'Years active', value: '23' },
    { id: 'stack', label: 'Core stack', value: 'WordPress' },
    { id: 'wordcamps', label: 'WordCamps', value: '20+' },
    { id: 'products', label: 'Products', value: 'LSX \u00b7 Tour Operator' },
    { id: 'speaker', label: 'Speaker', value: 'WCEU 2025' },
    { id: 'community', label: 'Community', value: 'Organiser \u00b7 Volunteer' },
    { id: 'remote', label: 'Work style', value: 'Hybrid / Remote' },
    { id: 'location', label: 'HQ', value: 'Cape Town' },
  ],
  team: [
    { id: 'ash', name: 'Ash Shaw', role: 'CEO, CTO, CMO, Content Strategist, Business Development & Mentor', joined: 'January 2003' },
    { id: 'warwick', name: 'Warwick Booth', role: 'Lead Developer', joined: 'December 2006' },
    { id: 'chris', name: 'Chris Vancoillie', role: 'Systems Administrator', joined: 'September 2009' },
    { id: 'barbara', name: 'Barbara Kerr', role: 'COO, CFO & HR', joined: '2010' },
    { id: 'justin', name: 'Justin Abrahamse', role: 'Frontend Developer, Online Marketing', joined: '2006\u20132009, rejoined 2020' },
    { id: 'lourens', name: 'Lourens Visser', role: 'Project Manager & Support Manager', joined: 'August 2021' },
    { id: 'adam', name: 'Adam Wale', role: 'Designer', joined: '2021 (part-time / freelance)' },
    { id: 'tibi', name: 'Tibi Buzdugan', role: 'Frontend & Backend Developer', joined: 'July 2023' },
    { id: 'zared', name: 'Zared Rogers', role: 'Web Designer & WordPress Developer', joined: 'August 2023' },
    { id: 'hugo', name: 'Hugo Gravito', role: 'Block Theme Developer Intern', joined: '15 August 2025' },
    { id: 'brandon', name: 'Brandon Marshall', role: 'Block Theme Developer Intern', joined: '25 August 2025' },
    { id: 'seren', name: 'Seren van der Merve', role: 'Block Theme Developer Intern', joined: '1 September 2025' },
    { id: 'jose', name: 'Jos\u00e9 Abreu', role: 'Block Theme & Block Developer', joined: 'Aug 2017\u2013Apr 2019, rejoined 5 Sep 2025' },
  ],
  barcampStory: {
    id: 'barcamp-story',
    title: 'BarCamp Cape Town 2006: the pivot',
    paragraphs: [
      'BarCamp was an unconference \u2014 no preset agenda, no keynote speakers, no hierarchy. Attendees showed up and created the programme on the morning of the event. Topics were written on Post-it notes and arranged on a whiteboard. If you wanted to talk about something, you claimed a slot.',
      'Dave Duarte was there. He gave an impassioned talk about this open-source CMS called WordPress and why it was going to change the web. Ash was running an IT support company and dabbling in web design. Something clicked. Not just the technology \u2014 the philosophy. Open source. Community-driven. Transparent. Accessible. These were the same values his parents had instilled.',
      'The people at that BarCamp didn\u2019t just introduce him to WordPress \u2014 they introduced him to a way of working and building that would define the next two decades. Dave Duarte, Jeremy Thurgood, and twenty-five others who became part of the extended LightSpeed network. Twenty-seven people at that event impacted his career in ways he\u2019s still discovering.',
    ],
  },
  keyPeople: [
    { id: 'warwick', name: 'Warwick Booth', narrative: 'Joined December 2006. Lead Developer. Nearly two decades of working together, building together, problem-solving together. Warwick is the technical backbone of LightSpeed. When Ash says "the right people change everything," Warwick is the first name he thinks of. He understood the vision from day one and has been instrumental in every major project since.' },
    { id: 'barbara', name: 'Barbara Kerr', narrative: 'Partner, COO/CFO/HR. Barbara and Ash built two businesses together \u2014 LightSpeed and Six Cats. She handles the operations, the finances, the human side of the business. Without Barbara, LightSpeed would be a very different company. She brought the structure that an ADHD brain needs but cannot create alone. Their partnership \u2014 personal and professional \u2014 is one of the most important relationships of his life.' },
    { id: 'jose-spotlight', name: 'Jos\u00e9 Abreu', narrative: 'The return story. Jos\u00e9 first joined in 2017, left after two years, and returned in September 2025. His comeback was seamless \u2014 as if he\u2019d never left. The fact that someone would choose to return to LightSpeed after experiencing other workplaces tells you everything about the culture they\u2019ve built.' },
  ],
  companyMilestones: [
    { id: 'ms-2003', year: '2003', event: 'Founded LightSpeed at age twenty-two. Initially an IT support company working from a spare bedroom in Cape Town.' },
    { id: 'ms-2005', year: '2005', event: 'Hired the first employee. The shift from solo operator to employer \u2014 one of the biggest psychological adjustments of the journey.' },
    { id: 'ms-2006', year: '2006', event: 'BarCamp Cape Town. Met Dave Duarte. WordPress pivot. Warwick Booth joined in December. Everything changed.' },
    { id: 'ms-2009', year: '2009', event: 'Chris Vancoillie joined. Another key addition that strengthened development capacity.' },
    { id: 'ms-2010', year: '2010', event: 'Barbara Kerr joined and became a partner. COO, CFO, and HR \u2014 the operational roles that brought structure to a creative company.' },
    { id: 'ms-2011', year: '2011\u20132012', event: 'Organised WordCamp Cape Town. Gave back to the community that gave them everything.' },
    { id: 'ms-2017', year: '2017\u20132019', event: 'Jos\u00e9 Abreu joined for his first period. A talented developer who brought fresh energy and perspective.' },
    { id: 'ms-2020', year: '2020', event: 'Justin Abrahamse rejoined. Having someone return after time away \u2014 it means the culture works.' },
    { id: 'ms-2021', year: '2021', event: 'Lourens Visser joined. The team continued to grow with people who shared the values.' },
    { id: 'ms-2023', year: '2023', event: 'Tibi Buzdugan and Zared Rogers joined. The team expanding into its strongest configuration.' },
    { id: 'ms-2025', year: '2025', event: 'Three interns selected from 450 LinkedIn applicants. Jos\u00e9 Abreu returned in September. WCEU Basel speaker.' },
    { id: 'ms-2026', year: '2026', event: 'Thirteen people. The most optimal team in twenty-three years.' },
  ],
  lessonsLearned: [
    { id: 'lesson-structure', title: 'Freedom requires structure', description: 'The most liberating thing you can build is a system that works without you. ADHD brains need structure to function, so they build the best structures \u2014 GitHub workflows, daily planning templates, curriculum frameworks.' },
    { id: 'lesson-people', title: 'The right people change everything', description: 'From Warwick in 2006 to the interns in 2025, every right hire shifted the trajectory. The wrong hires taught equally valuable lessons. Hiring is the single most impactful thing a founder does.' },
    { id: 'lesson-adhd', title: 'ADHD is an engine, not a handicap', description: 'The hyperfocus. The pattern recognition. The need to build systems to manage the chaos. The ability to context-switch between design, code, client strategy, and team management. These are features, not bugs.' },
    { id: 'lesson-art-biz', title: 'The business feeds the art, the art feeds the business', description: 'The same brain that builds WordPress design systems is the brain that designs neon faces at 3am on a dancefloor. LightSpeed has run profitably for twenty-three years because the entrepreneurial drive and the creative drive are the same thing.' },
    { id: 'lesson-autonomy', title: 'Autonomy is non-negotiable', description: 'The freedom given to the LightSpeed team mirrors the freedom Ash demands for himself. The company is the container that makes the rest possible \u2014 the Berlin summers, the Thailand bootcamps, the festival circuits, the art. LightSpeed is the financial engine that funds a life lived in full colour.' },
  ],
  sections: [
    { id: 'origin-story', title: 'The origin story (2003)', paragraphs: [
      'LightSpeed was founded in 2003 as an IT support company. Ash was 22, self-taught, and driven by the same relentless curiosity that would later define his art. Before LightSpeed, he\u2019d already cut his teeth as a bicycle courier at Peddlars, an IT support intern at DuxTel, a sysadmin at City Varsity, Qeo Wireless, and SynthaSite, and a Scrum Master at Media24. The company name \u2014 LightSpeedDevelopment, acronym LSD \u2014 was deliberate. If you know, you know.',
      'The pivot came after BarCamp Cape Town in 2006, where Ash met Dave Duarte, who inspired him to explore WordPress. Within months, Warwick Booth joined as lead developer, and LightSpeed transformed from IT support into a WordPress web development agency. That decision changed everything. The entrepreneurial drive came from his parents\u2019 values: honesty, hard work, dedication, good business ethics, and a good, honest set of morals.',
    ]},
    { id: 'wordpress-community', title: 'WordPress & the open source community', paragraphs: [
      'Ash didn\u2019t just use WordPress \u2014 he became part of the community. He organised WordCamp Cape Town in 2011 and 2012, spoke at WordCamp Europe 2025 in Basel, volunteered at WCEU 2024 in Torino, and attended over 20 WordCamp and WooConf events across four continents.',
      'The community provided mentorship, business opportunities, and lifelong friendships. The same networking instinct that connects people on a dancefloor connected Ash to the global WordPress ecosystem. From BarCamp 2006 to Basel 2025, every event opened doors.',
      'At WordCamp Europe 2025, Ash spoke about \u201cBridging Design and Development: Figma Design Systems for WordPress Success\u201d \u2014 the culmination of years building the LSX Design System, an open-source tool for designers and developers.',
    ]},
    { id: 'design-systems', title: 'Block-based themes & design systems', paragraphs: [
      'LightSpeed\u2019s flagship products include the LSX Design System \u2014 an open-source WordPress block theme design system built in Figma \u2014 and Tour Operator, a WordPress plugin suite for travel websites.',
      'The design system work reflects the same pattern-recognition that drives Ash\u2019s art: seeing connections between seemingly unrelated things, building systems that are both beautiful and functional, and obsessing over the details until everything clicks.',
      'The company publishes themes and plugins on WordPress.org, maintains comprehensive documentation, and contributes to the broader open-source community. It\u2019s the same ethos as the festival scene: share what you have, build together, lift each other up.',
    ]},
    { id: 'ai-workflows', title: 'AI workflows & modern publishing', paragraphs: [
      'LightSpeed has embraced AI-driven publishing workflows, integrating GitHub Copilot, Microsoft Learn courses, and advanced automation into the team\u2019s daily work. Ash doesn\u2019t just manage the AI transition \u2014 he mentors the entire team through it. Everyone at LightSpeed upskills together, learning in lockstep because that\u2019s how the culture works.',
      'The same ADHD hyperfocus that creates UV art on a dancefloor builds meticulously detailed workflows, internship curricula, GitHub contributing guidelines, and daily planning templates. Out of 450 applicants for the internship programme, only 3 made it through \u2014 because \u201ca will to learn\u201d is the number one hiring criterion. ADHD brains need structure to function, so they build the best structures.',
    ]},
    { id: 'day-night', title: 'What the day job teaches the night artist', paragraphs: [
      'The connection between LightSpeed and UV art isn\u2019t a stretch \u2014 it\u2019s the same brain applied to different canvases. Design systems teach composition and consistency. Project management teaches reading a room. Remote team leadership teaches trust. All of these transfer directly to the dancefloor.',
      'An ADHD founder literally cannot micromanage. Ash builds systems that run without constant oversight, hires people who thrive with freedom, and trusts the process. It\u2019s ADHD management style, accidentally revolutionary \u2014 and it works for both a WordPress agency and a festival art practice.',
      'LightSpeed runs profitably because of the lifestyle, not despite it. A founder who cycles 300 km to a psytrance festival with a 40 kg bike pack is not someone who lacks discipline \u2014 he channels it differently.',
    ]},
  ],
};