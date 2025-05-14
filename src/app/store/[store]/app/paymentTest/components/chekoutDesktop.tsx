

'use client'
import { signIn, useSession } from "next-auth/react"
import { redirect } from "next/navigation"
import { useEffect, useState } from "react"
import { IoBackspace, IoTrashOutline } from "react-icons/io5"
import { BarcodeIcon, CheckCircle2, CheckCircle2Icon, CheckCircleIcon, CircleUser, CreditCard, HelpCircle, LockIcon, Pencil, ShoppingCartIcon, TicketPercentIcon, UserCircle, UserX } from "lucide-react"
import { PersonIcon } from "@radix-ui/react-icons"
import { MdOutlineEmail, MdOutlinePhone, MdOutlinePix, MdPassword, MdPayment, MdPersonOutline, MdPix } from "react-icons/md"
import Stepper from "./stepper2"
import { FaCircleCheck } from "react-icons/fa6";
import InputMask from "react-input-mask"
import { FaBars, FaEdit, FaWhatsapp } from "react-icons/fa"
import Image from "next/image"
import { CiDeliveryTruck, CiLocationOn } from "react-icons/ci"
import CartCheckout from "./cartCheckout"
import AccordionCupom from "./accordionCupom"
import { getSubdomain } from "@/lib/getSubdomain"
import { Loader } from "@/components/loader"
import SignInCredentials from "@/lib/signInCredentials"
import LeveTambem from "./leveTambem"


