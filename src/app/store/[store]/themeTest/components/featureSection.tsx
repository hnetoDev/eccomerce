
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Heart } from 'lucide-react';

const products = [
  {
    name: 'Vestido Elegante',
    price: 'R$ 599,90',
    image: 'Vestido elegante em manequim com fundo neutro'
  },
  {
    name: 'Blazer Clássico',
    price: 'R$ 799,90',
    image: 'Blazer clássico em manequim com fundo sofisticado'
  },
  {
    name: 'Calça Social',
    price: 'R$ 399,90',
    image: 'Calça social em manequim com fundo elegante'
  },
  {
    name: 'Camisa Premium',
    price: 'R$ 299,90',
    image: 'Camisa premium em manequim com fundo neutro'
  }
];

const FeaturedProducts = () => {
  return (
    <section className="py-20 bg-secondary">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900">DESTAQUES</h2>
            <p className="text-sm text-gray-600">arraste e veja os destaques da semana para você</p>
            <div className="h-1 w-8 mx-auto bg-gray-300 mt-2"></div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product, index) => (
            <motion.div
              key={product.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="product-card"
            >
              <div className="product-image">
                <img alt={product.name} className="w-full h-full object-cover" src="https://images.unsplash.com/photo-1694388001616-1176f534d72f" />
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-4 left-4 bg-white/80 hover:bg-white"
                >
                  <Heart className="h-5 w-5" />
                </Button>
                <div
                  className="absolute px-2 top-4 rounded-md right-4 bg-primary/80 hover:bg-primary"
                >
                  <h1> - 10% </h1>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-medium mb-2">{product.name}</h3>
                <p className="text-primary font-semibold">{product.price}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
