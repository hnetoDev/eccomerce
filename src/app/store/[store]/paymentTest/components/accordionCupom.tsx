import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { CollectionAndProds } from "@/types"
import { TicketPercentIcon } from "lucide-react"
import Link from "next/link"
import { useState } from "react"


export default function AccordionCupom() {


  return <Accordion type="single" collapsible>
    <AccordionItem value="item-1">
      <AccordionTrigger className="font-bold border-b-0 ">Adicionar cupom?</AccordionTrigger>
      <AccordionContent className="border-b-0">
        <div className="space-y-2 mt-1">
          <h1 className="text-muted-foreground text-sm">Código do cupom<span className="text-red-500">*</span></h1>
          <div className={`  duration-200 flex border rounded-2xl border-muted  focus-within:border-primary p-3 items-center space-x-2 w-full`}>
            <TicketPercentIcon className="text-muted-foreground w-5 h-6" />
            <input placeholder="JANEIRO10%OFF" type="text" onChange={(v) => {
            }} className=" bg-transparent p-0 w-full border-0 outline-0" />
            <button>Adicionar</button>
          </div>
        </div>
      </AccordionContent>
    </AccordionItem>
  </Accordion>

}