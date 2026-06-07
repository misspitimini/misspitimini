import { getWorkshops } from '@/services/workshops';
import type { Workshop } from "@/types/Workshop";


async function renderWorkshops() {

  debugger
  const containerUpcomingWorkshops = document.getElementById('upcomingWorkshops-container');
  const containerPastWorkshops = document.getElementById('pastWorkshops-container');
    
  const templateUpcomingWorkshops = document.getElementById('card-upcomingWorkshops-template') as HTMLTemplateElement;
  const templatePastWorkshops = document.getElementById('card-pastWorkshops-template') as HTMLTemplateElement;

  if (!containerUpcomingWorkshops || !containerPastWorkshops || !templatePastWorkshops || !templateUpcomingWorkshops) {
      return;
  }

    const now = new Date();
    try {
        const files: Workshop[] = await getWorkshops();

        // Limpiamos el mensaje de "Cargando"
        containerUpcomingWorkshops.innerHTML = '';
        containerPastWorkshops.innerHTML = '';
  
        files.forEach((post: Workshop) => {

          if(document.getElementById(post.slug)!=null){
            return;
          }

          // Clonamos el molde
          const template= (post.date < now)?templatePastWorkshops: templateUpcomingWorkshops;
          const container = (post.date < now)?containerPastWorkshops: containerUpcomingWorkshops;

          const clone = template.content.cloneNode(true) as DocumentFragment;

          const img = clone.querySelector('.card-img') as HTMLImageElement;
          const title = clone.querySelector('.card-title') as HTMLElement;
          const subtitle = clone.querySelector('.card-subtitle') as HTMLElement;
          const date = clone.querySelector('.card-date') as HTMLElement;
          const desc = clone.querySelector('.card-description') as HTMLElement;
          
          img.src = post.imgSrc;
          img.alt = post.imgAlt;
          
          if (title) title.textContent = post.title;
          if (subtitle) subtitle.textContent = post.subtitle;
          const pubDate = (post.date).toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          });
          if (date) date.textContent = pubDate;  
          if (desc) desc.textContent = post.description;

          // Añadimos el clon al contenedor
          container.appendChild(clone);
        });
      } catch (error) {
        console.error("Error cargando la galeria:", error);
        containerUpcomingWorkshops.innerHTML = '<p>Lo sentimos, no se pudieron cargar los talleres.</p>';
        containerPastWorkshops.innerHTML = '<p>Lo sentimos, no se pudieron cargar los talleres.</p>';
      }
  }

// Ejecutar automáticamente cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', renderWorkshops);

