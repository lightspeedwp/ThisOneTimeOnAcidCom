/**
 * @fileoverview Education sub-page data. Extracted from about-subpages.ts (T17).
 */
import type { AboutSubpageData } from './types';

export interface EducationEntry { id: string; year: string; institution: string; qualification: string; description: string; }
export interface EducationStat { id: string; label: string; value: string; }

export interface EducationPageData extends AboutSubpageData {
  pullQuote: string;
  stats: EducationStat[];
  formalEducation: EducationEntry[];
}

export var educationPageData: EducationPageData = {
  hero: {
    badge: 'Education',
    title: 'The unconventional classroom',
    description: 'From Paarl Boys High to self-taught web developer, from BarCamp to WordCamp Europe keynote. Ash\u2019s educational journey proves that the most transformative classrooms don\u2019t have walls.',
  },
  breadcrumbs: [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Education' },
  ],
  pullQuote: 'Formal education failed his ADHD brain. Self-directed learning succeeded. Therefore, at LightSpeed: \u201ca will to learn\u201d is the number one hiring criterion.',
  stats: [
    { id: 'matric', label: 'Matric', value: 'Age 17' },
    { id: 'school', label: 'School', value: 'Paarl Boys High' },
    { id: 'formal-end', label: 'Last formal', value: '1999' },
    { id: 'self-taught', label: 'Self-Taught Since', value: '2000' },
    { id: 'certs', label: 'Certifications', value: '5+' },
    { id: 'wordpress', label: 'WordPress Since', value: '2006' },
    { id: 'speaking', label: 'Conference speaker', value: 'WCEU 2025' },
    { id: 'mentoring', label: 'Mentoring', value: 'Active' },
    { id: 'ai', label: 'AI Integration', value: 'Since 2024' },
    { id: 'festival-edu', label: 'Festival classroom', value: '25+ years' },
  ],
  formalEducation: [
    { id: 'edu-school', year: '1986\u20131998', institution: 'Paarl Junior School \u2192 Paarl Boys High', qualification: 'Matric (finished at age 17)', description: 'Grew up in Paarl, Western Cape, South Africa. ADHD was undiagnosed \u2014 the school system wasn\u2019t designed for brains like his. The sports field was where he thrived: Western Province mountain bike colours in 1997 (3rd), 1998 (1st \u2014 champion), and 1999 (3rd).' },
    { id: 'edu-daemelin', year: '1999', institution: 'Daemelin College', qualification: 'Marketing', description: 'Studied marketing while training extensively for the Western Province and South African mountain bike championships. The same year as the first Vortex festivals that would redirect the course of his entire life.' },
    { id: 'edu-mcse', year: '1999\u20132006', institution: 'Microsoft Self-Study', qualification: 'MCSE Curriculum (NT 4.0, 2000, 2003)', description: 'Self-studied the MCSE curriculum while doing freelance IT work. Windows NT 4.0, then 2000, then 2003 Server. Also completed Microsoft Operations Framework Essentials.' },
    { id: 'edu-cityvarsity', year: '2002', institution: 'City Varsity', qualification: 'Advanced Web Design', description: 'Programming fundamentals, HTML, CSS, XML, PHP, SQL, MySQL, JavaScript, database connectivity, and e-Commerce site creation using PHP.' },
    { id: 'edu-apple', year: '2006', institution: 'Core Group \u2014 Apple Training', qualification: 'Mac OS X Support Essentials', description: 'Three-day hands-on course covering installation, file systems, permissions, networking, peripherals, printing, and troubleshooting.' },
    { id: 'edu-lpi', year: '2006\u20132008', institution: 'LPI Institute', qualification: 'Linux IT Professional Certification (Levels 1\u20133)', description: 'Linux System Administration certification \u2014 Levels 1, 2, and 3. Still the foundation of LightSpeed\u2019s hosting infrastructure on Ubuntu today.' },
    { id: 'edu-webpr', year: '2007', institution: 'Quirk Education', qualification: 'WebPR+ Online Reputation Management', description: 'Online reputation management, content strategies, and PR for Web 2.0 \u2014 strengthening company presence and building brands online.' },
  ],
  sections: [
    { id: 'formal-short', title: 'Formal education (the short version)', paragraphs: [
      'Ash attended school in Paarl, Western Cape, South Africa from preschool through to the end of high school. Paarl Junior School from 1986, then Paarl Boys High from 1994, finishing Matric at age 17 in 1998. Before school even began, the signs were there: hours alone in his room building intricate Lego systems \u2014 towers, complex multi-level structures spanning an entire bookshelf, with systems for the Lego men to move between levels. The ADHD hyperfocus and the creative engineering mind were already emerging.',
      'At age 12\u201313, his dad gave him a gold computer. He taught himself to install Windows 3.1 from twelve stiffy discs, then taught himself to strip the machine and put it back together. His friend Ron helped him troubleshoot hardware problems. The self-taught tech journey started right there. At Paarl Junior School, Miss Scott saw the potential in him \u2014 she first taught him in Standard 1, then again in Standard 3, 4, and 5. In a system that didn\u2019t know how to handle his ADHD brain, she was the teacher who recognised what was there and encouraged it.',
      'While the classroom was a struggle, the sports field was where he thrived. Racing bicycles since 1994, representing Western Province in cross-country mountain biking by 1995, winning provincial colours by 1997. Known as the \u201c2 o\u2019clock club\u201d because at 2pm he went home \u2014 to train on his bicycle. He was also bullied as a kid because he was small. One particularly painful memory: being made to stand on stage and apologise to the entire school for not knowing the inter-school songs.',
      'After one year at Daemelin College studying marketing in 1999, formal education ended. The same year, the first Vortex festival happened \u2014 and the real education began. In Standard 9 and 10 he\u2019d worked at a coffee shop in Tyger Valley on Sundays for extra cash. He grew up speaking Afrikaans fluently in an Afrikaans town \u2014 still speaks it fluently today.',
    ]},
    { id: 'self-taught', title: 'The self-taught developer', paragraphs: [
      'Everything Ash knows about web development, design, and business management was self-taught. From HTML and CSS in the early 2000s to WordPress block-based themes and AI-powered editorial workflows today \u2014 all learned by doing, not by degree.',
      'He studied Microsoft certifications while doing freelance IT work, completed Apple training and Linux professional certification, and attended City Varsity for advanced web design. But the real learning happened on the job \u2014 building LightSpeed from a one-person IT support operation into a 13-person WordPress agency.',
      'This approach shapes LightSpeed\u2019s hiring philosophy: \u201ca will to learn\u201d is the number one criterion. Past experience can mean bad habits; fresh minds with drive are preferred. Out of 450 applicants for the internship programme, only 2 made it through.',
    ]},
    { id: 'festival-education', title: 'Festival as education', paragraphs: [
      'The dancefloor became the classroom where everything made sense. ADHD brains learn by immersion, by doing, by feeling \u2014 not by sitting in rows. Psytrance culture taught community building, creative risk-taking, ego dissolution, and pattern recognition across altered states.',
      'The 86-hour bus ride to the Zambian solar eclipse festival in 2001 taught more about resilience, connection, and perspective than any formal programme. The international festival circuit from Cape Town to Berlin to Thailand taught cultural adaptation, logistical problem-solving, and the art of carrying only what matters.',
    ]},
    { id: 'teaching-others', title: 'Teaching others', paragraphs: [
      'Ash\u2019s educational philosophy comes full circle in how he leads LightSpeed. The internship programme he built is modelled on self-directed learning: structured enough to provide direction, free enough to allow individual exploration.',
      'He organises WordPress meetups, speaks at WordCamp conferences, contributes to open-source projects, and mentors his team through daily collaboration. At WordCamp Europe 2025 in Basel, he presented on bridging design and development with Figma design systems for WordPress.',
    ]},
    { id: 'younger-self', title: 'What he\u2019d tell his younger self', paragraphs: [
      'The ADHD isn\u2019t broken. The school system is. Find the environments that match your brain \u2014 the dancefloor, the bicycle, the festival campsite, the code editor \u2014 and pour everything into those. The rest will sort itself out.',
      'The network matters more than the degree. BarCamp 2006 led to WordPress. WordPress led to WordCamp. WordCamp led to a global community that opened every door. Show up, share what you know, and the right people will find you.',
    ]},
  ],
};
