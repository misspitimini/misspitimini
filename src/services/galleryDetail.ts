import { UrlsApi } from '@/ts/urls.ts';


/**
 * Fetches and renders the markdown content (title and body) of the gallery.
 */
export async function contentGalleryDetail(id: string) {
  try {
    const res = await fetch(UrlsApi.GET_GALLERIES_DETAIL(id));
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    return await res.text();
  } catch (error) {
    console.error("[renderGalleryDetail] Failed:", error);
  }
}

/**
 * Fetches the list of images from the API and returns it.
 * @returns A promise that resolves with the array of images or an empty array on error.
 */
export async function getGalleryImages(id: string): Promise<{ url: string; name: string }[]> {

  try {
    const response = await fetch(UrlsApi.GET_GALLERY(id));
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    
    const imagesData = await response.json();
    return imagesData.images || [];
  } catch (error) {
    console.error("[fetchGalleryImages] Fetch failed:", error);
    return [];
  }
}
