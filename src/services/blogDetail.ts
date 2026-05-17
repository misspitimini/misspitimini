import type { BlogDetail } from "@/types/BlogDetail";
import type { PostAttributes } from "@/types/PostAttributes";
import { UrlsApi } from "../ts/urls";
import fm from 'front-matter';


export async function getBlogDetail(slug: string) {
    try {
        const response = await fetch(UrlsApi.GET_BLOGS_DETAIL(slug));
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
        const response = await fetch(UrlsApi.GET_BLOG_DETAIL_ALL);
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
    const slug  = entry.id;
    const content = entry.content;
    const { attributes, body } = fm(content) as { attributes: PostAttributes; body: string };
    const pubDate = (attributes.pubDate ? new Date(attributes.pubDate) : new Date()).toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    return {
        slug: slug,
        title: attributes.title || 'Post sin título',
        description: attributes.description || 'Entrada del blog de misspitimini.',
        imgSrc: attributes.image?.url || UrlsApi.DEFAULT_IMAGE,
        imgAlt: attributes.image?.alt || 'Imagen del blog de misspitimini',
        author: attributes.author || 'Sara Laínez',
        pubDate: pubDate,
        tags: attributes.tags || [],
        body: body,
    };
}