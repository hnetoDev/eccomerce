import { useTheme } from '@/app/context';
import { Product } from '@/types';

import { SearchIcon } from 'lucide-react';
import Link from 'next/link';
import React, { useState, useEffect, useRef } from 'react';
import { Loader } from './loader';
import { ScrollArea } from './ui/scroll-area';

const InputSearch = () => {
  const [inputValue, setInputValue] = useState(''); // Valor digitado pelo usuário
  const [finalValue, setFinalValue] = useState(''); // Valor final após o debounce
  const [isPopoverVisible, setPopoverVisible] = useState(false); // Controla a visibilidade do popover
  const [isLoading, setLoading] = useState(false); // Controla o estado de carregamento
  const inputRef = useRef<HTMLInputElement>(null); // Ref para o input
  const popoverRef = useRef<HTMLDivElement>(null); // Ref para o popover
  const [data, setData] = useState<Product[] | undefined>(undefined);
  const theme = useTheme()

  useEffect(()=>{
    const fetchData = async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/product/search`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: finalValue,
          storeId: theme.storeId
        }),
      })
      if(res.ok){
        const data = await res.json()
        setData(data)
        setLoading(false)
        return
      }
      if (!res.ok) {
        setLoading(false)
        setPopoverVisible(false)
        return
      }
      
      return
    }
    fetchData()
  },[finalValue])
  // Estado para armazenar os dados do popover
  useEffect(() => {
    const timer = setTimeout(() => {
      // Se o inputValue não for vazio, defina o valor final e exiba o popover
      if (inputValue) {
        setLoading(true); // Inicia o carregamento
        setFinalValue(inputValue);
        setPopoverVisible(true);
      }
    }, 1000); // Espera 2 segundos após o último digitar

    // Limpa o timer anterior caso o usuário comece a digitar novamente
    return () => clearTimeout(timer);
  }, [inputValue]); // O efeito será executado sempre que o inputValue mudar

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    setPopoverVisible(false); // Esconde o popover enquanto está digitando
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (inputRef.current && !inputRef.current.contains(event.target as Node) && 
        popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
      setPopoverVisible(false); // Esconde o popover
      setLoading(false); // Para o carregamento
    }
  };

  // Adiciona o listener para detectar clique fora
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    
    // Remove o listener ao desmontar o componente
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative w-full">
      {/* Campo de input */}
      <div className={`  duration-200 flex bg-muted rounded-3xl  focus-within:border-primary px-5  p-3 items-center space-x-2 w-full`}>
        <input ref={inputRef} value={inputValue} type="text" onChange={handleChange} placeholder="O que você procura?" className=" bg-transparent text-muted-foreground p-0 w-full border-0 outline-0" />
        { isLoading ? <Loader/> : <SearchIcon className="text-primary" />}
      </div>

      {/* Popover que aparece após 2 segundos de inatividade */}
      {isPopoverVisible && finalValue && (
        <div ref={popoverRef} className="absolute top-full mt-2 rounded-xl  w-full bg-background p-3 border shadow-lg">
          {data && data.length > 0 ? <ScrollArea className='flex-col h-72 space-y-1'>
            {data.map(p =>{
              return <Link key={p.id} href={`/product/${p.id}`} className='flex items-center space-x-2 p-2 rounded-lg hover:bg-primary/10'>
                {p.image ? <img src={p.image[0]} alt={p.name} className='w-16 h-16 rounded-lg' /> : null }
                <div className='flex flex-col'>
                  <h1 className='text-sm font-semibold'>{p.name}</h1>
                  {p.pricePromo ? <div className='flex space-x-2'>
                    <h1 className='text-sm text-primary'>R$ {p.pricePromo}</h1>
                    <h1 className='text-sm text-muted-foreground line-through'>R$ {p.price}</h1>
                  </div> : <h1 className='text-sm text-muted-foreground'>R$ {p.price}</h1>}
                </div>
              </Link>
            }) }
          </ScrollArea> : <h1 className='py-4 px-2 text-muted-foreground'>Produto não encontrado</h1>}
          <Link href={`/`} className='text-primary underline w-full '><h1 className='text-center'>Ver todos produtos</h1></Link>
        </div>
      )}
    </div>
  );
};

export default InputSearch;
