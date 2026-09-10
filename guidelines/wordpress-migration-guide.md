# 🦅 Headless WordPress Migration Guide

**Version:** 1.1.0 (Dual Mode Enabled)
**Date:** February 21, 2026
**Status:** Ready for Implementation

This guide details the process of migrating the Ash Shaw Makeup Portfolio from its current "Mock Data" architecture to a **Headless WordPress** backend.

---

## 1. Architecture Overview

The application now supports **Dual Mode**:
1.  **Mock Mode (Default):** Uses local JSON data for fast development and static hosting.
2.  **WordPress Mode:** Uses `useContent` hooks to fetch data from a live WordPress API.

**Switching Modes:**
The mode is controlled entirely by the `VITE_USE_WORDPRESS` environment variable. No code changes are required to switch backends.

`useContent.ts` -> Checks `VITE_USE_WORDPRESS` -> Routes to `useMockData.ts` OR `useWordPress.ts`

---

## 2. WordPress Setup Requirements

You will need a fresh WordPress installation (local via LocalWP or hosted).

### 2.1. Required Plugins
Install and activate the following plugins:
1.  **ACF (Advanced Custom Fields):** For custom metadata.
2.  **CPT UI (Custom Post Type UI):** To create the `Portfolio` post type.
3.  **WP All Import (Free or Pro):** To import the content JSON.
4.  **WP GraphQL (Optional):** If you prefer GraphQL over REST (our hooks use REST for simplicity).
5.  **Classic Editor (Optional):** If you prefer Markdown-like writing over Gutenberg blocks.

### 2.2. Register Custom Post Type (Portfolio)
Using CPT UI, register a new post type:
*   **Slug:** `portfolio`
*   **Plural Label:** Portfolio Entries
*   **Singular Label:** Portfolio Entry
*   **Supports:** Title, Editor, Thumbnail, Excerpt, Custom Fields, Revisions.
*   **Taxonomies:** Create `portfolio_category` and `post_tag`.
*   **REST API:** **Enable** (Show in REST API: True). This is critical.

### 2.3. Configure ACF Fields
Create a Field Group named "Portfolio Metadata" and assign it to **Post Type = Portfolio**.
Add the following fields:
*   **Location** (`_location`) - Text
*   **Event** (`_event`) - Text
*   **Featured** (`_featured`) - True/False
*   **Images** (`_images`) - Repeater (or JSON Text Area if importing raw JSON).
    *   *Note:* The export script outputs `_images` as a JSON string. You can either import it into a Text Area field (simple) or map it to an ACF Repeater (complex). For the prototype, a Text Area field named `_images` is recommended.

---

## 3. Content Import Process

### 3.1. Get the Export File
The export file was previously located at `/dist/wordpress-export.json`. This file has been **deleted** (it was a build artifact removed during the Feb 25, 2026 cleanup audit).

To regenerate it, run:
```
ts-node scripts/export-content.ts
```

This will recreate `wordpress-export.json` in `/dist/`. The `/dist/` folder is excluded from source control.

### 3.2. Import into WordPress
1.  Go to **All Import > New Import**.
2.  Upload `wordpress-export.json` (after regenerating it per step 3.1).
3.  Select **New Items** and choose **Post** (for blog) or **Portfolio Entry** (for portfolio).
    *   *Note:* You will need to run the import twice: once for Posts and once for Portfolio items, filtering the JSON path if possible, or just letting it skip mismatched types.
    *   **Important: Image Paths:** The `featured_image` field in the JSON export may contain `figma:asset/...` paths (internal React paths). These will **not** be automatically imported by WordPress.
        *   **Solution A:** Upload all images to the WordPress Media Library manually first.
        *   **Solution B:** Replace `figma:asset/...` paths in the JSON with public URLs before importing.
        *   **Solution C:** Use a custom PHP script to resolve the asset paths (advanced).
4.  **Drag & Drop Mapping:**
    *   **Title:** `{post_title}`
    *   **Content:** `{post_content}`
    *   **Excerpt:** `{post_excerpt}`
    *   **Date:** `{post_date}`
    *   **Slug:** `{post_slug}`
    *   **Featured Image:** `{featured_image}` (WP All Import can download these URLs).
5.  **Custom Fields (ACF):**
    *   `_location`: `{meta/_location}`
    *   `_event`: `{meta/_event}`
    *   `_featured`: `{meta/_featured}`
    *   `_images`: `{meta/_images}`
6.  **Taxonomies:**
    *   Map `{taxonomies/category}` to Categories.
    *   Map `{taxonomies/post_tag}` to Tags.
7.  Run the import.

---

## 4. Frontend Configuration

### 4.1. Environment Variables
To enable WordPress mode, create or update `.env`:

```env
VITE_USE_WORDPRESS=true
VITE_WP_API_URL=https://your-wordpress-site.com/wp-json/wp/v2
```

To revert to Mock Data, simply set `VITE_USE_WORDPRESS=false` or remove the line.

### 4.2. Verify Connection
Open the browser console in development mode. You should see:
`🔌 Content Mode: WordPress API`

### 4.3. Update Components
No code changes are required in components. `BlogPage.tsx` and `PortfolioMainPage.tsx` have been updated to use the unified `useContent` hooks.

---

## 5. Verification Checklist

- [ ] JSON Export file exists and contains data.
- [ ] WordPress instance is running with REST API enabled.
- [ ] `portfolio` CPT is registered and accessible via `/wp-json/wp/v2/portfolio`.
- [ ] Content is imported with correct images and metadata.
- [ ] React app is fetching data from the API endpoint when `VITE_USE_WORDPRESS=true`.

---

**Troubleshooting:**
*   **CORS Error:** Install the "WP GraphQL CORS" or similar plugin on WordPress to allow requests from `localhost:5173`.
*   **Images not loading:** Ensure the imported images are publicly accessible.