import type { ImageMetadata } from 'astro';
// 1. Correct the import path to the actual file location.
import nextWorkshop from '@/content/nextworkshop/proxima-experiencia.json';

// Define the structure of the data returned by our function
export interface NextWorkshopData {
  imgAlt: string;
  date: string;
  title4: string;
  title5: string;
  description: string;
  imageSrc: ImageMetadata;
}

// A glob import to get all possible workshop images
const allWorkshopImages = import.meta.glob<{ default: ImageMetadata }>('/src/assets/images/**/*.{jpeg,jpg,png,gif,webp}');

/**
 * Loads the specific upcoming workshop from its JSON data file,
 * loads its associated image, and returns all necessary data.
 * @returns {Promise<NextWorkshopData | null>} - A promise that resolves to the next workshop data or null if not found.
 */
export async function getNextWorkshop(): Promise<NextWorkshopData | null> {
  // 2. The logic is simplified: we directly use the imported object, no need to sort or find.
  if (!nextWorkshop) {
    console.error("Could not load the data from proxima-experiencia.json");
    return null;
  }

  // Construct the image path and check if it exists
  const imagePath = `/src/assets/images/body/experiencias/${nextWorkshop.image}`;
  if (!allWorkshopImages[imagePath]) {
    console.error(`Image not found: ${imagePath}. Check the image name in proxima-experiencia.json.`);
    return null;
  }

  // Load the image module
  const { default: imageSrc } = await allWorkshopImages[imagePath]();

  // Return all the data needed by the component
  return {
    imgAlt: nextWorkshop.imgAlt,
    date: nextWorkshop.date,
    title4: nextWorkshop.title4,
    title5: nextWorkshop.title5,
    description: nextWorkshop.description,
    imageSrc,
  };
}
