"use client";
import Head from "next/head";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function About() {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    // اگر می‌خوای بر اساس سیستم کاربر تنظیم کنی، اینجا اضافه کن
  }, []);

  // رنگ‌ها و کلاس‌ها
  const primaryColor = isDark ? "text-orange-800" : "text-orange-800";
  const cardBg = isDark
    ? "bg-gradient-to-tr from-card via-card to-gray-900/90 backdrop-blur-md shadow-lg"
    : "bg-gradient-to-r from-orange-50 via-white to-orange-100 shadow-xl";
  const sectionBg = isDark
    ? "bg-gradient-to-br from-gray-800/90 via-gray-900/70 to-gray-800/80 backdrop-blur-sm shadow-md"
    : "bg-gradient-to-br from-orange-100/80 via-white to-orange-200/90 shadow-md";
  const buttonBg = isDark
    ? "bg-orange-600 hover:bg-orange-700 shadow-md"
    : "bg-orange-800 hover:bg-orange-900 shadow-lg";

  return (
    <>
      <Head>
        <title>درباره TsarSEO | خدمات سئو ساده و موثر</title>
        <meta
          name="description"
          content="با TsarSEO آشنا شوید؛ پلتفرمی برای افزایش ترافیک واقعی و بهبود رتبه سایت در گوگل با ابزارهای ساده و قدرتمند. امروز شروع کنید!"
        />
        <meta
          name="keywords"
          content="سئو, بهینه‌سازی سایت, افزایش ترافیک, رتبه‌بندی گوگل, TsarSEO"
        />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <style>
        {`
  @keyframes epicBallExplosion {
    0% {
      transform: translateY(-100vh) rotate(-45deg) scale(1.8) skew(15deg, 15deg);
      opacity: 0;
      filter: blur(15px) drop-shadow(0 0 25px rgba(255, 50, 50, 0.9));
    }
    30% {
      transform: translateY(0) rotate(20deg) scale(1.1) skew(0deg, 0deg);
      opacity: 1;
      filter: blur(0) drop-shadow(0 0 40px rgba(255, 200, 0, 1));
    }
    45% {
      transform: translateY(-60px) rotate(-15deg) scaleY(1.15) scaleX(0.9);
      filter: drop-shadow(0 0 50px rgba(0, 255, 150, 0.8));
    }
    60% {
      transform: translateY(40px) rotate(10deg) scaleY(0.95) scaleX(1.1);
      filter: drop-shadow(0 0 35px rgba(255, 255, 50, 0.9));
    }
    75% {
      transform: translateY(-25px) rotate(-8deg) scale(1.05);
      filter: drop-shadow(0 0 45px rgba(150, 50, 255, 1));
    }
    90% {
      transform: translateY(15px) rotate(3deg) scale(1.02);
      filter: drop-shadow(0 0 30px rgba(255, 255, 255, 0.95));
    }
    100% {
      transform: translateY(0) rotate(0deg) scale(1);
      opacity: 1;
      filter: none;
    }
  }

  .animate-ballDrop {
    animation: epicBallExplosion 3.2s cubic-bezier(0.7, -0.5, 0.3, 1.8) forwards;
  }

  @keyframes gradientShift {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }

  .bg-gradient-animated {
    background-size: 200% 200%;
    animation: gradientShift 8s ease infinite;
  }

  .box-shadow-pencil {
    box-shadow:
      3px 3px 8px rgba(124, 45, 18, 0.5),
      6px 6px 15px rgba(255, 110, 0, 0.3),
      inset 0 0 8px rgba(255, 100, 0, 0.15);
  }
`}
      </style>

      <main
        dir="rtl"
        className={`max-w-4xl  mx-auto py-6  px-6 my-20 min-h-screen rounded-xl ${cardBg} text-${
          isDark ? "white" : "gray-900"
        } box-shadow-pencil `}
      >
        {/* لوگو با انیمیشن توپ */}
        <div className="flex justify-center mb-12">
          <div className="overflow-hidden rounded-full w-32 h-32 animate-ballDrop shadow-2xl">
            <Image
              width={128}
              height={128}
              src="/icons/Logo.png"
              alt="لوگوی TsarSEO"
              className="object-cover rounded-full"
              loading="lazy"
            />
          </div>
        </div>

        {/* سکشن درباره */}
        <section
          className={`${sectionBg} p-8 rounded-2xl mb-10 bg-gradient-animated`}
        >
          <h1
            className={`text-center text-4xl font-extrabold mb-5 ${primaryColor} drop-shadow-lg`}
          >
            درباره{" "}
            <span className={isDark ? "text-white" : "text-orange-900"}>
              TsarSEO
            </span>
          </h1>
          <p className="text-lg leading-relaxed max-w-3xl mx-auto">
            پلتفرم تخصصی ما در زمینه{" "}
            <span className={`font-semibold ${primaryColor} drop-shadow-md`}>
              بهینه‌سازی موتورهای جستجو
            </span>{" "}
            به کسب‌وکارها کمک می‌کند تا با ابزارهای ساده و قدرتمند، ترافیک واقعی
            سایت خود را افزایش دهند.
          </p>
        </section>

        {/* ماموریت و داستان */}
        <div className="grid md:grid-cols-2 gap-10 mb-10">
          <section
            className={`${sectionBg} p-6 rounded-xl shadow-lg border border-transparent hover:border-orange-400 transition-all duration-300`}
          >
            <h2
              className={`text-center text-3xl font-semibold mb-4 border-b pb-2 border-orange-900 ${primaryColor}`}
            >
              ماموریت ما
            </h2>
            <p className="text-base leading-relaxed">
              ما معتقدیم{" "}
              <span className={`font-semibold ${primaryColor}`}>سئو</span> نباید
              پیچیده باشد. ماموریت ما ارائه راه‌حل‌های ساده و موثر برای دیده شدن
              در نتایج جستجو است.
            </p>
          </section>

          <section
            className={`${sectionBg} p-6 rounded-xl shadow-lg border border-transparent hover:border-orange-400 transition-all duration-300`}
          >
            <h2
              className={`text-center text-3xl font-semibold mb-4 border-b pb-2 border-orange-900 ${primaryColor}`}
            >
              داستان ما
            </h2>
            <p className="text-base leading-relaxed">
              تاسیس شده در 2025 توسط متخصصان سئو که از پیچیدگی‌های فرآیندهای
              سنتی خسته شده بودند و راه‌حلی ساده برای{" "}
              <span className={`font-semibold ${primaryColor}`}>
                افزایش رتبه گوگل
              </span>{" "}
              ایجاد کردند.
            </p>
          </section>
        </div>

        {/* چرا TsarSEO*/}
        <section
          className={`${sectionBg} p-8 rounded-2xl shadow-xl mb-12 border border-orange-900`}
        >
          <h2
            className={`text-center text-3xl font-bold mb-8  ${primaryColor} drop-shadow-md`}
          >
            چرا TsarSEO
          </h2>
          <ul className="space-y-6">
            {[
              {
                title: "سادگی",
                desc: "بدون نیاز به دانش تخصصی، با چند کلیک فرآیند بهینه‌سازی را شروع کنید.",
              },
              {
                title: "نتایج پایدار",
                desc: "با تکنیک‌های سئوی کلاه سفید، نتایج بلندمدت تضمین می‌شود.",
              },
              {
                title: "پشتیبانی قوی",
                desc: "تیم ما همیشه در کنار شماست تا شما را در مسیر موفقیت هدایت کند.",
              },
            ].map(({ title, desc }, i) => (
              <li key={i} className="flex items-start gap-4">
                <div
                  className={`bg-orange-200 p-3 rounded-full flex-shrink-0 shadow-md`}
                >
                  <svg
                    className={`w-6 h-6 ${primaryColor}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <div>
                  <h3
                    className={`font-semibold text-xl mb-1 ${primaryColor} drop-shadow-sm`}
                  >
                    {title}
                  </h3>
                  <p className="text-sm leading-relaxed">{desc}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* شروع کنید */}
        <section
          className={`${
            isDark
              ? "bg-gradient-to-tr  from-gray-800 to-card text-gray-600"
              : "bg-gradient-to-tr from-orange-200 to-orange-300 text-orange-900"
          } p-8 rounded-3xl shadow-2xl text-center border border-orange-900`}
        >
          <h2
            className={`text-center text-3xl font-extrabold mb-6 ${primaryColor} drop-shadow-md`}
          >
            آماده‌اید شروع کنید؟
          </h2>
          <p className="text-lg mb-8 max-w-3xl mx-auto">
            با TsarSEO، آینده دیجیتال کسب‌وکار خود را بسازید. همین امروز به ما
            بپیوندید و قدرت{" "}
            <span className={`font-semibold ${primaryColor}`}>
              سئوی ساده و موثر
            </span>{" "}
            را تجربه کنید!
          </p>
          <Link href="/" passHref>
            <Button
              className={`${buttonBg} text-white font-bold py-4 px-10 rounded-xl transition-all duration-300 shadow-lg hover:shadow-2xl`}
            >
              شروع کنید
            </Button>
          </Link>
        </section>
      </main>
    </>
  );
}
