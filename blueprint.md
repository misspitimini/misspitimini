# Miss Pitimini - Blueprint

## Overview

This project is a static-first web application for a floral design business, built with Astro.js. The site is designed to be highly performant, with a focus on delivering a rich user experience with minimal JavaScript. The project uses Tailwind CSS for styling and Alpine.js for interactive components.

The application features a dynamic blog, a gallery of floral designs, and a section for workshops and experiences. The workshop data is fetched from a content collection, allowing for easy updates and management of workshop information.

The application features a dynamic blog, a gallery of floral designs, a section for workshops and experiences, and a new page dedicated to wreaths and floral crowns.

## Project Structure

*   `src/pages/`: Contains the Astro pages for the site, including a dynamic blog.
*   `src/components/`: Contains reusable Astro and UI framework components.
*   `src/layouts/`: Contains the main layout for the site.
*   `src/assets/`: Contains static assets like images and fonts.
*   `src/services/`: Contains services for fetching data from external APIs.
*   `src/content/`: Contains the content collections for the site, including `homecards` and `nextworkshop`.


## Recent Changes

### New "Coronas de Navidad" Page

A new page, `coronasNavidad.astro`, has been created to showcase a catalog of wreaths and floral crowns. This page is similar in structure to the `bodas.astro` page and includes a new `WreathsComponent` to display the catalog.

### `WreathsComponent`

The `WreathsComponent` has been created to display a grid of products, each with an image, title, and description. The component is located in `src/components/wreaths/WreathsComponent.astro`.

### Navigation

The navigation has been updated to include a link to the new "Ramos y Coronas" page.


## Workshop Data Migration

The workshop data has been migrated from a static JSON file to a dynamic content collection. This change allows for a more scalable and manageable system for adding and updating workshop information.

The `getWorkshops` service now fetches data from the `src/content/nextworkshop` directory. New workshops can be added by simply creating new markdown files in this directory.

The `WorkshopsComponent` has been updated to use the new data fetching system, and the overall code has been cleaned up and made more robust.

## Local Deployment & Environment Setup

- **Runtime & Tools**: Node.js v24 LTS with npm v11 configured in the local user environment (`%LOCALAPPDATA%\Programs\nodejs`).
- **Dependency Installation**: `npm install` executed successfully installing Astro v5 and dependencies (@astrojs/alpinejs, @astrojs/sitemap, @astrojs/tailwind, astro-icon).
- **Build Verification**: `npm run build` executed successfully, generating 15 static routes and optimized media in `dist/`.
- **Local Dev Server**: Executed with `npm run dev -- --host 127.0.0.1 --port 4321` for local preview and development.
- **Git & Remote Sync**: Git configured locally, remote origin linked to `https://github.com/misspitimini/misspitimini.git`. Branch `main` successfully pushed and synchronized with GitHub, with credentials securely managed via Windows Credential Manager.
- **IDE Setup**: Visual Studio Code v1.145.2 (x64) installed with official extensions for Astro (`astro-build.astro-vscode`), Tailwind CSS (`bradlc.vscode-tailwindcss`), GitLens (`eamodio.gitlens`), Git Graph (`mhutchie.git-graph`), Gemini Code Assist (`google.geminicodeassist`), Node.js essentials (NPM Intellisense, Path Intellisense, Version Lens, Prettier), and TypeScript / Linting (Pretty TypeScript Errors, ESLint). Desktop shortcut configured to open the project workspace directly.

## Current Change: Workshop Booking Page Title

The dynamic booking page at `src/pages/solicitaPresupuesto/[slug].astro` passes each workshop's title from `getStaticPaths()` into the page layout metadata, followed by the misspitimini brand. The existing generic reservation title remains as a fallback when a workshop title is missing.

## Current Change: Workshop Build Compatibility

The experiences page passes each workshop as the `workshop` prop expected by `WorkshopCardNext`, keeping dynamic workshop cards compatible with the component interface.

The Astro image allowlist includes `content.misspitimini.com` so workshop images served by the content host can be optimized during static builds.

The legacy `/solicitaPresupuesto/` page continues to show its original static first-workshop card, while using the current booking layout.

Workshop reservation links use Astro expression syntax and route to `/solicitaPresupuesto/{slug}`, matching the dynamic booking pages.

The three static workshop card components (`WorkshopCardNextProv01`, `WorkshopCardNextProv02`, and `WorkshopCardNextProv03`) are restored because existing pages still import them.
