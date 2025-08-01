import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { Suspense } from "react";

// کامپوننت‌های ضروری که تو viewport اولیه لود می‌شن
import { HeroSection } from "@/components/layout/sections/hero";
import { SponsorsSection } from "@/components/layout/sections/sponsors";

// کامپوننت‌های سنگین رو Lazy-load می‌کنیم
const BenefitsSection = dynamic(
  () => import("@/components/layout/sections/benefits").then((mod) => mod.BenefitsSection),
  { ssr: true }
);
const FeaturesSection = dynamic(
  () => import("@/components/layout/sections/features").then((mod) => mod.FeaturesSection),
  { ssr: true }
);
const TestimonialSection = dynamic(
  () => import("@/components/layout/sections/testimonial"),
  { ssr: true }
);
const PricingSection = dynamic(
  () => import("@/components/layout/sections/pricing").then((mod) => mod.PricingSection),
  { ssr: true }
);
const ContactSection = dynamic(
  () => import("@/components/layout/sections/contact").then((mod) => mod.ContactSection),
  { ssr: true }
);
const FAQSection = dynamic(() => import("@/components/layout/sections/faq").then((mod) => mod.FAQSection), {
  ssr: true,
});

// Google Analytics فقط تو پروداکشن لود بشه
const GoogleAnalytics = dynamic(
  () => import("@/components/common/GoogleAnalytics").then((mod) => mod.GoogleAnalytics),
  {
    ssr: true, // فقط سمت کلاینت لود بشه
    loading: () => null,
  }
);

// متادیتا (بدون تغییر چون بهینه‌ست)
export const metadata: Metadata = {
  title: "TsarSEO | ابزار هوشمند سئو برای افزایش رتبه و ترافیک سایت",
  description:
    "با TsarSEO به‌راحتی سئوی سایت خود را بهبود دهید، ترافیک ارگانیک را افزایش دهید و رتبه بهتری در گوگل کسب کنید. بدون نیاز به دانش تخصصی.",
  manifest: "/manifest.json",
  metadataBase: new URL("https://tsarseo.online"),
  keywords: [
    "TsarSEO",
    "سئو",
    "افزایش بازدید سایت",
    // ... بقیه keywords
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
      "TsarSEO ابزار هوشمند سئو برای بهبود رتبه گوگل، افزایش ترافیک ارگانیک و نرخ کلیک با رابط کاربری ساده و بدون پیچیدگی.",
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
      "با TsarSEO سایت خود را به اوج برسانید! سئوی آسان با نتایج سریع برای رتبه بهتر و ترافیک بیشتر.",
    images: "https://tsarseo.online/icons/metadata.png",
  },
  alternates: {
    canonical: "https://tsarseo.online",
  },
  other: {
    "google-adsense-account": "ca-pub-1011150553663427",
    "google-site-verification": "Kw1N8VreAAhBn-aovzhBSSsPnIMK5tOXf-AaFZ5eEFw",
  },
};

// لودینگ فال‌بک برای کامپوننت‌های Lazy-loaded
const SectionLoading = () => (
  <div className="min-h-[200px] flex items-center justify-center">
    <p>در حال بارگذاری...</p>
  </div>
);

export default function Home() {
  return (
    <>
      {/* Google Analytics فقط تو پروداکشن */}
      {process.env.NODE_ENV === "production" && (
        <Suspense fallback={null}>
          <GoogleAnalytics />
        </Suspense>
      )}

      {/* کامپوننت‌های اولیه که باید سریع لود بشن */}
      <HeroSection />
      <SponsorsSection />

      {/* بقیه با Suspense و Lazy-loading */}
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
    </>
  );
}
