import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { ChevronUp, SearchIcon } from "lucide-react"
import { ComboboxDemo } from "./compSearch"
import { MdSearchOff } from "react-icons/md"
import { CgSearch } from "react-icons/cg"
import { CartItem } from "@/lib/cartStore/cardStore"
import Image from "next/image"


export default function ResumoDrawer({ cart, total, subTotal, frete, cupon }: {
  cart: CartItem[],
  total: number,
  subTotal: number,
  frete?: number,
  cupon?: string
}) {
  return <Drawer setBackgroundColorOnScale={false} >
    <DrawerTrigger className="w-full p-2">
      <div className="flex items-center bg-primary/5 rounded-xl p-2 justify-between">
        <span className="">Ver resumo</span>
        <ChevronUp className="w-6 h-6" />
      </div>
    </DrawerTrigger>
    <DrawerContent className="h-3/4 px-3 overflow-y-scroll">
      <DrawerHeader>
        <DrawerTitle>
          <div className="flex justify-between items-center w-full">
            <h1 className="text-lg font-semibold">Resumo do Pedido</h1>
            <DrawerClose className="w-6 h-6 text-muted-foreground hover:text-primary" />
          </div>
        </DrawerTitle>
        <DrawerDescription></DrawerDescription>
      </DrawerHeader>

      <div className="">
        {cart?.map((d, i) => <div key={d.id} className={`  p-3 hover:bg-primary/5 rounded-xl  w-full justify-between flex`}>
          <div className="flex space-x-2 w-full">
            <div className="w-24">
              {d.image ? <Image alt="" width={200} height={200} src={d.image} className="md:w-20 md:h-20 w-20 h-20  rounded-lg" /> : null}
            </div>
            <div className="flex flex-col w-full justify-between">
              <div className="w-full flex justify-between items-center">
                <div>
                  <h1 className=" ">{d.name}</h1>
                  <div className="flex items-center"><h1 className=" text-primary text-sm">R$ {Number(d.price).toFixed(2)}</h1></div>
                </div>
                <div>
                  <h1 className="text-muted-foreground text-sm">x {d.quantidade}</h1>
                </div>
              </div>
              <div className="w-full flex  items-center space-x-4">
                <h1 className="text-sm text-muted-foreground">Total:</h1>
                <div className="w-full h-0.5 bg-muted"></div>
                <h1 className="font-bold">R${Number(Number(d.price) * d.quantidade).toFixed(2)}</h1>
              </div>


            </div>
          </div>

        </div>)}
      </div>

      <div className="h-[200px] p-3"></div>

    </DrawerContent>
  </Drawer>

}