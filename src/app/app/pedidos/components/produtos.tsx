import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { EyeIcon } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import CardProd from "@/components/cardProd"

export default function ProdutosComprados({ produtos,total }: { total:number,produtos: { name: string, img: string, id: string, price: number, qtd: number }[] }) {
  return <Dialog >
    <DialogTrigger><button className="p-2 rounded-lg font-bold bg-orange-500"><EyeIcon /></button></DialogTrigger>
    <DialogContent className="h-2/3">
      <div className="space-y-3">
        <h1 className=" font-extrabold">Detalhes da compra</h1>
        <ScrollArea className="h-3/4">
          {produtos.map(p =>{
            return <div key={p.id} className="flex mt-3 rounded-lg dark:hover:bg-zinc-900 p-2 space-x-3">
              <img src={`${process.env.NEXT_PUBLIC_API_URL}/public/${p.img}`} className="w-20 h-20 rounded-lg"/>
              <div className="">
                <h1 className="font-extrabold">{p.name}</h1>
                <h1 className="text-zinc-500">R$ {p.price}</h1>
              </div>
              <h1 className="text-orange-500">x{p.qtd}</h1>
            </div>
          })}
        </ScrollArea>
        <div className="flex w-full justify-between items-center">
        <h1 className="font-extrabold">Total</h1>
         <h1>R${total}</h1>
        </div>
      </div>

    </DialogContent>
  </Dialog>

}