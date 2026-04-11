# Blueprint de la aplicación

## Propósito y capacidades

Esta es una aplicación web estática construida con Astro.js para la diseñadora floral Sara Laínez (misspitimini). El sitio muestra su trabajo, ofrece talleres y permite a los usuarios contactarla.

## Estilo, diseño y características

*   **Estilo:** Moderno, limpio y elegante, con un enfoque en la tipografía y las imágenes.
*   **Diseño:** Responsivo y adaptable a dispositivos móviles.
*   **Características:**
    *   Página de inicio con carrusel de imágenes y secciones destacadas, con metaetiquetas SEO optimizadas.
    *   Galería de imágenes de trabajos anteriores con rutas dinámicas.
    *   Blog con publicaciones sobre diseño floral con rutas dinámicas.
    *   Página de contacto con formulario.
    *   Sección "Sobre mí" para presentar a la diseñadora.
    *   Sección de talleres y experiencias.
    *   Datos estructurados de `LocalBusiness` para mejorar el SEO local.

## Plan actual

**Solicitud:** Solucionar el problema de que las imágenes horizontales en el carrusel de la galería se ven cortadas porque la lógica de `onload` no se ejecuta.

**Diagnóstico:** El atributo `loading="lazy"` en las imágenes principales del carrusel impedía que el navegador las cargara. Dado que el carrusel oculta las imágenes no activas con `transform: translateX(...)`, el navegador nunca consideraba que estuvieran a punto de ser visibles y, por lo tanto, nunca las cargaba. Esto provocaba que el evento `onload` y la comprobación `image.complete` nunca se activaran.

**Plan de ejecución (Completado):**

1.  **Eliminar `loading="lazy"`:** Se ha modificado la función `createImage` en `src/js/galleryDetail.js` para eliminar el atributo `loading="lazy"` de las imágenes que se crean para el carrusel principal. Esto asegura que la carga comience inmediatamente después de asignar el `src`.
2.  **Mantener la lógica `onload`:** La lógica existente que asigna el manejador `onload` antes que el `src` ahora funciona como se esperaba, ya que la carga de la imagen no está bloqueada.

## Historial de cambios

### Corrección de Visualización de Imágenes en la Galería

**Plan:**

1.  **Modificar `createImage`:** Se ha modificado la función `createImage` en `src/js/galleryDetail.js`.
2.  **Añadir lógica de detección de aspecto:** Se ha añadido una lógica que, al cargar cada imagen, comprueba si es más ancha que alta.
3.  **Aplicar clases dinámicamente:** Se aplican clases de forma dinámica para asegurar que las imágenes horizontales y verticales se muestren correctamente.
4.  **Corregir activación de `onload`:** Se reordenó la asignación del `src` y se añadió una verificación de `image.complete` para garantizar que la lógica de dimensionamiento se ejecute siempre.
5.  **Eliminar `loading="lazy"` del carrusel:** Se eliminó el atributo `loading="lazy"` que impedía la carga de las imágenes en el carrusel.

### Implementación y Corrección de Rutas Dinámicas

**Plan:**

1.  **Refactorización a rutas dinámicas:** Se eliminó la lógica de renderizado del lado del cliente y se reemplazó por la generación de páginas estáticas en tiempo de compilación con `getStaticPaths`.
2.  **Creación de archivos de ruta `[slug].astro`:** Se añadieron los archivos `src/pages/blog/[slug].astro` y `src/pages/galeria/[slug].astro`.
3.  **Creación de fuentes de datos JSON:** Se crearon `src/data/blog.json` y `src/data/gallery.json`.

### Optimización SEO de la Página de Inicio

**Plan:**

1.  **Añadir metaetiquetas específicas:** Se han añadido un `title` y `meta description` únicos y descriptivos a `src/pages/index.astro`.

### Solución del fallo de compilación (Imagen faltante)

**Plan:**

1.  **Diagnosticar y solucionar fallo de compilación:** Se eliminó una imagen faltante en `src/pages/404.astro`.

### Mejoras en la Interfaz de Usuario (Menú)

**Plan:**

1.  **Corregir parpadeo del menú móvil y añadir botón de cierre.**
2.  **Ajustar layout del encabezado y fondo del menú.**
3.  **Eliminar duplicación del menú.**

### Optimizaciones SEO y de Rendimiento

**Plan:**

1.  **Añadir datos estructurados `LocalBusiness`**.
2.  **Activar `loading="lazy"` y mejorar textos alternativos**.
