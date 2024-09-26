'use client'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import {FaBars, FaInstagram, FaWhatsapp} from 'react-icons/fa'
import { NavigationMenuDemo } from "./nav"
import AccordionCustom from "./accordion"
import { PersonIcon } from "@radix-ui/react-icons"
import { useState } from "react"
import { CollectionAndProds } from "@/types"
import { ListOrdered } from "lucide-react"

export default function SheetCustom({logged,img,data}:{addToCart:boolean,data?:CollectionAndProds,logged:boolean,img?:string}){

  const SheetCloser = ({children}:{children:JSX.Element}) =>{
    return <SheetClose>{children}</SheetClose>
  }
  return <Sheet>
  <SheetTrigger><FaBars className=""/></SheetTrigger>
  <SheetContent side={'left'} >
    <SheetHeader>
      <SheetTitle className="flex justify-center">
        <img src="/chaves.png" className="w-28" alt="logo"  />
      </SheetTitle>
      <SheetDescription>
       
      </SheetDescription>
    </SheetHeader>
    <div>
      {data ? data.map(c =>{
        return <AccordionCustom SheetClose={SheetCloser} key={c.id} data={c}/>
      }) : null}
    </div>
    <div>
    <div className="p-2 flex space-x-2 hover:bg-zinc-800 justify-center mt-3  border rounded-lg">
      <h1 className="text-center">Meus Pedidos</h1>
      <ListOrdered/>
    </div>
    <DropdownMenu>
            <DropdownMenuTrigger className="flex  items-center w-full justify-center py-3 mt-1">{logged ? img ? <div className="flex items-center space-x-2  hover:bg-zinc-800  justify-center rounded-lg border w-full p-3"><img src={img} alt="profile" height={34} width={34} className="rounded-full" /><h1>Minha conta</h1></div> : <div className="flex space-x-1 items-center  hover:bg-zinc-800 justify-center"> <PersonIcon /> <h1>Conta</h1>  </div> : <div className="flex space-x-1 items-center justify-center  hover:bg-zinc-800"> <PersonIcon /><h1 className="text-sm">Conta</h1> </div>}</DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>{logged ? 'Sair' : 'Entrar'}</DropdownMenuItem>    
            </DropdownMenuContent>
          </DropdownMenu>
    </div>
    <div className="py-3 flex space-x-4">
      <FaWhatsapp size={20}/>
      <FaInstagram size={20}/>
    </div>
  </SheetContent>
</Sheet>

}