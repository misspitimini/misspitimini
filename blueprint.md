# Project Blueprint

## Overview

This project is a static-first web application built with Astro.js. It is designed to be developed within the Firebase Studio (formerly Project IDX) environment. The focus is on creating a fast, highly-performant, and scalable site that delivers minimal JavaScript by default, ensuring an exceptional user experience and top-tier Core Web Vitals.

## Project Structure & Features

*   **Framework:** Astro.js
*   **Styling:** Tailwind CSS
*   **Deployment:** Firebase Hosting

### Implemented Features:

*   **Layouts:** A comprehensive set of layouts for different page types, including home, blog, gallery, and contact forms.
*   **Components:** Reusable Astro components for common UI elements.
*   **TypeScript Integration:** Client-side interactivity powered by TypeScript modules.

## Current Task: Error Remediation

**Objective:** Resolve the "Cannot use import statement outside a module" error reported by the browser.

**Plan & Steps:**

1.  **Identify the Root Cause:** The error is caused by TypeScript files being imported using `<script>` tags without the `type="module"` attribute.
2.  **Locate Problematic Imports:** Scanned all `.astro` layout files in `src/layouts/` to find all script imports.
3.  **Correct Script Imports:** Modified the following files to add `type="module"` to the `<script>` tags:
    *   `src/layouts/LayoutBlog.astro`
    *   `src/layouts/LayoutBlogDetail.astro`
    *   `src/layouts/LayoutEmail.astro`
    *   `src/layouts/LayoutForm.astro`
    *   `src/layouts/LayoutGallery.astro`

**Outcome:** The error is now resolved, and all TypeScript modules should load correctly in the browser.