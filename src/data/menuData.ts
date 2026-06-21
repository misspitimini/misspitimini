
export const slides = [
    { id: 1, title: 'Inicio', description:'Inicio', url: '/', image: '@/assets/images/carrusel/01_misspitimini.jpg', phrase: 'Disfruta de la magia de las flores', imgAlt: 'Sara Laínez, misspitimini mostrando las flores con las que realizar sus disños florales de bodas, eventos y talleres.' },
    { id: 2, title: 'Bodas', description:'Bodas', url: '/bodas/', image: '@/assets/images/carrusel/02_ceremoniaBoda.jpg', phrase: 'Haciendo florecer tus mejores recuerdos', imgAlt: 'Diseño floral de boda y ramo de novia creado por Sara Laínez, misspitimini.' },
    { id: 3, title: 'Eventos', description:'Eventos', url: '/eventos/', image: '@/assets/images/carrusel/03_eventos.jpg', phrase: 'Cada flor, una memorias que florece', imgAlt: 'Evento decorado por Sara Laínez, misspitimini, con flores naturales y selección de productos gastronímicos.' },
    { id: 4, title: 'Experiencias', description:'Talleres', url: '/experiencias/', image: '@/assets/images/carrusel/04_cursoFlores.jpg', phrase: 'Aportando frescura en un entorno profesional', imgAlt: 'Sara Laínez, misspitimini, te invita a suscribirte a talleres de arte floral en Madrid.' },
    { id: 5, title: 'Galería', description:'Galería',  url: '/galeria/', image: '@/assets/images/carrusel/05_colllageImagenes.jpg', phrase: 'Cada flor, una memorias que florece' , imgAlt: 'Galería de imágenes de Sara Laínez, misspitimini, donde muestra parte de su trayectoria' },
    { id: 6, title: 'Contacto', description:'Contacto', url: '/contacto/', image: '@/assets/images/carrusel/06_contacto.jpg', phrase: 'Compartamos la pasión por lo natural', imgAlt: 'Sara Laínez, misspitimini, con un bonito ramo de flores, con un diseño floral exclusivo.' },
    { id: 7, title: 'Prensa', description:'Prensa', url: '/prensa/', image: '@/assets/images/carrusel/07_prensa.jpg', phrase: 'Contamos al mundo lo que hacemos', imgAlt: 'Ramo de flores, diseño creado por Sara Laínez, misspitimini.' },
    { id: 8, title: 'Sobre mí', description:'Sobre mí', url: '/sobre-mi/', image: '@/assets/images/carrusel/07_sobremi.jpg', phrase: 'Conoce la historia detrás de las flores', imgAlt: 'Sara Laínez, misspitimini, saludando y sentada en la plaza Mayor de Madrid con un ramo de flores.' },
    { id: 9, title: 'Blog', description:'Blog', url: '/blog/', image: '@/assets/images/carrusel/08_blog.jpg', phrase: 'Compartir experiencias con las flores', imgAlt: 'Sara Laínez, misspitimini, viédose en el espejo, mientrar observa un ramo de flores naturales.' }
];

// This part is perfect!
export const menuItems = slides.map(slide => ({ 
    id: slide.id, 
    title: slide.title, 
    url: slide.url 
}));
