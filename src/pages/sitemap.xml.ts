
import { getCollection } from 'astro:content';
import galleries from '../content/galleries.json';

const pages = import.meta.glob('../pages/**/*.astro', { eager: true });
const posts = await getCollection('blog');

export async function GET() {
    const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${Object.keys(pages).map(page => {
    if (page.includes('slug]')) return '';
    return `
    <url>
        <loc>https://misspitimini.com${page.replace('../pages', '').replace('.astro', '')}</loc>
    </url>`;
}).join('')}
${posts.map(post => `
    <url>
        <loc>https://misspitimini.com/blog/${post.slug}</loc>
    </url>`).join('')}
${galleries.map(gallery => `
    <url>
        <loc>https://misspitimini.com${gallery.link}</loc>
    </url>`).join('')}
</urlset>`;

    return new Response(body, {
        headers: {
            'Content-Type': 'application/xml',
        },
    });
}
