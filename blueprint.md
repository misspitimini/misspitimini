# Plan de Desarrollo: Solucionar Error 404 de Material Symbols

## 1. Objetivo

El objetivo de esta tarea es solucionar el error 404 que se produce al intentar cargar los iconos de "Material Symbols" en la página. Este error impide que los iconos se muestren correctamente, afectando a la experiencia de usuario.

## 2. Pasos a seguir

1.  **Identificar el origen del error:** Se ha detectado que el error se debe a la falta de la hoja de estilos de Material Symbols en la cabecera del sitio.
2.  **Añadir la hoja de estilos:** Se añadirá la hoja de estilos de Material Symbols en el archivo `src/components/head/MainHead.astro` para que los iconos se carguen correctamente.

## 3. Implementación

*   **Archivo:** `src/components/head/MainHead.astro`
*   **Código a añadir:**

```html
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0" />
```

## 4. Verificación

Una vez implementado el cambio, se verificará que los iconos se muestran correctamente en la página y que el error 404 ha desaparecido de la consola del navegador.
