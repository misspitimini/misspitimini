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
    *   Datos estructurados de `LocalBusiness` para mejorar el SEO local.

## Historial de cambios

### Optimización para SEO Local

**Solicitud:** la web menciona Madrid pero no hay Google Bussines Profile enlazado, no hay daots estructurados LocalBusiness

**Plan:**

1.  **Crear un componente para datos estructurados:** Se ha creado el componente `src/components/StructuredData.astro` para generar un script JSON-LD.
2.  **Definir el esquema `Florist`:** Se ha utilizado el esquema `Florist`, un tipo específico de `LocalBusiness`, para describir el negocio.
3.  **Añadir información del negocio:** Se ha incluido el nombre del negocio, número de teléfono, horario de apertura, dirección de correo electrónico, redes sociales (Facebook, TikTok, Instagram) y el área de servicio (Madrid), ya que es un negocio virtual.
4.  **Integrar en el layout principal:** El componente `StructuredData.astro` se ha añadido al `src/layouts/Layout.astro` para que los datos estructurados se incluyan en todas las páginas del sitio.

### Mejora del rendimiento con carga diferida de imágenes

**Solicitud:** no se observa loading ="lazy " explicito activalo en todas las imagenes

**Plan:**

1.  **Analizar los componentes con imágenes:** Identificar los componentes de Astro que renderizan imágenes.
2.  **Añadir `loading="lazy"` a las imágenes:**
    *   Modificar `src/components/misc/About.astro` para añadir `loading="lazy"` a la imagen de perfil.
    *   Modificar `src/components/header/Carrusel.astro` para cambiar `loading="eager"` por `loading="lazy"`.
    *   Modificar `src/components/gallery/GalleryCard.astro` para añadir `loading="lazy"` a las imágenes de la galería.
    *   Modificar `src/components/blog/BlogCard.astro` para añadir `loading="lazy"` a las imágenes del blog.

### Mejora de la accesibilidad de las imágenes

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
