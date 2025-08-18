// app/api/news/route.ts
import { NextResponse } from "next/server";

const fallbackNews = {
  items: [
    {
      title: "خبر نمونه ۱",
      link: "#",
      date: "2025-08-18",
    },
    {
      title: "خبر نمونه ۲",
      link: "#",
      date: "2025-08-18",
    },
  ],
  total: 2,
};

export async function GET() {
  try {
    const res = await fetch(
      "https://hamednourzaei.github.io/api_google_news/news_2025-08-18.json",
      { next: { revalidate: 60 } } // کش برای 1 دقیقه
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
