import React, { useState, useEffect } from 'react';
import '../../../styles/components/typewriter-text.css';

interface TypewriterTextProps {
  text: string;
  speed?: number;
  delay?: number;
  cursor?: boolean;
  onComplete?: () => void;
  tag?: keyof React.JSX.IntrinsicElements;
  className?: string;
}

export function TypewriterText({
  text,
  speed = 60,
  delay = 0,
  cursor = true,
  onComplete,
  tag = 'span',
  className,
}: TypewriterTextProps) {
  const reducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const [displayed, setDisplayed] = useState(reducedMotion ? text : '');
  const [complete, setComplete] = useState(reducedMotion);

  useEffect(() => {
    if (reducedMotion) {
      setDisplayed(text);
      setComplete(true);
      onComplete?.();
      return;
    }
    setDisplayed('');
    setComplete(false);
    let index = 0;
    const start = setTimeout(() => {
      const interval = setInterval(() => {
        index += 1;
        setDisplayed(text.slice(0, index));
        if (index >= text.length) {
          clearInterval(interval);
          setComplete(true);
          onComplete?.();
        }
      }, speed);
      return () => clearInterval(interval);
    }, delay);
    return () => clearTimeout(start);
  }, [text, speed, delay]);

  const cursorEl = cursor && !complete
    ? React.createElement('span', { className: 'typewriter-cursor', 'aria-hidden': 'true' })
    : null;

  return React.createElement(
    tag as string,
    { className },
    displayed,
    cursorEl
  );
}
