'use client'
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

export default function SectionCategoriesAnimated() {

  const categories = [
    {
      name: 'Pré treino',
      description: 'Aumente sua energia e foco durante os treinos com nossos pré-treinos.',
      image: '/images/termo.png'
    },
    {
      name: 'Creatina',
      description: 'Aumente sua força e resistência com nossa creatina de alta qualidade.',
      image: '/images/creatina.png'
    },
    {
      name: 'Proteínas',
      description: 'Suplementos proteicos para ajudar na recuperação muscular.',
      image: '/images/wheyIntegral.png'
    },
    {
      name: 'Proteínas',
      description: 'Suplementos proteicos para ajudar na recuperação muscular.',
      image: '/images/whey.webp'
    },
    {
      name: 'Roupas',
      description: 'Estilo e conforto para o seu treino.',
      image: '/images/roupas.png'
    }
  ]
  

  return <section className="py-20 z-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900">Compre por categoria 💪❤️</h2>
            <div className="h-1 w-8 mx-auto bg-gray-300 mt-2"></div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {categories.map((category, index) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className='flex flex-col justify-center items-center'
            >
              <div className="border border-primary cursor-pointer group relative bg-primary  p-6 flex rounded-full w-56 h-56 justify-center items-center">
              <div className='absolute w-full bg-gradient-to-t rounded-full from-primary to-transparent h-full'></div>
              <Image width={200} height={2000} alt={category.name} className="w-40 ease-in-out transition-all duration-300  group-hover:scale-125" src={category.image} />
              </div>
              <h1 className='text-center text-xl mt-4'>{category.name}</h1>
              
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  
}





