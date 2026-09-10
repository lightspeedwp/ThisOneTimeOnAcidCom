/**
 * @fileoverview Custom animated SVG icons for Ash Shaw Makeup Portfolio
 * 
 * Purpose-built icons representing core brand values with sophisticated gradients and animations.
 * Uses dangerouslySetInnerHTML to bypass bundler's broken jsxs SVG transform.
 * 
 * **Available Icons:**
 * - `ShineIcon` - Radiant starburst representing creativity and energy
 * - `JoyIcon` - Heart balloon representing passion and positivity
 * - `GrowthIcon` - Upward arrow with plant representing growth and evolution
 * 
 * **Features:**
 * - Multi-color gradients (5-8 colors per icon)
 * - Subtle CSS animations (pulse, fade)
 * - Responsive sizing (sm: 24px, md: 48px, lg: 72px)
 * - Accessibility compliant (role="img", aria-hidden)
 * 
 * @example
 * ```tsx
 * // Default size (48px)
 * <ShineIcon />
 * 
 * // Small size (24px)
 * <JoyIcon size="sm" />
 * 
 * // Large with custom class
 * <GrowthIcon size="lg" className="my-custom-class" />
 * 
 * // In an about page section
 * <div className="values-section">
 *   <ShineIcon size="lg" />
 *   <h3>Creativity</h3>
 *   <p>Pushing boundaries...</p>
 * </div>
 * ```
 * 
 * @author Ash Shaw Portfolio Team
 * @version 2.0.0 - dangerouslySetInnerHTML for bundler-safe SVG
 */

import React from "react";
import "../../../styles/blocks/colorful-icons.css";

/**
 * Props interface for all colorful icon components
 */
interface IconProps {
  /** Icon size: sm (24px), md (48px), lg (72px) */
  size?: "sm" | "md" | "lg";
  /** Additional CSS classes */
  className?: string;
}

/* ─────────────────────────────────────────────
   ShineIcon - Radiant starburst
   ───────────────────────────────────────────── */

/**
 * ShineIcon - Radiant starburst representing creativity and energy
 * 
 * **Visual Description:**
 * - Central glowing core with radial gradient (gold → pink → magenta → purple)
 * - 8 light rays radiating outward
 * - 4 sparkling accent dots with pulse animations
 * 
 * **Color Palette:**
 * - Gold (#FFD700)
 * - Hot Pink (#FF69B4)
 * - Deep Pink (#FF1493)
 * - Cyan (#00CED1)
 * - Purple (#9932CC)
 * 
 * **Use Cases:**
 * - About page "Creativity" section
 * - Brand values showcase
 * - Decorative hero accents
 * 
 * @param props - Icon configuration
 * @returns SVG icon component
 */
