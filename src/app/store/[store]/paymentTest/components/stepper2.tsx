import { useState } from "react";

const steps = ["Dados", "Pagamento", "Resumo"];

export default function Stepper({currentStep,steps}:{currentStep:number,steps:string[]}) {
   // de 0 a 2

  return (
    <div className="w-full max-w-md mx-auto px-4 mt-10">
      <div className="flex items-center w-full overflow-x-hidden justify-between relative">
        {/* Linha de fundo (cinza) */}
        <div className="absolute top-4 left-6 duration-300 transition-all w-[86%] h-0.5 bg-gray-300 z-0"></div>

        {/* Linha de progresso (azul) */}
        <div
          className="absolute top-4 left-6 h-0.5 duration-300 max-w-[85%] bg-orange-500 z-10 transition-all"
          style={{ width: `${(currentStep / (steps.length - 1)) * 88}%` }}
        ></div>

        {/* Bolinhas */}
        {steps.map((label, index) => (
          <div key={index} className="z-20  justify-between flex flex-col items-center">
            <div className={` p-1.5 duration-300 transition-all bg-white rounded-full border-2 ${index < currentStep
              ? " border-orange-500 "
              : index === currentStep
                ? "bg-white   "
                : "bg-white border-gray-300"
              }`}>
              <div
                className={`w-4 h-4 duration-300 transition-all  rounded-full  ${index < currentStep
                  ? "bg-orange-500  "
                  : index === currentStep
                    ? "bg-orange-500  "
                    : "bg-white "
                  }`}
              ></div>
            </div>
            <span
              className={`text-sm mt-1 ${index <= currentStep ? "text-orange-500 font-medium" : "text-gray-400"
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
