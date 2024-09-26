import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { CheckIcon, CopyIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react"
import { FaPaste } from "react-icons/fa";
import QRCode from "react-qr-code"


export default function DialogPayment({ data,pay,qrCodePrev,total }: { total:number,qrCodePrev?:string,pay:boolean,data?: { email: string, cpf: string, userId: string, method: string } }) {
  const [qrCode, setQrCode] = useState()
  const [copiado,setCopiado] = useState(false)
  const nav = useRouter()
  
  const handlePayment = async () => {
    let resultPayment = null;
    let method: string = '';

    const dataCart = localStorage.getItem('cartItem');
    if(data){
      if (dataCart) {
        const dataT: { name: string, img: string, id: string, price: number, qtd: number }[] = JSON.parse(dataCart);
        if (data.method === 'pix') {
          method = 'pix'
          const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/payment`, {
            method: "POST",
            headers: {
              'Content-type': "application/json"
            },
            body: JSON.stringify({
              "order":{
                products: dataT,
                userId: data.userId,
                total: Number(total.toFixed(2)),
                method: data.method
              },
              "transaction_amount": Number(total.toFixed(2)),
              "description": "Compra de suplementos",
              "paymentMethodId": "pix",
              "email": data.email,
              "identificationType": "CPF",
              "number": data.cpf
            })
          })
          if (res.ok) {
            resultPayment = await res.json()
            setQrCode(resultPayment.point_of_interaction.transaction_data.qr_code)
            
          }
          //se não retorna erro;
        }
      }
    }



  }

  return <Dialog>
    <DialogTrigger className={`p-3 ${pay ? 'w-full' : null} font-extrabold rounded-lg bg-orange-500`} onClick={()=>{
      if(pay){
        handlePayment()
      }
    }}>{pay ? 'Finalizar compra' : 'Pagar'}</DialogTrigger>
    <DialogContent>
      <DialogHeader className="flex flex-col justify-center items-center">
        <h1 className="text-xl font-extrabold text-center">Pague R$ {total}</h1>
       
          {qrCodePrev ? <div className="flex items-center justify-center space-y-4 flex-col">
            <div className="w-60 h-60 border border-orange-500 p-3 rounded-lg ">
            <QRCode
              size={256}
              style={{ height: "auto", maxWidth: "100%", width: "100%" }}
              value={qrCodePrev}
              viewBox={`0 0 256 256`}
            />
          </div>
          <div className="flex flex-col justify-center items-center">
            <h1 className="font-extrabold">Copia e cola</h1>
            {copiado ? <div className="flex  p-6 space-x-3">
              <h1 className="font-extrabold">Copiado</h1>
              <CheckIcon className="text-green-500"/>
            </div> : <button onClick={()=>{
              navigator.clipboard.writeText(qrCodePrev)
              setCopiado(true);
            }}className="border dark:hover:bg-zinc-900 rounded-lg flex space-x-4  p-6">
              <h1 className="text-wrap max-w-60 overflow-x-hidden  ">Clique para copiar o codigo</h1>
              <button><CopyIcon/></button>
            </button>}
          </div>
          </div> :qrCode ? <div className="flex items-center justify-center space-y-3 flex-col ">
            <div className="w-60 h-60 border border-orange-500 p-3 rounded-lg ">
            <QRCode
              size={256}
              style={{ height: "auto", maxWidth: "100%", width: "100%" }}
              value={qrCode!}
              viewBox={`0 0 256 256`}
            />
          </div>
          <div className="flex flex-col justify-center items-center">
            <h1 className="font-extrabold">Copia e cola</h1>
            {copiado ? <div className="flex  p-6 space-x-3">
              <h1 className="font-extrabold">Copiado</h1>
              <CheckIcon className="text-green-500"/>
            </div> : <button onClick={()=>{
              navigator.clipboard.writeText(qrCode)
              setCopiado(true);
            }}className="border dark:hover:bg-zinc-900 rounded-lg flex space-x-4  p-6">
              <h1 className="text-wrap max-w-60 overflow-x-hidden  ">Clique para copiar o codigo</h1>
              <button><CopyIcon/></button>
            </button>}
          </div>
          </div> : null}
          
          <button onClick={()=>{
            nav.push('/app/pedidos')
          }} className="p-3 flex justify-center items-center bg-orange-500 text-primary font-extrabold rounded-lg w-80">Confirmar Pagamento</button>
      </DialogHeader>
    </DialogContent>
  </Dialog>

}