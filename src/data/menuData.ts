import home from "@/assets/images/carrusel/01_misspitimini.jpg";
import bodas from "@/assets/images/carrusel/02_ceremoniaBoda.jpg";
import eventos from "@/assets/images/carrusel/03_eventos.jpg";
import experiencias from "@/assets/images/carrusel/04_cursoFlores.jpg";
import galeria from "@/assets/images/carrusel/05_colllageImagenes.jpg";
import contacto from "@/assets/images/carrusel/06_contacto.jpg";
import sobre_mi from "@/assets/images/carrusel/07_sobremi.jpg";
import blog from "@/assets/images/carrusel/08_blog.jpg";



export const slides = [
    { id: 1, title: 'Home', description:'Home', url: '/', image: home, phrase: 'Disfruta de la magia de las flores', imgAlt: '...' },
    { id: 2, title: 'Bodas', description:'Bodas', url: '/bodas/', image: bodas, phrase: 'Haciendo florecer tus mejores recuerdos', imgAlt: '...' },
    { id: 3, title: 'Eventos', description:'Eventos', url: '/eventos/', image: eventos, phrase: 'Cada flor, una memorias que florece', imgAlt: '...' },
    { id: 4, title: 'Experiencias', description:'Talleres', url: '/experiencias/', image: experiencias, phrase: 'Aportando frescura en un entorno profesional', imgAlt: '...' },
    { id: 5, title: 'Galería', description:'Galería',  url: '/galeria/', image: galeria, phrase: 'Cada flor, una memorias que florece' , imgAlt: '...' },
    { id: 6, title: 'Contacto', description:'Contacto', url: '/contacto/', image: contacto, phrase: 'Compartamos la pasión por lo natural', imgAlt: '...' },
    { id: 7, title: 'Sobre mí', description:'Sobre mí', url: '/sobre-mi/', image: sobre_mi, phrase: 'Conoce la historia detrás de las flores', imgAlt: '...' },
    { id: 8, title: 'Blog', description:'Blog', url: '/blog/', image: blog, phrase: 'Compartir experiencias con las flores', imgAlt: '...' } 
];

// This part is perfect!
export const menuItems = slides.map(slide => ({ 
    id: slide.id, 
    title: slide.title, 
    url: slide.url 
}));