/**
 * Testimonials Data
 * 
 * Authentic feedback from friends at festivals, parties, and underground raves
 * 
 * @module data/mock/testimonials
 */

export interface Testimonial {
  id: string;
  name: string;
  role?: string;
  event?: string;
  rating: number; // 1-5 stars
  text: string;
  image?: string;
  date: string;
  featured?: boolean;
  videoUrl?: string; // Optional video testimonial
  videoPoster?: string; // Video thumbnail
}

export const testimonialsSectionContent = {
  title: "Love from the Dance Floor",
  description: "Real vibes from friends I've painted at festivals, parties, and underground raves across the globe"
};

export const testimonials: Testimonial[] = [
  {
    id: "test-001",
    name: "Luna",
    event: "Origin Festival 2026, South Africa",
    rating: 5,
    text: "Spotted him cycling through the crowd with his makeup bag at Origin!! The UV geometric patterns he did right there on the dance floor were insaaaane. Everyone kept asking where I got painted and I'm like 'find the guy with the bike!' He's a legend!! 💜✨",
    date: "2026-01-15",
    featured: true
  },
  {
    id: "test-002",
    name: "Mika",
    event: "Sisyphos, Berlin",
    rating: 5,
    text: "We were both taking a dancing break and he just pulled out his backpack and transformed my whole vibe!! The neon pink gradient was chef's kiss. Danced til sunrise and it still looked fresh. Love the spontaneous magic 🌈💕",
    date: "2025-11-28",
    featured: true
  },
  {
    id: "test-003",
    name: "Sage",
    event: "Little Forest Festival, South Africa",
    rating: 5,
    text: "He literally did my makeup near the dance floor while the bass was pumping! The glitter placement and color combos were so unique. Got a million compliments and so many people were searching for 'the guy with the bicycle' afterwards 🦋✨",
    date: "2025-10-12",
    featured: true
  },
  {
    id: "test-004",
    name: "River",
    event: "Modem Festival, Croatia",
    rating: 5,
    text: "Ash you absolute artist!! Found him roaming with his makeup bag and the tribal-techno fusion look he gave me right there by the stage was EVERYTHING. Black light reactive paint that looked like it was moving when I danced. Peak festival magic 🖤🔥",
    date: "2025-09-22",
    featured: false
  },
  {
    id: "test-006",
    name: "Zara",
    event: "Moov Festival, South Africa",
    rating: 5,
    text: "Saw him cruising around the festival on his bike and knew I had to get painted! He did my makeup right by the psytrance stage - purple-blue gradient with gold accents was *chefs kiss* perfect. The energy of getting painted while the music plays hits different 💙✨",
    date: "2025-07-30",
    featured: false
  },
  {
    id: "test-007",
    name: "Phoenix",
    event: "Underground Rave, Berlin",
    rating: 5,
    text: "Random warehouse party, we were both resting after dancing hard and he had his backpack! The cyberpunk look he created right there in the corner was straight fire. So many people asked if I was a professional model lol. He made my night!! 🤖⚡",
    date: "2025-06-15",
    featured: false
  }
];

// Utility functions
export function getFeaturedTestimonials(): Testimonial[] {
  return testimonials.filter(t => t.featured);
}

export function getRecentTestimonials(count: number = 3): Testimonial[] {
  return [...testimonials]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, count);
}

export function getAverageRating(): number {
  const sum = testimonials.reduce((acc, t) => acc + t.rating, 0);
  return sum / testimonials.length;
}

export function getTotalTestimonials(): number {
  return testimonials.length;
}
