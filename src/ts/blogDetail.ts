import { getBlogDetail } from '@/services/blogDetail';
import type { BlogDetail } from "@/types/BlogDetail";
import { UrlsApi } from './urls.ts';
import { marked } from 'marked';

async function renderBlogDetail() {
  // Obtenemos el ID de la URL (?id=lo-que-sea)
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');

  if (!id) return;

  const blog = await getBlogDetail(id) as BlogDetail;
  if (!blog) return;
 
  const containerHeader = document.getElementById('post-content-header');
  const containerMain = document.getElementById('post-content-main');
  
  if (!containerHeader || !containerMain) return;

  // Rellenamos con los datos del "data" que extrae tu PHP
  const img = containerHeader.querySelector('.card-img') as HTMLImageElement | null;
  const title = containerMain.querySelector('.card-title') as HTMLElement | null;
  const content = containerMain.querySelector('.card-content') as HTMLElement | null;
  const author = containerMain.querySelector('.card-author') as HTMLElement | null;
  const pubDate = containerMain.querySelector('.card-date') as HTMLElement | null;
 
  // Asignamos valores (con "fallbacks" por si falta algún dato en el .md)
  if (img) {
    img.src = blog.imgSrc;
    // Añadimos la prioridad alta
    img.setAttribute('fetchpriority', 'high');
    img.alt = blog.imgAlt;
  }
  if (title) title.textContent = blog.title;
  if (content) content.innerHTML = await marked.parse(blog.body);
  if (author) author.textContent = blog.author;
  if (pubDate) pubDate.textContent = blog.pubDate ;
}

// Ejecutar automáticamente cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', renderBlogDetail);