"use client";
import { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import type { NewsItem } from "@/types/news";
import NewsItemCard from "@/components/layout/sections/NewsCard";
import SortFilter from "@/components/ui/SortFilter";
import Head from "next/head";

interface NewsProps {
  initialNews: NewsItem[];
  total: number;
  error?: string | null;
  currentPage: number;
}

const News: React.FC<NewsProps> = ({
  initialNews,
  total,
  error: initialError,
  currentPage,
}) => {
  const pageSize = 8; // ثابت کردن pageSize روی 8
  const [newsItems, setNewsItems] = useState<NewsItem[]>(initialNews || []);
  const [page, setPage] = useState(currentPage);
  const [hasMore, setHasMore] = useState((initialNews || []).length < total);
  const [error, setError] = useState<string | null>(initialError || null);
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");

  // Update news items when initialNews, total, or sortOrder changes
  useEffect(() => {
    let sortedNews = [...initialNews];
    if (sortOrder === "newest") {
      sortedNews.sort(
        (a, b) =>
          new Date(b.published).getTime() - new Date(a.published).getTime()
      );
    } else {
      sortedNews.sort(
        (a, b) =>
          new Date(a.published).getTime() - new Date(b.published).getTime()
      );
    }
    setNewsItems(sortedNews);
    setHasMore(initialNews.length < total);
    setPage(currentPage);
  }, [initialNews, total, sortOrder, currentPage]);

  const fetchMoreNews = async () => {
    if (!hasMore) return;
    const nextPage = page + 1;

    try {
      const baseUrl =
        process.env.NEXT_PUBLIC_API_URL || "https://tsarseo.online/api/news";
      const url = `${baseUrl}?page=${nextPage}&pageSize=${pageSize}`;
      const res = await fetch(url, { cache: "no-store" });

      if (!res.ok) {
        throw new Error(
          `Failed to fetch news: ${res.status} ${res.statusText}`
        );
      }

      const data = await res.json();

      let newItems: NewsItem[] = [];
      if (Array.isArray(data.news)) {
        newItems = data.news.map((item: any, idx: number) => ({
          id: item.id || `${nextPage}-${idx}`,
          title: item.title || "No Title",
          link: item.link || "#",
          published: item.published || new Date().toISOString().split("T")[0],
          source: item.source || "Google News",
          summary: item.summary || "No Summary",
          languages: item.languages || "en",
        }));
      } else {
        throw new Error(
          "Invalid API response: expected an object with 'news' array"
        );
      }

      // Sort new items
      if (sortOrder === "newest") {
        newItems.sort(
          (a, b) =>
            new Date(b.published).getTime() - new Date(a.published).getTime()
        );
      } else {
        newItems.sort(
          (a, b) =>
            new Date(a.published).getTime() - new Date(b.published).getTime()
        );
      }

      setNewsItems((prev) => {
        const updated = [...prev, ...newItems];
        setHasMore(updated.length < (data.total || total));
        return updated;
      });

      setPage(nextPage);
      setError(null);
    } catch (err) {
      console.error("Fetch error:", err);
      setError(err instanceof Error ? err.message : "Unknown error");
      setHasMore(false);
    }
  };

  return (
    <>
      <Head>
        <title>آخرین اخبار سئو و نرم‌افزارهای آمار بازدید سایت - TsarSEO</title>
        <meta
          name="description"
          content="آخرین اخبار سئو، تحلیل‌های به‌روز و نرم‌افزارهای آمار بازدید سایت با TsarSEO. از استراتژی‌های لینک‌سازی متنوع و حرفه‌ای برای رشد آنلاین بهره‌مند شوید."
        />
        <meta
          name="keywords"
          content="TsarSEO, اخبار سئو, آمار بازدید سایت, لینک‌سازی, استراتژی‌های سئو, تحلیل سئو"
        />
        <meta
          property="og:title"
          content="آخرین اخبار سئو و نرم‌افزارهای آمار بازدید سایت - TsarSEO"
        />
        <meta
          property="og:description"
          content="آخرین اخبار سئو، تحلیل‌های به‌روز و نرم‌افزارهای آمار بازدید سایت با TsarSEO. از استراتژی‌های لینک‌سازی متنوع و حرفه‌ای برای رشد آنلاین بهره‌مند شوید."
        />
        <meta
          property="og:image"
          content="https://tsarseo.online/icons/Logo.png"
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://tsarseo.online/news" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              {
                "@context": "https://schema.org",
                "@type": "NewsArticle",
                headline: "آخرین اخبار سئو و نرم‌افزارهای آمار بازدید سایت",
                description:
                  "TsarSEO ارائه‌دهنده آخرین اخبار سئو، تحلیل‌های به‌روز و نرم‌افزارهای آمار بازدید سایت با استراتژی‌های لینک‌سازی حرفه‌ای.",
                publisher: {
                  "@type": "Organization",
                  name: "TsarSEO",
                  url: "https://tsarseo.online",
                },
              },
              {
                "@context": "https://schema.org",
                "@type": "FAQPage",
                mainEntity: [
                  {
                    "@type": "Question",
                    name: "چگونه TsarSEO به بهبود سئو کمک می‌کند؟",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "TsarSEO با ارائه اخبار و تحلیل‌های به‌روز سئو، ابزارهای حرفه‌ای، و استراتژی‌های لینک‌سازی مانند مطالعات موردی، وبینارها، و فعالیت در شبکه‌های اجتماعی، به بهبود رتبه سایت شما کمک می‌کند.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "چه روش‌های لینک‌سازی توسط TsarSEO استفاده می‌شود؟",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "TsarSEO از روش‌های لینک‌سازی سفید مانند مطالعات موردی، اسپانسرشیپ رویدادها، بورسیه‌های دانشجویی، ابزارهای رایگان، اینفوگرافیک‌ها، پادکست‌ها، HARO، وبینارها و فعالیت در گروه‌های LinkedIn استفاده می‌کند. همچنین روش‌های خاکستری مانند نظرات هدفمند و انتشار PDF نیز به کار می‌روند.",
                    },
                  },
                ],
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
      <div className="py-24 w-[90%] mx-auto">
        <div className="mb-6 flex justify-end gap-4">
          <h1 className="text-lg pt-2 text-left font-bold text-gray-300 mb-8 font-kalameh ">
            آخرین اخبار و نرم افزار آمار بازدید سایت
          </h1>
          <SortFilter
            value={sortOrder}
            onChange={(value: string) =>
              setSortOrder(value as "newest" | "oldest")
            }
          />
        </div>
        {error && (
          <p className="text-center text-red-500 font-kalameh">{error}</p>
        )}
        {!error && newsItems.length === 0 && (
          <p className="text-center text-gray-300 font-kalameh">
            No news available to display.
          </p>
        )}
        {newsItems.length > 0 && (
          <InfiniteScroll
            dataLength={newsItems.length}
            next={fetchMoreNews}
            hasMore={hasMore}
            loader={
              <h2 className="text-center text-gray-300 font-kalameh">
                Loading...
              </h2>
            }
            endMessage={
              <p className="text-center text-gray-300 font-kalameh">
                All news has been loaded.
              </p>
            }
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 justify-items-center">
              {newsItems.map((news) => (
                <NewsItemCard key={news.id} news={news} />
              ))}
            </div>
          </InfiniteScroll>
        )}
      </div>
    </>
  );
};

export default News;
