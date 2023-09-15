import { AiFillEyeInvisible } from "react-icons/ai";
import { BsCheckLg } from "react-icons/bs";
import { RiErrorWarningFill, RiErrorWarningLine } from "react-icons/ri";

const SecondFormField = () => {
  return (
    <div>
      <h2 className="mt-4 mb-[32px] text-[30px] lg:text-[36px] ">
        Contact Information{" "}
      </h2>

      <div className="space-y-3 mb-20">
        <label className="text-[20px] font-semibold text-[#666]" htmlFor="">
          Password <span className="text-[#B91C1C]">*</span>{" "}
        </label>
        <div className="relative">
          <input
            className="outline-none shadow-lg bg-white focus:border-blue-300 px-4 text-[17px] border-2 py-4 w-full border-[#E7E7E7] rounded pr-12"
            type="password"
            placeholder="........"
          />
          <p className="absolute text-xl text-gray-500 top-1/2 right-2 transform -translate-y-1/2">
            <AiFillEyeInvisible></AiFillEyeInvisible>
          </p>
        </div>
        {/* ......error message section..... */}

        <div className="warnings flex items-center space-x-2 mt-1">
          <p className="text-[#B91C1C]">
            <RiErrorWarningFill></RiErrorWarningFill>{" "}
          </p>
          <p className="text-sm  text-[#B91C1C]">
            {" "}
            Please Enter Valid Password
          </p>
        </div>

        <div className="space-y-2">
          <div className="flex items-center space-x-10">
            {/* <div className="flex space-x-3 items-center mt-2">
              <p className="text-xl text-blue-600">
                <BsCheckLg></BsCheckLg>
              </p>
              <p className="text-[#666] text-[18px]">One special character</p>
            </div> */}
            <div className="flex space-x-2 items-center mt-2">
              <p className=" text-[#B91C1C]">
                <RiErrorWarningLine></RiErrorWarningLine>
              </p>
              <p className="text-[#B91C1C] ">One special character</p>
            </div>
            <div className="flex space-x-3 items-center mt-2">
              <p className="text-xl text-blue-600">
                <BsCheckLg></BsCheckLg>
              </p>
              <p className="text-[#666] text-[18px]">
                One lower case character
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-[105px]">
            <div className="flex space-x-3 items-center mt-2">
              <p className="text-xl text-blue-600">
                <BsCheckLg></BsCheckLg>
              </p>
              <p className="text-[#666] text-[18px]">One number</p>
            </div>
            <div className="flex space-x-3 items-center mt-2">
              <p className="text-xl text-blue-600">
                <BsCheckLg></BsCheckLg>
              </p>
              <p className="text-[#666] text-[18px]">
                One upper case character
              </p>
            </div>
          </div>
          <div className="flex space-x-3 items-center mt-2">
            <p className="text-xl text-blue-600">
              <BsCheckLg></BsCheckLg>
            </p>
            <p className="text-[#666] text-[18px]">8 characters minimum</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecondFormField;
