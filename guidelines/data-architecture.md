# Data Models & Architecture (N010)

**Version:** 1.0.0  
**Status:** Canonical Reference  
**Last Updated:** 2026-10-25

---

## Data Structures

### Core Entities

- **Portfolio Project**
- **Blog Post**
- **Event/Festival**
- **User Profile**
- **Media Asset**

---

## Entity Relationships

- Users → Projects (one-to-many)
- Projects → Media (one-to-many)
- Posts → Tags (many-to-many)
- Events → Projects (many-to-many)

---

## Architecture Overview

See `guidelines/ARCHITECTURE.md` for system design and component structure.

---

**Last Updated:** 2026-10-25
