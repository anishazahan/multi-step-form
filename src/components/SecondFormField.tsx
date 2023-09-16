import { AiFillEyeInvisible } from "react-icons/ai";
import { BsCheckLg } from "react-icons/bs";
import { RiErrorWarningFill, RiErrorWarningLine } from "react-icons/ri";
import { useForm } from "react-hook-form";

const SecondFormField = () => {
  const {
    handleSubmit,
    formState: { errors },
    getValues,
    register,
  } = useForm();

  const validatePassword = (value: any) => {
    // Add your password validation logic here
    // Example: Password must contain at least one lowercase letter and one number
    const lowercaseRegex = /[a-z]/;
    const numberRegex = /[0-9]/;

    // Check if a number is present in the password
    const containsNumber = numberRegex.test(value);

    // Create error messages based on conditions
    const errorMessages = {
      required: "Please Enter a valid password",
      validate:
        "Password must contain at least one lowercase letter and one number",
      containsNumber: "Password must contain at least one number",
    };

    return (
      (lowercaseRegex.test(value) && containsNumber && value.length >= 8) ||
      errorMessages
    );
  };

  return (
    <div>
      <h2 className="mt-4 mb-[32px] text-[30px] lg:text-[36px] ">
        Contact Information
      </h2>

      <div className="space-y-3 mb-20">
        <label className="text-[20px] font-semibold text-[#666]" htmlFor="">
          Password <span className="text-[#B91C1C]">*</span>{" "}
        </label>
        <div className="relative">
          <input
            className={`outline-none shadow-lg bg-white focus:border-blue-300 px-4 text-[17px] border-2 py-4 w-full border-[#E7E7E7] rounded pr-12 ${
              errors.password ? "border-red-500" : ""
            }`}
            type="password"
            placeholder="........"
            {...register("password", {
              required: validatePassword,
              validate: validatePassword,
            })}
          />
          <p className="absolute text-xl text-gray-500 top-1/2 right-2 transform -translate-y-1/2">
            <AiFillEyeInvisible></AiFillEyeInvisible>
          </p>
        </div>

        {errors.password && (
          <div className="warnings flex items-center space-x-2 mt-1">
            <p className="text-[#B91C1C]">
              <RiErrorWarningFill></RiErrorWarningFill>{" "}
            </p>
            <p className="text-sm text-[#B91C1C]">
              {typeof errors.password === "string"
                ? errors.password
                : errors.password.type === "containsNumber"
                ? "One number is required"
                : "An error occurred"}
            </p>
          </div>
        )}

        {/* ... Other validation messages ... */}

        <div className="space-y-2">
          <div className="flex items-center space-x-10">
            {/* ......if special character not given...... */}
            <div className="flex space-x-2 items-center mt-2">
              <p className=" text-[#B91C1C]">
                <RiErrorWarningLine></RiErrorWarningLine>
              </p>
              <p className="text-[#B91C1C] ">One special character</p>
            </div>
            {/* ......if special character given...... */}
            <div className="flex space-x-3 items-center mt-2">
              <p className="text-xl text-blue-600">
                <BsCheckLg></BsCheckLg>
              </p>
              <p className="text-[#666] text-[18px]">One special character</p>
            </div>

            {/* <div className="flex space-x-3 items-center mt-2">
              <p className="text-xl text-blue-600">
                <BsCheckLg></BsCheckLg>
              </p>
              <p className="text-[#666] text-[18px]">
                One lower case character
              </p>
            </div> */}
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
