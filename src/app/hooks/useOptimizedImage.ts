/**
 * @fileoverview useOptimizedImage hook
 *
 * Returns an optimised image URL for a given source, using the Canvas-based
 * optimizer. Useful when you need the URL directly (e.g., CSS background-image)
 * rather than rendering an <OptimizedImage> component.
 *
 * @module hooks/useOptimizedImage
 * @version 1.1.0 - Skip Canvas for external URLs to avoid CORS cache pollution
 */

import { useState, useEffect, useRef } from 'react';
import {
  optimizeImage,
  IMAGE_PRESETS,
  type OptimizeOptions,
  type OptimizedResult,
} from '../utils/imageOptimizer';

export interface UseOptimizedImageOptions extends OptimizeOptions {
  /** Named preset profile — overrides maxWidth/quality/format */
  preset?: keyof typeof IMAGE_PRESETS;
  /** Skip optimisation entirely (returns original src). Default: false */
  skip?: boolean;
}

export interface UseOptimizedImageResult {
  /** The optimised URL (or original src while loading / on error) */
  src: string;
  /** Whether optimisation is in progress */
  loading: boolean;
  /** Whether optimisation failed (original src is used as fallback) */
  error: boolean;
  /** Full optimisation result (null while loading or on error) */
  result: OptimizedResult | null;
}

/**
 * Hook to optimise an image source at runtime.
 *
 * @param originalSrc - The original image source
 * @param options - Optimisation options (or a preset name)
 * @returns { src, loading, error, result }
 */
export function useOptimizedImage(
  originalSrc: string,
  options: UseOptimizedImageOptions = {}
): UseOptimizedImageResult {
  const { preset, skip = false, ...restOptions } = options;

  /**
   * External URL detection — skip Canvas optimisation for cross-origin images.
   * Canvas API's crossOrigin = 'anonymous' can poison the browser cache,
   * and external CDN URLs are already server-optimised.
   */
  const startsHttp = originalSrc ? originalSrc.startsWith('http://') : false;
  const startsHttps = originalSrc ? originalSrc.startsWith('https://') : false;
  const isExternalUrl = startsHttp || startsHttps;
  const shouldSkip = skip || isExternalUrl;

  const stateInit: UseOptimizedImageResult = {
    src: originalSrc,
    loading: !shouldSkip,
    error: false,
    result: null,
  };
  const [state, setState] = useState(stateInit);

  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;

    if (shouldSkip || !originalSrc) {
      setState({ src: originalSrc, loading: false, error: false, result: null });
      return;
    }

    const merged: OptimizeOptions = {
      ...(preset ? IMAGE_PRESETS[preset] : {}),
      ...restOptions,
    };

    setState(prev => ({ ...prev, loading: true, error: false }));

    optimizeImage(originalSrc, merged)
      .then((result) => {
        if (mountedRef.current) {
          setState({
            src: result.url,
            loading: false,
            error: false,
            result,
          });
        }
      })
      .catch(() => {
        if (mountedRef.current) {
          setState({
            src: originalSrc,
            loading: false,
            error: true,
            result: null,
          });
        }
      });

    return () => {
      mountedRef.current = false;
    };
    // We deliberately serialize the options to avoid infinite re-renders
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [originalSrc, preset, shouldSkip, restOptions.maxWidth, restOptions.maxHeight, restOptions.quality, restOptions.format]);

  return state;
}