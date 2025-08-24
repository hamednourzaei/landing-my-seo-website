import Image from "next/image";
import { Star } from "lucide-react";
import dynamic from "next/dynamic";
import { cache } from "react";
import { Suspense } from "react";
import type { Metadata } from "next";

// تعریف اینترفیس
interface SuccessStoryProps {
  id: string;
  image: {
    src: string;
    alt: string;
  };
  name: string;
  role: string;
  comment: string;
  rating: number;
  url?: string;
}

// بارگذاری پویای کاروسل برای SSR
const TestimonialCarousel = dynamic(() => import("./TestimonialCarousel"), {
  ssr: false, // غیرفعال کردن رندر سمت سرور برای کاروسل
  loading: () => <div role="status">در حال بارگذاری نظرات...</div>,
});

// متادیتا برای سئو
export const metadata: Metadata = {
  title: "نظرات مشتریان موفق TsarSEO | بازخورد و تجربیات واقعی کاربران",
  description:
    "تجربیات واقعی مشتریان TsarSEO را بخوانید و ببینید چگونه خدمات سئو ما به بهبود رتبه‌بندی و افزایش بازدید سایت‌ها کمک کرده است.",
  keywords: [
    "نظرات مشتریان TsarSEO",
    "بازخورد کاربران سئو",
    "تجربیات واقعی سئو سایت",
    "موفقیت مشتریان سئو ایران",
    "بررسی خدمات سئو",
    "رتبه‌بندی گوگل",
  ],
  alternates: {
    canonical: "https://tsarseo.online/success-stories",
  },
  openGraph: {
    title: "نظرات مشتریان موفق TsarSEO",
    description:
      "تجربیات واقعی مشتریان ما در بهبود رتبه‌بندی و افزایش بازدید سایت با خدمات TsarSEO.",
    url: "https://tsarseo.online/success-stories",
    type: "website",
    images: [
      {
        url: "https://tsarseo.online/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "نظرات مشتریان TsarSEO",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "نظرات مشتریان موفق TsarSEO",
    description:
      "تجربیات واقعی مشتریان ما در بهبود رتبه‌بندی و افزایش بازدید سایت با خدمات TsarSEO.",
    images: ["https://tsarseo.online/og-image.jpg"],
  },
};

// تابع کش‌شده برای دریافت داده‌ها
const fetchStories = cache(async (): Promise<SuccessStoryProps[]> => {
  try {
    const response = await fetch(
      "https://hamednourzaei.github.io/apitools/db.json",
      {
        cache: "force-cache",
        next: { revalidate: 3600 },
      }
    );

    if (!response.ok) {
      throw new Error(`خطا در دریافت داده‌ها: ${response.status}`);
    }

    const data = await response.json();
    return data
      .filter(
        (story: any) =>
          story.comment &&
          typeof story.rating === "number" &&
          story.rating > 0 &&
          story.rating <= 5
      )
      .slice(0, 10)
      .map((story: any) => ({
        id: String(story.id),
        image: {
          src: story.image || "/default-image.jpg",
          alt: `تصویر پروفایل ${story.name || "کاربر"} برای نظرات TsarSEO`,
        },
        name: story.name || "ناشناس",
        role: story.role || "مشتری",
        comment: story.comment,
        rating: Math.floor(story.rating),
        url: story.url || undefined,
      }));
  } catch (err) {
    console.error("Error fetching stories:", err);
    return [];
  }
});

export default async function TestimonialSection() {
  const stories = await fetchStories();

  // Structured Data برای Rich Snippets
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "نظرات مشتریان TsarSEO",
    description: "مجموعه‌ای از بازخوردهای مشتریان موفق TsarSEO",
    itemListElement: stories.map((story, index) => ({
      "@type": "Review",
      position: index + 1,
      itemReviewed: {
        "@type": "Organization",
        name: "TsarSEO",
        sameAs: "https://tsarseo.online",
      },
      author: { "@type": "Person", name: story.name },
      reviewBody: story.comment,
      reviewRating: {
        "@type": "Rating",
        ratingValue: story.rating,
        bestRating: 5,
      },
      datePublished: new Date().toISOString(),
      publisher: {
        "@type": "Organization",
        name: "TsarSEO",
      },
    })),
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: stories.length
        ? (
            stories.reduce((sum, story) => sum + (story.rating || 0), 0) /
            stories.length
          ).toFixed(1)
        : "0",
      reviewCount: stories.length,
    },
  };

  return (
    <section
      id="success-stories"
      className="container font-kalameh font-semibold py-12 sm:py-16 md:py-24"
      itemScope
      itemType="https://schema.org/ItemList"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <header className="text-center mb-8">
        <h2
          className="text-xl sm:text-2xl md:text-3xl font-bold text-primary mb-4"
          itemProp="name"
        >
          نظرات موفقیت‌آمیز مشتریان TsarSEO
        </h2>
        <p
          className="text-sm sm:text-base md:text-lg text-gray-600"
          itemProp="description"
        >
          تجربه واقعی مشتریان ما در بهبود رتبه و افزایش بازدید
        </p>
      </header>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {stories.map((story) => (
          <article
            key={story.id}
            className="p-4 border rounded-2xl shadow bg-white"
            itemScope
            itemType="https://schema.org/Review"
            itemProp="itemListElement"
          >
            <meta itemProp="itemReviewed" content="TsarSEO Services" />
            <div className="flex items-center mb-3">
              <Image
                src={story.image.src}
                alt={story.image.alt}
                width={48}
                height={48}
                className="rounded-full mr-3"
                priority={false}
                sizes="(max-width: 768px) 48px, 48px"
              />
              <div>
                <h3 className="text-lg font-semibold" itemProp="author">
                  {story.name}
                </h3>
                <span className="text-sm text-gray-500">{story.role}</span>
              </div>
            </div>
            <p
              className="text-gray-700 mb-3 line-clamp-3"
              itemProp="reviewBody"
            >
              {story.comment}
            </p>
            <div
              className="flex items-center"
              itemProp="reviewRating"
              itemScope
              itemType="https://schema.org/Rating"
            >
              {[...Array(Math.min(Math.floor(story.rating || 0), 5))].map(
                (_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 text-yellow-500"
                    aria-hidden="true"
                  />
                )
              )}
              <meta
                itemProp="ratingValue"
                content={String(story.rating || 0)}
              />
              <meta itemProp="bestRating" content="5" />
            </div>
            {story.url && (
              <a
                href={story.url}
                className="text-primary text-sm underline mt-2 inline-block"
                itemProp="url"
                target="_blank"
                rel="noopener noreferrer nofollow"
              >
                مشاهده تجربه کامل
              </a>
            )}
          </article>
        ))}
      </div>

      <Suspense fallback={<div role="status">در حال بارگذاری نظرات...</div>}>
        {stories.length > 0 ? (
          <TestimonialCarousel stories={stories} />
        ) : (
          <div
            role="alert"
            className="text-center text-gray-500"
            itemProp="description"
          >
            هیچ نظری یافت نشد.
          </div>
        )}
      </Suspense>
    </section>
  );
}
