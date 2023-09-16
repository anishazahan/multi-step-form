import React, { useEffect, useState } from "react";
import LeftContent from "./LeftContent";
import Steps from "./Steps";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { setActiveStep, setStepValid } from "../redux/stepSlice";
import { RootState } from "@/redux/store";

import {
  AiFillEyeInvisible,
  AiFillEye,
  AiFillCheckCircle,
} from "react-icons/ai";
import { BsCheckLg } from "react-icons/bs";
import { RiErrorWarningFill, RiErrorWarningLine } from "react-icons/ri";
import * as yup from "yup";

const HomePage = () => {
  //............for password.........
  const [loading, setLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [passwordValidation, setPasswordValidation] = useState({
    specialChar: false,
    lowercase: false,
    number: false,
    uppercase: false,
    minLength: false,
  });
  const [borderColor, setBorderColor] = useState("gray");
  const [showErrors, setShowErrors] = useState(false);

  const {
    handleSubmit,
    formState: { errors },
    register,
    watch,
    reset,
    getValues, // Add getValues from react-hook-form
  } = useForm({});

  // State variable to store form data
  const [formData, setFormData] = useState({
    step1: {
      firstName: "",
      lastName: "",
      email: "",
    },
    step2: {
      password: "",
    },
    step3: {
      cardNumber: "",
      expiryMonth: "",
      expiryYear: "",
      cv: "",
    },
  });

  //...............for steps............

  const activeStep = useSelector((state: RootState) => state.step.activeStep);
  const dispatch = useDispatch();

  // const handleNextClick = () => {
  //   // Validate the form before allowing navigation
  //   handleSubmit((data) => {
  //     // Assuming you have a function to validate each step's fields
  //     const isValid = validateStepFields(activeStep);

  //     if (activeStep < 3 && isValid) {
  //       dispatch(setActiveStep(activeStep + 1));
  //     }
  //   })();
  // };

  const handleNextClick = async () => {
    // Move to the next step only if the current step is valid
    if (activeStep < 3 && (await validateStepFields(activeStep))) {
      dispatch(setActiveStep(activeStep + 1));
    }
  };

  const handlePrevClick = () => {
    if (activeStep > 1) {
      dispatch(setActiveStep(activeStep - 1));
    }
  };

  //................ 3 number step validation.............

  const step3Schema = yup.object().shape({
    cardNumber: yup
      .string()
      .required("Card Number is required")
      .matches(
        /^\d{3} \d{3} \d{3}$/,
        "Invalid card number format (e.g., xxx xxx xxx)"
      ),
    expiryMonth: yup.string().required("Expiry Month is required"),
    expiryYear: yup.string().required("Expiry Year is required"),
    cv: yup.string().required("CV is required"),
  });

  //..................validation step..........

  const validateStepFields = async (step: number): Promise<boolean> => {
    switch (step) {
      case 1:
        const firstName = watch("firstName");
        const lastName = watch("lastName");
        const email = watch("email");
        // Validate fields here
        const isStep1Valid = firstName && lastName && email;
        dispatch(setStepValid({ step: 1, valid: isStep1Valid }));
        return isStep1Valid;
      case 2:
        const password = watch("password");
        const isStep2Valid = password;
        dispatch(setStepValid({ step: 2, valid: isStep2Valid }));
        return isStep2Valid;
        // Password validation is handled by yup schema, no need for passwordIsValid function.
        return true;
      case 3:
        try {
          await step3Schema.validate({
            cardNumber: watch("cardNumber"),
            expiryMonth: watch("expiryMonth"),
            expiryYear: watch("expiryYear"),
            cv: watch("cv"),
          });
          dispatch(setStepValid({ step: 3, valid: true }));
          return true;
        } catch (error) {
          // Validation failed
          dispatch(setStepValid({ step: 3, valid: false }));
          return false;
        }
      default:
        return false;
    }
  };

  useEffect(() => {
    // Reset the form fields when switching steps
    reset();
  }, [activeStep, reset]);

  //.............render component..............

  const renderFormFields = () => {
    switch (activeStep) {
      case 1:
        return (
          <div className="">
            {/* ... Your form fields ... */}
            <div className="">
              {" "}
              <h2 className="mt-4 mb-[32px] text-[30px] lg:text-[36px] ">
                Contact Information{" "}
              </h2>{" "}
              <div className="space-y-3">
                <div className="">
                  <label
                    className="text-[20px] font-semibold text-[#666]"
                    htmlFor="firstName"
                  >
                    First Name <span className="text-[#B91C1C]">*</span>{" "}
                  </label>
                  <input
                    id="firstName"
                    {...register("firstName", {
                      required: "First Name is required",
                    })}
                    className="outline-none focus:border-blue-300 px-4 text-[17px] border-2 py-4 w-full border-[#E7E7E7] rounded"
                    type="text"
                    placeholder="Jhon"
                  />
                  {errors.firstName && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.firstName.message}
                    </p>
                  )}
                </div>

                <div className="">
                  <label
                    className="text-[20px] font-semibold text-[#666]"
                    htmlFor=""
                  >
                    Last Name <span className="text-[#B91C1C]">*</span>{" "}
                  </label>
                  <input
                    className="outline-none focus:border-blue-300 px-4 text-[17px] border-2 py-4 w-full border-[#E7E7E7] rounded"
                    {...register("lastName", {
                      required: "last Name is required",
                    })}
                    type="text"
                    placeholder="Doe"
                  />
                  {errors.lastName && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.lastName.message}
                    </p>
                  )}
                </div>

                <div className="">
                  <label
                    className="text-[20px] focus.borderColor-blue-300 font-semibold text-[#666]"
                    htmlFor="email" // Add the "htmlFor" attribute with the correct input field id
                  >
                    Email <span className="text-[#B91C1C]">*</span>{" "}
                  </label>
                  <input
                    id="email" // Add the "id" attribute to match the "htmlFor" in the label
                    className="outline-none focus:border-blue-300 px-4 text-[17px] border-2 py-4 w-full border-[#E7E7E7] rounded"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Invalid email address",
                      },
                    })}
                    type="email"
                    placeholder="anisha@gmail.com"
                  />
                  {errors.email && ( // Change "errors.firstName" to "errors.email"
                    <p className="text-red-500 text-sm mt-1">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <div className="">
                  <label
                    className="text-[20px]  font-semibold text-[#666]"
                    htmlFor=""
                  >
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
                  <input
                    type="checkbox"
                    id="mailingListCheckbox"
                    {...register("mailingList")}
                  />
                  <label
                    htmlFor="mailingListCheckbox"
                    className="text-[18px] text-[#666]"
                  >
                    By checking this box, you agree to be added to our mailing
                    list. You can opt out at any time.
                  </label>
                </div>
                <div className="flex items-baseline space-x-[16px] ">
                  <input
                    type="checkbox"
                    id="termsOfServiceCheckbox"
                    {...register("termsOfService")}
                  />
                  <label
                    htmlFor="termsOfServiceCheckbox"
                    className="text-[18px] text-[#666]"
                  >
                    By Checking this box, you agree to our{" "}
                    <Link
                      className="text-[#126BAD] underline underline-[#126BAD]"
                      href="/terms-of-service" // Specify the link to your terms of service page
                    >
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link
                      className="text-[#126BAD] underline underline-[#126BAD]"
                      href="/privacy-policy" // Specify the link to your privacy policy page
                    >
                      Privacy Policy
                    </Link>
                  </label>
                </div>
              </div>
              {errors.mailingList && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.mailingList.message}
                </p>
              )}
              {errors.termsOfService && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.termsOfService.message}
                </p>
              )}
            </div>
          </div>
        );
      // Handle other steps here...
      case 2:
        return (
          <div>
            <h2 className="mt-4 mb-[32px] text-[30px] lg:text-[36px] ">
              Contact Information{" "}
            </h2>

            <div className="space-y-3 mb-20">
              <label
                className="text-[20px] font-semibold text-[#666]"
                htmlFor=""
              >
                Password <span className="text-[#B91C1C]">*</span>{" "}
              </label>
              <div className="relative">
                <input
                  className={`outline-none shadow-lg bg-white px-4 text-[17px] border-2 py-4 w-full border-${borderColor}-500 rounded pr-12 ${
                    (showErrors || errors.password) && "border-red-500"
                  }`}
                  type={passwordVisible ? "text" : "password"}
                  placeholder="........"
                  {...register("password", {
                    required: " Please Enter Valid Password",
                    pattern: {
                      value:
                        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
                      message: "Invalid password",
                    },
                    minLength: {
                      value: 8,
                      message: "Password must me 8 charecters",
                    },
                  })}
                  onChange={(e) => {
                    const value = e.target.value;
                    setPasswordValidation({
                      specialChar: /[@$!%*?&]/.test(value),
                      lowercase: /[a-z]/.test(value),
                      number: /\d/.test(value),
                      uppercase: /[A-Z]/.test(value),
                      minLength: value.length >= 8,
                    });

                    // Determine the border color based on validation criteria
                    if (value.length === 0) {
                      setBorderColor("gray");
                      setShowErrors(false); // Hide errors when the input is empty
                    } else if (
                      passwordValidation.specialChar &&
                      passwordValidation.lowercase &&
                      passwordValidation.number &&
                      passwordValidation.uppercase &&
                      passwordValidation.minLength
                    ) {
                      setBorderColor("green");
                      setShowErrors(false); // Hide errors when all criteria are met
                    } else {
                      setBorderColor("red");
                      setShowErrors(true); // Show errors when the criteria are not met
                    }
                  }}
                  required
                />

                <p
                  className="absolute text-xl text-gray-500 top-1/2 right-2 transform -translate-y-1/2 cursor-pointer"
                  onClick={() => setPasswordVisible(!passwordVisible)} // Toggle password visibility
                >
                  {passwordVisible ? (
                    <AiFillEye></AiFillEye>
                  ) : (
                    <AiFillEyeInvisible></AiFillEyeInvisible>
                  )}
                </p>
              </div>

              {/* //  initial error message */}
              {errors.password && (
                <div className="warnings flex items-center space-x-2 mt-1">
                  <p className="text-[#B91C1C]">
                    <RiErrorWarningFill></RiErrorWarningFill>{" "}
                  </p>
                  <p className="text-red-500 text-sm mt-1">
                    {errors.password.message}
                  </p>
                </div>
              )}

              {/* Last error message section when all requirements are met */}
              {!showErrors && // Hide this section when showErrors is false
                passwordValidation.specialChar &&
                passwordValidation.lowercase &&
                passwordValidation.number &&
                passwordValidation.uppercase &&
                passwordValidation.minLength && (
                  <div className="bg-green-100 px-3 py-1 flex items-center space-x-2 mt-1">
                    <p className="text-green-600">
                      <AiFillCheckCircle></AiFillCheckCircle>{" "}
                    </p>
                    <p className="text-green-600 text-sm mt-1">
                      Your password is secure and you’re all set
                    </p>
                  </div>
                )}

              {/* Error message section */}
              <div className={`space-y-2 ${showErrors ? "block" : "hidden"}`}>
                <div className="flex items-center space-x-10">
                  {passwordValidation.specialChar ? (
                    <div className="flex space-x-3 items-center mt-2">
                      <p className="text-xl text-blue-600">
                        <BsCheckLg></BsCheckLg>
                      </p>
                      <p className="text-[#666] text-[18px]">
                        One special character
                      </p>
                    </div>
                  ) : (
                    <div className="flex space-x-2 items-center mt-2">
                      <p className=" text-[#B91C1C]">
                        <RiErrorWarningLine></RiErrorWarningLine>
                      </p>
                      <p className="text-[#B91C1C] ">One special character</p>
                    </div>
                  )}
                  {passwordValidation.lowercase ? (
                    <div className="flex space-x-3 items-center mt-2">
                      <p className="text-xl text-blue-600">
                        <BsCheckLg></BsCheckLg>
                      </p>
                      <p className="text-[#666] text-[18px]">
                        One lower case character
                      </p>
                    </div>
                  ) : (
                    <div className="flex space-x-2 items-center mt-2">
                      <p className=" text-[#B91C1C]">
                        <RiErrorWarningLine></RiErrorWarningLine>
                      </p>
                      <p className="text-[#B91C1C] ">
                        One lower case character
                      </p>
                    </div>
                  )}
                </div>

                <div className="flex items-center space-x-[105px]">
                  {passwordValidation.number ? (
                    <div className="flex space-x-3 items-center mt-2">
                      <p className="text-xl text-blue-600">
                        <BsCheckLg></BsCheckLg>
                      </p>
                      <p className="text-[#666] text-[18px]">One number</p>
                    </div>
                  ) : (
                    <div className="flex space-x-2 items-center mt-2">
                      <p className=" text-[#B91C1C]">
                        <RiErrorWarningLine></RiErrorWarningLine>
                      </p>
                      <p className="text-[#B91C1C] ">One number</p>
                    </div>
                  )}

                  {passwordValidation.uppercase ? (
                    <div className="flex space-x-3 items-center mt-2">
                      <p className="text-xl text-blue-600">
                        <BsCheckLg></BsCheckLg>
                      </p>
                      <p className="text-[#666] text-[18px]">
                        One upper case character
                      </p>
                    </div>
                  ) : (
                    <div className="flex space-x-2 items-center mt-2">
                      <p className=" text-[#B91C1C]">
                        <RiErrorWarningLine></RiErrorWarningLine>
                      </p>
                      <p className="text-[#B91C1C] ">
                        {" "}
                        One upper case character
                      </p>
                    </div>
                  )}
                </div>

                {passwordValidation.minLength ? (
                  <div className="flex space-x-3 items-center mt-2">
                    <p className="text-xl text-blue-600">
                      <BsCheckLg></BsCheckLg>
                    </p>
                    <p className="text-[#666] text-[18px]">
                      8 characters minimum
                    </p>
                  </div>
                ) : (
                  <div className="flex space-x-2 items-center mt-2">
                    <p className=" text-[#B91C1C]">
                      <RiErrorWarningLine></RiErrorWarningLine>
                    </p>
                    <p className="text-[#B91C1C] "> 8 characters minimum</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="">
            <h2 className="mt-4 mb-[32px] text-[30px] lg:text-[36px] ">
              Payment Setup <span className="text-[#0967AF]">($29/month)</span>
            </h2>

            <div className="">
              <div className="space-y-2 mb-2">
                <label
                  className="text-[20px] font-semibold text-[#666]"
                  htmlFor="cardNumber"
                >
                  Card Number <span className="text-[#B91C1C]">*</span>{" "}
                </label>
                <input
                  id="cardNumber"
                  {...register("cardNumber", {
                    required: "Card Number is required",
                  })}
                  className="outline-none focus:border-blue-300 px-4 text-[17px] border-2 py-4 w-full border-[#E7E7E7] rounded"
                  type="text"
                  placeholder="xxx xxx xxx"
                />
                {errors.cardNumber && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.cardNumber.message}
                  </p>
                )}
              </div>

              <div className="flex flex-col md:flex-row items-center mt-6 gap-7  w-full justify-between">
                <div className="space-y-2 flex flex-col w-full">
                  <label
                    className="text-[20px] font-semibold text-[#666]"
                    htmlFor="expiryMonth"
                  >
                    Expiry Month <span className="text-[#B91C1C]">*</span>{" "}
                  </label>
                  <select
                    {...register("expiryMonth", {
                      required: "Expiry Month is required",
                    })}
                    className={`outline-none focus:border-blue-300 text-[17px] border-2 py-4 w-full border-[#E7E7E7] rounded ${
                      errors.expiryMonth ? "border-red-500" : ""
                    }`}
                  >
                    <option value="">Select</option>
                    <option value="0">0</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                  </select>
                  {errors.expiryMonth && (
                    <p className="text-red-500 text-sm mt-2">
                      {errors.expiryMonth.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2 flex flex-col w-full">
                  <label
                    className="text-[20px] font-semibold text-[#666]"
                    htmlFor="expiryYear"
                  >
                    Expiry Year <span className="text-[#B91C1C]">*</span>{" "}
                  </label>
                  <select
                    {...register("expiryYear", {
                      required: "Expiry Year is required",
                    })}
                    className={`outline-none focus:border-blue-300 text-[17px] border-2 py-4 w-full border-[#E7E7E7] rounded ${
                      errors.expiryYear ? "border-red-500" : ""
                    }`}
                  >
                    <option value="">Select</option>
                    <option value="000">000</option>
                    <option value="2023">2023</option>
                    <option value="2024">2024</option>
                    <option value="2025">2025</option>
                  </select>
                  {errors.expiryYear && (
                    <p className="text-red-500 text-sm mt-2">
                      {errors.expiryYear.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2 flex flex-col w-full">
                  <label
                    className="text-[20px] font-semibold text-[#666]"
                    htmlFor="cv"
                  >
                    CV <span className="text-[#B91C1C]">*</span>{" "}
                  </label>
                  <select
                    {...register("cv", {
                      required: "CV is required",
                    })}
                    className={`outline-none focus:border-blue-300 text-[17px] border-2 py-4 w-full border-[#E7E7E7] rounded ${
                      errors.cv ? "border-red-500" : ""
                    }`}
                  >
                    <option value="">Select</option>
                    <option value="0">0</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                  </select>
                  {errors.cv && (
                    <p className="text-red-500 text-sm mt-2">
                      {errors.cv.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  // Function to update form data for each step
  const updateFormData = (step: number, data: any) => {
    setFormData((prevData) => ({
      ...prevData,
      [step]: data,
    }));
  };

  const handleFormSubmit = () => {
    // Combine form data from all steps
    const formDataAllSteps = {
      step1: formData.step1,
      step2: formData.step2,
      step3: getValues(), // Use getValues to get data for the current step (step3)
    };

    // Log the combined form data
    console.log("Form data submitted:", formDataAllSteps);

    // You can submit this data to your backend or perform any other necessary actions
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
            <form onSubmit={handleSubmit(handleFormSubmit)}>
              {renderFormFields()}
              <div className="w-full space-x-10 justify-between flex mx-auto my-[100px]">
                {activeStep !== 1 && (
                  <button
                    type="button"
                    onClick={handlePrevClick}
                    className="text-white rounded-md text-[20px] w-full bg-[#0967AF] font-semibold py-4 mr-2"
                  >
                    Previous
                  </button>
                )}
                {activeStep === 3 ? (
                  <button
                    type="submit"
                    className="text-white rounded-md text-[20px] w-full bg-[#0967AF] font-semibold py-4"
                    disabled={!validateStepFields(activeStep)}
                  >
                    Submit
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => {
                      // Store form data for the current step
                      updateFormData(activeStep, getValues());
                      handleNextClick();
                    }}
                    className={`text-white rounded-md text-[20px] w-full bg-[#0967AF] font-semibold py-4`}
                    disabled={!validateStepFields(activeStep)}
                  >
                    {loading ? "Loading..." : "Next"}
                  </button>
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
