/**
 * @fileoverview Social media links component with custom SVG icons
 * Displays clickable social media icons with proper accessibility attributes
 * and visual styling that integrates with the overall brand aesthetic
 *
 * Variants:
 * - default: Platform-colored circle backgrounds
 * - clean: Subtle bordered circles
 * - minimal: Icon-only, accessible foreground color, no background
 *
 * @component SocialLinks
 * @author Ash Shaw Portfolio Team
 * @version 5.1.0 - Bundler-safe: no || in JSX, no bracket-access in JSX
 */

import React from "react";
import { socialLinks } from "../../data/mock/ui/social-links";
import "../../../styles/blocks/social-links.css";

/**
 * Props interface for SocialLinks component
 */
interface SocialLinksProps {
  className?: string;
  variant?: "default" | "clean" | "minimal";
  /** Platform names to exclude from rendering */
  exclude?: string[];
}

/**
 * All SVG paths normalised to a 24x24 viewBox and fill-based rendering
 * for consistent sizing and colour handling across all variants
 */
function getSVGPathForPlatform(platform: string): string {
  if (platform === "Instagram") {
    return '<path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.17.054 1.97.24 2.43.403a4.088 4.088 0 011.523.99 4.088 4.088 0 01.99 1.524c.163.46.349 1.26.403 2.43.058 1.265.07 1.645.07 4.849s-.012 3.584-.07 4.85c-.054 1.17-.24 1.97-.403 2.43a4.088 4.088 0 01-.99 1.523 4.088 4.088 0 01-1.524.99c-.46.163-1.26.349-2.43.403-1.265.058-1.645.07-4.849.07s-3.584-.012-4.85-.07c-1.17-.054-1.97-.24-2.43-.403a4.088 4.088 0 01-1.523-.99 4.088 4.088 0 01-.99-1.524c-.163-.46-.349-1.26-.403-2.43C2.175 15.584 2.163 15.204 2.163 12s.012-3.584.07-4.85c.054-1.17.24-1.97.403-2.43a4.088 4.088 0 01.99-1.523A4.088 4.088 0 015.15 2.636c.46-.163 1.26-.349 2.43-.403C8.845 2.175 9.225 2.163 12 2.163zm0-2.163C8.741 0 8.333.014 7.053.072 5.775.131 4.903.333 4.14.63a6.21 6.21 0 00-2.247 1.463A6.21 6.21 0 00.43 4.34C.133 5.103-.069 5.975.072 7.053.014 8.333 0 8.741 0 12s.014 3.668.072 4.948c.058 1.277.261 2.149.558 2.912a6.21 6.21 0 001.463 2.247 6.21 6.21 0 002.247 1.463c.763.297 1.635.5 2.913.558C8.333 23.986 8.741 24 12 24s3.668-.014 4.948-.072c1.277-.058 2.149-.261 2.912-.558a6.21 6.21 0 002.247-1.463 6.21 6.21 0 001.463-2.247c.297-.763.5-1.635.558-2.913C23.986 15.668 24 15.259 24 12s-.014-3.668-.072-4.948c-.058-1.277-.261-2.149-.558-2.912a6.21 6.21 0 00-1.463-2.247A6.21 6.21 0 0019.66.43C18.897.133 18.025-.069 16.947.072 15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>';
  }
  if (platform === "WhatsApp") {
    return '<path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>';
  }
  if (platform === "Facebook") {
    return '<path d="M24 12c0-6.627-5.373-12-12-12S0 5.373 0 12c0 5.99 4.388 10.954 10.125 11.854V15.47H7.078V12h3.047V9.356c0-3.007 1.792-4.668 4.533-4.668 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.926-1.956 1.874V12h3.328l-.532 3.47h-2.796v8.385C19.612 22.954 24 17.99 24 12z"/>';
  }
  if (platform === "LinkedIn") {
    return '<path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>';
  }
  if (platform === "YouTube") {
    return '<path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>';
  }
  if (platform === "Email") {
    return '<path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z"/><path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z"/>';
  }
  return "";
}

/**
 * Social media links component with platform-authentic styling
 * All icons use fill-based SVG paths for consistent rendering across variants
 */
export function SocialLinks(props: SocialLinksProps) {
  var className = props.className || "";
  var variant = props.variant || "default";
  var exclude = props.exclude || [];

  var variantClass =
    variant === "clean"
      ? "social-links__link--clean"
      : variant === "minimal"
        ? "social-links__link--minimal"
        : "";

  /* clean + minimal both use foreground-aware currentColor;
     default keeps white because the backgrounds are platform-colored */
  var iconFill = variant === "default" ? "var(--wp--preset--color--base)" : "currentColor";

  var filteredLinks = [];
  if (exclude && exclude.length > 0) {
    for (var i = 0; i < socialLinks.length; i++) {
      var s = socialLinks[i];
      var isExcluded = false;
      for (var j = 0; j < exclude.length; j++) {
        if (s.platform === exclude[j]) {
          isExcluded = true;
          break;
        }
      }
      if (!isExcluded) {
        filteredLinks.push(s);
      }
    }
  } else {
    filteredLinks = socialLinks.slice();
  }

  var isMinimal = variant === "minimal";
  var wrapperClass = isMinimal
    ? "social-links social-links--minimal " + className
    : "social-links " + className;

  return React.createElement(
    "div",
    { className: wrapperClass },
    filteredLinks.map(function(social, index) {
      /* Pre-compute all JSX attribute values outside JSX to avoid bundler-hostile patterns */
      var isEmail = social.platform === "Email";
      var linkTarget = isEmail ? "_self" : "_blank";
      var linkRel = isEmail ? undefined : "noopener noreferrer";

      var platformLower = social.platform.toLowerCase();
      var bgClass = variantClass ? variantClass : "bg-social-" + platformLower;
      var linkClass = "social-links__link " + bgClass;

      var svgContent = getSVGPathForPlatform(social.platform);
      var svgMarkup = { __html: svgContent };

      return React.createElement(
        "a",
        {
          key: index,
          href: social.url,
          target: linkTarget,
          rel: linkRel,
          className: linkClass,
          "aria-label": social.label
        },
        React.createElement("svg", {
          className: "social-links__icon",
          viewBox: "0 0 24 24",
          fill: iconFill,
          "aria-hidden": "true",
          dangerouslySetInnerHTML: svgMarkup
        })
      );
    })
  );
}