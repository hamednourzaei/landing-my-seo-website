import type { Metadata } from "next";
import PrivacyPolicy from "@/components/layout/sections/policy-privacy";

export const metadata: Metadata = {
  title: "TsarSEO | Privacy Policy - سیاست حفظ حریم خصوصی",
  description:
    "TsarSEO Privacy Policy: Learn how we collect, use, and protect your data on our platform with robust SEO strategies including white-hat link-building. | صفحه سیاست حفظ حریم خصوصی TsarSEO: آشنایی با نحوه جمع‌آوری، استفاده و حفاظت از داده‌های کاربران در پلتفرم ما با استراتژی‌های سئو حرفه‌ای.",
  keywords: [
    "TsarSEO",
    "Privacy Policy",
    "حریم خصوصی",
    "سیاست حریم خصوصی",
    "User Data",
    "اطلاعات کاربران",
    "Data Security",
    "امنیت داده‌ها",
    "SEO Tools",
    "ابزار سئو",
    "لینک‌سازی",
  ],
  robots: { index: true, follow: true },
  openGraph: {
    title: "TsarSEO | Privacy Policy - سیاست حفظ حریم خصوصی",
    description:
      "Learn about TsarSEO's policies on collecting and protecting user data with professional SEO strategies. | اطلاعات کامل درباره سیاست‌های ما در زمینه جمع‌آوری و محافظت از داده‌های کاربران در TsarSEO با استراتژی‌های لینک‌سازی حرفه‌ای.",
    url: "https://tsarseo.online/privacy-policy",
    siteName: "TsarSEO",
    images: [
      {
        url: "https://tsarseo.online/icons/metadata.png",
        width: 1200,
        height: 630,
        alt: "TsarSEO Privacy Policy - سیاست حفظ حریم خصوصی TsarSEO",
      },
    ],
    locale: "en_us",
    alternateLocale: ["en_US"],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "TsarSEO | Privacy Policy - سیاست حفظ حریم خصوصی",
    description:
      "Discover TsarSEO's Privacy Policy: Committed to protecting your data with professional SEO strategies. | با سیاست‌های حریم خصوصی TsarSEO آشنا شوید؛ ما متعهد به حفاظت از داده‌های شما هستیم.",
    images: ["https://tsarseo.online/icons/metadata.png"],
  },
  alternates: {
    canonical: "https://tsarseo.online/privacy-policy",
    languages: {
      "en-UK": "https://tsarseo.online/privacy-policy",
      "en-US": "https://tsarseo.online/privacy-policy",
    },
  },
  other: {
    "script:ld+json": JSON.stringify([
      {
        "@context": "https://schema.org",
        "@type": "WebPage",
        url: "https://tsarseo.online/privacy-policy",
        name: "TsarSEO | Privacy Policy",
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
            name: "چگونه TsarSEO از داده‌های کاربران محافظت می‌کند؟",
            acceptedAnswer: {
              "@type": "Answer",
              text: "TsarSEO با استفاده از پروتکل‌های امنیتی پیشرفته و رعایت استانداردهای حریم خصوصی، داده‌های کاربران را محافظت می‌کند.",
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
            name: "سیاست حفظ حریم خصوصی",
            item: "https://tsarseo.online/privacy-policy",
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

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen py-24">
      <PrivacyPolicy />
    </div>
  );
}
