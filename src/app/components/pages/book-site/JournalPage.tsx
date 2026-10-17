import React from 'react';
import { useNavigate } from '../../../lib/router';
import { setSEO } from '../../../utils/seo';
import { pageSEO } from '../../../data/mock/seo/pages';
import { journalPosts } from '../../../data/mock/journal-posts';

export function JournalPage() {
  var navigate = useNavigate();

  React.useEffect(function() {
    setSEO(pageSEO.journal);
  }, []);

  function getCategoryColor(category: string) {
    if (category === 'Essay') return 'card__category--pink';
    if (category === 'Video') return 'card__category--green';
    if (category === 'Podcast') return 'card__category--violet';
    if (category === 'Travel') return 'card__category--yellow';
    if (category === 'Field Notes') return 'card__category--pink';
    return 'card__category--yellow';
  }

  function handlePostClick(slug: string) {
    return function() {
      navigate('/journal/' + slug);
    };
  }

  return React.createElement(
    "main",
    { id: "main-content", className: "page-layout" },
    React.createElement(
      "section",
      { className: "section" },
      React.createElement(
        "div",
        { className: "section__container text-center" },
        React.createElement("span", { className: "eyebrow" }, "Journal"),
        React.createElement("h1", { className: "heading-hero text-neon-pink" }, "Notes, stories, videos, and companion media from the world of the book."),
        React.createElement(
          "p",
          { className: "text-lead section__container--narrow space-top-md" },
          "This section brings together written posts, podcast episodes, videos, field notes, and behind-the-book updates. It should feel like an evolving editorial layer around the manuscript."
        )
      )
    ),

    React.createElement(
      "section",
      { className: "section", style: { paddingTop: "0" } },
      React.createElement(
        "div",
        { className: "section__container text-center" },
        React.createElement(
          "div",
          { className: "tag-list tag-list--center" },
          React.createElement("span", { className: "tag tag--interactive tag--pink" }, "All"),
          React.createElement("span", { className: "tag tag--interactive" }, "Essays"),
          React.createElement("span", { className: "tag tag--interactive" }, "Videos"),
          React.createElement("span", { className: "tag tag--interactive" }, "Podcasts"),
          React.createElement("span", { className: "tag tag--interactive" }, "Field Notes"),
          React.createElement("span", { className: "tag tag--interactive" }, "Book Updates"),
          React.createElement("span", { className: "tag tag--interactive" }, "Events Recap")
        )
      )
    ),

    React.createElement(
      "section",
      { className: "section section--dark" },
      React.createElement(
        "div",
        { className: "section__container" },
        React.createElement(
          "div",
          { className: "grid" },
          journalPosts.map(function(post) {
            var categoryColor = getCategoryColor(post.category);
            
            return React.createElement(
              "article",
              { 
                key: post.id,
                className: "card",
                style: { cursor: 'pointer' },
                onClick: handlePostClick(post.slug)
              },
              React.createElement(
                "div",
                { 
                  className: "card__image-wrapper",
                  style: {
                    width: '100%',
                    height: '240px',
                    overflow: 'hidden',
                    borderRadius: '8px',
                    marginBottom: '16px'
                  }
                },
                React.createElement("img", {
                  src: post.featuredImage,
                  alt: post.title,
                  className: "card__image",
                  style: {
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }
                })
              ),
              React.createElement("span", { className: "card__category " + categoryColor }, post.category),
              React.createElement("h3", { className: "heading-card" }, post.title),
              React.createElement("p", { className: "text-body" }, post.excerpt),
              React.createElement(
                "a",
                { 
                  href: "/journal/" + post.slug,
                  className: "card__link",
                  onClick: function(e) {
                    if (e && e.preventDefault) e.preventDefault();
                    navigate('/journal/' + post.slug);
                  }
                },
                "Read more →"
              )
            );
          })
        )
      )
    )
  );
}
