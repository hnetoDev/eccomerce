

'use client'
import { useSession } from "next-auth/react"
import { redirect } from "next/navigation"
import { useEffect, useState } from "react"
import { IoBackspace, IoTrashOutline } from "react-icons/io5"
import { BarcodeIcon, CheckCircle2, CheckCircle2Icon, CheckCircleIcon, CreditCard, HelpCircle, LockIcon, ShoppingCartIcon, TicketPercentIcon, UserCircle, UserX } from "lucide-react"
import { PersonIcon } from "@radix-ui/react-icons"
import { MdOutlineEmail, MdOutlinePhone, MdOutlinePix, MdPayment, MdPersonOutline } from "react-icons/md"
import Stepper from "./stepper2"
import { FaCircleCheck } from "react-icons/fa6";
import InputMask from "react-input-mask"
import { FaBars, FaWhatsapp } from "react-icons/fa"
import Image from "next/image"
import { CiLocationOn } from "react-icons/ci"
import CartCheckout from "./cartCheckout"
import AccordionCupom from "./accordionCupom"


export default function CheckoutDesktop({ data, name, cpf, phone, email, cep, total, setEmail, setCPF, setMetodoRecebimento, setCep, setName, setPhone, setTotal, metodoPayment, setMetodoPayment, metodoRecebimento, currentStep, setCurrentStep }: {
  data?: {
    name: string;
    img: string;
    id: string;
    price: string;
    qtd: number;
  }[], setEmail: React.Dispatch<React.SetStateAction<string>>, setCep: React.Dispatch<React.SetStateAction<string>>, setPhone: React.Dispatch<React.SetStateAction<string>>, name: string, cpf: string, phone: string, email: string, cep: string, total: number, setName: React.Dispatch<React.SetStateAction<string>>, setCPF: React.Dispatch<React.SetStateAction<string>>, setTotal: React.Dispatch<React.SetStateAction<number>>, metodoPayment: string, setMetodoPayment: React.Dispatch<React.SetStateAction<string>>, metodoRecebimento: string, setMetodoRecebimento: React.Dispatch<React.SetStateAction<string>>, setCurrentStep: React.Dispatch<React.SetStateAction<number>>, currentStep: number
}) {


  const [eName, setEName] = useState<boolean>(false)
  const [eEmail, setEEmail] = useState<boolean>(false)
  const [eCPF, setECPF] = useState<boolean>(false)
  const [ePhone, setEPhone] = useState<boolean>(false)
  const session = useSession()
  const [userLoged, setUserLoged] = useState<boolean>(false)





  return <div className="w-full  flex justify-between space-x-8 px-12 ">
    <div className="w-2/3 rounded-2xl z-20">
      {currentStep === 0 ? <CartCheckout total={total} setTotal={setTotal} cep={cep} setCep={setCep} setMetodoRecebimento={setMetodoRecebimento} metodoRecebimento={metodoRecebimento} /> : null}
      {currentStep === 1 ? <div className="visibleee">
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
          <div className="w-full">

            <div className="">
              {userLoged ? null : <div>
                <div className="">
                  <h1 className="font-bold">Dados pessoais</h1>
                  <div className=" gap-4 grid md:grid-cols-2 mt-5">
                    <div className="space-y-1">
                      <h1 className="text-muted-foreground text-sm">Nome <span className="text-red-500">*</span></h1>
                      <div className={`  duration-200 flex border-b border-muted  focus-within:border-orange-500  p-3 items-center space-x-2 w-full`}>
                        <MdPersonOutline size={20} className="text-muted-foreground" />
                        <input type="text" onChange={() => {
                          setEName(false)
                        }} placeholder="Jorge Ribeiro" className=" bg-transparent p-0 w-full border-0 outline-0" />
                      </div>
                      {eName ? <p className='text-sm text-red-500'><span className=''>X </span> Campo obrigatório</p> : null}
                    </div>
                    <div className="space-y-1">
                      <h1 className="text-muted-foreground text-sm">Email <span className="text-red-500">*</span></h1>
                      <div className={`  duration-200 flex border-b border-muted  focus-within:border-orange-500  p-3 items-center space-x-2 w-full`}>
                        <MdOutlineEmail size={20} className="text-muted-foreground" />
                        <input type="text" onChange={() => {
                          setEEmail(false)
                        }} placeholder="exemple@gmail.com" className=" bg-transparent p-0 w-full border-0 outline-0" />
                      </div>
                      {eEmail ? <p className='text-sm text-red-500'><span className=''>X </span> Preencha com um e-mail válido</p> : null}
                    </div>
                    <div className="space-y-1">
                      <h1 className="text-muted-foreground text-sm">Telefone</h1>
                      <div className={`  duration-200 flex border-b border-muted  focus-within:border-orange-500  p-3 items-center space-x-2 w-full`}>
                        <MdOutlinePhone size={20} className="text-muted-foreground" />
                        <InputMask mask={"(99) 99999-9999"} value={phone} placeholder="(__) _____-____" type="text" onChange={(v) => {
                          setEName(false)

                        }} className=" bg-transparent p-0 w-full border-0 outline-0" />
                      </div>

                    </div>
                    <div className="space-y-1">
                      <h1 className="text-muted-foreground text-sm">CPF</h1>
                      <div className={`  duration-200 flex border-b border-muted  focus-within:border-orange-500  p-3 items-center space-x-2 w-full`}>
                        <LockIcon size={20} className="text-muted-foreground" />
                        <InputMask mask={"999.999.999-99"} type="text" value={cpf} onChange={(v) => {
                          setECPF(false)
                          setCPF(v.target.value)
                        }} placeholder="___.___.___-__" className=" bg-transparent w-full border-0 outline-0" />
                      </div>
                      {eCPF ? <p className='text-sm text-red-500'><span className=''>X </span>CPF inválido</p> : null}
                    </div>
                  </div>
                </div>
              </div>}
            </div>
          </div>
        </>}
      </div> : null}
      {currentStep === 2 ? <div className="flex visibleee flex-col mt-6 ">
        <h1 className="text-muted-foreground">Escolha o método de pagamento:</h1>
        <div className="grid mt-5 grid-cols-2 gap-4">
          <button className={`p-6  w-full justify-center duration-200 transition-all items-center border rounded-full flex space-x-2`}>
            <CreditCard className="w-6 h-6 text-muted-foreground" />
            <h1 className="text-muted-foreground">Crédito</h1>
          </button>
          <button className={`p-6  w-full justify-center duration-200 transition-all items-center border rounded-full flex space-x-2`}>
            <BarcodeIcon className="w-6 h-6 text-muted-foreground" />
            <h1 className="text-muted-foreground">Boleto</h1>
          </button>
          <button className={`p-6  w-full justify-center duration-200 transition-all items-center border rounded-full flex space-x-2`}>
            <MdOutlinePix className="w-6 h-6 text-muted-foreground" />
            <h1 className="text-muted-foreground">Pix</h1>
          </button>
          <button className={`p-6  w-full justify-center duration-200 transition-all items-center border bg-orange-500 rounded-full flex space-x-2`}>
            <FaWhatsapp className="w-6 h-6 text-white" />
            <h1 className="text-white">whatsapp</h1>
          </button>

        </div>
        {metodoPayment === "CREDITO" ? <div className="mt-12 space-y-4">
          <h1>Cartão de crédito:</h1>
          <div className="space-y-1">
            <h1 className="text-muted-foreground text-sm">Nome do titular <span className="text-red-500">*</span></h1>
            <div className={`  duration-200 flex border-b border-muted  focus-within:border-orange-500  p-3 items-center space-x-2 w-full`}>

              <input type="text" onChange={() => {
                setEName(false)
              }} className=" bg-transparent p-0 w-full border-0 outline-0" />
            </div>
            {eName ? <p className='text-sm text-red-500'><span className=''>X </span> Campo obrigatório</p> : null}
          </div>
          <div className="flex justify-between items-center w-full">
            <div className="space-y-1">
              <h1 className="text-muted-foreground text-sm">Numero do cartão <span className="text-red-500">*</span></h1>
              <div className={`  duration-200 flex border-b border-muted  focus-within:border-orange-500  p-3 items-center space-x-2 w-full`}>
                <input type="text" onChange={() => {
                  setEName(false)
                }} className=" bg-transparent p-0 w-full border-0 outline-0" />
              </div>
              {eName ? <p className='text-sm text-red-500'><span className=''>X </span> Campo obrigatório</p> : null}
            </div>
            <img width={100} height={40} alt="Bandeira do cartão" src="/images/masterCard.svg" className="w-12 h-12  rounded-lg" />
          </div>
          <div className="flex justify-between space-x-2">
            <div className="space-y-1">
              <h1 className="text-muted-foreground text-sm">data de expiração <span className="text-red-500">*</span></h1>
              <div className={`  duration-200 flex border-b border-muted  focus-within:border-orange-500  p-3 items-center space-x-2 w-full`}>

                <input type="text" onChange={() => {
                  setEName(false)
                }} className=" bg-transparent p-0 w-full border-0 outline-0" />
              </div>

            </div>
            <div className="space-y-1">
              <h1 className=" w-full justify-between text-muted-foreground text-sm flex space-x-4"><span>CCV<span className="text-red-500">*</span></span><span><HelpCircle className="w-6 h-6" /></span></h1>
              <div className={`  duration-200 flex border-b border-muted  focus-within:border-orange-500  p-3 items-center space-x-2 w-full`}>

                <input type="number" onChange={() => {
                  setEName(false)
                }} className=" bg-transparent p-0 w-full border-0 outline-0" />
              </div>

            </div>
          </div>
        </div> : null}

      </div> : null}
      {currentStep === 3 ? <div className="flex flex-col visibleee space-y-4">
        <div>
          <h1 className="font-bold">Resumo do pedido</h1>
          <div className="space-y-4 mt-5 rounded-3xl ">
            {data?.map(d => <div key={d.id} className=" hover:bg-zinc-100 rounded-lg dark:hover:bg-zinc-900 hover:rounded-lg bg-opacity-65  w-full justify-between flex">
              <div className="flex  items-center space-x-2">
                <Image width={100} height={100} alt="Produto" src={d.img} className="w-28 h-28  rounded-lg" />
                <div className="flex flex-col justify-between">
                  <h1 className="">{d.name}</h1>
                  <div>
                    <h1 className="text-muted-foreground">Quantidade: {d.qtd}</h1>
                    <div className="flex items-center"><h1 className="font-extrabold text-orange-500 border-orange-500">R$ {d.price}</h1><p className="text-sm text-zinc-500">/cada</p></div>
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
              <UserCircle className="text-orange-500 border-orange-500 w-8 h-8" />
              <div>
                <h1>Hélio Neto</h1>
                <h1 className="text-muted-foreground">hnetorocha@gmail.com</h1>
                <h1 className="text-muted-foreground">74998097796</h1>
              </div>
            </div>
            <div className="">
              <FaCircleCheck className="text-orange-500 border-orange-500 w-8 h-8" />
            </div>
          </div>
        </div>
        <div className=" border-t py-4 mt-8 w-full ">
          <h1 className="font-bold">Dados de entrega</h1>
          <div>
            <div className="flex w-full mt-5 justify-between items-center" >
              <div className="flex space-x-3 items-center">
                <CiLocationOn className="text-orange-500 border-orange-500 w-8 h-8" />
                <h1>Retirar na loja</h1>
              </div>
              <div className="">
                <FaCircleCheck className="text-orange-500 border-orange-500 w-8 h-8" />
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
          <div className="flex w-full mt-5 justify-between items-center">
            <div className="flex space-x-2">
              <img width={100} height={40} alt="Bandeira do cartão" src="https://firebasestorage.googleapis.com/v0/b/helius-db9a2.appspot.com/o/Mastercard-Logo.wine.svg?alt=media&token=6b7bb68b-8c2c-48e1-bb5a-1c8c8333203e" className="w-12 h-12  rounded-lg" />
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
              <FaCircleCheck className="text-orange-500 border-orange-500 w-8 h-8" />
            </div>
          </div>
        </div>
        <div className=" border-t py-4 mt-8 w-full ">
          <h1 className="font-bold">Dados de entrega</h1>
          <div className="flex w-full mt-5 justify-between items-center">
            <div>
              <h1>Hélio Neto</h1>
              <h1>hnetorocha@gmail.com</h1>
              <h1>74998097796</h1>
            </div>
            <div className="">
              <FaCircleCheck className="text-orange-500 border-orange-500 w-8 h-8" />
            </div>
          </div>
        </div>

      </div> : null}
    </div>
    <div className="w-1/3 bg-background  shadow-lg p-3 h-max  rounded-3xl">


      <div className=" rounded-2xl dark:bg-zinc-900 bg-zinc-50 p-6 space-y-2">
        <div className="flex px-3 justify-between">
          <h1 className="">subTotal:</h1>
          <h1 className="">R$ {total.toFixed(2)}</h1>
        </div>
        <div className="flex px-3  py-1 justify-between">
          <h1 className="">frete:</h1>
          <h1 className="">R$ {total.toFixed(2)}</h1>
        </div>
        <div className="flex  flex-col border-t p-3 rounded-b-3xl mt-2 justify-between">
          <p className="text-end  text-sm text-green-500">10% de desconto no PIX</p>
          <div className="w-full flex justify-between">
            <h1 className="font-extrabold">Total</h1>
            <h1 className="space-x-4 "><span className="text-muted-foreground text-sm line-through">R$ {total.toFixed(2)}</span><span className="font-bold">R$ {(total - (total * 10 / 100)).toFixed(2)}</span></h1>
          </div>
        </div>



      </div>
      <div className="px-3">
        <AccordionCupom />
      </div>
      <button onClick={() => {
        setCurrentStep(prev => prev + 1)
      }} className="w-full p-5 bg-orange-500 rounded-2xl mt-2 flex items-center justify-center">
        <h1 className="text-white font-bold">{currentStep === 0 ? 'Finalizar compra' : currentStep === 3 ? 'Pagar agora' : 'Próximo'}</h1>
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
