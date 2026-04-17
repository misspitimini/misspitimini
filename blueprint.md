# Blueprint

## Purpose and Capabilities

This project is a personal website for Sara Laínez, a floral designer in Madrid. The website showcases her work, provides information about her services, and includes a blog. The site is built with Astro.js and is designed to be fast, performant, and SEO-friendly.

## Style, Design, and Features

- Modern, clean, and elegant design
- Mobile-responsive layout
- Custom fonts and color palette
- Image carousel with Ken Burns effect and smooth transitions.
- Blog with articles about floral design
- SEO optimization

## Current Task: Deployment

- **Successfully Deployed to Firebase Hosting:** The project has been successfully built and deployed, making the website publicly accessible.
  - **Build Process:** Ran `npm run build` to generate the static site files in the `dist/` directory.
  - **Deployment:** Used Firebase Hosting to deploy the contents of the `dist/` folder.

## Previous Tasks

- **Bug Fix - TypeScript Path Resolution:**
  - **Fixed JSON Module Resolution:** Resolved a `Cannot find module` error (ts(2307)) by correcting the import path for `carrusel.json` and updating `tsconfig.json` to allow JSON imports.
  - **Populated Carousel Data:** Created and populated `src/data/carrusel.json` to provide the necessary data for the carousel component and prevent further import errors.

- **Carousel Enhancement:**
  - **Enhanced Carousel Visuals:** Improved the image presentation in `src/components/header/Carrusel.astro` with a Ken Burns effect, smooth fade transitions, and improved text legibility.

- **Initial Bug Fixes:**
  - **Resolved Image Format Error:** Fixed an `UnsupportedImageFormat` error by populating `src/data/gallery.json`.
  - **Corrected TypeScript Errors:** Addressed multiple `Element implicitly has an 'any' type` errors in form handling scripts.
  - **Resolved Dynamic Import Error:** Fixed a `Property 'default' does not exist on type 'unknown'` error in `src/ts/workshops.ts`.
