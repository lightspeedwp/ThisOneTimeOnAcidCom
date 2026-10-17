# 🎨 Dark Mode Component Composition Patterns

Real-world examples of combining the 54 dark mode components into complete interfaces.

**Last Updated:** March 11, 2026  
**Theme Version:** 2.0.0

---

## 📋 Table of Contents

1. [Dashboard Layout](#dashboard-layout)
2. [Blog Post Page](#blog-post-page)
3. [Portfolio Gallery](#portfolio-gallery)
4. [Landing Page](#landing-page)
5. [Settings Page](#settings-page)
6. [Authentication Flow](#authentication-flow)
7. [Content Management](#content-management)
8. [E-commerce Product Page](#e-commerce-product-page)
9. [User Profile](#user-profile)
10. [Event Detail Page](#event-detail-page)

---

## 🎯 Dashboard Layout

### Complete Admin Dashboard

Combines: **Sidebar + Header + Cards + Progress Bars + Stats + Charts**

```html
<!DOCTYPE html>
<html class="dark">
<head>
  <title>Admin Dashboard</title>
  <link rel="stylesheet" href="/styles/globals.css">
  <link rel="stylesheet" href="/styles/themes/dark.css">
  <link rel="stylesheet" href="/styles/themes/dark-extended.css">
</head>
<body>
  <!-- App Container -->
  <div class="app-container">
    
    <!-- Sidebar Navigation -->
    <aside class="sidebar">
      <div class="sidebar__header">
        <h2>Dashboard</h2>
      </div>
      
      <div class="sidebar__section">
        <a href="/dashboard" class="sidebar__link sidebar__link--active">
          <svg class="sidebar__icon"><!-- Home icon --></svg>
          Overview
        </a>
        <a href="/analytics" class="sidebar__link">
          <svg class="sidebar__icon"><!-- Chart icon --></svg>
          Analytics
        </a>
        <a href="/content" class="sidebar__link">
          <svg class="sidebar__icon"><!-- File icon --></svg>
          Content
        </a>
        <a href="/settings" class="sidebar__link">
          <svg class="sidebar__icon"><!-- Gear icon --></svg>
          Settings
        </a>
      </div>
    </aside>
    
    <!-- Main Content Area -->
    <main class="main-content">
      
      <!-- Header with Breadcrumbs -->
      <header class="header">
        <nav class="breadcrumbs">
          <a href="/" class="breadcrumbs__link">Home</a>
          <span class="breadcrumbs__separator">/</span>
          <span class="breadcrumbs__current">Dashboard</span>
        </nav>
        
        <div class="header__actions">
          <div class="search">
            <input 
              type="search" 
              class="search__input" 
              placeholder="Search..."
            />
            <button class="search__button">
              <svg><!-- Search icon --></svg>
            </button>
          </div>
          
          <button class="button button--primary">
            New Project
          </button>
        </div>
      </header>
      
      <!-- Stats Grid -->
      <div class="stats-grid">
        <div class="card">
          <h3 class="card__title">Total Users</h3>
          <p class="card__stat">12,458</p>
          <div class="progress">
            <div class="progress__bar progress__bar--success" style="width: 85%;"></div>
          </div>
          <p class="card__change">+15% from last month</p>
        </div>
        
        <div class="card">
          <h3 class="card__title">Revenue</h3>
          <p class="card__stat">$48,592</p>
          <div class="progress">
            <div class="progress__bar" style="width: 62%;"></div>
          </div>
          <p class="card__change">+8% from last month</p>
        </div>
        
        <div class="card">
          <h3 class="card__title">Active Projects</h3>
          <p class="card__stat">23</p>
          <div class="progress">
            <div class="progress__bar progress__bar--warning" style="width: 45%;"></div>
          </div>
          <p class="card__change">-3% from last month</p>
        </div>
        
        <div class="card">
          <h3 class="card__title">Conversion Rate</h3>
          <p class="card__stat">3.2%</p>
          <div class="progress">
            <div class="progress__bar progress__bar--error" style="width: 32%;"></div>
          </div>
          <p class="card__change">-12% from last month</p>
        </div>
      </div>
      
      <!-- Recent Activity -->
      <div class="card">
        <h3 class="card__title">Recent Activity</h3>
        
        <div class="timeline">
          <div class="timeline__item">
            <div class="timeline__marker"></div>
            <div class="timeline__content">
              <h4 class="timeline__title">New user registered</h4>
              <p class="timeline__date">2 minutes ago</p>
              <p>john.doe@example.com joined the platform</p>
            </div>
          </div>
          
          <div class="timeline__item">
            <div class="timeline__marker"></div>
            <div class="timeline__content">
              <h4 class="timeline__title">Project completed</h4>
              <p class="timeline__date">1 hour ago</p>
              <p>"Website Redesign" marked as complete</p>
            </div>
          </div>
          
          <div class="timeline__item">
            <div class="timeline__marker"></div>
            <div class="timeline__content">
              <h4 class="timeline__title">Payment received</h4>
              <p class="timeline__date">3 hours ago</p>
              <p>$1,250 payment from Client XYZ</p>
            </div>
          </div>
        </div>
      </div>
      
    </main>
    
  </div>
  
  <!-- Toast Notification -->
  <div class="toast toast--success">
    <p>✓ Dashboard data updated successfully!</p>
    <button class="toast__close">×</button>
  </div>
  
</body>
</html>
```

**CSS for Grid Layout:**

```css
/* Custom dashboard grid */
.app-container {
  display: grid;
  grid-template-columns: 280px 1fr;
  min-height: 100vh;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.card__stat {
  font-size: 2.5rem;
  font-weight: bold;
  color: var(--color-neon-pink);
  margin: 0.5rem 0;
}

.card__change {
  font-size: 0.875rem;
  color: var(--color-text-muted);
  margin-top: 0.5rem;
}

@media (max-width: 768px) {
  .app-container {
    grid-template-columns: 1fr;
  }
  
  .sidebar {
    display: none; /* Mobile menu toggle required */
  }
  
  .stats-grid {
    grid-template-columns: 1fr;
  }
}
```

---

## 📝 Blog Post Page

### Complete Article Layout

Combines: **Breadcrumbs + Typography + Author Bio + Comments + Share + Tags**

```html
<article class="blog-post">
  
  <!-- Breadcrumbs -->
  <nav class="breadcrumbs">
    <a href="/" class="breadcrumbs__link">Home</a>
    <span class="breadcrumbs__separator">/</span>
    <a href="/blog" class="breadcrumbs__link">Blog</a>
    <span class="breadcrumbs__separator">/</span>
    <span class="breadcrumbs__current">Article Title</span>
  </nav>
  
  <!-- Article Header -->
  <header class="blog-post__header">
    <h1>The complete guide to dark mode design</h1>
    <div class="blog-post__meta">
      <time datetime="2026-03-11">March 11, 2026</time>
      <span>•</span>
      <span>8 min read</span>
      <span>•</span>
      <span class="badge badge--primary">Design</span>
    </div>
  </header>
  
  <!-- Featured Image -->
  <figure>
    <img src="/featured-image.jpg" alt="Dark mode UI showcase" />
    <figcaption>Modern dark mode interface examples</figcaption>
  </figure>
  
  <!-- Article Content -->
  <div class="blog-post__content">
    <h2>Introduction</h2>
    <p>
      Dark mode has become an essential feature in modern web design...
    </p>
    
    <blockquote>
      "Dark mode isn't just a trend—it's a fundamental shift 
      in how we approach digital interfaces."
    </blockquote>
    
    <h3>Key principles</h3>
    <ul>
      <li>Reduce eye strain with proper contrast ratios</li>
      <li>Use neon accents sparingly for visual hierarchy</li>
      <li>Maintain WCAG AA compliance across all components</li>
      <li>Test with real users in low-light environments</li>
    </ul>
    
    <h3>Color palette selection</h3>
    <p>
      When choosing colors for dark mode, consider both aesthetics 
      and accessibility...
    </p>
    
    <pre><code>/* Example dark mode variables */
:root.dark {
  --bg-primary: #0F0F0F;
  --text-primary: #F6F2EB;
  --accent: #FF3AAE;
}</code></pre>
    
    <h2>Implementation tips</h2>
    <ol>
      <li>Start with a solid color foundation</li>
      <li>Define consistent spacing and typography</li>
      <li>Add neon effects strategically</li>
      <li>Test across multiple devices</li>
    </ol>
    
    <div class="alert alert--info">
      <strong>Pro tip:</strong> Always test your dark mode with 
      actual users to identify readability issues.
    </div>
  </div>
  
  <!-- Tags -->
  <div class="blog-post__tags">
    <div class="chip">
      <span>Design System</span>
    </div>
    <div class="chip">
      <span>Dark Mode</span>
    </div>
    <div class="chip">
      <span>Accessibility</span>
    </div>
    <div class="chip">
      <span>UI/UX</span>
    </div>
  </div>
  
  <!-- Share Component -->
  <div class="blog-post__share">
    <h3>Share this article</h3>
    <div class="social-buttons">
      <button class="social-button social-button--twitter">
        <svg><!-- Twitter icon --></svg>
        Twitter
      </button>
      <button class="social-button social-button--facebook">
        <svg><!-- Facebook icon --></svg>
        Facebook
      </button>
      <button class="social-button">
        <svg><!-- Link icon --></svg>
        Copy Link
      </button>
    </div>
  </div>
  
  <!-- Author Bio -->
  <div class="author-bio">
    <img 
      src="/author-avatar.jpg" 
      alt="Ash Shaw" 
      class="author-bio__avatar"
    />
    <div class="author-bio__content">
      <h3 class="author-bio__name">Ash Shaw</h3>
      <p class="author-bio__title">UV Makeup Artist & Web Developer</p>
      <p class="author-bio__description">
        Cape Town-based artist specializing in neon UV makeup 
        and progressive web applications. Living between festivals, 
        code, and creativity.
      </p>
      <a href="/about" class="author-bio__link">
        Read more about Ash →
      </a>
    </div>
  </div>
  
  <!-- Comments Section -->
  <div class="comments">
    <h3>Comments (3)</h3>
    
    <div class="comment">
      <div class="comment__header">
        <img src="/avatar1.jpg" alt="User" class="comment__avatar" />
        <div>
          <p class="comment__author">Jane Doe</p>
          <p class="comment__date">2 hours ago</p>
        </div>
      </div>
      <div class="comment__body">
        <p>
          Excellent guide! The neon color examples are particularly helpful.
        </p>
      </div>
      <button class="comment__reply">Reply</button>
    </div>
    
    <!-- Nested Reply -->
    <div class="comment comment--reply">
      <div class="comment__header">
        <img src="/avatar-ash.jpg" alt="Ash" class="comment__avatar" />
        <div>
          <p class="comment__author">Ash Shaw</p>
          <p class="comment__date">1 hour ago</p>
        </div>
      </div>
      <div class="comment__body">
        <p>
          Thanks Jane! Glad you found it useful. Let me know if you 
          need help implementing it.
        </p>
      </div>
    </div>
    
    <div class="comment">
      <div class="comment__header">
        <img src="/avatar2.jpg" alt="User" class="comment__avatar" />
        <div>
          <p class="comment__author">John Smith</p>
          <p class="comment__date">5 hours ago</p>
        </div>
      </div>
      <div class="comment__body">
        <p>
          The accessibility section is spot on. More designers need 
          to prioritize contrast ratios.
        </p>
      </div>
      <button class="comment__reply">Reply</button>
    </div>
    
  </div>
  
</article>
```

---

## 🖼️ Portfolio Gallery

### Filterable Image Gallery with Lightbox

Combines: **Filters + Gallery + Lightbox + Pagination + Empty State**

```html
<div class="portfolio-page">
  
  <!-- Page Header -->
  <header class="portfolio-page__header">
    <h1>UV Makeup Portfolio</h1>
    <p>
      Neon creations from festivals around the world
    </p>
  </header>
  
  <!-- Filter Pills -->
  <div class="filter-list">
    <button class="filter filter--active">All (42)</button>
    <button class="filter">Festivals (28)</button>
    <button class="filter">Berlin Clubs (8)</button>
    <button class="filter">Editorial (6)</button>
  </div>
  
  <!-- Gallery Grid -->
  <div class="gallery">
    <div class="gallery__item">
      <img src="/portfolio/img1.jpg" alt="UV makeup at Origin Festival" />
      <div class="gallery__overlay">
        <h3>Origin Festival 2026</h3>
        <p>Full-face neon mandala design</p>
      </div>
    </div>
    
    <div class="gallery__item">
      <img src="/portfolio/img2.jpg" alt="Berlin warehouse party" />
      <div class="gallery__overlay">
        <h3>Berghain UV Night</h3>
        <p>Geometric face patterns</p>
      </div>
    </div>
    
    <div class="gallery__item">
      <img src="/portfolio/img3.jpg" alt="Editorial shoot" />
      <div class="gallery__overlay">
        <h3>Neon Architecture Series</h3>
        <p>Experimental editorial concept</p>
      </div>
    </div>
    
    <!-- More items... -->
  </div>
  
  <!-- Pagination -->
  <nav class="pagination">
    <button class="pagination__link pagination__link--disabled" disabled>
      ← Previous
    </button>
    <button class="pagination__link pagination__link--active">1</button>
    <button class="pagination__link">2</button>
    <button class="pagination__link">3</button>
    <button class="pagination__link">
      Next →
    </button>
  </nav>
  
  <!-- Lightbox (hidden by default) -->
  <div class="lightbox" style="display: none;">
    <img 
      src="/portfolio/img1-full.jpg" 
      alt="Full size image" 
      class="lightbox__image"
    />
    
    <p class="lightbox__caption">
      Origin Festival 2026 — Full-face neon mandala design
    </p>
    
    <button class="lightbox__close" aria-label="Close lightbox">×</button>
    <button class="lightbox__nav lightbox__nav--prev" aria-label="Previous">‹</button>
    <button class="lightbox__nav lightbox__nav--next" aria-label="Next">›</button>
  </div>
  
</div>
```

**Custom Gallery CSS:**

```css
.gallery {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  margin: 2rem 0;
}

.gallery__item {
  position: relative;
  overflow: hidden;
  border-radius: 8px;
  cursor: pointer;
}

.gallery__overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(
    180deg, 
    transparent 0%, 
    rgba(15, 15, 15, 0.95) 100%
  );
  padding: 1.5rem;
  transform: translateY(100%);
  transition: transform 0.3s ease;
}

.gallery__item:hover .gallery__overlay {
  transform: translateY(0);
}

.gallery__overlay h3 {
  color: #FF3AAE;
  margin: 0 0 0.5rem 0;
}

.gallery__overlay p {
  color: #CFC7BB;
  margin: 0;
  font-size: 0.875rem;
}
```

---

## 🎯 Landing Page

### Hero Section with CTA and Features

Combines: **Hero + CTA + Cards + Testimonials + Newsletter**

```html
<div class="landing-page">
  
  <!-- Hero Section -->
  <section class="hero">
    <div class="hero__content">
      <h1 class="hero__title">
        Neon makeup meets <span class="text-gradient">digital art</span>
      </h1>
      <p class="hero__description">
        UV makeup artistry for festivals, clubs, and editorial projects. 
        Based in Cape Town, creating worldwide.
      </p>
      
      <div class="button-group">
        <button class="button button--primary">
          View Portfolio
        </button>
        <button class="button button--secondary">
          Learn More
        </button>
      </div>
    </div>
    
    <div class="hero__image">
      <img src="/hero-uv-makeup.jpg" alt="Neon UV makeup showcase" />
    </div>
  </section>
  
  <!-- Stats Bar -->
  <section class="stats-bar">
    <div class="stat">
      <p class="stat__number">500+</p>
      <p class="stat__label">Festivals</p>
    </div>
    <div class="stat">
      <p class="stat__number">15</p>
      <p class="stat__label">Countries</p>
    </div>
    <div class="stat">
      <p class="stat__number">10K+</p>
      <p class="stat__label">Faces Painted</p>
    </div>
    <div class="stat">
      <p class="stat__number">7</p>
      <p class="stat__label">Years Experience</p>
    </div>
  </section>
  
  <!-- Features Grid -->
  <section class="features">
    <h2>What I offer</h2>
    
    <div class="features__grid">
      <div class="card">
        <svg class="card__icon"><!-- Festival icon --></svg>
        <h3 class="card__title">Festival makeup</h3>
        <p class="card__description">
          UV reactive designs that glow under blacklight. 
          Perfect for psytrance festivals and raves.
        </p>
      </div>
      
      <div class="card">
        <svg class="card__icon"><!-- Club icon --></svg>
        <h3 class="card__title">Berlin club scene</h3>
        <p class="card__description">
          Geometric patterns and bold neon looks for 
          warehouse parties and techno clubs.
        </p>
      </div>
      
      <div class="card">
        <svg class="card__icon"><!-- Camera icon --></svg>
        <h3 class="card__title">Editorial projects</h3>
        <p class="card__description">
          Experimental concepts pushing the boundaries 
          of neon makeup artistry.
        </p>
      </div>
    </div>
  </section>
  
  <!-- Testimonials -->
  <section class="testimonials">
    <h2>What people say</h2>
    
    <div class="testimonials__grid">
      <div class="testimonial">
        <div class="rating">
          <span class="rating__star rating__star--filled">★</span>
          <span class="rating__star rating__star--filled">★</span>
          <span class="rating__star rating__star--filled">★</span>
          <span class="rating__star rating__star--filled">★</span>
          <span class="rating__star rating__star--filled">★</span>
        </div>
        
        <blockquote class="testimonial__quote">
          "Ash's UV makeup took my festival experience to 
          another level. The designs are absolutely stunning!"
        </blockquote>
        
        <div class="testimonial__author">
          <img src="/avatar1.jpg" class="testimonial__avatar" alt="Sarah" />
          <div>
            <p class="testimonial__author">Sarah K.</p>
            <p class="testimonial__role">Origin Festival 2026</p>
          </div>
        </div>
      </div>
      
      <div class="testimonial">
        <div class="rating">
          <span class="rating__star rating__star--filled">★</span>
          <span class="rating__star rating__star--filled">★</span>
          <span class="rating__star rating__star--filled">★</span>
          <span class="rating__star rating__star--filled">★</span>
          <span class="rating__star rating__star--filled">★</span>
        </div>
        
        <blockquote class="testimonial__quote">
          "Professional, creative, and the results speak 
          for themselves. Highly recommend!"
        </blockquote>
        
        <div class="testimonial__author">
          <img src="/avatar2.jpg" class="testimonial__avatar" alt="Marcus" />
          <div>
            <p class="testimonial__author">Marcus T.</p>
            <p class="testimonial__role">Berghain UV Night</p>
          </div>
        </div>
      </div>
      
      <div class="testimonial">
        <div class="rating">
          <span class="rating__star rating__star--filled">★</span>
          <span class="rating__star rating__star--filled">★</span>
          <span class="rating__star rating__star--filled">★</span>
          <span class="rating__star rating__star--filled">★</span>
          <span class="rating__star rating__star--filled">★</span>
        </div>
        
        <blockquote class="testimonial__quote">
          "The attention to detail is incredible. Every design 
          tells a story."
        </blockquote>
        
        <div class="testimonial__author">
          <img src="/avatar3.jpg" class="testimonial__avatar" alt="Luna" />
          <div>
            <p class="testimonial__author">Luna M.</p>
            <p class="testimonial__role">Solipse Festival</p>
          </div>
        </div>
      </div>
    </div>
  </section>
  
  <!-- CTA Section -->
  <section class="cta">
    <h2 class="cta__title">Ready for your neon transformation?</h2>
    <p class="cta__description">
      Book me for your next festival, event, or editorial project.
    </p>
    
    <button class="button button--primary button--large">
      Get in Touch
    </button>
  </section>
  
  <!-- Newsletter Signup -->
  <section class="newsletter">
    <h3 class="newsletter__title">Stay in the loop</h3>
    <p class="newsletter__description">
      Get updates on festivals, new designs, and UV makeup tips.
    </p>
    
    <form class="newsletter__form">
      <input 
        type="email" 
        class="newsletter__input" 
        placeholder="your@email.com"
        required
      />
      <button type="submit" class="button button--primary">
        Subscribe
      </button>
    </form>
  </section>
  
</div>
```

---

## ⚙️ Settings Page

### User Settings with Tabs and Forms

Combines: **Tabs + Forms + Switches + Alerts + Buttons**

```html
<div class="settings-page">
  
  <h1>Account Settings</h1>
  
  <!-- Tabs -->
  <div class="tabs">
    <div class="tabs__list">
      <button class="tabs__button tabs__button--active">
        Profile
      </button>
      <button class="tabs__button">
        Preferences
      </button>
      <button class="tabs__button">
        Notifications
      </button>
      <button class="tabs__button">
        Security
      </button>
    </div>
    
    <!-- Profile Tab Panel -->
    <div class="tabs__panel">
      
      <div class="alert alert--info">
        <strong>Note:</strong> Changes to your profile are saved automatically.
      </div>
      
      <form class="form">
        <div class="form__group">
          <label class="form__label" for="name">Full Name</label>
          <input 
            type="text" 
            id="name" 
            class="form__input" 
            value="Ash Shaw"
          />
        </div>
        
        <div class="form__group">
          <label class="form__label" for="email">Email Address</label>
          <input 
            type="email" 
            id="email" 
            class="form__input" 
            value="ash@example.com"
          />
        </div>
        
        <div class="form__group">
          <label class="form__label" for="bio">Bio</label>
          <textarea 
            id="bio" 
            class="form__textarea" 
            rows="4"
          >UV makeup artist based in Cape Town...</textarea>
        </div>
        
        <div class="form__group">
          <label class="form__label" for="location">Location</label>
          <select id="location" class="form__select">
            <option>Cape Town, South Africa</option>
            <option>Berlin, Germany</option>
            <option>Koh Phangan, Thailand</option>
          </select>
        </div>
        
        <div class="form__group">
          <label class="form__label">Profile Visibility</label>
          <div class="form__radio-group">
            <label class="form__radio">
              <input type="radio" name="visibility" value="public" checked />
              <span>Public</span>
            </label>
            <label class="form__radio">
              <input type="radio" name="visibility" value="private" />
              <span>Private</span>
            </label>
            <label class="form__radio">
              <input type="radio" name="visibility" value="friends" />
              <span>Friends Only</span>
            </label>
          </div>
        </div>
        
        <div class="button-group">
          <button type="submit" class="button button--primary">
            Save Changes
          </button>
          <button type="button" class="button button--secondary">
            Cancel
          </button>
        </div>
      </form>
      
    </div>
  </div>
  
  <!-- Preferences Panel (hidden) -->
  <div class="tabs__panel" style="display: none;">
    
    <h3>Display Preferences</h3>
    
    <div class="preference-item">
      <div class="preference-item__content">
        <h4>Dark Mode</h4>
        <p>Use dark theme across the application</p>
      </div>
      <label class="switch">
        <input type="checkbox" checked />
        <span class="switch__slider"></span>
      </label>
    </div>
    
    <div class="preference-item">
      <div class="preference-item__content">
        <h4>Neon Effects</h4>
        <p>Enable glow and animation effects</p>
      </div>
      <label class="switch">
        <input type="checkbox" checked />
        <span class="switch__slider"></span>
      </label>
    </div>
    
    <div class="preference-item">
      <div class="preference-item__content">
        <h4>Reduce Motion</h4>
        <p>Minimize animations for accessibility</p>
      </div>
      <label class="switch">
        <input type="checkbox" />
        <span class="switch__slider"></span>
      </label>
    </div>
    
    <div class="preference-item">
      <div class="preference-item__content">
        <h4>Auto-play Videos</h4>
        <p>Automatically play videos when visible</p>
      </div>
      <label class="switch">
        <input type="checkbox" checked />
        <span class="switch__slider"></span>
      </label>
    </div>
    
  </div>
  
</div>
```

**Custom Settings CSS:**

```css
.preference-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 0;
  border-bottom: 1px solid #333333;
}

.preference-item:last-child {
  border-bottom: none;
}

.preference-item__content h4 {
  color: #FFFFFF;
  margin: 0 0 0.25rem 0;
}

.preference-item__content p {
  color: #CFC7BB;
  margin: 0;
  font-size: 0.875rem;
}
```

---

## 🔐 Authentication Flow

### Login and Registration Forms

Combines: **Forms + Alerts + Buttons + Loading Spinners + Validation**

```html
<!-- Login Modal -->
<div class="modal">
  <div class="modal__backdrop"></div>
  
  <div class="modal__content">
    <button class="modal__close" aria-label="Close">×</button>
    
    <h2>Welcome Back</h2>
    <p>Sign in to your account to continue</p>
    
    <!-- Success Alert (hidden initially) -->
    <div class="alert alert--success" style="display: none;">
      <strong>Success!</strong> You're now logged in.
    </div>
    
    <!-- Error Alert (shown on failed login) -->
    <div class="alert alert--error" style="display: none;">
      <strong>Error:</strong> Invalid email or password.
    </div>
    
    <form class="form">
      <div class="form__group">
        <label class="form__label" for="login-email">
          Email Address
        </label>
        <input 
          type="email" 
          id="login-email" 
          class="form__input" 
          placeholder="you@example.com"
          required
        />
      </div>
      
      <div class="form__group">
        <label class="form__label" for="login-password">
          Password
        </label>
        <input 
          type="password" 
          id="login-password" 
          class="form__input" 
          placeholder="••••••••"
          required
        />
      </div>
      
      <div class="form__group">
        <label class="form__checkbox">
          <input type="checkbox" />
          <span>Remember me</span>
        </label>
      </div>
      
      <button type="submit" class="button button--primary button--full-width">
        <span class="button__text">Sign In</span>
        <!-- Loading spinner (hidden initially) -->
        <span class="spinner spinner--neon" style="display: none;"></span>
      </button>
      
      <div class="form__footer">
        <a href="/forgot-password" class="form__link">
          Forgot password?
        </a>
        <span>•</span>
        <a href="/register" class="form__link">
          Create account
        </a>
      </div>
    </form>
    
    <div class="divider">
      <span>or continue with</span>
    </div>
    
    <div class="social-login">
      <button class="button button--outline">
        <svg><!-- Google icon --></svg>
        Google
      </button>
      <button class="button button--outline">
        <svg><!-- GitHub icon --></svg>
        GitHub
      </button>
    </div>
    
  </div>
</div>
```

**Custom Form Styles:**

```css
.button--full-width {
  width: 100%;
  justify-content: center;
}

.button__text {
  display: inline-block;
}

.form__footer {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  margin-top: 1rem;
  font-size: 0.875rem;
}

.form__link {
  color: #FF3AAE;
  text-decoration: none;
}

.form__link:hover {
  color: #F4FF3C;
}

.divider {
  position: relative;
  text-align: center;
  margin: 2rem 0;
}

.divider::before,
.divider::after {
  content: "";
  position: absolute;
  top: 50%;
  width: 40%;
  height: 1px;
  background-color: #333333;
}

.divider::before {
  left: 0;
}

.divider::after {
  right: 0;
}

.divider span {
  background-color: #1A1A1A;
  padding: 0 1rem;
  color: #CFC7BB;
  font-size: 0.875rem;
}

.social-login {
  display: flex;
  gap: 1rem;
}

.social-login .button {
  flex: 1;
}
```

---

## 📂 Content Management

### File Manager Interface

Combines: **Breadcrumbs + Dropdowns + Empty State + Chips + Status Indicators**

```html
<div class="file-manager">
  
  <!-- Toolbar -->
  <div class="toolbar">
    <nav class="breadcrumbs">
      <a href="/" class="breadcrumbs__link">My Files</a>
      <span class="breadcrumbs__separator">/</span>
      <a href="/projects" class="breadcrumbs__link">Projects</a>
      <span class="breadcrumbs__separator">/</span>
      <span class="breadcrumbs__current">Portfolio 2026</span>
    </nav>
    
    <div class="toolbar__actions">
      <button class="button button--secondary">
        <svg><!-- Upload icon --></svg>
        Upload
      </button>
      <button class="button button--primary">
        <svg><!-- Folder icon --></svg>
        New Folder
      </button>
    </div>
  </div>
  
  <!-- File Grid -->
  <div class="file-grid">
    
    <!-- Folder Item -->
    <div class="file-item file-item--folder">
      <svg class="file-item__icon"><!-- Folder icon --></svg>
      <h4 class="file-item__name">UV Makeup</h4>
      <p class="file-item__meta">24 files • 156 MB</p>
      
      <div class="dropdown">
        <button class="dropdown__trigger">⋮</button>
        <div class="dropdown__menu">
          <button class="dropdown__item">Open</button>
          <button class="dropdown__item">Rename</button>
          <button class="dropdown__item">Share</button>
          <div class="dropdown__divider"></div>
          <button class="dropdown__item dropdown__item--danger">Delete</button>
        </div>
      </div>
    </div>
    
    <!-- Image File Item -->
    <div class="file-item file-item--image">
      <img src="/thumbnail.jpg" alt="Thumbnail" class="file-item__preview" />
      <h4 class="file-item__name">origin-festival-2026.jpg</h4>
      <p class="file-item__meta">2.4 MB • JPG</p>
      
      <span class="status status--online" title="Synced"></span>
    </div>
    
    <!-- Processing File -->
    <div class="file-item file-item--processing">
      <svg class="file-item__icon"><!-- Video icon --></svg>
      <h4 class="file-item__name">festival-highlight.mp4</h4>
      <p class="file-item__meta">Processing...</p>
      
      <div class="progress">
        <div class="progress__bar" style="width: 65%;"></div>
      </div>
    </div>
    
    <!-- More files... -->
  </div>
  
  <!-- Empty State (shown when folder is empty) -->
  <div class="empty-state" style="display: none;">
    <svg class="empty-state__icon">
      <!-- Empty folder icon -->
    </svg>
    <h3 class="empty-state__title">This folder is empty</h3>
    <p class="empty-state__description">
      Upload files or create new folders to get started.
    </p>
    <button class="button button--primary">
      Upload Files
    </button>
  </div>
  
</div>
```

---

## 🎪 Event Detail Page

### Festival Event Page

Combines: **Hero + Timeline + Pricing + FAQ + CTA**

```html
<article class="event-detail">
  
  <!-- Event Hero -->
  <header class="event-hero">
    <div class="event-hero__image">
      <img src="/origin-festival.jpg" alt="Origin Festival" />
    </div>
    
    <div class="event-hero__content">
      <div class="badge badge--primary">Music Festival</div>
      <h1>Origin Festival 2026</h1>
      <p class="event-hero__tagline">
        South Africa's premier psytrance gathering
      </p>
      
      <div class="event-hero__meta">
        <div class="event-meta__item">
          <svg><!-- Calendar icon --></svg>
          <span>December 28 - January 1</span>
        </div>
        <div class="event-meta__item">
          <svg><!-- Location icon --></svg>
          <span>Cederberg, South Africa</span>
        </div>
        <div class="event-meta__item">
          <svg><!-- Users icon --></svg>
          <span>5,000+ attendees</span>
        </div>
      </div>
      
      <div class="button-group">
        <button class="button button--primary">
          Get Tickets
        </button>
        <button class="button button--secondary">
          Save Event
        </button>
      </div>
    </div>
  </header>
  
  <!-- Event Description -->
  <section class="event-section">
    <h2>About the festival</h2>
    <p>
      Origin Festival brings together the global psytrance community 
      for five days of music, art, and transformation in the stunning 
      Cederberg mountains...
    </p>
  </section>
  
  <!-- Timeline -->
  <section class="event-section">
    <h2>Schedule</h2>
    
    <div class="timeline">
      <div class="timeline__item">
        <div class="timeline__marker"></div>
        <div class="timeline__content">
          <h4 class="timeline__title">Day 1: Opening Ceremony</h4>
          <p class="timeline__date">December 28, 2026</p>
          <p>Gates open at 12:00 PM. Opening ritual at sunset.</p>
        </div>
      </div>
      
      <div class="timeline__item">
        <div class="timeline__marker"></div>
        <div class="timeline__content">
          <h4 class="timeline__title">Day 2-3: Main Stages</h4>
          <p class="timeline__date">December 29-30, 2026</p>
          <p>Three stages running 24/7 with international DJs.</p>
        </div>
      </div>
      
      <div class="timeline__item">
        <div class="timeline__marker"></div>
        <div class="timeline__content">
          <h4 class="timeline__title">Day 4: New Year's Eve</h4>
          <p class="timeline__date">December 31, 2026</p>
          <p>Midnight celebration with synchronized visuals.</p>
        </div>
      </div>
      
      <div class="timeline__item">
        <div class="timeline__marker"></div>
        <div class="timeline__content">
          <h4 class="timeline__title">Day 5: Closing Ceremony</h4>
          <p class="timeline__date">January 1, 2027</p>
          <p>Sunrise ceremony and final sets until noon.</p>
        </div>
      </div>
    </div>
  </section>
  
  <!-- Pricing -->
  <section class="event-section">
    <h2>Tickets</h2>
    
    <div class="pricing-grid">
      <div class="pricing-card">
        <div class="pricing-card__header">
          <h3>Early Bird</h3>
          <p class="pricing-card__price">R2,500</p>
        </div>
        <ul class="pricing-card__features">
          <li class="pricing-card__feature">5-day festival pass</li>
          <li class="pricing-card__feature">Camping included</li>
          <li class="pricing-card__feature pricing-card__feature--disabled">
            VIP area access
          </li>
          <li class="pricing-card__feature pricing-card__feature--disabled">
            Backstage pass
          </li>
        </ul>
        <button class="button button--secondary button--full-width">
          Sold Out
        </button>
      </div>
      
      <div class="pricing-card pricing-card--featured">
        <div class="pricing-card__header">
          <h3>General Admission</h3>
          <p class="pricing-card__price">R3,200</p>
        </div>
        <ul class="pricing-card__features">
          <li class="pricing-card__feature">5-day festival pass</li>
          <li class="pricing-card__feature">Camping included</li>
          <li class="pricing-card__feature pricing-card__feature--disabled">
            VIP area access
          </li>
          <li class="pricing-card__feature pricing-card__feature--disabled">
            Backstage pass
          </li>
        </ul>
        <button class="button button--primary button--full-width">
          Buy Now
        </button>
      </div>
      
      <div class="pricing-card">
        <div class="pricing-card__header">
          <h3>VIP Pass</h3>
          <p class="pricing-card__price">R5,500</p>
        </div>
        <ul class="pricing-card__features">
          <li class="pricing-card__feature">5-day festival pass</li>
          <li class="pricing-card__feature">Camping included</li>
          <li class="pricing-card__feature">VIP area access</li>
          <li class="pricing-card__feature">Backstage pass</li>
        </ul>
        <button class="button button--primary button--full-width">
          Buy Now
        </button>
      </div>
    </div>
  </section>
  
  <!-- FAQ Accordion -->
  <section class="event-section">
    <h2>Frequently Asked Questions</h2>
    
    <div class="accordion">
      <div class="accordion__item">
        <button class="accordion__header accordion__header--active">
          <span>What's included in the ticket price?</span>
          <svg class="accordion__icon"><!-- Chevron --></svg>
        </button>
        <div class="accordion__content">
          <p>
            Your ticket includes 5 days of music across 3 stages, 
            camping space, access to all workshops and healing areas, 
            and 24/7 security.
          </p>
        </div>
      </div>
      
      <div class="accordion__item">
        <button class="accordion__header">
          <span>Can I bring my own food and drinks?</span>
          <svg class="accordion__icon"><!-- Chevron --></svg>
        </button>
        <div class="accordion__content">
          <p>
            Yes! You're welcome to bring your own food and non-alcoholic 
            beverages. There are also food vendors on site.
          </p>
        </div>
      </div>
      
      <div class="accordion__item">
        <button class="accordion__header">
          <span>Is there cell phone reception at the venue?</span>
          <svg class="accordion__icon"><!-- Chevron --></svg>
        </button>
        <div class="accordion__content">
          <p>
            Reception is limited. We recommend downloading offline maps 
            and coordinating meeting points with your crew.
          </p>
        </div>
      </div>
    </div>
  </section>
  
  <!-- CTA Section -->
  <section class="cta">
    <h2 class="cta__title">Ready to experience Origin?</h2>
    <p class="cta__description">
      Join 5,000+ festival-goers for South Africa's most transformative 
      psytrance gathering.
    </p>
    
    <button class="button button--primary button--large">
      Get Your Ticket Now
    </button>
  </section>
  
</article>
```

---

## 🎨 Pro Tips: Component Composition

### Best Practices

1. **Layer Semantically**
   ```html
   <article> <!-- Semantic container -->
     <header> <!-- Logical grouping -->
       <nav> <!-- Navigation context -->
         <div class="breadcrumbs"> <!-- BEM component -->
   ```

2. **Progressive Enhancement**
   - Start with HTML structure
   - Add BEM classes
   - Style with dark theme CSS
   - Enhance with JavaScript

3. **Accessibility First**
   - Always include ARIA labels
   - Maintain focus indicators
   - Test keyboard navigation
   - Verify screen reader compatibility

4. **Responsive Patterns**
   - Mobile-first approach
   - Use CSS Grid for complex layouts
   - Flexbox for simple alignments
   - Test across breakpoints

5. **Performance**
   - Lazy load images in galleries
   - Defer non-critical JavaScript
   - Minimize DOM depth
   - Use CSS transforms for animations

---

## 🚀 Next Steps

1. **Copy these patterns** into your project
2. **Customize colors** using the neon palette
3. **Test thoroughly** across devices
4. **Add interactivity** with JavaScript
5. **Monitor accessibility** with browser tools

---

**Full Component Reference:** `/docs/dark-mode-component-showcase.md`  
**Theme Documentation:** `/reports/theme-styling-audit/dark-mode-final-completion-report.md`  
**Usage Guide:** `/docs/dark-mode-usage-guide.md`

---

**Last Updated:** March 11, 2026  
**Version:** 2.0.0  
**Components:** 54 fully styled
