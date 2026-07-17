export async function GET(context) {
	const sitemapURL = new URL('sitemap-index.xml', context.site);
	return new Response(`User-agent: *\nAllow: /\n\nSitemap: ${sitemapURL}\n`, {
		headers: { 'Content-Type': 'text/plain' },
	});
}
