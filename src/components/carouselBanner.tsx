'use client'
import * as React from "react"
import Autoplay from "embla-carousel-autoplay"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { CarIcon, QrCodeIcon } from "lucide-react"
import { CardStackIcon } from "@radix-ui/react-icons"

export function CarouselBanner() {
  const [value,setValue] = React.useState()
  return (
    <Carousel 
      plugins={[
        Autoplay({
          delay: 4000
        })
      ]}
      opts={{
        loop: true
      }} className="w-full overflow-x-hidden">
      <CarouselContent  className="break:h-[27rem] h-[22rem]  ">
        <CarouselItem className=" justify-center flex items-center">
          <img src="/banner.png"  className=" break:h-[27rem] h-[22rem] w-full"/>
        </CarouselItem>
        <CarouselItem className=" justify-center flex items-center">
          <img src="/banner2.jpg"  className=" break:h-[27rem] h-[22rem] w-full"/>
        </CarouselItem>
        
        <CarouselItem className=" justify-center flex items-center">
          <CardStackIcon />
          <h1 className=" text-sm font-bold">Parcelado em ate 3x sem juros</h1>
        </CarouselItem>
        
      </CarouselContent>
    </Carousel>
  )
}
