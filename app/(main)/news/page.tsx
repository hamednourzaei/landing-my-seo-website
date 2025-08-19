import type { NewsItem } from "@/types/news";
import { Suspense, useEffect, useRef, useState } from "react";
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

    // Use today's date for API requests
    const today = new Date();
    const date = today.toISOString().split("T")[0];

    const baseUrl = "https://hamednourzaei.github.io/api_google_news";
    const url = `${baseUrl}/news_${date}.json?page=${validPage}&pageSize=${validPageSize}`;
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
        id: item.id || `${validPage}-${idx}`,
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
        id: item.id || `${validPage}-${idx}`,
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

// Client-side component for infinite scroll
function NewsInfiniteScroll({
  initialNews,
  total,
  initialError,
  initialPage,
  pageSize,
}: {
  initialNews: NewsItem[];
  total: number;
  initialError: string | null;
  initialPage: number;
  pageSize: number;
}) {
  const [news, setNews] = useState<NewsItem[]>(initialNews);
  const [page, setPage] = useState(initialPage + 1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(initialError);
  const [hasMore, setHasMore] = useState(news.length < total);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  // Load more news when reaching the bottom
  useEffect(() => {
    if (!hasMore || isLoading) return;

    observerRef.current = new IntersectionObserver(
      async (entries) => {
        if (entries[0].isIntersecting) {
          setIsLoading(true);
          const data = await getNews(page, pageSize);
          setNews((prev) => [...prev, ...data.news]);
          setHasMore(data.news.length === pageSize && page * pageSize < data.total);
          setPage((prev) => prev + 1);
          setError(data.error);
          setIsLoading(false);
        }
      },
      { threshold: 0.1 }
    );

    if (loadMoreRef.current) {
      observerRef.current.observe(loadMoreRef.current);
    }

    return () => {
      if (observerRef.current && loadMoreRef.current) {
        observerRef.current.unobserve(loadMoreRef.current);
      }
    };
  }, [page, pageSize, hasMore, isLoading]);

  return (
    <>
      <News
        initialNews={news}
        total={total}
        error={error}
        currentPage={page}
        pageSize={pageSize}
      />
      {hasMore && (
        <div ref={loadMoreRef} className="h-10">
          {isLoading && <NewsSkeleton />}
        </div>
      )}
    </>
  );
}

// Define the NewsPage component with type assertion to bypass Netlify plugin issue
export default async function NewsPage({
  searchParams,
}: {
  searchParams: any; // Type assertion to bypass Promise<any> expectation
}) {
  // Extract and validate query parameters
  const page = Math.max(1, Number(searchParams.page) || 1);
  const pageSize = 12; // Fixed to 12 items per page

  const data = await getNews(page, pageSize);

  return (
    <Suspense fallback={<NewsSkeleton />}>
      <NewsInfiniteScroll
        initialNews={data.news || []}
        total={data.total}
        initialError={data.error}
        initialPage={page}
        pageSize={pageSize}
      />
    </Suspense>
  );
}

export const revalidate = 300;
