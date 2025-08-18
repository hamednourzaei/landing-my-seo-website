import NewsCard, { NewsItem } from "@/components/layout/sections/News";

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

const BASE_URL = "https://tsarseo.online";

async function getNews(page = 1, pageSize = 10) {
  try {
    const res = await fetch(
      `${BASE_URL}/api/news?page=${page}&pageSize=${pageSize}`,
      {
        cache: "no-store",
      }
    );

    if (!res.ok) throw new Error("Failed to fetch news");

    const data = await res.json();

    const items: NewsItem[] = Array.isArray(data.items)
      ? data.items.map((item: any, idx: number) => ({
          id: item.id || `${idx}`,
          title: item.title,
          link: item.link,
          published: item.date,
          source: item.source || "Google News",
          summary: item.summary || "",
          languages: item.languages || "fa",
        }))
      : [];

    const total = typeof data.total === "number" ? data.total : items.length;

    return { news: items, total };
  } catch (err) {
    console.error(err);
    return { news: fallbackNews, total: fallbackNews.length };
  }
}

export default async function NewsPage() {
  const { news, total } = await getNews(1);
  return <NewsCard initialNews={news} total={total} />;
}

export const revalidate = 60; // بازسازی هر ۱ دقیقه
