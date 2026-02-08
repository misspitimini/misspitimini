async function renderBlogs() {

    const container = document.getElementById('blog-container');
    const template = document.getElementById('card-blog-template');
    
    try {
        const response = await fetch("https://misspitimini.com/GetBlogs.php5");
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
          img.src = post.data.url || 'https://misspitimini.com/images/carrusel/01_misspitimini.jpg';
          img.alt = post.data.alt || 'Post sin título';
          title.textContent = post.data.title || 'Post sin título';
          desc.textContent = post.data.description || 'Haz clic para leer más...';
          
          // El link lleva a la página de detalle con el ID (slug)
          link.href = `/detalleBlog?id=${post.id}`;
  
          container.appendChild(clone);
        });
      } catch (error) {
        console.error("Error cargando el blog:", error);
        container.innerHTML = '<p>Lo sentimos, no se pudieron cargar los blogs.</p>';
      }
   
  }

// Ejecutar automáticamente cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', renderBlogs);