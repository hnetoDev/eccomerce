'use client'

import { useTheme } from "@/app/context"
import { useSession } from "next-auth/react"
import Image from "next/image"
import { RiSecurePaymentLine } from "react-icons/ri"
import Footer from "../app/footer"
import { CarouselDemo } from "@/components/carousel"
import Link from "next/link"
import SearchDrawer from "@/components/searchDrawer"
import { UserCircle } from "lucide-react"
import CartCustom from "@/components/cart"
import Navigation from "./components/navigation"
import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

export default function LayoutTheme({ children }: { children: React.ReactNode }) {

  const theme = useTheme()
  const session = useSession()

  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  const handleScroll = (i: number) => {

    if (i) {
      // Verifique o scroll apenas no cliente
      if (i > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    }
  };
  useEffect(() => {
    // Garantir que o código seja executado no cliente (lado do navegador)
    const handleScroll = () => {
      if (typeof window !== 'undefined') {
        if (window.scrollY > 50) {
          setIsScrolled(true);
        } else {
          setIsScrolled(false);
        }
      }
    };

    // Adiciona o event listener de scroll
    window.addEventListener('scroll', handleScroll);

    // Remove o event listener quando o componente for desmontado
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []); // O useEffect só roda uma vez após a primeira renderização (sem dependências)
  

  return <div onScroll={(v)=>{
    handleScroll(v.currentTarget.scrollTop)
  }} className="w-full h-screen overflow-y-scroll flex flex-col">
    <nav
      className={
        `fixed top-0 left-0 w-full z-50 transition-all duration-300 px-6 py-4 md:px-12
        ${isScrolled ? "bg-white/90 backdrop-blur-md shadow-sm" : "bg-transparent "}`
      }
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <a
            href="#"
            className="text-2xl font-serif tracking-tight animate-fade-in-up"
          >
            MINIMA
          </a>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          {["Novidades", "Coleções", "Feminino", "Masculino", "Acessórios"].map((item, index) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className={`text-sm hover-link animation-delay-${index + 1}00 animate-fade-in-up`}
            >
              {item}
            </a>
          ))}
        </div>

        <div className="hidden md:flex items-center space-x-4 animate-fade-in-up animation-delay-500">
          <a href="#" className="p-2 hover:text-gray-500 transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </a>
          <a href="#" className="p-2 hover:text-gray-500 transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </a>
          <a href="#" className="p-2 hover:text-gray-500 transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
          </a>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            {mobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute left-0 right-0 bg-white shadow-lg px-6 py-4">
          <div className="flex flex-col space-y-4">
            {["Novidades", "Coleções", "Feminino", "Masculino", "Acessórios"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-sm py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item}
              </a>
            ))}
            <div className="flex items-center space-x-4 pt-4">
              <a href="#" className="p-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </a>
              <a href="#" className="p-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </a>
              <a href="#" className="p-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
    {children}
    <Footer />
  </div>
}