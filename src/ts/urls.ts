const DOMAIN = "https://misspitimini.com";

const UrlsApi = {
    DOMAIN: DOMAIN,

    DEFAULT_IMAGE : `${DOMAIN}/images/carrusel/01_misspitimini.jpg`,

    SEND_FORM : `${DOMAIN}/SendForm`,
    SEND_BOOKING_FORM : `${DOMAIN}/SendFormBooking`,

    GET_GALLERIES : `${DOMAIN}/GetGalleries`,
    GET_GALLERIES_DETAIL : (id: string) => `${DOMAIN}/detalleGalerias/${id}.md`,
    GET_GALLERY : (id: string) => `${DOMAIN}/GetGallery?id=${id}`,

    GET_WORKSHOPS : `${DOMAIN}/GetAllWorkshops`,

    GET_BLOGS : `${DOMAIN}/GetBlogs`,
    GET_BLOGS_DETAIL_ALL : `${DOMAIN}/GetBlogsDetail`,
    GET_BLOG_DETAIL : (id: string) => `${DOMAIN}/GetBlogDetail?id=${id}`
};

export { UrlsApi };


