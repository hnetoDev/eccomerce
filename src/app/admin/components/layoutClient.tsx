'use client'
import { DashboardIcon, LayoutIcon } from "@radix-ui/react-icons";
import {  ArrowLeft, ArrowRight, Settings } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { IoScale } from "react-icons/io5";
import { MdProductionQuantityLimits } from "react-icons/md";
import './style.css'
export default function LayoutClientAdmin() {
  const [small,setSmall] = useState(false);
  return <div className={`${small ? ' w-16' : 'w-1/8'} flex flex-col h-screen  p-3`}>
    <div onClick={()=>{
        setSmall(prev => {
          if(prev === true) return false;
          return true;
        })
      }} className={`${small ? 'justify-center' : 'justify-end'} w-full flex `}>
      {small ? <ArrowRight/> : <ArrowLeft/>}
    </div>

    <div className="flex flex-col justify-center h-full">
    <Link href={{pathname:'/admin'}}>
    <div className="flex space-x-2 h-16 p-3 rounded-lg hover:bg-neutral-300 hover:bg-opacity-5 items-center">
      <DashboardIcon/>
      <h1 className={`font-bold ${small ? 'invisible w-0 fixed' : null}`}>Dashboard</h1>
    </div>
    </Link>

    <Link href={{pathname:'/admin/products'}}>
    <div className="flex space-x-2 h-16 p-3 rounded-lg hover:bg-neutral-300 hover:bg-opacity-5 items-center">
      <MdProductionQuantityLimits />
      <h1 className={`font-bold ${small ? 'invisible w-0 fixed' : null}`}>Produtos</h1>
    </div>
    </Link>

    <div className="flex space-x-2 h-16 p-3 rounded-lg hover:bg-neutral-300 hover:bg-opacity-5 items-center">
      <DashboardIcon />
      <h1 className={`font-bold ${small ? 'invisible w-0 fixed' : null}`}>Dashboard</h1>
    </div>

    <Link href={{pathname:'/admin/layout'}}>
    <div className="flex space-x-2 h-16 p-3 rounded-lg hover:bg-neutral-300 hover:bg-opacity-5 items-center">
      <LayoutIcon />
      <h1 className={`font-bold ${small ? 'invisible w-0 fixed' : null}`}>Layout</h1>
    </div>
    </Link>

    <Link href={{pathname:'/admin/products'}}>
    <div className="flex space-x-2 h-16 p-3 rounded-lg hover:bg-neutral-300 hover:bg-opacity-5 items-center">
      <Settings />
      <h1 className={`font-bold ${small ? 'invisible w-0 fixed' : null}`}>Configurações</h1>
    </div>
    </Link>
    </div>
  </div>
}