// بدون "use client"

import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";
import { StatsCardsClient } from "./StatsCardsClient";

export const HeroSection = async () => {
  const res = await fetch(
    "https://hamednourzaei.github.io/api-detail/data/stats.json",
    {
      next: { revalidate: 60 }, // ISR: هر 60 ثانیه بازسازی می‌شود
    }
  );

  const stats = await res.json();

  return (
    <section className="container font-kalameh font-semibold w-full mx-auto">
      <div className="grid place-items-center lg:max-w-screen-xl gap-8 mx-auto py-20 md:py-32">
        <div className="text-center space-y-8">
          <Badge variant="outline" className="text-sm py-2">
            <span className="mr-2 text-primary">
              <Badge>New</Badge>
            </span>
            <span className="font-extrabold">
              سرویس حرفه‌ای برای رشد آنلاین
            </span>
          </Badge>
          <div className="text-4xl md:text-6xl font-extrabold leading-tight">
            <h1>
              بازدید واقعی + تحلیل سئوی حرفه‌ای{" "}
              <span className="inline-block text-transparent bg-gradient-to-r from-[#D247BF] to-primary bg-clip-text mt-5 border-b-2 border-b-[#af4c00]">
                فقط با یک کلیک
              </span>
            </h1>
          </div>
          <p className="max-w-screen-sm mx-auto text-lg md:text-xl text-muted-foreground text-right font-extrabold">
            تحلیل دقیق سئو برای متخصص‌ها و بازدید واقعی برای سایت‌هایی که
            می‌خوان در گوگل دیده شن.
          </p>

          <div className="text-center mt-8">
            <Link
              href="#contact"
              className="inline-flex items-center justify-center px-6 py-3 text-lg font-extrabold bg-gradient-to-r from-[#D247BF] to-primary text-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300"
            >
              ببین سایتت برای سئو چقدر آمادست
              <ArrowRight className="ml-2 size-5" />
            </Link>
          </div>
        </div>

        <Suspense fallback={<p>در حال بارگذاری آمار...</p>}>
          <StatsCardsClient stats={stats} />
        </Suspense>
      </div>
    </section>
  );
};
