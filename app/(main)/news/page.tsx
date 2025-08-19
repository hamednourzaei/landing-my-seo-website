// app/(main)/news/page.tsx
import type { NewsItem } from "@/types/news";
import { Suspense } from "react";
import dynamic from "next/dynamic";
import { NewsSkeleton } from "@/components/ui/skeleton";

// Dynamically import the News component with server-side rendering enabled
const News = dynamic(() => import("@/components/layout/sections/News"), {
  ssr: true,
  loading: () => <NewsSkeleton />,
});

// Fallback news data in case API fetch fails
const fallbackNews: NewsItem[] = [
  {
    id: "1",
    title: "Sample News Item 1",
    link: "#",
    published: "2025-08-18",
    source: "Default Source",
    summary: "This is a default summary for when the fetch fails.",
    languages: "en",
  },
  {
    id: "2",
    title: "Sample News Item 2",
    link: "#",
    published: "2025-08-18",
    source: "Default Source",
    summary: "Another sample news item for fallback.",
    languages: "en",
  },
];

// Fetch news data from the API
async function getNews(page: number = 1, pageSize: number = 12) {
  try {
    // Validate page and pageSize
    const validPage = Math.max(1, Number(page) || 1);
    const validPageSize = Math.max(1, Math.min(100, Number(pageSize) || 12));
    const today = new Date().toISOString().split("T")[0];
    const baseUrl = "https://hamednourzaei.github.io/api_google_news";
    const url = `${baseUrl}/news_${today}.json?page=${validPage}&pageSize=${validPageSize}`;
    const res = await fetch(url, { next: { revalidate: 60 } });
    if (!res.ok) {
      throw new Error(`Failed to fetch news: ${res.status} ${res.statusText}`);
    }
    const data = await res.json();
    let news: NewsItem[] = [];
    let total: number = 0;

    // Process API response
    const mapNewsItem = (item: any, idx: number): NewsItem => ({
      id: item.id || `${validPage}-${idx}`,
      title: item.title || "No Title",
      link: item.link || "#",
      published: item.published || today,
      source: item.source || "Google News",
      summary: item.summary || "No Summary",
      languages: item.languages || "en",
    });

    if (Array.isArray(data)) {
      news = data.map(mapNewsItem);
      total = data.length;
    } else if (Array.isArray(data.news)) {
      news = data.news.map(mapNewsItem);
      total = typeof data.total === "number" ? data.total : news.length;
    } else {
      throw new Error("Invalid API response format");
    }
    return { news, total, error: null };
  } catch (err) {
    console.error("Error fetching news:", err);
    return {
      news: fallbackNews,
      total: fallbackNews.length,
      error: err instanceof Error ? err.message : "Unknown error",
    };
  }
}

export default async function NewsPage() {
  const pageSize = 12;
  const data = await getNews(1, pageSize); // Always fetch first page

  return (
    <Suspense fallback={<NewsSkeleton />}>
      <News
        initialNews={data.news || []}
        total={data.total}
        error={data.error}
        pageSize={pageSize}
      />
    </Suspense>
  );
}

export const revalidate = 60;
