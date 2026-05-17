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
        const response = await fetch(UrlsApi.GET_GALLERIES, {
            method: 'GET',
            // Deja el objeto headers vacío o pon solo lo estrictamente necesario (ej: Authorization)
            headers: {
                'Accept': 'application/json' 
            }
        });

        // Si la respuesta de la API no es exitosa, devuelve un array vacío.
        if (!response.ok) {
            console.error(`Error al obtener las galerías. Status: ${response.status}`);
            return [];
        }

        const apiPosts = await response.json();

        // Aseguramos que la respuesta es un array
        if (!Array.isArray(apiPosts)) {
            console.error("La respuesta de la API de galerías no es un array.");
            return [];
        }

        // Transformamos los datos de la API a la estructura que necesitan los componentes.
        // Esto añade una capa de protección y consistencia.
        const posts: Gallery[] = apiPosts.map((post: any) => {
            return parseGallery(post);
        });
        return posts;
    } catch (error) {
        console.error("Fallo crítico al hacer fetch de las galerías:", error);
        return [];
    }
}

// Helper function to parse a blog entry
function parseGallery(entry: any): Gallery {
    return {
        slug: entry.id,
        title: entry.data?.title || 'Post sin título',
        description: entry.data?.description || 'Ver más...',
        imgSrc: entry.data?.url || UrlsApi.DEFAULT_IMAGE,
        imgAlt: entry.data?.alt || 'Imagen de la galería de mispitimini',
    };
}
