import type { Metadata } from "next";
import About from "@/components/layout/sections/about";

export const metadata: Metadata = {
  title: "درباره TsarSEO | خدمات سئو ساده و موثر",
  description:
    "با TsarSEO آشنا شوید؛ پلتفرمی برای افزایش ترافیک واقعی و بهبود رتبه سایت در گوگل با ابزارهای ساده و قدرتمند و استراتژی‌های لینک‌سازی حرفه‌ای. امروز شروع کنید!",
  keywords: [
    "سئو",
    "بهینه‌سازی سایت",
    "افزایش ترافیک",
    "رتبه‌بندی گوگل",
    "TsarSEO",
    "لینک‌سازی",
  ],
  robots: { index: true, follow: true },
  openGraph: {
    title: "درباره TsarSEO | خدمات سئو ساده و موثر",
    description:
      "با TsarSEO آشنا شوید، پلتفرمی برای افزایش ترافیک واقعی و بهبود رتبه گوگل با ابزارهای ساده و استراتژی‌های لینک‌سازی حرفه‌ای. امروز شروع کنید!",
    url: "https://tsarseo.online/about",
    siteName: "TsarSEO",
    images: [
      {
        url: "https://tsarseo.online/icons/Logo.png",
        width: 800,
        height: 600,
        alt: "TsarSEO Logo",
      },
    ],
    locale: "en-us",
    type: "website",
  },
  alternates: {
    canonical: "https://tsarseo.online/about",
  },
  other: {
    "script:ld+json": JSON.stringify([
      {
        "@context": "https://schema.org",
        "@type": "WebPage",
        url: "https://tsarseo.online/about",
        name: "درباره TsarSEO",
      },
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
            name: "TsarSEO چیست؟",
            acceptedAnswer: {
              "@type": "Answer",
              text: "TsarSEO یک پلتفرم سئو است که با ابزارهای ساده و قدرتمند به بهبود رتبه گوگل و افزایش ترافیک ارگانیک کمک می‌کند.",
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
            name: "درباره ما",
            item: "https://tsarseo.online/about",
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

export default function AboutUsPage() {
  return (
    <div className="min-h-screen py-8">
      <About />
    </div>
  );
}
