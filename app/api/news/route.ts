import { NewsItem } from "@/components/layout/sections/NewsCard";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const today = new Date().toISOString().split("T")[0];
    const res = await fetch(
      `https://hamednourzaei.github.io/api_google_news/news_${today}.json`,
      { next: { revalidate: 60 } }
    );

    if (!res.ok) {
      throw new Error(`Failed to fetch news: ${res.status}`);
    }

    const data = await res.json();
    console.log("API Response (route.ts):", data); // برای دیباگ

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
      return NextResponse.json(fallbackNews);
    }

    const news: NewsItem[] = data.map((item: any, idx: number) => ({
      id: item.id || `${idx}`,
      title: item.title || "بدون عنوان",
      link: item.link || "#",
      published: item.published || new Date().toISOString().split("T")[0],
      source: item.source || "Google News",
      summary: item.summary || "بدون خلاصه",
      languages: item.languages || "en", // پیش‌فرض به "en" برای تطبیق با داده‌های API
    }));

    return NextResponse.json(news);
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
    return NextResponse.json(fallbackNews);
  }
}
