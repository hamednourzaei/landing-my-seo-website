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
async function getNews(
  page: number = 1,
  pageSize: number = 10,
  day: "yesterday" | "today" | "tomorrow" = "today"
) {
  try {
    const today = new Date();
    let date: string;

    // Calculate the date based on the selected day
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
    const res = await fetch(url, { next: { revalidate: 60 } });

    if (!res.ok) {
      throw new Error(`Failed to fetch news: ${res.status} ${res.statusText}`);
    }

    const data = await res.json();

    let news: NewsItem[] = [];
    let total: number = 0;

    // Handle API response
    if (Array.isArray(data)) {
      news = data.map((item: any, idx: number) => ({
        id: item.id || `${idx}`,
        title: item.title || "No Title",
        link: item.link || "#",
        published: item.published || date,
        source: item.source || "Google News",
        summary: item.summary || "No Summary",
        languages: item.languages || "en",
      }));
      total = data.length;
    } else if (Array.isArray(data.news)) {
      news = data.news.map((item: any, idx: number) => ({
        id: item.id || `${idx}`,
        title: item.title || "No Title",
        link: item.link || "#",
        published: item.published || date,
        source: item.source || "Google News",
        summary: item.summary || "No Summary",
        languages: item.languages || "en",
      }));
      total = typeof data.total === "number" ? data.total : news.length;
    } else {
      throw new Error("Invalid API response format");
    }

    // Preload the second page
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
      error: err instanceof Error ? err.message : "Unknown error",
    };
  }
}

// Define the NewsPage component
export default async function NewsPage({
  searchParams,
}: {
  searchParams?: { day?: string };
}) {
  // Validate and set the day parameter
  const day =
    searchParams?.day === "yesterday" ||
    searchParams?.day === "today" ||
    searchParams?.day === "tomorrow"
      ? searchParams.day
      : "today";

  const data = await getNews(1, 12, day);

  return (
    <Suspense fallback={<NewsSkeleton />}>
      <News
        initialNews={data.news || []}
        total={data.total}
        error={data.error}
        selectedDay={day}
      />
    </Suspense>
  );
}

export const revalidate = 60;