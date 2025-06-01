"use client";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { motion } from "framer-motion";
import CountUp from "react-countup";
import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";

export const HeroSection = () => {
  const { theme } = useTheme();
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeChartIndex, setActiveChartIndex] = useState<number | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch(
          "https://hamednourzaei.github.io/api-detail/data/stats.json"
        );
        const data = await res.json();
        setStats(data);
      } catch (error) {
        console.error("خطا در واکشی داده‌ها:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <section className="container font-kalameh w-full mx-auto text-center py-32">
        <p className="text-xl font-bold">در حال بارگذاری اطلاعات...</p>
      </section>
    );
  }

  return (
    <section className="container font-kalameh font-semibold w-full mx-auto">
      <div className="grid place-items-center lg:max-w-screen-xl gap-8 mx-auto py-20 md:py-32">
        {/* Header Section */}
        <div className="text-center space-y-8">
          <Badge variant="outline" className="text-sm py-2">
            <span className="mr-2 text-primary">
              <Badge>New</Badge>
            </span>
            <span className="font-extrabold">
              سرویس حرفه‌ای برای رشد آنلاین
            </span>
          </Badge>
          <div className="text-4xl md:text-6xl font-extrabold leading-tight">
            <h1>
              بازدید واقعی + تحلیل سئوی حرفه‌ای{" "}
              <span className="inline-block text-transparent bg-gradient-to-r from-[#D247BF] to-primary bg-clip-text mt-5 border-b-2 border-b-[#af4c00]">
                فقط با یک کلیک
              </span>
            </h1>
          </div>
          <p className="max-w-screen-sm mx-auto text-lg md:text-xl text-muted-foreground text-right font-extrabold">
            تحلیل دقیق سئو برای متخصص‌ها و بازدید واقعی برای سایت‌هایی که
            می‌خوان در گوگل دیده شن.
          </p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-center mt-8"
          >
            <motion.div whileHover={{ scale: 1.05 }}>
              <Link
                href="#contact"
                className="inline-flex items-center justify-center px-6 py-3 text-lg font-extrabold bg-gradient-to-r from-[#D247BF] to-primary text-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300"
              >
                ببین سایتت برای سئو چقدر آمادست
                <motion.span
                  className="ml-2"
                  initial={{ x: 0 }}
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <ArrowRight className="size-5" />
                </motion.span>
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Stats Cards */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 mt-16 text-center w-full"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          {stats.map((stat: any, index: number) => (
            <Dialog
              key={index}
              open={activeChartIndex === index}
              onOpenChange={(open) => setActiveChartIndex(open ? index : null)}
            >
              <DialogTrigger asChild>
                <motion.div
                  className="relative bg-white dark:bg-zinc-900 rounded-xl p-6 shadow-md border border-primary/10 transition-all hover:shadow-xl cursor-pointer min-w-0"
                  whileHover={{ scale: 1.03 }}
                >
                  <p className="text-xl font-extrabold text-primary">
                    <CountUp end={stat.value} duration={2} separator="," />
                    {stat.title.includes("بازدید") && "+"}
                  </p>
                  <p className="text-sm mt-2 text-muted-foreground">
                    {stat.title}
                  </p>
                  <p
                    className={`mt-1 text-xs ${
                      stat.growth >= 0 ? "text-green-500" : "text-red-500"
                    }`}
                  >
                    {stat.growth >= 0 ? "↑" : "↓"} {Math.abs(stat.growth)}٪ نسبت
                    به هفته پیش
                  </p>
                </motion.div>
              </DialogTrigger>
              <DialogContent className="w-full max-w-md p-6">
                <DialogHeader>
                  <DialogTitle>{stat.title}</DialogTitle>
                  <DialogDescription>
                    نمودار عملکرد {stat.title} در هفته گذشته
                  </DialogDescription>
                </DialogHeader>
                <div className="mt-4">
                  <ResponsiveContainer width="100%" height={200}>
                    <LineChart data={stat.chartData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="day" />
                      <YAxis />
                      <Tooltip />
                      <Line
                        type="monotone"
                        dataKey="visits"
                        stroke="#D247BF"
                        strokeWidth={2}
                        dot={{ r: 4 }}
                        activeDot={{ r: 6 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </DialogContent>
            </Dialog>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
