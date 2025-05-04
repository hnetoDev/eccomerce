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
import { ShoppingCartIcon, TicketPercentIcon } from "lucide-react"
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { CgDetailsLess } from "react-icons/cg";
import { FaRegSadCry } from "react-icons/fa";
import { IoTrashOutline } from "react-icons/io5";
import { MdOutlineShoppingBag, MdPersonOutline } from 'react-icons/md';
import InputMask from "react-input-mask"
import Link from "next/link";
import { CiLocationOn } from "react-icons/ci";
export default function CartCheckout({ metodoRecebimento, total,setTotal,cep, setCep, setMetodoRecebimento }: {total:number,setTotal:Dispatch<SetStateAction<number>>, cep: string, setCep: Dispatch<SetStateAction<string>>, metodoRecebimento: string, setMetodoRecebimento: Dispatch<SetStateAction<string>> }) {
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


  return <div className="flex flex-col h-full justify-between py-4">
    <div className="flex items-end  justify-between">
      <h1 className="font-bold">Meu carrinho</h1>
      <MdOutlineShoppingBag className="w-8 h-8 " />
    </div>
    {empty ? <div className="flex flex-col  m-auto space-y-8 justify-center items-center">
      <FaRegSadCry className="w-16 h-16" />
      <div className="flex flex-col justify-center">
        <h1 className="text-zinc-400 text-wrap text-center">Carrinho Vazio</h1>
        <h1 className="text-zinc-400 text-wrap text-center"><span className="text-blue-500"><Link href={'/'}>Adicionar itens</Link></span> para aproveitar nossas promoções</h1>
      </div>
    </div> : <div className="border-b pb-4 w-full"><ScrollArea className=" mt-6  ">{data?.map(d => <div key={d.id} className="p-3 hover:bg-zinc-100 dark:hover:bg-zinc-900 hover:rounded-lg bg-opacity-65  w-full justify-between flex">
      <div className="flex space-x-2">
        <img src={d.img} className="w-20  rounded-lg" />
        <div className="flex flex-col justify-between">
          <h1 className="text-md font-bold">{d.name}</h1>
          <div className="flex border w-max rounded-lg space-x-1">
            <div onClick={() => { handleDown(d.id) }} className="dark:hover:bg-zinc-900 dark:hover:bg-opacity-65 flex text-lg hover:bg-zinc-400 hover:cursor-pointer font-bold justify-center items-center p-1 rounded-full w-6 h-6">
              -
            </div>
            <div className="  flex justify-center text-sm items-center p-1 rounded-full w-6 h-6">
              {d.qtd}
            </div>
            <div onClick={() => { handleUp(d.id) }} className="dark:hover:bg-zinc-900 dark:hover:bg-opacity-65 flex text-lg hover:bg-zinc-400 hover:cursor-pointer  justify-center items-center p-1 rounded-full w-6 h-6">
              +
            </div>
          </div>
          <div className="flex items-center"><h1 className="font-extrabold text-orange-500 text-sm">R$ {d.price}</h1><p className="text-sm text-zinc-500">/cada</p></div>
        </div>
      </div>
      <IoTrashOutline onClick={() => { handleDelete(d.id) }} className="text-end w-6 h-6 text-red-600 hover:cursor-pointer  " />
    </div>)}</ScrollArea>
      <div className="w-full flex justify-center items-center">
        <Link className="text-center underline text-orange-500 mt-4" href={{ pathname: '/' }}>Adicionar mais produtos</Link>
      </div>
    </div>}
    <div className="mt-8 w-full  border-b pb-8">
      <h1 className="font-bold">Forma de recebimento</h1>
      <div className="flex mt-4 space-x-6">
        <div onClick={() => {
          setMetodoRecebimento('ENTREGA')
        }} className="flex space-x-2 justify-center items-center">
          <div className={` p-1.5 duration-300 transition-all bg-white rounded-full border-2 ${metodoRecebimento === 'ENTREGA' ? " border-orange-500 " : "bg-white border-gray-300"
            }`}>
            <div
              className={`w-4 h-4 duration-300 transition-all  rounded-full  ${metodoRecebimento === 'ENTREGA'
                ? "bg-orange-500 "

                : "bg-white "
                }`}
            ></div>
          </div>
          <h1>Entrega</h1>
        </div>
        <div onClick={() => {
          setMetodoRecebimento('RETIRADA')
        }} className="flex space-x-2 justify-center items-center">
          <div className={` p-1.5 duration-300 transition-all bg-white rounded-full border-2 ${metodoRecebimento === 'RETIRADA' ? " border-orange-500 " : "bg-white border-gray-300"
            }`}>
            <div
              className={`w-4 h-4 duration-300 transition-all  rounded-full  ${metodoRecebimento === 'RETIRADA'
                ? "bg-orange-500  "

                : "bg-white "
                }`}
            ></div>
          </div>
          <h1>Retirar na loja</h1>
        </div>
      </div>
      {metodoRecebimento === 'ENTREGA' ? <div className="space-y-1 mt-6">
        <h1 className="text-muted-foreground text-sm">Calcular frete<span className="text-red-500">*</span></h1>
        <div className={`  duration-200 flex border rounded-2xl border-muted  focus-within:border-orange-500 p-3 items-center space-x-2 w-full`}>
          <CiLocationOn className="text-muted-foreground w-5 h-5" />
          <InputMask mask={"99999-999"} value={cep} placeholder="Digite o CEP" type="text" onChange={(v) => {
            setCep(v.target.value)
          }} className=" bg-transparent p-0 w-full border-0 outline-0" />
          <button>Calcular</button>
        </div>
      </div> : null}
      {metodoRecebimento === 'RETIRADA' ? <div className="space-y-1 mt-6">
        <div>

          <div className="flex space-x-3 items-center">
            <CiLocationOn className="text-orange-500 w-8 h-8" />
            <div className="mt-6">
              <h1>Hélio Neto</h1>
              <h1>hnetorocha@gmail.com</h1>
              <h1>74998097796</h1>
            </div>
          </div>



        </div>
      </div> : null}
    </div>
    <div className="mt-8 w-full  border-b pb-8">
      <h1 className="font-bold">Adicionar cupom?</h1>
       <div className="space-y-1 mt-6">
        <h1 className="text-muted-foreground text-sm">Código do cupom<span className="text-red-500">*</span></h1>
        <div className={`  duration-200 flex border rounded-2xl border-muted  focus-within:border-orange-500 p-3 items-center space-x-2 w-full`}>
          <TicketPercentIcon className="text-muted-foreground w-5 h-5" />
          <input  value={cep} placeholder="JANEIRO10%OFF" type="text" onChange={(v) => {
            setCep(v.target.value)
          }} className=" bg-transparent p-0 w-full border-0 outline-0" />
          <button>Adicionar</button>
        </div>
      </div> 
    </div>
    <div className=" rounded-3xl pt-3 bg-muted space-y-2 mt-6">
      <div className="flex px-3 justify-between">
        <h1 className="">subTotal:</h1>
        <h1 className="">R$ {total.toFixed(2)}</h1>
      </div>
      <div className="flex px-3  py-1 justify-between">
        <h1 className="">frete:</h1>
        <h1 className="">R$ {total.toFixed(2)}</h1>
      </div>
      <div className="flex border-t p-3 rounded-b-3xl justify-between">
        <h1 className="font-extrabold">Total</h1>
        <h1 className="font-extrabold">R$ {total.toFixed(2)}</h1>
      </div>
    </div>
  </div>

}