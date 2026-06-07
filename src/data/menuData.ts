
export const slides = [
    { id: 1, title: 'Inicio', description:'Inicio', url: '/', image: '@/assets/images/carrusel/01_misspitimini.jpg', phrase: 'Disfruta de la magia de las flores', imgAlt: '...' },
    { id: 2, title: 'Bodas', description:'Bodas', url: '/bodas/', image: '@/assets/images/carrusel/02_ceremoniaBoda.jpg', phrase: 'Haciendo florecer tus mejores recuerdos', imgAlt: '...' },
    { id: 3, title: 'Eventos', description:'Eventos', url: '/eventos/', image: '@/assets/images/carrusel/03_eventos.jpg', phrase: 'Cada flor, una memorias que florece', imgAlt: '...' },
    { id: 4, title: 'Experiencias', description:'Talleres', url: '/experiencias/', image: '@/assets/images/carrusel/04_cursoFlores.jpg', phrase: 'Aportando frescura en un entorno profesional', imgAlt: '...' },
    { id: 5, title: 'Galería', description:'Galería',  url: '/galeria/', image: '@/assets/images/carrusel/05_colllageImagenes.jpg', phrase: 'Cada flor, una memorias que florece' , imgAlt: '...' },
    { id: 6, title: 'Contacto', description:'Contacto', url: '/contacto/', image: '@/assets/images/carrusel/06_contacto.jpg', phrase: 'Compartamos la pasión por lo natural', imgAlt: '...' },
    { id: 7, title: 'Prensa', description:'Prensa', url: '/prensa/', image: '@/assets/images/carrusel/09_ramosFlores.jpg', phrase: 'Contamos al mundo lo que hacemos', imgAlt: '...' },
    { id: 8, title: 'Sobre mí', description:'Sobre mí', url: '/sobre-mi/', image: '@/assets/images/carrusel/07_sobremi.jpg', phrase: 'Conoce la historia detrás de las flores', imgAlt: '...' },
    { id: 9, title: 'Blog', description:'Blog', url: '/blog/', image: '@/assets/images/carrusel/08_blog.jpg', phrase: 'Compartir experiencias con las flores', imgAlt: '...' }
];

// This part is perfect!
export const menuItems = slides.map(slide => ({ 
    id: slide.id, 
    title: slide.title, 
    url: slide.url 
}));
