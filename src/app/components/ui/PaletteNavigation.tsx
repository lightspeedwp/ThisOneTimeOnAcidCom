/**
 * @fileoverview Palette Navigation Component
 * 
 * Sticky sidebar navigation on desktop, horizontal scroll menu on mobile.
 * Anchors to each palette section with smooth scrolling.
 * 
 * @component PaletteNavigation
 * @version 1.0.0
 */

import React, { useState, useEffect } from 'react';
import '../../../styles/blocks/palette-navigation.css';

export interface PaletteNavigationProps {
  palettes: Array<{ id: string; name: string }>;
  activePaletteId?: string;
}

export function PaletteNavigation(props: PaletteNavigationProps) {
  var palettes = props.palettes;
  var activePaletteIdState = useState('');
  var activeId = activePaletteIdState[0];
  var setActiveId = activePaletteIdState[1];

  useEffect(function () {
    function handleScroll() {
      var scrollPosition = window.scrollY + 200;
      
      var i = 0;
      for (i = 0; i < palettes.length; i = i + 1) {
        var palette = palettes[i];
        var element = document.getElementById(palette.id);
        if (element != null) {
          var rect = element.getBoundingClientRect();
          var elementTop = rect.top + window.scrollY;
          var elementBottom = elementTop + rect.height;
          
          if (scrollPosition >= elementTop && scrollPosition < elementBottom) {
            setActiveId(palette.id);
            break;
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return function () {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [palettes]);

  function handleClick(e: React.MouseEvent<HTMLAnchorElement>, paletteId: string) {
    e.preventDefault();
    var targetElement = document.getElementById(paletteId);
    if (targetElement != null) {
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  }

  return (
    <nav className="palette-navigation" aria-label="Color palette navigation">
      <div className="palette-navigation__inner">
        {palettes.map(function (palette, index) {
          var isActive = palette.id === activeId;
          var linkClass = isActive 
            ? 'palette-navigation__link palette-navigation__link--active'
            : 'palette-navigation__link';
          
          return (
            <a
              key={palette.id}
              href={'#' + palette.id}
              className={linkClass}
              onClick={function (e) {
                handleClick(e, palette.id);
              }}
              aria-current={isActive ? 'true' : undefined}
            >
              {palette.name}
            </a>
          );
        })}
      </div>
    </nav>
  );
}
