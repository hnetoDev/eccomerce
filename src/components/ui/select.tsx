import React, { Dispatch, SetStateAction, useEffect, useRef } from 'react';
import * as SelectPrimitive from '@radix-ui/react-select';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils'; // Função para a classnames personalizada (se você tiver isso configurado)

const Select = SelectPrimitive.Root;
const SelectTrigger = SelectPrimitive.Trigger;
const SelectValue = SelectPrimitive.Value;
const SelectContent = SelectPrimitive.Content;
const SelectItem = SelectPrimitive.Item;
const SelectLabel = SelectPrimitive.Label;
const SelectSeparator = SelectPrimitive.Separator;
const SelectGroup = SelectPrimitive.Group;

interface CustomSelectProps {
  value: string;
  setOrderBy: Dispatch<SetStateAction<string>>;
  options: { value: string, label: string }[];
}

const CustomSelect: React.FC<CustomSelectProps> = ({ value, setOrderBy, options }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const selectRef = useRef<HTMLDivElement>(null); // Ref para o container do select

  const handleSelectToggle = () => {
    setIsOpen(!isOpen);
  };


  // Fechar o select se clicar fora dele
  const handleClickOutside = (event: MouseEvent) => {
    if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  // Adiciona e remove o evento de clique fora do componente
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside); // Adiciona evento de clique
    return () => {
      document.removeEventListener("mousedown", handleClickOutside); // Limpa o evento ao desmontar
    };
  }, []);

  return (
    <div className="relative w-64" ref={selectRef}>
      {/* Botão do select customizado */}
      <div
        onClick={handleSelectToggle}
        className="flex items-center justify-between bg-background border border-muted rounded-xl px-4 py-2 cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary"
      >
        <span className="text-muted-foreground">{value}</span>
        <ChevronDown
          className={`w-5 h-5 transform transition-transform duration-200 ${isOpen ? "rotate-180" : ""
            }`}
        />
      </div>

      {/* Opções do select */}
      {isOpen && (
        <div className="absolute left-0 right-0 mt-2 bg-background border border-muted rounded-lg shadow-lg z-10">
          <ul className="max-h-48 overflow-y-auto">
            {options.map((option) => (
              <li
                key={option.value}
                onClick={() => setOrderBy(option.label)}
                className="px-4 py-2 hover:bg-primary/5 text-sm text-muted-foreground hover:text-primary cursor-pointer"
              >
                {option.label}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>

  );
};

export default CustomSelect;
