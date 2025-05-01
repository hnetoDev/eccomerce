'use client'
import { FilterIcon, FilterXIcon, ListFilterIcon } from "lucide-react";
import { useEffect, useState } from "react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Checkbox } from "@/components/ui/checkbox"
import CardProd from "@/components/cardProd";


export default function CollectionPage({ params }: { params: { id: string } }) {
  const [data, setData] = useState<{ image: string, id: string, name: string, price: number }[]>();
  useEffect(() => {
    async function getData() {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/product/byCollection/${params.id}`)
      if (res.ok) {
        const data = await res.json();
        setData(data)
      }
    }
    getData();
  }, [])
  return <div className="flex flex-col w-full mt-24 break:mt-32 space-y-8 p-4 sm:p-8 h-full">
    <h1 className="text-3xl text-center font-bold uppercase">{params.id}</h1>
    <div className="flex p-3 space-x-3 rounded-lg bg-orange-400 w-full">
      <div className=" w-44 xl:w-56 flex  ">
        <img src='/marcas.png' className="rounded-lg flex-2"/>
      </div>
      <h1 className="text-white w-full uppercase font-bold text-xl md:text-4xl text-center m-auto flex-1">Segurança, melhores marcas e autenticidade</h1>
    </div>
    <div className="flex flex-col md:flex-row">
      <div className="   space-x-4 md:space-y-4 justify-between flex-row flex md:w-1/5 md:flex-col h-full">
        <div className="flex md:justify-center items-center space-x-2">
          <ListFilterIcon />
          <h1 className="font-bold">Filtrar</h1>
        </div>
        <div className="p-3">
          <Accordion className="" type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger className="font-bold w-full ">Ordernar por</AccordionTrigger>
              <AccordionContent>
                <div className="p-3 flex items-center  space-x-3">
                  <Checkbox className="p-3  text-white" />
                  <h1>Maior preço</h1>
                </div>
                <div className="p-3 flex space-x-3 items-center">
                  <Checkbox inputMode="text" className="p-3 text-white" />
                  <h1>Menor preço</h1>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
        
      </div>
      <div className=" md:w-4/5 md:border-l md:px-2 sm:grid-cols-3 h-full md:gap-12  grid-cols-2 md:grid-cols-2 lg:grid-cols-3 grid break:grid-cols-3 xl:gap-12 xl:grid-cols-4">
        {data ? data.map(p => <CardProd id={p.id} key={p.id} img={p.image} name={p.name} price={p.price} />) : null}
      </div>
    </div>
  </div>
}