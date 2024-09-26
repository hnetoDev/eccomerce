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
import CardProd from "./cardProd"

export function CarouselProd() {
  const [value,setValue] = React.useState()
  return (
    <Carousel 
      plugins={[
        Autoplay({
          delay: 4000
        })
      ]}
      opts={{
        
      }} className="w-full overflow-x-hidden">
      <CarouselContent  className="h-[27rem] w-60  ">
        <CarouselItem className=" justify-center space-x-4 flex items-center">
          
        </CarouselItem>
        <CarouselItem className=" justify-center space-x-4 flex items-center">
          
        </CarouselItem><CarouselItem className=" justify-center space-x-4 flex items-center">
          
        </CarouselItem><CarouselItem className=" justify-center space-x-4 flex items-center">
          
        </CarouselItem><CarouselItem className=" justify-center space-x-4 flex items-center">
          
        </CarouselItem><CarouselItem className=" justify-center space-x-4 flex items-center">
          
        </CarouselItem>
        <CarouselItem className=" justify-center space-x-4 flex items-center">
          
        </CarouselItem>
        <CarouselItem className=" justify-center space-x-4 flex items-center">
          <div className=" flex justify-center items-center w-full h-full ">
            <h1>Ver mais...</h1>
          </div>
        </CarouselItem>
        
      </CarouselContent>
    </Carousel>
  )
}
