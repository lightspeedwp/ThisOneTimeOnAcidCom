# Ebook Reader Audit Prompt

**Goal**: Discover all components, data, css, and guidelines related to the
ebook reader feature.

**Steps**:

1. Scan `/components/` for any file containing `ebook` or related reader functionality.

1. Scan `/styles/blocks/` for any ebook-related CSS files.

1. Scan `/data/` and `/utils/` for data mockups, configuration, or utility scripts supporting the ebook.

1. Scan `/guidelines/` and `/docs/` for any documentation referencing the ebook reader.

1. Compile findings into a structured report at `/reports/ebook-audit/findings.md`.

1. Identify gaps (like missing guidelines) and generate a task list at `/tasks/ebook-audit-tasks.md`.
