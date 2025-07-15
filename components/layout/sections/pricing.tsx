"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Check } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";

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
      const hours = Math.floor(
        (diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      setTimeLeft(`${days} روز و ${hours} ساعت`);
    };
    updateTimer();
    const interval = setInterval(updateTimer, 3600000);
    return () => clearInterval(interval);
  }, []);

  const benefits = [
    "بهینه‌سازی کلمات کلیدی با رشد تا ۷۰٪",
    "گزارش سئو با تحلیل رقبا (PDF + داشبورد)",
    "راه‌اندازی در ۵ دقیقه بدون نیاز فنی",
    "انتخاب بازدید برای مسیرهای سایت",
    "نمونه گزارش رایگان با تحلیل سایت",
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
      className="container font-kalameh font-thin py-10 sm:py-12 text-muted-foreground"
    >
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
              className="bg-card p-4 rounded-lg shadow-md text-center text-base border border-primary"
            >
              <div className="animate-pulse mb-1 text-primary font-thin">
                در حال ثبت سفارش...
              </div>
              <div>{successMessage}</div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.h2
        className="text-base sm:text-base font-semibold text-primary mb-2 text-center"
        initial={{ y: 10, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        پلن‌های TsarSEO
      </motion.h2>
      <motion.h2
        className="text-base sm:text-base font-semibold text-primary mb-3 text-center"
        initial={{ y: 10, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        با TsarSEO به قله‌های گوگل برسید
      </motion.h2>
      <motion.h3
        className="text-base sm:text-sm text-center text-muted-foreground mb-6 max-w-xs mx-auto"
        initial={{ y: 10, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        تعداد بازدید موردنظرتان را انتخاب کنید و کسب‌وکارتان را رشد دهید.
      </motion.h3>

      <motion.div
        className="max-w-2xl mx-auto"
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.3 }}
      >
        <Card className="bg-card border border-primary rounded-2xl shadow-sm hover:shadow-md transition-all duration-200">
          <CardHeader>
            <CardTitle className="text-base sm:text-base font-bold text-primary text-center">
              خرید بازدید سایت
            </CardTitle>
            <CardDescription className="text-xs text-muted-foreground text-center">
              ترافیک و گزارش سئو بر اساس نیاز شما
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center">
              <p className="text-lg sm:text-xl font-thin text-primary">
                {totalPrice.toLocaleString()} تومان
              </p>
              <p className="text-xs text-muted-foreground">
                برای {visits.toLocaleString()} بازدید ماهانه
              </p>
            </div>
            <div className="text-center">
              <label className="block mb-1 text-xs text-muted-foreground">
                تعداد بازدید:
              </label>
              <Slider
                value={[visits]}
                onValueChange={(value) => setVisits(value[0])}
                min={100}
                max={20000}
                step={100}
                className="mb-2 w-2/3 mx-auto"
              />
              <Input
                type="number"
                min={100}
                value={visits}
                onChange={(e) => setVisits(Number(e.target.value))}
                className="p-2 rounded-md border border-muted text-xs w-1/3 mx-auto text-center"
                placeholder="مثلاً 3500"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:md:grid-cols-2 gap-2 mt-4">
  {benefits.map((benefit) => (
    <div
      key={benefit}
      className="flex items-center text-muted-foreground text-xs"
    >
      <Check className="text-primary mr-1" size={14} />
      {benefit}
    </div>
  ))}
</div>


            <div className="text-center text-red-500 text-base font-medium mt-4">
              تخفیف ۲۰٪ فقط تا: {timeLeft}
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-2">
            <Button
              className="w-full bg-primary hover:bg-primary/90 text-white text-base rounded-xl"
              onClick={handleSubmit}
              disabled={loading}
            >
              ثبت سفارش
            </Button>
            <Button
              variant="outline"
              className="w-full text-primary border-primary hover:bg-primary/10 text-base rounded-xl"
              onClick={() => (window.location.hash = "#success-stories")}
            >
              نمونه گزارش سئو
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
    </section>
  );
};
