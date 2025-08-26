import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { Suspense } from "react";

// کامپوننت‌های اولیه که در viewport اولیه لود می‌شوند
import { HeroSection } from "@/components/layout/sections/hero";
import { SponsorsSection } from "@/components/layout/sections/sponsors";

// Lazy-load کامپوننت‌های سنگین
const BenefitsSection = dynamic(
  () =>
    import("@/components/layout/sections/benefits").then(
      (mod) => mod.BenefitsSection
    ),
  { ssr: true }
);
const FeaturesSection = dynamic(
  () => import("@/components/layout/sections/features"),
  { ssr: true }
);
const TestimonialSection = dynamic(
  () => import("@/components/layout/sections/testimonial"),
  { ssr: true } // غیرفعال کردن SSR برای کاهش بار
);
const PricingSection = dynamic(
  () =>
    import("@/components/layout/sections/pricing").then(
      (mod) => mod.PricingSection
    ),
  { ssr: true }
);
const ContactSection = dynamic(
  () =>
    import("@/components/layout/sections/contact").then(
      (mod) => mod.ContactSection
    ),
  { ssr: true }
);
const FAQSection = dynamic(
  () =>
    import("@/components/layout/sections/faq").then((mod) => mod.FAQSection),
  { ssr: true }
);

// Lazy-load Google Analytics و Ads فقط در پروداکشن
const GoogleAnalytics = dynamic(
  () =>
    import("@/components/common/GoogleAnalytics").then(
      (mod) => mod.GoogleAnalytics
    ),
  { ssr: true, loading: () => null }
);

// متادیتای بهینه‌شده با JSON-LD
export const metadata: Metadata = {
  title: "TsarSEO | ابزار سئو برای رشد رتبه و ترافیک سایت",
  description:
    "TsarSEO: ابزار سئو برای بهبود رتبه گوگل و افزایش ترافیک ارگانیک با رابط ساده.",
  manifest: "/manifest.json",
  metadataBase: new URL("https://tsarseo.online"),
  keywords: [
    "TsarSEO",
    "سئو",
    "بهینه‌سازی سایت",
    "افزایش ترافیک ارگانیک",
    "سئو در ایران",
    "ابزار سئو",
    "رتبه‌بندی گوگل",
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
      "TsarSEO ابزار هوشمند سئو برای بهبود رتبه گوگل و افزایش ترافیک ارگانیک.",
    url: "https://tsarseo.online",
    type: "website",
    locale: "fa_IR",
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
      "با TsarSEO سایت خود را به اوج برسانید! سئوی آسان با نتایج سریع.",
    images: ["https://tsarseo.online/icons/metadata.png"],
  },
  alternates: {
    canonical: "https://tsarseo.online",
    languages: {
      "en-US": "https://tsarseo.online",
      "en-uk": "https://tsarseo.online/en",
    },
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
              text: "TsarSEO با تحلیل پیشرفته کلمات کلیدی، بهینه‌سازی محتوا و بهبود ساختار سایت، رتبه گوگل شما را ارتقا می‌دهد.",
            },
          },
          {
            "@type": "Question",
            name: "آیا TsarSEO برای مبتدیان مناسب است؟",
            acceptedAnswer: {
              "@type": "Answer",
              text: "بله، TsarSEO با رابط کاربری ساده و راهنمای گام‌به‌گام برای همه سطوح مناسب است.",
            },
          },
        ],
      },
    ]),
  },
};

// Skeleton فال‌بک برای کاهش CLS
const SectionLoading = () => (
  <div className="min-h-[200px] w-full flex items-center justify-center bg-gray-100 animate-pulse">
    <div className="space-y-4 w-3/4">
      <div className="h-8 bg-gray-300 rounded w-full"></div>
      <div className="h-4 bg-gray-200 rounded w-5/6"></div>
      <div className="h-4 bg-gray-200 rounded w-2/3"></div>
    </div>
  </div>
);

export default function Home() {
  return (
    <main role="main" className="flex flex-col min-h-screen">
      {process.env.NODE_ENV === "production" && (
        <Suspense fallback={null}>
          <GoogleAnalytics />
        </Suspense>
      )}
      <HeroSection />
      <SponsorsSection />
      <Suspense fallback={<SectionLoading />}>
        <BenefitsSection />
      </Suspense>
      <Suspense fallback={<SectionLoading />}>
        <FeaturesSection />
      </Suspense>
      <Suspense fallback={<SectionLoading />}>
        <TestimonialSection />
      </Suspense>
      <Suspense fallback={<SectionLoading />}>
        <PricingSection />
      </Suspense>
      <Suspense fallback={<SectionLoading />}>
        <ContactSection />
      </Suspense>
      <Suspense fallback={<SectionLoading />}>
        <FAQSection />
      </Suspense>
      {/* لینک‌سازی داخلی */}
    </main>
  );
}
