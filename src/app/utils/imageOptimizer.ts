/**
 * @fileoverview Client-side image optimization utility
 *
 * Provides runtime image resizing and compression using the Canvas API.
 * This is designed for a static-asset environment (Figma Make / Netlify)
 * where server-side image processing (sharp, imagemin) is not available.
 *
 * Key capabilities:
 * - Resize images to target dimensions while preserving aspect ratio
 * - Compress to JPEG/WebP at configurable quality
 * - Generate multiple responsive variants (srcSet)
 * - Cache optimized blobs to avoid re-processing
 * - Estimate file size savings
 *
 * Usage:
 *   import { optimizeImage, generateSrcSet } from '@/utils/imageOptimizer';
 *
 *   const optimized = await optimizeImage(src, { maxWidth: 800, quality: 0.8 });
 *   // optimized.url — object URL for the resized image
 *   // optimized.width, optimized.height — final dimensions
 *   // optimized.sizeBytes — approximate output size
 *
 * @module utils/imageOptimizer
 * @version 1.0.0
 */

/* ── Types ── */

export interface OptimizeOptions {
  /** Maximum width in px. Height scales proportionally. Default: 1200 */
  maxWidth?: number;
  /** Maximum height in px. Width scales proportionally. Default: undefined (unconstrained) */
  maxHeight?: number;
  /** Output format. Default: 'image/webp' */
  format?: 'image/webp' | 'image/jpeg' | 'image/png';
  /** Compression quality 0-1. Only applies to webp/jpeg. Default: 0.82 */
  quality?: number;
  /** Device pixel ratio multiplier. Default: 1 */
  devicePixelRatio?: number;
}

export interface OptimizedResult {
  /** Object URL for the optimised image (call URL.revokeObjectURL when done) */
  url: string;
  /** Final pixel width */
  width: number;
  /** Final pixel height */
  height: number;
  /** Approximate output size in bytes */
  sizeBytes: number;
  /** Output MIME type */
  format: string;
}

export interface SrcSetEntry {
  url: string;
  width: number;
  descriptor: string;
}

/* ── In-memory cache ── */

const cache: Map<string, OptimizedResult> = new Map();

function cacheKey(src: string, opts: OptimizeOptions): string {
  const mw = opts.maxWidth !== undefined && opts.maxWidth !== null ? opts.maxWidth : 'auto';
  const mh = opts.maxHeight !== undefined && opts.maxHeight !== null ? opts.maxHeight : 'auto';
  const fmt = opts.format || 'webp';
  const q = opts.quality !== undefined && opts.quality !== null ? opts.quality : 82;
  const dpr = opts.devicePixelRatio !== undefined && opts.devicePixelRatio !== null ? opts.devicePixelRatio : 1;
  return `${src}__${mw}x${mh}_${fmt}_q${q}_dpr${dpr}`;
}

/* ── Preset breakpoints for responsive srcSet generation ── */

export const RESPONSIVE_WIDTHS = [320, 640, 768, 1024, 1280, 1536] as const;

/** Preset size profiles for common usage contexts */
export const IMAGE_PRESETS = {
  /** Sticker / decorative graphic — small, heavily compressed */
  sticker: { maxWidth: 320, quality: 0.7, format: 'image/webp' as const },
  /** Thumbnail / card image */
  thumbnail: { maxWidth: 480, quality: 0.78, format: 'image/webp' as const },
  /** Standard content image */
  content: { maxWidth: 800, quality: 0.82, format: 'image/webp' as const },
  /** Hero / banner image */
  hero: { maxWidth: 1440, quality: 0.85, format: 'image/webp' as const },
  /** Portfolio gallery — high quality */
  gallery: { maxWidth: 1200, quality: 0.88, format: 'image/webp' as const },
  /** Full-screen lightbox */
  lightbox: { maxWidth: 1920, quality: 0.9, format: 'image/webp' as const },
} as const;

/* ── Core optimise function ── */

/**
 * Load an image source and return it resized/compressed as an object URL.
 *
 * @param src - Image source: URL string, imported asset path, or data URL
 * @param options - Resize and compression options
 * @returns Promise resolving to the optimised result
 */
