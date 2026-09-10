/**
 * @fileoverview Blog tags as structured data with slugs
 * @module data/mock/blog/tags
 */

export interface BlogTag {
  id: string;
  name: string;
  slug: string;
  description?: string;
}

/**
 * Structured blog tags with slugs for routing
 */
export const blogTags: BlogTag[] = [
  { id: 'uv-makeup', name: 'UV Makeup', slug: 'uv-makeup', description: 'Glow-in-the-dark and blacklight-reactive makeup' },
  { id: 'tutorial', name: 'Tutorial', slug: 'tutorial', description: 'Step-by-step makeup guides' },
  { id: 'technique', name: 'Technique', slug: 'technique', description: 'Creative techniques and discoveries' },
  { id: 'tips', name: 'Tips', slug: 'tips', description: 'Quick tips and tricks' },
  { id: 'travel', name: 'Travel', slug: 'travel', description: 'Adventures from Cape Town, Berlin, Koh Phangan, and beyond' },
  { id: 'psytrance', name: 'Psytrance', slug: 'psytrance', description: 'Psytrance festival culture and events' },
  { id: 'techno', name: 'Techno', slug: 'techno', description: 'Berlin techno scene and warehouse culture' },
  { id: 'neon', name: 'Neon', slug: 'neon', description: 'Neon colour techniques and inspiration' },
  { id: 'cycling', name: 'Cycling', slug: 'cycling', description: 'Adventure cycling and festival journeys' },
  { id: 'bike-packing', name: 'Bike Packing', slug: 'bike-packing', description: 'Touring with a loaded bike' },
  { id: 'berlin', name: 'Berlin', slug: 'berlin', description: 'Berlin creative scene and seasonal visits' },
  { id: 'festival', name: 'Festival', slug: 'festival', description: 'Festival culture, tips, and highlights' },
  { id: 'festivals', name: 'Festivals', slug: 'festivals', description: 'Festival stories and scene reflections' },
  { id: 'thailand', name: 'Thailand', slug: 'thailand', description: 'Thailand festival season and tropical adventures' },
  { id: 'koh-phangan', name: 'Koh Phangan', slug: 'koh-phangan', description: 'Island life, training, and parties' },
  { id: 'cape-town', name: 'Cape Town', slug: 'cape-town', description: 'Home base in Woodstock, South Africa' },
  { id: 'oregon', name: 'Oregon', slug: 'oregon', description: 'Oregon Eclipse Festival 2017' },
  { id: 'africaburn', name: 'AfricaBurn', slug: 'africaburn', description: 'South Africa regional Burning Man event' },
  { id: 'wordcamp', name: 'WordCamp', slug: 'wordcamp', description: 'WordPress community conferences' },
  { id: 'basel', name: 'Basel', slug: 'basel', description: 'WordCamp Europe 2025 location' },
  { id: 'blacklight', name: 'Blacklight', slug: 'blacklight', description: 'Blacklight and UV-reactive techniques' },
  { id: 'makeup-tips', name: 'Makeup Tips', slug: 'makeup-tips', description: 'Expert makeup tips and tricks' },
  { id: 'long-lasting', name: 'Long-Lasting', slug: 'long-lasting', description: 'Techniques for all-day festival wear' },
  { id: 'color-theory', name: 'Color Theory', slug: 'color-theory', description: 'Colour science and harmony' },
  { id: 'eco-friendly', name: 'Eco-Friendly', slug: 'eco-friendly', description: 'Sustainable and eco-conscious products' },
  { id: 'glitter', name: 'Glitter', slug: 'glitter', description: 'Biodegradable glitter and sparkle techniques' },
  { id: 'packing-list', name: 'Packing List', slug: 'packing-list', description: 'Curated kit lists for festivals' },
  { id: 'essentials', name: 'Essentials', slug: 'essentials', description: 'Must-have products and tools' },
  { id: 'education', name: 'Education', slug: 'education', description: 'Learning resources for aspiring artists' },
  { id: 'rave', name: 'Rave', slug: 'rave', description: 'Underground and electronic music events' },
  { id: 'adventure', name: 'Adventure', slug: 'adventure', description: 'Epic journeys and festival pilgrimages' },
  { id: 'endurance', name: 'Endurance', slug: 'endurance', description: 'Long-distance cycling and physical challenges' },
  { id: 'origin-festival', name: 'Origin Festival', slug: 'origin-festival', description: 'Cape Town psytrance gathering' },
  { id: 'birthday', name: 'Birthday', slug: 'birthday', description: 'Birthday celebrations and milestones' },
  { id: 'survival', name: 'Survival', slug: 'survival', description: 'Tips for surviving multi-day festivals' },
  { id: 'tropical', name: 'Tropical', slug: 'tropical', description: 'Sun-drenched festival scenes and inspiration' },
  { id: 'experience', name: 'Experience', slug: 'experience', description: 'Personal stories from festival adventures' },
  { id: 'artistry', name: 'Artistry', slug: 'artistry', description: 'The craft behind standout makeup looks' },
  { id: 'sustainability', name: 'Sustainability', slug: 'sustainability', description: 'Eco-conscious approaches to makeup artistry' },
  { id: 'green', name: 'Green', slug: 'green', description: 'Environmentally responsible beauty practices' },
  { id: 'adhd', name: 'ADHD', slug: 'adhd', description: 'Neurodivergent perspectives and ADHD as a feature' },
  { id: 'neurodivergence', name: 'Neurodivergence', slug: 'neurodivergence', description: 'Living and thriving with a differently wired brain' },
  { id: 'identity', name: 'Identity', slug: 'identity', description: 'Personal identity and self-discovery' },
  { id: 'personal', name: 'Personal', slug: 'personal', description: 'Personal stories and reflections' },
  { id: 'childhood', name: 'Childhood', slug: 'childhood', description: 'Growing up in Paarl, Western Cape' },
  { id: 'gratitude', name: 'Gratitude', slug: 'gratitude', description: 'Appreciation for people and experiences' },
  { id: 'resilience', name: 'Resilience', slug: 'resilience', description: 'Bouncing back and adapting' },
  { id: 'community', name: 'Community', slug: 'community', description: 'Tribes, belonging, and collective energy' },
  { id: 'tribes', name: 'Tribes', slug: 'tribes', description: 'The communities that shape us' },
  { id: 'relationships', name: 'Relationships', slug: 'relationships', description: 'Connections forged on the dancefloor' },
  { id: 'dancefloor', name: 'Dancefloor', slug: 'dancefloor', description: 'The dancefloor as classroom and cathedral' },
  { id: 'lightspeed', name: 'LightSpeed', slug: 'lightspeed', description: 'LightSpeed web development agency stories' },
  { id: 'wordpress', name: 'WordPress', slug: 'wordpress', description: 'WordPress community and development' },
  { id: 'entrepreneurship', name: 'Entrepreneurship', slug: 'entrepreneurship', description: 'Building businesses and designing your own life' },
  { id: 'business', name: 'Business', slug: 'business', description: 'Business philosophy and operations' },
  { id: 'open-source', name: 'Open Source', slug: 'open-source', description: 'Open source philosophy and contributions' },
  { id: 'ai', name: 'AI', slug: 'ai', description: 'Artificial intelligence tools and workflows' },
  { id: 'creativity', name: 'Creativity', slug: 'creativity', description: 'The creative process and inspiration' },
  { id: 'art', name: 'Art', slug: 'art', description: 'Art, expression, and visual creation' },
  { id: 'transformation', name: 'Transformation', slug: 'transformation', description: 'Personal and creative transformation' },
  { id: 'discovery', name: 'Discovery', slug: 'discovery', description: 'Discovering new skills and places' },
  { id: 'muay-thai', name: 'Muay Thai', slug: 'muay-thai', description: 'Thai boxing training on Koh Phangan' },
  { id: 'training', name: 'Training', slug: 'training', description: 'Fitness training and physical discipline' },
  { id: 'fitness', name: 'Fitness', slug: 'fitness', description: 'Triathlon, running, swimming, and cycling' },
  { id: 'six-cats', name: 'Six Cats', slug: 'six-cats', description: 'Six Cats Cannabis Club and the green garden' },
  { id: 'cats', name: 'Cats', slug: 'cats', description: 'The feline rulers of Six Cats' },
  { id: 'costumes', name: 'Costumes', slug: 'costumes', description: 'Festival costumes and the Cow Man era' },
  { id: 'visibility', name: 'Visibility', slug: 'visibility', description: 'The art and courage of being seen' },
  { id: 'covid', name: 'COVID', slug: 'covid', description: 'Pandemic reflections and resilience' },
  { id: 'water', name: 'Water', slug: 'water', description: 'Water conservation and Day Zero' },
  { id: 'solar-eclipse', name: 'Solar Eclipse', slug: 'solar-eclipse', description: 'Total solar eclipse experiences' },
  { id: 'solipse', name: 'Solipse', slug: 'solipse', description: 'Solipse 2001 solar eclipse festival in Zambia' },
  { id: 'zambia', name: 'Zambia', slug: 'zambia', description: 'Travel to Zambia for Solipse 2001' },
  { id: 'book', name: 'Book', slug: 'book', description: 'This one time on acid\u2026 memoir' },
  { id: 'island-life', name: 'Island Life', slug: 'island-life', description: 'Living and training on Koh Phangan' },
  { id: 'lifestyle', name: 'Lifestyle', slug: 'lifestyle', description: 'The nomadic laptop-and-bike lifestyle' },
  { id: 'desert', name: 'Desert', slug: 'desert', description: 'Tankwa Karoo and desert festivals' },
  { id: 'autonomy', name: 'Autonomy', slug: 'autonomy', description: 'Freedom and self-directed living' },
];

/**
 * Convert tag name to slug
 */
export function tagNameToSlug(name: string): string {
  return name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
}

/**
 * Find tag by slug
 */
export function findBlogTagBySlug(slug: string): BlogTag | undefined {
  return blogTags.find(t => t.slug === slug);
}