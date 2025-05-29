"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Icon } from "@/components/ui/icon";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface FeaturesProps {
  icon: keyof typeof import("lucide-react").icons;
  title: string;
  description: string;
}

const featureList: FeaturesProps[] = [
  {
    icon: "Search",
    title: "کشف فرصت‌های طلایی",
    description:
      "تحلیل کلمات کلیدی برای پیدا کردن بهترین فرصت‌ها جهت رشد در نتایج جستجو.",
  },
  {
    icon: "Users",
    title: "افزایش بازدید هدفمند",
    description:
      "جذب کاربرانی که واقعاً به خدمات شما نیاز دارند با بهینه‌سازی هوشمند.",
  },
  {
    icon: "LineChart",
    title: "آمار دقیق لحظه‌ای",
    description:
      "دریافت گزارش‌های زنده از عملکرد سایت و بررسی مسیر پیشرفت سئو.",
  },
  {
    icon: "Globe",
    title: "حضور جهانی قدرتمند",
    description:
      "عرضه خدمات سئو برای بازارهای بین‌المللی با پشتیبانی چندزبانه.",
  },
  {
    icon: "Zap",
    title: "پاسخ‌دهی سریع و دقیق",
    description:
      "آنالیز جامع سایت تنها در چند دقیقه با الگوریتم‌های پیشرفته ما.",
  },
  {
    icon: "Lock",
    title: "اطمینان در امنیت",
    description:
      "نگهداری امن اطلاعات شما با سیستم‌های رمزنگاری و نظارت پیشرفته.",
  },
];

export const FeaturesSection: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const update = () => setIsMobile(window.innerWidth < 600);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const animation = {
    background: [
      "linear-gradient(45deg, rgba(255, 108, 0, 0.2), rgba(255, 108, 0, 0.1))",
      "linear-gradient(135deg, rgba(255, 108, 0, 0.3), rgba(255, 108, 0, 0.15))",
      "linear-gradient(225deg, rgba(255, 108, 0, 0.2), rgba(255, 108, 0, 0.05))",
    ],
    boxShadow: [
      "0 0 5px rgba(255, 108, 0, 0.2)",
      "0 0 15px rgba(255, 108, 0, 0.4)",
      "0 0 5px rgba(255, 108, 0, 0.2)",
    ],
    transition: {
      background: { duration: 3, repeat: Infinity, ease: "linear" },
      boxShadow: { duration: 2, repeat: Infinity, ease: "easeInOut" },
    },
  };

  return (
    <section
      dir="rtl"
      id="features"
      className="container font-kalameh py-24 sm:py-32"
    >
      <h2 className="text-xl text-primary text-center mb-2 tracking-wider">
        ویژگی‌های TsarSEO
      </h2>
      <h2 className="text-lg lg:text-3xl md:text-2xl text-center font-sans font-bold mb-4">
        ابزارهای حرفه‌ای برای فرمانروایی دیجیتال
      </h2>
      <h3 className="text-base lg:text-3xl md:text-2xl text-center text-muted-foreground mb-8">
        با قابلیت‌های پیشرفته TsarSEO، تحلیل سئو و ترافیک سایت خود را به سطحی
        جدید ببرید.
      </h3>

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
        {featureList.map(({ icon, title, description }, index) => (
          <motion.div
            key={index}
            className="relative rounded-lg"
            initial={{ opacity: 0 }}
            animate={isMobile ? { ...animation, opacity: 1 } : { opacity: 1 }}
            whileHover={!isMobile ? animation : undefined}
          >
            <Card className="h-full bg-background border-0 shadow-none m-0.5">
              <CardHeader className="flex justify-center items-center">
                <div className="bg-primary/20 p-2 rounded-full ring-8 ring-primary/10 mb-4">
                  <Icon
                    name={icon}
                    size={24}
                    color="hsl(var(--primary))"
                    className="text-primary"
                  />
                </div>
                <CardTitle className="lg:text-3xl md:text-2xl text-base">
                  {title}
                </CardTitle>
              </CardHeader>
              <CardContent
                dir="rtl"
                className="text-muted-foreground lg:text-xl md:text-xl text-xs text-center line-clamp-4"
              >
                {description}
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
