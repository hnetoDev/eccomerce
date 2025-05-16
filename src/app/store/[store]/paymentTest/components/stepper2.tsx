import { useState } from "react";

const steps = ["Dados", "Pagamento", "Resumo"];

export default function Stepper({currentStep,setCurrentStep,steps}:{currentStep:number,steps:string[], setCurrentStep:React.Dispatch<React.SetStateAction<number>>}) {
   // de 0 a 2

  return (
    <div className="w-full max-w-md px-4">
      <div className="flex items-center w-full overflow-x-hidden justify-between relative">
        {/* Linha de fundo (cinza) */}
        <div className="absolute top-4 left-6 duration-300 transition-all w-[86%] h-0.5 border dark:bg-muted-foreground z-0"></div>

        {/* Linha de progresso (azul) */}
        <div
          className="absolute top-4 left-6 h-0.5 rounded-full duration-300 max-w-[85%] bg-primary z-10 transition-all"
          style={{ width: `${(currentStep / (steps.length - 1)) * 88}%` }}
        ></div>

        {/* Bolinhas */}
        {steps.map((label, index) => (
          <div key={index} onClick={()=>{
            if (index < currentStep) {
              setCurrentStep(index);
            }
            
          }} className="z-20 cursor-pointer  justify-between flex flex-col  items-center">
            <div className={` p-1.5 duration-300 transition-all bg-background rounded-full  border-2 ${index < currentStep
              ? " border-primary "
              : index === currentStep
                ? "bg-background "
                : "bg-background border-zinc-300 dark:border-muted-foreground"
              }`}>
              <div
                className={`w-4 h-4 duration-300 transition-all  rounded-full  ${index < currentStep
                  ? "bg-primary  "
                  : index === currentStep
                    ? "bg-primary  "
                    : "bg-background  "
                  }`}
              ></div>
            </div>
            <span
              className={`text-sm mt-1 ${index <= currentStep ? "text-primary  font-medium" : " text-zinc-400 dark:text-muted-foreground"
                }`}
            >
              {label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
