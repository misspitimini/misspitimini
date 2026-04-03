# Blueprint de la aplicación

## Propósito y capacidades

Esta es una aplicación web estática construida con Astro.js para la diseñadora floral Sara Laínez (misspitimini). El sitio muestra su trabajo, ofrece talleres y permite a los usuarios contactarla.

## Estilo, diseño y características

*   **Estilo:** Moderno, limpio y elegante, con un enfoque en la tipografía y las imágenes.
*   **Diseño:** Responsivo y adaptable a dispositivos móviles.
*   **Características:**
    *   Página de inicio con carrusel de imágenes y secciones destacadas.
    *   Galería de imágenes de trabajos anteriores.
    *   Blog con publicaciones sobre diseño floral.
    *   Página de contacto con formulario.
    *   Sección "Sobre mí" para presentar a la diseñadora.
    *   Sección de talleres y experiencias.

## Plan y pasos para el cambio actual

**Solicitud:** Mejorar la accesibilidad de las imágenes del sitio web añadiendo textos alternativos (alt text) descriptivos.

**Plan:**

1.  **Analizar el uso de imágenes en el sitio:** Identificar todas las imágenes y cómo se están utilizando, prestando especial atención a las que carecen de texto alternativo o tienen textos genéricos.
2.  **Mejorar textos alternativos en componentes estáticos:**
    *   Añadir un texto alternativo descriptivo a la imagen en `src/components/misc/About.astro`.
    *   Mejorar los textos alternativos en `src/data/carruselData.js` para que describan cada imagen del carrusel.
3.  **Abordar imágenes cargadas dinámicamente:**
    *   Revisar `src/js/gallery.js` y `src/js/blog.js` para entender cómo se cargan las imágenes de la galería y el blog.
    *   Dado que los datos provienen de un backend externo, mejorar los textos alternativos por defecto en los scripts para que sean más informativos que "Post sin título".
    *   Recomendar al cliente que se ponga en contacto con el desarrollador del backend para que añada textos alternativos descriptivos a los datos que se devuelven.
