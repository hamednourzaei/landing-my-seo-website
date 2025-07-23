
"use client";

import { faqList } from "./data/faq-data";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { motion } from "framer-motion";
import Head from "next/head";

export const FAQSection: React.FC = () => {
  return (
    <>
      <Head>
        <title>سوالات متداول TsarSEO - راهنمای سئو و خدمات</title>
        <meta
          name="description"
          content="پاسخ به سوالات متداول درباره خدمات سئو، تحلیل کلمات کلیدی، افزایش بازدید و ویژگی‌های TsarSEO برای بهبود رتبه سایت شما."
        />
        <meta
          name="keywords"
          content="TsarSEO, سوالات متداول, تحلیل سئو, کلمات کلیدی, افزایش بازدید, راهنمای سئو, خدمات سئو"
        />
        <meta property="og:title" content="سوالات متداول TsarSEO - راهنمای سئو و خدمات" />
        <meta
          property="og:description"
          content="پاسخ به سوالات متداول درباره خدمات سئو، تحلیل کلمات کلیدی، افزایش بازدید و ویژگی‌های TsarSEO برای بهبود رتبه سایت شما."
        />
        <meta property="og:image" content="https://tsarseo.com/faq-image.jpg" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": faqList.map(({ question, answer }) => ({
                "@type": "Question",
                "name": question,
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": Array.isArray(answer) ? answer.join(" ") : answer,
                },
              })),
            }),
          }}
        />
      </Head>

      <section
        dir="rtl"
        id="faq"
        className="container font-kalameh font-bold py-6 sm:py-8 md:py-12 lg:py-16"
        aria-labelledby="faq-heading"
      >
        <hr className="border-secondary my-3 sm:my-4 md:my-5 lg:my-6" aria-hidden="true" />
        <div className="text-center mb-4 sm:mb-6 md:mb-8 lg:mb-10">
          <h2
            id="faq-heading"
            className="text-sm sm:text-base md:text-lg lg:text-xl font-semibold text-center"
          >
            پاسخ به سوالات شما درباره TsarSEO
          </h2>
          <motion.div
            className="w-10 sm:w-12 h-1 bg-primary/50 rounded-full mx-auto mt-1 sm:mt-2 md:mt-3 lg:mt-4"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            aria-hidden="true"
          />
        </div>

        <div className="grid grid-cols-1 gap-3 sm:gap-4 md:gap-5 lg:gap-6">
          <Card className="bg-muted/60 dark:bg-card rounded-md sm:rounded-lg md:rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="p-3 sm:p-4 md:p-5 lg:p-6">
              <CardTitle className="text-base sm:text-lg md:text-xl lg:text-2xl text-center font-medium">
                سوالات رایج
              </CardTitle>
            </CardHeader>
            <CardContent className="p-3 sm:p-4 md:p-5 lg:p-6">
              <Accordion type="single" collapsible className="w-full">
                {faqList.map(({ question, answer }, index) => (
                  <AccordionItem
                    key={index}
                    value={`item-${index}`}
                    className="border-b border-orange-800/30"
                  >
                    <AccordionTrigger
                      className="text-xs sm:text-sm md:text-base lg:text-lg font-kalameh hover:text-primary/80 transition-colors text-right"
                      aria-label={`سوال: ${question}`}
                    >
                      {question}
                    </AccordionTrigger>
                    <AccordionContent className="text-xs sm:text-sm md:text-base lg:text-lg font-thin leading-relaxed text-muted-foreground mt-1 sm:mt-2 md:mt-3 lg:mt-4">
                      {Array.isArray(answer) ? (
                        answer.map((line, i) => (
                          <p key={i} className="mb-1 text-sm">{line}</p>
                        ))
                      ) : (
                        <p>{answer}</p>
                      )}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </div>
      </section>
    </>
  );
};
