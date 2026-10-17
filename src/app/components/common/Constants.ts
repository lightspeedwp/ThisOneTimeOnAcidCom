/**
 * @fileoverview Constants and data for Ash Shaw Makeup Portfolio
 * Centralized storage for social media links, portfolio data, and content metadata
 * following DRY principles and maintainable code organization.
 *
 * @author Ash Shaw Portfolio Team
 * @version 1.0.0
 */

// Import homepage hero images
import heroImage1 from "figma:asset/f4a28f747d49fc9d37311b17f513b62e2b95a73e.png";
import heroImage2 from "figma:asset/378acbf4a7518ca6c40b44540bd7a121a91375fe.png";
import heroImage3 from "figma:asset/e82a7d901c5a28bf9313c7535228e647eaf06b75.png";

// Import Origin Festival images
import originPinkMohawk from "figma:asset/e46fceb6809b8f1b7ef5c578d40578eadf301207.png";
import originGeometric from "figma:asset/2678f2e48d60b8ccd6855469149ffc2cd8877e1c.png";
import originNeonGrid from "figma:asset/04aa88bd7a81e3f14ceb68f980492bf374b041db.png";

// Import Thailand images
import lostParadiseImg from "figma:asset/e7ee10c85c112ab4acfc9e54087974a5faae5966.png";
import edenParadiseImg from "figma:asset/3c496f3b8a5671dd00830f80a9a061ddf687e849.png";
import edenShishiImg from "figma:asset/2d37a7cd55fe518f7eb8124fa25a2382be67f948.png";

// Import Shankra Festival images
import festivalConnectionImg from "figma:asset/d35493e2be08017199b3d1523d516a996ec97a5d.png";
import alpineBlissImg from "figma:asset/e43f2a86f8b38d1777428264c8c9126d07a9ef75.png";
import mountainRainbowImg from "figma:asset/80d0d3af448e4969dc796d00e91c30d3648cd9c4.png";

// Import Reiserfieber images
import alpineGlowImg from "figma:asset/33024fb05609d4a4545be47508d2ad3595f143c4.png";
import mountainSpiritImg from "figma:asset/280168cf45339af581c4065d1f6728ea2de6ff02.png";
import festivalJoyImg from "figma:asset/71597fc19386bc69fb2144851d752977dfd3693e.png";

// Import UV Makeup images
import gondwanaRainbowImg from "figma:asset/74b708f3be9c02b929444ed900d4217477ac45ad.png";
import rainbowLightningImg from "figma:asset/d99e9e671329d5df41ad0f55042fb3f135e30fdf.png";
import electricBlueImg from "figma:asset/bb2d15f1b5450668f0a032ad3765e13d8db4fdd2.png";

// Import Nail Art images
import rainbowFusionImg from "figma:asset/7c570c5291977a816c8152a098cd6693cff22dbd.png";
import galaxyNailsImg from "figma:asset/1ec0ba217cad06e2cff662a25a050b0401d1092a.png";
import gradientDreamsImg from "figma:asset/deb2b4ab4cb25c5e47b960708fce6ea552ee6039.png";

/**
 * Social media platform configuration with URLs and metadata
 * Used by SocialLinks component for consistent platform representation
 *
 * @constant {Array<SocialLinkData>} SOCIAL_LINKS
 * @property {string} platform - Platform name for identification and styling
 * @property {string} url - Complete URL for social media profile or contact
 * @property {string} icon - Icon identifier for visual representation
 */
export const SOCIAL_LINKS = [
  {
    platform: "Instagram",
    url: "https://instagram.com/feedmymedia",
    icon: "instagram",
  },
  {
    platform: "Facebook",
    url: "https://facebook.com/ash.shaw/",
    icon: "facebook",
  },
  {
    platform: "LinkedIn",
    url: "https://www.linkedin.com/in/ashshaw/",
    icon: "linkedin",
  },
  {
    platform: "YouTube",
    url: "https://youtube.com/@ashshaw.makeup",
    icon: "youtube",
  },
  {
    platform: "Email",
    url: "mailto:hello@ahshaw.makeup",
    icon: "email",
  },
];

/**
 * Homepage hero mosaic images for the main hero section
 * Curated selection of 3 key images that represent Ash Shaw's artistry
 * These images are displayed exclusively on the homepage hero mosaic
 *
 * @constant {Array<HeroImage>} HOMEPAGE_HERO_IMAGES
 * @property {string} src - Figma asset path for optimized image loading
 * @property {string} alt - Descriptive alt text for accessibility
 * @property {string} caption - Short caption for lightbox display
 * @property {string} description - Detailed description for lightbox and screen readers
 * @property {string} className - Positioning and styling classes for mosaic layout
 */
export const HOMEPAGE_HERO_IMAGES = [
  {
    src: heroImage1,
    alt: "Close-up artistic eye makeup with vibrant purple stripe, red metallic lashes and colorful crystal gems",
    caption: "Electric Eye Art",
    description:
      "Electric eye artistry featuring a neon purple stripe design, metallic red lashes, and radiant crystal gems that capture the pulse of festival energy",
    className:
      "absolute top-6 left-4 sm:top-12 sm:left-8 w-48 h-56 sm:w-72 sm:h-80 md:w-80 md:h-96 rounded-2xl bg-cover bg-center shadow-2xl transform rotate-3 z-20 border-4 border-white ring-4 ring-pink-200/50 cursor-pointer transition-transform hover:scale-105",
  },
  {
    src: heroImage2,
    alt: "Joyful festival participant with rainbow heart body paint on chest, smiling radiantly in colorful festival environment",
    caption: "Neon Heart Pulse",
    description:
      "Radiant festival energy with a neon rainbow heart body art, celebrating connection and the vibrant pulse of the dancefloor",
    className:
      "absolute top-0 right-0 w-40 h-48 sm:w-64 sm:h-72 md:w-72 md:h-80 rounded-2xl bg-cover bg-center shadow-xl transform -rotate-6 z-10 border-4 border-white ring-4 ring-purple-200/50 cursor-pointer transition-transform hover:scale-105",
  },
  {
    src: heroImage3,
    alt: "Portrait of person with blonde hair and colorful face paint featuring blue and pink stripes in outdoor festival setting",
    caption: "Electric Geometric",
    description:
      "Bold, high-contrast face art featuring electric blue and pink geometric stripes, embodying the transformative power of neon makeup",
    className:
      "absolute bottom-0 left-0 w-36 h-40 sm:w-60 sm:h-64 md:w-68 md:h-72 rounded-2xl bg-cover bg-center shadow-xl transform rotate-12 z-10 border-4 border-white ring-4 ring-blue-200/50 cursor-pointer transition-transform hover:scale-105",
  },
];

