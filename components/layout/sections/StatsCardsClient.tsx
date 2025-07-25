"use client";

import { useState, useEffect, useRef } from "react";
import CountUp from "react-countup";
import { motion, useReducedMotion } from "framer-motion";
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
  stats: Stat[];
}

const SkeletonCard = () => (
  <div className="bg-card rounded-xl p-6 border border-border shadow-sm">
    <Skeleton className="h-6 w-24 mx-auto mb-3 bg-muted rounded-md" />
    <Skeleton className="h-4 w-32 mx-auto mb-2 bg-muted rounded-md" />
    <Skeleton className="h-4 w-20 mx-auto bg-muted rounded-md" />
  </div>
);

export const StatsCardsClient = ({ stats }: StatsCardsClientProps) => {
  const [activeChartIndex, setActiveChartIndex] = useState<number | null>(null);
  const [clickedChartIndex, setClickedChartIndex] = useState<number | null>(
    null
  );
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 767px)");
    setIsSmallScreen(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => {
      setIsSmallScreen(e.matches);
      if (!e.matches) setClickedChartIndex(null);
    };

    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isSmallScreen && clickedChartIndex !== null) {
        const card = cardRefs.current[clickedChartIndex];
        if (card && !card.contains(event.target as Node)) {
          setClickedChartIndex(null);
        }
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [isSmallScreen, clickedChartIndex]);

  const handleCardInteraction = (index: number) => {
    if (isSmallScreen) {
      setClickedChartIndex(clickedChartIndex === index ? null : index);
    } else {
      setActiveChartIndex(index);
    }
  };

  return (
    <motion.div
      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-10 w-full"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: shouldReduceMotion ? 0 : 0.7 }}
    >
      {isSmallScreen && clickedChartIndex !== null && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-40"
          onClick={() => setClickedChartIndex(null)}
          aria-hidden="true"
        />
      )}

      {stats.length === 0
        ? Array.from({ length: 6 }).map((_, index) => (
            <SkeletonCard key={index} />
          ))
        : stats.map((stat, index) => (
            <div
              key={index}
              ref={(el: HTMLDivElement | null) => {
                cardRefs.current[index] = el; // بدون return
              }}
              className="relative"
            >
              <motion.div
                className="bg-card rounded-xl p-6 border border-border shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer flex flex-col items-center"
                role="button"
                tabIndex={0}
                onClick={() => handleCardInteraction(index)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    handleCardInteraction(index);
                  }
                }}
                onMouseEnter={() =>
                  !isSmallScreen && setActiveChartIndex(index)
                }
                onMouseLeave={() => !isSmallScreen && setActiveChartIndex(null)}
                whileHover={shouldReduceMotion ? {} : { scale: 1.03 }}
                aria-label={`نمایش نمودار ${stat.title}`}
              >
                <p className="text-3xl font-light text-primary mb-2">
                  <CountUp end={stat.value} duration={2} />
                </p>
                <p className="text-sm text-muted-foreground mb-1 text-center">
                  {stat.title}
                </p>
                <p
                  className={`text-sm font-light ${
                    stat.growth >= 0 ? "text-green-500" : "text-red-500"
                  }`}
                  aria-label={`رشد ${
                    stat.growth >= 0 ? "مثبت" : "منفی"
                  } ${Math.abs(stat.growth)} درصد`}
                >
                  {stat.growth >= 0 ? "↑" : "↓"} {Math.abs(stat.growth)}٪ نسبت
                  به هفته پیش
                </p>
              </motion.div>

              {(isSmallScreen
                ? clickedChartIndex === index
                : activeChartIndex === index) && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-full max-w-md z-50">
                  <div className="bg-background rounded-lg shadow-lg p-6">
                    <h3
                      className="text-lg font-light text-foreground mb-1"
                      id={`chart-title-${index}`}
                    >
                      {stat.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      نمودار عملکرد {stat.title} در هفته گذشته
                    </p>
                    <ResponsiveContainer width="100%" height={220}>
                      <LineChart
                        data={stat.chartData}
                        aria-labelledby={`chart-title-${index}`}
                      >
                        <CartesianGrid strokeDasharray="3 3" stroke="#4B5E6A" />
                        <XAxis dataKey="day" stroke="#A3B4BC" />
                        <YAxis stroke="#A3B4BC" />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "#1E293B",
                            color: "#E2E8F0",
                            borderRadius: 8,
                            border: "none",
                            boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                          }}
                        />
                        <Line
                          type="monotone"
                          dataKey="visits"
                          stroke="#D247BF"
                          strokeWidth={3}
                          dot={{ r: 4 }}
                          activeDot={{ r: 6 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              )}
            </div>
          ))}
    </motion.div>
  );
};
