import { getCmsData } from '@/lib/db';

export async function GET() {
  const data = await getCmsData();
  const robots = data.seo.robotsTxt || `User-agent: *
Allow: /
Disallow: /admin_21
Disallow: /api/

Sitemap: ${data.seo.canonicalUrl || 'https://dzulverse.com'}/sitemap.xml`;

  return new Response(robots, {
    headers: {
      'Content-Type': 'text/plain',
      'Cache-Control': 'public, max-age=86400',
    },
  });
}