/**
 * About page hero mosaic images
 * Curated selection of 3 images that represent Ash Shaw's journey and artistic evolution
 * These images are displayed exclusively on the About page hero section
 *
 * @constant {Array<HeroImage>} ABOUT_HERO_IMAGES
 * @property {string} src - Image URL from Unsplash
 * @property {string} alt - Descriptive alt text for accessibility
 * @property {string} caption - Short caption for lightbox display
 * @property {string} description - Detailed description for lightbox and screen readers
 * @property {string} className - Positioning and styling classes for mosaic layout
 */
export const ABOUT_HERO_IMAGES = [
  {
    src: "https://images.unsplash.com/photo-1729599102515-710a4dd83637?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnRpc3RpYyUyMG1ha2V1cCUyMHBvcnRyYWl0JTIwY3JlYXRpdmUlMjBmZXN0aXZhbHxlbnwxfHx8fDE3NTc2NjQ0Njh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    alt: "Artistic makeup portrait with creative festival styling showcasing Ash Shaw's artistic evolution",
    caption: "Creative Evolution",
    description:
      "A portrait that captures the artistic journey and creative evolution that defines Ash Shaw's makeup artistry approach",
    className:
      "absolute top-6 left-4 sm:top-12 sm:left-8 w-48 h-56 sm:w-72 sm:h-80 md:w-80 md:h-96 rounded-2xl bg-cover bg-center shadow-2xl transform rotate-3 z-20 border-4 border-white ring-4 ring-orange-200/50 cursor-pointer transition-transform hover:scale-105",
  },
  {
    src: "https://images.unsplash.com/photo-1576135711730-51049b41de78?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWF1dHklMjBtYWtldXAlMjBhcnQlMjBjb2xvcmZ1bCUyMGZhY2UlMjBwYWludHxlbnwxfHx8fDE3NTc2NjQ0NzJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    alt: "Beautiful artistic makeup with colorful face paint representing creative self-expression",
    caption: "Self Expression",
    description:
      "Colorful artistic makeup that embodies the spirit of creative self-expression and the joy of transformation through makeup artistry",
    className:
      "absolute top-0 right-0 w-40 h-48 sm:w-64 sm:h-72 md:w-72 md:h-80 rounded-2xl bg-cover bg-center shadow-xl transform -rotate-6 z-10 border-4 border-white ring-4 ring-emerald-200/50 cursor-pointer transition-transform hover:scale-105",
  },
  {
    src: "https://images.unsplash.com/photo-1631881068324-b216d0d2a3ae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcmVhdGl2ZSUyMGV5ZSUyMG1ha2V1cCUyMGFydCUyMG5lb24lMjBjb2xvcnN8ZW58MXx8fHwxNzcyNTYxMTk0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    alt: "Creative eye makeup art with vibrant neon colors showcasing technical mastery",
    caption: "Technical Mastery",
    description:
      "Intricate eye makeup art with neon colors demonstrating the technical mastery and precision that defines Ash's makeup artistry",
    className:
      "absolute bottom-0 left-0 w-36 h-40 sm:w-60 sm:h-64 md:w-68 md:h-72 rounded-2xl bg-cover bg-center shadow-xl transform rotate-12 z-10 border-4 border-white ring-4 ring-teal-200/50 cursor-pointer transition-transform hover:scale-105",
  },
];

/**
 * Portfolio page hero mosaic images
 * Curated selection of 3 images that showcase the breadth of portfolio work
 * These images are displayed exclusively on the Portfolio page hero section
 *
 * @constant {Array<HeroImage>} PORTFOLIO_HERO_IMAGES
 * @property {string} src - Image URL from Unsplash
 * @property {string} alt - Descriptive alt text for accessibility
 * @property {string} caption - Short caption for lightbox display
 * @property {string} description - Detailed description for lightbox and screen readers
 * @property {string} className - Positioning and styling classes for mosaic layout
 */
export const PORTFOLIO_HERO_IMAGES = [
  {
    src: "https://images.unsplash.com/photo-1747121445324-8ed1aec4b451?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWtldXAlMjBhcnRpc3QlMjBwb3J0Zm9saW8lMjBjcmVhdGl2ZSUyMHdvcmt8ZW58MXx8fHwxNzU3NjY0NDgwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    alt: "Creative portfolio work showcasing artistic styling and festival makeup",
    caption: "Portfolio Excellence",
    description:
      "Portfolio work that demonstrates the range and excellence of Ash Shaw's makeup artistry across different styles and occasions",
    className:
      "absolute top-6 left-4 sm:top-12 sm:left-8 w-48 h-56 sm:w-72 sm:h-80 md:w-80 md:h-96 rounded-2xl bg-cover bg-center shadow-2xl transform rotate-3 z-20 border-4 border-white ring-4 ring-violet-200/50 cursor-pointer transition-transform hover:scale-105",
  },
  {
    src: "https://images.unsplash.com/photo-1713857973896-1d04d1e3e1ac?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmZXN0aXZhbCUyMGZhY2UlMjBwYWludCUyMHJhaW5ib3clMjBhcnRpc3RpY3xlbnwxfHx8fDE3NTc2NjQ0ODV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    alt: "Festival face paint with rainbow artistic design representing diverse portfolio offerings",
    caption: "Festival Artistry",
    description:
      "Vibrant festival face painting with rainbow artistic elements that showcase the diverse and colorful portfolio of makeup styles and techniques",
    className:
      "absolute top-0 right-0 w-40 h-48 sm:w-64 sm:h-72 md:w-72 md:h-80 rounded-2xl bg-cover bg-center shadow-xl transform -rotate-6 z-10 border-4 border-white ring-4 ring-rose-200/50 cursor-pointer transition-transform hover:scale-105",
  },
  {
    src: "https://images.unsplash.com/photo-1602494518965-195c6ec1c980?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxVViUyMG1ha2V1cCUyMGJsYWNrbGlnaHQlMjBuZW9uJTIwZ2xvd3xlbnwxfHx8fDE3NTc2NjQ0ODl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    alt: "UV reactive makeup glowing under blacklight showcasing specialized portfolio techniques",
    caption: "UV Specialization",
    description:
      "Specialized UV reactive makeup that glows under blacklight, demonstrating advanced techniques and specialized skills in the makeup portfolio",
    className:
      "absolute bottom-0 left-0 w-36 h-40 sm:w-60 sm:h-64 md:w-68 md:h-72 rounded-2xl bg-cover bg-center shadow-xl transform rotate-12 z-10 border-4 border-white ring-4 ring-cyan-200/50 cursor-pointer transition-transform hover:scale-105",
  },
];

