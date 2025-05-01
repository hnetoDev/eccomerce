"use client"

import * as React from "react"
import Link from "next/link"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { cn } from "@/lib/utils"

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { ExitIcon, PersonIcon } from "@radix-ui/react-icons"
import { signOut, useSession } from "next-auth/react"
import { redirect, useRouter } from "next/navigation"
import { SearchIcon } from "lucide-react"
import ThemeTabs from "@/components/tabTheme"
import CartCustom from "@/components/cart"
import { CgEnter } from "react-icons/cg"
import { CollectionAndProds } from "@/types"


export function NavigationClient({ orientation,logged,img,data }: { data?:CollectionAndProds,logged?:boolean,img?:string,orientation: string }) {
  
  const nav = useRouter()
  return (
    <NavigationMenu className=" break:relative w-full " orientation={orientation === 'v' ? 'vertical' : 'horizontal'} >
      <NavigationMenuList className=" w-full" >
        

        <NavigationMenuItem className=" break:w-full " >
          <NavigationMenuTrigger className="text-white text-lg bg-transparent p-6 font-bold">Suplementos</NavigationMenuTrigger>
          <NavigationMenuContent className="p-6">
            <ul className="grid grid-cols-7 p-4 w-screen ">
              {data ? data.map(d =>{
                return <div key={d.id} className="flex flex-col">
                  <Link href={{pathname:`/app/collections/${d.name}`}} className="text-xl font-bold p-3 text-orange-500">{d.name}</Link>
                  <div className="flex flex-col ">
                   {d.produtos.map(p =>{
                    return <Link href={{pathname:`/app/produtos/${p.id}`}} className="text-zinc-300 p-3 hover:bg-zinc-500 hover:bg-opacity-10" key={p.id}>{p.name}</Link>
                   })}
                  </div>
                </div>
              }) : null}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem className=" break:w-full" >
          <NavigationMenuTrigger className="text-white text-lg bg-transparent p-6 font-bold">Acessórios</NavigationMenuTrigger>
          <NavigationMenuContent className=" p-6">
            <ul className="grid grid-cols-5 gap-3 p-4 w-screen ">
              {data ? data.map(d =>{
                return <div key={d.id} className="flex flex-col space-y-4 space">
                  <Link href={{pathname:`/app/collections/${d.id}`}} className="text-xl font-bold p-3 text-orange-500">{d.name}</Link>
                  <div className="flex flex-col ">
                   {d.produtos.map(p =>{
                    return <Link href={{pathname:`/app/produtos/${p.id}`}} className="text-zinc-300 p-3 hover:bg-zinc-500 hover:bg-opacity-10" key={p.id}>{p.name}</Link>
                   })}
                  </div>
                </div>
              }) : null}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem  className=" break:w-full" >
          <div onClick={()=>{
            nav.push('/app/pedidos')
        }} className="w-44 hover:cursor-pointer hover:bg-zinc-800 p-2.5 rounded-lg">
            <h1 className="text-white text-lg bg-transparent  text-center font-bold">Meus pedidos</h1>
          </div>
          
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          {title === 'Sair' ? <div onClick={async () => {
            await signOut()

          }} className="flex space-x-2">
            <ExitIcon className="text-red-500" />
            <div className="text-sm font-medium leading-none">{title}</div>
          </div> : <> <div className="text-sm font-medium leading-none">{title}</div> <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p></>}

        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"

//return <NavigationMenuDemo img={session.data?.user?.image ? session.data.user.image : undefined} loggedP={session.status !== 'authenticated' ? false : true} orientation="v"/>
