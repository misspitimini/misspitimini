
import { getCollection, type CollectionEntry } from 'astro:content';

export async function getBlogPosts(): Promise<CollectionEntry<"blog">[]> {
  const posts = await getCollection('blog');
  
  // Ordena los posts por fecha de publicación, del más reciente al más antiguo
  const sortedPosts = posts.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
  
  return sortedPosts;
}
