
import type { ImageMetadata } from 'astro';
import nextWorkshop from '@/content/nextworkshop/proxima-experiencia.json';
import path from 'path';

export interface NextWorkshopData {
  imgAlt: string;
  date: string;
  title4: string;
  title5: string;
  description: string;
  imageSrc: ImageMetadata;
}

const allWorkshopImages = import.meta.glob<{ default: ImageMetadata }>('/src/assets/images/**/*.{jpeg,jpg,png,gif,webp}');

export async function getNextWorkshop(): Promise<NextWorkshopData | null> {
  if (!nextWorkshop) {
    console.error("Could not load the data from proxima-experiencia.json");
    return null;
  }

  const imageFileName = nextWorkshop.image;
  const imagePath = Object.keys(allWorkshopImages).find(fullPath => path.basename(fullPath) === imageFileName);

  if (!imagePath) {
    console.error(`Image with filename "${imageFileName}" not found in any subdirectory of /src/assets/images/. Check the image name in proxima-experiencia.json.`);
    return null;
  }

  const { default: imageSrc } = await allWorkshopImages[imagePath]();

  return {
    imgAlt: nextWorkshop.imgAlt,
    date: nextWorkshop.date,
    title4: nextWorkshop.title4,
    title5: nextWorkshop.title5,
    description: nextWorkshop.description,
    imageSrc,
  };
}
