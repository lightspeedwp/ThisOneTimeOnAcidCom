/**
 * ThemeToggleES5 Component
 * 
 * ES5 closure version - Toggle between light and dark mode themes
 * WCAG 2.2 AA/AAA compliant with proper focus indicators
 * Neon pink/yellow styling for book website
 * 
 * @component
 * @returns {JSX.Element} Theme toggle button with sun/moon icons
 * @version 4.0.0 - Neon Pink/Yellow Rewire
 */

import React from 'react';
import "../../../styles/blocks/theme-toggle.css";

// CRITICAL: Apply dark mode class IMMEDIATELY on module load to prevent FOUC
// This runs synchronously BEFORE React renders anything
(function() {
  var savedTheme = typeof localStorage !== 'undefined' ? localStorage.getItem('theme') : null;
  
  // Default to dark mode (neon pink/yellow design)
  if (!savedTheme || savedTheme === 'dark') {
    document.documentElement.classList.add('dark');
    document.documentElement.setAttribute('data-theme', 'dark');
  } else if (savedTheme === 'light') {
    document.documentElement.classList.remove('dark');
    document.documentElement.setAttribute('data-theme', 'light');
  }
})();

export function ThemeToggleES5() {
  // Check localStorage on initial load
  var getInitialTheme = function() {
    if (typeof localStorage === 'undefined') return true;
    var savedTheme = localStorage.getItem('theme');
    
    // If user has saved preference, use it
    if (savedTheme === 'light') return false;
    if (savedTheme === 'dark') return true;
    
    // No saved preference - default to dark mode (neon design)
    return true;
  };
  
  var darkModeState = React.useState(getInitialTheme);
  var darkMode = darkModeState[0];
  var setDarkMode = darkModeState[1];
  
  React.useEffect(function() {
    // Apply theme on mount
    if (darkMode) {
      document.documentElement.classList.add('dark');
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.setAttribute('data-theme', 'light');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);
  
  function toggleTheme() {
    var newMode = !darkMode;
    setDarkMode(newMode);
    
    // Immediate DOM update for instant visual feedback
    if (newMode) {
      document.documentElement.classList.add('dark');
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.setAttribute('data-theme', 'light');
      localStorage.setItem('theme', 'light');
    }
    
    if (import.meta.env.DEV) {
      console.log('Theme toggled to:', newMode ? 'dark' : 'light');
    }
  }
  
  function handleKeyDown(e: any) {
    var isEnter = e.key === 'Enter';
    var isSpace = e.key === ' ';
    var isActivationKey = isEnter || isSpace;
    
    if (isActivationKey) {
      if (e.preventDefault) e.preventDefault();
      toggleTheme();
    }
  }
  
  var ariaLabel = darkMode ? 'Switch to light mode' : 'Switch to dark mode';
  var tooltip = darkMode ? 'Light mode' : 'Dark mode';
  
  return React.createElement(
    'button',
    {
      type: 'button',
      onClick: toggleTheme,
      onKeyDown: handleKeyDown,
      'aria-label': ariaLabel,
      title: tooltip,
      className: 'theme-toggle'
    },
    // Sun Icon (Light Mode) - Unicode character with neon styling
    !darkMode && React.createElement(
      'span',
      {
        className: 'theme-toggle__icon theme-toggle__icon--sun',
        'aria-hidden': 'true'
      },
      '☀'
    ),
    
    // Moon Icon (Dark Mode) - Unicode character with neon styling
    darkMode && React.createElement(
      'span',
      {
        className: 'theme-toggle__icon theme-toggle__icon--moon',
        'aria-hidden': 'true'
      },
      '☾'
    ),
    
    // Screen reader text
    React.createElement(
      'span',
      { className: 'sr-only' },
      ariaLabel
    )
  );
}
