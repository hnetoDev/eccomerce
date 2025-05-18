import { toastSuccess } from "@/components/toast"
import SignInCredentials from "./signInCredentials"
import { DataUser } from "@/types"

export default async function CompleteDataUser({id,cpf,phone,password,setDataUser,email}:{
    id?: string,
    cpf: string,
    phone: string,
    password: string,
    setDataUser: React.Dispatch<React.SetStateAction<DataUser|undefined>>
    email:string,
}) {

    if(!id){
        return
    }
   const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/completeDataUser/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            cpf,
            phone,
            password
        })
    })


    if (!res.ok) {
        throw new Error('Erro ao criar usuário')
    }
    if(res.ok){
      toastSuccess('Usuário criado com sucesso')
      setDataUser(prev =>{
        if(!prev) return prev
        const update = {
            ...prev,
            cpf,
            phone
        }
        return update

      })
    }

}