// app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import  Navbar  from "@/components/layout/navbar";
import { ThemeProvider } from "@/components/layout/theme-provider";
import { QueryProvider } from "@/components/layout/sections/QueryProvider"; // کامپوننت جدید

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TsarSEO | سئوی سریع و آسان برای رتبه بهتر در گوگل",
  description:
    "با TsarSEO بدون نیاز به تخصص، ترافیک سایتت رو زیاد کن، نرخ کلیک رو بالا ببر و رتبه گوگلت رو بهبود بده. همین حالا شروع کن!",
  keywords: ["سئو", "بهینه‌سازی سایت", "رتبه گوگل", "ترافیک سایت", "TsarSEO"],
  robots: "index, follow",
  openGraph: {
    title: "TsarSEO | سئوی ساده برای افزایش بازدید سایت",
    description:
      "رتبه سایتت رو با TsarSEO بهتر کن! بدون پیچیدگی، ترافیک و کلیک سایتت رو افزایش بده و در گوگل بدرخش.",
    url: "https://www.tsarseo.com", // آدرس سایت خودتون رو وارد کنید
    type: "website",
    locale: "fa_IR",
    images: [
      {
        url: "https://res.cloudinary.com/dbzv9xfjp/image/upload/v1723499276/og-images/shadcn-vue.jpg",
        width: 1200,
        height: 630,
        alt: "TsarSEO - سئوی سریع و آسان",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "TsarSEO | رتبه و ترافیک سایتت رو بالا ببر",
    description:
      "با TsarSEO، سئو رو ساده کن! ترافیک و کلیک سایتت رو زیاد کن و در گوگل رتبه بهتری بگیر.",
    images: "https://res.cloudinary.com/dbzv9 best-seo-century/image/upload/v1723499276/og-images/shadcn-vue.jpg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br" suppressHydrationWarning>
      <body className={cn("min-h-screen bg-background", inter.className)}>
        <QueryProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <Navbar />
            {children}
          </ThemeProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
