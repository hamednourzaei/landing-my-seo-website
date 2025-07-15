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
      className="container font-kalameh font-thin py-6 sm:py-8 md:py-10 lg:py-12 text-muted-foreground"
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
              className="bg-card p-2 sm:p-3 md:p-4 lg:p-5 rounded-md sm:rounded-lg shadow-sm text-center text-xs sm:text-sm md:text-base lg:text-lg border border-primary"
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
        className="text-xs sm:text-sm md:text-base lg:text-lg font-semibold text-primary mb-1 sm:mb-2 md:mb-3 lg:mb-4 text-center"
        initial={{ y: 5, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        پلن‌های ما
      </motion.h2>
      <motion.h2
        className="text-xs sm:text-sm md:text-base lg:text-lg font-semibold text-primary mb-2 sm:mb-3 md:mb-4 lg:mb-5 text-center"
        initial={{ y: 5, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        با TsarSEO به قله‌های گوگل برسید
      </motion.h2>
      <motion.h3
        className="text-xs sm:text-sm md:text-base lg:text-lg text-center text-muted-foreground mb-4 sm:mb-5 md:mb-6 lg:mb-8 max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg mx-auto"
        initial={{ y: 5, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        تعداد بازدید موردنظرتان را انتخاب کنید و کسب‌وکارتان را رشد دهید.
      </motion.h3>

      <motion.div
        className="max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl mx-auto"
        initial={{ y: 10, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.3 }}
      >
        <Card className="bg-card border border-primary rounded-lg sm:rounded-xl md:rounded-2xl shadow-sm hover:shadow-md transition-all duration-200">
       
          <CardContent className="p-2 sm:p-3 md:p-4 lg:p-5 space-y-2 sm:space-y-3 md:space-y-4 lg:space-y-5">
            <div className="text-center">
              <p className="text-sm sm:text-base md:text-lg lg:text-xl font-thin text-primary">
                {totalPrice.toLocaleString()} تومان
              </p>
              <p className="text-xs sm:text-sm md:text-base lg:text-lg text-muted-foreground">
                برای {visits.toLocaleString()} بازدید ماهانه
              </p>
            </div>
            <div className="text-center">
              <label className="block mb-1 sm:mb-2 md:mb-3 lg:mb-4 text-xs sm:text-sm md:text-base lg:text-lg text-muted-foreground">
                تعداد بازدید:
              </label>
              <Slider
                value={[visits]}
                onValueChange={(value) => setVisits(value[0])}
                min={100}
                max={20000}
                step={100}
                className="mb-1 sm:mb-2 md:mb-3 lg:mb-4 w-1/2 sm:w-2/3 md:w-3/4 lg:w-full mx-auto"
              />
              <Input
                type="number"
                min={100}
                value={visits}
                onChange={(e) => setVisits(Number(e.target.value))}
                className="p-1 sm:p-2 md:p-3 lg:p-4 rounded-md border border-muted text-xs sm:text-sm md:text-base lg:text-lg w-1/4 sm:w-1/3 md:w-1/2 lg:w-2/3 mx-auto text-center"
                placeholder="مثلاً 3500"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-1 sm:gap-2 md:gap-3 lg:gap-4">
              {benefits.map((benefit) => (
                <div
                  key={benefit}
                  className="flex items-center text-muted-foreground text-sm sm:text-sm md:text-xs lg:text-sm"
                >
                  <Check className="text-primary ml-1 sm:mr-2 md:mr-3 lg:mr-4" size={10} />
                  {benefit}
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
            >
              ثبت سفارش
            </Button>
            <Button
              variant="outline"
              className="w-full text-primary border-primary hover:bg-primary/10 text-xs sm:text-sm md:text-base lg:text-lg rounded-md sm:rounded-lg md:rounded-xl lg:rounded-2xl"
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
