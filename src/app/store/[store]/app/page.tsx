'use client'
import { useTheme } from "@/app/context"
import CardProd from "@/components/cardProd"
import { CarouselDemo } from "@/components/carousel"
import { CarouselBanner } from "@/components/carouselBanner"
import CarouselWithDots from "@/components/carouselWithDots"
import { Carousel } from "@/components/ui/carousel"
import { DataInit } from "@/types"
import { useQuery } from "@tanstack/react-query"
import Head from "next/head"
import Image from "next/image"
import { useState } from "react"

const fetchStoreData = async (name: string): Promise<DataInit> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/store/${name}`)
  if (!res.ok) throw new Error('Erro ao buscar dados')
  return res.json()
}

export default function StoreHome() {
  const theme = useTheme()
  const [categoria, setCategoria] = useState<string>('')

  const { data } = useQuery({
    queryKey: ['store'],
    queryFn: () => fetchStoreData(theme.name),
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    refetchInterval: false,
    refetchOnMount: false,
    staleTime: 1000 * 60 * 20,
  })



  return (
    <div className="" style={{ margin: '0px' }}>
      <div></div>
      <div className="mt-4">
        <CarouselWithDots />
      </div>

      <div className="px-5 mt-2">
        <div className="flex mt-2 space-x-2 w-full scroll-none hide-scrollbar overflow-x-scroll items-center">
          {data ? data.Collection.map((c, i) => {
            return (
              <div onClick={() => {
                setCategoria(c.name)
              }} className={`${categoria === c.name ? 'bg-orange-500' : 'border'} px-3 w-max py-2 rounded-2xl`} key={c.id}>
                <h1 className={`${categoria === c.name ? 'text-white font-bold' : ''}`} >{c.name}</h1>
              </div>
            )
          }) : null}
        </div>
      </div>
      <div className=" px-6">
        <h1></h1>
        <div className="grid grid-cols-2">
          {data ? data.Collection.map((c, i) => {
            if (c.name === categoria) {
              return c.produtos.map((p, i) => {
                return <div key={i}>
                  <CardProd id={p.id} img={p.image} name={p.name} price={p.price} pricePromo={p.pricePromo} />
                </div>
              })
            }
            return null
          }) : null}
        </div>
      </div>


    </div>
  )
} ''




//4430276360