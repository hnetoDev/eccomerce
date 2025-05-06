'use client'

import { Divider } from "@mui/material"
import { LockIcon } from "lucide-react"
import { signIn, useSession } from "next-auth/react"
import Image from "next/image"
import Link from "next/link"
import { redirect } from "next/navigation"
import React from "react"
import { MdOutlineEmail, MdOutlinePhone, MdPassword, MdPerson, MdPersonOutline } from "react-icons/md"
import InputMask from "react-input-mask"

function RegisterPage() {

  const [eEmail, setEEmail] = React.useState(false)
  const [eName, setEName] = React.useState(false)
  const [eCPF, setECPF] = React.useState(false)
  const [phone, setPhone] = React.useState('')
  const [cpf, setCPF] = React.useState('')
  const [name, setName] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const session = useSession()
  if(session.data){
    redirect('/app')
  }
  function handleLoginGoogle() {
    signIn('google', {
      redirect: false,
      callbackUrl: '/app'
    })
  }

  return <div className="bg-background md:py-20 w-screen px-8 flex flex-col h-screen justify-center items-center">
    <h1 className="text-xl font-bold">Crie sua conta</h1>
    <div className="mt-8 w-full xl:w-1/3">
      <div className="space-y-2">
        <h1 className=" text-sm text-muted-foreground">Nome<span className="text-red-500">*</span></h1>
        <div className={`  duration-200 flex border border-muted bg-muted rounded-3xl  focus-within:border-primary  p-3 items-center space-x-2 w-full`}>
          <MdPersonOutline size={20} className="text-muted-foreground" />
          <input type="text" onChange={() => {
            setEEmail(false)
          }} placeholder="seu nome" className=" bg-transparent p-0 w-full border-0 outline-0" />
        </div>
        {eEmail ? <p className='text-sm text-red-500'><span className=''>X </span> Preencha com um e-mail válido</p> : null}
      </div>
      <div className="space-y-2 mt-4">
        <h1 className=" text-sm text-muted-foreground">Email<span className="text-red-500">*</span></h1>
        <div className={`  duration-200 flex border border-muted bg-muted rounded-3xl  focus-within:border-primary  p-3 items-center space-x-2 w-full`}>
          <MdOutlineEmail size={20} className="text-muted-foreground" />
          <input type="text" onChange={() => {
            setEEmail(false)
          }} placeholder="exemple@gmail.com" className=" bg-transparent p-0 w-full border-0 outline-0" />
        </div>
        {eEmail ? <p className='text-sm text-red-500'><span className=''>X </span> Preencha com um e-mail válido</p> : null}
      </div>
      <div className="space-y-2 mt-4">
        <h1 className="text-muted-foreground text-sm">Telefone<span className="text-red-500">*</span></h1>
        <div className={`   duration-200 flex border border-muted bg-muted rounded-3xl  focus-within:border-primary  p-3 items-center space-x-2 w-full`}>
          <MdOutlinePhone size={20} className="text-muted-foreground" />
          <InputMask mask={"(99) 99999-9999"} value={phone} placeholder="(__) _____-____" type="text" onChange={(v) => {
            setEName(false)

          }} className=" bg-transparent p-0 w-full border-0 outline-0" />
        </div>

      </div>
      <div className="space-y-2 mt-4">
        <h1 className="text-muted-foreground text-sm">CPF<span className="text-red-500">*</span></h1>
        <div className={`  duration-200 flex border border-muted bg-muted rounded-3xl  focus-within:border-primary  p-3 items-center space-x-2 w-full`}>
          <LockIcon size={20} className="text-muted-foreground" />
          <InputMask mask={"999.999.999-99"} type="text" value={cpf} onChange={(v) => {
            setECPF(false)
            setCPF(v.target.value)
          }} placeholder="___.___.___-__" className=" bg-transparent w-full border-0 outline-0" />
        </div>
        {eCPF ? <p className='text-sm text-red-500'><span className=''>X </span>CPF inválido</p> : null}
      </div>
      <div className="space-y-2 mt-4">
        <h1 className=" text-sm text-muted-foreground">Senha<span className="text-red-500">*</span></h1>
        <div className={`  duration-200 flex border border-muted bg-muted rounded-3xl  focus-within:border-primary  p-3 items-center space-x-2 w-full`}>
          <MdPassword size={20} className="text-muted-foreground" />
          <input type="password" onChange={() => {

          }} placeholder="*******" className=" bg-transparent p-0 w-full border-0 outline-0" />

        </div>
        {eEmail ? <p className='text-sm text-red-500'><span className=''>X </span> Preencha com um e-mail válido</p> : null}
      </div>
      <div className="w-full mt-2 flex justify-between items-center">
        <div className="flex space-x-2">
          <div className="w-5 h-5 rounded-full border"></div>
          <h1 className="text-sm text-muted-foreground">Lembrar de mim?</h1>
        </div>
      </div>
      <button className="w-full bg-primary text-white p-3 rounded-3xl mt-4">Entrar</button>
      <div className="mt-5 flex w-full justify-center items-center px-1">
        <div className="h-0.5 bg-muted w-full">
        </div>
        <h1 className="text-muted-foreground w-full text-center text-sm">ou entre com</h1>
        <div className="h-0.5 bg-muted w-full">
        </div>
      </div>
      <button onClick={handleLoginGoogle} className="w-full border flex justify-center items-center space-x-3 border-muted p-3 rounded-3xl mt-4">
        <h1>Google</h1>
        <Image src="/images/google.png" alt="Google" width={20} height={20} />
      </button>

      <div className="mt-5 flex justify-center w-full">
        <h1 className="text-sm text-muted-foreground">Já tem uma conta? <Link href="/store/auth/register" className="text-primary underline">entre aqui</Link></h1>
      </div>

    </div>
  </div>
}

export default RegisterPage;