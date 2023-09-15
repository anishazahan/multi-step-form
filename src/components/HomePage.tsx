import React from "react";
import LeftContent from "./LeftContent";
import Steps from "./Steps";

const HomePage = () => {
  return (
    <div>
      <div className="flex flex-col lg:flex-row my-[5%] px-5 md:px-10 2xl:px-0 mx-auto lg:justify-center gap-[28px]">
        <div className="left w-full lg:w-[50%] 2xl:w-[667px] pt-[60px] pl-[42px] pr-[20px] bg-[#E6F0F6] rounded-[16px]">
          <LeftContent></LeftContent>
        </div>
        <div className="right w-full lg:w-[50%] 2xl:w-[667px] pt-[60px] px-[40px] shadow-lg rounded-[16px]">
          <Steps></Steps>
          <div className="w-full h-[1px] bg-gray-300 mt-4"></div>
          <h2 className="mt-4 mb-[32px] text-[30px] lg:text-[36px] ">
            Contact Information
            <div className="">
              <form></form>
            </div>
          </h2>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
