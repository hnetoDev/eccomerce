import React, { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import '../app/globals.css'
import Image from 'next/image';
import Autoplay from "embla-carousel-autoplay"

export default function CarouselProd({ images }: { images: string[] | undefined }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ align: 'center' }); // Inicializa o Embla
  const [selectedIndex, setSelectedIndex] = useState(0); // Índice do slide ativo
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]); // Posições dos slides

  // Atualiza o índice ativo ao mudar de slide
  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  // Configurações iniciais
  useEffect(() => {
    if (!emblaApi) return;
    setScrollSnaps(emblaApi.scrollSnapList()); // Obtém posições dos slides
    emblaApi.on('select', onSelect); // Escuta o evento de seleção
  }, [emblaApi, onSelect]);

  // Função para navegar para um slide específico ao clicar no dot
  const scrollTo = useCallback(
    (index: number) => emblaApi && emblaApi.scrollTo(index),
    [emblaApi]
  );



  return (
    <div className='flex space-x-4'>
      <div className="flex flex-col space-y-4  mt-2">
        {scrollSnaps.map((_, index) => (
          <button
            key={index}
            className={` w-16 h-16 ${index === selectedIndex ? ' border-primary  opacity-35' : 'border'
              }`}
            onClick={() => scrollTo(index)}
          >
            {images ? images[index] ? <Image width={1000} height={1000} src={images[index]} className=" border w-16 h-16 duration-200" alt="" /> : null : null}
          </button>
        ))}
      </div>
      <div className="embla relative">

        <div className="embla__viewport   rounded-lg " ref={emblaRef}>

          <div className="embla__container ">
            {images ? images.map((image, index) => (
              <div key={index} className="embla__slide  rounded-lg ">
                <div className='rounded-lg'>
                  <Image width={1000} height={1000} src={image} className='w-[36rem] h-[38rem] rounded-lg' alt="Slide 1" />
                </div>
              </div>
            )) : null}
          </div>

        </div>
      </div>
    </div>
  );
}