/**
 * NOTE: Featured work data has been moved to the unified portfolio service
 * @see /utils/portfolioService.ts for the complete unified portfolio system
 * 
 * This ensures consistency between homepage FeaturedSection and PortfolioMainPage.
 * Both components now use the same data source and category system.
 */

/**
 * Featured nail art data for homepage Fusion Nails section
 * Showcases the breadth of nail artistry beyond traditional makeup
 *
 * @constant {Array<NailArtItem>} FEATURED_NAILS_DATA
 * @property {string} image - Figma asset path for nail art photography
 * @property {string} title - Creative name capturing the design aesthetic
 * @property {string} description - Style and technique description
 */
export const FEATURED_NAILS_DATA = [
  {
    id: "nails-neon-pop",
    title: "Neon Pop",
    description:
      "Vibrant red and green festival vibes with metallic accents",
    images: [
      {
        src: "https://images.unsplash.com/photo-1701626772688-909f2a0712bf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuZW9uJTIwbmFpbCUyMGFydCUyMHZpYnJhbnQlMjBjb2xvcnN8ZW58MXx8fHwxNzU5Mjk3MTY1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        alt: "Neon Pop nails - vibrant red and green with metallic accents",
        caption: "Neon Pop",
        description: "Bold festival-inspired nail art",
      },
      {
        src: "https://images.unsplash.com/photo-1678329190070-2c98fb9c0d01?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmFkaWVudCUyMG5haWwlMjBkZXNpZ24lMjBtZXRhbGxpY3xlbnwxfHx8fDE3NTkyOTcxNjl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        alt: "Neon Pop nails - alternative view showing texture",
        caption: "Metallic Details",
        description:
          "Close-up of the metallic texture and finish",
      },
    ],
    category: "Fusion Nails",
  },
  {
    id: "nails-gradient-dreams",
    title: "Gradient Dreams",
    description: "Purple to green ombre with metallic finish",
    images: [
      {
        src: "https://images.unsplash.com/photo-1678329190070-2c98fb9c0d01?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmFkaWVudCUyMG5haWwlMjBkZXNpZ24lMjBtZXRhbGxpY3xlbnwxfHx8fDE3NTkyOTcxNjl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        alt: "Gradient Dreams nails - purple to green ombre with metallic finish",
        caption: "Gradient Dreams",
        description:
          "Smooth color transition with metallic topcoat",
      },
      {
        src: "https://images.unsplash.com/photo-1590926918555-c058b85940d6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYWxheHklMjBuYWlsJTIwYXJ0JTIwaXJpZGVzY2VudCUyMHNoaW1tZXJ8ZW58MXx8fHwxNzU5Mjk3MTczfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        alt: "Gradient Dreams nails - showing different lighting",
        caption: "Color Shift",
        description:
          "How the gradient changes in different lighting",
      },
    ],
    category: "Fusion Nails",
  },
  {
    id: "nails-galaxy",
    title: "Galaxy Nails",
    description:
      "Iridescent blues and greens with cosmic shimmer",
    images: [
      {
        src: "https://images.unsplash.com/photo-1590926918555-c058b85940d6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYWxheHklMjBuYWlsJTIwYXJ0JTIwaXJpZGVzY2VudCUyMHNoaW1tZXJ8ZW58MXx8fHwxNzU5Mjk3MTczfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        alt: "Galaxy Nails - iridescent blues and greens with cosmic shimmer",
        caption: "Galaxy Nails",
        description:
          "Cosmic-inspired design with iridescent finish",
      },
      {
        src: "https://images.unsplash.com/photo-1701626772688-909f2a0712bf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuZW9uJTIwbmFpbCUyMGFydCUyMHZpYnJhbnQlMjBjb2xvcnN8ZW58MXx8fHwxNzU5Mjk3MTY1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        alt: "Galaxy Nails - detail of shimmer effect",
        caption: "Cosmic Shimmer",
        description:
          "Detail view of the iridescent shimmer effect",
      },
    ],
    category: "Fusion Nails",
  },
];

/**
 * Thailand portfolio collection capturing tropical festival experiences
 * Documents makeup artistry during Southeast Asian travel and cultural immersion
 *
 * @constant {Array<PortfolioItem>} THAILAND_WORK_DATA
 * @property {string} image - Figma asset path for Thailand work photography
 * @property {string} title - Descriptive title reflecting the experience
 * @property {string} location - Specific Thailand location or event context
 * @property {string} description - Personal stories and artistic details
 */
