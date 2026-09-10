/**
 * @fileoverview Reusable social sharing component for Ash Shaw Makeup Portfolio
 * 
 * @author Ash Shaw Portfolio Team
 * @version 1.2.1 - Semantic BEM Refactor
 */

import React, { useState, useRef, useEffect } from 'react';
import { 
  ShareNetwork, 
  Camera, 
  ChatCircle, 
  Envelope, 
  Copy, 
  Check,
  ArrowSquareOut
} from '@phosphor-icons/react';
import { useModal } from '../common/ModalContext';
import "../../../styles/blocks/share-component.css";

// Custom X.com logo SVG component
const XIcon = ({ className = "share-component__icon" }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    aria-hidden="true"
    fill="currentColor"
  >
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

// Custom Pinterest logo SVG component
const PinterestIcon = ({ className = "share-component__icon" }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    aria-hidden="true"
    fill="currentColor"
  >
    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.399.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.951-7.252 4.173 0 7.41 2.967 7.41 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.367 18.62 0 12.017 0z"/>
  </svg>
);

interface ShareComponentProps {
  title: string;
  description: string;
  url: string;
  imageUrl?: string;
  variant?: 'dropdown' | 'inline' | 'compact';
  label?: string;
  className?: string;
  align?: 'left' | 'center' | 'right';
}

export function ShareComponent({
  title,
  description,
  url,
  imageUrl,
  variant = 'dropdown',
  label = 'Share this',
  className = '',
  align = 'left'
}: ShareComponentProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const [announcements, setAnnouncements] = useState('');
  const dropdownRefInit: HTMLDivElement | null = null;
  const dropdownRef = useRef(dropdownRefInit);
  const triggerRefInit: HTMLButtonElement | null = null;
  const triggerRef = useRef(triggerRefInit);
  
  const { registerModal, updateModal, unregisterModal } = useModal();

  useEffect(() => {
    registerModal('share-dropdown', 'dropdown', { title, url });
    return () => unregisterModal('share-dropdown');
  }, [registerModal, unregisterModal, title, url]);

  useEffect(() => {
    updateModal('share-dropdown', isOpen, { title, url });
  }, [updateModal, isOpen, title, url]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!isOpen) return;
      if (event.key === 'Escape') {
        event.preventDefault();
        setIsOpen(false);
        const triggerEl = triggerRef.current;
        if (triggerEl) {
          triggerEl.focus();
        }
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const announceAction = (message: string) => {
    setAnnouncements(message);
    setTimeout(() => setAnnouncements(''), 3000);
  };

  const shareToFacebook = () => {
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(title)}`;
    window.open(facebookUrl, '_blank', 'width=600,height=400');
    setIsOpen(false);
    announceAction('Opened Facebook sharing dialog');
  };

  const shareToX = () => {
    const twitterText = `${title}\n\n${description}`;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(twitterText)}&url=${encodeURIComponent(url)}`;
    window.open(twitterUrl, '_blank', 'width=600,height=400');
    setIsOpen(false);
    announceAction('Opened X sharing dialog');
  };

  const shareToInstagram = async () => {
    try {
      await navigator.clipboard.writeText(url);
      const instagramUrl = 'https://www.instagram.com/';
      window.open(instagramUrl, '_blank');
      setIsOpen(false);
      announceAction('URL copied to clipboard. Instagram opened in new tab for manual sharing.');
    } catch (error) {
      announceAction('Please copy the URL manually for Instagram sharing');
    }
  };

  const shareToPinterest = () => {
    const imgUrlSafe = imageUrl ? imageUrl : '';
    const pinterestUrl = `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(url)}&media=${encodeURIComponent(imgUrlSafe)}&description=${encodeURIComponent(title)}`;
    window.open(pinterestUrl, '_blank', 'width=600,height=400');
    setIsOpen(false);
    announceAction('Opened Pinterest sharing dialog');
  };

  const shareToWhatsApp = () => {
    const whatsappText = `${title}\n\n${description}\n\n${url}`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(whatsappText)}`;
    window.open(whatsappUrl, '_blank');
    setIsOpen(false);
    announceAction('Opened WhatsApp sharing');
  };

  const shareViaEmail = () => {
    const emailSubject = `Check out: ${title}`;
    const emailBody = `I thought you might be interested in this:\n\n${title}\n\n${description}\n\n${url}`;
    const emailUrl = `mailto:?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
    window.location.href = emailUrl;
    setIsOpen(false);
    announceAction('Opened email client for sharing');
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
      setIsOpen(false);
      announceAction('URL copied to clipboard successfully');
    } catch (error) {
      const textArea = document.createElement('textarea');
      textArea.value = url;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      document.body.appendChild(textArea);
      textArea.select();
      try {
        document.execCommand('copy');
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 2000);
        announceAction('URL copied using fallback');
      } catch (e) {
        announceAction('Please copy the URL manually');
      } finally {
        document.body.removeChild(textArea);
        setIsOpen(false);
      }
    }
  };

  const shareNative = async () => {
    const shareData = { title, text: description, url };
    try {
      if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
        await navigator.share(shareData);
        announceAction('Content shared successfully');
      } else {
        setIsOpen(!isOpen);
      }
    } catch (error) {
      if ((error as Error).name !== 'AbortError') {
        setIsOpen(!isOpen);
      }
    }
  };

  const alignClass = `share-component__container--${align}`;

  if (variant === 'compact') {
    return (
      <div className={`share-component ${className}`}>
        <button
          type="button"
          ref={triggerRef}
          onClick={shareNative}
          className="share-component__btn"
          aria-label={`Share ${title}`}
        >
          <ShareNetwork className="share-component__icon" />
          {label && <span className="share-component__label--responsive">{label}</span>}
        </button>
        {announcements && <div aria-live="polite" className="sr-only">{announcements}</div>}
      </div>
    );
  }

  if (variant === 'inline') {
    return (
      <div className={`share-component ${className}`}>
        <div className={`share-component__inline-container ${alignClass}`}>
          {label && <span className="share-component__label">{label}</span>}
          <div className="share-component__inline-container">
            <button type="button" onClick={shareToX} className="share-component__btn-icon share-component__btn-icon--x" aria-label="Share on X">
              <XIcon className="share-component__social-icon" />
            </button>
            <button type="button" onClick={shareToFacebook} className="share-component__btn-icon share-component__btn-icon--facebook" aria-label="Share on Facebook">
              <ArrowSquareOut className="share-component__social-icon" />
            </button>
            <button type="button" onClick={shareToInstagram} className="share-component__btn-icon share-component__btn-icon--instagram" aria-label="Share on Instagram">
              <Camera className="share-component__social-icon" />
            </button>
            <button type="button" onClick={shareToPinterest} className="share-component__btn-icon share-component__btn-icon--pinterest" aria-label="Share on Pinterest">
              <PinterestIcon className="share-component__social-icon" />
            </button>
            <button type="button" onClick={shareToWhatsApp} className="share-component__btn-icon share-component__btn-icon--whatsapp" aria-label="Share on WhatsApp">
              <ChatCircle className="share-component__social-icon" />
            </button>
            <button type="button" onClick={shareViaEmail} className="share-component__btn-icon share-component__btn-icon--email" aria-label="Share via Email">
              <Envelope className="share-component__social-icon" />
            </button>
            <button type="button" onClick={copyToClipboard} className={`share-component__btn-icon ${copySuccess ? 'share-component__btn-icon--success' : 'share-component__btn-icon--copy'}`} aria-label="Copy Link">
              {copySuccess ? <Check className="share-component__social-icon" /> : <Copy className="share-component__social-icon" />}
            </button>
          </div>
          {announcements && <div aria-live="polite" className="sr-only">{announcements}</div>}
        </div>
      </div>
    );
  }

  return (
    <div className={`share-component ${className}`} ref={dropdownRef}>
      <div className={`share-component__container ${alignClass}`}>
        {label && <span className="share-component__label">{label}</span>}
        <button
          type="button"
          ref={triggerRef}
          onClick={shareNative}
          className="share-component__btn"
          aria-label={`Share ${title}`}
          aria-expanded={isOpen}
          aria-haspopup="true"
        >
          <ShareNetwork className="share-component__icon" />
        </button>
      </div>

      {isOpen && (
        <div className="share-component__dropdown">
          <button type="button" onClick={shareToX} className="share-component__dropdown-item">
            <XIcon className="share-component__dropdown-icon" />
            <span className="share-component__dropdown-text">X</span>
          </button>
          <button type="button" onClick={shareToFacebook} className="share-component__dropdown-item">
            <ArrowSquareOut className="share-component__dropdown-icon" />
            <span className="share-component__dropdown-text">Facebook</span>
          </button>
          <button type="button" onClick={shareToInstagram} className="share-component__dropdown-item">
            <Camera className="share-component__dropdown-icon" />
            <span className="share-component__dropdown-text">Instagram</span>
            <ArrowSquareOut className="share-component__external-icon" />
          </button>
          <button type="button" onClick={shareToPinterest} className="share-component__dropdown-item">
            <PinterestIcon className="share-component__dropdown-icon" />
            <span className="share-component__dropdown-text">Pinterest</span>
          </button>
          <button type="button" onClick={shareToWhatsApp} className="share-component__dropdown-item">
            <ChatCircle className="share-component__dropdown-icon" />
            <span className="share-component__dropdown-text">WhatsApp</span>
          </button>
          <button type="button" onClick={shareViaEmail} className="share-component__dropdown-item">
            <Envelope className="share-component__dropdown-icon" />
            <span className="share-component__dropdown-text">Email</span>
          </button>
          <hr className="share-component__dropdown-divider" />
          <button type="button" onClick={copyToClipboard} className="share-component__dropdown-item">
            {copySuccess ? (
              <span className="share-component__dropdown-item-content">
                <Check className="share-component__dropdown-icon share-component__text--success" />
                <span className="share-component__dropdown-text share-component__text--success">Copied!</span>
              </span>
            ) : (
              <span className="share-component__dropdown-item-content">
                <Copy className="share-component__dropdown-icon" />
                <span className="share-component__dropdown-text">Copy Link</span>
              </span>
            )}
          </button>
        </div>
      )}
      
      {announcements && <div aria-live="polite" className="sr-only">{announcements}</div>}
    </div>
  );
}

export type { ShareComponentProps };