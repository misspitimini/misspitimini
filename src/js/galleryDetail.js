import { UrlsApi } from './urls.js';

import fm from 'front-matter';
import { marked } from 'marked';

// --- State variables ---
let allImages = [];
let loadedImagesCount = 0;
const imagesPerBatch = 10;
let molde; // To store the template content
let carouselContainer; // To store the main image container
let thumbContainer; // To store the thumbnail container

async function renderGalleryDetail() {
  // Obtenemos el ID de la URL (?id=lo-que-sea)
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');

  if (!id) return;

  const res = await fetch(UrlsApi.GET_GALLERIES_DETAIL.replace("${id}", id));
  const text = await res.text();
  const { attributes, body } = fm(text);
  
  const containerMain = document.getElementById('post-content-main');
  
  const title = containerMain.querySelector('.card-title');
  const content = containerMain.querySelector('.card-content');

  title.textContent = attributes.title || 'Donde las flores se convierten en recuerdos';
  content.innerHTML = marked.parse(body);

}

function createImage(img, index, container, molde, contentThumb) {
    const item = document.createElement('div');
    item.className = 'min-w-full box-border';
    
    const imagen = document.createElement('img');
    imagen.src = img.url;
    imagen.alt = img.name;
    imagen.loading = "lazy";
    imagen.classList.add("hidden");
    
    item.appendChild(imagen);
    container.appendChild(item);
    imagen.classList.remove("hidden");

    const clone = molde.cloneNode(true);

    const buttonThumb = clone.querySelector('button');
    buttonThumb.removeAttribute(' @click');
    buttonThumb.removeAttribute(':class');
    buttonThumb.setAttribute(':class', 'changeClass('+index+')');
    buttonThumb.setAttribute('@click', 'load('+index+')');

    const imgThumb = clone.querySelector('.card-img');
    imgThumb.removeAttribute(':src');
    imgThumb.removeAttribute(':class');
    imgThumb.removeAttribute('@click');
    imgThumb.setAttribute(':class', 'changeClass('+index+')');
    imgThumb.setAttribute('@click', 'load('+index+')');
    imgThumb.src = img.url;
    imgThumb.classList.remove("hidden");

    contentThumb.appendChild(clone);
}

async function renderGalleryImages() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');

  if (!id) return;

  const response = await fetch(UrlsApi.GET_GALLERY.replace("${id}", id));
  const imagesData = await response.json();
  allImages = imagesData.images;
  
  const carousel = document.getElementById('card-content-images');
  thumbContainer = document.querySelector('.card-content-thumb');
  const template = thumbContainer.querySelector("template");
  molde = template.content;
  template.remove();

  if (!allImages || allImages.length === 0) {
    carousel.innerHTML = 'No hay imágenes para mostrar.';
    return;
  }

  carouselContainer = document.createElement('div');
  carouselContainer.className = 'flex transition-transform duration-500 ease-in-out';
  
  carousel.appendChild(carouselContainer);
  loadMoreImages();
}

function loadMoreImages() {
  const newLoadedCount = Math.min(loadedImagesCount + imagesPerBatch, allImages.length);

  for (let i = loadedImagesCount; i < newLoadedCount; i++) {
    createImage(allImages[i], i, carouselContainer, molde, thumbContainer);
  }

  loadedImagesCount = newLoadedCount;
}

window.updateCarousel = function(index) {
  if (carouselContainer) {
    carouselContainer.style.transform = `translateX(-${index * 100}%)`;
  }
  // Check if we've reached the halfway point of loaded images
  if (index >= Math.floor(loadedImagesCount / 2) && loadedImagesCount < allImages.length) {
    loadMoreImages();
  }
}

// Ejecutar automáticamente cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
  renderGalleryDetail();
  renderGalleryImages();
});
