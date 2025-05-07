/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://texttoinfographic.online',
  generateRobotsTxt: true,
  robotsTxtOptions: {
    additionalSitemaps: [
      'https://texttoinfographic.online/sitemap.xml',
    ],
    policies: [
      { userAgent: '*', allow: '/' },
      { userAgent: '*', disallow: ['/api/*', '/processing', '/preview'] }
    ]
  },
  // 只排除处理和预览页面，确保功能页面被包含
  exclude: ['/processing', '/preview', '/api/*'],
  // 为功能页面设置更高的优先级
  transform: (config, path) => {
    // 为功能页面设置更高的优先级
    if (path.includes('/features/')) {
      return {
        loc: path,
        changefreq: config.changefreq,
        priority: 0.8,
        lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
      }
    }
    // 为创建页面设置更高的优先级
    if (path === '/create') {
      return {
        loc: path,
        changefreq: config.changefreq,
        priority: 0.9,
        lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
      }
    }
    // 使用默认配置
    return {
      loc: path,
      changefreq: config.changefreq,
      priority: config.priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
    }
  },
  changefreq: 'weekly',
  priority: 0.7,
  sitemapSize: 5000,
}
