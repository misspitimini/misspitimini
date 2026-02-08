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
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');

  if (!id) return;

  const response = await fetch(`https://misspitimini.com/GetGallery?id=${id}`);
  const imagesData = await response.json();
  const images = imagesData.images;
  
  const carousel = document.getElementById('card-content-images');

  carousel.innerHTML = '';
  if (!images || images.length === 0) {
    carousel.innerHTML = 'No hay imágenes para mostrar.';
    return;
  }

  const container = document.createElement('div');
  container.className = 'custom-carousel-container';
  
  images.forEach(img => {
    const item = document.createElement('div');
    item.className = 'custom-carousel-item';
    
    const imagen = document.createElement('img');
    imagen.src = img.url;
    imagen.alt = img.name;
    imagen.loading = "lazy";
    
    item.appendChild(imagen);
    container.appendChild(item);
  });

  carousel.appendChild(container);

  const prevButton = document.createElement('button');
  prevButton.className = 'absolute left-[10px] top-1/2 -translate-y-1/2 z-10 bg-white/50 hover:bg-white w-10 h-10 rounded-full shadow-lg flex items-center justify-center transition-all';
  prevButton.innerHTML = '&#10094;';

  const nextButton = document.createElement('button');
  nextButton.className = 'absolute right-[10px] top-1/2 -translate-y-1/2 z-10 bg-white/50 hover:bg-white w-10 h-10 rounded-full shadow-lg flex items-center justify-center transition-all';
  nextButton.innerHTML = '&#10095;'; 

  carousel.appendChild(prevButton);
  carousel.appendChild(nextButton);

  let currentIndex = 0;
  const totalItems = images.length;

  function updateCarousel() {
    container.style.transform = `translateX(-${currentIndex * 100}%)`;
  }

  prevButton.addEventListener('click', () => {
    currentIndex = (currentIndex > 0) ? currentIndex - 1 : totalItems - 1;
    updateCarousel();
  });

  nextButton.addEventListener('click', () => {
    currentIndex = (currentIndex < totalItems - 1) ? currentIndex + 1 : 0;
    updateCarousel();
  });
}

// Ejecutar automáticamente cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
  renderGalleryDetail();
  renderGalleryImages();
});
