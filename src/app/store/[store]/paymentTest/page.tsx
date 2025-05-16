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
import { useCartStore } from "@/lib/cartStore/cardStore"
import { useQuery } from "@tanstack/react-query"
import { DataUser } from "@/types"


const fetchUserData = async (storeId:string,email?: string) :Promise<DataUser> => {
  if (!email) throw new Error('Erro ao buscar dados')
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/findOneSecure`,{
    method: 'POST',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify({
      email,
      storeId
    })
  })
  if (!res.ok) throw new Error('Erro ao buscar dados')
  return res.json()
}

export default function PaymentPage() {

  const [currentStep, setCurrentStep] = useState(0);
  const [eName, setEName] = useState<boolean>(false)
  const [eEmail, setEEmail] = useState<boolean>(false)
  const [eCPF, setECPF] = useState<boolean>(false)
  const [ePhone, setEPhone] = useState<boolean>(false)
  const [ePassword,setEPassword] = useState<boolean>(false)
  const session = useSession()
  const [userLoged, setUserLoged] = useState<boolean>(false)
  const [cpf, setCPF] = useState<string>("")
  const [phone, setPhone] = useState<string>("")
  const [name, setName] = useState<string>("")
  const [email, setEmail] = useState<string>("")
  const [cep, setCep] = useState<string>("")
  const [estado, setEstado] = useState<string>("")
  const [cidade, setCidade] = useState<string>("")
  const [bairro, setBairro] = useState<string>("")
  const [numero, setNumero] = useState<string>("")
  const [endereco, setEndereco] = useState<string>("")
  const [total, setTotal] = useState<number>(0)
  const [metodoPayment, setMetodoPayment] = useState<string>("CREDITO")
  const [metodoRecebimento, setMetodoRecebimento] = useState<string>("ENTREGA")
  const steps = ["Dados", "Pagamento", "Resumo"];
  const [finaly, setFinaly] = useState<boolean>(false)
  const theme = useTheme()
  const [allReadyUser, setAllReadyUser] = useState<string>('WAITING')
  const [loadindEmail, setLoadindEmail] = useState<boolean>(false)
  const [qrCode, setQrCode] = useState<string | undefined>(undefined)
  const [password, setPassword] = useState<string>("")
  const [cepFinded, setCepFinded] = useState<boolean>(false)
  const [dadosFaltando, setDadosFaltando] = useState<string[]>([])





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
          products: '',
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


  
  const cart = useCartStore((state) => state.cart)
  
  useEffect(()=>{
    if(cart && cart.length > 0){
      setTotal(
        cart.reduce(
          (sum, item) => sum + (item.price) * item.quantidade,
          0
        )
      )
    }
  },[cart])

  const {data: dataUser} = useQuery({
    queryKey: ['userData',session.data?.user?.email],
    enabled: !!session?.data?.user?.email,
    queryFn: () => fetchUserData(theme.id,session?.data?.user?.email),
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    refetchInterval: false,
    refetchOnMount: false,
    staleTime: 1000 * 60 * 20,
  })


  useEffect(()=>{
    if(dataUser){
      console.log(dataUser)
      setName(dataUser.name)
      setEmail(dataUser.email)

      if(!dataUser.phone){
        setDadosFaltando(prev => [...prev,'phone'])
      }
      if(!dataUser.cpf){
        setDadosFaltando(prev => [...prev,'cpf'])
      }
      if(!dataUser.password){
        setDadosFaltando(prev => [...prev,'password'])
      }

      setPhone(dataUser.phone ?? '')
      setCPF(dataUser.cpf ?? '')
      setEndereco(dataUser.Endereco?.rua ?? '')
      setBairro(dataUser.Endereco?.bairro ?? '')
      setCidade(dataUser.Endereco?.cidade ?? '')
      setEstado(dataUser.Endereco?.estado ?? '')
      setNumero(dataUser.Endereco?.numero ? `${dataUser.Endereco.numero}` : '' )
      setCep(dataUser.Endereco?.cep ?? '')
    }
  },[dataUser])



  return <div className="w-full dark:bg-black/60  flex flex-col pb-5 lg:px-12 md:px-16 2xl:px-28 justify-between pt-6 ">
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
        <h1 className="text-center font-bold">Pagina de pagamentos</h1>
        <div className="px-4 w-full mt-2   flex justify-center items-center">
          <Stepper setCurrentStep={setCurrentStep} steps={steps} currentStep={currentStep} />
        </div>
      </div>
      <div className="md:w-full md:visible md:relative w-0 invisible fixed">
        {cart ? <CheckoutDesktop dataUser={dataUser} total={total} setCidade={setCidade} setEndereco={setEndereco} setEstado={setEstado} setNumero={setNumero} endereco={endereco} numero={numero} estado={estado} cidade={cidade} setECPF={setECPF} setEEmail={setEEmail} setEPhone={setEPhone} setEName={setEName}  cepFinded={cepFinded} setCepFinded={setCepFinded} setEPassword={setEPassword} cart={cart} ePassword={ePassword} password={password} setPassword={setPassword} handlePayment={handlePayment} setFinaly={setFinaly} allReadyUser={allReadyUser} setAllReadyUser={setAllReadyUser} userLoged={userLoged} loadingEmail={loadindEmail} setLoadingEmail={setLoadindEmail} metodoPayment={metodoPayment} metodoRecebimento={metodoRecebimento} setPhone={setPhone} cpf={cpf} cep={cep}  phone={phone} email={email} setCurrentStep={setCurrentStep} currentStep={currentStep} name={name} setCPF={setCPF} setCep={setCep} setEmail={setEmail} setMetodoPayment={setMetodoPayment} setMetodoRecebimento={setMetodoRecebimento} setName={setName} setTotal={setTotal} /> : null}
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
