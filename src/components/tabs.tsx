import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { QrCodeIcon } from "lucide-react"
import { CgDollar } from "react-icons/cg"
import { CiMoneyBill, CiPhone } from "react-icons/ci"
import { IoIosCellular } from "react-icons/io"
import { IoCellular, IoCellularOutline, IoPhonePortrait, IoPhonePortraitOutline } from "react-icons/io5"
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


import { ChartCaixa } from "./chartCaixa"
import { DataInit } from "@/types"

function CardForTabs({title,value,subTitle,icon}:{title:string,value:string,subTitle:string,icon:JSX.Element}){
  return <div className="border css2 bg-bg   p-6 rounded-xl space-y-3">
  <div className="flex items-center justify-between">
    <h1 className="text-sm font-bold">{title}</h1>
    {icon}
  </div>
  <div>
    <h1 className="font-bold text-2xl text-blue-500 tracking-wide">R${value}</h1>
    <p className="text-sm text-zinc-500">{subTitle}</p>
  </div>
</div>
}

function CardEntrada(){
  return <div className="flex items-center justify-between">
         <div className="flex space-x-2 items-center">
         <div className="w-12 h-12 rounded-full bg-yellow-400"></div>
         <div><h1 className="text-sm text-zinc-400">Hélio Neto</h1><h1 className="text-sm text-zinc-400">hnetorocha@gmail.com</h1></div>
         </div>
         <div>
          <h1 className="text-sm ">Pix</h1>
         </div>
          <div><h1 className="text-sm">21-09-24</h1></div>
         </div>
}

export function TabsCustom({data}:{data:DataInit["Collection"]}){
  return <Tabs defaultValue={data[0]?.name} className=" bg-transparent w-full space-y-4">
  <TabsList className="w-full flex space-x-3 bg-transparent">
    {data.map(d => {
      return  <TabsTrigger key={d.id} className="p-3 data-[state=active]:text-background data-[state=active]:bg-orange-500  data-[state=active]:shadow  rounded-3xl duration-300" value={d.name}>{d.name}</TabsTrigger>
    })}
   
    
  </TabsList>
  {data.map(d =>{
    return <TabsContent key={d.id} value={d.name}>
        <div className="flex flex-col md:flex-row">
      <div className=" break:px-0 px-6   space-x-4 md:space-y-4 justify-between flex-row flex md:w-1/5 md:flex-col h-full">
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
        {data ? d.produtos ? d.produtos.map(p => <CardProd pricePromo={p.pricePromo} id={p.id} key={p.id} img={p.image} name={p.name} price={p.price} />) : null : null}
      </div>
    </div>
    </TabsContent>
  })}
</Tabs>

}