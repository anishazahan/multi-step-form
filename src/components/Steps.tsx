import { RootState } from "@/redux/store";
import React from "react";
import { useSelector } from "react-redux";

const Steps: React.FC = () => {
  const activeStep = useSelector((state: RootState) => state.step.activeStep);

  return (
    <div className="flex items-center space-x-[46px]">
      {[1, 2, 3].map((stepNumber) => (
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
