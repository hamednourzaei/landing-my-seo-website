import type { NewsItem } from "@/types/news";
import News from "@/components/layout/sections/News";

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
    const apiUrl =
      process.env.NEXT_PUBLIC_API_URL || "https://tsarseo.online/api/news";
    const url = `${apiUrl}?page=${page}&pageSize=${pageSize}`;
    console.log("Fetching from URL:", url); // برای دیباگ
    const res = await fetch(url, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch news: ${res.status} ${res.statusText}`);
    }

    const data = await res.json();
    console.log("API Response (page.tsx):", data);

    // اگر API یک آرایه مستقیم برگرداند، آن را به شکل { news, total } تبدیل می‌کنیم
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
      throw new Error(
        "Invalid API response: expected an array or object with 'news' array"
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
  const { news, total, error } = await getNews(1, 10);
  return <News initialNews={news || []} total={total} error={error} />;
}

export const revalidate = 60; // بازسازی هر ۱ دقیقه
