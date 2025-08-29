"use client";

import { useQuery } from "@tanstack/react-query";
import { Suspense } from "react";
import { StatsCardsClient } from "./StatsCardsClient";
import { Badge } from "@/components/ui/badge";
import { NewsSkeleton } from "@/components/ui/skeleton";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import Head from "next/head";

const fallbackStats = [
  {
    title: "تعداد بازدید وب‌سایت‌ها",
    value: 1089570,
    growth: 10,
    chartData: [
      { day: "شنبه", visits: 142380 },
      { day: "یک‌شنبه", visits: 155230 },
      { day: "دوشنبه", visits: 137510 },
      { day: "سه‌شنبه", visits: 145620 },
      { day: "چهارشنبه", visits: 152980 },
      { day: "پنج‌شنبه", visits: 166310 },
      { day: "جمعه", visits: 134540 },
    ],
  },
  {
    title: "تعداد کاربران جدید",
    value: 223,
    growth: 5,
    chartData: [
      { day: "شنبه", visits: 28 },
      { day: "یک‌شنبه", visits: 25 },
      { day: "دوشنبه", visits: 30 },
      { day: "سه‌شنبه", visits: 29 },
      { day: "چهارشنبه", visits: 32 },
      { day: "پنج‌شنبه", visits: 34 },
      { day: "جمعه", visits: 45 },
    ],
  },
  {
    title: "وب‌سایت‌های زیرمجموعه",
    value: 405,
    growth: 3,
    chartData: [
      { day: "شنبه", visits: 48 },
      { day: "یک‌شنبه", visits: 55 },
      { day: "دوشنبه", visits: 63 },
      { day: "سه‌شنبه", visits: 57 },
      { day: "چهارشنبه", visits: 61 },
      { day: "پنج‌شنبه", visits: 64 },
      { day: "جمعه", visits: 57 },
    ],
  },
  {
    title: "سرورهای فعال",
    value: 1623,
    growth: 2,
    chartData: [
      { day: "شنبه", visits: 230 },
      { day: "یک‌شنبه", visits: 241 },
      { day: "دوشنبه", visits: 237 },
      { day: "سه‌شنبه", visits: 229 },
      { day: "چهارشنبه", visits: 245 },
      { day: "پنج‌شنبه", visits: 222 },
      { day: "جمعه", visits: 219 },
    ],
  },
  {
    title: "تحلیل‌های امروز",
    value: 117,
    growth: 4,
    chartData: [
      { day: "شنبه", visits: 15 },
      { day: "یک‌شنبه", visits: 16 },
      { day: "دوشنبه", visits: 17 },
      { day: "سه‌شنبه", visits: 17 },
      { day: "چهارشنبه", visits: 18 },
      { day: "پنج‌شنبه", visits: 17 },
      { day: "جمعه", visits: 17 },
    ],
  },
  {
    title: "قطع همکاری‌های هفته اخیر",
    value: 131,
    growth: -9,
    chartData: [
      { day: "شنبه", visits: 17 },
      { day: "یک‌شنبه", visits: 20 },
      { day: "دوشنبه", visits: 19 },
      { day: "سه‌شنبه", visits: 21 },
      { day: "چهارشنبه", visits: 18 },
      { day: "پنج‌شنبه", visits: 17 },
      { day: "جمعه", visits: 19 },
    ],
  },
];

const fetchStats = async () => {
  const res = await fetch("api/stats", { next: { revalidate: 3600 } });
  const text = await res.text();
  try {
    return JSON.parse(text);
  } catch (error) {
    console.error("خطای تجزیه JSON:", error);
    return fallbackStats;
  }
};

const StatsCardsSkeleton = () => {
  return (
    <div
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full"
      aria-label="در حال بارگذاری آمارها"
    >
      {[...Array(6)].map((_, index) => (
        <div
          key={index}
          className="p-4 border rounded-xl shadow-sm bg-background"
          aria-hidden="true"
        >
          <NewsSkeleton />
          <NewsSkeleton />
          <NewsSkeleton />
        </div>
      ))}
    </div>
  );
};

