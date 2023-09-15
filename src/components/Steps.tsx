// Steps.tsx
import React from "react";

interface StepsProps {
  activeStep: number;
}

const Steps: React.FC<StepsProps> = ({ activeStep }) => {
  return (
    <div className="flex items-center space-x-[46px]">
      {[1, 2, 3, 4].map((stepNumber) => (
        <p
          key={stepNumber}
          className={`font-semibold text-[20px] ${
            stepNumber === activeStep ? "text-[#126BAD]" : "text-[#D9D9D9]"
          }`}
        >
          Step {stepNumber}
        </p>
      ))}
    </div>
  );
};

export default Steps;
