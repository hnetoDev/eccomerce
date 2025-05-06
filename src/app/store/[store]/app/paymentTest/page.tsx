'use client'
import { useSession } from "next-auth/react"
import { redirect } from "next/navigation"
import { useEffect, useState } from "react"
import { IoBackspace, IoTrashOutline } from "react-icons/io5"
import StepperCustom from "./components/stepper"
import { BarcodeIcon, CheckCircle2, CheckCircle2Icon, CheckCircleIcon, CopyIcon, CreditCard, HelpCircle, LockIcon, ShoppingCartIcon, UserCircle, UserX } from "lucide-react"
import { PersonIcon } from "@radix-ui/react-icons"
import { MdOutlineEmail, MdOutlinePhone, MdOutlinePix, MdPayment, MdPersonOutline } from "react-icons/md"
import Stepper from "./components/stepper2"
import { FaCircleCheck } from "react-icons/fa6";
import InputMask from "react-input-mask"
import { FaBars, FaWhatsapp } from "react-icons/fa"
import Image from "next/image"
import { CiLocationOn } from "react-icons/ci"
import CartCheckout from "./components/cartCheckout"
import CheckoutMobile from "./components/checkoutMobile"
import CheckoutDesktop from "./components/chekoutDesktop"


export default function PaymentPage() {

  const [currentStep, setCurrentStep] = useState(0);
  const [eName, setEName] = useState<boolean>(false)
  const [eEmail, setEEmail] = useState<boolean>(false)
  const [eCPF, setECPF] = useState<boolean>(false)
  const [ePhone, setEPhone] = useState<boolean>(false)
  const session = useSession()
  const [userLoged, setUserLoged] = useState<boolean>(false)
  const [data, setData] = useState<{ name: string, img: string, id: string, price: string, qtd: number }[]>()

  const [cpf, setCPF] = useState<string>("")
  const [phone, setPhone] = useState<string>("")
  const [name, setName] = useState<string>("")
  const [email, setEmail] = useState<string>("")
  const [cep, setCep] = useState<string>("")
  const [total, setTotal] = useState<number>(0)
  const [metodoPayment, setMetodoPayment] = useState<string>("CREDITO")
  const [metodoRecebimento, setMetodoRecebimento] = useState<string>("ENTREGA")
  const steps = ["Carrinho", "Dados", "Pagamento", "Resumo"];
  const [finaly, setFinaly] = useState<boolean>(false)

  useEffect(() => {
    const data = localStorage.getItem('cartItem')
    if (data) {
      const dataT = JSON.parse(data)
      setData(dataT)

      return
    }
  }, [])


  return <div className="w-full dark:bg-black/60 md:bg-zinc-100 flex flex-col pb-5 lg:px-12 md:px-12 xl:px-28 justify-between pt-6 ">
    {finaly ? <div className="flex  justify-center space-x-4  w-full">     
       <div className="bg-background p-6 space-y-4 rounded-xl h-max flex flex-col justify-center items-center">
        <img src="/images/pix.svg" className="w-40" />
        <h1 className="text-muted-foreground">Pague R${total.toFixed(2)}</h1>
        <button className="bg-orange-500 w-full space-x-3 text-white p-3 rounded-xl flex justify-center items-center"><h1>Ja paguei</h1><CopyIcon/></button>

      </div>
      <div className="bg-background p-6 rounded-xl space-y-2">
        <div className="bg-black rounded-xl w-60 h-60"></div>
        <button className="bg-orange-500 w-full space-x-3 text-white p-3 rounded-xl flex justify-center items-center"><CopyIcon/><h1>Copiar copia e cola</h1></button>
      </div>

    </div> : <div className="space-y-4 mt-6">
      <div>
        <h1 className="text-center">Pagina de pagamentos</h1>
        <div className="px-4 w-full mt-2   flex justify-center items-center">
          <Stepper steps={steps} currentStep={currentStep} />
        </div>
      </div>
      <div className="md:w-full md:visible md:relative w-0 invisible fixed">
        <CheckoutDesktop metodoPayment={metodoPayment} metodoRecebimento={metodoRecebimento} setPhone={setPhone} cpf={cpf} cep={cep} total={total} phone={phone} email={email} setCurrentStep={setCurrentStep} currentStep={currentStep} name={name} setCPF={setCPF} setCep={setCep} setEmail={setEmail} setMetodoPayment={setMetodoPayment} setMetodoRecebimento={setMetodoRecebimento} setName={setName} setTotal={setTotal} />
      </div>
      <div className="w-full visible relative md:w-0 md:invisible md:fixed">
        <CheckoutMobile metodoPayment={metodoPayment} metodoRecebimento={metodoRecebimento} setPhone={setPhone} cpf={cpf} cep={cep} total={total} phone={phone} email={email} setCurrentStep={setCurrentStep} currentStep={currentStep} name={name} setCPF={setCPF} setCep={setCep} setEmail={setEmail} setMetodoPayment={setMetodoPayment} setMetodoRecebimento={setMetodoRecebimento} setName={setName} setTotal={setTotal} />
      </div>

    </div>}





  </div>
}



/*
<div className=" overflow-y-scroll h-[75vh] ">{data?.map(d => <div key={d.id} className="p-3 hover:bg-zinc-100 hover:rounded-lg bg-opacity-65  w-full justify-between flex">
          <div className="flex space-x-2">
            <img src={`http://localhost:80/public/${d.img}`} className="w-16 rounded-lg" />
            <div className="flex flex-col justify-between">
              <h1 className="font-bold">{d.name}</h1>
              <div className="flex space-x-1">
                <div onClick={() => { handleDown(d.id) }} className="bg-zinc-300 flex text-lg hover:bg-zinc-400 hover:cursor-pointer font-bold justify-center items-center p-1 rounded-full w-6 h-6">
                  -
                </div>
                <div className="bg-zinc-300 flex justify-center text-sm items-center p-1 rounded-full w-6 h-6">
                  {d.qtd}
                </div>
                <div onClick={() => { handleUp(d.id) }} className="bg-zinc-300 flex text-lg hover:bg-zinc-400 hover:cursor-pointer  justify-center items-center p-1 rounded-full w-6 h-6">
                  +
                </div>
              </div>
              <div className="flex items-center"><h1 className="font-extrabold text-sm">R$ {d.price}</h1><p className="text-sm text-zinc-500">/cada</p></div>
            </div>
          </div>
          <IoTrashOutline  onClick={()=>{handleDelete(d.id)}} className="text-end hover:cursor-pointer  " />
        </div>)}</div>

*/