export const THAILAND_WORK_DATA = [
  {
    id: "lost-paradise",
    title: "Lost Paradise",
    subtitle: "Thailand",
    description:
      "My dear friend Gabi & sista from another mista!",
    images: [
      {
        src: lostParadiseImg,
        alt: "Lost Paradise - makeup artistry in Thailand with friend Gabi",
        caption: "Lost Paradise",
        description:
          "Beautiful makeup moment with dear friend Gabi in Thailand",
      },
    ],
    category: "Thailand Adventures",
  },
  {
    id: "eden-paradise-1",
    title: "Eden Paradise",
    subtitle: "Thailand",
    description:
      "Beautiful party person who kindly let me do her makeup.",
    images: [
      {
        src: edenParadiseImg,
        alt: "Eden Paradise - beautiful party makeup in Thailand",
        caption: "Party Look",
        description:
          "Beautiful party person who kindly let me do her makeup",
      },
    ],
    category: "Thailand Adventures",
  },
  {
    id: "eden-paradise-2",
    title: "Eden Paradise",
    subtitle: "Thailand",
    description:
      "Beautiful Shishi smiling radiance and shining bright.",
    images: [
      {
        src: edenShishiImg,
        alt: "Eden Paradise - Shishi with radiant makeup in Thailand",
        caption: "Radiant Smile",
        description:
          "Beautiful Shishi smiling radiance and shining bright",
      },
    ],
    category: "Thailand Adventures",
  },
];

/**
 * General festival portfolio showcasing diverse event makeup artistry
 * Represents the core of festival makeup services and creative expression
 *
 * @constant {Array<PortfolioItem>} FESTIVAL_WORK_DATA
 * @property {string} image - Figma asset path for festival makeup photography
 * @property {string} title - Creative title capturing the festival spirit
 * @property {string} location - Festival name and year for context
 * @property {string} description - Artistic approach and emotional impact
 */
export const FESTIVAL_WORK_DATA = [
  {
    id: 'origin-festival-2025',
    title: 'Origin Festival 2025: Birthday Adventure',
    subtitle: 'Birthday cycle adventure to Origin Festival',
    description: 'It was my birthday weekend, I cycled to the event over two days and then cycled home, I brought all my clothes, hammock gear and makeup bags in panniers on my gravel bike. I danced, celebrated and spread the joy of my makeup. I also had some stickers made.',
    images: [
      {
        src: originPinkMohawk,
        alt: 'Origin Festival Birthday - Pink Mohawk and Neon Eyes',
        caption: 'Festival Birthday Joy',
        description: 'Vibrant birthday celebration look with neon accents'
      },
      {
        src: originGeometric,
        alt: 'Origin Festival - Geometric Face Paint Profile',
        caption: 'Geometric Neon Art',
        description: 'Intricate geometric face paint design'
      },
      {
        src: originNeonGrid,
        alt: 'Origin Festival - Neon Grid Makeup',
        caption: 'Neon Night Vibes',
        description: 'Neon grid patterns coming alive at night'
      }
    ],
    category: 'Festival Makeup',
  },
  {
    id: "jungle-festival-koh-phangan",
    title: "Jungle Festival Magic",
    subtitle: "Koh Phangan, Friday 26 September",
    description:
      "Neon-charged UV artistry in the heart of Thailand's jungle, where blacklight meets natural island energy.",
    images: [
      {
        src: "https://images.unsplash.com/photo-1533408944756-4950754f3ebc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqdW5nbGUlMjBmZXN0aXZhbCUyMG1ha2V1cCUyMFVWJTIwbmVvbnxlbnwxfHx8fDE3NTkyMzc4MDV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        alt: "Jungle Festival Magic - neon UV makeup glowing in tropical jungle setting",
        caption: "Jungle Glow",
        description:
          "Vibrant UV reactive makeup creating magical glow effects in the jungle paradise",
      },
      {
        src: "https://images.unsplash.com/photo-1611253291108-bca55a6dfadc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cm9waWNhbCUyMGZhY2UlMjBwYWludCUyMGZlc3RpdmFsfGVufDF8fHx8MTc1OTIzNzgxM3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        alt: "Jungle Festival Magic - tropical face paint with nature-inspired designs",
        caption: "Tropical Artistry",
        description:
          "Nature-inspired tropical face paint celebrating the connection between art and jungle environment",
      },
      {
        src: "https://images.unsplash.com/photo-1609021622596-1883cb66e2c0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnbG93JTIwcGFpbnQlMjBibGFja2xpZ2h0JTIwbWFrZXVwfGVufDF8fHx8MTc1OTIzNzgxOXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        alt: "Jungle Festival Magic - blacklight reactive paint creating electric atmosphere",
        caption: "Electric Nights",
        description:
          "Blacklight reactive artistry transforming the jungle night into an electric wonderland",
      },
    ],
    category: "Festival Makeup",
  },
  {
    id: "festival-euphoria",
    title: "Festival Euphoria",
    subtitle: "Origin Festival 2024",
    description:
      "Explosive joy and electric rainbow face art with a purple mohawk, capturing the pure ecstasy of the festival beat.",
    images: [
      {
        src: "https://images.unsplash.com/photo-1530626334789-069de2d8f9b5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmZXN0aXZhbCUyMG1ha2V1cCUyMGNvbG9yZnVsJTIwZmFjZSUyMGFydCUyMG1vdW50YWlufGVufDF8fHx8MTc1NzU5MTYzOXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        alt: "Person with decorative face makeup in mountain festival setting",
        caption: "Mountain Magic",
        description:
          "Decorative festival face art in beautiful mountain setting",
      },
      {
        src: "https://images.unsplash.com/photo-1618644819365-d7fe62d8bdcb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmZXN0aXZhbCUyMGZhY2UlMjBwYWludCUyMHRlYWwlMjBzdHJpcGVzJTIwYXJ0aXN0aWN8ZW58MXx8fHwxNzU3NTkxNjQyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        alt: "Person with curly hair and artistic teal face stripes",
        caption: "Teal Artistry",
        description:
          "Beautiful teal face stripes creating artistic festival expression",
      },
      {
        src: "https://images.unsplash.com/photo-1667322219556-fe9966377c48?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmZXN0aXZhbCUyMG1ha2V1cCUyMGJsdWUlMjBmYWNlJTIwc3RyaXBlcyUyMGhhcHB5fGVufDF8fHx8MTc1NzU5MTY0Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        alt: "Joyful person with blue face stripes laughing at festival",
        caption: "Pure Joy",
        description:
          "Blue face stripes capturing the pure joy and energy of festival life",
      },
    ],
    category: "Festival Makeup",
  },
  {
    id: "forest-warrior",
    title: "Forest Warrior",
    subtitle: "Origin Festival 2024",
    description:
      "Bold red and purple face design with glittery accents creating a fierce yet beautiful festival look.",
    images: [
      {
        src: "https://images.unsplash.com/photo-1667322219556-fe9966377c48?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmZXN0aXZhbCUyMG1ha2V1cCUyMGJsdWUlMjBmYWNlJTIwc3RyaXBlcyUyMGhhcHB5fGVufDF8fHx8MTc1NzU5MTY0Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        alt: "Forest Warrior - bold red and purple face design with glittery accents at Origin Festival 2024",
        caption: "Main Look",
        description:
          "The complete forest warrior makeup with red and purple face design",
      },
      {
        src: "https://images.unsplash.com/photo-1603300382284-72ddf4985216?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxyYWluYm93JTIwZmFjZSUyMHBhaW50JTIwYXJ0aXN0aWMlMjBtYWtldXB8ZW58MXx8fHwxNzU3NTkwMzIwfDA&ixlib=rb-4.1.0&q=80&w=1080",
        alt: "Process shot showing the application technique",
        caption: "Process",
        description: "Behind-the-scenes application process",
      },
    ],
    category: "Festival Makeup",
  },
  {
    id: "new-year-magic",
    title: "New Year Magic",
    subtitle: "Little Forest NYE 2023/2024",
    description:
      "Contemplative face art with golden and blue tones, welcoming the new year with peaceful forest energy.",
    images: [
      {
        src: "https://images.unsplash.com/photo-1755223736694-3863b2f81de2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnRpc3RpYyUyMGZhY2UlMjBtYWtldXAlMjBnb2xkZW4lMjBibHVlJTIwdG9uZXN8ZW58MXx8fHwxNzU5MzI2MjAyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        alt: "New Year Magic - contemplative face art with golden and blue tones at Little Forest NYE 2023/2024",
        caption: "Main Look",
        description:
          "The complete New Year look with golden and blue tones",
      },
      {
        src: "https://images.unsplash.com/photo-1572176079325-8d8674afe124?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnRpc3RpYyUyMG1ha2V1cCUyMGVkaXRvcmlhbCUyMGZhbnRhc3l8ZW58MXx8fHwxNzU3NTkwMzM0fDA&ixlib=rb-4.1.0&q=80&w=1080",
        alt: "Artistic detail showing the golden and blue color combination",
        caption: "Color Detail",
        description:
          "Close-up of the golden and blue artistic elements",
      },
    ],
    category: "Festival Makeup",
  },
];

