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

interface FAQProps {
  question: string;
  answer: string;
}

const faqList: FAQProps[] = [
  {
    question: "ترافیک واقعی TsarSEO چطور کار می‌کند؟",
    answer:
      "ترافیک واقعی ما با شبیه‌سازی رفتارهای انسانی (مثل کلیک، اسکرول، و تعامل با سایت) ایجاد می‌شود. این بازدیدها کاملاً امن و با الگوریتم‌های گوگل سازگارند و به بهبود رتبه سایت شما کمک می‌کنند.",
  },
  {
    question: "گزارش‌های تحلیل سئو شامل چه اطلاعاتی هستند؟",
    answer:
      "گزارش‌های ما شامل تحلیل کلمات کلیدی، بررسی رقبا، وضعیت فنی سایت، و پیشنهادات عملی برای بهبود سئو است. این گزارش‌ها برای آژانس‌ها و کسب‌وکارها طراحی شده‌اند تا استراتژی سئوی خود را بهینه کنند.",
  },
  {
    question: "آیا می‌توانم TsarSEO را رایگان تست کنم؟",
    answer:
      "بله! پلن پایه ما رایگان است و شامل گزارش سئو پایه و تا ۱۰۰۰ بازدید ماهانه می‌شود. می‌توانید همین حالا ثبت‌نام کنید و قدرت TsarSEO را تجربه کنید.",
  },
  {
    question: "آیا ترافیک TsarSEO برای سایت من امن است؟",
    answer:
      "کاملاً! ترافیک ما با فناوری پیشرفته و مطابق با استانداردهای گوگل تولید می‌شود. هیچ ریسکی برای جریمه شدن سایت شما وجود ندارد.",
  },
];

export const FAQSection: React.FC = () => {
  return (
    <section dir="rtl" id="faq" className="container lg:w-[75%]">
        <hr className="border-secondary" />
      <div className="text-center mb-8 mt-10">
        <h2 className="text-lg text-primary text-center mb-2 tracking-wider">
          سوالات متداول
        </h2>

        <h2 className="text-3xl md:text-4xl text-center font-sans font-bold">
          پاسخ به سوالات شما درباره TsarSEO
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-8">
        <Card className="bg-muted/60 dark:bg-card">
          <CardHeader>
            <CardTitle className="text-2xl">سوالات رایج</CardTitle>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              {faqList.map(({ question, answer }, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger>{question}</AccordionTrigger>
                  <AccordionContent>{answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};