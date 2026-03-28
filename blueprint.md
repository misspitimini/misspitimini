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

## Plan Actual: Corrección de Errores y Advertencias

El plan inmediato se centró en estabilizar el proyecto, solucionando errores de build y advertencias para asegurar un estado funcional y limpio.

1.  **Identificación de Rutas de Imágenes Rotas:** Se detectó que varias imágenes no se mostraban correctamente debido a rutas incorrectas en los componentes y archivos de contenido.
2.  **Corrección de Rutas en Componentes:** Se actualizaron los `import` en los archivos `.astro` (`WorkshopsComponent.astro`, `EventsComponent.astro`) para apuntar a la ubicación correcta de las imágenes.
3.  **Corrección de Rutas en Archivos de Contenido:** Se modificó `src/content/events.json` para que la ruta de la imagen fuera la correcta.
4.  **Habilitación de Componentes:** Se descomentó el código en `WorkshopsComponent.astro` para mostrar la lista de talleres disponibles, utilizando las imágenes ahora corregidas.
5.  **Resolución de Advertencia de Build (Blog Vacío):** El proceso de build mostraba una advertencia porque la colección de contenido "blog" estaba vacía. Se añadió un archivo `.gitkeep` en el directorio `src/content/blog` para silenciar la advertencia y señalar la intención de usar ese directorio en el futuro.
6.  **Verificación del Build:** Se ejecutó `npm run build` repetidamente para confirmar que todos los errores se habían solucionado y que el proyecto se compilaba correctamente sin fallos.

El proyecto se encuentra ahora en un estado estable y funcional, sin errores de compilación ni advertencias críticas.
