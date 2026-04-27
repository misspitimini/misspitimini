## Blueprint

### Overview

This project is a static-first web application built with Astro.js. It is designed to be developed within the Firebase Studio (formerly Project IDX) environment. The focus is on creating a fast, highly-performant, and scalable site that delivers minimal JavaScript by default, ensuring an exceptional user experience and top-tier Core Web Vitals.

### Style and Design

The website uses a modern, clean, and elegant design. The primary colors are floral-beige, floral-light, floral-dark, and primary. The typography is a combination of a serif font for headings and a sans-serif font for body text.

The layout is responsive and adapts to different screen sizes. The images are optimized for the web and loaded lazily to improve performance.

### Features

*   **Home Page:** Displays a hero image, a brief introduction, and a grid of cards that link to the main sections of the website.
*   **About Page:** Contains information about the floral designer, Sara Laínez.
*   **Weddings Page:** Describes the floral design services for weddings, including bridal bouquets, ceremony decoration, and table centerpieces.
*   **Events Page:** Details the floral design services for corporate and private events.
*   **Workshops Page:** Provides information about the floral design workshops.
*   **Gallery Page:** Showcases a collection of photos from past events and workshops.
*   **Blog:** A collection of articles about floral design and related topics.
*   **Contact Page:** A form to contact Sara Laínez.
*   **Reusable Components:**
    *   `SectionTitle.astro`: A component for displaying section titles.
    *   `ContentSection.astro`: A layout component to standardize section padding and styling.

### Current Task

Refactor components to use the new `ContentSection.astro` layout component for better code consistency and reusability.

### Plan

1.  [x] Create the `src/components/layout/ContentSection.astro` component.
2.  [x] Refactor `src/components/home/HomeComponentFirst.astro`.
3.  [x] Refactor `src/components/home/HomeComponentSecond.astro`.
4.  [x] Partially refactor `src/components/weddings/WeddingsComponent.astro`.
5.  [x] Refactor `src/components/workshop/WorkshopsComponent.astro`.
6.  [x] Refactor `src/components/blog/BlogComponent.astro`.
7.  [x] Partially refactor `src/components/contact/ContactComponent.astro`.
8.  [x] Update `blueprint.md` to reflect the completed refactoring.
