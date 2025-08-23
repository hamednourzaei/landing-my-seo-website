import type { NewsItem } from "@/types/news";
import { Suspense } from "react";
import { NewsSkeleton } from "@/components/ui/skeleton";

async function getNewsItem(id: string) {
  try {
    const baseUrl =
      process.env.NEXT_PUBLIC_API_URL || "https://tsarseo.online/api/news";
    const url = `${baseUrl}/${id}`;
    const res = await fetch(url, { next: { revalidate: 60 } });
    if (!res.ok) {
      throw new Error(
        `Failed to fetch news item: ${res.status} ${res.statusText}`
      );
    }
    const item = await res.json();
    return {
      newsItem: {
        id: item.id || id,
        title: item.title
          ? `${item.title} - TsarSEO`
          : `خبر سئو با TsarSEO - ${id}`,
        link: `/news/${item.id || id}`,
        published: item.published || new Date().toISOString().split("T")[0],
        source: item.source || "TsarSEO News",
        summary: item.summary
          ? `${item.summary} با ابزار TsarSEO بهبود یابید.`
          : "تحلیل و بهینه‌سازی سئو با TsarSEO.",
        content:
          item.content || item.summary || "محتوای کامل خبر در دسترس نیست.",
        languages: item.languages || "fa", // اضافه کردن فیلد languages
      },
      error: null,
    };
  } catch (err) {
    console.error("Error fetching news item:", err);
    return {
      newsItem: null,
      error: err instanceof Error ? err.message : "Unknown error",
    };
  }
}

export async function generateMetadata({ params }: { params: { id: string } }) {
  const { id } = params;
  const { newsItem } = await getNewsItem(id);
  if (!newsItem) {
    return {
      title: "خبر یافت نشد | TsarSEO",
      description:
        "خبری با این شناسه یافت نشد. برای اخبار سئو به TsarSEO مراجعه کنید.",
      keywords: ["tsarseo", "سئو", "اخبار سئو"],
      alternates: {
        canonical: `https://tsarseo.online/news/${id}`,
      },
    };
  }
  return {
    title: newsItem.title,
    description: newsItem.summary.slice(0, 160),
    keywords: [
      "tsarseo",
      "سئو",
      "بهینه‌سازی سایت",
      "اخبار سئو",
      newsItem.title.split(" ")[0],
    ],
    alternates: {
      canonical: `https://tsarseo.online/news/${id}`,
    },
    openGraph: {
      title: newsItem.title,
      description: newsItem.summary.slice(0, 160),
      url: `https://tsarseo.online/news/${id}`,
      siteName: "TsarSEO",
      type: "article",
      images: [
        {
          url: "https://tsarseo.online/og-image.jpg",
          width: 1200,
          height: 630,
          alt: newsItem.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: newsItem.title,
      description: newsItem.summary.slice(0, 160),
      images: ["https://tsarseo.online/og-image.jpg"],
    },
    other: {
      "script:ld+json": JSON.stringify([
        {
          "@context": "https://schema.org",
          "@type": "NewsArticle",
          headline: newsItem.title,
          datePublished: newsItem.published,
          description: newsItem.summary.slice(0, 160),
          articleBody: newsItem.content,
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
            "@id": `https://tsarseo.online/news/${id}`,
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
              name: "اخبار",
              item: "https://tsarseo.online/news",
            },
            {
              "@type": "ListItem",
              position: 3,
              name: newsItem.title,
              item: `https://tsarseo.online/news/${id}`,
            },
          ],
        },
      ]),
    },
  };
}

export default async function NewsItemPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
  const { newsItem, error } = await getNewsItem(id);

  if (error || !newsItem) {
    return (
      <div>
        <h1>خطا در بارگذاری خبر</h1>
        <p>
          خبری با این شناسه یافت نشد. <a href="/news">بازگشت به اخبار</a>
        </p>
      </div>
    );
  }

  return (
    <Suspense fallback={<NewsSkeleton />}>
      <article>
        <h1>{newsItem.title}</h1>
        <p>منتشرشده در: {newsItem.published}</p>
        <p>منبع: {newsItem.source}</p>
        <div>{newsItem.content}</div>
        <p>
          با <a href="/services">ابزارهای TsarSEO</a> رتبه سایت خود را بهبود
          دهید.
        </p>
        <a href="/news">بازگشت به اخبار</a>
      </article>
    </Suspense>
  );
}
