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
export default function CartCustom({ addToCart, children, id, name, price, img, qtd }: { id?: string, name?: string, price?: string, img?: string, qtd?: number, children?: React.ReactNode, addToCart: boolean }) {
  const [data, setData] = useState<{ name: string, img: string, id: string, price: string, qtd: number }[]>();
  const [empty, setEmpty] = useState<boolean>(true);
  const [total, setTotal] = useState<number>(0);
  const nav = useRouter()
  const handleClick = () => {
    const dataCart = localStorage.getItem('cartItem');
    if (dataCart) {
      const dataT: { name: string, img: string, id: string, price: string, qtd: number }[] = JSON.parse(dataCart);
      const repetido = [...dataT].filter(d => d.id === id);
      const res = [...dataT].filter(d => d.id !== id);
      if (repetido.length > 0) {
        repetido[0].qtd++;
        setData(res ? [...repetido, ...res] : [...repetido])
        console.log(data);
        setEmpty(false)
        localStorage.setItem('cartItem', res ? JSON.stringify([...repetido, ...res]) : JSON.stringify([...repetido]))
        return calcTotal()
      }

    }

    setEmpty(false)
    setData(dataCart ? [...JSON.parse(dataCart), { id, name, price, img, qtd: 1 }] : [{ id, name, price, img, qtd: 1 }])
    localStorage.setItem('cartItem', dataCart ? JSON.stringify([...JSON.parse(dataCart), { id, name, price, img, qtd: 1 }]) : JSON.stringify([{ id, name, price, img, qtd: 1 }]))
    return calcTotal()
  }
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


  return <Sheet>
    <SheetTrigger className={`${addToCart ? 'w-full' : null}`}>{addToCart ? <div className="w-full" onClick={handleClick}>{children}</div> : <div className="relative">
      <div className="bg-orange-500 w-5 h-5 flex items-center justify-center absolute rounded-full p-2 -right-2 -bottom-2">
        <p className="text-sm font-bold">{data ? `${data.length}` : '0'}</p>
      </div>
      <MdOutlineShoppingBag onClick={attState} className="md:w-8 md:h-8 w-6 h-6 text-muted-foreground" />
    </div>}</SheetTrigger>
    <SheetContent side={'right'} className="w-[90vw]" >
      <SheetHeader>
        <SheetTitle><div className="flex items-center justify-center space-x-4"> <MdOutlineShoppingBag className="w-7 h-7" /><h1>Seu carrinho</h1></div></SheetTitle>

      </SheetHeader>
      <div className="flex flex-col h-full justify-between py-4">
        {empty ? <div className="flex flex-col  m-auto space-y-8 justify-center items-center">
          <FaRegSadCry className="w-16 h-16" />
          <div className="flex flex-col justify-center">
            <h1 className="text-zinc-400 text-wrap text-center">Carrinho Vazio</h1>
            <h1 className="text-zinc-400 text-wrap text-center">Adicione itens para aproveitar nossas promoções</h1>
          </div>
        </div> : <ScrollArea className="   h-[75vh]  ">{data?.map(d => <div key={d.id} className="p-3 hover:bg-zinc-100 dark:hover:bg-zinc-900 hover:rounded-lg bg-opacity-65  w-full justify-between flex">
          <div className="flex space-x-2">
            <img src={d.img} className="w-20  rounded-lg" />
            <div className="flex flex-col justify-between">
              <h1 className="text-md font-bold">{d.name}</h1>
              <div className="flex border w-max rounded-xl space-x-1">
                <div onClick={() => { handleDown(d.id) }} className=" dark:bg-zinc-800 dark:hover:bg-zinc-900 dark:hover:bg-opacity-65 flex text-lg hover:bg-zinc-200 hover:cursor-pointer font-bold justify-center items-center p-1 rounded-l-full w-6 h-6">
                  -
                </div>
                <div className=" dark:bg-zinc-800   flex justify-center text-sm items-center p-1 rounded-full w-6 h-6">
                  {d.qtd}
                </div>
                <div onClick={() => { handleUp(d.id) }} className=" dark:bg-zinc-800 dark:hover:bg-zinc-900 dark:hover:bg-opacity-65 flex text-lg hover:bg-zinc-200 hover:cursor-pointer  justify-center items-center p-1 rounded-r-full w-6 h-6">
                  +
                </div>
              </div>
              <div className="flex items-center"><h1 className="font-extrabold text-orange-500 text-sm">R$ {d.price}</h1><p className="text-sm text-zinc-500">/cada</p></div>
            </div>
          </div>
          <IoTrashOutline onClick={() => { handleDelete(d.id) }} className="text-end hover:cursor-pointer  " />
        </div>)}</ScrollArea>}
        <div className="w-full
        ">
          <div className=" rounded-t-3xl pt-3 bg-zinc-50 dark:bg-muted  mt-6">
            <div className="flex px-3 justify-between">
              <h1 className="">subTotal:</h1>
              <h1 className="">R$ {total.toFixed(2)}</h1>
            </div>
            <div className="flex  flex-col border-t p-3 rounded-b-3xl mt-2 justify-between">
              <p className="text-end  text-sm text-green-500">10% de desconto no PIX</p>
              <div className="w-full flex justify-between">
                <h1 className="font-extrabold">Total</h1>
                <h1 className="space-x-4 "><span className="text-muted-foreground text-sm line-through">R$ {total.toFixed(2)}</span><span className="font-bold">R$ {(total - (total * 10/100)).toFixed(2)}</span></h1>
              </div>
            </div>
          </div>
          <SheetClose onClick={() => {
            nav.push('/app/paymentTest')
          }} className="bg-orange-500 text-white font-extrabold flex justify-center items-center  w-full rounded-lg p-3">Finalizar compra</SheetClose>
        </div>
      </div>
    </SheetContent>

  </Sheet>

}