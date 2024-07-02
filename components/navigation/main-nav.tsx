"use client";

import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  NavigationMenu as NavigationMenuWrapper,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import Image from "next/image";
import { IconDownload } from "@tabler/icons-react";
const aboutData: { title: string; href: string; description: string }[] = [
  {
    title: "隱私權政策",
    href: "/privacy",
    description:
      "為了讓您能夠安心的使用西寧小丸子下訂單，特此向您說明本網站或是APP的隱私權保護政策",
  },
  {
    title: "關於西寧市場",
    href: "/about-us/",
    description: "了解西寧市場，與歡迎洽詢廠商合作。",
  },
];
const appData: {
  iconSrc: string;
  alt: string;
  text: string;
  link: string;
  linkText: string;
}[] = [
  {
    iconSrc: "/img/appdownload_apple.png",
    alt: "App Store",
    text: "從 App Store 下載",
    link: "https://apps.apple.com/app/apple-store/idXXXXXXXXX",
    linkText: "前往 App Store",
  },
  {
    iconSrc: "/img/appdownload_google.png",
    alt: "Google Play",
    text: "從 Google Play 下載",
    link: "https://play.google.com/store/apps/details?id=com.example",
    linkText: "前往 Google Play",
  },
];
export function NavigationMenu({ brandListLogoData }: any) {
  return (
    <NavigationMenuWrapper>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="font-light">
            官方 APP
          </NavigationMenuTrigger>
          <NavigationMenuContent className="bg-black text-white">
            <ul className="grid p-4 md:min-w-[400px] lg:max-w-[600px] gap-4">
              {appData.map((app, index) => (
                <a
                  href={app.link}
                  key={index}
                  className="flex items-center  justify-between pl-2 pr-4"
                >
                  <div className="flex items-center">
                    <Image
                      src={app.iconSrc}
                      alt={app.alt}
                      width={100}
                      height={60}
                      className="flex-shrink-0 max-h-[60px] object-cover overflow-hidden"
                    />
                    <div className="ml-4">
                      <p className="text-sm">{app.text}</p>
                      <p className="text-xs font-extralight">{app.linkText}</p>
                    </div>
                  </div>
                  <IconDownload stroke={1} />
                </a>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="font-light">
            關於西寧市場
          </NavigationMenuTrigger>
          <NavigationMenuContent className="bg-black text-white font-extralight">
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-1 lg:max-w-[600px] ">
              {aboutData.map((component) => (
                <ListItem
                  key={component.title}
                  title={component.title}
                  href={component.href}
                >
                  {component.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/faq" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              會員權益
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenuWrapper>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 group rounded-[16px] p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground group-hover:text-accent-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
