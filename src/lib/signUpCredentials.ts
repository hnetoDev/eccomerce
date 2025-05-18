import { toastSuccess } from "@/components/toast"
import SignInCredentials from "./signInCredentials"

export default async function SignUpCredentials({storeName,name,cpf,email,phone,password}:{
    storeName: string,
    name: string,
    cpf: string,
    email: string,
    phone: string,
    password: string
}) {

   const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/createUserSecure`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            storeName,
            name,
            cpf,
            email,
            phone,
            password
        })
    })


    if (!res.ok) {
        throw new Error('Erro ao criar usuário')
    }
    if(res.ok){
      toastSuccess('Usuário criado com sucesso')
      return SignInCredentials({email, password})
    }

}