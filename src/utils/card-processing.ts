import { getCollection, type CollectionEntry } from 'astro:content';
import type { ImageMetadata } from 'astro';

// Standardize glob import to be used server-side
const images = import.meta.glob<{ default: ImageMetadata }>('/src/assets/images/carrusel/*.{jpeg,jpg,png,gif}');

// Define the shape of the card data from the collection
type HomeCardCollectionData = CollectionEntry<'homecards'>['data'];

// Define the final shape of the card data returned by the function
export type HomeCardData = HomeCardCollectionData & {
  imgSrc: ImageMetadata | null;
};

/**
 * Fetches and processes home cards from the content collection.
 * This function is designed to be run on the server-side, within Astro's frontmatter.
 * @param {string[]} [filterIds] - Optional array of card IDs to fetch.
 * @returns {Promise<HomeCardData[]>} Processed card data with image sources.
 */
export async function processHomeCards(filterIds?: string[]): Promise<HomeCardData[]> {
  const homeCardsData = await getCollection('homecards', ({ id }: CollectionEntry<'homecards'>) => {
    // Excluir 'taller01' en cualquier caso
    if (id === 'taller01') return false;

    if (!filterIds) return true; // Return all if no filter is provided
    return filterIds.includes(id);
  });

  return Promise.all(
    homeCardsData.map(async (card) => {
      const imagePath = `/src/assets/images/carrusel/${card.data.img_slug}.jpg`;
      let imgSrc: ImageMetadata | null = null;

      if (images[imagePath]) {
        const imageModule = await images[imagePath]();
        imgSrc = imageModule.default;
      } else {
        console.warn(`Image not found for slug: ${card.data.img_slug}`);
      }

      return {
        ...card.data,
        imgSrc,
      };
    })
  );
}
