import { UrlsApi } from "../ts/urls";
import type { Blog } from "../types/Blog";

export async function getBlogs(): Promise<Blog[]> {
    try {
        const response = await fetch(UrlsApi.GET_BLOGS);

        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }

        const apiPosts = await response.json();
        const posts: Blog[] = apiPosts.map((post: any) => {
            return {
                title: post.data.title || 'Post sin título',
                description: post.data.description || 'Ver más...',
                slug: post.id,
                imgSrc: post.data.url || UrlsApi.DEFAULT_IMAGE,
                imgAlt: post.data.alt || 'Imagen del blog de mispitimini',
                author: post.data.author || 'Sara Laínez',
                pubDate: new Date(post.data.pubDate).toLocaleDateString('es-ES', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                })
            };
        });

        return posts;

    } catch (error) {
        console.error("Fallo crítico al hacer fetch de las entradas del blog:", error);
        return [];
    }
}
