"use client"

import * as React from "react"
import Link from "next/link"

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

const components: { title: string; href: string; description: string }[] = [
  {
    title: "Alert Dialog",
    href: "/docs/primitives/alert-dialog",
    description:
      "A modal dialog that interrupts the user with important content and expects a response.",
  },
  {
    title: "Hover Card",
    href: "/docs/primitives/hover-card",
    description:
      "For sighted users to preview content available behind a link.",
  },
  {
    title: "Progress",
    href: "/docs/primitives/progress",
    description:
      "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
  },
  {
    title: "Scroll-area",
    href: "/docs/primitives/scroll-area",
    description: "Visually or semantically separates content.",
  },
  {
    title: "Tabs",
    href: "/docs/primitives/tabs",
    description:
      "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
  },
  {
    title: "Tooltip",
    href: "/docs/primitives/tooltip",
    description:
      "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
  },
]

export function NavigationMenuDemo({orientation,loggedP,img}:{img?:string,loggedP:boolean,orientation:string}) {
  const [logged,setLogged] = React.useState<boolean>(loggedP)
  const navigation = useRouter();
  return (
    <NavigationMenu className="dark" orientation={ orientation === 'v' ? 'vertical' : 'horizontal'} >
      <NavigationMenuList className="dark" >
        <NavigationMenuItem className="dark" >
          <NavigationMenuTrigger className="text-white">Suplementos</NavigationMenuTrigger>
          <NavigationMenuContent className="dark">
            <ul className="grid gap-3 p-4 dark md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <li className="row-span-3">
                <NavigationMenuLink asChild className=" dark ">
                  <a
                    className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                    href="/"
                  >
                    <img src="/whey.png" alt="" />
                    
                    <div className="mb-2 mt-4 text-lg font-medium bg-['/whey.png']">
                      Whey Protein
                    </div>
                    <p className="text-sm leading-tight text-muted-foreground">
                      Consiga doses de proteina adequadas e práticas
                    </p>
                  </a>
                </NavigationMenuLink>
              </li>
              <ListItem href="/docs" title="Introduction">
                Re-usable components built using Radix UI and Tailwind CSS.
              </ListItem>
              <ListItem href="/docs/installation" title="Installation">
                How to install dependencies and structure your app.
              </ListItem>
              <ListItem href="/docs/primitives/typography" title="Typography">
                Styles for headings, paragraphs, lists...etc
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        
        <NavigationMenuItem>
          <NavigationMenuTrigger className="space-x-2 text-white">

            { loggedP ? img ? <img src={img} alt="profile" height={34} width={34} className="rounded-full"/> : <PersonIcon/> : <PersonIcon/>}
            <h1>Conta</h1>
          </NavigationMenuTrigger>
          <NavigationMenuContent>
                {loggedP ? <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-1  lg:w-[600px] ">
                  <ListItem title="Hneto" >hnetorocha@gmail.com</ListItem>
                  <ListItem title="Sair"></ListItem>
                </ul> : <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-1  lg:w-[600px] ">
                  <ListItem title="Anônimo">nenhum usuário logado</ListItem>
                  <button onClick={()=>{
                    navigation.push('/auth')
                  }}><ListItem title="Entrar"></ListItem></button>
                </ul>}
          </NavigationMenuContent>
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
          {title === 'Sair' ? <div onClick={async()=>{
              await signOut()
              
            }} className="flex space-x-2">
            <ExitIcon className="text-red-500"/>
             <div className="text-sm font-medium leading-none">{title}</div>
             </div> : <> <div className="text-sm font-medium leading-none">{title}</div> <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p></> }
         
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"
