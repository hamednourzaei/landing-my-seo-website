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
    "بهینه‌سازی کلمات کلیدی با رشد تا ۷۰٪ در نتایج جست‌وجودر ماه های اولیه – هدف‌گیری دقیق بر اساس موقعیت مکانی شما",
    "گزارش سئو با تحلیل رقبا و پیشنهاد کلمات کلیدی (PDF + داشبورد)",
    "راه‌اندازی در ۵ دقیقه بدون نیاز به دانش فنی",
    "قابلیت انتخاب بازدید در چند مسیر سایت شما",
    "نمونه گزارش رایگان با تحلیل سایت شما",
  ];

  const handleSubmit = () => {
    if (!visits) return alert("لطفاً تعداد بازدید را وارد کنید.");
    setLoading(true);
    setSuccessMessage(
      `درخواست شما برای ${visits.toLocaleString()} بازدید ثبت شد.`
    );
    setTimeout(() => {
      setLoading(false);
      window.location.hash = `contact?visits=${visits}`;
      // اسکرول صریح به بخش #contact
      const contactSection = document.getElementById("contact");
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: "smooth" });
      } else {
        console.error("Element with id 'contact' not found");
      }
    }, 2500);
  };

  return (
    <section
      dir="rtl"
      className="container font-kalameh font-extrabold py-16"
      style={{ position: "relative" }} // برای رفع خطای non-static position
    >
      <AnimatePresence>
        {loading && (
          <motion.div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ position: "fixed" }}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-background p-8 rounded-xl shadow-xl text-center text-lg border border-primary"
            >
              <div className="animate-pulse mb-4 text-primary font-bold">
                در حال ثبت سفارش...
              </div>
              <div>{successMessage}</div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.h2
        className="text-lg text-primary text-center mb-2 tracking-wider"
        style={{ position: "relative" }}
      >
        پلن‌های TsarSEO
      </motion.h2>
      <motion.h2
        className="text-3xl md:text-4xl text-center font-bold mb-4"
        style={{ position: "relative" }}
      >
        با TsarSEO به قله‌های گوگل برسید
      </motion.h2>
      <motion.h3
        className="md:w-1/2 mx-auto text-xl text-center text-muted-foreground pb-14"
        style={{ position: "relative" }}
      >
        تعداد بازدید موردنظرتان را انتخاب کنید و با تحلیل‌های دقیق سئو،
        کسب‌وکارتان را رشد دهید.
      </motion.h3>

      <motion.div className="max-w-4xl mx-auto" style={{ position: "relative" }}>
        <Card className="text-right border-[1.5px] border-primary drop-shadow-md">
          <CardHeader>
            <CardTitle className="text-lg text-center sm:text-2xl md:text-4xl  font-kalameh font-bold">پلن سفارشی</CardTitle>
            <CardDescription className="py-2 text-sm text-center sm:text-xl md:text-2xl font-kalameh font-bold ">
              ترافیک و گزارش سئو بر اساس نیاز شما
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center">
              <p className="text-3xl font-bold text-primary">
                {totalPrice.toLocaleString()} تومان
              </p>
              <p className="text-muted-foreground">
                برای {visits.toLocaleString()} بازدید ماهانه
              </p>
            </div>
            <div>
              <label className="block mb-2 text-base lg:text-1xl sm:text-2xl md:text-1xl  font-kalameh font-bold text-muted-foreground">
                تعداد بازدید:
              </label>
              <Slider
                value={[visits]}
                onValueChange={(value) => setVisits(value[0])}
                min={100}
                max={20000}
                step={100}
                className="mb-4"
              />
              <Input
                type="number"
                min={100}
                value={visits}
                onChange={(e) => setVisits(Number(e.target.value))}
                className="p-3 rounded-lg border border-gray-300 w-full"
                placeholder="مثلاً 3500"
              />
            </div>
            <div className="space-y-2">
              {benefits.map((benefit) => (
                <div
                  key={benefit}
                  className="flex items-center text-muted-foreground"
                >
                  <Check className="text-primary ml-2" size={18} />
                  <span>{benefit}</span>
                </div>
              ))}
            </div>
            <div className="text-center text-red-600 font-bold">
              تخفیف ۲۰٪ فقط تا: {timeLeft}
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <Button
              className="w-full"
              onClick={handleSubmit}
              disabled={loading}
            >
              ثبت سفارش
            </Button>
            <Button
              variant="outline"
              className="w-full"
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
