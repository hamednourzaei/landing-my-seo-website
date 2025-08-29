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
    link: "https://tsarseo.online/sample-news/1",
    published: "2025-08-18",
    source: "TsarSEO",
    summary: "ابزار TsarSEO برای بهبود رتبه‌بندی سایت شما با تحلیل پیشرفته.",
    content: "محتوای کامل خبر نمونه برای بهبود سئو با ابزار TsarSEO.",
    languages: "fa",
  },
  {
    id: "2",
    title: "رشد ترافیک با TsarSEO - خبر نمونه ۲",
    link: "https://tsarseo.online/sample-news/2",
    published: "2025-08-18",
    source: "TsarSEO",
    summary: "استراتژی‌های سئو برای افزایش بازدید واقعی با TsarSEO.",
    content: "محتوای کامل خبر نمونه برای رشد ترافیک با TsarSEO.",
    languages: "fa",
  },
];

interface PageProps {
  searchParams: Promise<{ page?: string }>;
}

async function getNews(page: number = 1) {
  const pageSize = 8;
  try {
    const validPage = Math.max(1, Number(page) || 1);
    const baseUrl =
      process.env.NEXT_PUBLIC_API_URL || "https://tsarseo.online/api/news";
    const url = `${baseUrl}?page=${validPage}&pageSize=${pageSize}`;
    const res = await fetch(url, { next: { revalidate: 60 } });
    if (!res.ok)
      throw new Error(`Failed to fetch news: ${res.status} ${res.statusText}`);
    const data = await res.json();
    let news: NewsItem[] = [];
    let total: number = 0;

    if (Array.isArray(data.news)) {
      news = data.news.map((item: any, idx: number) => ({
        id: item.id || `${validPage}-${idx}`,
        title: item.title
          ? `${item.title} - TsarSEO`
          : `خبر سئو با TsarSEO - ${idx + 1}`,
        link: item.link || `/news/${item.id || `${validPage}-${idx}`}`,
        published: item.published || new Date().toISOString().split("T")[0],
        source: item.source || "TsarSEO News",
        summary: item.summary
          ? `${item.summary} TsarSEO `
          : "تحلیل و بهینه‌سازی سئو با TsarSEO.",
        content:
          item.content || item.summary || "محتوای کامل خبر در دسترس نیست.",
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

export async function generateMetadata({ searchParams }: PageProps) {
  const { page } = await searchParams;
  const pageNumber = Number(page) || 1;
  const data = await getNews(pageNumber);
  const firstNews = data.news[0] || fallbackNews[0];
  const titles = data.news
    .slice(0, 3)
    .map((item) => item.title)
    .join("، ");
  const pageTitle = titles
    ? `${titles} | TsarSEO`
    : `اخبار سئو | TsarSEO - صفحه ${pageNumber}`;
  const pageDescription =
    firstNews.summary.slice(0, 160) ||
    "آخرین اخبار و تحلیل‌های سئو برای بهینه‌سازی سایت با TsarSEO و استراتژی‌های لینک‌سازی حرفه‌ای.";

  return {
    title: pageTitle,
    description: pageDescription,
    keywords: [
      "tsarseo",
      "سئو",
      "بهینه‌سازی سایت",
      "اخبار سئو",
      "SEO tools",
      "لینک‌سازی",
    ],
    alternates: { canonical: `https://tsarseo.online/news?page=${pageNumber}` },
    openGraph: {
      title: pageTitle,
      description: pageDescription,
      url: `https://tsarseo.online/news?page=${pageNumber}`,
      siteName: "TsarSEO",
      type: "article",
      images: [
        {
          url: "https://tsarseo.online/icons/Logo.png",
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
      images: ["https://tsarseo.online/icons/Logo.png"],
    },
    other: {
      "script:ld+json": JSON.stringify([
        ...data.news.map((newsItem) => ({
          "@context": "https://schema.org",
          "@type": "NewsArticle",
          headline: newsItem.title,
          datePublished: newsItem.published,
          description: newsItem.summary.slice(0, 160),
          author: { "@type": "Organization", name: "TsarSEO" },
          publisher: {
            "@type": "Organization",
            name: "TsarSEO",
            logo: {
              "@type": "ImageObject",
              url: "https://tsarseo.online/logo.png",
            },
          },
          mainEntityOfPage: { "@type": "WebPage", "@id": newsItem.link },
        })),
        {
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "TsarSEO",
          url: "https://tsarseo.online",
          logo: "https://tsarseo.online/icons/logo.png",
          contactPoint: {
            "@type": "ContactPoint",
            telephone: "+98-21-12345678",
            contactType: "customer service",
          },
          sameAs: [
            "https://www.linkedin.com/company/tsarseo",
            "https://www.youtube.com/@tsarseo",
          ],
        },
        {
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          name: "TsarSEO",
          url: "https://tsarseo.online",
          telephone: "+98-21-12345678",
          address: {
            "@type": "PostalAddress",
            streetAddress: "خیابان اصلی، پلاک 123",
            addressLocality: "تهران",
            addressCountry: "IR",
          },
        },
        {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: [
            {
              "@type": "Question",
              name: "چگونه TsarSEO اخبار سئو را ارائه می‌دهد؟",
              acceptedAnswer: {
                "@type": "Answer",
                text: "TsarSEO اخبار و تحلیل‌های به‌روز سئو را با استفاده از منابع معتبر و استراتژی‌های لینک‌سازی سفید مانند مطالعات موردی و وبینارها ارائه می‌دهد.",
              },
            },
            {
              "@type": "Question",
              name: "چه روش‌های لینک‌سازی توسط TsarSEO استفاده می‌شود؟",
              acceptedAnswer: {
                "@type": "Answer",
                text: "TsarSEO از روش‌های لینک‌سازی سفید مانند مطالعات موردی، اسپانسرشیپ رویدادها، بورسیه‌های دانشجویی، ابزارهای رایگان، اینفوگرافیک‌ها، پادکست‌ها، HARO، وبینارها و فعالیت در گروه‌های LinkedIn استفاده می‌کند. همچنین روش‌های خاکستری مانند نظرات هدفمند و انتشار PDF نیز به کار می‌روند.",
              },
            },
          ],
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
              name: `اخبار - صفحه ${pageNumber}`,
              item: `https://tsarseo.online/news?page=${pageNumber}`,
            },
          ],
        },
        {
          "@context": "https://schema.org",
          "@type": "AggregateRating",
          ratingValue: "4.8",
          reviewCount: "150",
          bestRating: "5",
          worstRating: "1",
          itemReviewed: {
            "@type": "Service",
            name: "خدمات سئو TsarSEO",
          },
        },
      ]),
    },
  };
}

export default async function NewsPage({ searchParams }: PageProps) {
  const { page } = await searchParams;
  const pageNumber = Number(page) || 1;
  const data = await getNews(pageNumber);

  return (
    <Suspense fallback={<NewsSkeleton />}>
      <News
        initialNews={data.news || []}
        total={data.total}
        error={data.error}
        currentPage={pageNumber}
      />
    </Suspense>
  );
}

export const revalidate = 300;
