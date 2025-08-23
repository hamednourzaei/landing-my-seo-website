import type { NewsItem } from "@/types/news";
import { Suspense } from "react";
import dynamic from "next/dynamic";
import { NewsSkeleton } from "@/components/ui/skeleton";

const News = dynamic(() => import("@/components/layout/sections/News"), {
  ssr: true,
  loading: () => <NewsSkeleton />,
});

const fallbackNews: NewsItem[] = [
  {
    id: "1",
    title: "بهینه‌سازی سئو با TsarSEO - خبر نمونه ۱",
    link: "/news/1",
    published: "2025-08-18",
    source: "TsarSEO",
    summary: "ابزار TsarSEO برای بهبود رتبه‌بندی سایت شما با تحلیل پیشرفته.",
    content: "محتوای کامل خبر نمونه برای بهبود سئو با ابزار TsarSEO.",
    languages: "fa", // اضافه کردن فیلد languages
  },
  {
    id: "2",
    title: "رشد ترافیک با TsarSEO - خبر نمونه ۲",
    link: "/news/2",
    published: "2025-08-18",
    source: "TsarSEO",
    summary: "استراتژی‌های سئو برای افزایش بازدید واقعی با TsarSEO.",
    content: "محتوای کامل خبر نمونه برای رشد ترافیک با TsarSEO.",
    languages: "fa", // اضافه کردن فیلد languages
  },
];

async function getNews(page: number = 1) {
  const pageSize = 8;
  try {
    const validPage = Math.max(1, Number(page) || 1);
    const baseUrl =
      process.env.NEXT_PUBLIC_API_URL || "https://tsarseo.online/api/news";
    const url = `${baseUrl}?page=${validPage}&pageSize=${pageSize}`;
    const res = await fetch(url, { next: { revalidate: 60 } });
    if (!res.ok) {
      throw new Error(`Failed to fetch news: ${res.status} ${res.statusText}`);
    }
    const data = await res.json();
    let news: NewsItem[] = [];
    let total: number = 0;
    if (Array.isArray(data.news)) {
      news = data.news.map((item: any, idx: number) => ({
        id: item.id || `${validPage}-${idx}`,
        title: item.title
          ? `${item.title} - TsarSEO`
          : `خبر سئو با TsarSEO - ${idx + 1}`,
        link: `/news/${item.id || `${validPage}-${idx}`}`,
        published: item.published || new Date().toISOString().split("T")[0],
        source: item.source || "TsarSEO News",
        summary: item.summary
          ? `${item.summary} با ابزار TsarSEO بهبود یابید.`
          : "تحلیل و بهینه‌سازی سئو با TsarSEO.",
        content:
          item.content || item.summary || "محتوای کامل خبر در دسترس نیست.",
        languages: item.languages || "fa", // اضافه کردن فیلد languages
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

export async function generateMetadata({
  searchParams,
}: {
  searchParams: { page?: string };
}) {
  const page = Number(searchParams.page) || 1;
  const data = await getNews(page);
  const firstNews = data.news[0] || fallbackNews[0];
  const titles = data.news
    .slice(0, 3)
    .map((item) => item.title)
    .join("، ");
  const pageTitle = titles
    ? `${titles} | TsarSEO`
    : `اخبار سئو | TsarSEO - صفحه ${page}`;
  const pageDescription =
    firstNews.summary.slice(0, 160) ||
    "آخرین اخبار و تحلیل‌های سئو برای بهینه‌سازی سایت با TsarSEO";

  return {
    title: pageTitle,
    description: pageDescription,
    keywords: ["tsarseo", "سئو", "بهینه‌سازی سایت", "اخبار سئو", "SEO tools"],
    alternates: {
      canonical: `https://tsarseo.online/news?page=${page}`,
    },
    openGraph: {
      title: pageTitle,
      description: pageDescription,
      url: `https://tsarseo.online/news?page=${page}`,
      siteName: "TsarSEO",
      type: "article",
      images: [
        {
          url: "https://tsarseo.online/og-image.jpg", // جایگزین با تصویر واقعی
          width: 1200,
          height: 630,
          alt: "اخبار سئو TsarSEO",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description: pageDescription,
      images: ["https://tsarseo.online/og-image.jpg"],
    },
    other: {
      "script:ld+json": JSON.stringify([
        {
          "@context": "https://schema.org",
          "@type": "NewsArticle",
          headline: firstNews.title,
          datePublished: firstNews.published,
          description: firstNews.summary.slice(0, 160),
          author: { "@type": "Organization", name: "TsarSEO" },
          publisher: {
            "@type": "Organization",
            name: "TsarSEO",
            logo: {
              "@type": "ImageObject",
              url: "https://tsarseo.online/logo.png",
            },
          },
          mainEntityOfPage: {
            "@type": "WebPage",
            "@id": `https://tsarseo.online/news?page=${page}`,
          },
        },
        {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: "خانه",
              item: "https://tsarseo.online",
            },
            {
              "@type": "ListItem",
              position: 2,
              name: `اخبار - صفحه ${page}`,
              item: `https://tsarseo.online/news?page=${page}`,
            },
          ],
        },
      ]),
    },
  };
}

export default async function NewsPage({
  searchParams,
}: {
  searchParams: { page?: string };
}) {
  const page = Number(searchParams.page) || 1;
  const data = await getNews(page);
  return (
    <Suspense fallback={<NewsSkeleton />}>
      <h1>اخبار سئو با TsarSEO - صفحه {page}</h1>
      <News
        initialNews={data.news || []}
        total={data.total}
        error={data.error}
        currentPage={page}
      />
      <a href="/services">ابزارهای سئو TsarSEO</a>
    </Suspense>
  );
}

export const revalidate = 300;
