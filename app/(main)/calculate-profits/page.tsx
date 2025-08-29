import React from "react";
import IncomeSimulatorModal from "@/components/layout/sections/IncomeSimulatorModal";
import type { Metadata } from "next";

// Metadata for different languages
const metadataDictionary = {
  fa: {
    title: "محاسبه سود - شبیه‌ساز درآمد",
    description:
      "با استفاده از شبیه‌ساز درآمد TsarSEO، سود احتمالی خود را محاسبه کنید و از استراتژی‌های لینک‌سازی حرفه‌ای برای بهبود سئو بهره‌مند شوید.",
  },
  en: {
    title: "Profit Calculator - Income Simulator",
    description:
      "Calculate your potential earnings using TsarSEO's income simulator with professional link-building strategies to boost SEO.",
  },
};

export async function generateMetadata(): Promise<Metadata> {
  const lang = "fa";

  return {
    title: metadataDictionary[lang].title,
    description: metadataDictionary[lang].description,
    keywords: [
      "TsarSEO",
      "محاسبه سود",
      "شبیه‌ساز درآمد",
      "سئو",
      "لینک‌سازی",
      "ابزار سئو",
    ],
    robots: { index: true, follow: true },
    openGraph: {
      title: metadataDictionary[lang].title,
      description: metadataDictionary[lang].description,
      url: "https://tsarseo.online/calculate-profits",
      siteName: "TsarSEO",
      images: [
        {
          url: "https://tsarseo.online/icons/Logo.png",
          width: 800,
          height: 600,
          alt: "TsarSEO Income Simulator",
        },
      ],
      locale: "fa_IR",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: metadataDictionary[lang].title,
      description: metadataDictionary[lang].description,
      images: ["https://tsarseo.online/icons/Logo.png"],
    },
    alternates: {
      canonical: "https://tsarseo.online/calculate-profits",
      languages: {
        fa: "/fa",
        en: "/en",
      },
    },
    other: {
      "script:ld+json": JSON.stringify([
        {
          "@context": "https://schema.org",
          "@type": "WebPage",
          url: "https://tsarseo.online/calculate-profits",
          name: "محاسبه سود - شبیه‌ساز درآمد",
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
              name: "شبیه‌ساز درآمد TsarSEO چگونه کار می‌کند؟",
              acceptedAnswer: {
                "@type": "Answer",
                text: "شبیه‌ساز درآمد TsarSEO به شما امکان می‌دهد با وارد کردن داده‌های مالی، سود احتمالی خود را تخمین بزنید و استراتژی‌های سئو را بهینه کنید.",
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
              name: "محاسبه سود",
              item: "https://tsarseo.online/calculate-profits",
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

const CalculateProfitsPage: React.FC = () => {
  return (
    <div className="min-h-screen py-8">
      <IncomeSimulatorModal />
    </div>
  );
};

export default CalculateProfitsPage;
