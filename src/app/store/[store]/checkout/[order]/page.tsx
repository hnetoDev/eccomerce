'use client'
import { Loader } from "@/components/loader";
import { CopyIcon, SearchIcon, TicketIcon } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import QRCode from "react-qr-code"
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { motion } from "framer-motion";
import { MdOutlineSell } from "react-icons/md";
import QRCodeWithLogo from "@/components/qrCodeWLogo";
import { toastCustom, toastError, toastLoading } from "@/components/toast";
import Link from "next/link";
export default function VerifyPayment({ params }: { params: { order: string } }) {

  const [disparaEffect, setDisparaEffect] = useState<boolean>(false)
  const [dataOrder, setDataOrder] = useState<{
    id: string,
    status: string,
    method: string,
    qrCode: string,
    storeId: string,
    idPayment: string,
    userId: string,
    total: number
  } | undefined>(undefined)

  const [loading, setLoading] = useState<boolean>(false)
  const [paymentApproved, setPaymentApproved] = useState<boolean>(false)

  useEffect(() => {
    async function getData() {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/order/findOne/payment/${params.order}`, {
        method: "GET",
        headers: {
          'Content-type': "application/json"
        }
      })
      if (res.ok) {
        const data = await res.json()
        setDataOrder(data)
        console.log(data)
      }
    }
    getData()
  }, [params.order, disparaEffect])

  const verifyPayment = async () => {
    if (!dataOrder) return
    setLoading(true)
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/payment/verify/${dataOrder.idPayment}`, {
      method: "GET",
      headers: {
        'Content-type': "application/json"
      }
    })
    if (res.ok) {
      const data = await res.text()
      console.log(data)
      setLoading(false)
      if (data === 'approved') {
        setPaymentApproved(true)
      }
      if (data === 'pending') {
        toastError('Pagamento ainda não foi confirmado')
      }
    }
  }

  if (loading) {
    return (
      <div className="w-full flex flex-col items-center justify-center py-20">
        <div className="">
          <div className="w-full flex py-8 justify-center items-center">
            <Loader />
          </div>
          <h1 className="text-2xl text-center font-bold">Verificando o pagamento...</h1>
          <p className="text-sm text-center text-muted-foreground">Aguarde um momento, estamos verificando o pagamento do seu pedido.</p>
        </div>
      </div>
    )
  }

  if (paymentApproved || dataOrder?.status === 'RECEBIDO') {
    return (
      <div className="w-full flex flex-col items-center justify-center pb-20">
        <div className="flex flex-col items-center justify-center">
          <div className="flex space-x-4 ">
            <DotLottieReact
              autoplay
              loop={false}
              src="/images/Main Scene.json"
              className="scale-125"
              style={{ width: 400, height: 200 }}
            />
          </div>
          <h1 className="text-2xl font-bold">Pagamento aprovado</h1>
          <h1 className="mt-2 font-bold">Seu pedido foi confirmado com sucesso!</h1>
          <div className="flex space-x-2 mt-2 items-center">
            <p className="text-sm text-muted-foreground">Forma de pagamento selecionada: {dataOrder?.method}</p>
            <Image src={'/images/pix.svg'} alt="Logo da loja" width={30} height={30} className="rounded-lg w-24 overflow-y-visible " />
          </div>
          <button className="bg-primary space-x-2 flex items-center justify-center mt-4 p-3 text-primary-foreground rounded-xl"><h1>Ver meus pedidos</h1><MdOutlineSell className="text-primary-foreground" /></button>
        </div>
      </div>
    )
  }

  if (dataOrder?.method === 'pix' && dataOrder.status === 'PENDENTE') {
    return (
      <div className="w-full">
        <div className="w-full flex mt-2 px-12 justify-end">
          <Link href={{pathname:`/`}}>&lt; voltar para loja</Link>
        </div>
        <div className="w-full flex justify-center items-center py-16">
          <div className="flex flex-col items-center justify-center">
            <h1 className="text-2xl font-bold">Aguardando pagamento</h1>
            <h1 className="text-xl mt-2 font-bold">Pague <span> R$ {dataOrder.total.toFixed(2)}</span></h1>
            <div className="flex space-x-2 mt-2 items-center">
              <p>Forma de pagamento selecionada: {dataOrder.method}</p>
              <Image src={'/images/pix.svg'} alt="Logo da loja" width={30} height={30} className="rounded-lg w-24 overflow-y-visible " />
            </div>
            <div className="flex space-x-4 mt-4 ">
              <div className="flex flex-col items-center justify-center">
                <div className="bg-primary/5 p-2 border border-primary rounded-xl">
                  <div className="flex items-center justify-center  bg-white p-4 rounded-xl border-primary">
                    {<QRCodeWithLogo value={dataOrder.qrCode} />}
                    {                 /* <QRCode className=""
                    value={dataOrder.qrCode}
                    size={256}
                    style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                  />*/}
                  </div>
                </div>
                <button className="bg-primary p-3 flex items-center space-x-2 w-full rounded-xl mt-2 justify-center">
                  <CopyIcon className="w-4 h-4 text-primary-foreground" />
                  <h1 className="text-primary-foreground">Copiar código pix </h1>
                </button>
              </div>
              <div>
                <h1 className="text-sm text-muted-foreground"> <span className="text-primary font-bold">1-  </span>  Abra seu aplicativo de banco de preferência</h1>
                <h1 className="text-sm text-muted-foreground"> <span className="text-primary font-bold">2-  </span> Escaneie o qrCode ou cole o código pix</h1>
                <h1 className="text-sm text-muted-foreground"> <span className="text-primary font-bold">3-  </span> Revise as informações e confirme o pagamento</h1>
                <h1 className="text-sm text-muted-foreground"> <span className="text-primary font-bold">4-  </span> Verifique o pagamento</h1>
                <button onClick={() => {
                  verifyPayment()
                }} className="mt-4 space-x-2 border-primary flex border rounded-xl justify-center items-center p-3 ">
                  <h1 className="text-sm ">Verificar pagamento</h1>
                  <SearchIcon className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full flex flex-col items-center justify-center px-6 py-16">
      <div className="">
        <div className="w-full flex py-8 justify-center items-center">
          <Loader />
        </div>
        <h1 className="text-2xl text-center font-bold">Verificando o pagamento...</h1>
        <p className="text-sm text-center text-muted-foreground">Aguarde um momento, estamos verificando o pagamento do seu pedido.</p>
      </div>
    </div>
  );

}