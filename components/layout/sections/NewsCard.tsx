import type { NewsItem } from "@/types/news";
import Head from "next/head";

interface NewsItemCardProps {
  news: NewsItem;
}

const NewsItemCard: React.FC<NewsItemCardProps> = ({ news }) => {
  // کوتاه کردن عنوان اگر بیشتر از 35 کاراکتر باشد
  const truncatedTitle =
    news.title.length > 35 ? `${news.title.slice(0, 35)}...` : news.title;

  return (
    <>
      <Head>
        <title>{`${truncatedTitle} - اخبار سئو TsarSEO`}</title>
        <meta
          name="description"
          content={`${news.summary.slice(
            0,
            160
          )}... TsarSEO ارائه‌دهنده اخبار و تحلیل‌های سئو با استراتژی‌های لینک‌سازی حرفه‌ای.`}
        />
        <meta
          name="keywords"
          content={`TsarSEO, اخبار سئو, ${news.title}, لینک‌سازی, تحلیل سئو`}
        />
        <meta
          property="og:title"
          content={`${truncatedTitle} - اخبار سئو TsarSEO`}
        />
        <meta
          property="og:description"
          content={`${news.summary.slice(
            0,
            160
          )}... TsarSEO ارائه‌دهنده اخبار و تحلیل‌های سئو با استراتژی‌های لینک‌سازی حرفه‌ای.`}
        />
        <meta
          property="og:image"
          content="https://tsarseo.online/icons/Logo.png"
        />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={news.link} />
        <meta property="og:article:published_time" content={news.published} />
        <meta property="og:article:author" content={news.source} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              {
                "@context": "https://schema.org",
                "@type": "NewsArticle",
                headline: truncatedTitle,
                description: `${news.summary.slice(0, 160)}...`,
                datePublished: news.published,
                author: {
                  "@type": "Organization",
                  name: news.source,
                },
                publisher: {
                  "@type": "Organization",
                  name: "TsarSEO",
                  url: "https://tsarseo.online",
                },
              },
              {
                "@context": "https://schema.org",
                "@type": "Organization",
                name: "TsarSEO",
                url: "https://tsarseo.online",
                sameAs: [
                  "https://www.linkedin.com/company/tsarseo",
                  "https://www.youtube.com/@tsarseo",
                ],
              },
              {
                "@context": "https://schema.org",
                "@type": "LocalBusiness",
                name: "TsarSEO",
                url: "https://tsarseo.online",
                telephone: "+98-21-12345678",
                address: {
                  "@type": "PostalAddress",
                  streetAddress: "خیابان اصلی، پلاک 123",
                  addressLocality: "تهران",
                  addressCountry: "IR",
                },
              },
              {
                "@context": "https://schema.org",
                "@type": "BreadcrumbList",
                itemListElement: [
                  {
                    "@type": "ListItem",
                    position: 1,
                    name: "خانه",
                    item: "https://tsarseo.online",
                  },
                  {
                    "@type": "ListItem",
                    position: 2,
                    name: "اخبار",
                    item: "https://tsarseo.online/news",
                  },
                  {
                    "@type": "ListItem",
                    position: 3,
                    name: truncatedTitle,
                    item: news.link,
                  },
                ],
              },
              {
                "@context": "https://schema.org",
                "@type": "AggregateRating",
                ratingValue: "4.8",
                reviewCount: "150",
                bestRating: "5",
                worstRating: "1",
                itemReviewed: {
                  "@type": "Service",
                  name: "خدمات سئو TsarSEO",
                },
              },
            ]),
          }}
        />
      </Head>
      <div
        className="bg-card font-kalameh p-6 rounded-xl shadow-md w-full max-w-sm hover:shadow-xl transition-shadow duration-300"
        role="article"
      >
        <h3 className="lg:text-base text-gray-300 sm:text-xl font-bold mb-3 truncate">
          {truncatedTitle}
        </h3>
        <p className="lg:text-xs font-semibold sm:text-sm text-gray-600 mb-3">
          {new Date(news.published).toLocaleDateString("en-us")} | {news.source}
        </p>
        <div
          className="text-gray-300 mb-6 sm:text-base lg:text-sm break-words line-clamp-6"
          dangerouslySetInnerHTML={{ __html: news.summary }}
        />
        <a
          href={news.link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary font-semibold hover:underline text-xs sm:text-base"
          aria-label={`ادامه مطلب برای ${news.title}`}
        >
          ادامه مطلب
        </a>
      </div>
    </>
  );
};

export default NewsItemCard;
