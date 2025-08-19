"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ChevronsDown } from "lucide-react";
import { AnimatedHeader } from "./AnimatedHeader";
import { MenuButton } from "./MenuButton";
import { MobileMenu } from "./MobileMenu";
import { DesktopMenu } from "./DesktopMenu";
import { useScrollHandler } from "./useScrollHandler";

import { Sheet, SheetTrigger, SheetContent } from "../ui/sheet";
import { motion, AnimatePresence } from "framer-motion";

interface Route {
  href: string;
  label: string;
}

interface Feature {
  title: string;
  description: string;
}

export const ROUTE_LIST: Route[] = [
  { href: "/#success-stories", label: "نظرات شما" },
  { href: "/#features", label: "ویژگی‌های ما" },
  { href: "/#contact", label: "تماس با ما" },
  { href: "/#faq", label: "سوالات متداول" },
  { href: "/calculate-profits", label: "محاسبه درآمد" },
  { href: "/news", label: "اخبار" },
];

export const FEATURE_LIST: Feature[] = [
  {
    title: "محاسبه درآمد",
    description: " شبیه‌ساز پیشرفته درآمد  Google AdSense باموفقیت ایجاد شد.",
  },
  {
    title: "ترافیک هدفمند محلی",
    description:
      "در آینده، بازدیدهای واقعی برای شهر یا منطقه دلخواهتان هدف‌گذاری می‌شوند.",
  },
  {
    title: "گزارش‌های ویدئویی سئو",
    description:
      "گزارش‌های سئو به‌صورت ویدئوهای کوتاه و جذاب، به‌زودی ارائه می‌شود.",
  },
];

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isIncomeModalOpen, setIsIncomeModalOpen] = useState(false);
  const isScrolling = useScrollHandler();

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
  };

  const openIncomeModal = () => {
    setIsIncomeModalOpen(true);
    setIsOpen(false);
  };

  return (
    <>
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            key="animated-header"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
          >
            <AnimatedHeader isScrolling={isScrolling} isOpen={isOpen}>
              <div className="flex items-center justify-between">
                <Link
                  href="/"
                  className="flex items-center text-lg font-normal"
                  aria-label="صفحه اصلی TsarSEO"
                  passHref
                >
                  <ChevronsDown
                    className="mr-2 h-9 w-9 rounded-lg border border-secondary bg-gradient-to-tr from-primary via-primary/70 to-primary text-white"
                    aria-hidden="true"
                  />
                  TsarSEO
                </Link>

                <div className="lg:hidden">
                  <Sheet open={isOpen} onOpenChange={handleOpenChange}>
                    <SheetTrigger asChild>
                      <div className="relative z-50">
                        <MenuButton isOpen={isOpen} />
                      </div>
                    </SheetTrigger>
                    <SheetContent
                      side="right"
                      dir="rtl"
                      aria-describedby="mobile-menu-description"
                      className="z-50 w-[60%] rounded-l-2xl border-none bg-gray-100/50 backdrop-blur-md dark:bg-gray-900/50"
                    >
                      <MobileMenu isOpen={isOpen} setIsOpen={setIsOpen} />
                    </SheetContent>
                  </Sheet>
                </div>

                <DesktopMenu />
              </div>
            </AnimatedHeader>
          </motion.div>
        )}
      </AnimatePresence>

      {isOpen && (
        <Sheet open={isOpen} onOpenChange={handleOpenChange}>
          <SheetContent
            side="right"
            dir="rtl"
            aria-describedby="mobile-menu-description"
            className="z-50 w-[60%] rounded-l-2xl border-none bg-gray-100/50 backdrop-blur-md dark:bg-gray-900/50"
          >
            <MobileMenu isOpen={isOpen} setIsOpen={setIsOpen} />
          </SheetContent>
        </Sheet>
      )}
    </>
  );
};

export default Navbar;
