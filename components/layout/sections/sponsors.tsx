
"use client";

import { Icon } from "@/components/ui/icon";
import { motion, useScroll, useTransform } from "framer-motion";
import { icons } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRef, useState, useEffect } from "react";

interface FeatureProps {
  icon: string;
  name: string;
}

const features: FeatureProps[] = [
  { icon: "BarChart2", name: "گزارش‌های پیشرفته سئو" },
  { icon: "Users", name: "ترافیک واقعی انسانی" },
  { icon: "Zap", name: "تحلیل سریع و دقیق" },
  { icon: "LineChart", name: "بیش از ۱٬۴۵۰٬٠٠٠ بازدید" },
  { icon: "Server", name: "۵۸۸ دامنه فعال روی TsarSEO" },
  { icon: "Globe", name: "پشتیبانی چندزبانه" },
  { icon: "Trophy", name: "بهبود رتبه گوگل" },
];

export const SponsorsSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref });
  const yOffset = useTransform(scrollYProgress, [0, 1], [0, -40]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  // تشخیص عرض صفحه
  const [isLargeScreen, setIsLargeScreen] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 800);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // تنظیم عرض و ارتفاع بر اساس عرض صفحه
  const getDimensions = () => {
    let width;
    if (isLargeScreen) {
      if (window.innerWidth >= 1024) {
        // برای پی‌سی: 90% عرض صفحه، حداکثر ۹۰۰px
        width = Math.min(window.innerWidth * 0.9, 900);
      } else {
        // برای ۸۰۰ تا ۱۰۲۴px
        width = Math.max(200, window.innerWidth < 900 ? 650 : 750);
      }
      const height = Math.max(150, width * 0.53);
      return { width, height };
    } else {
      // برای <۸۰۰px: عرض دقیقاً ۹۰٪ صفحه
      width = Math.max(200, window.innerWidth * 0.6);
      const height = 360; // ارتفاع ثابت برای گرید ۴+۳
      return { width, height };
    }
  };

  // محاسبه ۷ موقعیت با حاشیه برای ≥۸۰۰px
  const getFixedPositions = (width: number, height: number) => {
    const total = features.length;
    const centerX = width / 2;
    const centerY = height / 2;
    const itemWidth = 180;
    const itemHeight = 40;
    const margin = 50;
    const a = (width - itemWidth - 2 * margin) / 2;
    const b = (height - itemHeight - 2 * margin) / 2;
    const positions = [];

    for (let i = 0; i < total; i++) {
      const angle = (i / total) * 2 * Math.PI;
      let x = centerX + a * Math.cos(angle);
      let y = centerY + b * Math.sin(angle);
      x = Math.max(itemWidth / 2 + margin, Math.min(width - itemWidth / 2 - margin, x));
      y = Math.max(itemHeight / 2 + margin, Math.min(height - itemHeight / 2 - margin, y));
      positions.push({ x, y });
    }

    return positions;
  };

  const { width, height } = getDimensions();
  const basePositions = isLargeScreen ? getFixedPositions(width, height) : [];

  // تخصیص اولیه آرایه اندیس‌ها برای ≥۸۰۰px
  const [currentAssignments, setAssignments] = useState<number[]>(
    Array.from({ length: features.length }, (_, i) => i)
  );

  // تابع شافل برای ≥۸۰۰px
  const shuffleArray = (array: number[]) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  // به‌روزرسانی تصادفی برای ≥۸۰۰px
  useEffect(() => {
    if (isLargeScreen) {
      const interval = setInterval(() => {
        setAssignments(shuffleArray(Array.from({ length: features.length }, (_, i) => i)));
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [isLargeScreen]);

  // پیدا کردن جفت‌های نزدیک برای خطوط در ≥۸۰۰px
  const getEdges = (positions: { x: number; y: number }[], assignments: number[]) => {
    const edges: [number, number][] = [];
    const used = new Set<number>();

    for (let i = 0; i < features.length; i++) {
      if (used.has(i)) continue;
      let minDist = Infinity;
      let closest = -1;

      const posI = positions[assignments[i]];
      for (let j = 0; j < features.length; j++) {
        if (i === j || used.has(j)) continue;
        const posJ = positions[assignments[j]];
        const dist = Math.sqrt((posI.x - posJ.x) ** 2 + (posI.y - posJ.y) ** 2);
        if (dist < minDist) {
          minDist = dist;
          closest = j;
        }
      }

      if (closest !== -1) {
        edges.push([i, closest]);
        used.add(i);
        used.add(closest);
      }
    }

    const remaining = features.map((_, i) => i).filter((i) => !used.has(i));
    if (remaining.length === 1) {
      let minDist = Infinity;
      let closest = -1;
      const posI = positions[assignments[remaining[0]]];
      for (let j = 0; j < features.length; j++) {
        if (remaining[0] === j) continue;
        const posJ = positions[assignments[j]];
        const dist = Math.sqrt((posI.x - posJ.x) ** 2 + (posI.y - posJ.y) ** 2);
        if (dist < minDist) {
          minDist = dist;
          closest = j;
        }
      }
      if (closest !== -1) edges.push([remaining[0], closest]);
    }

    return edges;
  };

  const edges = isLargeScreen && currentAssignments.length === features.length ? getEdges(basePositions, currentAssignments) : [];

  return (
    <section id="features" className="max-w-[90%] mx-auto font-kalameh py-10" ref={ref}>
      <motion.h1
        className="text-base sm:text-lg md:text-xl text-center mb-6"
        style={{ y: yOffset, scale }}
      >
        چرا باید{" "}
        <span className="inline-block text-transparent bg-gradient-to-r from-[#D247BF] to-blue-900 bg-clip-text">
          TsarSEO
        </span>{" "}
        را انتخاب کنید؟
      </motion.h1>

      {isLargeScreen ? (
        // باکس جابه‌جایی برای ≥۸۰۰px
        <div
          className="relative mx-auto bg-gradient-to-b from-gray-900/50 to-gray-800/50 rounded-xl overflow-hidden"
          style={{ width: `${width}px`, height: `${height}px` }}
        >
          {/* خطوط اتصال */}
          <svg className="absolute inset-0 z-0" width="100%" height="100%">
            {edges.map(([i, j], idx) => {
              const start = basePositions[currentAssignments[i]];
              const end = basePositions[currentAssignments[j]];
              return (
                <motion.path
                  key={idx}
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1, ease: "easeInOut" }}
                  d={`M${start.x},${start.y} L${end.x},${end.y}`}
                  stroke="white"
                  strokeWidth="2"
                  strokeOpacity="0.7"
                />
              );
            })}
          </svg>

          {/* آیتم‌ها */}
          {features.map(({ icon, name }, index) => (
            <motion.div
              key={index}
              className="absolute flex items-center text-xs sm:text-sm md:text-base font-sans font-semibold z-10"
              animate={
                currentAssignments[index] !== undefined
                  ? {
                      x: basePositions[currentAssignments[index]].x - 90,
                      y: basePositions[currentAssignments[index]].y - 20,
                    }
                  : { x: 0, y: 0 }
              }
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              whileHover={{ scale: 1.2, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
            >
              <div className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-blue-900/60 to-purple-900/60 backdrop-blur-md border border-white/10 rounded-lg shadow-[0_0_15px_rgba(56,189,248,0.7)] hover:shadow-[0_0_20px_rgba(56,189,248,0.9)] transition-all duration-300">
                <Icon
                  name={icon as keyof typeof icons}
                  size={window.innerWidth < 900 ? 18 : 20}
                  color="white"
                  className="ml-2 drop-shadow-[0_0_10px_rgba(56,189,248,0.7)]"
                />
                <span className="text-white whitespace-nowrap">{name}</span>
                {name === "بیش از ۱٬۴۵۰٬٠٠٠ بازدید" && (
                  <motion.span
                    className="inline-block w-2 h-2 bg-green-500 rounded-full"
                    animate={{
                      scale: [1, 1.5, 1],
                      boxShadow: [
                        "0 0 5px rgba(34,197,94,0.5)",
                        "0 0 15px rgba(34,197,94,0.9)",
                        "0 0 5px rgba(34,197,94,0.5)",
                      ],
                    }}
                    transition={{ duration: 1.2, repeat: Infinity }}
                  />
                )}
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        // باکس دو ستونی برای <۸۰۰px
        <div
          className="relative mx-auto bg-gradient-to-b from-gray-900/50 to-gray-800/50 rounded-xl overflow-hidden grid grid-cols-2 gap-4 p-4"
          style={{ width: `${width}px`, height: `${height}px` }}
        >
          {features.map(({ icon, name }, index) => (
            <motion.div
              key={index}
              className={`flex items-center text-xs sm:text-sm font-sans font-semibold ${
                index === 6 ? "col-span-2 flex justify-center" : ""
              }`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.2, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
            >
              <div className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-blue-900/60 to-purple-900/60 backdrop-blur-md border border-white/10 rounded-lg shadow-[0_0_15px_rgba(56,189,248,0.7)] hover:shadow-[0_0_20px_rgba(56,189,248,0.9)] transition-all duration-300 w-full max-w-[180px]">
                <Icon
                  name={icon as keyof typeof icons}
                  size={16}
                  color="white"
                  className="ml-2 drop-shadow-[0_0_10px_rgba(56,189,248,0.7)]"
                />
                <span className="text-white whitespace-nowrap">{name}</span>
                {name === "بیش از ۱٬۴۵۰٬٠٠٠ بازدید" && (
                  <motion.span
                    className="inline-block w-2 h-2 bg-green-500 rounded-full"
                    animate={{
                      scale: [1, 1.5, 1],
                      boxShadow: [
                        "0 0 5px rgba(34,197,94,0.5)",
                        "0 0 15px rgba(34,197,94,0.9)",
                        "0 0 5px rgba(34,197,94,0.5)",
                      ],
                    }}
                    transition={{ duration: 1.2, repeat: Infinity }}
                  />
                )}
              </div>
            </motion.div>
          ))}
        </div>
      )}

      <div className="text-center mt-8">
        <Button asChild className="bg-gradient-to-r from-[#D247BF] to-blue-900 px-6 py-3 rounded-xl text-sm sm:text-base">
          <a href="#contact">همین حالا شروع کنید</a>
        </Button>
      </div>
    </section>
  );
};

export default SponsorsSection;
