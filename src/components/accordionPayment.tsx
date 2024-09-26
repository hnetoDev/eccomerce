import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import Link from "next/link"
import { useState } from "react"

export default function AccordionPayment({data,value,setPix,setDinheiro,setCartao}:{value:string,setCartao:React.Dispatch<React.SetStateAction<boolean>>,setPix:React.Dispatch<React.SetStateAction<boolean>>,setDinheiro:React.Dispatch<React.SetStateAction<boolean>>,data:{
  trigger:JSX.Element,
  children:JSX.Element,

}}){


  const handleClick = ()=>{
    if(value === 'pix'){
      setDinheiro(false)
      setPix(true)
      setCartao(false)
      return
    }
    if(value === 'cartao'){
      setDinheiro(false)
      setPix(false)
      setCartao(true)
      return
    }
    if(value === 'dinheiro'){
      setDinheiro(true)
      setPix(false)
      setCartao(false)
      return
    }
  }


  return <Accordion type="single" collapsible>
  <AccordionItem value="item-1">
    <AccordionTrigger onClick={handleClick}   className="p-3 border  dark:hover:bg-zinc-800 dark:hover:bg-opacity-50 rounded-lg w-full">{data.trigger}</AccordionTrigger>
    <AccordionContent>
      {data.children}
    </AccordionContent>
  </AccordionItem>
</Accordion>

}