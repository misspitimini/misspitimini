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
  
  console.log(attributes);
  // Rellenamos con los datos del "data" que extrae tu PHP
  const img = containerHeader.querySelector('.card-img');
  const title = containerMain.querySelector('.card-title');
  const content = containerMain.querySelector('.card-content');

  // Asignamos valores (con "fallbacks" por si falta algún dato en el .md)
  img.src = attributes.image.url || 'https://via.placeholder.com/400x250?text=No+Image';
  img.alt = attributes.image.alt || 'Post sin título';
  title.textContent = attributes.title || 'Post sin título';
  content.innerHTML = marked.parse(body);
}

// Ejecutar automáticamente cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', renderBlogDetail);