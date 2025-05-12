import { CircleCheck, CreditCard, PercentDiamond } from "lucide-react";
import { CiDeliveryTruck } from "react-icons/ci";
import { RiSecurePaymentLine } from "react-icons/ri";

export default function CardSection3(){
  return (
    <div className=" w-max flex space-x-4   gap-4">
      <div className=" rounded-full flex space-x-2 items-center">
        <CreditCard className="md:w-10 md:h-10 w-5 h-5 text-primary"/>
        <h1 className="text-sm">Parcele em até 3x s/juros</h1>
      </div>
      <div className=" rounded-full flex space-x-2 items-center">
        <PercentDiamond className="md:w-10 md:h-10 w-5 h-5 text-primary"/>
        <h1 className="text-sm">Pix 10% off</h1>
      </div>
      <div className=" rounded-full flex space-x-2 items-center">
        <CiDeliveryTruck className="md:w-10 md:h-10 w-5 h-5 text-primary"/>
        <h1 className="text-sm">Frete grátis</h1>
      </div>
      <div className=" rounded-full flex space-x-2 items-center">
        <RiSecurePaymentLine className="md:w-10 md:h-10 w-5 h-5 text-primary"/>
        <h1 className="text-sm">Pagamento seguro</h1>
      </div>
     
    </div>
  )
}