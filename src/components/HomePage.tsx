import React, { useEffect, useState } from "react";
import LeftContent from "./LeftContent";
import Steps from "./Steps";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { setActiveStep, setStepValid } from "../redux/stepSlice";
import { RootState } from "@/redux/store";
import img from "../assets/img/dot.png";
import { HiCheckCircle } from "react-icons/hi";

import {
  AiFillEyeInvisible,
  AiFillEye,
  AiFillCheckCircle,
} from "react-icons/ai";
import { BsCheckLg } from "react-icons/bs";
import { RiErrorWarningFill, RiErrorWarningLine } from "react-icons/ri";
import * as yup from "yup";
import Image from "next/image";

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
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");

  const {
    handleSubmit,
    formState: { errors },
    register,
    watch,
    reset,
    getValues,
  } = useForm({});

  // State variables to store form data for each step
  const [step1Data, setStep1Data] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });
  const [step2Data, setStep2Data] = useState({
    password: "",
  });
  const [step3Data, setStep3Data] = useState({
    cardNumber: "",
    expiryMonth: "",
    expiryYear: "",
    cv: "",
  });
  //...............for steps............

  const activeStep = useSelector((state: RootState) => state.step.activeStep);
  const dispatch = useDispatch();

  const handleNextClick = async () => {
    const isValid = await validateStepFields(activeStep);
    if (activeStep < 3 && isValid) {
      updateStepData(activeStep, getValues());

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
        const termsOfService = watch("termsOfService");
        // Validate fields here
        const isStep1Valid = firstName && lastName && email && termsOfService;
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
                    htmlFor="lastName"
                  >
                    Last Name <span className="text-[#B91C1C]">*</span>{" "}
                  </label>
                  <input
                    id="lastName"
                    className="outline-none focus:border-blue-300 px-4 text-[17px] border-2 py-4 w-full border-[#E7E7E7] rounded"
                    {...register("lastName", {
                      required: "Last Name is required",
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
                    htmlFor="email"
                  >
                    Email <span className="text-[#B91C1C]">*</span>{" "}
                  </label>
                  <input
                    id="email"
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
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <div className="">
                  <label
                    className="text-[20px]  font-semibold text-[#666]"
                    htmlFor="confirmEmail"
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
                    {...register("termsOfService", {
                      required:
                        "You must accept the policies in order to use Life Process Program",
                    })}
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
              {/* {errors.mailingList && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.mailingList.message}
                </p>
              )} */}
              {errors.termsOfService && (
                <div className="flex space-x-2 items-center">
                  <Image className="mt-3" src={img} alt="" />
                  <p className="text-[#DFA129] text-sm mt-4">
                    {errors.termsOfService.message}
                  </p>
                </div>
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
  const updateStepData = (step, data) => {
    switch (step) {
      case 1:
        setStep1Data(data);
        break;
      case 2:
        setStep2Data(data);
        break;
      case 3:
        setStep3Data(data);
        break;
      default:
        break;
    }
  };

  // Function to handle form submission
  const handleFormSubmit = () => {
    // Combine form data from all steps
    const formDataAllSteps = {
      step1: step1Data,
      step2: step2Data,
      step3: step3Data,
    };

    // Send a POST request to your API
    fetch("http://localhost:5000/api/formdata", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data: formDataAllSteps }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.message);
        // Show the success message
        setShowPopup(true);
        setPopupMessage(data.message);
      })
      .catch((error) => {
        // Handle any errors that occur during the fetch
        console.error("Error:", error);
      });
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
                    type="submit" // Change to type="submit" to trigger form submission
                    className="text-white rounded-md text-[20px] w-full bg-[#0967AF] font-semibold py-4"
                    disabled={!validateStepFields(activeStep)}
                  >
                    Submit
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleSubmit(handleNextClick)}
                    className={`text-white rounded-md text-[20px] w-full bg-[#0967AF] font-semibold py-4`}
                    disabled={!validateStepFields(activeStep)}
                  >
                    {loading ? "Loading..." : "Next"}
                  </button>
                )}
              </div>
            </form>

            {/* Popup for successful form data */}
            {showPopup && (
              <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                <div className="bg-white shadow w-[70%] h-[300px] lg:w-[550px] lg:h-[400px] flex flex-col items-center justify-center  rounded-md">
                  <div className="flex justify-center">
                    <button className="text-7xl text-green-700">
                      <HiCheckCircle></HiCheckCircle>
                    </button>
                  </div>
                  <p className="text-2xl font-bold mt-3 mb-4 text-center">
                    {popupMessage ? popupMessage : "Form submitted Successful!"}
                  </p>

                  <div className="flex justify-center space-x-4 items-center mt-8">
                    <button
                      className="px-6 py-2 bg-purple-700 text-white rounded-sm font-bold"
                      onClick={() => setShowPopup(false)}
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
