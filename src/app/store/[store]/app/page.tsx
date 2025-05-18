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
import { useEffect, useRef, useState } from "react"
import '@/app/globals.css'
import CardSectionCategoria from "@/components/cardSectionCategorias"
import CardSectionMais from "@/components/cardMaisVendidos"
import CardSectionInfo from "@/components/cardSectionInfo"
import Link from "next/link"
import SectionAvaliacoes from "@/components/sectionAvaliacoes"
import Categories from "@/components/categoriesRoupa"
import { motion, useAnimation, useInView } from 'framer-motion';
import { containerVariants } from "@/animation/motion"
import CarouselWithDotsTest from "@/components/carouselTest"
import ProductCarousel from "@/components/carouselTest"
import MaisVendidos from "@/components/maisVendidosTest"
import ProductCarouselTest from "@/components/maisVendidosTest"
import EmblaCarousel from "@/components/carousel-embla"
import ProductCarouselTeste from "@/components/maisVendidosTest"
import SectionCategoriesAnimated from "@/components/sectionCategoriesAnimated"

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
      <motion.div
        initial={{
          opacity: 0, // Começa invisível
          y: 50,      // Começa abaixo
        }}
        whileInView={{
          opacity: 1, // Quando a div entra na tela, ela se torna visível
          y: 0,       // A div sobe para a posição original
        }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }} /// Duração da animação
        className=" w-full flex-col flex justify-center items-center"
      >
        <div className="px-20 overflow-x-auto hide-scrollbar w-full hide-scollbar">
          <SectionCategoriesAnimated/>
        </div>
      </motion.div>

      <div className="md:px-20">
        {data?.Collection ? <ProductCarouselTeste collection={data?.Collection} /> : null}
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