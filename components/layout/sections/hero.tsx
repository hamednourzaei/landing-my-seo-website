import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton"; // وارد کردن Skeleton
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";
import { StatsCardsClient } from "./StatsCardsClient";

// داده‌های پیش‌فرض
const fallbackStats = [
  {
    title: "تعداد بازدید وب‌سایت‌ها",
    value: 1089570,
    growth: 10,
    chartData: [
      { day: "شنبه", visits: 142380 },
      { day: "یک‌شنبه", visits: 155230 },
      { day: "دوشنبه", visits: 137510 },
      { day: "سه‌شنبه", visits: 145620 },
      { day: "چهارشنبه", visits: 152980 },
      { day: "پنج‌شنبه", visits: 166310 },
      { day: "جمعه", visits: 134540 },
    ],
  },
  {
    title: "تعداد کاربران جدید",
    value: 223,
    growth: 5,
    chartData: [
      { day: "شنبه", visits: 28 },
      { day: "یک‌شنبه", visits: 25 },
      { day: "دوشنبه", visits: 30 },
      { day: "سه‌شنبه", visits: 29 },
      { day: "چهارشنبه", visits: 32 },
      { day: "پنج‌شنبه", visits: 34 },
      { day: "جمعه", visits: 45 },
    ],
  },
  {
    title: "وب‌سایت‌های زیرمجموعه",
    value: 405,
    growth: 3,
    chartData: [
      { day: "شنبه", visits: 48 },
      { day: "یک‌شنبه", visits: 55 },
      { day: "دوشنبه", visits: 63 },
      { day: "سه‌شنبه", visits: 57 },
      { day: "چهارشنبه", visits: 61 },
      { day: "پنج‌شنبه", visits: 64 },
      { day: "جمعه", visits: 57 },
    ],
  },
  {
    title: "سرورهای فعال",
    value: 1623,
    growth: 2,
    chartData: [
      { day: "شنبه", visits: 230 },
      { day: "یک‌شنبه", visits: 241 },
      { day: "دوشنبه", visits: 237 },
      { day: "سه‌شنبه", visits: 229 },
      { day: "چهارشنبه", visits: 245 },
      { day: "پنج‌شنبه", visits: 222 },
      { day: "جمعه", visits: 219 },
    ],
  },
  {
    title: "تحلیل‌های امروز",
    value: 117,
    growth: 4,
    chartData: [
      { day: "شنبه", visits: 15 },
      { day: "یک‌شنبه", visits: 16 },
      { day: "دوشنبه", visits: 17 },
      { day: "سه‌شنبه", visits: 17 },
      { day: "چهارشنبه", visits: 18 },
      { day: "پنج‌شنبه", visits: 17 },
      { day: "جمعه", visits: 17 },
    ],
  },
  {
    title: "قطع همکاری‌های هفته اخیر",
    value: 131,
    growth: -9,
    chartData: [
      { day: "شنبه", visits: 17 },
      { day: "یک‌شنبه", visits: 20 },
      { day: "دوشنبه", visits: 19 },
      { day: "سه‌شنبه", visits: 21 },
      { day: "چهارشنبه", visits: 18 },
      { day: "پنج‌شنبه", visits: 17 },
      { day: "جمعه", visits: 19 },
    ],
  },
];

// کامپوننت Skeleton برای کارت‌های آماری
const StatsCardsSkeleton = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
      {[...Array(6)].map((_, index) => (
        <div
          key={index}
          className="p-4 border rounded-lg shadow-sm bg-background"
        >
          <Skeleton className="h-6 w-3/4 mb-2" /> {/* Placeholder برای عنوان */}
          <Skeleton className="h-8 w-1/2 mb-4" /> {/* Placeholder برای مقدار */}
          <Skeleton className="h-32 w-full" /> {/* Placeholder برای نمودار */}
        </div>
      ))}
    </div>
  );
};

export const HeroSection = async () => {
  try {
    const res = await fetch(
      
      "https://hamednourzaei.github.io/api-detail/data/stats.json",
      {
        next: { revalidate: 3600 },
      }
      
    );

    if (!res.ok) {
      console.error(`خطای HTTP: ${res.status} ${res.statusText}`);
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
              <p className="max-w-screen-sm mx-auto text-lg lg:text-lg md:text-xl text-muted-foreground text-right font-extrabold">
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
            <Suspense fallback={<StatsCardsSkeleton />}>
              <StatsCardsClient stats={fallbackStats} />
            </Suspense>
          </div>
        </section>
      );
    }

    const text = await res.text();
    let stats;
    try {
      stats = JSON.parse(text);
    } catch (error: unknown) {
      let errorMessage = "خطای ناشناخته";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      console.error("خطای تجزیه JSON:", errorMessage);
      stats = fallbackStats;
    }

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
            <p className="max-w-screen-sm mx-auto text-lg lg:text-lg md:text-xl text-muted-foreground text-right font-extrabold">
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
          <Suspense fallback={<StatsCardsSkeleton />}>
            <StatsCardsClient stats={stats} />
          </Suspense>
        </div>
      </section>
    );
  } catch (error: unknown) {
    let errorMessage = "خطای ناشناخته";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    console.error("خطا در HeroSection:", errorMessage);
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
            <p className="max-w-screen-sm mx-auto text-lg lg:text-lg md:text-xl text-muted-foreground text-right font-extrabold">
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
          <Suspense fallback={<StatsCardsSkeleton />}>
            <StatsCardsClient stats={fallbackStats} />
          </Suspense>
        </div>
      </section>
    );
  }
};