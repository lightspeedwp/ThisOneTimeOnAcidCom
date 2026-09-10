/**
 * @fileoverview Reusable ReadMoreButton component for consistent blog navigation
 * 
 * A brand-compliant "Read More" button/link component that provides consistent
 * styling and functionality across homepage blog previews and main blog page.
 * Uses React Router Link for client-side navigation.
 * 
 * @author Ash Shaw Portfolio Team
 * @version 3.1.0 - BEM compact modifier + bundler safety
 */

import React from 'react';
import { Link } from '../../lib/router';
import { ArrowRight } from '@phosphor-icons/react';
import "../../../styles/blocks/read-more-btn.css";

/**
 * Props interface for ReadMoreButton component
 */
export interface ReadMoreButtonProps {
  postTitle: string;
  postSlug?: string;
  postId?: string;
  onClick?: (page: string, slug?: string) => void;
  className?: string;
  children?: React.ReactNode;
  /** When true, renders the compact variant (smaller text + padding) */
  compact?: boolean;
}

/**
 * ReadMoreButton - Reusable component for consistent blog post navigation
 */
export function ReadMoreButton(props: ReadMoreButtonProps) {
  var postTitle = props.postTitle;
  var postSlug = props.postSlug;
  var postId = props.postId;
  var onClick = props.onClick;
  var className = props.className != null ? props.className : "";
  var children = props.children != null ? props.children : "Read more";
  var compact = props.compact;

  // Generate SEO-friendly URL with slug preferred over ID
  var slug = postSlug ? postSlug : postId;
  var href = "/blog/" + (slug ? slug : "");

  // Build class string with optional compact modifier
  var baseClass = "read-more-btn";
  if (compact) {
    baseClass = baseClass + " read-more-btn--compact";
  }
  if (className) {
    baseClass = baseClass + " " + className;
  }

  // Handle click events - navigate to individual blog post
  function handleClick(e: React.MouseEvent<HTMLAnchorElement>) {
    var hasSlugOrId = postSlug !== undefined || postId !== undefined;
    if (onClick && hasSlugOrId) {
      e.preventDefault();
      e.stopPropagation();
      onClick("blog/" + slug, slug);
    }
  }

  // Handle keyboard navigation for accessibility
  function handleKeyDown(e: React.KeyboardEvent<HTMLAnchorElement>) {
    var isActivationKey = e.key === 'Enter' || e.key === ' ';
    var hasSlugOrId = postSlug !== undefined || postId !== undefined;
    if (isActivationKey && onClick && hasSlugOrId) {
      e.preventDefault();
      e.stopPropagation();
      onClick("blog/" + slug, slug);
    }
  }

  // Use React Router Link for proper client-side navigation when no custom onClick
  if (!onClick) {
    return (
      <Link 
        to={href}
        className={baseClass}
        aria-label={"Read full article: " + postTitle}
        onClick={function (e) { e.stopPropagation(); }}
      >
        {children}
        <ArrowRight className="read-more-btn__icon" />
      </Link>
    );
  }

  return (
    <a 
      href={href}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      className={baseClass}
      aria-label={"Read full article: " + postTitle}
    >
      {children}
      <ArrowRight className="read-more-btn__icon" />
    </a>
  );
}