/**
 * Shankra Festival 2023 portfolio from Switzerland
 * Specialized collection documenting Swiss mountain festival experiences
 *
 * @constant {Array<PortfolioItem>} SHANKRA_WORK_DATA
 * @property {string} image - Figma asset path for Shankra festival photography
 * @property {string} title - Specific title reflecting Swiss mountain festival vibes
 * @property {string} location - Shankra Festival 2023, Switzerland location details
 * @property {string} description - Alpine context and cultural festival experience
 */
export const SHANKRA_WORK_DATA = [
  {
    id: "festival-connection",
    title: "Festival Connection",
    subtitle: "Shankra Festival 2023, Switzerland",
    description:
      "Joyful festival moment with turquoise eye design and infectious energy in the Swiss mountains.",
    images: [
      {
        src: festivalConnectionImg,
        alt: "Festival Connection - turquoise eye design at Shankra Festival 2023, Switzerland",
        caption: "Turquoise Eyes",
        description:
          "Joyful festival moment with turquoise eye design",
      },
    ],
    category: "Swiss Festivals",
  },
  {
    id: "alpine-bliss",
    title: "Alpine Bliss",
    subtitle: "Shankra Festival 2023, Switzerland",
    description:
      "Serene golden face paint with turquoise accents, capturing the peaceful mountain festival atmosphere.",
    images: [
      {
        src: alpineBlissImg,
        alt: "Alpine Bliss - golden face paint with turquoise accents at Shankra Festival 2023, Switzerland",
        caption: "Golden Serenity",
        description:
          "Serene golden face paint with turquoise accents",
      },
    ],
    category: "Swiss Festivals",
  },
  {
    id: "mountain-rainbow",
    title: "Mountain Rainbow",
    subtitle: "Shankra Festival 2023, Switzerland",
    description:
      "Vibrant rainbow face art with intricate patterns celebrating the colorful spirit of Swiss festival culture.",
    images: [
      {
        src: mountainRainbowImg,
        alt: "Mountain Rainbow - vibrant rainbow face art at Shankra Festival 2023, Switzerland",
        caption: "Rainbow Patterns",
        description:
          "Vibrant rainbow face art with intricate patterns",
      },
    ],
    category: "Swiss Festivals",
  },
];

/**
 * Reiserfieber Switzerland portfolio collection
 * Documents Swiss festival culture and mountain celebration makeup artistry
 *
 * @constant {Array<PortfolioItem>} REISERFIEBER_WORK_DATA
 * @property {string} image - Figma asset path for Reiserfieber event photography
 * @property {string} title - Title capturing Alpine celebration aesthetics
 * @property {string} location - Reiserfieber, Switzerland event details
 * @property {string} description - Swiss mountain festival atmosphere and artistry
 */
