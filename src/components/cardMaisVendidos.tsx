import { CircleCheck, CreditCard, PercentDiamond } from "lucide-react";
import Image from "next/image";
import { CiDeliveryTruck } from "react-icons/ci";

export default function CardSectionMais() {
  return (
    <div className="w-full flex justify-around space-x-6 items-center">

      <div className="bg-primary group relative  h-52 min-w-[200px] w-full p-6 flex-col rounded-xl flex  items-center justify-center">
        <Image width={200} height={200} src={'/images/termo.png'} alt="creatina" className="w-3/4 group-hover:-translate-y-5 group-hover:scale-125 duration-200 transition-all" />
        <div className="absolute w-full h-full rounded-xl bg-gradient-to-t from-black to-transparent">
          <h1 className=" left-4 absolute bottom-4 font-bold text-white text-2xl">Pré treino</h1>
        </div>
      </div>
      <div className="bg-primary group relative  h-52 min-w-[200px] w-full p-6 flex-col rounded-xl flex  items-center justify-center">
        <Image width={200} height={200} src={'/images/creatina.png'} alt="creatina" className="w-3/4 group-hover:-translate-y-5 group-hover:scale-125 duration-200 transition-all" />
        <div className="absolute w-full h-full rounded-xl bg-gradient-to-t from-black to-transparent">
          <h1 className=" left-4 absolute bottom-4 font-bold text-white text-2xl">Creatina</h1>
        </div>
      </div>
      <div className="bg-primary group relative  h-52 min-w-[200px] w-full p-6 flex-col rounded-xl flex  items-center justify-center">
        <Image width={200} height={200} src={'/images/whey.webp'} alt="creatina" className="w-3/4 group-hover:-translate-y-5 group-hover:scale-125 duration-200 transition-all" />
        <div className="absolute w-full h-full rounded-xl bg-gradient-to-t from-black to-transparent">
          <h1 className=" left-4 absolute bottom-4 font-bold text-white text-2xl">Proteínas</h1>
        </div>
      </div>
      <div className="bg-primary group relative  h-52 min-w-[300px] w-full p-6 flex-col rounded-xl flex  items-center justify-center">
        <Image width={200} height={200} src={'/images/roupas.png'} alt="creatina" className="w-full h-full group-hover:-translate-y-5 group-hover:scale-125 duration-200 transition-all" />
        <div className="absolute w-full h-full rounded-xl bg-gradient-to-t from-black to-transparent">
          <h1 className=" left-4 absolute bottom-4 font-bold text-white text-2xl">Roupas</h1>
        </div>
      </div>
      
    </div>
  )
}