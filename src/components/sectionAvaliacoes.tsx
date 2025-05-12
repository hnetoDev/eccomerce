import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

export default function SectionAvaliacoes() {
  const items = [
    <div key={2} className="bg-primary/5 rounded-2xl flex flex-col justify-center items-center max-w-3xl mx-auto p-6 relative">
      <div className="text-yellow-400 text-2xl mb-4">
        {'★'.repeat(5)}
      </div>
      <p className="text-muted-foreground  italic text-base">
        <span className="text-2xl text-primary mr-2">“</span>
        Sou cliente há anos, desde o início, para ser sincera, e a qualidade de cada peça é inegável. O requinte e o bom gosto também são marca registrada! Agora, no site, eu me sinto ainda mais segura, posso comprar de olhos fechados, sempre, porque sei que estou cercada pelo que há de melhor!
        <span className="text-2xl text-primary ml-2">”</span>
      </p>
      <p className="mt-4 font-semibold ">Eliete Vanucchi</p>
    </div>,
    <div key={2} className="bg-primary/5 rounded-2xl flex flex-col justify-center items-center max-w-3xl mx-auto p-6 relative">
      <div className="text-yellow-400 text-2xl mb-4">
        {'★'.repeat(5)}
      </div>
      <p className="text-muted-foreground  italic text-base">
        <span className="text-2xl text-primary mr-2">“</span>
        Sou cliente há anos, desde o início, para ser sincera, e a qualidade de cada peça é inegável. O requinte e o bom gosto também são marca registrada! Agora, no site, eu me sinto ainda mais segura, posso comprar de olhos fechados, sempre, porque sei que estou cercada pelo que há de melhor!
        <span className="text-2xl text-primary ml-2">”</span>
      </p>
      <p className="mt-4 font-semibold ">Eliete Vanucchi</p>
    </div>,
    <div key={2} className="bg-primary/5 rounded-2xl flex flex-col justify-center items-center max-w-3xl mx-auto p-6 relative">
      <div className="text-yellow-400 text-2xl mb-4">
        {'★'.repeat(5)}
      </div>
      <p className="text-muted-foreground  italic text-base">
        <span className="text-2xl text-primary mr-2">“</span>
        Sou cliente há anos, desde o início, para ser sincera, e a qualidade de cada peça é inegável. O requinte e o bom gosto também são marca registrada! Agora, no site, eu me sinto ainda mais segura, posso comprar de olhos fechados, sempre, porque sei que estou cercada pelo que há de melhor!
        <span className="text-2xl text-primary ml-2">”</span>
      </p>
      <p className="mt-4 font-semibold ">Eliete Vanucchi</p>
    </div>,
  ]

  return (
    <div className="w-full max-w-4xl mx-auto">
      <Carousel
        opts={{ align: "start", }}
        className="w-full"
      >
        <CarouselContent className="-ml-2">
          {items.map((item, index) => (
            <CarouselItem
              key={index}
              className=" pl-2"
            >
              <div className="">
                {item}
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="font-bold" />
        <CarouselNext className="font-bold" />
      </Carousel>
    </div>
  )
}
