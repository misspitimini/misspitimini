import { UrlsApi } from '@/ts/urls.ts';

import fm from 'front-matter';
import { marked } from 'marked';

// Define la estructura de tus metadatos de Markdown
interface PostAttributes {
  title?: string;
  description?: string;
  // añade otros campos si los usas: date, image, etc.
}

// --- State variables ---
let loadedImagesCount = 0;
const imagesPerBatch = 10; // O el número que prefieras
let allImages: string[] = []; // Se llena con el fetch anterior
let carouselContainer: HTMLElement | null = null; // To store the main image container
let molde: DocumentFragment | null = null; // To store the template content
let thumbContainer: HTMLElement | null = null;  // To store the thumbnail container

async function renderGalleryDetail() {
  // Obtenemos el ID de la URL (?id=lo-que-sea)
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');

  if (!id) return;

  const res = await fetch(UrlsApi.GET_GALLERIES_DETAIL.replace("${id}", id));
  const text = await res.text();
  const { attributes, body } = fm(text) as { attributes: PostAttributes; body: string };
  
  const containerMain = document.getElementById('post-content-main');
  
  if (!containerMain) return

  const title = containerMain.querySelector('.card-title');
  const content = containerMain.querySelector('.card-content');

  if (!title || !content) return

  title.textContent = attributes.title || 'Donde las flores se convierten en recuerdos';
  content.innerHTML = await marked.parse(body);

}

function createImage(
  img: any, 
  index: number, 
  container: HTMLElement, 
  molde: DocumentFragment, 
  contentThumb: HTMLElement
) {
    const item = document.createElement('div');
    item.className = 'min-w-full w-full box-border flex items-center justify-center bg-transparent';

    const imagen = document.createElement('img');
    imagen.classList.add('w-full', 'h-auto', 'object-contain');
    imagen.alt = img.name;
    imagen.classList.add("hidden");

    imagen.loading = "lazy";
    imagen.src = img.url;
    
    item.appendChild(imagen);
    container.appendChild(item);

    const clone = molde.cloneNode(true) as DocumentFragment;

    const buttonThumb = clone.querySelector('button') as HTMLButtonElement | null;
    if (!buttonThumb) {
      return;
    }
    buttonThumb.removeAttribute(' @click');
    buttonThumb.removeAttribute(':class');
    buttonThumb.setAttribute(':class', 'changeClass('+index+')');
    buttonThumb.setAttribute('@click', 'load('+index+')');

    const imgThumb = clone.querySelector('.card-img') as HTMLImageElement | null;
    if (!imgThumb) {
      return;
    }
    imgThumb.removeAttribute(':src');
    imgThumb.removeAttribute(':class');
    imgThumb.removeAttribute('@click');
    imgThumb.setAttribute(':class', 'changeClass('+index+')');
    imgThumb.setAttribute('@click', 'load('+index+')');
    imgThumb.src = img.url;
    imgThumb.classList.remove("hidden");

    contentThumb.appendChild(clone);
    imagen.classList.remove("hidden");
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
  if (!thumbContainer || !carousel) {
    return;
  }
  const template = thumbContainer.querySelector("template");
  if (!template) {
    return;
  }
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
  if (!carouselContainer || !molde || !thumbContainer) {
    return;
  }
  const newLoadedCount = Math.min(loadedImagesCount + imagesPerBatch, allImages.length);

  for (let i = loadedImagesCount; i < newLoadedCount; i++) {
    createImage(allImages[i], i, carouselContainer, molde, thumbContainer);
  }

  loadedImagesCount = newLoadedCount;
}

// Si usas TypeScript estricto, declara la función en la interfaz Window
declare global {
  interface Window {
    updateCarousel: (index: number) => void;
  }
}

window.updateCarousel = function(index:number) {
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
