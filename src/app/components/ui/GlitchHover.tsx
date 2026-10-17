import React, { useState } from 'react';
import '../../../styles/components/glitch-hover.css';

type GlitchIntensity = 'subtle' | 'medium' | 'strong';
type GlitchTrigger = 'hover' | 'always';

interface GlitchHoverProps {
  children: React.ReactNode;
  intensity?: GlitchIntensity;
  trigger?: GlitchTrigger;
  className?: string;
}

export function GlitchHover({
  children,
  intensity = 'subtle',
  trigger = 'hover',
  className = '',
}: GlitchHoverProps) {
  const reducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const [hovered, setHovered] = useState(false);

  const isActive = !reducedMotion && (trigger === 'always' || hovered);
  const textContent = typeof children === 'string' ? children : undefined;

  const classes = [
    'glitch-hover',
    `glitch-hover--${intensity}`,
    isActive ? 'glitch-hover--active' : '',
    className,
  ].filter(Boolean).join(' ');

  return React.createElement(
    'span',
    {
      className: classes,
      'data-text': textContent,
      onMouseEnter: trigger === 'hover' ? () => setHovered(true) : undefined,
      onMouseLeave: trigger === 'hover' ? () => setHovered(false) : undefined,
    },
    children
  );
}
