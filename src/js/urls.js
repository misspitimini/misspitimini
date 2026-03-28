const DOMAIN = "https://misspitimini.com";

const UrlsApi = {
    DOMAIN: DOMAIN,

    DEFAULT_IMAGE : DOMAIN + "/images/carrusel/01_misspitimini.jpg",

    SEND_FORM : DOMAIN + "/SendForm.php5",
    SEND_BOOKING_FORM : DOMAIN + "/SendFormBooking.php5",

    GET_GALLERIES : DOMAIN + "/GetGalleries.php5",
    GET_GALLERIES_DETAIL : DOMAIN + "/detalleGalerias/${id}.md",
    GET_GALLERY : DOMAIN + "/GetGallery?id=${id}",

    GET_BLOGS : DOMAIN + "/GetBlogs.php5",
    GET_BLOGS_DETAIL : DOMAIN + "/detalleBlogs/${id}.md"
};

export { UrlsApi };


