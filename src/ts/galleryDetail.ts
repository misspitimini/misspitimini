import { UrlsApi } from '@/ts/urls.ts';
import fm from 'front-matter';
import { marked } from 'marked';

interface PostAttributes {
  title?: string;
  description?: string;
}

/**
 * Fetches and renders the markdown content (title and body) of the gallery.
 */
export async function renderGalleryDetail() {
  console.log('[renderGalleryDetail] Starting...');
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');
  if (!id) {
    console.error('[renderGalleryDetail] No gallery ID found in URL.');
    return;
  }
  console.log(`[renderGalleryDetail] Found ID: ${id}`);

  try {
    const res = await fetch(UrlsApi.GET_GALLERIES_DETAIL.replace("${id}", id));
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    const text = await res.text();
    const { attributes, body } = fm(text) as { attributes: PostAttributes; body: string };
    
    const contentEl = document.querySelector('.card-content');
    if (contentEl) {
      contentEl.innerHTML = await marked.parse(body);
      console.log('[renderGalleryDetail] Content rendered successfully.');
    } else {
      console.error('[renderGalleryDetail] Content element not found.');
    }
    // Note: Title is now handled reactively by Alpine, so we don't set it here.

  } catch (error) {
    console.error("[renderGalleryDetail] Failed:", error);
  }
}

/**
 * Fetches the list of images from the API and returns it.
 * @returns A promise that resolves with the array of images or an empty array on error.
 */
export async function fetchGalleryImages(): Promise<{ url: string; name: string }[]> {
  console.log('[fetchGalleryImages] Starting...');
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');
  if (!id) {
    console.error('[fetchGalleryImages] No gallery ID found in URL.');
    return [];
  }
  console.log(`[fetchGalleryImages] Found ID: ${id}`);

  try {
    const fetchUrl = UrlsApi.GET_GALLERY.replace("${id}", id);
    console.log(`[fetchGalleryImages] Fetching from URL: ${fetchUrl}`);

    const response = await fetch(fetchUrl);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    
    const imagesData = await response.json();
    console.log('[fetchGalleryImages] Successfully fetched data:', imagesData);

    return imagesData.images || [];
  } catch (error) {
    console.error("[fetchGalleryImages] Fetch failed:", error);
    return [];
  }
}
