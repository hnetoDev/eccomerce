'use client'
import { CarouselDemo } from "@/components/carousel";
import CartCustom from "@/components/cart";
import { Search, SearchIcon } from "lucide-react";
import Link from "next/link";

import { useEffect, useRef, useState } from "react";
import { signOut, useSession } from "next-auth/react";
import Sheet from "./sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ExitIcon, PersonIcon } from "@radix-ui/react-icons";
import { CgEnter } from "react-icons/cg";
import { motion, useScroll, useTransform } from "framer-motion";
import SearchDrawer from "@/components/searchDrawer";
import { useRouter } from "next/navigation";
import { CookieValueTypes, getCookie } from "cookies-next";
import { IoPersonCircle, IoPersonCircleOutline } from "react-icons/io5";
import { useQuery } from "@tanstack/react-query";
import { DataInit } from "@/types";

const FetchStore = async (data2:CookieValueTypes) :Promise<DataInit> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/store/${data2}`);
  if(!res.ok) throw new Error('Erro ao buscar dados')
  return res.json()
}

export default function NavGetData() {
  const session = useSession()
  const logged = session.data
  const img = session.data?.user?.image
  const ref = useRef<HTMLDivElement>(null)
  const nav = useRouter()
  const data2 = getCookie("host")
  const {data} = useQuery({
    queryKey:['store'],
    queryFn: ()=> FetchStore(data2),
    enabled: !!data2,
  })

  useEffect(() => {
    console.log(data)
  },[data])
  
  return <div className="w-full">
    <div className="w-full flex p-1 bg-orange-500 justify-center items-center">
      <CarouselDemo />
    </div>
    <div className="break:w-0 w-full top-0 mt-8 fixed break:fixed px-4 py-0.5  bg-opacity-95 rounded-lg  break:invisible z-10 ">
      <div className="flex justify-between px-4 py-1   backdrop-blur-md bg-opacity-80 rounded-lg items-center">
        {
         data?.Collection ? <Sheet data={data.Collection}/> : null
        }
        <Link className="flex justify-center ml-10" href={{ pathname: '/' }}>
        {data ? <img src={data.image} width={500} height={500} className="w-24" /> : <div></div>}
        </Link>
        <div className="flex items-center  space-x-3">
          <SearchDrawer />
          <CartCustom addToCart={false} />
        </div>
      </div>
    </div>



    <div className="flex fixed justify-center bg-white   items-center w-0 break:w-full invisible break:visible  z-10 ">
      <div className="w-full sticky top-0 flex items-center justify-between py-6 px-8">
        <Link href="/" legacyBehavior passHref>
          {data ? <img src={data.image} width={500} height={500} className="w-20" /> : <div></div>}
        </Link>

        <div className="w-full flex justify-center">
          <div className=" flex justify-center w-full">
            <div className={`  duration-200 flex border focus-within:border-orange-500 border-transparent   rounded-lg p-3 bg-muted items-center space-x-2 w-1/2 `}>
              <Search size={20} className="text-muted-foreground" />
              <input type="text" onChange={(v) => {
              }} placeholder="O que você procura?" className="  placeholder:text-sm bg-transparent p-0 w-full border-0 outline-0" />
            </div>
            <div className="bg-orange-500 p-3 flex justify-center items-center rounded-r-lg">
              <Search size={20} className="text-white" />
            </div>
          </div>
        </div>
        <div className="flex space-x-14 items-center ">
          <div className="flex justify-center space-x-4 items-center">
            <div className="flex space-x-2 items-center ">
              <IoPersonCircleOutline size={28} />
              <h1>Entrar</h1>
            </div>
            <CartCustom addToCart={false} />
          </div>

        </div>
      </div>
    </div>
  </div>
}