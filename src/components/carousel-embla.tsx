'use client'

import React, { useCallback, useEffect, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import { Product } from '@/types'
import CardProd from './cardProd'

interface EmblaCarouselProps {
  products:Product[]
}

const EmblaCarousel: React.FC<EmblaCarouselProps> = ({ products }) => {
  const [slidesToScroll, setSlidesToScroll] = useState(1)
  const [emblaRef, emblaApi] = useEmblaCarousel({ align: "start", loop: false,slidesToScroll:slidesToScroll, duration:0.4 , containScroll: "trimSnaps" })
  const [canScrollPrev, setCanScrollPrev] = useState(false)
  const [canScrollNext, setCanScrollNext] = useState(false)
  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setCanScrollPrev(emblaApi.canScrollPrev())
    setCanScrollNext(emblaApi.canScrollNext())
  }, [emblaApi])
  const updateSlidesToScroll = useCallback(() => {
    const isDesktop = window.matchMedia('(min-width: 768px)').matches
    setSlidesToScroll(isDesktop ? 4 : 1)
  }, [])

  useEffect(() => {
    updateSlidesToScroll()
    window.addEventListener('resize', updateSlidesToScroll)
    return () => window.removeEventListener('resize', updateSlidesToScroll)
  }, [updateSlidesToScroll])

  useEffect(() => {
    if (!emblaApi) return
    emblaApi.reInit({ slidesToScroll })
    onSelect()
    emblaApi.on('select', onSelect)
    emblaApi.on('reInit', onSelect)
  }, [emblaApi, slidesToScroll, onSelect])

  return (
    <div className="relative w-full px-6">
      {/* Prev Button */}
      <button
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-gray-800 text-white w-8 h-8 flex justify-center items-center rounded-full disabled:opacity-50"
        onClick={() => emblaApi?.scrollPrev()}
        disabled={!canScrollPrev}
      >
        ‹
      </button>

      {/* Viewport & products */}
      <div className="w-full" ref={emblaRef}>
        <div className="flex w-full">
          {products.map((slide, index) => (
            <div
              key={index}
              className="flex-[0_0_100%]  md:flex-[0_0_25%] p-2"
            >
              <div className='w-max'><CardProd img={slide.image ?? ['']} id={slide.id} name={slide.name} price={Number(slide.price).toFixed(2)} pricePromo={Number(slide.pricePromo).toFixed(2)} /></div>
            </div>
          ))}
        </div>
      </div>

      {/* Next Button */}
      <button
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-gray-800 text-white px-3 py-2 rounded-full disabled:opacity-50"
        onClick={() => emblaApi?.scrollNext()}
        disabled={!canScrollNext}
      >
        ›
      </button>
    </div>
  )
}

export default EmblaCarousel
