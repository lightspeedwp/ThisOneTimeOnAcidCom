/**
 * @fileoverview General festival makeup portfolio
 * Diverse collection of festival makeup from various events
 * 
 * @module data/mock/portfolio/festivals
 * @author Ash Shaw Portfolio Team
 * @version 3.1.0 - Updated Unsplash image URLs
 */

import { PortfolioEntry } from '../../types';

// Import Figma assets
import gondwanaRainbow from 'figma:asset/74b708f3be9c02b929444ed900d4217477ac45ad.png';
import gondwanaUvDots from 'figma:asset/d99e9e671329d5df41ad0f55042fb3f135e30fdf.png';
import gondwanaCosmicWarrior from 'figma:asset/bb2d15f1b5450668f0a032ad3765e13d8db4fdd2.png';
import originPinkMohawk from 'figma:asset/e46fceb6809b8f1b7ef5c578d40578eadf301207.png';
import originGeometric from 'figma:asset/2678f2e48d60b8ccd6855469149ffc2cd8877e1c.png';
import originNeonGrid from 'figma:asset/04aa88bd7a81e3f14ceb68f980492bf374b041db.png';

/**
 * Festival Makeup Portfolio
 * From music festivals to cultural celebrations
 * 
 * @constant {PortfolioEntry[]}
 */