const shineInner = '<defs><radialGradient id="paint0_radial_1_95" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(2448 2448) scale(24)"><stop stop-color="#FFD700"/><stop offset="0.25" stop-color="#FF69B4"/><stop offset="0.5" stop-color="#FF1493"/><stop offset="0.75" stop-color="#9932CC"/><stop offset="1" stop-color="#4B0082"/></radialGradient><linearGradient id="paint1_linear_1_95" x1="68.4" y1="30" x2="1429.97" y2="356.778" gradientUnits="userSpaceOnUse"><stop stop-color="#FFD700"/><stop offset="0.5" stop-color="#FF69B4"/><stop offset="1" stop-color="#FF1493"/></linearGradient><linearGradient id="paint2_linear_1_95" x1="84" y1="68.4" x2="410.778" y2="1429.97" gradientUnits="userSpaceOnUse"><stop stop-color="#FFD700"/><stop offset="0.5" stop-color="#FF69B4"/><stop offset="1" stop-color="#FF1493"/></linearGradient><linearGradient id="paint3_linear_1_95" x1="68.4" y1="84" x2="1429.97" y2="410.778" gradientUnits="userSpaceOnUse"><stop stop-color="#FFD700"/><stop offset="0.5" stop-color="#FF69B4"/><stop offset="1" stop-color="#FF1493"/></linearGradient><linearGradient id="paint4_linear_1_95" x1="30" y1="68.4" x2="356.778" y2="1429.97" gradientUnits="userSpaceOnUse"><stop stop-color="#FFD700"/><stop offset="0.5" stop-color="#FF69B4"/><stop offset="1" stop-color="#FF1493"/></linearGradient><linearGradient id="paint5_linear_1_95" x1="81.6" y1="2077.2" x2="2121.6" y2="37.2" gradientUnits="userSpaceOnUse"><stop stop-color="#00CED1"/><stop offset="0.5" stop-color="#FF69B4"/><stop offset="1" stop-color="#FFD700"/></linearGradient><linearGradient id="paint6_linear_1_95" x1="86.4" y1="2121.6" x2="2126.4" y2="81.6" gradientUnits="userSpaceOnUse"><stop stop-color="#00CED1"/><stop offset="0.5" stop-color="#FF69B4"/><stop offset="1" stop-color="#FFD700"/></linearGradient><linearGradient id="paint7_linear_1_95" x1="42" y1="2126.4" x2="2082" y2="86.4" gradientUnits="userSpaceOnUse"><stop stop-color="#00CED1"/><stop offset="0.5" stop-color="#FF69B4"/><stop offset="1" stop-color="#FFD700"/></linearGradient><linearGradient id="paint8_linear_1_95" x1="37.2" y1="2082" x2="2077.2" y2="42" gradientUnits="userSpaceOnUse"><stop stop-color="#00CED1"/><stop offset="0.5" stop-color="#FF69B4"/><stop offset="1" stop-color="#FFD700"/></linearGradient></defs><path opacity="0.9" d="M72 96C85.2548 96 96 85.2548 96 72C96 58.7452 85.2548 48 72 48C58.7452 48 48 58.7452 48 72C48 85.2548 58.7452 96 72 96Z" fill="url(#paint0_radial_1_95)"/><path opacity="0.8" d="M72 30L75.6 54L72 60L68.4 54L72 30Z" fill="url(#paint1_linear_1_95)"/><path opacity="0.8" d="M114 72L90 75.6L84 72L90 68.4L114 72Z" fill="url(#paint2_linear_1_95)"/><path opacity="0.8" d="M72 114L68.4 90L72 84L75.6 90L72 114Z" fill="url(#paint3_linear_1_95)"/><path opacity="0.8" d="M30 72L54 68.4L60 72L54 75.6L30 72Z" fill="url(#paint4_linear_1_95)"/><path opacity="0.7" d="M102 42L86.4 57.6L81.6 52.8L97.2 37.2L102 42Z" fill="url(#paint5_linear_1_95)"/><path opacity="0.7" d="M102 102L86.4 86.4L91.2 81.6L106.8 97.2L102 102Z" fill="url(#paint6_linear_1_95)"/><path opacity="0.7" d="M42 102L57.6 86.4L62.4 91.2L46.8 106.8L42 102Z" fill="url(#paint7_linear_1_95)"/><path opacity="0.7" d="M42 42L57.6 57.6L52.8 62.4L37.2 46.8L42 42Z" fill="url(#paint8_linear_1_95)"/><path opacity="0.650049" d="M30 33.6C31.9882 33.6 33.6 31.9882 33.6 30C33.6 28.0118 31.9882 26.4 30 26.4C28.0118 26.4 26.4 28.0118 26.4 30C26.4 31.9882 28.0118 33.6 30 33.6Z" fill="#FFD700"><animate attributeName="opacity" values="0.9;0.3;0.9" dur="2s" repeatCount="indefinite"/></path><path opacity="0.766601" d="M114 39C115.657 39 117 37.6569 117 36C117 34.3431 115.657 33 114 33C112.343 33 111 34.3431 111 36C111 37.6569 112.343 39 114 39Z" fill="#FF69B4"><animate attributeName="opacity" values="1;0.2;1" dur="1.8s" repeatCount="indefinite"/></path><path opacity="0.580039" d="M108 106.2C110.32 106.2 112.2 104.32 112.2 102C112.2 99.6805 110.32 97.8 108 97.8C105.68 97.8 103.8 99.6805 103.8 102C103.8 104.32 105.68 106.2 108 106.2Z" fill="#00CED1"><animate attributeName="opacity" values="0.8;0.1;0.8" dur="2.2s" repeatCount="indefinite"/></path><path opacity="0.522168" d="M24 110.4C25.3255 110.4 26.4 109.325 26.4 108C26.4 106.674 25.3255 105.6 24 105.6C22.6745 105.6 21.6 106.674 21.6 108C21.6 109.325 22.6745 110.4 24 110.4Z" fill="#9932CC"><animate attributeName="opacity" values="0.7;0.4;0.7" dur="2.5s" repeatCount="indefinite"/></path>';
const shineMarkup = { __html: shineInner };

