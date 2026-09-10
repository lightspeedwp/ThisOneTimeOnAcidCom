/**
 * @fileoverview FAQ Section Data
 * Page-specific and global FAQ groups
 *
 * Content reflects personal art project identity:
 * - He/him pronouns for Ash
 * - Cape Town-based, seasonal Berlin visits, international festivals
 * - Non-commercial, personal art project
 *
 * @module data/mock/sections/faq
 * @version 2.0.0 - Page-specific FAQ groups
 */

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface FaqGroup {
  pageId: string;
  title: string;
  description: string;
  faqs: FaqItem[];
}

/**
 * Default / global FAQ data (used when no pageId is specified)
 */
export const faqData: FaqItem[] = [
  {
    id: 'collaborations',
    question: "Does Ash collaborate with festivals?",
    answer: "Absolutely! While his roots are in spontaneous dancefloor artistry, he loves connecting with festival organisers and fellow artists. If you'd like him to bring his neon energy to your event, reach out through the contact page."
  },
  {
    id: 'style',
    question: "What is Ash's signature style?",
    answer: "His style is 'Neon vs Atomic Black'. He specialises in high-contrast UV makeup that pops under blacklight, featuring geometric tribal patterns, third-eye designs, and vibrant colour harmonies inspired by psytrance culture."
  },
  {
    id: 'speed',
    question: "Does he work fast?",
    answer: "Festival energy moves fast, and so does he. Ash has trained himself to be ambidextrous, allowing him to paint with flow and precision even in crowded environments without you missing a beat of the music."
  },
  {
    id: 'process',
    question: "How does the spontaneous process work?",
    answer: "If you see him on the dancefloor with his kit, just ask! He intuitively analyses your features and chooses complementary neon colours to make you glow. All he asks for in return is a smile and a photo to capture the memory."
  },
  {
    id: 'products',
    question: "What products does he use?",
    answer: "He uses professional-grade, skin-safe UV reactive paints and pigments that are designed to last through sweat and dancing. His kit is curated for high-impact glow and durability in tropical and club environments."
  },
  {
    id: 'location',
    question: "Where can you find Ash?",
    answer: "He follows the sun and the sound. He's based in Cape Town, South Africa, and travels annually to Berlin (May), Thailand (Sep-Nov for Muay Thai and triathlon training), and international festivals across Europe and Asia. Check his social media to see where he is right now!"
  }
];

/**
 * Page-specific FAQ groups
 * Each page gets 3 contextual FAQs tailored to its content
 */
