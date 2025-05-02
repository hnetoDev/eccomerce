"use client"

import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command"
import { useState } from "react";
import CircularIndeterminate from "./progress";
import { useRouter } from "next/navigation";



export function ComboboxDemo() {
  const [search,setSearch] = useState<{id:string,name:string}[]>()
  const [loading,setLoading] = useState<boolean>(false)
  const nav = useRouter()
  const handleSearch = async(v:string) =>{
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/product/search`,{
      method:'POST',
      headers:{
        'Content-type':'application/json'
      },
      body:JSON.stringify({
        name:v
      })
    })
    if(res.ok){
      const data = await res.json()
      setLoading(false);
      setSearch(data);
      console.log(data);
      return
    }
    return
  }
  let time:NodeJS.Timeout;
  return (
    <Command className="w-screen">
  <CommandInput onChangeCapture={(v)=>{
    clearTimeout(time)
    if(v.currentTarget.value.length < 1){
      setSearch(undefined)
      return
    }
    const value = v.currentTarget.value
    setLoading(true)
    time = setTimeout(()=>{
      handleSearch(value)
      
    },1000)
  }}  placeholder="Pesquise seu suplemento..." />
  <CommandList>
    <CommandEmpty>Não encontrado</CommandEmpty>
    
    {loading ? <div className="w-full flex justify-center h-32"><CircularIndeterminate/></div>  : search !== undefined ? <CommandGroup>
      {search.map(s => <div onClick={()=>{
        alert('aq')
        nav.push(`/app/produtos/${s.id}`)
        }} key={s.id}>
        <CommandItem >{s.name}</CommandItem>
      </div>)}
    </CommandGroup> : null}
    
    
  </CommandList>
</Command>

  )
}
