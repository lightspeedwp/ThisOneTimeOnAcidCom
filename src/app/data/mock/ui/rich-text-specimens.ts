/**
 * Rich Text Specimens Data
 * 
 * Comprehensive content samples demonstrating all available rich-text styling
 * elements for each content type (blog, portfolio, video, podcast, event).
 * Used by the Rich Text Specimens dev tool page.
 */

export interface RichTextSpecimen {
  title: string;
  meta: {
    date?: string;
    category: string;
    readTime?: number;
    author?: string;
    duration?: string;
    views?: number;
    episodeNumber?: number;
    season?: number;
    location?: string;
    eventName?: string;
    dateRange?: string;
  };
  content: {
    intro: string;
    sections: Array<{
      heading: string;
      type: 'text' | 'list' | 'quote' | 'image' | 'gallery' | 'table' | 'code' | 'callout' | 'timeline' | 'transcript';
      content: any;
    }>;
  };
  tags: string[];
  faqs: Array<{
    question: string;
    answer: string;
  }>;
  relatedLabel: string;
}

export const richTextSpecimens: Record<string, RichTextSpecimen> = {
  blog: {
    title: 'UV makeup at Origin Festival 2026',
    meta: {
      date: '2026-02-15',
      category: 'Festival',
      readTime: 8,
      author: 'Ash Shaw',
    },
    content: {
      intro: 'This year\'s Origin Festival was a **breakthrough moment** for UV makeup artistry. I spent three nights on the dancefloor creating *neon portraits* that glowed under blacklight, transforming festival-goers into living art. Here\'s what I learned about [UV reactive pigments](/blog/uv-pigments) and the magic they bring to night-time events.',
      sections: [
        {
          heading: 'The neon palette revolution',
          type: 'text',
          content: 'Working with eight core UV colours allowed me to create depth and dimension in ways traditional makeup never could. The electric green base became a signature, layered with hot pink highlights and royal blue shadows. Each colour reacts differently under blacklight intensity.',
        },
        {
          heading: '',
          type: 'quote',
          content: 'Under the strobes, the makeup wasn\'t just visible — it was alive. Glowing faces became part of the music, pulsing with the bassline.',
        },
        {
          heading: '',
          type: 'image',
          content: {
            src: 'figma:asset/origin-festival-hero.jpg',
            alt: 'Neon UV makeup glowing under blacklight at Origin Festival',
            caption: 'Electric green and hot pink UV design on dancefloor, 2am',
          },
        },
        {
          heading: 'Essential techniques for UV application',
          type: 'list',
          content: {
            ordered: false,
            items: [
              'Layer base colours before adding fine details',
              'Use stencils for geometric patterns (triangles, circuit lines)',
              'Blend edges with your finger, not a brush — UV pigments need pressure',
              'Seal with setting spray to prevent glow fade during sweat sessions',
            ],
          },
        },
        {
          heading: 'Step-by-step workflow',
          type: 'list',
          content: {
            ordered: true,
            items: [
              'Prime face with matte base — glossy surfaces reflect UV light poorly',
              'Apply electric green base layer using foam wedge',
              'Add hot pink accents around eyes and temples',
              'Create circuit patterns with royal blue using fine brush',
              'Highlight cheekbones with neon yellow for 3D pop effect',
              'Seal everything with alcohol-activated setting spray',
            ],
          },
        },
        {
          heading: '',
          type: 'gallery',
          content: {
            images: [
              { src: 'figma:asset/uv-step1.jpg', alt: 'Base layer application' },
              { src: 'figma:asset/uv-step2.jpg', alt: 'Circuit pattern detail' },
              { src: 'figma:asset/uv-final.jpg', alt: 'Completed UV design glowing' },
            ],
          },
        },
        {
          heading: 'UV pigment comparison',
          type: 'table',
          content: {
            headers: ['Brand', 'Glow intensity', 'Sweat resistance', 'Price'],
            rows: [
              ['PaintGlow', 'High', 'Medium', 'R180'],
              ['Kryolan UV Dayglow', 'Very High', 'High', 'R320'],
              ['Mehron Paradise AQ', 'Medium', 'Very High', 'R240'],
              ['Custom mix (DIY)', 'Variable', 'Low', 'R90'],
            ],
          },
        },
        {
          heading: 'Code example: CSS glow effect',
          type: 'code',
          content: {
            language: 'css',
            code: `.neon-glow {
  box-shadow:
    0 0 10px var(--wp--preset--color--neon-green),
    0 0 20px var(--wp--preset--color--neon-green),
    0 0 30px var(--wp--preset--color--neon-pink);
  animation: pulse-glow 2s ease-in-out infinite;
}`,
          },
        },
        {
          heading: '',
          type: 'callout',
          content: {
            type: 'tip',
            text: '**Pro tip:** Always test UV pigments under blacklight *before* the event. Some brands that look vibrant in daylight barely glow under UV.',
          },
        },
      ],
    },
    tags: ['UV makeup', 'Festival', 'Origin', 'Blacklight', 'Neon pigments'],
    faqs: [
      {
        question: 'How long does UV makeup last on the dancefloor?',
        answer: 'With proper sealing spray, expect 4-6 hours of vibrant glow. High-sweat environments (like Origin\'s main stage) may reduce this to 3-4 hours. Reapply neon yellow highlights every 2 hours for maximum impact.',
      },
      {
        question: 'Can I use regular makeup and just add UV pigment on top?',
        answer: 'Not recommended. Regular makeup can block UV light from reaching the fluorescent pigments. Always use UV-reactive products as your base, or skip foundation entirely for maximum glow.',
      },
      {
        question: 'What\'s the best way to remove UV makeup after a festival?',
        answer: 'Use an oil-based cleanser first to break down the pigments, then follow with a gentle foaming wash. UV pigments can stain skin temporarily — expect faint neon residue for 12-24 hours even after thorough cleaning.',
      },
    ],
    relatedLabel: 'Related blog posts',
  },

  portfolio: {
    title: 'Cyberpunk circuit board design',
    meta: {
      date: '2026-01-20',
      category: 'Full face',
      location: 'Cape Town',
      eventName: 'Vortex Festival',
    },
    content: {
      intro: 'This full-face design was inspired by **circuit board aesthetics** and *cyberpunk neon grids*. Created for Vortex Festival 2026, it took 90 minutes to complete and became one of my most photographed looks of the season.',
      sections: [
        {
          heading: 'Design concept',
          type: 'text',
          content: 'The goal was to transform the face into a living circuit board — geometric lines, glowing nodes, and sharp angles that followed facial contours. I used electric green as the primary colour with hot pink highlights at "connection points" (temples, cheekbones, jawline).',
        },
        {
          heading: '',
          type: 'image',
          content: {
            src: 'figma:asset/cyberpunk-hero.jpg',
            alt: 'Cyberpunk circuit board makeup design',
            caption: 'Full face circuit design with neon green lines and pink nodes',
          },
        },
        {
          heading: 'Technique breakdown',
          type: 'text',
          content: 'All lines were hand-painted using a 2mm precision brush. No stencils — just steady hands and a reference sketch on my phone. The symmetry isn\'t perfect, and that\'s intentional. Perfect symmetry looks digital. Slight asymmetry keeps it human.',
        },
        {
          heading: '',
          type: 'gallery',
          content: {
            images: [
              { src: 'figma:asset/circuit-detail1.jpg', alt: 'Temple circuit pattern' },
              { src: 'figma:asset/circuit-detail2.jpg', alt: 'Cheekbone node detail' },
              { src: 'figma:asset/circuit-detail3.jpg', alt: 'Jawline geometric lines' },
              { src: 'figma:asset/circuit-detail4.jpg', alt: 'Eye area circuitry' },
              { src: 'figma:asset/circuit-blacklight.jpg', alt: 'Design glowing under blacklight' },
            ],
          },
        },
        {
          heading: 'Behind the scenes',
          type: 'text',
          content: 'This design was created in a tent at 2am with a single LED work light. The model sat perfectly still for 90 minutes while I traced lines freehand. Wind kept blowing dust into the paint, so I had to work fast and confident. No room for hesitation when you\'re painting circuits on a moving canvas.',
        },
        {
          heading: '',
          type: 'quote',
          content: 'The dancefloor is my studio. Imperfection is part of the art. If you wait for perfect conditions, you\'ll never create anything.',
        },
      ],
    },
    tags: ['Cyberpunk', 'Geometric', 'Circuit board', 'Vortex', 'Green neon'],
    faqs: [
      {
        question: 'How do you keep lines so straight without stencils?',
        answer: 'Practice and confidence. I use a small precision brush (2mm) with alcohol-activated paint for sharper edges. Rest your hand on the model\'s face for stability, and commit to each stroke — hesitation creates wobbly lines.',
      },
      {
        question: 'What happens if you make a mistake mid-design?',
        answer: 'I incorporate it. If a line goes crooked, I add a new branch or node to make it look intentional. Cyberpunk aesthetics are forgiving — asymmetry and "glitches" fit the theme.',
      },
      {
        question: 'How long does a design like this last?',
        answer: 'With setting spray, expect 6-8 hours of clean lines. Sweat will soften edges after 4-5 hours, but that adds a weathered, lived-in look that actually enhances the cyberpunk vibe.',
      },
    ],
    relatedLabel: 'Related portfolio entries',
  },

  video: {
    title: 'UV face painting tutorial: electric green base layer',
    meta: {
      category: 'Tutorial',
      duration: '12:34',
      views: 8742,
      date: '2026-02-10',
    },
    content: {
      intro: 'In this tutorial, I walk you through my **electric green base layer technique** — the foundation of all my UV makeup designs. You\'ll learn pigment activation, blending methods, and how to create seamless coverage that glows evenly under blacklight.',
      sections: [
        {
          heading: '',
          type: 'image',
          content: {
            src: 'figma:asset/video-thumbnail.jpg',
            alt: 'Video thumbnail: UV makeup base layer tutorial',
            caption: '12:34 — Click to watch full tutorial',
          },
        },
        {
          heading: 'What you\'ll see',
          type: 'list',
          content: {
            ordered: false,
            items: [
              '00:45 — Pigment activation with mixing medium',
              '02:10 — Foam wedge application technique',
              '05:30 — Blending edges for seamless coverage',
              '08:15 — Blacklight test and intensity check',
              '10:40 — Setting spray application',
              '11:50 — Final reveal under UV strobes',
            ],
          },
        },
        {
          heading: 'Behind the scenes',
          type: 'text',
          content: 'This video was filmed in my home studio in Woodstock, Cape Town. I used two ring lights and a blacklight strip to demonstrate the glow effect in real-time. The model is my friend Lucy, who sat perfectly still for 15 minutes while I explained every step.',
        },
        {
          heading: '',
          type: 'image',
          content: {
            src: 'figma:asset/bts-filming.jpg',
            alt: 'Behind the scenes: filming UV makeup tutorial',
            caption: 'Studio setup with ring lights and blacklight strip',
          },
        },
      ],
    },
    tags: ['Tutorial', 'UV makeup', 'Base layer', 'Electric green', 'Beginner'],
    faqs: [
      {
        question: 'What mixing medium do you use for UV pigments?',
        answer: 'I use Mehron Mixing Liquid for water-based pigments. It activates the colour without diluting the glow intensity. Avoid using too much water — it weakens the fluorescence.',
      },
      {
        question: 'Can I use brushes instead of a foam wedge?',
        answer: 'Yes, but foam wedges give more even coverage for base layers. Brushes work better for detail work and patterns. I recommend starting with a wedge for the base, then switching to brushes for accents.',
      },
      {
        question: 'How do I know if my UV pigment is activated properly?',
        answer: 'The pigment should feel slightly tacky and opaque when applied. If it\'s watery or translucent, you need more pigment or less mixing medium. Test under blacklight — properly activated pigment glows intensely with one coat.',
      },
    ],
    relatedLabel: 'Related videos',
  },

  podcast: {
    title: 'Episode 3: The dancefloor gave me everything',
    meta: {
      episodeNumber: 3,
      season: 1,
      duration: '48:22',
      category: 'Personal story',
      date: '2026-01-15',
    },
    content: {
      intro: 'In this episode, I share my **origin story** — how I went from corporate burnout to festival makeup artist. We talk about *finding yourself on the dancefloor*, the transformative power of Berlin techno, and why I chose to build a life around art instead of climbing the corporate ladder.',
      sections: [
        {
          heading: '',
          type: 'image',
          content: {
            src: 'figma:asset/podcast-cover.jpg',
            alt: 'Podcast episode 3 cover art',
            caption: 'Season 1, Episode 3 — The dancefloor gave me everything',
          },
        },
        {
          heading: 'Show notes',
          type: 'text',
          content: 'This is a vulnerable conversation about burnout, identity, and the moment I decided to leave everything behind. We recorded this episode in Berlin, sitting in a park near Sisyphos the morning after a 12-hour rave. Raw, unedited, and real.',
        },
        {
          heading: 'Transcript excerpt',
          type: 'transcript',
          content: [
            { speaker: 'Ash', text: 'I remember the exact moment I knew I had to quit. I was sitting in a meeting room in Rosebank, Johannesburg, staring at a spreadsheet, and I just... felt nothing. No excitement. No curiosity. Just emptiness.' },
            { speaker: 'Ash', text: 'That weekend, I went to a small outdoor rave in the Magaliesberg. Someone painted my face with glow-in-the-dark paint. And for the first time in months, I felt *alive*. I spent the entire night dancing, covered in neon, surrounded by strangers who became family by sunrise.' },
            { speaker: 'Ash', text: 'A week later, I bought my first UV makeup kit. Six months later, I quit my job. A year later, I was in Berlin, painting faces at Sisyphos. That dancefloor gave me everything — my art, my purpose, my life.' },
          ],
        },
        {
          heading: 'Guest information',
          type: 'text',
          content: 'This episode is a solo conversation — just me, a microphone, and the story I\'ve been afraid to tell for years. No guests. No filters. Just the truth about what it takes to choose art over stability.',
        },
      ],
    },
    tags: ['Personal story', 'Berlin', 'Burnout', 'Transformation', 'Techno'],
    faqs: [
      {
        question: 'When did you first discover UV makeup?',
        answer: 'At a small outdoor rave in the Magaliesberg mountains near Johannesburg in 2018. Someone painted my face with glow-in-the-dark paint, and I was mesmerized by how it transformed under blacklight. That single experience changed the trajectory of my life.',
      },
      {
        question: 'How long did it take to transition from corporate work to full-time art?',
        answer: 'About 18 months. I started painting faces at local festivals on weekends while still working full-time. Once I had a small portfolio and consistent bookings, I took the leap and quit. It was terrifying, but staying in that office felt like dying slowly.',
      },
      {
        question: 'Do you ever regret leaving corporate stability?',
        answer: 'Never. Not once. I make less money now, but I wake up excited every day. I create art, travel the world, and live on my own terms. That\'s worth more than any salary.',
      },
    ],
    relatedLabel: 'Related episodes',
  },

  event: {
    title: 'Origin Festival',
    meta: {
      dateRange: 'Feb 14-16, 2026',
      location: 'Dullstroom, South Africa',
      category: 'Festival',
    },
    content: {
      intro: 'Origin Festival is a **three-day outdoor psytrance gathering** in the mountains of Dullstroom, South Africa. Known for its *stunning natural setting*, powerful sound systems, and vibrant community, it\'s one of the highlights of the South African summer festival season.',
      sections: [
        {
          heading: '',
          type: 'image',
          content: {
            src: 'figma:asset/origin-landscape.jpg',
            alt: 'Origin Festival main stage at sunset',
            caption: 'Main stage overlooking the Dullstroom valley',
          },
        },
        {
          heading: 'Editions attended',
          type: 'timeline',
          content: [
            { year: '2024', edition: '1st edition', role: 'Attendee — first experience with festival UV makeup scene' },
            { year: '2025', edition: '2nd edition', role: 'Artist — painted 40+ faces over three nights' },
            { year: '2026', edition: '3rd edition', role: 'Artist — official makeup booth, 80+ creations' },
          ],
        },
        {
          heading: 'Travel',
          type: 'text',
          content: 'I cycled from Cape Town to Dullstroom in 2025 — a 1,680km journey that took 12 days. In 2026, I took the bus (pragmatic choice when carrying 15kg of makeup supplies). The festival is about 4 hours from Johannesburg by car, nestled in rolling highlands with crisp mountain air.',
        },
        {
          heading: '',
          type: 'gallery',
          content: {
            images: [
              { src: 'figma:asset/origin-crowd.jpg', alt: 'Dancefloor crowd under neon lights' },
              { src: 'figma:asset/origin-booth.jpg', alt: 'My makeup booth setup' },
              { src: 'figma:asset/origin-faces.jpg', alt: 'Collection of UV face designs' },
              { src: 'figma:asset/origin-sunrise.jpg', alt: 'Sunrise over the main stage' },
            ],
          },
        },
      ],
    },
    tags: ['Psytrance', 'Origin', 'Dullstroom', 'South Africa', 'Mountains'],
    faqs: [
      {
        question: 'What makes Origin Festival special?',
        answer: 'The combination of world-class psytrance lineups, breathtaking mountain scenery, and a tight-knit community. It\'s small enough to feel intimate (around 3,000 people) but big enough to have incredible production quality. The energy is pure magic.',
      },
      {
        question: 'What should I bring for UV makeup at Origin?',
        answer: 'Warm layers for cold mountain nights, a headlamp for working in the dark, setting spray (sweat is real at altitude), and backup batteries for your phone. The festival has power at the artist area, but bring a portable charger just in case.',
      },
      {
        question: 'Is Origin beginner-friendly for first-time festival-goers?',
        answer: 'Absolutely. The community is welcoming, the vibe is inclusive, and the production team takes care of safety and logistics. Just bring an open mind, comfortable shoes, and a willingness to dance until sunrise.',
      },
    ],
    relatedLabel: 'Related events',
  },
};
