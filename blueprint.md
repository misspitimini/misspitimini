# Blueprint

## Overview

This project is a static-first web application for a floral design business, "misspitimini." It is built with Astro.js and designed to be highly performant, with a focus on delivering a fast user experience and excellent SEO.

## Project Structure

-   **`src/`**: Contains all the source code for the website.
-   **`src/assets/`**: Static assets like images and fonts.
-   **`src/components/`**: Reusable Astro components (e.g., Header, Footer).
-   **`src/layouts/`**: Base HTML layout structures for pages.
-   **`src/pages/`**: The file-based routing system. Each `.astro` file becomes a page.
-   **`src/ts/`**: TypeScript files for client-side interactivity.
-   **`public/`**: Assets that are copied directly to the build output.

## Key Features & Design

### 1. **Homepage (`/`)**

-   **Layout:** A modern, visually engaging layout with a hero section, an introduction, a gallery preview, a contact section, and a footer.
-   **Styling:** Utilizes Tailwind CSS for a clean, utility-first approach. It features a sophisticated color palette, custom fonts, and subtle animations.
-   **Interactivity:** A client-side Alpine.js component manages the interactive gallery preview, allowing users to cycle through a selection of images.

### 2. **Gallery Page (`/galeria`)**

-   **Layout:** A grid-based layout that dynamically fetches and displays all available galleries from a central data source.
-   **Data Fetching:** The page pre-renders at build time by fetching the gallery data from a TypeScript file (`src/ts/galleryAstro.ts`), ensuring fast load times.
-   **Navigation:** Each gallery card links to a detailed view for that specific gallery.

### 3. **Gallery Detail Page (`/galeria/[slug]`)**

-   **Dynamic Routing:** Uses Astro's dynamic routing to generate a unique page for each gallery based on a `slug`.
-   **Interactive Viewer:** A sophisticated Alpine.js component (`galleryDetailData`) provides a rich user experience for browsing gallery images:
    -   **Asynchronous Loading:** Images and markdown content are fetched dynamically on the client-side.
    -   **Image Carousel:** Users can navigate through images using next/previous buttons and touch gestures (swipe left/right) on mobile.
    -   **Thumbnail Navigation:** A scrollable list of thumbnails allows for quick navigation to any image.
    -   **Orientation Handling:** The viewer dynamically adjusts its layout to best fit landscape or portrait images.
    -   **Loading State:** A loading indicator provides user feedback while images are being fetched.

## Current Plan: Fix the Gallery Detail Page

**The gallery detail page is broken.** A series of incorrect fixes have been attempted, leading to the current state. The final plan is to restore the page to a simple, functional state.

**Actionable Steps:**

1.  **Correct Data Fetching:** A typo in `src/ts/galleryDetail.ts` (`currentgallery.content` instead of `currentGallery.content`) will be corrected. This is the root cause of the initial failure.
2.  **Simplify Alpine Component:** The `src/ts/galleryDetailData.ts` file, which was unnecessarily converted to a complex `class`, will be reverted to a simple, functional object literal. This removes the TypeScript errors and simplifies the code.
3.  **Restore Astro Page:** The main page file, `src/pages/galeria/[slug].astro`, will have its script imports verified to ensure it correctly loads the necessary TypeScript modules.
4.  **Final Verification:** All related files will be reviewed to ensure they are correct and that the application is functional.