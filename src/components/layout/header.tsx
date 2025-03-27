// src/components/layout/header.tsx
"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { 
  NavigationMenu, 
  NavigationMenuContent, 
  NavigationMenuItem, 
  NavigationMenuLink, 
  NavigationMenuList, 
  NavigationMenuTrigger,
  navigationMenuTriggerStyle
} from "@/components/ui/navigation-menu";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Menu } from "lucide-react";

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a"> & {
    title: string;
  }
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-slate-100 focus:bg-slate-100",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-slate-500">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";

export function Header() {
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [isOpen, setIsOpen] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const mobileLinks = [
    { href: "#services", label: "Services" },
    { href: "#case-studies", label: "Case Studies" },
    { href: "#hsec", label: "HSEC" },
    { href: "#news", label: "News" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <header className={cn(
      "fixed top-0 w-full z-50 transition-all duration-200", 
      isScrolled 
        ? "bg-white/80 backdrop-blur-md border-b border-slate-200 py-3" 
        : "bg-white py-4"
    )}>
      <div className="container mx-auto flex items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center z-10">
          {/* Placeholder for logo - replace with your actual logo path */}
          <Image 
            src="/images/logo.png" 
            alt="HeliCheck Logo" 
            width={180} 
            height={40} 
            className="h-8 w-auto sm:h-10"
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex md:items-center md:space-x-4">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Services</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-3 p-6 w-[400px] md:w-[500px] lg:w-[600px] grid-cols-2">
                    <li className="col-span-2">
                      <NavigationMenuLink asChild>
                        <a
                          className="flex h-full w-full select-none flex-col justify-end rounded-md bg-primary p-6 no-underline outline-none focus:shadow-md"
                          href="#helicopter-em-surveys"
                        >
                          <div className="mb-2 mt-4 text-lg font-medium text-white">Helicopter EM Surveys</div>
                          <p className="text-sm leading-tight text-white/90">
                            High-resolution aerial electromagnetic surveys for mineral exploration using our advanced helicopter platforms.
                          </p>
                        </a>
                      </NavigationMenuLink>
                    </li>
                    <ListItem href="#ground-surveys" title="Ground Surveys">
                      Comprehensive ground-based geophysical surveys for detailed site investigation.
                    </ListItem>
                    <ListItem href="#data-processing" title="Data Processing">
                      Advanced processing and interpretation of geophysical data for actionable insights.
                    </ListItem>
                    <ListItem href="#consulting" title="Consulting">
                      Expert geophysical consulting services for exploration planning and strategy.
                    </ListItem>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="#case-studies" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Case Studies
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="#hsec" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    HSEC
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="#news" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    News
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="#contact" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Contact
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          <Button 
            size="lg" 
            variant="brand"
            className="hidden md:inline-flex"
          >
            Book a Survey
          </Button>
        </div>

        {/* Mobile menu - Drawer implementation */}
        <Drawer direction="bottom" open={isOpen} onOpenChange={setIsOpen}>
          <DrawerTrigger asChild>
            <button 
              className="flex md:hidden items-center justify-center z-10 w-10 h-10"
              aria-label="Open menu"
            >
              <Menu className="h-6 w-6 text-slate-900" />
            </button>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader className="text-center">
              <DrawerTitle className="sr-only">Navigation Menu</DrawerTitle>
            </DrawerHeader>
            <div className="px-4 py-2">
              <nav className="flex flex-col">
                {mobileLinks.map((link) => (
                  <DrawerClose asChild key={link.href}>
                    <Link 
                      href={link.href}
                      className="py-3 text-lg font-medium text-slate-900 hover:text-[#0171E3]"
                    >
                      {link.label}
                    </Link>
                  </DrawerClose>
                ))}
                <div className="mt-5 pt-3">
                  <DrawerClose asChild>
                    <Button variant="brand" size="lg" className="w-full">
                      Book a Survey
                    </Button>
                  </DrawerClose>
                </div>
              </nav>
            </div>
          </DrawerContent>
        </Drawer>
      </div>
    </header>
  );
}