export const festivalWork: PortfolioEntry[] = [
  {
    id: 'nation-of-gondwana',
    slug: 'nation-of-gondwana-festival',
    title: 'Nation of Gondwana festival',
    category: 'Festival Makeup',
    date: '2024-07-19',
    images: [
      {
        src: gondwanaRainbow,
        alt: 'Nation of Gondwana Festival - beautiful woman with rainbow UV face paint streaks and bright smile',
        title: 'Rainbow festival magic',
        caption: 'Rainbow festival magic',
        description: 'Vibrant rainbow UV face paint creating pure festival joy',
        position: 'center',
        aspectRatio: '4:3'
      },
      {
        src: gondwanaUvDots,
        alt: 'Nation of Gondwana Festival - redhead with UV dots under eyes and rainbow body paint',
        title: 'Electric UV artistry',
        caption: 'Electric UV artistry',
        description: 'UV reactive dots and rainbow body paint',
        position: 'right',
        aspectRatio: '3:4'
      },
      {
        src: gondwanaCosmicWarrior,
        alt: 'Nation of Gondwana Festival - man with rainbow UV face paint and jellyfish ear accessory',
        title: 'Cosmic festival warrior',
        caption: 'Cosmic festival warrior',
        description: 'Bold rainbow UV patterns with creative accessories',
        position: 'left',
        aspectRatio: '4:3'
      }
    ],
    event: 'Nation of Gondwana',
    description: 'Capturing the vibrant energy and creative spirit of Nation of Gondwana Festival with UV reactive rainbow face paint and body art.',
    content: `## Nation of Gondwana — Where the Dancefloor Becomes a Canvas
    
Nation of Gondwana is one of those festivals that *defies description*. Nestled in the forests outside Berlin, it's a three-day celebration of music, art, and community that draws some of the most creative people in Europe.

### The Setup

I set up a small **UV face paint station** near the main stage, armed with neon palettes, a blacklight mirror, and about a hundred hand-cut holographic stickers. The queue started forming before sunset and didn't stop until 4am.

> There's something magical about painting someone's face and watching them transform — not just visually, but in how they carry themselves. Confidence is the best accessory.

### Techniques Used

The rainbow streak designs are built on a simple but effective layering technique:

- **White base layer** for maximum pigment pop under UV
- **Wet-on-wet blending** for seamless rainbow gradients
- **Dot accents** using the back end of a brush for precision
- **Setting spray** to survive hours of dancing

### The Result

Every face became a unique piece of art. No two designs were the same — each one was a collaboration between my vision and the person sitting in front of me. That's what makes festival makeup special: it's *alive*.`,
    excerpt: 'Rainbow UV festival energy',
    tags: ['Nation of Gondwana', 'UV', 'Rainbow', 'Festival', 'Body Paint'],
    featured: true,
    order: 1,
    faqs: [
      {
        id: 'gondwana-faq-1',
        question: 'What UV paints did you use for these rainbow looks?',
        answer: 'I used a combination of water-activated neon face paints and alcohol-based body paints for longer wear. The rainbow streaks are layered with a white base underneath to maximise vibrancy under the blacklights.'
      },
      {
        id: 'gondwana-faq-2',
        question: 'How long did these festival looks take to apply?',
        answer: 'Most festival looks take 10-20 minutes per person. I keep the designs bold and graphic so they read well from a distance on the dancefloor. Speed is part of the art — the energy and spontaneity of a festival demands it.'
      }
    ]
  },
  {
    id: 'origin-festival-2025',
    slug: 'origin-festival-2025',
    title: 'Origin festival 2026: birthday adventure',
    category: 'Festival Makeup',
    date: '2026-02-06',
    images: [
      {
        src: originPinkMohawk,
        alt: 'Origin Festival Birthday - Pink Mohawk and Neon Eyes',
        title: 'Festival birthday joy',
        caption: 'Celebrating life and color',
        description: 'Vibrant birthday celebration look with neon accents',
        position: 'center',
        aspectRatio: '3:4'
      },
      {
        src: originGeometric,
        alt: 'Origin Festival - Geometric Face Paint Profile',
        title: 'Geometric neon art',
        caption: 'Precision lines and vibrant colors',
        description: 'Intricate geometric face paint design',
        position: 'left',
        aspectRatio: '3:4'
      },
      {
        src: originNeonGrid,
        alt: 'Origin Festival - Neon Grid Makeup',
        title: 'Neon night vibes',
        caption: 'Glowing in the festival lights',
        description: 'Neon grid patterns coming alive at night',
        position: 'right',
        aspectRatio: '9:16'
      }
    ],
    event: 'Origin Festival',
    description: 'It was my birthday weekend, I cycled to the event over two days and then cycled home, I brought all my clothes, hammock gear and makeup bags in panniers on my gravel bike. I danced, celebrated and spread the joy of my makeup. I also had some stickers made.',
    content: `## The Birthday Cycle — 300km to Origin Festival

This one was special. For my birthday, I decided to **cycle from Berlin to Origin Festival** — a two-day ride through the countryside with everything I needed strapped to my gravel bike.

### The Journey

Panniers loaded with:

- Full UV makeup kit (paints, brushes, sponges)
- Hammock and sleeping gear
- Three days of clothes
- A box of *holographic stickers* I had printed for the occasion

> The best adventures start with a stupid idea and a full water bottle.

### At the Festival

Once I arrived, I set up camp in the trees and started painting faces. Birthday energy is *contagious* — people were coming up asking for neon grids, geometric patterns, and third-eye designs all weekend.

### The Stickers

I had a batch of **custom holographic stickers** made for Origin — psychedelic mandalas and UV-reactive designs. Gave them all away. If you got one, you're part of the crew now.

### The Ride Home

Two days of cycling after three days of dancing. My legs were destroyed but my heart was full. Already planning next year's route.`,
    excerpt: 'Birthday cycle adventure to Origin Festival',
    tags: ['Origin Festival', 'Birthday', 'Cycling', 'Neon Makeup', 'Stickers'],
    featured: true,
    order: 2,
    faqs: [
      {
        id: 'origin-faq-1',
        question: 'Did you really cycle 300km to a festival with a full makeup kit?',
        answer: 'Yes! Everything fits into my bike panniers — paints, brushes, stickers, and a hammock. The gravel bike handles the mountain passes and the makeup kit adds about 2kg to the load. Travelling light is part of the adventure.'
      }
    ]
  },
  {
    id: 'vortex-tribal-fusion',
    slug: 'vortex-tribal-fusion',
    title: 'Vortex tribal fusion',
    category: 'Festival Makeup',
    images: [
      {
        src: 'https://images.unsplash.com/photo-1739215599231-1a298c6b65e9?w=800&q=90&fit=crop',
        alt: 'Hot pink and violet purple tribal-inspired patterns across face and shoulders with sacred geometry and fractal elements',
        title: 'Vortex tribal fusion - main',
        caption: 'Tribal sacred geometry',
        position: 'center',
        aspectRatio: '4:3',
        description: 'Hot pink and violet purple tribal patterns for first major South African psytrance gathering'
      }
    ],
    location: 'Vortex Festival, South Africa',
    event: 'Vortex Festival',
    date: '2019-12-28',
    description: 'Hot pink and violet purple tribal-inspired patterns across the face and shoulders, created during my first major South African psytrance gathering. The design incorporated sacred geometry and fractal elements—each line carrying meaning, each pattern echoing ancient ceremonial markings reimagined for modern consciousness exploration. This piece marked my introduction to the transformative power of the South African psytrance scene, where the energy is different: wilder, more primal, deeply connected to the land itself. Vortex showed me that festival makeup could be more than decoration—it could be ritual.',
    excerpt: 'Tribal sacred geometry for first South African gathering—where ancient ceremonial markings meet modern consciousness exploration',
    tags: ['Vortex', 'South Africa', 'Tribal', 'Sacred Geometry', 'Psytrance', 'Fractal', 'Ceremonial', 'Ritual', 'First Experience', 'Transformative'],
    featured: true,
    order: 15
  },
  {
    id: 'rainbow-serpent-dreams',
    slug: 'rainbow-serpent-dreams',
    title: 'Rainbow serpent dreams',
    category: 'Festival Makeup',
    images: [
      {
        src: 'https://images.unsplash.com/photo-1549929646-6814596a6b48?w=800&q=90&fit=crop',
        alt: 'Multi-color serpentine patterns flowing across face with electric green hot pink royal blue and pure yellow in organic shapes',
        title: 'Rainbow serpent dreams - main',
        caption: 'Serpentine flow patterns',
        position: 'center',
        aspectRatio: '4:3',
        description: 'Multi-color serpentine patterns inspired by festival branding and Aboriginal art'
      }
    ],
    location: 'Rainbow Serpent Festival, Australia',
    event: 'Rainbow Serpent Festival',
    date: '2020-01-25',
    description: 'Multi-color serpentine patterns flowing across the face, inspired by the festival\'s iconic branding and Australian Aboriginal art. Electric green, hot pink, royal blue, and pure yellow combined in flowing organic shapes that echo the Dreamtime stories of creation and connection. This piece honors Indigenous Australian visual culture while celebrating psychedelic festival expression—walking the delicate line between appreciation and appropriation by focusing on universal themes of transformation, nature, and spiritual journey rather than claiming sacred symbols. The serpent represents regeneration, wisdom, and the cyclical nature of existence.',
    excerpt: 'Serpentine flow inspired by Aboriginal Dreamtime—honoring Indigenous wisdom through universal themes of transformation',
    tags: ['Rainbow Serpent', 'Australia', 'Multi-color', 'Serpentine', 'Aboriginal', 'Dreamtime', 'Indigenous', 'Cultural Appreciation', 'Organic', 'Flow', 'Spiritual'],
    featured: false,
    order: 16
  },
  {
    id: 'solipse-sunrise',
    slug: 'solipse-sunrise',
    title: 'Solipse sunrise',
    category: 'Festival Makeup',
    images: [
      {
        src: 'https://images.unsplash.com/photo-1708409592650-4e2359a3edfb?w=800&q=90&fit=crop',
        alt: 'Pure yellow and blazing orange radiating patterns emanating from third eye with sun symbolism and light ray patterns',
        title: 'Solipse sunrise - main',
        caption: 'Solar solstice rays',
        position: 'center',
        aspectRatio: '4:3',
        description: 'Yellow and orange radiating patterns mirroring summer solstice sunrise'
      }
    ],
    location: 'Solipse Festival, Germany',
    event: 'Solipse Festival',
    date: '2022-06-17',
    description: 'Pure yellow and blazing orange radiating patterns emanating from the third eye, designed to mirror the summer solstice sunrise. The piece incorporated sun symbolism and light ray patterns—celebrating the longest day of the year when solar energy peaks and life force reaches maximum potential. Created during a festival that honors transformation through light, this design captures the moment when darkness surrenders to dawn and consciousness expands with the rising sun. Each ray represents a path to awakening, radiating outward from the seat of inner vision.',
    excerpt: 'Solar rays for summer solstice celebration—capturing the moment when darkness surrenders and consciousness expands with dawn',
    tags: ['Solipse', 'Germany', 'Solar', 'Solstice', 'Radiating', 'Third Eye', 'Summer', 'Light Rays', 'Awakening', 'Transformation', 'Sunrise'],
    featured: false,
    order: 17
  },
  {
    id: 'boom-festival-cosmic-connection',
    slug: 'boom-festival-cosmic-connection',
    title: 'Boom festival cosmic connection',
    category: 'Festival Makeup',
    images: [
      {
        src: 'https://images.unsplash.com/photo-1767289367992-566dbec8ac0f?w=800&q=90&fit=crop',
        alt: 'Violet purple and aqua cyan cosmic patterns with starburst accents radiating from eyes for transformational festival',
        title: 'Boom festival cosmic connection - main',
        caption: 'Cosmic unity patterns',
        position: 'center',
        aspectRatio: '4:3',
        description: 'Violet purple and aqua cyan cosmic patterns with starburst effects'
      }
    ],
    location: 'Boom Festival, Portugal',
    event: 'Boom Festival',
    date: '2022-07-28',
    description: 'Violet purple and aqua cyan cosmic patterns with starburst accents radiating from the eyes. Created during one of the world\'s largest transformational festivals, incorporating themes of unity and cosmic consciousness that define the Boom experience. This is the gathering where 50,000 people from every continent gather to celebrate interconnection, sustainability, and collective awakening. Boom Festival\'s energy demands designs that honor the sacred—not religious, but deeply spiritual. Every starburst represents a soul connection, every pattern echoes the universal web that binds us all.',
    excerpt: 'Cosmic starburst for world\'s largest transformational gathering—honoring interconnection and collective awakening',
    tags: ['Boom', 'Portugal', 'Cosmic', 'Starburst', 'Transformational', 'Unity', 'Consciousness', 'Sacred', 'Interconnection', 'Spiritual', 'Collective', 'Global'],
    featured: true,
    order: 18
  },
  {
    id: 'lost-theory-portugal',
    slug: 'lost-theory-portugal',
    title: 'Lost theory festival Portugal',
    category: 'Festival Makeup',
    images: [
      {
        src: 'https://images.unsplash.com/photo-1552058544-f2b08422138a?w=800&q=90&fit=crop',
        alt: 'Royal blue and electric green flowing patterns inspired by Portuguese ocean waves and coastal psytrance culture',
        title: 'Lost theory festival Portugal - main',
        caption: 'Ocean wave flow',
        position: 'center',
        aspectRatio: '4:3',
        description: 'Royal blue and electric green fluid wave patterns inspired by Portuguese coast'
      }
    ],
    location: 'Lost Theory Festival, Portugal',
    event: 'Lost Theory Festival',
    date: '2023-06-24',
    description: 'Royal blue and electric green flowing patterns inspired by Portuguese ocean waves and coastal psytrance culture. The design featured fluid wave-like movements across the face—mimicking the endless rhythm of Atlantic swells breaking against ancient cliffs. Portugal\'s coastal festivals have a unique energy where the Atlantic Ocean meets psychedelic trance in perfect harmony. Salt air, crashing waves, and deep bass create an environment where makeup must flow rather than fight—organic, adaptable, constantly in motion like the sea itself.',
    excerpt: 'Fluid wave patterns for Portuguese coastal psytrance—mimicking Atlantic swells in organic, endless rhythm',
    tags: ['Lost Theory', 'Portugal', 'Ocean', 'Waves', 'Coastal', 'Atlantic', 'Fluid', 'Flow', 'Organic', 'Sea', 'Rhythm', 'Maritime'],
    featured: false,
    order: 19
  },
  {
    id: 'ozora-tribal-awakening',
    slug: 'ozora-tribal-awakening',
    title: 'Ozora tribal awakening',
    category: 'Festival Makeup',
    images: [
      {
        src: 'https://images.unsplash.com/photo-1769430764294-88ebc40ee3bf?w=800&q=90&fit=crop',
        alt: 'Hot red and electric green tribal symmetrical design inspired by Hungarian folk patterns and psytrance culture with geometric shapes',
        title: 'Ozora tribal awakening - main',
        caption: 'Hungarian tribal fusion',
        position: 'center',
        aspectRatio: '4:3',
        description: 'Hot red and electric green tribal symmetry inspired by Hungarian folk art'
      }
    ],
    location: 'Ozora Festival, Hungary',
    event: 'Ozora Festival',
    date: '2023-08-04',
    description: 'Hot red and electric green tribal symmetrical design inspired by Hungarian folk patterns and psytrance culture. The piece featured bold geometric shapes and repeating mandala elements that echo traditional Magyar embroidery and decorative arts. Ozora Festival is a pilgrimage site for psytrance culture—the spiritual home where thousands journey each year to reconnect with the source. Every design must honor that sacred energy while paying respect to Hungarian cultural heritage. The symmetry represents balance, the colors represent vitality and growth, the geometry represents universal order.',
    excerpt: 'Symmetrical tribal honoring Hungarian folk art tradition—where Magyar heritage meets psytrance pilgrimage',
    tags: ['Ozora', 'Hungary', 'Tribal', 'Symmetrical', 'Folk Art', 'Magyar', 'Pilgrimage', 'Sacred', 'Mandala', 'Geometric', 'Heritage', 'Balance'],
    featured: false,
    order: 20
  },
  {
    id: 'universo-paralello-jungle',
    slug: 'universo-paralello-jungle',
    title: 'Universo Paralello jungle magic',
    category: 'Festival Makeup',
    images: [
      {
        src: 'https://images.unsplash.com/photo-1617979174351-a174f75b37cf?w=800&q=90&fit=crop',
        alt: 'Electric green and blazing orange jungle-inspired patterns with organic leaf and vine motifs for Brazilian beach gathering',
        title: 'Universo Paralello jungle magic - main',
        caption: 'Tropical jungle vines',
        position: 'center',
        aspectRatio: '4:3',
        description: 'Electric green and blazing orange jungle patterns with leaf and vine motifs'
      }
    ],
    location: 'Universo Paralello, Brazil',
    event: 'Universo Paralello',
    date: '2023-12-29',
    description: 'Electric green and blazing orange jungle-inspired patterns with organic leaf and vine motifs. Created on the Brazilian beach during the legendary New Year\'s psytrance gathering where tropical rainforest meets ocean in an explosion of life force energy. The design mirrors the lush jungle backdrop—vines climbing across skin like they climb through canopy, leaves catching light like they catch morning dew. Universo Paralello demands designs that merge with nature rather than dominate it, becoming part of the ecosystem, surrendering to the wild abundance of Brazilian coastal jungle.',
    excerpt: 'Jungle leaf motifs for Brazilian beach New Year gathering—merging with tropical abundance and life force energy',
    tags: ['Universo Paralello', 'Brazil', 'Jungle', 'Tropical', 'New Year', 'Rainforest', 'Beach', 'Vines', 'Organic', 'Nature', 'Ecosystem', 'Wild'],
    featured: false,
    order: 21
  },
  {
    id: 'antaris-project-germany',
    slug: 'antaris-project-germany',
    title: 'Antaris Project Germany',
    category: 'Festival Makeup',
    images: [
      {
        src: 'https://images.unsplash.com/photo-1764620757878-742dc20d4e43?w=800&q=90&fit=crop',
        alt: 'Blazing orange and hot red sunset-inspired design with radiating sun patterns and tribal accents during summer festival',
        title: 'Antaris Project Germany - main',
        caption: 'Sunset tribal rays',
        position: 'center',
        aspectRatio: '4:3',
        description: 'Blazing orange and hot red radiating sun patterns with tribal fusion'
      }
    ],
    location: 'Antaris Project, Germany',
    event: 'Antaris Project',
    date: '2024-07-19',
    description: 'Blazing orange and hot red sunset-inspired design created during the peak of summer festival season when European psytrance culture reaches maximum intensity. The piece featured radiating sun patterns with tribal accents—capturing those perfect German summer evenings when the sun hangs low at the horizon for hours, painting the sky in impossible gradients. Antaris Project represents the heart of Germany\'s outdoor psytrance culture: bold, energetic, unapologetically intense. The design needed to match that energy while honoring the sacred ritual of watching sunset over the main stage.',
    excerpt: 'Summer sunset rays for German psytrance peak season—honoring the sacred ritual of endless European twilight',
    tags: ['Antaris', 'Germany', 'Sunset', 'Tribal', 'Summer', 'Peak Season', 'Twilight', 'European', 'Ritual', 'Intense', 'Sacred', 'Outdoor'],
    featured: false,
    order: 22
  },
  {
    id: 'shankra-switzerland-2024',
    slug: 'shankra-switzerland-2024',
    title: 'Shankra Switzerland 2024',
    category: 'Festival Makeup',
    images: [
      {
        src: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=800&q=90&fit=crop',
        alt: 'Aqua cyan and violet purple alpine-inspired design with mountain peak geometric patterns for Swiss festival return',
        title: 'Shankra Switzerland 2024 - main',
        caption: 'Alpine mountain geometry',
        position: 'center',
        aspectRatio: '4:3',
        description: 'Aqua cyan and violet purple mountain peak geometric patterns'
      }
    ],
    location: 'Shankra Festival, Switzerland',
    event: 'Shankra Festival',
    date: '2024-07-27',
    description: 'Aqua cyan and violet purple alpine-inspired design with mountain peak geometric patterns. Return visit to the Swiss festival with evolved technique and bolder color choices that reflect growth and confidence gained through hundreds of faces painted across continents. The Swiss Alps demand designs that echo their majesty—sharp peaks reflecting crystalline clarity, elevated energy matching high altitude intensity. This piece represents the evolution from student to practitioner, from tentative exploration to confident execution, while maintaining deep respect for the mountain environment that hosts us.',
    excerpt: 'Alpine geometry for Swiss festival return with evolved technique—reflecting growth from exploration to confident execution',
    tags: ['Shankra', 'Switzerland', 'Alpine', 'Geometric', 'Mountains', 'Evolution', 'Growth', 'Crystalline', 'High Altitude', 'Mastery', 'Return', 'Swiss Alps'],
    featured: false,
    order: 23
  }
];