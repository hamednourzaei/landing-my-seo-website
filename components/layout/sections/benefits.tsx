"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Icon } from "@/components/ui/icon";

interface BenefitsProps {
  icon: keyof typeof import("lucide-react").icons;
  title: string;
  description: string;
}

const benefitList: BenefitsProps[] = [
  {
    icon: "BarChart2",
    title: "گزارش‌های حرفه‌ای سئو",
    description:
      "دریافت گزارش‌های جامع و دقیق برای تحلیل عملکرد سایت و بهبود استراتژی‌های سئو، مناسب برای آژانس‌ها.",
  },
  {
    icon: "Users",
    title: "ترافیک واقعی انسانی",
    description:
      "بازدیدهای شبیه‌سازی‌شده با رفتار انسانی برای افزایش رتبه گوگل و جذب مشتریان واقعی.",
  },
  {
    icon: "Gauge",
    title: "داشبورد ساده و کاربردی",
    description:
      "مدیریت آسان پروژه‌های سئو و ترافیک با داشبوردی کاربرپسند، حتی برای مبتدیان.",
  },
  {
    icon: "ShieldCheck",
    title: "امنیت و اعتماد",
    description:
      "حفاظت کامل از داده‌های شما با پروتکل‌های امنیتی پیشرفته و پشتیبانی ۲۴/۷.",
  },


];

export const BenefitsSection: React.FC = () => {
  return (
    <section dir="rtl" id="benefits" className="container font-kalameh sm:py-32">
        <hr className="border-secondary" />
      <div className="grid lg:grid-cols-2 pt-24 place-items-center lg:gap-24">
        <div>
          <h2 className="text-lg text-primary mb-2 tracking-wider">
            مزایای TsarSEO
          </h2>

          <h2 className="text-3xl md:text-4xl font-sans font-bold mb-4">
            با TsarSEO پادشاه رشد آنلاین شوید
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            ابزارهای حرفه‌ای ما به شما کمک می‌کنند تا با تحلیل‌های دقیق و ترافیک واقعی، در دنیای دیجیتال بدرخشید.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 font-kalameh gap-4 w-full">
          {benefitList.map(({ icon, title, description }, index) => (
            <Card
              key={title}
              className="bg-muted/50 dark:bg-card hover:bg-background transition-all delay-75 group/number"
            >
              <CardHeader>
                <div className="flex justify-between">
                  <Icon
                    name={icon}
                    size={32}
                    color="hsl(var(--primary))"
                    className="mb-6 text-primary"
                  />
                  <span className="text-5xl text-muted-foreground/15 font-sans font-medium transition-all delay-75 group-hover/number:text-muted-foreground/30">
                    {index + 1}
                  </span>
                </div>

                <CardTitle>{title}</CardTitle>
              </CardHeader>

              <CardContent className="text-muted-foreground">
                {description}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};