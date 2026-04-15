# Blueprint

## Purpose and Capabilities

This project is a personal website for Sara Laínez, a floral designer in Madrid. The website showcases her work, provides information about her services, and includes a blog. The site is built with Astro.js and is designed to be fast, performant, and SEO-friendly.

## Style, Design, and Features

- Modern, clean, and elegant design
- Mobile-responsive layout
- Custom fonts and color palette
- Image carousel
- Blog with articles about floral design
- SEO optimization

## Current Task: Bug Fixes and Improvements

- **Resolved Image Format Error:** Fixed an `UnsupportedImageFormat` error by populating the `src/data/gallery.json` file with valid image data. This ensured that the gallery component receives correct image paths, preventing rendering issues.
- **Corrected TypeScript Errors:** Addressed multiple `Element implicitly has an 'any' type` errors in the following files:
    - `src/ts/form-handler.ts`
    - `src/ts/form-workshopsBooking.ts`
- **Improved Type Safety:** Implemented a `FormFields` interface to define the shape of form objects, ensuring better type safety and preventing potential runtime errors.
- **Enhanced Data Handling:** Updated form handling logic to correctly manage different input types and prevent errors from null values.
