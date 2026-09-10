import React, { createContext, useState, useEffect, useContext } from 'react';

export type Theme = 'light' | 'dark' | 'brutalist';

export interface ThemeContextValue {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

var themeContextInit: ThemeContextValue | null = null;
var ThemeContext = (window as any).__AshShawThemeContext;
if (!ThemeContext) {
  ThemeContext = createContext(themeContextInit);
  (window as any).__AshShawThemeContext = ThemeContext;
}

// CRITICAL: Apply dark mode class IMMEDIATELY on module load to prevent FOUC
// This runs synchronously BEFORE React renders anything
(function() {
  if (typeof document === 'undefined') return;
  
  var savedTheme = typeof localStorage !== 'undefined' ? localStorage.getItem('theme') : null;
  
  // Default to dark mode (original neon design) unless explicitly set to light
  if (!savedTheme || savedTheme === 'dark' || savedTheme === 'brutalist') {
    document.documentElement.classList.add('dark');
    document.documentElement.setAttribute('data-theme', savedTheme || 'dark');
  } else if (savedTheme === 'light') {
    document.documentElement.classList.remove('dark');
    document.documentElement.setAttribute('data-theme', 'light');
  }
})();

export function ThemeProvider(props: { children: React.ReactNode }) {
  var children = props.children;
  
  var themeState = useState<Theme>('dark'); // Default to dark mode
  var theme = themeState[0];
  var setThemeState = themeState[1];

  useEffect(function() {
    var savedTheme = localStorage.getItem('theme') as Theme;
    if (savedTheme === 'light' || savedTheme === 'dark' || savedTheme === 'brutalist') {
      setThemeState(savedTheme);
      document.documentElement.setAttribute('data-theme', savedTheme);
      if (savedTheme === 'dark' || savedTheme === 'brutalist') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    } else {
      // NO SYSTEM PREFERENCE - ALWAYS DEFAULT TO DARK MODE (original neon design)
      setThemeState('dark');
      document.documentElement.setAttribute('data-theme', 'dark');
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark'); // Save default preference
    }
  }, []);

  function setTheme(newTheme: Theme) {
    setThemeState(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    if (newTheme === 'dark' || newTheme === 'brutalist') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }

  var contextValue = {
    theme: theme,
    setTheme: setTheme
  };

  return React.createElement(
    ThemeContext.Provider,
    { value: contextValue },
    children
  );
}

export function useTheme(): ThemeContextValue {
  var context = useContext(ThemeContext);
  if (!context) {
    return { theme: 'dark', setTheme: function() {} };
  }
  return context;
}