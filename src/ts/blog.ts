import { UrlsApi } from '@/ts/urls.ts';

interface BlogPost {
    id: string;
    data: {
        url?: string;
        alt?: string;
        title?: string;
        pubDate?: string;
        description?: string;
    };
}

async function renderBlogs() {

    const container = document.getElementById('blog-container');
    const template = document.getElementById('card-blog-template') as HTMLTemplateElement;
    
    if (!container || !template) {
      return;
    }

    try {
        const response = await fetch(UrlsApi.GET_BLOGS);
        const files: BlogPost[] = await response.json();
        debugger
        // Limpiamos el mensaje de "Cargando"
        container.innerHTML = '';
  
       files.forEach((post: BlogPost) => {

          const clone = template.content.cloneNode(true) as DocumentFragment;
          
          const img = clone.querySelector('.card-img') as HTMLImageElement | null;
          const title = clone.querySelector('.card-title');
          const desc = clone.querySelector('.card-description');
          const link = clone.querySelector('.card-link') as HTMLAnchorElement | null;
          const pubDate = clone.querySelector('.card-pub-date');
          
          if (img) {
              // Maneja tanto objetos de imagen de Astro como strings de URL
              const imgSrc = (post.data.url as any)?.src || post.data.url || UrlsApi.DEFAULT_IMAGE;
              img.src = imgSrc;
              img.alt = post.data.alt || 'Imagen del blog';
          }

          if (title) title.textContent = post.data.title || 'Sin título';
          if (desc) desc.textContent = post.data.description || '';
          if (link) link.href = `/detalleBlog?id=${post.id}`;
          if (pubDate)
          {
              pubDate.textContent =  (post.data.pubDate) ? new Date(post.data.pubDate ).toLocaleDateString('es-ES', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              }): '';
             
          } 

          container?.appendChild(clone);
      });
      } catch (error) {
        console.error("Error cargando el blog:", error);
        container.innerHTML = '<p>Lo sentimos, no se pudieron cargar los blogs.</p>';
      }
   
  }

// Ejecutar automáticamente cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', renderBlogs);