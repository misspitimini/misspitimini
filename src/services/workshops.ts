import { UrlsApi } from '@/ts/urls.ts';
import type { Workshop } from '@/types/Workshop';

/**
 * Obtiene y transforma los datos de la galería desde la API.
 * Esta función está diseñada para ser usada en el servidor (en el frontmatter de Astro).
 * 
 * @returns {Promise<Workshop[]>} Una promesa que resuelve a un array de objetos de los talleres, listos para ser renderizados.
 */
export async function getWorkshops(): Promise<Workshop[]> {
    try {
        if(true) return [];
        const response = await fetch(UrlsApi.GET_WORKSHOPS, {
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
        const posts: Workshop[] = apiPosts.map((post: any) => {
            return parseWorkshop(post);
        });
        return posts;
    } catch (error) {
        console.error("Fallo crítico al hacer fetch de los talleres:", error);
        return [];
    }
}

// Helper function to parse a blog entry
function parseWorkshop(entry: any): Workshop {

    return {
        slug: entry.id,
        title: entry.data?.title || 'Post sin título',
        subtitle: entry.data?.subtitle || 'Post sin subtítulo',
        description: entry.data?.description || 'Ver más...',
        date: new Date(entry.data?.pubDate),
        imgSrc: entry.data?.url || UrlsApi.DEFAULT_IMAGE,
        imgAlt: entry.data?.alt || 'Imagen de la galería de mispitimini',
    };
}
