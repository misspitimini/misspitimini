import { contentGalleryDetail, getGalleryImages } from '@/services/galleryDetail';
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
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');
  if (!id) {
    console.error('[renderGalleryDetail] No gallery ID found in URL.');
    return;
  }
  try {
    const text:string = await contentGalleryDetail(id) as string;  
    const { attributes, body } = fm(text) as { attributes: PostAttributes; body: string };
    
    const contentEl = document.querySelector('.card-content');
    if (contentEl) {
      contentEl.innerHTML = await marked.parse(body);
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
  const params = new URLSearchParams(window.location.search);
  const id:string = params.get('id') as string;
  if (!id) {
    console.error('[fetchGalleryImages] No gallery ID found in URL.');
    return [];
  }
   return await getGalleryImages(id);        
}
