import { CircleCheck, CreditCard, PercentDiamond } from "lucide-react";
import { CiDeliveryTruck } from "react-icons/ci";
import { PiCreditCardBold, PiSealPercentBold } from "react-icons/pi";
import { TbTruckDelivery } from "react-icons/tb";
export default function CardSection(){
  return (
    <div className="w-full flex justify-center space-x-6 items-center">
      <div className=" px-5 py-3 rounded-full flex space-x-2 items-center justify-center">
        <PiCreditCardBold className="w-16 h-16 text-primary"/>
        <h1 className="text-sm">Parcele em até 3x s/juros</h1>
      </div>
      <div className=" px-5 py-3 rounded-full flex space-x-2 items-center justify-center">
        <PiSealPercentBold className="w-16 h-16 text-primary"/>
        <h1 className="text-sm">Pix 10% off</h1>
      </div>
      <div className=" px-5 py-3 rounded-full flex space-x-2 items-center justify-center">
        <TbTruckDelivery className="w-16 h-16 text-primary"/>
        <h1 className="text-sm">Frete grátis</h1>
      </div>
      <div className=" px-5 py-3 rounded-full flex space-x-2 items-center justify-center">
        <CircleCheck className="w-16 h-16 text-primary"/>
        <h1 className="text-sm">Garantia de originalidae</h1>
      </div>
    </div>
  )
}