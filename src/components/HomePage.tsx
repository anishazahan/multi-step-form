import React, { useState } from "react";
import LeftContent from "./LeftContent";
import Steps from "./Steps";
import FirstFormFields from "./FirstFormFields";
import SecondFormField from "./SecondFormField";
import ThirdFormField from "./ThirdFormField";
import FourthFormField from "./FourthFormField";

const HomePage = () => {
  const [activeStep, setActiveStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const handleNextClick = (e: { preventDefault: () => void }) => {
    e.preventDefault(); // Prevent the default form submission behavior

    setLoading(true); // Set loading to true to display loading state

    // Simulate a delay using setTimeout
    setTimeout(() => {
      if (activeStep < 4) {
        setActiveStep(activeStep + 1);
        setLoading(false); // Turn off loading after the delay
      }
    }, 2000); // Adjust the delay duration as needed
  };

  return (
    <div>
      <div className="flex flex-col lg:flex-row my-[5%] px-3 md:px-10 2xl:px-0 mx-auto lg:justify-center gap-[28px]">
        <div className="left w-full pb-10 lg:w-[50%] 2xl:w-[667px] pt-[60px] pl-5 md:pl-10 lg:pl-[42px] pr-[20px] bg-[#E6F0F6] rounded-[16px]">
          <LeftContent />
        </div>
        <div className="right w-full lg:w-[50%] 2xl:w-[667px] pt-[60px] px-5 md:px-10 lg:px-[40px] shadow-lg rounded-[16px]">
          <Steps activeStep={activeStep} />
          <div className="w-full h-[1px] bg-gray-300 mt-4"></div>

          <div className="">
            <form onSubmit={handleNextClick}>
              {activeStep === 1 && <FirstFormFields />}
              {activeStep === 2 && <SecondFormField />}
              {activeStep === 3 && <ThirdFormField />}
              {activeStep === 4 && <FourthFormField />}

              <div className="w-full flex justify-center mx-auto my-[100px]">
                {activeStep < 4 ? (
                  loading ? ( // Show loading state
                    <div>Loading...</div>
                  ) : (
                    <button
                      type="submit"
                      className="text-white rounded-md opacity-50 text-[20px] w-full bg-[#0967AF] font-semibold py-4 "
                    >
                      Next
                    </button>
                  )
                ) : null}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
