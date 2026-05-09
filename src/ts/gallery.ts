import { getGalleries } from '@/ts/galleryAstro.ts';
import type { Gallery } from '@/types/Gallery';


async function renderGalleries() {

    const container = document.getElementById('gallery-container');
    const template = document.getElementById('card-gallery-template') as HTMLTemplateElement;
    
    if (!container || !template) {
      return;
    }
    try {
        const files: Gallery[] = await getGalleries();
        
        // Limpiamos el mensaje de "Cargando"
        container.innerHTML = '';
  
        files.forEach((post: Gallery) => {
          // Clonamos el molde
          const clone = template.content.cloneNode(true) as DocumentFragment;
  
          // Rellenamos con los datos del "data"
          const img = clone.querySelector('.card-img') as HTMLImageElement;
          const title = clone.querySelector('.card-title') as HTMLElement;
          const desc = clone.querySelector('.card-description') as HTMLElement;
          const link = clone.querySelector('.card-link') as HTMLAnchorElement;
          
          // Asignamos valores (con "fallbacks" por si falta algún dato)
          img.src = post.imgSrc;
          img.alt = post.imgAlt;
          
          if (title) title.textContent = post.title;
          if (desc) desc.textContent = post.description;
          if (link) link.href = post.link;
  
          // Añadimos el clon al contenedor
          container.appendChild(clone);
        });
      } catch (error) {
        console.error("Error cargando la galeria:", error);
        container.innerHTML = '<p>Lo sentimos, no se pudieron cargar las galerias.</p>';
      }
   
  }


// Ejecutar automáticamente cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', renderGalleries);


