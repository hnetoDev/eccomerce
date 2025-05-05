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
import { ShoppingCartIcon, TicketPercentIcon, XCircle } from "lucide-react"
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { CgDetailsLess } from "react-icons/cg";
import { FaRegSadCry } from "react-icons/fa";
import { IoTrashOutline } from "react-icons/io5";
import { MdOutlineShoppingBag, MdPersonOutline } from 'react-icons/md';
import InputMask from "react-input-mask"
import Link from "next/link";
import { CiLocationOn } from "react-icons/ci";
import Image from "next/image";
export default function CartCheckout({ metodoRecebimento, total, setTotal, cep, setCep, setMetodoRecebimento }: { total: number, setTotal: Dispatch<SetStateAction<number>>, cep: string, setCep: Dispatch<SetStateAction<string>>, metodoRecebimento: string, setMetodoRecebimento: Dispatch<SetStateAction<string>> }) {
  const [data, setData] = useState<{ name: string, img: string, id: string, price: string, qtd: number }[]>();
  const [empty, setEmpty] = useState<boolean>(true);

  const nav = useRouter()

  useEffect(() => {
    const data = localStorage.getItem('cartItem')
    if (data) {
      const dataT = JSON.parse(data)
      setData(dataT)
      calcTotal();
      setEmpty(false)
      return
    }
  }, [total, empty])


  function calcTotal() {
    const dataCart = localStorage.getItem('cartItem')
    if (dataCart) {
      const dataT: { name: string, img: string, id: string, price: string, qtd: number }[] = JSON.parse(dataCart);
      let total: number = 0;
      dataT.map(d => {
        total += d.qtd * Number(d.price);
        return
      })
      return setTotal(total);
    }
    return setTotal(0)
  }

  const handleDown = (id: string) => {
    const dataCart = localStorage.getItem('cartItem');
    if (dataCart) {
      const dataT: { name: string, img: string, id: string, price: string, qtd: number }[] = JSON.parse(dataCart);

      const findId = dataT.find(d => d.id === id)
      if (findId!.qtd < 2) {
        const rest = [...dataT].filter(d => d.id !== id);
        if (rest.length > 0) {
          setData(rest);
          localStorage.setItem('cartItem', JSON.stringify([...rest]))
          return calcTotal()
        }
        setData([]);
        setEmpty(true);
        localStorage.removeItem('cartItem');
        calcTotal()
        return

      }
      const newCart = dataT.map(d => {
        if (d.id === id) {
          d.qtd--;
        }
        return d;
      })

      setData(newCart);
      localStorage.setItem('cartItem', JSON.stringify([...newCart]))
      return calcTotal()
    }

  }
  const handleUp = (id: string) => {
    const dataCart = localStorage.getItem('cartItem');
    if (dataCart) {
      const dataT: { name: string, img: string, id: string, price: string, qtd: number }[] = JSON.parse(dataCart);

      const newCart = dataT.map(d => {
        if (d.id === id) {
          d.qtd++
        }
        return d;
      })

      setData(newCart);
      localStorage.setItem('cartItem', JSON.stringify([...newCart]))
      return calcTotal()

    }
  }
  const attState = () => {
    const dataCart = localStorage.getItem('cartItem');
    if (dataCart) {
      const dataT: { name: string, img: string, id: string, price: string, qtd: number }[] = JSON.parse(dataCart)
      setData(dataT);
      calcTotal();
      setEmpty(false)
      return
    }
    setEmpty(true);
    return
  }

  const handleDelete = (id: string) => {
    const dataCart = localStorage.getItem('cartItem');
    if (dataCart) {
      const dataT: { name: string, img: string, id: string, price: string, qtd: number }[] = JSON.parse(dataCart);
      const rest = dataT.filter(d => d.id !== id)
      if (rest.length > 0) {
        setData(rest);
        localStorage.setItem('cartItem', JSON.stringify([...rest]));
        return calcTotal()
      }
      setData([]);
      setEmpty(true);
      localStorage.removeItem('cartItem')
      return calcTotal()

    }
  }


  return <div className="flex flex-col h-full justify-between md:py-0 py-4">
    <div className="flex items-end md:w-0 md:invisible md:fixed relative  justify-between">
      <h1 className="font-bold">Meu carrinho</h1>
      <MdOutlineShoppingBag className="w-8 h-8 " />
    </div>
    {empty ? <div className="flex flex-col  m-auto space-y-8 justify-center items-center">
      <FaRegSadCry className="w-16 h-16" />
      <div className="flex flex-col justify-center">
        <h1 className="text-zinc-400 text-wrap text-center">Carrinho Vazio</h1>
        <h1 className="text-zinc-400 text-wrap text-center"><span className="text-blue-500"><Link href={'/'}>Adicionar itens</Link></span> para aproveitar nossas promoções</h1>
      </div>
    </div> : <div className="border-b pb-4 w-full md:space-y-4">{data?.map(d => <div key={d.id} className="p-3 md:p-6 md:bg-background rounded-3xl  dark:hover:bg-zinc-900 hover:rounded-lg bg-opacity-65  w-full justify-between flex">
      <div className="flex space-x-2 nd">
        <Image alt="" width={200} height={200} src={d.img} className="md:w-32 md:h-32 w-24 h-24  rounded-lg" />
        <div className="flex flex-col justify-between">
          <div>
            <h1 className="text-md font-bold">{d.name}</h1>
            <div className="flex items-center"><h1 className="font-extrabold text-orange-500 text-sm">R$ {Number(d.price).toFixed(2)}</h1><p className="text-sm text-zinc-500">/cada</p></div>
          </div>
          <div className="flex border p-1 md:p-3 w-max rounded-lg space-x-1">
            <div onClick={() => { handleDown(d.id) }} className=" dark:hover:bg-opacity-65 flex text-lg hover:cursor-pointer font-bold justify-center items-center p-1 rounded-full w-6 h-6">
              -
            </div>
            <div className="  flex justify-center text-sm items-center p-1 rounded-full w-6 h-6">
              {d.qtd}
            </div>
            <div onClick={() => { handleUp(d.id) }} className=" dark:hover:bg-opacity-65 flex text-lg hover:cursor-pointer  justify-center items-center p-1 rounded-full w-6 h-6">
              +
            </div>
          </div>
        </div>
      </div>
      <XCircle onClick={() => { handleDelete(d.id) }} className="text-end w-6 h-6 text-red-600 hover:cursor-pointer  " />
    </div>)}
      <div className="w-full flex flex-col justify-start items-start">
        <h1 className="text-muted-foreground text-sm">Total de itens: {data?.length}</h1>
        <Link className="text-center text-orange-500 font-bold" href={{ pathname: '/' }}> &lt; Continuar comprando</Link>
      </div>
    </div>}

  </div>

}