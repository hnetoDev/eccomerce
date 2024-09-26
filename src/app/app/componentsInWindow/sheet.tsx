'use client'
import SheetCustom from "@/components/sheet";
import { CollectionAndProds } from "@/types";
import { useSession } from "next-auth/react";



export default function Sheet({data}:{data?:CollectionAndProds}){
  const session = useSession()
  const logged = session.data
  
  const img = session.data?.user?.image

  return <SheetCustom addToCart={false} data={data} logged={logged ? true : false} img={img ?? undefined}/>;
}