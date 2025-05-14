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
import { CiDeliveryTruck, CiLocationOn } from "react-icons/ci"
import ReactInputMask from "react-input-mask"


export default function AccordionCep() {

  const [cep, setCep] = useState<string>("")

  return <Accordion type="single" collapsible>
    <AccordionItem className="border-0" value="item-1 ">
      <AccordionTrigger className="font-bold border-0 ">Entrega <CiDeliveryTruck/></AccordionTrigger>
      <AccordionContent className="border-0">
        <div className="space-y-2 mt-1">
          <h1 className="text-muted-foreground text-sm">Digite seu CEP<span className="text-red-500">*</span></h1>
          <div className={`  duration-200 flex border rounded-2xl border-muted  focus-within:border-primary p-3 items-center space-x-2 w-full`}>
              <CiLocationOn className="text-muted-foreground w-5 h-5" />
              <ReactInputMask mask={"99999-999"} value={cep} placeholder="Digite o CEP" type="text" onChange={(v) => {
                setCep(v.target.value)
              }} className=" bg-transparent p-0 w-full border-0 outline-0" />
              <button>Calcular</button>
            </div>
        </div>
      </AccordionContent>
    </AccordionItem>
  </Accordion>

}