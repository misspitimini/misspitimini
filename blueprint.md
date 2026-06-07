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

## Current Task: SEO Improvement - Canonical URLs

**Objective:** Improve the site's SEO by adding canonical URLs to all pages. This will help search engines understand which URL is the "master" version of each page, preventing duplicate content issues.

**Plan & Steps:**

1.  **Update `BaseLayout.astro`:** The `BaseLayout.astro` component was updated to accept a `canonicalUrl` prop. This prop is then used to generate a `<link rel="canonical">` tag in the `<head>` of each page.
2.  **Update Page Components:** All page components were updated to fetch the current page's URL and pass it as the `canonicalUrl` prop to their respective layouts. This ensures that each page has a unique and correct canonical URL.
3.  **Fix Invalid URL error in `MainHead.astro`**: The `imageUrl` was being constructed with `Astro.site`, which was causing an "Invalid URL" error. This was fixed by using `Astro.url` instead, which provides a more reliable base URL during the build process.
4.  **Fix Invalid URL error in `StructuredData.astro`**: Similar to the previous step, the `url` and `image` properties in the `defaultBusinessData` object were using `Astro.site`. This was corrected to use `Astro.url` to prevent errors during the build process.
5.  **Fix TypeScript Errors**: The `tsconfig.json` file was including all files in the project, which was causing TypeScript errors. The `include` property was updated to specifically include only the `src` directory and the Astro-generated type definitions, resolving the errors.

**Outcome:** The addition of canonical URLs will improve the site's SEO by preventing duplicate content issues and helping search engines better understand the site's structure. This will lead to better rankings and more organic traffic.
