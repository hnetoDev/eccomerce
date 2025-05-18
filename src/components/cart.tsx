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

import { ScrollArea } from "@/components/ui/scroll-area"
import { ShoppingCartIcon } from "lucide-react"
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react"
import { CgDetailsLess } from "react-icons/cg";
import { FaRegSadCry } from "react-icons/fa";
import { IoTrashOutline } from "react-icons/io5";
import { MdOutlineShoppingBag } from 'react-icons/md';
import Image from "next/image";
import { useCartStore } from "@/lib/cartStore/cardStore";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { TbShoppingBag } from "react-icons/tb";
export default function CartCustom({ addToCart, children, id, name, price, pricePromo, img, qtd }: { id?: string, name?: string, price?: string, pricePromo?: string, img?: string, qtd?: number, children?: React.ReactNode, addToCart: boolean }) {
  const [data, setData] = useState<{ name: string, image: string, id: string, price: string, qtd: number }[]>();
  const [empty, setEmpty] = useState<boolean>(true);
  const nav = useRouter()

  const cart = useCartStore((state) => state.cart)
  const addToCarts = useCartStore((state) => state.addToCart)
  const incrementItem = useCartStore((state) => state.incrementItem)
  const decrementItem = useCartStore((state) => state.decrementItem)
  const removeFromCart = useCartStore((state) => state.removeFromCart)
  const clearCart = useCartStore((state) => state.clearCart)


  useEffect(() => {
    if (cart.length > 0) {
      setEmpty(false)
    } else {
      setEmpty(true)
    }
  }, [cart])
  const total = cart.reduce(
    (sum, item) => sum + (item.price) * item.quantidade,
    0
  )




  return <Sheet>
    <SheetTrigger className={`${addToCart ? 'w-full' : null}`}>{addToCart ? <div className="w-full" onClick={() => {
      addToCarts({
        id: id!,
        name: name!,
        price: Number(price!),
        pricePromo: pricePromo ? Number(pricePromo) : undefined,
        image: img,
        quantidade: qtd ?? 1
      })
    }}>{children}</div> : <div className="relative">
      <div className="bg-primary w-6 h-6 flex items-center justify-center absolute rounded-full p-2 -right-2 -bottom-2">
        <p className="text-sm text-white font-bold">{cart ? `${cart.length}` : '0'}</p>
      </div>
      <TbShoppingBag className="md:w-8 md:h-8 w-6 h-6 text-muted-foreground" />
    </div>}</SheetTrigger>
    <SheetContent side={'right'} className="w-full md:max-w-[35vw]" >
      <SheetHeader>
        <SheetTitle><div className="flex items-center justify-center space-x-4"> <TbShoppingBag className="w-7 h-7" /><h1>Seu carrinho</h1></div></SheetTitle>

      </SheetHeader>
      <div className="flex flex-col h-full  justify-between py-4">
        {empty ? <div className="flex flex-col  m-auto space-y-8 justify-center items-center">
          <FaRegSadCry className="w-16 h-16" />
          <div className="flex flex-col justify-center">
            <h1 className="text-zinc-400 text-wrap text-center">Carrinho Vazio</h1>
            <h1 className="text-zinc-400 text-wrap text-center">Adicione itens para aproveitar nossas promoções</h1>
          </div>
        </div> : <ScrollArea className="   h-[75vh]  ">{cart?.map(d => <div key={d.id} className="p-3 hover:bg-zinc-100 dark:hover:bg-zinc-900 items-start hover:rounded-lg bg-opacity-65  w-full justify-between flex">
          <div className="flex space-x-2">
            {d.image ? <Image alt="" width={100} height={100} src={d.image} className="w-20 h-24  rounded-lg" /> : null}
            
              <div className="flex flex-col justify-between">
                <h1 className="text-md font-bold">{d.name}</h1>
                <div className="flex border w-max rounded-xl space-x-1">
                  <div onClick={() => { decrementItem(d.id) }} className="  dark:hover:bg-zinc-900 dark:hover:bg-opacity-65 flex text-lg hover:bg-zinc-200 hover:cursor-pointer font-bold justify-center items-center p-1 rounded-l-full w-6 h-6">
                    -
                  </div>
                  <div className="    flex justify-center text-sm items-center p-1 rounded-full w-6 h-6">
                    {d.quantidade}
                  </div>
                  <div onClick={() => { incrementItem(d.id) }} className="  dark:hover:bg-zinc-900 dark:hover:bg-opacity-65 flex text-lg hover:bg-zinc-200 hover:cursor-pointer  justify-center items-center p-1 rounded-r-full w-6 h-6">
                    +
                  </div>
                </div>
                <div className="flex items-center"><h1 className="font-extrabold text-primary text-sm">R$ {d.price}</h1><p className="text-sm text-zinc-500">/cada</p></div>
              </div>
            
          </div>
          <IoTrashOutline onClick={() => { removeFromCart(d.id) }} className="text-end hover:cursor-pointer  " />
        </div>)}</ScrollArea>}
        <div className="w-full
        ">
          <div className=" rounded-t-3xl px-3 pt-3 bg-zinc-50 dark:bg-muted  mt-6">
            <div className="flex px-3 pt-3 justify-between">
              <h1 className="">subTotal:</h1>
              <h1 className="">R$ {total.toFixed(2)}</h1>
            </div>
            <div className="flex  flex-col border-t p-3 rounded-b-3xl mt-2 justify-between">
              <p className="text-end  text-sm text-green-500">10% de desconto no PIX</p>
              <div className="w-full flex justify-between">
                <h1 className="font-extrabold">Total</h1>
                <h1 className="space-x-4 "><span className="text-muted-foreground text-sm line-through">R$ {total?.toFixed(2)}</span><span className="font-bold">R$ {(total - (total * 10 / 100)).toFixed(2)}</span></h1>
              </div>
            </div>
          </div>
          <SheetClose onClick={() => {
            nav.push('/app/carrinho')
          }} className="bg-primary text-white font-extrabold flex justify-center items-center  w-full rounded-lg p-3">Finalizar compra</SheetClose>
        </div>
      </div>
    </SheetContent>

  </Sheet>

}