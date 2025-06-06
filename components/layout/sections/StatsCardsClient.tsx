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

export const StatsCardsClient = ({ stats }: { stats: any[] }) => {
  const [activeChartIndex, setActiveChartIndex] = useState<number | null>(null);

  const isLoading = !stats || stats.length === 0;
  const skeletonArray = Array.from({ length: 6 });

  return (
    <motion.div
      className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-16 w-full"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
    >
      {(isLoading ? skeletonArray : stats).map((stat: any, index: number) => (
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
              {isLoading ? (
                <>
                  <Skeleton className="h-6 w-24 mx-auto mb-3" />
                  <Skeleton className="h-4 w-32 mx-auto mb-2" />
                  <Skeleton className="h-3 w-20 mx-auto" />
                </>
              ) : (
                <div className="text-center font-kalameh">
                  <p className="text-xs sm:md:text-xl md:text-xl lg:text-2xl font-light text-primary mb-1">
                    <CountUp end={stat.value} duration={2} separator="," />
                    {stat.title.includes("بازدید") && ""}
                  </p>
                  <p className="text-xs sm:md:text-xl md:text-xl lg:text-2xl font-light text-muted-foreground mb-1">
                    {stat.title}
                  </p>
                  <p
                    className={`text-xs sm:md:text-base md:text-base lg:text-xl font-light ${
                      stat.growth >= 0 ? "text-green-500" : "text-red-500"
                    }`}
                  >
                    {stat.growth >= 0 ? "↑" : "↓"} {Math.abs(stat.growth)}٪ نسبت
                    به هفته پیش
                  </p>
                </div>
              )}
            </motion.div>
          </DialogTrigger>

          {!isLoading && (
            <DialogContent className="w-full max-w-md p-6 font-kalameh text-right">
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
          )}
        </Dialog>
      ))}
    </motion.div>
  );
};
