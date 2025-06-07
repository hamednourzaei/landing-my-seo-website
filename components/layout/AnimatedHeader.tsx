import { motion } from "framer-motion";
import cn from "classnames";
import React, { useState, useEffect } from "react";

const headerVariants = {
  visible: { opacity: 1 },
  hidden: { opacity: 0, transition: { duration: 0.2 } },
};

interface AnimatedHeaderProps {
  isScrolling: boolean;
  isOpen: boolean;
  children: React.ReactNode;
}

export const AnimatedHeader: React.FC<AnimatedHeaderProps> = ({
  isScrolling,
  isOpen,
  children,
}) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <motion.header
      className={cn(
        "fixed top-5 left-1/2  -translate-x-1/2 z-40 w-[90%] md:w-[70%] lg:w-[75%] max-w-screen-xl rounded-2xl bg-card/90 px-4 py-2 shadow-inner transition-all duration-75" ,
        {
          "border border-orange-500": isScrolling,
          "pointer-events-none": isOpen, // غیر فعال شدن کلیک روی هدر وقتی منو بازه
        }
      )}
      variants={isMobile ? undefined : headerVariants}
      initial="visible"
      animate={isOpen ? "hidden" : "visible"}
      style={{ willChange: "border-color" }}
      aria-label="نوار ناوبری اصلی"
    >
      {children}
    </motion.header>
  );
};
