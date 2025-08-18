import { NextResponse } from "next/server";
import type { NewsItem } from "@/types/news";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const pageSize = parseInt(searchParams.get("pageSize") || "10");

    const today = new Date().toISOString().split("T")[0];
    const res = await fetch(
      `https://hamednourzaei.github.io/api_google_news/news_${today}.json`,
      { next: { revalidate: 60 } }
    );

    if (!res.ok) {
      throw new Error(`Failed to fetch news: ${res.status} ${res.statusText}`);
    }

    const data = await res.json();
    console.log("API Response (route.ts):", data);

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

    if (!data || !Array.isArray(data)) {
      console.warn("Invalid API response, using fallback news");
      return NextResponse.json({ news: fallbackNews, total: fallbackNews.length });
    }

    const news: NewsItem[] = data
      .slice((page - 1) * pageSize, page * pageSize)
      .map((item: any, idx: number) => ({
        id: item.id || `${idx}`,
        title: item.title || "بدون عنوان",
        link: item.link || "#",
        published: item.published || new Date().toISOString().split("T")[0],
        source: item.source || "Google News",
        summary: item.summary || "بدون خلاصه",
        languages: item.languages || "en",
      }));

    return NextResponse.json({ news, total: data.length });
  } catch (err) {
    console.error("Error in GET /api/news:", err);
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
    return NextResponse.json({ news: fallbackNews, total: fallbackNews.length });
  }
}