import { StarFilledIcon } from "@radix-ui/react-icons";
import { CircleCheck, CreditCard, HeartIcon, PercentDiamond } from "lucide-react";
import Image from "next/image";
import { CiDeliveryTruck } from "react-icons/ci";
import CartCustom from "./cart";
import CardProd from "./cardProd";

export default function CardSectionMaisTest({ collection }: {
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
    <div className="w-full mb-4 space-x-6 px-12 overflow-x-scroll hide-scrollbar flex justify-start items-start">

      {collection ? collection.map((c, i) => {
        return c.produtos.map((p, i) => {
          return (
          <CardProd key={i} id={p.id} img={p.image} name={p.name} price={p.price} pricePromo={p.pricePromo} />)
        })
      }) : null}


    </div>
  )
}