import { useState, useEffect } from 'react';

/**
 * usePerformanceGuard
 * Detects if the device is mobile/low-power to optionally disable 
 * heavy animations or complex design system block rendering.
 * 
 * @returns {boolean} isLowPowerMode - True if viewport < 768px or user prefers reduced motion
 */
export function usePerformanceGuard(): boolean {
  var isLowPowerState = useState(false);
  var isLowPower = isLowPowerState[0];
  var setIsLowPower = isLowPowerState[1];

  useEffect(function() {
    function checkPerformanceState() {
      var isMobile = window.innerWidth < 768;
      var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      
      // Additional heuristic: hardware concurrency or network could be checked here
      // but window.navigator.hardwareConcurrency is not always reliable.
      
      setIsLowPower(isMobile || prefersReducedMotion);
    }

    // Initial check
    checkPerformanceState();

    // Re-check on resize
    window.addEventListener('resize', checkPerformanceState);
    
    return function() {
      window.removeEventListener('resize', checkPerformanceState);
    };
  }, []);

  return isLowPower;
}
