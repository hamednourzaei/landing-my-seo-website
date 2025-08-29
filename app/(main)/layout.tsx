import type { Metadata } from "next";
import "@/app/globals.css";
import { cn } from "@/lib/utils";
import Navbar from "@/components/layout/navbar";
import { ThemeProvider } from "@/components/layout/theme-provider";
import { QueryProvider } from "@/components/layout/sections/QueryProvider";
import { AdUnit } from "@/components/common/AdUnit";
import { GoogleTagManager } from "@/components/common/GoogleTagManager";
import { GoogleAnalytics } from "@/components/common/GoogleAnalytics";
import { FooterSection } from "@/components/layout/sections/footer";

export const metadata: Metadata = {
  title: "TsarSEO | ابزار هوشمند سئو برای افزایش رتبه و ترافیک سایت",
  description:
    "با TsarSEO به‌راحتی سئوی سایت خود را بهبود دهید، ترافیک ارگانیک را افزایش دهید و رتبه بهتری در گوگل کسب کنید با استراتژی‌های لینک‌سازی حرفه‌ای.",
  manifest: "/manifest.json",
  metadataBase: new URL("https://tsarseo.online"),
  keywords: [
    "TsarSEO",
    "سئو",
    "افزایش بازدید سایت",
    "بهینه‌سازی سایت",
    "سئوی هوشمند",
    "تحلیل سئو",
    "ابزار سئو",
    "رتبه گوگل",
    "افزایش کلیک",
    "ترافیک ارگانیک",
    "بهینه‌سازی موتور جستجو",
    "سئو برای سایت‌های ایرانی",
    "افزایش ترافیک سایت",
    "ابزار تحلیل سئو",
    "سئو بدون پیچیدگی",
    "سئوی اتوماتیک",
    "مدیریت سئو",
    "خدمات سئو",
    "ترافیک سایت",
    "نرخ کلیک بالا",
    "سئو برای کسب و کار",
    "SEO برای سایت‌های فارسی",
    "بهبود رتبه در گوگل",
    "بهترین ابزار سئو",
    "تحلیل رقابتی سئو",
    "ترافیک شبکه‌های اجتماعی",
    "پشتیبانی 24/7",
    "مشاوره سئو",
    "سئوی سایت",
    "بهبود نرخ کلیک",
    "رشد آنلاین",
    "سئوی آسان",
    "لینک‌سازی",
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "TsarSEO | سئوی ساده برای رشد سریع سایت",
    description:
      "TsarSEO ابزار هوشمند سئو برای بهبود رتبه گوگل، افزایش ترافیک ارگانیک و نرخ کلیک با رابط کاربری ساده و استراتژی‌های لینک‌سازی حرفه‌ای.",
    url: "https://tsarseo.online",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "https://tsarseo.online/icons/metadata.png",
        width: 1200,
        height: 630,
        alt: "TsarSEO - ابزار هوشمند سئو برای رشد سایت",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "TsarSEO | بهبود رتبه و افزایش ترافیک سایت",
    description:
      "با TsarSEO سایت خود را به اوج برسانید! سئوی آسان با نتایج سریع و استراتژی‌های لینک‌سازی حرفه‌ای.",
    images: "https://tsarseo.online/icons/metadata.png",
  },
  alternates: {
    canonical: "https://tsarseo.online",
  },
  other: {
    "google-adsense-account": "ca-pub-1011150553663427",
    "google-site-verification": "Kw1N8VreAAhBn-aovzhBSSsPnIMK5tOXf-AaFZ5eEFw",
    "script:ld+json": JSON.stringify([
      {
        "@context": "https://schema.org",
        "@type": "WebSite",
        url: "https://tsarseo.online",
        name: "TsarSEO",
        potentialAction: {
          "@type": "SearchAction",
          target: "https://tsarseo.online/search?q={search_term_string}",
          "query-input": "required name=search_term_string",
        },
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
            name: "چگونه TsarSEO رتبه سایت را بهبود می‌دهد؟",
            acceptedAnswer: {
              "@type": "Answer",
              text: "TsarSEO با تحلیل پیشرفته کلمات کلیدی، بهینه‌سازی محتوا، بهبود ساختار سایت و استراتژی‌های لینک‌سازی سفید مانند مطالعات موردی، وبینارها و فعالیت در شبکه‌های اجتماعی، رتبه گوگل شما را ارتقا می‌دهد.",
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <QueryProvider>
      <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
        <Navbar />
        <AdUnit /> {/* تبلیغ غیر-AMP زیر Navbar */}
        {children}
        <AdUnit /> {/* تبلیغ غیر-AMP قبل از فوتر */}
        <FooterSection />
      </ThemeProvider>
    </QueryProvider>
  );
}
