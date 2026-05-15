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

## Current Task: Refactor Data Fetching for Blog Posts

**Objective:** Centralize and modernize the data fetching logic for individual blog posts.

**Plan & Steps:**

1.  **Create New Service:** Created a new file at `src/services/blogDetail.ts`.
2.  **Adapt Existing Logic:** Adapted the core data-fetching logic from the old `src/ts/blogDetail.ts` file.
3.  **Use Astro's API:** The new service utilizes Astro's `getEntry` function from the `astro:content` module to fetch a single blog post from the content collection.
4.  **Remove DOM Manipulation:** The new service is purely for data fetching and does not contain any of the old DOM manipulation code.

**Outcome:** The `src/services/blogDetail.ts` file now provides a clean, centralized, and modern way to fetch individual blog posts. This improves code organization and maintainability.