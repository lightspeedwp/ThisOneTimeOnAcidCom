import React from 'react';
import { setSEO } from '../../../utils/seo';
import { pageSEO } from '../../../data/mock/seo/pages';
import { useNavigate } from '../../../lib/router';

export function BookHomePage() {
  var navigate = useNavigate();

  React.useEffect(function() {
    setSEO(pageSEO.bookHome);
  }, []);

  function handleUnlock(e) {
    if (e && e.preventDefault) e.preventDefault();
    var emailInput = e.target.querySelector('input[type="email"]');
    if (emailInput && emailInput.value.toLowerCase() === 'hello@thisonetimeonacid.com') {
      navigate('/ebook');
    } else {
      navigate('/thank-you');
    }
  }

  function handleWaitlist() {
    navigate('/waitlist');
  }

  function handleNavigate(path) {
    return function() {
      navigate(path);
    };
  }

  return React.createElement(
    "main",
    { id: "main-content", className: "page-layout" },
    
    // Hero Section
    React.createElement(
      "section",
      { className: "hero section entrance-boot" },
      React.createElement(
        "div",
        { className: "section__container hero__grid" },
        React.createElement(
          "div",
          { className: "hero__content" },
          React.createElement("span", { className: "eyebrow entrance-stagger", style: { animationDelay: '0.1s' } }, "First book by Ash Shaw"),
          React.createElement("h1", { className: "heading-hero text-neon-pink entrance-stagger", style: { animationDelay: '0.2s' } }, "This one time on acid..."),
          React.createElement("h2", { className: "text-lead entrance-stagger", style: { animationDelay: '0.3s' } }, "A hybrid memoir and creative-life guide about dancefloors, difference, freedom, and becoming fully yourself."),
          React.createElement("p", { className: "text-body entrance-stagger", style: { animationDelay: '0.4s' } }, "For misfits, makers, dancers, seekers, festival people, and anyone wired a little differently."),
          
          React.createElement(
            "form",
            { className: "form form--row space-top-lg entrance-stagger", style: { animationDelay: '0.5s' }, onSubmit: handleUnlock },
            React.createElement(
              "div",
              { className: "form__group" },
              React.createElement("input", { type: "email", placeholder: "Email address", className: "form__input", required: true, "aria-label": "Email address" })
            ),
            React.createElement("button", { type: "submit", className: "button button--primary neon-pulse-cta" }, "Unlock the Draft")
          ),
          React.createElement("p", { className: "text-fine space-top-sm entrance-stagger", style: { animationDelay: '0.6s' } }, "Enter your email to read the rough draft, get chapter updates, and hear first when pre-orders open."),
          
          React.createElement(
            "div",
            { className: "button-group space-top-md entrance-stagger", style: { animationDelay: '0.7s' } },
            React.createElement("button", { type: "button", onClick: handleWaitlist, className: "button button--secondary" }, "Join the Waitlist")
          )
        ),
        React.createElement(
          "div",
          { className: "hero__visual float-gentle entrance-stagger", "aria-hidden": "true", style: { animationDelay: '0.8s' } },
          React.createElement(
            "h2", 
            { className: "book-cover__title" }, 
            "This one time on ",
            React.createElement("span", { className: "text-neon-rainbow holographic-shimmer" }, "acid"),
            "..."
          ),
          React.createElement("p", { className: "book-cover__author" }, "by Ash Shaw")
        )
      )
    ),

    // What it is
    React.createElement(
      "section",
      { className: "section section--dark" },
      React.createElement(
        "div",
        { className: "section__container section__container--narrow text-center" },
        React.createElement("span", { className: "eyebrow" }, "What it is"),
        React.createElement("h2", { className: "heading-section" }, "A memoir. A guide. A neon map back to yourself."),
        React.createElement("p", { className: "text-body" }, "This one time on acid... is a hybrid memoir and creative-life guide built from a life lived across dancefloors, cities, bicycles, studios, festivals, businesses, and strange turning points. It brings together wild stories, subculture, identity, art, and lived lessons into one vivid body of work."),
        React.createElement("p", { className: "text-body" }, "This is not a polished success story. It is a raw, evolving book about becoming more visible, more honest, more creative, and more fully yourself.")
      )
    ),

    // Why care
    React.createElement(
      "section",
      { className: "section" },
      React.createElement(
        "div",
        { className: "section__container section__container--narrow text-center" },
        React.createElement("span", { className: "eyebrow" }, "Why care"),
        React.createElement("h2", { className: "heading-section" }, "Because the point is not just to survive your life. It is to live it fully."),
        React.createElement("p", { className: "text-body" }, "Beneath the stories of psytrance culture, travel, UV paint, and creative reinvention is a deeper question: how do you build a life that actually feels like yours?"),
        React.createElement("p", { className: "text-body" }, "This book is for people who want more aliveness, more freedom, more belonging, and more permission to become who they already are.")
      )
    ),

    // 4-Card Grid
    React.createElement(
      "section",
      { className: "section section--dark" },
      React.createElement(
        "div",
        { className: "section__container" },
        React.createElement(
          "div",
          { className: "grid" },
          React.createElement(
            "div",
            { className: "card" },
            React.createElement("h3", { className: "heading-card" }, "Stories"),
            React.createElement("p", { className: "text-body" }, "Raw scenes from festivals, cities, movement, art, risk, and identity.")
          ),
          React.createElement(
            "div",
            { className: "card" },
            React.createElement("h3", { className: "heading-card" }, "Lessons"),
            React.createElement("p", { className: "text-body" }, "Hard-won insights on freedom, visibility, creativity, belonging, and courage.")
          ),
          React.createElement(
            "div",
            { className: "card" },
            React.createElement("h3", { className: "heading-card" }, "Energy"),
            React.createElement("p", { className: "text-body" }, "A cult, neon, psychedelic world that feels alive on the page.")
          ),
          React.createElement(
            "div",
            { className: "card" },
            React.createElement("h3", { className: "heading-card" }, "Permission"),
            React.createElement("p", { className: "text-body" }, "A reminder that difference can become direction, and standing out can become a way of life.")
          )
        )
      )
    ),

    // Why Ash
    React.createElement(
      "section",
      { className: "section" },
      React.createElement(
        "div",
        { className: "section__container section__container--narrow text-center" },
        React.createElement("span", { className: "eyebrow" }, "Why Ash"),
        React.createElement("h2", { className: "heading-section" }, "Written by someone who has actually lived the overlap."),
        React.createElement("p", { className: "text-body" }, "Ash Shaw is a South African writer, UV makeup artist, founder, cyclist, speaker, traveller, and lifelong builder of communities. His first book brings together decades of lived experience across subculture, entrepreneurship, movement, creativity, and radical self-expression."),
        React.createElement("p", { className: "text-body space-bottom-xl" }, "This is not theory from a distance. It is a life observed from the inside."),
        React.createElement(
          "div",
          { className: "tag-list tag-list--center" },
          React.createElement("span", { className: "tag" }, "Writer / Author"),
          React.createElement("span", { className: "tag" }, "UV Artist"),
          React.createElement("span", { className: "tag" }, "Founder"),
          React.createElement("span", { className: "tag" }, "Speaker"),
          React.createElement("span", { className: "tag" }, "Cyclist"),
          React.createElement("span", { className: "tag" }, "Festival Veteran"),
          React.createElement("span", { className: "tag" }, "Creative Director"),
          React.createElement("span", { className: "tag" }, "Community Builder")
        )
      )
    ),

    // Locked Content
    React.createElement(
      "section",
      { className: "section section--dark" },
      React.createElement(
        "div",
        { className: "section__container section__container--narrow" },
        React.createElement(
          "div",
          { className: "locked-content" },
          React.createElement("span", { className: "eyebrow" }, "Read early"),
          React.createElement("h2", { className: "heading-section" }, "The rough draft is open to early readers."),
          React.createElement("p", { className: "text-body" }, "The book is still in progress. Some chapters are finished. Others are still being lived. That is part of the point."),
          React.createElement("p", { className: "text-body space-bottom-lg" }, "Enter your email to unlock the draft preview and follow the making of the book as it evolves."),
          React.createElement(
            "div",
            { className: "card locked-content--left space-bottom-lg" },
            React.createElement("span", { className: "card__category" }, "Draft preview"),
            React.createElement(
              "ul",
              { className: "list-bulleted text-body" },
              React.createElement("li", null, "Stories, lessons, and the making of a neon soul"),
              React.createElement("li", null, "Childhood, neurodivergence, festivals, Berlin, bicycles, UV paint, and the cumulative effect of a life lived in full colour")
            )
          ),
          React.createElement("button", { onClick: handleNavigate('/read-the-draft'), className: "button button--primary" }, "Unlock the Draft")
        )
      )
    ),

    // Beyond the page
    React.createElement(
      "section",
      { className: "section" },
      React.createElement(
        "div",
        { className: "section__container" },
        React.createElement(
          "div",
          { className: "grid grid--2" },
          React.createElement(
            "div",
            null,
            React.createElement("span", { className: "eyebrow" }, "Beyond the page"),
            React.createElement("h2", { className: "heading-section" }, "A book built to be spoken, shared, and experienced live."),
            React.createElement("p", { className: "text-body" }, "The site should make room for future talks, workshops, readings, festival appearances, podcasts, and media conversations. Show this as an active, expandable ecosystem around the book."),
            React.createElement(
              "div",
              { className: "button-group space-top-md" },
              React.createElement("button", { onClick: handleNavigate('/events'), className: "button button--secondary" }, "View events"),
              React.createElement("button", { onClick: handleNavigate('/contact'), className: "button button--secondary" }, "Book a talk"),
              React.createElement("button", { onClick: handleNavigate('/media'), className: "button button--secondary" }, "Explore media")
            )
          ),
          React.createElement(
            "div",
            null,
            React.createElement("span", { className: "eyebrow" }, "Speaking"),
            React.createElement("h2", { className: "heading-section" }, "Talks and workshops for creative communities, festivals, teams, and curious humans."),
            React.createElement("p", { className: "text-body" }, "The themes of the book naturally extend into live conversations about creativity, difference, identity, freedom, courage, community, and building a life that funds the work."),
            React.createElement(
              "div",
              { className: "button-group space-top-md" },
              React.createElement("button", { onClick: handleNavigate('/speaking'), className: "button button--secondary" }, "Enquire about speaking")
            )
          )
        )
      )
    ),

    // Journal
    React.createElement(
      "section",
      { className: "section section--dark" },
      React.createElement(
        "div",
        { className: "section__container" },
        React.createElement(
          "div",
          { className: "section__header text-center" },
          React.createElement("span", { className: "eyebrow" }, "Journal"),
          React.createElement("h2", { className: "heading-section" }, "Notes, field reports, videos, and companion pieces from the world of the book."),
          React.createElement("p", { className: "text-body section__container--narrow" }, "The Journal is where blog posts, podcasts, videos, and related reflections live together. It should feel like an editorial companion to the book, not a separate content silo.")
        ),
        React.createElement(
          "div",
          { className: "grid" },
          React.createElement(
            "div",
            { className: "card" },
            React.createElement("span", { className: "card__category card__category--yellow" }, "Essay"),
            React.createElement("h3", { className: "heading-card" }, "What the dancefloor taught me about belonging"),
            React.createElement("a", { href: "/journal", className: "card__link" }, "Read piece \u2192")
          ),
          React.createElement(
            "div",
            { className: "card" },
            React.createElement("span", { className: "card__category card__category--green" }, "Video"),
            React.createElement("h3", { className: "heading-card" }, "UV paint and becoming visible"),
            React.createElement("a", { href: "/journal", className: "card__link" }, "Watch video \u2192")
          ),
          React.createElement(
            "div",
            { className: "card" },
            React.createElement("span", { className: "card__category card__category--pink" }, "Podcast"),
            React.createElement("h3", { className: "heading-card" }, "Notes on living in full colour"),
            React.createElement("a", { href: "/journal", className: "card__link" }, "Listen \u2192")
          )
        )
      )
    ),

    // CTA
    React.createElement(
      "section",
      { className: "section" },
      React.createElement(
        "div",
        { className: "section__container section__container--narrow text-center" },
        React.createElement("h2", { className: "heading-section text-neon-pink" }, "Start reading the rough draft."),
        React.createElement("p", { className: "text-body space-bottom-lg" }, "Enter your email for early access, future chapter drops, launch news, and first notice when pre-orders open."),
        React.createElement(
          "div",
          { className: "button-group button-group--center" },
          React.createElement("button", { onClick: handleNavigate('/read-the-draft'), className: "button button--primary" }, "Unlock the Draft"),
          React.createElement("button", { onClick: handleWaitlist, className: "button button--secondary" }, "Join the Waitlist")
        )
      )
    )
  );
}