# Blueprint: Sitio Web de Miss Pitimini

## Descripción General

Este proyecto es una aplicación web estática para un negocio de diseño floral llamado "Miss Pitimini", construido con Astro.js. El sitio muestra los servicios del negocio, incluyendo bodas, eventos, talleres y una galería de su trabajo. Está diseñado para ser de alto rendimiento, con un enfoque en un diseño atractivo y una gran experiencia de usuario.

## Estructura del Proyecto y Guía de Estilo

### Estructura
- **Páginas:** Ubicadas en `src/pages/`. Se utiliza el enrutamiento basado en archivos de Astro.
- **Componentes:** Ubicados en `src/components/`. Son componentes reutilizables de Astro.
- **Layouts:** Ubicados en `src/layouts/`. Diseños base para diferentes tipos de páginas.
- **Contenido:** Ubicado en `src/content/`. Colecciones de contenido para talleres, entradas de blog, etc.
- **Assets:** Ubicados en `src/assets/`. Imágenes, logotipos y otros activos estáticos.

### Estilo
- **Framework:** Tailwind CSS para un estilo basado en utilidades.
- **Fuentes:** Una combinación de serif (`font-serif`) y una fuente de visualización (`font-display`).
- **Paleta de Colores:**
    - Primario: Un tono de rojo (`red-600`).
    - Texto: `floral-dark` (un color oscuro personalizado), `gray-600`, `gray-900`.
    - Fondo: `white`, con algunos efectos de transparencia (`bg-white/95`).

### Funcionalidades Implementadas
- Página de inicio con un carrusel.
- Páginas para "Sobre mí", "Bodas", "Eventos", "Experiencias", "Galería" y "Contacto".
- Una sección de blog (actualmente vacía).
- Tarjetas de talleres dinámicas cargadas desde colecciones de contenido.
- Optimización de imágenes usando `astro:assets`.
- Se genera un mapa del sitio.
- Un formulario de solicitud de presupuesto para ramos.
- Despliegue en Firebase Hosting.

---

## Solicitud Actual: Publicar el sitio web

### Interpretación

El usuario ha solicitado "publique la versión actual del sitio web". Esto implica que el sitio web debe ser construido para generar los archivos estáticos y luego desplegado en Firebase Hosting. La solicitud anterior de "construir" una nueva funcionalidad fue cancelada por el usuario.

### Plan

1.  **Construir el proyecto:** Ejecutar `npm run build` para compilar la aplicación Astro en archivos estáticos.
2.  **Desplegar en Firebase:** Usar la herramienta `classic_firebase_hosting_deploy` para publicar el contenido de la carpeta `dist` en Firebase Hosting.
