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
      <Link href={{ pathname: '/' }} className="w-1/3">
      <Image src={'/images/logoBlackBull.png'} alt="Logo da loja" width={130} height={30} className="rounded-lg w-24 overflow-y-visible " />
        {/*<Image src={'/images/logoMenthosBlack.png'} alt="Logo da loja" width={130} height={30} className="rounded-lg dark:w-0 w-20 dark:fixed dark:invisible  overflow-y-visible " />
        <Image src={'/images/logoMenthos.png'} alt="Logo da loja" width={130} height={30} className="rounded-lg w-0 fixed invisible dark:w-20 dark:relative dark:visible  overflow-y-visible " /> */}
      </Link>
      <div className="w-full flex justify-center">
        <h1 className="text-primary font-bold">Pagina de pagamentos</h1>
      </div>
      <div className="flex items-center w-1/3 justify-end  space-x-2">
        <RiSecurePaymentLine className="w-8 h-8 text-primary" />
        <div>
          <h1 className="text-sm text-muted-foreground">Compra</h1>
          <p className="text-sm text-muted-foreground">100% e segura</p>
        </div>
      </div>


    </div>
    <CarouselDemo />
    {children}
    <Footer />
  </div>
}