'use client'
import { useTheme } from "@/app/context"
import CardProd from "@/components/cardProd"
import CardSection from "@/components/cardSection"
import { CarouselDemo } from "@/components/carousel"
import { CarouselBanner } from "@/components/carouselBanner"
import CarouselWithDots from "@/components/carouselWithDots"
import { HoverCard } from "@/components/popoverCollections"
import { Carousel } from "@/components/ui/carousel"
import { DataInit } from "@/types"
import { useQuery } from "@tanstack/react-query"
import Head from "next/head"
import Image from "next/image"
import { useState } from "react"
import '@/app/globals.css'
import CardSectionCategoria from "@/components/cardSectionCategorias"
import CardSectionMais from "@/components/cardMaisVendidos"
import CardSectionInfo from "@/components/cardSectionInfo"
import Link from "next/link"

const fetchStoreData = async (name: string): Promise<DataInit> => {
  alert('fetch 2 vez desnecessario')
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
    <div className=" w-screen" style={{ margin: '0px' }}>
      <div className="mt-4 px-4">
        <CarouselWithDots />
      </div>
      <div className="px-8 mt-8 overflow-x-auto hide-scrollbar">
        <CardSection />
      </div>
      <div className="mt-12 w-full md:px-24 flex-col flex justify-center items-center">
        <h1 className="font-bold text-center text-xl  md:text-5xl">Compre por categoria  💪💙</h1>
        <div className="mt-8 px-8 overflow-x-auto hide-scrollbar w-full hide-scollbar">
          <CardSectionCategoria />
        </div>
      </div>
      <div className="mt-12 w-full px-8 md:px-16  flex-col flex justify-center items-center">
        <div className="w-full flex justify-between items-center">
          <h1 className="font-bold text-2xl text-start  md:text-3xl">Mais vendidos</h1>
          <Link href={'/'} className="flex space-x-4 items-center  group">
            <h1 className="group-hover:text-primary">Ver mais</h1>
          </Link>
        </div>
        <div className="mt-2 w-full overflow-x-auto overflow-y-hidden hide-scrollbar flex justify-start items-start">
          {data?.Collection ? <CardSectionMais collection={data?.Collection} /> : null}

        </div>
      </div>
      <div className="mt-12 mb-12 w-full md:px-20 px-8 flex-col flex justify-center items-center">
        <CardSectionInfo />
      </div>





    </div>
  )
}




/*
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

*/