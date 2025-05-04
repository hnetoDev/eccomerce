'use client'
import { useTheme } from "@/app/context";
import { CarouselDemo } from "@/components/carousel";
import CartCustom from "@/components/cart";
import SearchDrawer from "@/components/searchDrawer";
import SheetCustom from "@/components/sheet";
import { Phone, SearchIcon, UserCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { CiLocationOn } from "react-icons/ci";
import { FaFacebook, FaInstagram, FaWhatsapp } from "react-icons/fa";
import { IoLogoTiktok } from "react-icons/io5";
import { MdEmail, MdOutlineEmail } from "react-icons/md";
import { PiDotsThreeCircle, PiXLogo } from "react-icons/pi";
import Footer from "./footer";

export default function LayoutApp({ children }: { children: React.ReactNode }) {

  const theme = useTheme()


  return <div className="flex flex-col">
    <CarouselDemo />
    <div className="w-full md:w-0 md:fixed md:invisible visible shadow-lg z-50 bg-background px-8 py-3 sticky top-0 flex justify-between items-center">
      <div className="w-2/4 flex space-x-2">
        <SheetCustom />
      </div>
      <Link href={{ pathname: '/' }}>
        <Image src={theme.logoUrl} alt="Logo da loja" width={60} height={60} className="rounded-lg " />
      </Link>
      <div className="flex justify-end w-2/4 space-x-4 items-center">
        <SearchDrawer />
        <UserCircle className="w-6 h-6 text-muted-foreground" />
        <CartCustom addToCart={false} />
      </div>
    </div>
    <div className="w-0 md:w-full md:sticky md:visible invisible fixed  z-50 bg-background px-8 py-3 top-0 flex justify-between items-center">
      <div className="w-2/4 flex space-x-2">
        <SheetCustom />
        <Link href={{ pathname: '/' }}>
          <Image src={theme.logoUrl} alt="Logo da loja" width={60} height={60} className="rounded-lg " />
        </Link>
      </div>
      <div className={`  duration-200 flex bg-muted rounded-3xl  focus-within:border-orange-500 px-5  p-3 items-center space-x-2 w-full`}>
        <input type="text" onChange={() => {
        }} placeholder="O que você procura?" className=" bg-transparent text-muted-foreground p-0 w-full border-0 outline-0" />
        <SearchIcon className="text-orange-500"/>
      </div>
      <div className="flex justify-end w-2/4 space-x-4 items-center">

        <UserCircle className="w-6 h-6 text-muted-foreground" />
        <CartCustom addToCart={false} />
      </div>
    </div>

    {children}

    <Footer

  </div>
}