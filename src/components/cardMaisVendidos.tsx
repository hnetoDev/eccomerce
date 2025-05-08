import { StarFilledIcon } from "@radix-ui/react-icons";
import { CircleCheck, CreditCard, HeartIcon, PercentDiamond } from "lucide-react";
import Image from "next/image";
import { CiDeliveryTruck } from "react-icons/ci";
import CartCustom from "./cart";

export default function CardSectionMais({ collection }: {
  collection?: {
    id: string;
    name: string;
    produtos: {
      id: string;
      name: string;
      image: string[];
      price: string;
      pricePromo: string;
    }[];
  }[]
}) {
  return (
    <div className="w-full space-x-6 flex justify-start items-start">

      {collection ? collection.map((c, i) => {
        return c.produtos.map((p, i) => {
          return (
          <div key={p.name} className="relative shadow-sm  dark:bg-zinc-900 min-w-[233px] p-3 flex-col rounded-xl flex justify-start  items-start">
            <div className="h-64 w-52 relative bg-primary/10 rounded-xl">
              <Image src={p.image[0]} width={200} height={200} className="w-52 h-64 rounded-xl" alt="" />
              <div className="absolute px-3 py-1 rounded-xl right-0 top-0  bg-primary">
                <h1 className="text-white"> -24%</h1>
              </div>
              <div className="absolute px-3 py-1 rounded-xl left-0 top-0">
                <HeartIcon className="text-primary" />
              </div>
            </div>
            <div className="mt-2  flex flex-col justify-start w-52 items-start">

              <h1 className="text-xl text-start font-bold ">{p.name}</h1>
              <div className="flex">
                <StarFilledIcon className="text-yellow-400" />
                <StarFilledIcon className="text-yellow-400" />
                <StarFilledIcon className="text-yellow-400" />
                <StarFilledIcon className="text-yellow-400" />
                <StarFilledIcon className="text-muted" />
              </div>
              <div className="flex items-start flex-col justify-start">
                <h1 className="  text-sm text-red-400 line-through">de R$ {p.price}</h1>
                <h1 className=" font-bold text-md text-muted-foreground">por <span className="text-xl text-black dark:text-white">R$ {Number(p.pricePromo).toFixed(2)}</span></h1>
              </div>
              <CartCustom id={p.id} name={p.name} qtd={1} price={p.price} img={p.image[0]} addToCart={true}>
                <button className="w-full p-3 flex justify-center items-center bg-primary text-white rounded-xl mt-4">Comprar</button>
              </CartCustom>

            </div>
          </div>)
        })
      }) : null}



    </div>
  )
}