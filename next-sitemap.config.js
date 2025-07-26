const fetchBlogPosts = async () => {
  // فرضا اینجا API یا فایل JSON یا دیتابیس رو می‌خونی
  // و URLهای بلاگ رو برمی‌گردونی
  return [
    { loc: "https://tsarseo.online/", lastmod: "2025-07-26" },
    { loc: "https://tsarseo.online/privacy-policy", lastmod: "2025-07-25" },
  ];
};

module.exports = {
  siteUrl: "https://tsarseo.online",
  generateRobotsTxt: true,
  changefreq: "daily",
  priority: 0.7,
  sitemapSize: 5000,
  additionalPaths: async (config) => {
    const posts = await fetchBlogPosts();
    return posts.map((post) => ({
      loc: post.loc,
      lastmod: post.lastmod,
    }));
  },
};
