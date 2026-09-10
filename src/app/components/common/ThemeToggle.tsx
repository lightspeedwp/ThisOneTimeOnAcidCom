/**
 * ThemeToggle Component
 * 
 * Toggle between light and deep purple dark mode themes
 * 
 * @component
 * @returns {JSX.Element} Theme toggle button with sun/moon icons
 * @version 2.2.1 - Semantic BEM Refactor
 */

import React, { useEffect, useState } from 'react';
import { Moon, Sun } from '@phosphor-icons/react';
import "../../../styles/blocks/theme-toggle.css";

export function ThemeToggle() {
  const [darkMode, setDarkMode] = useState(false);
  
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    const isDarkSaved = savedTheme === 'dark';
    const noSavedTheme = !savedTheme;
    const shouldBeDark = isDarkSaved || (noSavedTheme && prefersDark);
    if (shouldBeDark) {
      setDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);
  
  const toggleTheme = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    
    if (newMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    const isActivationKey = e.key === 'Enter' || e.key === ' ';
    if (isActivationKey) {
      e.preventDefault();
      toggleTheme();
    }
  };
  
  return (
    <button
      type="button"
      onClick={toggleTheme}
      onKeyDown={handleKeyDown}
      aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
      className="theme-toggle"
    >
      {/* Sun Icon (Light Mode) */}
      {!darkMode && (
        <Sun 
          className="theme-toggle__icon"
          weight="regular"
        />
      )}
      
      {/* Moon Icon (Dark Mode) */}
      {darkMode && (
        <Moon 
          className="theme-toggle__icon"
          weight="regular"
        />
      )}
      
      <span className="sr-only">
        {darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
      </span>
    </button>
  );
}