// app/(main)/news/page.tsx
import NewsCard from "@/components/layout/sections/News";

export const metadata = {
  title: "آخرین اخبار جهانی | Google News Feed",
  description:
    "آخرین اخبار روزانه با خلاصه کوتاه و لینک به منبع اصلی. مشاهده اخبار از منابع معتبر به صورت مرتب و دسته‌بندی شده.",
  openGraph: {
    title: "آخرین اخبار جهانی | Google News Feed",
    description:
      "آخرین اخبار روزانه با خلاصه کوتاه و لینک به منبع اصلی. مشاهده اخبار از منابع معتبر.",
    type: "website",
    url: "https://yourwebsite.com/news",
  },
  twitter: {
    card: "summary_large_image",
    title: "آخرین اخبار جهانی | Google News Feed",
    description:
      "آخرین اخبار روزانه با خلاصه کوتاه و لینک به منبع اصلی. مشاهده اخبار از منابع معتبر.",
  },
};

export interface NewsItem {
  id: string;
  title: string;
  link: string;
  published: string;
  source: string;
  summary: string;
  languages: string;
}

// دیتا fallback
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
  {
    id: "3",
    title: "نمونه خبر پیش‌فرض ۳",
    link: "#",
    published: "2025-08-18",
    source: "منبع پیش‌فرض",
    summary: "این یک خبر دیگر برای fallback است.",
    languages: "fa",
  },
  {
    id: "4",
    title: "نمونه خبر پیش‌فرض ۴",
    link: "#",
    published: "2025-08-18",
    source: "منبع پیش‌فرض",
    summary: "این یک خبر دیگر برای fallback است.",
    languages: "fa",
  },
];

// fetch سمت سرور با پشتیبانی از صفحه‌بندی
async function getNews(
  page: number = 1,
  pageSize: number = 10
): Promise<{ news: NewsItem[]; total: number }> {
  try {
    const res = await fetch(
      `https://hamednourzaei.github.io/api_google_news/news_2025-08-18.json`,
      { next: { revalidate: 3600 } }
    );
    if (!res.ok) throw new Error(`Failed to fetch news: ${res.status}`);
    const data = await res.json();
    const items = Array.isArray(data.items) ? data.items : [];
    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    return { news: items.slice(start, end), total: items.length };
  } catch (error) {
    console.error("Fetch failed, using fallback data:", error);
    return {
      news: fallbackNews.slice(0, pageSize),
      total: fallbackNews.length,
    };
  }
}

export default async function NewsPage() {
  const { news, total } = await getNews(1);
  return <NewsCard initialNews={news} total={total} />;
}

// تنظیم ISR
export const revalidate = 3600; // صفحه هر ۱ ساعت بازسازی می‌شود