export async function optimizeImage(
  src: string,
  options: OptimizeOptions = {}
): Promise<OptimizedResult> {
  const {
    maxWidth = 1200,
    maxHeight,
    format = 'image/webp',
    quality = 0.82,
    devicePixelRatio = 1,
  } = options;

  const key = cacheKey(src, options);
  const cached = cache.get(key);
  if (cached) return cached;

  // Load the source image
  const img = await loadImage(src);

  // Calculate target dimensions
  const effectiveMaxWidth = maxWidth * devicePixelRatio;
  const effectiveMaxHeight = maxHeight ? maxHeight * devicePixelRatio : undefined;

  let { width, height } = img;

  // Scale down to fit within max bounds (never scale up)
  if (width > effectiveMaxWidth) {
    height = Math.round(height * (effectiveMaxWidth / width));
    width = effectiveMaxWidth;
  }
  if (effectiveMaxHeight && height > effectiveMaxHeight) {
    width = Math.round(width * (effectiveMaxHeight / height));
    height = effectiveMaxHeight;
  }

  // Draw to canvas
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (!ctx) {
    throw new Error('Canvas 2D context not available');
  }

  // Use high-quality resampling
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';
  ctx.drawImage(img, 0, 0, width, height);

  // Export as blob
  const blob = await new Promise<Blob>((resolve, reject) => {
    canvas.toBlob(
      (b) => (b ? resolve(b) : reject(new Error('Canvas toBlob failed'))),
      format,
      quality
    );
  });

  const url = URL.createObjectURL(blob);

  const result: OptimizedResult = {
    url,
    width,
    height,
    sizeBytes: blob.size,
    format,
  };

  cache.set(key, result);
  return result;
}

/**
 * Generate a responsive srcSet string for an image.
 * Produces optimised variants at each breakpoint width ≤ the original image width.
 *
 * @param src - Image source
 * @param options - Base compression options (width overrides are automatic)
 * @param widths - Array of breakpoint widths (default: RESPONSIVE_WIDTHS)
 * @returns Promise resolving to an array of srcSet entries
 */
export async function generateSrcSet(
  src: string,
  options: Omit<OptimizeOptions, 'maxWidth'> = {},
  widths: readonly number[] = RESPONSIVE_WIDTHS
): Promise<SrcSetEntry[]> {
  const img = await loadImage(src);
  const naturalWidth = img.width;

  // Only generate variants for widths smaller than the original
  const applicableWidths = widths.filter(w => w <= naturalWidth);

  const entries = await Promise.all(
    applicableWidths.map(async (w) => {
      const result = await optimizeImage(src, { ...options, maxWidth: w });
      return {
        url: result.url,
        width: result.width,
        descriptor: `${result.width}w`,
      };
    })
  );

  return entries;
}

/**
 * Estimate the byte savings from optimising an image.
 *
 * @param src - Image source
 * @param options - Optimisation options
 * @returns Promise resolving to { original, optimized, savedBytes, savedPercent }
 */
export async function estimateSavings(
  src: string,
  options: OptimizeOptions = {}
): Promise<{
  originalBytes: number;
  optimizedBytes: number;
  savedBytes: number;
  savedPercent: number;
}> {
  // Fetch original size
  const response = await fetch(src);
  const originalBlob = await response.blob();
  const originalBytes = originalBlob.size;

  const optimized = await optimizeImage(src, options);

  const savedBytes = originalBytes - optimized.sizeBytes;
  const savedPercent = originalBytes > 0 ? (savedBytes / originalBytes) * 100 : 0;

  return {
    originalBytes,
    optimizedBytes: optimized.sizeBytes,
    savedBytes,
    savedPercent: Math.round(savedPercent * 10) / 10,
  };
}

/**
 * Revoke all cached object URLs and clear the cache.
 * Call this during cleanup (e.g., component unmount, route change).
 */
export function clearOptimizedCache(): void {
  cache.forEach((result) => {
    try {
      URL.revokeObjectURL(result.url);
    } catch {
      // Silently ignore already-revoked URLs
    }
  });
  cache.clear();
}

/**
 * Format bytes into a human-readable string.
 */
export function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

/* ── Internal helpers ── */

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error(`Failed to load image: ${src}`));
    img.src = src;
  });
}