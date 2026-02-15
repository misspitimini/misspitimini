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
  img.alt = attributes.image.alt || 'Diseño floral para bodas, eventos y experiencias | misspitimini | Sara Laínez';
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
  const contentThumb = document.querySelector('.card-content-thumb');
  const template = document.getElementById('thumb-template');
  template.remove();
  const clonTemplate = document.importNode(template, true);

  //carousel.innerHTML = '';
  if (!images || images.length === 0) {
    carousel.innerHTML = 'No hay imágenes para mostrar.';
    return;
  }

  const container = document.createElement('div');
  container.className = 'flex transition-transform duration-500 ease-in-out';
  
  images.forEach((img, index) => {
    const item = document.createElement('div');
    item.className = 'min-w-full box-border';
    
    const imagen = document.createElement('img');
    imagen.src = img.url;
    imagen.alt = img.name;
    imagen.loading = "lazy";
    
    item.appendChild(imagen);
    container.appendChild(item);

    const clone = document.importNode(clonTemplate, true);

    const imgThumb = clone.querySelector('.card-img');
    imgThumb.removeAttribute(':src');
    imgThumb.removeAttribute(':class');
    imgThumb.removeAttribute('@click');
    imgThumb.setAttribute(':class', 'changeClass('+index+')');
    imgThumb.setAttribute('@click', 'load('+index+')');
    imgThumb.src = img.url;
 
    contentThumb.appendChild(clone);
  });

  carousel.appendChild(container);

}

window.updateCarousel = function(index) {
  const carousel = document.getElementById('card-content-images');
  const container = carousel.querySelector('.flex.transition-transform.duration-500.ease-in-out');
  if (container) {
    container.style.transform = `translateX(-${index * 100}%)`;
  }
}

// Ejecutar automáticamente cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
  renderGalleryDetail();
  renderGalleryImages();
});
