"use client";

import { ChevronsDown, Github, Menu, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { Separator } from "../ui/separator";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "../ui/navigation-menu";
import { Button } from "../ui/button";
import { ToggleTheme } from "./toogle-theme";

const routeList = [
  { href: "#success-stories", label: "نظرات شما" },
  { href: "#features", label: "ویژگی‌های ما" },
  { href: "#contact", label: "تماس با ما" },
  { href: "#faq", label: "سوالات متداول" },
];

const featureList = [
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

// انیمیشن برای منوی موبایل
const menuVariants = {
  closed: {
    y: "-100%",
    opacity: 0,
    transition: { duration: 1.4, ease: "easeInOut" },
  },
  open: {
    y: 0,
    opacity: 1,
    transition: { duration: 1.4, ease: "easeInOut" },
  },
};

// انیمیشن برای آیتم‌های منو
const itemVariants = {
  closed: { opacity: 0, y: 20 },
  open: { opacity: 1, y: 0, transition: { duration: 0.2 } },
};

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeHash, setActiveHash] = useState<string>("");

  useEffect(() => {
    setActiveHash(window.location.hash);
    const onHashChange = () => setActiveHash(window.location.hash);
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  return (
    <header className="shadow-inner font-kalameh font-extrabold bg-opacity-90 w-[90%] md:w-[70%] lg:w-[75%] lg:max-w-screen-xl top-5 mx-auto sticky border border-secondary z-40 rounded-2xl flex justify-between items-center p-2 bg-card">
      <Link href="/" className="font-bold text-lg flex items-center">
        <ChevronsDown className="bg-gradient-to-tr border-secondary from-primary via-primary/70 to-primary rounded-lg w-9 h-9 mr-2 border text-white" />
        TsarSEO
      </Link>

      {/* Mobile */}
      <div className="flex items-center lg:hidden">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" className="p-0">
              <AnimatePresence mode="wait">
                <motion.div
                  key={isOpen ? "close" : "open"}
                  initial={{ rotate: 0 }}
                  animate={{ rotate: isOpen ? 90 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </motion.div>
              </AnimatePresence>
            </Button>
          </SheetTrigger>

          <SheetContent
            side="top"
            className="w-full h-full bg-gray-00/50 backdrop-blur-md border-none rounded-b-2xl z-50"
          >
            <SheetHeader className="mb-6 relative z-10">
              <SheetTitle className="flex items-center justify-center">
                <Link href="/" className="flex items-center">
                  <ChevronsDown className="bg-gradient-to-tr border-secondary from-primary via-primary/70 to-primary rounded-lg w-9 h-9 mr-2 border text-white" />
                  TsarSEO
                </Link>
              </SheetTitle>
            </SheetHeader>

            <motion.div
              className="flex flex-col items-center gap-4 relative z-10"
              variants={menuVariants}
              initial="closed"
              animate="open"
              exit="closed"
            >
              {routeList.map(({ href, label }, index) => (
                <motion.div
                  key={href}
                  variants={itemVariants}
                  initial="closed"
                  animate="open"
                  transition={{ delay: index * 0.1 }}
                >
                  <Button
                    onClick={() => setIsOpen(false)}
                    asChild
                    variant="ghost"
                    className={`text-lg font-semibold w-full justify-center py-2 ${
                      activeHash === href ? "bg-primary/20 text-primary" : ""
                    } hover:bg-primary/10 transition-all`}
                  >
                    <Link href={href}>{label}</Link>
                  </Button>
                </motion.div>
              ))}
              <motion.div variants={itemVariants} transition={{ delay: routeList.length * 0.1 }}>
                <ToggleTheme />
              </motion.div>
            </motion.div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop */}
      <NavigationMenu dir="rtl" className="hidden lg:block mx-auto">
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger className="bg-card text-base">
              ویژگی‌های آینده
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <div className="grid w-[600px] grid-cols-2 gap-5 p-4">
                <Image
                  rel="preload"
                  src="/images/tsarseo-future-features.jpg"
                  alt="ویژگی‌های آینده TsarSEO"
                  className="h-full w-full rounded-md object-cover"
                  width={600}
                  height={600}
                />
                <ul className="flex flex-col gap-2">
                  {featureList.map(({ title, description }) => (
                    <li
                      key={title}
                      className="rounded-md p-3 text-sm hover:bg-muted"
                    >
                      <p className="mb-1 font-kalameh font-semibold leading-none text-foreground">
                        {title}
                      </p>
                      <p className="line-clamp-2 text-muted-foreground">
                        {description}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>

          {routeList.map(({ href, label }) => (
            <NavigationMenuItem key={href}>
              <motion.div
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
              >
                <Link
                  href={href}
                  className={`text-base px-3 py-1 rounded-md transition-all ${
                    activeHash === href
                      ? "bg-primary/10 text-primary font-bold"
                      : "hover:bg-muted"
                  }`}
                >
                  {label}
                </Link>
              </motion.div>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>

      <div className="hidden lg:flex items-center">
        <ToggleTheme />
        <Button asChild size="sm" variant="ghost" aria-label="مشاهده در گیت‌هاب">
          <Link
            aria-label="مشاهده در گیت‌هاب"
            href="https://github.com/hamednourzaei/landing-my-seo-website"
            target="_blank"
          >
            <Github className="size-5" />
          </Link>
        </Button>
      </div>
    </header>
  );
};