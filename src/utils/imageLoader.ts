import type { ImageMetadata } from 'astro';

// Import all possible images from both directories at once.
// Vite requires the glob pattern to be a static literal.
const weddingsImageModules = import.meta.glob<ImageMetadata>(
  '/src/assets/images/body/bodas/*.{jpeg,jpg,png,gif}',
  { import: 'default' }
);

const eventsImageModules = import.meta.glob<ImageMetadata>(
  '/src/assets/images/body/eventos/*.{jpeg,jpg,png,gif}',
  { import: 'default' }
);

// Organize the modules by category for easy access.
const modules = {
  weddings: {
    basePath: '/src/assets/images/body/bodas/',
    collection: weddingsImageModules,
  },
  events: {
    basePath: '/src/assets/images/body/eventos/',
    collection: eventsImageModules,
  },
};

export type ImageCategory = keyof typeof modules;

/**
 * A centralized and safe helper function to dynamically load an image module for a specific category.
 * @param category - The category of the image to load ('weddings' or 'events').
 * @param imageName - The name of the image file (e.g., 'novia.jpg').
 * @returns A promise that resolves to the image metadata or null if not found or on error.
 */
export async function loadImage(
  category: ImageCategory,
  imageName: string | undefined
): Promise<ImageMetadata | null> {
  if (!imageName) {
    // Silently return null if no image name is provided.
    return null;
  }

  const categoryModule = modules[category];
  const fullPath = `${categoryModule.basePath}${imageName}`;
  const loadImageModule = categoryModule.collection[fullPath];

  if (loadImageModule) {
    try {
      // Await the promise to get the image metadata and return it.
      return await loadImageModule();
    } catch (e) {
      console.error(`Error loading image module for: ${imageName} in category ${category}`, e);
      return null; // Return null on error to prevent crashes.
    }
  }
  
  // Warn if the image is referenced in the JSON but the file doesn't exist.
  console.warn(`Image module not found at path: ${fullPath}`);
  return null;
}
