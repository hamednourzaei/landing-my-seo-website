import { NextResponse } from "next/server";
import type { NewsItem } from "@/types/news";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const pageSize = parseInt(searchParams.get("pageSize") || "10");

    // Generate a list of dates to fetch (e.g., last 30 days)
    const today = new Date();
    const dates: string[] = [];
    for (let i = 0; i < 30; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      dates.push(date.toISOString().split("T")[0]);
    }

    const baseUrl = "https://hamednourzaei.github.io/api_google_news";
    let allNews: NewsItem[] = [];

    // Fetch news from all available JSON files
    for (const date of dates) {
      try {
        const res = await fetch(`${baseUrl}/news_${date}.json`, {
          next: { revalidate: 60 },
        });

        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data)) {
            const news = data.map((item: any, idx: number) => ({
              id: item.id || `${date}-${idx}`,
              title: item.title || "بدون عنوان",
              link: item.link || "#",
              published: item.published || date,
              source: item.source || "Google News",
              summary: item.summary || "بدون خلاصه",
              languages: item.languages || "en",
            }));
            allNews = [...allNews, ...news];
          }
        }
      } catch (err) {
        console.warn(`Failed to fetch news for ${date}:`, err);
        continue; // Skip to next date if one fails
      }
    }

    // Fallback if no news is fetched
    const fallbackNews: NewsItem[] = [
      {
        id: "1",
        title: "نمونه خبر پیش‌فرض ۱",
        link: "#",
        published: today.toISOString().split("T")[0],
        source: "منبع پیش‌فرض",
        summary: "این یک خلاصه پیش‌فرض برای زمانی است که fetch شکست بخورد.",
        languages: "fa",
      },
      {
        id: "2",
        title: "نمونه خبر پیش‌فرض ۲",
        link: "#",
        published: today.toISOString().split("T")[0],
        source: "منبع پیش‌فرض",
        summary: "این یک خبر دیگر برای fallback است.",
        languages: "fa",
      },
    ];

    if (allNews.length === 0) {
      console.warn("No news fetched, using fallback");
      return NextResponse.json({
        news: fallbackNews,
        total: fallbackNews.length,
      });
    }

    // Sort all news by date (newest first)
    allNews.sort(
      (a, b) =>
        new Date(b.published).getTime() - new Date(a.published).getTime()
    );

    // Paginate the results
    const paginatedNews = allNews.slice((page - 1) * pageSize, page * pageSize);

    return NextResponse.json({
      news: paginatedNews,
      total: allNews.length,
    });
  } catch (err) {
    console.error("Error in GET /api/news:", err);
    const fallbackNews: NewsItem[] = [
      {
        id: "1",
        title: "نمونه خبر پیش‌فرض ۱",
        link: "#",
        published: new Date().toISOString().split("T")[0],
        source: "منبع پیش‌فرض",
        summary: "این یک خلاصه پیش‌فرض برای زمانی است که fetch شکست بخورد.",
        languages: "fa",
      },
      {
        id: "2",
        title: "نمونه خبر پیش‌فرض ۲",
        link: "#",
        published: new Date().toISOString().split("T")[0],
        source: "منبع پیش‌فرض",
        summary: "این یک خبر دیگر برای fallback است.",
        languages: "fa",
      },
    ];
    return NextResponse.json({
      news: fallbackNews,
      total: fallbackNews.length,
    });
  }
}
