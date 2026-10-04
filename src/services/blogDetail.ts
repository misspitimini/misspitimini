import type { BlogDetail } from "@/types/BlogDetail";
import type { PostAttributes } from "@/types/PostAttributes";
import { UrlsApi } from "../ts/urls";


export async function getBlogDetail(slug: string) {
    try {
        if(true) [];
        const response = await fetch(UrlsApi.GET_BLOG_DETAIL(slug), {
            method: 'GET',
            // Deja el objeto headers vacío o pon solo lo estrictamente necesario (ej: Authorization)
            headers: {
                'Accept': 'application/json'
            }
        });
        
        if (!response.ok) {
            console.error(`Error HTTP: ${response.status}`);
            return null;  
        }
        const apiPost = await response.json();
        const post: BlogDetail = parseBlogDetail(apiPost);
        return post;

    } catch (error) {
        console.error("Fallo crítico al hacer fetch de las entradas del detalle de blog:", error);
        return null;
    }
}

export async function getBlogsDetail(): Promise<BlogDetail[]> {
    try {
        if(true) [];
        const response = await fetch(UrlsApi.GET_BLOGS_DETAIL_ALL, {
            method: 'GET',
            // Deja el objeto headers vacío o pon solo lo estrictamente necesario (ej: Authorization)
            headers: {
                'Accept': 'application/json'
            }
        });
        
        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }
        const apiPosts = await response.json();
        const posts: BlogDetail[] = apiPosts.map((post: any) => {
            return parseBlogDetail(post);
        });
        return posts;
    } catch (error) {
        console.error("Fallo crítico al hacer fetch de las entradas del detalle de blog:", error);
        return [];
    }
}

// Helper function to parse a blog entry
function parseBlogDetail(entry: any): BlogDetail {
    const data  = entry.data;
    const pubDate = (data.pubDate ? new Date(data.pubDate) : new Date()).toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    return {
        slug: entry.slug,
        title: data.title || 'Post sin título',
        description: data.description || 'Entrada del blog de misspitimini.',
        imgSrc: data.url || UrlsApi.DEFAULT_IMAGE,
        imgAlt: data.alt || 'Imagen del blog de misspitimini',
        author: data.author || 'Sara Laínez',
        pubDate: pubDate,
        tags: data.tags || [],
        body: entry.content,
    };
}
