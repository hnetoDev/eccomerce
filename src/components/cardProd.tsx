
import { StarFilledIcon, StarIcon } from "@radix-ui/react-icons";

import { MdAddShoppingCart } from "react-icons/md";
import CartCustom from "./cart";
import Link from "next/link";
import Image from "next/image";

export default function CardProd({ id,name, price,pricePromo ,img }: { id:string,img: string[], name: string, price: string,pricePromo: string }) {
 
  return <div className=" p-3  b rounded-lg w-[10.5rem] mobile:w-[12rem] 3xl:w-[19rem] mobile:p-4 2xl:w-[17rem]  md:w-64 xl:w-[14rem] md:p-6  h-max space-y-3 hover:shadow-md hover:rounded-lg  duration-700 transition-opacity transition-shadow ">
    <Link href={{pathname:`/app/produtos/${id}`}} className="flex flex-col space-y-3">
      {img ? <Image src={img[0]} width={100} height={100} alt="imagem produto"  className="rounded-lg w-full" /> : <div className="bg-muted rounded-lg w-full"></div>}
      <div className="flex h-[4rem] flex-col">
        <h1 className="font-bold text-wrap text-md md:text-xl">{name}</h1>
        <div className="flex">
          <StarFilledIcon className="text-yellow-400" />
          <StarFilledIcon className="text-yellow-400" />
          <StarFilledIcon className="text-yellow-400" />
          <StarFilledIcon className="text-yellow-400" />
          <StarFilledIcon />
        </div>
      </div>
    </Link>
    <div className="flex items-start flex-col justify-start">
      <h1 className="  text-sm text-red-400 line-through">de R$ {price}</h1>
      <h1 className=" font-bold text-md">por R$ {Number(pricePromo).toFixed(2)}</h1>
    </div>
    <CartCustom  id={id} name={name} price={price} img={img[0]} addToCart={true}>
      <button className="c bg-primary space-x-2 md:invisible rounded-lg w-full p-3  duration-700 transition-opacity flex justify-center items-center">
        <h1 className="text-background text-sm font-extrabold">Adicionar ao carrinho</h1>
        <MdAddShoppingCart className="text-background" size={25} />
      </button>
    </CartCustom>
  </div>
}