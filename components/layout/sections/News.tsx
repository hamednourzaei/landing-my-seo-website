"use client";
// components/layout/sections/News.tsx
import React, { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import NewsItemCard from "@/components/layout/sections/NewsCard";

export interface NewsItem {
  id: string;
  title: string;
  link: string;
  published: string;
  source: string;
  summary: string;
  languages: string;
}

interface NewsProps {
  initialNews: NewsItem[];
  total: number;
}

const News: React.FC<NewsProps> = ({ initialNews, total }) => {
  const [newsItems, setNewsItems] = useState<NewsItem[]>(initialNews);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(initialNews.length < total);
  const [error, setError] = useState<string | null>(null);

  const fetchMoreNews = async () => {
    if (!hasMore) return;
    const nextPage = page + 1;
    try {
      const response = await fetch(`/api/news?page=${nextPage}&pageSize=10`, {
        cache: "force-cache",
      });
      if (!response.ok) throw new Error("Failed to fetch news");
      const data = await response.json();

      if (
        !data.items ||
        !Array.isArray(data.items) ||
        data.items.length === 0
      ) {
        setHasMore(false);
        return;
      }

      setNewsItems((prev) => {
        const updated = [...prev, ...data.items];
        setHasMore(updated.length < total); // ✅ اینجا درست حساب می‌کنیم
        return updated;
      });

      setPage(nextPage);
      setError(null);
    } catch (error) {
      console.error("Fetch error:", error);
      setError("خطا در بارگذاری اخبار.");
      setHasMore(false);
    }
  };

  return (
    <div className="py-24 w-[90%] mx-auto">
      {/* نمایش خطا */}
      {error && (
        <p className="text-center text-red-500 font-kalameh">{error}</p>
      )}

      {/* اگر هیچ خبری وجود ندارد */}
      {!error && newsItems.length === 0 && (
        <p className="text-center text-gray-300 font-kalameh">
          هیچ اخباری برای نمایش وجود ندارد.
        </p>
      )}

      {/* اگر خبر داریم → InfiniteScroll */}
      {newsItems.length > 0 && (
        <InfiniteScroll
          dataLength={newsItems.length}
          next={fetchMoreNews}
          hasMore={hasMore}
          loader={
            <h4 className="text-center text-gray-300 font-kalameh">
              در حال بارگذاری...
            </h4>
          }
          endMessage={
            <p className="text-center text-gray-300 font-kalameh">
              تمام اخبار بارگذاری شد.
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
  );
};

export default News;
