import type { Metadata } from "next";
import "./globals.css";
import { cn } from "@/lib/utils";
import Navbar from "@/components/layout/navbar";
import { ThemeProvider } from "@/components/layout/theme-provider";
import { QueryProvider } from "@/components/layout/sections/QueryProvider";

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
  },
};

// کامپوننت برای واحد تبلیغاتی غیر-AMP
const AdUnit = () => {
  return (
    <div className="ad-container my-4">
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client="ca-pub-1011150553663427"
        data-ad-slot="3155183279"
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>
      <script
        dangerouslySetInnerHTML={{
          __html: `(adsbygoogle = window.adsbygoogle || []).push({});`,
        }}
      />
    </div>
  );
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa-IR" suppressHydrationWarning>
      <head>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1011150553663427"
          crossOrigin="anonymous"
        ></script>
      </head>
      <body className={cn("min-h-screen bg-background")}>
        <QueryProvider>
          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
            <Navbar />
            <AdUnit /> {/* تبلیغ غیر-AMP زیر Navbar */}
            {children}
            <AdUnit /> {/* تبلیغ غیر-AMP قبل از فوتر */}
          </ThemeProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
