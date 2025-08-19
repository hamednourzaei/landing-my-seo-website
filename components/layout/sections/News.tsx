"use client";
import { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import type { NewsItem } from "@/types/news";
import NewsItemCard from "@/components/layout/sections/NewsCard";
import SortFilter from "@/components/ui/SortFilter";

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
  const pageSize = 12; // ثابت کردن pageSize روی 12
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
      const baseUrl = process.env.NEXT_PUBLIC_API_URL || "https://tsarseo.online/api/news";
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
    <div className="py-24 w-[90%] mx-auto">
      <div className="mb-6 flex justify-end gap-4">
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
            <h4 className="text-center text-gray-300 font-kalameh">
              Loading...
            </h4>
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
  );
};

export default News;