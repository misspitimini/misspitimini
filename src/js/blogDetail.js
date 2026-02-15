import fm from 'front-matter';
import { marked } from 'marked';

async function renderBlogDetail() {
  // Obtenemos el ID de la URL (?id=lo-que-sea)
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');

  if (!id) return;

  const res = await fetch(`https://misspitimini.com/detalleBlogs/${id}.md`);
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
  author.textContent = attributes.author || 'Sara Laínez';
  pubDate.textContent = formatearCaracterFecha(formatearFecha(attributes.pubDate)) || formatearCaracterFecha(formatearFecha(new Date()));
}

function formatearCaracterFecha(fechaStr) {

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

function formatearFecha(fechaStr) {
  const fechaLocal = new Date();
  const yyyy = fechaLocal.getFullYear();
  const mm = String(fechaLocal.getMonth() + 1).padStart(2, '0'); // Meses van de 0 a 11
  const dd = String(fechaLocal.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
};

// Ejecutar automáticamente cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', renderBlogDetail);