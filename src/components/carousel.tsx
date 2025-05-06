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

export function CarouselDemo() {
  return (
    <Carousel
      plugins={[
        Autoplay({
          delay: 2000
        })
      ]}
      opts={{
        loop: true
      }} className="bg-primary py-1">
      <CarouselContent className="">
        <CarouselItem className=" justify-center space-x-4 flex items-center">
          <QrCodeIcon className="text-white" />
          <h1 className=" text-sm text-white font-bold">5% de desconto no PIX</h1>
        </CarouselItem>
        <CarouselItem className=" justify-center space-x-4 flex items-center">
          <CarIcon className="text-white" />
          <h1 className=" text-sm text-white font-bold">Frete gratis p/ PIRITIBA</h1>
        </CarouselItem>
        <CarouselItem className=" justify-center space-x-4 flex items-center">
          <CardStackIcon className="text-white" />
          <h1 className=" text-sm text-white font-bold">Parcelado em ate 3x sem juros</h1>
        </CarouselItem>
      </CarouselContent>
    </Carousel>
  )
}
