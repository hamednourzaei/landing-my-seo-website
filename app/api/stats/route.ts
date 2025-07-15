// app/api/stats/route.ts
import { NextResponse } from "next/server";

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

export async function GET() {
  try {
    const res = await fetch(
      "https://hamednourzaei.github.io/api-landing/data/stats.json",
      {
        next: { revalidate: 60 }, // کش برای 1 ساعت
      }
    );
    const text = await res.text();
    try {
      const data = JSON.parse(text);
      return NextResponse.json(data);
    } catch (error) {
      console.error("خطای تجزیه JSON:", error);
      return NextResponse.json(fallbackStats);
    }
  } catch (error) {
    console.error("خطا در دریافت داده‌ها:", error);
    return NextResponse.json(fallbackStats);
  }
}
