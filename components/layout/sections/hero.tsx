"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion"
export const HeroSection = () => {
  const { theme } = useTheme();
  return (
    <section className="container font-kalameh w-full">
      <div className="grid place-items-center lg:max-w-screen-xl gap-8 mx-auto py-20 md:py-32">
        <div className="text-center space-y-8">
          <Badge variant="outline" className="text-sm py-2">
            <span className="mr-2 text-primary">
              <Badge>New</Badge>
            </span>
            <span>سرویس حرفه‌ای برای رشد آنلاین</span>
          </Badge>
          <div className="max-w-screen-md mx-auto text-center text-4xl md:text-6xl font-bold leading-tight">
  <h1>
    
    بازدید واقعی + تحلیل سئوی حرفه ای  
   
    <span className="inline-block text-transparent bg-gradient-to-r from-[#D247BF] to-primary bg-clip-text mt-5 border-b-2 border-b-[#af4c00]">
      فقط با یک کلیک
    </span>
  </h1>
</div>

          <p dir="rtl" className="max-w-screen-sm mx-auto text-lg md:text-xl text-muted-foreground text-right font-sans font-medium">تحلیل دقیق سئو برای متخصص ها  و بازدید واقعی برای سایت‌هایی که می‌خوان در گوگل دیده شن. گزارش حرفه‌ای بگیر – همین حالا شروع کن!  </p>

          <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="text-center font-kalameh mt-8"
    >
      <motion.div whileHover={{ scale: 1.05 }}>
        <Link
          href="#contact"
          className="inline-flex items-center justify-center px-6 py-3 text-lg font-semibold bg-gradient-to-r from-[#D247BF] to-primary text-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300"
        >ببین
         سایتت 
         برای
          گوگل
           چقدر
            آمادست؟                      <motion.span
            className="ml-2"
            initial={{ x: 0 }}
            whileHover={{ x: 5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <ArrowRight className="size-5" />
          </motion.span>
        </Link>
      </motion.div>
    </motion.div>
        </div>

        <div className="relative group mt-14">
          <div className="absolute top-2 lg:-top-8 left-1/2 transform -translate-x-1/2 w-[90%] mx-auto h-24 lg:h-80 bg-primary/50 rounded-full blur-3xl"></div>
          <Image
            width={1200}
            height={1200}
            className="w-full md:w-[1200px] mx-auto rounded-lg relative leading-none flex items-center border border-t-2 border-secondary border-t-primary/30"
            src={
              theme === "light"
                ? "/demo-img.jpg"
                : "/demo-img.jpg"
            }
            alt="اسکرین‌شات نمونه گزارش SEO و نمودار ترافیک"
          />
          <div className="absolute bottom-0 left-0 w-full h-20 md:h-28 bg-gradient-to-b from-background/0 via-background/50 to-background rounded-lg"></div>
        </div>
      </div>
    </section>
  );
};