import { Check } from 'lucide-react';
import React, { useState } from 'react';

const CustomCheckbox = ({label}:{label:string}) => {
  // Estado para armazenar o valor do checkbox
  const [isChecked, setIsChecked] = useState(false);

  // Função para alternar o estado do checkbox
  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  return (
    <div className="flex items-center space-x-2">
      {/* Custom Checkbox */}
      <label className="flex items-center cursor-pointer space-x-2">
        <div
          className={`w-5 h-5 relative border-2 p-0.5 rounded-sm transition-all ${
            isChecked ? 'bg-primary border-primary' : 'bg-background border-muted'
          } flex justify-center items-center`}
        >
          <input
            type="checkbox"
            className="opacity-0 "
            checked={isChecked}
            onChange={handleCheckboxChange}
          />
          {/* Checkmark Icon */}
          {isChecked && (
            <Check className="w-4 h-4 z-10 absolute text-background" />
          )}
        </div>
        <span className="text-sm text-muted-foreground">{label}</span>
      </label>
    </div>
  );
};

export default CustomCheckbox;
