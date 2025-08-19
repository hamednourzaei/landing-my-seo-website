// components/layout/sections/News.tsx
"use client";

import { useState, useEffect, useCallback } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import type { NewsItem } from "@/types/news";
import NewsItemCard from "@/components/layout/sections/NewsCard";
import SortFilter from "@/components/ui/SortFilter";

interface NewsProps {
  initialNews: NewsItem[];
  total: number;
  error?: string | null;
  pageSize: number;
}

const News: React.FC<NewsProps> = ({ initialNews, total, error: initialError, pageSize }) => {
  const [newsItems, setNewsItems] = useState<NewsItem[]>(initialNews || []);
  const [page, setPage] = useState(1); // Start from page 1
  const [hasMore, setHasMore] = useState((initialNews || []).length < total);
  const [error, setError] = useState<string | null>(initialError || null);
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");

  // Sort news items based on sortOrder
  const sortNews = useCallback(
    (items: NewsItem[]) => {
      const sorted = [...items];
      if (sortOrder === "newest") {
        sorted.sort(
          (a, b) => new Date(b.published).getTime() - new Date(a.published).getTime()
        );
      } else {
        sorted.sort(
          (a, b) => new Date(a.published).getTime() - new Date(b.published).getTime()
        );
      }
      return sorted;
    },
    [sortOrder]
  );

  // Update news items when initialNews, total, or sortOrder changes
  useEffect(() => {
    const sortedNews = sortNews(initialNews);
    setNewsItems(sortedNews);
    setHasMore(initialNews.length < total);
    setPage(1); // Reset to page 1 on initial load
  }, [initialNews, total, sortOrder, sortNews]);

  // Fetch more news items
  const fetchMoreNews = useCallback(async () => {
    if (!hasMore) return;

    const nextPage = page + 1;
    try {
      const today = new Date().toISOString().split("T")[0];
      const apiUrl =
        process.env.NEXT_PUBLIC_API_URL || "https://hamednourzaei.github.io/api_google_news";
      const url = `${apiUrl}/news_${today}.json?page=${nextPage}&pageSize=${pageSize}`;

      const res = await fetch(url, { cache: "no-store" });
      if (!res.ok) {
        throw new Error(`Failed to fetch news: ${res.status} ${res.statusText}`);
      }

      const data = await res.json();
      let newItems: NewsItem[] = [];

      const mapNewsItem = (item: any, idx: number): NewsItem => ({
        id: item.id || `${nextPage}-${idx}`,
        title: item.title || "No Title",
        link: item.link || "#",
        published: item.published || today,
        source: item.source || "Google News",
        summary: item.summary || "No Summary",
        languages: item.languages || "en",
      });

      if (Array.isArray(data)) {
        newItems = data.map(mapNewsItem);
      } else if (Array.isArray(data.news)) {
        newItems = data.news.map(mapNewsItem);
      } else {
        throw new Error("Invalid API response: expected an array or object with 'news' array");
      }

      // Sort new items
      const sortedNewItems = sortNews(newItems);

      setNewsItems((prev) => {
        const updated = [...prev, ...sortedNewItems];
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
  }, [hasMore, page, pageSize, total, sortNews]);

  return (
    <div className="py-24 w-[90%] mx-auto">
      <div className="mb-6 flex gap-4">
        <SortFilter
          value={sortOrder}
          onChange={(value: string) => setSortOrder(value as "newest" | "oldest")}
        />
      </div>
      {error && <p className="text-center text-red-500 font-kalameh">{error}</p>}
      {!error && newsItems.length === 0 && (
        <p className="text-center text-gray-300 font-kalameh">No news available to display.</p>
      )}
      {newsItems.length > 0 && (
        <InfiniteScroll
          dataLength={newsItems.length}
          next={fetchMoreNews}
          hasMore={hasMore}
          loader={<h4 className="text-center text-gray-300 font-kalameh">Loading...</h4>}
          endMessage={<p className="text-center text-gray-300 font-kalameh">All news has been loaded.</p>}
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
