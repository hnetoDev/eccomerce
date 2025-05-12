'use client'
import { useTheme } from "@/app/context"
import { Divider } from "@mui/material"
import { signIn, useSession } from "next-auth/react"
import Image from "next/image"
import Link from "next/link"
import { redirect } from "next/navigation"
import React from "react"
import { MdOutlineEmail, MdPassword } from "react-icons/md"

export default function AuthPage() {
  const [eEmail, setEEmail] = React.useState(false)
  const [seePassword, setSeePassword] = React.useState(false)
  const session = useSession();
  if (session.data?.user) {
    redirect('/app')
  }
  const theme = useTheme()
  return <div className="bg-background p-6 h-screen md:h-full md:px-8 flex flex-col md:p-20 justify-center items-center">
    <Image src={theme.logoUrl} alt="Logo" width={400} height={400} className="w-32" />
    <h1 className="text-xl mt-4">Entre na sua conta</h1>
    <div className="mt-8 w-full xl:w-1/3">
      <div className="space-y-2">
        <h1 className=" text-sm text-muted-foreground">Email</h1>
        <div className={`  duration-200 flex border border-muted bg-muted rounded-3xl  focus-within:border-primary  p-3 items-center space-x-2 w-full`}>
          <MdOutlineEmail size={20} className="text-muted-foreground" />
          <input type="text" onChange={() => {
            setEEmail(false)
          }} placeholder="exemple@gmail.com" className=" bg-transparent p-0 w-full border-0 outline-0" />
        </div>
        {eEmail ? <p className='text-sm text-red-500'><span className=''>X </span> Preencha com um e-mail válido</p> : null}
      </div>
      <div className="space-y-2 mt-4">
        <h1 className=" text-sm text-muted-foreground">Senha</h1>
        <div className={`  duration-200 flex border border-muted bg-muted rounded-3xl  focus-within:border-primary  p-3 items-center space-x-2 w-full`}>
          <MdPassword size={20} className="text-muted-foreground" />
          <input type="password" onChange={() => {

          }} placeholder="*******" className=" bg-transparent p-0 w-full border-0 outline-0" />

        </div>
        {eEmail ? <p className='text-sm text-red-500'><span className=''>X </span> Preencha com um e-mail válido</p> : null}
      </div>
      <div className="w-full mt-2 flex justify-between items-center">
        <div onClick={()=>{
          setSeePassword(!seePassword)
        }} className="flex cursor-pointer space-x-2">
          <div className={`w-5 h-5 rounded-full border`}></div>
          <h1 className="text-sm text-muted-foreground">Lembrar de mim?</h1>
        </div>
        <Link href="/store/auth/forgot" className="text-sm underline text-primary">Esqueci minha senha</Link>
      </div>
      <button onClick={()=>{
        signIn('credentials',{
          callbackUrl: '/app',
        })
      }} className="w-full bg-primary text-white p-3 rounded-3xl mt-4">Entrar</button>
      <div className="mt-5 flex w-full justify-center items-center px-1">
        <div className="h-0.5 bg-muted w-full">
        </div>
        <h1 className="text-muted-foreground w-full text-center text-sm">ou entre com</h1>
        <div className="h-0.5 bg-muted w-full">
        </div>
      </div>
      <button onClick={()=>{
        signIn('google',{
          callbackUrl: '/app',
        })
      }} className="w-full border flex justify-center items-center space-x-3 border-muted p-3 rounded-3xl mt-4">
        <h1>Google</h1>
        <Image src="/images/google.png" alt="Google" width={20} height={20} />
      </button>

      <div className="mt-5 flex justify-center w-full">
        <h1 className="text-sm text-muted-foreground">Não tem uma conta? <Link href="/auth/register" className="text-primary underline">Crie uma</Link></h1>
      </div>

    </div>
  </div>
}