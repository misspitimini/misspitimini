import { UrlsApi } from '@/ts/urls.ts';
import type { Workshop } from '@/types/Workshop';
import { getCollection } from 'astro:content';

/**
 * Obtiene y transforma los datos de la galería desde la API.
 * Esta función está diseñada para ser usada en el servidor (en el frontmatter de Astro).
 * 
 * @returns {Promise<Workshop[]>} Una promesa que resuelve a un array de objetos de los talleres, listos para ser renderizados.
 */
export async function getWorkshops(): Promise<Workshop[]> {
    try {
        /*
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
        */
       
        const tallerFiles = await getCollection('nextworkshop');

        const posts: Workshop[] = tallerFiles.map((post: any) => {
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
        slug: entry.slug,
        imgSrc: entry.data?.imgSrc || UrlsApi.DEFAULT_IMAGE,
        imgAlt: entry.data?.imgAlt || 'Imagen de la galería de mispitimini',
        pubDate: entry.data?.pubDate || '',
        dateText: entry.data?.dateText || '',
        hour: entry.data?.hour || '',
        title:  entry.data?.title || '',
        sumary: {
          duration: entry.data?.sumary?.duration || '',
          materials: entry.data?.sumary?.materials || '',
          experiences: entry.data?.sumary?.experiences || '',
          price: entry.data?.sumary?.price || '',
          location: entry.data?.sumary?.location || '',
          capacity: entry.data?.sumary?.capacity || ''
        },
        pompadour: entry.data?.pompadour || '',
        content: entry.body || '',
        tags: entry.data?.tags || []
      };
}
