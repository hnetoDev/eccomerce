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
import { ShoppingCartIcon, TicketPercentIcon, Trash, XCircle } from "lucide-react"
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { CgDetailsLess } from "react-icons/cg";
import { FaRegSadCry } from "react-icons/fa";
import { IoTrashOutline } from "react-icons/io5";
import { MdOutlineShoppingBag, MdPersonOutline } from 'react-icons/md';
import InputMask from "react-input-mask"
import Link from "next/link";
import { CiDeliveryTruck, CiLocationOn } from "react-icons/ci";
import Image from "next/image";
import LeveTambem from "../paymentTest/components/leveTambem";
import AccordionCupom from "../../paymentTest/components/accordionCupom";
import AccordionCep from "../paymentTest/components/accordionCep";
import '@/app/globals.css'
import { useCartStore } from "@/lib/cartStore/cardStore";
import { FaCircleCheck } from "react-icons/fa6";
export default function CartCheckout() {
  const [data, setData] = useState<{ name: string, img: string, id: string, price: string, qtd: number }[]>();
  const [empty, setEmpty] = useState<boolean>(true);
  const [metodoRecebimento, setMetodoRecebimento] = useState<string>("ENTREGA")
  const nav = useRouter()
  const [total, setTotal] = useState<number>(0)
  const [cep, setCep] = useState<string>("")
  const [close, setClose] = useState<boolean>(false)

  const [userLoged, setUserLoged] = useState<boolean>(false)
  const cart = useCartStore((state) => state.cart)
  const addToCarts = useCartStore((state) => state.addToCart)
  const incrementItem = useCartStore((state) => state.incrementItem)
  const decrementItem = useCartStore((state) => state.decrementItem)
  const removeFromCart = useCartStore((state) => state.removeFromCart)
  const clearCart = useCartStore((state) => state.clearCart)

  useEffect(() => {
    if (cart.length > 0) {
      setEmpty(false)
      setTotal(
        cart.reduce(
          (sum, item) => sum + (item.price) * item.quantidade,
          0
        )
      )
    } else {
      setEmpty(true)
    }
  }, [cart])

  const handleFinalizarCompra = () => {
    if (cart.length < 1) {
      return
    }
    nav.push('../../paymentTest')

  }


  return <div className="w-full dark:bg-background/90 bg-zinc-50 pb-20 px-12 lg:px-12 md:px-16 2xl:px-40 pt-6">
    <div className={` ${close ? 'fixed hidden invisible' : ' relative w-full pb-8'}`}>
      <LeveTambem setClose={setClose} />
    </div>
    <div className="flex items-end  relative">
      <h1 className="font-bold text-xl">Meu carrinho</h1>

    </div>
    {empty ? <div className="flex flex-col  m-auto space-y-8 justify-center items-center">
      <FaRegSadCry className="w-16 h-16" />
      <div className="flex flex-col justify-center">
        <h1 className="text-zinc-400 text-wrap text-center">Carrinho Vazio</h1>
        <h1 className="text-zinc-400 text-wrap text-center"><span className="text-primary"><Link href={'/'}>Adicionar itens</Link></span> para aproveitar nossas promoções</h1>
      </div>
    </div> : <div className="w-full  mt-2 flex justify-between space-x-8 ">
      <div className="w-[60%] h-max rounded-xl z-20">
        <div className="flex flex-col h-full justify-between md:py-0 py-4">

          <div className=" pb-4 w-full md:space-y-4">{cart?.map(d => <div key={d.id} className="p-3 md:p-6 md:bg-background shadow-md rounded-xl  dark:hover:bg-zinc-900  w-full justify-between flex">
            <div className="flex space-x-2 w-full">
              {d.image ? <Image alt="" width={200} height={200} src={d.image} className="md:w-32 md:h-32 w-24 h-24  rounded-lg" /> : null}
              <div className="flex flex-col w-full justify-between">
                <div>
                  <h1 className="text-md font-bold">{d.name}</h1>
                  <div className="flex items-center"><h1 className="font-extrabold text-primary text-sm">R$ {Number(d.price).toFixed(2)}</h1><p className="text-sm text-zinc-500">/cada</p></div>
                </div>
                <div className="w-full flex  items-center space-x-4">
                  <h1 className="text-sm text-muted-foreground">Total:</h1>
                  <div className="w-full h-0.5 bg-muted"></div>
                  <h1 className="font-bold">R${Number(Number(d.price) * d.quantidade).toFixed(2)}</h1>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex border p-1 md:p-3 w-max rounded-lg space-x-1">
                    <div onClick={() => { decrementItem(d.id) }} className=" duration-200 transition-all hover:text-primary dark:hover:bg-opacity-65 flex text-lg hover:cursor-pointer font-bold justify-center items-center p-1 rounded-full w-6 h-6">
                      -
                    </div>
                    <div className="  flex justify-center text-sm items-center p-1 rounded-full w-6 h-6">
                      {d.quantidade}
                    </div>
                    <div onClick={() => { incrementItem(d.id) }} className=" duration-200 transition-all hover:text-primary dark:hover:bg-opacity-65 flex text-lg hover:cursor-pointer  justify-center items-center p-1 rounded-full w-6 h-6">
                      +
                    </div>
                  </div>
                  <Trash onClick={() => { removeFromCart(d.id) }} className="text-end w-6 h-6 text-muted-foreground hover:cursor-pointer  " />
                </div>

              </div>
            </div>

          </div>)}
            <div className="w-full flex flex-col justify-start items-start">
              <h1 className="text-muted-foreground text-sm">Total de itens: {cart?.length}</h1>
              <Link className="text-center text-primary font-bold" href={{ pathname: '/' }}> &lt; Continuar comprando</Link>
            </div>
          </div>







        </div>

      </div>
      <div className="w-[40%]  bg-background  shadow-lg p-6 h-max  rounded-xl">
        <div className="pb-4 border-b ">
          <div className="flex justify-between items-center w-full">
            <h1 className="font-bold">Forma de recebimento</h1>
            <CiDeliveryTruck className="w-6 h-6" />
          </div>
          <div className="flex mt-4 space-x-4">
            <div onClick={() => {
              setMetodoRecebimento('ENTREGA')
            }} className={`${metodoRecebimento === "ENTREGA" ? 'border-primary bg-primary/5' : ''} flex space-x-2 border p-4 rounded-xl cursor-pointer justify-center items-center`}>
              <div className={` p-1.5 duration-300 transition-all bg-background rounded-full border-2 ${metodoRecebimento === 'ENTREGA' ? " border-primary " : "bg-background border-gray-300"
                }`}>
                <div
                  className={`w-4 h-4 duration-300 transition-all  rounded-full  ${metodoRecebimento === 'ENTREGA'
                    ? "bg-primary "

                    : "bg-background "
                    }`}
                ></div>
              </div>
              <div className="flex justify-center items-center space-x-2">
                <CiDeliveryTruck className="w-6 h-6 text-muted-foreground" />
                <h1 className='text-sm'>Entrega</h1>
              </div>
            </div>

            <div onClick={() => {
              setMetodoRecebimento('RETIRADA')
            }} className={`${metodoRecebimento === "RETIRADA" ? 'border-primary bg-primary/5' : ''} flex space-x-2 border p-4 rounded-xl cursor-pointer justify-center items-center`}>
              <div className={` p-1.5 duration-300 transition-all bg-background rounded-full border-2 ${metodoRecebimento === 'RETIRADA' ? " border-primary " : "bg-background border-gray-300"
                }`}>
                <div
                  className={`w-4 h-4 duration-300 transition-all  rounded-full  ${metodoRecebimento === 'RETIRADA'
                    ? "bg-primary "

                    : "bg-background "
                    }`}
                ></div>
              </div>
              <div className="flex justify-center items-center space-x-2">
                <CiLocationOn className="w-6 h-6 text-muted-foreground" />
                <h1 className='text-sm'>Retirada</h1>
              </div>
            </div>
          </div>
          {metodoRecebimento === "RETIRADA" ? <div className="mt-4">
            <div className="flex w-full mt-5 justify-between items-center" >
              <div className="flex space-x-3 items-center">
                <CiLocationOn className="text-primary border-primary w-8 h-8" />
                <h1 className="text-sm text-muted-foreground">Rua dasvxcv 45, Piritiba ba, proximo a adada ada</h1>
              </div>
            </div>
            <div className="bg-primary/5 mt-2 border rounded-sm mt p-2 w-full border-dashed">
              <h1 className="text-sm text-primary text-center">Você deve buscar seu pedido na loja, na opção RETIRADA!</h1>
            </div>
          </div> : metodoRecebimento === 'ENTREGA' ? <div className="mt-4">
            {userLoged ? <div>
              <div className="border-2 rounded-xl w-full border-primary border-dashed bg-primary/5 p-3 items-center flex justify-between">
                <div className="flex items-center w-1/2 justify-center space-x-2">
                  <CiLocationOn className="text-primary border-primary w-8 h-8" />
                  <h1 className="text-sm text-muted-foreground">Rua dasvxcv 45, Piritiba ba, proximo a adada ada</h1>
                </div>
                <FaCircleCheck className="text-primary border-primary w-5 h-5" />
              </div>
              <h1></h1>
            </div> : <div className="space-y-1 mt-6">
              <h1 className="text-muted-foreground text-sm">Calcular frete<span className="text-red-500">*</span></h1>
              <div className={`  duration-200 flex border rounded-2xl border-muted  focus-within:border-primary p-3 items-center space-x-2 w-full`}>
                <CiLocationOn className="text-muted-foreground w-5 h-5" />
                <InputMask mask={"99999-999"} value={cep} placeholder="Digite o CEP" type="text" onChange={(v) => {
                  setCep(v.target.value)
                }} className=" bg-transparent p-0 w-full border-0 outline-0" />
                <button>Calcular</button>
              </div>
            </div>}
          </div> : null}
        </div>
        <div className=" mt-4 pb-4">
          <AccordionCupom />
        </div>
        <div className=" rounded-xl dark:bg-zinc-900 bg-zinc-50 p-6 space-y-2">
          <div className="flex px-3 justify-between">
            <h1 className="">subTotal:</h1>
            <h1 className="">R$ {total.toFixed(2)}</h1>
          </div>
          <div className="flex px-3  py-1 justify-between">
            <h1 className="">frete:</h1>
            <h1 className="">R$ {total.toFixed(2)}</h1>
          </div>
          <div className="flex  flex-col border-t p-3 rounded-b-xl mt-2 justify-between">
            <p className="text-end  text-sm text-green-500">10% de desconto no PIX</p>
            <div className="w-full flex justify-between">
              <h1 className="font-extrabold text-xl">Total</h1>
              <h1 className="space-x-4 text-xl"><span className="text-muted-foreground text-sm line-through">R$ {total.toFixed(2)}</span><span className="font-bold">R$ {(total - (total * 10 / 100)).toFixed(2)}</span></h1>
            </div>
          </div>



        </div>

        <button onClick={() => {
          handleFinalizarCompra()
        }} className="w-full p-5 bg-primary rounded-xl mt-2 flex items-center justify-center">
          <h1 className="text-white font-bold">Finalizar compra</h1>
        </button>
      </div>
    </div>
    }

  </div>

}