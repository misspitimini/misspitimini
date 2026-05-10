import { UrlsApi } from '@/ts/urls.ts';
import type { Gallery } from '@/types/Gallery';

/**
 * Obtiene y transforma los datos de la galería desde la API.
 * Esta función está diseñada para ser usada en el servidor (en el frontmatter de Astro).
 * 
 * @returns {Promise<Gallery[]>} Una promesa que resuelve a un array de objetos de la galería, listos para ser renderizados.
 */
export async function getGalleries(): Promise<Gallery[]> {
    try {
        const response = await fetch(UrlsApi.GET_GALLERIES);

        // Si la respuesta de la API no es exitosa, devuelve un array vacío.
        if (!response.ok) {
            console.error(`Error al obtener las galerías. Status: ${response.status}`);
            return [];
        }

        const apiGalleries = await response.json();

        // Aseguramos que la respuesta es un array
        if (!Array.isArray(apiGalleries)) {
            console.error("La respuesta de la API de galerías no es un array.");
            return [];
        }

        // Transformamos los datos de la API a la estructura que necesitan los componentes.
        // Esto añade una capa de protección y consistencia.
        const galleries: Gallery[] = apiGalleries.map((post: any) => ({
            imgSrc: post?.data?.url || UrlsApi.DEFAULT_IMAGE,
            imgAlt: post?.data?.alt || 'Imagen de la galería de mispitimini',
            slug: post?.id,
            title: post?.data?.title || 'Post sin título',
            description: post?.data?.description || 'Ver más...',

        }));

        return galleries;

    } catch (error) {
        console.error("Fallo crítico al hacer fetch de las galerías:", error);
        // En caso de un fallo total (ej. la red), devolvemos un array vacío para evitar que la página se rompa.
        return [];
    }
}
