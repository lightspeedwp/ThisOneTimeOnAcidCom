/**
 * @fileoverview Mobile device detection hook for responsive behavior
 * Provides a React hook to determine if the current viewport is mobile-sized
 * using CSS media queries and responsive breakpoints.
 * 
 * @author Ash Shaw Portfolio Team
 * @version 1.0.0
 */

import * as React from "react";

/**
 * Mobile breakpoint threshold in pixels
 * Devices with width less than this value are considered mobile
 * 
 * @constant {number} MOBILE_BREAKPOINT
 */
const MOBILE_BREAKPOINT = 768;

/**
 * Custom hook to detect mobile viewport size and respond to viewport changes
 * 
 * Uses CSS media queries and window resize events to determine if the current
 * viewport should be treated as mobile. Updates automatically when viewport
 * size changes, making it suitable for responsive component behavior.
 * 
 * @returns {boolean} True if viewport width is less than mobile breakpoint (768px)
 * 
 * @example
 * function ResponsiveComponent() {
 *   const isMobile = useIsMobile();
 *   
 *   return (
 *     <div>
 *       {isMobile ? (
 *         <MobileLayout />
 *       ) : (
 *         <DesktopLayout />
 *       )}
 *     </div>
 *   );
 * }
 * 
 * @example
 * // Use in conditional rendering for mobile-specific features
 * const isMobile = useIsMobile();
 * const showMobileMenu = isMobile && menuOpen;
 * 
 * @performance
 * - Uses CSS media queries for optimal performance
 * - Properly cleans up event listeners on unmount
 * - Minimal re-renders only when breakpoint is crossed
 * 
 * @accessibility
 * - Respects user's browser zoom levels
 * - Works with CSS-based responsive design patterns
 * - Maintains consistency with CSS media query breakpoints
 */
export function useIsMobile() {
  const isMobileInit: boolean | undefined = undefined;
  const [isMobile, setIsMobile] = React.useState(isMobileInit);

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };
    mql.addEventListener("change", onChange);
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  return !!isMobile;
}