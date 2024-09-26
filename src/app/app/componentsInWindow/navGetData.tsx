'use client'
import { CarouselDemo } from "@/components/carousel";
import CartCustom from "@/components/cart";
import { SearchIcon } from "lucide-react";
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

export default function NavGetData() {
  const session = useSession()
  const logged = session.data
  const img = session.data?.user?.image
  const ref = useRef<HTMLDivElement>(null)
  const nav = useRouter()

  const [data, setData] = useState<{
    name: string,
    id: string,
    prods: {
      id: string,
      name: string,
    }[]
  }[]>();
  useEffect(() => {
    const getData = async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/collection/prods`);
      if (res.ok) {
        const data = await res.json()
        setData(data);
      }
    }
    getData()
  }, [])

  return <div className="w-full">
    <div className="w-full flex p-1 bg-orange-500 justify-center items-center">
      <CarouselDemo />
    </div>
    <div className="break:w-0 w-full top-0 mt-8 fixed break:fixed px-4 py-0.5  bg-opacity-95 rounded-lg  break:invisible z-10 ">
      <div className="flex justify-between px-4 py-1   backdrop-blur-md bg-opacity-80 rounded-lg items-center">
        <Sheet data={data} />
        <Link className="flex justify-center ml-10" href={{ pathname: '/' }}>
          <img src="/chaves.png" width={500} height={500} className="w-28" />
        </Link>
        <div className="flex items-center  space-x-3">
          <SearchDrawer/>
          <CartCustom addToCart={false} />
        </div>
      </div>
    </div>



    <div className="flex fixed px-6 mt-12  dark  p-0 m-0 h-0 justify-center   items-center w-0 break:w-full invisible break:visible  z-10 ">
      <div className="w-full sticky top-0 flex justify-between p-2 px-5   backdrop-blur-md bg-opacity-80 rounded-lg">
        <Link href="/" legacyBehavior passHref>
          <img src="/chaves.png" width={500} height={500} className="w-28" />
        </Link>
        
        <div className="flex space-x-14 items-center ">
          <SearchDrawer/>

          <div className="flex ">
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center outline-none active:p-0 active:m-0 p-0">{logged ? img ? <img src={img} alt="profile" height={34} width={34} className="rounded-full" /> : <div className="flex space-x-1 items-center justify-center"> <PersonIcon className="h-8 w-8 " />  </div> : <div className="flex space-x-1 items-center justify-center"> <PersonIcon className="h-8 w-8 " /> </div>}</DropdownMenuTrigger>
              <DropdownMenuContent className="w-16">
                <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>{logged ? <div onClick={()=>{
                  signOut()
                }} className="flex space-x-2 items-center"><ExitIcon /><h1>Sair</h1></div> : <div onClick={()=>{
                  nav.push('/auth')
                }} className="flex space-x-2 items-center"><CgEnter /><h1>Entrar</h1></div>}</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <CartCustom addToCart={false} />
        </div>
      </div>
    </div>
  </div>
}