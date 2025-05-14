import { SetStateAction } from "react"

export const getInfoCEP = async (cep: string,setLoading?:React.Dispatch<SetStateAction<boolean>>) => {
  if(setLoading){
    setLoading(true)
  }
  const res = await fetch(`https://viacep.com.br/ws/${cep}/json/`, {
    headers: {
      "Content-type": "application/json"
    }
  })
  if (res.ok) {
    const d = await res.json()
    if(setLoading){
      setLoading(false)
    }
    return {
      cep: d.cep,
      logradouro: d.logradouro,
      cidade: d.localidade,
      ddd: d.ddd,
      uf:d.uf,
      estado: d.estado,
      bairro: d.bairro,
      complemento: d.complemento
    }
  }
}