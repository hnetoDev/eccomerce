'use client'
import { Filter, FilterIcon, FilterXIcon, ListFilterIcon } from "lucide-react";
import { useEffect, useMemo, useState } from "react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Checkbox } from "@/components/ui/checkbox"
import CardProd from "@/components/cardProd";
import Filters from "@/components/filters";
import { useSearchParams } from "next/navigation";
import { DataInit, Product } from "@/types";
import { getSubdomain } from "@/lib/getSubdomain";
import { DollarSign, ListFilter, SortAsc, SortDesc, Zap } from 'lucide-react';

import CarouselWithDots from "@/components/carouselWithDots";
import CustomSelect from "@/components/ui/select";
import CardSection from "@/components/cardSection";
import CardSection2 from "@/components/cardSection2";
import { useQuery } from "@tanstack/react-query";
import { useTheme } from "@/app/context";
import Image from "next/image";
import CardSection3 from "@/components/cardSection3";

const fetchStoreData = async (name: string): Promise<DataInit> => {
  alert('fetch 2 vez desnecessario')
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/store/${name}`)
  if (!res.ok) throw new Error('Erro ao buscar dados')
  return res.json()
}

export default function CollectionPage({ params }: { params: { id: string } }) {
  const [data, setData] = useState<Product[]>()
  const [orderBy, setOrderBy] = useState<string>('relevance')
  const [categories, setCategories] = useState<string[]>([])
  const [categoriesSelected, setCategoriesSelected] = useState<string[]>([])
  const subdominio = 'teste'
  const theme = useTheme()

  const { data:dataQuery } = useQuery<DataInit, Error>({
    queryKey: ['store'],
    enabled: !!params.id && !!theme.name,
    queryFn: () => fetchStoreData(theme.name),
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    refetchInterval: false,
    refetchOnMount: false,
    staleTime: 1000 * 60 * 20,
  })
  useEffect(()=>{
    if(dataQuery?.Collection){
      const categories = dataQuery.Collection.map(i => i.name)
      setCategories(categories)
    }
    
  },[dataQuery])

  useEffect(() => {
    const getData = async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/product/byCollection/${params.id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          storeId: subdominio
        })
      })
      if (!res.ok) throw new Error('Erro ao buscar dados')
      const data = await res.json()
      setData(data)
    }
    getData()
  }, [params.id, subdominio])

  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100])
  return <div className="w-full px-20 py-8 ">
    <div className="w-full h-44 mb-4 bg-primary rounded-xl">
      <Image src={'/images/bannerCreatina.webp'} alt="Logo da loja" width={1500} height={600} className="w-full h-full rounded-xl " />
    </div>
    <div className="w-full flex justify-center"><CardSection3/></div>
    <div className="flex  justify-between mt-16 space-x-12 w-full">
      <div className="flex flex-col space-y-6 mt-4   h-screen w-1/4">
        <h1 className="text-xl">Filtrar por</h1>
        <div>
          <Filters categories={categories} setCategoriesSelected={setCategoriesSelected} priceRange={priceRange} setPriceRange={setPriceRange} />
        </div>
      </div>
      <div className="flex flex-col   w-3/4">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-4xl">{decodeURIComponent(params.id)}</h1>
            <p className="text-sm text-muted-foreground">23 produtos encontrados</p>
          </div>
          <div className="flex items-center space-x-4">
            <h1 className="text-muted-foreground">Ordenar por</h1>
            <div className="">
              <CustomSelect setOrderBy={setOrderBy} value={orderBy} options={[
                { value: 'relevance', label: 'Relevância' },
                { value: 'price_asc', label: 'Preço: Menor para Maior' },
                { value: 'price_desc', label: 'Preço: Maior para Menor' },
                { value: 'name_asc', label: 'Nome: A-Z' },
                { value: 'name_desc', label: 'Nome: Z-A' },
              ]}/>
              
            </div>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4 mt-4">
          {data?.map(item => (<CardProd key={item.id} id={item.id} name={item.name} pricePromo={item.pricePromo ? Number(item.pricePromo).toFixed(2) : Number(item.price).toFixed(2)} img={item.image ?? ['']} price={Number(item.price).toFixed(2)}></CardProd>))}
        </div>
      </div>
      {/*<Filters priceRange={priceRange} setPriceRange={setPriceRange}/>*/}
    </div>
  </div>
}