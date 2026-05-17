import { UrlsApi } from "../ts/urls";
import type { Blog } from "../types/Blog";

export async function getBlogs(): Promise<Blog[]> {
    try {
        const response = await fetch(UrlsApi.GET_BLOGS);

        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }

        const apiPosts = await response.json();

        // Aseguramos que la respuesta es un array
        if (!Array.isArray(apiPosts)) {
            console.error("La respuesta de la API de galerías no es un array.");
            return [];
        }
        const posts: Blog[] = apiPosts.map((post: any) => {
           return parseBlog(post);
        });
        return posts;

    } catch (error) {
        console.error("Fallo crítico al hacer fetch de las entradas del blog:", error);
        return [];
    }
}

// Helper function to parse a blog entry
function parseBlog(entry: any): Blog {
    const slug  = entry.id;
    const attributes  = entry.data;
    const pubDate = (attributes.pubDate ? new Date(attributes.pubDate) : new Date()).toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    return {
        slug: slug,
        title: attributes.title || 'Post sin título',
        description: attributes.description || 'Entrada del blog de misspitimini.',
        imgSrc: attributes.url || UrlsApi.DEFAULT_IMAGE,
        imgAlt: attributes.alt || 'Imagen del blog de mispitimini',
        author: attributes.author || 'Sara Laínez',
        pubDate: pubDate
    };
}
