import { getCmsData } from '@/lib/db';

export async function GET() {
  const data = await getCmsData();
  const siteUrl = data.seo.canonicalUrl || 'https://dzulverse.com';

  const projectUrls = data.projects
    .map((p) => `  <url><loc>${siteUrl}/portfolio/${p.id}</loc><lastmod>${new Date().toISOString().split('T')[0]}</lastmod><changefreq>monthly</changefreq><priority>0.7</priority></url>`)
    .join('\n');

  const blogUrls = data.blogs
    .filter((b) => b.published)
    .map((b) => `  <url><loc>${siteUrl}/blog/${b.slug}</loc><lastmod>${new Date().toISOString().split('T')[0]}</lastmod><changefreq>weekly</changefreq><priority>0.8</priority></url>`)
    .join('\n');

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>${siteUrl}/</loc><lastmod>${new Date().toISOString().split('T')[0]}</lastmod><changefreq>weekly</changefreq><priority>1.0</priority></url>
  <url><loc>${siteUrl}/#portfolio</loc><changefreq>weekly</changefreq><priority>0.9</priority></url>
  <url><loc>${siteUrl}/#about</loc><changefreq>monthly</changefreq><priority>0.6</priority></url>
  <url><loc>${siteUrl}/#blog</loc><changefreq>weekly</changefreq><priority>0.8</priority></url>
  <url><loc>${siteUrl}/#contact</loc><changefreq>monthly</changefreq><priority>0.5</priority></url>
${projectUrls}
${blogUrls}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
