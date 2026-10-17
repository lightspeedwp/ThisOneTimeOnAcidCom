/**
 * @fileoverview Mock data for video tags
 * @module data/mock/videos/tags
 * @version 4.0.0 - Expanded from 5 to 60+ tags (Content Expansion Phase 8, Sub-audit 6)
 * ALL tags used in entries.ts are now defined here - 100% tag coverage achieved
 */

import { VideoTag } from '../../types/videos';

export const videoTags: VideoTag[] = [
  // Core identity tags
  { id: 'uv', name: 'UV', slug: 'uv', description: 'UV-reactive art and blacklight visuals' },
  { id: 'psytrance', name: 'Psytrance', slug: 'psytrance', description: 'Psytrance culture and dancefloor visuals' },
  { id: 'neon', name: 'Neon', slug: 'neon', description: 'Neon colour palettes and glow effects' },
  { id: 'cycling', name: 'Cycling', slug: 'cycling', description: 'Cycling adventures and endurance rides' },
  { id: 'adhd', name: 'ADHD', slug: 'adhd', description: 'ADHD neurology and neurodivergent creativity' },
  { id: 'muay-thai', name: 'Muay Thai', slug: 'muay-thai', description: 'Muay Thai training and martial arts' },
  { id: 'cannabis', name: 'Cannabis', slug: 'cannabis', description: 'Organic cannabis cultivation' },
  
  // Activity tags
  { id: 'painting', name: 'Painting', slug: 'painting', description: 'UV face painting and makeup artistry' },
  { id: 'stickers', name: 'Stickers', slug: 'stickers', description: 'Custom UV sticker designs' },
  { id: 'animation', name: 'Animation', slug: 'animation', description: 'AI-powered and motion-generated animation' },
  { id: 'tutorial', name: 'Tutorial', slug: 'tutorial', description: 'Educational how-to content' },
  { id: 'festival', name: 'Festival', slug: 'festival', description: 'Festival experiences and dancefloor culture' },
  { id: 'documentary', name: 'Documentary', slug: 'documentary', description: 'Documentary-style storytelling' },
  { id: 'vlog', name: 'Vlog', slug: 'vlog', description: 'Day-in-the-life and personal vlogs' },
  { id: 'behind-the-scenes', name: 'Behind-the-Scenes', slug: 'behind-the-scenes', description: 'Process documentation and setup' },
  { id: 'training', name: 'Training', slug: 'training', description: 'Physical training and fitness' },
  { id: 'bikepacking', name: 'Bikepacking', slug: 'bikepacking', description: 'Multi-day cycling tours with gear' },
  
  // Technique tags
  { id: 'ambidextrous', name: 'Ambidextrous', slug: 'ambidextrous', description: 'Ambidextrous painting technique' },
  { id: 'sacred-geometry', name: 'Sacred Geometry', slug: 'sacred-geometry', description: 'Sacred geometry patterns and mandalas' },
  { id: 'colour-theory', name: 'Colour Theory', slug: 'colour-theory', description: 'UV colour behaviour and blacklight theory' },
  { id: 'design-system', name: 'Design System', slug: 'design-system', description: 'Design system architecture and BEM' },
  { id: 'organic', name: 'Organic', slug: 'organic', description: 'Organic cultivation methods' },
  { id: 'cultivation', name: 'Cultivation', slug: 'cultivation', description: 'Cannabis cultivation practice' },
  { id: 'technique', name: 'Technique', slug: 'technique', description: 'Technical skill breakdown' },
  { id: 'design', name: 'Design', slug: 'design', description: 'Design principles and patterns' },
  { id: 'mandala', name: 'Mandala', slug: 'mandala', description: 'Mandala patterns and radial symmetry' },
  { id: 'symmetry', name: 'Symmetry', slug: 'symmetry', description: 'Symmetrical design and mirror-image work' },
  { id: 'flower-of-life', name: 'Flower of Life', slug: 'flower-of-life', description: 'Flower of Life geometric pattern' },
  { id: 'metatrons-cube', name: 'Metatron\'s Cube', slug: 'metatrons-cube', description: 'Metatron\'s Cube geometric pattern' },
  
  // Location tags
  { id: 'cape-town', name: 'Cape Town', slug: 'cape-town', description: 'Cape Town, South Africa (home base)' },
  { id: 'berlin', name: 'Berlin', slug: 'berlin', description: 'Berlin, Germany (May seasonal visits)' },
  { id: 'koh-phangan', name: 'Koh Phangan', slug: 'koh-phangan', description: 'Koh Phangan, Thailand (training base)' },
  { id: 'thailand', name: 'Thailand', slug: 'thailand', description: 'Thailand and Southeast Asia' },
  { id: 'czech-republic', name: 'Czech Republic', slug: 'czech-republic', description: 'Czech Republic and Czech festivals' },
  { id: 'south-africa', name: 'South Africa', slug: 'south-africa', description: 'South Africa and surrounding regions' },
  { id: 'europe', name: 'Europe', slug: 'europe', description: 'European travels and festivals' },
  { id: 'prague', name: 'Prague', slug: 'prague', description: 'Prague, Czech Republic' },
  { id: 'germany', name: 'Germany', slug: 'germany', description: 'Germany and German cycling routes' },
  
  // Festival/venue tags
  { id: 'origin', name: 'Origin', slug: 'origin', description: 'Origin Festival (Cape Town psytrance)' },
  { id: 'reiser', name: 'Reiser', slug: 'reiser', description: 'Reiser Festival (Czech Republic)' },
  { id: 'transmission-festival', name: 'Transmission Festival', slug: 'transmission-festival', description: 'Transmission Festival (Czech Republic)' },
  { id: 'assembly', name: 'Assembly', slug: 'assembly', description: 'Assembly venue (Cape Town techno)' },
  { id: 'modular', name: 'Modular', slug: 'modular', description: 'Modular venue (Cape Town techno)' },
  
  // Culture tags
  { id: 'dancefloor', name: 'Dancefloor', slug: 'dancefloor', description: 'Dancefloor culture and ritual' },
  { id: 'nightlife', name: 'Nightlife', slug: 'nightlife', description: 'Urban nightlife and club culture' },
  { id: 'techno', name: 'Techno', slug: 'techno', description: 'Techno music and culture' },
  { id: 'digital-nomad', name: 'Digital Nomad', slug: 'digital-nomad', description: 'Digital nomad lifestyle' },
  { id: 'remote-work', name: 'Remote Work', slug: 'remote-work', description: 'Remote work and location independence' },
  { id: 'neurodivergent', name: 'Neurodivergent', slug: 'neurodivergent', description: 'Neurodivergent experiences and ADHD' },
  { id: 'community', name: 'Community', slug: 'community', description: 'Community and connection' },
  { id: 'costumes', name: 'Costumes', slug: 'costumes', description: 'Festival costumes and character work' },
  { id: 'throwback', name: 'Throwback', slug: 'throwback', description: 'Throwback footage and history' },
  { id: 'cow-man', name: 'Cow Man', slug: 'cow-man', description: 'The Cow Man era (2000s festivals)' },
  { id: 'history', name: 'History', slug: 'history', description: 'Personal and scene history' },
  { id: 'nomadic', name: 'Nomadic', slug: 'nomadic', description: 'Nomadic lifestyle and movement' },
  { id: 'urban', name: 'Urban', slug: 'urban', description: 'Urban environments and city life' },
  
  // Education/development tags
  { id: 'education', name: 'Education', slug: 'education', description: 'Educational content and learning' },
  { id: 'how-to', name: 'How-To', slug: 'how-to', description: 'Instructional how-to guides' },
  { id: 'blacklight', name: 'Blacklight', slug: 'blacklight', description: 'Blacklight and UV lighting' },
  { id: 'wordpress', name: 'WordPress', slug: 'wordpress', description: 'WordPress development and themes' },
  { id: 'web-development', name: 'Web Development', slug: 'web-development', description: 'Web development and coding' },
  { id: 'code', name: 'Code', slug: 'code', description: 'Programming and code' },
  { id: 'bem', name: 'BEM', slug: 'bem', description: 'BEM architecture and CSS methodology' },
  
  // Fitness/training tags
  { id: 'endurance', name: 'Endurance', slug: 'endurance', description: 'Endurance sports and long-distance training' },
  { id: 'adventure', name: 'Adventure', slug: 'adventure', description: 'Adventure and exploration' },
  { id: 'birthday', name: 'Birthday', slug: 'birthday', description: 'Birthday celebrations and milestones' },
  { id: 'fitness', name: 'Fitness', slug: 'fitness', description: 'Physical fitness and training' },
  { id: 'discipline', name: 'Discipline', slug: 'discipline', description: 'Discipline and structured practice' },
  { id: 'triathlon', name: 'Triathlon', slug: 'triathlon', description: 'Triathlon training and racing' },
  { id: 'swimming', name: 'Swimming', slug: 'swimming', description: 'Swimming and pool training' },
  { id: 'running', name: 'Running', slug: 'running', description: 'Running and trail work' },
  { id: 'body-as-tool', name: 'Body as Tool', slug: 'body-as-tool', description: 'Body-as-tool philosophy' },
  
  // Lifestyle/wellness tags
  { id: 'lifestyle', name: 'Lifestyle', slug: 'lifestyle', description: 'Lifestyle and daily routines' },
  { id: 'work-life-balance', name: 'Work-Life Balance', slug: 'work-life-balance', description: 'Work-life balance and sustainability' },
  { id: 'mental-health', name: 'Mental Health', slug: 'mental-health', description: 'Mental health and wellness' },
  { id: 'self-discovery', name: 'Self-Discovery', slug: 'self-discovery', description: 'Self-discovery and identity' },
  { id: 'creativity', name: 'Creativity', slug: 'creativity', description: 'Creative process and expression' },
  { id: 'hyperfocus', name: 'Hyperfocus', slug: 'hyperfocus', description: 'ADHD hyperfocus states' },
  { id: 'sensory-processing', name: 'Sensory Processing', slug: 'sensory-processing', description: 'Sensory processing and regulation' },
  { id: 'process', name: 'Process', slug: 'process', description: 'Creative process and workflow' },
  
  // Sustainability/garden tags
  { id: 'six-cats', name: 'Six Cats', slug: 'six-cats', description: 'Six Cats organic cultivation project' },
  { id: 'garden', name: 'Garden', slug: 'garden', description: 'Garden and cultivation space' },
  { id: 'sustainability', name: 'Sustainability', slug: 'sustainability', description: 'Sustainable practice and eco-conscious living' },
  
  // Festival pilgrimage tags
  { id: 'festival-pilgrimage', name: 'Festival Pilgrimage', slug: 'festival-pilgrimage', description: 'Cycling pilgrimages to festivals' },
];

/**
 * Convert tag name to slug
 */
export function videoTagNameToSlug(name: string): string {
  return name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
}

/**
 * Find video tag by slug
 */
export function findVideoTagBySlug(slug: string): VideoTag | undefined {
  return videoTags.find(t => t.slug === slug);
}
