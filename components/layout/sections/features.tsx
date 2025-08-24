"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Icon, { IconName } from "@/components/ui/icon";
import { motion } from "framer-motion";
import { useEffect, useState, useMemo } from "react";
import Head from "next/head";

interface FeaturesProps {
  icon: IconName;
  title: string;
  description: string;
}

const featureList: FeaturesProps[] = [
  {
    icon: "Search",
    title: "کشف فرصت‌های طلایی",
    description: "تحلیل کلمات کلیدی برای پیدا کردن بهترین فرصت‌ها جهت رشد در نتایج جستجو.",
  },
  {
    icon: "Users",
    title: "افزایش بازدید هدفمند",
    description: "جذب کاربرانی که واقعاً به خدمات شما نیاز دارند با بهینه‌سازی هوشمند.",
  },
  {
    icon: "LineChart",
    title: "آمار دقیق لحظه‌ای",
    description: "دریافت گزارش‌های زنده از عملکرد سایت و بررسی مسیر پیشرفت سئو.",
  },
  {
    icon: "Globe",
    title: "حضور جهانی قدرتمند",
    description: "عرضه خدمات سئو برای بازارهای بین‌المللی با پشتیبانی چندزبانه.",
  },
  {
    icon: "Zap",
    title: "پاسخ‌دهی سریع و دقیق",
    description: "آنالیز جامع سایت تنها در چند دقیقه با الگوریتم‌های پیشرفته ما.",
  },
  {
    icon: "Lock",
    title: "اطمینان در امنیت",
    description: "نگهداری امن اطلاعات شما با سیستم‌های رمزنگاری و نظارت پیشرفته.",
  },
];

// مولفه برای هر ویژگی
const FeatureCard: React.FC<FeaturesProps & { isMobile: boolean }> = ({ icon, title, description, isMobile }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ scale: isMobile ? 1 : 1.03 }}
      transition={{ duration: 0.3 }}
      className="group cursor-pointer bg-[#121212] rounded-xl p-8 flex flex-col items-center text-center border border-transparent hover:border-orange-500"
      role="article"
      aria-label={`ویژگی: ${title}`}
    >
      <div className="mb-5 p-3 rounded-full ring-4 ring-orange-400/20 group-hover:ring-orange-500 transition">
        <Icon name={icon} size={32} color="rgb(255 108 0)" aria-hidden="true" />
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-400 leading-relaxed text-sm">{description}</p>
      <div className="mt-4 w-10 h-1 bg-transparent group-hover:bg-orange-500 rounded transition-all"></div>
    </motion.div>
  );
};

const useMediaQuery = (query: string) => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    setMatches(media.matches);
    const handler = (e: MediaQueryListEvent) => setMatches(e.matches);
    media.addEventListener("change", handler);
    return () => media.removeEventListener("change", handler);
  }, [query]);

  return matches;
};

const FeaturesSection: React.FC = () => {
  const isMobile = useMediaQuery("(max-width: 600px)");

  const featureItems = useMemo(() => featureList.map(({ icon, title, description }) => ({
    icon,
    title,
    description,
  })), []);

  return (
    <>
      <Head>
        <title>ویژگی‌های TsarSEO</title>
        <meta
          name="description"
          content="ویژگی‌های کلیدی TsarSEO شامل تحلیل کلمات کلیدی، افزایش بازدید هدفمند، آمار لحظه‌ای و خدمات سئو جهانی."
        />
        <meta
          name="keywords"
          content="TsarSEO, ویژگی‌های سئو, تحلیل کلمات کلیدی, بازدید هدفمند, آمار لحظه‌ای, سئو جهانی, امنیت داده"
        />
        <meta property="og:title" content="ویژگی‌های TsarSEO" />
        <meta
          property="og:description"
          content="ویژگی‌های کلیدی TsarSEO شامل تحلیل کلمات کلیدی، افزایش بازدید هدفمند، آمار لحظه‌ای و خدمات سئو جهانی."
        />
        <meta property="og:image" content="https://tsarseo.com/feature-image.jpg" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Service",
              "name": "ویژگی‌های TsarSEO",
              "description": "TsarSEO ارائه‌دهنده ویژگی‌های پیشرفته سئو شامل تحلیل کلمات کلیدی، بازدید هدفمند، آمار لحظه‌ای و خدمات جهانی.",
              "provider": {
                "@type": "Organization",
                "name": "TsarSEO",
                "url": "https://tsarseo.online",
              },
            }),
          }}
        />
      </Head>

      <section
        dir="rtl"
        id="features"
        className="container max-w-6xl mx-auto py-28 font-kalameh text-white"
        aria-labelledby="features-heading"
      >
        <header className="mb-14 max-w-xl mx-auto text-center">
          <h2
            id="features-heading"
            className="text-3xl font-extrabold text-primary mb-2 tracking-tight"
          >
            ویژگی‌های TsarSEO
          </h2>
          <p className="text-gray-400 text-lg">
            ابزارهای حرفه‌ای برای فرمانروایی دیجیتال با تحلیل دقیق و ترافیک واقعی.
          </p>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
          {featureItems.map((feature, index) => (
            <FeatureCard key={index} {...feature} isMobile={isMobile} />
          ))}
        </div>
      </section>
    </>
  );
};

export default FeaturesSection;
