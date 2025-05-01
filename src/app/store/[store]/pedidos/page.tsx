'use client'

import { useSession } from "next-auth/react"
import { redirect } from "next/navigation";
import { useEffect, useState } from "react"
import TableOrders from "./components/tableOrder";
import PaginationCustom from "@/components/paggination";

export default function PedidosPage(){
  const [data,setData] = useState<{id:string,qrCode:string,total:number,method:string,createdAt:string,status:string,products: {name: string, img: string, id: string, price: number, qtd: number}[] }[]>()
  const [page,setPage] =useState<number>(1)
  const session = useSession();
  if(!session){
    redirect('/auth')
  }
  useEffect(()=>{
    async function getData(){
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/order/${session.data?.user?.email}?page=${page}`)
      if(res.ok){
        setData((await res.json()))
      }
    }
    getData()
  },[session,page])
  return <div className="flex w-full">
    <div className="mt-28 space-y-4 w-full p-12">
      <h1 className="font-extrabold text-xl">Meus Pedidos</h1>
      {data ? <TableOrders data={data}/> : null}
      <PaginationCustom page={page} setPage={setPage}/>
    </div>
  </div>
}