import { UrlsApi } from './urls.js';

async function renderGalleries() {

    const container = document.getElementById('gallery-container');
    const template = document.getElementById('card-gallery-template');
    
    try {
        const response = await fetch(UrlsApi.GET_GALLERIES);
        const files = await response.json();
  
        // Limpiamos el mensaje de "Cargando"
        container.innerHTML = '';
  
        files.forEach(post => {
          // Clonamos el molde
          const clone = template.content.cloneNode(true);
  
          // Rellenamos con los datos del "data" que extrae tu PHP
          const img = clone.querySelector('.card-img');
          const title = clone.querySelector('.card-title');
          const desc = clone.querySelector('.card-description');
          const link = clone.querySelector('.card-link');
  
          // Asignamos valores (con "fallbacks" por si falta algún dato en el .md)
          img.src = post.data.url || UrlsApi.DEFAULT_IMAGE;
          img.alt = post.data.alt || 'Post sin título';
          title.textContent = post.data.title || 'Post sin título';
          desc.textContent = post.data.description || 'Haz clic para leer más...';
          
          // El link lleva a la página de detalle con el ID (slug)
          link.href = `/detalleGaleria?id=${post.id}`;
  
          container.appendChild(clone);
        });
      } catch (error) {
        console.error("Error cargando la galeria:", error);
        container.innerHTML = '<p>Lo sentimos, no se pudieron cargar las galerias.</p>';
      }
   
  }

// Ejecutar automáticamente cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', renderGalleries);