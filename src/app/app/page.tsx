'use client'
import CardProd from "@/components/cardProd";
import { CarouselBanner } from "@/components/carouselBanner";
import { CarouselProd } from "@/components/carouselProd";

import { Flower2Icon } from "lucide-react";
import {signIn} from 'next-auth/react'
import Sheet from "./componentsInWindow/sheet";
import { useEffect, useState } from "react";
import { TabsCustom } from "@/components/tabs";
import ThemeTabs from "@/components/tabTheme";


export default function AppPage(){
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
  return <div className="w-full h-full">
      <div className="flex w-full justify-center mt-32">
        <TabsCustom/>
      </div>
        <ThemeTabs/>
      
      
      
  </div>
}




//4430276360