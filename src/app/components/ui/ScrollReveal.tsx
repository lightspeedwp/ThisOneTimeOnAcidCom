import React, { useRef, useState, useEffect } from 'react';
import '../../../styles/components/scroll-reveal.css';

type RevealAnimation = 'fade' | 'slide-up' | 'slide-left' | 'slide-right' | 'scale';

interface ScrollRevealProps {
  children: React.ReactNode;
  animation?: RevealAnimation;
  delay?: number;
  threshold?: number;
  once?: boolean;
  className?: string;
}

export function ScrollReveal({
  children,
  animation = 'slide-up',
  delay = 0,
  threshold = 0.15,
  once = true,
  className = '',
}: ScrollRevealProps) {
  const reducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(reducedMotion);

  useEffect(() => {
    if (reducedMotion || !ref.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            if (once) observer.unobserve(entry.target);
          } else if (!once) {
            setVisible(false);
          }
        });
      },
      { threshold }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold, once, reducedMotion]);

  const classes = [
    'scroll-reveal',
    `scroll-reveal--${animation}`,
    visible ? 'scroll-reveal--visible' : '',
    className,
  ].filter(Boolean).join(' ');

  return React.createElement(
    'div',
    {
      ref,
      className: classes,
      style: delay > 0 ? { transitionDelay: `${delay}ms` } : undefined,
    },
    children
  );
}
