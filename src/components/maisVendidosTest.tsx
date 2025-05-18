'use client'

import React, { useEffect, useState, useCallback } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import CardProd from './cardProd'
import CardProdLanding from './cardProdLading'
import Link from 'next/link'

interface Product {
  id: string
  name: string
  image: string[]
  price: string
  pricePromo: string
}

interface ProductCarouselProps {
  collection?: {
    id: string
    name: string
    produtos: Product[]
  }[]
}

const ProductCarouselTeste: React.FC<ProductCarouselProps> = ({ collection }) => {
  const [slidesToScroll, setSlidesToScroll] = useState(1)
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([])

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: "start",
      containScroll: 'trimSnaps',
      slidesToScroll,
    },
  )

  const updateSlidesToScroll = useCallback(() => {
    const width = window.innerWidth
    if (width >= 1024) setSlidesToScroll(4)
    else if (width >= 768) setSlidesToScroll(2)
    else setSlidesToScroll(1)
  }, [])

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setSelectedIndex(emblaApi.selectedScrollSnap())
  }, [emblaApi])

  useEffect(() => {
    updateSlidesToScroll()
    window.addEventListener('resize', updateSlidesToScroll)
    return () => window.removeEventListener('resize', updateSlidesToScroll)
  }, [updateSlidesToScroll])

  useEffect(() => {
    if (!emblaApi) return
    emblaApi.reInit({ slidesToScroll })
    setScrollSnaps(emblaApi.scrollSnapList())
    onSelect()
    emblaApi.on('select', onSelect)
    emblaApi.on('reInit', onSelect)
  }, [emblaApi, slidesToScroll, onSelect])

  const allProducts: Product[] = collection?.flatMap((c) => c.produtos) ?? []

  return (
    <div className="py-10 relative w-full">
      <div className='w-full  flex justify-between items-center'>
      <h2 className="text-2xl font-semibold text-center ">Mais Vendidos</h2>
      <Link href={{pathname:`/`}} className=''>Ver mais &gt;</Link>
      </div>

      {/* Prev Button */}
      <button
        onClick={() => emblaApi?.scrollPrev()}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-primary text-white w-8 h-8  justify-center items-center rounded-full"
      >
        ‹
      </button>

      {/* Carousel */}
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {allProducts.map((p) => (
            <div
              key={p.id}
              className="flex-[0_0_50%] pb-4 sm:flex-[0_0_50%] md:flex-[0_0_50%] lg:flex-[0_0_25%] px-2"
            >
              <CardProd
                id={p.id}
                img={p.image}
                name={p.name}
                price={p.price}
                pricePromo={p.pricePromo}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Next Button */}
      <button
        onClick={() => emblaApi?.scrollNext()}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-primary text-white w-8 h-8 flex justify-center items-center rounded-full"
      >
        ›
      </button>

      {/* Dots */}
      <div className="flex justify-center mt-6 gap-2">
        {scrollSnaps.map((_, index) => (
          <button
            key={index}
            onClick={() => emblaApi?.scrollTo(index)}
            className={`w-3 h-3 rounded-full duration-200 transition-all ${
              index === selectedIndex ? 'bg-primary w-6' : 'bg-gray-400'
            }`}
          />
        ))}
      </div>
    </div>
  )
}

export default ProductCarouselTeste
