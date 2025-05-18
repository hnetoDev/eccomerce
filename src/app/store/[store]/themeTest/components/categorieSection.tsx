
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

const categories = [
  {
    name: 'Feminino',
    description: 'Elegância e estilo para todas as ocasiões',
    image: '/images/feminina.jpg'
  },
  {
    name: 'Masculino',
    description: 'Coleção moderna para o homem contemporâneo',
    image: '/images/masculino.webp'
  },
  {
    name: 'Acessórios',
    description: 'Complementos que fazem a diferença',
    image: '/images/acessorios.webp'
  },
  {
    name: 'Acessórios',
    description: 'Complementos que fazem a diferença',
    image: '/images/feminina.jpg'
  },
  {
    name: 'Acessórios',
    description: 'Complementos que fazem a diferença',
    image: '/images/feminina.jpg'
  }
];

const CategoriesRoupa = () => {
  return (
    <section className="py-20 z-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900">CATEGORIAS</h2>
            <p className="text-sm text-gray-600">arraste e veja os destaques da semana para você</p>
            <div className="h-1 w-8 mx-auto bg-gray-300 mt-2"></div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {categories.map((category, index) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="category-card"
            >
              <img alt={category.name} className="w-full h-[400px] z-50 object-cover" src={category.image} />
              <div className="category-overlay">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {category.name}
                  </h3>
                  <p className="text-white/80 mb-4">{category.description}</p>
                  <Button
                    variant="outline"
                    className="bg-white/10 text-white object-cover border-white/20 hover:bg-white/20"
                  >
                    Explorar
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoriesRoupa;