export default function CheckoutDesktop({ setEPassword, ePassword, password, setPassword, handlePayment, setFinaly, setLoadingEmail, setAllReadyUser, allReadyUser, loadingEmail, userLoged, data, name, cpf, phone, email, cep, total, setEmail, setCPF, setMetodoRecebimento, setCep, setName, setPhone, setTotal, metodoPayment, setMetodoPayment, metodoRecebimento, currentStep, setCurrentStep }: {
  data?: {
    name: string;
    img: string;
    id: string;
    price: string;
    qtd: number;
  }[], setEmail: React.Dispatch<React.SetStateAction<string>>, setCep: React.Dispatch<React.SetStateAction<string>>, setPhone: React.Dispatch<React.SetStateAction<string>>, name: string, cpf: string, phone: string, email: string, cep: string, total: number, setName: React.Dispatch<React.SetStateAction<string>>, setCPF: React.Dispatch<React.SetStateAction<string>>, setTotal: React.Dispatch<React.SetStateAction<number>>, metodoPayment: string, setMetodoPayment: React.Dispatch<React.SetStateAction<string>>, metodoRecebimento: string, setMetodoRecebimento: React.Dispatch<React.SetStateAction<string>>, setCurrentStep: React.Dispatch<React.SetStateAction<number>>, currentStep: number,
  setLoadingEmail: React.Dispatch<React.SetStateAction<boolean>>, loadingEmail: boolean, setAllReadyUser: React.Dispatch<React.SetStateAction<string>>, allReadyUser: string, userLoged: boolean,
  setFinaly: React.Dispatch<React.SetStateAction<boolean>>,
  setPassword: React.Dispatch<React.SetStateAction<string>>,
  setEPassword: React.Dispatch<React.SetStateAction<boolean>>,
  ePassword: boolean,
  password: string,
  handlePayment: () => Promise<void>
}) {


  const [eName, setEName] = useState<boolean>(false)
  const [eEmail, setEEmail] = useState<boolean>(false)
  const [eCPF, setECPF] = useState<boolean>(false)
  const [ePhone, setEPhone] = useState<boolean>(false)
  const session = useSession()



  const verifyEmail = async () => {
    const subdominio = getSubdomain()
    if (email.length < 5 || !email.includes('@') || !email.includes('.')) {
      return setEEmail(true)
    }
    setLoadingEmail(true)
    const verify = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/verifyEmail`, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({
        email,
        storeName: subdominio
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





  return <div className="w-full pb-20 px-12">

    <div className="w-full  flex justify-between space-x-8 ">
      <div className="w-[62%] rounded-xl z-20">
        {currentStep === 0 ? <CartCheckout total={total} setTotal={setTotal} cep={cep} setCep={setCep} setMetodoRecebimento={setMetodoRecebimento} metodoRecebimento={metodoRecebimento} /> : null}
        {currentStep === 1 ? <div className="visibleee rounded-xl">
          {session.data?.user ? <>
            <div className="border flex rounded-lg p-3">
              <div className="flex items-center space-x-2">
                {session.data?.user.image ? <Image width={20} height={20} alt="Foto perfil" src={session.data?.user.image} className="w-10 rounded-full" /> : <UserCircle className="w-10 h-10" />}

                <div className="flex flex-col">
                  <h1 className="font-bold">{session.data?.user.name}</h1>
                  <p className="text-sm text-zinc-500">{session.data?.user.email}</p>
                </div>
              </div>
            </div>
          </> : <>
            <div className="w-full flex flex-col">

              <div className="">
                {userLoged ? null : <div className="bg-background p-6 rounded-2xl">
                  <div className="">
                    <h1 className="font-bold">Dados pessoais</h1>
                    <div className="flex w-full space-x-3  justify-center items-center mt-5">
                      <CircleUser className="w-12 h-12  text-muted-foreground" />
                      <div className="space-y-3">
                        <div className="h-1 w-20  rounded-md bg-muted-foreground"></div>
                        <div className="h-1 w-24  rounded-md bg-muted-foreground"></div>
                      </div>
                    </div>
                    <div className="mt-8">
                      <h1 className="">{allReadyUser === 'WAITING' ? 'Digite seu email para continuar' : allReadyUser === "FIND" ? 'Digite sua senha para fazer login em sua conta' : allReadyUser === "NOTFIND" ? 'Preencha os dados para continuar' : null}</h1>
                      <div className="space-y-2 mt-4">
                        <h1 className=" text-sm text-muted-foreground">Email<span className="text-red-500">*</span></h1>
                        <div className={` ${eEmail ? 'bg-red-50' : ''} duration-200 flex border border-muted rounded-xl  focus-within:border-primary  p-3 items-center space-x-2 w-full`}>
                          <MdOutlineEmail size={20} className="text-muted-foreground" />
                          <input type="text" disabled={allReadyUser === 'FIND' ? true : false} onChange={(v) => {
                            setEEmail(false)
                            setEmail(v.target.value)
                          }} placeholder="exemple@gmail.com" className=" bg-transparent p-0 w-full border-0 outline-0" />
                          {loadingEmail ? <Loader /> : allReadyUser === 'WAITING' ? <button onClick={() => {
                            verifyEmail()
                          }} className="text-primary">Continuar</button> : allReadyUser === 'FIND' ? <Pencil onClick={() => {
                            setAllReadyUser('WAITING')
                          }} className="text-primary cursor-pointer" /> : null}
                        </div>
                        {eEmail ? <p className='text-sm text-red-500'><span className=''>X </span> Preencha com um e-mail válido</p> : null}
                      </div>
                      {
                        allReadyUser === 'FIND' ? <div className="space-y-2 mt-2">
                          <h1 className=" text-sm text-muted-foreground">Senha<span className="text-red-500">*</span></h1>
                          <div className={`  duration-200 flex border border-muted rounded-xl  focus-within:border-primary  p-3 items-center space-x-2 w-full`}>
                            <MdPassword size={20} className="text-muted-foreground" />
                            <input type="password" onChange={(v) => {
                              setEPassword(false)
                              setPassword(v.target.value)
                            }} placeholder="*******" className=" bg-transparent p-0 w-full border-0 outline-0" />

                          </div>
                          {ePassword ? <p className='text-sm text-red-500'><span className=''>X A senha tem no minimo 6 caracteres</span></p> : null}
                          <p className="text-sm text-muted-foreground underline">Esqueci minha senha</p>

                        </div> : allReadyUser === 'NOTFIND' ? <div className="flex space-y-4">
                          <div className="space-y-2 mt-4">
                            <h1 className=" text-sm text-muted-foreground">Senha<span className="text-red-500">*</span></h1>
                            <div className={`  duration-200 flex border border-muted rounded-xl  focus-within:border-primary  p-3 items-center space-x-2 w-full`}>
                              <MdPassword size={20} className="text-muted-foreground" />
                              <input type="password" onChange={(v) => {
                                setEPassword(false)
                                setPassword(v.target.value)
                              }} placeholder="*******" className=" bg-transparent p-0 w-full border-0 outline-0" />
                            </div>
                            {ePassword ? <p className='text-sm text-red-500'><span className=''>X A senha tem no minimo 6 caracteres</span></p> : null}
                          </div>

                        </div> : null
                      }
                      {allReadyUser === 'FIND' ? <div className="w-full flex justify-end mt-4">
                        <button onClick={() => {
                          if (!password) {
                            return setEPassword(true)
                          }
                          if (password.length < 6) {
                            return setEPassword(true)
                          }
                          SignInCredentials({ email, password })
                        }} className="bg-primary text-white rounded-lg p-3">Continuar</button>
                      </div> : null}


                    </div>

                  </div>
                </div>}
              </div>
              <div className="mt-4 p-6 bg-background rounded-2xl">
                <div className="flex justify-between items-center w-full">
                  <h1 className="font-bold">Dados de entrega</h1>
                  <CiDeliveryTruck className="w-6 h-6" />
                </div>
                <div className="flex mt-4 space-x-4">
                  <div onClick={() => {
                    setMetodoRecebimento('ENTREGA')
                  }} className={`${metodoRecebimento === "ENTREGA" ? 'border-primary bg-primary/5' : ''} flex space-x-2 border p-4 rounded-xl cursor-pointer justify-center items-center`}>
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
                  }} className={`${metodoRecebimento === "RETIRADA" ? 'border-primary bg-primary/5' : ''} flex space-x-2 border p-4 rounded-xl cursor-pointer justify-center items-center`}>
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
                  <div className="bg-primary/5 mt-2 border rounded-sm mt p-2 w-full border-dashed">
                    <h1 className="text-sm text-primary text-center">Você deve buscar seu pedido na loja, na opção RETIRADA!</h1>
                  </div>
                </div> : metodoRecebimento === 'ENTREGA' ? <div className="mt-4">
                  {!userLoged ? <div>
                    <div className="border-2 rounded-xl w-full border-primary border-dashed bg-primary/5 p-3 items-center flex justify-between">
                      <div className="flex items-center w-1/2 justify-center space-x-2">
                        <CiLocationOn className="text-primary border-primary w-8 h-8" />
                        <h1 className="text-sm text-muted-foreground">Rua dasvxcv 45, Piritiba ba, proximo a adada ada</h1>
                      </div>
                      <FaCircleCheck className="text-primary border-primary w-5 h-5" />
                    </div>
                    <h1></h1>
                  </div> : <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-1 ">
                      <h1 className="text-muted-foreground text-sm">Cep<span className="text-red-500">*</span></h1>
                      <div className={`  duration-200 flex border rounded-2xl border-muted  focus-within:border-primary p-3 items-center space-x-2 w-full`}>
                        <CiLocationOn className="text-muted-foreground w-5 h-5" />
                        <InputMask mask={"99999-999"} value={cep} placeholder="_____-___" type="text" onChange={(v) => {
                          setCep(v.target.value)
                        }} className=" bg-transparent p-0 w-full border-0 outline-0" />
                      </div>
                    </div>
                    <div className="space-y-1 ">
                      <h1 className="text-muted-foreground text-sm">Estado<span className="text-red-500"> *</span></h1>
                      <div className={`  duration-200 flex border rounded-2xl border-muted  focus-within:border-primary p-3 items-center space-x-2 w-full`}>
                        <input type="text" onChange={(v) => {
                          setCep(v.target.value)
                        }} className=" bg-transparent p-0 w-full border-0 outline-0" />
                      </div>
                    </div>
                    <div className="space-y-1 ">
                      <h1 className="text-muted-foreground text-sm">Cidade<span className="text-red-500"> *</span></h1>
                      <div className={`  duration-200 flex border rounded-2xl border-muted  focus-within:border-primary p-3 items-center space-x-2 w-full`}>
                        <input type="text" onChange={(v) => {
                          setCep(v.target.value)
                        }} className=" bg-transparent p-0 w-full border-0 outline-0" />
                      </div>
                    </div>
                    <div className="space-y-1 col-span-2 ">
                      <h1 className="text-muted-foreground text-sm">Endereço<span className="text-red-500"> *</span></h1>
                      <div className={`  duration-200 flex border rounded-2xl border-muted  focus-within:border-primary p-3 items-center space-x-2 w-full`}>
                        <input type="text" onChange={(v) => {
                          setCep(v.target.value)
                        }} className=" bg-transparent p-0 w-full border-0 outline-0" />
                      </div>
                    </div>
                    <div className="space-y-1 ">
                      <h1 className="text-muted-foreground text-sm">Número<span className="text-red-500"> *</span></h1>
                      <div className={`  duration-200 flex border rounded-2xl border-muted  focus-within:border-primary p-3 items-center space-x-2 w-full`}>
                        <input type="text" onChange={(v) => {
                          setCep(v.target.value)
                        }} className=" bg-transparent p-0 w-full border-0 outline-0" />
                      </div>
                    </div>
                  </div>}
                </div> : null}
              </div>
            </div>
          </>}
        </div> : null}
        {currentStep === 2 ? <div className="flex bg-background visibleee flex-col p-6 rounded-xl ">
          <h1 className="font-bold">Escolha o método de pagamento:</h1>
          <div className="grid mt-5  grid-cols-2 gap-4">
            <div onClick={() => {
              setMetodoPayment('PIX')
            }} className={`${metodoPayment === "PIX" ? 'border-primary bg-primary/5' : ''} flex space-x-2 border p-4 rounded-xl cursor-pointer justify-center items-center`}>
              <div className={` p-1.5 duration-300 transition-all bg-background rounded-full border-2 ${metodoPayment === 'PIX' ? " border-primary " : "bg-background border-gray-300"
                }`}>
                <div
                  className={`w-4 h-4 duration-300 transition-all  rounded-full  ${metodoPayment === 'PIX'
                    ? "bg-primary "

                    : "bg-background "
                    }`}
                ></div>
              </div>
              <div className="flex justify-center items-center space-x-2">
                <MdPix className="w-6 h-6 text-muted-foreground" />
                <h1 className='text-sm'>Pix</h1>
              </div>
            </div>
            <div onClick={() => {
              setMetodoPayment('CREDITO')
            }} className={`${metodoPayment === "CREDITO" ? 'border-primary bg-primary/5' : ''} flex space-x-2 border p-4 rounded-xl cursor-pointer justify-center items-center`}>
              <div className={` p-1.5 duration-300 transition-all bg-background rounded-full border-2 ${metodoPayment === 'CREDITO' ? " border-primary " : "bg-background border-gray-300"
                }`}>
                <div
                  className={`w-4 h-4 duration-300 transition-all  rounded-full  ${metodoPayment === 'CREDITO'
                    ? "bg-primary "

                    : "bg-background "
                    }`}
                ></div>
              </div>
              <div className="flex justify-center items-center space-x-2">
                <CreditCard className="w-6 h-6 text-muted-foreground" />
                <h1 className='text-sm'>Cartão</h1>
              </div>
            </div>
            <div onClick={() => {
              setMetodoPayment('BOLETO')
            }} className={`${metodoPayment === "BOLETO" ? 'border-primary bg-primary/5' : ''} flex space-x-2 border p-4 rounded-xl cursor-pointer justify-center items-center`}>
              <div className={` p-1.5 duration-300 transition-all bg-background rounded-full border-2 ${metodoPayment === "BOLETO" ? " border-primary " : "bg-background border-gray-300"
                }`}>
                <div
                  className={`w-4 h-4 duration-300 transition-all  rounded-full  ${metodoPayment === "BOLETO"
                    ? "bg-primary "

                    : "bg-background "
                    }`}
                ></div>
              </div>
              <div className="flex justify-center items-center space-x-2">
                <BarcodeIcon className="w-6 h-6 text-muted-foreground" />
                <h1 className='text-sm'>Boleto</h1>
              </div>
            </div>
            <div onClick={() => {
              setMetodoPayment('WPP')
            }} className={`${metodoPayment === "WPP" ? 'border-primary bg-primary/5' : ''} flex space-x-2 border p-4 rounded-xl cursor-pointer justify-center items-center`}>
              <div className={` p-1.5 duration-300 transition-all bg-background rounded-full border-2 ${metodoPayment === 'WPP' ? " border-primary " : "bg-background border-gray-300"
                }`}>
                <div
                  className={`w-4 h-4 duration-300 transition-all  rounded-full  ${metodoPayment === 'WPP'
                    ? "bg-primary "

                    : "bg-background "
                    }`}
                ></div>
              </div>
              <div className="flex justify-center items-center space-x-2">
                <FaWhatsapp className="w-6 h-6 text-muted-foreground" />
                <h1 className='text-sm'>Whatsapp</h1>
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
              <div className={`  duration-200 flex border  rounded-xl border-muted  focus-within:border-primary  p-3 items-center space-x-2 w-full`}>

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
                  <div className={`  duration-200 flex border  rounded-xl border-muted  focus-within:border-primary  p-3 items-center space-x-2 w-full`}>
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
                <div className={`  duration-200 flex border  rounded-xl border-muted  focus-within:border-primary  p-3 items-center space-x-2 w-full`}>

                  <input type="text" onChange={() => {
                    setEName(false)
                  }} className=" bg-transparent p-0 w-full border-0 outline-0" />
                </div>

              </div>
              <div className="space-y-1">
                <h1 className=" w-full justify-between text-muted-foreground text-sm flex space-x-4"><span>CCV<span className="text-red-500">*</span></span><span><HelpCircle className="w-6 h-6" /></span></h1>
                <div className={`  duration-200 flex border  rounded-xl border-muted  focus-within:border-primary  p-3 items-center space-x-2 w-full`}>

                  <input type="number" onChange={() => {
                    setEName(false)
                  }} className=" bg-transparent p-0 w-full border-0 outline-0" />
                </div>

              </div>
            </div>
          </div> : null}

        </div> : null}
        {currentStep === 3 ? <div className="flex bg-background p-6 rounded-xl flex-col visibleee space-y-4">
          <div>
            <h1 className="font-bold">Resumo do pedido</h1>
            <div className="space-y-4 mt-5 rounded-xl ">
              {data?.map(d => <div key={d.id} className=" hover:bg-zinc-100 rounded-lg dark:hover:bg-zinc-900 hover:rounded-lg bg-opacity-65  w-full justify-between flex">
                <div className="flex  items-center space-x-2">
                  <Image width={100} height={100} alt="Produto" src={d.img} className="w-28 h-28  rounded-lg" />
                  <div className="flex flex-col justify-between">
                    <h1 className="">{d.name}</h1>
                    <div>
                      <h1 className="text-muted-foreground">Quantidade: {d.qtd}</h1>
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
      {currentStep < 4 ? <div className="w-[38%] bg-background  shadow-lg p-3 h-max  rounded-xl">


        <div className=" rounded-xl dark:bg-zinc-900 bg-zinc-50 p-6 space-y-2">
          <div className="flex px-3 justify-between">
            <h1 className="">subTotal:</h1>
            <h1 className="">R$ {total.toFixed(2)}</h1>
          </div>
          <div className="flex px-3  py-1 justify-between">
            <h1 className="">frete:</h1>
            <h1 className="">R$ {total.toFixed(2)}</h1>
          </div>
          <div className="flex  flex-col border-t p-3 rounded-b-xl mt-2 justify-between">
            <p className="text-end  text-sm text-green-500">10% de desconto no PIX</p>
            <div className="w-full flex justify-between">
              <h1 className="font-extrabold">Total</h1>
              <h1 className="space-x-4 "><span className="text-muted-foreground text-sm line-through">R$ {total.toFixed(2)}</span><span className="font-bold">R$ {(total - (total * 10 / 100)).toFixed(2)}</span></h1>
            </div>
          </div>



        </div>
        <div className="px-3">
          <AccordionCupom/>
        </div>
        <button onClick={() => {
          setCurrentStep(prev => prev + 1)
          if (currentStep === 3) {
            handlePayment()
            setFinaly(true)
          }
        }} className="w-full p-5 bg-primary rounded-xl mt-2 flex items-center justify-center">
          <h1 className="text-white font-bold">{currentStep === 0 ? 'Finalizar compra' : currentStep === 3 ? 'Pagar agora' : 'Próximo'}</h1>
        </button>
      </div> : null}
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
