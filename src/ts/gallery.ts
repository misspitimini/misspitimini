
import { UrlsApi } from '@/ts/urls.ts';

interface GalleryPost {
    id: string;
    data: {
        url?: string;
        alt?: string;
        title?: string;
        description?: string;
    };
}

async function renderGalleries() {

    const container = document.getElementById('gallery-container');
    const template = document.getElementById('card-gallery-template') as HTMLTemplateElement;
    
    if (!container || !template) {
      return;
    }
    try {
        const response = await fetch(UrlsApi.GET_GALLERIES);
        const files: GalleryPost[] = await response.json();
      
        // Limpiamos el mensaje de "Cargando"
        container.innerHTML = '';
  
        files.forEach((post: GalleryPost) => {
          // Clonamos el molde
          const clone = template.content.cloneNode(true) as DocumentFragment;
  
          // Rellenamos con los datos del "data"
          const img = clone.querySelector('.card-img') as HTMLImageElement;
          const title = clone.querySelector('.card-title') as HTMLElement;
          const desc = clone.querySelector('.card-description') as HTMLElement;
          const link = clone.querySelector('.card-link') as HTMLAnchorElement;
          
          // Asignamos valores (con "fallbacks" por si falta algún dato)
          if (img) {
            img.src = post.data.url || UrlsApi.DEFAULT_IMAGE;
            img.alt = post.data.alt || 'Imagen de la galería de Sara Laínez';
          }
          
          if (title) title.textContent = post.data.title || 'Post sin título';
          if (desc) desc.textContent = post.data.description || 'Haz clic para leer más...';
          // El link lleva a la página de detalle con el ID (slug)
          if (link) link.href = `/detalleGaleria?id=${post.id}`;
          container.appendChild(clone);
        });
      } catch (error) {
        console.error("Error cargando la galeria:", error);
        container.innerHTML = '<p>Lo sentimos, no se pudieron cargar las galerias.</p>';
      }
   
  }

// Ejecutar automáticamente cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', renderGalleries);
