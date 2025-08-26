"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { ChevronsDown } from "lucide-react";
import { AnimatedHeader } from "./AnimatedHeader";
import { MenuButton } from "./MenuButton";
import { MobileMenu } from "./MobileMenu";
import { DesktopMenu } from "./DesktopMenu";
import { useScrollHandler } from "./useScrollHandler";
import { Sheet, SheetTrigger, SheetContent } from "../ui/sheet";
import { motion, AnimatePresence } from "framer-motion";
import Loader from "@/components/common/Loader";

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
  { href: "/#pricing", label: "تعرفه‌ها" },
  { href: "/#contact", label: "تماس با ما" },
  { href: "/#faq", label: "سوالات متداول" },
  { href: "/calculate-profits", label: "محاسبه درآمد" },
  { href: "/news", label: "اخبار" },
];

export const FEATURE_LIST: Feature[] = [
  {
    title: "محاسبه درآمد",
    description: "شبیه‌ساز پیشرفته درآمد Google AdSense باموفقیت ایجاد شد.",
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
  const [isLoading, setIsLoading] = useState(false);
  const isScrolling = useScrollHandler();
  const router = useRouter();
  const pathname = usePathname();

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
  };

  const openIncomeModal = () => {
    setIsIncomeModalOpen(true);
    setIsOpen(false);
  };

  // تابع برای مدیریت کلیک روی لینک‌ها
  const handleLinkClick = (href: string) => {
    setIsLoading(true); // فعال کردن لودر برای همه لینک‌ها
    router.push(href);
    // تنظیم زمان لودر: کوتاه‌تر برای لینک‌های هش‌دار، طولانی‌تر برای URLهای کامل
    const timeoutDuration = href.startsWith("/#") ? 2000 : 2000;
    setTimeout(() => {
      setIsLoading(false);
    }, timeoutDuration);
  };

  // تولید داده‌های ساختارمند BreadcrumbList
  const getBreadcrumbList = () => {
    const breadcrumbItems = [
      {
        "@type": "ListItem",
        position: 1,
        item: {
          "@id": "https://tsarseo.online",
          name: "خانه",
        },
      },
    ];

    // فقط در صورتی که pathname برابر با "/" نباشد، آیتم دوم رو اضافه کن
    if (pathname !== "/") {
      const currentRoute = ROUTE_LIST.find(
        (route) =>
          route.href === pathname || route.href.split("#")[0] === pathname
      );
      const currentPageName = currentRoute
        ? currentRoute.label
        : pathname.split("/").pop() || "صفحه";

      breadcrumbItems.push({
        "@type": "ListItem",
        position: 2,
        item: {
          "@id": `https://tsarseo.online${pathname}`,
          name: currentPageName,
        },
      });
    }

    return {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "@id": "https://tsarseo.online/#breadcrumb",
      itemListElement: breadcrumbItems,
    };
  };

  return (
    <>
      {/* اضافه کردن JSON-LD برای Breadcrumbs */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(getBreadcrumbList()),
        }}
      />
      {/* نمایش لودر به‌صورت شرطی */}
      {isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            background: "rgba(0, 0, 0, 0.5)",
            zIndex: 1000,
          }}
        >
          <Loader />
        </motion.div>
      )}
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
                  onClick={() => handleLinkClick("/")}
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
                      <MobileMenu
                        isOpen={isOpen}
                        setIsOpen={setIsOpen}
                        onLinkClick={handleLinkClick}
                      />
                    </SheetContent>
                  </Sheet>
                </div>
                <DesktopMenu onLinkClick={handleLinkClick} />
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
            <MobileMenu
              isOpen={isOpen}
              setIsOpen={setIsOpen}
              onLinkClick={handleLinkClick}
            />
          </SheetContent>
        </Sheet>
      )}
    </>
  );
};

export default Navbar;
