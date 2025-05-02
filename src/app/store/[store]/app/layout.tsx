'use client'
import { useTheme } from "@/app/context";
import { CarouselDemo } from "@/components/carousel";
import CartCustom from "@/components/cart";
import SearchDrawer from "@/components/searchDrawer";
import SheetCustom from "@/components/sheet";
import { UserCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function LayoutApp({ children }: { children: React.ReactNode }) {

  const theme = useTheme()
  

  return <div className="flex flex-col">
    <CarouselDemo />
    <div className="w-full shadow-lg z-50 bg-background px-8 py-3 sticky top-0 flex justify-between items-center">
      <div className="w-2/4 flex space-x-2">
        <SheetCustom />
      </div>
      <Link href={{ pathname: '/' }}>
        <Image src={theme.logoUrl} alt="Logo da loja" width={60} height={60} className="rounded-lg " />
      </Link>
      <div className="flex items-center justify-end w-2/4 space-x-4">
        <SearchDrawer />
        <UserCircle className="w-6 h-6" />
        <CartCustom addToCart={false} />
      </div>
    </div>

    {children}

  </div>
}