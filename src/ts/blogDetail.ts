import { UrlsApi } from './urls.ts';
import fm from 'front-matter';
import { marked } from 'marked';

interface PostAttributes {
  title?: string;
  image?: {
    url?: string;
    alt?: string;
  };
  author?: string;
  pubDate?: string;
}

async function renderBlogDetail() {
  // Obtenemos el ID de la URL (?id=lo-que-sea)
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');

  if (!id) return;

  const res = await fetch(UrlsApi.GET_BLOGS_DETAIL(id));
  const text = await res.text();
  const { attributes, body } = fm(text) as { attributes: PostAttributes; body: string };
  
  const containerHeader = document.getElementById('post-content-header');
  const containerMain = document.getElementById('post-content-main');
  
  if (!containerHeader || !containerMain) return;

  // Rellenamos con los datos del "data" que extrae tu PHP
  const img = containerHeader.querySelector('.card-img') as HTMLImageElement | null;
  const title = containerMain.querySelector('.card-title') as HTMLElement | null;;
  const content = containerMain.querySelector('.card-content') as HTMLElement | null;;
  const author = containerMain.querySelector('.card-author') as HTMLElement | null;;
  const pubDate = containerMain.querySelector('.card-date') as HTMLElement | null;;

  if (!attributes) return;
 
  // Asignamos valores (con "fallbacks" por si falta algún dato en el .md)
  if (img) {
    img.src = attributes.image?.url || UrlsApi.DEFAULT_IMAGE;
    // Añadimos la prioridad alta
    img.setAttribute('fetchpriority', 'high');
    img.alt = attributes.image?.alt || 'Diseño floral para bodas, eventos y experiencias | misspitimini | Sara Laínez';
  }
  if (title) {
    title.textContent = attributes.title || 'Donde las flores se convierten en recuerdos';
  }
  if (content) {
    content.innerHTML = await marked.parse(body);
  }
  if (author) {
    author.textContent = attributes.author || 'Sara Laínez';
  }
  if (pubDate) {
    const fechaRaw = attributes.pubDate || new Date().toISOString().split('T')[0];
    const fechaFormateada = formatearFecha(fechaRaw);
    pubDate.textContent = formatearCaracterFecha(fechaFormateada);
  }
 
}

function formatearCaracterFecha(fechaStr:string) {

  // 1. Dividimos la cadena para evitar errores de zona horaria
  const [year, month, day] = fechaStr.split('-').map(Number);
  
  // 2. Creamos el objeto fecha (el mes en JS es 0-index, por eso month - 1)
  const fecha = new Date(year, month - 1, day);

  // 3. Formateamos usando la API de Internacionalización
  return new Intl.DateTimeFormat('es-ES', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).format(fecha);
};

function formatearFecha(fechaStr:string) {
  const fechaLocal = new Date(fechaStr);
  const yyyy = fechaLocal.getFullYear();
  const mm = String(fechaLocal.getMonth() + 1).padStart(2, '0'); // Meses van de 0 a 11
  const dd = String(fechaLocal.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
};

// Ejecutar automáticamente cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', renderBlogDetail);