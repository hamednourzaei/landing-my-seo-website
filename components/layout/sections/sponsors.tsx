
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
  { icon: "Trophy", name: "بهبود رتبه گوگل" },
  { icon: "Server", name: "۵۸۸ دامنه فعال روی " },
  { icon: "Globe", name: "پشتیبانی چندزبانه" },
  { icon: "LineChart", name: "بیش از ۱٬۴۵۰٬٠٠٠ بازدید" },
];

export const SponsorsSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref });
  const yOffset = useTransform(scrollYProgress, [0, 1], [0, -40]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  const [isLargeScreen, setIsLargeScreen] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 800);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const getDimensions = () => {
    let width;
    if (isLargeScreen) {
      if (window.innerWidth >= 1024) {
        width = Math.min(window.innerWidth * 1, 900);
      } else {
        width = Math.max(200, window.innerWidth < 900 ? 650 : 750);
      }
      const height = Math.max(150, width * 0.5);
      return { width, height };
    } else {
      width = Math.max(200, window.innerWidth * 0.5);
      const height = 450;
      return { width, height };
    }
  };

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

  const [currentAssignments, setAssignments] = useState<number[]>(
    Array.from({ length: features.length }, (_, i) => i)
  );

  const shuffleArray = (array: number[]) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  useEffect(() => {
    if (isLargeScreen) {
      const interval = setInterval(() => {
        setAssignments(shuffleArray(Array.from({ length: features.length }, (_, i) => i)));
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [isLargeScreen]);

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

  const edges = isLargeScreen && currentAssignments.length === features.length
    ? getEdges(basePositions, currentAssignments)
    : [];

  return (
    <section id="features" className="max-w-[90%] mx-auto font-kalameh py-10" ref={ref}>
      <motion.h1
        className="text-base sm:text-lg md:text-xl text-center mb-6 text-primary"
        style={{ y: yOffset, scale }}
      >
        چرا باید{" "}
        <span className="inline-block text-primary">
          TsarSEO
        </span>{" "}
        را انتخاب کنید؟
      </motion.h1>

      {isLargeScreen ? (
        <div
          className="relative mx-auto bg-muted/50  rounded-xl overflow-hidden hover:bg-background transition-all delay-75"
          style={{ width: `${width}px`, height: `${height}px` }}
        >
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
                  stroke="#af4c00"
                  strokeWidth="2"
                  strokeOpacity="0.7"
                />
              );
            })}
          </svg>

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
              <div className="flex items-center gap-2 px-3 py-2   rounded-lg bg-muted/50  overflow-hidden hover:bg-background transition-all delay-75 w-full max-w-[180px]">
                <Icon
                  name={icon as keyof typeof icons}
                  size={window.innerWidth < 900 ? 18 : 20}
                  color="hsl(var(--primary))"
                  className="ml-2"
                />
                <span className="text-muted-foreground whitespace-nowrap">{name}</span>
                {name === "بیش از ۱٬۴۵۰٬٠٠٠ بازدید" && (
                  <motion.span
                    className="inline-block w-2 h-2 bg-primary rounded-full"
                    animate={{
                      scale: [1, 1.5, 1],
                      boxShadow: [
                        "0 0 5px rgba(59,130,246,0.5)",
                        "0 0 15px rgba(59,130,246,0.9)",
                        "0 0 5px rgba(59,130,246,0.5)",
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
        <div
          className="relative mx-auto bg-muted/50 dark:bg-card rounded-xl overflow-hidden grid grid-cols-2 gap-4 p-4 hover:bg-background transition-all delay-75"
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
              <div className="flex items-center gap-2 px-3 py-2 bg-muted/50 dark:bg-card rounded-lg hover:bg-background transition-all delay-75 w-full max-w-[180px]">
                <Icon
                  name={icon as keyof typeof icons}
                  size={16}
                  color="hsl(var(--primary))"
                  className="ml-2"
                />
                <span className="text-muted-foreground whitespace-nowrap">{name}</span>
                {name === "بیش از ۱٬۴۵۰٬٠٠٠ بازدید" && (
                  <motion.span
                    className="inline-block w-2 h-2 bg-primary rounded-full"
                    animate={{
                      scale: [1, 1.5, 1],
                      boxShadow: [
                        "0 0 5px rgba(59,130,246,0.5)",
                        "0 0 15px rgba(59,130,246,0.9)",
                        "0 0 5px rgba(59,130,246,0.5)",
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
        <Button asChild className="bg-primary text-white px-6 py-3 rounded-xl text-sm sm:text-base hover:bg-primary/90">
          <a href="#contact">همین حالا شروع کنید</a>
        </Button>
      </div>
    </section>
  );
};

export default SponsorsSection;
