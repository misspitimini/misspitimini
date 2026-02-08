import fm from 'front-matter';
import { marked } from 'marked';

async function renderGalleryDetail() {
  // Obtenemos el ID de la URL (?id=lo-que-sea)
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');

  if (!id) return;

  const res = await fetch(`https://misspitimini.com/detalleGalerias/${id}.md`);
  const text = await res.text();
  const { attributes, body } = fm(text);
  
  const containerHeader = document.getElementById('post-content-header');
  const containerMain = document.getElementById('post-content-main');
  
  // Rellenamos con los datos del "data" que extrae tu PHP
  const img = containerHeader.querySelector('.card-img');
  const title = containerMain.querySelector('.card-title');
  const content = containerMain.querySelector('.card-content');
  const author = containerMain.querySelector('.card-author');
  const pubDate = containerMain.querySelector('.card-date');

  // Asignamos valores (con "fallbacks" por si falta algún dato en el .md)
  img.src = attributes.image.url || 'https://misspitimini.com/images/carrusel/01_misspitimini.jpg';
  img.alt = attributes.image.alt || 'Diseño floral para bodas, eventos y talleres | misspitimini | Sara Laínez';
  title.textContent = attributes.title || 'Donde las flores se convierten en recuerdos';
  content.innerHTML = marked.parse(body);

}

async function renderGalleryImages() {
  // Obtenemos el ID de la URL (?id=lo-que-sea)
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');

  if (!id) return;

  const response = await fetch(`https://misspitimini.com/GetGallery?id=${id}`);
  const images = await response.json();
  
  const contenedor = document.getElementById('card-content-images');

  // Limpiamos el contenedor por si acaso
  contenedor.innerHTML = '';
  images.images.forEach(img => {
    // Creamos un contenedor para cada imagen (opcional, ayuda con el diseño)
    const figure = document.createElement('figure');
    figure.className = 'foto-item';
    
    // Creamos la etiqueta img
    const imagen = document.createElement('img');
    imagen.src = img.url;
    imagen.alt = img.name;
    imagen.width = img.width;
    imagen.height = img.height;
    imagen.loading = "lazy"; // Mejora el rendimiento de carga
    
    // Añadimos un pie de foto con el nombre (opcional)
    //const caption = document.createElement('figcaption');
    //caption.textContent = img.name;

    // Montamos la estructura
    figure.appendChild(imagen);
    //figure.appendChild(caption);
    contenedor.appendChild(figure);
  });

}

// Ejecutar automáticamente cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
  renderGalleryDetail(); // Asumiendo que 'data' es tu JSON
  renderGalleryImages();
});