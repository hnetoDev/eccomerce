
import { CarouselDemo } from "@/components/carousel";
import CartCustom from "@/components/cart";
import { NavigationMenuDemo } from "@/components/nav";
import SheetCustom from "@/components/sheet";
import ThemeTabs from "@/components/tabTheme";
import { PersonIcon } from "@radix-ui/react-icons";
import { BadgeIcon, Phone, SearchIcon, ShoppingCartIcon } from "lucide-react";
import { useSession } from "next-auth/react";

import React from "react";
import { FaBars } from "react-icons/fa";

import Link from "next/link";
import Sheet from "./componentsInWindow/sheet";
import NavGetData from "./componentsInWindow/navGetData";

export default function Layout({ children }: { children: React.ReactNode }) {
  
  
  return <div className="w-full h-full">
    <NavGetData/>
    {children}
  </div>
}