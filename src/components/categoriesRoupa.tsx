
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

const categories = [
  {
    name: 'Feminino',
    description: 'Elegância e estilo para todas as ocasiões',
    image: 'Mulher vestindo roupa elegante em ambiente sofisticado'
  },
  {
    name: 'Masculino',
    description: 'Coleção moderna para o homem contemporâneo',
    image: 'Homem vestindo terno elegante em ambiente executivo'
  },
  {
    name: 'Acessórios',
    description: 'Complementos que fazem a diferença',
    image: 'Diversos acessórios de moda em exposição elegante'
  }
];

const Categories = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4">Nossas Categorias</h2>
          <p className="text-muted-foreground">
            Explore nossa seleção de produtos premium
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="category-card"
            >
              <img  alt={category.name} className="w-full h-[400px] object-cover" src="https://images.unsplash.com/photo-1595872018818-97555653a011" />
              <div className="category-overlay">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {category.name}
                  </h3>
                  <p className="text-white/80 mb-4">{category.description}</p>
                  <Button
                    variant="outline"
                    className="bg-white/10 text-white border-white/20 hover:bg-white/20"
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

export default Categories;
