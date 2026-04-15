import { UrlsApi } from '@/ts/urls.ts';

interface BlogPost {
    id: string;
    data: {
        url?: string;
        alt?: string;
        title?: string;
        description?: string;
    };
}

async function renderBlogs() {

    const container = document.getElementById('blog-container');
    const template = document.getElementById('card-blog-template') as HTMLTemplateElement;
    
    try {
        const response = await fetch(UrlsApi.GET_BLOGS);
        const files: BlogPost[] = await response.json();
  
        // Limpiamos el mensaje de "Cargando"
        container.innerHTML = '';
  
        files.forEach((post: BlogPost) => {
          // Clonamos el molde
          const clone = template.content.cloneNode(true).firstElementChild as HTMLElement;
          
          // Rellenamos con los datos del "data"
          const img = clone.querySelector('.card-img') as HTMLImageElement;
          const title = clone.querySelector('.card-title') as HTMLElement;
          const desc = clone.querySelector('.card-description') as HTMLElement;
          const link = clone.querySelector('.card-link') as HTMLAnchorElement;
  
          // Asignamos valores (con "fallbacks" por si falta algún dato)
          if (img) {
            img.src = post.data.url || UrlsApi.DEFAULT_IMAGE;
            img.alt = post.data.alt || 'Imagen de una publicación del blog de Sara Laínez';
          }
          if (title) {
            title.textContent = post.data.title || 'Post sin título';
          }
          if (desc) {
            desc.textContent = post.data.description || 'Haz clic para leer más...';
          }
          if (link) {
            // El link lleva a la página de detalle con el ID (slug)
            link.href = `/detalleBlog?id=${post.id}`;
          }
  
          container.appendChild(clone);
        });
      } catch (error) {
        console.error("Error cargando el blog:", error);
        container.innerHTML = '<p>Lo sentimos, no se pudieron cargar los blogs.</p>';
      }
   
  }

// Ejecutar automáticamente cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', renderBlogs);