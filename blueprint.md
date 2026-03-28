# Visión General del Proyecto

Este proyecto es una aplicación web de static-first construida con Astro.js y diseñada para ser desarrollada en Firebase Studio. El objetivo es crear un sitio rápido, de alto rendimiento y escalable, que ofrezca un mínimo de JavaScript por defecto para garantizar una experiencia de usuario excepcional y unos Core Web Vitals de primer nivel.

## Arquitectura y Organización

Para asegurar la escalabilidad y mantenibilidad del proyecto, se ha adoptado la siguiente estructura de directorios y organización del código:

- **`src/content/`**: Almacena contenido en formato Markdown (`.md`) o JSON (`.json`). Esto separa los datos de la presentación, permitiendo que los componentes de Astro lean y muestren información de manera dinámica. Es ideal para posts de blog, detalles de eventos, o cualquier texto que pueda necesitar ser actualizado frecuentemente.

- **`src/components/`**: Contiene todos los componentes de Astro y UI frameworks, organizados de forma granular:
    - **`ui/`**: Para elementos pequeños y atómicos de la interfaz (botones, tarjetas, iconos).
    - **`sections/`**: Para componentes más grandes que representan secciones completas de una página (ej. una sección de "Eventos Destacados").
    - **`patterns/`**: Para componentes complejos que combinan varios elementos de UI para formar un patrón recurrente (ej. una barra de navegación con menú desplegable).
    - **`header/`**: Componentes específicos de la cabecera del sitio.

- **`src/layouts/`**: Define la estructura de las páginas (ej. `BaseLayout.astro`), incluyendo el `head`, la navegación y el pie de página.

- **`src/data/`**: Centraliza archivos de datos compartidos (no de contenido), como configuraciones, listas para navegación, o datos para componentes específicos (ej. `carruselData.js`).

- **`src/styles/`**: Gestiona los estilos del proyecto:
    - **`global.css`**: Para estilos base, reseteos, variables CSS y fuentes.
    - **Tailwind CSS**: Es el framework principal para estilos de utilidad.
    - **Estilos por Componente (`<style>` en Astro)**: Se usan para estilos específicos que no encajan bien con el enfoque de Tailwind.

## Resumen del Proyecto

El proyecto es el sitio web para la floristería "Sara Laínez", mostrando sus productos, servicios, talleres y blog.

### Estilo y Diseño

- **Paleta de colores:** Tonos rosados, blancos y grises para una estética elegante.
- **Tipografía:** Fuentes display para títulos y de cuerpo para texto.
- **Iconografía:** Iconos SVG personalizados.
- **Imágenes:** Fotografías de alta calidad de arreglos florales.

### Características Implementadas

- **Carrusel de Imágenes/Páginas:** Componente interactivo en la cabecera para navegar entre las secciones principales.
- **Navegación Móvil y de Escritorio:** Menú adaptable a diferentes tamaños de pantalla.
- **Componentes Reutilizables:** Tarjetas para ramos, experiencias y posts de blog.
- **Centralización de Datos:** La información del carrusel se gestiona desde `src/data/`.
- **Visualización de Talleres:** Las tarjetas de los talleres ahora se muestran correctamente en la página de experiencias.
- **Corrección de Rutas de Imágenes:** Se han solucionado todas las rutas de imágenes rotas, asegurando que se visualicen correctamente en todo el sitio.
- **Optimización de Imágenes:** Se ha añadido la propiedad `format='webp'` a todos los componentes `Image` para asegurar una correcta optimización y renderizado en producción.

## Plan Actual: Corrección de Propiedad `format` en Imágenes

El objetivo de esta actualización es resolver un error de renderizado en producción causado por la ausencia de la propiedad `format` en varios componentes `Image` de Astro. Aunque las imágenes se mostraban correctamente en el entorno de desarrollo, el build de producción fallaba al no poder optimizarlas sin un formato explícito.

1.  **Identificación del Error:** Se detectó que múltiples componentes que utilizan `astro:assets` para la gestión de imágenes (como `HomeComponentFirst.astro`, `HomeComponentHero.astro`, `HomeComponentSecond.astro`, y otros) no especificaban la propiedad `format`.
2.  **Análisis Sistemático:** Se realizó una revisión exhaustiva de todos los archivos `.astro` dentro del directorio `src/components/` para localizar cada instancia del componente `Image`.
3.  **Corrección de Componentes:** En cada archivo afectado, se añadió `format='webp'` al componente `Image`. Esta acción instruye a Astro para que convierta y optimice las imágenes a formato WebP durante el proceso de build, mejorando el rendimiento y solucionando el error.
4.  **Verificación Final:** Se comprobó que todos los componentes de imagen ahora incluyen la propiedad `format`, asegurando que el build de producción se complete sin errores y que las imágenes se carguen de manera eficiente.

Con esta corrección, el proyecto vuelve a estar en un estado completamente funcional y optimizado para producción.
