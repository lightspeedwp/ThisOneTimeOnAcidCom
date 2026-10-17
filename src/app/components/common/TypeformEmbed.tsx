/**
 * @fileoverview Typeform embed component for Ash Shaw Makeup Portfolio
 * 
 * Embeds Typeform contact form with light/dark mode support following
 * strict Semantic BEM architecture and WordPress-aligned design tokens.
 * 
 * @author Ash Shaw Portfolio Team
 * @version 1.0.0
 * @since 2025-01-03
 */

import React, { useEffect, useRef } from "react";
import "../../../styles/components/typeform-embed.css";

/**
 * Props interface for TypeformEmbed component
 */
interface TypeformEmbedProps {
  /** Typeform form ID */
  formId: string;
  /** Optional custom height (default: 500px) */
  height?: string;
  /** Optional CSS class name for container */
  className?: string;
  /** Optional hidden fields to pass to the form */
  hiddenFields?: Record<string, string>;
}

/**
 * TypeformEmbed - Embeds Typeform form with light/dark mode support
 * 
 * @component
 * @param {TypeformEmbedProps} props - Component properties
 * @returns {JSX.Element} Rendered Typeform embed
 * 
 * @accessibility
 * - Iframe has proper title for screen readers
 * - Maintains WCAG AAA color contrast in both modes
 * - Full keyboard navigation support
 * 
 * @example
 * <TypeformEmbed 
 *   formId="01KGP965M86E2TCRWEVS0WJX57" 
 *   height="600px"
 *   hiddenFields={{ source: 'portfolio', service: 'bridal' }}
 * />
 */
export function TypeformEmbed({ 
  formId, 
  height = "500px",
  className = "",
  hiddenFields
}: TypeformEmbedProps) {
  const containerRefInit: HTMLDivElement | null = null;
  const containerRef = useRef(containerRefInit);
  
  // Format hidden fields string: key=value,key2=value2
  const hiddenFieldsString = hiddenFields 
    ? Object.entries(hiddenFields)
        .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
        .join(',')
    : undefined;

  useEffect(() => {
    // Dynamically load Typeform embed script
    const loadTypeformScript = () => {
      try {
        // Check if script already exists
        const existingScript = document.querySelector('script[src*="embed.typeform.com"]');
        if (existingScript) {
          return; // Script already loaded
        }
        
        const script = document.createElement('script');
        script.src = 'https://embed.typeform.com/next/embed.js';
        script.async = true;
        script.defer = true;
        
        // Add error handling
        script.onerror = (error) => {
          // Dev logging removed — import.meta.env.DEV crashes this bundler
        };
        
        script.onload = () => {
          // Dev logging removed — import.meta.env.DEV crashes this bundler
        };
        
        document.body.appendChild(script);
      } catch (error) {
        // Dev logging removed — import.meta.env.DEV crashes this bundler
      }
    };

    // Load script after a short delay to avoid conflicts with extension detection
    const timeoutId = setTimeout(loadTypeformScript, 100);

    // Cleanup function
    return () => {
      clearTimeout(timeoutId);
      // Note: We don't remove the script on unmount as it may be shared
      // across multiple instances or remounts
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className={`typeform-embed ${className}`}
    >
      <div 
        data-tf-live={formId}
        data-tf-opacity="0"
        data-tf-hide-headers
        data-tf-hide-footer
        data-tf-iframe-props="title=Contact Form"
        data-tf-medium="snippet"
        data-tf-hidden={hiddenFieldsString}
        className="typeform-embed__widget"
      />
    </div>
  );
}