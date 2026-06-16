# Miss Pitimini - Blueprint

## Overview

This project is a static-first web application for a floral design business, built with Astro.js. The site is designed to be highly performant, with a focus on delivering a rich user experience with minimal JavaScript. The project uses Tailwind CSS for styling and Alpine.js for interactive components.

## Project Structure

*   `src/pages/`: Contains the Astro pages for the site, including a dynamic blog.
*   `src/components/`: Contains reusable Astro and UI framework components.
*   `src/layouts/`: Contains the main layout for the site.
*   `src/assets/`: Contains static assets like images and fonts.
*   `src/services/`: Contains services for fetching data from external APIs.

## Current Issue

The project is currently failing to build due to an error with the `@astrojs/sitemap` package. The error message `Could not find a declaration file for module '@astrojs/sitemap'` suggests a problem with the TypeScript configuration or a version incompatibility.

## Plan

1.  **Update Dependencies:** I will update all project dependencies to their latest versions to ensure compatibility.
2.  **Verify TypeScript Configuration:** I will check the `tsconfig.json` file to ensure it's correctly configured.
3.  **Investigate Sitemap Configuration:** I will examine the `astro.config.mjs` file and the project's routing structure to ensure the sitemap is configured correctly, especially for dynamic routes.
4.  **Isolate and Resolve:** If the issue persists, I will temporarily disable the sitemap to confirm it's the source of the problem, and then explore alternative solutions or workarounds.
