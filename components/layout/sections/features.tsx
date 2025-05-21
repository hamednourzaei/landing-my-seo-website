"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Icon } from "@/components/ui/icon";

interface FeaturesProps {
  icon: keyof typeof import("lucide-react").icons;
  title: string;
  description: string;
}

const featureList: FeaturesProps[] = [
  {
    icon: "Search",
    title: "تحلیل کلمات کلیدی",
    description:
      "شناسایی دقیق کلمات کلیدی پرجستجو و رقابتی برای بهبود استراتژی محتوای شما.",
  },
  {
    icon: "Users",
    title: "ترافیک شبیه‌سازی‌شده",
    description:
      "بازدیدهای واقعی با رفتار انسانی برای افزایش رتبه گوگل بدون ریسک جریمه.",
  },
  {
    icon: "LineChart",
    title: "گزارش‌های تعاملی",
    description:
      "نمودارها و گزارش‌های پویا برای رصد لحظه‌ای عملکرد سئو و ترافیک سایت.",
  },
  {
    icon: "Globe",
    title: "پشتیبانی چندزبانه",
    description:
      "پشتیبانی ۲۴/۷ به زبان‌های مختلف برای کاربران ایرانی و بین‌المللی.",
  },
  {
    icon: "Zap",
    title: "سرعت تحلیل بالا",
    description:
      "دریافت گزارش‌های سئو در کمتر از چند دقیقه با فناوری پیشرفته TsarSEO.",
  },
  {
    icon: "Lock",
    title: "امنیت داده‌ها",
    description:
      "حفاظت از اطلاعات شما با رمزنگاری پیشرفته و پروتکل‌های امنیتی.",
  },
];

export const FeaturesSection: React.FC = () => {
  return (
    <section dir="rtl" id="features" className="container font-kalameh py-24 sm:py-32">
      <h2 className="text-lg text-primary text-center mb-2 tracking-wider">
        ویژگی‌های TsarSEO
      </h2>

      <h2 className="text-3xl md:text-4xl text-center font-sans font-bold mb-4">
        ابزارهای حرفه‌ای برای فرمانروایی دیجیتال
      </h2>

      <h3 className="md:w-1/2 mx-auto text-xl text-center text-muted-foreground mb-8">
        با قابلیت‌های پیشرفته TsarSEO، تحلیل سئو و ترافیک سایت خود را به سطحی جدید ببرید.
      </h3>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {featureList.map(({ icon, title, description }) => (
          <div key={title}>
            <Card className="h-full bg-background border-0 shadow-none">
              <CardHeader className="flex justify-center items-center">
                <div className="bg-primary/20 p-2 rounded-full ring-8 ring-primary/10 mb-4">
                  <Icon
                    name={icon}
                    size={24}
                    color="hsl(var(--primary))"
                    className="text-primary"
                  />
                </div>

                <CardTitle>{title}</CardTitle>
              </CardHeader>

              <CardContent className="text-muted-foreground text-center">
                {description}
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </section>
  );
};