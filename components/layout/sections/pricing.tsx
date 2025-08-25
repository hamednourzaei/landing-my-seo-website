// =============================
// pricing.tsx (SEO-amplified, no UI change, White Hat focus)
// =============================
"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Check } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import Head from "next/head";
import Link from "next/link";

export const PricingSection: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [visits, setVisits] = useState(1000);

  const basePricePerVisit = 500;
  const totalPrice = visits * basePricePerVisit;

  const [timeLeft, setTimeLeft] = useState("");
  useEffect(() => {
    const endDate = new Date("2025-06-06T23:59:59");
    const updateTimer = () => {
      const now = new Date();
      const diff = endDate.getTime() - now.getTime();
      if (diff <= 0) return setTimeLeft("تخفیف به پایان رسید!");
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      setTimeLeft(`${days} روز و ${hours} ساعت`);
    };
    updateTimer();
    const interval = setInterval(updateTimer, 3600000);
    return () => clearInterval(interval);
  }, []);

  const benefits = [
    "بهینه‌سازی کلمات کلیدی با رشد تا ۷۰٪ با تحلیل پیشرفته",
    "گزارش جامع سئو با تحلیل رقبا در قالب PDF و داشبورد تعاملی",
    "راه‌اندازی سریع در ۵ دقیقه بدون نیاز به دانش فنی",
    "انتخاب هدفمند بازدید برای مسیرهای کلیدی سایت",
    "دریافت نمونه گزارش رایگان با تحلیل دقیق سایت",
  ];

  const handleSubmit = () => {
    if (!visits) return alert("لطفاً تعداد بازدید را وارد کنید.");
    setLoading(true);
    setSuccessMessage(`درخواست شما برای ${visits.toLocaleString()} بازدید ثبت شد.`);
    setTimeout(() => {
      setLoading(false);
      window.location.hash = `contact?visits=${visits}`;
      const contactSection = document.getElementById("contact");
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: "smooth" });
      }
    }, 2000);
  };

  return (
    <section
      dir="rtl"
      id="pricing"
      className="container font-kalameh font-thin py-6 sm:py-8 md:py-10 lg:py-12 text-muted-foreground"
      aria-labelledby="pricing-heading"
    >
      <Head>
        <title>پلن‌های سئو TsarSEO | قیمت‌گذاری بهینه برای افزایش رتبه</title>
        <meta
          name="description"
          content="پلن‌های سئو TsarSEO با قیمت‌گذاری منعطف برای افزایش بازدید واقعی، تحلیل رقبا، و بهینه‌سازی تجربه جستجو (AEO). گزارش‌های پیشرفته و پشتیبانی 24/7."
        />
        <meta
          name="keywords"
          content="پلن سئو, قیمت سئو, افزایش بازدید واقعی, تحلیل رقبا, بهینه‌سازی AEO, رتبه‌بندی گوگل, TsarSEO"
        />
        <link rel="canonical" href="https://tsarseo.online/pricing" />
        <meta property="og:title" content="پلن‌های سئو TsarSEO | قیمت‌گذاری بهینه برای افزایش رتبه" />
        <meta
          property="og:description"
          content="پلن‌های سئو TsarSEO با قیمت‌گذاری منعطف برای افزایش بازدید واقعی، تحلیل رقبا، و بهینه‌سازی تجربه جستجو (AEO)."
        />
        <meta property="og:image" content="https://tsarseo.online/pricing-image.jpg" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://tsarseo.online/pricing" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Product",
              name: "پلن‌های سئو TsarSEO",
              description:
                "خدمات سئو TsarSEO با پلن‌های متنوع برای افزایش بازدید واقعی، تحلیل رقبا، و بهینه‌سازی تجربه جستجو (AEO).",
              brand: { "@type": "Organization", name: "TsarSEO" },
              offers: {
                "@type": "AggregateOffer",
                lowPrice: 500 * 100,
                highPrice: 500 * 20000,
                priceCurrency: "IRR",
                offerCount: 3,
                availability: "https://schema.org/InStock",
                url: "https://tsarseo.online/pricing",
                validThrough: "2025-12-31",
              },
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "4.8",
                reviewCount: "350",
              },
              mainEntity: {
                "@type": "FAQPage",
                mainEntity: [
                  {
                    "@type": "Question",
                    name: "چگونه TsarSEO باعث افزایش رتبه سایت می‌شود؟",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "با تحلیل رقبا، بهینه‌سازی کلمات کلیدی و استفاده از استراتژی‌های AEO برای بهبود CTR و تجربه جستجو.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "آیا پلن‌های TsarSEO برای همه کسب‌وکارها مناسب است؟",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "بله، پلن‌های منعطف ما برای کسب‌وکارهای کوچک تا بزرگ طراحی شده‌اند.",
                    },
                  },
                ],
              },
            }),
          }}
        />
      </Head>

      <AnimatePresence>
        {loading && (
          <motion.div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-card p-2 sm:p-3 md:p-4 lg:p-5 rounded-md sm:rounded-lg shadow-sm text-center text-xs sm:text-sm md:text-base lg:text-lg border border-primary"
            >
              <div className="animate-pulse mb-1 text-primary font-thin">در حال ثبت سفارش...</div>
              <div>{successMessage}</div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.h2
        id="pricing-heading"
        className="text-xs sm:text-sm md:text-base lg:text-lg font-semibold text-primary mb-1 sm:mb-2 md:mb-3 lg:mb-4 text-center"
        initial={{ y: 5, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        پلن‌های سئو TsarSEO
      </motion.h2>
      <motion.h2
        className="text-xs sm:text-sm md:text-base lg:text-lg font-semibold text-primary mb-2 sm:mb-3 md:mb-4 lg:mb-5 text-center"
        initial={{ y: 5, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        با TsarSEO به رتبه‌های برتر گوگل برسید
      </motion.h2>
      <motion.h3
        className="text-xs sm:text-sm md:text-base lg:text-lg text-center text-muted-foreground mb-4 sm:mb-5 md:mb-6 lg:mb-8 max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg mx-auto"
        initial={{ y: 5, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        پلن دلخواه خود را انتخاب کنید و رشد کسب‌وکارتان را تسریع کنید.
      </motion.h3>

      <motion.div
        className="max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl mx-auto"
        initial={{ y: 10, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.3 }}
      >
        <Card className="bg-card border border-primary rounded-lg sm:rounded-xl md:rounded-2xl shadow-sm hover:shadow-md transition-all duration-200">
          <CardHeader>
            <CardTitle className="sr-only">پلن‌های سئو و افزایش بازدید</CardTitle>
          </CardHeader>
          <CardContent className="p-3 sm:p-4 md:p-5 lg:p-5 space-y-3 sm:space-y-4 md:space-y-5 lg:space-y-6">
            <div className="text-center">
              <p className="text-sm sm:text-base p-2 md:text-lg lg:text-xl font-thin text-primary">
                {totalPrice.toLocaleString()} تومان
              </p>
              <p className="text-xs sm:text-sm md:text-base lg:text-lg text-muted-foreground">
                برای {visits.toLocaleString()} بازدید ماهانه
              </p>
            </div>
            <div className="text-center">
              <label
                htmlFor="visits-input"
                className="block mb-3 sm:mb-4 md:mb-4 lg:mb-4 text-xs sm:text-sm md:text-base lg:text-lg text-muted-foreground"
              >
                تعداد بازدید:
              </label>
              <Slider
                value={[visits]}
                onValueChange={(value) => setVisits(value[0])}
                min={100}
                max={20000}
                step={100}
                className="mb-3 sm:mb-2 md:mb-4 lg:mb-4 w-1/2 sm:w-2/3 md:w-3/4 lg:w-full mx-auto"
                aria-label="انتخاب تعداد بازدید ماهانه"
              />
              <Input
                id="visits-input"
                type="number"
                min={100}
                value={visits}
                onChange={(e) => setVisits(Number(e.target.value))}
                className="p-1 sm:p-2 md:p-3 lg:p-4 rounded-md border border-muted text-xs sm:text-sm md:text-base lg:text-lg w-1/4 sm:w-1/3 md:w-1/2 lg:w-2/3 mx-auto text-center"
                placeholder="مثلاً 3500"
                aria-label="وارد کردن تعداد بازدید ماهانه"
                aria-describedby="visits-description"
              />
              <p id="visits-description" className="sr-only">
                تعداد بازدید ماهانه را وارد کنید (حداقل ۱۰۰ بازدید)
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-1 sm:gap-2 md:gap-3 lg:gap-4">
              {benefits.map((benefit) => (
                <div
                  key={benefit}
                  className="flex items-center text-muted-foreground text-sm sm:text-sm md:text-xs lg:text-sm"
                >
                  <Check className="text-primary ml-1 sm:mr-2 md:mr-3 lg:mr-4" size={10} aria-hidden="true" />
                  <Link href="#benefits" className="focus:outline-none">{benefit}</Link>
                </div>
              ))}
            </div>
            <div className="text-center text-red-500 text-xs sm:text-sm md:text-base lg:text-lg mt-2 sm:mt-3 md:mt-4 lg:mt-5">
              تخفیف ۲۰٪ فقط تا: {timeLeft}
            </div>
          </CardContent>
          <CardFooter className="p-2 sm:p-3 md:p-4 lg:p-5 flex flex-col gap-1 sm:gap-2 md:gap-3 lg:gap-4">
            <Button
              className="w-full bg-primary hover:bg-primary/90 text-white text-xs sm:text-sm md:text-base lg:text-lg rounded-md sm:rounded-lg md:rounded-xl lg:rounded-2xl"
              onClick={handleSubmit}
              disabled={loading}
              aria-label="ثبت سفارش پلن سئو با تعداد بازدید انتخاب‌شده"
            >
              ثبت سفارش
            </Button>
            <Button
              variant="outline"
              className="w-full text-primary border-primary hover:bg-primary/10 text-xs sm:text-sm md:text-base lg:text-lg rounded-md sm:rounded-lg md:rounded-xl lg:rounded-2xl"
              onClick={() => (window.location.hash = "#success-stories")}
              aria-label="مشاهده نمونه گزارش سئو"
            >
              نمونه گزارش سئو
            </Button>
          </CardFooter>
        </Card>
      </motion.div>

      <div className="sr-only" aria-hidden>
        <Link href="#hero">تحلیل سئو حرفه‌ای</Link> | <Link href="#benefits">مزایای سئو</Link>
      </div>
    </section>
  );
};