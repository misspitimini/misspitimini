import home from "@/assets/images/carrusel/01_misspitimini.jpg";
import bodas from "@/assets/images/carrusel/02_ceremoniaBoda.jpg";
import eventos from "@/assets/images/carrusel/03_eventos.jpg";
import experiencias from "@/assets/images/carrusel/04_cursoFlores.jpg";
import galeria from "@/assets/images/carrusel/05_colllageImagenes.jpg";
import contacto from "@/assets/images/carrusel/06_contacto.jpg";
import blog from "@/assets/images/carrusel/07_blog.jpg";

export const slides = [
    { id: 1, title: 'Home', description:'Home', url: '/', image: home, phrase: 'Disfruta de la magia de las flores', imgAlt: 'Ramo de flores silvestres con colores vivos en un jarrón de cristal, creando un ambiente acogedor y natural.' },
    { id: 2, title: 'Bodas', description:'Bodas', url: '/bodas/', image: bodas, phrase: 'Haciendo florecer tus mejores recuerdos', imgAlt: 'Espectacular arco de flores blancas y rosas en el altar de una boda al aire libre, con sillas para los invitados a ambos lados.' },
    { id: 3, title: 'Eventos', description:'Eventos', url: '/eventos/', image: eventos, phrase: 'Cada flor, una memorias que florece', imgAlt: 'Elegante mesa imperial en un evento, decorada con un camino de mesa de flores y velas, lista para recibir a los comensales.' },
    { id: 4, title: 'Experiencias', description:'Talleres: Experiencias Florales y Gastronómicas', url: '/experiencias/', image: experiencias, phrase: 'Aportando frescura en un entorno profesional', imgAlt: 'Una alumna sonriente participa en un taller de diseño floral, creando su propio ramo con flores frescas y coloridas.' },
    { id: 5, title: 'Galería', description:'Galería',  url: '/galeria/', image: galeria, phrase: 'Cada flor, una memorias que florece' , imgAlt: 'Primer plano de un exuberante ramo de novia, con una combinación de rosas, peonías y eucalipto en tonos pastel.' },
    { id: 6, title: 'Contacto', description:'Contacto', url: '/contacto/', image: contacto, phrase: 'Compartamos la pasión por lo natural', imgAlt: 'Sara Laínez, diseñadora floral, concentrada en su trabajo mientras crea un arreglo floral único en su taller rodeada de flores.' },
    { id: 7, title: 'Blog', description:'Blog', url: '/blog/', image: blog, phrase: 'Compartir experiencias con las flores', imgAlt: 'Collage de imágenes del blog de Misspitimini, mostrando diferentes arreglos florales, eventos y momentos inspiradores.' } 
];

export const menuItems = slides.map(slide => ({ id: slide.id, title: slide.title, url: slide.url }));