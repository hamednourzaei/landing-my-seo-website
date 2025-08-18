import type { Metadata } from "next";
import PrivacyPolicy from "@/components/layout/sections/policy-privacy";

export const metadata: Metadata = {
  title: "TsarSEO | Privacy Policy - سیاست حفظ حریم خصوصی",
  description:
    "TsarSEO Privacy Policy: Learn how we collect, use, and protect your data on our platform. | صفحه سیاست حفظ حریم خصوصی TsarSEO: آشنایی با نحوه جمع‌آوری، استفاده و حفاظت از داده‌های کاربران در پلتفرم ما.",
  keywords: [
    "TsarSEO",
    "Privacy Policy",
    "حریم خصوصی",
    "سیاست حریم خصوصی",
    "User Data",
    "اطلاعات کاربران",
    "Data Security",
    "امنیت داده‌ها",
    "SEO Tools",
    "ابزار سئو",
  ],
  robots: { index: true, follow: true },
  openGraph: {
    title: "TsarSEO | Privacy Policy - سیاست حفظ حریم خصوصی",
    description:
      "Learn about TsarSEO's policies on collecting and protecting user data. | اطلاعات کامل درباره سیاست‌های ما در زمینه جمع‌آوری و محافظت از داده‌های کاربران در TsarSEO.",
    url: "https://tsarseo.online/privacy-policy",
    siteName: "TsarSEO",
    images: [
      {
        url: "https://tsarseo.online/icons/metadata.png",
        width: 1200,
        height: 630,
        alt: "TsarSEO Privacy Policy - سیاست حفظ حریم خصوصی TsarSEO",
      },
    ],
    locale: "fa_IR",
    alternateLocale: ["en_US"],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "TsarSEO | Privacy Policy - سیاست حفظ حریم خصوصی",
    description:
      "Discover TsarSEO's Privacy Policy: Committed to protecting your data. | با سیاست‌های حریم خصوصی TsarSEO آشنا شوید؛ ما متعهد به حفاظت از داده‌های شما هستیم.",
    images: ["https://tsarseo.online/icons/metadata.png"],
  },
  alternates: {
    canonical: "https://tsarseo.online/privacy-policy",
    languages: {
      "fa-IR": "https://tsarseo.online/privacy-policy",
      "en-US": "https://tsarseo.online/en/privacy-policy",
    },
  },
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen py-24">
      <PrivacyPolicy />
    </div>
  );
}
