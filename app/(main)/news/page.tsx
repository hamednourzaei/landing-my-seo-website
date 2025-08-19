import type { NewsItem } from "@/types/news";
import { Suspense } from "react";
import dynamic from "next/dynamic";

const News = dynamic(() => import("@/components/layout/sections/News"), {
  ssr: true, // برای SEO
  loading: () => <NewsSkeleton />,
});

const NewsSkeleton = () => (
  <div className="py-24 w-[90%] mx-auto">
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 justify-items-center">
      {Array.from({ length: 4 }).map((_, idx) => (
        <div
          key={idx}
          className="bg-card p-6 rounded-xl shadow-md w-full max-w-sm animate-pulse"
        >
          <div className="h-6 bg-gray-300 rounded mb-4"></div>
          <div className="h-4 bg-gray-600 rounded mb-3"></div>
          <div className="h-16 bg-gray-300 rounded mb-6"></div>
          <div className="h-4 bg-primary rounded w-20"></div>
        </div>
      ))}
    </div>
  </div>
);

const fallbackNews: NewsItem[] = [
  {
    id: "1",
    title: "نمونه خبر پیش‌فرض ۱",
    link: "#",
    published: "2025-08-18",
    source: "منبع پیش‌فرض",
    summary: "این یک خلاصه پیش‌فرض برای زمانی است که fetch شکست بخورد.",
    languages: "fa",
  },
  {
    id: "2",
    title: "نمونه خبر پیش‌فرض ۲",
    link: "#",
    published: "2025-08-18",
    source: "منبع پیش‌فرض",
    summary: "این یک خبر دیگر برای fallback است.",
    languages: "fa",
  },
];

async function getNews(page: number = 1, pageSize: number = 10) {
  try {
    const url = `/api/news?page=${page}&pageSize=${pageSize}`; // استفاده از پراکسی داخلی
    console.log("Fetching from URL:", url);
    const res = await fetch(url, {
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch news: ${res.status} ${res.statusText}`);
    }

    const data = await res.json();
    console.log("API Response (page.tsx):", data);

    let news: NewsItem[] = [];
    let total: number = 0;

    if (Array.isArray(data)) {
      news = data.map((item: any, idx: number) => ({
        id: item.id || `${idx}`,
        title: item.title || "بدون عنوان",
        link: item.link || "#",
        published: item.published || new Date().toISOString().split("T")[0],
        source: item.source || "Google News",
        summary: item.summary || "بدون خلاصه",
        languages: item.languages || "en",
      }));
      total = data.length;
    } else if (Array.isArray(data.news)) {
      news = data.news.map((item: any, idx: number) => ({
        id: item.id || `${idx}`,
        title: item.title || "بدون عنوان",
        link: item.link || "#",
        published: item.published || new Date().toISOString().split("T")[0],
        source: item.source || "Google News",
        summary: item.summary || "بدون خلاصه",
        languages: item.languages || "en",
      }));
      total = typeof data.total === "number" ? data.total : news.length;
    } else {
      throw new Error("Invalid API response");
    }

    // پیش‌لود صفحه دوم
    if (page === 1) {
      const prefetchUrl = `/api/news?page=2&pageSize=${pageSize}`;
      fetch(prefetchUrl, { next: { revalidate: 60 } }).catch((err) =>
        console.error("Prefetch error:", err)
      );
    }

    return { news, total, error: null };
  } catch (err) {
    console.error("Error fetching news:", err);
    return {
      news: fallbackNews,
      total: fallbackNews.length,
      error: `خطا در دریافت اخبار: ${
        err instanceof Error ? err.message : "خطای ناشناخته"
      }`,
    };
  }
}

export default async function NewsPage() {
  const dataPromise = getNews(1, 10);
  return (
    <Suspense fallback={<NewsSkeleton />}>
      <NewsWrapper dataPromise={dataPromise} />
    </Suspense>
  );
}

async function NewsWrapper({ dataPromise }: { dataPromise: Promise<any> }) {
  const { news, total, error } = await dataPromise;
  return <News initialNews={news || []} total={total} error={error} />;
}

export const revalidate = 60;
