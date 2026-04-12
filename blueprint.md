# Project Blueprint

## Overview

This project is a static-first web application built with Astro.js. It is designed to be developed within the Firebase Studio (formerly Project IDX) environment. The focus is on creating a fast, highly-performant, and scalable site that delivers minimal JavaScript by default, ensuring an exceptional user experience and top-tier Core Web Vitals.

## Style, Design, and Features

*   **Framework:** Astro.js
*   **Styling:** Tailwind CSS
*   **Programming Language:** TypeScript
*   **Architecture:** Islands Architecture
*   **Routing:** File-based routing
*   **Components:**
    *   `.astro` components for static content
    *   UI Framework components for interactive "islands"
*   **Data Fetching:** Server-side data fetching in component frontmatter.
*   **State Management:** Lightweight state management with Nano Stores for interactive components.
*   **Deployment:** Firebase Hosting

## Current Change: JavaScript to TypeScript Migration

The project has been migrated from JavaScript to TypeScript to improve code quality, maintainability, and developer experience.

### Steps Taken:

1.  **Created `src/ts` directory:** A new directory was created to house the TypeScript files.
2.  **Moved and Renamed Files:** All JavaScript files from the `src/js` directory were moved to `src/ts` and their extensions were changed from `.js` to `.ts`.
3.  **Updated Layouts:** All `.astro` layout files in the `src/layouts` directory were updated to point to the new TypeScript files in `src/ts`.
4.  **Removed `src/js` directory:** The now-empty `src/js` directory and all its contents were removed from the project.