import type { Metadata } from "next";
import { BenefitsSection } from "@/components/layout/sections/benefits";
import { ContactSection } from "@/components/layout/sections/contact";
import { FAQSection } from "@/components/layout/sections/faq";
import { FeaturesSection } from "@/components/layout/sections/features";
import { FooterSection } from "@/components/layout/sections/footer";
import { HeroSection } from "@/components/layout/sections/hero";
import { PricingSection } from "@/components/layout/sections/pricing";
import { SponsorsSection } from "@/components/layout/sections/sponsors";
import TestimonialSection from "@/components/layout/sections/testimonial";
import { GoogleAnalytics } from "@/components/common/GoogleAnalytics";

export const metadata: Metadata = {
  title: "TsarSEO | سئوی ساده و سریع برای بهبود رتبه سایت",
  description:
    "با TsarSEO بدون نیاز به تخصص، ترافیک سایت خود را افزایش دهید، نرخ کلیک را بهبود بخشید و رتبه سایت خود را در گوگل ارتقا دهید.",
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
    "  تزار سئو",
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
  ],
  robots: "index, follow",
  openGraph: {
    title: "TsarSEO | سئوی ساده و سریع برای بیشتر دیده شدن",
    description:
      "با TsarSEO رتبه سایت خود را در گوگل بهبود دهید، ترافیک واقعی جذب کنید و نرخ کلیک را افزایش دهید. بدون پیچیدگی، با چند کلیک شروع کنید.",
    url: "https://tsarseo.com",
    type: "website",
    locale: "fa_IR",
    images: [
      {
        url: "https://tsarseo.com/icons/metadata.png",
        width: 1200,
        height: 630,
        alt: "TsarSEO - ابزار سئوی آسان و سریع",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "TsarSEO | بهبود رتبه و افزایش بازدید سایت",
    description:
      "با TsarSEO ترافیک واقعی، نرخ کلیک بالا و رتبه بهتر در گوگل داشته باشید. سئوی ساده با نتایج سریع.",
    images: "https://tsarseo.com/icons/metadata.png",
  },
  other: {
    "google-adsense-account": "ca-pub-1011150553663427",
  },
};

export default function Home() {
  return (
    <>
      <GoogleAnalytics />
      <HeroSection />
      <SponsorsSection />
      <BenefitsSection />
      <FeaturesSection />
      <TestimonialSection />
      <PricingSection />
      <ContactSection />
      <FAQSection />
      <FooterSection />
    </>
  );
}
