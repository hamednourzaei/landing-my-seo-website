import { motion } from "framer-motion";
import { SheetDescription, SheetHeader, SheetTitle } from "../ui/sheet";
import { Button } from "../ui/button";
import { ChevronsDown } from "lucide-react";
import Link from "next/link";
import cn from "classnames";
import React from "react";
import { SafeToggleTheme } from "./SafeToggleTheme";
import { ROUTE_LIST } from "./navbar";
import { useActiveHash } from "@/lib/use-active-hash";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

interface MobileMenuProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, setIsOpen }) => {
  const activeHash = useActiveHash();

  const handleMenuItemClick = () => {
    setIsOpen(false);
  };

  return (
    <>
      {/* هدر همیشه نمایش داده می‌شود، بدون انیمیشن محو شدن */}
      <SheetHeader className="mb-6 mt-12">
        <VisuallyHidden>
          <SheetTitle>منوی موبایل TsarSEO</SheetTitle>
          <SheetDescription>
            منوی ناوبری برای دسترسی به بخش‌های مختلف وب‌سایت TsarSEO
          </SheetDescription>
        </VisuallyHidden>

        <div className="flex items-center justify-center">
          <Link href="/" className="flex items-center" aria-label="صفحه اصلی TsarSEO">
            <ChevronsDown
              className="ml-2 h-9 w-9 rounded-lg border border-secondary bg-gradient-to-tr from-primary via-primary/70 to-primary text-white"
              aria-hidden="true"
            />
            TsarSEO
          </Link>
        </div>
      </SheetHeader>

      <nav
        className={cn("flex flex-col items-center gap-4 pt-32 mobile-menu", {
          "mobile-menu-open": isOpen,
        })}
        role="navigation"
        aria-label="منوی موبایل"
      >
        {ROUTE_LIST.map(({ href, label }, index) => (
          <div
            key={href}
            className="mobile-menu-item"
            style={{ transitionDelay: `${index * 0.05}s` }}
          >
            <Button
              onClick={handleMenuItemClick}
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
          </div>
        ))}
        <div className="mobile-menu-item">
          <SafeToggleTheme />
        </div>
      </nav>
    </>
  );
};
