'use client'

import CartCustom from "@/components/cart"
import { BicepsFlexed, HospitalIcon } from "lucide-react"
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { MdOutlineAddShoppingCart } from "react-icons/md"

export default function PageProd({params}:{params:{id:string}}){
  const [data,setData] = useState<{id:string,name:string,price:number,image:string,desc:string}>()
  useEffect(()=>{
    async function getData(){
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/product/${params.id}`)
      if(res.ok){
        setData((await res.json()))
      }
    }
    getData()
  },[])
  return <div className="flex bg-gradient-to-r from-zinc-900 to-orange-400   justify-center items-center">
    <div className="break:flex break:space-x-4 p-6 justify-between b items-center mt-24 ">
      <div className="w-1/5 space-y-6">
        <div className="flex items-center space-x-3">
          <div className="rounded-full flex justify-center items-center p-4 bg-zinc-900">
            <BicepsFlexed className="w-8 h-8"/>
          </div>
          <h1 className=" text-wrap">Ajuda na Recuperação e ganho muscular </h1>
        </div>
        <div className="flex items-center space-x-3">
          <div className="rounded-full flex justify-center items-center p-4 bg-zinc-900">
            <HospitalIcon className="w-8 h-8"/>
          </div>
          <h1 className=" text-wrap">Ajuda o sistema imunulógico</h1>
        </div>
        <div className="flex items-center space-x-3">
          <div className="rounded-full flex justify-center items-center p-4 bg-zinc-900">
            <BicepsFlexed className="w-8 h-8"/>
          </div>
          <h1 className=" text-wrap">Ajuda na Recuperação e ganho muscular </h1>
        </div>
      </div>
      {data?.image ? <img  className="rounded-lg w-1/3" src={`${process.env.NEXT_PUBLIC_API_URL}/public/${data?.image}`} alt="img" /> : null}
      <div className="bg-zinc-900 p-6 h-max rounded-lg space-y-3">
        <div><h1 className="text-3xl font-extrabold">{data?.name}</h1>
        <p>{data?.desc ?? null}</p></div>
        <h1 className="text-2xl font-bold">R$ {data?.price}</h1>
        <CartCustom id={data?.id} name={data?.name} price={data?.price} img={data?.image} addToCart={true}>
        <div className="bg-orange-500 w-full rounded-lg p-3 flex items-center justify-center">
          <h1 className="font-extrabold">Adicionar ao carrinho</h1>
          <MdOutlineAddShoppingCart size={30}/>
        </div>
        </CartCustom>
      </div>
    </div>
  </div>
}