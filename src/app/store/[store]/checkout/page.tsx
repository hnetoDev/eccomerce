'use client'
import { useSession } from "next-auth/react"
import { redirect, useRouter } from "next/navigation"
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
import { toast } from "react-toastify"
import { toastError, toastSuccess } from "@/components/toast"
import SignUpCredentials from "@/lib/signUpCredentials"


const fetchUserData = async (storeId: string, email?: string): Promise<DataUser> => {
  if (!email) throw new Error('Erro ao buscar dados')
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/findOneSecure`, {
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
  const session = useSession()
  const [userLoged, setUserLoged] = useState<boolean>(false)

  // erros
  const [eName, setEName] = useState<boolean>(false)
  const [eEmail, setEEmail] = useState<boolean>(false)
  const [eCPF, setECPF] = useState<boolean>(false)
  const [ePhone, setEPhone] = useState<boolean>(false)
  const [ePassword, setEPassword] = useState<boolean>(false)



  // dados
  const [cpf, setCPF] = useState<string>("")
  const [phone, setPhone] = useState<string>("")
  const [name, setName] = useState<string>("")
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [dataUser, setDataUser] = useState<DataUser | undefined>()
  // dados de endereço
  const [cep, setCep] = useState<string>("")
  const [estado, setEstado] = useState<string>("")
  const [cidade, setCidade] = useState<string>("")
  const [bairro, setBairro] = useState<string>("")
  const [numero, setNumero] = useState<string>("")
  const [endereco, setEndereco] = useState<string>("")

  // controle de dados
  const [metodoPayment, setMetodoPayment] = useState<string>("CREDITO")
  const [metodoRecebimento, setMetodoRecebimento] = useState<string>("ENTREGA")
  const [freteSelected, setFreteSelected] = useState<{ name: string, price: number }>()
  const [cepFinded, setCepFinded] = useState<boolean>(false)
  const [dadosFaltando, setDadosFaltando] = useState<string[]>([])
  const [changeEndereco, setChangeEndereco] = useState<boolean>(false)
  const [total, setTotal] = useState<number>(0)
  const [allReadyUser, setAllReadyUser] = useState<string>('WAITING')
  const [loadindEmail, setLoadindEmail] = useState<boolean>(false)


  const steps = ["Dados", "Pagamento", "Confirmação"];
  const theme = useTheme()

  const [qrCode, setQrCode] = useState<string | undefined>(undefined)

  const router = useRouter()

  const { data } = useQuery({
    queryKey: ['userData', session.data?.user?.email],
    enabled: !!session?.data?.user?.email,
    queryFn: () => fetchUserData(theme.id, session?.data?.user?.email),
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    refetchInterval: false,
    refetchOnMount: false,
    staleTime: 1000 * 60 * 20,
  })

  useEffect(() => {
    if (data) {
      setDataUser(data)
    }
  }, [data])



  const handleCredentials = async () => {
    if (!name || !email || !phone || !cpf) {
      toastError('Preencha todos os campos obrigatórios')
      return
    }
    SignUpCredentials({ storeName: theme.name, name, cpf, email, phone, password })
  }

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
          products: cart,
          userId: "cad0b9d2-2279-470e-84fc-61be87cd3f52",
          total: total,
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
      router.push(`/paymentTest/${resultPayment.id}`)
    }
  }



  const cart = useCartStore((state) => state.cart)

  useEffect(() => {
    if (cart && cart.length > 0) {
      setTotal(
        cart.reduce(
          (sum, item) => sum + (item.price) * item.quantidade,
          0
        ) + (freteSelected?.price ? freteSelected.price : 0)
      )
      console.log(total)
    }
  }, [cart, total, freteSelected])




  useEffect(() => {
    if (dataUser) {
      console.log(dataUser)
      setName(dataUser.name)
      setEmail(dataUser.email)

      if (!dataUser.phone) {
        setDadosFaltando(prev => [...prev, 'phone'])
      }
      if (!dataUser.cpf) {
        setDadosFaltando(prev => [...prev, 'cpf'])
      }
      if (!dataUser.password) {
        setDadosFaltando(prev => [...prev, 'password'])
      }

      setPhone(dataUser.phone ?? '')
      setCPF(dataUser.cpf ?? '')
      if (dataUser.Endereco) {
        setEndereco(dataUser.Endereco?.rua ?? '')
        setBairro(dataUser.Endereco?.bairro ?? '')
        setCidade(dataUser.Endereco?.cidade ?? '')
        setEstado(dataUser.Endereco?.estado ?? '')
        setNumero(dataUser.Endereco?.numero ? `${dataUser.Endereco.numero}` : '')
        setCep(dataUser.Endereco?.cep ?? '')
      }
    }
  }, [dataUser])


  return <div className="w-full dark:bg-black/60  flex flex-col pb-5 lg:px-12 md:px-16 2xl:px-28 justify-between pt-6 ">
    <div className="space-y-4 ">
      <div>
        <div className="px-4 w-1/3 mt-2   flex justify-start items-center">
          <Stepper setCurrentStep={setCurrentStep} steps={steps} currentStep={currentStep} />
        </div>
      </div>
      <div className="md:w-full md:visible md:relative w-0 invisible fixed">
        {cart ? <CheckoutDesktop setDataUser={setDataUser} handleCredentials={handleCredentials} freteSelected={freteSelected} changeEndereco={changeEndereco} setChangeEndereco={setChangeEndereco} setFreteSelected={setFreteSelected} dataUser={dataUser} total={total} setCidade={setCidade} setEndereco={setEndereco} setEstado={setEstado} setNumero={setNumero} endereco={endereco} numero={numero} estado={estado} cidade={cidade} setECPF={setECPF} setEEmail={setEEmail} setEPhone={setEPhone} setEName={setEName} cepFinded={cepFinded} setCepFinded={setCepFinded} setEPassword={setEPassword} cart={cart} ePassword={ePassword} password={password} setPassword={setPassword} handlePayment={handlePayment} allReadyUser={allReadyUser} setAllReadyUser={setAllReadyUser} userLoged={userLoged} loadingEmail={loadindEmail} setLoadingEmail={setLoadindEmail} metodoPayment={metodoPayment} metodoRecebimento={metodoRecebimento} setPhone={setPhone} cpf={cpf} cep={cep} phone={phone} email={email} setCurrentStep={setCurrentStep} currentStep={currentStep} name={name} setCPF={setCPF} setCep={setCep} setEmail={setEmail} setMetodoPayment={setMetodoPayment} setMetodoRecebimento={setMetodoRecebimento} setName={setName} setTotal={setTotal} /> : null}
      </div>
      <div className="w-full visible relative md:w-0 md:invisible md:fixed">
        {/*<CheckoutMobile setFinaly={setFinaly} allReadyUser={allReadyUser} setAllReadyUser={setAllReadyUser} userLoged={userLoged} loadingEmail={loadindEmail} setLoadingEmail={setLoadindEmail} metodoPayment={metodoPayment} metodoRecebimento={metodoRecebimento} setPhone={setPhone} cpf={cpf} cep={cep} total={total} phone={phone} email={email} setCurrentStep={setCurrentStep} currentStep={currentStep} name={name} setCPF={setCPF} setCep={setCep} setEmail={setEmail} setMetodoPayment={setMetodoPayment} setMetodoRecebimento={setMetodoRecebimento} setName={setName} setTotal={setTotal} />*/}
      </div>
      <button onClick={() => toastSuccess('Login realizado com sucesso')}>
        Sucesso
      </button>

    </div>
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
