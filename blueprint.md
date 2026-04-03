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

## Plan actual

**Solicitud:** Solucionar el error "Resource exhausted" y estabilizar el entorno de desarrollo.

**Diagnóstico Final:** El error "Resource exhausted" se debe a que los Términos de Servicio de Gemini en Firebase no han sido aceptados para el proyecto `misspitimini-23c91`. Esto está causando inestabilidad en el entorno y limitando las solicitudes a la API.

**Solución (Requiere acción manual):**

1.  **Acceder a la Consola de Firebase:** El usuario debe navegar a la [Consola de Firebase](https://console.firebase.google.com/project/misspitimini-23c91).
2.  **Habilitar Gemini y Aceptar los Términos:** El usuario debe buscar una opción para habilitar Gemini o acceder a una de sus funciones, lo que le pedirá que acepte los Términos de Servicio.
3.  **Verificar el entorno:** Una vez aceptados los términos, el problema debería resolverse.

## Historial de cambios

### Solución del fallo de compilación (Imagen faltante)

**Plan:**

1.  **Diagnosticar el fallo de compilación:** La compilación fallaba debido a una imagen que falta en `src/pages/404.astro`.
2.  **Eliminar temporalmente la imagen:** Se eliminó la imagen de la página `404.astro` para desbloquear la compilación.
3.  **Construir y desplegar:** El proyecto se compiló y desplegó con éxito en Firebase Hosting.

### Corrección del parpadeo en el menú móvil

**Solicitud:** en mobile, al cliquear para desplegar el menú, aparece un destello de la X. ¿se puede mejorar?

**Plan:**

1.  **Simplificar `MenuBar.astro`:** Se ha eliminado el icono "X" del botón del menú principal para evitar un parpadeo visual al abrir el menú móvil.

### Añadir botón de cierre al menú móvil

**Solicitud:** en mobile cuando se despliega el menú falta el X para cancelar o cerrar

**Plan:**

1.  **Modificar `MobileMenu.astro`:** Se ha añadido un botón con un icono "X" en la esquina superior derecha del componente del menú móvil.

### Ajuste final del layout del encabezado (Logotipo a la izquierda)

**Solicitud:** perdón, me he confundido el logotipo en no mobile debería estar a la izquierda en vez de a la derecha.

**Plan:**

1.  **Reorganizar `MenuBar.astro`:** Se ha modificado `src/components/header/MenuBar.astro` para colocar el logotipo a la izquierda.

### Ajuste del layout del encabezado (Logotipo a la derecha)

**Solicitud:** el logotipo en no mobile debeería estar en la derecha

**Plan:**

1.  **Refinar el layout del `MenuBar.astro`:** Se modificó `src/components/header/MenuBar.astro` para asegurar que el logotipo esté a la derecha en escritorios.

### Centrado del logotipo en móvil

**Solicitud:** el logotipo el mobile dedería estra centado

**Plan:**

1.  **Ajustar el layout del `MenuBar.astro`:** Se modificó `src/components/header/MenuBar.astro` para centrar el logotipo en móviles.

### Corrección del fondo del menú móvil

**Solicitud:** el menú despelgable aparece sin fondo

**Plan:**

1.  **Recrear y simplificar componentes:** Se crearon y modificaron `MobileMenu.astro`, `MenuBar.astro` y `Header.astro`.

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

1.  **Mejorar textos alternativos:** Se han mejorado los textos alternativos en varios componentes.
