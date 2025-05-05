import { useState } from "react";

const steps = ["Dados", "Pagamento", "Resumo"];

export default function Stepper({currentStep,steps}:{currentStep:number,steps:string[]}) {
   // de 0 a 2

  return (
    <div className="w-full max-w-md px-4">
      <div className="flex items-center w-full overflow-x-hidden justify-between relative">
        {/* Linha de fundo (cinza) */}
        <div className="absolute top-4 left-6 duration-300 transition-all w-[86%] h-0.5 bg-zinc-300 dark:bg-muted-foreground z-0"></div>

        {/* Linha de progresso (azul) */}
        <div
          className="absolute top-4 left-6 h-0.5 duration-300 max-w-[85%] bg-orange-500 z-10 transition-all"
          style={{ width: `${(currentStep / (steps.length - 1)) * 88}%` }}
        ></div>

        {/* Bolinhas */}
        {steps.map((label, index) => (
          <div key={index} className="z-20  justify-between flex flex-col items-center">
            <div className={` p-1.5 duration-300 transition-all bg-background rounded-full  border-2 ${index < currentStep
              ? " border-orange-500 "
              : index === currentStep
                ? "bg-background   "
                : "bg-background border-zinc-300 dark:border-muted-foreground"
              }`}>
              <div
                className={`w-4 h-4 duration-300 transition-all  rounded-full  ${index < currentStep
                  ? "bg-orange-500  "
                  : index === currentStep
                    ? "bg-orange-500  "
                    : "bg-background  "
                  }`}
              ></div>
            </div>
            <span
              className={`text-sm mt-1 ${index <= currentStep ? "text-orange-500  font-medium" : " text-zinc-400 dark:text-muted-foreground"
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
