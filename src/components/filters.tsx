import React, { useState, useMemo } from 'react';
import * as SliderPrimitive from '@radix-ui/react-slider';
import { DollarSign, FilterIcon, ListFilter, SortAsc, SortDesc, Zap } from 'lucide-react';
import { Label } from './ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import CustomCheckbox from './customCheckBox';



const FilterSlider = ({ categories, setCategoriesSelected, priceRange, setPriceRange }: {
  priceRange: [number, number], setPriceRange: React.Dispatch<React.SetStateAction<[number, number]>>, setCategoriesSelected: React.Dispatch<React.SetStateAction<string[]>>,
  categories: string[]
}) => {



  // Função que lida com a alteração do slider (alteração dos valores mínimo e máximo)
  const handleSliderChange = (newValue: number[]) => {
    setPriceRange([newValue[0], newValue[1]]);
  };

  // Lógica para filtrar os produtos com base no preço
  return (
    <div>
      <div className="space-y-4">

        {/* Filtro de Faixa de Preço */}
        <div className=''>
          <label className=" font-medium flex items-center text-muted-foreground">
            Promoção
          </label>
          <div className='flex flex-col mt-2 space-y-1'>
            <CustomCheckbox label='Apenas promoções'/>
          </div>
        </div>
        <div className=''>
          <label className=" font-medium flex items-center text-muted-foreground">
            Categorias
          </label>
          <div className='flex flex-col mt-2 space-y-1'>
            {categories.map((category, index) => (
              <CustomCheckbox key={index} label={category} />
            ))}
          </div>
        </div>
        {/*<div className=''>
          <label className=" font-medium flex items-center text-muted-foreground">
            Categorias
          </label>
          <div className='flex flex-col mt-2 space-y-1'>
            {categories.map((category, index) => (
              <div key={index} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id={`category-${index}`}
                  value={category}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setCategoriesSelected((prev) => [...prev, category]);
                    } else {
                      setCategoriesSelected((prev) => prev.filter((cat) => cat !== category));
                    }
                  }}
                />
                <label htmlFor={`category-${index}`} className="text-sm text-muted-foreground">
                  {category}
                </label>
              </div>
            ))}
          </div>
        </div>*/}
        <div>
          <label className=" font-medium flex items-center text-muted-foreground">
            Faixa de Preço
          </label>
          <SliderPrimitive.Root
            className="relative mt-2 flex w-full touch-none select-none items-center"
            value={priceRange}
            onValueChange={handleSliderChange}
            max={10000}
            step={100}
            min={0}
            aria-labelledby="price-range"

          >
            <SliderPrimitive.Track className="relative h-2 w-full grow overflow-hidden rounded-full bg-secondary">
              <SliderPrimitive.Range className="absolute h-full bg-primary" />
            </SliderPrimitive.Track>
            {/* Thumb para o valor mínimo */}
            <SliderPrimitive.Thumb className="block h-5 w-5 rounded-full border-2 border-primary bg-background ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50" />
            {/* Thumb para o valor máximo */}
            <SliderPrimitive.Thumb className="block h-5 w-5 rounded-full border-2 border-primary bg-background ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50" />
          </SliderPrimitive.Root>
          <div className="flex justify-between mt-2 text-sm text-slate-400">
            <span>R$ {priceRange[0]}</span>
            <span>R$ {priceRange[1]}</span>
          </div>
        </div>

        {/* Exibindo Produtos Filtrados */}
        <button className='p-3 bg-primary rounded-xl text-white'>Filtrar</button>

      </div>
    </div>
  );
};

export default FilterSlider;
