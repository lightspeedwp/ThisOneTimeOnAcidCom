/**
 * @fileoverview Ebook page content renderer — renders each page type.
 * Extracted from EbookPage.tsx (T14).
 */

import React from 'react';
import type { BookPage } from '../../../../data/mock/pages/ebook-pages';
import { ebookUI } from '../../../../data/mock/ui/ebook';

export function PageContent(props: { page: BookPage }) {
  var page = props.page;

  function renderTitleWithNeonAcid(title: string | undefined) {
    if (!title) return null;
    var match = title.match(/(.*?)acid(.*)/i);
    if (match) {
      return React.createElement(
        React.Fragment,
        null,
        match[1],
        React.createElement("span", { className: "text-neon-rainbow" }, "acid"),
        match[2]
      );
    }
    return title;
  }

  switch (page.type) {
    case 'cover':
      return (
        <div className="ebook-reader__page-inner">
          <span className="ebook-page__status">{ebookUI.cover.status}</span>
          <h2 className="ebook-page__title">{renderTitleWithNeonAcid(page.title)}</h2>
          <p className="ebook-page__subtitle">{page.subtitle}</p>
          <span className="ebook-page__author">{ebookUI.cover.author}</span>
        </div>
      );

    case 'back-cover':
      return (
        <div className="ebook-reader__page-inner">
          <h2 className="ebook-page__title">{renderTitleWithNeonAcid(page.title)}</h2>
          {page.paragraphs ? page.paragraphs.map(function (p, i) {
            return <p key={page.id + '-p-' + i} className="ebook-page__blurb">{p}</p>;
          }) : null}
        </div>
      );

    case 'inside-front':
      return (
        <div className="ebook-reader__page-inner">
          {page.paragraphs ? page.paragraphs.map(function (p, i) {
            return <p key={page.id + '-p-' + i} className="ebook-page__meta-line">{p}</p>;
          }) : null}
        </div>
      );

    case 'title':
      var pageParagraphs = page.paragraphs || [];
      var titleAuthor = pageParagraphs.length > 0 ? pageParagraphs[0] : '';
      return (
        <div className="ebook-reader__page-inner">
          <h2 className="ebook-page__title">{renderTitleWithNeonAcid(page.title)}</h2>
          <p className="ebook-page__subtitle">{page.subtitle}</p>
          <span className="ebook-page__author">{titleAuthor}</span>
          {page.pageNumber != null && (
            <span className="ebook-reader__page-number">{page.pageNumber}</span>
          )}
        </div>
      );

    case 'dedication':
      return (
        <div className="ebook-reader__page-inner">
          {page.paragraphs ? page.paragraphs.map(function (p, i) {
            return <p key={page.id + '-p-' + i} className="ebook-page__dedication-line">{p}</p>;
          }) : null}
          {page.pageNumber != null && (
            <span className="ebook-reader__page-number">{page.pageNumber}</span>
          )}
        </div>
      );

    case 'epigraph':
      return (
        <div className="ebook-reader__page-inner">
          {page.paragraphs ? page.paragraphs.map(function (p, i) {
            return <p key={page.id + '-p-' + i} className="ebook-page__epigraph-line">{p}</p>;
          }) : null}
          {page.pageNumber != null && (
            <span className="ebook-reader__page-number">{page.pageNumber}</span>
          )}
        </div>
      );

    case 'toc':
      return (
        <div className="ebook-reader__page-inner">
          <h2 className="ebook-page__toc-title">{page.title}</h2>
          <ol className="ebook-page__toc-list">
            {page.tocItems ? page.tocItems.map(function (item, idx) {
              if (item.partLabel) {
                return (
                  <li key={'part-' + item.partLabel + '-' + idx} className="ebook-page__toc-part-label">
                    <span className="ebook-page__toc-part-numeral">{item.partLabel}</span>
                    <span>{item.title}</span>
                    {item.page != null ? (
                      <span className="ebook-page__toc-page">{item.page}</span>
                    ) : null}
                  </li>
                );
              }
              return (
                <li key={'ch-' + item.number + '-' + idx} className="ebook-page__toc-item">
                  <span className="ebook-page__toc-number">{item.number}</span>
                  <span>{item.title}</span>
                  <span className="ebook-page__toc-dots" aria-hidden="true" />
                  {item.page != null ? (
                    <span className="ebook-page__toc-page">{item.page}</span>
                  ) : null}
                </li>
              );
            }) : null}
          </ol>
          {page.pageNumber != null && (
            <span className="ebook-reader__page-number">{page.pageNumber}</span>
          )}
        </div>
      );

    case 'foreword':
    case 'afterword':
      return (
        <div className="ebook-reader__page-inner">
          <h2 className="ebook-page__section-title">{page.title}</h2>
          {page.paragraphs ? page.paragraphs.map(function (p, i) {
            return <p key={page.id + '-p-' + i} className="ebook-page__paragraph">{p}</p>;
          }) : null}
          {page.pageNumber != null && (
            <span className="ebook-reader__page-number">{page.pageNumber}</span>
          )}
        </div>
      );

    case 'chapter-start':
      return (
        <div className="ebook-reader__page-inner">
          <span className="ebook-page__chapter-number">
            {ebookUI.labels.chapter} {page.chapter}
          </span>
          <h2 className="ebook-page__title">{page.title}</h2>
          <p className="ebook-page__subtitle">{page.subtitle}</p>
          {page.pageNumber != null && (
            <span className="ebook-reader__page-number">{page.pageNumber}</span>
          )}
        </div>
      );

    case 'part-title':
      var ptPartNum = page.part || 1;
      var ptWordIdx = ptPartNum - 1;
      var ptWord = ebookUI.partWords[ptWordIdx] || ebookUI.partWords[0];
      return (
        <div className="ebook-reader__page-inner">
          <span className="ebook-page__part-label">
            {ebookUI.labels.part} {ptWord}
          </span>
          <h2 className="ebook-page__title">{page.title}</h2>
          {page.subtitle && (
            <p className="ebook-page__subtitle">{page.subtitle}</p>
          )}
          {page.pageNumber != null && (
            <span className="ebook-reader__page-number">{page.pageNumber}</span>
          )}
        </div>
      );

    case 'appendix-title':
      return (
        <div className="ebook-reader__page-inner">
          <span className="ebook-page__part-label">{ebookUI.labels.appendix}</span>
          <h2 className="ebook-page__title">{page.title}</h2>
          {page.subtitle && (
            <p className="ebook-page__subtitle">{page.subtitle}</p>
          )}
          {page.pageNumber != null && (
            <span className="ebook-reader__page-number">{page.pageNumber}</span>
          )}
        </div>
      );

    case 'chapter-content':
      return (
        <div className="ebook-reader__page-inner">
          {page.chapter != null && (
            <span className="ebook-page__chapter-heading">
              {ebookUI.labels.chapter} {page.chapter}
            </span>
          )}
          {page.paragraphs ? page.paragraphs.map(function (p, i) {
            return <p key={page.id + '-p-' + i} className="ebook-page__paragraph">{p}</p>;
          }) : null}
          {page.pageNumber != null && (
            <span className="ebook-reader__page-number">{page.pageNumber}</span>
          )}
        </div>
      );

    case 'about-author':
      return (
        <div className="ebook-reader__page-inner">
          <h2 className="ebook-page__section-title">{page.title}</h2>
          {page.paragraphs ? page.paragraphs.map(function (p, i) {
            return <p key={page.id + '-p-' + i} className="ebook-page__paragraph">{p}</p>;
          }) : null}
          {page.pageNumber != null && (
            <span className="ebook-reader__page-number">{page.pageNumber}</span>
          )}
        </div>
      );

    default:
      return <div className="ebook-reader__page-inner" />;
  }
}