export const HeroSection = () => {
  const {
    data: stats,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["stats"],
    queryFn: fetchStats,
    staleTime: 3600 * 1000,
  });

  return (
    <>
      <Head>
        <title>تحلیل سئوی حرفه‌ای و بازدید واقعی با TsarSEO</title>
        <meta
          name="description"
          content="TsarSEO ارائه‌دهنده تحلیل سئوی حرفه‌ای، بازدید واقعی، و استراتژی‌های لینک‌سازی متنوع برای بهبود رتبه گوگل و رشد آنلاین شما."
        />
        <meta
          name="keywords"
          content="TsarSEO, تحلیل سئو, بازدید واقعی, بهبود رتبه گوگل, لینک‌سازی, استراتژی‌های سئو"
        />
        <meta
          property="og:title"
          content="تحلیل سئوی حرفه‌ای و بازدید واقعی با TsarSEO"
        />
        <meta
          property="og:description"
          content="TsarSEO ارائه‌دهنده تحلیل سئوی حرفه‌ای، بازدید واقعی، و استراتژی‌های لینک‌سازی متنوع برای بهبود رتبه گوگل و رشد آنلاین شما."
        />
        <meta
          property="og:image"
          content="https://tsarseo.online/icons/Logo.png"
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://tsarseo.online" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              {
                "@context": "https://schema.org",
                "@type": "Service",
                name: "خدمات سئو TsarSEO",
                description:
                  "TsarSEO ارائه‌دهنده تحلیل سئوی حرفه‌ای، بازدید واقعی، و استراتژی‌های لینک‌سازی متنوع برای بهبود رتبه گوگل و رشد آنلاین.",
                provider: {
                  "@type": "Organization",
                  name: "TsarSEO",
                  url: "https://tsarseo.online",
                },
              },
              {
                "@context": "https://schema.org",
                "@type": "FAQPage",
                mainEntity: [
                  {
                    "@type": "Question",
                    name: "TsarSEO چگونه به بهبود سئو کمک می‌کند؟",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "TsarSEO با ارائه تحلیل حرفه‌ای سئو، بازدید واقعی، و استراتژی‌های لینک‌سازی مانند مطالعات موردی، وبینارها، و فعالیت در شبکه‌های اجتماعی، به بهبود رتبه گوگل و رشد آنلاین کمک می‌کند.",
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
                "@type": "Organization",
                name: "TsarSEO",
                url: "https://tsarseo.online",
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
                "@type": "BreadcrumbList",
                itemListElement: [
                  {
                    "@type": "ListItem",
                    position: 1,
                    name: "خانه",
                    item: "https://tsarseo.online",
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
          }}
        />
      </Head>
      <section
        id="hero"
        className="container w-full mt-7 mx-auto"
        aria-labelledby="hero-heading"
      >
        <div className="grid place-items-center lg:max-w-screen-xl gap-10 mx-auto py-20 md:py-32 px-4">
          <div className="text-center space-y-8">
            <Badge
              variant="outline"
              className="text-sm py-1.5 px-4 rounded-lg"
              aria-label="سرویس جدید حرفه‌ای برای رشد آنلاین"
            >
              <span className="text-primary font-medium">New</span>
              <span className="mx-2">|</span>
              <span className="font-light">سرویس حرفه‌ای برای رشد آنلاین</span>
            </Badge>
            <h1
              id="hero-heading"
              className="text-lg sm:text-4xl md:text-4xl lg:text-4xl font-light leading-tight tracking-tight"
            >
              تحلیل سئوی حرفه‌ای و بازدید واقعی با TsarSEO
              <br />
              <span className="inline-block mt-2 text-transparent font-light bg-gradient-to-r from-[#D247BF] to-primary bg-clip-text pb-2 border-b-2 border-b-[#af4c00]">
                فقط با یک کلیک
              </span>
            </h1>
            <div className="mt-10">
              <Link
                href="#contact"
                className="inline-flex items-center gap-2 px-6 py-2 text-sm sm:text-base md:text-lg lg:text-lg font-kalameh bg-gradient-to-r from-[#D247BF] to-primary text-[#e3e3e3] rounded-2xl shadow-md hover:shadow-xl transition-all duration-300"
                aria-label="ارزیابی آمادگی سایت برای سئو"
              >
                ببین سایتت برای سئو چقدر آمادست
                <ArrowRight className="size-5" aria-hidden="true" />
              </Link>
            </div>
          </div>
          <Suspense fallback={<StatsCardsSkeleton />}>
            {isLoading || error ? (
              <StatsCardsClient stats={fallbackStats} />
            ) : (
              <StatsCardsClient stats={stats} />
            )}
          </Suspense>
        </div>
      </section>
    </>
  );
};