export function ShineIcon({ size = "md", className = "" }: IconProps) {
  const sc = `colorful-icon colorful-icon--${size} ${className}`;
  return (
    <svg className={sc} viewBox="0 0 144 144" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-hidden="true" dangerouslySetInnerHTML={shineMarkup} />
  );
}

/* ─────────────────────────────────────────────
   JoyIcon - Heart balloon
   ───────────────────────────────────────────── */

/**
 * JoyIcon - Heart balloon representing passion and positivity
 * 
 * **Visual Description:**
 * - Heart-shaped balloon with multi-color gradient (pink → gold → cyan → purple → green → orange)
 * - Heart and balloon edges with subtle animations
 * 
 * **Color Palette:**
 * - Hot Pink (#FF69B4)
 * - Gold (#FFD700)
 * - Cyan (#00CED1)
 * - Purple (#9932CC)
 * - Lime Green (#32CD32)
 * - Orange Red (#FF4500)
 * 
 * **Use Cases:**
 * - About page "Passion" section
 * - Brand values showcase
 * - Decorative hero accents
 * 
 * @param props - Icon configuration
 * @returns SVG icon component
 */
const joyInner = '<defs><clipPath id="clip0_1_116"><rect width="144" height="144" fill="white"/></clipPath><linearGradient id="paint0_linear_1_116" x1="18" y1="48" x2="10818" y2="48" gradientUnits="userSpaceOnUse"><stop stop-color="#FF69B4"/><stop offset="0.2" stop-color="#FFD700"/><stop offset="0.4" stop-color="#00CED1"/><stop offset="0.6" stop-color="#9932CC"/><stop offset="0.8" stop-color="#32CD32"/><stop offset="1" stop-color="#FF4500"/></linearGradient><linearGradient id="paint1_linear_1_116" x1="54" y1="45" x2="3941.54" y2="3633.5" gradientUnits="userSpaceOnUse"><stop stop-color="#FF69B4"/><stop offset="0.25" stop-color="#FF1493"/><stop offset="0.5" stop-color="#DC143C"/><stop offset="0.75" stop-color="#FF4500"/><stop offset="1" stop-color="#FFD700"/></linearGradient></defs><g clip-path="url(#clip0_1_116)"><path opacity="0.8" d="M72 120C101.823 120 126 103.882 126 84C126 64.1178 101.823 48 72 48C42.1766 48 18 64.1178 18 84C18 103.882 42.1766 120 72 120Z" fill="url(#paint0_linear_1_116)"/><path opacity="0.9" d="M72 54C66 42 54 42 54 54C54 66 72 84 72 84C72 84 90 66 90 54C90 42 78 42 72 54Z" fill="url(#paint1_linear_1_116)"/><path d="M22.7875 42.3037C23.4904 41.6008 23.4904 40.4611 22.7875 39.7581C22.0846 39.0552 20.9449 39.0552 20.2419 39.7581L1.5743 58.4258C0.871355 59.1287 0.871354 60.2684 1.5743 60.9713C2.27724 61.6743 3.41694 61.6743 4.11988 60.9713L22.7875 42.3037Z" fill="#8B4513"/><path d="M25.7573 39.3338L23.2117 36.7882C22.7431 36.3196 21.9833 36.3196 21.5147 36.7882L18.9691 39.3338C18.5005 39.8024 18.5005 40.5622 18.9691 41.0309L21.5147 43.5765C21.9833 44.0451 22.7431 44.0451 23.2117 43.5765L25.7573 41.0309C26.226 40.5622 26.226 39.8024 25.7573 39.3338Z" fill="#C0C0C0"/><path d="M27.0301 31.2728C27.2644 31.0385 27.2644 30.6586 27.0301 30.4243C26.7958 30.1899 26.4159 30.1899 26.1816 30.4243L20.2419 36.364C20.0076 36.5983 20.0076 36.9782 20.2419 37.2125C20.4762 37.4468 20.8561 37.4468 21.0904 37.2125L27.0301 31.2728Z" fill="#FF69B4"/><path d="M28.7272 31.2728C28.9615 31.0385 28.9615 30.6586 28.7272 30.4243C28.4929 30.1899 28.113 30.1899 27.8787 30.4243L21.0904 37.2125C20.8561 37.4468 20.8561 37.8267 21.0904 38.061C21.3247 38.2953 21.7046 38.2953 21.939 38.061L28.7272 31.2728Z" fill="#9932CC"/><path d="M30.4243 31.2728C30.6586 31.0385 30.6586 30.6586 30.4243 30.4243C30.1899 30.1899 29.8101 30.1899 29.5757 30.4243L21.939 38.061C21.7047 38.2953 21.7047 38.6752 21.939 38.9095C22.1733 39.1439 22.5532 39.1439 22.7875 38.9095L30.4243 31.2728Z" fill="#00CED1"/><path d="M30.4243 32.9699C30.6586 32.7356 30.6586 32.3557 30.4243 32.1214C30.1899 31.8871 29.8101 31.8871 29.5757 32.1214L22.7875 38.9096C22.5532 39.1439 22.5532 39.5238 22.7875 39.7582C23.0218 39.9925 23.4017 39.9925 23.636 39.7582L30.4243 32.9699Z" fill="#FFD700"/><path d="M30.4243 34.667C30.6586 34.4326 30.6586 34.0527 30.4243 33.8184C30.1899 33.5841 29.8101 33.5841 29.5757 33.8184L23.636 39.7581C23.4017 39.9924 23.4017 40.3723 23.636 40.6067C23.8704 40.841 24.2503 40.841 24.4846 40.6067L30.4243 34.667Z" fill="#32CD32"/><path d="M30.4243 36.364C30.6586 36.1297 30.6586 35.7498 30.4243 35.5155C30.1899 35.2811 29.8101 35.2811 29.5757 35.5155L24.4846 40.6066C24.2503 40.8409 24.2503 41.2208 24.4846 41.4551C24.7189 41.6895 25.0988 41.6895 25.3331 41.4551L30.4243 36.364Z" fill="#FF4500"/><path opacity="0.7" d="M36 64.8C38.651 64.8 40.8 62.6509 40.8 60C40.8 57.349 38.651 55.2 36 55.2C33.349 55.2 31.2 57.349 31.2 60C31.2 62.6509 33.349 64.8 36 64.8Z" fill="#FF69B4"/><path opacity="0.8" d="M102 51.6C103.988 51.6 105.6 49.9882 105.6 48C105.6 46.0118 103.988 44.4 102 44.4C100.012 44.4 98.4 46.0118 98.4 48C98.4 49.9882 100.012 51.6 102 51.6Z" fill="#00CED1"/><path opacity="0.6" d="M108 93C109.657 93 111 91.6569 111 90C111 88.3431 109.657 87 108 87C106.343 87 105 88.3431 105 90C105 91.6569 106.343 93 108 93Z" fill="#32CD32"/><path opacity="0.7" d="M48 108C49.9882 108 51.6 105.314 51.6 102C51.6 98.6863 49.9882 96 48 96C46.0118 96 44.4 98.6863 44.4 102C44.4 105.314 46.0118 108 48 108Z" fill="#9932CC"/><path opacity="0.813242" d="M90 32.4C91.3255 32.4 92.4 31.3255 92.4 30C92.4 28.6745 91.3255 27.6 90 27.6C88.6745 27.6 87.6 28.6745 87.6 30C87.6 31.3255 88.6745 32.4 90 32.4Z" fill="#FFD700"><animate attributeName="opacity" values="1;0.2;1" dur="2s" repeatCount="indefinite"/></path><path opacity="0.620059" d="M114 73.8C114.994 73.8 115.8 72.9941 115.8 72C115.8 71.0058 114.994 70.2 114 70.2C113.006 70.2 112.2 71.0058 112.2 72C112.2 72.9941 113.006 73.8 114 73.8Z" fill="#FF69B4"><animate attributeName="opacity" values="0.8;0.1;0.8" dur="1.8s" repeatCount="indefinite"/></path></g>';
const joyMarkup = { __html: joyInner };

