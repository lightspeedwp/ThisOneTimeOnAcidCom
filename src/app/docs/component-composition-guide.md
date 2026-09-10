---
title: "Component Composition Guide"
filename: "/docs/component-composition-guide.md"
created: "2026-03-11"
modified: "2026-03-11"
version: "1.0.0"
related: "/guidelines/overview-components.md, /docs/custom-hooks-guide.md"
---

# Component Composition Guide

**Project:** Ash Shaw Makeup Portfolio  
**Purpose:** Best practices for composing and structuring React components  
**Created:** March 11, 2026  
**Status:** Active

---

## Overview

Component composition is the art of building complex UIs from smaller, reusable pieces. This guide covers patterns, anti-patterns, and real-world examples from the Ash Shaw portfolio.

**Key Principles:**
- Single Responsibility Principle
- Composition over inheritance
- Props as configuration
- Extract when reusable or complex
- Keep components under 300 lines

---

## Table of Contents

1. [When to Split Components](#when-to-split-components)
2. [Composition Patterns](#composition-patterns)
3. [Component Hierarchy](#component-hierarchy)
4. [Real-World Examples](#real-world-examples)
5. [Anti-Patterns](#anti-patterns)
6. [Refactoring Strategies](#refactoring-strategies)

---

## When to Split Components

### Size Guidelines

| Lines of Code | Action |
|---------------|--------|
| 0-150 | ✅ Good size, no action needed |
| 150-300 | ⚠️ Consider splitting if logic is complex |
| 300-500 | 🔴 Should split into smaller components |
| 500+ | 🚨 Must split immediately |

### Complexity Signals

**Split when you see:**
- Multiple `useState` calls (5+) managing different concerns
- Deeply nested JSX (4+ levels)
- Multiple `useEffect` hooks for different purposes
- Copy-pasted code blocks
- Difficulty understanding component purpose at a glance

**Example from codebase:**

```typescript
// 🔴 BEFORE - 650 lines
export function StyleGuidePage() {
  // 100+ lines of state
  // 500+ lines of JSX
  // Multiple sections doing different things
}

// ✅ AFTER - Extracted sections
export function StyleGuidePage() {
  return (
    <div>
      <ColorsSection />
      <TypographySection />
      <ButtonsSection />
      <IconsSection />
    </div>
  );
}
```

---

## Composition Patterns

### Pattern 1: Container/Presentational

**When to use:** Separate data logic from presentation

**Container Component (Smart):**
```typescript
/**
 * VideosPage - Container component
 * Handles data fetching, filtering, and state management
 */
export function VideosPage() {
  const [videos, setVideos] = useState([]);
  const [activeCategories, setActiveCategories] = useState([]);
  const [sortBy, setSortBy] = useState('recent');

  const filteredVideos = useVideoFiltering({
    videos,
    activeCategories,
    sortBy,
    videoCategories,
  });

  return (
    <VideoArchiveLayout
      videos={filteredVideos}
      categories={videoCategories}
      activeCategories={activeCategories}
      onCategoryToggle={handleCategoryToggle}
      sortBy={sortBy}
      onSortChange={setSortBy}
    />
  );
}
```

**Presentational Component (Dumb):**
```typescript
/**
 * VideoArchiveLayout - Presentational component
 * Pure UI rendering with no business logic
 */
interface VideoArchiveLayoutProps {
  videos: Video[];
  categories: Category[];
  activeCategories: string[];
  onCategoryToggle: (slug: string) => void;
  sortBy: string;
  onSortChange: (sort: string) => void;
}

export function VideoArchiveLayout({
  videos,
  categories,
  activeCategories,
  onCategoryToggle,
  sortBy,
  onSortChange,
}: VideoArchiveLayoutProps) {
  return (
    <div className="video-archive">
      <ArchiveFilters
        categories={categories}
        activeCategories={activeCategories}
        onCategoryToggle={onCategoryToggle}
        sortBy={sortBy}
        onSortChange={onSortChange}
      />
      <VideoGrid videos={videos} />
    </div>
  );
}
```

**Benefits:**
- Easier to test (presentational components are pure)
- Easier to reuse UI components
- Clear separation of concerns

---

### Pattern 2: Compound Components

**When to use:** Related components that work together

**Example:** Accordion component

```typescript
/**
 * Accordion - Compound component pattern
 */
export function Accordion({ children }: { children: React.ReactNode }) {
  const [openIndexes, setOpenIndexes] = useState<number[]>([]);

  return (
    <div className="accordion">
      {React.Children.map(children, (child, index) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, {
            isOpen: openIndexes.includes(index),
            onToggle: () => {
              setOpenIndexes((prev) =>
                prev.includes(index)
                  ? prev.filter((i) => i !== index)
                  : [...prev, index]
              );
            },
          });
        }
        return child;
      })}
    </div>
  );
}

export function AccordionItem({
  title,
  children,
  isOpen,
  onToggle,
}: AccordionItemProps) {
  return (
    <div className="accordion__item">
      <button
        className="accordion__question"
        onClick={onToggle}
        aria-expanded={isOpen}
      >
        {title}
      </button>
      {isOpen && (
        <div className="accordion__answer">
          {children}
        </div>
      )}
    </div>
  );
}

// Usage
<Accordion>
  <AccordionItem title="Question 1">Answer 1</AccordionItem>
  <AccordionItem title="Question 2">Answer 2</AccordionItem>
</Accordion>
```

---

### Pattern 3: Render Props

**When to use:** Share code between components using a prop whose value is a function

**Example:** Data fetching with render props

```typescript
interface DataFetcherProps<T> {
  url: string;
  children: (data: T | null, loading: boolean, error: Error | null) => React.ReactNode;
}

export function DataFetcher<T>({ url, children }: DataFetcherProps<T>) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, [url]);

  return <>{children(data, loading, error)}</>;
}

// Usage
<DataFetcher<Video[]> url="/api/videos">
  {(videos, loading, error) => {
    if (loading) return <Spinner />;
    if (error) return <ErrorMessage error={error} />;
    return <VideoGrid videos={videos || []} />;
  }}
</DataFetcher>
```

---

### Pattern 4: Higher-Order Components (HOC)

**When to use:** Add shared behavior to multiple components

**Example:** WithAuth HOC

```typescript
/**
 * withAuth - HOC that adds authentication
 */
export function withAuth<P extends object>(
  Component: React.ComponentType<P>
) {
  return function AuthenticatedComponent(props: P) {
    const { isAuthenticated, user } = useAuth();

    if (!isAuthenticated) {
      return <LoginPrompt />;
    }

    return <Component {...props} user={user} />;
  };
}

// Usage
const ProtectedPage = withAuth(DashboardPage);
```

**Note:** Custom hooks are often preferred over HOCs in modern React.

---

### Pattern 5: Children as Props

**When to use:** Create flexible, reusable layouts

**Example:** Card component

```typescript
interface CardProps {
  header?: React.ReactNode;
  children: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
}

export function Card({ header, children, footer, className }: CardProps) {
  return (
    <div className={`card ${className || ''}`}>
      {header && <div className="card__header">{header}</div>}
      <div className="card__body">{children}</div>
      {footer && <div className="card__footer">{footer}</div>}
    </div>
  );
}

// Usage - Flexible composition
<Card
  header={<h3>Portfolio Entry</h3>}
  footer={<Button>View Details</Button>}
>
  <img src={image} alt={title} />
  <p>{description}</p>
</Card>
```

---

## Component Hierarchy

### Recommended Structure

```
App Component (Router)
├── Layout Components (Header, Footer)
├── Page Components (HomePage, AboutPage)
│   ├── Section Components (HeroSection, ContentSection)
│   │   ├── Block Components (PortfolioCard, BlogCard)
│   │   │   └── UI Components (Button, Image)
│   │   └── UI Components (Icon, Badge)
│   └── UI Components (Breadcrumbs, ScrollToTop)
└── Common Components (Modal, ErrorBoundary)
```

### Real Example from Codebase

```
App.tsx
├── Header
│   ├── Logo
│   ├── Navigation
│   │   ├── PortfolioMegaMenu
│   │   │   ├── PortfolioCard (featured)
│   │   │   └── CategoryList
│   │   └── MobileMenu
│   │       ├── NavigationLinks
│   │       └── SocialLinks
│   └── ThemeSwitcher
├── HomePage
│   ├── Hero
│   ├── FeaturedSection
│   │   └── PortfolioCard (grid)
│   └── BlogPreviewSection
│       └── BlogCard (grid)
└── Footer
    ├── SocialLinks
    └── FooterLinks
```

---

## Real-World Examples

### Example 1: EbookPage Refactoring

**Before:** Monolithic component (800+ lines)

```typescript
export function EbookPage() {
  // 15+ useState calls
  // Touch gesture handling
  // Keyboard navigation
  // Fullscreen logic
  // Page rendering
  // TOC rendering
  // Settings panel
  // Progress tracking
  // ... 700+ more lines
}
```

**After:** Composed from smaller pieces

```typescript
export function EbookPage() {
  const ebookState = useEbookState(0);
  useTouchGestures({
    onSwipeLeft: ebookState.nextPage,
    onSwipeRight: ebookState.prevPage,
  });
  useKeyboardNav({
    onNext: ebookState.nextPage,
    onPrev: ebookState.prevPage,
    onClose: ebookState.toggleToc,
  });
  const fullscreen = useFullscreen();

  return (
    <div className="ebook">
      <EbookHeader
        currentPage={ebookState.currentPage}
        totalPages={ebookState.totalPages}
        onToggleToc={ebookState.toggleToc}
        onToggleFullscreen={fullscreen.toggle}
      />
      <EbookContent
        page={ebookState.currentPage}
        content={ebookState.currentContent}
      />
      {ebookState.showToc && (
        <EbookToc
          chapters={ebookState.chapters}
          onNavigate={ebookState.setPage}
        />
      )}
    </div>
  );
}
```

**Benefits:**
- Each hook/component has single responsibility
- Easier to test individual pieces
- Reusable hooks (useTouchGestures, useKeyboardNav, useFullscreen)
- Main component is now readable (under 100 lines)

---

### Example 2: StickersPage Lightbox Extraction

**Before:** Inline lightbox (200+ lines in one file)

```typescript
export function StickersPage() {
  // State for stickers
  // State for lightbox
  // Lightbox JSX inline (200+ lines)
  // Stickers grid JSX
}
```

**After:** Extracted lightbox component

```typescript
// /components/ui/StickerLightbox.tsx
export function StickerLightbox({
  sticker,
  onClose,
  onPrev,
  onNext,
}: StickerLightboxProps) {
  useKeyboardNav({ onPrev, onNext, onClose });
  
  return (
    <div className="lightbox">
      {/* Lightbox UI */}
    </div>
  );
}

// /components/pages/StickersPage.tsx
export function StickersPage() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  return (
    <div>
      <StickerGrid onOpenLightbox={setLightboxIndex} />
      {lightboxIndex !== null && (
        <StickerLightbox
          sticker={stickers[lightboxIndex]}
          onClose={() => setLightboxIndex(null)}
          onPrev={handlePrev}
          onNext={handleNext}
        />
      )}
    </div>
  );
}
```

**Benefits:**
- Lightbox is now reusable
- StickersPage is more focused
- Easier to test lightbox separately

---

### Example 3: TaxonomyArchiveLayout (DRY)

**Before:** Duplicated code across 3 pages

```typescript
// VideoCategoryPage.tsx (300 lines)
export function VideoCategoryPage() {
  // Header
  // Breadcrumbs
  // Filters
  // Grid
  // FAQ
}

// VideoTagPage.tsx (300 lines) - 70% same code!
export function VideoTagPage() {
  // Header
  // Breadcrumbs
  // Filters
  // Grid
  // FAQ
}

// BlogCategoryPage.tsx (300 lines) - 70% same code!
```

**After:** Shared layout component

```typescript
// /components/pages/shared/TaxonomyArchiveLayout.tsx
export function TaxonomyArchiveLayout({
  breadcrumbs,
  header,
  filters,
  children,
  faqPageId,
}: TaxonomyArchiveLayoutProps) {
  return (
    <div className={mainClassName}>
      <Breadcrumbs items={breadcrumbs} />
      <div className={headerClassName}>{header}</div>
      {filters && <ArchiveFilters {...filters} />}
      <div className={contentClassName}>{children}</div>
      <FaqSection pageId={faqPageId} />
    </div>
  );
}

// Usage - VideoCategoryPage (now 100 lines)
export function VideoCategoryPage() {
  const filteredVideos = useVideoFiltering(/* ... */);

  return (
    <TaxonomyArchiveLayout
      breadcrumbs={videoCategoryBreadcrumbs(category)}
      header={<h1>{category.name} Videos</h1>}
      filters={{
        categories: videoCategories,
        activeCategories,
        onCategoryToggle: handleToggle,
      }}
      faqPageId="videos"
    >
      <VideoGrid videos={filteredVideos} />
    </TaxonomyArchiveLayout>
  );
}
```

**Benefits:**
- DRY (Don't Repeat Yourself)
- Consistent layout across pages
- Single place to update structure
- Reduced code by 400+ lines

---

## Anti-Patterns

### ❌ Anti-Pattern 1: Prop Drilling

**Problem:** Passing props through many levels

```typescript
// ❌ BAD
function App() {
  const [user, setUser] = useState(null);
  return <Layout user={user} setUser={setUser} />;
}

function Layout({ user, setUser }) {
  return <Header user={user} setUser={setUser} />;
}

function Header({ user, setUser }) {
  return <UserMenu user={user} setUser={setUser} />;
}

function UserMenu({ user, setUser }) {
  // Finally use the props 3 levels deep!
}
```

**Solution:** Use Context or state management

```typescript
// ✅ GOOD
const UserContext = React.createContext(null);

function App() {
  const [user, setUser] = useState(null);
  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Layout />
    </UserContext.Provider>
  );
}

function UserMenu() {
  const { user, setUser } = useContext(UserContext);
  // Direct access, no prop drilling!
}
```

---

### ❌ Anti-Pattern 2: God Components

**Problem:** Components that do everything

```typescript
// ❌ BAD - 1000+ line component
export function DashboardPage() {
  // Data fetching
  // Authentication
  // Form handling
  // Chart rendering
  // Table rendering
  // Modal logic
  // Navigation
  // ... 900+ more lines
}
```

**Solution:** Split into focused components

```typescript
// ✅ GOOD
export function DashboardPage() {
  return (
    <DashboardLayout>
      <DashboardHeader />
      <StatsCards />
      <ChartsSection />
      <DataTable />
    </DashboardLayout>
  );
}
```

---

### ❌ Anti-Pattern 3: Overusing Memoization

**Problem:** Premature optimization

```typescript
// ❌ BAD - Unnecessary memoization
function SimpleComponent({ name }) {
  const greeting = useMemo(() => `Hello, ${name}!`, [name]);
  const handleClick = useCallback(() => console.log(name), [name]);
  
  return <div onClick={handleClick}>{greeting}</div>;
}
```

**Solution:** Only memoize expensive computations

```typescript
// ✅ GOOD
function SimpleComponent({ name }) {
  const greeting = `Hello, ${name}!`; // No memo needed
  const handleClick = () => console.log(name); // No callback needed
  
  return <div onClick={handleClick}>{greeting}</div>;
}

// ✅ GOOD - Memoize expensive operations
function ExpensiveComponent({ data }) {
  const processedData = useMemo(() => {
    // Expensive filtering/sorting/mapping
    return data.filter(/* ... */).sort(/* ... */).map(/* ... */);
  }, [data]);
  
  return <DataTable data={processedData} />;
}
```

---

### ❌ Anti-Pattern 4: Inline Component Definitions

**Problem:** Defining components inside other components

```typescript
// ❌ BAD
function ParentComponent() {
  // This creates a NEW component on every render!
  function ChildComponent({ text }) {
    return <div>{text}</div>;
  }
  
  return <ChildComponent text="Hello" />;
}
```

**Solution:** Define components outside

```typescript
// ✅ GOOD
function ChildComponent({ text }) {
  return <div>{text}</div>;
}

function ParentComponent() {
  return <ChildComponent text="Hello" />;
}
```

---

## Refactoring Strategies

### Strategy 1: Extract Sections

**Identify repeating patterns:**

```typescript
// BEFORE
<section className="colors-section">
  <h2>Colors</h2>
  <div className="color-grid">
    {/* Color swatches */}
  </div>
</section>

<section className="typography-section">
  <h2>Typography</h2>
  <div className="type-list">
    {/* Typography samples */}
  </div>
</section>
```

**Extract to shared Section component:**

```typescript
// AFTER
function Section({ title, children, className }) {
  return (
    <section className={`style-guide-section ${className}`}>
      <h2 className="section-title">{title}</h2>
      <div className="section-content">{children}</div>
    </section>
  );
}

<Section title="Colors" className="colors-section">
  <ColorGrid />
</Section>

<Section title="Typography" className="typography-section">
  <TypeList />
</Section>
```

---

### Strategy 2: Extract Custom Hooks

**Move stateful logic to hooks:**

```typescript
// BEFORE - Logic in component
function SearchPage() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query) return;
    setLoading(true);
    fetch(`/api/search?q=${query}`)
      .then(res => res.json())
      .then(data => {
        setResults(data);
        setLoading(false);
      });
  }, [query]);

  return (/* JSX */);
}

// AFTER - Logic in hook
function useSearch(query) {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query) return;
    setLoading(true);
    fetch(`/api/search?q=${query}`)
      .then(res => res.json())
      .then(data => {
        setResults(data);
        setLoading(false);
      });
  }, [query]);

  return { results, loading };
}

function SearchPage() {
  const [query, setQuery] = useState('');
  const { results, loading } = useSearch(query);

  return (/* JSX */);
}
```

---

### Strategy 3: Use Compound Components

**Group related components:**

```typescript
// BEFORE - Separate unrelated components
<div className="modal">
  <ModalHeader title="Settings" onClose={close} />
  <ModalBody>Content</ModalBody>
  <ModalFooter>
    <Button onClick={save}>Save</Button>
  </ModalFooter>
</div>

// AFTER - Compound component
<Modal>
  <Modal.Header onClose={close}>Settings</Modal.Header>
  <Modal.Body>Content</Modal.Body>
  <Modal.Footer>
    <Button onClick={save}>Save</Button>
  </Modal.Footer>
</Modal>
```

---

## Composition Checklist

When composing components, ensure:

- [ ] Each component has single responsibility
- [ ] Components are under 300 lines
- [ ] Props interface is clear and typed
- [ ] No prop drilling (use context if needed)
- [ ] No inline component definitions
- [ ] Reusable logic extracted to hooks
- [ ] Repeated UI patterns extracted to components
- [ ] Clear component hierarchy
- [ ] Consistent naming conventions
- [ ] JSDoc documentation for complex components

---

## References

- [React Composition Documentation](https://react.dev/learn/passing-props-to-a-component)
- [Component Patterns](https://reactpatterns.com/)
- [Custom Hooks Guide](/docs/custom-hooks-guide.md)
- [Component Guidelines](/guidelines/overview-components.md)

---

**Document Status:** Active  
**Last Updated:** March 11, 2026  
**Maintained By:** Development Team
