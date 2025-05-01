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

import { FaBars, FaInstagram, FaWhatsapp } from 'react-icons/fa'
import { NavigationMenuDemo } from "./nav"
import AccordionCustom from "./accordion"
import { PersonIcon } from "@radix-ui/react-icons"
import { useEffect, useState } from "react"
import { CollectionAndProds, DataInit } from "@/types"
import { ListOrdered, UserCircle } from "lucide-react"
import Link from "next/link"
import ThemeTabs from "./tabTheme"
import { useTheme } from "@/app/context"
import { useQueryClient } from "@tanstack/react-query"
import Image from "next/image"

export default function SheetCustom() {
  const [data, setData] = useState<DataInit['Collection']>()
  const theme = useTheme()
  const [open, setOpen] = useState(false)
  const query = useQueryClient()

  const dataQuery = query.getQueryData(['store']) as DataInit | undefined

  useEffect(() => {
    if (dataQuery) {
      setData(dataQuery.Collection)
    }
  }, [open, dataQuery])


  const SheetCloser = ({ children }: { children: JSX.Element }) => {
    return <SheetClose>{children}</SheetClose>
  }
  return <Sheet open={open} onOpenChange={setOpen}>
    <SheetTrigger><FaBars className="" /></SheetTrigger>
    <SheetContent side={'left'} className="flex h-full  flex-col justify-between" >
      <SheetHeader className="">
        <SheetTitle className="flex mb-6">
          <Image width={50} height={50} src={theme.logoUrl} className=" rounded-lg" alt="logo" />
        </SheetTitle>
        <div className="flex flex-col w-full">
          <h1 className="text-orange-500 text-start font-bold text-sm py-2">Home</h1>
          {data ? data.map(c => {
            return <AccordionCustom SheetClose={SheetCloser} key={c.id} data={c} />
          }) : null}
        </div>

      </SheetHeader>



      <div>

      </div>
      <div>
        <div className="flex w-full space-x-3 bg-muted rounded-lg p-3 items-center">
          <UserCircle className="w-7 h-7" />
          <div className="space-y-1">
            <h1 className="text-sm">
              hneto
            </h1>
            <h1 className="text-sm">
              hnetorocha@gmail.com
            </h1>
          </div>
        </div>
        <div className="flex mt-2 w-full justify-between items-center">

          <div className="py-3 flex space-x-4">
            <FaWhatsapp size={25} />
            <FaInstagram size={25} />
          </div>
          <ThemeTabs />

        </div>
      </div>
    </SheetContent>
  </Sheet>

}