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

## Current Task: Refactor CSS Classes

**Objective:** Centralize and streamline the use of CSS classes for flexible container elements.

**Plan & Steps:**

1.  **Create a New CSS Class:** A new class selector, `.flex-container`, was added to the `src/styles/global.css` file. This class encapsulates a set of Tailwind CSS utilities for creating flexible, space-between, and vertically centered containers.
2.  **Identify and Refactor Components:** The project's components were scanned to identify areas where the new class could be applied. The following components were updated:
    *   `src/components/weddings/WeddingsComponent.astro`
    *   `src/components/workshop/WorkshopsComponent.astro`
    *   `src/components/eventscorporate/EventsComponent.astro`
3.  **Apply the New Class:** In each of the identified components, the existing Tailwind CSS classes on the `<summary>` elements were replaced with the new `.flex-container` class.

**Outcome:** The use of the new `.flex-container` class simplifies the HTML structure and makes the code more maintainable. By centralizing the styling logic, we can now easily update the appearance of these elements across the entire project by modifying a single CSS rule.