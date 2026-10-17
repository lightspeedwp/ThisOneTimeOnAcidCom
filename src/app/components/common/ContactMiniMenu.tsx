/**
 * @fileoverview Contact Mini Mega Menu — compact dropdown for the Contact nav link
 *
 * Sections:
 * 1. "Get In Touch" CTA with link to the full Contact page
 * 2. Direct email link
 * 3. Social media icons (all platforms except Email — shown as text above)
 *
 * Animation: "Neon Pulse Pop" — quick scale-up with a cyan border flash.
 * Pure CSS keyframes (no motion/react).
 *
 * @component ContactMiniMenu
 * @author Ash Shaw Portfolio Team
 * @version 1.0.0
 */

import React, { useCallback, useRef, useEffect } from 'react';
import { useNavigate } from '../../lib/router';
import { ArrowRight, Envelope } from '@phosphor-icons/react';
import { SocialLinks } from './SocialLinks';
import { contactUI } from '../../data/mock/ui/contact';
import '../../../styles/blocks/contact-mini-menu.css';

interface ContactMiniMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

export function ContactMiniMenu({ isOpen, onClose, onMouseEnter, onMouseLeave }: ContactMiniMenuProps) {
  const navigate = useNavigate();
  const menuRefInit: HTMLDivElement | null = null;
  const menuRef = useRef(menuRefInit);

  const go = useCallback(
    (path: string) => {
      onClose();
      navigate(path);
    },
    [navigate, onClose],
  );

  /** Keyboard navigation */
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
    },
    [onClose],
  );

  /** Focus first interactive element on open */
  useEffect(() => {
    if (isOpen && menuRef.current) {
      const first = menuRef.current.querySelector(
        '.contact-mini__cta-btn, .contact-mini__email-link',
      ) as HTMLButtonElement | HTMLAnchorElement | null;
      if (first) first.focus();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="contact-mini"
      role="menu"
      aria-label="Contact quick menu"
      onKeyDown={handleKeyDown}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      ref={menuRef}
    >
      {/* Decorative top rainbow bar */}
      <div className="contact-mini__rainbow" aria-hidden="true" />

      <div className="contact-mini__body">
        {/* ── CTA section ── */}
        <div className="contact-mini__section contact-mini__section--cta">
          <h3 className="contact-mini__heading">{contactUI.header.title}</h3>
          <p className="contact-mini__desc">{contactUI.about.quote}</p>
          <button
            type="button"
            className="contact-mini__cta-btn"
            role="menuitem"
            onClick={() => go('/contact')}
          >
            View Contact Page
            <ArrowRight className="contact-mini__cta-icon" aria-hidden="true" />
          </button>
        </div>

        {/* ── Divider ── */}
        <div className="contact-mini__divider" aria-hidden="true" />

        {/* ── Email ── */}
        <div className="contact-mini__section contact-mini__section--email">
          <a
            href="mailto:hello@ashshaw.makeup"
            className="contact-mini__email-link"
            aria-label="Email Ash Shaw"
          >
            <Envelope className="contact-mini__email-icon" aria-hidden="true" />
            hello@ashshaw.makeup
          </a>
        </div>

        {/* ── Divider ── */}
        <div className="contact-mini__divider" aria-hidden="true" />

        {/* ── Social Links ── */}
        <div className="contact-mini__section contact-mini__section--social">
          <h4 className="contact-mini__social-heading">{contactUI.connect.title}</h4>
          <SocialLinks variant="clean" exclude={['Email']} />
        </div>
      </div>
    </div>
  );
}