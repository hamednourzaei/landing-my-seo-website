"use client";

import  Icon  from "@/components/ui/icon";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
type IconName = "BarChart2" | "Users" | "Zap" | "Trophy" | "Server" | "Globe" | "CircleDot";

interface FeatureProps {
  icon: IconName;
  name: string;
}



const features: FeatureProps[] = [
  { icon: "BarChart2", name: "تحلیل پیشرفته سئو" },
  { icon: "Users", name: "بازدید انسانی" },
  { icon: "Zap", name: "تحلیل سریع و دقیق" },
  { icon: "Trophy", name: "بهبود رتبه گوگل" },
  { icon: "Server", name: "در ۵۸۸ سایت انلاین" },
  { icon: "Globe", name: "پشتیبانی چندزبانه" },
  { icon: "CircleDot", name: "۱ میلیون بازدید" },
];

export const SponsorsSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref });
  const yOffset = useTransform(scrollYProgress, [0, 1], [0, -40]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  const [windowSize, setWindowSize] = useState({ width: 900, height: 500 });
  const [isLargeScreen, setIsLargeScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;
      const isLarge = w >= 800;
      const width = isLarge
        ? w >= 1024
          ? Math.min(w * 0.9, 900)
          : Math.max(200, w < 900 ? 650 : 750)
        : Math.max(200, w * 0.9);
      const height = isLarge
        ? Math.max(150, width * 0.5)
        : Math.max(200, width * 0.6);
      setWindowSize({ width, height });
      setIsLargeScreen(isLarge);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const getFixedPositions = (width: number, height: number) => {
    const total = features.length;
    const centerX = width / 2;
    const centerY = height / 2;
    const itemWidth = 180;
    const itemHeight = 40;
    const margin = 46;
    const a = (width - itemWidth - 2 * margin) / 2;
    const b = (height - itemHeight - 2 * margin) / 2;
    const positions = [];

    for (let i = 0; i < total; i++) {
      const angle = (i / total) * 2 * Math.PI;
      let x = centerX + a * Math.cos(angle);
      let y = centerY + b * Math.sin(angle);
      x = Math.max(
        itemWidth / 2 + margin,
        Math.min(width - itemWidth / 2 - margin, x)
      );
      y = Math.max(
        itemHeight / 2 + margin,
        Math.min(height - itemHeight / 2 - margin, y)
      );
      positions.push({ x, y });
    }

    return positions;
  };

  const basePositions = isLargeScreen
    ? getFixedPositions(windowSize.width, windowSize.height)
    : [];

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
        setAssignments(
          shuffleArray(Array.from({ length: features.length }, (_, i) => i))
        );
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [isLargeScreen]);

  return (
    <section
      id="features"
      ref={ref}
      className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 font-kalameh font-light"
    >
      <motion.h1
        className="text-base sm:text-lg md:text-xl lg:text-2xl font-semibold text-center text-primary mb-8"
        style={{ y: yOffset, scale }}
      >
        را انتخاب کنید؟
        <span className="text-primary">TsarSEO</span> 
        چرا باید 

       
      </motion.h1>

      <div
        className="relative mx-auto rounded-xl overflow-hidden transition-all duration-75 bg-muted/10 dark:bg-card/50 shadow-lg shadow-orange-900/50"
        style={{
          width: isLargeScreen ? `${windowSize.width}px` : "100%",
          height: `${windowSize.height}px`,
        }}
      >
        {isLargeScreen && (
          <svg className="absolute inset-0 z-0" width="100%" height="100%">
            {basePositions.length === features.length &&
              features.map((_, i) => {
                const start = basePositions[currentAssignments[i]];
                const end =
                  basePositions[currentAssignments[(i + 1) % features.length]];
                return (
                  <motion.path
                    key={i}
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
        )}

        {isLargeScreen ? (
          features.map(({ icon, name }, index) => (
            <motion.div
              key={index}
              className="absolute flex items-center text-sm md:text-base font-light z-10"
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
              <div className="flex items-center gap-2 px-4 py-2 bg-muted/50 dark:bg-card rounded-lg hover:bg-background transition-all duration-75 w-full min-w-[160px] max-w-[250px]">
                <Icon
                  name={icon}
                  size={18}
                  color="hsl(var(--primary))"
                  className="ml-2"
                />
                <span className="text-muted-foreground whitespace-nowrap">
                  {name}
                </span>
              </div>
            </motion.div>
          ))
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 gap-4 justify-items-center p-4">
            {features.map(({ icon, name }, index) => (
              <div
                key={index}
                className="flex items-center gap-2 px-4 py-2 bg-muted/50 dark:bg-card rounded-lg w-full max-w-[250px] hover:bg-background transition-all duration-75"
              >
                <Icon
                  name={icon}
                  size={18}
                  color="hsl(var(--primary))"
                  className="ml-2"
                />
                <span className="text-muted-foreground text-sm sm:text-base whitespace-nowrap">
                  {name}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default SponsorsSection;
