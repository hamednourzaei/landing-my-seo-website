"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Icon, { IconName } from "@/components/ui/icon"; // ایمپورت IconName
import { motion } from "framer-motion";

interface BenefitsProps {
  icon: IconName; // استفاده از IconName به‌جای keyof typeof import("lucide-react").icons
  title: string;
  description: string;
}

const benefitList: BenefitsProps[] = [
  {
    icon: "BarChart2",
    title: "تحلیل رقابتی سئو",
    description: "دسترسی به گزارش‌هایی که نقاط ضعف و قوت رقبا را به‌خوبی نشان می‌دهد.",
  },
  {
    icon: "Users",
    title: "افزایش بازدید سایت",
    description: "استراتژی‌های بهینه‌سازی برای جذب مخاطبان واقعی و افزایش فروش.",
  },
  {
    icon: "Gauge",
    title: "ترافیک‌سازی از شبکه‌های اجتماعی",
    description: "به سادگی کمپین‌های سئوی خود را با تیم حرفه‌ای و قدرتمند ما مدیریت کنید",
  },
  {
    icon: "ShieldCheck",
    title: "اعتمادسازی حرفه‌ای",
    description: "با زیرساخت‌های امن و پشتیبانی شبانه‌روزی، اعتماد کاربران را جلب کنید.",
  },
];

export const BenefitsSection: React.FC = () => {
  return (
    <section
      dir="rtl"
      id="benefits"
      className="container font-kalameh font-extrabold py-12 sm:py-24 md:py-32"
    >
      <hr className="border-secondary mb-8" />
      <div className="grid lg:grid-cols-2 gap-8 lg:gap-24 place-items-center">
        <div className="max-w-lg">
          <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl font-semibold text-center text-primary mb-3 tracking-wide">
            مزایای TsarSEO
          </h2>
          <h3 className="text-sm sm:text-sm md:text-xl lg:text-2xl font-extralight text-center mb-4">
            با TsarSEO پادشاه رشد آنلاین شوید
          </h3>
          <p className="text-base sm:text-lg font-extralight text-muted-foreground text-center mb-8">
            ابزارهای حرفه‌ای ما به شما کمک می‌کنند تا با تحلیل‌های دقیق و ترافیک واقعی، در دنیای دیجیتال بدرخشید.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-4xl">
          {benefitList.map(({ icon, title, description }, index) => (
            <motion.div
              key={index}
              className="relative rounded-lg overflow-hidden"
              initial={{ borderColor: "rgba(255, 108, 0, 0.3)" }}
              whileHover={{
                borderColor: "rgba(255, 108, 0, 0.7)",
                boxShadow: "0 0 35px rgba(255, 108, 0, 0.5)",
                transition: { duration: 0.5, ease: "easeInOut" },
              }}
            >
              <Card
                className="bg-muted/50 dark:bg-card hover:bg-background transition-all duration-200 group/number rounded-lg shadow-sm hover:shadow-md border-[#2b2b2b] dark:border-[#af4c00]"
              >
                <CardHeader className="pb-2">
                  <div className="flex justify-between">
                    <Icon
                      name={icon}
                      size={32}
                      color="hsl(var(--primary))"
                      className="mb-6 text-primary"
                    />
                    <span className="text-3xl text-muted-foreground/30 font-sans font-medium transition-all duration-200 group-hover/number:text-muted-foreground/50">
                      {index + 1}
                    </span>
                  </div>
                  <CardTitle className="text-base font-light sm:text-lg md:text-xl">
                    {title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground font-thin text-sm sm:text-base md:text-lg">
                  {description}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
