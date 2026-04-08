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

**Solicitud:** Solucionar los errores restantes para completar la refactorización a rutas dinámicas del blog y la galería.

**Diagnóstico Final:** La implementación inicial de las rutas dinámicas estaba incompleta. Faltaban los archivos de ruta dinámica `[slug].astro` y, fundamentalmente, los archivos de datos `blog.json` y `gallery.json` de los que dependían, lo que causaba errores en cascada.

**Plan de ejecución (Completado):**

1.  **Crear archivos de ruta dinámica:** Se crearon los archivos `src/pages/blog/[slug].astro` y `src/pages/galeria/[slug].astro` para generar las páginas individuales.
2.  **Crear archivos de datos:** Se crearon los archivos `src/data/blog.json` y `src/data/gallery.json` para alojar el contenido del blog y la galería, solucionando el error de datos indefinidos.
3.  **Verificar la funcionalidad:** Se confirmó que las páginas dinámicas se generan correctamente, resolviendo todos los errores pendientes.

## Historial de cambios

### Implementación y Corrección de Rutas Dinámicas

**Plan:**

1.  **Refactorización a rutas dinámicas:** Se eliminó la lógica de renderizado del lado del cliente y se reemplazó por la generación de páginas estáticas en tiempo de compilación con `getStaticPaths`.
2.  **Creación de archivos de ruta `[slug].astro`:** Se añadieron los archivos `src/pages/blog/[slug].astro` y `src/pages/galeria/[slug].astro` que se habían omitido inicialmente.
3.  **Creación de fuentes de datos JSON:** Se crearon `src/data/blog.json` y `src/data/gallery.json` para proporcionar los datos necesarios a `getStaticPaths`, solucionando la causa raíz de los errores de compilación.

### Optimización SEO de la Página de Inicio

**Plan:**

1.  **Añadir metaetiquetas específicas:** Se han añadido un `title` y `meta description` únicos y descriptivos a la página de inicio (`src/pages/index.astro`) para mejorar su visibilidad en los motores de búsqueda.

### Solución del fallo de compilación (Imagen faltante)

**Plan:**

1.  **Diagnosticar el fallo de compilación:** La compilación fallaba debido a una imagen que falta en `src/pages/404.astro`.
2.  **Eliminar temporalmente la imagen:** Se eliminó la imagen de la página `404.astro` para desbloquear la compilación.

### Mejoras en la Interfaz de Usuario (Menú)

**Plan:**

1.  **Corregir parpadeo del menú móvil:** Se simplificó `MenuBar.astro`.
2.  **Añadir botón de cierre:** Se añadió un botón de cierre en `MobileMenu.astro`.
3.  **Ajustar layout del encabezado:** Se ajustó la posición del logotipo en `MenuBar.astro` para diferentes tamaños de pantalla.
4.  **Corregir fondo del menú móvil:** Se simplificaron y recrearon los componentes del encabezado.
5.  **Eliminar duplicación del menú:** Se refactorizó `Header.astro` para evitar el renderizado duplicado.

### Optimizaciones SEO y de Rendimiento

**Plan:**

1.  **Añadir datos estructurados `LocalBusiness`:** Se creó `src/components/StructuredData.astro`.
2.  **Activar `loading="lazy"`:** Se añadió la carga diferida a las imágenes.
3.  **Mejorar textos alternativos:** Se mejoró la accesibilidad de las imágenes.
