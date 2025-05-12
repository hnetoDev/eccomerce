import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';  // Para importar o CSS básico do Swiper
import { Product } from '@/types';
import CardProd from './cardProd';


// Produtos de exemplo


const ProductCarousel = ({ collection }: {
  collection?: {
    id: string;
    name: string;
    produtos: {
      id: string;
      name: string;
      image: string[];
      price: string;
      pricePromo: string;
    }[];
  }[]
}) => {
  return (
    <div className="py-10">
      <h2 className="text-2xl font-semibold text-center mb-6">Mais Vendidos</h2>

      <Swiper
        spaceBetween={10} // Espaçamento entre os slides
        slidesPerView={1} // Número de slides visíveis por vez em telas pequenas
        breakpoints={{
          640: {
            slidesPerView: 1, // 1 produto por vez em telas pequenas (mobile)
          },
          768: {
            slidesPerView: 2, // 2 produtos por vez em telas médias (tablet)
          },
          1024: {
            slidesPerView: 4, // 4 produtos por vez em telas grandes (desktop)
          },
        }}
        loop={true} // Ativa o loop do carousel
        autoplay={{
          delay: 3000, // Tempo para autoplay (3 segundos)
          disableOnInteraction: false, // Continua o autoplay mesmo após interação
        }}
      >
        {collection ? collection.map((c, i) => {
          return c.produtos.map((p, i) => {
            return (
              <SwiperSlide key={p.id}>
                <CardProd key={i} id={p.id} img={p.image} name={p.name} price={p.price} pricePromo={p.pricePromo} />
          </SwiperSlide>)
          })
        }) : null}

      </Swiper>
    </div>
  );
};

export default ProductCarousel;
