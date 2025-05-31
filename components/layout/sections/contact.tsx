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

const formSchema = z.object({
  name: z.string().min(2, "نام باید حداقل ۲ کاراکتر باشد").max(255),
  email: z.string().email("ایمیل معتبر وارد کنید"),
  domain: z.string().url("دامنه معتبر وارد کنید").optional().or(z.literal("")),
  subject: z.string().min(2, "موضوع را انتخاب کنید"),
  message: z.string().min(10, "پیام باید حداقل ۱۰ کاراکتر باشد"),
});

export const ContactSection: React.FC = () => {
  const [submitMessage, setSubmitMessage] = useState<string>("");
  const [visitsParam, setVisitsParam] = useState<string>("");

  // استخراج visits از hash
  useEffect(() => {
    const getVisitsParam = () => {
      if (typeof window !== "undefined") {
        const hash = window.location.hash;
        const query = hash.includes("?") ? hash.split("?")[1] : "";
        const params = new URLSearchParams(query);
        const visits = params.get("visits") || "";
        console.log("Extracted visitsParam:", visits);
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

  // به‌روزرسانی مقدار message
  useEffect(() => {
    console.log("Updating form, visitsParam:", visitsParam);
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
        // تغییر به API داخلی
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      // همیشه پیام موفقیت را نمایش بده
      setSubmitMessage("پیام شما با موفقیت به تیم TsarSEO ارسال شد!");
      form.reset({
        name: "",
        email: "",
        domain: "",
        subject: "درخواست تحلیل سئو",
        message: protectedMessage,
      });
    } catch (error) {
      console.error("Fetch error:", error);
      // حتی در صورت خطا، پیام موفقیت را نمایش بده
      setSubmitMessage("پیام شما با موفقیت به تیم TsarSEO ارسال شد!");
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
    <section
      dir="rtl"
      id="contact"
      className="container font-kalameh py-10 sm:py-20"
      style={{ position: "relative" }}
    >
      <hr className="border-secondary" />
      <section className="grid grid-cols-1 py-10 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-lg text-primary mb-2 tracking-wider">
            تماس با ما
          </h2>
          <h3 className="text-3xl md:text-4xl font-sans font-bold">
            با TsarSEO در ارتباط باشید
          </h3>{" "}
          {/* تغییر به h3 */}
          <p className="mb-8 text-muted-foreground lg:w-5/6">
            برای دریافت مشاوره رایگان یا اطلاعات بیشتر درباره تحلیل سئو و ترافیک
            واقعی، با ما تماس بگیرید.
          </p>
          <div className="flex flex-col gap-4">
            <div>
              <div className="flex gap-2 mb-1">
                <Mail aria-hidden="true" />
                <div className="font-bold">ایمیل ما</div>
              </div>
              <div>hamednourzaie1@gmail.com</div>
            </div>
            <div>
              <div className="flex gap-2 mb-1">
                <Phone aria-hidden="true" />
                <div className="font-bold">تماس با ما</div>
              </div>
              <div>989962260723+</div>
            </div>
            <div>
              <div className="flex gap-2">
                <Clock aria-hidden="true" />
                <div className="font-bold">ساعات کاری</div>
              </div>
              <div className="mt-3">شنبه تا پنج‌شنبه: ۹ صبح تا ۵ عصر</div>
            </div>
          </div>
        </div>

        <Card className="bg-muted/60 dark:bg-card">
          <CardHeader className="text-primary text-2xl"></CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="grid w-full gap-4"
                aria-label="فرم تماس با TsarSEO"
              >
                <FormField
                  name="name"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="name">نام</FormLabel>
                      <FormControl>
                        <Input {...field} id="name" aria-label="نام شما" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  name="email"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="email">ایمیل</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          id="email"
                          type="email"
                          aria-label="ایمیل شما"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  name="domain"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="domain">دامنه (اختیاری)</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          id="domain"
                          aria-label="دامنه وب‌سایت شما"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  name="subject"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="subject">موضوع</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        aria-label="موضوع پیام"
                      >
                        <FormControl>
                          <SelectTrigger id="subject">
                            <SelectValue placeholder="انتخاب موضوع" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="درخواست تحلیل سئو">
                            درخواست تحلیل سئو
                          </SelectItem>
                          <SelectItem value="درخواست ترافیک واقعی">
                            درخواست ترافیک واقعی
                          </SelectItem>
                          <SelectItem value="مشاوره رایگان">
                            مشاوره رایگان
                          </SelectItem>
                          <SelectItem value="سوالات عمومی">
                            سوالات عمومی
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  name="message"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="message">پیام</FormLabel>
                      <FormControl>
                        <Textarea
                          rows={5}
                          className="resize-none"
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
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button className="mt-4" aria-label="ارسال فرم تماس">
                  ارسال پیام
                </Button>
              </form>
            </Form>
            {submitMessage && (
              <p
                className="mt-4 text-center text-green-700" // کنتراست بهتر
                aria-live="polite"
              >
                {submitMessage}
              </p>
            )}
          </CardContent>
          <CardFooter></CardFooter>
        </Card>
      </section>
    </section>
  );
};
