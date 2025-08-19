// app/(main)/news/page.tsx
import type { NewsItem } from "@/types/news";
import { Suspense } from "react";
import dynamic from "next/dynamic";
import { NewsSkeleton } from "@/components/ui/skeleton";
import { type NextPage } from "next"; // اضافه کردن نوع NextPage

// تعریف نوع برای پراپ‌ها با استفاده از NextPage
interface SearchParams {
  day?: string;
}

const News = dynamic(() => import("@/components/layout/sections/News"), {
  ssr: true,
  loading: () => <NewsSkeleton />,
});

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

async function getNews(
  page: number = 1,
  pageSize: number = 10,
  day: "yesterday" | "today" | "tomorrow" = "today"
) {
  try {
    const today = new Date();
    let date: string;
    if (day === "yesterday") {
      const yesterday = new Date(today);
      yesterday.setDate(today.getDate() - 1);
      date = yesterday.toISOString().split("T")[0];
    } else if (day === "tomorrow") {
      const tomorrow = new Date(today);
      tomorrow.setDate(today.getDate() + 1);
      date = tomorrow.toISOString().split("T")[0];
    } else {
      date = today.toISOString().split("T")[0];
    }

    const baseUrl = "https://hamednourzaei.github.io/api_google_news";
    const url = `${baseUrl}/news_${date}.json?page=${page}&pageSize=${pageSize}`;
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
        published: item.published || date,
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
        published: item.published || date,
        source: item.source || "Google News",
        summary: item.summary || "بدون خلاصه",
        languages: item.languages || "en",
      }));
      total = typeof data.total === "number" ? data.total : news.length;
    } else {
      throw new Error("Invalid API response");
    }

    if (page === 1) {
      const prefetchUrl = `${baseUrl}/news_${date}.json?page=2&pageSize=${pageSize}`;
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

// استفاده از NextPage برای تعریف نوع پراپ‌ها
const NewsPage: NextPage<{ searchParams: SearchParams }> = async ({
  searchParams,
}) => {
  const day =
    (searchParams.day as "yesterday" | "today" | "tomorrow") || "today";
  const dataPromise = getNews(1, 12, day);
  return (
    <Suspense fallback={<NewsSkeleton />}>
      <NewsWrapper dataPromise={dataPromise} selectedDay={day} />
    </Suspense>
  );
};

async function NewsWrapper({
  dataPromise,
  selectedDay,
}: {
  dataPromise: Promise<any>;
  selectedDay: "yesterday" | "today" | "tomorrow";
}) {
  const { news, total, error } = await dataPromise;
  return (
    <News
      initialNews={news || []}
      total={total}
      error={error}
      selectedDay={selectedDay}
    />
  );
}

export const revalidate = 60;

export default NewsPage;
