'use client'
import { useTheme } from "@/app/context";
import { CarouselDemo } from "@/components/carousel";
import CartCustom from "@/components/cart";
import SearchDrawer from "@/components/searchDrawer";
import SheetCustom from "@/components/sheet";
import { ChevronDown, Phone, SearchIcon, UserCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { CiLocationOn } from "react-icons/ci";
import { FaFacebook, FaInstagram, FaWhatsapp } from "react-icons/fa";
import { IoLogoTiktok } from "react-icons/io5";
import { MdEmail, MdOutlineEmail } from "react-icons/md";
import { PiDotsThreeCircle, PiXLogo } from "react-icons/pi";
import Footer from "./footer";

import { useEffect, useRef, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { DataInit } from "@/types";
import { HoverCard } from "@/components/popoverCollections";
import { useSession } from "next-auth/react";
import PopoverUser from "@/components/popoverAccount";
import ThemeTabs from "@/components/tabTheme";
import InputSearch from "@/components/inputSearch";

const fetchStoreData = async (name: string): Promise<DataInit> => {
  alert('fetch1vez')
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/store/${name}`)
  if (!res.ok) throw new Error('Erro ao buscar dados')
  return res.json()
}

export default function LayoutApp({ children }: { children: React.ReactNode }) {

  const theme = useTheme()
  const session = useSession()

  const { data } = useQuery({
    queryKey: ['store'],
    queryFn: () => fetchStoreData(theme.name),
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    refetchInterval: false,
    refetchOnMount: false,
    staleTime: 1000 * 60 * 20,
  })

  const [isScrolled, setIsScrolled] = useState<boolean>(false);




  const [collections, setCollections] = useState<string[]>([])
  useEffect(() => {
    if (data) {
      const dataT = data.Collection.map((c) => {
        return c.name
      })
      setCollections(dataT)
    }
  }, [data])
  const [scrollY, setScrollY] = useState(0); // Estado para scrollY
  const [scrollPassed50, setScrollPassed50] = useState(false); // Verifica se passou de 50px
  const scrollContainerRef = useRef<HTMLDivElement>(null); // Ref para a div que queremos escutar

  // Função para verificar o scroll
  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const currentScrollY = scrollContainerRef.current.scrollTop; // Pega a posição do scroll da div
      setScrollY(currentScrollY); // Atualiza o estado do scrollY
      if (currentScrollY > 50) {
        if (!scrollPassed50) {
          setScrollPassed50(true); // Atualiza o estado
        }
      } else {
        if (scrollPassed50) {
          setScrollPassed50(false); // Atualiza o estado
        }
      }
    }
  };

  // Adiciona o evento de scroll quando o componente é montado
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll); // Escuta o evento de scroll na div específica
    }

    // Limpeza do evento quando o componente for desmontado
    return () => {
      if (container) {
        container.removeEventListener('scroll', handleScroll); // Remove o ouvinte de evento ao desmontar
      }
    };
  }, [scrollPassed50]);

  // lembrar de verificar se o scroll é maior que 50 e se isso causa problema de desempenho

  return <div ref={scrollContainerRef} className="flex h-screen w-screen overflow-x-hidden overflow-y-auto flex-col ">
    <CarouselDemo />
    <div className={`w-full md:w-0 md:fixed md:invisible visible ${scrollPassed50 ? 'shadow-lg' : ''}  z-50 bg-background px-8 py-3 sticky top-0 flex justify-between items-center`}>
      <div className="w-2/4 flex space-x-2">
        <SheetCustom />
      </div>
      <Link href={{ pathname: '/' }}>
        <Image src={theme.logoUrlLight} alt="Logo da loja" width={130} height={30} className="rounded-lg dark:w-0 w-32 dark:fixed dark:invisible  overflow-y-visible " />
        <Image src={theme.logoUrlLight} alt="Logo da loja" width={130} height={30} className="rounded-lg w-0 fixed invisible dark:w-32 dark:relative dark:visible  overflow-y-visible " />
      </Link>
      <div className="flex justify-end w-2/4 space-x-4 items-center">
        <SearchDrawer />
        <UserCircle className="w-6 h-6 text-muted-foreground" />
        <CartCustom addToCart={false} />
      </div>
    </div>
    <div className={`w-0 md:w-full md:sticky md:visible invisible ${scrollPassed50 ? 'shadow-lg' : ''} fixed xl:px-16 2xl:px-40   z-50 bg-background px-8 py-3 top-0 flex flex-col justify-between items-center`}>
      <div className="w-full flex justify-between items-center">

        <div className="w-2/4 items-center flex space-x-8">
          <Link href={{ pathname: '/' }}>
            <Image src={theme.logoUrlLight} alt="Logo da loja" width={130} height={30} className="rounded-lg dark:w-0 w-28 h-20 dark:fixed dark:invisible  overflow-y-visible " />
            <Image src={theme.logoUrlLight} alt="Logo da loja" width={130} height={30} className="rounded-lg w-0 fixed invisible dark:w-28 h-20 dark:relative dark:visible  overflow-y-visible " />
          </Link>
          <div className="h-max w-max">
            <ThemeTabs />
          </div>
        </div>
        <div className="w-full">
          <InputSearch />
        </div>
        {/*        <div className={`  duration-200 flex bg-muted rounded-3xl  focus-within:border-primary px-5  p-3 items-center space-x-2 w-full`}>
          <input type="text" onChange={() => {
          }} placeholder="O que você procura?" className=" bg-transparent text-muted-foreground p-0 w-full border-0 outline-0" />
          <SearchIcon className="text-primary" />
        </div>*/}
        <div className="flex justify-end w-2/4 space-x-4 items-center">
          {session.data?.user ? <PopoverUser /> : <Link href={`/authenticator`} className="flex cursor-pointer rounded-3xl items-center justify-center space-x-2">
            <UserCircle className="w-8 h-8 text-muted-foreground" />
            <div className="flex flex-col ">
              <h1 className="text-sm text-muted-foreground ">Entre</h1>
              <h1 className="text-sm text-muted-foreground">ou cadastre</h1>
            </div>
          </Link>}

          <div className=" border-l px-4 flex items-center justify-center"><CartCustom addToCart={false} /></div>
        </div>
      </div>
      <div className="mt-2 ">
        {collections ? <div className="flex space-x-12 justify-center items-center">
          {collections.slice(0, 7).map((c) => {
            return <Link href={{ pathname: `/app/collections/${c}` }} key={c} className="text-muted-foreground text-sm cursor-pointer hover:text-primary">{c}</Link>
          })}
          <HoverCard collection={collections} />
        </div> : null}
      </div>
    </div>


    {children}



    <Footer />
  </div>
}

function useDebounce(arg0: () => void, arg1: number) {
  throw new Error("Function not implemented.");
}
