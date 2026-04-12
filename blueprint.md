
# Project Blueprint

## Overview

This project is a static-first web application built with Astro.js. It is a floral design website for "misspitimini, floral Design by Sara Laínez". The site showcases her work, offers workshops, and provides information about her services. The focus is on creating a fast, highly-performant, and scalable site that delivers minimal JavaScript by default, ensuring an exceptional user experience and top-tier Core Web Vitals.

## Style, Design, and Features

*   **Framework:** Astro.js
*   **Styling:** Tailwind CSS
*   **Programming Language:** TypeScript
*   **Architecture:** Islands Architecture
*   **Routing:** File-based routing
*   **Components:**
    *   `.astro` components for static content
    *   UI Framework components for interactive "islands" (e.g., Alpine.js for the menu)
*   **Data Fetching:** Server-side data fetching in component frontmatter. Galleries are sourced from a `galleries.json` file.
*   **Deployment:** Firebase Hosting

## Current Change: Comprehensive SEO Audit & Remediation

This update focuses on a thorough technical SEO audit and the implementation of critical fixes and enhancements to improve the website's visibility, search engine ranking, and social media presence.

### Plan and Steps for the SEO Enhancement:

1.  **Robots.txt Analysis & Correction:**
    *   **Action:** Analyzed the `robots.txt` file.
    *   **Result:** The file was found to be overly restrictive, blocking search engines from crawling the entire site. It was corrected to allow all crawlers access to all content.

2.  **Sitemap Correction & Enhancement:**
    *   **Action:** Investigated and fixed a critical error with the sitemap generation.
    *   **Details:** The project was incorrectly using `sitemap-index.xml.ts` which is not a standard approach. This was replaced with a single, comprehensive `sitemap.xml.ts`.
    *   **Enhancement:** The new sitemap now dynamically includes all static pages, blog posts (from Astro Content), and all gallery pages (from `galleries.json`), ensuring complete site indexation.

3.  **Layout & Meta Tag Optimization (`Layout.astro`):**
    *   **Action:** Enhanced the main layout file to include modern SEO and social sharing meta tags.
    *   **Additions:**
        *   Open Graph (`og:`) tags for professional link sharing on platforms like Facebook and LinkedIn.
        *   Twitter Card (`twitter:`) tags for optimized link sharing on Twitter.
        *   A `robots` meta tag (`index, follow`) to give clear crawling directives.
        *   An `image` prop was added to allow each page to specify its own social sharing image.

4.  **Default Social Image Creation:**
    *   **Action:** Created a default social sharing image (`saraLaínez.jpg`) in the `public` directory.
    *   **Purpose:** This ensures that even if a page doesn't have a specific image, a visually appealing default will be used when shared on social media, preventing broken image links.

5.  **Dynamic & Advanced Structured Data (`StructuredData.astro`):**
    *   **Action:** Refactored the `StructuredData.astro` component to be dynamic.
    *   **Before:** The component applied the same `Florist` schema to every single page.
    *   **After:** The component can now accept a `schema` prop, allowing each page to define its specific type (e.g., `Article`, `ContactPage`, etc.). If no specific schema is provided, it defaults to the robust `Florist` business schema. This provides much more accurate information to search engines.

6.  **Homepage (`index.astro`) Optimization:**
    *   **Action:** Audited and optimized the main landing page.
    *   **Fixes:**
        *   Corrected spelling errors in the meta description ("espezializada" -> "especializada", "Creacciones" -> "Creaciones").
        *   **Crucially, made the main `<h1>` heading visible** by removing the `hidden` CSS class. This was a major SEO issue.
        *   Implemented the new `image` prop in the `Layout` component call to specify a social sharing image.
