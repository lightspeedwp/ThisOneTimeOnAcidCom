/**
 * Reusable Hero Layout component for consistent page headers across the site
 * Implements strict BEM architecture and responsive design tokens.
 */

import React, { useState } from "react";
import { ScrollDownArrow } from "../ui/ScrollDownArrow";
import { EnhancedLightbox } from "../ui/EnhancedLightbox";

interface HeroImage {
  src: string;
  alt: string;
  caption?: string;
  description?: string;
  className?: string;
}

interface HeroLayoutProps {
  title: string;
  id?: string;
  subtitle?: string | React.ReactNode;
  description?: string;
  className?: string;
  decorativeElements?: React.ReactNode;
  actions?: React.ReactNode;
  media?: React.ReactNode;
  layout?: "center" | "split" | "left";
  align?: "default" | "wide" | "full";
  fullscreen?: boolean;
  showScrollArrow?: boolean;
  scrollArrowTarget?: string;
  scrollArrowClassName?: string;
  heroImages?: HeroImage[];
  lightboxTitle?: string;
  enableLightbox?: boolean;
  size?: "sm" | "md" | "lg" | "xl";
  /** Neon accent color for animated gradient subtitle. Matches navigation neonColor values. */
  neonColor?: string;
  /** Enable terminal boot sequence animations (Phase 1) */
  animated?: boolean;
  /** Enable holographic shimmer on title */
  holographicTitle?: boolean;
  /** Enable gentle float on media elements */
  floatMedia?: boolean;
}

