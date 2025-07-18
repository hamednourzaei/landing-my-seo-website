"use client";

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

interface FAQProps {
  question: string;
  answer: string | string[];
}

const faqList: FAQProps[] = [
  {
    question: "ترافیک واقعی TsarSEO از کجا تأمین می‌شود؟",
    answer:
      "ترافیک واقعی ما از طریق بک‌لینک‌ها و ریپورتاژهای باکیفیت در وب‌سایت‌های معتبر تأمین می‌شود. این بازدیدها شامل رفتارهای طبیعی مثل کلیک، اسکرول، و تعامل با سایت هستند، کاملاً با الگوریتم‌های گوگل سازگارند، و به بهبود رتبه سایت شما کمک می‌کنند.",
  },
  {
    question: "گزارش‌های تحلیل سئو TsarSEO چه اطلاعاتی ارائه می‌دهند؟",
    answer:
      "گزارش‌های ما شامل تحلیل جامع کلمات کلیدی (از جمله کلمات کلیدی بلند)، بررسی رقبا، وضعیت فنی سایت (مانند لینک‌های شکسته، متاتگ‌ها، و Core Web Vitals)، مشکلات دسترسی‌پذیری، و پیشنهادات عملی برای بهبود سئو است. این گزارش‌ها در قالب JSON، PDF، و داشبورد تعاملی ارائه می‌شوند تا استراتژی سئوی شما را بهینه کنند.",
  },
  {
    question: "آیا می‌توانم خدمات TsarSEO را رایگان دریافت کنم؟",
    answer:
      "ما پلن رایگان نداریم، اما اگر سایت شما ماهانه بیش از ۵۰۰۰ بازدید از طریق بک‌لینک‌ها و ریپورتاژهای ما دریافت کند، خدمات تحلیل سئو به‌صورت رایگان برای شما ارائه می‌شود. همین حالا با ما تماس بگیرید تا جزئیات را بررسی کنیم!",
  },
  {
    question: "آیا ترافیک TsarSEO برای سایت من امن است؟",
    answer:
      "کاملاً! ترافیک ما از طریق بک‌لینک‌ها و ریپورتاژهای معتبر ایجاد می‌شود و با استانداردهای گوگل کاملاً سازگار است. هیچ ریسکی برای جریمه شدن سایت شما وجود ندارد، و ما از فناوری‌های پیشرفته برای اطمینان از امنیت استفاده می‌کنیم.",
  },
  {
    question: "TsarSEO چگونه به بهبود رتبه سایت من کمک می‌کند؟",
    answer:
      "ما با ارائه ترافیک واقعی از بک‌لینک‌ها و ریپورتاژهای باکیفیت، تعامل کاربران با سایت شما را افزایش می‌دهیم. همچنین، گزارش‌های سئوی ما مشکلات فنی، محتوایی، و ساختاری سایت را شناسایی و راهکارهای عملی ارائه می‌دهند تا رتبه شما در موتورهای جستجو بهبود یابد.",
  },
  {
    question: "آیا TsarSEO برای پروژه‌های محلی هم کار می‌کند؟",
    answer:
      "بله! ابزار تحلیل سئوی ما می‌تواند هم وب‌سایت‌های آنلاین و هم پروژه‌های محلی (مثل فایل‌های HTML، JSX، یا TSX در حال توسعه) را اسکن کند. این انعطاف‌پذیری به توسعه‌دهندگان و کسب‌وکارها کمک می‌کند تا قبل از انتشار، سئوی سایت خود را بهینه کنند.",
  },
  {
    question: "Core Web Vitals چیست و چرا در گزارش‌های TsarSEO مهم است؟",
    answer:
      "Core Web Vitals معیارهای کلیدی گوگل برای تجربه کاربری هستند، شامل سرعت بارگذاری (LCP)، تأخیر ورودی (FID)، و پایداری بصری (CLS). گزارش‌های ما این معیارها را تحلیل می‌کنند و پیشنهاداتی برای بهبود ارائه می‌دهند تا سایت شما در رتبه‌بندی گوگل عملکرد بهتری داشته باشد.",
  },
  {
    question: "چگونه می‌توانم کلمات کلیدی مناسب برای سایتم پیدا کنم؟",
    answer:
      "ابزار تحلیل سئوی TsarSEO کلمات کلیدی پرتکرار و بلند (long-tail) را شناسایی می‌کند و پیشنهاداتی برای بهینه‌سازی محتوا ارائه می‌دهد. همچنین، با تحلیل رقبا، فرصت‌های جدید برای کلمات کلیدی سودآور را به شما نشان می‌دهیم.",
  },
  {
    question: "آیا TsarSEO به بهبود دسترسی‌پذیری سایت کمک می‌کند؟",
    answer:
      "بله! گزارش‌های ما مشکلات دسترسی‌پذیری مثل تصاویر بدون متن جایگزین (alt) یا لینک‌های بدون برچسب ARIA را شناسایی می‌کنند. این بهبودها نه‌تنها تجربه کاربری را بهتر می‌کنند، بلکه به سئوی سایت شما نیز کمک می‌کنند.",
  },
  {
    question: "چگونه می‌توانم گزارش‌های TsarSEO را دریافت کنم؟",
    answer:
      "پس از پرداخت پلن و ثبت درخواست، گزارش‌های سئو در قالب JSON، PDF، و داشبورد تعاملی HTML به شما تحویل داده می‌شود. این گزارش‌ها شامل تحلیل جامع و پیشنهادات عملی هستند و می‌توانید آن‌ها را به‌راحتی با تیم خود به اشتراک بگذارید.",
  },
  {
    question: "چرا خدمت سفارش تحقیق کلمه کلیدی TsarSEO برای شما ضروری است؟",
    answer: [
      "بهینه سازی دقیق تر محتوا: کلمات کلیدی ارائه شده به طور کامل با محتوای صفحه شما هماهنگ هستند و باعث بهبود ارتباط محتوای سایت با جستجوهای کاربران می شوند.",
      "تمرکز بر نیازهای بازار ایران: این خدمت با تحلیل رفتار جستجوی کاربران فارسی زبان، کلماتی را ارائه می دهد که مستقیما با نیازهای مخاطبان ایرانی سازگار هستند.",
      "صرفه جویی در وقت و هزینه: تحقیق دستی کلمات کلیدی می تواند بسیار وقت گیر باشد. ما این فرآیند را سریع و کارآمد کرده ایم.",
      "افزایش بازدیدهای هدفمند: با استفاده از کلمات کلیدی مناسب می توانید مخاطبانی را جذب کنید که به طور خاص به دنبال محصولات یا خدمات شما هستند."
    ],
  }
];