export const REISERFIEBER_WORK_DATA = [
  {
    id: "alpine-glow",
    title: "Alpine Glow",
    subtitle: "Reiserfieber, Switzerland",
    description:
      "Delicate turquoise and purple face art with glitter accents creating magical festival vibes in the Swiss mountains.",
    images: [
      {
        src: alpineGlowImg,
        alt: "Alpine Glow - turquoise and purple face art at Reiserfieber, Switzerland",
        caption: "Delicate Glow",
        description:
          "Delicate turquoise and purple face art with glitter accents",
      },
    ],
    category: "Swiss Festivals",
  },
  {
    id: "mountain-spirit",
    title: "Mountain Spirit",
    subtitle: "Reiserfieber, Switzerland",
    description:
      "Bold rainbow face stripe with festival hat, capturing the joyful energy of Swiss outdoor celebrations.",
    images: [
      {
        src: mountainSpiritImg,
        alt: "Mountain Spirit - rainbow face stripe at Reiserfieber, Switzerland",
        caption: "Rainbow Stripe",
        description:
          "Bold rainbow face stripe with festival hat",
      },
    ],
    category: "Swiss Festivals",
  },
  {
    id: "festival-joy",
    title: "Festival Joy",
    subtitle: "Reiserfieber, Switzerland",
    description:
      "Vibrant purple and turquoise eye design with infectious smile radiating pure festival happiness in the Alps.",
    images: [
      {
        src: festivalJoyImg,
        alt: "Festival Joy - purple and turquoise eye design at Reiserfieber, Switzerland",
        caption: "Joyful Eyes",
        description:
          "Vibrant purple and turquoise eye design with infectious smile",
      },
    ],
    category: "Swiss Festivals",
  },
];

/**
 * UV and blacklight reactive makeup portfolio
 * Specialized collection showcasing nightlife and rave makeup artistry
 *
 * @constant {Array<PortfolioItem>} UV_MAKEUP_DATA
 * @property {string} image - Figma asset path for UV makeup photography
 * @property {string} title - Dynamic title reflecting electric/neon aesthetics
 * @property {string} location - Club, rave, or event location context
 * @property {string} description - UV reactive techniques and artistic impact
 */
export const UV_MAKEUP_DATA = [
  {
    id: "neon-warrior",
    title: "Neon Warrior",
    subtitle: "Festival",
    description:
      "Beautiful UV reactive makeup with rainbow streaks creating vibrant festival energy.",
    images: [
      {
        src: gondwanaRainbowImg,
        alt: "Neon Warrior - UV face paint with vibrant rainbow streaks at festival",
        caption: "Under UV Light",
        description:
          "Beautiful woman with rainbow UV face paint streaks and bright smile",
      },
      {
        src: "https://images.unsplash.com/photo-1602494518965-195c6ec1c980?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxVViUyMG1ha2V1cCUyMGJsYWNrbGlnaHQlMjBuZW9uJTIwZ2xvd2luZ3xlbnwxfHx8fDE3NTc1OTAzMjN8MA&ixlib=rb-4.1.0&q=80&w=1080",
        alt: "UV reactive makeup glowing in blacklight",
        caption: "Glow Effect",
        description:
          "The UV reactive paint creating a glowing effect",
      },
      {
        src: "https://images.unsplash.com/photo-1572176079325-8d8674afe124?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnRpc3RpYyUyMG1ha2V1cCUyMGVkaXRvcmlhbCUyMGZhbnRhc3l8ZW58MXx8fHwxNzU3NTkwMzM0fDA&ixlib=rb-4.1.0&q=80&w=1080",
        alt: "Close-up artistic detail of neon makeup elements",
        caption: "Artistic Detail",
        description:
          "Close-up showing the artistic neon makeup elements and technique",
      },
    ],
    category: "UV Makeup",
  },
  {
    id: "rainbow-lightning",
    title: "Rainbow Lightning",
    subtitle: "UV Party",
    description:
      "Vibrant UV dots under eyes with rainbow body paint creating magical festival vibes.",
    images: [
      {
        src: rainbowLightningImg,
        alt: "Rainbow Lightning - UV dots under eyes with rainbow body paint",
        caption: "Rainbow Dots",
        description: "Redhead with UV dots under eyes and rainbow body paint",
      },
      {
        src: "https://images.unsplash.com/photo-1603300382284-72ddf4985216?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxyYWluYm93JTIwZmFjZSUyMHBhaW50JTIwYXJ0aXN0aWMlMjBtYWtldXB8ZW58MXx8fHwxNzU3NTkwMzIwfDA&ixlib=rb-4.1.0&q=80&w=1080",
        alt: "Creative rainbow makeup technique close-up",
        caption: "Technique Detail",
        description:
          "Close-up showing the rainbow lightning application technique",
      },
    ],
    category: "UV Makeup",
  },
  {
    id: "electric-blue",
    title: "Electric Blue",
    subtitle: "Underground Rave",
    description:
      "Bold rainbow UV face paint with unique accessories radiating joy and creativity.",
    images: [
      {
        src: electricBlueImg,
        alt: "Electric Blue - rainbow UV face paint with jellyfish ear accessory",
        caption: "Rainbow UV",
        description:
          "Man with rainbow UV face paint and jellyfish ear accessory",
      },
    ],
    category: "UV Makeup",
  },
];

/**
 * Comprehensive nail art portfolio for portfolio page display
 * Fusion Nails collection showcasing diverse nail artistry techniques
 *
 * @constant {Array<NailArtItem>} NAIL_ART_DATA
 * @property {string} image - Figma asset path for nail art detail photography
 * @property {string} title - Creative title describing the nail art style
 * @property {string} description - Technique, materials, and visual impact description
 */
