/**
 * @fileoverview Portfolio page content data
 * Main portfolio page hero and section organization
 * 
 * @module data/mock/pages/portfolio
 * @author Ash Shaw Portfolio Team
 * @version 1.0.0
 */

/**
 * Portfolio Page Hero Content
 * 
 * @constant
 */
export const portfolioHero = {
  title: 'Portfolio',
  subtitle: 'Festival artistry & creative makeup',
  description: 'Explore a vibrant collection of festival makeup, UV artistry, and creative looks from events around the world.'
};

/**
 * Portfolio Page Introduction
 * 
 * @constant
 */
export const portfolioIntro = {
  title: 'Makeup that shines',
  content: 'From explosive festival energy to peaceful mountain celebrations, each look tells a story of colour, connection, and creative expression. Browse through my work spanning festivals in Thailand, Switzerland, and beyond.'
};

/**
 * Portfolio Categories Overview
 * 
 * @constant
 */
export const portfolioCategories = [
  {
    id: 'featured-work',
    title: 'Featured work',
    description: 'Standout pieces that capture the essence of festival artistry and creative expression.',
    icon: '⭐',
    gradient: 'from-pink-600 via-purple-600 to-blue-500'
  },
  {
    id: 'festivals',
    title: 'Festival adventures',
    description: 'Bold face art and vibrant self-expression from festivals around the world.',
    icon: '🎪',
    gradient: 'from-orange-600 via-yellow-600 to-green-500'
  },
  {
    id: 'thailand',
    title: 'Thailand adventures',
    description: 'Tropical makeup exploration blending local culture with artistic expression.',
    icon: '🌴',
    gradient: 'from-yellow-600 via-orange-600 to-red-500'
  },
  {
    id: 'shankra-2023',
    title: 'Shankra festival 2023',
    description: 'Alpine-inspired makeup in breathtaking Swiss mountain settings.',
    icon: '🏔️',
    gradient: 'from-green-600 via-emerald-600 to-teal-500'
  },
  {
    id: 'reiserfieber',
    title: 'Reiserfieber Switzerland',
    description: 'Mountain celebration makeup showcasing Swiss outdoor festival culture.',
    icon: '🎨',
    gradient: 'from-purple-600 via-violet-600 to-fuchsia-500'
  },
  {
    id: 'uv-makeup',
    title: 'UV & blacklight',
    description: 'Neon and glow-in-the-dark makeup designed to shine under UV lights.',
    icon: '💡',
    gradient: 'from-cyan-600 via-blue-600 to-indigo-500'
  },
  {
    id: 'nail-art',
    title: 'Fusion nails',
    description: 'Creative nail designs showcasing color, texture, and artistic expression.',
    icon: '💅',
    gradient: 'from-pink-600 via-rose-600 to-red-500'
  }
];

/**
 * Portfolio Statistics
 * 
 * @constant
 */
export const portfolioStats = {
  totalWorks: '50+',
  festivals: '15+',
  countries: '5',
  happyClients: '100+'
};

/**
 * Portfolio Call-to-Action
 * 
 * @constant
 */
export const portfolioCTA = {
  title: 'Love what you see?',
  description: 'Ready to create your own unique look? Get in touch to discuss your vision.',
  buttonText: 'Book a consultation',
  buttonLink: '#contact'
};