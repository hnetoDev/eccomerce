'use client'

import { useTheme } from "@/app/context"
import { useSession } from "next-auth/react"
import Image from "next/image"
import { RiSecurePaymentLine } from "react-icons/ri"
import Footer from "../app/footer"
import { CarouselDemo } from "@/components/carousel"
import Link from "next/link"
import SearchDrawer from "@/components/searchDrawer"
import { UserCircle } from "lucide-react"
import CartCustom from "@/components/cart"


export default function LayoutPayment({ children }: { children: React.ReactNode }) {

  const theme = useTheme()
  const session = useSession()




  return <div className="w-full flex flex-col">
    <div className="w-full px-20 py-2 border-b flex justify-between items-center">
      <Link href={'/'} className="w-2/4"><Image src={theme.logoUrl} alt={'Logo'} width={800} height={800} className="w-20"/></Link>
      <div className="flex items-center  space-x-2">
        <RiSecurePaymentLine className="w-8 h-8 text-primary" />
        <div>
          <h1 className="text-sm text-muted-foreground">Compra</h1>
          <p className="text-sm text-muted-foreground">100% e segura</p>
        </div>
      </div>


    </div>
    <CarouselDemo/>
    {children}
    <Footer/>
  </div>
}