export const FAQSection: React.FC = () => {
  return (
    <section dir="rtl" id="faq" className="container font-kalameh font-bold py-6 sm:py-8 md:py-12 lg:py-16">
      <hr className="border-secondary my-3 sm:my-4 md:my-5 lg:my-6" />
      <div className="text-center mb-4 sm:mb-6 md:mb-8 lg:mb-10">
        <h2 className="text-xs sm:text-sm md:text-base lg:text-lg text-primary mb-1 sm:mb-2 md:mb-3 lg:mb-4 tracking-wider">
          سوالات متداول
        </h2>
        <h2 className="text-sm sm:text-base md:text-lg lg:text-xl font-semibold text-center">
          پاسخ به سوالات شما درباره TsarSEO
        </h2>
        <motion.div
          className="w-10 sm:w-12 h-1 bg-primary/50 rounded-full mx-auto mt-1 sm:mt-2 md:mt-3 lg:mt-4"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
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
                  <AccordionTrigger className="text-xs sm:text-sm md:text-base lg:text-lg font-kalameh hover:text-primary/80 transition-colors">
                    {question}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm sm:text-sm md:text-base lg:text-lg font-light leading-relaxed text-muted-foreground mt-1 sm:mt-2 md:mt-3 lg:mt-4">
                    {Array.isArray(answer) ? (
                      answer.map((line, i) => (
                        <h1 key={i} className="mb-1 text-xs">{line}</h1>
                      ))
                    ) : (
                      <h2>{answer}</h2>
                    )}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};
