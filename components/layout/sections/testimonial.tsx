"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Star } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface SuccessStoryProps {
  id: string;
  image: string;
  name: string;
  role: string;
  comment: string;
  rating: number;
}

const storyList: SuccessStoryProps[] = [
  {
    id: "t1",
    image: "https://ui-avatars.com/api/?name=سجاد+محمدی",
    name: "سجاد محمدی",
    role: "صاحب فروشگاه آنلاین",
    comment:
      "با ترافیک واقعی TsarSEO، فروشگاه من در ۳ ماه به صفحه اول گوگل رسید و فروشم ۲ برابر شد. پشتیبانی تیم هم عالی بود!",
    rating: 5.0,
  },
  {
    id: "t20",
    image: "https://ui-avatars.com/api/?name=نسرین+احمدی",
    name: "نسرین احمدی",
    role: "مدیر آژانس سئو",
    comment:
      "گزارش‌های پیشرفته TsarSEO به من کمک کرد استراتژی سئوی مشتریانم رو بهینه کنم. حالا ۹۰٪ مشتریانم راضی‌ترن!",
    rating: 4.9,
  },
  {
    id: "t03",
    image: "https://ui-avatars.com/api/?name=ندا+حسینی",
    name: "ندا حسینی",
    role: "فریلنسر",
    comment:
      "با پلن پایه TsarSEO، ترافیک سایتم ۳ برابر شد و پروژه‌های جدیدی گرفتم. استفاده از داشبوردش خیلی ساده بود!",
    rating: 4.8,
  },
  {
    id: "t02",
    image: "https://ui-avatars.com/api/?name=نسرین+احمدی",
    name: "نسرین احمدی",
    role: "مدیر آژانس سئو",
    comment:
      "گزارش‌های پیشرفته TsarSEO به من کمک کرد استراتژی سئوی مشتریانم رو بهینه کنم. حالا ۹۰٪ مشتریانم راضی‌ترن!",
    rating: 4.9,
  },
  {
    id: "t30",
    image: "https://ui-avatars.com/api/?name=ندا+حسینی",
    name: "ندا حسینی",
    role: "فریلنسر",
    comment:
      "با پلن پایه TsarSEO، ترافیک سایتم ۳ برابر شد و پروژه‌های جدیدی گرفتم. استفاده از داشبوردش خیلی ساده بود!",
    rating: 4.8,
  },
];

export const TestimonialSection: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 600);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
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
      background: { duration: 1, repeat: Infinity, ease: "linear" },
      boxShadow: { duration: 3, repeat: Infinity, ease: "easeInOut" },
    },
  };

  return (
    <section
      id="success-stories"
      className="container font-kalameh font-semibold py-24 sm:py-32"
    >
      <hr className="border-secondary mb-8" />
      <div className="text-center mb-8 py-24">
        <h2 className="text-lg text-primary text-center mb-2 tracking-wider">
          نظرات موفقیت آمیز مشتریان
        </h2>
        <h2 className="text-3xl md:text-4xl text-center font-bold mb-4">
          TsarSEO موفقیت مشتریان
        </h2>
      </div>

      <Carousel
        opts={{ align: "start" }}
        className="relative w-[80%] sm:w-[90%] lg:max-w-screen-xl mx-auto"
      >
        <CarouselContent>
          {storyList.map((story) => (
            <CarouselItem key={story.id} className="md:basis-1/2 lg:basis-1/3">
              <motion.div
                className="h-full rounded-lg overflow-visible"
                initial={{ opacity: 0 }}
                animate={isMobile ? { ...animation, opacity: 1 } : { opacity: 1 }}
                whileHover={!isMobile ? animation : undefined}
              >
                <Card className="h-full bg-muted/50 dark:bg-card overflow-hidden">
                  
                  {/* ✅ عکس بالای نظر */}
                  <div className="w-full h-40 overflow-hidden">
                    <img
                      src={story.image}
                      alt={story.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <CardContent className="pt-6 pb-0">
                    <div className="flex gap-1 pb-6">
                      {Array.from({ length: Math.floor(story.rating) }).map((_, i) => (
                        <Star key={i} className="size-4 fill-primary text-primary" />
                      ))}
                      {story.rating % 1 !== 0 && (
                        <Star className="size-4 text-primary" />
                      )}
                    </div>
                    {`"${story.comment}"`}
                  </CardContent>

                  <CardHeader>
                    <div className="flex flex-row items-center my-5 gap-4">
                      <Avatar>
                        <AvatarImage src={story.image} alt={story.name} />
                        <AvatarFallback>
                          {story.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <CardTitle className="text-lg">{story.name}</CardTitle>
                        <CardDescription>{story.role}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              </motion.div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </section>
  );
};
