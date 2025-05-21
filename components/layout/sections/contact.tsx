"use client";

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
  subject: z.string().min(2, "موضوع را انتخاب کنید"),
  message: z.string().min(10, "پیام باید حداقل ۱۰ کاراکتر باشد"),
});

export const ContactSection: React.FC = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "درخواست تحلیل سئو",
      message: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const { name, email, subject, message } = values;
    console.log(values);

    const mailToLink = `mailto:support@tsarseo.com?subject=${encodeURIComponent(
      subject
    )}&body=سلام، من ${encodeURIComponent(
      name
    )} هستم، ایمیلم ${encodeURIComponent(
      email
    )} است. %0D%0A${encodeURIComponent(message)}`;

    window.location.href = mailToLink;
  }

  return (
    <section dir="rtl" id="contact" className="container font-kalameh py-10 sm:py-20">
             <hr className="border-secondary" />
      <section className="grid grid-cols-1 py-10 md:grid-cols-2 gap-8">
        <div>
          <div className="mb-4">
            <h2 className="text-lg text-primary mb-2 tracking-wider">
              تماس با ما
            </h2>

            <h2 className="text-3xl md:text-4xl font-sans font-bold">
              با TsarSEO در ارتباط باشید
            </h2>
          </div>
          <p className="mb-8 text-muted-foreground lg:w-5/6">
            برای دریافت مشاوره رایگان یا اطلاعات بیشتر درباره تحلیل سئو و ترافیک واقعی، با ما تماس بگیرید. تیم ما آماده کمک به شماست!
          </p>

          <div className="flex flex-col gap-4">
            <div>
              <div className="flex gap-2 mb-1">
                <Mail />
                <div className="font-sans font-bold">ایمیل ما</div>
              </div>
              <div>support@tsarseo.com</div>
            </div>

            <div>
              <div className="flex gap-2 mb-1">
                <Phone />
                <div className="font-sans font-bold">تماس با ما</div>
              </div>
              <div>۰۲۱-۱۲۳۴۵۶۷۸</div>
            </div>

            <div>
              <div className="flex gap-2">
                <Clock />
                <div className="font-sans font-bold">ساعات کاری</div>
              </div>
              <div>
                <div>شنبه تا پنج‌شنبه</div>
                <div>۹ صبح تا ۵ عصر</div>
              </div>
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
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>نام</FormLabel>
                      <FormControl>
                        <Input placeholder="لطفا نام شخصی یا شرکت  خودرا به صورت کامل وارد بکنید." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>ایمیل</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="لطفا ایمیل یا جیمیل خودرا به صورت کامل وارد بکنید."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="subject"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>موضوع</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
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
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>پیام</FormLabel>
                      <FormControl>
                        <Textarea
                          rows={5}
                          placeholder="پیام خود را بنویسید..."
                          className="resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button className="mt-4">ارسال پیام</Button>
              </form>
            </Form>
          </CardContent>
          <CardFooter></CardFooter>
        </Card>
      </section>
    </section>
  );
};