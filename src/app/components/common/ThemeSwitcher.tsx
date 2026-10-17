import React from 'react';
import { Sun, Moon, Wrench } from '@phosphor-icons/react';
import { useTheme } from './ThemeProvider';
import '../../../styles/blocks/theme-switcher.css';

export function ThemeSwitcher() {
  var themeContext = useTheme();
  var theme = themeContext.theme;
  var setTheme = themeContext.setTheme;

  return React.createElement(
    "div",
    { className: "theme-switcher" },
    React.createElement(
      "button",
      {
        className: "theme-switcher__option" + (theme === 'light' ? " theme-switcher__option--active" : ""),
        onClick: function() { setTheme('light'); },
        "aria-label": "Light mode",
        title: "Light mode"
      },
      React.createElement(Sun, { weight: theme === 'light' ? "fill" : "regular", size: 16 })
    ),
    React.createElement(
      "button",
      {
        className: "theme-switcher__option" + (theme === 'dark' ? " theme-switcher__option--active" : ""),
        onClick: function() { setTheme('dark'); },
        "aria-label": "Dark mode",
        title: "Dark mode"
      },
      React.createElement(Moon, { weight: theme === 'dark' ? "fill" : "regular", size: 16 })
    ),
    React.createElement(
      "button",
      {
        className: "theme-switcher__option" + (theme === 'brutalist' ? " theme-switcher__option--active" : ""),
        onClick: function() { setTheme('brutalist'); },
        "aria-label": "Brutalist mode",
        title: "Brutalist mode"
      },
      React.createElement(Wrench, { weight: theme === 'brutalist' ? "fill" : "regular", size: 16 })
    )
  );
}
