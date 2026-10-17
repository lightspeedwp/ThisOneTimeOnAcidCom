/**
 * @fileoverview Journal Single Post Page
 * Displays individual journal/blog post with featured image and content
 */

import React from 'react';
import { useParams, useNavigate } from '../../../lib/router';
import { ArrowLeft } from '@phosphor-icons/react';
import { journalPosts } from '../../../data/mock/journal-posts';
import { setSEO } from '../../../utils/seo';

export function JournalSinglePage() {
  var params = useParams();
  var navigate = useNavigate();
  var slug = params.slug;

  // Find the post by slug
  var post = null;
  for (var i = 0; i < journalPosts.length; i++) {
    if (journalPosts[i].slug === slug) {
      post = journalPosts[i];
      break;
    }
  }

  React.useEffect(function() {
    if (post) {
      setSEO({
        title: post.title + ' | Nova News',
        description: post.excerpt,
        ogTitle: post.title,
        ogDescription: post.excerpt,
        ogImage: post.featuredImage,
        twitterCard: 'summary_large_image'
      });
    }
  }, [post]);

  function handleBackClick() {
    navigate('/journal');
  }

  // If post not found, show error
  if (!post) {
    return React.createElement(
      'main',
      { id: 'main-content', className: 'page-layout' },
      React.createElement(
        'section',
        { className: 'section' },
        React.createElement(
          'div',
          { className: 'section__container text-center' },
          React.createElement('h1', { className: 'heading-hero' }, 'Post not found'),
          React.createElement('p', { className: 'text-lead' }, 'This journal entry doesn\'t exist.'),
          React.createElement(
            'button',
            {
              onClick: handleBackClick,
              className: 'btn-back-funky btn-back-funky--lg'
            },
            React.createElement(ArrowLeft, { weight: 'bold', size: 24 }),
            'Back to Journal'
          )
        )
      )
    );
  }

  function getCategoryColor(category: string) {
    if (category === 'Essay') return 'card__category--pink';
    if (category === 'Video') return 'card__category--green';
    if (category === 'Podcast') return 'card__category--violet';
    if (category === 'Travel') return 'card__category--yellow';
    if (category === 'Field Notes') return 'card__category--pink';
    return 'card__category--yellow';
  }

  var categoryColor = getCategoryColor(post.category);

  return React.createElement(
    'main',
    { id: 'main-content', className: 'page-layout' },
    
    // Back button
    React.createElement(
      'section',
      { className: 'section', style: { paddingBottom: '0' } },
      React.createElement(
        'div',
        { className: 'section__container' },
        React.createElement(
          'button',
          {
            onClick: handleBackClick,
            className: 'btn-back-funky'
          },
          React.createElement(ArrowLeft, { weight: 'bold', size: 20 }),
          'Back to Journal'
        )
      )
    ),

    // Featured Image
    React.createElement(
      'section',
      { className: 'section', style: { paddingTop: '0' } },
      React.createElement(
        'div',
        { className: 'section__container' },
        React.createElement(
          'div',
          {
            style: {
              width: '100%',
              maxWidth: '1200px',
              height: '400px',
              margin: '0 auto',
              overflow: 'hidden',
              borderRadius: '12px',
              marginBottom: '32px'
            }
          },
          React.createElement('img', {
            src: post.featuredImage,
            alt: post.title,
            style: {
              width: '100%',
              height: '100%',
              objectFit: 'cover'
            }
          })
        )
      )
    ),

    // Post Header
    React.createElement(
      'section',
      { className: 'section', style: { paddingTop: '0' } },
      React.createElement(
        'div',
        { className: 'section__container section__container--narrow' },
        React.createElement(
          'div',
          { style: { marginBottom: '24px' } },
          React.createElement('span', { className: 'card__category ' + categoryColor }, post.category)
        ),
        React.createElement('h1', { className: 'heading-hero text-neon-pink' }, post.title),
        React.createElement(
          'p',
          { className: 'text-body', style: { color: 'var(--wp--preset--color--text-muted)', marginTop: '16px' } },
          'Published on ' + new Date(post.publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
        )
      )
    ),

    // Post Content
    React.createElement(
      'section',
      { className: 'section section--dark' },
      React.createElement(
        'div',
        { className: 'section__container section__container--narrow' },
        React.createElement(
          'div',
          { className: 'text-body', style: { fontSize: '1.125rem', lineHeight: '1.8' } },
          React.createElement('p', null, post.excerpt),
          React.createElement('p', { style: { marginTop: '24px' } }, 'This is the full content of the blog post. In a real implementation, this would be rich text content pulled from your CMS or markdown files.'),
          React.createElement('p', { style: { marginTop: '24px' } }, 'The journal entry would contain detailed stories, insights, photos, videos, or podcast embeds depending on the content type.'),
          React.createElement('h2', { className: 'heading-section', style: { marginTop: '48px', marginBottom: '24px' } }, 'Key takeaways'),
          React.createElement('p', null, 'This section would expand on the themes introduced in the excerpt, providing deeper insights and personal reflections from Ash Shaw.'),
          React.createElement('p', { style: { marginTop: '24px' } }, 'For video posts, there would be embedded YouTube or Vimeo players. For podcast episodes, audio players would be embedded here.')
        )
      )
    ),

    // Back to Journal CTA
    React.createElement(
      'section',
      { className: 'section' },
      React.createElement(
        'div',
        { className: 'section__container text-center' },
        React.createElement(
          'button',
          {
            onClick: handleBackClick,
            className: 'btn-back-funky btn-back-funky--lg'
          },
          React.createElement(ArrowLeft, { weight: 'bold', size: 28 }),
          'Back to Journal'
        )
      )
    )
  );
}