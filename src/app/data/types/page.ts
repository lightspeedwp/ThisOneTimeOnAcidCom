/**
 * @fileoverview Page content type definitions
 * Common types for page components and content
 * 
 * @module data/types/page
 * @author Ash Shaw Portfolio Team
 * @version 2.0.0
 */

/**
 * Hero image interface
 * Used across homepage, about, and portfolio pages
 */
export interface HeroImage {
  /** Image source URL or Figma asset */
  src: string;
  
  /** Accessible alt text */
  alt: string;
  
  /** Image caption for lightbox */
  caption?: string;
  
  /** Detailed description for accessibility */
  description?: string;
  
  /** Image title */
  title?: string;
  
  /** Position hint for layout (semantic, not CSS) */
  position?: 'left' | 'center' | 'right' | 'bottom' | 'top';
  
  /** Aspect ratio hint for responsive layout */
  aspectRatio?: '1:1' | '4:3' | '3:4' | '16:9' | '9:16' | string;
}

/**
 * Why/Reason content block
 * Used in Why Section and other feature lists
 */
export interface WhyReason {
  /** Unique identifier */
  id: string;
  
  /** Reason title */
  title: string;
  
  /** Icon identifier or emoji */
  icon: string;
  
  /** Reason description/explanation */
  description: string;
  
  /** Display order */
  order?: number;
}

/**
 * Content block for About sections
 */
export interface ContentBlock {
  /** Content type */
  type: 'paragraph' | 'heading' | 'list';
  
  /** Text content (for paragraph and heading) */
  text?: string;
  
  /** List items (for list type) */
  items?: string[];
}

/**
 * About page section interface
 */
export interface AboutSection {
  /** Section identifier */
  id: string;
  
  /** Section title */
  title: string;
  
  /** Section content blocks */
  content: ContentBlock[];
  
  /** Optional section image */
  image?: HeroImage;
  
  /** Display order */
  order: number;
}

/**
 * Hero content interface
 */
export interface HeroContent {
  title: string;
  subtitle: string;
  description: string;
  ctaText: string;
  ctaLink: string;
  backgroundImages?: HeroImage[];
}

/**
 * Page content interface
 */
export interface PageContent {
  id: string;
  title: string;
  metaDescription: string;
  hero: HeroContent;
  sections?: {
    why?: WhyReason[];
    [key: string]: any;
  };
}
