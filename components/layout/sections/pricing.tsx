"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Check } from "lucide-react";

enum PopularPlan {
  NO = 0,
  YES = 1,
}

interface PlanProps {
  title: string;
  popular: PopularPlan;
  price: number;
  description: string;
  buttonText: string;
  benefitList: string[];
}

const plans: PlanProps[] = [
  {
    title: "پایه",
    popular: PopularPlan.NO,
    price: 0,
    description:
      "مناسب برای کسب‌وکارهای کوچک که می‌خواهند با سئو و ترافیک آشنا شوند.",
    buttonText: "شروع رایگان",
    benefitList: [
      "گزارش سئو پایه",
      "تا ۱۰۰۰ بازدید ماهانه",
      "پشتیبانی ایمیلی",
      "دسترسی به داشبورد",
    ],
  },
  {
    title: "حرفه‌ای",
    popular: PopularPlan.YES,
    price: 99,
    description:
      "ایده‌آل برای آژانس‌ها و کسب‌وکارهایی که تحلیل پیشرفته و ترافیک بالا می‌خواهند.",
    buttonText: "شروع کنید",
    benefitList: [
      "گزارش‌های جامع سئو",
      "تا ۱۰,۰۰۰ بازدید ماهانه",
      "پشتیبانی ۲۴/۷",
      "تحلیل کلمات کلیدی پیشرفته",
      "دسترسی به API",
    ],
  },
  {
    title: "سازمانی",
    popular: PopularPlan.NO,
    price: 299,
    description:
      "برای شرکت‌های بزرگ با نیاز به گزارش‌های سفارشی و ترافیک گسترده.",
    buttonText: "تماس با ما",
    benefitList: [
      "گزارش‌های سفارشی سئو",
      "ترافیک نامحدود",
      "پشتیبانی اختصاصی",
      "تحلیل رقبا",
      "مشاوره استراتژی سئو",
    ],
  },
];

export const PricingSection: React.FC = () => {
  return (
    <section dir="rtl" className="container font-kalameh py-24 sm:py-32">
       <hr className="border-secondary" />
      <h2 className="text-lg py-20 text-primary text-center mb-2 tracking-wider">
        پلن‌های TsarSEO
      </h2>

      <h2 className="text-3xl md:text-4xl text-center font-sans font-bold mb-4">
        با TsarSEO به قله های گوگل برسید
      </h2>

      <h3 className="md:w-1/2 mx-auto text-xl text-center text-muted-foreground pb-14">
        پلن مناسب خود را انتخاب کنید و با تحلیل‌های دقیق و ترافیک واقعی، کسب‌وکارتان را رشد دهید.
      </h3>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-4">
        {plans.map(
          ({ title, popular, price, description, buttonText, benefitList }) => (
            <Card
              key={title}
              className={
                popular === PopularPlan.YES
                  ? "drop-shadow-xl shadow-black/10 dark:shadow-white/10 border-[1.5px] border-primary lg:scale-[1.1]"
                  : ""
              }
            >
              <CardHeader>
                <CardTitle className="pb-2">{title}</CardTitle>

                <CardDescription className="pb-4">
                  {description}
                </CardDescription>

                <div>
                  <span className="text-3xl font-sans font-bold">
                    {price === 0 ? "رایگان" : `${price} تومان`}
                  </span>
                  <span className="text-muted-foreground"> /ماه</span>
                </div>
              </CardHeader>

              <CardContent className="flex">
                <div className="space-y-4">
                  {benefitList.map((benefit) => (
                    <span key={benefit} className="flex">
                      <Check className="text-primary mr-2" />
                      <h3>{benefit}</h3>
                    </span>
                  ))}
                </div>
              </CardContent>

              <CardFooter>
                <Button
                  variant={popular === PopularPlan.YES ? "default" : "secondary"}
                  className="w-full"
                >
                  {buttonText}
                </Button>
              </CardFooter>
            </Card>
          )
        )}
      </div>
      <hr className="border-secondary" />
    </section>
  );
};