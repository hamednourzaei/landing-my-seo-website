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
import Script from "next/script";

export const metadata: Metadata = {
  title: "TsarSEO | سئوی سایتت رو راحت و سریع انجام بده!",
  description:
    "دیگه لازم نیست متخصص باشی! TsarSEO بهت کمک می‌کنه ترافیک سایتت رو بیشتر کنی، نرخ کلیک رو بالا ببری و رتبه‌ات رو توی گوگل بهتر کنی؛ فقط با چند کلیک و بدون پیچیدگی.",
  keywords: ["سئو", "افزایش بازدید سایت", "بهینه‌سازی سایت", "TsarSEO"],
  robots: "index, follow",
  openGraph: {
    title: "TsarSEO | سئوی ساده و سریع برای بیشتر دیده شدن",
    description:
      "افزایش بازدید، بهبود نرخ کلیک و رشد رتبه سایت در گوگل، بدون نیاز به دانش فنی. همین الان شروع کن؛ نتیجه‌اش رو زود می‌بینی.",
    url: "https://www.tsarseo.com",
    type: "website",
    locale: "fa_IR",
    images: [
      {
        url: "/icons/metadata.png",
        width: 1200,
        height: 630,
        alt: "TsarSEO - سئوی آسان و سریع",
      },
    ],
  },
  twitter: {
    title: "TsarSEO | بازدید و کلیک سایتت رو بیشتر کن",
    description:
      "با TsarSEO هم رتبه سایتت بهتر میشه، هم ترافیک و نرخ کلیک بالا میره. بدون دردسر، فقط با چند کلیک.",
    images: "/icons/metadata.png",
  },
};

export default function Home() {
  return (
    <>
     {/* Google Analytics */}
     <Script
        strategy="afterInteractive"
        src="https://www.googletagmanager.com/gtag/js?id=G-GCZ5L77F5F"
      />
      <Script
        id="gtag-init"
        strategy="afterInteractive"
      >
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-GCZ5L77F5F');
        `}
      </Script>
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