export function JoyIcon({ size = "md", className = "" }: IconProps) {
  const sc = `colorful-icon colorful-icon--${size} ${className}`;
  return (
    <svg className={sc} viewBox="0 0 144 144" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-hidden="true" dangerouslySetInnerHTML={joyMarkup} />
  );
}

/* ─────────────────────────────────────────────
   GrowthIcon - Upward arrow with plant
   ───────────────────────────────────────────── */

/**
 * GrowthIcon - Upward arrow with plant representing growth and evolution
 * 
 * **Visual Description:**
 * - Upward arrow with a plant sprout
 * - Arrow and plant with multi-color gradients (green → yellow → cyan → purple → blue)
 * - Subtle animations on arrow and plant
 * 
 * **Color Palette:**
 * - Lime Green (#32CD32)
 * - Yellow (#FFD700)
 * - Cyan (#00CED1)
 * - Purple (#9932CC)
 * - Blue (#1E90FF)
 * 
 * **Use Cases:**
 * - About page "Growth" section
 * - Brand values showcase
 * - Decorative hero accents
 * 
 * @param props - Icon configuration
 * @returns SVG icon component
 */
const growthInner = '<defs><linearGradient id="paint0_linear_1_141" x1="66" y1="5472" x2="1480.85" y2="5283.35" gradientUnits="userSpaceOnUse"><stop stop-color="#228B22"/><stop offset="0.5" stop-color="#32CD32"/><stop offset="1" stop-color="#7CFC00"/></linearGradient><linearGradient id="paint1_linear_1_141" x1="62.4" y1="18" x2="3238.63" y2="1469.99" gradientUnits="userSpaceOnUse"><stop stop-color="#00CED1"/><stop offset="0.25" stop-color="#1E90FF"/><stop offset="0.5" stop-color="#9932CC"/><stop offset="0.75" stop-color="#FF69B4"/><stop offset="1" stop-color="#FFD700"/></linearGradient><radialGradient id="paint2_radial_1_141" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(1497.6 1491.6) scale(14.4)"><stop stop-color="#FFD700"/><stop offset="0.3" stop-color="#FF69B4"/><stop offset="0.6" stop-color="#FF1493"/><stop offset="1" stop-color="#9932CC"/></radialGradient><linearGradient id="paint3_linear_1_141" x1="36.6862" y1="79.2115" x2="3423" y2="-34.7521" gradientUnits="userSpaceOnUse"><stop stop-color="#32CD32"/><stop offset="0.5" stop-color="#00FF7F"/><stop offset="1" stop-color="#ADFF2F"/></linearGradient><linearGradient id="paint4_linear_1_141" x1="95.0912" y1="86.7264" x2="909.678" y2="2530.49" gradientUnits="userSpaceOnUse"><stop stop-color="#32CD32"/><stop offset="0.5" stop-color="#00FF7F"/><stop offset="1" stop-color="#ADFF2F"/></linearGradient></defs><path d="M73.2 75.6C73.2 73.6118 71.5882 72 69.6 72C67.6118 72 66 73.6118 66 75.6V122.4C66 124.388 67.6118 126 69.6 126C71.5882 126 73.2 124.388 73.2 122.4V75.6Z" fill="url(#paint0_linear_1_141)"/><path opacity="0.9" d="M72 18L81.6 36H75.6V60H68.4V36H62.4L72 18Z" fill="url(#paint1_linear_1_141)"/><path opacity="0.8" d="M72 80.4C79.9529 80.4 86.4 73.9529 86.4 66C86.4 58.0471 79.9529 51.6 72 51.6C64.0471 51.6 57.6 58.0471 57.6 66C57.6 73.9529 64.0471 80.4 72 80.4Z" fill="url(#paint2_radial_1_141)"/><path opacity="0.7" d="M62.4 66C66.3764 66 69.6 62.7764 69.6 58.8C69.6 54.8235 66.3764 51.6 62.4 51.6C58.4235 51.6 55.2 54.8235 55.2 58.8C55.2 62.7764 58.4235 66 62.4 66Z" fill="#FF69B4"/><path opacity="0.7" d="M81.5999 66C85.5764 66 88.7999 62.7764 88.7999 58.8C88.7999 54.8235 85.5764 51.6 81.5999 51.6C77.6235 51.6 74.3999 54.8235 74.3999 58.8C74.3999 62.7764 77.6235 66 81.5999 66Z" fill="#00CED1"/><path opacity="0.7" d="M62.4 80.4C66.3764 80.4 69.6 77.1765 69.6 73.2C69.6 69.2235 66.3764 66 62.4 66C58.4235 66 55.2 69.2235 55.2 73.2C55.2 77.1765 58.4235 80.4 62.4 80.4Z" fill="#FFD700"/><path opacity="0.7" d="M81.5999 80.4C85.5764 80.4 88.7999 77.1765 88.7999 73.2C88.7999 69.2235 85.5764 66 81.5999 66C77.6235 66 74.3999 69.2235 74.3999 73.2C74.3999 77.1765 77.6235 80.4 81.5999 80.4Z" fill="#9932CC"/><path opacity="0.9" d="M72 70.8C74.6509 70.8 76.8 68.6509 76.8 66C76.8 63.349 74.6509 61.2 72 61.2C69.349 61.2 67.2 63.349 67.2 66C67.2 68.6509 69.349 70.8 72 70.8Z" fill="#FFD700"/><path opacity="0.8" d="M63 105.588C67.5916 102.937 67.2844 93.8093 62.3138 85.2C57.3433 76.5907 49.5916 71.7606 45 74.4115C40.4084 77.0625 40.7156 86.1907 45.6862 94.8C50.6567 103.409 58.4084 108.239 63 105.588Z" fill="url(#paint3_linear_1_141)"/><path opacity="0.7" d="M79.8177 112.182C82.6295 114.994 89.4676 112.715 95.0912 107.091C100.715 101.468 102.994 94.6294 100.182 91.8176C97.3706 89.0058 90.5324 91.2852 84.9088 96.9088C79.2853 102.532 77.0059 109.371 79.8177 112.182Z" fill="url(#paint4_linear_1_141)"/><g opacity="0.6"><path d="M30 117.6C31.9882 117.6 33.6 115.988 33.6 114C33.6 112.012 31.9882 110.4 30 110.4C28.0118 110.4 26.4 112.012 26.4 114C26.4 115.988 28.0118 117.6 30 117.6Z" fill="#32CD32"/><path d="M31.8001 114H28.2001V123.6H31.8001V114Z" fill="#228B22"/></g><g opacity="0.7"><path d="M42.0001 106.8C44.651 106.8 46.8001 104.651 46.8001 102C46.8001 99.349 44.651 97.2 42.0001 97.2C39.3491 97.2 37.2001 99.349 37.2001 102C37.2001 104.651 39.3491 106.8 42.0001 106.8Z" fill="#7CFC00"/><path d="M44.4 102H39.6V120H44.4V102Z" fill="#32CD32"/><path opacity="0.8" d="M41.0912 103.491C42.4971 102.085 41.3574 98.6661 38.5456 95.8544C35.7338 93.0426 32.3148 91.9029 30.9089 93.3088C29.503 94.7147 30.6427 98.1338 33.4545 100.946C36.2662 103.757 39.6853 104.897 41.0912 103.491Z" fill="#ADFF2F"/></g><path opacity="0.760078" d="M96 44.4C97.3255 44.4 98.4 43.3255 98.4 42C98.4 40.6745 97.3255 39.6 96 39.6C94.6745 39.6 93.6 40.6745 93.6 42C93.6 43.3255 94.6745 44.4 96 44.4Z" fill="#FFD700"><animate attributeName="opacity" values="1;0.2;1" dur="2s" repeatCount="indefinite"/></path><path opacity="0.411035" d="M48 55.8C48.9941 55.8 49.8 54.9941 49.8 54C49.8 53.0058 48.9941 52.2 48 52.2C47.0058 52.2 46.2 53.0058 46.2 54C46.2 54.9941 47.0058 55.8 48 55.8Z" fill="#FF69B4"><animate attributeName="opacity" values="0.8;0.1;0.8" dur="1.8s" repeatCount="indefinite"/></path><path opacity="0.518128" d="M102 61.2C102.663 61.2 103.2 60.6628 103.2 60C103.2 59.3373 102.663 58.8 102 58.8C101.337 58.8 100.8 59.3373 100.8 60C100.8 60.6628 101.337 61.2 102 61.2Z" fill="#00CED1"><animate attributeName="opacity" values="0.9;0.3;0.9" dur="2.2s" repeatCount="indefinite"/></path>';
const growthMarkup = { __html: growthInner };

export function GrowthIcon({ size = "md", className = "" }: IconProps) {
  const sc = `colorful-icon colorful-icon--${size} ${className}`;
  return (
    <svg className={sc} viewBox="0 0 144 144" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-hidden="true" dangerouslySetInnerHTML={growthMarkup} />
  );
}