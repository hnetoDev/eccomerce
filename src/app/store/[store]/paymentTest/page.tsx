'use client'
import { useSession } from "next-auth/react"
import { redirect } from "next/navigation"
import { useEffect, useState } from "react"
import { IoBackspace, IoTrashOutline } from "react-icons/io5"
import StepperCustom from "./components/stepper"
import { BarcodeIcon, CheckCircle2, CheckCircle2Icon, CheckCircleIcon, CopyIcon, CreditCard, DollarSign, HelpCircle, LockIcon, ShoppingCartIcon, UserCircle, UserX } from "lucide-react"
import { PersonIcon } from "@radix-ui/react-icons"
import { MdOutlineEmail, MdOutlinePhone, MdOutlinePix, MdPayment, MdPersonOutline } from "react-icons/md"
import Stepper from "./components/stepper2"
import { FaCircleCheck, FaCircleDollarToSlot } from "react-icons/fa6";
import InputMask from "react-input-mask"
import { FaBars, FaWhatsapp } from "react-icons/fa"
import Image from "next/image"
import { CiLocationOn } from "react-icons/ci"
import CartCheckout from "./components/cartCheckout"
import CheckoutMobile from "./components/checkoutMobile"
import CheckoutDesktop from "./components/chekoutDesktop"
import { useTheme } from "@/app/context"
import QRCode from "react-qr-code"


export default function PaymentPage() {

  const [currentStep, setCurrentStep] = useState(0);
  const [eName, setEName] = useState<boolean>(false)
  const [eEmail, setEEmail] = useState<boolean>(false)
  const [eCPF, setECPF] = useState<boolean>(false)
  const [ePhone, setEPhone] = useState<boolean>(false)
  const [ePassword,setEPassword] = useState<boolean>(false)
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
  const theme = useTheme()
  const [allReadyUser, setAllReadyUser] = useState<string>('WAITING')
  const [loadindEmail, setLoadindEmail] = useState<boolean>(false)
  const [qrCode, setQrCode] = useState<string | undefined>(undefined)
  const [password, setPassword] = useState<string>("")
  const handlePayment = async () => {
    let resultPayment = null;
    let method: string = '';

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/payment`, {
      method: "POST",
      headers: {
        'Content-type': "application/json"
      },
      body: JSON.stringify({
        "order": {
          products: data,
          userId: "cad0b9d2-2279-470e-84fc-61be87cd3f52",
          total: 38,
          method: method,
          entrega: false
        },
        "transaction_amount": Number(total.toFixed(2)),
        "description": "Compra de suplementos",
        "paymentMethodId": "pix",
        "email": "hnetorocha@gmail.com",
        "identificationType": "CPF",
        "number": '07644928537'
      })
    })
    if (res.ok) {
      resultPayment = await res.json()
      setQrCode(resultPayment.point_of_interaction.transaction_data.qr_code)
    }
  }


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
      <div className="bg-background p-6 rounded-xl space-y-4">
        <div className="bg-black rounded-xl w-80 h-80">
          {qrCode ? <QRCode
            size={256}
            style={{ height: "auto", maxWidth: "100%", width: "100%" }}
            value={qrCode}
            viewBox={`0 0 256 256`}
          /> : null}
        </div>
        <button className="bg-primary w-full space-x-3 text-white p-3 rounded-xl flex justify-center items-center"><CopyIcon /><h1>Copiar copia e cola</h1></button>
      </div>
      <div className="w-full flex flex-col space-y-4">
        <div className="bg-background p-6 space-x-4 rounded-xl h-max flex flex-col  justify-center items-center">
          <div className="flex space-x-4 items-center justify-center">
            <img src="/images/pix.svg" className="w-40" />
            <p className="text-muted-foreground text-sm">Escaneie o QRcode ou copie a chave pix, e faça o pagamento com o banco de sua prefência</p>
          </div>
          <div className="flex w-full justify-center mt-6 items-center">
            <h1 className="text-muted-foreground text-sm">pague <span className="text-primary font-bold text-3xl">R$ {total?.toFixed(2)}</span> </h1>
          </div>
        </div>
        <div className="bg-background p-6 rounded-xl space-y-4">
          <div className="flex space-x-4 items-center justify-center">
            <Image src={'/images/logoMenthosBlack.png'} alt="Logo da loja" width={130} height={30} className="rounded-lg dark:w-0 w-32 dark:fixed dark:invisible  overflow-y-visible " />
            <Image src={'/images/logoMenthos.png'} alt="Logo da loja" width={130} height={30} className="rounded-lg w-0 fixed invisible dark:w-32 dark:relative dark:visible  overflow-y-visible " />
            <div className="">
              <h1 className="text-muted-foreground text-sm text-center">Ao finalizar o pagamento, clique no botão para verificar se seu pagamento foi aprovado!</h1>
            </div>
          </div>
        </div>
        <button className="p-3 rounded-xl space-x-4 bg-primary flex justify-center items-center">
          <h1 className="text-white">Verificar pagamento</h1>
          <FaCircleDollarToSlot className="text-white" />
        </button>
      </div>

    </div> : <div className="space-y-4 mt-6">
      <div>
        <h1 className="text-center">Pagina de pagamentos</h1>
        <div className="px-4 w-full mt-2   flex justify-center items-center">
          <Stepper steps={steps} currentStep={currentStep} />
        </div>
      </div>
      <div className="md:w-full md:visible md:relative w-0 invisible fixed">
        <CheckoutDesktop setEPassword={setEPassword} ePassword={ePassword} password={password} setPassword={setPassword} handlePayment={handlePayment} setFinaly={setFinaly} allReadyUser={allReadyUser} setAllReadyUser={setAllReadyUser} userLoged={userLoged} loadingEmail={loadindEmail} setLoadingEmail={setLoadindEmail} metodoPayment={metodoPayment} metodoRecebimento={metodoRecebimento} setPhone={setPhone} cpf={cpf} cep={cep} total={total} phone={phone} email={email} setCurrentStep={setCurrentStep} currentStep={currentStep} name={name} setCPF={setCPF} setCep={setCep} setEmail={setEmail} setMetodoPayment={setMetodoPayment} setMetodoRecebimento={setMetodoRecebimento} setName={setName} setTotal={setTotal} />
      </div>
      <div className="w-full visible relative md:w-0 md:invisible md:fixed">
        <CheckoutMobile setFinaly={setFinaly} allReadyUser={allReadyUser} setAllReadyUser={setAllReadyUser} userLoged={userLoged} loadingEmail={loadindEmail} setLoadingEmail={setLoadindEmail} metodoPayment={metodoPayment} metodoRecebimento={metodoRecebimento} setPhone={setPhone} cpf={cpf} cep={cep} total={total} phone={phone} email={email} setCurrentStep={setCurrentStep} currentStep={currentStep} name={name} setCPF={setCPF} setCep={setCep} setEmail={setEmail} setMetodoPayment={setMetodoPayment} setMetodoRecebimento={setMetodoRecebimento} setName={setName} setTotal={setTotal} />
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
