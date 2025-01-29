import React, { useState } from "react";

const initialData = [
  {
    name: "Owner Details",
    complete: true,
  },
  {
    name: "Tenant Details",
    complete: false,
  },
  {
    name: "Property Details",
    complete: false,
  },
  {
    name: "Agreement terms",
    complete: false,
  },
  {
    name: "Annexures",
    complete: false,
  },
];

const Stepper = ({ setopen, activeStep }) => {
  const [data, setData] = useState(initialData);
  const [currentStep, setCurrentStep] = useState(0); // Track the current step

  const handleSteper = (index) => {
    if (index < currentStep) return;
    const updatedData = data.map((item, i) =>
      i <= index ? { ...item, complete: true } : item
    );
    setopen(initialData[index].name);
    setData(updatedData);
    setCurrentStep(index); // Set the new current step
  };

  return (
    <div className="flex items-center justify-center w-full p-10 max-md:items-start max-md:gap-5">
      {data?.map((i, index) => (
        <div
          key={index}
          onClick={() => handleSteper(index)}
          className="flex flex-col items-center justify-center cursor-pointer "
        >
          <div className="w-full flex items-center justify-center">
            <div
              className={`w-16 max-md:w-0 h-1 ${
                i.complete || activeStep === index || activeStep > index
                  ? "bg-primary"
                  : "bg-gray-300"
              } transition-all duration-300 ease-linear `}
            ></div>
            <div
              className={`h-5 w-5 ${
                i.complete || activeStep === index || activeStep > index
                  ? "bg-primary"
                  : "bg-gray-300"
              } rounded-full p-1.5 flex items-center justify-center transition-all duration-300 ease-linear `}
            >
              <div className="h-full w-full bg-white rounded-full transition-all duration-300 ease-linear"></div>
            </div>
            <div
              className={`w-28 max-md:w-0 h-1 ${
                i.complete || activeStep === index || activeStep > index
                  ? "bg-primary"
                  : "bg-gray-300"
              } transition-all duration-300 ease-linear`}
            ></div>
          </div>
          <h1
            className={`${
              i.complete || activeStep === index || activeStep > index
                ? "text-gray-400"
                : "text-black"
            } max-md:text-xs text-center`}
          >
            {i.name}
          </h1>
        </div>
      ))}
    </div>
  );
};

export default Stepper;