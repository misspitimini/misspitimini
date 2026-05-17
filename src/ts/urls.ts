const DOMAIN = "https://misspitimini.com";

const UrlsApi = {
    DOMAIN: DOMAIN,

    DEFAULT_IMAGE : `${DOMAIN}/images/carrusel/01_misspitimini.jpg`,

    SEND_FORM : `${DOMAIN}/SendForm.php5`,
    SEND_BOOKING_FORM : `${DOMAIN}/SendFormBooking.php5`,

    GET_GALLERIES : `${DOMAIN}/GetGalleries.php5`,
    GET_GALLERIES_DETAIL : (id: string) => `${DOMAIN}/detalleGalerias/${id}.md`,
    GET_GALLERY : (id: string) => `${DOMAIN}/GetGallery.php5?id=${id}`,

    GET_BLOGS : `${DOMAIN}/GetBlogs.php5`,
    GET_BLOG_DETAIL_ALL : `${DOMAIN}/GetBlogsDetail.php5`,
    GET_BLOGS_DETAIL : (id: string) => `${DOMAIN}/GetBlogDetail.php5?id=${id}`
};

export { UrlsApi };


