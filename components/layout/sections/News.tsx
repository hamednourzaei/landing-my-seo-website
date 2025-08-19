// components/layout/sections/News.tsx
"use client";
import { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import type { NewsItem } from "@/types/news";
import NewsItemCard from "@/components/layout/sections/NewsCard";
import DayFilter from "@/components/ui/DayFilter";
import SortFilter from "@/components/ui/SortFilter"; // اضافه کردن SortFilter

interface NewsProps {
  initialNews: NewsItem[];
  total: number;
  error?: string | null;
  selectedDay: "yesterday" | "today" | "tomorrow";
}

const News: React.FC<NewsProps> = ({
  initialNews,
  total,
  error: initialError,
  selectedDay,
}) => {
  const [newsItems, setNewsItems] = useState<NewsItem[]>(initialNews || []);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState((initialNews || []).length < total);
  const [error, setError] = useState<string | null>(initialError || null);
  const [currentDay, setCurrentDay] = useState<
    "yesterday" | "today" | "tomorrow"
  >(selectedDay);
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest"); // اضافه کردن state برای مرتب‌سازی

  // به‌روزرسانی اخبار هنگام تغییر روز یا مرتب‌سازی
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
    setPage(1); // ریست کردن صفحه هنگام تغییر روز یا مرتب‌سازی
    setCurrentDay(selectedDay);
  }, [initialNews, total, selectedDay, sortOrder]);

  const fetchMoreNews = async () => {
    if (!hasMore) return;
    const nextPage = page + 1;

    try {
      const apiUrl =
        process.env.NEXT_PUBLIC_API_URL || "https://tsarseo.online/api/news";
      const url = `${apiUrl}?page=${nextPage}&pageSize=10&day=${currentDay}`;
      const res = await fetch(url, {
        cache: "no-store",
      });

      if (!res.ok) {
        throw new Error(
          `Failed to fetch news: ${res.status} ${res.statusText}`
        );
      }

      const data = await res.json();
      console.log("Fetch More News Response (News.tsx):", data);

      let newItems: NewsItem[] = [];
      if (Array.isArray(data)) {
        newItems = data.map((item: any, idx: number) => ({
          id: item.id || `${idx}`,
          title: item.title || "بدون عنوان",
          link: item.link || "#",
          published: item.published || new Date().toISOString().split("T")[0],
          source: item.source || "Google News",
          summary: item.summary || "بدون خلاصه",
          languages: item.languages || "en",
        }));
      } else if (Array.isArray(data.news)) {
        newItems = data.news.map((item: any, idx: number) => ({
          id: item.id || `${idx}`,
          title: item.title || "بدون عنوان",
          link: item.link || "#",
          published: item.published || new Date().toISOString().split("T")[0],
          source: item.source || "Google News",
          summary: item.summary || "بدون خلاصه",
          languages: item.languages || "en",
        }));
      } else {
        throw new Error(
          "Invalid API response: expected an array or object with 'news' array"
        );
      }

      // مرتب‌سازی اخبار جدید
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
      console.error("Fetch error (News.tsx):", err);
      setError(
        `خطا در بارگذاری اخبار: ${
          err instanceof Error ? err.message : "خطای ناشناخته"
        }`
      );
      setHasMore(false);
    }
  };

  return (
    <div className="py-24 w-[90%] mx-auto">
      <div className="mb-6 flex gap-4">
        <DayFilter
          value={currentDay}
          onChange={(value: string) =>
            setCurrentDay(value as "yesterday" | "today" | "tomorrow")
          }
        />
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
          هیچ اخباری برای نمایش وجود ندارد.
        </p>
      )}
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
