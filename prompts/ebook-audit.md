# Ebook Reader Audit Prompt

**Goal**: Discover all components, data, css, and guidelines related to the ebook reader feature.

**Steps**:
1. Scan `/components/` for any file containing `ebook` or related reader functionality.
2. Scan `/styles/blocks/` for any ebook-related CSS files.
3. Scan `/data/` and `/utils/` for data mockups, configuration, or utility scripts supporting the ebook.
4. Scan `/guidelines/` and `/docs/` for any documentation referencing the ebook reader.
5. Compile findings into a structured report at `/reports/ebook-audit/findings.md`.
6. Identify gaps (like missing guidelines) and generate a task list at `/tasks/ebook-audit-tasks.md`.