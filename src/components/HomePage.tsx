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
    e.preventDefault();

    setLoading(true);

    setTimeout(() => {
      if (activeStep < 4) {
        setActiveStep(activeStep + 1);
        setLoading(false);
      }
    }, 1000); // Adjust the delay duration as needed
  };

  const handlePrevClick = () => {
    if (activeStep > 1) {
      setActiveStep(activeStep - 1);
    }
  };

  const isLastStep = activeStep === 4;
  const isFirstStep = activeStep === 1;

  let formFieldComponent;

  switch (activeStep) {
    case 1:
      formFieldComponent = <FirstFormFields />;
      break;
    case 2:
      formFieldComponent = <SecondFormField />;
      break;
    case 3:
      formFieldComponent = <ThirdFormField />;
      break;
    case 4:
      formFieldComponent = <FourthFormField />;
      break;
    default:
      formFieldComponent = null;
      break;
  }

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
            <form>
              {formFieldComponent}

              <div className="w-full space-x-10 justify-between flex mx-auto my-[100px]">
                {isFirstStep ? (
                  <button
                    type="button" // Change the type to "button"
                    onClick={handleNextClick}
                    className="text-white rounded-md opacity-50 text-[20px] w-full bg-[#0967AF] font-semibold py-4"
                    disabled={loading} // Disable the button while loading
                  >
                    {loading ? "Loading..." : "Next"}
                  </button>
                ) : (
                  <>
                    <button
                      type="button"
                      onClick={handlePrevClick}
                      className="text-white rounded-md text-[20px] w-full bg-[#0967AF] font-semibold py-4 mr-2"
                    >
                      Previous
                    </button>
                    {isLastStep ? (
                      <div>Submit</div>
                    ) : (
                      <button
                        type="button" // Change the type to "button"
                        onClick={handleNextClick}
                        className="text-white rounded-md opacity-50 text-[20px] w-full bg-[#0967AF] font-semibold py-4"
                        disabled={loading} // Disable the button while loading
                      >
                        {loading ? "Loading..." : "Next"}
                      </button>
                    )}
                  </>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
