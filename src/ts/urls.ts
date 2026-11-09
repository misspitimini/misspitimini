const DOMAIN = "https://api.misspitimini.com";
const DOMAIN_API = "https://api.misspitimini.com";
const DOMAIN_DATA = "https://content.misspitimini.com";

const UrlsApi = {
    DOMAIN: DOMAIN,
    DOMAIN_API: DOMAIN_API,
    DOMAIN_DATA: DOMAIN_DATA,

    DEFAULT_IMAGE : `${DOMAIN}/images/carrusel/01_misspitimini.jpg`,

    SEND_FORM : `${DOMAIN_API}/SendForm`,
    SEND_BOOKING_FORM : `${DOMAIN_API}/SendFormBooking`,

    GET_GALLERIES : `${DOMAIN_API}/GetGalleries`,
    GET_GALLERIES_DETAIL : (id: string) => `${DOMAIN_DATA}/galeria/${id}.md`,
    GET_GALLERY : (id: string) => `${DOMAIN_API}/GetGallery?id=${id}`,

    GET_WORKSHOPS : `${DOMAIN_API}/GetAllWorkshops`,

    GET_BLOGS : `${DOMAIN_API}/GetBlogs`,
    GET_BLOGS_DETAIL_ALL : `${DOMAIN_API}/GetBlogsDetail`,
    GET_BLOG_DETAIL : (id: string) => `${DOMAIN_API}/GetBlogDetail?id=${id}`
};

export { UrlsApi };


