/**
 * @fileoverview About page content data
 * Ash Shaw's journey, philosophy, and creative approach
 * 
 * @module data/mock/pages/about
 * @author Ash Shaw Portfolio Team
 * @version 1.2.0
 */

import { HeroImage, AboutSection } from '../../types';

/**
 * About Page Hero Content
 * 
 * @constant
 */
export const aboutHero = {
  title: 'Global psytrance artist',
  subtitle: 'UV makeup specialist',
  description: 'A journey through sound and color. Based in Cape Town, chasing summers in Berlin and Thailand. I bring neon visions to life on the world\'s biggest psytrance dancefloors.'
};

/**
 * Journey Section Content
 * 
 * @constant
 */
export const journeySection: AboutSection = {
  id: 'journey-section',
  title: 'My global journey',
  content: [
    {
      type: 'paragraph',
      text: 'I am a global psytrance makeup artist. My canvas is the festival, and my inspiration is the beat. I didn\'t start in a salon, but in the heart of the trance floor, where color meets kinetic energy.'
    },
    {
      type: 'paragraph',
      text: 'For me, makeup is a ritual of the rave. It\'s about transforming the self to match the intensity of the music. I create UV-reactive looks that come alive at night, turning dancers into living, glowing art.'
    },
    {
      type: 'paragraph',
      text: 'My life is a continuous loop of summer and sound. Based in Cape Town, South Africa, I travel annually to Berlin each May for the techno season, return to swap bicycles in August-September, then relocate to Koh Phangan, Thailand (Sep-Nov) for Muay Thai training, triathlon, remote work, and the island psytrance circuit before returning to Cape Town in November for South African summer. I am a nomad of the scene.'
    }
  ],
  image: {
    src: 'https://images.unsplash.com/photo-1729599102515-710a4dd83637?w=1080',
    alt: 'Ash Shaw creating UV makeup art at a psytrance festival',
    caption: 'Creating UV art in the element'
  },
  order: 1
};

/**
 * Philosophy Section Content
 * 
 * @constant
 */
export const philosophySection: AboutSection = {
  id: 'philosophy-section',
  title: 'Trance philosophy',
  content: [
    {
      type: 'heading',
      text: 'Spontaneous & electric'
    },
    {
      type: 'paragraph',
      text: 'The best art happens in the moment. While I love working with festivals, I live for the spontaneous connections on the dancefloor. I look for the radiant souls amplifying the energy. If the vibe matches, we create magic.'
    },
    {
      type: 'heading',
      text: 'The UV process'
    },
    {
      type: 'paragraph',
      text: 'I see in neon. I analyze your features under the potential of blacklight. I select high-pigment UV colors that will pop against the darkness. It\'s not just about looking good; it\'s about glowing with the music.'
    },
    {
      type: 'heading',
      text: 'Fast & fluid'
    },
    {
      type: 'paragraph',
      text: 'Festival energy moves fast, and so do I. I\'ve trained myself to be ambidextrous, allowing me to paint with flow and precision even in the most crowded, high-energy environments.'
    }
  ],
  order: 2
};

/**
 * Skills & Specialties Section Content
 * 
 * @constant
 */
export const skillsSection: AboutSection = {
  id: 'skills-section',
  title: 'Psytrance specialties',
  content: [
    {
      type: 'list',
      items: [
        '✨ UV/Blacklight Artistry',
        '🌈 Neon Body Painting',
        '🍄 Psychedelic Patterning',
        '⚡ Ambidextrous Application',
        '🎭 Festival Character Design',
        '🎪 Global Trance Style',
        '👁️ Third Eye Detailing',
        '🌏 International Experience'
      ]
    }
  ],
  order: 3
};

/**
 * Experience Highlights
 * 
 * @constant
 */
export const experienceHighlights = [
  {
    event: 'Global Circuit',
    location: 'Cape Town, Berlin, Thailand',
    year: 'Ongoing',
    description: 'Touring the major psytrance and techno circuits across three continents.'
  },
  {
    event: 'Berlin Techno Season',
    location: 'Germany',
    year: 'May - August',
    description: 'UV installations and makeup for the underground club scene.'
  },
  {
    event: 'Thailand Psytrance Season',
    location: 'Thailand',
    year: 'August - November',
    description: 'Full moon parties and jungle festivals with neon aesthetics.'
  },
  {
    event: 'Cape Town Origin',
    location: 'South Africa',
    year: 'Home Base',
    description: 'The roots of my psychedelic style and primary creative studio.'
  }
];

/**
 * Call-to-Action Content
 * 
 * @constant
 */
export const aboutCTA = {
  title: 'Meet me on the trance floor',
  description: 'I\'m always where the music is. Check my schedule or connect before your next festival.',
  buttonText: 'Check schedule',
  buttonLink: '#contact'
};

/**
 * Detailed Narrative Content for About Page Sections
 * 
 * @constant
 */
export const aboutPageText = {
  journey: "I am a global psytrance makeup artist. That's the only way to describe the life I live. I don't just attend festivals; I enhance them. My art is born from the beat, designed to glow under the UV lights of the world's best trance floors. It's a passion that has taken me from the tip of Africa to the clubs of Berlin and the jungles of Thailand.",
  festival: [
    "You'll find me where the bass is deepest. I travel with my UV pigments, ready to transform fellow dancers. It's about synchronicity—being in the right place with the right energy.",
    "My process is intuitive and electric. I see the potential for neon on your skin, how it will look when the lasers hit. It's fast, intense, and deeply connected to the psychedelic experience."
  ],
  berlin: [
    "My year is a global chase of summer and sound. Each May, I travel to Berlin for the techno season, diving deep into the capital's club culture before returning to South Africa in August-September.",
    "The darkness of Berlin's clubs is the perfect canvas for my UV work. I create sharper, edgier looks that cut through the strobe lights and industrial atmosphere."
  ],
  uv: [
    "Between August and November, I shift to Thailand. The jungle parties and island festivals call for a wilder, more organic neon palette.",
    "Here, I experiment with tribal UV patterns and bioluminescent designs that mimic the nature around us, glowing intensely under the blacklights of the psytrance stage."
  ],
  mousse: [
    "Cape Town is my origin and my anchor. But the world is my studio. I'm always open to international creative collaborations.",
    "Whether I'm in South Africa, Europe, or Asia, the mission is the same: to elevate the party through the power of UV color."
  ],
  uvMakeup: [
    "Precision in chaos. That's my specialty. I've mastered ambidextrous application to ensure I can work effectively in the middle of a crowded dancefloor.",
    "This skill allows me to paint complex symmetrical designs and third-eye patterns without you having to leave the immersion of the festival."
  ],
  creative: [
    "I don't just paint faces; I unlock avatars. I focus on eyes and face because that's the center of connection on the dancefloor.",
    "After the transformation, you're not just a spectator; you're part of the visual spectacle of the event. I capture the moment, and we stay connected through the global tribe."
  ],
  future: [
    "Every festival is a new gallery. I'm constantly evolving my techniques, exploring new UV pigments and reactive materials.",
    "I live for this art. If you see the neon-clad artist on the dancefloor, come say hi. Let's create something that glows."
  ]
};