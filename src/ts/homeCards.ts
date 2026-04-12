import { getCollection } from 'astro:content';

const images = import.meta.glob<ImageMetadata>('/src/assets/images/carrusel/*.{jpeg,jpg,png,gif}');

/**
 * Fetches and processes home cards from the content collection.
 * @param {string[]} [filterIds] - Optional array of card IDs to fetch.
 * @returns {Promise<any[]>} Processed card data with image sources.
 */
export async function getHomeCards(filterIds?: string[]): Promise<any[]> {
  const homeCardsData = await getCollection('homecards', ({ id }) => {
    if (!filterIds) return true; // Return all if no filter is provided
    return filterIds.includes(id);
  });

  const homeCards = await Promise.all(
    homeCardsData.map(async (card) => {
      const imagePath = `/src/assets/images/carrusel/${card.data.img_slug}.jpg`;
      if (!images[imagePath]) {
        console.warn(`Image not found for slug: ${card.data.img_slug}`);
        return {
          ...card.data,
          imgSrc: null, // or a placeholder path
        };
      }
      const imgSrc = (await images[imagePath]()).default;
      return {
        ...card.data,
        imgSrc,
      };
    })
  );

  return homeCards;
}
