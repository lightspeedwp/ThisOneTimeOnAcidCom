import React, { useState, useEffect } from 'react';
import { useNavigate, grab, arrayGet } from '../../../lib/router';
import { bookPages } from '../../../data/mock/pages/ebook-pages';
import { setSEO } from '../../../utils/seo';
import { pageSEO } from '../../../data/mock/seo/pages';

export function EbookViewerPage() {
  var navigate = useNavigate();
  var stateTuple = useState(0);
  var currentIndex = stateTuple[0];
  var setCurrentIndex = stateTuple[1];

  useEffect(function() {
    setSEO(pageSEO.draftViewer);
    window.scrollTo(0, 0);
  }, [currentIndex]);

  var totalPages = bookPages ? bookPages.length : 0;
  var currentPageData = arrayGet(bookPages || [], currentIndex);

  if (!currentPageData) {
    return React.createElement(
      "main",
      { id: "main-content", className: "page-layout section" },
      React.createElement(
        "div",
        { className: "section__container text-center" },
        React.createElement("h1", { className: "heading-hero text-neon-pink" }, "Loading Draft...")
      )
    );
  }

  var pageType = grab(currentPageData, 'type');
  var pageTitle = grab(currentPageData, 'title');
  var pageSubtitle = grab(currentPageData, 'subtitle');
  var paragraphs = grab(currentPageData, 'paragraphs') || [];
  var pageNumber = grab(currentPageData, 'pageNumber');

  function handleNext() {
    if (currentIndex < totalPages - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  }

  function handlePrev() {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  }

  function handleExit() {
    navigate('/thank-you');
  }

  var contentNode;
  
  if (pageType === 'cover') {
    contentNode = React.createElement(
      "div",
      { className: "text-center space-top-xxl" },
      React.createElement("h1", { className: "heading-hero text-neon-pink space-bottom-md" }, pageTitle || 'This one time on acid...'),
      React.createElement("p", { className: "text-lead text-neon-yellow" }, pageSubtitle),
      React.createElement("p", { className: "text-body space-top-xl" }, "By Ash Shaw")
    );
  } else if (pageType === 'part-title') {
    contentNode = React.createElement(
      "div",
      { className: "text-center space-top-xxl" },
      React.createElement("span", { className: "eyebrow text-neon-yellow" }, "Part " + grab(currentPageData, 'part')),
      React.createElement("h1", { className: "heading-hero text-neon-pink" }, pageTitle),
      pageSubtitle ? React.createElement("p", { className: "text-lead space-top-md" }, pageSubtitle) : null
    );
  } else if (pageType === 'chapter-start') {
    contentNode = React.createElement(
      "div",
      null,
      React.createElement("span", { className: "eyebrow" }, "Chapter " + grab(currentPageData, 'chapter')),
      React.createElement("h1", { className: "heading-section text-neon-pink" }, pageTitle),
      pageSubtitle ? React.createElement("p", { className: "text-lead text-neon-yellow space-bottom-lg" }, pageSubtitle) : null,
      paragraphs.map(function(p, i) {
        return React.createElement("p", { key: "p-" + i, className: "text-body space-bottom-md" }, p);
      })
    );
  } else if (pageType === 'chapter-content') {
    contentNode = React.createElement(
      "div",
      null,
      paragraphs.map(function(p, i) {
        return React.createElement("p", { key: "p-" + i, className: "text-body space-bottom-md" }, p);
      })
    );
  } else if (pageType === 'toc') {
    var tocItems = grab(currentPageData, 'tocItems') || [];
    contentNode = React.createElement(
      "div",
      null,
      React.createElement("h1", { className: "heading-section text-neon-pink space-bottom-lg" }, pageTitle || 'Contents'),
      React.createElement(
        "div",
        { className: "grid" },
        tocItems.map(function(item, i) {
          var itemTitle = grab(item, 'title');
          var itemPage = grab(item, 'page');
          var itemNumber = grab(item, 'number');
          return React.createElement(
            "button",
            { key: "toc-" + i, className: "card card--outline-violet text-left", onClick: handleNext, type: "button" },
            React.createElement("span", { className: "eyebrow" }, "Chapter " + itemNumber),
            React.createElement("h3", { className: "heading-card" }, itemTitle),
            React.createElement("span", { className: "text-fine" }, "Page " + itemPage)
          );
        })
      )
    );
  } else {
    contentNode = React.createElement(
      "div",
      null,
      pageTitle ? React.createElement("h1", { className: "heading-section text-neon-pink space-bottom-lg" }, pageTitle) : null,
      pageSubtitle ? React.createElement("p", { className: "text-lead space-bottom-lg" }, pageSubtitle) : null,
      paragraphs.map(function(p, i) {
        return React.createElement("p", { key: "p-" + i, className: "text-body space-bottom-md" }, p);
      })
    );
  }

  var prevClass = currentIndex === 0 ? "button button--secondary invisible" : "button button--secondary";
  var nextClass = currentIndex === totalPages - 1 ? "button button--primary invisible" : "button button--primary";

  var progressPct = totalPages > 1 ? Math.round((currentIndex / (totalPages - 1)) * 100) : 0;

  return React.createElement(
    "main",
    { id: "main-content", className: "page-layout section--dark" },
    /* Reading progress bar */
    React.createElement(
      "div",
      {
        className: "ebook-progress-bar",
        role: "progressbar",
        "aria-valuenow": progressPct,
        "aria-valuemin": 0,
        "aria-valuemax": 100,
        "aria-label": "Reading progress"
      },
      React.createElement("div", {
        className: "ebook-progress-bar__fill",
        style: { "--progress": progressPct + "%" } as React.CSSProperties
      })
    ),
    React.createElement(
      "div",
      { className: "section__container section__container--narrow space-top-xl flex-between" },
      React.createElement("button", { onClick: handleExit, className: "button button--secondary" }, "\u2190 Back to Site"),
      React.createElement("span", { className: "text-fine text-neon-yellow" }, "Viewing Draft")
    ),
    React.createElement(
      "section",
      { className: "section reader-content" },
      React.createElement(
        "div",
        { className: "section__container section__container--narrow" },
        contentNode
      )
    ),
    React.createElement(
      "div",
      { className: "section__container section__container--narrow footer__bar space-bottom-xl", style: { display: "flex", justifyContent: "space-between", alignItems: "center" } },
      React.createElement(
        "button",
        { onClick: handlePrev, className: prevClass, disabled: currentIndex === 0 },
        "\u2190 Previous"
      ),
      React.createElement(
        "span",
        { className: "text-fine" },
        pageNumber ? "Page " + pageNumber : "Page " + (currentIndex + 1) + " of " + totalPages
      ),
      React.createElement(
        "button",
        { onClick: handleNext, className: nextClass, disabled: currentIndex === totalPages - 1 },
        "Next \u2192"
      )
    )
  );
}
