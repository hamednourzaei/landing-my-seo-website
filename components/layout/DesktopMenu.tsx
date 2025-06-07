import { NavigationMenu, NavigationMenuItem, NavigationMenuList, NavigationMenuTrigger, NavigationMenuContent } from "../ui/navigation-menu";
import Link from "next/link";
import Image from "next/image";
import cn from "classnames";
import React from "react";
import { SafeToggleTheme } from "./SafeToggleTheme";
import { ROUTE_LIST, FEATURE_LIST } from "./navbar";
import { useActiveHash } from "@/lib/use-active-hash";

export const DesktopMenu: React.FC = () => {
  const activeHash = useActiveHash();

  return (
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

        {ROUTE_LIST.map(({ href, label }) => (
          <NavigationMenuItem key={href}>
            <Link
              href={href}
              className={cn(
                "inline-block rounded-md px-3 py-2 text-sm font-semibold no-underline outline-none transition-colors hover:bg-muted focus:bg-muted",
                activeHash === href ? "bg-primary/20 text-primary" : "text-foreground"
              )}
              aria-current={activeHash === href ? "page" : undefined}
            >
              {label}
            </Link>
          </NavigationMenuItem>
        ))}

        <NavigationMenuItem>
          <SafeToggleTheme />
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};