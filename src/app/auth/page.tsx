'use client'
import { EyeClosedIcon } from "@radix-ui/react-icons";
import { Divide, EyeIcon } from "lucide-react"
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useState } from "react"
import { MdEmail, MdOutlineEmail, MdOutlinePassword } from "react-icons/md"

export default function AuthPage(){
  const [showPass,setShowPass] = useState<boolean>(false);
  const session = useSession()
  if(session.data){
    redirect('/app')
  }
  return <div className="flex bg-background dark  h-screen w-full ">
    
    <div className=" break:w-1/3 dark  sm:w-2/3 m-w-2/3  rounded-lg flex flex-col space-y-4 m-auto">
      <div className="p-3  rounded-lg">
        
      </div>
      <div className="flex flex-col space-y-3">
        <div className="flex border outline-zinc-300 rounded-lg p-3  items-center space-x-2 w-full">
          <MdOutlineEmail size={20} className="text-zinc-300"/>
          <input type="text" className=" bg-transparent w-full border-0 outline-0  rounded-lg"/>
        </div>
        <div className="flex border outline-zinc-300 rounded-lg p-3  items-center space-x-2 w-full">
          {showPass ? <EyeIcon  className="text-zinc-300 w-4 h-4"/> : <EyeClosedIcon  className="text-zinc-300 w-4 h-4"/> }
          <input type={showPass ? 'text' : 'password'} className=" bg-background w-full border-0 outline-0  rounded-lg"/>
        </div>
        <div className="flex px-1 justify-between">
          <div className="flex space-x-2">
          <input type="checkbox" onChange={(v) => {
            console.log(v.target.value)
            setShowPass(prev =>{
              if(!prev){
                return true
              }
              return false;
            })
          }} />
          <h1 className="text-zinc-400 text-sm">Mostrar senha</h1>
          </div>
          <Link href={{pathname:''}} className="text-zinc-400 text-sm">Esqueceu a senha?</Link>
        </div>
        
      </div>
      <div className="w-full">
        <button className="font-bold w-full flex justify-center items-center p-3  bg-orange-500 rounded-lg"><h1 className=" text-white">Entrar</h1></button>
      </div>
      
      <div className="border-t  w-full py-3">
        <div onClick={()=>{
          signIn('google')
        }} className="p-3 border rounded-lg flex space-x-2 justify-center items-center">
          <img src="/google.png" className="w-4 h-4"/>
          <h1 className="text-zinc-300">Entrar com o google</h1>
        </div>
      </div>
    </div>
  </div>
}