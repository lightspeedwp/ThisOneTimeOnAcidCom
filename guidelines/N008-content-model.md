# N008: Content Model & Structure

**Purpose:** Data structure for posts, pages, collections, and the content organization model.

**Authority:** D4 (N-Document Approvals)

---

## Entity Model

### Post
- Title, slug, excerpt, body
- Author, published date, updated date
- Category, tags
- Featured image
- Status (Draft/Published/Archived)

### Page
- Title, slug, body
- Navigation position
- Status (Visible/Hidden)

### Collection
- Title, slug, description
- Associated posts (many-to-many)
- Featured image
- Category

### Author
- Name, bio, avatar
- Contact info
- Social links

---

## Content Types

| Type | Purpose | Fields | Publish? |
| ------ | --------- | -------- | ---------- |
| **Blog Post** | Article/story | Title, Body, Tags | Yes |
| **Page** | Static content | Title, Body | Yes |
| **Journal Entry** | Personal reflection | Title, Body, Date | Yes |
| **Guide** | How-to/reference | Title, Sections, TOC | Yes |

---

## Database Schema (Prisma)

```prisma
model Post {
  id String @id @default(cuid())
  title String
  slug String @unique
  excerpt String?
  body String
  author Author @relation(fields: [authorId], references: [id])
  authorId String
  status Status @default(DRAFT)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  publishedAt DateTime?
  image PostImage?
  tags Tag[]
}

model Author {
  id String @id @default(cuid())
  name String
  bio String?
  posts Post[]
}

model Tag {
  id String @id @default(cuid())
  name String @unique
  posts Post[]
}
```typescript

---

**Authority:** D4 (N-Document Approvals)  
**Last Updated:** 2026-11-09  
**Related:** N007: Publishing Workflow · N018: Backend Stack
