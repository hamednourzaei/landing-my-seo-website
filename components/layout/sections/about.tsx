
"use client";
import Head from "next/head";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useState, useMemo } from "react";

export default function About() {
  const [isDark, setIsDark] = useState(true);
  const [language, setLanguage] = useState<"fa" | "en">("fa");

  // محتوای دوزبانه
  const content = {
    fa: {
      head: {
        title: "درباره TsarSEO | خدمات سئو ساده و موثر",
        description:
          "با TsarSEO آشنا شوید؛ پلتفرمی برای افزایش ترافیک واقعی و بهبود رتبه سایت در گوگل با ابزارهای ساده و قدرتمند. امروز شروع کنید!",
        keywords: "سئو, بهینه‌سازی سایت, افزایش ترافیک, رتبه‌بندی گوگل, TsarSEO",
      },
      about: {
        header: "درباره TsarSEO",
        text: "پلتفرم تخصصی ما در زمینه <span class='font-semibold text-orange-800 drop-shadow-md'>بهینه‌سازی موتورهای جستجو</span> به کسب‌وکارها کمک می‌کند تا با ابزارهای ساده و قدرتمند، ترافیک واقعی سایت خود را افزایش دهند.",
      },
      mission: {
        title: "ماموریت ما",
        text: "ما معتقدیم <span class='font-semibold text-orange-800'>سئو</span> نباید پیچیده باشد. ماموریت ما ارائه راه‌حل‌های ساده و موثر برای دیده شدن در نتایج جستجو است.",
      },
      story: {
        title: "داستان ما",
        text: "تاسیس شده در 2025 توسط متخصصان سئو که از پیچیدگی‌های فرآیندهای سنتی خسته شده بودند و راه‌حلی ساده برای <span class='font-semibold text-orange-800'>افزایش رتبه گوگل</span> ایجاد کردند.",
      },
      whyTsarSEO: {
        title: "چرا TsarSEO",
        items: [
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
        ],
      },
      cta: {
        title: "آماده‌اید شروع کنید؟",
        text: "با TsarSEO، آینده دیجیتال کسب‌وکار خود را بسازید. همین امروز به ما بپیوندید و قدرت <span class='font-semibold text-orange-800'>سئوی ساده و موثر</span> را تجربه کنید!",
        button: "شروع کنید",
      },
      language: {
        switchToEnglish: "تغییر به انگلیسی",
        switchToFarsi: "تغییر به فارسی",
      },
      logoAlt: {
        fa: "لوگوی TsarSEO",
        en: "TsarSEO Logo",
      },
    },
    en: {
      head: {
        title: "About TsarSEO | Simple and Effective SEO Services",
        description:
          "Discover TsarSEO, a platform for boosting real traffic and improving Google rankings with simple, powerful tools. Start today!",
        keywords: "SEO, website optimization, increase traffic, Google ranking, TsarSEO",
      },
      about: {
        header: "About TsarSEO",
        text: "Our specialized platform in <span class='font-semibold text-orange-800 drop-shadow-md'>search engine optimization</span> helps businesses increase real website traffic with simple and powerful tools.",
      },
      mission: {
        title: "Our Mission",
        text: "We believe <span class='font-semibold text-orange-800'>SEO</span> shouldn’t be complicated. Our mission is to provide simple and effective solutions for visibility in search results.",
      },
      story: {
        title: "Our Story",
        text: "Founded in 2025 by SEO experts frustrated with complex traditional processes, we created a simple solution for <span class='font-semibold text-orange-800'>boosting Google rankings</span>.",
      },
      whyTsarSEO: {
        title: "Why TsarSEO",
        items: [
          {
            title: "Simplicity",
            desc: "Start the optimization process with a few clicks, no expertise required.",
          },
          {
            title: "Sustainable Results",
            desc: "With white-hat SEO techniques, long-term results are guaranteed.",
          },
          {
            title: "Strong Support",
            desc: "Our team is always by your side to guide you toward success.",
          },
        ],
      },
      cta: {
        title: "Ready to Get Started?",
        text: "With TsarSEO, build your business’s digital future. Join us today and experience the power of <span class='font-semibold text-orange-800'>simple and effective SEO</span>!",
        button: "Get Started",
      },
      language: {
        switchToEnglish: "Switch to English",
        switchToFarsi: "Switch to Farsi",
      },
      logoAlt: {
        fa: "لوگوی TsarSEO",
        en: "TsarSEO Logo",
      },
    },
  };

  const currentContent = content[language];

  // رنگ‌ها و کلاس‌ها
  const themeStyles = useMemo(
    () => ({
      primaryColor: isDark ? "text-orange-800" : "text-orange-800",
      cardBg: isDark
        ? "bg-gradient-to-tr from-card via-card to-gray-900/90 backdrop-blur-md shadow-lg"
        : "bg-gradient-to-r from-orange-50 via-white to-orange-100 shadow-xl",
      sectionBg: isDark
        ? "bg-gradient-to-br from-gray-800/90 via-gray-900/70 to-gray-800/80 backdrop-blur-sm shadow-md"
        : "bg-gradient-to-br from-orange-100/80 via-white to-orange-200/90 shadow-md",
      buttonBg: isDark
        ? "bg-orange-600 hover:bg-orange-700 shadow-md"
        : "bg-orange-800 hover:bg-orange-900 shadow-lg",
    }),
    [isDark]
  );

  return (
    <>
      <Head>
        <title>{currentContent.head.title}</title>
        <meta name="description" content={currentContent.head.description} />
        <meta name="keywords" content={currentContent.head.keywords} />
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
        dir={language === "fa" ? "rtl" : "ltr"}
        className={`max-w-5xl mx-auto py-4 sm:py-6 md:py-8 lg:py-10 px-4 sm:px-6 md:px-8 my-10 sm:my-12 md:my-16 lg:my-20 min-h-screen rounded-xl ${themeStyles.cardBg} text-${
          isDark ? "white" : "gray-900"
        } box-shadow-pencil`}
      >
        {/* دکمه‌های تغییر زبان */}
        <div className="flex justify-end gap-2 sm:gap-3 mb-4 sm:mb-6">
          <Button
            onClick={() => setLanguage("fa")}
            className={`px-3 sm:px-4 md:px-5 py-1 sm:py-2 rounded-lg text-xs sm:text-sm md:text-base lg:text-lg font-semibold ${
              language === "fa"
                ? "bg-orange-800 text-white"
                : "bg-orange-600 text-white hover:bg-orange-700"
            }`}
            aria-label="Switch to Farsi"
          >
            فارسی
          </Button>
          <Button
            onClick={() => setLanguage("en")}
            className={`px-3 sm:px-4 md:px-5 py-1 sm:py-2 rounded-lg text-xs sm:text-sm md:text-base lg:text-lg font-semibold ${
              language === "en"
                ? "bg-orange-800 text-white"
                : "bg-orange-600 text-white hover:bg-orange-700"
            }`}
            aria-label="Switch to English"
          >
            English
          </Button>
        </div>

        {/* لوگو با انیمیشن توپ */}
        <div className="flex justify-center mb-8 sm:mb-10 md:mb-12">
          <div className="overflow-hidden rounded-full w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 lg:w-36 lg:h-36 animate-ballDrop shadow-2xl">
            <Image
              width={144}
              height={144}
              src="/icons/Logo.png"
              alt={currentContent.logoAlt[language]}
              className="object-cover rounded-full"
              loading="lazy"
            />
          </div>
        </div>

        {/* بخش درباره */}
        <section
          className={`${themeStyles.sectionBg} p-4 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl mb-6 sm:mb-8 md:mb-10 bg-gradient-animated`}
        >
          <h1
            className={`text-center text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold mb-3 sm:mb-4 md:mb-5 ${themeStyles.primaryColor} drop-shadow-lg`}
          >
            {currentContent.about.header}{" "}
            <span className={isDark ? "text-white" : "text-orange-900"}>
              TsarSEO
            </span>
          </h1>
          <p
            className="text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed max-w-3xl mx-auto"
            dangerouslySetInnerHTML={{ __html: currentContent.about.text }}
          />
        </section>

        {/* ماموریت و داستان */}
        <div className="grid md:grid-cols-2 gap-4 sm:gap-6 md:gap-8 lg:gap-10 mb-6 sm:mb-8 md:mb-10">
          <section
            className={`${themeStyles.sectionBg} p-4 sm:p-5 md:p-6 rounded-lg sm:rounded-xl shadow-lg border border-transparent hover:border-orange-400 transition-all duration-300`}
          >
            <h2
              className={`text-center text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold mb-3 sm:mb-4 border-b pb-2 border-orange-900 ${themeStyles.primaryColor}`}
            >
              {currentContent.mission.title}
            </h2>
            <p
              className="text-xs sm:text-sm md:text-base lg:text-lg leading-relaxed"
              dangerouslySetInnerHTML={{ __html: currentContent.mission.text }}
            />
          </section>

          <section
            className={`${themeStyles.sectionBg} p-4 sm:p-5 md:p-6 rounded-lg sm:rounded-xl shadow-lg border border-transparent hover:border-orange-400 transition-all duration-300`}
          >
            <h2
              className={`text-center text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold mb-3 sm:mb-4 border-b pb-2 border-orange-900 ${themeStyles.primaryColor}`}
            >
              {currentContent.story.title}
            </h2>
            <p
              className="text-xs sm:text-sm md:text-base lg:text-lg leading-relaxed"
              dangerouslySetInnerHTML={{ __html: currentContent.story.text }}
            />
          </section>
        </div>

        {/* چرا TsarSEO */}
        <section
          className={`${themeStyles.sectionBg} p-4 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl shadow-xl mb-6 sm:mb-8 md:mb-10 lg:mb-12 border border-orange-900`}
        >
          <h2
            className={`text-center text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold mb-4 sm:mb-6 md:mb-8 ${themeStyles.primaryColor} drop-shadow-md`}
          >
            {currentContent.whyTsarSEO.title}
          </h2>
          <ul className="space-y-4 sm:space-y-5 md:space-y-6">
            {currentContent.whyTsarSEO.items.map(({ title, desc }, i) => (
              <li key={i} className="flex items-start gap-3 sm:gap-4">
                <div
                  className={`bg-orange-200 p-2 sm:p-3 rounded-full flex-shrink-0 shadow-md`}
                >
                  <svg
                    className={`w-4 sm:w-5 md:w-6 lg:w-6 h-4 sm:h-5 md:h-6 lg:h-6 ${themeStyles.primaryColor}`}
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
                    className={`font-semibold text-base sm:text-lg md:text-xl lg:text-2xl mb-1 ${themeStyles.primaryColor} drop-shadow-sm`}
                  >
                    {title}
                  </h3>
                  <p className="text-xs sm:text-sm md:text-base lg:text-lg leading-relaxed">
                    {desc}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* شروع کنید */}
        <section
          className={`${
            isDark
              ? "bg-gradient-to-tr from-gray-800 to-card text-gray-600"
              : "bg-gradient-to-tr from-orange-200 to-orange-300 text-orange-900"
          } p-4 sm:p-6 md:p-8 rounded-xl sm:rounded-3xl shadow-2xl text-center border border-orange-900`}
        >
          <h2
            className={`text-center text-lg sm:text-xl md:text-2xl lg:text-3xl font-extrabold mb-4 sm:mb-5 md:mb-6 ${themeStyles.primaryColor} drop-shadow-md`}
          >
            {currentContent.cta.title}
          </h2>
          <p
            className="text-sm sm:text-base md:text-lg lg:text-xl mb-4 sm:mb-6 md:mb-8 max-w-3xl mx-auto"
            dangerouslySetInnerHTML={{ __html: currentContent.cta.text }}
          />
          <Link href="/" passHref>
            <Button
              className={`${themeStyles.buttonBg} text-white font-bold py-2 sm:py-3 md:py-4 px-6 sm:px-8 md:px-10 rounded-lg sm:rounded-xl transition-all duration-300 shadow-lg hover:shadow-2xl text-sm sm:text-base md:text-lg lg:text-xl`}
            >
              {currentContent.cta.button}
            </Button>
          </Link>
        </section>
      </main>
    </>
  );
}
