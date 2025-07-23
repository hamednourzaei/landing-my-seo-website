"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Clock, Mail, Phone } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { motion, AnimatePresence } from "framer-motion";
import Head from "next/head";

const formSchema = z.object({
  name: z.string().min(2, "نام باید حداقل ۲ کاراکتر باشد").max(255),
  email: z.string().email("ایمیل معتبر وارد کنید"),
  domain: z.string().url("دامنه معتبر وارد کنید").optional().or(z.literal("")),
  subject: z.string().min(2, "موضوع را انتخاب کنید"),
  message: z.string().min(10, "پیام باید حداقل ۱۰ کاراکتر باشد"),
});

export const ContactSection: React.FC = () => {
  const [submitMessage, setSubmitMessage] = useState<string>("");
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const [visitsParam, setVisitsParam] = useState<string>("");

  useEffect(() => {
    const getVisitsParam = () => {
      if (typeof window !== "undefined") {
        const hash = window.location.hash;
        const query = hash.includes("?") ? hash.split("?")[1] : "";
        const params = new URLSearchParams(query);
        const visits = params.get("visits") || "";
        setVisitsParam(visits);
      }
    };
    getVisitsParam();
    window.addEventListener("hashchange", getVisitsParam);
    return () => window.removeEventListener("hashchange", getVisitsParam);
  }, []);

  const protectedMessage = visitsParam
    ? `تعداد بازدید درخواستی: ${Number(
        visitsParam
      ).toLocaleString()} بازدید\n\n`
    : "";

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      domain: "",
      subject: "درخواست تحلیل سئو",
      message: protectedMessage,
    },
  });

  useEffect(() => {
    if (visitsParam) {
      form.setValue("message", protectedMessage);
    } else {
      form.setValue("message", "");
    }
  }, [visitsParam, form, protectedMessage]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setSubmitMessage("");
    try {
      await fetch("/api/send-to-telegram", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      setSubmitMessage("پیام شما با موفقیت به تیم TsarSEO ارسال شد!");
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
      form.reset({
        name: "",
        email: "",
        domain: "",
        subject: "درخواست تحلیل سئو",
        message: protectedMessage,
      });
    } catch (error) {
      console.error("Fetch error:", error);
      setSubmitMessage("خطایی رخ داد، لطفاً دوباره تلاش کنید.");
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
      form.reset({
        name: "",
        email: "",
        domain: "",
        subject: "درخواست تحلیل سئو",
        message: protectedMessage,
      });
    }
  }

  return (
    <>
      <Head>
        <title>تماس با TsarSEO - ارسال پیام</title>
        <meta
          name="description"
          content="برای ارسال پیام یا درخواست مشاوره درباره تحلیل سئو و ترافیک واقعی با تیم TsarSEO تماس بگیرید."
        />
        <meta
          name="keywords"
          content="تماس با TsarSEO, مشاوره سئو, درخواست تحلیل سئو, ارسال پیام به TsarSEO"
        />
        <meta property="og:title" content="تماس با TsarSEO - ارسال پیام" />
        <meta
          property="og:description"
          content="برای ارسال پیام یا درخواست مشاوره درباره تحلیل سئو و ترافیک واقعی با تیم TsarSEO تماس بگیرید."
        />
        <meta property="og:image" content="https://example.com/contact-image.jpg" />
      </Head>

      <section
        dir="rtl"
        id="contact"
        className="container font-kalameh font-semibold py-8 sm:py-12 md:py-16 relative"
      >
        <AnimatePresence>
          {showSuccess && (
            <motion.div
              className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-card p-4 sm:p-6 rounded-lg shadow-md text-center text-sm sm:text-base border border-primary"
              >
                <div className="animate-pulse mb-2 text-primary font-bold">
                  ارسال موفق!
                </div>
                <div>{submitMessage}</div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <hr className="border-secondary my-4" />
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          <div className="space-y-4">
            <h2 className="text-sm sm:text-base md:text-lg text-primary mb-1">
              تماس با ما
            </h2>
            <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold">
              با TsarSEO در ارتباط باشید
            </h3>
            <p className="text-xs sm:text-sm md:text-base text-muted-foreground font-light">
              برای دریافت مشاوره رایگان یا اطلاعات بیشتر درباره تحلیل سئو و ترافیک
              واقعی، با ما تماس بگیرید.
            </p>
            <div className="space-y-3">
              <div>
                <div className="flex items-center gap-2 text-xs sm:text-sm md:text-base">
                  <Mail className="text-primary" size={14} />
                  <div className="font-bold">ایمیل ما</div>
                </div>
                <div className="text-xs sm:text-sm md:text-base">
                  hamednourzaie1@gmail.com
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2 text-xs sm:text-sm md:text-base">
                  <Phone className="text-primary" size={14} />
                  <div className="font-bold">تماس با ما</div>
                </div>
                <div className="text-xs sm:text-sm md:text-base">+989962260723</div>
              </div>
              <div>
                <div className="flex items-center gap-2 text-xs sm:text-sm md:text-base">
                  <Clock className="text-primary" size={14} />
                  <div className="font-bold">ساعات کاری</div>
                </div>
                <div className="text-xs sm:text-sm md:text-base mt-1">
                  شنبه تا پنج‌شنبه: ۹ صبح تا ۵ عصر
                </div>
              </div>
            </div>
          </div>

          <Card className="bg-muted/60 dark:bg-card rounded-lg shadow-sm">
            <CardContent className="p-4 sm:p-6">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="grid gap-3 sm:gap-4"
                  aria-label="فرم تماس با TsarSEO"
                >
                  <FormField
                    name="name"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs sm:text-sm md:text-base">
                          نام
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            className="text-xs sm:text-sm md:text-base"
                            id="name"
                            aria-label="نام شما"
                          />
                        </FormControl>
                        <FormMessage className="text-xs sm:text-sm" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    name="email"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs sm:text-sm md:text-base">
                          ایمیل
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            className="text-xs sm:text-sm md:text-base"
                            id="email"
                            type="email"
                            aria-label="ایمیل شما"
                          />
                        </FormControl>
                        <FormMessage className="text-xs sm:text-sm" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    name="domain"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs sm:text-sm md:text-base">
                          دامنه (اختیاری)
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            className="text-xs sm:text-sm md:text-base"
                            id="domain"
                            aria-label="دامنه وب‌سایت شما"
                          />
                        </FormControl>
                        <FormMessage className="text-xs sm:text-sm" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    name="subject"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs sm:text-sm md:text-base">
                          موضوع
                        </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="text-xs sm:text-sm md:text-base">
                              <SelectValue placeholder="انتخاب موضوع" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem
                              value="درخواست تحلیل سئو"
                              className="text-xs sm:text-sm md:text-base"
                            >
                              درخواست تحلیل سئو
                            </SelectItem>
                            <SelectItem
                              value="درخواست ترافیک واقعی"
                              className="text-xs sm:text-sm md:text-base"
                            >
                              درخواست ترافیک واقعی
                            </SelectItem>
                            <SelectItem
                              value="مشاوره رایگان"
                              className="text-xs sm:text-sm md:text-base"
                            >
                              مشاوره رایگان
                            </SelectItem>
                            <SelectItem
                              value="سوالات عمومی"
                              className="text-xs sm:text-sm md:text-base"
                            >
                              سوالات عمومی
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage className="text-xs sm:text-sm" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    name="message"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs sm:text-sm md:text-base">
                          پیام
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            rows={4}
                            className="resize-none text-xs sm:text-sm md:text-base"
                            {...field}
                            id="message"
                            aria-label="پیام شما"
                            aria-live="polite"
                            onChange={(e) => {
                              const newValue = e.target.value;
                              if (newValue.startsWith(protectedMessage)) {
                                field.onChange(newValue);
                              } else {
                                field.onChange(
                                  protectedMessage +
                                    newValue.slice(protectedMessage.length)
                                );
                              }
                            }}
                          />
                        </FormControl>
                        <FormMessage className="text-xs sm:text-sm" />
                      </FormItem>
                    )}
                  />
                  <Button
                    className="w-full text-xs sm:text-sm md:text-base bg-primary hover:bg-primary/90 text-white rounded-md"
                    aria-label="ارسال فرم تماس"
                  >
                    ارسال پیام
                  </Button>
                </form>
              </Form>
            </CardContent>
            <CardFooter></CardFooter>
          </Card>
        </section>
      </section>
    </>
  );
};
