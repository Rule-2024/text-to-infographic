/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://texttoinfographic.online',
  generateRobotsTxt: true,
  robotsTxtOptions: {
    additionalSitemaps: [
      'https://texttoinfographic.online/sitemap.xml',
    ],
  },
  exclude: ['/processing', '/preview', '/api/*'],
  changefreq: 'weekly',
  priority: 0.7,
  sitemapSize: 5000,
}
