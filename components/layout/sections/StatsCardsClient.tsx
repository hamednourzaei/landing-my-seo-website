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

export const StatsCardsClient = ({ stats }: { stats: any[] }) => {
  const [activeChartIndex, setActiveChartIndex] = useState<number | null>(null);

  return (
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
              <p className="text-sm mt-2 text-muted-foreground">{stat.title}</p>
              <p
                className={`mt-1 text-xs ${
                  stat.growth >= 0 ? "text-green-500" : "text-red-500"
                }`}
              >
                {stat.growth >= 0 ? "↑" : "↓"} {Math.abs(stat.growth)}٪ نسبت به
                هفته پیش
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
  );
};
