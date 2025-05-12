
import { StarFilledIcon, StarIcon } from "@radix-ui/react-icons";

import { MdAddShoppingCart } from "react-icons/md";
import CartCustom from "./cart";
import Link from "next/link";
import Image from "next/image";
import { HeartIcon } from "lucide-react";

export default function CardProdLanding({ id, name, price, pricePromo, img }: { id: string, img: string[], name: string, price: string, pricePromo: string }) {
  return <div className="w-64 relative h-[26rem] flex flex-col justify-between duration-200 transition-all hover:shadow-lg rounded-xl p-6 space-y-2">
    <div className="absolute px-3 py-1 rounded-xl z-10 left-8 top-10  bg-primary">
      <h1 className="text-white text-sm"> 24% OFF</h1>
    </div>
    
    <div className="w-full relative h-44 group overflow-hidden  rounded-lg">
    <div className="absolute bg-background/30 z-10 px-2 py-2 rounded-xl right-2 bottom-2">
      <HeartIcon onClick={()=>{
        alert(img[0])
        alert(img[1])
        
      }} className="text-primary" />
    </div>
      {/*<Image src={img[0]} width={400} height={400} alt="imagem produto" className="rounded-lg -z-10 w-full h-64   group-hover:fixed group-hover:invisible " />
      <Image src={img[1]} width={400} height={400} alt="imagem produto" className="rounded-lg w-full  h-64 group-hover:visible invisible " /> */}
      {img ? <Link href={{pathname:`/app/produtos/${id}`}}><Image src={img[0]} width={400} height={400} alt="imagem produto" className="rounded-lg -z-10 w-full h-44 group-hover:scale-110 duration-300 transition-all" /></Link> : <div className="bg-muted rounded-lg w-full"></div>}
    </div>
    <div className="flex  flex-col">
    <Link className="cursor-pointer" href={{pathname:`/app/produtos/${id}`}}>
      <h1 className="">{name}</h1>
    </Link>
      <div className="flex">
        <StarFilledIcon className="text-yellow-400" />
        <StarFilledIcon className="text-yellow-400" />
        <StarFilledIcon className="text-yellow-400" />
        <StarFilledIcon className="text-yellow-400" />
        <StarFilledIcon className="text-muted-foreground" />
      </div>
    </div>
    <div>
      <div className="flex items-center mt-2">
        <h1 className="text-primary text-xl font-bold">R${pricePromo ?? price}</h1>
        {pricePromo ? <h1 className="text-muted-foreground text-sm line-through ml-2">R${price}</h1> : null}
      </div>
      <p className="text-sm text-muted-foreground">3x de R$33,00 s/ juros</p>
    </div>
    <CartCustom id={id} name={name} price={price} img={img[0]} addToCart={true}>
      <button className="c bg-primary space-x-2  rounded-lg w-full p-3  duration-700 transition-opacity flex justify-center items-center">
        <h1 className="text-background text-sm font-extrabold">Comprar</h1>
      </button>
    </CartCustom>
  </div>
}