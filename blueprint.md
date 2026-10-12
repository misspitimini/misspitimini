# Miss Pitimini - Blueprint

## Overview

This project is a static-first web application for a floral design business, built with Astro.js. The site is designed to be highly performant, with a focus on delivering a rich user experience with minimal JavaScript. The project uses Tailwind CSS for styling and Alpine.js for interactive components.

The application features a dynamic blog, a gallery of floral designs, and a section for workshops and experiences. The workshop data is fetched from a content collection, allowing for easy updates and management of workshop information.

## Project Structure

*   `src/pages/`: Contains the Astro pages for the site, including a dynamic blog.
*   `src/components/`: Contains reusable Astro and UI framework components.
*   `src/layouts/`: Contains the main layout for the site.
*   `src/assets/`: Contains static assets like images and fonts.
*   `src/services/`: Contains services for fetching data from external APIs.
*   `src/content/`: Contains the content collections for the site, including `homecards` and `nextworkshop`.

## Workshop Data Migration

The workshop data has been migrated from a static JSON file to a dynamic content collection. This change allows for a more scalable and manageable system for adding and updating workshop information.

The `getWorkshops` service now fetches data from the `src/content/nextworkshop` directory. New workshops can be added by simply creating new markdown files in this directory.

The `WorkshopsComponent` has been updated to use the new data fetching system, and the overall code has been cleaned up and made more robust.
