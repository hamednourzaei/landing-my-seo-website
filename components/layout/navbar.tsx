"use client";

import { ChevronsDown, Github, Menu, X } from "lucide-react";
import React, { useState, useCallback, useMemo, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "../ui/navigation-menu";
import { Button } from "../ui/button";
import { ToggleTheme } from "./toogle-theme";
import cn from "classnames";
import throttle from "lodash.throttle";
import debounce from "lodash.debounce";

interface Route {
  href: string;
  label: string;
}

interface Feature {
  title: string;
  description: string;
}

const ROUTE_LIST: Route[] = [
  { href: "#success-stories", label: "نظرات شما" },
  { href: "#features", label: "ویژگی‌های ما" },
  { href: "#contact", label: "تماس با ما" },
  { href: "#faq", label: "سوالات متداول" },
];

const FEATURE_LIST: Feature[] = [
  {
    title: "تحلیل هوشمند رقبا با AI",
    description: "به‌زودی با هوش مصنوعی TsarSEO، استراتژی رقبای خود را تحلیل کنید.",
  },
  {
    title: "ترافیک هدفمند محلی",
    description: "در آینده، بازدیدهای واقعی برای شهر یا منطقه دلخواهتان هدف‌گذاری می‌شوند.",
  },
  {
    title: "گزارش‌های ویدئویی سئو",
    description: "گزارش‌های سئو به‌صورت ویدئوهای کوتاه و جذاب، به‌زودی ارائه می‌شود.",
  },
];

const menuVariants = {
  closed: { x: "90%", opacity: 0 },
  open: { x: 0, opacity: 1, transition: { type: "spring", stiffness: 100, damping: 20 } },
};

const itemVariants = {
  closed: { opacity: 0, x: 20 },
  open: { opacity: 1, x: 0, transition: { delay: 0.1 } },
};

const useScrollHandler = () => {
  const [isScrolling, setIsScrolling] = useState(false);
  const lastScrollY = useRef(0);

  // تابع debounce برای مخفی کردن بوردر بعد از 2 ثانیه توقف
  const hideBorder = useCallback(
    debounce(() => {
      setIsScrolling(false);
    }, 2000),
    []
  );

  const handleScroll = useCallback(
    throttle(() => {
      const currentScrollY = window.scrollY;
      // اگر اسکرول به بالا یا پایین انجام شده، بوردر رو نشون بده
      if (Math.abs(currentScrollY - lastScrollY.current) > 5) {
        setIsScrolling(true);
        hideBorder(); 

      }
      lastScrollY.current = currentScrollY;
    }, 100),
    [hideBorder]
  );

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      handleScroll.cancel();
      hideBorder.cancel();
    };
  }, [handleScroll, hideBorder]);

  return isScrolling;
};

