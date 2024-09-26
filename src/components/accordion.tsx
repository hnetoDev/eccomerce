import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import Link from "next/link"
import { useState } from "react"


export default function AccordionCustom({SheetClose,data}:{SheetClose:any,data:{
  name:string,
  id:string,
  prods:{
    id: string,
    name: string,
  }[]

}}){
 


  return <Accordion type="single" collapsible>
  <AccordionItem value="item-1">
    <AccordionTrigger  className="font-bold text-orange-500">{data.name}</AccordionTrigger>
    <AccordionContent>
      <div className="flex flex-col gap-4">
        <Link href={{pathname:`/app/collections/${data.name}`}}>
        <SheetClose>Ver Todos</SheetClose>
        </Link>
        {data ? data.prods.map(p =>{
          return <Link key={p.id}  href={{pathname:`app/produtos/${p.id}`}} className="p-3 hover:bg-zinc-500 hover:bg-opacity-10">
          <h1 className="">{p.name}</h1>
         </Link>
        }) : null}
        
        
      </div>
    </AccordionContent>
  </AccordionItem>
</Accordion>

}