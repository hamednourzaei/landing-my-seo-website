"use client";

import { useState } from "react";
import CountUp from "react-countup";
import { motion } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Skeleton } from "@/components/ui/skeleton";

interface Stat {
  value: number;
  title: string;
  growth: number;
  chartData: { day: string; visits: number }[];
}

interface StatsCardsClientProps {
  stats: Stat[]; // پراپ stats اجباری است، زیرا در hero.tsx همیشه ارائه می‌شود
}

export const StatsCardsClient = ({ stats }: StatsCardsClientProps) => {
  const [activeChartIndex, setActiveChartIndex] = useState<number | null>(null);

  // آرایه‌ای برای اسکلتون‌ها (6 تا اسکلتون برای کارت‌ها)
  const skeletonArray = Array.from({ length: 6 }, () => undefined);

  return (
    <motion.div
      className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 mt-14 w-full "
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
    >
<<<<<<< HEAD
      {stats.length === 0
        ? skeletonArray.map((_, index: number) => (
            <Dialog
              key={index}
              open={activeChartIndex === index}
              onOpenChange={(open) => setActiveChartIndex(open ? index : null)}
            >
              <DialogTrigger asChild>
                <motion.div
                  className="relative bg-white dark:bg-zinc-900 rounded-2xl  shadow-sm border border-border hover:shadow-lg transition-all duration-300 cursor-pointer"
                  whileHover={{ scale: 1.02 }}
                >
                  <Skeleton className="h-6 w-24 mx-auto mb-3 bg-gray-200" />
                  <Skeleton className="h-4 w-32 mx-auto mb-2 bg-gray-200" />
                  <Skeleton className="h-3 w-20 mx-auto bg-gray-200" />
                </motion.div>
              </DialogTrigger>
            </Dialog>
          ))
        : stats.map((stat: Stat, index: number) => (
            <Dialog
              key={index}
              open={activeChartIndex === index}
              onOpenChange={(open) => setActiveChartIndex(open ? index : null)}
            >
              <DialogTrigger asChild>
                <motion.div
                  className="relative  bg-white dark:bg-zinc-900 rounded-xl px-2 py-5  border border-border shadow-lg shadow-orange-900/50 hover:shadow-lg hover:shadow-[#c1d5ef] transition-all duration-300 cursor-pointer"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="text-center ">
                    <p className="text-xs sm:text-xl md:text-xl lg:text-2xl font-semibold text-primary mb-1">
                      <CountUp end={stat.value} duration={2} separator="," />
                      {stat.title.includes("بازدید") ? "" : ""}
                    </p>
                    <p className="text-xs sm:text-xl md:text-xl lg:text-2xl font-light text-muted-foreground mb-1">
                      {stat.title}
                    </p>
                    <p
                      className={`text-xs sm:text-base md:text-base lg:text-xl font-light ${
                        stat.growth >= 0 ? "text-green-500" : "text-red-500"
                      }`}
                    >
                      {stat.growth >= 0 ? "↑" : "↓"} {Math.abs(stat.growth)}٪
                      نسبت به هفته پیش
                    </p>
                  </div>
                </motion.div>
              </DialogTrigger>

              <DialogContent className="w-full max-w-md p-6 font-medium text-right">
                <DialogHeader>
                  <DialogTitle className="text-xl font-light">
                    {stat.title}
                  </DialogTitle>
                  <DialogDescription className="text-sm text-muted-foreground">
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
                        dot={{ r: 3 }}
                        activeDot={{ r: 5 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </DialogContent>
            </Dialog>
          ))}
=======
      {stats.length === 0 ? skeletonArray.map((_, index: number) => (
        <Dialog
          key={index}
          open={activeChartIndex === index}
          onOpenChange={(open) => setActiveChartIndex(open ? index : null)}
        >
          <DialogTrigger asChild>
            <motion.div
              className="relative bg-white dark:bg-zinc-900 rounded-2xl p-5 shadow-sm border border-border hover:shadow-lg transition-all duration-300 cursor-pointer"
              whileHover={{ scale: 1.02 }}
            >
              <Skeleton className="h-6 w-24 mx-auto mb-3 bg-gray-200" />
              <Skeleton className="h-4 w-32 mx-auto mb-2 bg-gray-200" />
              <Skeleton className="h-3 w-20 mx-auto bg-gray-200" />
            </motion.div>
          </DialogTrigger>
        </Dialog>
      )) : stats.map((stat: Stat, index: number) => (
        <Dialog
          key={index}
          open={activeChartIndex === index}
          onOpenChange={(open) => setActiveChartIndex(open ? index : null)}
        >
          <DialogTrigger asChild>
            <motion.div
              className="relative bg-white dark:bg-zinc-900 rounded-2xl p-5 shadow-sm border border-border hover:shadow-lg transition-all duration-300 cursor-pointer"
              whileHover={{ scale: 1.02 }}
            >
              <div className="text-center font-medium">
                <p className="text-base sm:text-xl md:text-xl lg:text-2xl font-light text-primary mb-1">
                  <CountUp end={stat.value} duration={2} separator="," />
                  {stat.title.includes("بازدید") ? "" : ""}
                </p>
                <p className="text-base sm:text-xl md:text-xl lg:text-2xl font-light text-muted-foreground mb-1">
                  {stat.title}
                </p>
                <p
                  className={`text-base sm:text-base md:text-base lg:text-xl font-light ${
                    stat.growth >= 0 ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {stat.growth >= 0 ? "↑" : "↓"} {Math.abs(stat.growth)}٪ نسبت به هفته پیش
                </p>
              </div>
            </motion.div>
          </DialogTrigger>

          <DialogContent className="w-full max-w-md p-6 font-medium text-right">
            <DialogHeader>
              <DialogTitle className="text-xl font-light">
                {stat.title}
              </DialogTitle>
              <DialogDescription className="text-sm text-muted-foreground">
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
                    dot={{ r: 3 }}
                    activeDot={{ r: 5 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </DialogContent>
        </Dialog>
      ))}
>>>>>>> 1dbc5ed61bbddf5723e3153318484493cc37bf8b
    </motion.div>
  );
};
