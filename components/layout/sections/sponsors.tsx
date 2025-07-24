"use client";

import Icon, { IconName } from "@/components/ui/icon";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Head from "next/head";

interface FeatureProps {
  icon: IconName;
  name: string;
}

const features: FeatureProps[] = [
  { icon: "BarChart2", name: "تحلیل پیشرفته سئو" },
  { icon: "Users", name: "بازدید انسانی" },
  { icon: "Zap", name: "تحلیل سریع و دقیق" },
  { icon: "Trophy", name: "بهبود رتبه گوگل" },
  { icon: "Server", name: "فعال در ۵۸۸ سایت " },
  { icon: "Globe", name: "پشتیبانی چندزبانه" },
];

export const SponsorsSection: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const update = () => setIsMobile(window.innerWidth < 600);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return (
    <>
      <Head>
        <title>چرا TsarSEO؟</title>
        <meta
          name="description"
          content="ویژگی‌های کلیدی TsarSEO شامل تحلیل پیشرفته سئو، بازدید انسانی، بهبود رتبه گوگل و پشتیبانی چندزبانه."
        />
        <meta
          name="keywords"
          content="TsarSEO, تحلیل سئو, بازدید انسانی, بهبود رتبه گوگل, پشتیبانی چندزبانه"
        />
        <meta property="og:title" content="چرا TsarSEO؟" />
        <meta
          property="og:description"
          content="ویژگی‌های کلیدی TsarSEO شامل تحلیل پیشرفته سئو، بازدید انسانی، بهبود رتبه گوگل و پشتیبانی چندزبانه."
        />
        <meta
          property="og:image"
          content="https://tsarseo.com/feature-image.jpg"
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Service",
              name: "چرا TsarSEO؟",
              description:
                "TsarSEO ارائه‌دهنده ویژگی‌های پیشرفته سئو شامل تحلیل پیشرفته، بازدید انسانی، بهبود رتبه گوگل و پشتیبانی چندزبانه.",
              provider: {
                "@type": "Organization",
                name: "TsarSEO",
                url: "https://tsarseo.com",
              },
            }),
          }}
        />
      </Head>

      <section
        dir="rtl"
        id="features"
        className="container max-w-6xl mx-auto py-20 font-kalameh text-white"
        aria-labelledby="features-heading"
      >
        <header className="mb-12 max-w-2xl mx-auto text-center">
          <motion.h2
            id="features-heading"
            className="text-2xl sm:text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-orange-700 mb-3 tracking-tight"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            چرا <span className="font-bold">TsarSEO</span>؟
          </motion.h2>
          <p className="text-gray-300 text-base font-extralight sm:text-lg leading-relaxed">
            ابزارهای حرفه‌ای برای تسلط بر فضای دیجیتال با تحلیل دقیق و عملکرد
            بی‌نظیر
          </p>
        </header>

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 sm:gap-6 lg:gap-6">
          {features.map(({ icon, name }, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ scale: isMobile ? 1 : 1.05, y: isMobile ? 0 : -5 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="group cursor-pointer bg-gradient-to-br from-[#121212] to-[#1a1a1a] rounded-2xl p-5 sm:p-6 flex flex-col items-center text-center border border-orange-500/20 hover:border-orange-600/50 shadow-lg hover:shadow-orange-500/10 transition-all duration-300"
              role="article"
              aria-label={`ویژگی ${name}`}
            >
              <motion.div
                className="mb-4 p-3 rounded-full bg-orange-500/10 group-hover:bg-orange-500/20 transition-colors duration-300"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ duration: 0.3 }}
              >
                <Icon
                  name={icon}
                  size={26}
                  color="rgb(255 108 0)"
                  aria-hidden="true"
                />
              </motion.div>
              <span className="text-sm sm:text-base font-thin text-gray-200 group-hover:text-orange-400 transition-colors duration-300 text-nowrap">
                {name}
              </span>
              <div className="mt-3 w-10 h-0.5 bg-gradient-to-r from-transparent via-orange-500 to-transparent group-hover:scale-x-125 transition-transform duration-300"></div>
            </motion.div>
          ))}
        </div>
      </section>
    </>
  );
};

export default SponsorsSection;
