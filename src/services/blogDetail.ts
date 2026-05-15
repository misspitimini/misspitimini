import type { BlogDetail } from "@/types/BlogDetail";
import type { PostAttributes } from "@/types/PostAttributes";
import { UrlsApi } from "../ts/urls";
import fm from 'front-matter';

/**
 * Retrieves a single blog post from the content collection by its slug.
 *
 * This function is the centralized service for fetching a single blog post's
 * data. It uses Astro's built-in `getEntry` function, which handles
 * finding, parsing, and preparing the content collection entry.
 *
 * @param slug The unique identifier (the file name without extension) for the blog post.
 * @returns A promise that resolves to the Astro content entry object for the given slug.
 *          The returned object includes:
 *          - `id`: The unique ID of the entry.
 *          - `slug`: The slug of the entry.
 *          - `body`: The raw, un-rendered body of the document.
 *          - `collection`: The name of the collection.
 *          - `data`: The parsed frontmatter from the Markdown file.
 *          - `render()`: A function to render the entry to HTML with an optional <Content /> component.
 *          If no entry is found for the given slug, Astro's `getEntry` will return `undefined`.
 */
export async function getBlogDetail(slug: string) {
  try {
    const response = await fetch(UrlsApi.GET_BLOGS_DETAIL(slug));

    if (!response.ok) {
      console.error(`Error HTTP: ${response.status}`);
      return null;  
    }
    const text = await response.text();
    const { attributes, body } = fm(text) as { attributes: PostAttributes; body: string };
    const pubDate = ((attributes.pubDate)? new Date(attributes.pubDate):  new Date()).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
    return {
      // Datos de la interfaz 'Blog' (base)
      title: attributes.title || 'Donde las flores se convierten en recuerdos', // O extraer del MD
      description: attributes.description ||'Entrada del blog de misspitimini.',
      slug: slug,
      imgSrc: attributes.image?.url || UrlsApi.DEFAULT_IMAGE,
      imgAlt: attributes.image?.alt || 'Imagen del blog de misspitimini',
      author: attributes.author || 'Sara Laínez',
      pubDate: pubDate,
      tags: attributes.tags || ['flores', 'recuerdos'], // O extraer del MD. ['flores', 'recuerdos'],
      body: body, // Aquí guardamos el contenido del .md
    } as BlogDetail;
} catch (error) {
    console.error("Fallo crítico al hacer fetch de las entradas del blog:", error);
    return null;
}
}
