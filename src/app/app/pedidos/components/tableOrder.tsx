import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { EyeIcon } from "lucide-react"
import ProdutosComprados from "./produtos"
import DialogPayment from "@/components/dialog"

export default function TableOrders({data}:{data:{id:string,qrCode:string,method:string,total:number,createdAt:string,status:string,products: {name: string, img: string, id: string, price: number, qtd: number}[] }[]}){
  return <Table>
  <TableCaption></TableCaption>
  <TableHeader>
    <TableRow>
      <TableHead className="">Data</TableHead>
      <TableHead>Status</TableHead>
      <TableHead className="md:w-36 md:visible md:relative invisible w-0 fixed">Pagamento</TableHead>
      <TableHead>Total</TableHead>
      <TableHead className="text-right">Detalhes</TableHead>
      
    </TableRow>
  </TableHeader>
  <TableBody>
      {data.map(d => <TableRow key={d.id}>

      <TableCell className="font-medium">{d.createdAt.slice(0,10)}</TableCell>
      {d.status === 'PENDENTE' ? <TableCell className=""><DialogPayment total={d.total} pay={false} qrCodePrev={d.qrCode} />
      </TableCell> : <TableCell>{d.status}</TableCell>}
      <TableCell className="md:w-36 md:visible md:relative invisible w-0 fixed">{d.method.toUpperCase()}</TableCell>
      <TableCell>R$ {d.total.toFixed(2)}</TableCell>
      <TableCell className="text-right"><ProdutosComprados total={d.total} produtos={d.products}/></TableCell>

      </TableRow>)}

  </TableBody>
</Table>

}