import { CircleCheck, CreditCard, PercentDiamond } from "lucide-react";
import { CiDeliveryTruck } from "react-icons/ci";

export default function CardSection2(){
  return (
    <div className="w-full grid md:grid-cols-4 grid-cols-2 gap-4">
      <div className=" min-w-[100px] rounded-full flex space-x-2 items-center">
        <CreditCard className="md:w-10 md:h-10 w-5 h-5 text-primary"/>
        <h1 className="text-sm">Parcele em até 3x s/juros</h1>
      </div>
      <div className=" min-w-[100px] rounded-full flex space-x-2 items-center">
        <PercentDiamond className="md:w-10 md:h-10 w-5 h-5 text-primary"/>
        <h1 className="text-sm">Pix 10% off</h1>
      </div>
      <div className=" min-w-[100px] rounded-full flex space-x-2 items-center">
        <CiDeliveryTruck className="md:w-10 md:h-10 w-5 h-5 text-primary"/>
        <h1 className="text-sm">Frete grátis</h1>
      </div>
      <div className=" min-w-[100px] rounded-full flex space-x-2 items-center">
        <CircleCheck className="md:w-10 md:h-10 w-5 h-5 text-primary"/>
        <h1 className="text-sm">Garantia de originalidae</h1>
      </div>
    </div>
  )
}