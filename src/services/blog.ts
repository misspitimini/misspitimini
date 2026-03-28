
import { getCollection } from 'astro:content';

export async function getBlogPosts() {
  const posts = await getCollection('blog');
  // Aquí podrías añadir lógica de ordenación, filtrado, etc. en el futuro.
  // Por ejemplo: return posts.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
  return posts;
}
