import type { Metadata } from "next";
import "./globals.css";
import { cn } from "@/lib/utils";
import Navbar from "@/components/layout/navbar";
import { ThemeProvider } from "@/components/layout/theme-provider";
import { QueryProvider } from "@/components/layout/sections/QueryProvider";

export const metadata: Metadata = {
  title: "TsarSEO | افزایش رتبه و ترافیک سایت با سئوی هوشمند",
  description:
    "TsarSEO ابزار سئوی سریع، آسان و هوشمند برای افزایش رتبه گوگل، جذب ترافیک بیشتر، و بهبود نرخ کلیک سایت بدون نیاز به دانش تخصصی.",
  manifest: "/manifest.json",
  keywords: [
    "سئو",
    "افزایش بازدید سایت",
    "بهینه‌سازی سایت",
    "سئوی هوشمند",
    "تحلیل سئو",
    "ابزار سئو",
    "رتبه گوگل",
    "افزایش کلیک",
    "سئوی اتوماتیک",
    "ترافیک ارگانیک",
    "بهینه‌سازی موتور جستجو",
    "TsarSEO",
  ],
  robots: "index, follow",
  openGraph: {
    title: "TsarSEO | ابزار سئو برای رشد واقعی سایت",
    description:
      "با TsarSEO بدون پیچیدگی سئوی سایتت رو مدیریت کن. رتبه بهتر، ترافیک بیشتر، و حضور قوی‌تر در گوگل با چند کلیک ساده.",
    url: "https://www.tsarseo.com",
    type: "website",
    locale: "fa_IR",
    images: [
      {
        url: "/icons/metadata.png",
        width: 1200,
        height: 630,
        alt: "TsarSEO - ابزار سئو برای رشد سایت",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "TsarSEO | سئوی سایتت رو حرفه‌ای کن",
    description:
      "با TsarSEO سایتت رو به اوج برسون! ابزار سئوی آسان برای رتبه بالاتر، بازدید بیشتر و عملکرد بهتر.",
    images: "/icons/metadata.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa-IR" suppressHydrationWarning>
      <body className={cn("min-h-screen bg-background")}>
        <QueryProvider>
          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
            <Navbar />
            {children}
          </ThemeProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
