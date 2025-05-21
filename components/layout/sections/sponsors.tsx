"use client";

import { Icon } from "@/components/ui/icon";
import { Marquee } from "@devnomic/marquee";
import "@devnomic/marquee/dist/index.css";
import { icons } from "lucide-react";

interface FeatureProps {
  icon: string;
  name: string;
}

const features: FeatureProps[] = [
  {
    icon: "BarChart2",
    name: "گزارش‌های پیشرفته سئو",
  },
  {
    icon: "Users",
    name: "ترافیک واقعی انسانی",
  },
  {
    icon: "Gauge",
    name: "داشبورد کاربرپسند",
  },
  {
    icon: "Zap",
    name: "تحلیل سریع و دقیق",
  },
  {
    icon: "ShieldCheck",
    name: "امنیت داده‌ها",
  },
  {
    icon: "Globe",
    name: "پشتیبانی چندزبانه",
  },
  {
    icon: "Trophy",
    name: "بهبود رتبه گوگل",
  },
];

export const SponsorsSection = () => {
  return (
    <section id="features" className="max-w-[75%] mx-auto pb-24 sm:pb-32">
  
      <h1 className="text-lg md:text-xl text-center mb-6">
                چرا باید {' '}
              <span className="inline-block text-transparent mt- bg-gradient-to-r from-[#D247BF] to-primary bg-clip-text">
                TsarSEO
              </span>{' '}
              را انتخاب کنید؟
            </h1>

      <div className="mx-auto">
        <Marquee
          className="gap-[3rem]"
          fade
          innerClassName="gap-[3rem]"
          pauseOnHover
        >
          {features.map(({ icon, name }) => (
            <div
              key={name}
              className="flex items-center text-xl md:text-2xl font-sans font-medium"
            >
              <Icon
                name={icon as keyof typeof icons}
                size={32}
                color="white"
                className="mr-2"
              />
              {name}
            </div>
          ))}
        </Marquee>
      </div>
    </section>
  );
};