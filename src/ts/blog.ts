import { getBlogs } from '@/services/blog';
import type { Blog } from '@/types/Blog';
import { slugify } from "@/ts/utils.ts";


async function renderPosts() {

    const container = document.getElementById('blog-container');
    const template = document.getElementById('card-blog-template') as HTMLTemplateElement;
    
    if (!container || !template) {
      return;
    }
    
    try {
        const files: Blog[] = await getBlogs();
        debugger
        container.innerHTML = '';
  
        files.forEach((post: Blog) => {

          if(document.getElementById(post.slug)!=null){
            return;
          }
          const clone = template.content.cloneNode(true) as DocumentFragment;
  
          const img = clone.querySelector('.card-img') as HTMLImageElement;
          const title = clone.querySelector('.card-title') as HTMLElement;
          const desc = clone.querySelector('.card-description') as HTMLElement;
          const link = clone.querySelector('.card-link') as HTMLAnchorElement;
          const pureDate = clone.querySelector('.card-pub-date') as HTMLAnchorElement;
          
          
          img.src = post.imgSrc;
          img.alt = post.imgAlt;
          
          if (title) title.textContent = post.title;
          if (desc) desc.textContent = post.description;
          
          if (link) link.href = `/detalleBlog?id=${post.slug}`;
          if (pureDate) pureDate.textContent = post.pubDate;
          container.appendChild(clone);
        });
      } catch (error) {
        console.error("Error cargando el blog:", error);
        container.innerHTML = '<p>Lo sentimos, no se pudieron cargar las entradas del blog.</p>';
      }
  }

document.addEventListener('DOMContentLoaded', renderPosts);
