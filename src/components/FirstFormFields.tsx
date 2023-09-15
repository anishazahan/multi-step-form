import Link from "next/link";
import React from "react";

const FirstFormFields = () => {
  return (
    <div className="">
      <h2 className="mt-4 mb-[32px] text-[30px] lg:text-[36px] ">
        Contact Information{" "}
      </h2>
      <div className="space-y-3">
        <div className="">
          <label className="text-[20px] font-semibold text-[#666]" htmlFor="">
            First Name <span className="text-[#B91C1C]">*</span>{" "}
          </label>
          <input
            className="outline-none focus:border-blue-300 px-4 text-[17px] border-2 py-4 w-full border-[#E7E7E7] rounded"
            type="text"
            placeholder="Jhon"
          />
        </div>
        <div className="">
          <label className="text-[20px] font-semibold text-[#666]" htmlFor="">
            Last Name <span className="text-[#B91C1C]">*</span>{" "}
          </label>
          <input
            className="outline-none focus:border-blue-300 px-4 text-[17px] border-2 py-4 w-full border-[#E7E7E7] rounded"
            type="text"
            placeholder="Doe"
          />
        </div>
        <div className="">
          <label
            className="text-[20px] focus:border-blue-300 font-semibold text-[#666]"
            htmlFor=""
          >
            Email <span className="text-[#B91C1C]">*</span>{" "}
          </label>
          <input
            className="outline-none focus:border-blue-300 px-4 text-[17px] border-2 py-4 w-full border-[#E7E7E7] rounded"
            type="email"
            placeholder="anisha@gmail.com"
          />
        </div>
        <div className="">
          <label className="text-[20px]  font-semibold text-[#666]" htmlFor="">
            Confirm Email
          </label>
          <input
            className="outline-none px-4 focus:border-blue-300 text-[17px] border-2 py-4 w-full border-[#E7E7E7] rounded"
            type="email"
            placeholder="anisha@gmail.com"
          />
        </div>
      </div>

      <div className="checkbox space-y-[27px] mt-[48px]">
        <div className="flex items-baseline space-x-[16px]">
          <input type="checkbox" name="" id="" />
          <p className="text-[18px] text-[#666]">
            By checking this box, you agree to be added to our mailing list. You
            can opt out at any time.
          </p>
        </div>
        <div className="flex items-baseline space-x-[16px] ">
          <input type="checkbox" name="" id="" />
          <p className="text-[18px] text-[#666]">
            By Checking this box, you agree to our{" "}
            <Link
              className="text-[#126BAD] underline underline-[#126BAD]"
              href=""
            >
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link
              className="text-[#126BAD] underline underline-[#126BAD]"
              href=""
            >
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
};

export default FirstFormFields;
