import { NextResponse } from "next/server";

const fallbackNews = {
  items: [
    {
      id: "1",
      title: "خبر نمونه ۱",
      link: "#",
      date: "2025-08-18",
      source: "منبع پیش‌فرض",
      summary: "این یک خلاصه پیش‌فرض است.",
      languages: "fa",
    },
    {
      id: "2",
      title: "خبر نمونه ۲",
      link: "#",
      date: "2025-08-18",
      source: "منبع پیش‌فرض",
      summary: "این یک خبر دیگر برای fallback است.",
      languages: "fa",
    },
  ],
  total: 2,
};

export async function GET() {
  try {
    const res = await fetch(
      "https://hamednourzaei.github.io/api_google_news/news_2025-08-18.json",
      { next: { revalidate: 60 } }
    );

    const text = await res.text();

    try {
      const data = JSON.parse(text);
      return NextResponse.json(data);
    } catch (error) {
      console.error("خطای تجزیه JSON:", error);
      return NextResponse.json(fallbackNews);
    }
  } catch (error) {
    console.error("خطا در دریافت داده‌ها:", error);
    return NextResponse.json(fallbackNews);
  }
}
