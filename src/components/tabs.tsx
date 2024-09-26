import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { QrCodeIcon } from "lucide-react"
import { CgDollar } from "react-icons/cg"
import { CiMoneyBill, CiPhone } from "react-icons/ci"
import { IoIosCellular } from "react-icons/io"
import { IoCellular, IoCellularOutline, IoPhonePortrait, IoPhonePortraitOutline } from "react-icons/io5"


import { ChartCaixa } from "./chartCaixa"

function CardForTabs({title,value,subTitle,icon}:{title:string,value:string,subTitle:string,icon:JSX.Element}){
  return <div className="border css2 bg-bg   p-6 rounded-xl space-y-3">
  <div className="flex items-center justify-between">
    <h1 className="text-sm font-bold">{title}</h1>
    {icon}
  </div>
  <div>
    <h1 className="font-bold text-2xl text-blue-500 tracking-wide">R${value}</h1>
    <p className="text-sm text-zinc-500">{subTitle}</p>
  </div>
</div>
}

function CardEntrada(){
  return <div className="flex items-center justify-between">
         <div className="flex space-x-2 items-center">
         <div className="w-12 h-12 rounded-full bg-yellow-400"></div>
         <div><h1 className="text-sm text-zinc-400">Hélio Neto</h1><h1 className="text-sm text-zinc-400">hnetorocha@gmail.com</h1></div>
         </div>
         <div>
          <h1 className="text-sm ">Pix</h1>
         </div>
          <div><h1 className="text-sm">21-09-24</h1></div>
         </div>
}

export function TabsCustom(){
  return <Tabs defaultValue="produtos" className=" bg-transparent w-full space-y-4">
  <TabsList className="w-full flex space-x-3 bg-transparent">
    <TabsTrigger className="p-3 rounded-3xl duration-300" value="produtos">Produtos</TabsTrigger>
    <TabsTrigger className="p-3 rounded-3xl duration-300" value="proteinas">Proteinas</TabsTrigger>
    <TabsTrigger className="p-3 rounded-3xl duration-300" value="pretreino">pretreino</TabsTrigger>
    <TabsTrigger className="p-3 rounded-3xl duration-300" value="aminoacidos">aminoacidos</TabsTrigger>
  </TabsList>
  <TabsContent className="grid grid-cols-4 gap-4" value="produtos"></TabsContent>
  <TabsContent value="proteinas"></TabsContent>
  <TabsContent value="aminoacidos"></TabsContent>
  <TabsContent value="pretreinos"></TabsContent>
</Tabs>

}