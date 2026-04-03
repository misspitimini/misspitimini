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

### Corrección del parpadeo en el menú móvil

**Solicitud:** en mobile, al cliquear para desplegar el menú, aparece un destello de la X. ¿se puede mejorar?

**Plan:**

1.  **Simplificar `MenuBar.astro`:** Se ha eliminado el icono "X" del botón del menú principal para evitar un parpadeo visual al abrir el menú móvil. Ahora, el botón solo muestra el icono de hamburguesa y su única función es abrir el menú, mientras que el cierre se gestiona desde dentro del propio menú desplegado.

### Añadir botón de cierre al menú móvil

**Solicitud:** en mobile cuando se despliega el menú falta el X para cancelar o cerrar

**Plan:**

1.  **Modificar `MobileMenu.astro`:** Se ha añadido un botón con un icono "X" en la esquina superior derecha del componente del menú móvil. Este botón permite a los usuarios cerrar el menú de forma explícita, mejorando la usabilidad en dispositivos móviles.

### Ajuste final del layout del encabezado (Logotipo a la izquierda)

**Solicitud:** perdón, me he confundido el logotipo en no mobile debería estar a la izquierda en vez de a la derecha.

**Plan:**

1.  **Reorganizar `MenuBar.astro`:** Se ha modificado `src/components/header/MenuBar.astro` para colocar el logotipo a la izquierda y el menú de navegación a la derecha en la vista de escritorio.

### Ajuste del layout del encabezado (Logotipo a la derecha)

**Solicitud:** el logotipo en no mobile debeería estar en la derecha

**Plan:**

1.  **Refinar el layout del `MenuBar.astro`:** Se modificó el archivo `src/components/header/MenuBar.astro` para asegurar que el logotipo esté a la derecha en escritorios y centrado en móviles.

### Centrado del logotipo en móvil

**Solicitud:** el logotipo el mobile dedería estra centado

**Plan:**

1.  **Ajustar el layout del `MenuBar.astro`:** Se modificó el archivo `src/components/header/MenuBar.astro` para utilizar un layout de flexbox equilibrado, manteniendo el logotipo centrado en dispositivos móviles.

### Corrección del fondo del menú móvil

**Solicitud:** el menú despelgable aparece sin fondo

**Plan:**

1.  **Recrear el componente de menú móvil:** Se creó `src/components/header/MobileMenu.astro`.
2.  **Simplificar y orquestar desde el encabezado principal:** Se modificaron `MenuBar.astro` y `Header.astro`.

### Corrección de la duplicación del menú de navegación

**Solicitud:** con respecto a la arquitectura de navegación se muestran la repetición de dos menús en el html (duplicado en el contenido extraido) esto puede confundir a google y aumentar el peso del DOM. Revisa el menú que no esté renderizado dos veces.

**Plan:**

1.  **Analizar y refactorizar `Header.astro`:** Se eliminó el renderizado duplicado del menú.

### Optimización para SEO Local

**Solicitud:** la web menciona Madrid pero no hay Google Bussines Profile enlazado, no hay daots estructurados LocalBusiness

**Plan:**

1.  **Crear e integrar un componente de datos estructurados `LocalBusiness`:** Se añadió `src/components/StructuredData.astro` al layout principal.

### Mejora del rendimiento con carga diferida de imágenes

**Solicitud:** no se observa loading ="lazy " explicito activalo en todas las imagenes

**Plan:**

1.  **Añadir `loading="lazy"` a las imágenes:** Se ha añadido el atributo a los componentes con imágenes.

### Mejora de la accesibilidad de las imágenes

**Solicitud:** Mejorar la accesibilidad de las imágenes del sitio web añadiendo textos alternativos (alt text) descriptivos.

**Plan:**

1.  **Mejorar textos alternativos:** Se han mejorado los textos alternativos en varios componentes y se han hecho recomendaciones para el contenido dinámico.
