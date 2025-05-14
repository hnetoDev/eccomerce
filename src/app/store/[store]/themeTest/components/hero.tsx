'use client'
import React, { useState, useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    {
      image: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
      title: "Nova Coleção Outono",
      description: "Peças minimalistas para o seu guarda-roupa.",
      buttonText: "Comprar Agora"
    },
    {
      image: "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1965&q=80",
      title: "Essenciais de Verão",
      description: "Tecidos leves e confortáveis para dias quentes.",
      buttonText: "Ver Coleção"
    },
    {
      image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80",
      title: "Acessórios Minimalistas",
      description: "Complete seu look com nossa seleção de acessórios.",
      buttonText: "Descobrir"
    }
  ];

  const touchStartX = useRef<number>(0); // Posição inicial do toque
  const touchEndX = useRef<number>(0); // Posição final do toque

  // Configurar a transição automática do slide
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [slides.length]);

  // Detectar movimento de arraste
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX; // Pega a posição inicial do toque
  };

  const handleTouchEnd = () => {
    // Se o movimento for para a direita (arraste para a esquerda)
    if (touchStartX.current - touchEndX.current > 100) {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }
    // Se o movimento for para a esquerda (arraste para a direita)
    if (touchEndX.current - touchStartX.current > 100) {
      setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX; // Pega a posição final do toque
  };

  return (
    <div
      className="relative h-screen w-full overflow-hidden"
      onTouchStart={handleTouchStart} // Inicia o movimento do toque
      onTouchMove={handleTouchMove}   // Acompanha o movimento
      onTouchEnd={handleTouchEnd}     // Finaliza o movimento
    >
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          <div 
            className="absolute inset-0 bg-cover bg-center" 
            style={{ backgroundImage: `url(${slide.image})` }}
          />
          <div className="absolute inset-0 bg-black/30" />
          
          <div className="relative h-full flex items-center justify-center text-white text-center px-4">
            <div className="max-w-lg">
              <h1 
                className={`text-4xl md:text-6xl font-serif mb-4 ${
                  index === currentSlide ? "animate-fade-in-up" : ""
                }`}
              >
                {slide.title}
              </h1>
              <p 
                className={`text-lg md:text-xl mb-8 ${
                  index === currentSlide ? "animate-fade-in-up animation-delay-200" : ""
                }`}
              >
                {slide.description}
              </p>
              <Button 
                size="lg"
                className={`bg-white text-black hover:bg-black hover:text-white border border-white transition-colors duration-300 ${
                  index === currentSlide ? "animate-fade-in-up animation-delay-300" : ""
                }`}
              >
                {slide.buttonText}
              </Button>
            </div>
          </div>
        </div>
      ))}

      <div className="absolute bottom-10 left-0 right-0 flex justify-center space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === currentSlide ? "w-8 bg-white" : "w-2 bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Hero;
