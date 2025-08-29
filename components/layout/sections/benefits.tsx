"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Icon, { IconName } from "@/components/ui/icon";
import { motion } from "framer-motion";
import Head from "next/head";

interface BenefitsProps {
  icon: IconName;
  title: string;
  description: string;
}

const benefitList: BenefitsProps[] = [
  {
    icon: "BarChart2",
    title: "تحلیل رقابتی سئو",
    description: "گزارش‌های دقیق نقاط ضعف و قوت رقبا برای بهبود استراتژی سئو.",
  },
  {
    icon: "Users",
    title: "افزایش بازدید سایت",
    description: "استراتژی‌های بهینه برای جذب مخاطبان هدفمند و واقعی.",
  },
  {
    icon: "Gauge",
    title: "ترافیک از شبکه‌های اجتماعی",
    description: "مدیریت کمپین‌های سئو با تیم حرفه‌ای برای نتایج بهتر.",
  },
  {
    icon: "ShieldCheck",
    title: "اعتمادسازی حرفه‌ای",
    description: "زیرساخت امن با پشتیبانی 24/7 برای اطمینان کاربران.",
  },
];

export const BenefitsSection: React.FC = () => {
  return (
    <>
      <Head>
        <title>مزایای TsarSEO - ابزارهای حرفه‌ای سئو و افزایش بازدید</title>
        <meta
          name="description"
          content="مزایای TsarSEO شامل تحلیل رقابتی سئو، افزایش بازدید سایت، ترافیک شبکه‌های اجتماعی، پشتیبانی امن 24/7 و استراتژی‌های متنوع لینک‌سازی برای رشد آنلاین شما."
        />
        <meta
          name="keywords"
          content="TsarSEO, مزایای سئو, تحلیل رقابتی, افزایش بازدید, ترافیک شبکه‌های اجتماعی, پشتیبانی 24/7, خدمات سئو, لینک‌سازی, استراتژی‌های سئو"
        />
        <meta
          property="og:title"
          content="مزایای TsarSEO - ابزارهای حرفه‌ای سئو و افزایش بازدید"
        />
        <meta
          property="og:description"
          content="مزایای TsarSEO شامل تحلیل رقابتی سئو، افزایش بازدید سایت، ترافیک شبکه‌های اجتماعی، پشتیبانی امن 24/7 و استراتژی‌های متنوع لینک‌سازی برای رشد آنلاین شما."
        />
        <meta
          property="og:image"
          content="https://tsarseo.online/icons/Logo.png"
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://tsarseo.online/benefits" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              {
                "@context": "https://schema.org",
                "@type": "Service",
                name: "مزایای TsarSEO",
                description:
                  "TsarSEO ارائه‌دهنده تحلیل رقابتی سئو، افزایش بازدید سایت، ترافیک شبکه‌های اجتماعی، پشتیبانی امن 24/7 و استراتژی‌های متنوع لینک‌سازی.",
                provider: {
                  "@type": "Organization",
                  name: "TsarSEO",
                  url: "https://tsarseo.online",
                },
              },
              {
                "@context": "https://schema.org",
                "@type": "FAQPage",
                mainEntity: [
                  {
                    "@type": "Question",
                    name: "چگونه TsarSEO به بهبود سئو کمک می‌کند؟",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "TsarSEO با ارائه تحلیل رقابتی، ابزارهای رایگان، اینفوگرافیک‌ها و استراتژی‌های لینک‌سازی مانند مطالعات موردی، وبینارها و فعالیت در شبکه‌های اجتماعی، به بهبود سئو کمک می‌کند.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "چه نوع لینک‌سازی‌هایی توسط TsarSEO انجام می‌شود؟",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "TsarSEO از روش‌های لینک‌سازی سفید مانند مطالعات موردی، اسپانسرشیپ رویدادها، بورسیه‌های دانشجویی، ابزارهای رایگان، اینفوگرافیک‌ها، پادکست‌ها، HARO، وبینارها و فعالیت در گروه‌های LinkedIn استفاده می‌کند. همچنین روش‌های خاکستری مانند نظرات هدفمند و انتشار PDF نیز به کار می‌روند.",
                    },
                  },
                ],
              },
              {
                "@context": "https://schema.org",
                "@type": "Organization",
                name: "TsarSEO",
                url: "https://tsarseo.online",
                sameAs: [
                  "https://www.linkedin.com/company/tsarseo",
                  "https://www.youtube.com/@tsarseo",
                ],
              },
              {
                "@context": "https://schema.org",
                "@type": "LocalBusiness",
                name: "TsarSEO",
                url: "https://tsarseo.online",
                telephone: "+98-21-12345678",
                address: {
                  "@type": "PostalAddress",
                  streetAddress: "خیابان اصلی، پلاک 123",
                  addressLocality: "تهران",
                  addressCountry: "IR",
                },
              },
              {
                "@context": "https://schema.org",
                "@type": "BreadcrumbList",
                itemListElement: [
                  {
                    "@type": "ListItem",
                    position: 1,
                    name: "خانه",
                    item: "https://tsarseo.online",
                  },
                  {
                    "@type": "ListItem",
                    position: 2,
                    name: "مزایا",
                    item: "https://tsarseo.online/benefits",
                  },
                ],
              },
              {
                "@context": "https://schema.org",
                "@type": "AggregateRating",
                ratingValue: "4.8",
                reviewCount: "150",
                bestRating: "5",
                worstRating: "1",
                itemReviewed: {
                  "@type": "Service",
                  name: "خدمات سئو TsarSEO",
                },
              },
            ]),
          }}
        />
      </Head>

      <section
        dir="rtl"
        id="benefits"
        className="container font-kalameh font-extrabold py-12 sm:py-16 md:py-20"
        aria-labelledby="benefits-heading"
      >
        <hr className="border-gray-700 mb-6" aria-hidden="true" />
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 place-items-center">
          <div className="max-w-md text-center">
            <h2
              id="benefits-heading"
              className="text-xl sm:text-2xl md:text-3xl font-semibold text-orange-600 mb-2"
            >
              مزایای TsarSEO
            </h2>
            <p className="text-sm sm:text-base md:text-lg font-light text-gray-400 mb-6">
              ابزارهای حرفه‌ای ما با تحلیل دقیق و ترافیک واقعی، شما را برجسته
              می‌کند.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-4xl">
            {benefitList.map(({ icon, title, description }, index) => (
              <motion.div
                key={index}
                className="relative rounded-lg overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{
                  borderColor: "rgba(175, 76, 0, 0.5)",
                  boxShadow: "0 0 20px rgba(175, 76, 0, 0.3)",
                  transition: { duration: 0.3, ease: "easeOut" },
                }}
                role="article"
                aria-label={`مزیت: ${title}`}
              >
                <Card className="bg-card dark:bg-card border border-gray-800 hover:border-orange-700 transition-all duration-200 rounded-lg shadow-sm hover:shadow-md">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-center">
                      <Icon
                        name={icon}
                        size={24}
                        color="#af4c00"
                        className="text-orange-600"
                        aria-hidden="true"
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
    </>
  );
};
