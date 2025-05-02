import React, { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import '../app/globals.css'
import Image from 'next/image';
import Autoplay from "embla-carousel-autoplay"

export default function CarouselWithDots() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ align: 'center' },[Autoplay({delay:4000,playOnInit:true,stopOnMouseEnter:false,stopOnInteraction:false,stopOnFocusIn:false,stopOnLastSnap:false})]); // Inicializa o Embla
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
    (index :number) => emblaApi && emblaApi.scrollTo(index),
    [emblaApi]
  );

  return (
    <div className="embla relative ">
        <div className="embla__dots absolute z-10 left-0 right-0 bottom-3">
          {scrollSnaps.map((_, index) => (
            <button
              key={index}
              className={`embla__dot ${index === selectedIndex ? 'embla__dot--active border-white border-3' : 'border'
                }`}
              onClick={() => scrollTo(index)}
            />
          ))}
        </div>
      <div className="embla__viewport   rounded-lg " ref={emblaRef}>
        <div className="embla__container ">
          <div className="embla__slide  rounded-lg px-4 ">
            <div className='bg-orange-500 rounded-lg'>
              <Image width={200} height={200} src="/banner3.png" alt="Slide 1" />
            </div>
          </div>
          <div className="embla__slide  rounded-lg px-4 ">
            <div className='bg-orange-500 rounded-lg'>
              <Image width={200} height={200} src="/banner3.png" alt="Slide 1" />
            </div>
          </div>
          <div className="embla__slide  rounded-lg px-4 ">
            <div className='bg-orange-500 rounded-lg'>
              <Image width={200} height={200} src="/banner3.png" alt="Slide 1" />
            </div>
          </div>
          <div className="embla__slide  rounded-lg px-4 ">
            <div className='bg-orange-500 rounded-lg'>
              <Image width={200} height={200} src="/banner3.png" alt="Slide 1" />
            </div>
          </div>
          

        </div>
      </div>


    </div>
  );
}