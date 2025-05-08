import { CircleCheck, CreditCard, PercentDiamond } from "lucide-react";
import { CiDeliveryTruck } from "react-icons/ci";

export default function CardSection(){
  return (
    <div className="w-full flex justify-around space-x-6 items-center">
      <div className="bg-muted hover:bg-primary/10 duration-200 transition-all min-w-[300px] w-full px-5 py-3 rounded-full flex space-x-2 items-center justify-center">
        <CreditCard className="w-10 h-10 text-primary"/>
        <h1 className="text-sm">Parcele em até 3x s/juros</h1>
      </div>
      <div className="bg-muted hover:bg-primary/10 duration-200 transition-all min-w-[300px] w-full px-5 py-3 rounded-full flex space-x-2 items-center justify-center">
        <PercentDiamond className="w-10 h-10 text-primary"/>
        <h1 className="text-sm">Pix 10% off</h1>
      </div>
      <div className="bg-muted hover:bg-primary/10 duration-200 transition-all min-w-[300px] w-full px-5 py-3 rounded-full flex space-x-2 items-center justify-center">
        <CiDeliveryTruck className="w-10 h-10 text-primary"/>
        <h1 className="text-sm">Frete grátis</h1>
      </div>
      <div className="bg-muted hover:bg-primary/10 duration-200 transition-all min-w-[300px] w-full px-5 py-3 rounded-full flex space-x-2 items-center justify-center">
        <CircleCheck className="w-10 h-10 text-primary"/>
        <h1 className="text-sm">Garantia de originalidae</h1>
      </div>
    </div>
  )
}