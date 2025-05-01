'use client'

import CartCustom from "@/components/cart"
import { BicepsFlexed, HospitalIcon } from "lucide-react"
import Image from "next/image"
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { MdOutlineAddShoppingCart } from "react-icons/md"

export default function PageProd({params}:{params:{id:string}}){
  const [data,setData] = useState<{id:string,name:string,price:number,image:string[],desc:string}>()
  const [imageSelected,setImageSelected] = useState<string>()
  useEffect(()=>{
    async function getData(){
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/product/findOne/${params.id}`)
      if(res.ok){
        setData((await res.json()))
      }
    }
    getData()
  },[params.id])

  useEffect(()=>{
    setImageSelected(data?.image[0])
  },[data])
  return <div className="flex flex-col px-6 mt-4  ">
    <p className="text-muted-foreground text-sm">.../produtos/{data?.name}</p>
    <div className=" flex mt-3">
      <div className="flex flex-col-reverse w-full">
        <div className="w-full mt-3">
          {data ? data.image.map(i =>{
            return <div onClick={()=>{
              setImageSelected(i)
            }} className=" cursor-pointer  overflow-hidden full " key={i}>
              <Image width={26} height={26} src={i} className="w-20 rounded-lg h-20 hover:opacity-35 duration-200" alt=""/>
            </div>
          }) : null}
        </div>
        {data?.image ? <Image width={500} height={500} src={data?.image[0]} className="w-full h-96 rounded-lg" alt="" /> : <div className="w-full bg-muted h-96 rounded-lg"></div>}
        
      </div>
    </div>
    <div className="w-full">
      <div className="">
        <h1 className="text-5xl font-bold">{data?.name}</h1>
      </div>
    </div>
  </div>
 
}