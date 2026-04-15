import type { ImageMetadata } from 'astro';
import { getCollection } from 'astro:content';
import path from 'path';

export async function getWorkshops() {
  // Search for images in all subdirectories
  const allWorkshopImages = import.meta.glob<{ default: ImageMetadata }>('/src/assets/images/**/*.{jpeg,jpg,png,gif,webp}');

  const workshopEntries = await getCollection('workshops');

  const workshops = await Promise.all(
    workshopEntries.map(async (workshop) => {
      const { data } = workshop;
      const slug = data.image;

      // Find the full path of the image that has the exact same name as the slug
      const imagePath = Object.keys(allWorkshopImages).find(fullPath => path.basename(fullPath) === slug);

      if (!imagePath) {
        throw new Error(`Image not found for workshop: \"${data.title4}\" with slug: \"${slug}\". Searched in all subdirectories of /src/assets/images/`);
      }

      const { default: image } = await allWorkshopImages[imagePath]();

      return {
        img: image,
        imgAlt: data.imgAlt,
        title4: data.title4,
        title5: data.title5,
        description: data.description
      };
    })
  );

  return workshops;
}
