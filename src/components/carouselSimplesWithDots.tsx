import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Product } from "@/types"

export default function SectionAvaliacoes({products}: {products: Product[]}) {
  
  

  return (
    <div className="w-full max-w-4xl mx-auto">
      <Carousel
        opts={{ align: "start", }}
        className="w-full"
      >
        <CarouselContent className="-ml-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((item, index) => (
            <CarouselItem key={index} className="pl-2">
              {item}
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious className="font-bold" />
        <CarouselNext className="font-bold" />
      </Carousel>
    </div>
  )
}
