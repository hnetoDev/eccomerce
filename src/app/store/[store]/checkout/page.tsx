'use client'
import { signIn, signOut, useSession } from "next-auth/react"
import { redirect, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { IoBackspace, IoTrashOutline } from "react-icons/io5"
import StepperCustom from "./components/stepper"
import { BarcodeIcon, Check, CheckCircle2, CheckCircle2Icon, CheckCircleIcon, CopyIcon, CreditCard, DollarSign, HelpCircle, ListCheckIcon, LockIcon, Pencil, ShoppingCartIcon, UserCircle, UserX, XCircle } from "lucide-react"
import { PersonIcon } from "@radix-ui/react-icons"
import { MdOutlineEmail, MdOutlineMailOutline, MdOutlinePhone, MdOutlinePix, MdPassword, MdPayment, MdPersonOutline, MdPix } from "react-icons/md"
import Stepper from "./components/stepper2"
import { FaCircleCheck, FaCircleDollarToSlot } from "react-icons/fa6";
import InputMask from "react-input-mask"
import { FaBars, FaWhatsapp } from "react-icons/fa"
import Image from "next/image"
import { CiDeliveryTruck, CiLocationOn } from "react-icons/ci"
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
import AccordionCupom from "./components/accordionCupom"
import { TbTruckDelivery } from "react-icons/tb"
import SignInCredentials from "@/lib/signInCredentials"
import { Loader } from "@/components/loader"
import { HiOutlineShoppingCart } from "react-icons/hi"
import { getInfoCEP } from "@/lib/cep/getCep"
import { getSubdomain } from "@/lib/getSubdomain"
import SearchDrawer from "@/components/searchDrawer"
import ResumoDrawer from "@/components/ResumoDrawer"
import CompleteDataUser from "@/lib/completeDataUser"


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
  const [loadingEmail, setLoadingEmail] = useState<boolean>(false)


  const steps = ["Dados", "Pagamento", "check"];
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
      router.push(`/checkout/${resultPayment.id}`)
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

  const completeDataUser = async () => {
    CompleteDataUser({
      id: dataUser?.id,
      cpf,
      phone,
      password,
      setDataUser,
      email
    })
  }



  const verifyEmail = async () => {
    if (email.length < 5 || !email.includes('@') || !email.includes('.')) {
      toastError('Preencha com um e-mail válido')
      setEEmail(true)
      return
    }
    setLoadingEmail(true)
    const verify = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/verifyEmail`, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({
        email,
        storeName: theme.name
      })
    })
    if (verify.ok) {
      const verifyData = await verify.json()
      if (verifyData) {
        setAllReadyUser('FIND')
        setLoadingEmail(false)
        return
      }
      setAllReadyUser("NOTFIND")
      setLoadingEmail(false)
      return
    }
    return

  }

  console.log(session.data?.user)


  const handleProx = () => {
    if (currentStep === 0) {
      if (!dataUser) {
        return toastError('Preencha os dados pessoais para continuar')
      }
      if (metodoRecebimento === 'ENTREGA') {
        if (!cepFinded) {
          toastError('Preencha o CEP para continuar')
        }
      }

    }
    if (currentStep === 1) {
      return handlePayment()
    }
    setCurrentStep(currentStep + 1)
  }



  return <div className="w-screen h-full overflow-x-hidden  dark:bg-black/60 lg:px-12 md:px-16 2xl:px-28 pb-32 md:p-20   pt-6 ">

    <div className="space-y-4 w-full ">
      <div className="w-full">
        <div className="md:px-4 px-6 md:w-1/3 mt-2 w-full     flex justify-center md:justify-start items-center">
          <Stepper setCurrentStep={setCurrentStep} steps={steps} currentStep={currentStep} />
        </div>
      </div>

      {
        // Componente de checkout responsivo
      }

      <div className=''>{/*md:w-full md:visible md:relative w-0 invisible fixed*/}
        <div className="w-full  flex justify-between space-x-6   pb-8 ">
          <div className="md:w-[64%] w-full  rounded-xl z-20">
            {currentStep === 0 ? <div className="visibleee rounded-xl">
              {dataUser ? <div className=" p-6 border-b ">
                <div className="flex w-full justify-between items-center">
                  <h1 className="font-bold text-lg ">1- Dados pessoais</h1>
                  <UserCircle className="w-6 h-6" />
                </div>
                <p className="text-sm text-muted-foreground mt-2">Entrou com</p>
                <div className=" space-x-4 mt-4 rounded-xl flex justify-between items-center ">
                  <div className="flex items-center space-x-4">
                    {dataUser ? <>
                      {dataUser.image ? <Image width={20} height={20} alt="Foto perfil" src={dataUser.image} className="w-10 h-10 border-2 border-primary rounded-full" /> : <UserCircle className="w-10 h-10" />}
                      <div className="flex flex-col">
                        <h1 className=" flex space-x-2"><span></span><span>{dataUser?.name} </span></h1>
                        <h1 className="text-sm flex space-x-2"><span className=""></span><span className="text-muted-foreground"> {dataUser?.email}</span>  </h1>

                      </div>
                    </> : <div className="p-6 w-full flex justify-center items-center"> <Loader /> </div>}
                  </div>
                  <button onClick={() => {
                    signOut()
                  }} className="flex p-3 border-2 items-center rounded-xl space-x-2">
                    <p className="text-sm text-muted-foreground">Sair</p>
                    <XCircle className="text-primary cursor-pointer" />
                  </button>

                </div>
                {!(dataUser.cpf) || !(dataUser.phone) ? <div className="mt-4">
                  <p className="text-sm  mt-2">Preencha os dados que faltam:</p>
                  <div className="space-y-2 mt-4">
                    {!dataUser.phone ?
                      <div className="space-y-1 mt-4">
                        <h1 className="text-muted-foreground text-sm">Telefone</h1>
                        <div className={`  duration-200 flex border-2 rounded-xl border-muted  focus-within:border-primary  p-3 items-center space-x-2 w-full`}>
                          <MdOutlinePhone size={20} className="text-muted-foreground" />
                          <InputMask mask={"(99) 99999-9999"} value={phone} placeholder="(__) _____-____" type="text" onChange={(v) => {
                            setEName(false)
                            setPhone(v.target.value)
                          }} className=" bg-transparent p-0 w-full border-0 outline-0" />
                        </div>
                      </div>
                      : null}
                  </div>
                  {!dataUser.cpf ? <div className="space-y-1 mt-2">
                    <h1 className="text-muted-foreground text-sm">CPF</h1>
                    <div className={`  duration-200 flex border-2 rounded-xl border-muted  focus-within:border-primary  p-3 items-center space-x-2 w-full`}>
                      <MdPassword size={20} className="text-muted-foreground" />
                      <InputMask mask={"999.999.999-99"} type="text" value={cpf} onChange={(v) => {
                        setECPF(false)
                        setCPF(v.target.value)
                      }} placeholder="___.___.___-__" className=" bg-transparent w-full border-0 outline-0" />
                    </div>
                    {eCPF ? <p className='text-sm text-red-500'><span className=''>X </span>CPF inválido</p> : null}
                  </div> : null}

                  <div className="space-y-1 mt-2">
                    <h1 className="text-muted-foreground text-sm">Senha</h1>
                    <div className={`  duration-200 flex border-2 rounded-xl border-muted  focus-within:border-primary  p-3 items-center space-x-2 w-full`}>
                      <LockIcon size={20} className="text-muted-foreground" />
                      <input type="password" value={password} onChange={(v) => {
                        setPassword(v.target.value)
                      }} placeholder="*********" className=" bg-transparent w-full border-0 outline-0" />
                    </div>
                  </div>
                  <button onClick={() => {
                    completeDataUser()
                  }} className="bg-primary mt-4 w-full rounded-xl text-primary-foreground p-3 px-5">Continuar</button>
                </div> : null}
                <div>

                </div>

              </div> : <>
                <div className="w-full flex flex-col">
                  <div className="">
                    {userLoged ? null : <div className=" p-6 border-b">
                      <div className="">
                        <h1 className="font-bold text-lg">1- Dados pessoais</h1>
                        <p className="text-sm text-muted-foreground mt-2">Entre com</p>
                        <div className="flex space-x-2 mt-2 items-center justify-center">
                          <div onClick={() => {
                            signIn('google', {
                              redirect: false,
                            })
                          }} className="rounded-xl   flex-col md:flex-row md:w-max space-x-0 w-1/3   hover:bg-primary/5 hover:border-primary duration-300  cursor-pointer transition-all md:space-x-2 border-2 p-3 justify-center items-center flex">
                            <Image alt="" width={50} height={50} src="/images/google.png" className="md:w-7 md:h-7 w-6 h-6" />
                            <h1 className="text-sm w-0 fixed invisible md:w-max md:visible md:relative ">Google</h1>
                          </div>
                          <div className="rounded-xl border-primary bg-primary/5 flex-col md:flex-row md:w-max space-x-0 w-1/3   hover:bg-primary/5 hover:border-primary duration-300  cursor-pointer transition-all md:space-x-2 border-2 p-3 justify-center items-center flex">
                            <MdOutlineMailOutline className="md:w-7 md:h-7 w-6 h-6" />
                            <h1 className="text-sm  w-0 fixed invisible md:w-max md:visible md:relative ">Email/senha</h1>
                          </div>
                          <div className="rounded-xl flex-col md:flex-row md:w-max space-x-0 w-1/3   hover:bg-primary/5 hover:border-primary duration-300  cursor-pointer transition-all md:space-x-2 border-2 p-3 justify-center items-center flex">
                            <HiOutlineShoppingCart className="md:w-7 md:h-7 w-6 h-6" />
                            <h1 className="text-sm w-0 fixed invisible md:w-max md:visible md:relative ">Rápida</h1>
                          </div>
                        </div>
                        <div className="flex w-full mt-4 justify-center items-center">
                          <div className="w-1/3 h-0.5 border-b border-muted"></div>
                          <div className="text-muted-foreground text-center w-1/5">ou</div>
                          <div className="w-1/3 h-0.5 border-b border-muted"></div>
                        </div>
                        <div className="mt-4">
                          <h1 className="text-sm text-muted-foreground">{allReadyUser === 'WAITING' ? 'Digite seu email para continuar' : allReadyUser === "FIND" ? 'Digite sua senha para fazer login em sua conta' : allReadyUser === "NOTFIND" ? 'Preencha os dados para continuar' : null}</h1>
                          <div className="space-y-2 mt-4">
                            <div className={` ${eEmail ? 'bg-red-50' : ''} duration-200 flex border-2 border-muted rounded-xl  focus-within:border-primary  p-3 items-center space-x-2 w-full`}>
                              <MdOutlineEmail size={20} className="text-muted-foreground" />
                              <input type="text" disabled={allReadyUser === 'FIND' || allReadyUser === 'NOTFIND' ? true : false} onChange={(v) => {
                                setEEmail(false)
                                setEmail(v.target.value)
                              }} placeholder="exemple@gmail.com" className=" bg-transparent p-0 w-full border-0 outline-0" />
                              {loadingEmail ? <Loader /> : allReadyUser === 'WAITING' ? <button onClick={() => {
                                verifyEmail()
                              }} className="text-primary">Continuar</button> : <Pencil onClick={() => {
                                setAllReadyUser('WAITING')
                              }} className="text-primary cursor-pointer" />}
                            </div>
                            {eEmail ? <p className='text-sm text-red-500'><span className=''>X </span> Preencha com um e-mail válido</p> : null}
                          </div>
                          {
                            allReadyUser === 'FIND' ? <div className="space-y-2 mt-2">
                              <h1 className=" text-sm text-muted-foreground">Senha<span className="text-red-500">*</span></h1>
                              <div className={`  duration-200 flex border-2 border-muted rounded-xl  focus-within:border-primary  p-3 items-center space-x-2 w-full`}>
                                <LockIcon size={20} className="text-muted-foreground" />
                                <input type="password" onChange={(v) => {
                                  setEPassword(false)
                                  setPassword(v.target.value)
                                }} placeholder="*******" className=" bg-transparent p-0 w-full border-0 outline-0" />

                              </div>
                              {ePassword ? <p className='text-sm text-red-500'><span className=''>X A senha tem no minimo 6 caracteres</span></p> : null}
                              <p className="text-sm text-muted-foreground underline">Esqueci minha senha</p>

                            </div> : allReadyUser === 'NOTFIND' ? <div className=" gap-4 grid  mt-5">
                              <div className="space-y-1">
                                <h1 className="text-muted-foreground text-sm">Nome <span className="text-red-500">*</span></h1>
                                <div className={`  duration-200 flex border-2 rounded-xl border-muted  focus-within:border-primary  p-3 items-center space-x-2 w-full`}>
                                  <MdPersonOutline size={20} className="text-muted-foreground" />
                                  <input type="text" value={name} onChange={(v) => {
                                    setName(v.target.value)
                                    setEName(false)
                                  }} placeholder="Jorge Ribeiro" className=" bg-transparent p-0 w-full border-0 outline-0" />
                                </div>
                                {eName ? <p className='text-sm text-red-500'><span className=''>X </span> Campo obrigatório</p> : null}
                              </div>

                              <div className="space-y-1">
                                <h1 className="text-muted-foreground text-sm">Telefone</h1>
                                <div className={`  duration-200 flex border-2 rounded-xl border-muted  focus-within:border-primary  p-3 items-center space-x-2 w-full`}>
                                  <MdOutlinePhone size={20} className="text-muted-foreground" />
                                  <InputMask mask={"(99) 99999-9999"} value={phone} placeholder="(__) _____-____" type="text" onChange={(v) => {
                                    setEName(false)
                                    setPhone(v.target.value)
                                  }} className=" bg-transparent p-0 w-full border-0 outline-0" />
                                </div>

                              </div>
                              <div className="space-y-1">
                                <h1 className="text-muted-foreground text-sm">CPF</h1>
                                <div className={`  duration-200 flex border-2 rounded-xl border-muted  focus-within:border-primary  p-3 items-center space-x-2 w-full`}>
                                  <MdPassword size={20} className="text-muted-foreground" />
                                  <InputMask mask={"999.999.999-99"} type="text" value={cpf} onChange={(v) => {
                                    setECPF(false)
                                    setCPF(v.target.value)
                                  }} placeholder="___.___.___-__" className=" bg-transparent w-full border-0 outline-0" />
                                </div>
                                {eCPF ? <p className='text-sm text-red-500'><span className=''>X </span>CPF inválido</p> : null}
                              </div>
                              <div className="space-y-1">
                                <h1 className="text-muted-foreground text-sm">Senha</h1>
                                <div className={`  duration-200 flex border-2 rounded-xl border-muted  focus-within:border-primary  p-3 items-center space-x-2 w-full`}>
                                  <LockIcon size={20} className="text-muted-foreground" />
                                  <input type="password" value={password} onChange={(v) => {
                                    setPassword(v.target.value)
                                  }} placeholder="*********" className=" bg-transparent w-full border-0 outline-0" />
                                </div>
                              </div>
                              <button onClick={() => {
                                handleCredentials()
                              }} className="bg-primary rounded-xl text-primary-foreground p-3 px-5">Continuar</button>
                            </div> : null
                          }
                          {allReadyUser === 'FIND' ? <div className="w-full flex  mt-4">
                            <button onClick={() => {
                              if (!password) {
                                return setEPassword(true)
                              }
                              if (password.length < 6) {
                                return setEPassword(true)
                              }

                              SignInCredentials({ email, password })
                            }} className="bg-primary w-full text-white rounded-lg p-3">Continuar</button>
                          </div> : null}


                        </div>

                      </div>
                    </div>}
                  </div>

                </div>
              </>}
              <div className=" p-6 mt-6 rounded-2xl">
                <div className="flex justify-between items-center w-full">
                  <h1 className="font-bold text-lg">2- Dados de entrega</h1>
                  <TbTruckDelivery className="w-6 h-6" />
                </div>
                <div className="flex mt-4 space-x-2  md:space-x-4">
                  <div onClick={() => {
                    setMetodoRecebimento('ENTREGA')
                  }} className={`${metodoRecebimento === "ENTREGA" ? 'border-primary bg-primary/5' : ''} flex space-x-2 border-2 w-full md:w-max p-4 rounded-xl cursor-pointer justify-center items-center`}>
                    <div className={` p-1.5 duration-300 transition-all bg-background rounded-full border-2 ${metodoRecebimento === 'ENTREGA' ? " border-primary " : "bg-background border-gray-300"
                      }`}>
                      <div
                        className={`w-4 h-4 duration-300 transition-all  rounded-full  ${metodoRecebimento === 'ENTREGA'
                          ? "bg-primary "

                          : "bg-background "
                          }`}
                      ></div>
                    </div>
                    <div className="flex justify-center items-center space-x-2">
                      <CiDeliveryTruck className="w-6 h-6 text-muted-foreground" />
                      <h1 className='text-sm'>Entrega</h1>
                    </div>
                  </div>

                  <div onClick={() => {
                    setMetodoRecebimento('RETIRADA')
                    setFreteSelected(undefined)
                  }} className={`${metodoRecebimento === "RETIRADA" ? 'border-primary bg-primary/5' : ''} flex w-full md:w-max space-x-2 border-2 p-4 rounded-xl cursor-pointer justify-center items-center`}>
                    <div className={` p-1.5 duration-300 transition-all bg-background rounded-full border-2 ${metodoRecebimento === 'RETIRADA' ? " border-primary " : "bg-background border-gray-300"
                      }`}>
                      <div
                        className={`w-4 h-4 duration-300 transition-all  rounded-full  ${metodoRecebimento === 'RETIRADA'
                          ? "bg-primary "

                          : "bg-background "
                          }`}
                      ></div>
                    </div>
                    <div className="flex justify-center items-center space-x-2">
                      <CiLocationOn className="w-6 h-6 text-muted-foreground" />
                      <h1 className='text-sm'>Retirada</h1>
                    </div>
                  </div>
                </div>
                {metodoRecebimento === "RETIRADA" ? <div className="mt-4">
                  <div className="flex w-full mt-5 justify-between items-center" >
                    <div className="flex space-x-3 items-center">
                      <CiLocationOn className="text-primary border-primary w-8 h-8" />
                      <h1 className="text-sm text-muted-foreground">Rua dasvxcv 45, Piritiba ba, proximo a adada ada</h1>
                    </div>
                  </div>
                  <div className="bg-primary/5 mt-2 border-2 rounded-sm mt p-2 w-full border-dashed">
                    <h1 className="text-sm text-primary text-center">Você deve buscar seu pedido na loja, na opção RETIRADA!</h1>
                  </div>
                </div> : metodoRecebimento === 'ENTREGA' ? <div className="mt-4">
                  {(dataUser?.Endereco && !changeEndereco) ? <div>
                    <h1 className="text-sm mt-4 text-muted-foreground">Seu endereço</h1>
                    <div className=" w-full mt-4 items-center flex justify-between">
                      <div className="flex items-center  justify-center space-x-2">
                        <CiLocationOn className="text-primary border-primary w-8 h-8" />
                        <div>
                          <h1 className="text-sm">{dataUser.Endereco.cidade}/{dataUser.Endereco.estado}</h1>
                          <h1 className="text-sm ">{dataUser.Endereco.rua}, {dataUser.Endereco.bairro},{dataUser.Endereco.numero},{dataUser.Endereco.complemento}</h1>
                        </div>
                      </div>
                      <button onClick={() => {
                        setChangeEndereco(true)
                      }} className="flex p-3 border-2 rounded-xl space-x-2">
                        <p className="text-sm text-muted-foreground">Alterar</p>
                        <Pencil className="text-primary border-primary w-5 h-5" />
                      </button>
                    </div>
                    {changeEndereco ? null : <div className="mt-4">
                      <h1 className="text-sm text-muted-foreground">Método de envio</h1>
                      <div>
                        <div onClick={() => {
                          setFreteSelected({
                            name: 'PAC',
                            price: 15.50
                          })
                        }} className={`${freteSelected?.name === 'PAC' ? 'border-primary bg-primary/5' : ''}  mt-4 flex space-x-2 border-2 p-3  rounded-t-xl justify-between cursor-pointer items-center`}>
                          <div className="flex space-x-2">
                            <div className="flex items-center space-x-4">
                              <div className={` p-1 duration-300 transition-all bg-background h-max rounded-full border-2 ${freteSelected?.name === "PAC" ? " border-primary " : "bg-background border-gray-300"
                                }`}>
                                <div
                                  className={`w-2 h-2 duration-300 transition-all  rounded-full  ${freteSelected?.name === "PAC"
                                    ? "bg-primary "

                                    : "bg-background "
                                    }`}
                                ></div>
                              </div>
                              <div className="flex justify-center flex-col">
                                <h1 className='text-sm'>Frete PAC <span className="text-muted-foreground"></span></h1>
                                <p className="text-muted-foreground text-sm">Prazo 7 a 12 dias úteis</p>
                              </div>
                            </div>
                          </div>
                          <h1>R$ 15,50</h1>
                        </div>
                        <div onClick={() => {
                          setFreteSelected({
                            name: 'EXPRESSO',
                            price: 32.10
                          })
                        }} className={`${freteSelected?.name === "EXPRESSO" ? 'border-primary bg-primary/5' : ''} flex space-x-2 border-2 p-3  rounded-b-xl justify-between cursor-pointer items-center`}>
                          <div className="flex items-center space-x-4">
                            <div className={` p-1 duration-300 transition-all bg-background h-max rounded-full border-2 ${freteSelected?.name === "EXPRESSO" ? " border-primary " : "bg-background border-gray-300"
                              }`}>
                              <div
                                className={`w-2 h-2 duration-300 transition-all  rounded-full  ${freteSelected?.name === "EXPRESSO"
                                  ? "bg-primary "

                                  : "bg-background "
                                  }`}
                              ></div>
                            </div>
                            <div className="flex justify-center flex-col">
                              <h1 className='text-sm'>Frete Expresso <span className="text-muted-foreground"></span></h1>
                              <p className="text-muted-foreground text-sm">Prazo 7 a 12 dias úteis</p>
                            </div>
                          </div>
                          <h1>R$ 32,10</h1>
                        </div>
                      </div>
                    </div>}

                  </div> : <div className="flex flex-col">
                    {changeEndereco ? <div className="w-full flex py-4 justify-between items-center">
                      <button onClick={async () => {
                        setChangeEndereco(false)
                        const cepString = dataUser?.Endereco?.cep
                        if (cepString) {
                          const dataCEP = await getInfoCEP(cepString.replace(/\D/g, ''))
                          if (dataCEP) {
                            setEndereco(dataCEP.logradouro)
                            setEstado(dataCEP.uf)
                            setCidade(dataCEP.cidade)
                            setCepFinded(true)
                          }
                        }
                      }} className="flex border-2 rounded-xl justify-center items-center p-3 space-x-2">
                        <h1>Cancelar alteração</h1>
                        <XCircle className="text-primary border-primary w-5 h-5" />
                      </button>
                    </div> : null}
                    <div className="space-y-2 ">
                      <h1 className="text-muted-foreground text-sm">Digite o CEP<span className="text-red-500">*</span></h1>
                      <div className="flex items-center space-x-8">
                        <div className={`  duration-200 flex border-2 rounded-2xl border-muted  focus-within:border-primary p-3 items-center space-x-2 w-full`}>
                          <CiLocationOn className="text-muted-foreground w-5 h-5" />
                          <InputMask mask={"99999-999"} value={cep} placeholder="_____-___" type="text" onChange={async (v) => {
                            setCep(v.target.value)
                            setCepFinded(false)
                            if (v.target.value.length === 9 && !v.target.value.includes('_')) {
                              const cepString = v.target.value;
                              const dataCEP = await getInfoCEP(cepString.replace(/\D/g, ''))
                              if (dataCEP) {
                                setEndereco(dataCEP.logradouro)
                                setEstado(dataCEP.uf)
                                setCidade(dataCEP.cidade)
                                setCepFinded(true)
                              }
                            }

                          }} className=" bg-transparent p-0 w-full border-0 outline-0" />
                          {cepFinded ? <Check className="text-green-500" /> : null}

                        </div>
                        {cepFinded ?
                          <div className=" flex justify-start">
                            <h1 className="text-muted-foreground ">{cidade}/{estado}</h1>
                          </div>
                          : null}


                      </div>
                    </div>
                    {
                      cepFinded ? <div className="flex flex-col mt-2 w-full">

                        <div className="w-full space-x-4 flex">
                          <div className="space-y-1 w-full ">
                            <h1 className="text-muted-foreground text-sm">Endereço<span className="text-red-500"> *</span></h1>
                            <div className={`  duration-200 flex border-2 rounded-2xl border-muted  focus-within:border-primary p-3 items-center space-x-2 w-full`}>
                              <input type="text" onChange={(v) => {

                              }} className=" bg-transparent p-0 w-full border-0 outline-0" />
                            </div>
                          </div>
                          <div className="space-y-1 ">
                            <h1 className="text-muted-foreground text-sm">Número<span className="text-red-500"> *</span></h1>
                            <div className={`  duration-200 flex border-2 rounded-2xl border-muted  focus-within:border-primary p-3 items-center space-x-2 w-full`}>
                              <input type="text" onChange={(v) => {
                                setNumero(v.target.value)
                              }} className=" bg-transparent p-0 w-full border-0 outline-0" />
                            </div>
                          </div>
                        </div>
                        <div className="w-full space-x-4 mt-2 flex">
                          <div className="space-y-1 w-1/2 ">
                            <h1 className="text-muted-foreground text-sm">Bairro<span className="text-red-500"> *</span></h1>
                            <div className={`  duration-200 flex border-2 rounded-2xl border-muted  focus-within:border-primary p-3 items-center space-x-2 w-full`}>
                              <input type="text" onChange={(v) => {

                              }} className=" bg-transparent p-0 w-full border-0 outline-0" />
                            </div>
                          </div>
                          <div className="space-y-1 w-1/2 ">
                            <h1 className="text-muted-foreground text-sm">Complemento<span className="text-red-500"> *</span></h1>
                            <div className={`  duration-200 flex border-2 rounded-2xl border-muted  focus-within:border-primary p-3 items-center space-x-2 w-full`}>
                              <input type="text" onChange={(v) => {
                                setNumero(v.target.value)
                              }} className=" bg-transparent p-0 w-full border-0 outline-0" />
                            </div>
                          </div>
                        </div>

                        <div className="mt-6">
                          <h1 className=" text-muted-foreground">Método de envio</h1>
                          <div>
                            <div onClick={() => {
                              setFreteSelected({
                                name: 'PAC',
                                price: 15.50
                              })
                            }} className={`${freteSelected?.name === 'PAC' ? 'border-primary bg-primary/5' : ''}  mt-4 flex space-x-2 border-2 p-3  rounded-t-xl justify-between cursor-pointer items-center`}>
                              <div className="flex space-x-2">
                                <div className="flex items-center space-x-4">
                                  <div className={` p-1 duration-300 transition-all bg-background h-max rounded-full border-2 ${freteSelected?.name === "PAC" ? " border-primary " : "bg-background border-gray-300"
                                    }`}>
                                    <div
                                      className={`w-2 h-2 duration-300 transition-all  rounded-full  ${freteSelected?.name === "PAC"
                                        ? "bg-primary "

                                        : "bg-background "
                                        }`}
                                    ></div>
                                  </div>
                                  <div className="flex justify-center flex-col">
                                    <h1 className='text-sm'>Frete PAC <span className="text-muted-foreground"></span></h1>
                                    <p className="text-muted-foreground text-sm">Prazo 7 a 12 dias úteis</p>
                                  </div>
                                </div>
                              </div>
                              <h1>R$ 15,50</h1>
                            </div>
                            <div onClick={() => {
                              setFreteSelected({
                                name: 'EXPRESSO',
                                price: 32.10
                              })
                            }} className={`${freteSelected?.name === "EXPRESSO" ? 'border-primary bg-primary/5' : ''} flex space-x-2 border-2 p-3  rounded-b-xl justify-between cursor-pointer items-center`}>
                              <div className="flex items-center space-x-4">
                                <div className={` p-1 duration-300 transition-all bg-background h-max rounded-full border-2 ${freteSelected?.name === "EXPRESSO" ? " border-primary " : "bg-background border-gray-300"
                                  }`}>
                                  <div
                                    className={`w-2 h-2 duration-300 transition-all  rounded-full  ${freteSelected?.name === "EXPRESSO"
                                      ? "bg-primary "

                                      : "bg-background "
                                      }`}
                                  ></div>
                                </div>
                                <div className="flex justify-center flex-col">
                                  <h1 className='text-sm'>Frete Expresso <span className="text-muted-foreground"></span></h1>
                                  <p className="text-muted-foreground text-sm">Prazo 7 a 12 dias úteis</p>
                                </div>
                              </div>
                              <h1>R$ 32,10</h1>
                            </div>
                          </div>
                        </div>
                      </div> : null
                    }

                  </div>}
                </div> : null}
              </div>
            </div> : null}
            {currentStep === 1 ? <div className="flex bg-background visibleee flex-col p-6 rounded-xl ">
              <h1 className="">Escolha o método de pagamento:</h1>
              <div className="grid mt-5   gap-4">
                <div onClick={() => {
                  setMetodoPayment('PIX')
                }} className={`${metodoPayment === "PIX" ? 'border-primary bg-primary/5' : ''} flex flex-col space-x-2 border-2 p-4 rounded-xl cursor-pointer justify-between  items-center`}>
                  <div className="flex items-center w-full justify-between space-x-2">
                    <div className="space-x-2 flex items-center">
                      <div className={` p-1 duration-300 transition-all bg-background rounded-full border-2 ${metodoPayment === 'PIX' ? " border-primary " : "bg-background border-gray-300"
                        }`}>
                        <div
                          className={`w-2 h-2 duration-300 transition-all  rounded-full  ${metodoPayment === 'PIX'
                            ? "bg-primary "

                            : "bg-background "
                            }`}
                        ></div>
                      </div>
                      <div className="flex justify-start w-full space-x-2">
                        <MdPix className="w-6 h-6 text-muted-foreground" />
                        <h1 className='text-sm'>Pix</h1>
                      </div>
                    </div>
                    <div className="">
                      <Image src={'/images/pix.svg'} alt="Logo da loja" width={40} height={40} className="rounded-lg w-16 h-8 " />
                    </div>
                  </div>
                  <div className="w-full flex justify-end">
                    <h1 className="text-sm text-green-500">5% de desconto no pix</h1>
                  </div>

                </div>
                <div onClick={() => {
                  setMetodoPayment('CREDITO')
                }} className={`${metodoPayment === "CREDITO" ? 'border-primary bg-primary/5' : ''} flex flex-col space-x-2 border-2  p-4 rounded-xl cursor-pointer justify-between items-center`}>
                  <div className="flex justify-between items-center w-full space-x-2">
                    <div className={` p-1 duration-300 transition-all bg-background rounded-full border-2 ${metodoPayment === 'CREDITO' ? " border-primary " : "bg-background border-gray-300"
                      }`}>
                      <div
                        className={`w-2 h-2 duration-300 transition-all  rounded-full  ${metodoPayment === 'CREDITO'
                          ? "bg-primary "

                          : "bg-background "
                          }`}
                      ></div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CreditCard className="w-6 h-6 text-muted-foreground" />
                      <h1 className='text-sm'>Cartão</h1>
                    </div>
                    <div className="flex w-full justify-end space-x-1">
                      <Image src={'/images/masterCard.svg'} alt="Logo da loja" width={40} height={40} className="rounded-lg w-8 h-8 " />
                      <Image src={'/images/visa.svg'} alt="Logo da loja" width={40} height={40} className="rounded-lg w-8 h-8 " />
                      <Image src={'/images/hipercard.png'} alt="Logo da loja" width={40} height={40} className="rounded-lg w-8 h-8 " />
                      <Image src={'/images/elo.png'} alt="Logo da loja" width={40} height={40} className="rounded-lg w-8 h-8 " />
                    </div>
                  </div>
                  <div className="w-full flex justify-end">
                    <h1 className="text-sm text-green-500">3x sem juros no cartão</h1>
                  </div>
                </div>
                <div onClick={() => {
                  setMetodoPayment('BOLETO')
                }} className={`${metodoPayment === "BOLETO" ? 'border-primary bg-primary/5' : ''} flex space-x-2 border-2  p-4 rounded-xl cursor-pointer justify-between items-center`}>
                  <div className={` p-1 duration-300 transition-all bg-background rounded-full border-2 ${metodoPayment === "BOLETO" ? " border-primary " : "bg-background border-gray-300"
                    }`}>
                    <div
                      className={`w-2 h-2 duration-300 transition-all  rounded-full  ${metodoPayment === "BOLETO"
                        ? "bg-primary "

                        : "bg-background "
                        }`}
                    ></div>
                  </div>
                  <div className="flex  items-center space-x-2">
                    <BarcodeIcon className="w-6 h-6 text-muted-foreground" />
                    <h1 className='text-sm'>Boleto</h1>
                  </div>
                  <div className="w-full"></div>
                </div>
                <div onClick={() => {
                  setMetodoPayment('WPP')
                }} className={`${metodoPayment === "WPP" ? 'border-primary bg-primary/5' : ''} flex space-x-2 border-2  p-4 rounded-xl cursor-pointer justify-between items-center`}>
                  <div className={` p-1 duration-300 transition-all bg-background rounded-full border-2 ${metodoPayment === 'WPP' ? " border-primary " : "bg-background border-gray-300"
                    }`}>
                    <div
                      className={`w-2 h-2 duration-300 transition-all  rounded-full  ${metodoPayment === 'WPP'
                        ? "bg-primary "

                        : "bg-background "
                        }`}
                    ></div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <FaWhatsapp className="w-6 h-6 text-muted-foreground" />
                    <h1 className='text-sm'>Whatsapp</h1>
                  </div>
                  <div className="w-full">

                  </div>
                </div>

              </div>
              {metodoPayment === "PIX" ? <div className="mt-12 space-y-4 flex flex-col justify-center items-center">
                <img src="/images/pix.svg" className="w-40   rounded-lg" />
                <h1 className="text-muted-foreground w-2/3 text-center text-sm">Ao finalizar o pagamento será gerado o QRCode, pague antes do vencimento para aprovar seu pedido</h1>
              </div> : null}
              {metodoPayment === "CREDITO" ? <div className="mt-12 space-y-4">
                <h1>Cartão de crédito:</h1>
                <div className="space-y-1">
                  <h1 className="text-muted-foreground text-sm">Nome do titular <span className="text-red-500">*</span></h1>
                  <div className={`  duration-200 flex border-2  rounded-xl border-muted  focus-within:border-primary  p-3 items-center space-x-2 w-full`}>

                    <input type="text" onChange={() => {
                      setEName(false)
                    }} className=" bg-transparent p-0 w-full border-0 outline-0" />
                  </div>
                  {eName ? <p className='text-sm text-red-500'><span className=''>X </span> Campo obrigatório</p> : null}
                </div>
                <div className="flex justify-between items-center w-full">
                  <div className="space-y-1 w-full">
                    <h1 className="text-muted-foreground text-sm">Numero do cartão <span className="text-red-500">*</span></h1>
                    <div className="w-full flex justify-between space-x-2 items-center">
                      <div className={`  duration-200 flex border-2  rounded-xl border-muted  focus-within:border-primary  p-3 items-center space-x-2 w-full`}>
                        <input type="text" onChange={() => {
                          setEName(false)
                        }} className=" bg-transparent p-0 w-full border-0 outline-0" />
                      </div>
                      <img width={100} height={40} alt="Bandeira do cartão" src="/images/masterCard.svg" className="w-12 h-12 m-auto  rounded-lg" />
                    </div>

                  </div>

                </div>
                <div className="flex justify-between space-x-2">
                  <div className="space-y-1">
                    <h1 className="text-muted-foreground text-sm">data de expiração <span className="text-red-500">*</span></h1>
                    <div className={`  duration-200 flex border-2  rounded-xl border-muted  focus-within:border-primary  p-3 items-center space-x-2 w-full`}>

                      <input type="text" onChange={() => {
                        setEName(false)
                      }} className=" bg-transparent p-0 w-full border-0 outline-0" />
                    </div>

                  </div>
                  <div className="space-y-1">
                    <h1 className=" w-full justify-between text-muted-foreground text-sm flex space-x-4"><span>CCV<span className="text-red-500">*</span></span><span><HelpCircle className="w-6 h-6" /></span></h1>
                    <div className={`  duration-200 flex border-2  rounded-xl border-muted  focus-within:border-primary  p-3 items-center space-x-2 w-full`}>

                      <input type="number" onChange={() => {
                        setEName(false)
                      }} className=" bg-transparent p-0 w-full border-0 outline-0" />
                    </div>

                  </div>
                </div>
              </div> : null}

            </div> : null}
            {currentStep === 2 ? <div className="flex bg-background p-6 rounded-xl flex-col visibleee space-y-4">
              <div>
                <h1 className="font-bold">Resumo do pedido</h1>
                <div className="space-y-4 mt-5 rounded-xl ">
                  {cart?.map(d => <div key={d.id} className=" hover:bg-zinc-100 rounded-lg dark:hover:bg-zinc-900 hover:rounded-lg bg-opacity-65  w-full justify-between flex">
                    <div className="flex  items-center space-x-2">
                      {d.image ? <Image width={100} height={100} alt="Produto" src={d.image} className="w-28 h-28  rounded-lg" /> : null}
                      <div className="flex flex-col justify-between">
                        <h1 className="">{d.name}</h1>
                        <div>
                          <h1 className="text-muted-foreground">Quantidade: {d.quantidade}</h1>
                          <div className="flex items-center"><h1 className="font-extrabold text-primary border-primary">R$ {d.price}</h1><p className="text-sm text-zinc-500">/cada</p></div>
                        </div>
                      </div>
                    </div>

                  </div>)}
                </div>
              </div>
              <div className=" border-t py-4 mt-8 w-full ">
                <h1 className="font-bold">Dados do comprador</h1>
                <div className="flex w-full mt-5 justify-between items-center">
                  <div className="flex space-x-3 items-center">
                    <UserCircle className="text-primary border-primary w-8 h-8" />
                    <div>
                      <h1>{name}</h1>
                      <h1 className="text-muted-foreground">{email}</h1>
                      <h1 className="text-muted-foreground">{phone}</h1>
                    </div>
                  </div>
                  <div className="">
                    <FaCircleCheck className="text-primary border-primary w-8 h-8" />
                  </div>
                </div>
              </div>
              <div className=" border-t py-4 mt-8 w-full ">
                <h1 className="font-bold">Dados de entrega</h1>
                <div>
                  <div className="flex w-full mt-5 justify-between items-center" >
                    <div className="flex space-x-3 items-center">
                      <CiLocationOn className="text-primary border-primary w-8 h-8" />
                      <h1>Retirar na loja</h1>
                    </div>
                    <div className="">
                      <FaCircleCheck className="text-primary border-primary w-8 h-8" />
                    </div>
                  </div>
                  <div className="mt-6">
                    <h1>Hélio Neto</h1>
                    <h1>hnetorocha@gmail.com</h1>
                    <h1>74998097796</h1>
                  </div>

                </div>
              </div>
              <div className=" border-t py-4 mt-8 w-full ">
                <h1 className="font-bold">Pagamento</h1>
                {metodoPayment === 'PIX' ? <div className="flex w-full mt-5 justify-between items-center">
                  <div className="flex space-x-2">
                    <img width={100} height={40} alt="Bandeira do cartão" src="/images/pix.svg" className="w-12 h-12  rounded-lg" />
                    <div>
                      <h1 className="text-muted-foreground">
                        PIX
                      </h1>
                      <h1 className="">
                        {cpf}
                      </h1>
                    </div>
                  </div>
                  <div className="">
                    <FaCircleCheck className="text-primary border-primary w-8 h-8" />
                  </div>
                </div> : null}

                {metodoPayment === 'CREDITO' ? <div className="flex w-full mt-5 justify-between items-center">
                  <div className="flex space-x-2">
                    <img width={100} height={40} alt="Bandeira do cartão" src="/images/masterCard.svg" className="w-12 h-12  rounded-lg" />
                    <div>
                      <h1 className="text-muted-foreground">
                        Master card
                      </h1>
                      <h1 className="">
                        **** **** **** 1234
                      </h1>
                    </div>
                  </div>
                  <div className="">
                    <FaCircleCheck className="text-primary border-primary w-8 h-8" />
                  </div>
                </div> : null}
                {metodoPayment === 'BOLETO' ? <div className="flex w-full mt-5 justify-between items-center"></div> : null}
                {metodoPayment === 'WPP' ? <div className="flex w-full mt-5 justify-between items-center">
                  <div className="flex items-center space-x-2">
                    <FaWhatsapp className="text-primary border-primary w-8 h-8" />
                    <div>
                      <h1 className="text-muted-foreground">
                        Whatsapp
                      </h1>
                      <h1 className="">
                        74998097796
                      </h1>
                    </div>
                  </div>
                  <div className="">
                    <FaCircleCheck className="text-primary border-primary w-8 h-8" />
                  </div>
                </div> : null}

              </div>


            </div> : null}
          </div>
          {currentStep < 4 ? <div className="md:w-[36%] w-0 md:relative md:visible fixed invisible   md:px-0 py-6 p-6 ">
            <div className="flex justify-between items-center">
              <h1 className="text-lg font-bold">Resumo do Pedido</h1>
              <ListCheckIcon className="text-primary w-8 h-8" />
            </div>
            <div className="bg-background mt-4 shadow-custom-light shadow-primary/30 duration-200 transition-all p-3 h-max  rounded-xl">
              <div className="flex  pb-2 flex-col">
                {cart?.map((d, i) => <div key={d.id} className={`  p-3 hover:bg-primary/5 rounded-xl  w-full justify-between flex`}>
                  <div className="flex space-x-2 w-full">
                    <div className="w-24">
                      {d.image ? <Image alt="" width={200} height={200} src={d.image} className="md:w-20 md:h-20 w-20 h-20  rounded-lg" /> : null}
                    </div>
                    <div className="flex flex-col w-full justify-between">
                      <div className="w-full flex justify-between items-center">
                        <div>
                          <h1 className=" ">{d.name}</h1>
                          <div className="flex items-center"><h1 className=" text-primary text-sm">R$ {Number(d.price).toFixed(2)}</h1></div>
                        </div>
                        <div>
                          <h1 className="text-muted-foreground text-sm">x {d.quantidade}</h1>
                        </div>
                      </div>
                      <div className="w-full flex  items-center space-x-4">
                        <h1 className="text-sm text-muted-foreground">Total:</h1>
                        <div className="w-full h-0.5 bg-muted"></div>
                        <h1 className="font-bold">R${Number(Number(d.price) * d.quantidade).toFixed(2)}</h1>
                      </div>


                    </div>
                  </div>

                </div>)}


              </div>
              <div className="bg-muted rounded-xl p-3">
                <div className="flex px-3 mt-4 justify-between">
                  <h1 className="text-sm text-muted-foreground">subTotal:</h1>
                  <h1 className="text-sm">R$ {total?.toFixed(2)}</h1>
                </div>
                <div className="flex px-3   py-1 justify-between">
                  <h1 className="text-sm text-muted-foreground">frete:</h1>
                  <h1 className="text-sm">R$ {freteSelected ? freteSelected.price.toFixed(2) : 0}</h1>
                </div>
                <div className="flex border-t flex-col p-3 rounded-b-xl  justify-between">
                  <p className="text-end  text-sm text-green-500">5% de desconto no PIX</p>
                  <div className="w-full flex justify-between">
                    <h1 className="font-extrabold text-xl">Total</h1>
                    <h1 className="space-x-4 text-xl "><span className="text-muted-foreground text-sm line-through">R$ {total?.toFixed(2)}</span><span className="font-bold">R$ {total ? (total - (total * 5 / 100)).toFixed(2) : 0}</span></h1>
                  </div>
                </div>
              </div>
              <div className="px-3">
                <AccordionCupom />
              </div>
              <button onClick={() => {

                handleProx()
              }} className="w-full p-5 bg-primary rounded-xl mt-2 flex items-center justify-center hover:bg-primary/90">
                <h1 className="text-white font-bold">{currentStep === 0 ? "Próximo" : 'Pagar agora'}</h1>
              </button>
            </div>
          </div> : null
          }


        </div >

      </div>
      {/*<div className="w-full visible relative md:w-0 md:invisible md:fixed">
        <CheckoutMobile setFinaly={setFinaly} allReadyUser={allReadyUser} setAllReadyUser={setAllReadyUser} userLoged={userLoged} loadingEmail={loadindEmail} setLoadingEmail={setLoadindEmail} metodoPayment={metodoPayment} metodoRecebimento={metodoRecebimento} setPhone={setPhone} cpf={cpf} cep={cep} total={total} phone={phone} email={email} setCurrentStep={setCurrentStep} currentStep={currentStep} name={name} setCPF={setCPF} setCep={setCep} setEmail={setEmail} setMetodoPayment={setMetodoPayment} setMetodoRecebimento={setMetodoRecebimento} setName={setName} setTotal={setTotal} />
      </div>*/}



    </div>
    <div className=" fixed right-0 left-0 bg-background border z-20  bottom-0   p-3">
      <ResumoDrawer cart={cart} total={total} frete={freteSelected?.price} cupon={''} subTotal={3} />
      <div className="w-full flex justify-between p-2">
        <h1 className="font-extrabold text-xl">Total</h1>
        <h1 className="space-x-4 text-xl "><span className="text-muted-foreground text-sm line-through">R$ {total?.toFixed(2)}</span><span className="font-bold">R$ {total ? (total - (total * 5 / 100)).toFixed(2) : 0}</span></h1>
      </div>
      <div className="flex w-full justify-between space-x-2">
        <button className="p-3 rounded-xl border-2 w-full flex justify-center items-center">Voltar</button>
        <button onClick={()=>{
          if(currentStep === 2){
            handlePayment()
          }
          setCurrentStep( currentStep => currentStep+1)
        }} className="p-3 bg-primary text-primary-foreground rounded-xl border-2 w-full flex justify-center items-center">Proximo</button>
      </div>
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
