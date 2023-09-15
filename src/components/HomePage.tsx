import React from "react";
import LeftContent from "./LeftContent";
import Steps from "./Steps";
import FirstFormFields from "./FirstFormFields";
import SecondFormField from "./SecondFormField";

const HomePage = () => {
  return (
    <div>
      <div className="flex flex-col lg:flex-row my-[5%] px-3 md:px-10 2xl:px-0 mx-auto lg:justify-center gap-[28px]">
        <div className="left w-full pb-10 lg:w-[50%] 2xl:w-[667px] pt-[60px] pl-5 md:pl-10 lg:pl-[42px] pr-[20px] bg-[#E6F0F6] rounded-[16px]">
          <LeftContent></LeftContent>
        </div>
        <div className="right w-full lg:w-[50%] 2xl:w-[667px] pt-[60px] px-5 md:px-10 lg:px-[40px] shadow-lg rounded-[16px]">
          <Steps></Steps>
          <div className="w-full h-[1px] bg-gray-300 mt-4"></div>

          <div className="">
            <form>
              <FirstFormFields></FirstFormFields>

              <div className="w-full flex justify-center mx-auto my-[100px]">
                <button className="text-white rounded-md opacity-50 text-[20px] w-full bg-[#0967AF] font-semibold py-4 ">
                  Next
                </button>
              </div>

              <SecondFormField></SecondFormField>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