export function HeroLayout(props: HeroLayoutProps) {
  var title = props.title;
  var id = props.id;
  var subtitle = props.subtitle;
  var description = props.description;
  var className = props.className || "";
  var decorativeElements = props.decorativeElements;
  var actions = props.actions;
  var media = props.media;
  var layout = props.layout || "center";
  var align = props.align || "default";
  var fullscreen = props.fullscreen || false;
  var showScrollArrow = props.showScrollArrow !== false;
  var scrollArrowTarget = props.scrollArrowTarget;
  var scrollArrowClassName = props.scrollArrowClassName;
  var heroImages = props.heroImages;
  var lightboxTitle =
    props.lightboxTitle || "Portfolio Gallery";
  var enableLightbox = props.enableLightbox || false;
  var size = props.size || "md";
  var neonColor = props.neonColor || "";
  var animated = props.animated || false;
  var holographicTitle = props.holographicTitle || false;
  var floatMedia = props.floatMedia || false;

  // Portfolio lightbox state management - initial state built without type assertion
  var initialLightbox = {
    isOpen: false,
    images: [],
    currentIndex: 0,
    title: "",
  };
  var lightboxState = useState(initialLightbox);
  var lightbox = lightboxState[0];
  var setLightbox = lightboxState[1];

  // Helper function to render subtitle with colored words for brand tagline
  function renderSubtitle() {
    if (!subtitle) return null;

    // Build the neon class string once for reuse
    var neonClass = "";
    if (neonColor) {
      neonClass = " hero__subtitle--neon hero__subtitle--neon-" + neonColor;
    }

    // Check if this is the brand tagline that needs individual word colors
    var subtitleText =
      typeof subtitle === "string" ? subtitle : "";
    var hasColour = subtitleText.includes("colour");
    var hasEnergy = subtitleText.includes("energy");
    var hasConnection = subtitleText.includes("connection");
    var isBrandTagline =
      hasColour && hasEnergy && hasConnection;

    if (isBrandTagline) {
      // Brand tagline uses per-word accent colours with pulse animation
      // Do NOT apply neonClass here — background-clip:text on the parent
      // would override the children's individual color + text-shadow glow
      var brandTaglineClasses = "hero__subtitle hero__subtitle--brand-tagline";
      if (animated) {
        brandTaglineClasses += " hero__subtitle--fade-in";
      }
      return (
        <h2 className={brandTaglineClasses}>
          {"Makeup that shines with "}
          <span className="hero__subtitle-accent--pink">
            colour
          </span>
          {", "}
          <span className="hero__subtitle-accent--green">
            energy
          </span>
          {", and "}
          <span className="hero__subtitle-accent--cyan">
            connection
          </span>
        </h2>
      );
    }

    // Default rendering for non-tagline subtitles (string or ReactNode)
    var subtitleClass = baseSubtitleClass + neonClass;
    return <h2 className={subtitleClass}>{subtitle}</h2>;
  }

  // Prepare hero images for lightbox
  var lightboxImages = [];
  if (heroImages) {
    for (var i = 0; i < heroImages.length; i++) {
      var img = heroImages[i];
      lightboxImages.push({
        src: img.src,
        alt: img.alt,
        caption: img.caption,
        description: img.description,
      });
    }
  }

  function openLightbox(index: number) {
    if (enableLightbox && heroImages) {
      setLightbox({
        isOpen: true,
        images: lightboxImages,
        currentIndex: index,
        title: lightboxTitle,
      });
    }
  }

  function closeLightbox() {
    setLightbox({
      isOpen: false,
      images: lightbox.images,
      currentIndex: lightbox.currentIndex,
      title: lightbox.title,
    });
  }

  // Hero Media Component with Lightbox Integration
  function HeroMediaWithLightbox() {
    if (!enableLightbox) {
      if (media) return media;
      return null;
    }
    if (!heroImages) {
      if (media) return media;
      return null;
    }
    if (heroImages.length === 0) {
      if (media) return media;
      return null;
    }

    var imageElements = [];
    for (var i = 0; i < heroImages.length; i++) {
      var image = heroImages[i];
      var index = i;

      // Mosaic tile configurations mapped to BEM classes
      var mosaicClasses = [
        "hero__mosaic-image hero__mosaic-image--1",
        "hero__mosaic-image hero__mosaic-image--2",
        "hero__mosaic-image hero__mosaic-image--3",
      ];

      var tileClass = image.className
        ? image.className
        : mosaicClasses[index % 3];
      var bgUrl = image.src;
      var bgStyle = { backgroundImage: 'url("' + bgUrl + '")' };
      var labelText = image.caption ? image.caption : image.alt;
      var fullLabel =
        "View " + labelText + " in portfolio gallery";

      var currentIndex = index;
      function makeClickHandler(idx: number) {
        return function () {
          openLightbox(idx);
        };
      }

      function makeKeyHandler(idx: number) {
        return function (e: React.KeyboardEvent) {
          var isEnter = e.key === "Enter";
          var isSpace = e.key === " ";
          var isActivationKey = isEnter || isSpace;
          if (isActivationKey) {
            e.preventDefault();
            openLightbox(idx);
          }
        };
      }

      imageElements.push(
        <div
          key={index}
          className={tileClass}
          style={bgStyle}
          aria-label={fullLabel}
          onClick={makeClickHandler(currentIndex)}
          role="button"
          tabIndex={0}
          onKeyDown={makeKeyHandler(currentIndex)}
        />,
      );
    }

    return (
      <div className="hero__media-container">
        {imageElements}
      </div>
    );
  }

  // BEM Classes
  var sizeClass = size !== "md" ? "hero--" + size : "";
  var fullscreenClass = fullscreen ? "hero--fullscreen" : "";
  var animatedClass = animated ? "hero--animated" : "";
  var heroClassList =
    "hero " +
    sizeClass +
    " " +
    fullscreenClass +
    " " +
    animatedClass +
    " " +
    className;
  var heroClasses = heroClassList.replace(/\s+/g, " ").trim();

  // Build content classes without nested ternary
  var contentClassList = "hero__content";
  if (layout === "split") {
    contentClassList += " hero__content--split";
  } else if (layout === "left") {
    contentClassList += " hero__content--left";
  }
  var contentClasses = contentClassList;

  // Container Classes
  var containerClasses = "hero__container";
  if (align === "wide")
    containerClasses += " hero__container--wide";
  if (align === "full")
    containerClasses += " hero__container--full";

  // Media Classes
  var mediaWrapperClasses = "hero__media-wrapper";
  if (floatMedia) {
    mediaWrapperClasses += " hero__media--float";
  }

  // Title Classes
  var titleClasses = "hero__title text-gradient-pink-purple-blue";
  if (holographicTitle) {
    titleClasses += " hero__title--holographic";
  }
  if (animated) {
    titleClasses += " hero__title--fade-in";
  }

  // Subtitle Classes
  var baseSubtitleClass = "hero__subtitle";
  if (animated) {
    baseSubtitleClass += " hero__subtitle--fade-in";
  }

  // Description Classes
  var descriptionClasses = "hero__description";
  if (animated) {
    descriptionClasses += " hero__description--fade-in";
  }

  // Actions Classes
  var actionsClasses = "hero__actions";
  if (animated) {
    actionsClasses += " hero__actions--fade-in";
  }

  // Scroll arrow properties
  var arrowClass = scrollArrowClassName
    ? scrollArrowClassName
    : "hero__scroll-arrow";
  var targetName = scrollArrowTarget
    ? scrollArrowTarget.replace("-", " ")
    : "next";
  var arrowLabel = "Scroll to " + targetName + " section";

  return (
    <section id={id} className={heroClasses}>
      {/* Decorative Elements (Orbs/Backgrounds) */}
      {decorativeElements ? (
        <div
          className="hero__decorative-wrapper"
          aria-hidden="true"
        >
          {decorativeElements}
        </div>
      ) : (
        <div className="hero__bg-effects" aria-hidden="true">
          <div className="hero__bg-effect hero__bg-effect--1" />
          <div className="hero__bg-effect hero__bg-effect--2" />
          <div className="hero__bg-effect hero__bg-effect--3" />
        </div>
      )}

      {/* Content Container */}
      <div className={containerClasses}>
        <div className={contentClasses}>
          {/* Text Content */}
          <div className="hero__text-column">
            <h1
              className={titleClasses}
            >
              {title}
            </h1>

            {renderSubtitle()}

            {description && (
              <p className={descriptionClasses}>{description}</p>
            )}

            {actions && (
              <div className={actionsClasses}>{actions}</div>
            )}
          </div>

          {/* Enhanced Media Content for Split Layout */}
          {layout === "split" && (
            <div className={mediaWrapperClasses}>
              <HeroMediaWithLightbox />
            </div>
          )}
        </div>

        {/* Media Content for non-split layouts (e.g. Center) */}
        {layout !== "split" && (
          <div className={mediaWrapperClasses + "-bottom"}>
            <HeroMediaWithLightbox />
          </div>
        )}
      </div>

      {/* Scroll Down Arrow */}
      {showScrollArrow && (
        <ScrollDownArrow
          targetSectionId={scrollArrowTarget}
          className={arrowClass}
          ariaLabel={arrowLabel}
        />
      )}

      {/* Portfolio Lightbox */}
      {enableLightbox && (
        <EnhancedLightbox
          isOpen={lightbox.isOpen}
          onClose={closeLightbox}
          images={lightbox.images}
          currentIndex={lightbox.currentIndex}
          title={lightbox.title}
        />
      )}
    </section>
  );
}