const useActiveHash = () => {
  const [activeHash, setActiveHash] = useState<string>(
    typeof window !== "undefined" ? window.location.hash : ""
  );

  useEffect(() => {
    const onHashChange = () => setActiveHash(window.location.hash);
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  return activeHash;
};

const SafeToggleTheme = React.memo(() => <ToggleTheme />);

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const headerControls = useAnimation();
  const isScrolling = useScrollHandler();
  const activeHash = useActiveHash();

  useEffect(() => {
    headerControls.start(isOpen ? "hidden" : "visible");
  }, [isOpen, headerControls]);

  const memoizedRouteList = useMemo(() => ROUTE_LIST, []);

  return (
    <motion.header
      className={cn(
        "sticky top-5 z-40 mx-auto w-[90%] md:w-[70%] lg:w-[75%] max-w-screen-xl rounded-2xl bg-card/90 px-4 py-2 shadow-inner transition-all duration-75",
        { "border border-orange-500": isScrolling }
      )}
      variants={{ visible: { opacity: 1, y: 0 }, hidden: { opacity: 0, y: -20 } }}
      initial="visible"
      animate={headerControls}
      aria-label="نوار ناوبری اصلی"
    >
      <div className="flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center text-lg font-normal"
          aria-label="صفحه اصلی TsarSEO"
        >
          <ChevronsDown
            className="mr-2 h-9 w-9 rounded-lg border border-secondary bg-gradient-to-tr from-primary via-primary/70 to-primary text-white"
            aria-hidden="true"
          />
          TsarSEO
        </Link>

        <div className="lg:hidden">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                className="p-0"
                aria-label={isOpen ? "بستن منو" : "باز کردن منو"}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={isOpen ? "close" : "open"}
                    initial={{ rotate: 0 }}
                    animate={{ rotate: isOpen ? 90 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                  </motion.div>
                </AnimatePresence>
              </Button>
            </SheetTrigger>

            <SheetContent
              side="right"
              className="w-[60%] rounded-l-2xl border-none bg-gray-100/50 backdrop-blur-md dark:bg-gray-900/50"
              dir="rtl"
              aria-describedby="mobile-menu-title"
            >
              <SheetHeader className="mb-6">
                <SheetTitle id="mobile-menu-title" className="flex items-center justify-center">
                  <Link href="/" className="flex items-center" aria-label="صفحه اصلی TsarSEO">
                    <ChevronsDown
                      className="ml-2 h-9 w-9 rounded-lg border border-secondary bg-gradient-to-tr from-primary via-primary/70 to-primary text-white"
                      aria-hidden="true"
                    />
                    TsarSEO
                  </Link>
                </SheetTitle>
              </SheetHeader>

              <AnimatePresence>
                {isOpen && (
                  <motion.nav
                    className="flex flex-col items-center gap-4 pt-32"
                    variants={menuVariants}
                    initial="closed"
                    animate="open"
                    exit="closed"
                    role="navigation"
                    aria-label="منوی موبایل"
                  >
                    {memoizedRouteList.map(({ href, label }) => (
                      <motion.div key={href} variants={itemVariants}>
                        <Button
                          onClick={() => setIsOpen(false)}
                          asChild
                          variant="ghost"
                          className={cn(
                            "w-full justify-center py-2 text-lg font-semibold transition-all",
                            activeHash === href ? "bg-primary/20 text-primary" : "hover:bg-primary/10"
                          )}
                          aria-current={activeHash === href ? "page" : undefined}
                        >
                          <Link href={href}>{label}</Link>
                        </Button>
                      </motion.div>
                    ))}
                    <motion.div variants={itemVariants}>
                      <SafeToggleTheme />
                    </motion.div>
                  </motion.nav>
                )}
              </AnimatePresence>
            </SheetContent>
          </Sheet>
        </div>

        <NavigationMenu dir="rtl" className="hidden lg:block mx-auto">
          <NavigationMenuList className="flex items-center gap-2">
            <NavigationMenuItem>
              <NavigationMenuTrigger className="bg-card text-base">
                ویژگی‌های آینده
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="grid w-[600px] grid-cols-2 gap-5 p-4">
                  <Image
                    src="/images/tsarseo-future-features.jpg"
                    alt="ویژگی‌های آینده TsarSEO"
                    className="h-full w-full rounded-md object-cover"
                    width={600}
                    height={600}
                    priority
                  />
                  <ul className="flex flex-col gap-2" role="list">
                    {FEATURE_LIST.map(({ title, description }) => (
                      <li
                        key={title}
                        className="rounded-md p-3 text-sm hover:bg-muted"
                        role="listitem"
                      >
                        <p className="mb-1 font-kalameh font-semibold leading-none text-foreground">
                          {title}
                        </p>
                        <p className="line-clamp-2 text-muted-foreground">{description}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>

            {memoizedRouteList.map(({ href, label }) => (
              <NavigationMenuItem key={href}>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Link
                    href={href}
                    className={cn(
                      "rounded-md px-3 py-1 text-base transition-all",
                      activeHash === href ? "bg-primary/10 text-primary font-bold" : "hover:bg-muted"
                    )}
                    aria-current={activeHash === href ? "page" : undefined}
                  >
                    {label}
                  </Link>
                </motion.div>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        <div className="hidden lg:flex items-center gap-2">
          <SafeToggleTheme />
          <Button
            asChild
            size="sm"
            variant="ghost"
            aria-label="مشاهده کد منبع در گیت‌هاب"
          >
            <Link href="https://github.com/hamednourzaei/landing-my-seo-website" target="_blank">
              <Github className="h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </motion.header>
  );
};

export default Navbar;