export const NAIL_ART_DATA = [
  {
    id: "rainbow-fusion",
    title: "Rainbow Fusion",
    subtitle: "Sticker Art Collection",
    description:
      "Colorful sticker art with holographic details creating a playful rainbow effect",
    images: [
      {
        src: rainbowFusionImg,
        alt: "Rainbow Fusion nail art with colorful sticker art and holographic details",
        caption: "Full Set",
        description: "Complete rainbow fusion nail art set",
      },
      {
        src: "https://images.unsplash.com/photo-1571290274554-6a2eaa771e5f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcmVhdGl2ZSUyMG5haWwlMjBhcnQlMjBjb2xvcmZ1bCUyMGRlc2lnbnxlbnwxfHx8fDE3NTc1OTAzMjd8MA&ixlib=rb-4.1.0&q=80&w=1080",
        alt: "Close-up detail of holographic nail art elements",
        caption: "Detail View",
        description:
          "Close-up showing the holographic sticker details",
      },
    ],
    category: "Nail Art",
  },
  {
    id: "galaxy-nails",
    title: "Galaxy Nails",
    subtitle: "Cosmic Collection",
    description:
      "Iridescent blues and greens with cosmic shimmer creating an otherworldly effect",
    images: [
      {
        src: galaxyNailsImg,
        alt: "Galaxy Nails with iridescent blues and greens with cosmic shimmer",
        caption: "Galaxy Effect",
        description:
          "Galaxy-inspired nail art with cosmic shimmer",
      },
    ],
    category: "Nail Art",
  },
  {
    id: "gradient-dreams",
    title: "Gradient Dreams",
    subtitle: "Ombre Collection",
    description:
      "Purple to green ombre with metallic finish creating a dreamy transition effect",
    images: [
      {
        src: gradientDreamsImg,
        alt: "Gradient Dreams nail art with purple to green ombre and metallic finish",
        caption: "Ombre Effect",
        description:
          "Purple to green gradient with metallic finish",
      },
    ],
    category: "Nail Art",
  },
];

/**
 * Portfolio sections configuration with Contentful tag mapping
 * Each section corresponds to specific tags in Contentful for dynamic content management
 * This allows content creators to tag entries in Contentful and have them automatically 
 * appear in the correct portfolio sections on the website.
 *
 * @constant {Array<PortfolioSection>} PORTFOLIO_SECTIONS
 * @property {string} id - Unique section identifier for navigation and styling
 * @property {string} title - Display title for the portfolio section
 * @property {string} description - Descriptive text explaining the section content
 * @property {string[]} contentfulTags - Array of Contentful tags to filter content for this section
 * @property {string} fallbackCategory - Fallback category if no tagged content is found
 * @property {string} gradientFrom - Starting color for section gradient theming
 * @property {string} gradientTo - Ending color for section gradient theming
 * @property {string} backgroundGradient - Tailwind gradient classes for background
 * @property {string} titleGradient - Tailwind gradient classes for section titles
 * @property {string} subtitleGradient - Tailwind gradient classes for subtitles
 * @property {Array<string>} decorativeColors - Hex colors for floating decorative elements
 * @property {Array<PortfolioItem>} entries - Static portfolio items (fallback when Contentful unavailable)
 */
export const PORTFOLIO_SECTIONS = [
  {
    id: "featured-work",
    title: "Featured Work",
    description:
      "Standout pieces that capture the essence of festival artistry and creative expression.",
    contentfulTags: ["featured", "portfolio-highlight", "showcase"],
    fallbackCategory: "featured",
    gradientFrom: "#FF10F0",
    gradientTo: "#B026FF",
    backgroundGradient:
      "from-fuchsia-900/40 via-purple-900/40 to-blue-900/40",
    titleGradient: "from-fuchsia-400 via-purple-400 to-cyan-400",
    subtitleGradient: "from-fuchsia-500 to-purple-500",
    decorativeColors: [
      "#FF10F0",
      "#B026FF",
      "#00FFFF",
      "#39FF14",
    ],
    entries: [], // Now handled by unified portfolio service
  },
  {
    id: "festivals",
    title: "Festival Adventures",
    description:
      "From Origin Festival's explosive energy to Little Forest's peaceful New Year celebrations — capturing the diverse spirit of festival culture through bold face art and vibrant self-expression.",
    contentfulTags: ["festival", "music-festival", "face-paint", "celebration"],
    fallbackCategory: "festival",
    gradientFrom: "#FF5E00", // Neon Orange
    gradientTo: "#39FF14", // Neon Green
    backgroundGradient:
      "from-orange-900/40 via-yellow-900/40 to-green-900/40",
    titleGradient:
      "from-orange-400 via-yellow-400 to-green-400",
    subtitleGradient: "from-orange-500 to-green-500",
    decorativeColors: [
      "#FF5E00",
      "#FFE600",
      "#39FF14",
      "#00FF99",
    ],
    entries: FESTIVAL_WORK_DATA,
  },
  {
    id: "thailand",
    title: "Thailand Adventures",
    description:
      "Tropical makeup exploration during travels through Thailand, blending local culture with artistic expression.",
    contentfulTags: ["thailand", "travel", "tropical", "culture"],
    fallbackCategory: "travel",
    gradientFrom: "#FFD700",
    gradientTo: "#FF5E00",
    backgroundGradient:
      "from-yellow-900/40 via-orange-900/40 to-red-900/40",
    titleGradient: "from-yellow-400 via-orange-400 to-red-400",
    subtitleGradient: "from-yellow-500 to-red-500",
    decorativeColors: [
      "#FFD700",
      "#FF5E00",
      "#FF10F0",
      "#FF0000",
    ],
    entries: THAILAND_WORK_DATA,
  },
  {
    id: "shankra-2023",
    title: "Shankra Festival 2023",
    description:
      "Swiss mountain festival experiences with alpine-inspired makeup artistry in breathtaking natural settings.",
    contentfulTags: ["shankra", "switzerland", "mountain-festival", "alpine"],
    fallbackCategory: "swiss-festivals",
    gradientFrom: "#39FF14",
    gradientTo: "#00FFFF",
    backgroundGradient:
      "from-green-900/40 via-emerald-900/40 to-teal-900/40",
    titleGradient: "from-green-400 via-emerald-400 to-cyan-400",
    subtitleGradient: "from-green-500 to-cyan-500",
    decorativeColors: [
      "#39FF14",
      "#00FFFF",
      "#00FF99",
      "#B026FF",
    ],
    entries: SHANKRA_WORK_DATA,
  },
  {
    id: "reiserfieber",
    title: "Reiserfieber Switzerland",
    description:
      "Mountain celebration makeup showcasing the vibrant energy of Swiss outdoor festival culture.",
    contentfulTags: ["reiserfieber", "switzerland", "outdoor-festival", "mountain"],
    fallbackCategory: "swiss-festivals",
    gradientFrom: "#B026FF",
    gradientTo: "#1F51FF",
    backgroundGradient:
      "from-blue-900/40 via-indigo-900/40 to-purple-900/40",
    titleGradient: "from-blue-400 via-indigo-400 to-purple-400",
    subtitleGradient: "from-blue-500 to-purple-500",
    decorativeColors: [
      "#1F51FF",
      "#B026FF",
      "#8b5cf6",
      "#a855f7",
    ],
    entries: REISERFIEBER_WORK_DATA,
  },
  {
    id: "uv-makeup",
    title: "UV & Blacklight",
    description:
      "Electric nightlife artistry using UV-reactive paints that come alive under blacklight, perfect for clubs and raves.",
    contentfulTags: ["uv", "blacklight", "nightlife", "rave", "club"],
    fallbackCategory: "uv-makeup",
    gradientFrom: "#00FFFF",
    gradientTo: "#FF10F0",
    backgroundGradient:
      "from-cyan-900/40 via-pink-900/40 to-purple-900/40",
    titleGradient: "from-cyan-400 via-pink-400 to-purple-400",
    subtitleGradient: "from-cyan-500 to-purple-500",
    decorativeColors: [
      "#00FFFF",
      "#FF10F0",
      "#B026FF",
      "#39FF14",
    ],
    entries: UV_MAKEUP_DATA,
  },
  {
    id: "fusion-nails",
    title: "Fusion Nails",
    description:
      "Creative nail artistry combining colors, textures, and innovative techniques for unique finger-focused designs.",
    contentfulTags: ["nails", "nail-art", "fusion-nails", "manicure"],
    fallbackCategory: "nail-art",
    gradientFrom: "#FF10F0",
    gradientTo: "#FF5E00",
    backgroundGradient:
      "from-rose-900/40 via-pink-900/40 to-orange-900/40",
    titleGradient: "from-rose-400 via-pink-400 to-orange-400",
    subtitleGradient: "from-rose-500 to-orange-500",
    decorativeColors: [
      "#FF10F0",
      "#ec4899",
      "#f97316",
      "#ea580c",
    ],
    entries: NAIL_ART_DATA,
  },
];

