'use client'

import CartCustom from "@/components/cart"
import { DataInit } from "@/types"
import { useQueryClient } from "@tanstack/react-query"
import { XCircle } from "lucide-react"
import Image from "next/image"

export default function LeveTambem({setClose}:{setClose:React.Dispatch<React.SetStateAction<boolean>>}) {

  const data = useQueryClient().getQueryData(['store']) as DataInit
  if (!data) return <></>
  const prods: {
    id: string;
    name: string;
    image: string[];
    price: string;
    pricePromo: string;
  }[] = []
  const dataT = data.Collection.map((c) => {
    return c.produtos.map(p => {
      if (prods.includes(p)) return p
      if (p.name === 'Barra de Proteína Integral' || p.name === "Garrafão 1L") {
        prods.push(p);
      }
      return p
    })
  })
  return (
    <div>
      <div className="w-full flex items-center justify-between">
      <h1 className="text-xl">Leve também</h1>
      <XCircle onClick={()=>{
        setClose(true)
      }} className="cursor-pointer"/>
      </div>
      <div className="border-2 border-dashed border-primary w-full flex px-5 py-2  mt-4 rounded-xl bg-primary/5">
        {prods?.map((p, i) => <div key={p.id} className={` border-primary ${i === (prods.length - 1 && prods.length !== 1) ? '' : 'border-r'}  flex-col   justify-between flex`}>
          <div className="flex space-x-2 w-full">
            <Image alt="" width={200} height={200} src={p.image[0]} className="md:w-20 md:h-20 w-12 h-full  rounded-lg" />
            <div className="flex flex-col w-full justify-between">
              <div>
                <h1 className="text-md font-bold">{p.name}</h1>
                <div className="flex items-center"><h1 className="font-extrabold text-primary text-sm"> + R$ {Number(p.price).toFixed(2)}</h1><p className="text-sm text-zinc-500">/cada</p></div>
                <CartCustom id={p.id} name={p.name} qtd={1} price={p.price} img={p.image[0]} addToCart={true}>
                  <button className="w-max p-3 px-5 flex justify-center items-center bg-primary text-white rounded-xl mt-4">Comprar junto</button>
                </CartCustom>
              </div>
            </div>
          </div>
        </div>)}
      </div>
    </div>
  )
}