export const pageFaqGroups: FaqGroup[] = [
  {
    pageId: 'home',
    title: 'Frequently asked questions',
    description: 'Quick answers about this site and Ash\'s work.',
    faqs: [
      {
        id: 'home-what-is',
        question: "What is this site?",
        answer: "This is Ash Shaw's personal art portfolio — a non-commercial showcase of UV and neon makeup artistry, festival photography, tutorials, and creative projects. It's a passion project, not a business."
      },
      {
        id: 'home-who',
        question: "Who is Ash Shaw?",
        answer: "Ash is a Cape Town-based makeup artist who specialises in UV-reactive and neon face art for psytrance festivals and club events. He travels internationally to Berlin (seasonal May visits), Thailand (Sep-Nov), and festivals worldwide, bringing colour and energy to dancefloors across the globe."
      },
      {
        id: 'home-contact',
        question: "How can I get in touch?",
        answer: "Head to the Contact page to send a message. Ash is open to collaborations, festival partnerships, and creative projects — but this is a personal art project, not a commercial service."
      },
    ],
  },
  {
    pageId: 'about',
    title: 'About — FAQ',
    description: 'More about Ash\'s journey and approach.',
    faqs: [
      {
        id: 'about-based',
        question: "Where is Ash based?",
        answer: "Ash is based in Cape Town, South Africa, where he owns a house in Woodstock. He travels annually to Berlin in May, then to Koh Phangan, Thailand (Sep-Nov) for training and remote work, before returning to South Africa for summer festival season. This yearly cycle fuels his creative energy and artistic inspiration."
      },
      {
        id: 'about-festivals',
        question: "What festivals does he attend?",
        answer: "He regularly works at psytrance festivals including Shankra (Switzerland), Reiserfieber (Switzerland), and various gatherings across Thailand. He also paints at Berlin club events and techno parties."
      },
      {
        id: 'about-commissions',
        question: "Does he do commissions?",
        answer: "This is a personal art project, so he doesn't offer commercial makeup services. However, he's always open to creative collaborations and festival partnerships — reach out through the contact page."
      },
    ],
  },
  {
    pageId: 'portfolio',
    title: 'Portfolio — FAQ',
    description: 'Questions about the work shown here.',
    faqs: [
      {
        id: 'portfolio-use-images',
        question: "Can I use your images?",
        answer: "All images are Ash's personal work and are shared for inspiration. If you'd like to feature any of his work, please get in touch first. Credit is always appreciated."
      },
      {
        id: 'portfolio-camera',
        question: "What camera does he use?",
        answer: "Most festival shots are taken on a smartphone — proving that great art doesn't need expensive gear. Some studio-style shots use a DSLR with UV lighting rigs."
      },
      {
        id: 'portfolio-featured',
        question: "How do I get featured?",
        answer: "If Ash paints your face at a festival and you're happy with the result, he'll snap a photo. The best shots end up in the portfolio. Just say yes to the camera!"
      },
    ],
  },
  {
    pageId: 'blog',
    title: 'Blog — FAQ',
    description: 'About the Insights blog.',
    faqs: [
      {
        id: 'blog-frequency',
        question: "How often does he post?",
        answer: "New posts appear whenever inspiration strikes — usually after a festival trip, a new technique discovery, or a product test. There's no fixed schedule; quality over quantity."
      },
      {
        id: 'blog-guest',
        question: "Can I guest post?",
        answer: "Ash is open to guest contributions from fellow artists, festival photographers, and creative collaborators. Reach out through the contact page with your idea."
      },
      {
        id: 'blog-reviews',
        question: "Does he accept product reviews?",
        answer: "He occasionally reviews UV paints and festival-grade cosmetics, but only products he genuinely uses. This is a personal project — no paid or sponsored reviews."
      },
    ],
  },
  {
    pageId: 'videos',
    title: 'Videos — FAQ',
    description: 'About the video content.',
    faqs: [
      {
        id: 'videos-software',
        question: "What editing software does he use?",
        answer: "Videos are edited using a mix of DaVinci Resolve for colour grading and AI-powered tools for animations. The psytrance sticker animations use generative AI motion pipelines."
      },
      {
        id: 'videos-collab',
        question: "Can I collaborate on a video?",
        answer: "Absolutely! Ash is always interested in creative video collaborations — especially festival documentation, UV makeup tutorials, and experimental visual art. Get in touch via the contact page."
      },
      {
        id: 'videos-more',
        question: "Where can I watch more?",
        answer: "Follow Ash on YouTube and Instagram for the latest video content. More tutorial and behind-the-scenes content is in the works."
      },
    ],
  },
  {
    pageId: 'podcasts',
    title: 'Podcasts — FAQ',
    description: 'About the podcast.',
    faqs: [
      {
        id: 'podcasts-subscribe',
        question: "How do I subscribe?",
        answer: "The podcast is currently available on this site. Podcast platform distribution (Spotify, Apple Podcasts) is planned for the future. Bookmark this page to stay updated."
      },
      {
        id: 'podcasts-guest',
        question: "Can I be a guest?",
        answer: "Yes! Ash is looking for fellow artists, festival organisers, and creative minds to chat with. If you have a story to share, reach out through the contact page."
      },
      {
        id: 'podcasts-topics',
        question: "What topics does the podcast cover?",
        answer: "The podcast explores makeup artistry, festival culture, Berlin nightlife, UV art techniques, creative entrepreneurship, and conversations with fellow artists and travellers."
      },
    ],
  },
  {
    pageId: 'contact',
    title: 'Contact — FAQ',
    description: 'Before you reach out.',
    faqs: [
      {
        id: 'contact-best-way',
        question: "What's the best way to reach Ash?",
        answer: "Use the contact form on this page — it goes directly to him. For quick questions, DM him on Instagram. He reads every message personally."
      },
      {
        id: 'contact-response',
        question: "How quickly does he respond?",
        answer: "He aims to reply within 48 hours. During festival season he might be slower — but he always gets back to you eventually."
      },
      {
        id: 'contact-collabs',
        question: "What kind of collaborations is he open to?",
        answer: "Creative partnerships, festival art installations, video collaborations, podcast guest appearances, and joint art projects. This is a personal project, so he's not looking for commercial/paid gigs."
      },
    ],
  },
  {
    pageId: 'stickers',
    title: 'Stickers — FAQ',
    description: 'About the psychedelic sticker collection.',
    faqs: [
      {
        id: 'stickers-what-are',
        question: 'What are the stickers?',
        answer: 'A collection of AI-generated psychedelic and psytrance-inspired digital art pieces. Each sticker is a unique visual experiment combining neon aesthetics, sacred geometry, and festival energy. They exist as digital artworks and occasional physical prints.'
      },
      {
        id: 'stickers-how-made',
        question: 'How are they made?',
        answer: 'Using AI generative tools and custom prompts that blend psytrance culture, UV aesthetics, and geometric patterns. Each piece is refined, colour-graded, and curated to match the neon vs atomic black visual identity of the portfolio. The process is part creative direction, part digital experimentation.'
      },
      {
        id: 'stickers-can-i-get',
        question: 'Can I get one?',
        answer: 'This is a personal art project, not a shop. The stickers are shared for inspiration and creative enjoyment. If you love a design and want to feature it somewhere, reach out through the contact page — collaborations are always welcome.'
      },
    ],
  },
  {
    pageId: 'ebook',
    title: 'Ebook — FAQ',
    description: 'About the book project.',
    faqs: [
      {
        id: 'ebook-what-is',
        question: 'What is the ebook about?',
        answer: 'This one time on acid… is a collection of stories, insights, and reflections from forty-five years of life lived across dancefloors, mountain passes, festivals, and creative experiments. It covers everything from childhood in Paarl to building a WordPress agency, from discovering UV makeup in Berlin to twenty years of cannabis cultivation. It is part memoir, part philosophy, part creative manifesto.'
      },
      {
        id: 'ebook-how-many-chapters',
        question: 'How many chapters does it have?',
        answer: 'The ebook currently contains 20 chapters across 82 pages, plus 2 appendices. Topics include the dancefloor revelations, Six Cats cannabis club, the LightSpeed journey, Berlin discoveries, Muay Thai training in Thailand, ADHD as a superpower, and the philosophy behind neon vs atomic black aesthetics.'
      },
      {
        id: 'ebook-when-book-coming',
        question: 'When is the book coming?',
        answer: 'The ebook is being written in public as part of this portfolio project. New chapters are added as inspiration strikes. There is no fixed publication date — this is a living document that evolves alongside the art, the festivals, and the journey. Follow the portfolio for updates.'
      },
    ],
  },
  {
    pageId: 'events',
    title: 'Events — FAQ',
    description: 'About festival and event coverage.',
    faqs: [
      {
        id: 'events-how-listed',
        question: 'How are events listed here?',
        answer: 'Events featured on this site are psytrance festivals, techno gatherings, and creative events that Ash has personally attended and contributed to through UV makeup artistry, photography, or creative collaborations. This is not a comprehensive festival calendar — it is a curated archive of meaningful experiences.'
      },
      {
        id: 'events-attend-every-year',
        question: 'Does Ash attend these events every year?',
        answer: 'Some festivals are annual traditions (like Origin Festival in Cape Town), while others are one-time experiences (like Solipse eclipse festival in Zambia). The event archive reflects a nomadic creative lifestyle — following the music, the energy, and the right timing rather than a fixed annual schedule.'
      },
      {
        id: 'events-how-get-there',
        question: 'How does he travel to these festivals?',
        answer: 'Often by bicycle. Cycling to festivals is part of the pilgrimage — a meditative journey that cleanses the mind before entering the psychedelic playground. Major international festivals involve flights, but whenever possible, the bike is the vehicle. The journey is as important as the destination.'
      },
    ],
  },
  {
    pageId: 'dev-tools',
    title: 'Dev tools — FAQ',
    description: 'About the developer tools section.',
    faqs: [
      {
        id: 'dev-tools-what-are',
        question: 'What are the dev tools?',
        answer: 'The dev tools section is a comprehensive design system inspector with 24 sub-tools covering design tokens, icon libraries, component showcases, accessibility testing, performance monitoring, and visual specimens. It is a living documentation hub for the entire portfolio codebase.'
      },
      {
        id: 'dev-tools-who-for',
        question: 'Who are they for?',
        answer: 'Primarily for developers, designers, and anyone curious about design systems and WordPress block theme architecture. The tools demonstrate strict BEM CSS methodology, WCAG 2.1 AA accessibility compliance, and modern React patterns. They also serve as a reference for the LightSpeed team and open-source contributors.'
      },
      {
        id: 'dev-tools-can-use',
        question: 'Can I use these tools?',
        answer: 'Absolutely. The dev tools are part of this public portfolio and exist to inspire, educate, and demonstrate production-grade design system implementation. If you are building a similar system or want to learn from the code, explore freely. Attribution is appreciated but not required.'
      },
    ],
  },
  {
    pageId: 'feedback',
    title: 'Feedback — FAQ',
    description: 'About testimonials and feedback.',
    faqs: [
      {
        id: 'feedback-real-testimonials',
        question: 'Are these real testimonials?',
        answer: 'Yes. Every piece of feedback on this site comes from real people who experienced Ash UV makeup artistry at festivals, club events, or creative collaborations. Names and locations are shared with permission. The dancefloor reactions and post-festival messages are authentic expressions of connection and gratitude.'
      },
      {
        id: 'feedback-how-leave',
        question: 'How can I leave feedback?',
        answer: 'If Ash painted your face at a festival or you collaborated on a creative project, reach out through the contact page or tag him on Instagram with your experience. Genuine feedback — especially stories about how the art made you feel — is always welcome and may be featured here with your permission.'
      },
      {
        id: 'feedback-featured',
        question: 'Will my feedback be featured?',
        answer: 'Possibly. The feedback page curates testimonials that capture the essence of the UV makeup experience — the transformation, the connection, the glow under blacklight, the feeling of being seen. If your story resonates with that energy, it might be shared here as part of the living archive.'
      },
    ],
  },
  {
    pageId: 'history',
    title: 'History — FAQ',
    description: 'About the timeline and journey.',
    faqs: [
      {
        id: 'history-how-long-painting',
        question: 'How long has Ash been painting faces?',
        answer: 'Ash discovered UV makeup in July 2019 in a Berlin warehouse. Before that, twenty years of wearing costumes and standing out on dancefloors unconsciously prepared him for the art form. The journey from Chicken Man at Vortex 1999 to UV artist in 2019 was twenty years of creative evolution.'
      },
      {
        id: 'history-when-start',
        question: 'When did the creative journey start?',
        answer: 'The creative journey started in childhood — collecting snails for pocket money in Paarl, building Lego systems, teaching himself to install Windows from twelve stiffy discs. The entrepreneurial and creative drives have always been the same engine. Everything since has been refinement and expression of that core pattern.'
      },
      {
        id: 'history-timeline',
        question: 'What is the overall timeline?',
        answer: 'Born in Paarl (1981). First psytrance festival (Vortex 1999). LightSpeed founded (2003). WordPress pivot (2006). Six Cats cannabis club launched (2019). UV makeup discovered in Berlin (2019). The timeline is not linear — it is a spiral of overlapping tribes, skills, and creative experiments that compound over decades.'
      },
    ],
  },
];

/**
 * Get FAQ data for a specific page
 * Falls back to global faqData if no page-specific group exists
 */
export function getFaqsForPage(pageId: string): FaqGroup | undefined {
  return pageFaqGroups.find(g => g.pageId === pageId);
}