/**
 * About page section themes configuration
 * Defines consistent color schemes and styling for each section based on content
 *
 * @constant {Object} ABOUT_SECTION_THEMES
 * @property {string} key - Section identifier matching AboutPage section names
 * @property {Object} backgroundGradient - Gradient colors for section background
 * @property {Object} titleGradient - Gradient colors for section titles
 * @property {Object} cardBorder - Border gradient colors for section cards
 * @property {Object} decorativeColor - Main decorative color for floating elements
 * @property {Object} quoteGradient - Gradient colors for pull quotes
 */
export const ABOUT_SECTION_THEMES = {
  journey: {
    backgroundGradient: {
      from: "neon-orange",
      via: "neon-yellow",
      to: "neon-orange",
    },
    titleColor: "text-neon-orange",
    cardBorder: { from: "neon-orange", to: "neon-yellow" },
    decorativeColor: "neon-orange neon-yellow",
    quoteColor: "text-neon-yellow",
    accentGradient: { from: "neon-orange", to: "neon-yellow" },
    name: "journey",
  },
  festival: {
    backgroundGradient: {
      from: "neon-green",
      via: "neon-cyan",
      to: "neon-green",
    },
    titleColor: "text-neon-green",
    cardBorder: { from: "neon-green", to: "neon-cyan" },
    decorativeColor: "neon-green neon-cyan",
    quoteColor: "text-neon-cyan",
    accentGradient: { from: "neon-green", to: "neon-cyan" },
    name: "festival",
  },
  berlin: {
    backgroundGradient: {
      from: "neon-purple",
      via: "neon-pink",
      to: "neon-purple",
    },
    titleColor: "text-neon-purple",
    cardBorder: { from: "neon-purple", to: "neon-pink" },
    decorativeColor: "neon-purple neon-pink",
    quoteColor: "text-neon-pink",
    accentGradient: { from: "neon-purple", to: "neon-pink" },
    name: "berlin",
  },
  uv: {
    backgroundGradient: {
      from: "neon-cyan",
      via: "neon-blue",
      to: "neon-cyan",
    },
    titleColor: "text-neon-blue",
    cardBorder: { from: "neon-cyan", to: "neon-blue" },
    decorativeColor: "neon-cyan neon-blue",
    quoteColor: "text-neon-cyan",
    accentGradient: { from: "neon-cyan", to: "neon-blue" },
    name: "uv",
  },
  mousse: {
    backgroundGradient: {
      from: "neon-pink",
      via: "neon-red",
      to: "neon-pink",
    },
    titleColor: "text-neon-red",
    cardBorder: { from: "neon-pink", to: "neon-red" },
    decorativeColor: "neon-pink neon-red",
    quoteColor: "text-neon-pink",
    accentGradient: { from: "neon-pink", to: "neon-red" },
    name: "mousse",
  },
  nails: {
    backgroundGradient: {
      from: "neon-cyan",
      via: "neon-green",
      to: "neon-cyan",
    },
    titleColor: "text-neon-cyan",
    cardBorder: { from: "neon-cyan", to: "neon-green" },
    decorativeColor: "neon-cyan neon-green",
    quoteColor: "text-neon-green",
    accentGradient: { from: "neon-cyan", to: "neon-green" },
    name: "nails",
  },
  creative: {
    backgroundGradient: {
      from: "neon-blue",
      via: "neon-purple",
      to: "neon-blue",
    },
    titleColor: "text-neon-blue",
    cardBorder: { from: "neon-blue", to: "neon-purple" },
    decorativeColor: "neon-blue neon-purple",
    quoteColor: "text-neon-purple",
    accentGradient: { from: "neon-blue", to: "neon-purple" },
    name: "creative",
  },
  future: {
    backgroundGradient: {
      from: "neon-purple",
      via: "neon-pink",
      to: "neon-purple",
    },
    titleColor: "text-neon-purple",
    cardBorder: { from: "neon-purple", to: "neon-pink" },
    decorativeColor: "neon-purple neon-pink",
    quoteColor: "text-neon-pink",
    accentGradient: { from: "neon-purple", to: "neon-pink" },
    name: "future",
  },
};