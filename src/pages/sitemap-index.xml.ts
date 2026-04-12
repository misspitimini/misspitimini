import { getCollection } from 'astro:content';

const pages = import.meta.glob('../pages/**/*.astro', { eager: true });
const posts = await getCollection('blog');

export async function GET() {
    const body = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${Object.keys(pages).map(page => `
    <sitemap>
        <loc>https://misspitimini.com${page.replace('../pages', '').replace('.astro', '')}</loc>
    </sitemap>`).join('')}
${posts.map(post => `
    <sitemap>
        <loc>https://misspitimini.com/blog/${post.slug}</loc>
    </sitemap>`).join('')}
</sitemapindex>`;

    return new Response(body, {
        headers: {
            'Content-Type': 'application/xml',
        },
    });
}