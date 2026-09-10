/**
 * @fileoverview Brand logo component for Ash Shaw Makeup Portfolio
 * Features CSS-based dark mode switching for instant responsiveness
 * Supports automatic switching between light and dark mode versions
 *
 * @author Ash Shaw Portfolio Team
 * @version 4.3.0 - dangerouslySetInnerHTML for bundler-safe SVG
 */

import React from "react";
import logoImage from 'figma:asset/428cc40e40184633483ae65f75ced5f46af6821d.png';
import { branding } from "../../data/mock/ui/branding";
import "../../../styles/blocks/logo.css";

/**
 * Logo component props interface for flexible sizing and styling
 */
interface LogoProps {
  size?: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "header" | "mobile-sm";
  className?: string;
  forceDark?: boolean;
}

/**
 * SVG inner HTML for the dark mode logo — stored as a raw string to bypass
 * the Figma Make bundler's broken jsxs transform for multi-child SVG elements.
 */
const darkLogoInner = '<g opacity="0.9"><path d="M116.569 164.796C107.661 174.211 106.759 187.726 114.555 194.982C122.35 202.238 135.891 200.487 144.799 191.072L284.589 43.3237C293.497 33.9084 294.399 20.3938 286.604 13.1378C278.809 5.88192 265.268 7.63243 256.36 17.0477L116.569 164.796Z" fill="url(#paint0_linear_84_19)"/><path d="M68.2375 191.33L121.168 240.598C126.04 245.133 132.211 246.461 134.952 243.564L164.73 212.091C167.471 209.193 165.743 203.169 160.871 198.634L107.941 149.366C103.069 144.831 96.8975 143.503 94.1565 146.4L64.3787 177.874C61.6378 180.771 63.3654 186.795 68.2375 191.33Z" fill="#C0C0C0"/><path d="M76.6728 285.812C74.1524 288.476 74.2883 292.664 76.9763 295.166C79.6644 297.668 83.8867 297.537 86.4071 294.873L145.735 232.168C148.255 229.504 148.119 225.316 145.431 222.814C142.743 220.312 138.521 220.443 136 223.107L76.6728 285.812Z" fill="#E91E63"/><path d="M53.0957 286.545C50.5752 289.209 50.7111 293.397 53.3992 295.899C56.0872 298.401 60.3095 298.27 62.83 295.606L133.567 220.842C136.087 218.178 135.951 213.99 133.263 211.488C130.575 208.986 126.353 209.117 123.832 211.781L53.0957 286.545Z" fill="#9C27B0"/><path d="M58.0418 257.131C55.5214 259.795 55.6573 263.983 58.3453 266.485C61.0334 268.987 65.2557 268.856 67.7761 266.192L121.399 209.516C123.919 206.853 123.784 202.665 121.096 200.163C118.407 197.661 114.185 197.792 111.665 200.456L58.0418 257.131Z" fill="#3F51B5"/><path d="M34.4647 257.864C31.9443 260.528 32.0801 264.716 34.7682 267.218C37.4562 269.72 41.6786 269.589 44.199 266.925L109.231 198.19C111.751 195.527 111.616 191.339 108.928 188.837C106.239 186.335 102.017 186.466 99.4967 189.13L34.4647 257.864Z" fill="#2196F3"/><path d="M39.4104 228.45C36.8899 231.114 37.0258 235.302 39.7139 237.804C42.4019 240.306 46.6243 240.175 49.1447 237.511L97.063 186.864C99.5835 184.201 99.4476 180.013 96.7595 177.511C94.0715 175.009 89.8491 175.14 87.3287 177.804L39.4104 228.45Z" fill="#00BCD4"/><path d="M15.8332 229.183C13.3128 231.847 13.4487 236.034 16.1367 238.537C18.8248 241.039 23.0471 240.907 25.5675 238.243L84.895 175.538C87.4154 172.875 87.2796 168.687 84.5915 166.185C81.9034 163.683 77.6811 163.814 75.1607 166.478L15.8332 229.183Z" fill="#4CAF50"/><path d="M70.2822 118.275C75.2664 118.275 79.3068 114.248 79.3068 109.28C79.3068 104.313 75.2664 100.286 70.2822 100.286C65.298 100.286 61.2575 104.313 61.2575 109.28C61.2575 114.248 65.298 118.275 70.2822 118.275Z" fill="#E91E63"/><path d="M130.321 88.0482C137.708 88.0482 143.696 82.0571 143.696 74.6669C143.696 67.2766 137.708 61.2856 130.321 61.2856C122.934 61.2856 116.946 67.2766 116.946 74.6669C116.946 82.0571 122.934 88.0482 130.321 88.0482Z" fill="#C27AFF"/><path d="M111.377 77.9999C117.528 77.9999 122.515 73.011 122.515 66.857C122.515 60.703 117.528 55.7141 111.377 55.7141C105.226 55.7141 100.24 60.703 100.24 66.857C100.24 73.011 105.226 77.9999 111.377 77.9999Z" fill="#3F51B5"/><path d="M125.299 66.857C129.913 66.857 133.653 63.1154 133.653 58.4999C133.653 53.8843 129.913 50.1427 125.299 50.1427C120.686 50.1427 116.946 53.8843 116.946 58.4999C116.946 63.1154 120.686 66.857 125.299 66.857Z" fill="#9C27B0"/><path d="M114.162 89.1427C118.775 89.1427 122.515 85.4011 122.515 80.7856C122.515 76.1701 118.775 72.4284 114.162 72.4284C109.548 72.4284 105.808 76.1701 105.808 80.7856C105.808 85.4011 109.548 89.1427 114.162 89.1427Z" fill="#00BCD4"/><path d="M41.2194 160.477C48.6063 160.477 54.5946 154.486 54.5946 147.095C54.5946 139.705 48.6063 133.714 41.2194 133.714C33.8326 133.714 27.8443 139.705 27.8443 147.095C27.8443 154.486 33.8326 160.477 41.2194 160.477Z" fill="#4CAF50"/></g><text x="330" y="185" class="logo__text-brand">Ash Shaw</text><text x="335" y="235" class="logo__text-tagline">MAKEUP ARTIST</text><defs><linearGradient id="paint0_linear_84_19" x1="284.589" y1="43.3237" x2="116.569" y2="164.796" gradientUnits="userSpaceOnUse"><stop stop-color="#FF66CC"/><stop offset="0.5" stop-color="#9933FF"/><stop offset="1" stop-color="#3399FF"/></linearGradient></defs>';
const darkLogoMarkup = { __html: darkLogoInner };

/**
 * Brand logo component featuring the new Ash Shaw logo design with colorful paintbrush
 */
export function Logo({
  size = "md",
  className = "",
  forceDark = false,
}: LogoProps) {
  // Map size prop to BEM modifier class
  const sizeModifier = `logo--${size}`;

  const darkSvgClass = forceDark
    ? 'logo__image logo__image--dark logo__image--force-visible'
    : 'logo__image logo__image--dark';

  return (
    <div className={`logo ${sizeModifier} ${className}`}>
      {/* Light Mode Logo (Image) */}
      {!forceDark && (
        <img
          src={logoImage}
          alt={branding.logo.alt}
          className="logo__image logo__image--light"
          loading="eager"
          decoding="async"
        />
      )}

      {/* Dark Mode Logo (SVG) — dangerouslySetInnerHTML bypasses bundler jsxs transform */}
      <svg
        viewBox="0 0 1100 312"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={darkSvgClass}
        role="img"
        aria-label={branding.logo.alt}
        dangerouslySetInnerHTML={darkLogoMarkup}
      />
    </div>
  );
}
