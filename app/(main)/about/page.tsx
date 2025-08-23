import type { Metadata } from "next";
import About from "@/components/layout/sections/about";

export const metadata: Metadata = {
  title: "درباره TsarSEO | خدمات سئو ساده و موثر",
  description:
    "با TsarSEO آشنا شوید؛ پلتفرمی برای افزایش ترافیک واقعی و بهبود رتبه سایت در گوگل با ابزارهای ساده و قدرتمند. امروز شروع کنید!",
  keywords: [
    "سئو",
    "بهینه‌سازی سایت",
    "افزایش ترافیک",
    "رتبه‌بندی گوگل",
    "TsarSEO",
  ],
  robots: { index: true, follow: true },
  openGraph: {
    title: "About TsarSEO | Simple and Effective SEO Services",
    description:
      "Discover TsarSEO, a platform for boosting real traffic and improving Google rankings with simple, powerful tools. Start today!",
    url: "https://tsarseo.online/aboutus",
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
    canonical: "https://tsarseo.online/aboutus",
  },
};

export default function AboutUsPage() {
  return (
    <div className="min-h-screen py-8">
      <About />
    </div>
  );
}
