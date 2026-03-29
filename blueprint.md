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

## Solicitud Actual: "construir"

### Interpretación

El usuario ha solicitado "construir". Dada la implementación exitosa anterior, esto se interpreta como una solicitud para crear una nueva funcionalidad. Basado en los fragmentos de código proporcionados relacionados con talleres y formularios de reserva, el plan es construir una página de reserva dedicada para los talleres.

### Plan

1.  **Crear Página de Reserva de Taller:** Crear una nueva página en `src/pages/solicita-presupuesto-taller.astro`. Esta página permitirá a los usuarios solicitar un presupuesto para un taller floral.
2.  **Crear Componente de Formulario de Reserva de Taller:** Crear un nuevo componente, `src/components/workshop/WorkshopBookingFormComponent.astro`, que contendrá los campos del formulario y la lógica para la solicitud de reserva del taller. Esto se adaptará del componente de reserva existente enfocado en ramos.
3.  **Actualizar la Página Principal de Talleres:** Agregar un botón "Reservar Taller" en la página `experiencias.astro` que enlace a la nueva página de reserva.
4.  **Verificación Final:** Ejecutar el proceso de construcción para asegurar que todos los cambios se integren correctamente y el sitio se construya sin errores.
