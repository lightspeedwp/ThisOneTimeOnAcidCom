/**
 * @fileoverview OptimizedImage component
 *
 * A drop-in replacement for `<img>` that automatically resizes and compresses
 * images at runtime using the Canvas API. Designed for static-asset environments
 * (Figma Make / Netlify) where server-side image processing is unavailable.
 *
 * Features:
 * - Automatic downsizing to a max width appropriate for the usage context
 * - WebP compression with configurable quality
 * - Lazy loading by default
 * - Low-quality blurred placeholder while optimising (progressive loading)
 * - Preset profiles: sticker, thumbnail, content, hero, gallery, lightbox
 * - Falls back to original src if Canvas optimisation fails
 * - Skips Canvas processing for external URLs (CORS-safe)
 *
 * Usage:
 *   <OptimizedImage src={myImage} alt="..." preset="thumbnail" />
 *   <OptimizedImage src={heroImg} alt="..." maxWidth={1440} quality={0.85} />
 *
 * @component OptimizedImage
 * @version 1.1.0 - Skip Canvas for external URLs to avoid CORS cache pollution
 */

import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  optimizeImage,
  IMAGE_PRESETS,
  formatBytes,
  type OptimizeOptions,
  type OptimizedResult,
} from '../../utils/imageOptimizer';
import { lookupOptimizedAsset } from '../../utils/imageManifest';
import '../../../styles/blocks/optimized-image.css';

/** Named preset keys */
export type ImagePreset = keyof typeof IMAGE_PRESETS;

/** Bundler-safe: avoid nested capital-letter generics in interface extends */
type ImgPropsWithoutSrc = Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'src'>;

export interface OptimizedImageProps extends ImgPropsWithoutSrc {
  /** Image source — imported asset, URL, or data URI */
  src: string;
  /** Alt text (required for accessibility) */
  alt: string;
  /** Named preset profile — overrides maxWidth/quality/format */
  preset?: ImagePreset;
  /** Maximum output width in px (default: from preset or 1200) */
  maxWidth?: number;
  /** Maximum output height in px */
  maxHeight?: number;
  /** Compression quality 0-1 (default: from preset or 0.82) */
  quality?: number;
  /** Output format (default: 'image/webp') */
  format?: 'image/webp' | 'image/jpeg' | 'image/png';
  /** Show blurred placeholder while optimising. Default: true */
  showPlaceholder?: boolean;
  /** Callback fired after optimisation completes */
  onOptimized?: (result: OptimizedResult) => void;
}

export function OptimizedImage({
  src,
  alt,
  preset,
  maxWidth,
  maxHeight,
  quality,
  format,
  showPlaceholder = true,
  onOptimized,
  className,
  ...rest
}: OptimizedImageProps) {
  /**
   * External URL detection — skip Canvas optimisation for cross-origin images.
   * Canvas API requires CORS headers on the image response, and setting
   * `crossOrigin = 'anonymous'` on the Image loader can poison the browser
   * cache so even the fallback `<img>` gets a cached CORS-failed response.
   * External CDN URLs (Unsplash, etc.) are already server-optimised.
   */
  const startsWithHttp = src ? src.startsWith('http://') : false;
  const startsWithHttps = src ? src.startsWith('https://') : false;
  const isExternalUrl = startsWithHttp || startsWithHttps;

  const optimizedSrcInit: string | null = null;
  const [optimizedSrc, setOptimizedSrc] = useState(optimizedSrcInit);
  const optimizedSrcSetInit: string | undefined = undefined;
  const [optimizedSrcSet, setOptimizedSrcSet] = useState(optimizedSrcSetInit);
  const [isLoading, setIsLoading] = useState(!isExternalUrl);
  const [error, setError] = useState(false);
  const mountedRef = useRef(true);

  // Merge preset with explicit overrides
  const resolvedOptions: OptimizeOptions = React.useMemo(() => {
    const base = preset ? { ...IMAGE_PRESETS[preset] } : {};
    return {
      ...base,
      ...(maxWidth !== undefined ? { maxWidth } : {}),
      ...(maxHeight !== undefined ? { maxHeight } : {}),
      ...(quality !== undefined ? { quality } : {}),
      ...(format !== undefined ? { format } : {}),
    };
  }, [preset, maxWidth, maxHeight, quality, format]);

  const optimize = useCallback(async () => {
    const shouldSkip = !src || isExternalUrl;
    if (shouldSkip) return;

    // Check for pre-optimized asset first (build-time optimization)
    if (preset) {
      const preOptimized = lookupOptimizedAsset(src, preset);
      if (preOptimized) {
        if (mountedRef.current) {
          setOptimizedSrc(preOptimized.path);
          setOptimizedSrcSet(preOptimized.srcSet);
          setIsLoading(false);
          // Fire callback with simulated result from manifest
          if (onOptimized) {
            onOptimized({
              url: preOptimized.path,
              width: preOptimized.width,
              height: preOptimized.height ? preOptimized.height : 0,
              sizeBytes: preOptimized.size ? preOptimized.size : 0,
              format: 'image/webp',
            });
          }
          // Dev logging removed — import.meta.env.DEV crashes this bundler
        }
        return; // Skip runtime optimization
      }
    }

    setIsLoading(true);
    setError(false);

    try {
      const result = await optimizeImage(src, resolvedOptions);
      if (mountedRef.current) {
        setOptimizedSrc(result.url);
        setOptimizedSrcSet(undefined); // Reset if falling back to runtime
        setIsLoading(false);
        if (onOptimized) onOptimized(result);

        // Dev logging removed — import.meta.env.DEV crashes this bundler
      }
    } catch {
      if (mountedRef.current) {
        // Fall back to original source
        setOptimizedSrc(null);
        setOptimizedSrcSet(undefined);
        setIsLoading(false);
        setError(true);
        // Dev logging removed — import.meta.env.DEV crashes this bundler
      }
    }
  }, [src, isExternalUrl, resolvedOptions, onOptimized]);

  useEffect(() => {
    mountedRef.current = true;
    optimize();
    return () => {
      mountedRef.current = false;
    };
  }, [optimize]);

  // Determine which src to render
  const displaySrc = optimizedSrc ? optimizedSrc : src;

  // Determine default sizes attribute based on preset (unless overridden)
  const defaultSizes = preset ? {
    sticker: '(max-width: 320px) 320px, 320px',
    thumbnail: '(max-width: 640px) 480px, 480px',
    content: '(max-width: 768px) 100vw, 800px',
    gallery: '(max-width: 1024px) 100vw, 1200px',
    hero: '100vw',
    lightbox: '100vw',
  }[preset] : undefined;

  const displaySizes = rest.sizes ? rest.sizes : defaultSizes;

  // BEM class composition
  const classNameSafe = className ? className : '';
  const rootClass = [
    'optimized-image',
    isLoading && showPlaceholder ? 'optimized-image--loading' : '',
    error ? 'optimized-image--fallback' : '',
    classNameSafe,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <img
      src={displaySrc}
      srcSet={optimizedSrcSet}
      sizes={displaySizes}
      alt={alt}
      className={rootClass}
      loading="lazy"
      decoding="async"
      {...rest}
    />
  );
}