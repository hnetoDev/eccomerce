'use client'
import * as React from "react"
import Autoplay from "embla-carousel-autoplay"
import useEmblaCarousel from 'embla-carousel-react'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { CarIcon, QrCodeIcon } from "lucide-react"
import { CardStackIcon } from "@radix-ui/react-icons"
import '../app/globals.css'

export function CarouselBanner({ banner }: { banner: string[] }) {
  const [value, setValue] = React.useState()


  const [emblaRef3, emblaApi] = useEmblaCarousel({ loop: true }) // Ativando o loop infinito
  const [selectedIndex, setSelectedIndex] = React.useState(0) // Estado do índice do slide ativo
  const [scrollSnaps, setScrollSnaps] = React.useState<number[]>([]) // Lista de posições dos slides

  // Atualiza o índice do slide ativo
  const onSelect = React.useCallback(() => {
    if (!emblaApi) return
    setSelectedIndex(emblaApi.selectedScrollSnap())
  }, [emblaApi])

  // Inicializa os snaps e configura o evento de seleção
  React.useEffect(() => {
    if (!emblaApi) return
    setScrollSnaps(emblaApi.scrollSnapList()) // Obtemos as posições dos slides
    emblaApi.on('select', onSelect) // Adicionamos um ouvinte para o evento "select"
    onSelect() // Atualiza o estado inicial
  }, [emblaApi, onSelect])

  // Função para navegar para um slide específico ao clicar no dot
  const scrollTo = React.useCallback(
    (index: number) => emblaApi && emblaApi.scrollTo(index),
    [emblaApi]
  )

  return (
    <Carousel
      plugins={[
        Autoplay({
          delay: 4000,
          playOnInit: true
        }),
        
      ]}
      opts={{
        loop: true
      }}  className="w-full relative overflow-x-hidden">
      <div className="embla__dots absolute z-10 left-0 right-0 bottom-3">
        {scrollSnaps.map((_, index) => (
          <button
            key={index}
            className={`embla__dot ${index === selectedIndex ? 'embla__dot--active' : 'border'
              }`}
            onClick={() => scrollTo(index)}
          />
        ))}
      </div>
      <div className="" >
        <CarouselContent className="break:h-[27rem] h-[22rem]  ">
          
            <CarouselItem  className=" justify-center flex items-center">
              <img src={'aaa'} className=" rounded-xl break:h-[27rem] h-[22rem] w-full" />
            </CarouselItem>
            <CarouselItem  className=" justify-center flex items-center">
              <img src={'aaa'} className=" rounded-xl break:h-[27rem] h-[22rem] w-full" />
            </CarouselItem>
            <CarouselItem  className=" justify-center flex items-center">
              <img src={'aaa'} className=" rounded-xl break:h-[27rem] h-[22rem] w-full" />
            </CarouselItem>
    

        </CarouselContent>
      </div>
    </Carousel>
  )
}
