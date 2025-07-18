"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Icon, { IconName } from "@/components/ui/icon";
import { motion } from "framer-motion";

interface BenefitsProps {
  icon: IconName;
  title: string;
  description: string;
}

const benefitList: BenefitsProps[] = [
  {
    icon: "BarChart2",
    title: "تحلیل رقابتی سئو",
    description: "گزارش‌های دقیق نقاط ضعف و قوت رقبا.",
  },
  {
    icon: "Users",
    title: "افزایش بازدید سایت",
    description: "استراتژی‌های بهینه برای جذب مخاطب.",
  },
  {
    icon: "Gauge",
    title: "ترافیک از شبکه‌های اجتماعی",
    description: "مدیریت کمپین‌های سئو با تیم حرفه‌ای.",
  },
  {
    icon: "ShieldCheck",
    title: "اعتمادسازی حرفه‌ای",
    description: "زیرساخت امن با پشتیبانی 24/7.",
  },
];

export const BenefitsSection: React.FC = () => {
  return (
    <section
      dir="rtl"
      id="benefits"
      className="container font-kalameh font-extrabold py-12 sm:py-16 md:py-20"
    >
      <hr className="border-gray-700 mb-6" />
      <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 place-items-center">
        <div className="max-w-md text-center">
          <h2 className="text-sm sm:text-base md:text-4xl font-kalameh text-orange-600 mb-2">
            مزایای TsarSEO
          </h2>
          <h3 className="text-lg sm:text-sm md:text-lg font-light text-gray-300 mb-3">
            با TsarSEO پادشاه رشد آنلاین شوید
          </h3>
          <p className="text-lg sm:text-sm font-light text-gray-400 mb-6">
            ابزارهای حرفه‌ای ما با تحلیل دقیق و ترافیک واقعی، شما را برجسته می‌کند.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-4xl">
          {benefitList.map(({ icon, title, description }, index) => (
            <motion.div
              key={index}
              className="relative rounded-lg overflow-hidden"
              initial={{ borderColor: "rgba(175, 76, 0, 0.2)" }}
              whileHover={{
                borderColor: "rgba(175, 76, 0, 0.5)",
                boxShadow: "0 0 20px rgba(175, 76, 0, 0.3)",
                transition: { duration: 0.3, ease: "easeOut" },
              }}
            >
              <Card className="bg-card dark:bg-card border border-gray-800 hover:border-orange-700 transition-all duration-200 rounded-lg shadow-sm hover:shadow-md">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center">
                    <Icon
                      name={icon}
                      size={24}
                      color="#af4c00"
                      className="text-orange-600"
                    />
                    <span className="text-lg text-gray-500 font-bold transition-all duration-200 hover:text-gray-400">
                      {index + 1}
                    </span>
                  </div>
                  <CardTitle className="text-sm sm:text-base font-medium text-gray-200">
                    {title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-gray-400 font-normal text-xs sm:text-sm">
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
